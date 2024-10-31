const pool = require('../database');


exports.getJobContract = async (req,res) =>{
    try{
        const {userID,page} = req.query
        const query = "CALL sp_GetJobContract(?,?)";
        const [rows] = await pool.query(query,[userID,(page - 1) * 20])
        res.status(200).send({data:rows[0]});

    }catch(e){
        console.log('Job Contract Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

exports.postJobContract = async (req,res) =>{
    try{
        const {userID,page} = req.query
        const query = "CALL sp_GetJobContract(?,?)";
        const [rows] = await pool.query(query,[userID,(page - 1) * 20])
        res.status(200).send({data:rows[0]});

    }catch(e){
        console.log('Job Contract Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
