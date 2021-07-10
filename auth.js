

function basicAuthentication(req,res,next){
    //console.log(req.session);
    console.log('basic Auth')
    if(!req.session.user){
        res.statusCode=403;
        
        console.log('Not Authenticated')
        return next(new Error('Not Authenticated'));
    }
    else{
        if(req.session.user=='Admin')
        {
            // res.cookie('user','Admin',{signed:true})
            req.session.user='Admin'
            next()
        }else{
            // res.setHeader('www-authenticate','basic')
            res.statusCode=401;
            next(new Error('session invalidated'));
            console.log('session invalidated')
            return;
        }
    }
    
    
}

module.exports= basicAuthentication