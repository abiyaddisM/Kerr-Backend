
const express = require("express");
const router = express.Router();
const {postGallery,getGallery,deleteGallery} = require( '../controllers/galleryController');

router
    .route('/')
    .post(postGallery)

router
    .route('/:id')
    .get(getGallery)
    .delete(deleteGallery)
module.exports = router;