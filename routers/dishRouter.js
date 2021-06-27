
const express = require('express');
// const bodyParser = require('body-parser');

const dishRouter = express.Router();

//dishRouter.use(bodyParser.json()); For:-  Express < v4.16.0

dishRouter.use(express.json());

dishRouter.route('/:dishId')
    .all((req,res,next)=>{
        res.statusCode=200;
        res.setHeader('content-type','text/plain');
        next();
    })
    .get((req,res,next)=>{
        res.end("Will Fetch dish with Id : "+req.params.dishId);
    })
    .post((req,res)=>{
        res.statusCode=403
        res.end('POST method not supported on /dishes/:dishId Endpoint..');
    })
    .put((req,res)=>{
        res.write('Updating dish:'+req.params.dishId+ '\n')
        res.end('Will update the dish: '+req.body.name+' with details: '+req.body.description);
    })
    .delete((req,res)=>{
        res.end('Will Delete dish: '+req.params.dishId);
    });

dishRouter.route('/')
    .get((req,res,next)=>{
        res.end("Will Fetch All the Dishes!!!");
    })
    .post((req,res)=>{
        res.end('Will Add the dish: '+req.body.name+' with details: '+req.body.description);
    })
    .put((req,res)=>{
        res.statusCode=403
        res.end('PUT method not supported on /dishes Endpoint..');
    })
    .delete((req,res)=>{
        res.end('Will Delete All the Dishes!!!');
    })

module.exports=dishRouter;