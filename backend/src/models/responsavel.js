module.exports = (sequelize, DataTypes) => {
  const Responsavel = sequelize.define("Responsavel", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saldo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });

  return Responsavel;
};
