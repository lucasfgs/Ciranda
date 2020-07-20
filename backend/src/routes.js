const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("Salve");
});

module.exports = routes;
