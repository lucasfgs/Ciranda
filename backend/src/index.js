require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("./database");

const routes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 8000, () => console.log("Server listening!"));

module.exports = app;
