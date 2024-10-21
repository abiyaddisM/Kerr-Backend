const express = require("express");
const router = express.Router();
const {searchUser, searchJob, searchPost} = require( '../controllers/searchController');


router
    .route('/user')
    .get(searchUser)


router
    .route('/job')
    .get(searchJob)

router
    .route('/post')
    .get(searchPost)


module.exports = router;