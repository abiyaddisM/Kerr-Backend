const pool = require("../database")

exports.postGallery = async (req,res) =>{
    try{
        const {userID,postID} = req.body;
        const query = "CALL sp_InsertGallery(?,?)";
        const [rows] = await pool.query(query,[userID,postID]);
        res.status(201).send({saveID:rows[0]})
    }catch(e){
        console.log('Gallery Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
exports.getGallery = async (req,res) =>{
    try{
        const {id} = req.params;
        const {page} = req.query;
        const query = "CALL sp_GetGallery(?,?)";
        const [rows] = await pool.query(query,[id,page]);
        res.status(200).send({data:rows[0]});
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

