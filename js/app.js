'use strict';

var togglePlayApp = angular.module('togglePlayApp', [
  'ngRoute',
  'togglePlayControllers'
]);
togglePlayApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('la', {
        templateUrl: 'views/partials/partial1.html',
        controller: 'togglePlayCtrl'
      }).
      when('/home', {
        templateUrl: 'views/home.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
