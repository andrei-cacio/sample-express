const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet").default;

const app = express();

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.json());

exports.default = app;
