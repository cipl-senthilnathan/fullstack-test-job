var myApplogin = angular.module('myApp.login', []);

myApplogin.controller('LoginCtrl', ['$scope', '$http','$location','$window','$rootScope', function($scope, $http,$location,$window,$rootScope) {    

 $scope.loginCredentials = function() {
      $http.post('/login', $scope.login).success(function(response) {
      	$rootScope.loginCredentials = response;
      	sessionStorage.setItem("loginPerson",$rootScope.loginCredentials.role);
      	$location.path('/dashboard');
      });
    };

}]);
