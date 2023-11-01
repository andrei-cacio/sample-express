class AppError {
  constructor(message) {
    this.message = message;
    this.stack = new Error().stack;
  }
}

exports.default = AppError;
