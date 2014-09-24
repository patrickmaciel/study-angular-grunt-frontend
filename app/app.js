// 'use strict';
angular.module('vedita', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      })
      .when('/edges', {
        templateUrl: 'templates/edges.html',
        controller: 'EdgesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  