const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:String,
        required:true
    }, 
    text:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {type: Date, default: Date.now}
})

module.exports = Message = mongoose.model('Message', MessageSchema)