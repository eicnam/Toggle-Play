var togglePlayControllers = angular.module('togglePlayControllers', []);

togglePlayControllers.controller('togglePlayCtrl', ['$scope',
  function ($scope) {
	var mongoose = require('mongoose');  
	mongoose.connect('mongodb://localhost/test', function(err) {
		if (err) { throw err; }
	});
  }
]);
