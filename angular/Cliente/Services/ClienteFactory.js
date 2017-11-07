angular.module('admin-clientes')

.factory('ClienteFactory', ['$resource', 'urlBaseApi', function ($resource ,  urlBaseApi ) {
        return $resource(
            urlBaseApi + 'empresas/:idEmpresa/clientes/:idCliente',
            {},
            {'query': {method: 'GET', isArray:true },'patch': {method:'PATCH'}}
);
    }
])
.factory('FrecuenciaFactory', ['$resource', 'urlBaseApi', function ($resource ,  urlBaseApi ) {
        return $resource(
            urlBaseApi + 'frecuencias/',
            {},
            {'query': {method: 'GET', isArray:true },'patch': {method:'PATCH'}}
         );
    }
])
.factory('ComunaFactory', ['$resource', 'urlBaseApi', function ($resource ,  urlBaseApi ) {
        return $resource(
            urlBaseApi + 'comunas/',
            {},
            {'query': {method: 'GET', isArray:true }}
         );
    }
]);