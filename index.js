const http = require('http');
const nodemailer = require('nodemailer');
const express = require('express');

const PORT = process.env.PORT || 3000;
const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;


let transporter = nodemailer.createTransport({
 service: 'gmail',
 host: 'smtp.gmail.com',
 auth: {
        user: GMAIL_ACCOUNT,
        pass: GMAIL_PASSWORD,
    }
});

express()
  .post('/sendMail', function (req, res) {
    console.log("You were redirected from: " + req.headers.origin);
    console.log("You were redirected from: " + GMAIL_ACCOUNT);


    transporter.sendMail(mailOptions, function (err, info) {

       if(err) {
         res.statusCode = 500;
         console.log(err)
       }
       else {
         res.writeHead(200);
         console.log(info);
       }
    });

    res.end();

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const mailOptions = {
  from: 'brunoaccdev@gmail.com', // sender address
  to: 'brunoaccdev@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: 'Sent from express'// plain text body
};
