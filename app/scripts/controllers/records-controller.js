angular.module('ngparseApp').controller('RecordsController', function($scope, $stateParams) {

  console.debug('[RECORDS] private.records %o', $stateParams);
  var Activity = Parse.Object.extend('Activity');
  var query = new Parse.Query(Activity);
  query.get($stateParams.activityId).then(function(result){
    $scope.activity = result;
    console.debug('[RECORDS] Activity resolved %o', result);
    $scope.$apply();
  });

});
