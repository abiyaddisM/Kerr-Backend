const express = require("express");
const router = express.Router();
const {getJobContract} = require( '../controllers/jobContractController');

router
    .route('/')
    .get(getJobContract)

module.exports = router;