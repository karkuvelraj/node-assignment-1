 
 const http = require('http');
 const express = require('express');
 const dishRouter = require('./routers/dishRouter')
 const promoRouter = require('./routers/promoRouter')
 const leaderRouter = require('./routers/leaderRouter')
 const userRouter = require('./routers/userRouter')
 const filesupload = require('./routers/fileupload')
 const logger = require('morgan');
 const auth = require('./auth')
 const mongoose= require('mongoose');
 const https=require('https');
 const fs=require('fs')
//  const cookieParser=require('cookie-parser')
 var session=require('express-session');
 const FileStorage= require('session-file-store')(session);


 var config=require('./config');

 mongoose.connect(config.mongodbUrl).then((con)=>{
     console.log("connection made to db")
 })
 var passport=require('passport')
 const port = config.port;
 const host = 'localhost';
 
 const app = express();
    app.all('*',(req,res,next)=>{
        if(req.secure){
            return next()
        }
        res.redirect('https://'+req.hostname+':'+config.secPort+req.url);
    });
    app.use(logger('dev'));
    // app.use(cookieParser('123-123-123'))
    
     
    // app.use(session({
    //     secret:config.secret,
    //     saveUninitialized:false,
    //     resave:false,
    //     store:new FileStorage()
    // }));
    
 app.use(passport.initialize())
//  app.use(passport.session())
    app.use('/users',userRouter)
    app.use(express.static(__dirname+'/public'))
    // app.use(auth);
    app.use('/dishes',dishRouter)
    app.use('/promotions',promoRouter)
    app.use('/leaders',leaderRouter)
    app.use('/files',filesupload)
   

const server=http.createServer(app);
    server.listen(port,host,()=>{
        console.log(`Server Running on http://${host}:${port}/`)
    })

const secServer=https.createServer({
    cert:fs.readFileSync(__dirname+'/certificate.pem'),
    key:fs.readFileSync(__dirname+'/private.key')
},app);

secServer.listen(config.secPort,host,()=>{
    console.log('server Https');
})