const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    category_name : {
        type : String,
    },
    category_image : {
        type : String
    },
    category_desc :{
        type : String
    },
});

module.exports = mongoose.model("categorie", categorySchema);