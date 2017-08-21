 var favorities = angular.module('myApp.FavoritiesCtrl', ['ui.bootstrap']);

  favorities.controller('FavoritiesCtrl', ['$scope','$rootScope', '$http','$location','$window','$timeout', function($scope,$rootScope, $http,$location,$window,$timeout) {   

			$scope.loginUserId	=$window.sessionStorage.getItem('loginUserId');
 			$scope.userFavorities=[];
 			$scope.userFavoritieLocations=[];

			$scope.getFavoritiesList=function(){
				$http.get('/getFavorities/'+$scope.loginUserId).success(function(response) {
		      	$scope.favoritiesList = response;
				 for(i = 0; i < $scope.favoritiesList.length; i++) {
				 		$scope.userFavorities.push($scope.favoritiesList[i].locationid);
				 		$window.sessionStorage.setItem('locationid',$scope.favoritiesList[i].locationid);
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
				$http.delete('/deletefavorite/'+favorite).success(function(response) {
		      	$scope.placesList = response;
		      	alert("Deleted Successfully");
		      	$location.path('/favorities');
		      });
		    };


		    $scope.addFavoritiesDetails=function(){
		    	$scope.locationid	=$window.sessionStorage.getItem('locationid');
		    	var isFavorite = true;
		    	// $scope.favoritiesData={"favouriteid":$scope.addFavorities.favouriteid,"userid":$scope.loginUserId,
		    	// "locationid":$scope.locationid,"isFavorite":isFavorite};
		    	$scope.favoritiesData={"userid":$scope.loginUserId,
		    	"locationid":$scope.locationid,"isFavorite":isFavorite};

				$http.post('/addFavorities', $scope.favoritiesData).success(function(response) {
		      	$rootScope.addFavoritiesDetails = response;
		     	alert("Added Successfully");
		      	$location.path('/favorities');
		      });
		    }

}]);

