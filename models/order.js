const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true
  },
  productsOrdered: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered"],
    default: "Pending"
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;