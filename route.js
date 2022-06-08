const express = require('express');
const route = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');



const userAuth = require('./Controller/userAuth');
const Product = require('./Controller/product');









dotenv.config();
mongoose.connect(process.env.MONGOOSE_DB).then(()=>{
  console.log("database Connected");
}).catch((err)=>{
  console.log(err);
})

route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());



route.use('/user',userAuth);
route.use('/product',Product);

route.use((req,res)=>{
  res.status(401).json({
    error : "Route is not defind"
  })
})

module.exports = route;