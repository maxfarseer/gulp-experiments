'use strict';

var sayHello = require('./modules/say-hello'),
    $ = require('jquery'),
    angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    ngResource = require('npm-angular-resource')(window,angular);

console.log(sayHello.greetings('Max P.'));

var app = angular.module('offlined', [uiRouter]);
require('./services/rest').inject(app);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('findbyid');

  $stateProvider
  .state('findbyid', {
    url: '/find/byid',
    templateUrl: '/js/views/find/byid.html',
    controller: require('./controllers/findbyid').inject(app)
  })
  .state('findbyclan', {
    url: '/find/byclan',
    templateUrl: '/js/views/find/byclan.html',
    controller: require('./controllers/findbyclan').inject(app)
  });
}]);

app.run(['$rootScope','$rest', function ($rootScope, $rest) {
    $rootScope.$rest = $rest;
    $rootScope.root = $rootScope;
}]);
