const { Model, DataTypes } = require("sequelize");

class Responsavel extends Model {
  static init(connection) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        senha: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        saldo: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(model) {
    this.belongsTo(model.Alunos);
  }
}

module.exports = Responsavel;
