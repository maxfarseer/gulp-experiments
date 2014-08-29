'use strict';

var sayHello = require('./modules/say-hello'),
    $ = require('jquery'),
    angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    ngResource = require('npm-angular-resource')(window,angular),
    findById = require('./controllers/findbyid'),
    //findByClan = require('./controllers/findbyclan'),
    rest = require('./services/rest');

console.log(sayHello.greetings('Max P.'));

var app = angular.module('offlined', ['ngResource', uiRouter, rest]);

// from asker
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/find/byid');

  $stateProvider
    .state('findbyid', {
        url: '/find/byid',
        templateUrl: '/js/views/find/byid.html',
        controller: 'findById'
    })
    .state('step-100-choose-friends', {
        url: '/find/byclan',
        templateUrl: '/js/views/find/byclan.html',
        controller: 'findByClan'
    });
}]);

app.run(['$rootScope','$rest', function ($rootScope, $rest) {
  $rootScope.$rest = $rest;
  $rootScope.root = $rootScope;
}]);

app.controller('findById', ['$scope', findById/*, findByClan*/]);

console.log('jquery: ' + $);
