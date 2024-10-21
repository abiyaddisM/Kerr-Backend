const express = require("express");
const router = express.Router();
const {getPost,postPost,getAllPost,updatePostView,deletePost} = require( '../controllers/postController');

router
    .route('/')
    .post(postPost)
    .get(getAllPost)

router
    .route('/:id')
    .get(getPost)
    .delete(deletePost)
router
    .route('/:id/view')
    .patch(updatePostView)

module.exports = router;