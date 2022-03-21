const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if(!token)
        return res.status(401).json({mgs: 'No token authorization denied !!!'});
    try {
        
        // verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;

        next();

    } catch (err) {
        console.error(err.message);
        res.status(401).json({mgs:'Token is not valid !!!'})
    }
}