/* jshint indent: 2 */

/* jshint indent: 2 */
const { Model, DataTypes } = require("sequelize");

class ProdutoCompra extends Model {
  static init(sequelize) {
    super.init(
      {
        id_produto: DataTypes.INTEGER,
        id_compra: DataTypes.INTEGER,
        quantidade: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    ProdutoCompra.belongsTo(models.Produtos, { foreignKey: "id_produto" });
    ProdutoCompra.belongsTo(models.Compras, { foreignKey: "id_compra" });
  }
}

module.exports = ProdutoCompra;
