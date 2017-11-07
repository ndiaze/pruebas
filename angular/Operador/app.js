(function(angular){
    
    angular.module('admin-operadores', [ 'ui.router','ngResource','ui.bootstrap'])
    
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
            var listaDeRutas = {
                name: 'lista_operadores',
                url: '/',
                controller: 'OperadoresController',
                templateUrl: urlBasePartials + 'lista_operadores.html'
            };
            $stateProvider.state(listaDeRutas);
            $urlRouterProvider.when('', '/');
        }
    ]);
})(angular);