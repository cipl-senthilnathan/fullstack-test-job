 var favorities = angular.module('myApp.FavoritiesCtrl', ['ui.bootstrap']);

  favorities.controller('FavoritiesCtrl', ['$scope','$rootScope', '$http','$location','$state','$window','$timeout', function($scope,$rootScope, $http,$location,$state,$window,$timeout) {   

			$scope.loginUserId	=$window.sessionStorage.getItem('loginUserId');
 			$scope.userFavorities=[];
 			$scope.userFavoritieLocations=[];

			$scope.getFavoritiesList=function(){
				$http.get('/places/favorites/'+$scope.loginUserId).success(function(response) {
		      	$scope.favoritiesList = response;
				 for(i = 0; i < $scope.favoritiesList.length; i++) {
				 		$scope.userFavorities.push($scope.favoritiesList[i].locationid);
				 	}
			      $http.get('/getFavoritiesLocation/'+$scope.userFavorities).success(function(response) {
		          $scope.favoritiesLocations = response; 	
		           });
		      	$location.path('/favorities');
		      });
		    };

		    $scope.getPlaces=function(){
				 // var sortUrl='/places/'+$scope.latitude+'/'+$scope.longitude+'/'+obj;
				$http.get('/places').success(function(response) {
		      	$scope.placesList = response;
		      	$location.path('/addfavorities');
		      });
		    };

		      $scope.deleteFavorities=function(favorite){
				 // var sortUrl='/places/'+$scope.latitude+'/'+$scope.longitude+'/'+obj;
				$http.delete('/places/favorite/'+favorite).success(function(response) {
		      	$scope.placesList = response;
		      	alert("Deleted Successfully");
		      	$state.reload();
		      	$scope.getFavoritiesList();
		      	$location.path('/favorities');
		      });
		    };

}]);

