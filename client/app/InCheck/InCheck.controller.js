'use strict';

angular.module('secretShopApp')
  .controller('IncheckCtrl', function ($scope) {
    $scope.message = 'Hello';
      	$scope.guests = [
  	{
  		name:"bill bop",
  		email:"test@test.com",
  		tickets:"standard",
  		payed:"false",
  		total:"180kr",
  		incheckad:"false",
  		description:"en testprodukt"
  	},
   	{
  		name:"bip boop",
  		email:"test@test.com",
  		tickets:"standard",
  		payed:"false",
  		total:"180kr",
  		incheckad:"false",
  		description:"en testprodukt"
  	},
  	  	{
  		name:"john doe",
  		email:"test@test.com",
  		tickets:"standard",
  		payed:"false",
  		total:"180kr",
  		incheckad:"false",
  		description:"en testprodukt"
  	},
  	  	{
  		name:"jane doe	son",
  		email:"test@test.com",
  		tickets:"standard",
  		payed:"false",
  		total:"180kr",
  		incheckad:"false",
  		description:"en testprodukt"
  	},
  	  	{
  		name:"test scafoldsson",
  		email:"test@test.com",
  		tickets:"standard",
  		payed:"false",
  		total:"180kr",
  		incheckad:"false",
  		description:"en testprodukt"
  	}
  	];
  });
