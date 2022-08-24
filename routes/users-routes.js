const _ = require("lodash");
const auth = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { Users } = require("../models/users-model");

router.use(express.json());

// Securing your logged in profile with auth func and a secure url
router.get("/me", auth, async (req, res) => {
  const user = await Users.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already registered!");
  user = new Users(_.pick(req.body, ["name", "email", "password"])); //lodash

  //Bcrypt - Hashing password
  const salt = await bcrypt.genSalt(5);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();

    // Replace token by creating a method in User object - reduces reusability
    // const token = jwt.sign({ _id: user._id }, config.get("aPrivateKey"));
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"])); //lodash
  } catch (e) {
    res.status(400).send("Unsuccessful");
  }
});

module.exports = router;
