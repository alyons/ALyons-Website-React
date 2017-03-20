import rootDev from './Root.dev';
import rootProd from './Root.prod';

let exportValue;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    exportValue = rootProd;
} else {
    exportValue = rootDev;
}

export default exportValue;