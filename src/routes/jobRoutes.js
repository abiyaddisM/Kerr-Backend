const express = require("express");
const router = express.Router();
const {getJob,getAllJob,deleteJobCompletionRequest,postJob,deleteJob,postJobCompletionRequest,getJobBid,getJobOffer,postJobContract,getJobCompletionRequest,finishJob} = require( '../controllers/jobController.js');

router
    .route('/')
    .get(getAllJob)
    .post(postJob)

router
    .route('/:id')
    .get(getJob)
    .delete(deleteJob)

router
    .route('/:id/job-contract')
    .post(postJobContract)
router
    .route('/:id/complete')
    .post(postJobCompletionRequest)
    .get(getJobCompletionRequest)
    .delete(deleteJobCompletionRequest)

router
    .route('/:id/finish')
    .put(finishJob)
router
    .route('/:id/job-bid')
    .get(getJobBid)



router
    .route('/:id/job-offer')
    .get(getJobOffer)

module.exports = router;