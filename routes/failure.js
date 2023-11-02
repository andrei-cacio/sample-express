const express = require("express");
const rateLimiterMiddleware = require("../rate-limit.middleware");
const CircuitBreaker = require("../core/circuit-breaker");

const router = express.Router();

router.get("/might-fail", rateLimiterMiddleware, (req, res) => {
  res.status(200).send({ msg: "Wohooo !" });
});

router.get("/circuit-breaker/:port", async (req, res) => {
  const request = `http://localhost:${req.params.port}/c/might-fail`;

  const circuitBreaker = new CircuitBreaker(request);
  setInterval(async () => {
    try {
      const result = await circuitBreaker.fire();
      const body = await result.text();

      console.info(`[${circuitBreaker.state}][${result.status}] ${body}`);
    } catch (err) {
      console.info(`[${circuitBreaker.state}] ${err.message}`);
    }
  }, 1000);

  res.sendStatus(200);
});

module.exports = router;
