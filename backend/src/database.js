const Sequelize = require("sequelize");
const dbConfig = require("./config/database");

const Responsavel = require("./models/Responsavel");
const Alunos = require("./models/Alunos");
const Compras = require("./models/Compras");
const Produtos = require("./models/Produtos");
const ProdutosCompra = require("./models/ProdutosCompra");
const Restricao = require("./models/Restricao");
const Cantina = require("./models/Cantina");

const connection = new Sequelize(dbConfig);

Responsavel.init(connection);
Alunos.init(connection);
Compras.init(connection);
Produtos.init(connection);
ProdutosCompra.init(connection);
Restricao.init(connection);
Cantina.init(connection);

Alunos.associate(connection.models);
Compras.associate(connection.models);
Produtos.associate(connection.models);
ProdutosCompra.associate(connection.models);
Restricao.associate(connection.models);

module.exports = connection;
