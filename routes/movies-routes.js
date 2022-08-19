const { Movie } = require("../models/movies-model");
const { Genre } = require("../models/genres-model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send(`ID: ${req.params.id} not found!`);
  res.send(movie);
});

//POST
router.use(express.json());
router.post("/", async (req, res) => {
  const genre = await Genre.findById(req.body.id);
  if (!genre) return res.status(404).send(`Invalid Genre`);
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      genre: genre.genre,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  try {
    const result = await movie.save();
    res.send(result);
  } catch (err) {
    res.status(404).send("Operation unsuccesfull");
  }
});

//PUT
// router.put("/:id", async (req, res) => {
//   const movie = await Movie.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       numberInStock: req.body.numberInStock,
//       dailyRentalRate: req.body.dailyRentalRate,
//     },
//     { new: true }
//   );
//   if (!movie) return res.status(404).send(`ID: ${req.params.id} not found!`);
//   res.send(movie);
// });

// DELETE
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send(`ID: ${req.params.id} not found!`);
  res.send(movie);
});

module.exports = router;
