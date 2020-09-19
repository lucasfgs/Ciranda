const Restricao = require("../models/Restricao");

class RestricaoController {
  async store(req, res) {
    const { id_produto, id_aluno } = req.body;

    try {
      let restricao = await Restricao.create({
        id_produto,
        id_aluno,
      });
      res.status(201).json(restricao);
    } catch (error) {
      throw error;
      res.status(400).json("Erro ao realizar cadastro");
    }
  }
  async index(req, res) {
    let restricao = await Restricao.findAll();

    res.json(restricao);
  }
  async show(req, res) {
    const { id } = req.params;

    let restricao = await Restricao.findOne({ where: { id } });

    res.json(restricao);
  }
  async destroy(req, res) {
    const { id } = req.params;

    let restricao = await Restricao.destroy({ where: { id } });

    res.json(restricao);
  }
  async update(req, res) {
    const { id, id_produto, id_aluno } = req.body;

    const restricao = await Restricao.update(
      {
        id_produto,
        id_aluno,
      },
      { where: { id } }
    );

    restricao ? res.send(restricao) : res.status(400);
  }
}

module.exports = new RestricaoController();
