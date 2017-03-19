import * as Hapi from 'hapi';
import * as mkdirp from 'mkdirp';
import * as routes from './routes';
import * as Config from '../config';

let server = new Hapi.Server();

server.settings.maxSockets = 300;

server.connection(Config.get('/connection'));

var plugins = [
    {
        // Proxy
        register: require('h2o2')
    },
    {
        // File Handler
        register: require('inert')
    },
    {
        // View Rendering
        register: require('vision')
    }
];

server.register(plugins, (err) => {
    if (err) {
        return console.error('Failed to load plugin: ', err);
    }
    server.views({
        engines: {
            html: {
                module: require('handlebars')
            }
        },
        isCached: false,
        relativeTo: __dirname,
        path: 'views'
    });
});

server.ext('onPreResponse', function (request, reply) {
    if (request.response.hasOwnProperty('header')) {
        request.response.header('P3P', 'CP="ALL ADM DEV PSAi COM OUR OTRo STP IND ONL"')
    }
    return reply.continue();
});

server.route(routes);

server.start(() => {
    console.log('Server started as ' + server.info.uri);
});