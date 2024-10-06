const express = require("express");
const router = express.Router();
const {postUser,getUser,getUserPost,getUserRating,postUserRating,getAllUserCompleteRequest} = require('../controllers/userController')
router
    .route('/')
    .post(postUser)

router
    .route('/:id')
    .get(getUser)

router
    .route('/:id/post')
    .get(getUserPost)

router
    .route('/:id/rating')
    .get(getUserRating)

router
    .route('/rating')
    .post(postUserRating)

router
    .route('/:id/complete')
    .get(getAllUserCompleteRequest)
module.exports =  router;
