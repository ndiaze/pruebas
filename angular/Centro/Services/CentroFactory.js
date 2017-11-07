angular.module('superadmin-centro-de-acopio')

.factory('CentroFactory', ['$resource', 'urlBaseApi', function ($resource ,  urlBaseApi ) {
        return $resource(
            urlBaseApi + 'centros/:idCentro',
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