"use strict";

const express = require("express");
const router = express.Router();
const SendEmailController = require("../controller/SendEmailController");

router.post("/send", SendEmailController.sendEmail)

module.exports = router;
