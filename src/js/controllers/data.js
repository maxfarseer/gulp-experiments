'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('data', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function data($scope, $rest) {

    $scope.test = 'Data page';

}];
