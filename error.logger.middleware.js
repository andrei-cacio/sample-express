function errorLogger(error, req, res, next) {
  console.log(`[error] `, error.message);
  next(error);
}

exports.default = errorLogger;
