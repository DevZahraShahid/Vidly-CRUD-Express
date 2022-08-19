const mongoose = require("mongoose");

const Rental = mongoose.model(
  "rentals",
  mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        isGold: { type: Boolean, default: false },
        name: { type: String, required: true },
        phone: {
          type: Number,
          minlength: 5,
          maxlength: 10,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 15,
          trim: true,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

module.exports.Rental = Rental;
