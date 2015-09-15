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
	query.get($stateParams.activityId).then(function(result) {
		$scope.activity = result;
		console.debug('[RECORDS] Activity resolved %o', result);
		$scope.$apply();

		// Determine primary activity property
		// which will be displayed in the record list.
		// Further record data will only be shown
		// in the record detail view.
		var schema = $scope.activity.attributes.schema;
		var properties = Object.keys(schema.properties);
		$scope.primaryProperty = null;
		if (properties && properties.length > 0) {
			$scope.primaryProperty = properties[0];
		}

		// Query Records associated with this activity
		var Record = Parse.Object.extend('Record');
		var recordQuery = new Parse.Query(Record);
		recordQuery.equalTo('activity', $scope.activity);
		recordQuery.find().then(function(records) {
			console.debug('[RECORDS] find %o', records);
			$scope.records = records;

			// Prepare chart data
			$scope.series = ['Records'];
			var chartData = [[]];
			var labels = [];
			var key = $scope.primaryProperty;
			console.debug('[RECORDS] Reading chart values for key "%s"', key);
			for (var i=0; i<records.length; i++) {
				var createdAt = new Date(records[i].createdAt);
				chartData[0].push(records[i].attributes.data[key]);
				labels.push(createdAt.toDateString());
			}
			$scope.data = chartData;
			$scope.labels = labels;

			$scope.$apply();
		});

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
