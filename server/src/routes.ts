'use strict';

import * as Path from 'path';
const { Start, Theme } = require('./handlers');
import * as Config from '../config';

var val = Path.resolve(__dirname, Config.get('/build/statics/css'));

var routes = [
    // Heartbeat to check if server is running
    {
        method: 'GET',
        path: '/heartbeat',
        handler: function (request, reply) {
            reply();
        }
    },

    // Render views
    {
        method: 'GET',
        path: '/shells/main.html',
        config: Theme
    },

    // Other routes
    {
        method: 'GET',
        path: '/css/{filename}',
        handler: {
            directory: {
                path: Path.resolve(_dirname, Config.get('/build/statics/css')),
                redirectToSlash: true,
                index: false
            }
        }
    },
    {
        method: 'GET',
        path: '/js/{filename}',
        handler: {
            directory: {
                path: Path.resolve(_dirname, Config.get('/build/statics/js')),
                redirectToSlash: true,
                index: false
            }
        }
    },
    {
        method: 'GET',
        path: '/assets/{filename}',
        handler: {
            directory: {
                path: Path.resolve(_dirname, Config.get('/build/statics/root')),
                redirectToSlash: true,
                index: false
            }
        }
    }
];

module.exports = routes;