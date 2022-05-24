
const express = require('express');
const Message = require('../../models/Message');
const router = express.Router();
const auth = require('../../middlerware/auth');  


// @router    GET api/Message/:conversationId
// desc       Get Message by conversationId
// access     public 

router.get('/:conversationId', async(req,res)=>{ 
    try {
        const Messages = await Message.find({conversationId: req.params.conversationId}).populate('user',['username','avatar']); 
        res.status(200).send(Messages)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }

})


// @router    POST api/Message/
// desc       Post Add new Message
// access     public 

router.post('/',auth, async(req,res)=>{
    const { conversationId,text } = req.body;
    const newMessage = new Message({
        conversationId,
        sender:req.user.id,
        text,
        user:req.user.id
    }) 
    try {
       
        const Message = await newMessage.save();
        res.status(200).json(Message)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }
}) 

module.exports = router;