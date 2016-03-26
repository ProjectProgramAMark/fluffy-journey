angular.module('starter.services', [])

.service('FeedService', function($http, $q) {
  var url = apiBaseUrl + '/feed';

  return {
    getFeed: function(success, failure) {

    var deferred = $q.defer();
     $http.get(url)
       .success(function(res) {
         //console.log("res is: ", res);
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
    },
    newChallenge: function() {
      console.log("This is the new Challenge service!");
    }
  };
})

.service('LoginService', function($http, $q) {
  var url = apiBaseUrl + '/login';
    return {
        loginUser: function(credentials, success, failure) {
          // uses $q to turn function into a promise
          // reasoning being so the client side can handle either success/failure
          var deferred = $q.defer();
          var promise = deferred.promise;
          $http.post(url, {'email': credentials.email, 'password': credentials.password}).then(function(res) {
            //console.log(JSON.stringify(res));
            if((typeof res.data.token !== 'undefined')) {
              console.log("deferred is RESOLVED");
              deferred.resolve( { token: res.data.token } );
              window.localStorage.token = res.data.token;
              $http.defaults.headers.common.x_access_token = window.localStorage.token;
              //console.log("the http default should be saved as: ", $http.defaults.headers.common.x_access_token);
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

.service('RegisterService', function($http, $q) {
  var url = apiBaseUrl + '/newUser';
  return {
    registerUser: function(data, success, failure) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.post(url, {
          'email': data.email,
          'username': data.username,
          'password': data.password
        }).then(function(res) {
          if(data.email && data.username && data.password) {
            deferred.resolve("registration successful!");
          } else {
            deferred.reject({ error: 'invalid registration request' });
          }
        }, function(err) {
            deferred.reject({ error: err });
          });
          return promise;
        }
    };
  })

.service('ChallengeDetailService', function($http, $q) {
    return {
        getChallenge: function(id, success, failure) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var url = apiBaseUrl + '/feed/' + id;
            //console.log("challenge detail url is hitting: ", url);
            $http.get(url).then(function(res) {
              deferred.resolve(res);
              console.log("challenge detail retrieval successful");
              //console.log("success on getting challenge detail: ", JSON.stringify(res));
            }, function(err) {
              deferred.reject("challenge detail retrieval failure");
              //console.log("error on getting challenge detail: ", JSON.stringify(err))
            });
            return promise;
        }
    };
});
