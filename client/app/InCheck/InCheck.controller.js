'use strict';

angular.module('secretShopApp')
  .controller('IncheckCtrl', function ($scope, $http, socket,Modal) {
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
  

    $scope.deleteBooking = function(booking,paymentMethod) {

      $http.delete('/api/inchecks/' + booking._id);
    };
    $scope.checkIn = Modal.confirm.checkin(function(booking,paymentMethod,totalPrice)
    {
      if(booking.isCheckedIn == false)
        {
        booking.isCheckedIn = true;
        booking.paymentMethod = paymentMethod;
        booking.total = totalPrice;
        booking.hasAdministrativeCosts = true;
        booking.isPaid = true;
        $http.put('/api/inchecks/'+booking._id, booking);
      }

    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('incheck');
    });
  });
