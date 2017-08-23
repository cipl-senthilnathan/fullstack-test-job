 var addLocation = angular.module('myApp.addLocation', ['ui.bootstrap']);

  addLocation.controller('AddLocationCtrl', ['$scope', '$http','$location','$window','$timeout','$stateParams', function($scope, $http,$location,$window,$timeout,$stateParams) {   
  
  		$scope.loginUserId	=$window.sessionStorage.getItem('loginUserId');
  		$scope.dataform={};
  		$scope.truefalse=false;
				  
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

			/*$scope.addLocationDetails=function(){
				$http.post('/addLocation', $scope.addLocation).success(function(response) {
		      	$rootScope.addLocationDetails = response;
		    //  	sessionStorage.setItem("loginPerson",$rootScope.addLocationDetails);
		      	$location.path('/addlocation');
		      });
		    };*/
		    if($stateParams.id!=undefined)
			{
				$scope.truefalse=true;
      
		       var id1=$stateParams.id;
		       console.log("ID:::"+id1);
		       $http.get('/location/'+id1).success(function(response) {
			       $scope.data=response;
			       console.log("DATA:::"+JSON.stringify($scope.data));
			       $scope.locationid=$scope.data._id;
			       $scope.locationname = $scope.data.locationname;
			       $scope.description = $scope.data.description;
			       $scope.imagefile=$scope.data.imgurl;
			       $scope.zipCode=$scope.data.zipcode;
			       $scope.province=$scope.data.province;
			       $scope.country=$scope.data.country;
			       $scope.city=$scope.data.city;
			       $scope.address=$scope.data.address;

		       });     
		  
		        
		 }

		  $scope.addFavoritiesDetails=function(locationId){

		    	$scope.favoritiesData={"userid":$scope.loginUserId,
		    	"locationid":locationId};

				$http.post('/places/favorite', $scope.favoritiesData).success(function(response) {
		      	$scope.addFavoritiesDetails = response;
		     	alert("Added Successfully");
		     	$state.reload();
		      });
		    }

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
