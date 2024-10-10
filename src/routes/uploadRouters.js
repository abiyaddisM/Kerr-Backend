const express = require("express");
const path = require('path');
const router = express.Router();
const {postUpload,getUpload} = require( '../controllers/uploadController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            const uploadPath = path.join(__dirname, '..', 'upload');

            // Check if the directory exists, if not, create it
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true }); // create directory if it doesn't exist
            }

            cb(null, uploadPath);
        } catch (err) {
            // If there's an error, pass it to the callback to be handled
            console.error('Error in destination function:', err);
            cb(new Error('Could not determine upload destination.'));
        }
    },
    filename: function (req, file, cb) {
        try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = path.extname(file.originalname) || '.png'; // Ensure the correct extension
            cb(null, uniqueSuffix + extension);
        } catch (err) {
            // If there's an error, pass it to the callback to be handled
            console.error('Error in filename function:', err);
            cb(new Error('Could not generate a unique filename.'));
        }
    }
});
const upload = multer({storage:storage,limits: { fileSize: Infinity }});
router
    .route('/')
    .post(upload.single('file'),postUpload)

router
    .route('/:imageName')
    .get(getUpload)
module.exports = router;