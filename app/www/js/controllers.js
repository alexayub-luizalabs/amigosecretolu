angular.module('app.controllers', [])
  
.controller('perfilCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {

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
   
.controller('mensagensCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {

    $scope.enviadas = function () {
        
        $scope.vm = {
            mensagens: []
        };

        var req = {
            method: 'GET',
            url: 'http://localhost:8080/mensagens/' + $rootScope.usuarioLogado + '/usuario/enviadas'/*,
            headers: {
                'Authorization': 'Bearer pedrocao',
                'Cache-Control': 'no-cache'
            }*/
        }

        $http(req).then(function (result) {
            result.data.forEach(function (item) {                
            $scope.vm.mensagens.push({
                            idmensagem: item.idmensagem,
                            anonima: item.anonima,
                            idremetente: item.idremetente,
                            iddestinatario: item.iddestinatario,
                            amigo: item.amigo,
                            foto: item.foto,
                            grupo: item.grupo,
                            dtenvio: item.dataenvio,
                            dtlida: item.datalida
                        });
        });
            console.log(result);

        }, function (error) {
            console.log(error);
        })
    }
    
    $scope.recebidas = function () {
        
        $scope.vm = {
            mensagens: []
        };

        var req = {
            method: 'GET',
            url: 'http://localhost:8080/mensagens/' + $rootScope.usuarioLogado + '/usuario/recebidas'/*,
            headers: {
                'Authorization': 'Bearer pedrocao',
                'Cache-Control': 'no-cache'
            }*/
        }

        $http(req).then(function (result) {
            result.data.forEach(function (item) {                
            $scope.vm.mensagens.push({
                            idmensagem: item.idmensagem,
                            anonima: item.anonima,
                            idremetente: item.idremetente,
                            iddestinatario: item.iddestinatario,
                            amigo: item.amigo,
                            foto: item.foto,
                            grupo: item.grupo,
                            dtenvio: item.dataenvio,
                            dtlida: item.datalida
                        });
        });
            console.log(result);

        }, function (error) {
            console.log(error);
        })
    }



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
                        isadmin: item.idadmin == $rootScope.usuarioLogado,
                        idgrupo: item.idgrupo,
                        nome: item.nome,
                        data: item.datacriacao
                    });
    });
        

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
                            isadmin: item.idadmin == $rootScope.usuarioLogado,
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
                        idadmin: $rootScope.usuarioLogado,
                        nome: $scope.nomeGrupo
                    }
                }
                $http(req).then(function (response) {
                    console.log('Criado');
                    $scope.nomeGrupo = '';
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
        location.href = "#/membros?idGrp=" + idGrupo;        
    }

}])
   
.controller('listaDePresentesCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {

    $scope.idgrp1 = 0;
    $scope.nomegrp1 = '';

    $scope.idgrp2 = 0;
    $scope.nomegrp2 = '';

    $scope.idgrp3 = 0;
    $scope.nomegrp3 = '';
    

    //Busca os grupos que participa
    var req = {
        method: 'GET',
        url: 'http://localhost:8080/grupos/' + '1' + '/amigo'/*,
        headers: {
            'Authorization': 'Bearer pedrocao',s
            'Cache-Control': 'no-cache'
        }*/
    }

    $http(req).then(function (result) {
        var cont = 0;
        result.data.forEach(function (item) {                
            if(cont == 0) {
                $scope.idgrp1 = item.idgrupo;
                $scope.nomegrp1 = item.nome;
            } else if(cont == 1) {
                $scope.idgrp2 = item.idgrupo;
                $scope.nomegrp2 = item.nome;
            } else {
                $scope.idgrp3 = item.idgrupo;
                $scope.nomegrp3 = item.nome;

            }
        cont++;
    });
        console.log(result);

    }, function (error) {
        console.log(error);
    });

    $scope.buscarLista = function (grupo) {

        $scope.grupo = grupo;

        $scope.vm = {
            produtos: []
        };

        var req = {
            method: 'GET',
            url: 'http://localhost:8080/presentes/' + $rootScope.usuarioLogado + '/amigo/' + $scope.grupo + '/grupo'
        };

        $http(req).then(function (result) {
              result.data.forEach(function (prod) {
                    $scope.vm.produtos.push({
                        idpresente: prod.idpresente,
                        idgrupo: prod.idgrupo,
                        idamigo: prod.idamigo,
                        produto: prod.produto,
                        dtinserido: prod.dtinserido,
                        comprado: prod.comprado 
                    });                        
            })
        }, function (error) {
            $ionicPopup.alert({
                title: 'Login',
                template: 'Ocorreu algum erro ao se logar'
            });
            
        });
        
    }


}])
   
.controller('produtosCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {

	$scope.pesquisa = '';	

	$scope.grupo1 = [];
    $scope.grupo2 = [];
    $scope.grupo3 = [];

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

	    //Pega os produtos
	    $http(req).then(function (result) {
	        result.data.data.products.forEach(function (order) {
	                $scope.vm.produtos.push({
	                    categoria: order.mainCategory.name,
	                    divSku: 'div_' + order.id,
	                    mostrar: false,
	                    title: order.title,
	                    full_image: 'http://i.mlcdn.com.br/180x120/' + order.image
	                });                        
	        })

	        //Busca os grupos que participa
	        var req = {
		        method: 'GET',
		        url: 'http://localhost:8080/grupos/' + $rootScope.usuarioLogado + '/amigo'/*,
		        headers: {
		            'Authorization': 'Bearer pedrocao',
		            'Cache-Control': 'no-cache'
		        }*/
		    }

		    $http(req).then(function (result) {
		    	var cont = 0;
		        result.data.forEach(function (item) {                
		        	if(cont == 0) {
		        		$scope.grupo1.idgrupo = item.idgrupo;
	                    $scope.grupo1.nome = item.nomeGrupo;
	                    $scope.grupo2 = '';
	                    $scope.grupo3 = '';
		        	} else if(cont == 1) {
		        		$scope.grupo2 = [];
		        		$scope.grupo2.idgrupo = item.idgrupo;
	                    $scope.grupo2.nome = item.nomeGrupo;
	                    $scope.grupo3 = '';
		        	} else {
		        		$scope.grupo3 = [];
		        		$scope.grupo3.idgrupo = item.idgrupo;
	                    $scope.grupo3.nome = item.nomeGrupo;
		        	}
		        cont++;
		    });
		        console.log(result);

		    }, function (error) {
		        console.log(error);
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

	$scope.exibeDiv = function (div){
		$scope.vm.produtos.forEach( function (prod) {
			if(prod.divSku == div ) {
				if(prod.mostrar == false) {
					prod.mostrar = true;
				} else {
					prod.mostrar = false;
				}
			}
		});
	}

	$scope.addItem = function (div, idgrupo){
		$scope.vm.produtos.forEach( function (prod) {
			if(prod.divSku == div ) {
				var produto = div.replace('div_','');

			}
		});
	}

}])
   
.controller('sobreCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {
    
}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup, $location) {

	$rootScope.usuarioLogado = 0;
	$scope.usuario =  'alexayub@gmail.com';
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
   
.controller('cadastreSeCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {

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
   
.controller('membrosCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, $ionicPopup, $location) {

    $scope.idGrupo = $location.search().idGrp;
    $scope.txtFone = '';

    $scope.valMinimo = 0;
    $scope.valMaximo = 5000;
    
	$scope.nomeGrupo = '';
        $scope.vm = {            
            membros: []
        };

        var req = {
            method: 'GET',
            url: 'http://localhost:8080/membros/' +  $scope.idGrupo + '/grupo'/*,
            headers: {
                'Authorization': 'Bearer pedrocao',
                'Cache-Control': 'no-cache'
            }*/
        }

        $http(req).then(function (result) {
            result.data.forEach(function (item) {
            $scope.nomeGrupo = item.grupo;
            $rootScope.nomeGrupo = item.grupo;    
            $scope.vm.membros.push({
                            isadmin: item.isadmin,
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

        $scope.doRefresh = function() {

            var req = {
                method: 'GET',
                url: 'http://localhost:8080/membros/' +  $scope.idGrupo + '/grupo'/*,
                headers: {
                    'Authorization': 'Bearer pedrocao',
                    'Cache-Control': 'no-cache'
                }*/
            }

            $http(req).then(function (result) {
                result.data.forEach(function (item) {
                    $scope.nomeGrupo = item.grupo;
                    $rootScope.nomeGrupo = item.grupo;    
                    $scope.vm.membros.push({
                        isadmin: item.isadmin,
                        idamigo: item.idamigo,
                        nome: item.nome,
                        celular: item.celular,
                        foto: item.foto,
                        inserido: item.inserido
                    });
                });
                console.log(result);

            }, function (error) {
                console.log(error);
            })

        }

        $scope.validarValorMin = function (valor) {
            if(valor >= $scope.valMaximo) {
                $scope.valMinimo = $scope.valMaximo - 10;
            } else {
                $scope.valMinimo = valor
            }
        }

        $scope.validarValorMax = function (valor) {
            if(valor <= $scope.valMinimo) {
                $scope.valMaximo = $scope.valMinimo + 10;
            } else {
                $scope.valMaximo = valor
            }
        }

        $scope.delMembro = function (celular) {
                
            $scope.celular = celular;

            var req = {
                method: 'DELETE',
                url: 'http://localhost:8080/membros/' + $location.search().idGrp + '/grupo/' + $scope.celular 
            };

            $http(req).then(function (result) {
                if (result.data.message[0].resultado == 'OK') {
                    $ionicPopup.alert({
                        title: 'Amigo Secreto da Lu',
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

        //Envia SMS para os telefones
        $scope.convidar = function(telefones) {
             
             //TODO: pegar o telefone do cliente             
             var celMail = telefones.split(',');

             celMail.forEach(function (tel) {
                
                //É celular
                if(!isNaN(parseFloat(tel)) && isFinite(tel)) {
                    var telefone = '55' + tel;
                    var data = { 
                         "from": "Amigo Secreto da Lu", 
                         "to": telefone,
                         "text":"Você foi convidado a entrar no grupo " + $rootScope.nomeGrupo + ". Amigo secreto da Lu." 
                        };
                     /*$http.post(
                         'https://api.infobip.com/sms/1/text/single',
                         JSON.stringify(data),
                         {
                             headers: {
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Basic bWFnbHVpemE6THVpemExNCE='
                             }
                         }
                     ).success(function (data) {
                         console.log(data);
                     });  */  
                
                     //verifica se a pessoa ja esta no app e adiciona aguardando confirmação
                     var req = {
                        method: 'GET',
                        url: 'http://localhost:8080/amigos/' + tel + '/celular'/*,
                        headers: {
                            'Authorization': 'Bearer pedrocao',
                            'Cache-Control': 'no-cache'
                        },*/                        
                    };

                    $http(req).then(function (result) {
                        result.data.forEach(function (item) {
                            var req = {
                                method: 'POST',
                                url: 'http://localhost:8080/membros/',/*,
                            headers: {
                                'Authorization': 'Bearer pedrocao',
                                'Cache-Control': 'no-cache'
                            },*/
                                data: {
                                    idgrupo: $location.search().idGrp,
                                    celular: item.celular
                                }
                            };

                            $http(req).then(function (result) {
                                $ionicPopup.alert({
                                    title: 'Amigos da Lu',
                                    template: 'Convite enviado com sucesso !'
                                })                                    
                            }, function (error) {
                                console.log(error);
                            });                 
                        
                        });
                    }, function (error) {
                            console.log(error);
                    })

                }

            });

        };

}])
 