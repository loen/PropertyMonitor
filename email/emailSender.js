var nodemailer = require('nodemailer');

var email = process.env.EMAIL;
var password = process.env.EMAIL_PASSWORD;

var transporter = nodemailer.createTransport('smtps://' + email + ':' + password + '@smtp.gmail.com');

function sendMail(payload){
    var mailOptions = {
        from: 'Real estate <propkrakow@gmail.com>',
        to: 'andrzej.pozlutko@gmail.com',
        subject: 'Hej Ho Mamy nowe oferty',
        html: payload
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

exports.sendMail = sendMail;