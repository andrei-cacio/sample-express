const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
  keyPrefix: "middleware",
  points: 3, // 10 requests
  duration: 10, // per 1 second by IP
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};

module.exports = rateLimiterMiddleware;
