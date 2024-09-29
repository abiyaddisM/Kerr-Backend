const pool = require('../database');
exports.getChat = async (req,res)=>{
    try{
        const {userID} = req.query;
        const [rows] = await pool.query('CALL sp_GetChat(?)',[userID]);
        res.status(200).json(rows);

    }catch (error){
        res.status(500).json(error);
    }
}
exports.postChat = async (req,res)=>{
    try{
        const {user1ID,user2ID} = req.body;
        const query = 'CALL sp_InsertChat(?,?)';
        await pool.query(query,[user1ID,user2ID]);
        res.status(201).send("Created");
   }catch (error){
        res.status(500).json(error);
    }
}
