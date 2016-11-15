var connection = require('../connection');

function Mensagem() {
  
  this.getMensagensEnviadas = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select m.idmensagem, m.anonima, m.idremetente, m.iddestinatario,(select nome from amigos a where a.idamigo = m.iddestinatario) as amigo, (select foto from amigos a where a.idamigo = m.iddestinatario) as foto, (select nome from grupos g where g.idgrupo = m.iddestinatariogrp) as grupo, m.mensagem, m.dataenvio, m.datalida from mensagens m where m.idremetente = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Nenhuma mensagem recebida.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Nenhuma mensagem recebida.'});
          }          
        }
      });
    });
  };

  this.getMensagensRecebidas = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select m.idmensagem, m.anonima, m.idremetente, m.iddestinatario,(select nome from amigos a where a.idamigo = m.iddestinatario) as amigo, (select foto from amigos a where a.idamigo = m.iddestinatario) as foto, (select nome from grupos g where g.idgrupo = m.iddestinatariogrp) as grupo, m.mensagem, m.dataenvio, m.datalida from mensagens m where m.iddestinatario = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Nenhuma mensagem recebida.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Nenhuma mensagem recebida.'});
          }          
        }
      });
    });
  };

  this.getMensagensGrupo = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select m.idmensagem, m.anonima, m.idremetente, m.iddestinatario,(select nome from amigos a where a.idamigo = m.iddestinatario) as amigo, (select foto from amigos a where a.idamigo = m.iddestinatario) as foto, (select nome from grupos g where g.idgrupo = m.iddestinatariogrp) as grupo, m.mensagem, m.dataenvio, m.datalida from mensagens m where m.iddestinatariogrp = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Nenhuma mensagem pro grupo.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Nenhuma mensagem pro grupo.'});
          }          
        }
      });
    });
  };

  this.create = function(msg, res) {
    connection.acquire(function(err, con) {
      con.query('call p_nova_msg (?,?,?,?,?, @resultado)', [msg.idremet, msg.iddest, msg.iddestgrp, msg.anonima, msg.mensagem], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Message Sent failed.' + err.message});
        } else {
          res.send({status: 0, message: 'Message Sent successfully'});
        }
      });
    });
  };

  this.lerMensagem = function(msg, res) {
    connection.acquire(function(err, con) {
      con.query('update mensagens set datalida = now() where idmensagem = ?', [msg.id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao atualizar mensagem'});
        } else {
          res.send({status: 0, message: 'Mensagem atualizada com sucesso'});
        }
      });
    });
  };  

  this.update = function(id, msg, res) {
    connection.acquire(function(err, con) {
      con.query('call p_alterar_mensagem (?,?,?,?,?);', [msg.iddest, msg.iddestgrp, msg.anonima, msg.mensagem, id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao atualizar mensagem'});
        } else {
          res.send({status: 0, message: 'Mensagem atualizada com sucesso'});
        }
      });
    });
  };  

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from mensagens where datalida = null and idmensagem = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Falha ao excluir'});
        } else {
          res.send({status: 0, message: 'Excluida com sucesso.'});
        }
      });
    });
  };
}

module.exports = new Mensagem();
