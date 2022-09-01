const express = require("express");
const customers = require("../routes/customers-routes");
const genres = require("../routes/genres-routes");
const movies = require("../routes/movies-routes");
const rentals = require("../routes/rentals-routes");
const users = require("../routes/users-routes");
const auth = require("../routes/auth");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("Welcome To Vidly");
  });
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  //Error Middleware - handling exceptions
  app.use(error);
};
