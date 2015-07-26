/**
 * Created by Jbalchun on 2/2/15.
 */
var app = angular.module('MyApp.chartcontrol', ['MyApp.services', 'ngStorage']);

app.controller("chartcontrol", function ($scope, $localStorage, localStore, $ionicModal, $timeout, $rootScope, $ionicPopup, $ionicPopover, $state) {
    $scope.liftName = "Select Lift";
    $scope.chartTitle = 'Dummy Lift for xx reps';
    $scope.reps2 = "reps";
    $scope.reps = {reps: 0};
    $scope.reps3 = [{reps: 0},];
    $scope.repsChart = {reps: 0};
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July", 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', "July", 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf'];
    $scope.labels2 = ["January", "February", "March"];
    $scope.series = ['Series A'];
    $scope.selectedLift = "Barbell Bench"
    $scope.data = [
        [145, 155, 160, 155, 165, 175, 185, 100, 120, 130, 140, 150, 154, 140, 120, 150, 100, 120, 120, 150],
    ];
    $scope.weightSet = [[], [225, 225, 245, 245, 245, 250, 255, 255, 275],];
    $scope.bodyWeightData = [];
    $scope.bodyWtFlag = true;
    $scope.dateSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.firstDate = 'Start Date';
    $scope.lastDate = 'End Date';
    $scope.chartTable = true;
    $scope.dateWeightObjectList = [];
    $scope.goalNum = {wt: undefined};
    $scope.updateFlag = undefined;
    $scope.dateList = [];
    $scope.dateSetFull = []
    $scope.firstDateFull = '';
    $scope.spanSelect = 0;
    $scope.selectedReps = "Select Reps";


    $scope.infoFlag = 3;
    //AXIS MANIPULATION
    $scope.chartCeiling = undefined;
    $scope.chartOptions = {
        //scaleBeginAtZero: true,
        pointDotRadius: 2,
        scaleLabel: "<%= value%>",
        scaleOverride: false,
        scaleSteps: 10,
        scaleStepWidth: 10,
        scaleStartValue: 100,
        datasetFill: false
    };
    var axisAdjust = function (zeroFlag, max, min) {//zeroflag true means Show the zero(body wt)
        if (zeroFlag) {//rounding is off if it's 2 digit
            console.log(max, min, "passing in to axis");
            $scope.chartOptions.scaleOverride = true;
            var maxToStep = 20;//always want steps of 10

            var roundMin = (Math.round(min / 10) * 10) - 20;
            $scope.chartOptions.scaleStartValue = roundMin;

            //MAX Calc
            //subtract, max -100, get the distance. add 20. this is our range from 100. divide by ten.
            var distance = ((Math.round(max / 10) * 10) - roundMin) + 10;
            var steps = distance / 10;
            console.log(roundMin, distance, steps, "distance");
            $scope.chartOptions.scaleSteps = steps;
            //MinCalc
        }
        else {
            console.log("reset axis")
            $scope.chartOptions.scaleOverride = false;

        }
    }

    $scope.getReps = function () {
        //went with a flag for returning data as last parameter. Kind of messy.
        $scope.reps3 = localStore.buildRepList($scope.liftName);
        //$scope.reps = $scope.reps3[0];
        console.log("rep3");
        console.log($scope.reps3);

        $scope.repSelect(0, $scope.chartTable, true);
    }

    $scope.$on('closeKeyboard', function (event) {
        $scope.updateGoal($scope.repsChart.reps)
    })


    $scope.showInfo = function () {
        if ($rootScope.stateW == 'heroku') {
            var datenew = new Date()
            winston.log('info', $scope.$storage.userId + ", viewed data info")
        }
        var confirmPopup = $ionicPopup.show({
            title: 'Data',
            //subTitle: "Click 'Select Lift' to choose your movement" + "\n"
            //+ "Click 'Add Weight' to select reps and weight" + "\n"
            //+ " Use the clock to see your history" + "\n" + "\n"
            //+ " Plus and minus add/remove sets and lifts, check button to complete the workout ",
            scope: $scope,
            templateUrl: 'pop/pop-maininfo.html',
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
            if ($rootScope.stateW == 'heroku') {
                var dateDiff = new Date() - datenew
                winston.log('info', $scope.$storage.userId + ", closed data after" + dateDiff)
            }
        });

    };
    $scope.keyPressed = function (keyEvent, formModel) {
        //if (keyEvent.keyCode == 13) {
        console.log(keyEvent)
        //$scope.
        // ()
        //}
    };

    $scope.updateGoal = function () {
        if ($scope.chartTitle == "Dummy Lift for xx reps") {
            return
        }

        console.log("reppero", $scope.repsChart.reps)
        var goalMap1 = {};
        console.log("goal before update", $scope.goalNum.wt);
        console.log("Bodywtflag", $scope.bodyWtFlag);
        if (!$scope.bodyWtFlag) {//if we've already drawn body weight
            console.log("init");
            console.log("reppero", $scope.repsChart.reps)
            goalMap1["BodyWt"] = $scope.goalNum.wt;
            localStore.updateGoals(goalMap1);
            //$scope.bodyWtFlag == true;
            $scope.updateFlag = 1; //Used 1 and 0 incase i have like 5 cases. idk if this is ok in my life
            $scope.chartBodyWeight($scope.updateFlag);

        } else {
            console.log("reppero", $scope.repsChart.reps)
            goalMap1[$scope.liftName + String($scope.repsGoal)] = $scope.goalNum.wt;
            localStore.updateGoals(goalMap1);
            $scope.repSelect($scope.repsGoal, $scope.chartTable);
        }
    }

    //$ionicPopover.fromTemplateUrl('../pop-reps.html', function(popover) {
    //    $scope.popover = popover;
    //    popover.show(".ion-more");
    //
    //});

    $ionicPopover.fromTemplateUrl('pop/pop-reps.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.repPopup = function ($event) {
        document.body.classList.add('platform-ios');
        $scope.popover.show($event);
    };

    $scope.repPopSelect = function (reps) {
        console.log("reps here", reps)
        $scope.repsChart.reps = reps;
        $scope.repsGoal = reps
        console.log("reps here", $scope.repsChart.reps)
        $scope.selectedReps = String(reps + " reps")
        $scope.repSelect(reps, $scope.chartTable);
        $scope.popover.hide();

    }
    $scope.changeView = function (flag, reps) {
        console.log('fagflag', $scope.chartTitle);
        if (!$scope.bodyWtFlag) {
            $scope.chartBodyWeight(1, true)
        } else if ($scope.chartTitle == "Dummy Lift for xx reps") {
            $scope.chartTable = flag;
            return
        } else {
            $scope.repSelect(reps, flag)
        }
        $scope.chartTable = flag;
    }

    $scope.repSelect = function (reps, viewFlag, clearFlag) {
        $scope.chartTitle = $scope.liftName;
        $scope.repsChart.reps = reps;
        axisAdjust(false);
        $scope.chartOptions.scaleOverride = false;
        //popover.hide(".liftSelectEntry"); //find out to hide popup
        console.log('selected', $scope.selectedReps);
        if ($scope.liftName != "Select Lift" && $scope.selectedReps != "Select Reps" && !clearFlag) {
            $scope.weightSet = undefined;
            console.log("repSElect")
            console.log($scope.repsChart.reps)
            $scope.weightSet = [];
            $scope.dateSet = [];
            $scope.dateSetFull = [];
            $timeout(function () {//needed to force redraw on this janky angular chart thing
                $scope.weightSet = localStore.getChartData($scope.liftName, reps, 1);
                //$scope.weightSet[1].reverse();
                //$scope.weightSet[1] = $scope.weightSet[1].reverse()
                $scope.dateSetFull = localStore.getChartData($scope.liftName, reps, 2);
                var dateWeightObjectList = [];
                angular.forEach($scope.dateSetFull, function (date, index) {
                    dateWeightObjectList.push({date: date, wt: $scope.weightSet[0][index]})
                });
                dateWeightObjectList.reverse();//realized my calendar was backwards, easy fix
                //if (!viewFlag) {
                //    console.log("earlybreak")
                //    return
                //}
                $scope.weightSet = localStore.normalizeToWeeks(dateWeightObjectList, 1);
                console.log("fullweightset", $scope.weightSet)
                $scope.dateSetFull = localStore.normalizeToWeeks(dateWeightObjectList, 2);
                $scope.dateList = localStore.normalizeToWeeks(dateWeightObjectList, 3);
                $scope.firstDateFull = $scope.dateList[0];
                $scope.lastDate = $scope.dateList.slice(-1)[0];
                console.log(_.max($scope.weightSet[0]), 'maxy')
                $scope.dateSet = angular.copy($scope.dateSetFull);
                $scope.firstDate = angular.copy($scope.firstDateFull);
                var goalArray = [];
                if (getGoal()) {//if its not undefined, make the goal array
                    $scope.goalNum.wt = getGoal();
                    console.log("print get goal", $scope.goalNum.wt);
                    angular.forEach($scope.dateSetFull, function (date, index) {
                        goalArray.push($scope.goalNum.wt.wt);
                    });
                    console.log("print goal array", goalArray);
                    $scope.weightSet.push(goalArray);
                    var zero = angular.copy($scope.weightSet[0]) // dont ask why unshift wouldnt work
                    var one = angular.copy($scope.weightSet[1])
                    $scope.weightSet[0] = one;
                    $scope.weightSet[1] = zero;
                    $scope.weightSetFull = angular.copy($scope.weightSet)
                }
                else {
                    $scope.weightSet.unshift([]);
                    $scope.goalNum.wt = undefined;
                    $scope.weightSetFull = angular.copy($scope.weightSet)
                }
                $scope.dateWeightObjectList = [];
                $scope.dateWeightObjectList = dateWeightObjectList;
                $scope.bodyWtFlag = true;
            });
        }
        else {
            $scope.weightSet = [[], [200, 300, 400],];
            $scope.dateSetFull = ['Jan', 'Feb', 'March'];
            $scope.dateWeightObjectList = [];
            $scope.weightSetFull = angular.copy($scope.weightSet)
            $scope.bodyWtFlag = true;
        }
    }

    $scope.selectTimespan = function (span) {
        if ($scope.chartTitle == "Dummy Lift for xx reps") {
            return
        }
        $scope.spanSelect = span;
        var weekSpan = Number(_.last($scope.dateSetFull));
        console.log('dtwt', $scope.dateSetFull, $scope.weightSetFull)
        var weekSetFullCopy = angular.copy($scope.weightSetFull);
        if (span && span < weekSpan) {
            var dateSpan = weekSpan - span;
            var firstDateDate = new Date($scope.firstDateFull);
            console.log(dateSpan, firstDateDate, "date stuff")
            firstDateDate.setDate(firstDateDate.getDate() + dateSpan * 7);
            $scope.firstDate = (firstDateDate.getMonth() + 1) + '/' + firstDateDate.getDate() + '/' + firstDateDate.getFullYear()
            $scope.dateSet = _.last($scope.dateSetFull, span);
            console.log("weightsetFUllGoals", $scope.weightSetFull[1])
            $scope.weightSet[0] = angular.copy(weekSetFullCopy[0].splice(weekSetFullCopy[0].length - span));
            $scope.weightSet[1] = angular.copy(weekSetFullCopy[1].splice(weekSetFullCopy[1].length - span));
            console.log("weightset0", $scope.weightSet[0])

        } else {
            console.log('else', $scope.weightSetFull[1])
            $scope.dateSet = $scope.dateSetFull;
            $scope.firstDate = $scope.firstDateFull;
            $scope.weightSet[0] = angular.copy(weekSetFullCopy[0])
            $scope.weightSet[1] = angular.copy(weekSetFullCopy[1])
            console.log('else', $scope.weightSetFull[1])
        }

    }

    $scope.chartBodyWeight = function (updateFlag, fromNav) {//this and repselect should be one method.
        $scope.firstDate = '';
        $scope.lastDate = '';
        if ($scope.bodyWtFlag || (updateFlag == 1 && !$scope.bodyWtFlag)) { //it's true, meaning we haven't drawn
            if (updateFlag == 1) {
                $scope.updateFlag = 0;
            }
            $scope.weightSet = [];
            $scope.dateSet = [];
            $timeout(function () {
                $scope.weightSet = localStore.getBodyWeightData(1);
                $scope.dateSetFull = localStore.getBodyWeightData(2);
                $scope.dateWeightObjectList = [];
                angular.forEach($scope.dateSetFull, function (date, index) {
                    $scope.dateWeightObjectList.push({date: date, wt: $scope.weightSet[0][index]})
                });
                $scope.dateWeightObjectList.reverse();
                $scope.weightSet = localStore.normalizeToWeeks($scope.dateWeightObjectList, 1);
                $scope.dateSetFull = localStore.normalizeToWeeks($scope.dateWeightObjectList, 2);
                $scope.weightSetFull = angular.copy($scope.weightSet);
                if (!fromNav) {
                    $scope.bodyWtFlag = false;
                }
                $scope.chartTitle = 'Body Weight';
                var dateList = localStore.normalizeToWeeks($scope.dateWeightObjectList, 3);
                console.log(dateList);
                $scope.firstDateFull = dateList[0];
                $scope.lastDate = dateList.slice(-1)[0];
                $scope.dateSet = angular.copy($scope.dateSetFull);
                $scope.firstDate = angular.copy($scope.firstDateFull);
                console.log($scope.firstDate, 'date')
                if (getGoal()) {//if its not undefined, make the goal array
                    var goalArray = [];
                    //var zeroArray = [];
                    $scope.goalNum.wt = getGoal();
                    console.log("print get goal", $scope.goalNum.wt);
                    angular.forEach($scope.dateSetFull, function (date, index) {
                        goalArray.push($scope.goalNum.wt);
                        //zeroArray.push(0);
                    });
                    console.log("print goal array", goalArray);
                    $scope.weightSet.push(goalArray);
                    var zero = angular.copy($scope.weightSet[0]) // dont ask why unshift wouldnt work
                    var one = angular.copy($scope.weightSet[1])
                    $scope.weightSet[0] = one;
                    $scope.weightSet[1] = zero;
                    $scope.weightSetFull = angular.copy($scope.weightSet)
                    var totalMax = _.max([_.max($scope.weightSet[0]), _.max($scope.weightSet[1])]);
                    var totalMin = _.min([_.min($scope.weightSet[0]), _.min($scope.weightSet[1])]);
                    axisAdjust(true, totalMax, totalMin);
                    //$scope.weightSet.push(zeroArray);
                } else {
                    axisAdjust(true, _.max($scope.weightSet[0]), _.min($scope.weightSet[0]));
                    $scope.weightSet.unshift([]);
                    $scope.goalNum.wt = undefined;
                    $scope.weightSetFull = angular.copy($scope.weightSet)
                }
            })
        } else {//it's false, meaning we've drawn.
            console.log('repsgoal,', $scope.repsGoal)
            if ($scope.repsGoal == undefined) {
                $scope.weightSet = [[], [225, 225, 245, 245, 245, 250, 255, 255, 275],];
                $scope.dateSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                $scope.firstDate = 'Start Date';
                $scope.lastDate = 'End Date';
                $scope.chartOptions.scaleOverride = false;
                $scope.bodyWtFlag = true;
                $scope.chartTitle = "Dummy Lift for xx reps"
                return
            }
            $scope.repSelect($scope.repsGoal, $scope.chartTable);
            $scope.bodyWtFlag = true;
        }
    }

    var getGoal = function () {
        if ($scope.bodyWtFlag) {
            var key = $scope.liftName + String($scope.repsChart.reps);
            return localStore.getGoal(key);
        } else return localStore.getGoal('BodyWt');

    };

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $ionicModal.fromTemplateUrl('modals/nav-liftselector.html', {
        id: '1',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.blurFlag = true;
        $scope.modal.show();
    };

    $scope.closeModal = function (newLift, sets, id) {
        $scope.blurFlag = false;
        $scope.modal.hide();
        console.log('neither');
        if (newLift != "no change") {
            $scope.liftName = newLift.name;
            $scope.selectedReps = "Select Reps";
            $timeout(function () {

            })

            if ($scope.liftName.length < 2 || $scope.liftName == "Select Lift") {
                $scope.liftName = "Select Lift";
            }
            $scope.getReps();

        }

    };

});
