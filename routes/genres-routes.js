const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
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
// Only an authorized user can create the genre
router.use(express.json());
router.post("/", auth, async (req, res) => {
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
//only an authorized user who is an Admin can delete the genre
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found!`);
  res.send(genre);
});

module.exports = router;
