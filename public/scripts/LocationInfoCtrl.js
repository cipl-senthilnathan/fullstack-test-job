var myAppLocation = angular.module('myApp.LocationInfoCtrl', ['google-maps']);

myAppLocation.controller('LocationInfoCtrl', ['$scope', '$http','$location','$window','$rootScope','$stateParams', function($scope, $http,$location,$window,$rootScope,$stateParams) {    

// instantiate google map objects for directions
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  $scope.locationInfo;
  $scope.lati;
  $scope.longi;

	navigator.geolocation.getCurrentPosition(function(location) {
        $scope.lati=location.coords.latitude;
        $scope.longi=location.coords.longitude;
        $scope.accuracy=location.coords.accuracy;
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);
    });

 if($stateParams.id!=undefined)
{
	 var id1=$stateParams.id;
  	$scope.getLocationInfo = function() {
  	console.log("latitude:",$scope.lati,$scope.longi);
  	var getLocationUrl='/location/'+id1+'/'+$scope.lati+'/'+$scope.longi;

        $http.get(getLocationUrl).success(function(response) {
          $scope.locationInfo = response; 
        });

      };
   }

}]);