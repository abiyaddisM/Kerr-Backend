const pool = require('../database');
const encryptionService = require('../services/encryptionService');
const jwt = require('jsonwebtoken');

exports.authUser = async (req,res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }


        const query = 'CALL sp_GetUserPassword(?)';

        const [results] = await pool.query(query, [username]);

            if (results[0].length === 0) {
                return res.status(401).json({ message: 'Invalid username' });
            }

            const user = results[0][0];

            const isMatch = await encryptionService.comparePassword(password,user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid Password' });
            }

            const payload = {
                user: {
                    id: user.id,
                    username: user.username,
                    profile_picture:user.profile_picture
                }
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            res.json({ token });
    }catch (error){
        console.log(error)
        res.status(500).json({ error: 'Issue On The Server Side' ,message:error.message});
    }
}
