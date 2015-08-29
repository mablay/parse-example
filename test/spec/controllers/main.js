/**
 * Created by marc on 29/08/15.
 */

'use strict';

describe('Controller: ActivityCtrl', function () {

  // load the controller's module
  beforeEach(module('ngparseApp'));

  var MainController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MainController.items.length).toBe(0);
  });
});
