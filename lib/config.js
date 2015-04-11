// # App Config
// @description This file houses all of the env configuration of the app, nice and centralized

var path = require('path'),
    fs = require('fs'),
    env = require('node-env-file'),
    config = require('12factor-config');

console.log('info: > Configuring..', process.env.NODE_ENV);
// ### Load .env file(s)
// @description .env files are simple "dotenv" files in a format like the example below:
// @example
//  NODE_ENV=development
//  PORT=5000

var dotenv_resolve_tree = [
    './',
    '../',
    '../../'
];


for (var i = dotenv_resolve_tree.length - 1; i >= 0; i--) {
    var relative_path = dotenv_resolve_tree[i];
    // - attempts to load dotenv files at `relative_path` into `process.env`
    var envFile = path.resolve(path.join(path.dirname(module.parent.filename), relative_path, '.env'));
    if (fs.existsSync(envFile)) {
        console.log('info: -- loading.. ', envFile);
        env(envFile, { overwrite: true});
    } else {
        console.log('debug: -- skipped.. ', envFile);
    }  
};
// module instance?
// @todo handle cfg schema cache handling more explicitly.
var cfg = false;
module.exports = exports = function(schema) {
    if (!cfg) {
        cfg = config(schema);
    }
    return cfg;
}