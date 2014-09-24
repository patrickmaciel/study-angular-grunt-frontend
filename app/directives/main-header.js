// 'use strict';

angular.module('vedita')
  .directive('mainHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/layout/main-header.html'
    };
  });