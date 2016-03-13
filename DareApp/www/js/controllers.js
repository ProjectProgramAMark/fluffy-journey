angular.module('starter.controllers', [])


.controller('FeedsCtrl', function($scope, Feeds) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //
  // $scope.feeds = Feeds.all();
  // $scope.remove = function(feed) {
  //   Feeds.remove(feed);
  // };
  $scope.items = [{
    'content': 'content number 1',
    'timestamp': '10000001',
    'userPost': 'markos96'
  }, {
    'content': 'content number 2',
    'timestamp': '10000002',
    'userPost': 'markos97'
  }, {
    'content': 'content number 3',
    'timestamp': '10000003',
    'userPost': 'markos98'
  }];
})


.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $http) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser({'username': $scope.data.username, 'password': $scope.data.password}).then(function(data) {
          $state.go('tab.feeds');
        }, function(err) {
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });
        });
    };
})

.controller('FeedDetailCtrl', function($scope, $stateParams, Feeds) {
  $scope.feed = Feeds.get($stateParams.chatId);
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
