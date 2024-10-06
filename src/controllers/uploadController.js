const path = require('path');
exports.postUpload = async (req,res) =>{
    try{
        res.send({url:"https://auth.bizawit.com/api/v1/upload/" + req.file.filename})
        console.log(req.file)
    }catch(e){
        console.log('Upload Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
exports.getUpload = async (req,res) => {
        const {imageName} = req.params;
        const imagePath = path.join(__dirname, '../../upload', imageName);

        res.sendFile(imagePath, err => {
            if (err) {
                console.log(err)
                res.status(404).send('Image not found');
            }
        });
}