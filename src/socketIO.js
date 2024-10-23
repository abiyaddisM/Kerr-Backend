const socketIo = require('socket.io');

let io;
const onlineUsers = {};
exports.initializeSocket  = (server)=>{
     io = socketIo(server, {
        cors: {
            origin: '*', // Allow all origins for testing purposes
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('sdsd')

        socket.on('set room',(room)=>{
            socket.join(room)
            console.log(room)
        })

        socket.on('online',({room,id})=>{
            onlineUsers[socket.id] = id
            socket.join(room)
            io.to(room).emit('online',{online:true,userID:id});
            console.log(room, "Has joined and is Online")
        })

        socket.on('joinOnlineRoom',({room})=>{
            socket.join(room)
            console.log(room, "Someone has joined To see you")
        })

        socket.on('disconnect', () => {
            const userID = onlineUsers[socket.id]; // Get user ID from the mapping
            if (userID) {
                // Optionally, you can find the room here if you need to notify specific rooms
                const room = Object.keys(socket.rooms).find(r => r !== socket.id);
                io.to('online-' + room).emit('online', { online: false, userID }); // Notify others that the user has gone offline
                delete onlineUsers[socket.id]; // Remove the user from the online list
                console.log('User disconnected:', userID);
            } else {
                console.log('User disconnected without a registered ID');
            }
        });
    });

    return io

}
exports.getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};
