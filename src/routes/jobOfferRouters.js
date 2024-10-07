const express = require("express");
const router = express.Router();
const {getJobOffer,postJobOffer} = require( '../controllers/jobOfferController');

router
    .route('/')
    .get(getJobOffer)
    .post(postJobOffer)

module.exports = router;