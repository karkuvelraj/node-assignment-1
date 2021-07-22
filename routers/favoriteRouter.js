const express = require('express');
const Favorites =require('../models/favorites');
const cors= require('./cors')
const Dishes = require('../models/dishes')
var authenticate = require('../authentication')
var User = require('../models/users')

const favoriteRouter = express.Router();
favoriteRouter.use(express.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
    .get(cors.cors,authenticate.verifyJWT,(req,res,next)=>{
        console.log('Fetch Favorites of User =>'+req.user);
        Favorites.findOne({user:req.user._id})
            .populate('user').populate('dishes')
            .then(data=>{
                res.statusCode=200;
                res.json(data);
            })
    })
    .post(cors.corsWithOptions,authenticate.verifyJWT,(req,res,next)=>{
        console.log('Post Favorites of User =>'+req.user);
        Favorites.findOne({user:req.user._id})
            .then(data=>{
                if(!data){
                    let dishes=req.body.map(x=>x._id);
                    let favourite= new Favorites({user:req.user._id,dishes:dishes});
                    favourite.save()
                        .then(fav=>{
                            res.statusCode=200;
                            res.json(fav);
                        })
                }else{
                    let dishes=req.body.map(x=>x._id);
                    for(let d of dishes){
                        if(data.dishes.indexOf(d)==-1)
                            data.dishes.push(d);
                    }
                    data.save()
                    .then(fav=>{
                        res.statusCode=200;
                        res.json(fav);
                    })
                }
            })
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,(req,res,next)=>{
        console.log('Delete Favourite of user =>'+req.user);
        Favorites.findOneAndDelete({user:req.user._id})
            .then(fav=>{
                res.statusCode=200;
                res.json(fav);
            })
    })


favoriteRouter.route('/:dishId')
    .options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
    .post(cors.corsWithOptions,authenticate.verifyJWT,(req,res,next)=>{
        console.log('Post Favourite dish '+req.params.dishId+' of user =>'+req.user);
        Favorites.findOne({user:req.user._id})
            .then(data=>{
                if(!data){
                    let favourite= new Favorites({user:req.user._id,dishes:[req.params.dishId]});
                    favourite.save()
                        .then(fav=>{
                            res.statusCode=200;
                            res.json(fav);
                        })
                }else{
                    data.dishes.push(d);
                    
                    data.save()
                    .then(fav=>{
                        res.statusCode=200;
                        res.json(fav);
                    })
                }
            })
    })
    .delete(cors.corsWithOptions,authenticate.verifyJWT,(req,res,next)=>{
        console.log('Delete Favourite dish '+req.params.dishId+' of user =>'+req.user);
        Favorites.findOne({user:req.user._id})
            .then(fav=>{
                if(fav){
                    fav.dishes.pull(req.params.dishId);
                    fav.save().then(data=>{
                        res.statusCode=200;
                        res.json(data);
                    })
                }
            })
    })

module.exports=favoriteRouter;
