'use strict';

var mainCtrl = function($scope) {
  $scope.testVar = 'We are up and running from a required module!';

  function next(data) {
    $scope.commentators = data.result;
  }

  $scope.loadScorch = function() {
    debugger;
    $scope.$rest.commentqqators.load({}).$promise.then(next);
  };

};

module.exports = mainCtrl;
