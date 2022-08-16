const mongoose = require("mongoose");

const Genre = mongoose.model(
  "genres",
  mongoose.Schema({
    genre: { type: String, required: true },
  })
);

module.exports.Genre = Genre;
