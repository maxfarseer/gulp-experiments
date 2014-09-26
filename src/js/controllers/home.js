'use strict';

exports.inject = function(app) {
  app.controller('home', exports.controller);
  return exports.controller;
};

exports.controller = ['$scope', '$rest', function ($scope, $rest) {
  var self = this;

  this.test = 'Angular.js works';

  this.restTest = $rest.test.load().$promise.then(function(data) {
    self.restEnd(data);
  });

  this.restEnd = function(data) {
    this.weatherData = data;
  };

}];
