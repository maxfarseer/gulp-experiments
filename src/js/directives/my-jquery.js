'use strict';

/*exports.inject = function(app) {
  app.directive('myJquery', exports.directive);
  return exports.directive;
};

exports.directive = function() {
  return {
    restrict: 'AE',
    template: 'My jQuery'
  };
};*/

module.exports = function() {
  return {
    restrict: 'AE',
    template: 'My jQuery'
  };
};
