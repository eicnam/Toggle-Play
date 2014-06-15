'use strict';

var togglePlayApp = angular.module('togglePlayApp', [
  'ngRoute',
  'togglePlayControllers'
  ]);
togglePlayApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/Apps/Add', {
        templateUrl: 'views/partials/application_add.html',
        controller : 'AppAddCtrl'
      }).
      when('/Apps/Update', {
        templateUrl: 'views/partials/application_update.html',
        controller : 'AppUpdateCtrl'
      }).
      when('/Apps/Update/:appid', {
        templateUrl: 'views/partials/application_update.html',
        controller : 'AppUpdateCtrl'
      }).
      when('/Apps/Delete/:appid', {
        templateUrl: 'views/partials/application_delete.html',
        controller : 'AppDeleteCtrl'
      }).
      when('/Apps/Delete', {
        templateUrl: 'views/partials/application_delete.html',
        controller : 'AppDeleteCtrl'
      }).
      when('/Apps', {
        templateUrl: 'views/partials/apps.html',
        controller : 'AppsCtrl'
      }).
      when('/Apps/:appName', {
        templateUrl: 'views/partials/application_details.html',
        controller : 'AppDetailsCtrl'
      }).
      when('/', {
        templateUrl: 'views/home.html'
      }).
      otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);
