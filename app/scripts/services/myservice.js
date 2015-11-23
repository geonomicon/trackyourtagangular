'use strict';

/**
 * @ngdoc service
 * @name tytApp.myService
 * @description
 * # myService
 * Service in the tytApp.
 */
angular.module('trackyourtagangularApp')
  .service('myService', function ($firebaseAuth,Firebase) {
    var usersRef = new Firebase('https://trackyourtag.firebaseio.com/users');
    return $firebaseAuth(usersRef);
  });
