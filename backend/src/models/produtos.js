const { Model, DataTypes } = require("sequelize");

class Produtos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        valor: DataTypes.DECIMAL,
        descricao: DataTypes.STRING,
        foto: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    Produtos.belongsToMany(models.Compras, {
      through: "ProdutosCompra",
      foreignKey: "id_produto",
      as: "Produtos_compra",
    });
  }
}

module.exports = Produtos;
