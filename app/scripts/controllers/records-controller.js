'use strict';

angular.module('ngparseApp').controller('RecordsController', function($scope, $stateParams) {

	$scope.records = [];
	$scope.newRecord = {};
	$scope.newRecordForm = [
		"*",
		{
			type: "submit",
			title: "Create Record"
		}
	];


	console.debug('[RECORDS] private.records %o', $stateParams);
	var Activity = Parse.Object.extend('Activity');
	var query = new Parse.Query(Activity);
	query.get($stateParams.activityId).then(function(result){
		$scope.activity = result;
		console.debug('[RECORDS] Activity resolved %o', result);
		$scope.$apply();
	});


	var Record = Parse.Object.extend('Record');
	var recordQuery = new Parse.Query(Record);
	recordQuery.find().then(function(result) {
		console.debug('[RECORDS] find %o', result);
		$scope.records = result;
		$scope.$apply();
	});


	/** UI Handler for newRecord form submit */
	$scope.submitRecord = function() {
		console.debug('[RECORDS] Form submitted %o', $scope.newRecord);
		$scope.$broadcast('schemaFormValidate');

		// TODO: Validate
		$scope.createRecord($scope.newRecord);

		/*
		if ($scope.newRecordForm.$valid) {
			$scope.createRecord($scope.newRecord);
		} else {
			console.warn('[RECORDS] new record form validation failed');
		}
		*/
	};

	$scope.createRecord = function(data) {
		console.debug('[SAVE] User %o => record %o', Parse.User.current(), $scope.record);

		var Record = Parse.Object.extend("Record");
		var record = new Record({
			activity: $scope.activity,
			data: data
		});
		record.setACL(new Parse.ACL(Parse.User.current()));
		record.save().then(function(result){
			console.debug('[RECORDS] Save action returned: %o', result);
		});

	};


});
