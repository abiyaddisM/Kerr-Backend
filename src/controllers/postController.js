const pool = require("../database")
exports.getPost = async (req,res) =>{
    try{
        const {id} = req.params;
        const query = "CALL sp_GetPost(?)";
        const [rows] = await pool.query(query,[id]);
        res.status(200).send({data:rows[0]});

    }catch(e){
        console.log('post Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

exports.postPost = async (req,res) =>{
    try{
        const {userId, postTitle, postCaption, postThumbnail, postImage} = req.body;
        const query = "CALL sp_InsertPost(?,?,?,?,?)";
        const [rows] = await pool.query(query,[userId, postTitle, postCaption, postThumbnail, JSON.stringify(postImage)]);
        res.status(201).send({postID:rows[0]});
    }catch(e){
        console.log('Post Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

exports.getAllPost = async (req,res) =>{
    try{
        const {page} = req.query;
        const query = "CALL sp_GetAllPost(?)";
        const [rows] = await pool.query(query,[(page - 1) * 40]);
        res.status(200).send({data:rows[0]});
    }catch(e){
        console.log('Post Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

exports.updatePostView = async (req,res) =>{
    try{
        const {id} = req.params;
        const query = "CALL sp_UpdateView(?)";
        await pool.query(query,[id]);
        res.status(200).send({message:"Success"});
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}