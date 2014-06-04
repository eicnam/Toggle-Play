'use strict';

var togglePlayControllers = angular.module('togglePlayControllers', []);

togglePlayControllers.controller('togglePlayCtrl', ['$scope','$http',
  function ($scope,$http) {
	console.log("ici");
	$scope.appname="salut";

	$scope.insertInDatabase = function(){
		$http({method: 'GET', url: '/api/application'}).
		    success(function(data, status, headers, config) {
			    $scope.appname = data; 
			    console.log(data);
		    }).
		    error(function(data, status, headers, config) {
			    console.log('Error: ' + data);
		    });	
	}
  }
]);


//togglePlayControllers.controller('AppController', ['$scope', '$http',function($scope,$http) {
//      
//     $scope.find = function(){
//		$http({method: 'GET', url: '/app'}).
//		    success(function(data, status, headers, config) {
//			    $scope.mesApp = data; 
//			    console.log(data);
//		    }).
//		    error(function(data, status, headers, config) {
//			    console.log('Error: ' + data);
//		    });	
//	}
//       
// 
//   
//}]);