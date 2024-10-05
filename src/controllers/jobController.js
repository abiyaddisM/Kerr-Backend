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