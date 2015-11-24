'use strict';

/**
 * @ngdoc function
 * @name tytApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tytApp
 */
angular.module('trackyourtagangularApp')
  .controller('MainCtrl', function ($location,$scope,myService, Restangular) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

   $scope.login = function(authMethod) {
   myService.$authWithOAuthRedirect(authMethod).then(function(authData) {
      console.log(authData);
      $location.path('/about');
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        myService.$authWithOAuthPopup(authMethod).then(function(authData) {
          console.dir(authData);
        });
      } else {
        console.log(error);
      }
    });
  };

  myService.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
      $location.path('/about');
    }
    $scope.authData = authData;
  });
  });
