'use strict';


exports.inject = function(app) {

  app.factory('$rest', exports.factory);
  return exports.factory;
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

exports.factory = ['$resource', function($resource) {
    var rest = {
      test: $resource('http://api.openweathermap.org/data/2.5/weather?q=London,uk', {}, {
        load: {method: 'GET'}
      })
    };

    return rest;
}];

/*exports.factory = function() {

    var rest = {
      test: console.log('qq')
    };

    return rest;
};*/
