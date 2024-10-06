const express = require("express");
const router = express.Router();
const {getAllJob,postJob,postJobCompletionRequest} = require( '../controllers/jobController.js');

router
    .route('/')
    .get(getAllJob)
    .post(postJob)

router
    .route('/:id/complete')
    .post(postJobCompletionRequest)

module.exports = router;