'use strict';

var sayHello = require('./modules/say-hello'),
    $ = require('jquery'),
    angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    ngResource = require('npm-angular-resource')(window,angular),
    mainCtrl = require('./controllers/mainCtrl'),
    rest = require('./services/rest');

console.log(sayHello.greetings('Max P.'));

var app = angular.module('offlined', ['ngResource', uiRouter, rest]);

// from asker
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/js/views/home/home.html',
        controller: 'mainCtrl'
    })
    .state('step-100-choose-friends', {
        url: '/step-100-choose-friends',
        templateUrl: '/js/views/steps/step-100-choose-friends.html',
        controller: 'Step100Ctrl'
    });
}]);

app.run(['$rootScope','$rest', function ($rootScope, $rest) {
  $rootScope.$rest = $rest;
  $rootScope.root = $rootScope;
}]);

app.controller('mainCtrl', ['$scope', mainCtrl]);

//console.log('FIRE FIRE FIRE' + $);
