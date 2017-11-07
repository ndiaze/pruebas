(function(angular){
    
    angular.module('superadmin-centro-de-acopio', [ 'ui.router','ngResource','ui.bootstrap'])
    
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
            var listaDeCentros = {
                name: 'lista_centros',
                url: '/',
                controller: 'CentroController',
                templateUrl: urlBasePartials + 'lista_centros.html'
            };
            $stateProvider.state(listaDeCentros);
            $urlRouterProvider.when('', '/');
        }
    ]);
})(angular);