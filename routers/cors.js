const cors = require('cors');

const whiteList=['https://localhost:8080','https://localhost:8443']

var corsWithOptions=(req,cb)=>{
    if(whiteList.indexOf(req.header('Origin'))==-1){
        cb(null,{origin:false})
    }else{
        cb(null,{origin:true})
    }
}

exports.cors=cors();
exports.corsWithOptions=cors(corsWithOptions);