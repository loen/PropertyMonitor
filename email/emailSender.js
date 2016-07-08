var nodemailer = require('nodemailer');
var winston = require('winston');
var config = require('../config/config');

var emailConf = config.getSetting('email');

var transporter =
    nodemailer.createTransport('smtps://' + emailConf.email + ':' + emailConf.email_password + '@smtp.gmail.com');

function sendMail(payload){
    var mailOptions = {
        from: emailConf.from,
        to: emailConf.recipients,
        subject: emailConf.subject,
        html: payload
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return winston.error(error);
        }
        winston.info('Message sent: ' + info.response);
    });
}

exports.sendMail = sendMail;