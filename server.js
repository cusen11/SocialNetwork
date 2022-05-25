const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); 

const app = express();
//connect DB
connectDB();

//Init Midderware

app.use(express.json({ extended: false })); 


//Define Route

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth')); 
app.use('/api/conversation', require('./routes/api/conversation')); 
app.use('/api/message', require('./routes/api/message')); 

// server static assets in production 

if(process.env.NODE_ENV === 'production'){
    // set statuc folder
    app.use(express.static('client/build'))
    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=> console.log(`Server start on PORT ${PORT}`))

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin: 'http://localhost:3000' 
    }
})
let users =[]
const addUser = (data,socketId) => {
    !users.some(user => user.userId === data._id) && users.push({data, socketId});
}
const removeUser = (data) => { 
    item = users.map((user) => {return user.userId}).indexOf(data._id); 
    users.splice(item, 1);
}
io.on('connection', (socket)=>{  
    //setup user login
    socket.on('setup',(data)=>{ 
        socket.join(data._id) 
        addUser(data,socket.id)
        io.emit('getUser', users)
        //disconnect user
        socket.on('disconnect' , ()=> {
            removeUser(data)
            io.emit('getUser', users)
        })
        
    }) 
    socket.on('client-send-data',(data)=>{ 
        
        io.emit('server-send-data',data)  
        io.in(data.dataUser._id).emit('server-send-data-room',data.dataText)
    })  
    

}) 