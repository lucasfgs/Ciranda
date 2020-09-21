require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const initRoutes = require("./routes");
require("./database");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
initRoutes(app);

app.listen(process.env.PORT || 8000, () => console.log("Server listening!"));

module.exports = app;
