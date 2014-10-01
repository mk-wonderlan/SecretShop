'use strict';

angular.module('secretShopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('InCheck', {
        url: '/incheck',
        templateUrl: 'app/InCheck/InCheck.html',
        controller: 'IncheckCtrl',
        authenticate: true
      });
  });