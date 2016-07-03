var redis = require("redis");

var client = redis.createClient(6379, '192.168.0.19');

client.on('connect', function() {
    console.log('Connected to REDIS');
});

//function saveProperty(key, property, notExistsCallback){
//    client.exists(key,function(error, exists) {
//        if(error) {
//            console.log('ERROR: ' + error);
//        } else if(exists){
//            console.log('Key already exist ' + key);
//        } else if(!exists) {
//            notExistsCallback(property);
//            var value = client.set(key, JSON.stringify(property));
//            console.log('ddd');
//        };
//    });
//}
function saveProperty(key, property){
    var e = client.exists(key);
    var status = client.set(key, JSON.stringify(property));
    console.log(key + ' ' + status + ' ' + e);
    return status;
}

exports.saveProperty = saveProperty;

