var app = angular.module('MyApp.navcontrol', ['ngCordova']);
app.controller('navcontrol', ["$scope", "$location", "$state", "$rootScope", function($scope, $location, $state,$rootScope) {//, Auth) {
    $scope.calendar = function(){
        $state.go('tab.calendar');
        $rootScope.view = 'calendar';
        $rootScope.$broadcast('reset-chart');

        if(window.cordova){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
    };

    $scope.posts = function(){
        $state.go('tab.posts');
        $rootScope.$broadcast('reset-chart');
        $rootScope.view = 'posts'

            //winston.log('info', $rootScope.$storage.userId + ",went to Home");

        if(window.cordova){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
    };

    $scope.charts = function(){
        $state.go('tab.charts')
        $rootScope.view = 'charts';
        //cordova.plugins.Keyboard.disableScroll();
        if ($rootScope.stateW =='heroku') {
            //winston.log('info', $rootScope.$storage.userId + ",went to Charts");
        }
        if(window.cordova){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        //$rootScope.$broadcast('reset-charts');
    };

    $scope.timerNav=function(){
        $state.go('tab.timer')
        $rootScope.view = 'timer';
        $rootScope.$broadcast('reset-chart');
        if ($rootScope.stateW =='heroku') {
            //winston.log('info', $rootScope.$storage.userId + ",went to Timer");
        }

        if(window.cordova){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    };

}]);
