'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('findById', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function findById($scope, $rest) {

    $scope.player = {};
    $scope.player.name = 'Vasya';
    $scope.player.qhLvl = 1;
    $scope.player.limit = 50;

    $scope.player.qhlevels = [1,2,3,4,5,6,7,8,9,10];

    $scope.player.rating = {
      from: 0,
      to: 4000
    };

    // 30 days = 2592000000 ms
    $scope.player.installDate = {
      from: new Date(Date.now() - 2592000000),
      to: new Date()
    };

    //signalR init
    $.connection.hub.start().done(function () {
      // сделать доступными элементы интерфейса после init
      console.log('SignalR ready');
    }).fail(function () {
      console.log('signalR failed');
    });

    $scope.getUsers = function(params) {
      var Admin = $.connection.AdminHub.server,
          p = params;

      Admin.SearchUsers(p.name,p.qhLvl, p.rating.from, p.rating.to, p.installDate.from, p.installDate.to, p.limit)
        .done(function(result){

          $scope.allPlayers = result;
          $scope.$apply();
        });
    };

}];
