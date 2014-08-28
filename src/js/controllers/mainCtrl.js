'use strict';

var mainCtrl = function($scope) {
  $scope.testVar = 'We are up and running from a required module!';

  function next(data) {
    $scope.commentators = data.result;
  }

  $scope.loadScorch = function() {
    $scope.$rest.commentqqators.load({}).$promise.then(next);
  };

  console.log('mainCtrl loaded');

};

module.exports = mainCtrl;
