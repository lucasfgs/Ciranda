require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const models = require("./models");
const routes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(routes);

models.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 8000, () => console.log("Server listening!"));
});
