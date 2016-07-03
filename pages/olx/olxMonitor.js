var request = require('request');
var cheerio = require('cheerio');
var dao = require('../../dao/redisDao');

var OLX_KEY='OLX';

function getProperties(url, res){

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var newProperties = [];
            var len = $('#offers_table').find('td.offer').length;
            $('#offers_table').find('td.offer').each(function(i,elem){
                var property = { id: '', name: '', url: ''};
                property.id = $(elem).find('table').attr('data-id');
                property.name = $(elem).find('h3 strong').text();
                property.url = $(elem).find('h3 a').attr('href');
                if(dao.saveProperty(OLX_KEY+ '-' + property.id, property)){
                    newProperties.push(property);
                }
            });
            res.send(newProperties);
        }
    });
}

exports.getProperties = getProperties;