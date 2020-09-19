const Compras = require("../models/Compras");

class CompraController {
  async store(req, res) {
    const { id_aluno, valor_total } = req.body;

    try {
      const compra = await Compras.create({
        id_aluno,
        valor_total,
      });

      res.status(201).json(compra);
    } catch (error) {
      res.status(400).json("Erro ao realizar cadastro");
    }
  }
  async index(req, res) {
    const compras = await Compras.findAll();

    res.json(compras);
  }
  async show(req, res) {
    const { id } = req.params;

    const compra = await Compras.findOne({ where: { id } });

    res.json(compra);
  }
  async destroy(req, res) {
    const { id } = req.params;

    let compra = await Compras.destroy({ where: { id } });

    res.json(compra);
  }
  async update(req, res) {
    const { id, id_aluno, valor_total } = req.body;

    const compra = await Compras.update(
      {
        id_aluno,
        valor_total,
      },
      { where: { id } }
    );

    compra ? res.send(compra) : res.status(400);
  }
}

module.exports = new CompraController();
