const express = require("express");
const router = express.Router();
const {getPost,postPost,getAllPost} = require( '../controllers/postController');

router
    .route('/')
    .post(postPost)
    .get(getAllPost)

router
    .route('/:id')
    .get(getPost)
module.exports = router;