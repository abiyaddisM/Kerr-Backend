const pool = require('../database');

exports.postJob = async (req,res) =>{
    try{
        const {userID,jobTitle,jobDescription,jobPrice,jobNegotiation,jobPublic,tag = []} = req.body;
        const query = 'CALL sp_InsertJob(?,?,?,?,?,?)';
        const [rows] = await pool.query(query,[userID,jobTitle,jobDescription,jobPrice,jobNegotiation,jobPublic]);
        for (const t of tag) {
            const query = 'CALL sp_InsertTag(?,?)';
            await pool.query(query,[rows[0][0]['new_job_id'],t]);
        }
        res.status(201).send({jobID:rows[0]});

    }catch(e){
        console.log('Job Error: ',e);
        res.status(500).send({message:"There was an issue with the server"});
    }
}

exports.getJob = async (req,res) =>{
    try{
        const {id} = req.params
        const query = 'CALL sp_GetJob(?)';
        const [rows] = await pool.query(query,[id]);
        res.status(200).send({data:rows[0]})
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
        const {id} = req.params;
        const {userID,image,message} = req.body;
        const query = "CALL sp_InsertJobCompletionRequest(?,?,?,?)";
        const [rows] = await pool.query(query,[userID,id,image,message]);
        res.send({message:"works"}).status(200)
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"});
    }
}
exports.getJobCompletionRequest = async (req,res) =>{
    try{
        const {id} = req.params;
        const query = "CALL sp_GetJobCompletionRequest_Receivers(?)";
        const [rows] = await pool.query(query,[id]);
        res.send({data:rows[0]}).status(200)
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"});
    }
}
exports.deleteJobCompletionRequest = async (req,res) =>{
    try{
        const {id} = req.params;
        const query = "CALL sp_DeleteJobCompletionRequest (?)";
        const [rows] = await pool.query(query,[id]);
        res.send({data:rows[0]}).status(200)
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

exports.postJobContract = async (req,res) =>{
    try{
        const {id} = req.params;
        const {clientID,freelanceID,price = -1} = req.body;
        const query = "CALL sp_InsertJobContract(?,?,?,?)";
        const [rows] = await pool.query(query,[clientID,freelanceID,id,price]);
        res.status(201).send({data:rows[0]});
    }catch(e){
        console.log('Job Contract Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}


exports.finishJob = async (req,res) =>{
    try{
        const {id} = req.params;
        const query = "CALL sp_UpdateJob(?)";
        await pool.query(query,[id]);
        res.send({message: "Updated Successfully"})
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
exports.deleteJob = async (req, res) => {
    try{
        const {id} = req.params;
        const query = "CALL sp_DeleteJob(?)";
        await pool.query(query, [id])
        res.status(200).send({message:"Job deleted"});
    }
    catch (e) {
        console.log('Job not deleted', e)
        res.status(500).send({message: "There was an issue with the server"})
    }
}