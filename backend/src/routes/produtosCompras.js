const routes = require("express").Router();

const ProdutosCompraController = require("../controller/ProdutosCompraController");

routes.get("/produtos/compras/listar", ProdutosCompraController.index);
routes.get("/produtos/compras/listar/:id", ProdutosCompraController.show);
routes.post("/produtos/compras/criar", ProdutosCompraController.store);
routes.delete(
  "/produtos/compras/deletar/:id",
  ProdutosCompraController.destroy
);
routes.put("/produtos/compras/atualizar", ProdutosCompraController.update);

module.exports = routes;
