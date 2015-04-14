// # App Config
// @description This file houses all of the env configuration of the app, nice and centralized

var path = require('path'),
    fs = require('fs'),
    env = require('node-env-file'),
    _ = require('lodash'),
    Config = require('12factor-config');

var ConfigSchema = function(schema, opts) {
    this.schema = schema;
    opts = opts ? opts : {};
    this.opts = _.merge({ logger: console, debug: false }, opts);

    this.debugEnabled = function() {
        return this.opts.debug ? this.opts.debug : false;
    };

    if (this.opts.debug) {
        this.notify = this.opts.logger;
        this.notify.log('  12factor-dotenv:\t', 'DEBUG '+this.opts.debug);
    } else {
        this.notify = {
            log: function() {},
            warn: function() {},
            debug: function() {},
            error: function() {},
            info: function() {}
        };
    }

    // ## Load Environment

    this.notify.log('  12factor-dotenv:\t', 'Configuring.. '+process.env.NODE_ENV);

    var dotenv_resolve_tree = [
        './',
        '../',
        '../../'
    ];

    var initial_env = JSON.stringify(process.env);
    for (var i = dotenv_resolve_tree.length - 1; i >= 0; i--) {
        var relative_path = dotenv_resolve_tree[i];
        // - attempts to load dotenv files at `relative_path` into `process.env`
        var envFile = path.resolve(path.join(path.dirname(module.parent.filename), relative_path, '.env'));
        if (fs.existsSync(envFile)) {
            this.notify.log('  12factor-dotenv:\t', 'loading.. '+envFile);
            env(envFile, { overwrite: true});
        } else {
            this.notify.log('  12factor-dotenv:\t', 'skipped.. '+envFile);
        }  
    };
    var modified_env = JSON.stringify(process.env);

    if (initial_env == modified_env) {
        this.notify.warn('  12factor-dotenv:\t', 'process.env was not modified, check skipped .env file log.');
    }

    // ## Load Config

    if (!this.config) {
        this.config = Config(this.schema);
    }

    // ### return instance of 12factor-config
    return this.config;
}

module.exports = exports = ConfigSchema;