var express = require('express');
var router = express.Router();
var winston = require('winston');
var config = require('../config/config');
var olxMonitor = require('../pages/olx/olxMonitor');
var otoDomMonitor = require('../pages/otodom/otoDomMonitor');
var _ = require('underscore');
var Promise = require('bluebird');

router.get('/', function(req, res, next) {
    winston.info('Starting to scrape new announcements');
    config.readConfig();
    var results = [];
    var olxSettings = config.getSetting('olx').categories[0];
    winston.info('using following data');
    winston.info(olxSettings);
    results.push(olxMonitor.getProperties(olxSettings));
    var otoDomSettings = config.getSetting('otodom').categories;
    _.each(otoDomSettings, function(otoDomSetting){
        winston.info('using following data for oto dom');
        winston.info(otoDomSetting);
        results.push(otoDomMonitor.getProperties(otoDomSetting));
    });

    Promise.all(results).then(function(result){
        var allResults = result.filter(function(elem){
            return elem;
        });

        res.send(allResults);
    });

});

module.exports = router;