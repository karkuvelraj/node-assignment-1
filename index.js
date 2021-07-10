 
 const http = require('http');
 const express = require('express');
 const dishRouter = require('./routers/dishRouter')
 const promoRouter = require('./routers/promoRouter')
 const leaderRouter = require('./routers/leaderRouter')
 const logger = require('morgan');
 const mongoose= require('mongoose');

 mongoose.connect('mongodb://localhost:5000/testDb').then((con)=>{
     console.log("connection made to db")
 })

 const port = 8080;
 const host = 'localhost';

 const app = express();

    app.use(logger('dev'));

    app.use(express.static(__dirname+'/public'))

    app.use('/dishes',dishRouter)
    app.use('/promotions',promoRouter)
    app.use('/leaders',leaderRouter)

const server=http.createServer(app);

    server.listen(port,host,()=>{
        console.log(`Server Running on http://${host}:${port}/`)
    })