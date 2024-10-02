const pool = require('../database');

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