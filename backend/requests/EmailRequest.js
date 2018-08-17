const Joi = require('joi');
const regular_expression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const list_white_server_email = ["gmail", "hotmail", "yahoo", "outlook"];
const schema = {
    email: Joi.string().regex(regular_expression).email({ minDomainAtoms: 2 }),
    name: Joi.string().min(7).max(30).required(),
    asunto: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(3).required()
}

module.exports = {
    validateEmailRequest: email => {
        return Joi.validate(email, schema);
    },
    validateEmail: email => {        
        if (regular_expression.test(email)) {
            let email_string = email.split('@'); //Separa nombre_usuario y servidor+dominio ej ['george', 'google.com']
            let servidor_email = email_string[1].split('.'); //separa servidor y dominio ej ['google', 'com']
            return (list_white_server_email.indexOf(servidor_email[0])) > -1 ? true : false;
        } else {
            return false;
        }
    }
}