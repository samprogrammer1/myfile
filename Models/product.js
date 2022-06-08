const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product_name : {
        type : String,
        required : true
    },
    product_desc : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "categorie",
        required : false
    },
    price : {
        type : Number,
        required : true
    },
    mrp : {
        type : Number,
        required : true
    }

});

module.exports = mongoose.model('product', productSchema);