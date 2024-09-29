const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
router
    .route('/')
    .post(userController.postUser)

router
    .route('/:id')
        .get(userController.getUser)


module.exports =  router;
