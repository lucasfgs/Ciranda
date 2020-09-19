const { Model, DataTypes } = require("sequelize");

class Responsavel extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        telefone: DataTypes.STRING,
        senha: DataTypes.STRING,
        saldo: DataTypes.DECIMAL,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Responsavel;
