const mongoose = require('mongoose');
let Schema= mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

let promotion = new Schema({
    name: {
        type :String,
        required:true
    },
    image: {
        type :String,
        required:true  
    },
    label: {
        type:String,
        required:true,
        default:''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
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

module.exports=mongoose.model('promotions',promotion)