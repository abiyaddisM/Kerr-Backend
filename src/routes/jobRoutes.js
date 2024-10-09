const express = require("express");
const router = express.Router();
const {getAllJob,postJob,postJobCompletionRequest,getJobBid} = require( '../controllers/jobController.js');

router
    .route('/')
    .get(getAllJob)
    .post(postJob)

router
    .route('/:id/complete')
    .post(postJobCompletionRequest)

router
    .route('/:id/job-bid')
    .get(getJobBid)

module.exports = router;