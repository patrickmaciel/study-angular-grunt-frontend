// 'use strict';

angular.module('vedita')
  .factory('APIService', function() {
    var url = 'http://localhost:3000/api/';

    return {
      getUrl: function() {
        return url;
      }
    };
  });