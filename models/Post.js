const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content:{
        type: String,
        required: true
    },
    username: {
        type: String
    },
    avatar:{
        type: String,
    },
    likes:[
        {
            user:{
                type:  mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
        }
    ],
    comment:[
        {
            user:{
                type:  mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            text:{
                type:String
            },
            username:{
                type:String
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default: Date.now
            }
        }
    ]

},{ timestamps: true })

module.exports = Post = mongoose.model('post', PostSchema)