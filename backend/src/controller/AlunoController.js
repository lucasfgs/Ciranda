const { Alunos } = require("../models");

class AlunoController {
  async store(req, res) {
    const { id_responsavel, nome } = req.body;

    const aluno = await Alunos.create({
      nome,
      id_responsavel,
    });

    res.status(201).json(aluno);
  }
  async index(req, res) {
    const alunos = await Alunos.findAll();

    res.json(alunos);
  }
  async show(req, res) {
    const { id } = req.params;

    const alunos = await Alunos.findOne({ where: { id } });

    res.json(alunos);
  }
  async destroy(req, res) {
    const { id } = req.params;

    let alunos = await Alunos.destroy({ where: { id } });

    res.json(alunos);
  }
  async update(req, res) {
    const { id, nome, id_responsavel } = req.body;

    const aluno = await Alunos.update(
      {
        nome,
        id_responsavel,
      },
      { where: { id } }
    );

    aluno ? res.send(aluno) : res.status(400);
  }
}

module.exports = new AlunoController();
