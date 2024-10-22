const pool = require('../database');
const {getIO} = require('../socketIO');

exports.getMessage = async (req,res)=>{
    try{
        const {chatID,page} = req.query;
        const offset = (page - 1) * 30
        const [rows] = await pool.query('CALL sp_GetMessage(?,?)',[chatID,offset]);
        res.status(200).json(rows[0].reverse());
    }catch (error){
        console.log(error)
        res.status(500).json(error);
    }
}
exports.postMessage = async (req, res) => {
    try {
        const io = getIO();
        const { userID, chatID, messageText, messageImage, messageType } = req.body;

        const query = 'CALL sp_InsertMessage(?,?,?,?,?, @insertedMessageID, @otherUserID, @timestamp)';
        await pool.query(query, [userID, chatID, messageText, JSON.stringify(messageImage), messageType]);

        const [rows] = await pool.query('SELECT @insertedMessageID AS messageID, @otherUserID AS otherUserID, @timestamp AS timestamp');

        const newMessage = {
            id: rows[0].messageID,
            user_id: userID,
            chat_id: chatID,
            message_text: messageText,
            message_image: messageImage,
            messageType,
            created_at: rows[0].timestamp  // Use the returned timestamp
        };

        console.log("Rows returned: ", rows);

        // Emit the message to the other user via Socket.IO
        io.to(rows[0].otherUserID).emit('message', newMessage);

        // Send success response
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
