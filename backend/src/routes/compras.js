const routes = require("express").Router();

const CompraController = require("../controller/CompraController");

routes.get("/alunos/compras/listar", CompraController.index);
routes.get("/alunos/compras/listar/:id", CompraController.show);
routes.post("/alunos/compras/criar", CompraController.store);
routes.delete("/alunos/compras/deletar/:id", CompraController.destroy);
routes.put("/alunos/compras/atualizar", CompraController.update);

module.exports = routes;
