const mongoose = require("mongoose");
const express = require("express");
const app = new express();
const customers = require("./routes/customers-routes");
const genres = require("./routes/genres-routes");

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connecting to MongoDB...."))
  .catch(() => console.log("Unable to connect to MOngoDB"));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome To Vidly");
});
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}...`));
