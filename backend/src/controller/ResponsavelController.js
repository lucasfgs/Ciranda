const Responsavel = require("../models/Responsavel");
const { passwordEncrypt } = require("../Utils");

class ResponsavelController {
  async store(req, res) {
    const { nome, email, senha, cpf, telefone } = req.body;
    let encryptedPassword = await passwordEncrypt(senha);

    try {
      let responsavel = await Responsavel.create({
        nome,
        email,
        senha: encryptedPassword,
        cpf,
        telefone,
        saldo: 0,
      });
      res.status(201).json(responsavel);
    } catch (error) {
      res.status(400).json("Erro ao realizar cadastro");
    }
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
    const { id, nome, email, senha, saldo, cpf, telefone } = req.body;

    const responsavel = await Responsavel.update(
      {
        nome,
        email,
        senha,
        cpf,
        telefone,
        saldo,
      },
      { where: { id } }
    );

    responsavel ? res.send(responsavel) : res.status(400);
  }
}

module.exports = new ResponsavelController();
