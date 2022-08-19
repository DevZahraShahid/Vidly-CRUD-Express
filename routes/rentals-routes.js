const { Rental } = require("../models/rentals-model");
const { Customers } = require("../models/customers-model");
const { Movie } = require("../models/movies-model");
const express = require("express");
const router = express.Router();
const Fawn = require("fawn"); //TPC
const mongoose = require("mongoose");

// Fawn.init(mongoose); //TPC

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.use(express.json());
router.post("/", async (req, res) => {
  console.log(req.body);
  const customer = await Customers.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not available");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    const result = await rental.save(); // Transaction (1)
    movie.numberInStock--;
    movie.save(); // Transaction (2)

    //TPC
    // new Fawn.Task()
    //   .save("rentals", rental)
    //   .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    //   .run();

    res.send(result);
  } catch (err) {
    res.status(500).send("Failed..");
  }
});

module.exports = router;
