'use strict';

angular.module('secretShopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('kiosk', {
        url: '/kiosk',
        templateUrl: 'app/kiosk/kiosk.html',
        controller: 'KioskCtrl'
      });
  });