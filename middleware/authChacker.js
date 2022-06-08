const jwt = require('jsonwebtoken');

module.exports = (req,res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token,'this is token sender');
        if(verify.userType == "Admin"){
            next();
        }else{
            return res.status(401).json({
                msg: "Only Admin allow"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            msg : "invalid token"
        })
    }
}