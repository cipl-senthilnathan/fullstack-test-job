var myAppLocation = angular.module('myApp.LocationInfoCtrl', ['google-maps']);

myAppLocation.controller('LocationInfoCtrl', ['$scope', '$http','$location','$window','$rootScope', function($scope, $http,$location,$window,$rootScope) {    

// instantiate google map objects for directions
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();

}]);