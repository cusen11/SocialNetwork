const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const Socket = require('./models/Socket');

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
io.on('connection', (socket)=>{  
    socket.on('setup',async(data)=>{ 
        socket.join(data._id)
        // push user login to mongoose
        try {  
            const data = {
                listUser:{
                    data
            }}
            const userExist = await Socket.find();
            // UserSocket.unshift(data) 
            // await UserSocket.save() 
            console.log({userExist})
            // if(!userExist){
            //     UserSocket.listUser.push(data) 
            //     UserSocket.save() 
            // }else{
            //     console.log('user exist')
            // }
                
        } catch (err) {
            console.error(err.message); 
            res.status(500).send('Server error!!!')
        }
        socket.on("disconnect", () => {
            // delete user login from mongoose
            console.log(`${data.username} đã thoát`)
        }); 
    })
    socket.on('client-send-data',(data)=>{ 
        io.emit('server-send-data',data.dataText)  
        io.in(data.dataUser._id).emit('server-send-data-room',data.dataText)
    }) 
    //disonnect
    

}) 