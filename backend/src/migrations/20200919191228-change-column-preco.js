"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Produtos", "preço", "valor");
  },

  down: async (queryInterface, Sequelize) => {},
};
