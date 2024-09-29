const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http');
const server = http.createServer(app); //
const {initializeSocket} = require('./socketIO');

const io = initializeSocket(server);

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const chatRouter = require('./routes/chatRoutes');
const messageRoute = require('./routes/messageRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/chat',chatRouter);
app.use('/api/v1/message',messageRoute);

module.exports = server;