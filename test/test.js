var assert = require("assert"); // node.js core module
var fs = require('fs');
var Config = require('../index');

var expect = require('chai').expect;

// bootstrap
var testSchema = {
	"DEBUG": {
		"env": "DEBUG",
		"type": "boolean",
		"default": false
	},
	"PORT": {
		"env": "PORT",
		"type": "integer",
		"default": 0
	},
	"URL": {
		"env": "URL",
		"type": "string",
		"default": ""
	}
};

const thisConfig = new Config(testSchema, { debug: false, logger: console, env: { overwrite: true } });

describe('12factor-dotenv', function(){

  before(function() {
    var testENV = ["DEBUG=true", "PORT=5000", "URL=http://github.com/electblake/node-12factor-dotenv"].join("\n");
    fs.writeFileSync('.env', testENV);
  })

  describe('should have property DEBUG boolean', function() {

    it('should be boolean', function(){
      expect(thisConfig.DEBUG).to.be.a('boolean');
    });

  });
  describe('should have property PORT integer', function() {

    it('should be integer', function(){
		expect(thisConfig.PORT).to.be.a('number');
		var isInt = thisConfig.PORT % 1 === 0;
		assert(isInt, 'not an integer:' + thisConfig.PORT);
    });

  });
  describe('should have property URL string', function() {

    it('should be string', function(){
      expect(thisConfig.URL).to.be.a('string');
    });

  });

  after(function(){
      fs.unlinkSync('.env');
  });

});
