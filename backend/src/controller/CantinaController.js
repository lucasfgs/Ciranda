const Cantina = require("../models/Cantina");
const { passwordEncrypt } = require("../Utils");

class CantinaController {
  async store(req, res) {
    const { nome, senha, cpf_cnpj, email, telefone } = req.body;

    let encryptedPassword = await passwordEncrypt(senha);

    try {
      const cantina = await Cantina.create({
        nome,
        senha: encryptedPassword,
        cpf_cnpj,
        email,
        telefone,
      });

      res.status(201).json(cantina);
    } catch (error) {
      throw error;
      res.status(400).json("Erro ao realizar cadastro");
    }
  }
  async index(req, res) {
    const cantina = await Cantina.findAll();

    res.json(cantina);
  }
  async show(req, res) {
    const { id } = req.params;

    const cantina = await Cantina.findOne({ where: { id } });

    res.json(cantina);
  }
  async destroy(req, res) {
    const { id } = req.params;

    let cantina = await Cantina.destroy({ where: { id } });

    res.json(cantina);
  }
  async update(req, res) {
    const { id, nome, senha, cpf_cnpj, email, telefone } = req.body;

    let encryptedPassword = await passwordEncrypt(senha);

    const cantina = await Cantina.update(
      {
        nome,
        senha: encryptedPassword,
        cpf_cnpj,
        email,
        telefone,
      },
      { where: { id } }
    );

    cantina ? res.send(cantina) : res.status(400);
  }
}

module.exports = new CantinaController();
