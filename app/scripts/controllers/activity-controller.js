angular.module('ngparseApp').controller('ActivityController', function($scope, $filter){

	console.debug('INIT ActivityController');



	$scope.labels = [];
	$scope.series = ['Duration'];
	$scope.data = [[]];


	$scope.user = Parse.User.current();


	$scope.query = function() {
		console.debug('query...');

		// Queries
		var query = new Parse.Query("Activity");
		query.find().then(function(result) {
			console.debug('[Activity] %o', result);
		    $scope.activities = result;
		    $scope.updateChartData();
		    $scope.$apply();
		});
	}


	// You might want to invoke $scope.$apply() afterwards
	$scope.updateChartData = function() {
		$scope.labels = [];
		$scope.data[0] = [];

		for (var i = $scope.activities.length - 1; i >= 0; i--) {
			var sTime = $filter('date')($scope.activities[i].createdAt, 'HH:mm:ss');
			$scope.labels.push(sTime);
			$scope.data[0][i] = $scope.activities[i].get('schema').duration;
		};
	};

	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

	$scope.createRecord = function() {
		console.debug('[SAVE] User %o => record %o', Parse.User.current(), $scope.record);

		$scope.record.foo = true;
		var user = $scope.user;

		// Make a new post
		var Activity = Parse.Object.extend("Activity");
		var activity = new Activity();
		activity.set("schema", $scope.record);
		activity.set("owner", user);
		activity.save(null, {
		  success: function(activity) {
		  	console.debug('[SAVE] Server response: %o', activity);
		  }
		});

	};


});