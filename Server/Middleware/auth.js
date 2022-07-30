const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const RefreshToken = require('../Models/User').RefreshToken

exports.authenticate = async (req, res, next) => {
    // console.log("in middle ware");
    var token = req.headers.authorization;
    
    if(!token)res.send({"message" : "invalid user"})
    token = token.split(" ")[1];
    
    refresh = await RefreshToken.findOne({token : token});

    if(refresh == null)
    {
        res.json({"message" : "Invalid Token"});
        return;
    }
    
    jwt.verify(token, process.env.REFRESH_SECRET_KEY, function (err, decoded) {
 
        if (err) {
            res.send(err);
            return;
        }
 
        req.user = decoded.user;
 
        next();
    });
}