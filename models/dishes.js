const mongoose= require('mongoose');

let commentSchema= new mongoose.Schema({
    rating:{
        required:true,
        type:Number,
        min:1,
        max:5
    },
    comment:{
        type:String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    date:{
        type: Date,
        requred : true
    }
}, {
    timestamps: true
})
const dishes= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
}, {
    timestamps: true
});
module.exports=mongoose.model('dishes',dishes);