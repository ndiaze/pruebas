(function(angular){
    
    angular.module('operador-mis-rutas', ['uiGmapgoogle-maps','ui.router','ngResource','ui.bootstrap','ui.calendar'])
    
    .constant('urlBase', saConstants.urlBase)
    .constant('urlBaseImg', saConstants.urlBaseImg)
    .constant('urlBaseApi', saConstants.urlBaseApi)
    .constant('urlBasePartials', saConstants.urlBaseTmp)
    .constant('apiKey', saConstants.apiKey)
    .constant('idEmpresa', saConstants.idEmpresa)
    .constant('idOperador', saConstants.idOperador)
    
    .run(['$http', 'apiKey', function($http, apiKey) {
        $http.defaults.headers.common = {'apikey': apiKey};
    }])

    .config( ['$stateProvider', '$urlRouterProvider', 'urlBasePartials','uiGmapGoogleMapApiProvider',
        function  ($stateProvider ,  $urlRouterProvider ,  urlBasePartials, uiGmapGoogleMapApiProvider) {
            
            var listaMisRutas = {
                name: 'mis_rutas',
                url: '/',
                controller: 'MisRutasController',
                templateUrl: urlBasePartials + 'mis_rutas.html'
            };

            var detalleMiRuta = {
                name: 'detalle_mi_ruta',
                url: '/detalle_ruta/:idRuta',
                controller: 'DetalleRutaController',
                templateUrl: urlBasePartials + 'detalle_ruta.html'
            };

            $stateProvider.state(listaMisRutas);
            $stateProvider.state(detalleMiRuta);

            $urlRouterProvider.when('', '/');
            
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyAQSqyqFQIfB_RPG0h7HC7-G25c7w2OkUI',
                v: '3.25',
                libraries: 'weather,geometry,visualization'
            });
        }
    ]);
})(angular);