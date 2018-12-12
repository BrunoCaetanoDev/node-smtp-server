const express = require('express');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;
const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const SMTP_SERVICE = process.env.SMTP_SERVICE || 'gmail';

let transporter = nodemailer.createTransport({
 service: SMTP_SERVICE,
 port: 465,
 secure: true,
 auth: {
        user: GMAIL_ACCOUNT,
        pass: GMAIL_PASSWORD,
    }
});

const mailOptions = {
  from: 'brunoaccdev@gmail.com', // sender address
  to: 'brunoaccdev@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: 'Sent from express'// plain text body
};

express()
  .post('/send', function (req, res) {
    transporter.sendMail(mailOptions, function (err, info) {
       if(err) {
         console.log(err)
       }
       else {
         console.log(info);
       }
    });
    res.end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
