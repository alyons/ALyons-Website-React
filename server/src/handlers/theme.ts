'use strict';

import * as Boom from 'boom';
import * as Config from '../../config';

module.exports = {
    pre: [  
    ],

    handler: (request, reply) => {
        const theme = 'default';
        const view = request.route.path.match(/.*\/(.*)$/)[1].replace('.html'. '');

        reply.view(view, {
            theme: theme,
            baseUrl: Config.get('/shells/baseUrl'),
            stylesBaseUrl: Config.get('/styles/baseUrl')
        });
    }
};