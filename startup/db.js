const winston = require("winston"); //logger
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost:27017/vidly")
    .then(() => console.log("Connecting to MongoDB...."));
};
