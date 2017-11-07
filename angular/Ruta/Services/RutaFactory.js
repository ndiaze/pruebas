angular.module('admin-rutas')

.factory('RutaFactory', ['$resource', 'urlBaseApi', function ($resource ,  urlBaseApi ) {
        return $resource(
            urlBaseApi + 'empresas/:idEmpresa/rutas/',
            {},
            {'query': {method: 'GET', isArray:true },'patch': {method:'PATCH'}}
         );
    }
]);