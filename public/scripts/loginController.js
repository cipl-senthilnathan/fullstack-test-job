var myApplogin = angular.module('myApp.login', []);

myApplogin.controller('LoginCtrl', ['$scope', '$http','$location','$window','$rootScope', function($scope, $http,$location,$window,$rootScope) {    

 $scope.loginCredentials = function() {
      $http.post('/login', $scope.login).success(function(response) {
      	$rootScope.loginData = response;
      	$window.sessionStorage.setItem('loginData',$rootScope.loginData);
      	$window.sessionStorage.setItem('loginUserId',$rootScope.loginData._id);
      	$location.path('/dashboard');
      });
    };

}]);
