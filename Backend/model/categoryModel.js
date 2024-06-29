const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// Create Category Schema
const categorySchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true,
    },
    imageUrl:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Categories", categorySchema)
