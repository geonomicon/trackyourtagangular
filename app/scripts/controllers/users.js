'use strict';

/**
 * @ngdoc function
 * @name trackyourtagangularApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the trackyourtagangularApp
 */
angular.module('trackyourtagangularApp')
  .controller('UsersCtrl', function ($scope, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.alerts = [

    ];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.rowCollection = [

    ];

    $scope.add = function(){

      if($scope.pass!=$scope.cpass){
        $scope.alerts.push({type: 'danger', msg: 'Password dont Match'});
      }

      if(!$scope.name){
        $scope.alerts.push({type: 'danger', msg: 'Name is required'});
      }

      if(!$scope.email){
        $scope.alerts.push({type: 'danger', msg: 'Email is required'});
      }

      if(!$scope.cno){
        $scope.alerts.push({type: 'danger', msg: 'Contact No is required'});
      }

      if(!$scope.pass){
        $scope.alerts.push({type: 'danger', msg: 'Password is required'});
      }

      else{
        var users = rootRef.child('users');
        users.push().set({
          name: $scope.name,
          pass:  $scope.pass,
          email: $scope.email,
          cno:$scope.cno,
        });
        $scope.alerts.push({type: 'success', msg: 'User Added'});
      }

    };
});
