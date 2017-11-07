(function(angular){
    
    angular.module('superadmin-empresas', [ 'ui.router','ngResource','ui.bootstrap'])
    
    .constant('urlBase', saConstants.urlBase)
    .constant('urlBaseImg', saConstants.urlBaseImg)
    .constant('urlBaseApi', saConstants.urlBaseApi)
    .constant('urlBasePartials', saConstants.urlBaseTmp)
    .constant('apiKey', saConstants.apiKey)
   
    .run(['$http', 'apiKey', function($http, apiKey) {
        $http.defaults.headers.common = {'apikey': apiKey};
    }])

    .config( ['$stateProvider', '$urlRouterProvider', 'urlBasePartials',
        function  ($stateProvider ,  $urlRouterProvider ,  urlBasePartials) {
            var listaDeEmpresas = {
                name: 'lista_empresas',
                url: '/',
                controller: 'EmpresasController',
                templateUrl: urlBasePartials + 'lista_empresas.html'
            };
            $stateProvider.state(listaDeEmpresas);
            $urlRouterProvider.when('', '/');
        }
    ]);
})(angular);