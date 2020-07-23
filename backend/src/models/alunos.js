module.exports = (sequelize, DataTypes) => {
  const Alunos = sequelize.define("Alunos", {
    nome: {
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
  });
  Alunos.associate = (models) => {
    Alunos.belongsTo(models.Responsavel, {
      foreignKey: "id_responsavel",
      as: "responsavel",
    });
  };
  return Alunos;
};
