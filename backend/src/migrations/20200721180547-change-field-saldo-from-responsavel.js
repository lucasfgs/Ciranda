"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("responsavel", "saldo", {
      type: Sequelize.DECIMAL,
      allowNull: true,
      defaultValue: 0,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("responsavel");
  },
};
