const express = require('express');
const router = express.Router();

const auth = require('../../middlerware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/user'); 

// @router    GET api/posts/add
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

// @router    GET api/posts
// desc       Get all post
// access     Private 

router.get('/',auth,async(req,res)=>{

    try {
        const posts = await Post.find().populate('user',['username','avatar']).sort({ createdAt : -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }

})

// @router    POST api/posts
// desc       Get post Pagination
// access     Private 

router.post('/page',auth, async(req,res)=>{

    try {
        const { page, limit } = req.body  
        const pageNum = parseInt(page - 1 ) || 0
        const total = await Post.countDocuments({})
        const posts = await Post.find({}).populate('user',['username','avatar']).limit(parseInt(limit)).skip(limit*pageNum).sort({ createdAt : -1 });
        res.status(200).json({currentPage:page, results: posts,totalItem:total, totalPage:Math.ceil(total/limit)})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }  
})

// @router    GET api/posts/:post_id
// desc       Get Post ID
// access     Private 

router.get('/:post_id',auth,async(req,res)=>{

    try {
        const post = await Post.findById(req.params.post_id );
        if(!post)
            return res.status(404).json({msg: "Post not found!!!"});
        
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId')
            return res.status(404).json({msg: "Post not found!!!"});
        res.status(500).send('Server error!!!')
    }

})

router.get('/dashboard/user/posts',auth,async(req,res)=>{ 
    try { 
        const posts = await Post.find({ user: req.user.id }).populate('user',['username','avatar']).sort({ createdAt : -1 });   
        if(!posts)
            return res.status(404).json({msg: "Post not found!!!"});
        
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId')
            return res.status(404).json({msg: "Post not found!!!"});
        res.status(500).send('Server error!!!')
    }

})

// @router    DELETE api/posts/:post_id
// desc       Delete Post ID
// access     Private 

router.delete('/:post_id',auth , async(req,res)=>{

    try {
        const post = await Post.findById(req.params.post_id); 
        if(post.user.toString() !== req.user.id)
            return res.status(401).json({msg: " User not authorized "});

        await post.remove();
        const posts = await Post.find({ user: req.user.id }).populate('user',['username','avatar']).sort({ createdAt : -1 });   
        res.json(posts)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }

})

// @router    PUT api/posts/like/:post_id
// desc       Like Post ID
// access     Private 
router.put('/like/:post_id',auth, async(req,res)=>{

    try {
        const post = await Post.findById(req.params.post_id); 

        if(!post)
            return res.status(404).json({msg: "Post not found"}); 
        
        //check the post has already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
            return res.status(404).json({ msg: "Post already liked" })
        
        post.likes.unshift({ user: req.user.id })

        await post.save();
        res.status(200).json(post.likes)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }

})

// @router    PUT api/posts/unlike/:post_id
// desc       UnLike Post ID
// access     Private 
router.put('/unlike/:post_id',auth, async(req,res)=>{

    try {
        const post = await Post.findById(req.params.post_id); 

        if(!post)
            return res.status(404).json({msg: "Post not found"}); 
        
        //check the post has already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
            return res.status(404).json({ msg: "Post has not yet been liked" })
        
        //Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id); 
        if(removeIndex < 0 )
            return res.status(401).json({msg:"Like not found!!!"})
        post.likes.splice(removeIndex, 1)

        await post.save();
        res.status(200).json(post.likes)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }

})

// @router    PUT api/posts/comment/:post_id
// desc       Comment Post ID
// access     Private 

router.put('/comment/:post_id', [auth, 
    [
    check('text', "Text  is required").not().isEmpty()
    ]
],async(req,res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty())
        res.status(400).json({ errors: errors.array() }) 

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);

        const newComment = {
            text: req.body.text,
            username: user.username,
            avatar: user.avatar,
            user: req.user.id
        } 

        await post.comment.unshift(newComment)

        await post.save();

        res.status(200).json(post)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }

} )

// @router    DELETE api/posts/comment/:post_id/:comment_id
// desc       Delete Comment ID
// access     Private 

router.delete('/comment/:post_id/:comment_id',auth , async(req,res)=>{

    try {
        const post = await Post.findById(req.params.post_id); 
        const comment = post.comment.find(comment => comment.id === req.params.comment_id); 
        if(!comment)
            return res.status(404).json({ msg: "Comment does not exist!!!"})
        
        
        if(post.user.toString() !== req.user.id)
            return res.status(401).json({msg: "Bạn không có quyền xóa comment này!!!"});
 
        
        const removeIndex = post.comment.map(item => item.id).indexOf(req.params.comment_id);
    
        if(removeIndex < 0 )
            return res.status(401).json({msg:"Comment not found!!!"})
        
        post.comment.splice(removeIndex, 1);

        await post.save(); 

        res.status(200).json({ msg: "Comment Removed", post})

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }

})

module.exports = router;