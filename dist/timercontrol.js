var app = angular.module('MyApp.timercontrol', []);
app.controller('timercontrol', ["$scope", "$ionicPopup", "$timeout", "$rootScope", "localStore", function($scope,$ionicPopup,$timeout,$rootScope,localStore) {
    //$scope.range = ($scope.rangeMin * 60 *10) + ($scope.rangeSec *10);

    $scope.rangeMin = {min:1};
    $scope.rangeSec = {sec:30};
    $scope.startStopFlag = true;
    $scope.timerClear = true;
    $scope.stringMin = String($scope.rangeMin);
    $scope.stringSec = String($scope.rangeSec);
    $scope.infoFlag = 4;
    $scope.loopFlag = false;
    $scope.startedAt = '';

    $scope.$watch('minutes',function(){
        $scope.stringMin = String($scope.minutes)
        if($scope.stringMin.length < 2){
            $scope.stringMin = "0"+String($scope.minutes)
        }
    });

    $scope.$watch('seconds',function(){
        $scope.stringSec = String($scope.seconds);
        if($scope.stringSec.length < 2){
            $scope.stringSec = "0"+String($scope.seconds);
        }
    });

    $scope.cycle = function(){
        $scope.loopFlag = !$scope.loopFlag;
        $scope.startStop();

    };

    $scope.showInfo = function(){
        if ($rootScope.stateW =='heroku') {

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

            }
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
        console.log(sec,min)
        var changeTime = function(sec,min){
            $scope.rangeMin.min = min;
            $scope.rangeSec.sec = sec;
            $scope.$broadcast('timer-reset');
            $scope.minutes = min;
            $scope.seconds = sec;
        };
        changeTime(sec,min);
        $timeout(function(){
            changeTime(sec,min);
        },5);
        $scope.startStopFlag = true;
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
    // Remove one second from the slider
    $scope.downOneSec = function() {
        if($scope.rangeSec.sec) {
            if ($scope.rangeSec > 0) {
                $scope.rangeSec.sec = parseFloat($scope.rangeSec.sec) - 1;
                $scope.$broadcast('timer-reset');
            }
            $timeout(function () {
                $scope.$broadcast('timer-reset');

            }, 5);
        }

    };

    $scope.onRelease = function(){
        console.log('working');
        if($scope.startStopFlag) {
            console.log('working,',$scope.rangeSec.sec,$scope.rangeMin.min);
            var min = Number($scope.rangeMin.min);
            var sec = Number($scope.rangeSec.sec);
            $scope.timerPreset(sec,min);
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

    $scope.$on( "$ionicView.beforeEnter", function( scopes, states ) {
        if (!states.fromCache && states.stateName == "tab.timer") {
            if(localStore.getStartTime()){

            }

            console.log('got it timer');
            //to prohibit janky button load on first view.
            $scope.startStopFlag = true;


        }
    });



    $scope.startStop = function(){
        //console.log($scope.startStopFlag);
        if($scope.startStopFlag){
            if($scope.timerClear){
                $scope.$broadcast('timer-start');
                localStore.setStartTime();
                //if(window.cordova){tbd
                //    var now = new Date().getTime(),
                //        timeUp  = new Date(now + $scope.seconds*1000+$scope.minutes*60*1000);
                //    cordova.plugins.notification.local.schedule({
                //        text: "Delayed Notification",
                //        at: timeUp,
                //        led: "FF0000",
                //        sound: null
                //    });
                //}
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
            if($scope.loopFlag){
                $scope.loopFlag = false;
            }

            //window.plugins.insomnia.allowSleepAgain()
        }
        $scope.startStopFlag = !$scope.startStopFlag;
    };

    $scope.reset = function(){
        console.log($scope.loopFlag);
        localStore.resetStartTime();
        if($scope.loopFlag){
            console.log('init')
            $scope.loopFlag = false;
            $scope.$broadcast('timer-reset');
        }
        if($scope.timerClear == false){
            //console.log('reset');
            $scope.$broadcast('timer-reset');
            $scope.minutes = 0;
            $scope.seconds = 0;
            $scope.startStopFlag = true;
        }
    };

    $scope.finished = function(){
        //TODO local notification, works outside of app.
        $scope.startStopFlag = true;


        var alertPopup = $ionicPopup.alert({
            title: 'Times up!',
            template: ''
        });
        if($scope.loopFlag){
            alertPopup.close();
            $scope.$broadcast('timer-reset');
            $scope.startStop();
        }
        alertPopup.then(function(res) {

        });
    };



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
