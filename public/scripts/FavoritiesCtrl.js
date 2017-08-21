 var favorities = angular.module('myApp.FavoritiesCtrl', ['ui.bootstrap']);

  favorities.controller('FavoritiesCtrl', ['$scope','$rootScope', '$http','$location','$window','$timeout', function($scope,$rootScope, $http,$location,$window,$timeout) {   

			$scope.loginUserId	=$window.sessionStorage.getItem('loginUserId');

			$scope.getFavoritiesList=function(){
				$http.get('/getFavorities/:'+$scope.loginUserId).success(function(response) {
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
		      	$location.path('/favorities');
		      });
		    }

}]);

