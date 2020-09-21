const Responsavel = require("../models/Responsavel");
const Cantina = require("../models/Cantina");
const { passwordDecrypt } = require("../Utils");

module.exports = {
  async login(req, res) {
    const { email, senha, tipo } = req.body;
    let resposta;

    if (tipo == "R") {
      resposta = await Responsavel.findOne({ where: { email } });
    } else if (tipo == "C") {
      resposta = await Cantina.findOne({ where: { email } });
    }
    const { senha: senhaCriptografada } = resposta.dataValues;
    let logou = await passwordDecrypt(senha, senhaCriptografada);
    logou ? res.status(201).json(logou) : res.status(400).json(logou);
  },
};
