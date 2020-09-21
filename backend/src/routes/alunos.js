const routes = require("express").Router();

const AlunoController = require("../controller/AlunoController");

routes.get("/alunos/listar", AlunoController.index);
routes.get("/alunos/listar/:id", AlunoController.show);
routes.post("/alunos/criar", AlunoController.store);
routes.delete("/alunos/deletar/:id", AlunoController.destroy);
routes.put("/alunos/atualizar", AlunoController.update);

module.exports = routes;
