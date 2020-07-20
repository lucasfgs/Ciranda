const routes = require("express").Router();

routes.get("/auth", (req, res) => {
  res.send("Salve");
});

module.exports = routes;
