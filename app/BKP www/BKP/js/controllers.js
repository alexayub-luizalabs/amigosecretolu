angular.module('app.controllers', [])
  
.controller('perfilCtrl', ['$scope', '$stateParams', '$http', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $rootScope) {

    $scope.usuario = 1;
        var req = {
            method: 'GET',
            url: 'http://localhost:8080/amigos/' + $rootScope.usuarioLogado/*,
            headers: {
                'Authorization': 'Beare r pedrocao',
                'Cache-Control': 'no-cache'
            }*/
        }

        $http(req).then(function (result) {

            result.data.forEach(function (item) {
            $scope.dtcadastro = item.dtcadastro;
            $scope.nome = item.nome;
            $scope.email = item.email;
            $scope.celular = item.celular;
            $scope.qtdgrupo = item.qtdgrupo;
        });
            console.log(result);

        }, function (error) {
            console.log(error);
        })

}])
   
.controller('mensagensCtrl', ['$scope', '$stateParams', '$http' , '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http) {


}])
   
.controller('gruposCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {

    $scope.nomeGrupo = '';
    $scope.vm = {
        grupos: []
    };

    var req = {
        method: 'GET',
        url: 'http://localhost:8080/grupos/' + $rootScope.usuarioLogado + '/amigo'/*,
        headers: {
            'Authorization': 'Bearer pedrocao',
            'Cache-Control': 'no-cache'
        }*/
    }

    $http(req).then(function (result) {
        result.data.forEach(function (item) {                
        $scope.vm.grupos.push({
                        idgrupo: item.idgrupo,
                        nome: item.nome,
                        data: item.datacriacao
                    });
    });
        console.log(result);

    }, function (error) {
        console.log(error);
    })

    
    $scope.doRefresh = function () {
        
        $scope.nomeGrupo = '';
        $scope.vm = {
            grupos: []
        };

        var req = {
            method: 'GET',
            url: 'http://localhost:8080/grupos/' + $rootScope.usuarioLogado + '/amigo'/*,
            headers: {
                'Authorization': 'Bearer pedrocao',
                'Cache-Control': 'no-cache'
            }*/
        }

        $http(req).then(function (result) {
            result.data.forEach(function (item) {                
            $scope.vm.grupos.push({
                            idgrupo: item.idgrupo,
                            nome: item.nome,
                            data: item.datacriacao
                        });
        });
            console.log(result);

        }, function (error) {
            console.log(error);
        })
    }


    $scope.criarGrupo = function (item) {

        $scope.nomeGrupo = item;
        var confirmPopup = $ionicPopup.confirm({
            title: 'Amigos da Lu',
            template: 'Deseja criar o grupo ' + item + '?'
        });

        confirmPopup.then(function (res, item) {
            if (res) {
                var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/grupos/',/*,
                    headers: {
                        'Authorization': 'Bearer pedrocao',
                        'Cache-Control': 'no-cache'
                    }*/
                    data: {
                        idcriador: $rootScope.usuarioLogado,
                        nome: $scope.nomeGrupo
                    }
                }
                $http(req).then(function (response) {
                    console.log('Criado');
                    $scope.doRefresh();
                }, function (error) {
                    console.log(error);
                })
            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.delGrupo = function (idGrupo, nomeGrupo) {
                
                $scope.idGrupo = idGrupo;

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Amigos da Lu',
                    template: 'Deseja excluir o grupo ' + nomeGrupo + '? Todas mensagens e histórico do mesmo se perderão.'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        var req = {
                            method: 'DELETE',
                            url: 'http://localhost:8080/grupos/' + $scope.idGrupo/*,
                            headers: {
                                'Authorization': 'Bearer pedrocao',
                                'Cache-Control': 'no-cache'
                            }*/
                        }
                        $http(req).then(function (response) {
                            $scope.doRefresh();
                        }, function (error) {
                            console.log(error);
                        })
                    } else {
                        console.log('You are not sure');
                    }
                });
            };

    $scope.getMembros = function (idGrupo) {
        $rootScope.grupoSelecionado = idGrupo;
        location.href = "#/membros";        
    }

}])
   
.controller('produtosCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup, $rootScope) {

$scope.pesquisa = '';

        $scope.buscar = function (pesquisa) {

            $scope.pesquisa = pesquisa;

            $scope.vm = {
                categoria: '',
                produtos: [],
                maisItems: true
            };

            var width = 400;
            var height = 200;
            var nextPage = 'http://service.tst-5.magazineluiza.com.br/v1/product/list.json?q=' + $scope.pesquisa + '&startRecord=0&records=60&facet=main_category&facet=brand&statsFields=discount_price_200_0&x-api-key=bbe3e7e3-4414-11e4-9821-7831c1bb29d6'


            var req = {
                method: 'GET',
                url: nextPage
                /*headers: {
                    'Authorization': 'Bearer pedrocao',
                    'Cache-Control': 'no-cache'
                }*/
            }            

            $http(req).then(function (result) {                    
                result.data.data.products.forEach(function (order) {
                        $scope.vm.produtos.push({
                            categoria: order.mainCategory.name,
                            title: order.title,                                
                            full_image: 'http://i.mlcdn.com.br/180x120/' + order.image
                        });                        
                })
                
            }, function (error) {
                
                $scope.vm.maisItems = false;

                if (error.status === 404) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Pesquisa',
                        template: 'Produto não encontrado'
                    });
                }
                console.log(result);
            });
        };   

}])
   
.controller('sobreCtrl', ['$scope', '$stateParams', '$http', '$rootScope',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $rootScope) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$http', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $rootScope) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicPopup, $rootScope) {

        $rootScope.usuarioLogado = 0;
		$scope.usuario =  'alex.ayub@luizalabs.com';
        $scope.password = '123';

        $scope.entrar = function (usuario, password) {

            $scope.usuario = usuario;
            $scope.password = password;

            var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/logins/',
                    data: {
                        email: $scope.usuario,
                        senha: $scope.password
                    }
                };

                $http(req).then(function (result) {
                     if(result.data[0].resultado == 'FAIL') {
                        $ionicPopup.alert({
                            title: 'Amigos da Lu',
                            template: 'Login ou senha Inválidos'
                        });
                     } else {
                        $rootScope.usuarioLogado =  result.data[0].resultado;
                        location.href="#/menu/perfil" ;   
                     }                         
                }, function (error) {
                    $ionicPopup.alert({
                        title: 'Login',
                        template: 'Ocorreu algum erro ao se logar'
                    });
                    
                });
            
        }
        $scope.cadastrar = function () {
            location.href = "#/menu/cadastro";
        }

}])
   
.controller('cadastreSeCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicPopup) {

		$scope.email =  '';
        $scope.nome =  '';
        $scope.senha = '';
        $scope.celular = '';

        $scope.cadastrar = function (email, senha, nome, celular) {
            
	        $scope.email =  email;
	        $scope.nome =  nome;
	        $scope.senha = senha;
	        $scope.celular = celular;

        var req = {
                method: 'POST',
                url: 'http://localhost:8080/amigos/',/*,
                headers: {
                    'Authorization': 'Bearer pedrocao',
                    'Cache-Control': 'no-cache'
                },*/
                data: {
                    email: $scope.email,
                    senha: $scope.senha,
                    nome: $scope.nome,
                    celular: $scope.celular
                }
            };

            $http(req).then(function (result) {
                if (result.data.message[0].resultado == 'OK') {
                    $ionicPopup.alert({
                        title: 'Cadastro',
                        template: 'Usuário Cadastrado com sucesso'
                    }).then(function (res) {  
                        location.href = '#/templates/login.html';
                    });
                } else {
                    $ionicPopup.alert({
                        title: 'Amigos da Lu',
                        template: result.data.message[0].resultado
                    })
                }
                
            }, function (error) {
                if (error.status === 404) {
                    $ionicPopup.alert({
                        title: 'Cadastro erro',
                        template: 'Ocorreu algum erro'
                    });
                } else {
                    $ionicPopup.alert({
                        title: 'Cadastro Erro',
                        template: 'Ocorreu algum erro (' + error.status + ')'
                    });
                }
            });

            
        }

}])
   
.controller('membrosCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicPopup, $rootScope) {

        $scope.nomeGrupo = '';
        $scope.vm = {            
            membros: []
        };

        var req = {
            method: 'GET',
            url: 'http://localhost:8080/membros/' + $rootScope.grupoSelecionado + '/grupo'/*,
            headers: {
                'Authorization': 'Bearer pedrocao',
                'Cache-Control': 'no-cache'
            }*/
        }

        $http(req).then(function (result) {
            result.data.forEach(function (item) {
            $scope.nomeGrupo = item.grupo;    
            $scope.vm.membros.push({
                            idamigo: item.idamigo,
                            nome: item.nome,
                            celular: item.celular,
                            foto: item.foto
                        });
        });
            console.log(result);

        }, function (error) {
            console.log(error);
        })

}])
 