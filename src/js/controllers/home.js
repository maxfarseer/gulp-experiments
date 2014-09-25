'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('home', exports.controller);
  require('./../directives/jquery').inject(app);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function home($scope, $rest) {
    var self = this;

    this.test = 'Angular.js works';

    this.restTest = $rest.test.load().$promise.then(function(data) {self.restEnd(data);});

    this.restEnd = function(data) {
      console.log(data);
    };

}];

/*exports.directive = [function() {
  return {
    template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };
}];*/
