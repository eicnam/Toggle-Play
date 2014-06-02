'use strict';

var togglePlayApp = angular.module('togglePlayApp', [
  'ngRoute',
  'togglePlayControllers'
]);


togglePlayApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/la', {
        templateUrl: 'views/partials/partial1.html',
        controller: 'togglePlayCtrl'
      }).
      when('/home', {
        templateUrl: 'views/home.html'
      });
  }]);
