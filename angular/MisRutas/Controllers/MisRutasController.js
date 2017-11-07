angular.module('operador-mis-rutas')
.controller('MisRutasController',['$state','$scope','$http','uiCalendarConfig','$uibModal','urlBasePartials','MisRutasFactory','idEmpresa','idOperador',function ($state,$scope,$http,uiCalendarConfig,$uibModal,urlBasePartials,MisRutasFactory,idEmpresa,idOperador) {

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
        $scope.help('Mis rutas');
    });

    $scope.eventSources = [];
    $scope.SelectedEvent=null;
    $scope.mes = 0;
    $scope.anio= 0;
    
    $scope.listaDeRutas= function (){
    MisRutasFactory.query({idEmpresa:idEmpresa, idOperador:idOperador, mes:$scope.mes, anio:$scope.anio ,'expand[]': []}, function(retorno) {
            angular.forEach(retorno, function(value,key){
                $scope.events.push(value);
            });
        });
    };

    $scope.events = [];
    $scope.evento = [];

    $scope.mostrarEvento = function(evento) {

        $scope.evento = evento;
        $state.go('detalle_mi_ruta', {idRuta:$scope.evento.id});
    };

    $scope.eventsF = function (start, end, timezone, callback) {
        var y = new Date(start).getFullYear();
        var s = new Date(start).getTime() / 1000;
        $scope.mes = s + 604800;
        $scope.anio= y;
    };

    $scope.uiConfig = {
            calendar: {
                    height: 500,
                    editable: true,
                    displayEventTime:false,
                    fixedWeekCount : false,
                    header: {
                    left:  'prev,next,today',
                    center:'title',
                    right: 'agendaDay,agendaWeek,month'
            },
            buttonText:
            {
                day   : 'Día',
                month : 'Mes',
                week  : 'Semana',
                today : 'Hoy'
            },
            monthNames      : ['Enero' , 'Febrero' , 'Marzo' , 'Abril' , 'Mayo' , 'Junio' , 'Julio' ,'Agosto' , 'Septiembre' , 'Octubre' , 'Noviembre' , 'Diciembre' ],
            monthNamesShort : ['Ene' , 'Feb' , 'Mar' , 'Abr' , 'May' , 'Jun' , 'Jul' ,'Ago' , 'Sep' , 'Oct' , 'Nov' , 'Dec' ],
            dayNames        : ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            dayNamesShort   : ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            eventClick: function(event){
                $scope.mostrarEvento(event);
            }
        }
    };
     
    $scope.eventSources = [$scope.events,$scope.eventsF,$scope.listaDeRutas];
      
    }]
);