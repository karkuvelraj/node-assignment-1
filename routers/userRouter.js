const express=require('express');
const router=express.Router()
const User= require('../models/users')
router.use(express.json())
var passport = require('passport');
var authenticate =require('../authentication');
const users = require('../models/users');

router.post('/signup',(req,res,next)=>{
    console.log('Inside Sign Up')
    
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
            if(err){
                res.statusCode=500;
                next(err);
            }else{
                console.log('Inside register')
                if (req.body.firstname)
                user.firstname = req.body.firstname;
              if (req.body.lastname)
                user.lastname = req.body.lastname;
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.json({err: err});
                  return ;
                }
                console.log("user obj",user)
                passport.authenticate('local')(req, res, () => {
                  res.statusCode = 200;
                  console.log("status obj",200)
                  res.setHeader('Content-Type', 'application/json');
                  res.json({success: true, status: 'Registration Successful!'});
                });
              });

            }
        })
})

router.post('/login', passport.authenticate('local'),(req,res)=>{
    console.log('Loginnn')

    res.statusCode=200;
    res.setHeader('content-type','text/plain');
    res.json({status:'you are Authenticated',token:authenticate.getToken({_id:req.user._id})});

})

router.get('/',(req,res)=>{
    User.find({}).
        then((users)=>{
            res.statusCode=200;
            res.json(users);
        },err=>next(err))
})
module.exports=router;