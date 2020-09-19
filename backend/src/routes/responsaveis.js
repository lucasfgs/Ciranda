const routes = require("express").Router();
const ResponsavelController = require("../controller/ResponsavelController");

routes.get("/responsaveis/listar", ResponsavelController.index);
routes.get("/responsaveis/listar/:id", ResponsavelController.show);
routes.post("/responsaveis/criar", ResponsavelController.store);
routes.delete("/responsaveis/deletar/:id", ResponsavelController.destroy);
routes.put("/responsaveis/atualizar", ResponsavelController.update);

module.exports = routes;
