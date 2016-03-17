angular.module('starter.controllers', [])


.controller('FeedsCtrl', function($scope, $http, Comments) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  // $scope.$on('$ionicView.enter', function(e) {
  // });
  Comments.getFeed().then(function(res) {
    $scope.comments = res;
    console.log($scope.comments);
  }, function(err) {
    console.log(err);
  });

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
        LoginService.loginUser({'email': $scope.data.username, 'password': $scope.data.password}).then(function(data) {
          console.log(JSON.stringify(data.token));
          //$state.go('tab.feeds');
        }, function(err) {
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });
        });
    };
})

.controller('ChallengeDetailCtrl', function($scope, $stateParams, Comments) {
  $scope.comments = Comments.get($stateParams.id);
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
