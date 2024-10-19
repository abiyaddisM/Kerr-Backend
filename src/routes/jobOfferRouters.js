const express = require("express");
const router = express.Router();
const {getJobOffer,postJobOffer,deleteOffer} = require( '../controllers/jobOfferController');

router
    .route('/')
    .get(getJobOffer)
    .post(postJobOffer)

router
    .route('/:id')
    .delete(deleteOffer)
module.exports = router;