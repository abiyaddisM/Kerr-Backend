const express = require("express");
const router = express.Router();
const {getAllJob} = require( '../controllers/jobController.js');

router
    .route('/')
    .get(getAllJob)

module.exports = router;