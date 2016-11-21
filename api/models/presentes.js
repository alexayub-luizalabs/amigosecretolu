var connection = require('../connection');

function Presente() {
  
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from presentess', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getPresentesPorAmigo = function(id, res) {
    connection.acquire(function(err, con) {
      con.query("select g.nome as grupo, p.*, date_format(p.datainserido,'%d/%m/%Y') as dtinserido from presentes p, grupos g where p.idgrupo = g.idgrupo and idamigo = ?",[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Presentes não encontrados.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Presentes não encontrados.'});
          }          
        }
      });
    });
  };

  this.getPresentesPorGrupo = function(ida, idg, res) {
    connection.acquire(function(err, con) {
      con.query("select g.nome as grupo, p.*, date_format(p.datainserido,'%d/%m/%Y') as dtinserido from presentes p, grupos g where p.idgrupo = g.idgrupo and idamigo = ? and p.idgrupo = ?",[ida,idg], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Presentes não encontrados.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Presentes não encontrados.'});
          }          
        }
      });
    });
  };

  this.create = function(presente, res) {
    connection.acquire(function(err, con) {
      con.query('call p_add_presente(?,?,?,?,?,@resultado)', [presente.idamigo, presente.idgrupo, presente.idproduto, presente.produto, presente.imagem], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao adicionar presente.' + err.message});
        } else {
          res.send({status: 0, message: 'Presente adicionado com sucesso.'});
        }
      });
    });
  };
  
  this.delete = function(ida,idg,idp, res) {
    connection.acquire(function(err, con) {
      con.query('call p_remove_presente(?,?,?,@resultado)', [ida,idg,idp], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao excluir presente.'});
        } else {
          res.send({status: 0, message: 'Presente excluida com sucesso.'});
        }
      });
    });
  };
}

module.exports = new Presente();
