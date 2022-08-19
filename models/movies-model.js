const mongoose = require("mongoose");
const { GenreSchema } = require("./genres-model");

const Movie = mongoose.model(
  "movies",
  mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true,
    },
    genre: {
      type: GenreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

module.exports.Movie = Movie;
