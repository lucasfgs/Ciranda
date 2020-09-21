const { Model, DataTypes } = require("sequelize");

class Cantina extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        senha: DataTypes.STRING,
        cpf_cnpj: DataTypes.STRING,
        email: DataTypes.STRING,
        telefone: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Cantina;
