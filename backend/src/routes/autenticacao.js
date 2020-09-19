const routes = require("express").Router();

const AuthController = require("../controller/AuthController");

routes.post("/responsavel/logar", AuthController.login);

module.exports = routes;
