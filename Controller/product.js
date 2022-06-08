const router = require('express').Router();
const Product = require('../Models/product');
const mongoose = require('mongoose');
const category = require('../Models/product_category');
const product = require('../Models/product');
const authcheck = require('./../middleware/authChacker');

router.get('/', (req,res,next)=>{
    Product.find()
    .populate("product_desc").exec().then((result)=>{
        return res.status(200).json({
            data : result
        })
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({
            error : err
        })
    })
});

router.get('/category',  (req,res,next)=>{
    category.find()
    .populate("products_details").exec().then((result)=>{
        return res.status(200).json({
            data : result
        })
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({
            error : err
        })
    })
});
router.post('/category', (req, res,next)=>{
    const product_data = new category({
        _id : new mongoose.Types.ObjectId,
        category_name : req.body.category_name,
    });
    product_data.save().then((result)=>{
        return res.status(201).json({
            data_save : result
        })
    }).catch((err)=>{
        return res.status(201).json({
            err : err
        })
    })
});




router.post('/', (req, res,next)=>{
    const product_data = new Product({
        _id : new mongoose.Types.ObjectId,
        product_name : req.body.product_name,
        product_desc : req.body.product_desc,
        price : req.body.price,
        mrp : req.body.mrp
    });
    product_data.save().then((result)=>{
        
        return res.status(201).json({
            data_save : result
        })
    }).catch((err)=>{
        return res.status(201).json({
            err : err
        })
    })
});

module.exports = router