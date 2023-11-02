const jwt = require("jsonwebtoken");
const privateKey = require("./core/auth").privateKey;
const UnauthorizedError = require("./errors/unauthorized.error").default;

function jwtMiddleware(req, res, next) {
  try {
    req.user = jwt.verify(req.headers?.authorization, privateKey)?.data;
    next();
  } catch (err) {
    throw new UnauthorizedError(err.message);
  }
}

exports.default = jwtMiddleware;
