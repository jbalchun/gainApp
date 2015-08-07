var app = angular.module('MyApp.timercontrol', []);
app.controller('timercontrol', ["$scope", "$ionicPopup", "$timeout", "$rootScope", function($scope,$ionicPopup,$timeout,$rootScope) {
    //$scope.range = ($scope.rangeMin * 60 *10) + ($scope.rangeSec *10);

    $scope.rangeMin = 1;
    $scope.rangeSec = 30;
    $scope.startStopFlag = true;
    $scope.timerClear = true;
    $scope.stringMin = String($scope.rangeMin);
    $scope.stringSec = String($scope.rangeSec);
    $scope.infoFlag = 4;

    $scope.$watch('minutes',function(){
        $scope.stringMin = String($scope.minutes)
        if($scope.stringMin.length < 2){
            $scope.stringMin = "0"+String($scope.minutes)
        }
    });

    $scope.$watch('seconds',function(){
        $scope.stringSec = String($scope.seconds)
        if($scope.stringSec.length < 2){
            $scope.stringSec = "0"+String($scope.seconds)
        }
    });

    $scope.showInfo = function(){
        if ($rootScope.stateW =='heroku') {
            winston.log('info', $scope.$storage.userId + ", viewed timer info at " + new Date())
        }
        var confirmPopup = $ionicPopup.show({
            title: 'Timer',
            //subTitle: "Click 'Select Lift' to choose your movement" + "\n"
            //+ "Click 'Add Weight' to select reps and weight" + "\n"
            //+ " Use the clock to see your history" + "\n" + "\n"
            //+ " Plus and minus add/remove sets and lifts, check button to complete the workout ",
            scope: $scope,
            templateUrl:'pop/pop-maininfo.html',
            buttons: [
                {
                    text: '<b>Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {

                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            if ($rootScope.stateW =='heroku') {
                winston.log('info', $scope.$storage.userId + ", closed timer info at " + new Date())
            }
            //console.log('Tapped!', res);
        });

    };

    $scope.timerPreset = function(index){
        if(index == 1){
            $scope.rangeMin = 0;
            $scope.rangeSec = 30;
            $scope.$broadcast('timer-reset');
            $scope.minutes = 0;
            $scope.seconds = 30;
            $timeout(function(){
                $scope.rangeMin = 0;
                $scope.rangeSec = 30;
                $scope.$broadcast('timer-reset');
                $scope.minutes = 0;
                $scope.seconds = 30;
            },5);
        }else if(index == 2){
            $scope.rangeMin = 1;
            $scope.rangeSec = 0;
            $scope.$broadcast('timer-reset');
            $scope.minutes = 1;
            $scope.seconds = 0;
            $timeout(function(){
                $scope.rangeMin = 1;
                $scope.rangeSec = 0;
                $scope.$broadcast('timer-reset');
                $scope.minutes = 1;
                $scope.seconds = 0;
            },5);
        }else if(index == 3){
            $scope.rangeMin = 1;
            $scope.rangeSec = 30;
            $scope.$broadcast('timer-reset');
            $scope.minutes = 1;
            $scope.seconds = 30;
            $timeout(function(){
                $scope.rangeMin = 1;
                $scope.rangeSec = 30;
                $scope.$broadcast('timer-reset');
                $scope.minutes = 1;
                $scope.seconds = 30;
            },5);}
        else if(index == 4){
            $scope.rangeMin = 2;
            $scope.rangeSec = 0;
            $scope.$broadcast('timer-reset');
            $scope.minutes = 2;
            $scope.seconds = 0;
            $timeout(function(){
                $scope.rangeMin = 2;
                $scope.rangeSec = 0;
                $scope.$broadcast('timer-reset');
                $scope.minutes = 2;
                $scope.seconds = 0;
            },5);}
        else if(index == 5){
            $scope.rangeMin = 2;
            $scope.rangeSec = 30;
            $scope.$broadcast('timer-reset');
            $scope.minutes = 2;
            $scope.seconds = 30;
            $timeout(function(){
                $scope.rangeMin = 2;
                $scope.rangeSec = 30;
                $scope.$broadcast('timer-reset');
                $scope.minutes = 2;
                $scope.seconds = 30;
            },5);}
        else if(index == 6){
            $scope.rangeMin = 3;
            $scope.rangeSec = 0;
            $scope.$broadcast('timer-reset');
            $scope.minutes = 3;
            $scope.seconds = 0;
            $timeout(function(){
                $scope.rangeMin = 3;
                $scope.rangeSec = 0;
                $scope.$broadcast('timer-reset');
                $scope.minutes = 3;
                $scope.seconds = 0;
            },5);}
        $scope.startStopFlag = true;
    }

    // Add one second to the slider
    $scope.upOneMin = function() {
        if($scope.startStopFlag) {
            if ($scope.rangeMin < 30) {
                $scope.rangeMin = parseFloat($scope.rangeMin) + 1;
                $scope.$broadcast('timer-reset');
                $timeout(function () {
                    $scope.$broadcast('timer-reset');

                }, 5);
            }
        }
    }


    // Remove one second from the slider
    $scope.downOneMin = function() {
        if($scope.startStopFlag) {
            if ($scope.rangeMin > 0) {
                $scope.rangeMin = parseFloat($scope.rangeMin) - 1;
                $scope.$broadcast('timer-reset');
            }
            $timeout(function () {
                $scope.$broadcast('timer-reset');

            }, 5);
        }
    }

    $scope.upOneSec = function() {
        if($scope.startStopFlag) {
            if ($scope.rangeSec < 59) {
                $scope.rangeSec = parseFloat($scope.rangeSec) + 1;
                $scope.$broadcast('timer-reset');
            }
            $timeout(function () {
                $scope.$broadcast('timer-reset');

            }, 5);
        }

    }
    // Remove one second from the slider
    $scope.downOneSec = function() {
        if($scope.startStopFlag) {
            if ($scope.rangeSec > 0) {
                $scope.rangeSec = parseFloat($scope.rangeSec) - 1;
                $scope.$broadcast('timer-reset');
            }
            $timeout(function () {
                $scope.$broadcast('timer-reset');

            }, 5);
        }

    }

    $scope.onRelease = function(){
        if($scope.startStopFlag) {
            $scope.$broadcast('timer-reset');
            //$scope.apply($scope.seconds1 = ($scope.rangeMin * 60 ) + ($scope.rangeSec ));
        }
    }

    $scope.seconds1 = function(){
        return Number($scope.rangeMin * 60 ) + Number($scope.rangeSec);
    }

    $scope.startStop = function(){
        //console.log($scope.startStopFlag);
        if($scope.startStopFlag){
            if($scope.timerClear){
                $scope.$broadcast('timer-start');
                //window.plugins.insomnia.keepAwake();
                $scope.timerClear = false;
                //console.log($scope.timerClear)
            }
            else{
                $scope.$broadcast('timer-resume');
                //window.plugins.insomnia.keepAwake();
            }
        }
        else{$scope.$broadcast('timer-stop');
            //window.plugins.insomnia.allowSleepAgain()
        }
        $scope.startStopFlag = !$scope.startStopFlag;
    }

    $scope.reset = function(){

        if($scope.timerClear == false){
            //console.log('reset');
            $scope.$broadcast('timer-reset');
            $scope.minutes = 0;
            $scope.seconds = 0;
            $scope.startStopFlag = true;
        }
    }
    $scope.finished = function(){
        //TODO local notification, works outside of app.
        $scope.startStopFlag = true;
        var alertPopup = $ionicPopup.alert({
            title: 'Times up!',
            template: ''
        });
        alertPopup.then(function(res) {

        });
    }



// Timer Controller

    // Some presents and variables
    //$scope.duration = moment.duration(parseFloat($scope.range*100), "milliseconds").format("mm:ss", { trim: false });

    //Look out for the shakes and insomnia
    //$scope.eventAdded = false;
    //if (!eventAdded) {
    //if (window.plugins !== undefined) {
    //        window.plugins.insomnia.keepAwake();
    //    }
    //    eventAdded = true;
    //}

    //Shake 'dat booty/phone
    //function shakeEventDi dOccur() {
    //    var items = document.getElementsByTagName('timer');x
    //    var btn = document.getElementsByClassName('button')[0];
    //
    //    if (btn.innerHTML === '◼︎') {
    //        for (var i=0; i < items.length; i++) {
    //            btn.innerHTML = '▶︎';
    //            items[i].stop();
    //        }
    //    }
    //    else {
    //        for (var i=0; i < items.length; i++) {
    //            btn.innerHTML = '◼︎';
    //            items[i].resume();
    //        }
    //    }
    //}

    // Click that button
    $scope.timerToggle = function() {
        //var items = document.getElementsByTagName('timer');
        $scope.$broadcast('timer-stop');
        //if (btn.innerHTML === '◼︎') {
        //    for (var i=0; i < items.length; i++) {
        //        btn.innerHTML = '▶︎';
        //        items[i].stop();
        //    }
        //}
        //else {
        //    for (var i=0; i < items.length; i++) {
        //        btn.innerHTML = '◼︎';
        //        items[i].resume();
        //    }
        //}
    }

    // Go home Buddy, I work(out) alone.
    //$scope.goBack = function() {
    //    window.location.href = '#/app';
    //}
}])
