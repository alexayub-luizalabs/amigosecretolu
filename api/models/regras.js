var connection = require('../connection');

function Regra() {
  
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from regras', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getRegrasPorId = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from regras where idregra = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Regra não encontrada.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Regra não encontrada.'});
          }          
        }
      });
    });
  };
  
  this.getRegrasPorGrupo = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from regras where idgrupo = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Regra não encontrada.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Regra não encontrada.'});
          }          
        }
      });
    });
  };

  this.create = function(regra, res) {
    connection.acquire(function(err, con) {
      con.query('insert into regras values (0,?,?,?,?)', [regra.idgrupo, regra.categoria, regra.valorminimo, regra.valormaximo], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao criar regra.' + err.message});
        } else {
          res.send({status: 0, message: 'Regra criada com sucesso.'});
        }
      });
    });
  };

  this.update = function(id, regra, res) {
    connection.acquire(function(err, con) {
      con.query('update regras set categoria = ?, valorminimo = ?, valormaximo = ? where idregra = ?', [regra.categoria, regra.valorminimo, regra.valormaximo,  id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao atualizar Regra'});
        } else {
          res.send({status: 0, message: 'Regra atualizada com sucesso'});
        }
      });
    });
  };
  
  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from regras where idregra = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao excluir regra'});
        } else {
          res.send({status: 0, message: 'Regra excluida com sucesso.'});
        }
      });
    });
  };
}

module.exports = new Regra();
