const mysql = require('mysql2');
var config = require('./config.json');
const { host, user, password, database } = config.database;
const connection = mysql.createConnection({
  user: user,
  host: host,
  password: password,
  database: database
});

connection.connect((err) => {
  if (!err) {
    console.log("connected");
  } else
    console.log(err);
});

module.exports = connection;