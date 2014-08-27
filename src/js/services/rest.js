'use strict';

var angular = require('angular');

module.exports = function() {

  angular.module('offlined')
  .factory('$rest', ['$resource', function ($resource) {

    //var root = 'http://localhost:8888/asker/';
    var root = 'https://scorching-fire-1793.firebaseapp.com/';

    var rest = {
      questions: $resource(root+ 'json/questions.json', {}, {
        load: {method: 'GET'}
      }),
      commentators: $resource(root+ 'json/commentators.json', {}, {
        load: {method: 'GET'}
      })
    };

    return rest;
  }])
  ;

};


