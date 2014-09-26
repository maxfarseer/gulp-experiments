'use strict';

exports.inject = function(app) {
  app.controller('data', exports.controller);
  return exports.controller;
};

exports.controller = ['$scope', '$rest', function data($scope, $rest) {
  var self = this;

  $rest.git.load().$promise.then(function(data) {
    self.restEnd(data);
  });

  this.restEnd = function(data) {
    this.githubResponce = data;
  };

}];
