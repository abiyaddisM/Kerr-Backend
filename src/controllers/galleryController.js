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

exports.deleteGallery = async (req, res) => {
    try{
        const {id} = req.params;
        const postID = req.query.postID

        if(!id || !postID){
            return res.status(500).send({message:"parameter not valid"})
        }
        const query = "CALL sp_DeleteGallery(?, ?)"
        await pool.query(query, [id, postID])
        console.log(postID)
        res.status(200).send({message:"Post deleted"} );
    }
    catch (e) {
        console.log('Post not deleted', e)
        res.status(500).send({message: "There was an issue with the server"})

    }
}