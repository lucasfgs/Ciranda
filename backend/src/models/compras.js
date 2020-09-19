/* jshint indent: 2 */
const { Model, DataTypes } = require("sequelize");

class Compras extends Model {
  static init(sequelize) {
    super.init(
      {
        valor_total: DataTypes.DECIMAL,
        id_aluno: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    Compras.belongsTo(models.Alunos, {
      foreignKey: "id_aluno",
      as: "alunos",
    });
  }
}

module.exports = Compras;
