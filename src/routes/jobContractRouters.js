const express = require("express");
const router = express.Router();
const {postJobContract,getJobContract} = require( '../controllers/jobContractController');

router
    .route('/')
    .post(postJobContract)
    .get(getJobContract)

module.exports = router;