'use strict';

exports.inject = function(app) {
  app.factory('$rest', exports.factory);
  return exports.factory;
};

exports.factory = ['$resource', function($resource) {
    var rest = {
      test: $resource('http://api.openweathermap.org/data/2.5/weather?q=London,uk', {}, {
        load: {method: 'GET'}
      })
    };

    return rest;
}];
