'use strict';

var togglePlayControllers = angular.module('togglePlayControllers', []);

togglePlayControllers
	.controller('AppsCtrl', ['$scope','$http',
		function ($scope,$http) {

			$scope.title = 'Discover our wonderful Apps :';

			// when landing on the page, get all apps and show them
			$http.get('/api/application')
				.success(function(data) {
					$scope.apps = data.apps;
				})
				.error(function(data) {
					$scope.error = '<span style="color:red;">An error occurred : ' + data + '</span>';
				});
		}]
	)
	.controller('AppAddCtrl', ['$scope','$http',
		function ($scope,$http) {

			$scope.title = 'You want to create an App ?';
			$scope.subtitle = 'It\'s just there !';

			// when submitting the add form, send the text to the node API
			$scope.createApp = function() {
				$http.post('/api/application/add', $scope.newApp)
					.success(function(data) {
						$scope.newApp = {}; // clear the form so our user is ready to enter another
						$scope.confirmMessage = data.message;
					})
					.error(function(data) {
						$scope.error = 'An error occurred : ' + data;
					});
			};
		}]
	)
	.controller('AppUpdateCtrl', ['$scope', '$http',
		function ($scope, $http) {

			$scope.title = 'This App is not really perfect ...';
			$scope.subtitle = 'Well, update it !';

			// when landing on the page, get all apps and show them
			$http.get('/api/application')
				.success(function(data) {
					$scope.apps = data.apps;
				})
				.error(function(data) {
					$scope.error = '<span style="color:red;">An error occurred : ' + data + '</span>';
				});

			// when submitting the app to update, get the app and displays it
			$scope.getAppForUpdate = function(name){
				$http.get('/api/application/' + name)
					.success(function(data) {
						$scope.app_update = data.appDetails;
					})
					.error(function(data) {
						$scope.error = '<span style="color:red;">An error occurred : ' + data + '</span>';
					});
			};
			// when submitting the changes, get all apps and show them
			$scope.updateApp = function(id){
				$http.put('/api/application/update/' + id, $scope.app_update)
					.success(function(data) {
						$scope.message = data.message;
						$scope.app_update = null;

						$http.get('/api/application')
							.success(function(data) {
								$scope.apps = data.apps;
							})
							.error(function(data) {
								$scope.error = '<span style="color:red;">An error occurred : ' + data + '</span>';
							});
					})
					.error(function(data) {
						$scope.error = '<span style="color:red;">An error occurred : ' + data + '</span>';
					});
			};
		}]
	)	
	.controller('AppDetailsCtrl', ['$scope','$routeParams', '$http',
		function ($scope,$routeParams, $http) {

			var appName = $routeParams.appName;

			$scope.title = appName;

			// when landing on the page, get all information on the app and show them
			$http.get('/api/application/' + appName)
				.success(function(data) {
					$scope.app = data.appDetails;
				})
				.error(function(data) {
					$scope.error = '<span style="color:red;">An error occurred : ' + data + '</span>';
				});
		}]
	)
	.controller('AppDeleteCtrl', ['$scope','$routeParams', '$http',
		function ($scope,$routeParams, $http) {

			$scope.title = 'This App is a fake !';

			// when landing on the page, get all apps and show them
			$http.get('/api/application')
				.success(function(data) {
					$scope.apps = data.apps;
				})
				.error(function(data) {
					$scope.error = '<span style="color:red;">An error occurred : ' + data + '</span>';
				});			

			$scope.deleteApp = function(id){
				$http.delete('/api/application/delete/' + id)
					.success(function(data) {
						$scope.message = data.message;
						$scope.apps = data.apps;
					})
					.error(function(data) {
						$scope.error = '<span style="color:red;">An error occurred : ' + data + '</span>';
					});
				// Close the modal
				$('#modal-confirm-deletion').foundation('reveal', 'close');
			}
			// Call for update modal content
			$scope.selectApp = function(id, name){
				$scope.appId = id;
				$scope.appName = name;
			}

			// Reinitialize foundation for modal uses
			$(document).foundation();
		}]
	);
