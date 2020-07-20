const { Model, DataTypes } = require("sequelize");
class Alunos extends Model {
  static init(connection) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        qr_code: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        id_responsavel: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "responsavel",
            key: "id",
          },
        },
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(model) {
    this.hasOne(model.Responsavel, {
      foreignKey: "id_responsavel",
      as: "responsavel",
    });
  }
}

module.exports = Alunos;
