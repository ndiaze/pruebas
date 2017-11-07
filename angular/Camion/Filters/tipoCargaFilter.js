/**
* Filtro que entrega un texto para el tipo de carga del camión
*/
angular.module('admin-camiones')
.filter('tipoCarga', function() {
	return function(numero, especial, peligrosa) {
		return (numero === 1) ? especial : peligrosa;
	}
});