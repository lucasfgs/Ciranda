"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("responsavel", "cpf", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("responsavel", "telefone", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("responsavel", "cpf");
    await queryInterface.removeColumn("responsavel", "telefone");
  },
};
