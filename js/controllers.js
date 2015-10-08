var fis3Controllers = angular.module('fis3Controllers', []);

fis3Controllers.controller('HomeCtrl', ['$scope', '$http']);

angular.module('fis3App', ['ngRoute', 'fis3Controllers']).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: './html/home.html'
        });

        $routeProvider.when('/fuerza-electrica', {
            templateUrl: './html/fuerza-electrica.html'
        });

        $routeProvider.when('/campo-electrico', {
            templateUrl: './html/campo-electrico.html'
        });

        $routeProvider.when('/potencial-electrico', {
            templateUrl: './html/potencial-electrico.html'
        });
    }]
);