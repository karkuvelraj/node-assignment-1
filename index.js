 
 const http = require('http');
 const express = require('express');
 const dishRouter = require('./routers/dishRouter')
 const promoRouter = require('./routers/promoRouter')
 const leaderRouter = require('./routers/leaderRouter')
 const logger = require('morgan');
 const auth = require('./auth')
 const mongoose= require('mongoose');
 const cookieParser=require('cookie-parser')
 var session=require('express-session')
 const FileStorage= require('session-file-store')(session)
 mongoose.connect('mongodb://localhost:5000/testDb').then((con)=>{
     console.log("connection made to db")
 })

 const port = 8080;
 const host = 'localhost';

 const app = express();

    app.use(logger('dev'));
    // app.use(cookieParser('123-123-123'))
    app.use(express.static(__dirname+'/public'))
     
    app.use(session({
        secret:'123-123',
        saveUninitialized:false,
        resave:false,
        store:new FileStorage()
    }));
    app.use(auth);
    app.use('/dishes',dishRouter)
    app.use('/promotions',promoRouter)
    app.use('/leaders',leaderRouter)
   

const server=http.createServer(app);
    server.listen(port,host,()=>{
        console.log(`Server Running on http://${host}:${port}/`)
    })