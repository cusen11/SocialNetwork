const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members:{
        type:Array,
        required:true
    }
},{ timestamps: true })

module.exports = Conversation = mongoose.model('Conversation', ConversationSchema)