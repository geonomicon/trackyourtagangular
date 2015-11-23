'use strict';

/**
 * @ngdoc function
 * @name tytApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tytApp
 */
angular.module('trackyourtagangularApp')
  .controller('AboutCtrl', function ($scope,myService,Restangular) {
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


   $scope.locate = function(){
   if($scope.trackid){
     var url = 'https://trackyourtag.herokuapp.com/droid/getall/'+$scope.trackid;
     var droute = Restangular.oneUrl('droute', url);
     droute.get().then(function(data){
       // console.log(data.lat,data.long);
       $scope.alldetail = data;
       $scope.markername = data.pname;
       $scope.center = [data.lat , data.long ];
       $scope.marker  = [data.lat , data.long ];
       // console.log($scope.center);
     });
     }
     else{
       $scope.alerts.push({type: 'danger', msg: 'All Fields Are Required'});
     }
};


  });
