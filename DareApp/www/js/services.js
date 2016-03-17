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
          // Using JSON stringify to get the console to actually show the message
          console.log(JSON.stringify(msg), code);
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

.service('LoginService', function($http, $q) {
  var url = apiBaseUrl + '/login';
    return {
        loginUser: function(credentials, success, failure) {
          var deferred = $q.defer();
          var promise = deferred.promise;
          $http.post(url, {'email': credentials.email, 'password': credentials.password}).then(function(res) {
            console.log(JSON.stringify(res));
            if((typeof res.data.token !== 'undefined')) {
              console.log("deferred is RESOLVED");
              deferred.resolve( { token: res.data.token } );
              window.localStorage.token = res.data.token;
              //console.log("The token should now be saved as", window.localStorage.token);
            } else {
              //console.log("deferred is REJECTED");
              deferred.reject( { error: 'invalid_response' } );
            }
          }, function(err) {
              if((typeof result.data.error !== 'undefined')) {
                  deferred.reject( { error: err.data.error, status: err.status } );
              } else {
                deferred.reject( { error: 'invalid_login' } );
              }
          });
          return promise;
              // window.localStorage.token = res.data.token;
              // console.log("The token should now be saved as", window.localStorage.token);
              // return res;
            // }, function(err) {
            //   console.log(JSON.stringify(err));
            // });
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
