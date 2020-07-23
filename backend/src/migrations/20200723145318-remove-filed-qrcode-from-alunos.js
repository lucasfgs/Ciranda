"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("alunos", "qr_code");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("alunos");
  },
};
