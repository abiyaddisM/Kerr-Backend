const express = require("express");
const path = require('path');
const router = express.Router();
const {postUpload,getUpload} = require( '../controllers/uploadController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function (req,file,cb){

        cb(null,'upload')
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null,uniqueSuffix + '-' + file.originalname );
    }
})
const upload = multer({storage});
router
    .route('/')
    .post(upload.single('file'),postUpload)

router
    .route('/:imageName')
    .get(getUpload)
module.exports = router;