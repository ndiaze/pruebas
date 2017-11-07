angular.module('admin-clientes')
.controller('ClientesController',['$scope','ClienteFactory','$uibModal','urlBasePartials','ComunaFactory','FrecuenciaFactory','idEmpresa',function ($scope,ClienteFactory,$uibModal,urlBasePartials,ComunaFactory,FrecuenciaFactory,idEmpresa) {
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
            $scope.help('Clientes');
        });
    
    
        $scope.clientes =[];

        $scope.listaDeClientes= function (){
            ClienteFactory.query({ idEmpresa: idEmpresa , 'expand[]': []}, function(retorno) {
                $scope.clientes = retorno;
            });   
        };

        $scope.frecuencias =[];
        $scope.listaDeFrecuencias= function (){
            FrecuenciaFactory.query({'expand[]': []}, function(retorno) {
                $scope.frecuencias = retorno;
            });
        };

        $scope.comunas =[];
        $scope.listaDeComunas= function (){
            ComunaFactory.query({'expand[]': []}, function(retorno) {
                $scope.comunas = retorno;      
            });
        };

        $scope.listaDeClientes();
        $scope.listaDeFrecuencias();
        $scope.listaDeComunas();

        $scope.accion = 1;
       
        $scope.nuevoCliente = function() {
            $scope.accion =1;
            $scope.cliente =[];
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
               $scope.listaDeClientes();
            }, function () {
            });
        };
        
        $scope.editarCliente = function(id) {
           
            $scope.accion = 2;
            $scope.cliente =[];
            
            for(var i=0,len=$scope.clientes.length; i<len;i++)
            {
                if($scope.clientes[i].cliente_id === id) {
                    $scope.cliente.id =$scope.clientes[i].cliente_id ;
                    $scope.cliente.nombre =$scope.clientes[i].cliente_nombre ;
                    $scope.cliente.direccion =$scope.clientes[i].cliente_direccion ;
                    $scope.cliente.numero =$scope.clientes[i].cliente_numero ;
                    $scope.cliente.telefono =$scope.clientes[i].cliente_telefono ;
                    $scope.cliente.celular =$scope.clientes[i].cliente_celular ;
                    $scope.cliente.correo =$scope.clientes[i].cliente_correo ;
                    $scope.cliente.demanda =$scope.clientes[i].cliente_demanda ;
                    $scope.cliente.frecuencia =$scope.clientes[i].cliente_frecuencia ;
                    $scope.cliente.theta =$scope.clientes[i].cliente_theta ;
                    $scope.cliente.comuna =$scope.clientes[i].comuna ;
                    break;
                }
            }
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
               $scope.listaDeClientes();
            }, function () {
            });
        };
        
        $scope.eliminarCliente =  function(id){
            $scope.accion = 0; 
            var modalInstance = $scope.modal();
            modalInstance.result.then(function()
            {
                var c = new ClienteFactory();
                c.visible = false;
                c.$patch({idEmpresa:idEmpresa,idCliente:id}, function(response) {
                    $scope.listaDeClientes();
                });
            }, function () {
            }); 
        };
        
        $scope.modal =  function(){
             var modalInstance= $uibModal.open({
                templateUrl: urlBasePartials+'modal_clientes.html',
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
                    cliente: function() {
                        return $scope.cliente;
                    }
                    ,
                    frecuencias: function() {
                        return $scope.frecuencias;
                    },
                    comunas: function() {
                        return $scope.comunas;
                    }

                }
            });
            return modalInstance;
        };
    }]
)

.controller('PopupModal', ['$scope','$uibModalInstance','accion','ClienteFactory','cliente','frecuencias','comunas','idEmpresa', function ($scope,$uibModalInstance,accion,ClienteFactory,cliente,frecuencias,comunas,idEmpresa) {
    $scope.accion=accion;
    $scope.cli=cliente;
    $scope.frecuencias=frecuencias;
    $scope.comunas=comunas;
    $scope.error='';
    $scope.confirm='';
    $scope.mensaje='';
    
    if($scope.accion === 1){
        $scope.mensaje = 'Nuevo' ;
    }
    
    if($scope.accion === 2){
        $scope.mensaje = 'Editar' ;
    }
    
    if($scope.accion === 0){
        $scope.mensaje ='Eliminar';
    }

    
    $scope.guardar= function(){

        if(!$scope.cli.nombre){
            $scope.error = 'Ingrese nombre del cliente';
            return;
        }

        if(!$scope.cli.demanda){
            $scope.error = 'Ingrese demanda del cliente.';
            return;
        }

        if(!$scope.cli.frecuencia){
            $scope.error = 'Ingrese frecuencia del cliente';
            return;
        }

        if(!$scope.cli.direccion){
            $scope.error = 'Ingrese dirección del cliente';
            return;
        }

        if(!$scope.cli.numero){
            $scope.error = 'Ingrese número de la dirección del cliente';
            return;
        }

        if(!$scope.cli.comuna){
            $scope.error = 'Ingrese comuna del cliente';
            return;
        }

        if(!$scope.cli.telefono && !$scope.cli.celular){
            $scope.error = 'Ingrese teléfono o celular del cliente';
            return;
        }

        $scope.error = '';

        var c = new ClienteFactory();
        c.nombre=$scope.cli.nombre;
        c.frecuencia=$scope.cli.frecuencia.frecuencia_id;
        c.direccion=$scope.cli.direccion;
        c.numero= $scope.cli.numero;
        c.comuna= $scope.cli.comuna.comuna_id;
        c.telefono=$scope.cli.telefono;
        c.celular=$scope.cli.celular;
        c.correo=$scope.cli.correo;
        c.demanda=$scope.cli.demanda;
        c.theta=$scope.cli.theta;
        c.visible=true;
        if(accion === 1)
        {
            c.$save({idEmpresa:idEmpresa}, function(response) {
               $uibModalInstance.close();
            });
        }else{ // Editar
            c.$patch({idEmpresa:idEmpresa, idCliente:$scope.cli.id }, function(response) {
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