// 'use strict';

angular.module('vedita')
  .controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(path) {
      return path === $location.path();
    };
  }]);