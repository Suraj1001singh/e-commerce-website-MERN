const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paymentID: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      trim: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
