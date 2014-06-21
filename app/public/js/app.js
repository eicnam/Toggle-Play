'use strict';

var togglePlayApp = angular.module('togglePlayApp', [
  'ngRoute',
  'togglePlayControllers',
  'flow'
  ]);
togglePlayApp.config(['$routeProvider', 'flowFactoryProvider'/*, '$locationProvider'*/,
  function($routeProvider, flowFactoryProvider/*, $locationProvider*/) {
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
      when('/Apps/Category/:category', {
        templateUrl: 'views/partials/apps.html',
        controller : 'AppsFilteredCtrl'
      }).      
      when('/Apps', {
        templateUrl: 'views/partials/apps.html',
        controller : 'AppsCtrl'
      }).
      when('/Apps/:appName', {
        templateUrl: 'views/partials/application_details.html',
        controller : 'AppDetailsCtrl'
      }).
      when('/404-NotFound', {
        templateUrl: 'views/error/404.html',
        controller : 'AppsCtrl'
      }).
      when('/', {
        templateUrl: 'views/partials/apps.html',
        controller : 'AppsCtrl'
      }).
      otherwise({
        redirectTo: '/404-NotFound'
      });

      flowFactoryProvider.defaults = {
        target: 'http://localhost:8080/#/api/application/add/upload',
        permanentErrors: [404, 500, 501],
        maxChunkRetries: 1,
        chunkRetryInterval: 5000,
        simultaneousUploads: 1,
        singleFile: true
      };
      flowFactoryProvider.on('catchAll', function (event) {
        console.log('catchAll', arguments);
      });

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);
}]);
