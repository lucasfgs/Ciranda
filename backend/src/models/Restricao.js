const { Model, DataTypes } = require("sequelize");

class Restricao extends Model {
  static init(sequelize) {
    super.init(
      {
        id_aluno: DataTypes.INTEGER,
        id_produto: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    Restricao.belongsTo(models.Produtos, { foreignKey: "id_produto" });
    Restricao.belongsTo(models.Alunos, { foreignKey: "id_aluno" });
  }
}

module.exports = Restricao;
