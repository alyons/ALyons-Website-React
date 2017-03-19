'user strict';

import * as Boom from 'boom';
import * as Joi from 'joi';
import fetch from 'node-fetch';

const Config = require('../../config');


module.exports = {
    pre: [
    ],

    handler: (request, reply) => {
        return reply({ success: true, payload: request.payload });
    }
};