var connection = require('../connection');

function Membro() {
  
  this.create = function(grupo, res) {
    connection.acquire(function(err, con) {
      con.query('call p_associar(?,?, @resultado)', [grupo.idgrupo,grupo.celular], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao associar amigo.' + err.message});
        } else {
          res.send({status: 0, message: result[0]});
        }
      });
    });
  };

  this.update = function(idgrupo, celular, res) {
    connection.acquire(function(err, con) {
      con.query('update amigos_grupos set inserido = now() where idgrupo = ? and celular = ?', [idgrupo, celular], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao atualizar. ' + err.message});
        } else {
          res.send({status: 0, message: 'Amigo efetivou entrada no grupo.'});
        }
      });
    });
  };
  
  this.getMembrosPorGrupo = function(id, res) {
    connection.acquire(function(err, con) {
      con.query("select g.nome as grupo, case g.idadmin when a.idamigo then 'S' else 'N' END as isadmin , a.idamigo, a.nome, a.celular, a.foto, case ag.inserido is null when true then 'N' else 'S' end as inserido from amigos_grupos ag, amigos a, grupos g where a.celular = ag.celular and g.idgrupo = ag.idgrupo and g.idgrupo = ?",[id], function(err, result) {
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

  this.delete = function(idg, celular, res) {
    connection.acquire(function(err, con) {
      con.query('call p_desassociar(?,?,@resultado)', [idg,celular], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao desassociar amigo'});
        } else {
          res.send({status: 0, message: 'Sucesso ao desassociar amigo'});
        }
      });
    });
  };

}

module.exports = new Membro();
