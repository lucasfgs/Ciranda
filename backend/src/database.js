const Sequelize = require("sequelize");
const dbConfig = require("./config/database");

const Responsavel = require("./models/Responsavel");
const Alunos = require("./models/Alunos");
const Compras = require("./models/Compras");

const connection = new Sequelize(dbConfig);

Responsavel.init(connection);
Alunos.init(connection);
Compras.init(connection);

// Address.init(connection);
// Tech.init(connection);

Alunos.associate(connection.models);
Compras.associate(connection.models);
// Address.associate(connection.models);
// Tech.associate(connection.models);

module.exports = connection;
