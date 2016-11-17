var connection = require('../connection');

function Amigo() {
  
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select nome, email, senha, celular, foto, dtcadastro from amigos', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.create = function(amigo, res) {
    connection.acquire(function(err, con) {
      con.query('call p_insere_amigo(?,?,?,?,?, @resultado)', [amigo.nome,amigo.senha,amigo.email,amigo.celular,amigo.foto], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao inserir amigo.' + err.message});
        } else {
          res.send({status: 0, message: result[0]});
        }
      });
    });
  };
  
  this.getAmigoPorId = function(id, res) {
    connection.acquire(function(err, con) {
      con.query("select a.idamigo, a.nome, a.senha, a.email, a.celular, a.dtcadastro, (select count(*) from amigos_grupos ag where ag.celular = a.celular) as qtdgrupo from amigos a where a.idamigo = ?",[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Amigo não encontrado.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Amigo não encontrado.'});
          }          
        }
      });
    });
  };

  this.getAmigoPorCelular = function(cel, res) {
    connection.acquire(function(err, con) {
      con.query("select a.idamigo, a.nome, a.senha, a.email, a.celular, a.dtcadastro, (select count(*) from amigos_grupos ag where ag.celular = a.celular) as qtdgrupo from amigos a where a.celular = ?",[cel], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Amigo não encontrado.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Amigo não encontrado.'});
          }          
        }
      });
    });
  };

  this.getAmigosPorGrupo = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select g.nome as grupo, a.idamigo, a.nome, a.celular, a.foto from amigos_grupos ag, amigos a, grupos g where a.idamigo = ag.idamigo and g.idgrupo = ag.idgrupo and g.idgrupo = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Users not found in this place.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Users not found in this place.'});
          }          
        }
      });
    });
  };

  this.getAmigoSecreto = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select g.nome as grupo, a.nome, (select b.nome from amigos b where b.idamigo = s.idamigosecreto) as amigosecreto from amigos a, sorteios s, grupos g where a.idamigo = s.idamigo and g.idgrupo = s.idgrupo and a.idamigo = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Users not found in this place.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Users not found in this place.'});
          }          
        }
      });
    });
  };  

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('call p_excluir_amigo(?)', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha eo excluir amigo'});
        } else {
          res.send({status: 0, message: 'Sucesso ao excluir amigo'});
        }
      });
    });
  };

}

module.exports = new Amigo();
