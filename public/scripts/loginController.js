var myApplogin = angular.module('myApp.login', []);

myApplogin.controller('LoginCtrl', ['$scope', '$http','$location','$window','$rootScope','$timeout','$state', function($scope, $http,$location,$window,$rootScope,$timeout,$state) {    

 $scope.loginCredentials = function() {

      $http.post('/login', $scope.login)
      .success(function(response) {
      	$rootScope.loginData = response;
      	$window.sessionStorage.setItem('loginData',$rootScope.loginData);
      	$window.sessionStorage.setItem('loginUserId',$rootScope.loginData._id);
		$location.path('/dashboard');    
      })
        .error(function (error, status){
        	if(status==""){
        		$scope.responseMessage=response;
		    	$scope.errorMessage=true;
		    	$timeout(function () { 
						    $scope.errorMessage=false;						
							$state.reload();
						}, 5000);
        	}
       
  }); 
    };

}]);
