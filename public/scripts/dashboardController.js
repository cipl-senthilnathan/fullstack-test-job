 var myAppDash = angular.module('myApp.dashboard', ['ui.bootstrap']);

  myAppDash.controller('DashboardCtrl', ['$scope', '$http','$location','$window', function($scope, $http,$location,$window) {   
  
    $scope.allTech=[];
    $scope.allDomain=[];
    $scope.techs=[];
    $scope.domains=[];


  $scope.getDownload = function(url){
    alert(url) ;  
  };
  
  console.log("loginPerson in session :: "+sessionStorage.getItem("loginPerson"));
  var sessionRole = sessionStorage.getItem("loginPerson");
  if(sessionRole == 'admin'){
    $scope.adminVisible=true;
     $scope.userVisible=false;
  }
  else{$scope.adminVisible=false;
    $scope.userVisible=true;}
   

    /*Add technologies to multiselect filter alone*/
    $scope.addTech = function (techItem) {
     $scope.techs.push(techItem);
     $scope.techOptionsArray=[];
    angular.forEach($scope.techs, function(value) { 
                $scope.techOptionsArray.push (value.technology);  
                });
    if($scope.domains.length==0){
    console.log("Inside addTech empty domanin");
      $http.get('/getDashboardParamTechId/'+$scope.techOptionsArray).success(function(response) {
          $scope.dashboards = response; 
           });
       }else{
        console.log("Inside addTech non-empty domanin");
        $scope.domaninOptionsArray=[];
          angular.forEach($scope.domains, function(value) { 
                $scope.domaninOptionsArray.push (value.domain);  
                });

     $http.get('/getDashboardParamTechAndDomain/'+$scope.domaninOptionsArray+"/"+$scope.techOptionsArray).success(function(response) {
          $scope.dashboards = response; 
           });
       }

  };

   /*Add domains to multiselect filter alone*/
    $scope.addDomain = function (domain) {
    $scope.domains.push(domain);

    $scope.domaninOptionsArray=[];
    angular.forEach($scope.domains, function(value) { 
                $scope.domaninOptionsArray.push (value.domain);  
                });

    if($scope.techs.length==0){

      $http.get('/getDashboardParamDomainId/'+$scope.domaninOptionsArray).success(function(response) {
          $scope.dashboards = response; 
           });

       }else{
          $scope.techOptionsArray=[];
          angular.forEach($scope.techs, function(value) { 
                $scope.techOptionsArray.push (value.technology);  
                });

     $http.get('/getDashboardParamTechAndDomain/'+$scope.domaninOptionsArray+"/"+$scope.techOptionsArray).success(function(response) {
          $scope.dashboards = response; 
           });
       }

  };
  
  /*remove technologies to multiselect filter alone*/
    $scope.removeTech = function (techItem) {
    var idx = $scope.techs.indexOf(techItem);
    $scope.techs.splice(idx,1);

    $scope.techOptionsArray=[];
    angular.forEach($scope.techs, function(value) { 
                $scope.techOptionsArray.push (value.technology);  
                });
    if($scope.domains.length==0 && $scope.techs.length!=0){
   $http.get('/getDashboardParamTechId/'+$scope.techOptionsArray).success(function(response) {
          $scope.dashboards = response; 
           });

      } 

          else if($scope.techs.length==0 && $scope.domains.length!=0){

             $scope.domaninOptionsArray=[];
              angular.forEach($scope.domains, function(value) { 
                $scope.domaninOptionsArray.push (value.domain);  
                });

             $http.get('/getDashboardParamDomainId/'+$scope.domaninOptionsArray).success(function(response) {
              $scope.dashboards = response; 
                });
         }

          else if($scope.techs.length==0 && $scope.domains.length==0){
            $http.get('/dashboard').success(function(response) {
            $scope.dashboards = response;
              });
          }

    else{
     $scope.domaninOptionsArray=[];
    angular.forEach($scope.domains, function(value) { 
                $scope.domaninOptionsArray.push (value.domain);  
                });

     $http.get('/getDashboardParamTechAndDomain/'+$scope.domaninOptionsArray+"/"+$scope.techOptionsArray).success(function(response) {
          $scope.dashboards = response; 
           });
    }
    
     
  };

     /*Remove domains to multiselect filter alone*/
    $scope.removeDomain = function (domain) {
    var idx = $scope.domains.indexOf(domain);
    $scope.domains.splice(idx,1);

    $scope.domainOptionsArray=[];
    angular.forEach($scope.domains, function(value) { 
                $scope.domainOptionsArray.push (value.domain);  
                });
    
      if($scope.techs.length==0 && $scope.domains.length!=0){
     $http.get('/getDashboardParamDomainId/'+$scope.domainOptionsArray).success(function(response) {
          $scope.dashboards = response; 
           });
         }
         else if($scope.domains.length==0 && $scope.techs.length!=0){
          

            $scope.techOptionsArray=[];
                angular.forEach($scope.techs, function(value) { 
                            $scope.techOptionsArray.push (value.technology);  
                            });
               $http.get('/getDashboardParamTechId/'+$scope.techOptionsArray).success(function(response) {
                      $scope.dashboards = response; 
                       });
         }
         else if($scope.techs.length==0 && $scope.domains.length==0){
            $http.get('/dashboard').success(function(response) {
            $scope.dashboards = response;
              });
          }
         else{
    //      console.log("Inside removeDomain non-empty tech");
           $scope.techOptionsArray=[];
            angular.forEach($scope.techs, function(value) { 
                $scope.techOptionsArray.push (value.technology);  
                });

     $http.get('/getDashboardParamTechAndDomain/'+$scope.domaninOptionsArray+"/"+$scope.techOptionsArray).success(function(response) {
          $scope.dashboards = response; 
           });
         }

     
     };

  /*get all domain*/
  var domainView=function(){

         $http.get('/domain').success(function(response) {    
                $scope.domain = response;
                $scope.domain_settings = {enableSearch: true};

                angular.forEach($scope.domain, function(value) { 
                var nameVar={"id":value._id,"domain":value.domain};

               $scope.allDomain.push (nameVar); 
        });

            }) 
 };

   
   /*get all technologies*/
    var technologyView=function(){
         $http.get('/technology').success(function(response) {  
            $scope.technologies_model = [];
                $scope.technologies = response;
                $scope.technology_settings = {enableSearch: true};

                angular.forEach($scope.technologies, function(value) { 
                var nameVar={"id":value._id,"technology":value.technology};
         $scope.allTech.push (nameVar);  
        });

            }) 
      }; 



     /*Load Dashboard*/
     var dashboardView=function(){ 
           $http.get('/dashboard').success(function(response) {
            $scope.dashboards = response;
              });
        };

      /*Logout Button
      $scope.logout = function() {
        $location.path('/login');
        };*/

      /*upload Button
      $scope.upload = function() {     
          $location.path('/upload');     
      };*/  
/*
       $scope.deleteimg = function(id) {
        var id1=id;
            console.log("Title:::"+id1);
           $http.get('/deleteimg/'+id1).success(function(response) {
         dashboardView();  
            });     
             
    };*/

       $scope.deleteimg = function(id) {
         var id1=id;
      if ($window.confirm("Do you want to Delete?")){ 
        $scope.result = "Yes";
        $http.get('/deleteimg/'+id1).success(function(response) {
         dashboardView();  
            });     }
      
      else{$scope.result = "No";}
      
      }




  technologyView(); 
  domainView();
  dashboardView(); 

}]);



myAppDash.directive("searchableMultiselect",function($timeout,$http) {
  return {
    templateUrl: 'views/searchableMultiselect.html',
    
    restrict: 'AE',
    scope: {
      displayAttr: '@',
      selectedItems: '=',
      allItems: '=',
      readOnly: '=',
      addItem: '&',
      removeItem: '&'
      //fromDirectiveFn: '=method'
    },

    link: function(scope, element, attrs,$http) {
      element.bind('click', function (e) {
      e.stopPropagation();
      });

      scope.width = element[0].getBoundingClientRect();

      scope.updateSelectedItems = function(obj) {
        var selectedObj;
        for (i = 0; typeof scope.selectedItems !== 'undefined' && i < scope.selectedItems.length; i++) {
          if (scope.selectedItems[i][scope.displayAttr].toUpperCase() === obj[scope.displayAttr].toUpperCase()) {
            selectedObj = scope.selectedItems[i];
            break;
          }
        }

        if ( typeof selectedObj === 'undefined' ) {
          scope.addItem({item: obj});               
        } else {          
          scope.removeItem({item: selectedObj});          
        }
      };


      scope.isItemSelected = function(item) {
        if ( typeof scope.selectedItems === 'undefined' ) return false;
        var tmpItem;
        for (i=0; i < scope.selectedItems.length; i++) {
          tmpItem = scope.selectedItems[i];
          if ( typeof tmpItem !== 'undefined'
          &&  typeof tmpItem[scope.displayAttr] !== 'undefined'
          &&  typeof item[scope.displayAttr] !== 'undefined'
          &&  tmpItem[scope.displayAttr].toUpperCase() === item[scope.displayAttr].toUpperCase() ) {
            return true;                                               
          }
        }
        return false;
      };

     /* scope.commaDelimitedSelected = function() {
        var list = "";
        angular.forEach(scope.selectedItems, function (item, index) {
          list += item[scope.displayAttr];
          if (index < scope.selectedItems.length - 1) list += ', ';
        });     
        return list.length ? list : "Nothing Selected";       
        }*/

    }
  }
});



myAppDash.directive("searchableMultiselectTechnology",function($timeout,$http) {
  return {
    templateUrl: 'views/searchableMultiselectTechnology.html',
    
    restrict: 'AE',
    scope: {
      displayAttr: '@',
      selectedItems: '=',
      allItems: '=',
      readOnly: '=',
      addItem: '&',
      removeItem: '&'
      //fromDirectiveFn: '=method'
    },

    link: function(scope, element, attrs,$http) {
      element.bind('click', function (e) {
      e.stopPropagation();
      });

      scope.width = element[0].getBoundingClientRect();

      scope.updateSelectedItems = function(obj) {
        var selectedObj;
        for (i = 0; typeof scope.selectedItems !== 'undefined' && i < scope.selectedItems.length; i++) {
          if (scope.selectedItems[i][scope.displayAttr].toUpperCase() === obj[scope.displayAttr].toUpperCase()) {
            selectedObj = scope.selectedItems[i];
            break;
          }
        }

        if ( typeof selectedObj === 'undefined' ) {
          scope.addItem({item: obj});               
        } else {          
          scope.removeItem({item: selectedObj});          
        }
      };


      scope.isItemSelected = function(item) {
        if ( typeof scope.selectedItems === 'undefined' ) return false;
        var tmpItem;
        for (i=0; i < scope.selectedItems.length; i++) {
          tmpItem = scope.selectedItems[i];
          if ( typeof tmpItem !== 'undefined'
          &&  typeof tmpItem[scope.displayAttr] !== 'undefined'
          &&  typeof item[scope.displayAttr] !== 'undefined'
          &&  tmpItem[scope.displayAttr].toUpperCase() === item[scope.displayAttr].toUpperCase() ) {
            return true;                                               
          }
        }
        return false;
      };

     /* scope.commaDelimitedSelected = function() {
        var list = "";
        angular.forEach(scope.selectedItems, function (item, index) {
          list += item[scope.displayAttr];
          if (index < scope.selectedItems.length - 1) list += ', ';
        });     
        return list.length ? list : "Nothing Selected";       
        }*/

    }
  }
});
