const mongoose= require('mongoose');
let Schema= mongoose.Schema;
const favorites= new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true
    },
    dishes:[{type: mongoose.Schema.Types.ObjectId, ref: 'dishes'}]
},{
    timestamp: true
})

module.exports=mongoose.model('Favorites',favorites);