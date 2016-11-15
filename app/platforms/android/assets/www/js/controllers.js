angular.module('app.controllers', [])
      
     //Cadastro de novo Cliente
    .controller('cadastroCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup',
        function ($scope, $stateParams, $http, $ionicPopup) {
                        
            $scope.email =  '';
            $scope.nome =  '';
            $scope.senha = '';
            $scope.celular = '';

            $scope.cadastrar = function () {
                
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

    .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup',
        function ($scope, $stateParams, $http, $ionicPopup) {
                        
            $scope.usuario =  'alex.ayub@luizalabs.com';
            $scope.senha = '123';

            $scope.entrar = function (usuario, senha) {

                $scope.usuario = usuario;
                $scope.senha = senha;

                var req = {
                        method: 'POST',
                        url: 'http://localhost:8080/logins/',
                        data: {
                            email: $scope.usuario,
                            senha: $scope.senha
                        }
                    };

                    $http(req).then(function (result) {
                         if(result.data[0].resultado == 'FAIL') {
                            $ionicPopup.alert({
                                title: 'Amigos da Lu',
                                template: 'Login ou senha Inválidos'
                            });
                         } else {
                            location.href="#/menu/perfil?usu=" + result.data[0].resultado;   
                         }                         
                    }, function (error) {
                        if (error.status === 404) {
                            $ionicPopup.alert({
                                title: 'Pesquisa',
                                template: 'Produto não encontrado'
                            });
                        } else {
                            $ionicPopup.alert({
                                title: 'Lista',
                                template: 'Erro ao incluir produto (' + erro.status + ')'
                            });
                        }
                    });

                    
                
            }
            $scope.cadastrar = function () {
                location.href = "#/menu/cadastro";
            }
        }])

   

    .controller('perfilCtrl', ['$scope', '$stateParams', '$location', '$http',
        function ($scope, $stateParams, $location, $http) {

            //$scope.usuario =  $location.search().usu;
            $scope.usuario = 1;
            var req = {
                method: 'GET',
                url: 'http://localhost:8080/amigos/' + $scope.usuario/*,
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

    .controller('gruposCtrl', ['$scope', '$cordovaBarcodeScanner', '$ionicPlatform', '$location', '$http', '$ionicPopup',
        function ($scope, $cordovaBarcodeScanner, $ionicPlatform, $location, $http, $ionicPopup ) {
            
            $scope.nomeGrupo = '';
            $scope.usuario = 1; //$location.search().usu;

            $scope.vm = {
                grupos: []
            };

            var req = {
                method: 'GET',
                url: 'http://localhost:8080/grupos/' + $scope.usuario + '/amigo'/*,
                headers: {
                    'Authorization': 'Bearer pedrocao',
                    'Cache-Control': 'no-cache'
                }*/
            }

            $http(req).then(function (result) {
                result.data.forEach(function (item) {                
                $scope.vm.grupos.push({
                                idgrupo: item.idgrupo,
                                grupo: item.nome,
                                data: item.datacriacao,
                                amigo: item.amigo
                            });
            });
                console.log(result);

            }, function (error) {
                console.log(error);
            })

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
                                idcriador: $scope.usuario,
                                nome: $scope.nomeGrupo
                            }
                        }
                        $http(req).then(function (response) {
                            console.log('Criado');
                        }, function (error) {
                            console.log(error);
                        })
                    } else {
                        console.log('You are not sure');
                    }
                });
            }

            $scope.getMembros = function (idGrupo) {
                location.href = '#/templates/gruposDetalhe?grp=' + idGrupo;
            }

            
        }])

    
    .controller('gruposDetalheCtrl', ['$scope', '$cordovaBarcodeScanner', '$ionicPlatform', '$location', '$http', '$ionicPopup',
        function ($scope, $cordovaBarcodeScanner, $ionicPlatform, $location, $http, $ionicPopup ) {
            
            $scope.idGrupo = $location.search().grp;

            $scope.vm = {
                grupos: []
            };

            var req = {
                method: 'GET',
                url: 'http://localhost:8080/grupos/' + $scope.idGrupo /*,
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


            $scope.delGrupo = function (idGrupo) {
                
                $scope.idGrupo = idGrupo;
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Amigos da Lu',
                    template: 'Deseja excluir o grupo ' + item.title + '? Todas mensagens e histórico do mesmo se perderão.'
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

            
        }])
    

    
    .controller('produtosCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup',
        function ($scope, $stateParams, $http, $ionicPopup) {

            $scope.pesquisa = '';

            $scope.buscar = function (pesq) {

                $scope.pesquisa = pesq;

                $scope.vm = {
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
                    /*if (result.data.next === null) {
                        $scope.vm.maisItems = false;
                    }*/
                    //nextPage = result.data.next;
                    
                    result.data.data.products.forEach(function (order) {
                        
                            $scope.vm.produtos.push({
                                title: order.title,                                
                                full_image: 'http://i.mlcdn.com.br/180x120/' + order.image
                            });
                        
                    })
                    console.log($scope.vm.produtos);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }, function (error) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
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

    .controller('sobreCtrl', ['$scope', '$stateParams', '$http',
        function ($scope, $stateParams, $http) {

        }])

    .controller('addProdutoCtrl', ['$scope', '$stateParams', '$http',
        function ($scope, $stateParams, $http) {

        }])

    