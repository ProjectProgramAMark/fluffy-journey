angular.module('starter.services', [])

.service('Comments', function($http, $q) {
  var url = apiBaseUrl + '/feed';

  return {
    getFeed: function(success, failure) {

    var deferred = $q.defer();
     $http.get(url)
       .success(function(res) {
         console.log("res is: ", res);
         deferred.resolve(res);
       }).error(function(msg, code) {
          deferred.reject(msg);
          console.log(msg, code);
       });
     return deferred.promise;

    },
    // remove: function(comment) {
    //   feeds.splice(feeds.indexOf(comment), 1);
    // }
    get: function(feedId) {
      for (var i = 0; i < feeds.length; i++) {
        if (feeds[i].id === parseInt(feedId)) {
          return feeds[i];
        }
      }
      return null;
    }
  };
})

.service('LoginService', function($http) {
  var url = apiBaseUrl + '/login';
    return {
        loginUser: function(credentials, success, failure) {
            return $http.post(url, {'email': credentials.email, 'password': credentials.password}).then(function(res) {
              console.log(res);
              window.localStorage.token = res;
              return res;
            }, function(err) {
              console.log(err);
            });
        }
    };
})

.service('FeedsDetailService', function($http, Comments) {
  var url = apiBaseUrl + '/feed:id';
    return {
        getChallenge: function(success, failure) {
            return $http.get(url).then(function(res) {
              console.log(res);
              return res;
            }, function(err) {
              console.log(err);
            });
        }
    };
});
