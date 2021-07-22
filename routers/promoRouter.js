
const express = require('express');
const promoRouter = express.Router();
const Promotions= require('../models/promotions')
var authenticate = require('../authentication')
const cors= require('./cors')
promoRouter.use(express.json());

promoRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next)=>{
        Promotions.find({})
            .then((data)=>{
                res.statusCode=200;
                res.setHeader('content-type','application/json');
                res.json(data);        
            },err=>next(err))
         .catch((err)=>next(err))
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res,next)=>{
        Promotions.create(req.body)
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    })
    .put(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        res.statusCode=403
        res.end('PUT method not supported on /promotions Endpoint..');
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res,next)=>{
        Promotions.remove({})
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    })

promoRouter.route('/:promoId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next)=>{
        Promotions.findById(req.params.promoId)
        .then((data)=>{
            if(data){
                res.statusCode=200;
                res.setHeader('content-type','application/json');
                res.json(data); 
            }else{
                res.statusCode=404;
                res.end("Promotion detail Not Found for "+req.params.promoId); 
            }        
        },err=>next(err))
     .catch((err)=>next(err))
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        res.statusCode=403
        res.end('POST method not supported on /promotions/:promoId Endpoint..');
    })
    .put(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res,next)=>{
        Promotions.findByIdAndUpdate(req.params.promoId,
            {$set:req.body},{new:true})
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res,next)=>{
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    });

module.exports=promoRouter;