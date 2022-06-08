const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req,res)=>{
    res.status(200).json({
        msg : "user route is working"
    })
});

router.post('/singup',(req,res)=>{
    bcrypt.hash(req.body.password, 10 , (err, hash) =>{
        if(err){
            return res.status(500).json({
                error : err
            })
        }else{
            const user = User({
                _id : new mongoose.Types.ObjectId,
                username : req.body.username,
                email : req.body.email,
                password : hash,
                userType : req.body.userType
            })
            user.save().then((result)=>{
                res.status(200).json({
                    newUser : result
                })
            }).catch((err)=>{
                res.status(500).json({
                    error : err
                })
            })
        }
    })
});


router.post('/login', (req, res,next) =>{
    User.findOne({email : req.body.email}).then((userDetails)=>{
        bcrypt.compare(req.body.password,userDetails.password,(err, result)=>{
            if(result){
                const token = jwt.sign({
                    _id : userDetails._id,
                    username : userDetails.username,
                    email : userDetails.email,
                    userType : userDetails.userType
                },
                'this is token sender',
                {
                    expiresIn : "365day"
                });
                res.status(200).json({
                    _id : userDetails._id,
                    username : userDetails.username,
                    email : userDetails.email,
                    userType : userDetails.userType,
                    token : token
                })
            }else{
                return res.status(401).json({
                    msg : 'password matching failed'
                })
            }
        })
    }).catch((err)=>{
        res.status(500).json({
            error : err
        })
    })
})

module.exports  = router;