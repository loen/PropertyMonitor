var express = require('express');
var router = express.Router();
var olxMonitor = require('../pages/olx/olxMonitor');


router.get('/', function(req, res, next) {
    var olxSettings = {
        url: 'http://olx.pl/nieruchomosci/mieszkania/sprzedaz/krakow/?search%5Bdistrict_id%5D=261',
        description: 'Mieszkania Kraków Dębniki'
    };
    olxMonitor.getProperties(olxSettings, res);
    res.send('OK');
});

module.exports = router;