const Sequelize = require('sequelize');
require('dotenv').config();
// DB_NAME=library_db
// DB_USER=root
// DB_PASS=thisSUCKS69
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3301
  }
);

module.exports = sequelize;
