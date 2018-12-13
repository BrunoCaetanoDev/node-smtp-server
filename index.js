const express = require('express');
let xoauth2 = require('xoauth2');
let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');

const PORT = process.env.PORT || 3000;
const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT || 'brunoaccdev@gmail.com';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_OAUTH2_REFRESH_TOKEN = process.env.GOOGLE_OAUTH2_REFRESH_TOKEN;
const SMTP_SERVICE = process.env.SMTP_SERVICE || 'gmail';

let transporter = nodemailer.createTransport(
  smtpTransport(
    {  service: SMTP_SERVICE,
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator(
        {      user: GMAIL_ACCOUNT,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_OAUTH2_REFRESH_TOKEN
        }
      )
    }
  })
);


const mailOptions = {
  from: GMAIL_ACCOUNT, // sender address
  to: GMAIL_ACCOUNT, // list of receivers
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
