const nodemailer = require("nodemailer");
const list_white_server_email = ["gmail", "hotmail", "yahoo", "outlook"];

let email = {};

email.sendEmail = async (req, callback) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "********", //usuario real de gmail
            pass: "********" //contraseña del usuario real
        }
    });
    let mailOptions = {
        from: "Web Site <website@heroku.com>",
        to: "********",
        subject: req.body.asunto,
        text: "Has recibido un mensaje desde el Website, Asunto: " + req.body.asunto + " E-mail: " + req.body.email + " Nombre: " + req.body.name + " Mensaje: " + req.body.content,
        html: "<p>Has recibido un mensaje desde el Website</p><ul><li>Asunto: " + req.body.asunto + "</li><li>E-mail: " + req.body.email + "</li><li>Nombre: " + req.body.name + "</li><li>Mensaje: " + req.body.content + "</li><ul>"
    };
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback(error, {
                status: 500
            });
        } else {
            callback(null, {
                informe: info.response,
                status: 200
            });
        }
    });
};

email.validateEmail = email => {
    let regular_expression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regular_expression.test(email)) {
        let emailString = email.split('@'); //Separa nombre_usuario y servidor+dominio ej ['george', 'google.com']
        let servidor_email = emailString[1].split('.'); //separa servidor y dominio ej ['google', 'com']
        return (list_white_server_email.indexOf(servidor_email[0])) > -1 ? true : false;
    } else {
        return false;
    }
};

module.exports = email;