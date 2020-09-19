const { Model, DataTypes } = require("sequelize");

class Alunos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        id_responsavel: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    Alunos.belongsTo(models.Responsavel, {
      foreignKey: "id_responsavel",
      as: "responsavel",
    });
  }
}

module.exports = Alunos;
