const path = require('path');
exports.postUpload = async (req,res) =>{
    try{
        res.send({data:req.file})
    }catch(e){
        console.log('Upload Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
exports.getUpload = async (req,res) => {
    try{
        const {image} = req.params;
        const imagePath = path.join(__dirname, `src/upload/${image}`);
        res.sendFile(imagePath, (err) => {
            if (err) {
                res.status(err.status).end();
            } else {
                console.log('Sent:', imagePath);
            }
        });
    }catch(e){
        console.log('Upload Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}