var connection = require('../connection');

function Grupo() {
  
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from grupos order by nome', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getGruposPorAmigo = function(id, res) {
    connection.acquire(function(err, con) {
      con.query("select g.*, a.idamigo, a.nome as amigo, case ag.inserido is null when true then 'N' else 'S' end as inserido from grupos g, amigos a, amigos_grupos ag where ag.idgrupo = g.idgrupo and ag.celular = a.celular and a.idamigo = ? order by g.nome",[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Grupos não encontrados por amigo.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Grupos não encontrados por amigo.'});
          }          
        }
      });
    });
  };

  this.create = function(grupo, res) {
    connection.acquire(function(err, con) {
      con.query('call p_insere_grupo (?,?,@result);', [grupo.idadmin, grupo.nome], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao criar grupo.' + err.message});
        } else {
          res.send({status: 0, message: result[0]});
        }
      });
    });
  };

  this.aceitar = function(id, celular, res) {
    connection.acquire(function(err, con) {
      con.query('update amigos_grupos set inserido = now() where idgrupo = ? and celular = ?', [id,celular], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao aceitar convite'});
        } else {
          res.send({status: 0, message: 'Convite aceito'});
        }
      });
    });
  };  

  this.cancelar = function(id, celular, res) {
    connection.acquire(function(err, con) {
      con.query('delete from amigos_grupos where idgrupo = ? and celular = ?', [id,celular], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao cancelar convite'});
        } else {
          res.send({status: 0, message: 'Convite cancelado'});
        }
      });
    });
  };  

  this.update = function(id, grupo, res) {
    connection.acquire(function(err, con) {
      con.query('call p_alterar_grupo (?,?);', [grupo.nome, id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao atualizar Grupo'});
        } else {
          res.send({status: 0, message: 'Gruo atualizado com sucesso'});
        }
      });
    });
  };  

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('call p_excluir_grupo(?,@resultado);', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao excluir grupo.'});
        } else {
          res.send({status: 0, message: 'Grupo excluido com sucesso.'});
        }
      });
    });
  };
}

module.exports = new Grupo();
