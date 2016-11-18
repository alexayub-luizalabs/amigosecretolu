var login = require('./models/logins');
var amigo = require('./models/amigos');
var membro = require('./models/membros');
var grupo = require('./models/grupos');
var regra = require('./models/regras');
var mensagem = require('./models/mensagens');
var presente = require('./models/presentes');

module.exports = {
  configure: function(app) {
    
    //Login
    app.post('/logins/', function(req, res) {
      login.create(req.body, res);
    });

    //Amigos
    app.get('/amigos/', function(req, res) {
      amigo.get(res);
    });

    app.get('/amigos/:id', function(req, res) {
      amigo.getAmigoPorId(req.params.id,res);
    });

    app.get('/amigos/:cel/celular', function(req, res) {
      amigo.getAmigoPorCelular(req.params.cel,res);
    });

    app.get('/amigos/:id/grupo', function(req, res) {
      amigo.getAmigosPorGrupo(req.params.id,res);
    });

    app.get('/amigos/:id/secreto', function(req, res) {
      amigo.getAmigoSecreto(req.params.id,res);
    });

    app.put('/amigos/:id', function(req, res) {
      amigo.update(req.params.id, req.body, res);
    });

    app.post('/amigos/', function(req, res) {
      amigo.create(req.body, res);
    });

    app.delete('/amigos/:id/', function(req, res) {
      amigo.delete(req.params.id, res);
    });

    //Membros    
    app.get('/membros/:id/grupo', function(req, res) {
      membro.getMembrosPorGrupo(req.params.id,res);
    });

    app.post('/membros/', function(req, res) {
      membro.create(req.body, res);
    });

    app.put('/membros/:celular/grupo/:idgrupo', function(req, res) {
      membro.update(req.params.idgrupo, req.params.celular, res);
    });

    app.delete('/membros/:idg/grupo/:celular', function(req, res) {
      membro.delete(req.params.idg, req.params.celular, res);
    });


     //Presentes
    app.get('/presentes/', function(req, res) {
      presente.get(res);
    });

    app.get('/presentes/:id/amigo', function(req, res) {
      presente.getPresentesPorAmigo(req.params.id,res);
    });

    app.get('/presentes/:ida/amigo/:idg/grupo', function(req, res) {
      presente.getPresentesPorGrupo(req.params.ida,req.params.idg,res);
    });

    app.post('/presentes/', function(req, res) {
      presente.create(req.body, res);
    });

    app.delete('/presentes/:id/', function(req, res) {
      presente.delete(req.params.id, res);
    });

    //Grupos
    app.get('/grupos/', function(req, res) {
      grupo.get(res);
    });

    app.get('/grupos/:id/amigo', function(req, res) {
      grupo.getGruposPorAmigo(req.params.id,res);
    });
    
    app.post('/grupos/', function(req, res) {
      grupo.create(req.body, res);
    });

    app.put('/grupos/:id/amigos/:celular/cancelar', function(req, res) {
      grupo.cancelar(req.params.id, req.params.celular, res);
    });

    app.put('/grupos/:id/amigos/:celular/aceitar', function(req, res) {
      grupo.aceitar(req.params.id, req.params.celular, res);
    });

    app.delete('/grupos/:id/', function(req, res) {
      grupo.delete(req.params.id, res);
    });

    //Regras
    app.get('/regras/', function(req, res) {
      regra.get(res);
    });

    app.get('/regras/:id', function(req, res) {
      regra.getRegrasPorId(req.params.id,res);
    });

    app.get('/regras/:id/grupo', function(req, res) {
      regra.getRegrasPorGrupo(req.params.id,res);
    });
    
    app.put('/regras/:id', function(req, res) {
      regra.update(req.params.id, req.body, res);
    });
    
    app.post('/regras/', function(req, res) {
      regra.create(req.body, res);
    });

    app.delete('/regras/:id/', function(req, res) {
      regra.delete(req.params.id, res);
    });

     //mensagens
    app.get('/mensagens/', function(req, res) {
      mensagem.get(res);
    });

    app.get('/mensagens/:id', function(req, res) {
      mensagem.getMensagemPorId(req.params.id,res);
    });

    app.get('/mensagens/:id/usuario/recebidas', function(req, res) {
      mensagem.getMensagensRecebidas(req.params.id,res);
    });

    app.get('/mensagens/:id/usuario/enviadas', function(req, res) {
      mensagem.getMensagensEnviadas(req.params.id,res);
    });
    
    app.post('/mensagens/:id/ler', function(req, res) {
      mensagem.lerMensagem(req.body, res);
    });

    app.put('/mensagens/:id', function(req, res) {
      mensagem.update(req.params.id, req.body, res);
    });

    app.post('/mensagens/', function(req, res) {
      mensagem.create(req.body, res);
    });

    app.delete('/mensagens/:id/', function(req, res) {
      mensagem.delete(req.params.id, res);
    });

  }
};
