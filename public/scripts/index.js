'use strict';

angular.module('myCaseStudyApp', ['ui.router',
      'myApp.login',
      'myApp.dashboard',
      'myApp.addLocation',
      'myApp.FavoritiesCtrl',
      'myApp.LocationInfoCtrl'

    ])

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    // route for the login page
            .state('app', {
                url:'/',
                views: {
                   /* 'header': {
                        templateUrl : 'views/header.html'
                    },*/
                   'content': {
                        templateUrl : 'views/login.html',                        
                        controller  : 'LoginCtrl'
                    },
                    'footer': {
                        templateUrl : ''
                    }
                }
            })

         
           // route for the login page after logout
           .state('app.login', {
                url:'login',
                 views: {
                    /*'header@': {
                        templateUrl : 'views/header.html'
                    },*/
                   'content@': {
                        templateUrl : 'views/login.html',                        
                        controller  : 'LoginCtrl'
                    },
                    'footer@': {
                        templateUrl : ''
                    }
                }
            }) 
			
		

         .state('app.dashboard', {
                url:'dashboard',
                views: {

                        'header@': {
                        templateUrl : 'views/dashboard_header.html'
                    },
                       'content@': {
                        templateUrl : 'views/Dashboard.html',
                        controller  : 'DashboardCtrl'
                     },
                        'footer@': {
                        templateUrl : ''
                    }
                }
            })

         .state('app.addlocation', {
                url:'addlocation',
                views: {

                        'header@': {
                        templateUrl : 'views/dashboard_header.html'
                    },
                       'content@': {
                        templateUrl : 'views/addLocation.html',
                        controller  : 'AddLocationCtrl'
                     },
                        'footer@': {
                        templateUrl : ''
                    }
                }
            })
         .state('app.favorities', {
                url:'favorities',
                views: {

                        'header@': {
                        templateUrl : 'views/dashboard_header.html'
                    },
                       'content@': {
                        templateUrl : 'views/favorities.html',
                        controller  : 'FavoritiesCtrl'
                     },
                        'footer@': {
                        templateUrl : ''
                    }
                }
            })
         .state('app.addfavorities', {
                url:'addfavorities',
                views: {

                        'header@': {
                        templateUrl : 'views/dashboard_header.html'
                    },
                       'content@': {
                        templateUrl : 'views/addfavorities.html',
                        controller  : 'FavoritiesCtrl'
                     },
                        'footer@': {
                        templateUrl : ''
                    }
                }
            })
         .state('app.updateLocation', {
                url:'location/:id',
                views: {

                        'header@': {
                        templateUrl : 'views/dashboard_header.html'
                    },
                       'content@': {
                        templateUrl : 'views/addLocation.html',
                        controller  : 'AddLocationCtrl'
                     },
                        'footer@': {
                        templateUrl : ''
                    }
                }
            })
         .state('app.locationDeatils', {
                url:'locationInfo/:id',
                views: {

                        'header@': {
                        templateUrl : 'views/dashboard_header.html'
                    },
                       'content@': {
                        templateUrl : 'views/locationInfo.html',
                        controller  : 'LocationInfoCtrl'
                     },
                        'footer@': {
                        templateUrl : ''
                    }
                }
            })
         
       
            $urlRouterProvider.otherwise('/');
    })

