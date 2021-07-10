const mongoose = require('mongoose');
let Schema= mongoose.Schema;

let leader = new Schema({
    name: {
        type :String,
        required:true
    },
    image: {
        type :String,
        required:true  
    },
    designation: {
        type:String,
        required:true,
        default:''
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        required: true
    }
})

module.exports=mongoose.model('leaders',leader)