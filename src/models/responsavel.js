/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('responsavel', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    saldo: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'responsavel'
  });
};
