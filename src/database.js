const mysql = require("promise-mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "prueba"
});

function connect() {
  return pool;
}

module.exports = { connect };
