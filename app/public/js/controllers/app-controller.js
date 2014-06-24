'use strict';

var togglePlayControllers = angular.module('togglePlayControllers', [
	'TogglePlayAppFilters'
]);

togglePlayControllers
	.controller('AppsCtrl', ['$scope','$http',
		function ($scope,$http) {

			$scope.title = 'Apps > All';
			$scope.loaded = false;

			// when landing on the page, get all apps and show them
			$http.get('/api/application')
				.success(function(data) {
					$scope.apps = data.apps;
					$scope.loaded = true;
				})
				.error(function(data) {
					$scope.error = 'An error occurred : ' + data;
				});

			$http.get('/api/application/categories')
				.success(function(data) {
					$scope.categories = data.categories;
				})
				.error(function(data) {
					$scope.error = 'An error occurred : ' + data;
				});
		}]
	)
	.controller('AppsFilteredCtrl', ['$scope', '$routeParams', '$http',
		function ($scope, $routeParams, $http) {

			var selectedCategory = $routeParams.category;

			selectedCategory = selectedCategory.replace(/\&/g, " & ");

			$scope.title = 'Apps > All';
			$scope.loaded = false;

			// when landing on the page, get all apps and show them
			$http.get('/api/application')
				.success(function(data) {
					$scope.apps = data.apps;
					$scope.loaded = true;
				})
				.error(function(data) {
					$scope.error = 'An error occurred : ' + data;
				});

			$http.get('/api/application/categories')
				.success(function(data) {
					$scope.categories = data.categories;
					var i = 0;
					var found = false;
					while(i < $scope.categories.length && !found){
						if($scope.categories[i].label == selectedCategory){
							$scope.filterCategory = $scope.categories[i];
							found == true;
						}
						i++;
					}
				})
				.error(function(data) {
					$scope.error = 'An error occurred : ' + data;
				});
		}]
	)
	.controller('AppAddCtrl', ['$scope','$http',
		function ($scope,$http) {

			$scope.title = 'You want to create an App ?';
			$scope.subtitle = 'It\'s just there !';

			$http.get('/api/application/categories')
				.success(function(data) {
					$scope.categories = data.categories;
				})
				.error(function(data) {
					$scope.error = 'An error occurred : ' + data;
				});

			// when submitting the add form, send the text to the node API
			$scope.createApp = function() {
				$scope.newApp.image.url = 
					(angular.isUndefined($scope.newApp.image.url)) ? 
						'../../content/image-app-default.png' : $scope.newApp.image.url;
				$scope.newApp.price = $("#sliderPrice").text();

				$http.post('/api/application/add', $scope.newApp)
					.success(function(data) {
						$scope.newApp = {}; // clear the form so our user is ready to enter another
						$scope.confirmMessage = data.message;
					})
					.error(function(data) {
						$scope.error = 'An error occurred : ' + data;
					});
			};

			// Reinitialize foundation for modal uses
			$(document).foundation();
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
					$scope.error = 'An error occurred : ' + data;
				});

			$http.get('/api/application/categories')
				.success(function(data) {
					$scope.categories = data.categories;
				})
				.error(function(data) {
					$scope.error = 'An error occurred : ' + data;
				});

			// when submitting the app to update, get the app and displays it
			$scope.getAppForUpdate = function(name){
				$http.get('/api/application/' + name)
					.success(function(data) {
						$scope.app_update = data.appDetails;
						$scope.message = "";
					})
					.error(function(data) {
						$scope.error = 'An error occurred : ' + data;
					});
			};
			// when submitting the changes, get all apps and show them
			$scope.updateApp = function(id){
				$scope.app_update.image.url = 
					(angular.isUndefined($scope.app_update.image.url) || $scope.app_update.image.url == "") ? 
						'../../content/image-app-default.png' : $scope.app_update.image.url;

				$http.put('/api/application/update/' + id, $scope.app_update)
					.success(function(data) {
						$scope.message = data.message;
						$scope.app_update = null;

						$http.get('/api/application')
							.success(function(data) {
								$scope.apps = data.apps;
							})
							.error(function(data) {
								$scope.error = 'An error occurred : ' + data;
							});
					})
					.error(function(data) {
						$scope.error = 'An error occurred : ' + data;
					});
			};
		}]
	)	
	.controller('AppDetailsCtrl', ['$scope','$routeParams', '$http',
		function ($scope, $routeParams, $http) {

			var appName = $routeParams.appName;

			$scope.title = appName;

			// when landing on the page, get all information on the app and show them
			$http.get('/api/application/' + appName)
				.success(function(data) {
					$scope.app = data.appDetails;
				})
				.error(function(data) {
					$scope.error = 'An error occurred : ' + data;
				});

			// when landing on the page, get the first 6 apps in the same category
			$http.get('/api/application')
				.success(function(data) {
					$scope.app_suggestions = [];
					if(data.apps.length > 1)
						for(var i = 0 ; i < data.apps.length ; i++)
							if(data.apps[i]._id != $scope.app._id &&
								data.apps[i].category.label == $scope.app.category.label)
								$scope.app_suggestions.push(data.apps[i]);
				})
				.error(function(data) {
					$scope.error = 'An error occurred : ' + data;
				});

			// Reinitialize foundation for modal uses
			$(document).foundation();
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
					$scope.error = 'An error occurred : ' + data;
				});			

			$scope.deleteApp = function(id){
				$http.delete('/api/application/delete/' + id)
					.success(function(data) {
						$scope.message = data.message;
						$scope.apps = data.apps;
					})
					.error(function(data) {
						$scope.error = 'An error occurred : ' + data;
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
