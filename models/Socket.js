const mongoose = require('mongoose')

const SocketSchema = new mongoose.Schema({
    listUserOnline:[{
        username:{
            type: String,
            required: true
        },
        email:{
            type:String,
            required:true
        },
        avatar:{ 
            type: String
        }
    }],
    listgroup:[{
        groupname:{
            type:String,
            required:true
        },
        members:{
            username:{
                type: String,
                required: true
            },
            email:{
                type:String,
                required:true
            },
            avatar:{ 
                type: String
            }
        },
        message:[{
            user:[{
                username:{
                    type: String,
                    required: true
                },
                text:{
                    type:String,
                    required:true
                }
            },{ timestamps: true }]
        }]
    }],
    

})

module.exports = Socket = mongoose.model('socket', SocketSchema)