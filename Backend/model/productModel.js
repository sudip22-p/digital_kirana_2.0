const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Products Schema
const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    salesPrice:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    stocks:{
        type:Number,
        required:true,
    },
    soldQuantity:{
        type:Number,
        default:0,
    },
    description:{
        type:String,
        required:true,
    },
    frontView:{
        type:String,
        required:true,
    },
    backView:{
        type:String,
        required:true,
    },
    sideView:{
        type:String,
        required:true,
    },
    topView:{
        type:String,
        required:true,
    },
    Brand:{
        type:String
    },
    Unit:{
        type:String,
        enum:["Kilogram" , "Pieces" ,"Box"]
    }
})

module.exports = mongoose.model("Products",productSchema)
