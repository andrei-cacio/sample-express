const { default: UnauthorizedError } = require("./errors/unauthorized.error");
const app = require("./app").default;
const authRoutes = require("./routes/auth").default;
const errorLoggerMiddleware = require("./error.logger.middleware").default;

const port = 3000;

app.use("/auth", authRoutes);

app.get("/bla", () => {
  throw new Error("shit");
});

app.use(errorLoggerMiddleware, (err, req, res) => {
  if (err instanceof UnauthorizedError) {
    return res.sendStatus(401);
  }

  res.sendStatus(500);
});

app.listen(port, () => {
  console.log("listening on: ", port);
});
