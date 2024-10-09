const pool = require('../database');


exports.postJobOffer = async (req,res) =>{
    try{
        const {userID,jobID} = req.body;
        const query = 'CALL sp_InsertJobOffer(?,?)';
        const [rows] = await pool.query(query,[userID,jobID]);
        res.status(201).send({message:"Success Creation",jobOfferID:rows[0]});
    }catch(e){
        console.log('Job Offer Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

exports.getJobOffer = async (req,res) =>{
    try{
        const {userID} = req.query;
        let query = 'CALL sp_GetJobOffer_Receiver(?)'
        const [rows] = await pool.query(query,[userID]);
        res.status(200).send({data:rows[0]});

    }catch(e){
        console.log('Job Bid Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}