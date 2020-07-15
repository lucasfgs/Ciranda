/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compras', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    valor_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alunos',
        key: 'id'
      }
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
    tableName: 'compras'
  });
};
