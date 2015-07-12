/**
 * Created by Jbalchun on 12/27/14.
 */
var app = angular.module('MyApp.weightcontrol', ['ionic']);

app.controller('weightscontrol', function ($scope) {
    $scope.sets = 0;
    $scope.setArray = [];
    $scope.setArray = function (num) {
        $scope.sets = num;
        for (var i = 0; i < num; i++) {
            $scope.setArray.push(i);
        }

    }

});