// Ionic Starter App

var apiBaseUrl = 'http://localhost:3000/data';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-material'])

.run(function($ionicPlatform, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // if($http.defaults.headers.common.Authorization) {
    //   //$http.defaults.headers.common.Authorization = window.localStorage['token'];
    //   console.log(window.localStorage.token);
    //   $http.defaults.headers.common.Authorization = window.localStorage.token;
    // } else {
    //   console.log("else is being printed, meaning the token is never being saved to the default header");
    // }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:


  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
  })

  .state('tab.feeds', {
      url: '/feeds',
      parent: 'tab',
      views: {
        'tab-feeds': {
          templateUrl: 'templates/tab-feed.html',
          controller: 'FeedsCtrl'
        }
      }
    })

    .state('tab.feeds.challenge_detail', {
      url: '/feeds/:id',
      views: {
        'tab-feeds@tab': {
          templateUrl: 'templates/challenge-detail.html',
          controller: 'ChallengeDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('error', {
    url: '/error',
    views: {
      'error': {
        templateUrl: 'templates/error.html',
        controller: 'ErrorCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // should change to 404 error page
  $urlRouterProvider.otherwise('/login');

});
