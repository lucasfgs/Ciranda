const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Alunos = require("../models/alunos");
const Responsavel = require("../models/Responsavel");

const connection = new Sequelize(dbConfig);

Alunos.init(connection);
Responsavel.init(connection);

Alunos.associate(connection.models);
Responsavel.associate(connection.models);

module.exports = connection;
