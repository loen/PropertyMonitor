var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var winston = require('winston');
var dao = require('../../dao/redisDao');
var email = require('../../email/emailSender');

var OLX_KEY='OLX';

function getProperties(olxSettings, res){

    request(olxSettings.url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var promises = [];
            var len = $('#offers_table').find('td.offer').length;
            winston.info('items count:' +  len);
            $('#offers_table').find('td.offer').each(function(i,elem){
                var property = { id: '', name: '', url: ''};
                property.id = $(elem).find('table').attr('data-id');
                property.name = $(elem).find('h3 strong').text();
                property.url = $(elem).find('h3 a').attr('href');
                var promise = dao.saveProperty(OLX_KEY+ '-' + property.id, property);
                promises.push(promise);
            });

            Promise.all(promises).then(function(results){
                var newProperties = results.filter(function(elem){
                    return elem;
                });
                var report = email.prepareReport(newProperties, olxSettings.description);
                winston.info("We've found following announcements: " + report);
                email.sendMail(report);
                res.send(newProperties);
            });
        }
    });
}


exports.getProperties = getProperties;