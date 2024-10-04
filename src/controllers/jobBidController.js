const pool = require('../database');

exports.postJobBid = async (req,res) =>{
    try{
        const {userID,jobID,bidPitch,bidCounterPitch} = req.body;
        const query = 'CALL sp_InsertJobBid(?,?,?,?)';
        const [rows] = await pool.query(query,[userID,jobID,bidPitch,bidCounterPitch]);
        res.status(201).send({message:"Success Creation",jobBidID:rows[0]});
    }catch(e){
        console.log('Job Bid Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
exports.getJobBid = async (req,res) =>{
    try{
        const {userID,type} = req.query;
        let query = ''
        if(type === "sender"){
            query = 'CALL sp_GetJobBid_Receiver(?)'
        }else{
            query = 'CALL sp_GetJobBid_Sender(?)'
        }
        const [rows] = await pool.query(query,[userID]);
        console.log(query)
        res.status(200).send({data:rows[0]});

    }catch(e){
        console.log('Job Bid Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}