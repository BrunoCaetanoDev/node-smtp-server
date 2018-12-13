const express = require('express');
let xoauth2 = require('xoauth2');
let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
let bodyParser = require("body-parser");
let cors = require("cors");

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
        {
          user: GMAIL_ACCOUNT,
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          refreshToken: GOOGLE_OAUTH2_REFRESH_TOKEN
        }
      )
    }
  })
);


let mailOptions = {
  from: GMAIL_ACCOUNT, // sender address
  to: GMAIL_ACCOUNT, // list of receivers
  subject: '', // Subject line
  html: ''// plain text body
};

express()
  .use(bodyParser.json())
  .use(cors)
  .options('/send', cors())
  .post('/send', function (req, res) {

    mailOptions.subject = req.body.name + " | " + req.body.company + " | " + req.body.subject;
    mailOptions.html = req.body.body;

    console.log("Sending email...");
    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (err, info) {

       if(err) {
         console.log(err);
         res.status(500);
         res.send('Error sending email to recipients.');
       }
       else {
         console.log(info);
         res.status(200);
         res.send('Email sent to recipients.');
       }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
