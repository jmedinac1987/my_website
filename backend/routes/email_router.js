const express = require("express");
const router = express.Router();
const email_model = require("../models/email_model");

router.post('/send', (req, res) => {
    if (email_model.validateEmail(req.body.email)) {
        email_model.sendEmail(req, async (error, data) => {
            if (data.status === 200) {
                await res.status(200).json({
                    success: true,
                    message: "OK, si los datos son correctos nos comunicaremos vía email :D"
                });
            }
            if (error) {
                await res.status(500).json({
                    error: error,
                    success: false,
                    message: "Lo sentimos no fue posible enviar su mensaje :("
                });
            }
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Lo sentimos :S, por favor suministre una cuenta email valida"
        });
    }
});

module.exports = router;