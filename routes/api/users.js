const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const config = require('config');
const auth = require('../../middlerware/auth');


// @router    GET api/users
// desc       Test route
// access     Public 
router.get('/', auth, async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error!!!")
    }
})

// @router    POST api/users/registration
// desc       Add new user
// access     Public 
router.post('/registration',[
    check('username','Username is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password enter is with 6 or more charaters').isLength({min: 6})
], async (req,res) =>{
    const { username, email, password } = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    try {
        // see if user exists

        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({status: false, mgs: "User alrealy exists!!!"})
        } 
        // get user avatar     
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        const newUser = {
            username,
            email,
            password,
            avatar
        }
        user = new User(newUser);

        // Enctrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();


        // return jsonwebtoken 
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err,token) =>{
                if(err) throw err 
                res.json({ token })
            }
        ) 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error!!!")
    }
})

module.exports = router;