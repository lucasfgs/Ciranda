const { Responsavel } = require("../models");

class ResponsavelController {
  async store(req, res) {
    const { nome, email, senha } = req.body;

    let responsavel = await Responsavel.create({
      nome,
      email,
      senha,
      saldo: 0,
    });

    res.status(201).json(responsavel);
  }
  async index(req, res) {
    let responsaveis = await Responsavel.findAll();

    res.json(responsaveis);
  }
  async show(req, res) {
    const { id } = req.params;

    let responsaveis = await Responsavel.findOne({ where: { id } });

    res.json(responsaveis);
  }
  async destroy(req, res) {
    const { id } = req.params;

    let responsavel = await Responsavel.destroy({ where: { id } });

    res.json(responsavel);
  }
  async update(req, res) {
    const { id, nome, email, senha, saldo } = req.body;

    const responsavel = await Responsavel.update(
      {
        nome,
        email,
        senha,
        saldo,
      },
      { where: { id } }
    );

    responsavel ? res.send(responsavel) : res.status(400);
  }
}

module.exports = new ResponsavelController();
