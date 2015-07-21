# 12factor-dotenv

[![npm version](https://badge.fury.io/js/12factor-dotenv.svg)](https://npmjs.org/package/12factor-dotenv "View this project on NPM")
[![Build Status](https://img.shields.io/travis/electblake/node-12factor-dotenv.svg?branch=master)](http://travis-ci.org/electblake/node-12factor-dotenv "Check this project's build status on TravisCI")

[![NPM downloads](https://img.shields.io/npm/dm/12factor-dotenv.svg)](https://npmjs.org/package/12factor-dotenv "View this project on NPM")


## Automagically Load Dotenv Files (`.env`)

This module looks for `.env` files loads them with [node-env-file](https://www.npmjs.com/package/node-env-file) and returns a [12factor-config](https://www.npmjs.com/package/12factor-config)

**Features**

* relative to parent module
	* note: Parent module is one that requires 12factor-dotenv
* loads `.env` files in an ascending relative path:
	* `./`
	* `../`
	* `../../`


# Install
`npm install 12factor-dotenv --save`


# Config schema

This module uses 12factor-config to manage a config schema, for configuration support, [Read More Here](https://www.npmjs.com/package/12factor-config)

# Usage

in a single config file (obey 12factor and unify your config location), do something like:

```
// in ./app/lib/config.js

var config = require('12factor-dotenv');

var cfg = config({
	DEBUG: {
		env: 'DEBUG', // the environment export var to read
		type: 'boolean', // config var type (string, integer, boolean - maybe more see 12factor-config)
		default: false
	},
	PORT: {
		env: 'PORT',
		type: 'integer',
		default: 4000
	},
	MY_CUSTOM_VAR: {
		env: 'MY_LOCAL_ENVIRONMENT_EXPORT_VAR',
		type: 'string'
	},
	NODE_ENV: {
		env: 'NODE_ENV',
		type: 'string',
		default: 'development'
	}
}, { debug: true });

console.log('debug: -- Debug is', process.env.DEBUG);
console.log('debug: -- Port is', process.env.PORT);
console.log('info: -- NODE_ENV is', cfg.NODE_ENV);
console.log('info: < Configured.');

module.exports = cfg;

```

now `var cfg = require('./path/to/app/lib/config.js');` wherever you want your unified config - and keep .env(s) updated per environment.

Note!

This package also loads native `process.env` variables, when parsing `.env` files
