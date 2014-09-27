'use strict';

angular.module('secretShopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      });
  });