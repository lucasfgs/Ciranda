"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("cantina", "cpf_cnpj", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("cantina", "telefone", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cantina", "cpf_cnpj");
    await queryInterface.removeColumn("cantina", "telefone");
  },
};
