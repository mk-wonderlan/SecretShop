'use strict';

angular.module('secretShopApp')
  .controller('KioskCtrl', function ($scope) {

  	$scope.items = [
  	{
  		item:"test",
  		price:"100kr",
  		description:"en testprodukt",
  		url:"http://placehold.it/250x250"
  	},
  	{
  		item:"test",
  		price:"100kr",
  		description:"en testprodukt",
  		url:"http://placehold.it/250x250"

  	},
  	{
  		item:"test",
  		price:"100kr",
  		description:"en testprodukt",
  		url:"http://placehold.it/250x250"

  	},
  	{
  		item:"test",
  		price:"100kr",
  		description:"en testprodukt",
   		url:"http://placehold.it/250x250"

  	},
  	  	{
  		item:"test",
  		price:"100kr",
  		description:"en testprodukt",
   		url:"http://placehold.it/250x250"

  	},
   	{
  		item:"test test test",
  		price:"1337kr",
  		description:"en testprodukt",
  		url:"http://placehold.it/250x250"
  	},



  	];

    $scope.message = 'Hello';
  });
