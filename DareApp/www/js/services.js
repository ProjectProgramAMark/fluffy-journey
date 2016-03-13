angular.module('starter.services', [])

.factory('Feeds', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return feeds;
    },
    remove: function(feed) {
      feeds.splice(feeds.indexOf(feed), 1);
    },
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

.service('LoginService', function($q, $http) {
    return {
        loginUser: function(credentials, success, failure) {
            // var deferred = $q.defer();
            // var promise = deferred.promise;
            //
            // if (name == 'user' && pw == 'secret') {
            //     deferred.resolve('Welcome ' + name + '!');
            // } else {
            //     deferred.reject('Wrong credentials.');
            // }
            // promise.success = function(fn) {
            //     promise.then(fn);
            //     return promise;
            // }
            // promise.error = function(fn) {
            //     promise.then(null, fn);
            //     return promise;
            // }
            // return promise;
            return $http.post(credentials.username, credentials.password).then(function(res) {
              console.log(res);
              //window.localStorage['token'] = response;
              return res;
            }, function(err) {
              console.log(err);
            });
        }
    };
});
