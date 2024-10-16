const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

exports.postUpload = async (req,res) =>{
    try{
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Paths for saving the original and resized images
        const originalPath = path.join(__dirname, '..', 'upload', 'original', file.filename);
        const compressedPath = path.join(__dirname, '..', 'upload', '600', file.filename);

        // Ensure the directories exist
        const originalDir = path.join(__dirname, '..', 'upload', 'original');
        const compressedDir = path.join(__dirname, '..', 'upload', '600');
        if (!fs.existsSync(originalDir)) {
            fs.mkdirSync(originalDir, { recursive: true });
        }
        if (!fs.existsSync(compressedDir)) {
            fs.mkdirSync(compressedDir, { recursive: true });
        }

        // Move the original file to the original directory
        fs.renameSync(file.path, originalPath);

        // Resize the image to 300px width and save to the compressed directory
        await sharp(originalPath)
            .resize({ width: 600 }) // Resize to 300px width
            .toFile(compressedPath);

        res.send({url: req.file.filename})
        console.log(req.file)
    }catch(e){
        console.log('Upload Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
exports.getUpload = async (req,res) => {
        const {imageName,type} = req.params;
        const imagePath = path.join(__dirname, '../upload',type,imageName);

        res.sendFile(imagePath, err => {
            if (err) {
                console.log(err)
                res.status(404).send('Image not found');
            }
        });
}