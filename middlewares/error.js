const winston = require("winston");

// Error middleware
module.exports = function (err, req, res, next) {
  //logging the exception

  winston.error(err.message, err);

  //error
  //warn
  //info
  //verbose
  //debug
  //silly

  res.status(500).send("Something failed!");
};
