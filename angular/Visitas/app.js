(function(angular){
    
    angular.module('cliente-visitas', ['ui.router','ngResource','ui.bootstrap','ui.calendar'])
    
    .constant('urlBase', saConstants.urlBase)
    .constant('urlBaseImg', saConstants.urlBaseImg)
    .constant('urlBaseApi', saConstants.urlBaseApi)
    .constant('urlBasePartials', saConstants.urlBaseTmp)
    .constant('apiKey', saConstants.apiKey)
    .constant('idEmpresa', saConstants.idEmpresa)
    .constant('idCliente', saConstants.idCliente)
    
   
    .run(['$http', 'apiKey', function($http, apiKey) {
        $http.defaults.headers.common = {'apikey': apiKey};
    }])

    .config( ['$stateProvider', '$urlRouterProvider', 'urlBasePartials',
        function  ($stateProvider ,  $urlRouterProvider , urlBasePartials) {
            var listaDeVisitas = {
                name: 'lista_visitas',
                url: '/',
                controller: 'VisitasController',
                templateUrl: urlBasePartials + 'lista_visitas.html'
            };
            $stateProvider.state(listaDeVisitas);
            $urlRouterProvider.when('', '/');
        }
    ]);
})(angular);