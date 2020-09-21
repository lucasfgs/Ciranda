"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("cantina", "Cantina");
    await queryInterface.renameTable("alunos", "Alunos");
    await queryInterface.renameTable("compras", "Compras");
    await queryInterface.renameTable("produtos", "Produtos");
    await queryInterface.renameTable("produtos_compra", "Produtos_compra");
    await queryInterface.renameTable("responsavel", "Responsavel");
    await queryInterface.renameTable("restricao", "Restricao");
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
