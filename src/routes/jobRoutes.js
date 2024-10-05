const express = require("express");
const router = express.Router();
const {getAllJob,postJob} = require( '../controllers/jobController.js');

router
    .route('/')
    .get(getAllJob)
    .post(postJob)

module.exports = router;