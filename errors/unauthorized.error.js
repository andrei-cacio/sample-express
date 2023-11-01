const AppError = require("./app.error").default;

exports.default = class UnauthorizedError extends AppError {};
