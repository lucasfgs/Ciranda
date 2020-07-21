const routes = require("express").Router();
const ResponsavelController = require("./controller/ResponsavelController");

routes.get("/", async (req, res) => {});

routes.get("/responsaveis", ResponsavelController.index);
routes.get("/responsaveis/:id", ResponsavelController.show);
routes.post("/responsaveis", ResponsavelController.store);
routes.delete("/responsaveis/:id", ResponsavelController.destroy);
routes.put("/responsaveis", ResponsavelController.update);

module.exports = routes;
