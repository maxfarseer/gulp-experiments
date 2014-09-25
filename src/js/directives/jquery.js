'use strict';

exports.inject = function(app) {
  app.directive('myCustomer', exports.directive);
  return exports.directive;
};

//exports.factory = function() {

  /*angular.module('offlined')
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
  ;*/

//};

exports.directive = function() {
    return {
      template: 'Name: {{customer.name}} Address: {{customer.address}}'
    };
  };
