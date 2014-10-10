'use strict';

angular.module('secretShopApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {


        checkin: function(checkin)
        {
          checkin = checkin || angular.noop;

          return function(){
            var args = Array.prototype.slice.call(arguments),
            bookingnumber = args.shift(),
            bookingObject = args.shift(),
            bookingModal;

            var modalObject= {
              dismissable: true,
              title: 'Confirm Checkin',
              shouldPay: !bookingObject.isPaid,
              bookingText: '<p>Boking '+bookingnumber+'</p>',
              paymentStatusText : bookingObject.isPaid ? 'Betald' : 'Ej betald',
              html: '<p>Säkerställ att rätt betalsätt anges nedan!</p>',
              hasRadioOptions: true,
              bookingObj : bookingObject,
              radioButton: {
                header:'Betalsätt',
                data: "",
                options:[
                {
                  value: 'Kort'
                },
                {
                  value: 'Kontant'
                },
                {
                  value: 'Betalat sedan tidigare'
                }
                ]
              },

              buttons: [{
                classes: 'btn-success btn-lg',
                text: 'Checkin',
                click: function(e) {
                  bookingModal.close(e);
                }
              }, {
                classes: 'btn-default btn-lg',
                text: 'Cancel',
                click: function(e) {
                  bookingModal.dismiss(e);
                }
              }]
            };
            bookingModal = openModal({
              modal: modalObject
            }, 'modal-primary');

            bookingModal.result.then(function(event) {
              args.push(bookingObject);
              args.push(modalObject.radioButton.data);
              var totalPrice = (modalObject.radioButton.data == "Kontant" || modalObject.radioButton.data == "Kort") ? bookingObject.total + 20 : bookingObject.total;
              args.push(totalPrice);
              checkin.apply(event, args);
            });

          }
        },
        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
