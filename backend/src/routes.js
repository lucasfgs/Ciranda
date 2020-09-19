const routes = require("express").Router();
const ResponsavelController = require("./controller/ResponsavelController");
const AlunoController = require("./controller/AlunoController");
const CompraController = require("./controller/CompraController");
const ProdutoController = require("./controller/ProdutoController");
const ProdutosCompraController = require("./controller/ProdutosCompraController");
const RestricaoController = require("./controller/RestricaoController");
const CantinaController = require("./controller/CantinaController");

routes.get("/responsaveis/listar", ResponsavelController.index);
routes.get("/responsaveis/listar/:id", ResponsavelController.show);
routes.post("/responsaveis/criar", ResponsavelController.store);
routes.delete("/responsaveis/deletar/:id", ResponsavelController.destroy);
routes.put("/responsaveis/atualizar", ResponsavelController.update);

routes.get("/alunos/listar", AlunoController.index);
routes.get("/alunos/listar/:id", AlunoController.show);
routes.post("/alunos/criar", AlunoController.store);
routes.delete("/alunos/deletar/:id", AlunoController.destroy);
routes.put("/alunos/atualizar", AlunoController.update);

routes.get("/alunos/compras/listar", CompraController.index);
routes.get("/alunos/compras/listar/:id", CompraController.show);
routes.post("/alunos/compras/criar", CompraController.store);
routes.delete("/alunos/compras/deletar/:id", CompraController.destroy);
routes.put("/alunos/compras/atualizar", CompraController.update);

routes.get("/cantinas/produtos/listar", ProdutoController.index);
routes.get("/cantinas/produtos/listar/:id", ProdutoController.show);
routes.post("/cantinas/produtos/criar", ProdutoController.store);
routes.delete("/cantinas/produtos/deletar/:id", ProdutoController.destroy);
routes.put("/cantinas/produtos/atualizar", ProdutoController.update);

routes.get("/produtos/compras/listar", ProdutosCompraController.index);
routes.get("/produtos/compras/listar/:id", ProdutosCompraController.show);
routes.post("/produtos/compras/criar", ProdutosCompraController.store);
routes.delete(
  "/produtos/compras/deletar/:id",
  ProdutosCompraController.destroy
);
routes.put("/produtos/compras/atualizar", ProdutosCompraController.update);

routes.get("/alunos/retricoes/listar", RestricaoController.index);
routes.get("/alunos/retricoes/listar/:id", RestricaoController.show);
routes.post("/alunos/retricoes/criar", RestricaoController.store);
routes.delete("/alunos/retricoes/deletar/:id", RestricaoController.destroy);
routes.put("/alunos/retricoes/atualizar", RestricaoController.update);

routes.get("/cantinas/listar", CantinaController.index);
routes.get("/cantinas/listar/:id", CantinaController.show);
routes.post("/cantinas/criar", CantinaController.store);
routes.delete("/cantinas/deletar/:id", CantinaController.destroy);
routes.put("/cantinas/atualizar", CantinaController.update);

module.exports = routes;
