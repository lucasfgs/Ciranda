"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("responsavel", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("responsavel");
  },
};
