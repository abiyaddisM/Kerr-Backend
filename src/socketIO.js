const socketIo = require('socket.io');

let io;

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

        socket.on('online',(room)=>{
            socket.join(room)
            io.to(room).emit('online',{online:true});
        })

        socket.on('disconnect', () => {
            console.log('User disconnected');
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
