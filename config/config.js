var fs = require('fs');
var winston = require('winston');

var config;

function readConfig(){
    config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    winston.info('Use following config:');
    winston.info(JSON.stringify(config));
    return config;
}

function getSetting(name){
    return config[name];
}

exports.readConfig = readConfig;
exports.getSetting = getSetting;