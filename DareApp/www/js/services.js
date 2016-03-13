angular.module('starter.services', [])

.service('Comments', function($http, $q) {
  var url = apiBaseUrl + '/feed';
  // Might use a resource here that returns a JSON array
  /*
  <h2>{{item.userPost}}</h2>
  <p>{{item.content}}</p>
  <p>{{item.timestamp}}</p>
  */
  // Some fake testing data
  // var comments = [{
  //   id: 0,
  //   userPost: 'Ben Sparrow',
  //   content: 'You on your way?',
  //   timestamp: '100000'
  // }, {
  //   id: 1,
  //   userPost: 'Max Lynx',
  //   content: 'Hey, it\'s me',
  //   timestamp: '1000001'
  // }, {
  //   id: 2,
  //   userPost: 'Adam Bradleyson',
  //   content: 'I should buy a boat',
  //   timestamp: '1000001'
  // }, {
  //   id: 3,
  //   userPost: 'Perry Governor',
  //   content: 'Look at my mukluks!',
  //   timestamp: '1000001'
  // }, {
  //   id: 4,
  //   userPost: 'Mike Harrington',
  //   content: 'This is wicked good ice cream.',
  //   timestamp: '1000001'
  // }];

  return {
    getFeed: function(success, failure) {
      // return $http.get(url).then(function(res) {
      //   console.log(res.data);
      //   return res.data;
      // }, function(err) {
      //   console.log("There is an error!", err);
      // });
      // For debugging
      //return comments;

      var deferred = $q.defer();
     $http.get(url)
       .success(function(res) {
         console.log("res is: ", res);
         deferred.resolve(res);
       }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
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
              window.localStorage['token'] = res;
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
