const Joi = require("joi");
const express = require("express");
const app = new express();

const Genres = [
  { id: 1, genre: "horror" },
  { id: 2, genre: "comedy" },
  { id: 3, genre: "thriller" },
  { id: 4, genre: "crime" },
  { id: 5, genre: "adventure" },
];

// GET
app.get("/", (req, res) => {
  res.send("HELLOOO!");
});
app.get("/api/genres", (req, res) => {
  res.send(Genres);
});
app.get("/api/genres/:id", (req, res) => {
  const genre = Genres.find((g) => g.id == req.params.id);
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found!`);
  res.send(genre);
});

//POST
app.use(express.json());
app.post("/api/genres", (req, res) => {
  // Validate

  // Create
  const genre = {
    id: Genres.length + 1,
    genre: req.body.genre,
  };

  // Push
  Genres.push(genre);
  res.send(genre);
  //   res.send(`Successfully added to the Genres`);
});

//PUT
app.put("/api/genres/:id", (req, res) => {
  // Lookup
  const genre = Genres.find((g) => g.id == req.params.id);
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found!`);
  // Validate

  // Update
  genre.genre = req.body.genre;
  res.send(genre);
});

// DELETE
app.delete("/api/genres/:id", (req, res) => {
  // LOokup
  const genre = Genres.find((g) => g.id == req.params.id);
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found!`);

  // Delete
  const index = Genres.indexOf(genre);
  Genres.splice(index, 1);

  res.send(genre);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}...`));
