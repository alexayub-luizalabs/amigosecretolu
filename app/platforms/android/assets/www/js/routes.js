angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  // Definição da tela que será exibida caso o usuário digite alguma url inválida
  $urlRouterProvider.otherwise('/login');

  $stateProvider
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.cadastro', {
    url: '/cadastro',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastro.html',
        controller: 'cadastroCtrl'
      }
    }
  })

  .state('menu.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.grupos', {
    cache: false,
    url: '/grupos',
    views: {
      'menuContent': {
        templateUrl: 'templates/grupos.html',
        controller: 'gruposCtrl'
      }
    }
  })

  .state('cadastroDetalhe', {
    url: '/cadastroDetalhe',
    templateUrl: 'templates/cadastroDetalhe.html',
    abstract:true
  })
  
  .state('menu.produtos', {
    cache: false,
    url: '/produtos',
    views: {
      'menuContent': {
        templateUrl: 'templates/produtos.html',
        controller: 'produtosCtrl'
      }
    }
  })

  .state('menu.listas', {
    cache: false,
    url: '/listas',
    views: {
      'menuContent': {
        templateUrl: 'templates/listas.html',
        controller: 'listasCtrl'
      }
    }
  })

  .state('menu.mensagens', {
    cache: false,
    url: '/mensagens',
    views: {
      'menuContent': {
        templateUrl: 'templates/mensagens.html',
        controller: 'mensagensCtrl'
      }
    }
  })

  .state('menu.sobre', {
    url: '/sobre',
    views: {
      'menuContent': {
        templateUrl: 'templates/sobre.html',
        controller: 'sobreCtrl'
      }  
    }
  })

  .state('menu.adicionarProduto', {
    url: '/adicionarproduto',
    views: {
      'menuContent': {
        templateUrl: 'templates/adicionarProduto.html',
        controller: 'addProdutoCtrl'
      }  
    }
  })

  .state('sair', {
    url: '/sair'
  })
});