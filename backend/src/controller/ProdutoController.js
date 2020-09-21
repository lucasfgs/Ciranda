const Produtos = require("../models/Produtos");

class ProdutoController {
  async store(req, res) {
    const { nome, valor, descricao, foto } = req.body;

    try {
      const produto = await Produtos.create({
        nome,
        valor,
        descricao,
        foto,
      });

      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json("Erro ao realizar cadastro");
    }
  }
  async index(req, res) {
    const produto = await Produtos.findAll();

    res.json(produto);
  }
  async show(req, res) {
    const { id } = req.params;

    const produto = await Produtos.findOne({ where: { id } });

    res.json(produto);
  }
  async destroy(req, res) {
    const { id } = req.params;

    let produto = await Produtos.destroy({ where: { id } });

    res.json(produto);
  }
  async update(req, res) {
    const { id, nome, valor, descricao, foto } = req.body;

    const produto = await Produtos.update(
      {
        nome,
        valor,
        descricao,
        foto,
      },
      { where: { id } }
    );

    produto ? res.send(produto) : res.status(400);
  }
}

module.exports = new ProdutoController();
