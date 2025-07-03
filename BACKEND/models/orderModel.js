const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // this should be same as the one in Product
    required: true
  },
  items: [
    {
      //Product Relationship 
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      size: {
        type: String,
        required: true
      }
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: 'Order Placed',
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  payment: {
    type: Boolean,
    default: false,
    required: true
  },
  Date: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
