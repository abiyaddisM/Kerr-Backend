const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router
    .route('/')
    .post(messageController.postMessage)
    .get(messageController.getMessage)


module.exports = router