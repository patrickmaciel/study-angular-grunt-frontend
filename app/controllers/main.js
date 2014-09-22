// 'use strict';

angular.module('vedita')
  .controller('MainCtrl', ['$scope', '$resource', function($scope, $resource) {
    $resource('/api/edges').query();

    $scope.doit = [
      'Lance suas atividades após o término de cada uma',
      'Solicite ao GP para criar novas atividades',
      'Nunca lance momentos ociosos',
      'Quando não tiver atividades pendentes, estude algo'
    ];
  }]);