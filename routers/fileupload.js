const express=require('express');

var passport = require('passport');
var authenticate =require('../authentication');
const multer= require('multer');
const router=express.Router()
router.use(express.json())


const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'public/images')
  },
  filename:(req,file,cb)=>{
      cb(null,file.originalname)
  }
})

const fileFilter=(req,file,cb)=>{
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
     return cb(new Error('Image'), false);
 }
 cb(null, true);
}
const upload=multer({storage:storage,fileFilter:fileFilter});

router.post('/upload',upload.single('imagefile'),(req,res)=>{
    console.log('Uploaded')

    res.statusCode=200;
    res.json(req.file);

})
module.exports=router;