angular.module('operador-mis-rutas')

.factory('MisRutasFactory', ['$resource', 'urlBaseApi', function ($resource ,  urlBaseApi ) {
        return $resource(
            urlBaseApi + 'empresas/:idEmpresa/operadores/:idOperador/misrutas',
            {},
            {'query': {method: 'GET', isArray:true },'patch': {method:'PATCH'}}
         );
    }
])

.factory('DetalleRutaFactory',['$resource', 'urlBaseApi', function ($resource ,  urlBaseApi ) {
    return $resource(
        urlBaseApi + 'rutas/:idRuta',
        {},
        {/*'query': { method: 'GET', isArray:false },'patch': { method:'PATCH' }*/}
    );
}
]);