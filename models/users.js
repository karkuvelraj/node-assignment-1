var mongoose = require('mongoose')
var Schema= mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const User =Schema({
    // username:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    // password:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    isAdmin:{
        type: Boolean,
        required : true,
        default: false
    }
})
User.plugin(passportLocalMongoose)

module.exports= mongoose.model('users',User);