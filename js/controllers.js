var fis3Controllers = angular.module('fis3Controllers', []);

fis3Controllers.controller('HomeCtrl', ['$scope', '$http']);

angular.module('fis3App', ['ngRoute', 'fis3Controllers']).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: './html/home.html'
        });

        $routeProvider.when('/fuerza-electrica', {
            templateUrl: './html/fuerza-electrica.html'
        });

        $routeProvider.when('/fuerza-electrica/dos-particulas-puntuales', {
            templateUrl: './html/fuerza-electrica-dos-particulas-puntuales.html'
        });
        $routeProvider.when('/fuerza-electrica/esfera-conductora-cargada', {
            templateUrl: './html/fuerza-electrica-esfera-conductora-cargada.html'
        });
        $routeProvider.when('/fuerza-electrica/hilo-muy-largo-cargado', {
            templateUrl: './html/fuerza-electrica-hilo-muy-largo-cargado.html'
        });

        $routeProvider.when('/campo-electrico', {
            templateUrl: './html/campo-electrico.html'
        });

        $routeProvider.when('/potencial-electrico', {
            templateUrl: './html/potencial-electrico.html'
        });

        $routeProvider.when('/circuito-electrico', {
            templateUrl: './html/circuito-electrico.html'
        });
    }]
);