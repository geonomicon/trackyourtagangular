'use strict';

/**
 * @ngdoc function
 * @name trackyourtagangularApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the trackyourtagangularApp
 */
angular.module('trackyourtagangularApp')
  .controller('UsersCtrl', function ($scope, $timeout, Restangular) {
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

    $scope.rowCollection = [];

    $timeout(function() {
      var geturl = 'https://trackyourtag.herokuapp.com/h/holders/';
      var getroute = Restangular.oneUrl('droute', geturl);
      getroute.getList().then(function(data){
          $scope.rowCollection = data;
          console.log($scope.rowCollection);
      });
    });


    $scope.add = function(){

      if($scope.pass!==$scope.cpass){
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

      // if(($scope.pass.toString().length())<4){
      //   $scope.alerts.push({type: 'danger', msg: 'Password must be greater'});
      // }

      else{
        var url = 'https://trackyourtag.herokuapp.com/h/add/'+$scope.name+'/'+$scope.email+'/'+$scope.pass+'/'+$scope.cno;
        var droute = Restangular.oneUrl('droute', url);
        droute.post().then(function(data){
            $scope.alerts.push({type: 'success', msg: 'User Added with data'+data});
        });
      }

    };
});
