var redis = require("redis");
var bluebird = require("bluebird");
var winston = require("winston");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var client = redis.createClient(6379, '192.168.0.19');

client.on('connect', function() {
    winston.info('Connected to REDIS');
});

function saveProperty(key, property){
    return client.existsAsync(key).then(function(exists) {
        if(exists){
            console.log('Key already exist ' + key);
            return false;
        } else if(!exists) {
            client.set(key, JSON.stringify(property));
            return property;
        };
    });
}
exports.saveProperty = saveProperty;

