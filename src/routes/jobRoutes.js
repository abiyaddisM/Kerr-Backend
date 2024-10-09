const express = require("express");
const router = express.Router();
const {getJob,getAllJob,postJob,postJobCompletionRequest,getJobBid,getJobOffer} = require( '../controllers/jobController.js');

router
    .route('/')
    .get(getAllJob)
    .post(postJob)

router
    .route('/id')
    .get(getJob)


router
    .route('/:id/complete')
    .post(postJobCompletionRequest)

router
    .route('/:id/job-bid')
    .get(getJobBid)

router
    .route('/:id/job-offer')
    .get(getJobOffer)

module.exports = router;