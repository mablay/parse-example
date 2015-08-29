'use strict';

angular.module('ngparseApp').controller('UserController', function($scope, $state){

	console.debug('INIT UserController');

  /** UI Action **/
	$scope.login = function() {
		if (!$scope.username || !$scope.password) {
			return console.warn('Provide username AND password!');
		}
		console.debug('[LOGIN] credentials (%s:%s)', $scope.username, $scope.password);

		var pLogin = Parse.User.logIn($scope.username, $scope.password);
		pLogin.then(function(result){
			console.log('[LOGIN] %o', result);
      $state.go('private.activities');
		});

	};

});
