const { default: UnauthorizedError } = require("./errors/unauthorized.error");
const app = require("./app").default;
const authRoutes = require("./routes/auth").default;
const circuitBreakerRoutes = require("./routes/failure");
const errorLoggerMiddleware = require("./error.logger.middleware").default;

const port = process.env.PORT || 3000;

app.use("/auth", authRoutes);
app.use("/c", circuitBreakerRoutes);

app.get("/bla", () => {
  throw new Error("shit");
});

app.get("*", (req, res, next) => {
  res.sendStatus(404);
  next();
});

app.use(errorLoggerMiddleware, (err, req, res, next) => {
  if (err instanceof UnauthorizedError) {
    return res.sendStatus(401);
  }

  res.sendStatus(500);
});

app.listen(port, () => {
  console.log("listening on: ", port);
});
