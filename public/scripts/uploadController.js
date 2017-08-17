var myAppUpload = angular.module('myApp.upload', []);


myAppUpload.controller('UploadCtrl', ['$scope','$http','$stateParams', function($scope, $http,$stateParams) {  
   $scope.noneditable = true;   
       var technologyView=function(){
         $http.get('/technology').success(function(response) {     
                $scope.technologies = response;
    }) 
 }; 

  var domainView=function(){
         $http.get('/domain').success(function(response) {     
                $scope.domain = response;
                console.log("domain: "+$scope.domain)
           }) 
 };
 technologyView(); 
 domainView();

if($stateParams.id!=undefined)
{
      
       var id1=$stateParams.id;
            console.log("ID:::"+id1);
          $http.get('/upload/'+id1).success(function(response) {
            $scope.data=response;
             console.log("DATA:::"+JSON.stringify($scope.data));
             newcaseStudy=$scope.data;
       $scope.caseid=newcaseStudy._id;
       $scope.selectedTechnology = newcaseStudy.technology;
       $scope.selectedDomain = newcaseStudy.industry;
       $scope.title=newcaseStudy.title;
       $scope.description=newcaseStudy.description;
       var path='/'+newcaseStudy.technology+'/'+newcaseStudy.industry+'/';
       $scope.imagefile=newcaseStudy.imgurl.substring(path.length,newcaseStudy.imgurl.length);
       $scope.pdffile=newcaseStudy.pdfurl.substring(path.length,newcaseStudy.pdfurl.length);
       $scope.image='/uploads'+newcaseStudy.imgurl;
      console.log("pdfurl::::"+newcaseStudy.pdfurl);
      
      
      
      console.log("path image::"+newcaseStudy.imgurl.substring(path.length,newcaseStudy.imgurl.length));
      console.log("path pdf::"+newcaseStudy.pdfurl.substring(path.length,newcaseStudy.pdfurl.length));
       
       
     
            });     
  
        
 }
}]);