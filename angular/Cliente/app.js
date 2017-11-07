(function(angular){
    
    angular.module('admin-clientes', [ 'ui.router','ngResource','ui.bootstrap'])
    
    .constant('urlBase', saConstants.urlBase)
    .constant('urlBaseImg', saConstants.urlBaseImg)
    .constant('urlBaseApi', saConstants.urlBaseApi)
    .constant('urlBasePartials', saConstants.urlBaseTmp)
    .constant('apiKey', saConstants.apiKey)
    .constant('idEmpresa', saConstants.idEmpresa)
   
    .run(['$http', 'apiKey', function($http, apiKey) {
        $http.defaults.headers.common = {'apikey': apiKey};
    }])

    .config( ['$stateProvider', '$urlRouterProvider', 'urlBasePartials',
        function  ($stateProvider ,  $urlRouterProvider ,  urlBasePartials) {
            var listaDeClientes = {
                name: 'lista_clientes',
                url: '/',
                controller: 'ClientesController',
                templateUrl: urlBasePartials + 'lista_clientes.html'
            };
            $stateProvider.state(listaDeClientes);
            $urlRouterProvider.when('', '/');
        }
    ]);
})(angular);