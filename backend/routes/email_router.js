"use strict";

const express = require("express");
const router = express.Router();
const email_model = require("../models/email_model");
const EmailRequest = require("../requests/EmailRequest");
const message_email_default = {
  success: false,
  message: "Lo sentimos :S, por favor suministre una cuenta e-mail valida"
};

router.post("/send", async (req, res) => {
  const { error } = EmailRequest.validateEmailRequest(req.body);

  if (error) {
    if (!EmailRequest.validateEmail(req.body.email)) {
        faliedResponse400(res, message_email_default);
    } else {
        faliedResponse400(res, error.details[0].message);        
    }
  } else {
    if (!EmailRequest.validateEmail(req.body.email)) {
        faliedResponse400(res, message_email_default);
    } else {
      email_model
        .sendEmail(req)
        .then(respuesta => {
          successResponse(res);
        })
        .catch(error => {
          faliedResponse(res, error);
        });
    }
  }
});

function successResponse(res) {
  return res.status(200).send({
    message:
      "OK, si los datos son correctos nos comunicaremos vía e-mail :D"
  });
}

function faliedResponse400(res, error) {
  return res
    .status(400)
    .send({ message: error });
}

function faliedResponse(res, error) {
  return res
    .status(500)
    .send({ message: `Error al realizar la petición: ${error}` });
}

module.exports = router;
