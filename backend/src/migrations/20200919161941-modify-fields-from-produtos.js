"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("produtos", "descricao", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("produtos", "foto", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.removeColumn("produtos", "id_cantina");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("produtos", "descricao");
    await queryInterface.removeColumn("produtos", "foto");
  },
};
