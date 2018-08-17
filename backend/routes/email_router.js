const express = require("express");
const router = express.Router();
const email_model = require("../models/email_model");
const EmailRequest = require('../requests/EmailRequest');
const message_email_default = {
    success: false,
    message: "Lo sentimos :S, por favor suministre una cuenta e-mail valida"
};

router.post('/send', (req, res) => {
    
    const {error} = EmailRequest.validateEmailRequest(req.body);
    if(error){
        if(!EmailRequest.validateEmail(req.body.email)){
           return res.status(400).json(message_email_default);
        }else{        
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });        
        }
    } else {        
        if(!EmailRequest.validateEmail(req.body.email)){
            return res.status(400).json(message_email_default);
        }else{
            email_model.sendEmail(req, async (error, data) => {
                if (data.status === 200) {
                   return await res.status(200).json({
                        success: true,
                        message: "OK, si los datos son correctos nos comunicaremos vía e-mail :D"
                    });
                }
                if (error) {
                   return await res.status(500).json({
                        error: error,
                        success: false,
                        message: "Lo sentimos no fue posible enviar su mensaje :("
                    });
                }
            });
        }    
    }
});

module.exports = router;