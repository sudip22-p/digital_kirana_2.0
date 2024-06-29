const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create GoogleCostumer Schema
const googleCustumerSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
},
  { timestamps: true  }
)
module.exports = mongoose.model("Google Costumer", googleCustumerSchema)