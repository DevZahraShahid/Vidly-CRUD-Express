const mongoose = require("mongoose");

const GenreSchema = mongoose.Schema({
  genre: { type: String, required: true },
});

const Genre = mongoose.model("genres", GenreSchema);

module.exports.Genre = Genre;
module.exports.GenreSchema = GenreSchema;
