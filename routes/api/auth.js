const express = require('express');
const router = express.Router();
 
const config = require('config'); 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// @router    GET api/auth
// desc       Test route
// access     Public 
router.get('/', (req,res) => {
    res.send('auth route')
})


// @router    GET api/login
// desc       Authenticate user & get token
// access     Private 
router.post('/login',[
    check('email','Email is required').not().isEmpty(),
    check('password','Username is required').exists()
], async (req,res) =>{
    const { email, password } = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    try {
        // see if user exists

        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({status: false, mgs: "Invalid Credentials!!!"})
        } 
       
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
            return res.status(400).json({status: false, mgs: "Invalid Credentials!!!"})


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