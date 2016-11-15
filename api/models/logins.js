var connection = require('../connection');

function Login() {
1  
  this.create = function(amigo, res) {
    connection.acquire(function(err, con) {
      con.query('call p_logar(?,?,@result)', [amigo.email,amigo.senha], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao logar.' + err.message});
        } else {
          res.send(result[0]);
          //res.send({status: 0, message: 'Login efetuado.'});
        }
      });
    });
  };  

}

module.exports = new Login();
