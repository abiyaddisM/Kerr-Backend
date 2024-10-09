const pool = require('../database');

exports.postJobBid = async (req,res) =>{
    try{
        const {userID,jobID,bidPitch,bidCounterPrice} = req.body;
        const query = 'CALL sp_InsertJobBid(?,?,?,?)';
        const [rows] = await pool.query(query,[userID,jobID,bidPitch,bidCounterPrice]);
        res.status(201).send({message:"Success Creation",jobBidID:rows[0]});
    }catch(e){
        console.log('Job Bid Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
exports.getJobBid = async (req,res) =>{
    try{
        const {userID} = req.query;
        let query = 'CALL sp_GetJobBid_Sender(?)'
        const [rows] = await pool.query(query,[userID]);
        res.status(200).send({data:rows[0]});

    }catch(e){
        console.log('Job Bid Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}