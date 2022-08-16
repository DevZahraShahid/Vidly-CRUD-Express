const mongoose = require("mongoose");

const Customers = new mongoose.model(
  "customers",
  new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true },
    phone: {
      type: Number,
      minlength: 5,
      maxlength: 10,
    },
  })
);

module.exports.Customers = Customers;
