angular.module('operador-mis-rutas')

.filter('estadoVisita', function() {
	return function(numero) {
        var estados = [ 'Por realizar','En proceso','Con problemas','Cancelada','Realizada' ]; 
		return estados[numero];
	}
}).filter('classestado', function() {
	return function(numero) {
        var estados = [ 'warning','info','danger','danger','success' ]; 
		return estados[numero];
	}
})

.controller('DetalleRutaController',['DetalleRutaFactory','urlBasePartials','uiGmapGoogleMapApi','$scope','$state','$http','$uibModal',
        function(DetalleRutaFactory,urlBasePartials,uiGmapGoogleMapApi,$scope,$state,$http,$uibModal) {
           
            $scope.detalleDeLaRuta= function (){
                DetalleRutaFactory.get( {idRuta:$state.params.idRuta,'expand[]': ['r_ruta_operador','operador_detalle','r_ruta_camion','camion_detalle','r_operador_usuario',
                                                                                  'r_usuario_empresa','r_empresa_centro_acopio','centro_detalle','r_ruta_detalle','rutaDet_detalle',
                                                                                  'r_ruta_cliente','cliente_detalle','r_cliente_comuna','comuna_detalle'] }, function(retorno) {

                    $scope.ruta = retorno;

                    $scope.map={
                        center:{
                            latitude:  $scope.ruta.ruta_operador.usuario.empresa.centro_de_acopio.latitud_centro, 
                            longitude: $scope.ruta.ruta_operador.usuario.empresa.centro_de_acopio.longitud_centro
                        }, 
                        zoom: 15,
                        options: {
                            streetViewControl: true,
                            panControl: true,
                            maxZoom: 20,
                            minZoom: 3
                          }
                    };
                
                    $scope.polylines = [];
                
                    uiGmapGoogleMapApi.then(function(){
                        $scope.randomMarkers = $scope.ruta.ruta_detalle;
                        $scope.polylines = [
                        {
                            editable: false,
                            draggable: false,
                            geodesic: true,
                            visible: true,
                            path: $scope.ruta.ruta_detalle,
                            stroke: {
                                color: '#6060FB',
                                weight: 2
                            }  
                        }];
                    });
                
                    uiGmapGoogleMapApi.then(function(maps) {
                        maps.visualRefresh = true;
                    });
                
                    var origCenter = { latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude };
                });
            };

            $scope.detalleDeLaRuta();

            $scope.comentario = function(rutadetalle){
                $scope.centro  = $scope.ruta.ruta_operador.usuario.empresa.centro_de_acopio.nombre_centro;
                $scope.detalle = rutadetalle;
                var modalInstance = $scope.modal();
                modalInstance.result.then(function()
                {
                    $scope.detalleDeLaRuta();
                }, function () {  
                });
            };

            $scope.modal =  function(){
                var modalInstance= $uibModal.open({
                    templateUrl: urlBasePartials+'modal_rutadetalle.html',
                    backdrop: 'static',
                    size: 'lg',
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    controller: 'PopupModal',
                    resolve: {
                        detalle: function() {
                            return $scope.detalle;
                        },centro: function() {
                            return $scope.centro;
                        }
                    }
                });
                return modalInstance;
             };
        }
    ]
)

.controller('PopupModal', ['$scope','$uibModalInstance','detalle','centro','DetalleRutaFactory',
    function ($scope,$uibModalInstance,detalle,centro,DetalleRutaFactory) {
    $scope.centro = centro;
    $scope.nombre    = detalle.ruta_cliente.cliente_nombre;
    $scope.direccion = detalle.ruta_cliente.cliente_direccion;
    $scope.numero    = detalle.ruta_cliente.cliente_numero;
    $scope.comuna    = detalle.ruta_cliente.comuna.comuna_nombre;
    $scope.telefono  = detalle.ruta_cliente.cliente_telefono;
    $scope.celular   = detalle.ruta_cliente.cliente_celular;
    $scope.correo    = detalle.ruta_cliente.cliente_correo;
    $scope.iddetalle = detalle.id;
    $scope.comentario= detalle.comentario;

    $scope.estados = [ {id: 0,nombre: 'Por realizar'}, 
                       {id: 1,nombre: 'En proceso'}, 
                       {id: 2,nombre: 'Con problemas'}, 
                       {id: 3,nombre: 'Cancelada'}, 
                       {id: 4,nombre: 'Realizada'}
                     ];
    $scope.mensaje ="";

    $scope.estadocliente = $scope.estados[detalle.estado];

    $scope.guardar = function(){

        var datos = new DetalleRutaFactory();
        datos.estado  = $scope.estadocliente.id;
        datos.comentario  = $scope.comentario;
        datos.$save({idRuta: $scope.iddetalle, 'expand[]': []}, function(response) {
            if(response.error){
               
            }else{
                $scope.mensaje = "Cambios guardados correctamente.";
                $scope.ok();
            }
        });
    }
    
    $scope.close = function () {
        $uibModalInstance.dismiss();
    };

    $scope.ok = function(){
        $uibModalInstance.close();
    };
}
]);