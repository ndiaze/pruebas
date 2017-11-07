var app = angular.module('admin-procesos');

app.filter('estadoproceso', function() {
	return function(numero) {
        var estados = ['En espera','En proceso','Error','Finalizado']; 
		return estados[numero];
	}
});

app.controller('ProcesoController',['$scope','ProcesoFactory','$uibModal','urlBasePartials','idEmpresa',function ($scope,ProcesoFactory,$uibModal,urlBasePartials,idEmpresa) {
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
            $scope.help('Procesos');
        });

        $scope.validacion = function(proceso,valido){
            var v = new ProcesoFactory();
            v.validar = valido;
            v.idproceso = proceso;
            v.$patch({idEmpresa:idEmpresa }, function(response) {
                $scope.listaDeProcesos();
            });
        };
    
        $scope.procesos =[];
        $scope.listaDeProcesos= function (){
            ProcesoFactory.query({ idEmpresa: idEmpresa , 'expand[]': []}, function(retorno) {
                $scope.procesos = retorno;
            });   
        };
        $scope.listaDeProcesos();
    }]
);