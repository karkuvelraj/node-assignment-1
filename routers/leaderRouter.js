
const express = require('express');
const leaderRouter = express.Router();

leaderRouter.use(express.json());

leaderRouter.route('/:leaderId')
    .all((req,res,next)=>{
        res.statusCode=200;
        res.setHeader('content-type','text/plain');
        next();
    })
    .get((req,res,next)=>{
        res.end("Will Fetch leader : "+req.params.leaderId);
    })
    .post((req,res)=>{
        res.statusCode=403
        res.end('POST method not supported on /leaders/:leaderId Endpoint..');
    })
    .put((req,res)=>{
        res.write('Updating leader:'+req.params.leaderId+ '\n')
        res.end('Will update the leader: '+req.body.name+' with details: '+req.body.description);
    })
    .delete((req,res)=>{
        res.end('Will Delete leader: '+req.params.leaderId);
    });

leaderRouter.route('/')
    .get((req,res,next)=>{
        res.end("Will Fetch All the leaders!!!");
    })
    .post((req,res)=>{
        res.end('Will Add the leader: '+req.body.name+' with details: '+req.body.description);
    })
    .put((req,res)=>{
        res.statusCode=403
        res.end('PUT method not supported on /leaders Endpoint..');
    })
    .delete((req,res)=>{
        res.end('Will Delete All the leaders!!!');
    })

module.exports=leaderRouter;