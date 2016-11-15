angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.perfil', {
    url: '/perfil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.mensagens', {
    url: '/mensagens',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mensagens.html',
        controller: 'mensagensCtrl'
      }
    }
  })

  .state('menu.grupos', {
    url: '/grupos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/grupos.html',
        controller: 'gruposCtrl'
      }
    }
  })

  .state('menu.produtos', {
    url: '/produtos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/produtos.html',
        controller: 'produtosCtrl'
      }
    }
  })

  .state('menu.sobre', {
    url: '/sobre',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sobre.html',
        controller: 'sobreCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

$urlRouterProvider.otherwise('/menu/perfil')

  

});