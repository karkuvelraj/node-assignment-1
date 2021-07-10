

function basicAuthentication(req,res,next){
    console.log(req.signedCookies);

    if(!req.signedCookies.user){
        console.log('Inside signed cookies')
    let up=req.headers.authorization
    if(!up){
        res.setHeader('www-authenticate','basic')
        res.statusCode=401;
        next(new Error('Not Authenticated'));
        console.log('Not Authenticated')
        return;
    }
    console.log(new Buffer.from(up.split(' ')[1],'base64').toString())
    let upArr=new Buffer.from(up.split(' ')[1],'base64').toString().split(':');
    if(upArr[0]=='Admin'&&upArr[1]=='pass')
    {
        res.cookie('user','Admin',{signed:true})
        next()
    }else{
        res.setHeader('www-authenticate','basic')
        res.statusCode=401;
        next(new Error('Not Authenticated'));
        console.log('Not Authenticated')
        return;
    }
    }
    else{
        console.log('Cookie login')
        next()
    }
}

module.exports= basicAuthentication