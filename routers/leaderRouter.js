
const express = require('express');
const leaderRouter = express.Router();
const Leaders= require('../models/leaders')
const cors= require('./cors')
leaderRouter.use(express.json());

var authenticate = require('../authentication')

leaderRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next)=>{
        Leaders.find({})
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        Leaders.create(req.body)
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    })
    .put(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        res.statusCode=403
        res.end('PUT method not supported on /leaders Endpoint..');
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        Leaders.remove({})
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err));
    })

  leaderRouter.route('/:leaderId')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next)=>{
        Leaders.findById(req.params.leaderId)
        .then((data)=>{
            if(data){
                res.statusCode=200;
                res.setHeader('content-type','application/json');
                res.json(data); 
            }else{
                res.statusCode=404;
                res.end("Leader detail Not Found for "+req.params.leaderId); 
            }        
        },err=>next(err))
     .catch((err)=>next(err))
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        res.statusCode=403
        res.end('POST method not supported on /leaders/:leaderId Endpoint..');
    })
    .put(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        Leaders.findByIdAndUpdate(req.params.leaderId,
            {$set:req.body},{new:true})
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err));
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err));
    });

module.exports=leaderRouter;