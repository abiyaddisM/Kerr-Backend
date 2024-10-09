const pool = require('../database');

exports.postJob = async (req,res) =>{
    try{
        const {userID,jobTitle,jobDescription,jobPrice,jobNegotiation,jobPublic} = req.body;
        const query = 'CALL sp_InsertJob(?,?,?,?,?,?)';
        const [rows] = await pool.query(query,[userID,jobTitle,jobDescription,jobPrice,jobNegotiation,jobPublic]);
        res.status(201).send({jobID:rows[0]});

    }catch(e){
        console.log('Job Error: ',e);
        res.status(500).send({message:"There was an issue with the server"});
    }
}

exports.getJob = async (req,res) =>{
    try{
        const {id} = req.params
        const query = 'CALL sp_GetJobs(?)';
        const [rows] = await pool.query(query,[id]);
        res.send({data:rows[0]})
    }catch (error) {
        console.log(error)
        res.status(500).send({message:"error from the server"});
    }
}
exports.getAllJob = async (req,res) =>{
    try{
        const {search = '',rating = 0,rate = 0} = req.params;
        const query = 'CALL sp_GetAllJobs()';
        const result = await pool.query(query,);
        res.send(result[0])

    }catch (error) {
        console.log(error)
        res.status(500).send({message:"error from the server"});
    }
}
exports.postJobCompletionRequest = async (req,res) =>{
    try{
        const {jobID} = req.params;
        const {userID} = req.body;
        const query = "CALL sp_InsertJobCompletionRequest(?,?)";
        const [rows] = await pool.query(query,[userID,jobID]);
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"});
    }
}

exports.getJobBid = async (req,res) =>{
    try{
        const {id} = req.params;
        let query = 'CALL sp_GetJobBid_Receiver(?)'
        const [rows] = await pool.query(query,[id]);
        res.status(200).send({data:rows[0]});
    }catch(e){
        console.log('Job Bid Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

exports.getJobOffer = async (req,res) =>{
    try{
        const {id} = req.params;
        let query = 'CALL sp_GetJobOffer_Sender(?)'
        const [rows] = await pool.query(query,[id]);
        res.status(200).send({data:rows[0]});

    }catch(e){
        console.log('Job Bid Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}