"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("produtos_compra", "quantidade", {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("produtos_compra", "quantidade");
  },
};
