const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const {host, port, user, pass} = require('../config/mail');

var transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
});

transport.use('compile', hbs({
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve('./resources/mail'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./resources/mail'),
    extName: ".html"
    
}));

module.exports = transport;
