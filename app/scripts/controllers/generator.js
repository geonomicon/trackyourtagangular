'use strict';

/**
 * @ngdoc function
 * @name trackyourtagangularApp.controller:GeneratorCtrl
 * @description
 * # GeneratorCtrl
 * Controller of the trackyourtagangularApp
 */
angular.module('trackyourtagangularApp')
  .controller('GeneratorCtrl', function ($scope, Restangular) {
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

    $scope.print = function printDiv(divID) {
            var divElements = document.getElementById(divID).innerHTML;
            var oldPage = document.body.innerHTML;
            document.body.innerHTML =
              "<html><head><title></title></head><body>" +
              divElements + "</body>";
            window.print();
            document.body.innerHTML = oldPage;
    }

    $scope.imgurl="http://placehold.it/350x150";


    $scope.generate = function(){

      if(!$scope.pname){
        $scope.alerts.push({type: 'danger', msg: 'Product Name is required'});
      }

      if(!$scope.qty){
        $scope.alerts.push({type: 'danger', msg: 'Quantity is required'});
      }

      if(!$scope.startloc){
        $scope.alerts.push({type: 'danger', msg: 'Seller City is required'});
      }

      if(!$scope.endloc){
        $scope.alerts.push({type: 'danger', msg: 'Destination is required'});
      }

      if(!$scope.receiveremail){
        $scope.alerts.push({type: 'danger', msg: 'Receiver Mail is required'});
      }

      if(!$scope.qrid){
        $scope.alerts.push({type: 'danger', msg: 'ID is required'});
      }

      else{
        $scope.imgurl="https://api.qrserver.com/v1/create-qr-code/?size=450x450&data="+$scope.qrid;
        var url = "https://trackyourtag.herokuapp.com/droid/"+$scope.qrid+"/"+$scope.pname+"/"+$scope.startloc+"/"
                  +$scope.endloc+"/"+$scope.qty+"/"+$scope.receiveremail;
        var droute = Restangular.oneUrl('droute', url);
        droute.post().then(function(data){
          console.log(data);
          console.log(url);
          $scope.alerts.push({type: 'success', msg: 'QR Code Generted with data'+data});
        });
      }

    }



  });
