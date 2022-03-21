const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile')

const { check, validationResult } = require('express-validator');
const auth = require('../../middlerware/auth'); 

// @router    GET api/profile/me
// desc       Get current users profile 
// access     Private 
router.get('/me',auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['username','avatar']);

        if(!profile)
            return res.status(400).json({mgs:'There is no profile for this user !!!'});
        
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!!!')
    }
})

// @router    GET api/profile
// desc       Create or update user profile 
// access     Private 
router.post('/', 
    [
        auth,
        [
            check('status','Status is required').not().isEmpty(),
            check('skills','skills is required').not().isEmpty(),
        ]
    ], 
     async (req,res) =>{
        
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()})
        const {
            company,
            website,
            location, 
            status,
            skills,
            bio,
            githubusername,
            youtube,
            facebook,
            intargram,
            likein,
            twitter 
        } = req.body

        //Build profile object
        const profileFields = [];

        profileFields.user = req.user.id;
        if(company) profileFields.company = company
        if(website) profileFields.website = website
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status 
        if(githubusername) profileFields.githubusername = githubusername
        if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim()); 

        //Build profile object
        profileFields.social = {}

        if(youtube) profileFields.social.youtube = youtube
        if(facebook) profileFields.social.facebook = facebook
        if(intargram) profileFields.social.intargram = intargram
        if(likein) profileFields.social.likein = likein
        if(twitter) profileFields.social.twitter = twitter    

        try {
            let profile = await Profile.findOne({user: req.user.id});

            if(profile){
                //update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    {$set: profileFields},
                    {new: true} 
                )
                return res.json(profile)
            }
            profile = new Profile(profileFields);
            await profile.save()

            res.status(200).json(profile)
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server error!!!')
        }
        
    })

module.exports = router;