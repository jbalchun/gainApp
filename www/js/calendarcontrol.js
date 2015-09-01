

var app = angular.module('MyApp.calendarcontrol', ['ionic', 'MyApp.services', 'ngStorage']);

app.controller('calendarcontrol', function ($scope, $ionicModal, $timeout, $ionicScrollDelegate, $rootScope, $localStorage, $state, localStore, $ionicPopup, $ionicPopover) {
    $scope.$storage = $localStorage;

    $scope.workouts = $scope.$storage.workouts;
    $scope.filterList = angular.copy($scope.$storage.workouts);
    $scope.searchQuery = '';
    $scope.dateType = '';
    $scope.today = new Date();
    $scope.dateObj = {'Year': 'Year', 'Month': 'Month', 'Day': 'Day'};
    $scope.$storage = $localStorage;
    $scope.nameList = $scope.$storage.nameList;
    $scope.nameFilter = "Name";
    $scope.liftName = "Lift";
    $scope.monthMap = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    };
    $scope.calendar1 = true;
    $scope.infoFlag = 2;
    $scope.date;

    $scope.$on('calRefresh', function () {
        $scope.filterList = angular.copy($scope.$storage.workouts);

    });
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };

    $scope.clearSearch = function () {
        $scope.searchQuery = '';

    };
    $scope.isLiftDay = function (date) {
        if (date.length > 2) {
            return true;
        }
        if ($scope.dateList.indexOf(2) > -1 && $scope.dateObj['Month'] != 'Month') {
            //console.log('filter Check')
            return $scope.checkDayFiltered(date)
        } else if ($scope.dateList.indexOf(2) > -1 && $scope.dateObj['Month'] == 'Month') {
            //console.log('full Check')
            return localStore.checkDay(date)
        }

    };

    $scope.checkDayFiltered = function (day) {
        var resultFlag = false;
        angular.forEach($scope.filterList, function (workout, index) {
            var currentDay = Number(workout.date.slice(3, 6));
            var numDay = Number(day);
            if (currentDay == numDay) {
                resultFlag = true;
                //console.log(resultFlag)
            }

        });
        return resultFlag;
    }

    $scope.removeWorkout = function (workout) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remove this workout permanently?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                localStore.removeWorkout(workout);

                $scope.filterList = angular.copy($scope.$storage.workouts);
                $scope.clearAll();
                $scope.nameList = angular.copy($scope.$storage.nameList);

            } else {

            }
        });
    };

    $ionicPopover.fromTemplateUrl('pop/pop-date.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });
    $ionicPopover.fromTemplateUrl('pop/pop-liftnames.html', {
        scope: $scope
    }).then(function (popover2) {
        $scope.popover2 = popover2;
    });

    $scope.showInfo = function () {
        $timeout(function(){
            //$ionicScrollDelegate.$getByHandle('mainScroll').resize();
            //$ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
        },3);
        if ($rootScope.stateW == 'heroku') {
            var datenew = new Date()
            winston.log('info', $scope.$storage.userId + ", viewed calendar info");
        }
        var confirmPopup = $ionicPopup.show({
            title: 'Calendar',
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
            ////console.log('Tapped!', res);
            if (!window.cordova) {
                var dateDiff = new Date() - datenew
                winston.log('info', $scope.$storage.userId + ", closed calendar after" + dateDiff);
            }
        });

    };

    $scope.datePopup = function ($event, date) {
        document.body.classList.add('platform-ios');
        $scope.dateType = date;
        if (date == "Day") {
            var numberArray = []
            for (var i = 1; i <= 31; i++) {
                numberArray.push(i);
            }
            $scope.dateList = numberArray;
        } else if (date == "Month") {
            $scope.dateList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        } else if (date == "Year") {
            $scope.dateList = ["2015", "2016", "2017", "2018", "2019", "2020"];
        }
        $scope.popover.show($event);
    };

    $scope.clearAll = function () {
        $scope.dateObj = {'Year': 'Year', 'Month': 'Month', 'Day': 'Day'};
        $scope.nameFilter = "Name";
        $scope.liftName = "Lift";
        $scope.filterList = angular.copy($scope.$storage.workouts);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    };


    $scope.namePopup = function ($event) {
        document.body.classList.add('platform-ios');
        //console.log('nml', $scope.nameList)
        $scope.nameList = $scope.$storage.nameList;
        _.uniq($scope.nameList, false);
        var nameArray = []
        angular.forEach($scope.nameList, function (val, key) {
            //console.log("KEYPOP", key, val);
            if (val == "" && nameArray.indexOf("(No Name)") == -1) {
                $scope.nameList[key] = "(No Name)";

            }
                nameArray.push($scope.nameList[key]);

        });
        //console.log('nameArray',nameArray);

        $scope.nameList=_.uniq(nameArray,false);
        //console.log('namelist', $scope.nameList);
        $scope.popover2.show($event);
    };

    $scope.datePopupSelect = function (date, $index) {
        if (date == 'clear') {
            $scope.dateObj[angular.copy($scope.dateType)] = angular.copy($scope.dateType);
            $scope.popover.hide();
            $scope.filter();
            //$scope.filterList = angular.copy($scope.workouts);
            return
        }
        $scope.dateObj[angular.copy($scope.dateType)] = date;
        $scope.dateType = '';
        $scope.popover.hide();
        $scope.filter();
    }

    $scope.namePopupSelect = function (name) {
        //console.log('clearing')
        if (name == 'clear') {
            //console.log('clearing')
            $scope.nameFilter = "Name"
            $scope.popover2.hide();
            $scope.filter();
            //$scope.filterList = angular.copy($scope.workouts);
            return
        }
        $scope.nameFilter = name
        $scope.popover2.hide();
        $scope.filter()
    }
    $scope.clearHold = function () {
        //TODO destroy that filter
    }

    $scope.filter = function (clearFlag) {
        //console.log('filterListBefore', $scope.filterList)
        $scope.filterList = []
        var monthFlag = false
        var dayFlag = false
        var yearFlag = false
        var nameFlag = false
        var liftFlag = false

        var monthArray = [];
        var dayArray = []
        var yearArray = []
        var nameArray = []
        var liftArray = []


        $scope.nameFilter != 'Name' ? nameFlag = true : nameFlag = false
        $scope.dateObj["Month"] != 'Month' ? monthFlag = true : monthFlag = false
        $scope.dateObj["Year"] != 'Year' ? yearFlag = true : yearFlag = false
        $scope.dateObj["Day"] != 'Day' ? dayFlag = true : dayFlag = false
        $scope.liftName != 'Lift' ? liftFlag = true : liftFlag = false

        var noneFlag = 1;
        if ((!nameFlag && !monthFlag && !yearFlag && !dayFlag && !liftFlag) || clearFlag == 'clear') {
            $scope.filterList = angular.copy($scope.$storage.workouts);
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }

        angular.forEach($scope.workouts, function (workout, index) { //if the flag is on remove the matches. make a copy of the list and insert.
            //console.log("day, month, year", $scope.dateObj["Day"], $scope.dateObj["Month"], $scope.dateObj["Year"], $scope.nameFilter)
            //console.log("day, month, year,name,lift flag", dayFlag, monthFlag, yearFlag, nameFlag, liftFlag)
            var currentDate = new Date(workout.date)

            if (liftFlag) { //O(lifts.length*N) shouldn't be slow for a while
                angular.forEach(workout.lifts, function (lift, index) {
                    if (lift.name == $scope.liftName) {
                        //console.log('lift name ', lift.name, 'scope liftname', $scope.liftName, liftFlag)
                        liftArray.push(JSON.stringify(workout));
                    }
                });

            }
            if (monthFlag) {
                if (currentDate.getMonth() + 1 == $scope.monthMap[$scope.dateObj["Month"]]) {
                    monthArray.push(JSON.stringify(workout));
                }
            }
            if (dayFlag) {
                //console.log("daynum", currentDate.getDate());
                if (currentDate.getDate() == $scope.dateObj["Day"]) {
                    dayArray.push(JSON.stringify(workout));
                }
            }

            if (yearFlag) {
                //console.log('getyear', currentDate.getFullYear())
                if (currentDate.getFullYear() == String($scope.dateObj["Year"])) {
                    yearArray.push(JSON.stringify(workout));
                    //console.log("in year", Number($scope.dateObj["Year"]))
                }
            }

            if (nameFlag) {
                if (workout.name == $scope.nameFilter) {
                    nameArray.push(JSON.stringify(workout));
                }
                if ($scope.nameFilter == "(No Name)" && workout.name == "") {
                    nameArray.push(JSON.stringify(workout));
                }

            }

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();

        });

        //$scope.$on("$ionicView.beforeEnter", function (scopes, states) {
        //    if (states.fromCache && states.stateName == "tab.charts") {TODO something like this
        //        // reset basically everything. This is because the chart spazzes when entering and leaving. Still want to cache though
        //        refresh();
        //    }
        //});
        //

        var flagCheckArray = [{flag: dayFlag, array: dayArray}, {flag: monthFlag, array: monthArray},
            {flag: yearFlag, array: yearArray}, {flag: nameFlag, array: nameArray}, {flag: liftFlag, array: liftArray}];
        var breakOut = false;
        angular.forEach(flagCheckArray, function (flagItem, index) {
            //console.log("flag", flagItem.flag, " array", flagItem.array, " index ", index)
            if (flagItem.flag == true && (flagItem.array === undefined || flagItem.array.length == 0 )) {
                //console.log('clear filter lsit')
                $scope.filterList = [];
                breakOut = true;
            }
        });
        if (breakOut) {
            return;
        }
        var arrayArray = [liftArray, monthArray, dayArray, yearArray, nameArray]
        var arrayArray2 = []
        angular.forEach(arrayArray, function (array1, index) {
            //console.log("each array1", array1)
            if (array1.length >= 1) {
                arrayArray2.push(array1)
                //console.log('array2', array1, arrayArray2)
            }
        })

        //console.log('arrarr', arrayArray2)
        //console.log('none', noneFlag)

        var filterStringList = []

        if (arrayArray2.length > 1) {
            //intersect is not working properly
            filterStringList = _.intersection.apply(_, arrayArray2);
            //console.log('filterStringlist', filterStringList)
        }
        else filterStringList = arrayArray2[0];

        angular.forEach(filterStringList, function (string, index) {
            //console.log('String', string)
            $scope.filterList.push(JSON.parse(string))
        })
        //$ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();

        //console.log('filterList', $scope.filterList)
    };

    $scope.loadLiftOptions = function (index) {
        var confirmPopup = $ionicPopup.show({
            title: 'Load workout to editor?',
            scope: $scope,
            subTitle: 'Editor content will be overwritten. "Load lifts only" only pulls in the lift names, "Load sets clean" loads all sets with weights set to 0',
            template: "<style>.popup { width:380px !important; }</style>", //todo web demo only
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Load</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        localStore.loadLiftFromCalendar($scope.filterList[index]);
                        $state.go('tab.posts');
                    }
                },
                {
                    text: '<b>Load lifts only</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        localStore.loadLiftFromCalendar($scope.filterList[index]);
                        localStore.liftsOnly($scope.filterList[index]);
                        $state.go('tab.posts');
                    }
                },
                {
                    text: '<b>Load sets clean</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        localStore.loadLiftFromCalendar($scope.filterList[index]);
                        localStore.wipeWeights();
                        $state.go('tab.posts');
                    }
                }
            ]
        });

        confirmPopup.then(function (res) {
            if (res) {

                //console.log('You are sure');
            } else {
                //console.log('You are not sure');
            }
        });
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
        //console.log("opening")
        $scope.blurFlag = true;
        $scope.modal.show();
    };

    $scope.closeModal = function (newLift) {
        $scope.newLiftModal = newLift
        $scope.blurFlag = false;
        $scope.modal.hide();
    };

    $scope.$on('modal.hidden', function () {
        if ($scope.newLiftModal == 'clear') {
            $scope.liftName = "Lift"
            $scope.filter();
            $timeout(function () {
                $scope.$broadcast('reset-liftselect');
            }, 500);
            return
        }
        if ($scope.newLiftModal != "no change") {
            $scope.liftName = $scope.newLiftModal .name;
            if ($scope.liftName.length < 2 || $scope.liftName == "Lift") {
                $scope.liftName = "Lift";
            }
            $scope.filter();
        }
        $timeout(function () {
            $scope.$broadcast('reset-liftselect');
        }, 500);
    });


});



