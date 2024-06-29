const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Costumer Schema
const costumerSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    reset: {
        token: {
            type: String,
            default: null,
        },
        tokenExpiration: {
            type: Date,
            default: null,
        }
    },
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model("Costumer", costumerSchema)