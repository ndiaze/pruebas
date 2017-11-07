angular.module('admin-camiones')
.controller('CamionesController',['$scope','CamionFactory','OperadorFactory','$uibModal','urlBasePartials','idEmpresa',function ($scope,CamionFactory,OperadorFactory,$uibModal,urlBasePartials,idEmpresa) {
        
        $scope.help =  function(modulo){
        $scope.modulo = modulo;
        var modalInstance= $uibModal.open({
                templateUrl: urlBasePartials+'../../help.html',
                backdrop: 'static',
                size: 'lg',
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                controller: 'Help',
                resolve: {
                    modulo: function() {
                        return $scope.modulo;
                    }
                }
            });
            return modalInstance;
        };
    
        $("#help").click( function(){
            $scope.help('Camiones');
        });
    
    
        $scope.camiones=[];
        $scope.operadores=[];

        $scope.listaDeCamiones= function (){
            CamionFactory.query({ idEmpresa: idEmpresa , 'expand[]': ['r_camion_operador','operador_detalle']}, function(retorno) {
                $scope.camiones = retorno;
            });
        };
        
        $scope.listaDeOperadores= function (){
        OperadorFactory.query({ idEmpresa: idEmpresa , 'expand[]': []}, function(retorno) {
                $scope.operadores = retorno;
            });
        };

        $scope.listaDeCamiones();
        $scope.listaDeOperadores();

        $scope.accion = 1;
       
        $scope.nuevoCamion = function() {
            $scope.accion =1;
            $scope.camion =[];
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
               $scope.listaDeCamiones();
            }, function () {
            });
        };
        
        $scope.editarCamion = function(id) {
            $scope.accion = 2;
            $scope.camion =[];

            for(var i=0,len=$scope.camiones.length; i<len;i++)
            {
                if($scope.camiones[i].id_camion === id) {
                    $scope.camion.id = $scope.camiones[i].id_camion ;
                    $scope.camion.patente = $scope.camiones[i].patente_camion ;
                    $scope.camion.capacidad = $scope.camiones[i].capacidad_camion ;
                    $scope.camion.tipo_carga = $scope.camiones[i].tipo_carga_camion ;
                    $scope.camion.operador = $scope.camiones[i].camion_operador ;
                    break;
                }
            }
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
               $scope.listaDeCamiones();
            }, function () {
            });
        };
        
        $scope.eliminarCamion =  function(id){
            $scope.accion = 0; 
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
                var c = new CamionFactory();
                c.visible = 0;
                c.$patch({idEmpresa:idEmpresa,idCamion:id}, function(response) {
                    $scope.listaDeCamiones();
                });
            }, function () {
            }); 
        };
        
        $scope.modal =  function(){
             var modalInstance= $uibModal.open({
                templateUrl: urlBasePartials+'modal_camiones.html',
                backdrop: 'static',
                size: 'lg',
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                controller: 'PopupModal',
                resolve: {
                    accion: function() {
                        return $scope.accion;
                    },
                    camion: function() {
                        return $scope.camion;
                    },
                    operadores: function() {
                        return $scope.operadores;
                    }
                }
            });
            return modalInstance;
        };
    }]
)

.controller('PopupModal', ['$scope','$uibModalInstance','accion','CamionFactory','camion','idEmpresa','operadores', function ($scope,$uibModalInstance,accion,CamionFactory,camion,idEmpresa,operadores) {

    $scope.accion = accion;
    $scope.camion = camion;
    $scope.operadores = operadores;
    $scope.error   = '';
    $scope.confirm = '';
    $scope.mensaje = '';
    $scope.cam={tipo_carga:'1'};

    if($scope.accion === 1){
        $scope.mensaje = 'Nuevo' ;
    }
    
    if($scope.accion === 2){
        $scope.mensaje = 'Editar' ;
        $scope.cam.id = $scope.camion.id;
        $scope.cam.patente = $scope.camion.patente;
        $scope.cam.capacidad = $scope.camion.capacidad;
        $scope.cam.operador = $scope.camion.operador;
        if($scope.camion.tipo_carga === 1){
            $scope.cam.tipo_carga ='1';
        }else{
            $scope.cam.tipo_carga ='2';
        }
    }

    if($scope.accion === 0){
        $scope.mensaje ='Eliminar';
    }

    $scope.guardar= function(){
        
        $scope.error ='';
   
        if(!$scope.cam.tipo_carga){
            $scope.error = 'Indique tipo de carga del camión';
            return;
        }
        
        if(!$scope.cam.patente){
            $scope.error = 'Debe ingresa el número de patente del camión';
            return;
        }
        
        if(!$scope.cam.capacidad || $scope.cam.capacidad === 0){
            $scope.error = 'La capacidad del camión debe ser mayor que 0';
            return;
        }
        
        if(!$scope.cam.operador){
            $scope.error = 'Debe seleccionar el operador del camión';
            return;
        }
        var c = new CamionFactory();
        c.patente    = $scope.cam.patente;
        c.capacidad  = $scope.cam.capacidad;
        c.tipo_carga = $scope.cam.tipo_carga;
        c.operador   = $scope.cam.operador.id_operador;
        c.estado     = 1;
        c.visible    = 1;

        if(accion === 1)
        {
            c.$save({idEmpresa: idEmpresa}, function(response) {
               $uibModalInstance.close();
            });
        }else{ // Editar
            c.$patch({idEmpresa:idEmpresa, idCamion:$scope.cam.id }, function(response) {
                $uibModalInstance.close();
            });
        }
    };
    
    $scope.close = function () {
        $uibModalInstance.dismiss();
    };
    
    $scope.ok = function(){
        $uibModalInstance.close();
    };
}

]);