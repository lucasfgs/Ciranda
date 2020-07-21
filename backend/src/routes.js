const routes = require("express").Router();
const { Responsavel } = require("./models");

routes.get("/", async (req, res) => {
  let responsavel = await Responsavel.create({
    nome: "Lucas Ferreira",
    email: "lucaslindo@gmail.com",
    senha: "123",
    saldo: "0",
  });
  res.json(responsavel);
});

module.exports = routes;
