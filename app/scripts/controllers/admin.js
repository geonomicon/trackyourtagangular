'use strict';

/**
 * @ngdoc function
 * @name trackyourtagangularApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the trackyourtagangularApp
 */
angular.module('trackyourtagangularApp')
  .controller('AdminCtrl', function ($scope, Restangular, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.myValue = false;

    $scope.alerts = [

    ];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.generatorgo = function(){
      $location.path('/generator');
    };

    $scope.usersgo = function(){
      $location.path('/users');
    };

    $scope.login = function(){
      var geturl = 'https://trackyourtag.herokuapp.com/h/check/'+$scope.email+'/'+$scope.pass;
      var getroute = Restangular.oneUrl('getroute', geturl);
      getroute.get().then(function(data){
          console.log(data);
          if(data==='valid'){
              $scope.alerts.push({type: 'success', msg: 'Logged In with'+data});
              $scope.myValue = true;
          }
          else{
              $scope.alerts.push({type: 'danger', msg: 'Login Not Authenticated'});
          }
      });
    };
  });
