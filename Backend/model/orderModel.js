const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Orders Schema
const orderSchema = new Schema({
  payment_method: {
    type: String,
    required: true,
    default: "esewa",
  },
  transaction_code: String,
  amount: {
    type: Number,
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      frontView:{
        type:String,
        required:true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["failed", "paid", "shipping", "delivered","pending"],
    default: "pending",
  },
  costumerEmail: {
    type: String,
    required: true,
  },
  address: {
    type:String,
    default:null,
  }
},
  { timestamps: true }
)

module.exports = mongoose.model("Orders", orderSchema);