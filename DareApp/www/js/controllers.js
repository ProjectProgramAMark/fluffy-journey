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
    console.log(JSON.stringify($scope.comments));
  }, function(err) {
    console.log(err);
  });

  function onItemClick() {
    $state.go(tab.feeds.challenge_detail);
  }

  //console.log($scope.comments);
  //$scope.comments = Comments.all();
  // $scope.remove = function(comment) {
  //   Comments.remove(comment);
  // };

//   $scope.items = [{
//     'content': 'content number 1',
//     'timestamp': '10000001',
//     'userPost': 'markos96',
//     'id': 1
//   }, {
//     'content': 'content number 2',
//     'timestamp': '10000002',
//     'userPost': 'markos97',
//     'id': 2
//   }, {
//     'content': 'content number 3',
//     'timestamp': '10000003',
//     'userPost': 'markos98',
//     'id': 3
//   }];
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
  $scope.comments = ChallengeDetailService.getChallenge($stateParams.id);
  console.log("State params is: ", JSON.stringify($stateParams));
  //console.log("State params ID is: ", $stateParams.id);
  $state.go('tab.feeds.challenge_detail');
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
