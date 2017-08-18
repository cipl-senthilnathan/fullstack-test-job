 var addLocation = angular.module('myApp.FavoritiesCtrl', ['ui.bootstrap']);

  addLocation.controller('FavoritiesCtrl', ['$scope','$rootScope', '$http','$location','$window','$timeout', function($scope,$rootScope, $http,$location,$window,$timeout) {   

			$scope.getFavoritiesList=function(){
				$http.get('/getFavorities').success(function(response) {
		      	$scope.favoritiesList = response;
		    //  	sessionStorage.setItem("loginPerson",$rootScope.addLocationDetails.role);
		      	$location.path('/favorities');
		      });
		    };

		    $scope.addFavoritiesDetails=function(){
				$http.post('/addFavorities', $scope.addFavorities).success(function(response) {
		      	$rootScope.addFavoritiesDetails = response;
		     // 	sessionStorage.setItem("loginPerson",$rootScope.addFavoritiesDetails.role);
		     alert("Success");
		      	$location.path('/addfavorities');
		      });
		    }

}]);

