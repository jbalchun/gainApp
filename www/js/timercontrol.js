var app = angular.module('MyApp.timercontrol', []);
app.controller('timercontrol', function($scope,$ionicPopup,$cordovaMedia,$timeout,$rootScope,localStore,$ionicPlatform,$ionicPopover,$cordovaLocalNotification) {
    //$scope.range = ($scope.rangeMin * 60 *10) + ($scope.rangeSec *10);

    $scope.rangeMin = {min:1};
    $scope.rangeSec = {sec:30};
    $scope.startStopFlag = true;
    $scope.timerClear = true;
    $scope.loopFlag = false;
    $scope.startedAt = '';
    $scope.count = 0;
    $scope.currentLoops = 0;
    var N = 11;


    $scope.selectedCycle = localStore.getSelectedCycle();
    //$scope.cycles = Array.apply(null, new Array(N)).map((_,i) => i); ECMA 6
    $scope.cycles = Array.apply(null, {length: N}).map(Number.call, Number);
        $scope.$on( "$ionicView.beforeEnter", function( scopes, states ) {
        if (!states.fromCache && states.stateName == "tab.timer") {
            console.log('entering timer');
            $scope.timerPreset(30,1);
            var startTime = localStore.getStartTime();
            var timerMilli = localStore.getMillisecondsFromMinSec();
            //if the timer was running when we left
            //console.log('timermilli', timerMilli,'starttime',startTime);
            $scope.rangeMin = {min:1};
            $scope.rangeSec = {sec:30};

            if(startTime !== 0) {
                var currentTime = new Date();
                var timeDifference = currentTime - startTime;
                if (timeDifference < timerMilli) {
                    var minSecDif = milliToMinSec(timerMilli - timeDifference);
                    var origMinSec = localStore.getStartMinSec();
                    console.log(minSecDif);
                    //$rootScope.$broadcast('timer-set',minSecDif);
                    $scope.timerEnterSet(minSecDif.sec,minSecDif.min);
                    //$timeout(function(){
                    $scope.rangeMin.min = origMinSec.min;
                    $scope.rangeSec.sec = origMinSec.sec;
                    console.log($scope.rangeMin.min,$scope.rangeSec.sec);
                    //},3000)
                    $scope.startStopFlag = false;
                    $scope.startStop();
                }
            }
        }
    });

    //TODO
    $ionicPlatform.on('resume', function() {
        console.log('resuming');
        var startTime = localStore.getStartTime();
        var timerMilli = localStore.getMillisecondsFromMinSec();
        var currentTime = new Date();
        var timeDifference = currentTime - startTime;
        console.log('timediff',timeDifference,'curtime',currentTime,'starttime',startTime,'mil',timerMilli);

        if(!$scope.startStopFlag){
            if (timeDifference < timerMilli) {
                console.log('timer set to negative');
                var minSecDif = milliToMinSec(timerMilli - timeDifference);
                var origMinSec = localStore.getStartMinSec();
                console.log(minSecDif);
                $scope.timerEnterSet(minSecDif.sec,minSecDif.min);
                $scope.rangeMin.min = origMinSec.min;
                $scope.rangeSec.sec = origMinSec.sec;
                console.log($scope.rangeMin.min,$scope.rangeSec.sec);
                $scope.startStopFlag = true;
                $scope.startStop();
            }else{
                $scope.startStopFlag = !$scope.startStopFlag;
                $scope.$broadcast('timer-reset');
            }
        }

        });

    $ionicPlatform.on('pause', function() {
        // do something here to store the timestamp
        console.log('pausing');
    });

    $scope.timerEnterSet = function(sec,min){
        changeTimeEnter(sec,min);
        $timeout(function(){
            changeTimeEnter(sec,min);
        },5);
        $scope.startStopFlag = false;
    };

    var changeTimeEnter = function(sec,min){
        $rootScope.minutes = min;
        $rootScope.seconds = sec;
    };


    $scope.cycle = function(){
        $scope.loopFlag = !$scope.loopFlag;
        $scope.startStop();

    };

    $scope.showInfo = function(){

        $scope.infoFlag = 4;
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

            }
            //console.log('Tapped!', res);
        });

    };

    $scope.timerSettings = function(){
        $scope.infoFlag = 4;
        var confirmPopup = $ionicPopup.show({
            title: 'Timer Settings',
            //subTitle: "Click 'Select Lift' to choose your movement" + "\n"
            //+ "Click 'Add Weight' to select reps and weight" + "\n"
            //+ " Use the clock to see your history" + "\n" + "\n"
            //+ " Plus and minus add/remove sets and lifts, check button to complete the workout ",
            scope: $scope,
            templateUrl:'pop/pop-timerset.html',
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
            //console.log('Tapped!', res);
        });
    };
    //
    //$ionicPopover.fromTemplateUrl('pop/pop-time.html', {
    //    scope: $scope
    //}).then(function (popover) {
    //    $scope.popover = popover;
    //});
    //$scope.timerSlideSet = function(sec, min){
    //    var changeTime2 = function(sec,min){
    //        $scope.$broadcast('timer-reset');
    //        $scope.minutes = min;
    //        $scope.seconds = sec;
    //    };
    //    changeTime2(min,sec);
    //    $timeout(function(){
    //        changeTime2(min,sec);
    //    },5);
    //    $scope.startStopFlag = true;
    //};

    $scope.timerPreset = function(sec, min){
        changeTime(sec,min);
        $timeout(function(){
            changeTime(sec,min);
        },5);
        $scope.startStopFlag = true;
        $scope.timerClear = true;
    };

    var changeTime = function(sec,min){
        $scope.rangeMin.min = min;
        $scope.rangeSec.sec = sec;
        $scope.$broadcast('timer-reset');
        localStore.setStartTime($scope.rangeMin.min,$scope.rangeSec.sec);
        $scope.minutes = min;
        $scope.seconds = sec;
        $scope.timerClear = true;
    };


    // Add one second to the slider
    $scope.upOneMin = function() {
        if($scope.startStopFlag) {
            if ($scope.rangeMin.min < 30) {
                $scope.rangeMin.min = parseFloat($scope.rangeMin.min) + 1;
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
            if ($scope.rangeMin.min > 0) {
                $scope.rangeMin.min = parseFloat($scope.rangeMin.min) - 1;
                $scope.$broadcast('timer-reset');
            }
            $timeout(function () {
                $scope.$broadcast('timer-reset');

            }, 5);
        }
    }

    $scope.upOneSec = function() {
        if($scope.startStopFlag) {
            if ($scope.rangeSec.sec < 59) {
                $scope.rangeSec.sec = parseFloat($scope.rangeSec.sec) + 1;
                $scope.$broadcast('timer-reset');
            }
            $timeout(function () {
                $scope.$broadcast('timer-reset');

            }, 5);
        }

    };

    $scope.downOneSec = function() {
        if($scope.rangeSec.sec) {
            if ($scope.rangeSec.sec > 0) {
                $scope.rangeSec.sec = parseFloat($scope.rangeSec.sec) - 1;
                $scope.$broadcast('timer-reset');
            }
            $timeout(function () {
                $scope.$broadcast('timer-reset');

            }, 5);
        }

    };

    $scope.$on('timer-reset',function(){
        if(!$scope.loopFlag){
            clearNotification();
            console.log('clearing');
            $scope.timerClear = true;
        }
    });

    $scope.$on('timer-stop',function(){
        console.log('clearing');
        clearNotification();
        $scope.timerClear = true;
    });

    var clearNotification = function(){
        if(window.cordova){
            console.log('clear');
            $cordovaLocalNotification.cancelAll(function() {
                alert("done");
            }, this);
        }
    };


    $scope.onRelease = function(){
        console.log('working');
        if($scope.startStopFlag) {
            console.log('working,',$scope.rangeSec.sec,$scope.rangeMin.min);
            var min = Number($scope.rangeMin.min);
            var sec = Number($scope.rangeSec.sec);
            $scope.timerPreset(sec,min);
            $scope.$broadcast('timer-start');

            //$scope.$broadcast('timer-reset');
            //console.log('seconds',$scope.seconds);
            ////$scope.sseconds = $scope.rangeSec.sec < 10 ? '0' + $scope.rangeSec.sec : $scope.rangeSec.sec;
            ////$scope.mminutes = $scope.rangeMin.min < 10 ? '0' + $scope.rangeMin.min : $scope.rangeMin.min;
            //$scope.seconds = $scope.rangeSec.sec
            //$scope.minutes = $scope.rangeMin.min
            //$timeout(function(){
            //    $scope.$broadcast('timer-reset');
            //    //$scope.seconds = $scope.rangeSec.sec
            //    //$scope.minutes = $scope.rangeMin.min
            //    $scope.seconds = 10
            //    $scope.minutes = 5
            //    $scope.$broadcast('timer-reset');
            //});
            //console.log('seconds2',$scope.seconds);
            //console.log('scope.rangeSec',$scope.rangeSec.sec);
            ////$scope.apply($scope.seconds1 = ($scope.rangeMin * 60 ) + ($scope.rangeSec ));
        }
    };

    $scope.seconds1 = function(){
        return Number($scope.rangeMin.min * 60 ) + Number($scope.rangeSec.sec);
    };

    var milliToMinSec = function(milli){
        //convert to minutes, convert decimal to seconds
        console.log('whats milli,', milli);
        var numberFull = milli/(60*1000);
        console.log('timedif',numberFull);
        var numberFullString = numberFull.toString();
        if(numberFullString.indexOf(".") !== -1){
            var secondsDec = Number(numberFullString.slice(numberFullString.indexOf("."),numberFullString.length));
        }
        else{
             var secondsDec = 0;
        }
        console.log('secondsDec',secondsDec)
        var minutes = Math.floor(numberFull);
        var seconds = Math.floor(secondsDec*(60));
        return {'min':minutes,'sec':seconds};
    };


    //comments should be things not easily readable in code
    $scope.startStop = function(){
        $scope.count++;
        if($scope.startStopFlag){
            if($scope.timerClear){
                $scope.$broadcast('timer-start');
                localStore.setStartTime($scope.rangeMin.min,$scope.rangeSec.sec);
                var now = new Date().getTime(),
                    timeUp  = new Date(now +$scope.seconds*1000+$scope.minutes*60*1000);
                console.log('loo',$scope.loopFlag);
                if(window.cordova){
                    if(!$scope.loopFlag){
                        console.log('booking');
                        $cordovaLocalNotification.schedule({
                            at: timeUp,
                            id: $scope.count,
                            title: "Time's Up!"
                        }).then(function () {
                            console.log("The notification has been set");
                        });
                        $scope.count++;
                    }
                    else{
                        console.log('hit it');
                        var paramArray = [];
                        for(var i = $scope.selectedCycle; i >0;i--){
                            var addTime = i*($scope.seconds*1000+$scope.minutes*60*1000);
                            timeUp  = new Date(now + addTime);
                            console.log('forloop',timeUp,i,$scope.selectedCycle);
                            paramArray.push({
                                at: timeUp,
                                id: $scope.count,
                                title: "Time's Up!",
                                text: "Cycle "+ i+ " of " + $scope.selectedCycle
                            });
                            //$cordovaLocalNotification.schedule({
                            //    at: timeUp,
                            //    id: $scope.count,
                            //    title: "Timer Up!",
                            //    text: "Cycle "+ i+ " of " + $scope.selectedCycle
                            //},$scope).then(function () {
                            //    console.log("The notification has been set");
                            //});
                            $scope.count++;
                        }
                        $cordovaLocalNotification.schedule(paramArray,$scope).then(function () {
                            console.log("The notifications have been set");
                        });
                        console.log(paramArray);
                    }

                }
                $scope.timerClear = false;

            }
            else{
                //timer is paused, resume
                $scope.$broadcast('timer-resume');
                //window.plugins.insomnia.keepAwake();
            }
        }
        else{//pause timer
            $scope.$broadcast('timer-stop');
            if($scope.loopFlag){
                $scope.loopFlag = false;

            }
            //window.plugins.insomnia.allowSleepAgain()
        }
        //Switch
        $scope.startStopFlag = !$scope.startStopFlag;
    };

    $ionicPopover.fromTemplateUrl('pop/pop-cycle.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.cyclePop = function ($event) {
        document.body.classList.add('platform-ios');
        console.log('cycles',$scope.cycles);
        $scope.popover.show($event);
    };

    $scope.cycleSelect = function(cycle){
        $scope.selectedCycle = cycle;
        localStore.setSelectedCycle(cycle);
        $scope.popover.hide();

    };

    $scope.reset = function(){
        console.log($scope.loopFlag);
        localStore.resetStartTime();
        if($scope.loopFlag){
            $scope.loopFlag = false;
            $scope.startStopFlag  = !$scope.startStopFlag;
            $scope.$broadcast('timer-reset');
            $scope.timerClear = true;
        }
        //if($scope.timerClear === false){
            $scope.$broadcast('timer-reset');
            $scope.minutes = 0;
            $scope.seconds = 0;
            $scope.startStopFlag = true;
            $scope.timerClear = true;
        //}
    };

    $scope.finished = function(){
        //TODO local notification, works outside of app.
        console.log('finished');
        $scope.startStopFlag = true;
        localStore.resetStartTime();
        $scope.$broadcast('timer-reset');
        console.log( 's',$scope.$storage.mainObj.sound)
        if(window.cordova && $scope.$storage.mainObj.sound){
            play('audio/chime (2).mp3');
        }
        if(!$scope.loopFlag){
            $timeout(function () {
                $scope.alertPopup = $ionicPopup.alert({
                    title: 'Times up!',
                    buttons:[{
                        text: '<b >Done</b>',
                        type: 'button-dark',
                        onTap: function (e) {

                        }
                    }]
                });

            }, 30);
        }
        else{
            $scope.currentLoops++;
            if ($scope.currentLoops <= $scope.selectedCycle) {
                $timeout(function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Cycle '+ $scope.currentLoops + ' of ' + $scope.selectedCycle +' complete'
                    });
                    $timeout(function () {
                        alertPopup.close();
                    }, 600);
                }, 30);
                $scope.$broadcast('timer-reset');
                if($scope.currentLoops < $scope.selectedCycle){
                    $scope.startStop();
                }

                if($scope.currentLoops == $scope.selectedCycle){
                   $scope.loopFlag = !$scope.loopFlag;
                }
            }
            else {
                $scope.currentLoops = 0;
                $scope.$broadcast('timer-reset');
            }
        }

    };

    var play = function(src) {
        var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
    };
    var mediaStatusCallback = function(status) {

    };

});
