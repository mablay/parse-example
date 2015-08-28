angular.module('ngparseApp').controller('UserController', function($scope){

	console.debug('INIT UserController');

	$scope.login = function() {
		if (!$scope.username || !$scope.password) {
			return console.warn('Provide username AND password!');
		}
		console.debug('login %s:%s', $scope.username, $scope.password);

		pLogin = Parse.User.logIn($scope.username, $scope.password);
		pLogin.then(function(result){
			console.log('[LOGIN] %o', result);      
		});

	}

});