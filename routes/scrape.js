var express = require('express');
var router = express.Router();
var winston = require('winston');
var config = require('../config/config');
var olxMonitor = require('../pages/olx/olxMonitor');
var otoDomMonitor = require('../pages/otodom/otoDomMonitor');

router.get('/', function(req, res, next) {
    winston.info('Starting to scrape new announcements');
    config.readConfig();
    var olxSettings = config.getSetting('olx').categories[0];
    winston.info('using following data');
    winston.info(olxSettings);
    olxMonitor.getProperties(olxSettings, res);
    //otoDomMonitor.getProperties(olxSettings, res);
});

module.exports = router;