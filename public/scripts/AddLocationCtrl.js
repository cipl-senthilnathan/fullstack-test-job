 var addLocation = angular.module('myApp.addLocation', ['ui.bootstrap']);

  addLocation.controller('AddLocationCtrl', ['$scope', '$http','$location','$window','$timeout', function($scope, $http,$location,$window,$timeout) {   
  

  		$scope.dataform={};

				  
				    $scope.thumbnail = {
				       // dataUrl: 'adsfas'
				    };
				$scope.fileReaderSupported = window.FileReader != null;
				$scope.photoChanged = function(files){
				if (files != null) {
				    var file = files[0];
				if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
				    $timeout(function() {
				        var fileReader = new FileReader();
				        fileReader.readAsDataURL(file);
				        fileReader.onload = function(e) {
				    $timeout(function(){
				 $scope.thumbnail.dataUrl = e.target.result;
				                 });
				               }
				            });
				        }
				    }
				}	 

			$scope.addLocationDetails=function(){
				$http.post('/addLocation', $scope.addLocation).success(function(response) {
		      	$rootScope.addLocationDetails = response;
		      	sessionStorage.setItem("loginPerson",$rootScope.addLocationDetails.role);
		      	$location.path('/addlocation');
		      });
		    };

}]);
addLocation.directive("fileInput",['$parse',function($parse){
	return{
		restrict:'A',
		link:function(scope,ele,attrs){
			ele.bind('change',function(){
				$parse(attrs.fileInput).
				assign(scope,ele[0].files)
				scope.$apply()
			});
		}
	}
}]);		
addLocation.directive('validFile', function () {		
    return {		
        require: 'ngModel',		
        link: function (scope, el, attrs, ngModel) {		
            ngModel.$render = function () {		
                ngModel.$setViewValue(el.val());		
            };		
            el.bind('change', function () {		
                scope.$apply(function () {		
                    ngModel.$render();		
                });		
            });		
        }		
    };		
});	
