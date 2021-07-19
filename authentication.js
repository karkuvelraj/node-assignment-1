var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt= require('passport-jwt').ExtractJwt
var jwt =require('jsonwebtoken');
var config= require('./config')
var User = require('./models/users');

exports.local=passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.secret
};

exports.jwtPassport = passport.use(new JwtStrategy(opts,(payload,done)=>{
    if(payload){
        User.findOne({'_id':payload._id}).
            then((user)=>{
                if(user){
                    done(null,user)
                }else{
                    done(null,false)
                }
            })
            .catch((err)=>done(err,false))
    }
}));

exports.verifyJWT= passport.authenticate('jwt',{session:false});

exports.getToken= (user)=>{
    return jwt.sign(user,config.secret,{expiresIn:3600})
}

exports.verifyAdmin=(req,res,next)=>{
    if(req.user){
        if(req.user.isAdmin){
           return next()
        }else{
            res.statusCode=403;
            res.end('UnAuthorized')
        }
    }else{
        next(new Error('User Not Authenticated'))
    }
}