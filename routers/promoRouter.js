
const express = require('express');
const promoRouter = express.Router();
const Promotions= require('../models/promotions')
promoRouter.use(express.json());

promoRouter.route('/')
    .get((req,res,next)=>{
        Promotions.find({})
            .then((data)=>{
                res.statusCode=200;
                res.setHeader('content-type','application/json');
                res.json(data);        
            },err=>next(err))
         .catch((err)=>next(err))
    })
    .post((req,res,next)=>{
        Promotions.create(req.body)
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    })
    .put((req,res)=>{
        res.statusCode=403
        res.end('PUT method not supported on /promotions Endpoint..');
    })
    .delete((req,res,next)=>{
        Promotions.remove({})
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    })

promoRouter.route('/:promoId')
    .get((req,res,next)=>{
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
    .post((req,res)=>{
        res.statusCode=403
        res.end('POST method not supported on /promotions/:promoId Endpoint..');
    })
    .put((req,res,next)=>{
        Promotions.findByIdAndUpdate(req.params.promoId,
            {$set:req.body},{new:true})
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    })
    .delete((req,res,next)=>{
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((data)=>{
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(data);        
        },err=>next(err))
     .catch((err)=>next(err))
    });

module.exports=promoRouter;