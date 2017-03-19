import * as Confidence from 'confidence';

const clientUrl = process.env.CLIENT_URL;

let internals = {
    criteria: {
        env: process.env.NODE_ENV || 'localhost',
        shellsUrl: clientUrl || 'http://localhost:3254',
        stylesUrl: clientUrl || 'http://localhost:3256'
    },
    logging: {
        good: {
            logPath: '/var/log/lyonswebsite/'
        }
    },
    routesConfig: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['api-version', 'SITEFORMAUTH'],
            credentials: true
        }
    }
};

var config = {
    $meta: 'Configuration for LyonsWebsite server',
    projectName: 'alyons-website-react',

    connection: {
        $filter: 'env',

        $default: {
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || '3256',
            routes: internals.routesConfig
        }
    },

    shells: {
        $filter: 'env',

        $default: {
            baseUrl: internals.criteria.shellsUrl
        }
    },

    styles: {
        $filter: 'env',

        $default: {
            baseUrl: internals.criteria.stylesUrl
        }
    },

    build: {
        statics: {
            root: '../../../client/build',
            css: '../../../client/build/css',
            js: '../../../client/build/js'
        }
    },

    logging: {
        good: {
            logPath: {
                $filter: 'env',

                $default: './logs/'
            }
        }
    }
};

var store = new Confidence.Store(config);

export const get = key => {
    return store.get(key, internals.criteria);
}

export const meta = key => {
    return store.meta(key, internals.criteria);
}