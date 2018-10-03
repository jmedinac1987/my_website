'use strict';

const nodemailer = require("nodemailer");
const configuration = require("../configuration/config");
const email = {};

email.sendEmail = async (req) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: configuration.email, 
            pass: configuration.key 
        }
    });
    let mail_options = {
        from: "Web Site <website@heroku.com>",
        to: configuration.email,
        subject: req.body.asunto,
        text: "Has recibido un mensaje desde el Website, Asunto: " + req.body.asunto + " E-mail: " + req.body.email + " Nombre: " + req.body.name + " Mensaje: " + req.body.content,
        html: "<p>Has recibido un mensaje desde el Website</p><ul><li>Asunto: " + req.body.asunto + "</li><li>E-mail: " + req.body.email + "</li><li>Nombre: " + req.body.name + "</li><li>Mensaje: " + req.body.content + "</li><ul>"
    };
    
    return await transporter.sendMail(mail_options);
};

module.exports = email;