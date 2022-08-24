const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied!");

  try {
    //authorizing middleware - makes sure the token in the header
    // exists and is only accessed by authorized users
    const decoded = jwt.verify(token, config.get("aPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token!");
  }
};
