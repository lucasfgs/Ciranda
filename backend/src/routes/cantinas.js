const routes = require("express").Router();

const CantinaController = require("../controller/CantinaController");

routes.get("/cantinas/listar", CantinaController.index);
routes.get("/cantinas/listar/:id", CantinaController.show);
routes.post("/cantinas/criar", CantinaController.store);
routes.delete("/cantinas/deletar/:id", CantinaController.destroy);
routes.put("/cantinas/atualizar", CantinaController.update);

module.exports = routes;
