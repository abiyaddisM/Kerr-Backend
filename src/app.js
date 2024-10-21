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
const messageRouter = require('./routes/messageRoutes');
const jobRouter = require('./routes/jobRoutes')
const jobBidRouter = require('./routes/jobBidRoutes')
const jobOfferRouter = require('./routes/jobOfferRouters')
const jobContractRouter = require('./routes/jobContractRouters')
const uploadRouter = require('./routes/uploadRouters')
const postRouter = require('./routes/postRouters')
const galleryRouter = require('./routes/galleryRouters')
const searchRouter = require('./routes/searchRoutes')

app.use(cors());
app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/chat',chatRouter);
app.use('/api/v1/message',messageRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/job-bid',jobBidRouter);
app.use('/api/v1/job-offer',jobOfferRouter);
app.use('/api/v1/job-contract',jobContractRouter);
app.use('/api/v1/upload',uploadRouter);
app.use('/api/v1/post',postRouter);
app.use('/api/v1/gallery',galleryRouter);
app.use('/api/v1/search',searchRouter);



module.exports = server;