'use strict';

angular.module('secretShopApp')
  .controller('IncheckCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';
    $scope.bookings  = [];
    $http.get('/api/inchecks').success(function(bookings) {
      $scope.bookings = bookings;
      socket.syncUpdates('incheck', $scope.bookings);
    });
    $scope.addBooking = function() {
      if($scope.newBooking === '') {
        return;
      }
      $http.post('/api/inchecks', { name: $scope.newBooking });
      $scope.newBooking = '';
    };

    $scope.deleteBooking = function(booking) {
      $http.delete('/api/inchecks/' + booking._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('incheck');
    });
  });
