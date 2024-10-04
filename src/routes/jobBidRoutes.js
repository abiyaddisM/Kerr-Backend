const express = require("express");
const router = express.Router();
const {postJobBid,getJobBid} = require( '../controllers/jobBidController');

router
    .route('/')
    .post(postJobBid)
    .get(getJobBid)

module.exports = router;