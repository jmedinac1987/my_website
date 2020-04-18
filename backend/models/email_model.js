"use strict";

const nodemailer = require("nodemailer");
const configuration = require("../configuration/config");
const email = {};

email.sendEmail = async (req) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    pool: true,
    port: 465,
    secure: true,
    auth: configuration.auth,
  });

  transporter.verify((error, success) => {
    if (error) return console.error(error);
    console.log("Servidor envio correo: ", success);
    transporter.on("token", (token) => {
      console.log("A new access token was generated");
      console.log("User: %s", token.user);
      console.log("Access Token: %s", token.accessToken);
      console.log("Expires: %s", new Date(token.expires));
    });
  });

  let mail_options = {
    from: "Web Site <website@heroku.com>",
    to: configuration.email,
    subject: req.body.asunto,
    text:
      "Has recibido un mensaje desde el Website, Asunto: " +
      req.body.asunto +
      " E-mail: " +
      req.body.email +
      " Nombre: " +
      req.body.name +
      " Mensaje: " +
      req.body.content,
    html:
      "<p>Has recibido un mensaje desde el Website</p><ul><li>Asunto: " +
      req.body.asunto +
      "</li><li>E-mail: " +
      req.body.email +
      "</li><li>Nombre: " +
      req.body.name +
      "</li><li>Mensaje: " +
      req.body.content +
      "</li><ul>",
  };

  return await transporter.sendMail(mail_options);
};

module.exports = email;
