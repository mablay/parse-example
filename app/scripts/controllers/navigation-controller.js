'use strict';

/**
 * Created by marc on 28/08/15.
 */
angular.module('ngparseApp').controller('NavigationController', function ($scope) {
  $scope.username = Parse.User.current().get('username');
  console.debug('[NAV] User %o', $scope.username);
});
