/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "alunos",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "alunos",
    }
  );
};
