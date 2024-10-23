const pool = require('../database');
const GlobalData = require('../utils/global');

exports.getChat = async (req,res)=>{
    try{
        const {userID} = req.query;
        const [rows] = await pool.query('CALL sp_GetChat(?)',[userID]);
        for (const row of rows[0]) {
            const isOnline = Object.values(GlobalData.onlineUsers).includes(row.userID);
            row["isOnline"] = isOnline
            console.log(row.userID,isOnline)
        }
        res.status(200).json(rows);

    }catch (error){
        console.log(error)
        res.status(500).json(error);
    }
}
exports.postChat = async (req,res)=>{
    try{
        const {user1ID,user2ID} = req.body;
        const query = 'CALL sp_InsertChat(?,?)';
        const [rows] = await pool.query(query,[user1ID,user2ID]);
        res.status(201).send({data:rows[0]});
   }catch (error){
        res.status(500).json(error);
    }
}
