angular.module('starter.controllers', [])


.controller('FeedsCtrl', function($scope, $http, FeedService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  // $scope.$on('$ionicView.enter', function(e) {
  // });
  FeedService.getFeed().then(function(res) {
    $scope.comments = res;
    //console.log(JSON.stringify($scope.comments));
  }, function(err) {
    console.log(err);
  });
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $http) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser({'email': $scope.data.email, 'password': $scope.data.password}).then(function(data) {
          console.log("Controller says login is a success!");
          //console.log(JSON.stringify(data.token));
          $state.go('tab.feeds');
        }, function(err) {
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });
        });
    };

    $scope.register = function() {
      $state.go('register');
    };
})

.controller('ChallengeDetailCtrl', function($scope, $stateParams, ChallengeDetailService, $state) {
  // $scope.comments = Comments.get($stateParams.id);
  ChallengeDetailService.getChallenge($stateParams.id).then(function(res) {
    console.log("res is ", JSON.stringify(res));
    $scope.challenge = res.data.challenge;
    $scope.comments = res.data.comments;
    console.log("the comments are: ", JSON.stringify($scope.comments));
    console.log("State params is: ", JSON.stringify($stateParams));
    $state.go('tab.feeds.challenge_detail');
  }, function(err) {
    console.log("there has been an error retrieving the challenge detail: ", err);
  });
})

.controller('ErrorCtrl', function($scope) {
  console.log("Error page was called");
  // $scope.comments = Comments.get($stateParams.id);
})

.controller('RegisterCtrl', function($scope, RegisterService, $ionicPopup, $state, $http) {
  $scope.data = {};
  //console.log("register controller still in progress");
  // RegisterService.register() should go here
  $scope.register = function() {
    RegisterService.registerUser({'email': $scope.data.email, 'password': $scope.data.password, 'username': $scope.data.username}).then(function(data) {
      console.log("Controller says registration is a success!");
      $state.go('login');
    }, function(err) {
      console.log(JSON.stringify(err));
      // I have the alert for now, should be replaced with validation later
      var alertPopup = $ionicPopup.alert({
          title: 'Registration failed!',
          template: 'Please check your credentials!'
      });
    });
  };
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
