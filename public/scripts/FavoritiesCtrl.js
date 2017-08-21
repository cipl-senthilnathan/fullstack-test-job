 var favorities = angular.module('myApp.FavoritiesCtrl', ['ui.bootstrap']);

  favorities.controller('FavoritiesCtrl', ['$scope','$rootScope', '$http','$location','$window','$timeout', function($scope,$rootScope, $http,$location,$window,$timeout) {   

			$scope.loginUserId	=$window.sessionStorage.getItem('loginUserId');
 			$scope.userFavorities=[];

			$scope.getFavoritiesList=function(){
				 // var sortUrl='/places/'+$scope.latitude+'/'+$scope.longitude+'/'+obj;
				$http.get('/getFavorities/'+$scope.loginUserId).success(function(response) {
		      	$scope.favoritiesList = response;
				 for(i = 0; i < $scope.favoritiesList.length; i++) {
				 		$scope.userFavorities.push($scope.favoritiesList[i].locationid);
				 	}
			      $http.get('/getFavoritiesLocation/'+$scope.userFavorities).success(function(response) {
		          $scope.favoritiesLocations = response; 
		           });
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

