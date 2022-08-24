const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { Users } = require("../models/users-model");

router.use(express.json());

router.post("/", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  // bcrypt - compares
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password!");

  // JWT - Generating Authentication Token
  // const token = jwt.sign({ _id: user._id }, config.get("aPrivateKey"));

  // Replace token by creating a method in User object - reduces reusability
  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
