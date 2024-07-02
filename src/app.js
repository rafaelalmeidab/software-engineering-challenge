const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config()

app.use(express.json());

const routes = require("./api/routes/routes.js");
app.use("", routes);

module.exports = app;