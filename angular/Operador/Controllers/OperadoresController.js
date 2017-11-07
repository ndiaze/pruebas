var app = angular.module('admin-operadores');
app.controller('OperadoresController',['$scope','OperadorFactory','$uibModal','urlBasePartials','idEmpresa',function ($scope,OperadorFactory,$uibModal,urlBasePartials,idEmpresa) {
        
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
            $scope.help('Operadores');
        });
        
        $scope.operadores =[];

        $scope.listaDeOperadores= function (){
            OperadorFactory.query({ idEmpresa: idEmpresa , 'expand[]': ['r_operador_usuario','usuario_detalle']}, function(retorno) {
                $scope.operadores = retorno;   
            });   
        };
        
        $scope.listaDeOperadores();

        $scope.accion = 1;
       
        $scope.nuevoOperador = function() {
            $scope.accion =1;
            $scope.operador =[];
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
               $scope.listaDeOperadores();
            }, function () {
            });
        };

        $scope.editarOperador = function(id) {
           
            $scope.accion = 2;
            $scope.operador =[];
            
            for(var i=0,len=$scope.operadores.length; i<len;i++)
            {
                if($scope.operadores[i].id_operador === id){
                    $scope.operador.id=$scope.operadores[i].id_operador ;
                    $scope.operador.nombre=$scope.operadores[i].nombre_operador ;
                    $scope.operador.apellido=$scope.operadores[i].apellido_operador ;
                    $scope.operador.rut=$scope.operadores[i].rut_operador ;
                    $scope.operador.licencia=$scope.operadores[i].licencia_operador ;
                    $scope.operador.celular=$scope.operadores[i].celular_operador ;
                    $scope.operador.correo=$scope.operadores[i].correo_operador ;
                    break;
                }
            }
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
               $scope.listaDeOperadores();
            }, function () {
            });
        };
        
        $scope.eliminarOperador =  function(id){
            $scope.accion = 0; 
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
                var o = new OperadorFactory();
                o.visible = false;
                o.$patch({idEmpresa:idEmpresa,idOperador:id}, function(response) {
                    $scope.listaDeOperadores();
                });
            }, function () {
            }); 
        };
        
        $scope.modal =  function(){
             var modalInstance= $uibModal.open({
                templateUrl: urlBasePartials+'modal_operadores.html',
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
                    operador: function() {
                        return $scope.operador;
                    }
                }
            });
            return modalInstance;
        };
    }]
)

.controller('PopupModal', ['$scope','$uibModalInstance','accion','OperadorFactory','operador','validarRut','idEmpresa', function ($scope,$uibModalInstance,accion,OperadorFactory,operador,validarRut,idEmpresa) {

    $scope.mensaje = '';
    $scope.error   = '';
    $scope.confirm = '';
    $scope.accion  = accion;
    $scope.ope = operador;

    if($scope.accion === 1){
        $scope.mensaje = 'Nuevo' ;
    }
    
    if($scope.accion === 2){
        $scope.mensaje = 'Editar';
    }
    
    if($scope.accion === 0){
        $scope.mensaje ='Eliminar';
    }

    $scope.guardar= function(){

        if(!$scope.ope.nombre){
            $scope.error = 'Ingrese nombre del operador';
            return;  
        }
        if(!$scope.ope.apellido){
            $scope.error = 'Ingrese apellido del operador.';
            return; 
        }
        if(!validarRut($scope.ope.rut)){
            $scope.error = 'El RUT no es válido.';
            $scope.ope.rut = '';
            return;
        }
        if(!$scope.ope.licencia){
            $scope.error = 'Ingrese n° de licencia del operador.';
            return;   
        }
        
        if($scope.ope.celular > 999999999)
        {
            $scope.error = 'El campo celular deben tener máximo 9 dígitos.';
            return;
        }

        var o = new OperadorFactory();
        o.nombre = $scope.ope.nombre;
        o.apellido = $scope.ope.apellido;
        o.rut = $scope.ope.rut;
        o.licencia = $scope.ope.licencia;
        o.correo = $scope.ope.correo;
        o.celular = $scope.ope.celular;
        o.visible = true;
        if(accion === 1)
        {
            o.$save({idEmpresa: idEmpresa}, function(response) {
               $uibModalInstance.close();
            });
        }else{ // Editar
            o.$patch({idEmpresa:idEmpresa, idOperador:$scope.ope.id }, function(response) {
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