import * as Hapi from 'hapi';
import * as mkdirp from 'mkdirp';
import * as routes from './routes';
import * as Config from '../config';

let server = new Hapi.Server();