'use strict';

describe('Controller: KioskCtrl', function () {

  // load the controller's module
  beforeEach(module('secretShopApp'));

  var KioskCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KioskCtrl = $controller('KioskCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
