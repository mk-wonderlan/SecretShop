'use strict';

describe('Controller: IncheckCtrl', function () {

  // load the controller's module
  beforeEach(module('secretShopApp'));

  var IncheckCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IncheckCtrl = $controller('IncheckCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
