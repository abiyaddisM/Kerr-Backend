const express = require("express");
const router = express.Router();
const {postJobBid,getJobBid,deleteBid} = require( '../controllers/jobBidController');

router
    .route('/')
    .post(postJobBid)
    .get(getJobBid)

router
    .route('/:id')
    .delete(deleteBid)
module.exports = router;