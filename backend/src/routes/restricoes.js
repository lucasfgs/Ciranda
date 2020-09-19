const routes = require("express").Router();

const RestricaoController = require("../controller/RestricaoController");

routes.get("/alunos/retricoes/listar", RestricaoController.index);
routes.get("/alunos/retricoes/listar/:id", RestricaoController.show);
routes.post("/alunos/retricoes/criar", RestricaoController.store);
routes.delete("/alunos/retricoes/deletar/:id", RestricaoController.destroy);
routes.put("/alunos/retricoes/atualizar", RestricaoController.update);

module.exports = routes;
