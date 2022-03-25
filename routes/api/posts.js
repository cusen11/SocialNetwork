const express = require('express');
const router = express.Router();

const auth = require('../../middlerware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/user');
const Profile = require('../../models/Profile');

// @router    GET api/posts
// desc       Create post
// access     Private 
router.post('/add',[auth,
    [
        check('content', 'Content is required').not().isEmpty(),
    ]
], async (req,res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty())
        res.status(400).json({ errors: errors.array() }) 
    

    try {
        const user = User.findById(req.user.id).select('-password');
    
        const newPost = new Post({
            user: req.user.id,
            content: req.body.content,
            username: user.username,
            avatar:user.avatar,
            
        })

        const post = await newPost.save()
        res.status(200).json(post)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    } 
})

module.exports = router;