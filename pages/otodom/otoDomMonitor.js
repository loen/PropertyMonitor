var rp = require('request-promise');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var winston = require('winston');
var dao = require('../../dao/redisDao');
var email = require('../../email/emailSender');

var OTO_DOM_KEY='OTO_DOM';
var PAGE_TAG = '&page=';

var options = {
    uri: 'https://otodom.pl/sprzedaz/mieszkanie/krakow/?search%5Bfilter_float_price%3Afrom%5D=50000&search%5Bfilter_float_price%3Ato%5D=600000&search%5Bfilter_float_m%3Afrom%5D=50&search%5Bfilter_float_m%3Ato%5D=80&search%5Bfilter_enum_rooms_num%5D%5B0%5D=3&search%5Bfilter_enum_rooms_num%5D%5B1%5D=4&search%5Bfilter_enum_rooms_num%5D%5B2%5D=5&search%5Bfilter_enum_rooms_num%5D%5B3%5D=6&search%5Bfilter_enum_rooms_num%5D%5B4%5D=7&search%5Bdescription%5D=1&search%5Bdist%5D=0&search%5Bdistrict_id%5D=57&nrAdsPerPage=72',
    transform: function (body) {
        return cheerio.load(body);
    }
};


function getProperties(olxSettings, res){

    var promise = rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            var numOfSites = $('#pagerForm').find('ul.pager').find('strong.current').text();
            winston.info('Oto Dom found %s sites ', numOfSites);
            winston.info('Start to scrape them all...');
            return true;
        })
        .catch(function (err) {
           winston.error('error during scraping OTO DOM');
           winston.error(err);
           return false;
        });

    promise.then(function(r) {
        res.send("OK");
    });
}

exports.getProperties = getProperties;
