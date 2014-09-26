'use strict';
/*jshint -W079 */

var sayHello = require('./modules/say-hello'),
    $ = require('jquery'),
    angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    ngResource = require('npm-angular-resource')(window,angular);

var app = angular.module('offlined', [uiRouter, 'ngResource']);

//inject services
require('./services/rest').inject(app);


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/js/views/home.html',
    controller: require('./controllers/home').inject(app),
    controllerAs: 'home'
  })
  .state('data', {
    url: '/data',
    templateUrl: '/js/views/data.html',
    controller: require('./controllers/data').inject(app),
    controllerAs: 'data'
  });

}]);

app.run(['$rootScope','$rest','$resource', function ($rootScope, $rest) {
  $rootScope.$rest = $rest;
  $rootScope.root = $rootScope;
}]);

//additional directives
app.directive('myCustomerTwo',require('./directives/my-customer-two'));
app.directive('myJquery',require('./directives/my-jquery'));
