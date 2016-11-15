var mysql = require('mysql');
var config = require('./config.js');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
