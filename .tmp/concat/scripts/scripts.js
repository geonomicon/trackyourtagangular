'use strict';

/**
 * @ngdoc overview
 * @name trackyourtagangularApp
 * @description
 * # trackyourtagangularApp
 *
 * Main module of the application.
 */
angular
  .module('trackyourtagangularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap',
    'firebase',
    'restangular',
    'ui.bootstrap',
    'smart-table',
    'ngMessages'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users'
      })
      .when('/generator', {
        templateUrl: 'views/generator.html',
        controller: 'GeneratorCtrl',
        controllerAs: 'generator'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name tytApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tytApp
 */
angular.module('trackyourtagangularApp')
  .controller('MainCtrl', ["$location", "$scope", "Restangular", function ($location,$scope, Restangular) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

   $scope.login = function() {
     $location.path('/about');
  //  myService.$authWithOAuthRedirect(authMethod).then(function(authData) {
  //     console.log(authData);
  //
  //   }).catch(function(error) {
  //     if (error.code === 'TRANSPORT_UNAVAILABLE') {
  //       myService.$authWithOAuthPopup(authMethod).then(function(authData) {
  //         console.dir(authData);
  //       });
  //     } else {
  //       console.log(error);
  //     }
  //   });
  };

  // myService.$onAuth(function(authData) {
  //   if (authData === null) {
  //     console.log('Not logged in yet');
  //   } else {
  //     console.log('Logged in as', authData.uid);
  //     $location.path('/about');
  //   }
  //   $scope.authData = authData;
  // });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name tytApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tytApp
 */
angular.module('trackyourtagangularApp')
  .controller('AboutCtrl', ["$scope", "myService", "Restangular", function ($scope,myService,Restangular) {
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
}]);

'use strict';

/**
 * @ngdoc service
 * @name tytApp.myService
 * @description
 * # myService
 * Service in the tytApp.
 */
angular.module('trackyourtagangularApp')
  .service('myService', ["$firebaseAuth", "Firebase", function ($firebaseAuth,Firebase) {
    var usersRef = new Firebase('https://trackyourtag.firebaseio.com/users');
    return $firebaseAuth(usersRef);
  }]);

'use strict';

/**
 * @ngdoc function
 * @name trackyourtagangularApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the trackyourtagangularApp
 */
angular.module('trackyourtagangularApp')
  .controller('UsersCtrl', ["$scope", "$timeout", "Restangular", function ($scope, $timeout, Restangular) {
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
}]);

'use strict';

/**
 * @ngdoc function
 * @name trackyourtagangularApp.controller:GeneratorCtrl
 * @description
 * # GeneratorCtrl
 * Controller of the trackyourtagangularApp
 */
angular.module('trackyourtagangularApp')
  .controller('GeneratorCtrl', ["$scope", "Restangular", function ($scope, Restangular) {
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
              '<html><head><title></title></head><body>' +
              divElements + '</body>';
            window.print();
            document.body.innerHTML = oldPage;
    };

    $scope.imgurl='http://placehold.it/350x150';


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
        $scope.imgurl='https://api.qrserver.com/v1/create-qr-code/?size=450x450&data='+$scope.qrid;
        var url = 'https://trackyourtag.herokuapp.com/droid/'+$scope.qrid+'/'+$scope.pname+'/'+$scope.startloc+'/'+$scope.endloc+'/'+$scope.qty+'/'+$scope.receiveremail;
        var droute = Restangular.oneUrl('droute', url);
        droute.post().then(function(data){
          console.log(data);
          console.log(url);
          $scope.alerts.push({type: 'success', msg: 'QR Code Generted with data'+data});
        });
      }

    };



  }]);

'use strict';

/**
 * @ngdoc function
 * @name trackyourtagangularApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the trackyourtagangularApp
 */
angular.module('trackyourtagangularApp')
  .controller('AdminCtrl', ["$scope", "Restangular", "$location", function ($scope, Restangular, $location) {
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
  }]);

angular.module('trackyourtagangularApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert> <ng-map center=\"{{center}}\"> <marker position=\"{{marker}}\" title=\"{{markername}}\" animation=\"Animation.BOUNCE\"></marker> </ng-map> <br> <br> <!-- <input type=\"text\" name=\"trackid\" ng-model=\"trackid\" class=\"form-control\" required>\n" +
    "<br>\n" +
    "<button type=\"button\" class=\"btn btn-primary\" ng-click=\"locate()\">Track Your Package</button></br>\n" +
    "<br> --> <div class=\"col-lg-12\"> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" placeholder=\"Trackid Here\" ng-model=\"trackid\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"locate()\">Go!</button> </span> </div><!-- /input-group --> </div><!-- /.col-lg-6 --> <br> <br> <table st-table=\"rowCollection\" class=\"table table-striped\"> <thead> <tr> <th>Name</th> <th>Start Point</th> <th>End Point</th> <th>Quantity</th> <th>Holder Email</th> </tr> </thead> <tbody> <tr> <td>{{alldetail.pname}}</td> <td>{{alldetail.startloc}}</td> <td>{{alldetail.endloc}}</td> <td>{{alldetail.qty}}</td> <td>{{alldetail.holderemail}}</td> </tr> </tbody> </table>"
  );


  $templateCache.put('views/admin.html',
    "<uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert> <form name=\"admin\"> <div class=\"form-group\"> <label>Email:</label> <input type=\"text\" name=\"email\" ng-model=\"email\" class=\"form-control\" required> <div ng-messages=\"admin.email.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Password:</label> <input type=\"password\" name=\"pass\" ng-model=\"pass\" class=\"form-control\" required> <div ng-messages=\"admin.pass.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div>  <button type=\"button\" class=\"btn btn-primary\" ng-click=\"login()\">Authenticate</button> </div> </form> <div ng-show=\"myValue\"> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"generatorgo()\">Generate Tag</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"usersgo()\">Add New User</button> </div>"
  );


  $templateCache.put('views/generator.html',
    "<uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert> <form name=\"qrform\"> <div class=\"form-group\"> <label>Product Name:</label> <input type=\"text\" name=\"pname\" ng-model=\"pname\" class=\"form-control\" required> <div ng-messages=\"qrform.pname.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Quantity:</label> <input type=\"text\" name=\"qty\" ng-model=\"qty\" class=\"form-control\" required> <div ng-messages=\"qrform.qty.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Product ID:</label> tyt<input type=\"text\" name=\"qrid\" ng-model=\"qrid\" class=\"form-control\" required> <div ng-messages=\"qrform.qrid.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Seller's City:</label> <input type=\"text\" name=\"startloc\" ng-model=\"startloc\" class=\"form-control\" required> <div ng-messages=\"qrform.startloc.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Shipping and Billing Address City:</label> <input type=\"text\" name=\"endloc\" ng-model=\"endloc\" class=\"form-control\" required> <div ng-messages=\"qrform.endloc.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Receiver's Email</label> <input type=\"text\" name=\"receiveremail\" ng-model=\"receiveremail\" class=\"form-control\" required> <div ng-messages=\"qrform.receiveremail.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div>  <button type=\"button\" class=\"btn btn-primary\" ng-click=\"generate()\">Generate Image</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"print('printablediv')\">Print QR Code</button> </div> </form> <div id=\"printablediv\"> <img src=\"{{imgurl}}\"> </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>Track Your Tag</h1> </div> <p><button type=\"button\" class=\"btn btn-primary btn-block\" ng-click=\"login()\">Start Tracking</button></p>"
  );


  $templateCache.put('views/users.html',
    "<uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert> <form name=\"exampleForm\"> <div class=\"form-group\"> <label>Name:</label> <input type=\"text\" name=\"name\" ng-model=\"name\" class=\"form-control\" required> <div ng-messages=\"exampleForm.name.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Email:</label> <input type=\"text\" name=\"email\" ng-model=\"email\" class=\"form-control\" required> <div ng-messages=\"exampleForm.email.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Password:</label> <input type=\"password\" name=\"pass\" ng-model=\"pass\" class=\"form-control\" required> <div ng-messages=\"exampleForm.pass.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Confirm Password:</label> <input type=\"password\" name=\"cpass\" ng-model=\"cpass\" class=\"form-control\" required> <div ng-messages=\"exampleForm.pass.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div> <label>Contact No:</label> <input type=\"text\" name=\"cno\" ng-model=\"cno\" class=\"form-control\" required> <div ng-messages=\"exampleForm.cno.$error\"> <div ng-message=\"required\"><i>This field is required</i></div> </div>  <button type=\"button\" class=\"btn btn-primary\" ng-click=\"add()\">Add User</button> </div> </form> <table st-table=\"rowCollection\" class=\"table table-striped\"> <thead> <tr> <th>Name</th> <th>Email</th> <th>Contact</th> </tr> </thead> <tbody> <tr ng-repeat=\"row in rowCollection\"> <td>{{row.name}}</td> <td>{{row.email}}</td> <td>{{row.cno}}</td> </tr> </tbody> </table>"
  );

}]);
