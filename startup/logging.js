const winston = require("winston"); //logger
require("express-async-errors");

module.exports = function () {
  // Uncaught EXceptions for promise rejections
  process.on("uncaughtException", (ex) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION.");
    winston.error(ex.message, ex);
  });

  // promise rejection - check
  // const p = Promise.reject(new Error("Something failed miserably!"));
  // p.then(() => console.log("Done"));

  // Handle EXceptions
  //   winston.ExceptionHandler(
  //     new winston.transports.Console({ colorize: true, prettyPrint: true }),
  //     new winston.transports.File({ filename: "uncaughtExceptions.log" })
  //   );

  // Handling Uncaught EXceptions for promise rejections
  process.on("unhandledRejection", (ex) => {
    console.log("WE GOT AN unhandled Rejection.");
    winston.error(ex.message, ex);

    //alternate using winston ExceptionHandler
    // throw ex;
  });

  //logs the error along with timestamp in the logfile.log
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
