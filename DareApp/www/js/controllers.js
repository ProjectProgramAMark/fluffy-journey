angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('FeedsCtrl', function($scope, Feeds) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.feeds = Feeds.all();
  $scope.remove = function(feed) {
    Feeds.remove(feed);
  };
})


.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.feeds');
        }).error(function(data) {
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
