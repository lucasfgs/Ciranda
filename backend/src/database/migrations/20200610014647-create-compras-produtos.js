"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("produtos_compra", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "produtos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_compra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "compras", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("produtos_compra");
  },
};
