
const express = require('express');
const promoRouter = express.Router();

promoRouter.use(express.json());

promoRouter.route('/:promoId')
    .all((req,res,next)=>{
        res.statusCode=200;
        res.setHeader('content-type','text/plain');
        next();
    })
    .get((req,res,next)=>{
        res.end("Will Fetch Promotion : "+req.params.promoId);
    })
    .post((req,res)=>{
        res.statusCode=403
        res.end('POST method not supported on /promotions/:promoId Endpoint..');
    })
    .put((req,res)=>{
        res.write('Updating promotion:'+req.params.promoId+ '\n')
        res.end('Will update the promotion: '+req.body.name+' with details: '+req.body.description);
    })
    .delete((req,res)=>{
        res.end('Will Delete promotion: '+req.params.promoId);
    });

promoRouter.route('/')
    .get((req,res,next)=>{
        res.end("Will Fetch All the promotions!!!");
    })
    .post((req,res)=>{
        res.end('Will Add the promotion: '+req.body.name+' with details: '+req.body.description);
    })
    .put((req,res)=>{
        res.statusCode=403
        res.end('PUT method not supported on /promotions Endpoint..');
    })
    .delete((req,res)=>{
        res.end('Will Delete All the promotions!!!');
    })

module.exports=promoRouter;