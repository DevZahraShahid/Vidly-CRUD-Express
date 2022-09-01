module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};

// Removing try_catch block to avoid repitition
// and adding a middleware function that handles
// the different logics in try block with a simliar catch block
// this function is called in routers with the call back func
// as the parameter(handler)
