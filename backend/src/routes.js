const routes = require("express").Router();
const ResponsavelController = require("./controller/ResponsavelController");
const AlunoController = require("./controller/AlunoController");
const CompraController = require("./controller/CompraController");

routes.get("/", async (req, res) => {});

routes.get("/responsaveis", ResponsavelController.index);
routes.get("/responsaveis/:id", ResponsavelController.show);
routes.post("/responsaveis", ResponsavelController.store);
routes.delete("/responsaveis/:id", ResponsavelController.destroy);
routes.put("/responsaveis", ResponsavelController.update);

routes.get("/alunos", AlunoController.index);
routes.get("/alunos/:id", AlunoController.show);
routes.post("/alunos", AlunoController.store);
routes.delete("/alunos/:id", AlunoController.destroy);
routes.put("/alunos", AlunoController.update);

routes.get("/compras", CompraController.index);
routes.get("/compras/:id", CompraController.show);
routes.post("/compras", CompraController.store);
routes.delete("/compras/:id", CompraController.destroy);
routes.put("/compras", CompraController.update);

module.exports = routes;
