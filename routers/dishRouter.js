
const express = require('express');
// const bodyParser = require('body-parser');
const cors= require('./cors')
const Dishes = require('../models/dishes')
const dishRouter = express.Router();
var authenticate = require('../authentication')
//dishRouter.use(bodyParser.json()); For:-  Express < v4.16.0
var User = require('../models/users')
dishRouter.use(express.json());


dishRouter.route('/:dishId/comments/:commentId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next)=>{
        Dishes.findById(req.params.dishId).
            populate('comments.author').
            then((data)=>{
                res.json(data.comments.id(req.params.commentId))
            })
       
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,(req,res)=>{  
       res.end('Post Method Not supported')
    })
    .put(cors.corsWithOptions,authenticate.verifyJWT,(req,res)=>{
        Dishes.findById(req.params.dishId)
            .then((dish)=>{
                User.findById(dish.comments.id(req.params.commentId).author).
                then((user)=>{
                    if(user._id.equals(req.user._id)){

                        let comment=dish.comments.id(req.params.commentId);
                        comment.rating=req.body.rating
                        dish.save()
                            .then((dish1)=>{
                                getDishWithAuthors(req.params.dishId,res)
                            })
                    }else{
                        res.statusCode=403;
                        
                        res.end('UnAuthorized Operation')
                    }
                })
            })
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,(req,res)=>{
        Dishes.findById(req.params.dishId)
        .then((data)=>{
            User.findById(data.comments.id(req.params.commentId).author).
                then((user)=>{
                    if(user._id.equals(req.user._id)){
                        data.comments.id(req.params.commentId).remove()
                        data.save()
                            .then((dish)=>{
                                getDishWithAuthors(req.params.dishId,res)
                            })
                    }else{
                        res.statusCode=403;
                        res.end('UnAuthorized Operation')
                    }
                })
            
            
        })
   
    });
var getDishWithAuthors=(dishId,res)=>{
    Dishes.findById(dishId).
    populate('comments.author').
    then((data)=>{
        res.json(data.comments)
    })
}
dishRouter.route('/:dishId/comments')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next)=>{
        getDishWithAuthors(req.params.dishId,res)
   
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,(req,res)=>{  
        Dishes.findById(req.params.dishId).
        then((data)=>{
            data.comments.push({...req.body,author:req.user._id})
            data.save().
                then((user)=>{
                    getDishWithAuthors(req.params.dishId,res)
                })
  
        })
    })
    .put(cors.corsWithOptions,authenticate.verifyJWT,(req,res)=>{
     
        res.statusCode=403
        res.end('PUT method not supported on /dishes/:dishId/comments Endpoint..');
       
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,(req,res)=>{
        Dishes.findById(req.params.dishId)
        .then((dish)=>{
            for (var i = (dish.comments.length -1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
                .then((dish1)=>{
                    getDishWithAuthors(req.params.dishId,res)
                })
            
        })
       
    });

dishRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next)=>{
        Dishes.findById(req.params.dishId).
            then((data)=>{
                getDishWithAuthors(req.params.dishId,res)
            })
        // res.end("Will Fetch dish with Id : "+req.params.dishId);
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        res.statusCode=403
        res.end('POST method not supported on /dishes/:dishId Endpoint..');
    })
    .put(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        Dishes.findByIdAndUpdate(req.params.dishId,{$set:{...req.body}},{new:true}).
            then((data)=>{
                getDishWithAuthors(req.params.dishId,res)
            })
        // res.write('Updating dish:'+req.params.dishId+ '\n')
        // res.end('Will update the dish: '+req.body.name+' with details: '+req.body.description);
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        Dishes.findByIdAndRemove(req.params.dishId)
        .then((data)=>{
            getDishWithAuthors(req.params.dishId,res)
        })
        // res.end('Will Delete dish: '+req.params.dishId);
    });

dishRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next)=>{
        // res.end("Will Fetch All the Dishes!!!");
        Dishes.find({})
            .populate('comments.author')
            .then((data)=>{
                res.json(data)
            })
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        console.log(req.body.dishes)
        Dishes.insertMany(req.body.dishes)
         .then((dish)=>{
            Dishes.find({})
            .populate('comments.author')
            .then((data)=>{
                res.json(data)
            })
         })
        // res.end('Will Add the dish: '+req.body.name+' with details: '+req.body.description);
    })
    .put(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        res.statusCode=403
        res.end('PUT method not supported on /dishes Endpoint..');
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,authenticate.verifyAdmin,(req,res)=>{
        Dishes.remove({})
            .then((dish)=>{
                Dishes.find({})
                .populate('comments.author')
                .then((data)=>{
                    res.json(data)
                })
            })
        // res.end('Will Delete All the Dishes!!!');
    })

module.exports=dishRouter;