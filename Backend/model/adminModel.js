const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Admin Schema
const adminSchema = new Schema({
    adminName:{
        type:String,
        required:true,
    },
    adminEmail:{
        type:String,
        required:true,
    },
    adminPassword:{
        type:String,
        required:true,
    },
    adminImage:{
        type:String,
    }
})

module.exports = mongoose.model("Admin", adminSchema);