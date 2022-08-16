const { Genre } = require("../models/genres-model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("genre");
  res.send(genres);
});
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found!`);
  res.send(genre);
});

//POST
router.use(express.json());
router.post("/", async (req, res) => {
  const genre = new Genre({
    genre: req.body.genre,
  });

  try {
    const result = await genre.save();
    res.send(result);
  } catch (err) {
    res.status(404).send("Operation unsuccesfull");
  }
});

//PUT
router.put("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { genre: req.body.genre },
    { new: true }
  );
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found!`);
  res.send(genre);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found!`);
  res.send(genre);
});

module.exports = router;
