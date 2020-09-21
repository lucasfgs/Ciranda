const ProdutosCompra = require("../models/ProdutosCompra");

class ProdutosCompraController {
  async store(req, res) {
    const { id_produto, id_compra, quantidade } = req.body;

    try {
      let produtoCompra = await ProdutosCompra.create({
        id_produto,
        id_compra,
        quantidade,
      });
      res.status(201).json(produtoCompra);
    } catch (error) {
      res.status(400).json("Erro ao realizar cadastro");
    }
  }
  async index(req, res) {
    let produtoCompra = await ProdutosCompra.findAll();

    res.json(produtoCompra);
  }
  async show(req, res) {
    const { id } = req.params;

    let produtoCompra = await ProdutosCompra.findOne({ where: { id } });

    res.json(produtoCompra);
  }
  async destroy(req, res) {
    const { id } = req.params;

    let produtoCompra = await ProdutosCompra.destroy({ where: { id } });

    res.json(produtoCompra);
  }
  async update(req, res) {
    const { id, id_produto, id_compra, quantidade } = req.body;

    const produtoCompra = await ProdutosCompra.update(
      {
        id_produto,
        id_compra,
        quantidade,
      },
      { where: { id } }
    );

    produtoCompra ? res.send(produtoCompra) : res.status(400);
  }
}

module.exports = new ProdutosCompraController();
