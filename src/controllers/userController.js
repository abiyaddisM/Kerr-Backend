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
        const id = req.params.id
        const [rows] = await pool.query('CALL sp_GetUserDetails(?)',[id]);

        res.json(rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        return res.status(500).send('Error fetching users');
    }
};


exports.postUser = async (req,res) =>{
    try{
        const {username,password,firstName,middleName,lastName,profilePicture} = req.body;
        const encryptPass = await encryptionService.hashPassword(password);
        const query = 'CALL sp_InsertUser(?,?,?,?,?,?)'
        await pool.query(query,[username,encryptPass,firstName,middleName,lastName,profilePicture]);
        res.status(201).send("works");
    }catch (error){
        res.status(500).json({ error: 'Failed to register user' ,message:error});
    }
}

