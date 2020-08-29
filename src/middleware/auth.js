// here we will set up and define authentication middleware and put some routers/routes behind authentication
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ',''); // This was provided as key in the postman
        const decoded = jwt.verify(token,'thisismynewcourse');
        const user = await User.findOne({_id : decoded._id,'tokens.token':token});
        if(!user){
            throw new Error();
        }else{
            req.token = token;
            req.user = user;
            next();
        }
    }catch(e){
        res.status(401).send({"error" : "Please authenticate properly"}); // Not Authenticated correctly
    }
}

module.exports = auth;