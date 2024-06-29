const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  promoImg: {
    type: String,
    default: null
  },
  type: {
    type: String,
    required: true,
    enum: ['banner', 'advertisement']
  },
  selected: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Promotion', promotionSchema);