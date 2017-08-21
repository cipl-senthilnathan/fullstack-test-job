 var myAppDash = angular.module('myApp.dashboard', ['ui.bootstrap']);

  myAppDash.controller('DashboardCtrl', ['$scope', '$http','$location','$window', function($scope, $http,$location,$window) {   
	
  $scope.locationList;
  $scope.latitude;
  $scope.longitude;

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

      };
      $scope.changeSort = function(obj){
        console.log("object",obj)
        var sortUrl='/places/'+$scope.latitude+'/'+$scope.longitude+'/'+obj;
        console.log("Sort url::",sortUrl);
        if(obj=="min" || obj=="max"){
           $http.get(sortUrl).success(function(response) {
          $scope.locationList = response; 
           });
        }
        else{
          $scope.getPlaces();
        }

       
      };

}]);

