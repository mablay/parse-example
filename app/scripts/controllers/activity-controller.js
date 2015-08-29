'use strict';

angular.module('ngparseApp').controller('ActivityController', function($scope){

	console.debug('[ACTIVITY] INIT');
	$scope.labels = [];
	$scope.series = ['Duration'];
	$scope.data = [[]];
	$scope.user = Parse.User.current();


	$scope.query = function() {
		console.debug('[ACTIVITY] query...');

		// Queries
		var query = new Parse.Query("Activity");
		query.find().then(function(result) {
			console.debug('[ACTIVITY] %o', result);
      $scope.activities = result;
      //$scope.updateChartData();
      $scope.$apply();
		});
	};


	// You might want to invoke $scope.$apply() afterwards
  /*
	$scope.updateChartData = function() {
		$scope.labels = [];
		$scope.data[0] = [];

		for (var i = $scope.activities.length - 1; i >= 0; i--) {
			var sTime = $filter('date')($scope.activities[i].createdAt, 'HH:mm:ss');
			$scope.labels.push(sTime);
			$scope.data[0][i] = $scope.activities[i].get('schema').duration;
		};
	};
	*/


  /** UI ACTIONS **/
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

  $scope.addActivity = function() {
    if (!$scope.newActivity || !$scope.newActivity.name) {
      console.warn('[ACTIVITY] Enter a name');
      return;
    }
    console.debug('[ACTIVITY] Add %o', $scope.newActivity);
    $scope.createRecord();
    $scope.query();
    $scope.newActivity.name = "";
  };

  $scope.selectActivity = function(activity) {
    console.debug('[ACTIVITY] Select %o', activity);
    $scope.activity = activity;
  };


	$scope.createRecord = function() {
		console.debug('[SAVE] User %o => record %o', Parse.User.current(), $scope.record);

    var Activity = Parse.Object.extend("Activity");
    var activity = new Activity();
    activity.set("name", $scope.newActivity.name);
    activity.setACL(new Parse.ACL(Parse.User.current()));
    activity.save().then(function(result){
      console.debug('[ACTIVITY] Save action returned: %o', result);
    });

	};


});
