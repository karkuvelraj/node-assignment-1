const express=require('express');
const router=express.Router()
const User= require('../models/users')
router.use(express.json())
var passport = require('passport');
var authenticate =require('../authentication')
router.post('/signup',(req,res,next)=>{
    console.log('Inside Sign Up')
    
    User.register(new User({username:req.body.name}),req.body.password,(err,data)=>{
            if(err){
                res.statusCode=500;
                next(err);
            }else{
                passport.authenticate('local')(req,res,()=>{
                    res.statusCode=200;
                    res.end('User Signed up successfully')
                })

            }
        })
})

router.post('/login', passport.authenticate('local'),(req,res)=>{
    console.log('Loginnn')
    res.statusCode=200;
    res.setHeader('content-type','text/plain')
    res.end('you are Authenticated')

})

module.exports=router;