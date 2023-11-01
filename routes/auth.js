const express = require("express");
const jwtMiddleware = require("../jwt.middleware").default;
const auth = require("../auth");

const router = express.Router();

const { getUser } = require("../services/users");
const rateLimiterMiddleware = require("../rate-limit.middleware");

router.post("/login", rateLimiterMiddleware, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUser(username, password);

    const token = await auth.getToken(user);

    return res.status(200).send(token);
  } catch (err) {
    return res.sendStatus(400);
  }
});

router.get("/user", jwtMiddleware, (req, res) => {
  return res.status(200).json(req.user);
});

exports.default = router;
