const pool = require('../database');
const encryptionService = require('../services/encryptionService');

exports.name = async (req,res) => {
    try {
    }catch (error){
        res.status(500).json({ error: 'Failed to register user' ,message:error});
    }
}

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params
        const [rows] = await pool.query('CALL sp_GetUserDetails(?)',[id]);

        res.json(rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        return res.status(500).send('Error fetching users');
    }
};


exports.postUser = async (req,res) =>{
    try{
        const {username,password,firstName,lastName,profilePicture,phone,email,gender,location,industry,experience} = req.body;
        const encryptPass = await encryptionService.hashPassword(password);
        const query = 'CALL sp_InsertUser(?,?,?,?,?,?,?,?,?,?,?)'
        await pool.query(query,[username,encryptPass,firstName,lastName,profilePicture,phone,email,gender,location,industry,experience]);
        console.log("Works")
        res.status(201).send("works");
    }catch (error){
        console.log(error)
        res.status(500).json({ error: 'Failed to register user' ,message:error});
    }
}

exports.getUserPost = async (req,res) =>{
    try{
        const {id} = req.params;
        const query = "CALL sp_GetUserPost(?)";
        const [rows] = await pool.query(query,[id]);
        res.status(200).send({data:rows[0]});

    }catch(e){
        console.log('post Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

exports.getUserRating = async (req,res) =>{
    try{
        const {id} = req.params;
        const query = "CALL sp_GeUserRatting(?)";
        const [rows] = await pool.query(query,[id]);
        res.status(200).send({data:rows[0]});
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}
exports.postUserRating = async (req,res) =>{
    try{
        const {userID} = req.params;
        const {jobID,rating,comment} = req.body;
        const query = "CALL sp_InsertUserRatting(?,?,?,?)";
        const [rows] = await pool.query(query,[userID,jobID,rating,comment]);
        res.status(201).send({data:rows[0]});
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}

exports.getAllUserCompleteRequest = async (req,res) =>{
    try{
        const{id} = req.params;
        const query = "CALL sp_GetJobCompletionRequest_Sender(?)";
        const [rows] = await pool.query(query,[id]);
        res.status(200).send({data:rows});
    }catch(e){
        console.log(' Error: ',e);
        res.status(500).send({message:"There was an issue with the server"})
    }
}