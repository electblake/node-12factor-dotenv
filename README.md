# 12factor-dotenv

[![Build Status](https://img.shields.io/travis/electblake/node-12factor-dotenv.svg?branch=master)](http://travis-ci.org/docpad/docpad "Check this project's build status on TravisCI")
[![NPM version](https://img.shields.io/npm/v/12factor-dotenv.svg)](https://npmjs.org/package/12factor-dotenv "View this project on NPM")
[![NPM downloads](https://img.shields.io/npm/dm/12factor-dotenv.svg)](https://npmjs.org/package/12factor-dotenv "View this project on NPM")
[![Dependency Status](https://david-dm.org/electblake/12factor-dotenv.svg)](https://david-dm.org/electblake/12factor-dotenv)
<br/>

## Automagically import dotenv files (`.env`)

This module looks for `.env` files loads them with [node-env-file](https://www.npmjs.com/package/node-env-file) and returns a [12factor-config](https://www.npmjs.com/package/12factor-config)

**Features**

* relative to parent module
	* note: Parent module is one that requires 12factor-dotenv
* loads `.env` files in an ascending relative path:
	* `./`
	* `../`
	* `../../`


# install
npm install 12factor-dotenv


# config schema

This module uses 12factor-config to manage a config schema, for more details.
[Learn More](https://www.npmjs.com/package/12factor-config)

# usage

in a single config file (obey 12factor and unify your config location), do something like:

```
// in ./app/lib/config.js

var config = require('12factor-dotenv');

var cfg = config({
	DEBUG: {
		type: 'string',
		default: '*'
	},
	PORT: {
		type: 'integer',
		default: 4000
	},
	PUBLIC_URL: {
		type: 'string'
	},
	NODE_ENV: {
		type: 'string',
		default: 'development'
	}
});

console.log('debug: -- Debug is', process.env.DEBUG);
console.log('debug: -- Port is', process.env.PORT);
console.log('info: -- NODE_ENV is', cfg.NODE_ENV);
console.log('info: < Configured.');

module.exports = cfg;

```

now `var cfg = require('./path/to/app/lib/config.js');` wherever you want your unified config - keep .env(s) updated per environment.