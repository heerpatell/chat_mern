const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io')

const app = express();

//for post & put req
app.use(express.urlencoded({extended:false})) //inbuilt method to recognize the incoming Request Object as strings or arrays
app.use(express.json()); //recognize the incoming Request Object as a JSON Object

require('dotenv').config();

const userRoutes = require('./routes/userRoute')
const msgRoutes = require('./routes/messageRoute')

//midleware - methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
})); 

app.use('/api/auth', userRoutes)
app.use('/api/msg' , msgRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('mongodb atlas connected succesfully');
}).catch((e)=>{
    console.log(e.message);
})

const server =  app.listen(process.env.PORT,()=>{
    console.log('server is live on port ',process.env.PORT);
})

const io = socket(server,{
    cors:{
        origin: 'http://localhost:3000',
        credentials:true,
    }
})

global.onlineUsers = new Map();

io.on('connection',(socket)=>{
    global.chatSocket = socket;
    socket.on('add-user',(userid)=>{
        onlineUsers.set(userid,socket.id)
    })

    socket.on('send-msg',(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve',data.msg)
        }
    })
})