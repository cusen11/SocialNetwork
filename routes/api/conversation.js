
const express = require('express');
const router = express.Router();
const Conversation = require('../../models/Conversation');

// @router    GET api/conversation/:userId
// desc       Get conversation by userId
// access     public 

router.get('/:userId', async(req,res)=>{

    try {
        const conversation = await Conversation.find({members:{$in:[req.params.userId] }}); 
        res.status(200).send(conversation)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }

})


// @router    POST api/conversation/
// desc       Post Add new conversation
// access     public 

router.post('/', async(req,res)=>{
       
    try {
        const newConversation = new Conversation({
            members:[req.body.senderId, req.body.userId]
        })
        const conversation = await newConversation.save();
        res.status(200).json(conversation)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }
}) 

router.post('/contant',async (req,res)=>{
    const {senderId, userId} = req.body 
    try {
        
        const result = await Conversation.find({members:{$all:[senderId,userId] }})
        res.status(200).send(result)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }
})

module.exports = router;