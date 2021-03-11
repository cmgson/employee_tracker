const mysql = require("mysql");
require('dotenv').config();




var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  user: process.env.DB_USER,

  password: process.env.DB_PASS,

  database: process.env.DB_NAME
});



module.exports = connection;
