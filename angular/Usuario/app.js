(function(angular){
    
    angular.module('superadmin-usuarios', [ 'ui.router','ngResource','ui.bootstrap'])
    
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
            var listaDeUsuarios = {
                name: 'lista_usuarios',
                url: '/',
                controller: 'UsuarioController',
                templateUrl: urlBasePartials + 'lista_usuarios.html'
            };
            $stateProvider.state(listaDeUsuarios);
            $urlRouterProvider.when('', '/');
        }
    ]);
})(angular);