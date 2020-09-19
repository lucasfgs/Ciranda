module.exports = function initRoutes(app) {
  app.use(require("./alunos"));
  app.use(require("./cantinas"));
  app.use(require("./compras"));
  app.use(require("./produtos"));
  app.use(require("./produtosCompras"));
  app.use(require("./responsaveis"));
  app.use(require("./restricoes"));
};
