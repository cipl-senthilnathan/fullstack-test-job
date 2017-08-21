 var myAppDash = angular.module('myApp.dashboard', ['ui.bootstrap']);

  myAppDash.controller('DashboardCtrl', ['$scope', '$http','$location','$window', function($scope, $http,$location,$window) {   
	
  $scope.locationList;
	 navigator.geolocation.getCurrentPosition(function(location) {
        $scope.latitude=location.coords.latitude;
        $scope.longitude=location.coords.longitude;
        $scope.accuracy=location.coords.accuracy;
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);
    });

      $scope.getPlaces = function() {
         $http.get('/places').success(function(response) {
          $scope.locationList = response; 
           });

      }

}]);

