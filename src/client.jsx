
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__DEVTOOLS__ = true;

require('./client/index');
