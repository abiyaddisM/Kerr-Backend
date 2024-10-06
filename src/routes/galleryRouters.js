
const express = require("express");
const router = express.Router();
const {postGallery,getGallery} = require( '../controllers/galleryController');

router
    .route('/')
    .post(postGallery)

router
    .route('/:id')
    .get(getGallery)
module.exports = router;