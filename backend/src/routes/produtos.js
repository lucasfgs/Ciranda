const routes = require("express").Router();

const ProdutoController = require("../controller/ProdutoController");

routes.get("/cantinas/produtos/listar", ProdutoController.index);
routes.get("/cantinas/produtos/listar/:id", ProdutoController.show);
routes.post("/cantinas/produtos/criar", ProdutoController.store);
routes.delete("/cantinas/produtos/deletar/:id", ProdutoController.destroy);
routes.put("/cantinas/produtos/atualizar", ProdutoController.update);

module.exports = routes;
