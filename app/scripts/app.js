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
  .config(function ($routeProvider) {
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
  });
