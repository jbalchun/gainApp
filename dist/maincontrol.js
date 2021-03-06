/**
 * Created by Jbalchun on 12/26/14.
 */
var app = angular.module('MyApp.maincontrol', ['ionic', 'MyApp.services', 'ngStorage', 'ngCordova']);
app.controller('liftcontrol', ["$scope", "$ionicModal", "$localStorage", "$rootScope", "$state", "QuickActionService", "localStore", "parseFactory", "$ionicPopup", "$ionicPopover", "$ionicPlatform", "$timeout", "$ionicScrollDelegate", "$ionicDeploy", function ($scope, $ionicModal, $localStorage, $rootScope,$state, QuickActionService,localStore,parseFactory, $ionicPopup, $ionicPopover, $ionicPlatform, $timeout, $ionicScrollDelegate,$ionicDeploy) {

    $scope.removeFlag = false;
    //$scope.reorderFlag=false;
    $scope.blurFlag = false;
    $scope.promo = {promo:''};
    $scope.indexLift = 0;
    $scope.userId = "userX";
    $scope.focusIndex = 0;
    $scope.userData = {};
    $scope.date = new Date();
    $scope.liftDate = String($scope.date).substring(4, 15);
    //$scope.list1 = [1,2,3];
    $scope.workoutName = {name: ''};
    $scope.bodyWeight = {wt: ''};
    $scope.maxList = {};
    $scope.lastList = {};
    var plusMinusMax = {};
    var plusMinusLast = {};
    $scope.todaysMaxs = {};
    $scope.lastClickedRep = {};
    $rootScope.it = false;
    $scope.goalMap = $scope.$storage.mainObj.goalsMap;
    $scope.unpackedGoalsMap = {};
    $scope.$storage = $localStorage;
    $scope.rangeMap = {};
    $scope.rangeFlipFlag = true;
    $scope.editingShow = 0;
    $scope.lightHeavyMap = $scope.$storage.mainObj.lightHeavyMap
    $scope.nameList = $scope.$storage.mainObj.nameList;
    var lastAmount = 0;
    var lastAmount2 = 0;
    var lastAmount3 = 0;
    $scope.uniqueNameSetsMap = {};
    $scope.resultsSourceNameMap = {};
    $scope.resultsSource = [];
    $scope.notes = {notes: ''};
    var dateGo = new Date();
    $scope.dateObj = {'Year': dateGo.getFullYear(), 'Month': [dateGo.getMonth()], 'Day': dateGo.getDate()};
    $scope.dateList = [];
    $scope.calendar1 = false;
    $scope.infoFlag = 1;
    $scope.loading = true;
    $scope.xyzabc = 'GOGAIN1234';
    $scope.tabTitle = $scope.$storage.mainObj.tabTitle;
    //beta
    $rootScope.betabutton = 'Beta';
    $rootScope.beta = false;
    $rootScope.betaInfo = {feedback:'',email:''};
    $rootScope.$storage.mainObj.betaEmail = $rootScope.betaInfo.email;

    var hideModalFlag = {'newlift': '', 'sets': '', 'id': ''};

    //prevent selection of the same lift, unless its "new lift"
    //for autoselect in weightselect modal
    $scope.auto = {sets: 0, reps: 0}
    $scope.autoSetChoice = [{set1: 3}, {set1: 4}, {set1: 5}, {set1: 6}];
    $scope.autoRepChoice = [3, 5, 6, 8, 10]
    $scope.liftCards = $scope.$storage.mainObj.todaysLifts;
    $scope.updated = $scope.$storage.mainObj.updated;
    //IAP
    $rootScope.IAP = {
        list: [ "unl"]
    };

    $rootScope.IAP.load = function(){
        // Check availability of the storekit plugin
        if (!window.storekit) {
            alert("In-App Purchases not available");
            return;
        }
        //alert('IAP init');
        storekit.init({
            debug:    true, // Enable IAP messages on the console
            ready:    $rootScope.IAP.onReady,
            purchase: $rootScope.IAP.onPurchase,
            restore:  $rootScope.IAP.onRestore,
            error:    $rootScope.IAP.onError
        });
    };

    $scope.restoreAgain =function(){
        storekit.restore();
    };



    $rootScope.IAP.onReady = function () {
        storekit.load($rootScope.IAP.list, function (products, invalidIds) {
            $rootScope.IAP.products = products;
            $rootScope.IAP.loaded = true;
            //alert('loading');
            for (var i = 0; i < invalidIds.length; ++i) {
                console.log("Error: could not load " + invalidIds[i]);
            }
        });
    };
    $rootScope.IAP.onPurchase = function (transactionId, productId, receipt) {
        if(productId === 'unl'){
            //alert("Ads Removed!");
            $scope.$storage.mainObj.unlocked = true;
            var promoResult = $ionicPopup.show({
                title: 'Success! Gain on!',
                scope: $rootScope,
                buttons: [
                    {
                        text: '<b>Close</b>',
                        type: 'button-dark',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            promoResult.then(function(res){
                $scope.register();
            });
        }
    };
    $rootScope.IAP.onRestore = function (transactionId, productId) {
        if(productId === 'unl'){
            //alert("Ads Removed!");
            $scope.$storage.mainObj.unlocked = true;
            var promoResult = $ionicPopup.show({
                title: 'Success! Gain on!',
                scope: $rootScope,
                buttons: [
                    {
                        text: '<b>Close</b>',
                        type: 'button-dark',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            promoResult.then(function(res){
                $scope.register();
            });
        }
    };
    $rootScope.IAP.onError = function (errorCode, errorMessage) {
        alert(errorMessage);
    };
    $rootScope.IAP.buy = function(productId){
        //alert('iapbuy');
        storekit.purchase(productId);
    };

    $ionicPlatform.ready(function(){
        console.log($scope.$storage.mainObj.populated);
        if($scope.$storage.mainObj.firstVisit){
            $rootScope.showWelcomePopup($scope);
            $scope.$storage.mainObj.firstVisit = false;
        }
        if(window.cordova){
            //if((window.device && device.platform === "iOS") && window.storekit) {

                $rootScope.IAP.load();
            //}
        }
        $scope.$on('tab-quick',function(event,args){
            $state.go(args.type);
        });

        parseFactory.deleteAndSave();
        QuickActionService.configure();
        console.log('getit')
        parseFactory.getIt();
        console.log($rootScope.it,'it')
        //DEPLOY
        //var networkStateA = navigator.connection.type;
        //alert(networkStateA);
        //alert('dx');
        //if(window.cordova){
        //    //alert('hascord')
        //    var networkState = navigator.connection.type;
        //    $rootScope.checkAndDoUpdate(networkState);
        //    if($scope.$storage.updated){
        //        $scope.$storage.updated = false;
        //        $scope.updated = $scope.$storage.updated;
        //        var confirmPopup3 = $ionicPopup.show({
        //            title: 'Gain Updated',
        //            subTitle: "Changes:" +
        //            "Minor bug fixes and enhancements",
        //            scope: $scope,
        //            buttons: [
        //                {
        //                    text: '<b>Ok</b>',
        //                    type: 'button-dark'
        //                }
        //            ]
        //        });
        //        confirmPopup3.then(function (res) {
        //            //console.log('Tapped!', res);
        //        });
        //    }
        //}
    });

    $ionicPopover.fromTemplateUrl('pop/pop-date.html', {
        scope: $scope
    }).then(function (popover2) {
        $scope.popover2 = popover2;
    });

    $scope.$on('active-return',function(event,args){
        if(args){
       
            $rootScope.it = true;
        }
        
    });



    $rootScope.closeKeyboard = function () {
        //cordova.plugins.Keyboard.hide()
        console.log('closekey')
        if(window.cordova){
            console.log('closekeyCord')
            cordova.plugins.Keyboard.close();
            $timeout(function(){
                cordova.plugins.Keyboard.close();
            },300);
        }
        document.activeElement.blur();
        document.activeElement.blur();
    };

    $scope.$on('cloud-load',function(){
        $scope.liftCards = $scope.$storage.mainObj.todaysLifts;

    });

    //duplicated,why not?
    $scope.$on('tab-quick',function(event,args){

        $state.go(args.type);
    });


    $scope.datePopup = function ($event, date) {
        document.body.classList.add('platform-ios');
        $scope.dateType = date;
        //console.log('day', date)
        if (date == "Day") {
            var numberArray = []
            for (var i = 1; i <= 31; i++) {
                numberArray.push(i);
            }
            $scope.dateList = numberArray;
        } else if (date == "Month") {
            //console.log('day', date)
            $scope.dateList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        } else if (date == "Year") {
            $scope.dateList = ["2015", "2016", "2017", "2018", "2019", "2020"];
        }
        $scope.popover2.show($event);
    };

    $scope.addLift = function (superFlag) {
        console.log('adding')
        localStore.addLift('Select Lift', [{'reps': '0', wt: '0'}],superFlag);
        console.log('added',$scope.liftCards );
        $scope.liftCards = $scope.$storage.mainObj.todaysLifts;
        $ionicScrollDelegate.$getByHandle('small').scrollBottom();
    };

    $scope.$on('loadedFromCalendar', function (event, args) {
        $scope.liftCards = $scope.$storage.mainObj.todaysLifts;
        $scope.tabTitle = $scope.$storage.mainObj.tabTitle;
    });
    $scope.removeLift = function () {
        if ($scope.liftCards.length > 1) {
            $scope.removeFlag = !$scope.removeFlag;

        }
    };

    $scope.uniqueSortReps = function () {
        $scope.sets = $scope.resultsLifts;
        var repListList = [];
        angular.forEach($scope.resultsLifts, function (lift, index) {
            var repList2 = [];
            angular.forEach(lift.sets, function (setr, index) {
                repList2.push(setr.reps);
            });
            repListList.push(repList2);
        });
        var repListListUS = [];
        angular.forEach(repListList, function (list, index) {
            var repListU = _.unique(list);
            var repListS = repListU.sort(function (a, b) {
                return a - b;
            });
            repListListUS.push(repListS);
        });
        //console.log(repListListUS)
        $scope.uniqueSortedReps = repListListUS;
        //console.log("resultsLifts", $scope.resultsLifts);
        //console.log("usreps", $scope.uniqueSortedReps);
    };

    $scope.populateBodyWeightResults = function () {
        var bodyWeight = Number($scope.bodyWeight.wt)
        if (bodyWeight && bodyWeight > 10) { //probably more restrictions. things are a little loose now.
            var bodyWeightList = localStore.getMax("Body Weight", 0) // not processed.
            var maxDelta = Math.abs(bodyWeight) - _.max(bodyWeightList, function (lift) {
                    return lift.wt;
                }).wt;
            var lastDelta = Math.abs(bodyWeight) - bodyWeightList.slice(-1)[0].wt;
            $scope.maxList["Body Weight"] = Math.abs(Math.abs(bodyWeight) - _.max(bodyWeightList, function (lift) {
                return lift.wt;
            }).wt);
            $scope.lastList["Body Weight"] = Math.abs(Math.abs(bodyWeight) - bodyWeightList.slice(-1)[0].wt);
            //console.log($scope.maxList, bodyWeight);
            return {
                name: "Body Weight",
                reps: 0,
                todaysMax: $scope.bodyWeight.wt,
                max: _.max(bodyWeightList, function (lift) {
                    return lift.wt;
                }).wt,
                last: bodyWeightList.reverse().slice(-2)[0].wt
            }
        }
        else {
            $scope.maxList["Body Weight"] = "None";
            $scope.lastList["Body Weight"] = "None";
        }
    };

    $scope.buildResultsObject = function () {
        var resultsSource = [];
        $scope.uniqueNameSetsMap = {};
        angular.forEach($scope.resultsLifts, function (lift, index) {
            var uniqueSets = _.uniq(lift.sets, function (set1) {
                return set1.reps;
            });
            $scope.uniqueNameSetsMap[lift.name] = uniqueSets;
            angular.forEach(uniqueSets, function (set1, index) {
                resultsSource.push($scope.populateResults(lift.name, set1.reps));
            });
        });
        $scope.resultsSource = resultsSource;
        angular.forEach($scope.resultsSource, function (result, index) {
            $scope.resultsSourceNameMap[result.name + String(result.reps)] = result;
        });
        $scope.resultsSourceNameMap["Body Weight"] = $scope.populateBodyWeightResults();
    };

    $scope.populateResults = function (name, reps,maxItem) { // note we return the dates, if we want to add them. we should.
        //TODO no one needs duplicate lifts, limit that.
        // find the max of that rep and pass the delta to the key
        var weightListTemp = [];
        var liftListMaxTemp = [];
        $scope.lastClickedRep[name] = reps;
        angular.forEach($scope.resultsLifts, function (lift, index) {
            if (lift.name == name) {
                angular.forEach(lift.sets, function (set1, index) {
                    if (Number(set1.reps) == Number(reps)) {
                        liftListMaxTemp.push({name: lift.name, wt: Number(set1.wt)});
                        weightListTemp.push(Number(set1.wt));
                    }
                });
            }
        });
        var weightsMax = _.max(liftListMaxTemp, function (lift) {
            return lift.wt;
        });
        $scope.todaysMaxs[name + String(reps)] = weightsMax.wt;//

        var maxItem = localStore.getMax(name, reps);
        var lastItemList = localStore.getChartData(name, reps, 3);
        if(lastItemList.length == 1){
            var lastItem = {wt:'None',date: lastItemList[0].date};

        }else lastItem = lastItemList[1]

        //console.log('only1', maxItem.only1)
        console.log('lastItem',lastItem)
        if (maxItem.only1 == true) {//if it's the only entry
            //todaysMax and last are showing none
            console.log('results preview lastone', {name: name, reps: reps, todaysMax: $scope.todaysMaxs[name + String(reps)], max: false, last: 0});
            return {name: name, reps: reps, todaysMax: $scope.todaysMaxs[name + String(reps)], max: 0, last: 0}
        }
        if (maxItem < -1000 || !maxItem || maxItem > 1000) {
            $scope.maxList[name] = 'None';
        } else {
            $scope.maxList[name] = Math.abs(weightsMax.wt - Number(maxItem.wt));
            if (weightsMax.wt && weightsMax.wt - Number(maxItem.wt) > 0) {
                plusMinusMax[name] = 0;
            } else plusMinusMax[name] = 1
        }
        if (lastItem < -1000 || !lastItem || lastItem > 1000) {
            $scope.lastList[name] = 'None';

        } else {
            $scope.lastList[name] = Math.abs(weightsMax.wt - Number(lastItem.wt));
            if (weightsMax.wt && weightsMax.wt - Number(lastItem.wt) > 0) {
                plusMinusLast[name] = 0;
            } else plusMinusLast[name] = 1
        }
        //TODO intervene if max/last = the only one
        console.log('results preview', {name: name, reps: reps, todaysMax: $scope.todaysMaxs[name + String(reps)], max: maxItem, last: lastItem});
        return {name: name, reps: reps, todaysMax: $scope.todaysMaxs[name + String(reps)], max: maxItem, last: lastItem}
        //last clicked rep for a given lift
    };

    $scope.centerTap = function(plusMinus){
        if($scope.editingNumber.id === 1 ){
            $scope.changeNumber(1*plusMinus);
        }
        else if($scope.weightRack === 'light' || $scope.weightRack === 'heavytens' || $scope.weightRack === 'heavykg'){
            $scope.changeNumber(.5 * plusMinus);
        }
        else{
            $scope.changeNumber(5*plusMinus);
        }
    };


    $scope.changeNumber = function (amount, button) {//A mess.. if (button) means if it's a button pressed. behave different.
        console.log(amount)

        if ($scope.editingNumber.id) {//if a number has focus
            if ($scope.editingNumber.id == 1) { // if reps?
                if (button) {
                    $scope.sets2[$scope.editingNumber.index].reps = amount;
                    $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].reps}
                    return
                }
                //console.log("reps and amount", $scope.sets2[$scope.editingNumber.index].reps, amount)
                lastAmount = Number($scope.sets2[$scope.editingNumber.index].reps ) + amount;
                //console.log("reps and amount", $scope.sets2[$scope.editingNumber.index].reps, amount, lastAmount)
                if (lastAmount >= 0) {
                    $scope.sets2[$scope.editingNumber.index].reps = Number($scope.sets2[$scope.editingNumber.index].reps) + amount;
                    $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].reps}
                }

            } else if ($scope.editingNumber.id == 2) {
                if (button) {
                    lastAmount2 = amount;
                    $scope.sets2[$scope.editingNumber.index].wt = amount;
                    $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].wt}
                    return
                }
                lastAmount2 = Number($scope.sets2[$scope.editingNumber.index].wt) + amount;
                console.log(lastAmount2);
                //console.log('wts', $scope.sets2[$scope.editingNumber.index].wt, lastAmount2, amount);
                if (lastAmount2 >= 0) {
                    //console.log('in', lastAmount2)
                    $scope.sets2[$scope.editingNumber.index].wt = Number($scope.sets2[$scope.editingNumber.index].wt) + amount;
                    $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].wt};
                }
            } else if ($scope.editingNumber.id == 3) { //goals

                var repsLocal = String($scope.sets2[$scope.editingNumber.index].reps);
                var oldGoal = Number($scope.goalMapEdit[$rootScope.namelift + repsLocal].wt);
                if (button) { // go to amount
                    lastAmount3 = amount;
                    $scope.goalMapEdit[$rootScope.namelift + repsLocal] = {wt: amount};
                    return
                }
                lastAmount3 = $scope.goalMapEdit[$rootScope.namelift + repsLocal].wt + amount;
                if (lastAmount3 >= 0) { // add to amount
                    $scope.goalMapEdit[$rootScope.namelift + repsLocal] = {wt: oldGoal + amount};
                }
            }
        }
    }

    $scope.clearResults = function () {
        $scope.maxList = {};
        $scope.lastList = {};
        plusMinusMax = {};
        plusMinusLast = {};
        $scope.todaysMaxs = {};
        $scope.lastClickedRep = {};
    };

    $scope.onRelease = function (reps, index) {
        $scope.goalMapEdit[$rootScope.namelift + reps] = {wt: $scope.rangeMap[index]};
    }

    $scope.selectNumber = function (index, id) {
        if (id == 1) {
            $scope.rangeFlipFlag = true;
            $scope.editingShow = {num: $scope.sets2[index].reps}
            $scope.editingNumber = {index: index, id: id}
            $scope.wtSelectPress = index + String(id)
            console.log('main',$scope.wtSelectPress);
        }
        else if (id == 2) {
            $scope.rangeFlipFlag = false;
            $scope.editingShow = {num: $scope.sets2[index].wt}
            $scope.editingNumber = {index: index, id: id}
            $scope.wtSelectPress = index + String(id)
        }
    }
    $scope.popAddSet = function () {
        //focus to last
        var incrIndex = $scope.sets2.length-1
        console.log(incrIndex)
        if($scope.editingNumber.id ==1){
            $scope.rangeFlipFlag = true;
            $scope.editingShow = {num: $scope.sets2[incrIndex].reps};
            $scope.editingNumber.index =incrIndex
            $scope.wtSelectPress = incrIndex + String(1);
        }else{

            $scope.rangeFlipFlag = true;
            $scope.editingShow = {num: $scope.sets2[incrIndex].wt};
            $scope.editingNumber.index =incrIndex
            $scope.wtSelectPress = incrIndex + String(2);
        }
        //$scope.wtSelectPress = angular.copy(Number($scope.editingNumber.index)+1 +String($scope.editingNumber.id))
        //$scope.editingShow = angular.copy({num: $scope.sets2[$scope.editingNumber.index].wt})
    };

    $scope.selectGoal = function (index) {

        $scope.wtSelectPress = index + String(3)
        ////console.log('zero',$scope.sets2[0]);
        $scope.editingShow = {num: $scope.goalMapEdit[$rootScope.namelift + String($scope.sets2[index].reps)]}
        $scope.editingNumber = {index: index, id: 3};

    }

    $scope.onReleaseNumber = function () {
        if ($scope.editingNumber.id == 1) {
            lastAmount = $scope.editingShow.num;
            $scope.sets2[$scope.editingNumber.index].reps = $scope.editingShow.num;
        } else if ($scope.editingNumber.id == 2) {
            $scope.sets2[$scope.editingNumber.index].wt = $scope.editingShow.num;
            lastAmount2 = $scope.editingShow.num;

        }
    }

    $scope.preset = function (id) { //need to make it so this sets sets2 to length 3
        var diff = $scope.sets2.length - 3;
        if (diff < 0) {
            $scope.sets2.push(angular.copy($scope.sets2[0]));
            diff++;
            if (diff < 0) {
                $scope.sets2.push(angular.copy($scope.sets2[0]));
            }
        }

        if (id == 1) {
            angular.forEach($scope.sets2, function (set2, id2) {
                set2.reps = 5;
            })
        } else if (id == 2) {
            angular.forEach($scope.sets2, function (set2, id2) {
                set2.reps = 6;
            })

        }
        else if (id == 3) {
            angular.forEach($scope.sets2, function (set2, id2) {
                set2.reps = 8;
            })
        }
        else if (id == 4) {
            angular.forEach($scope.sets2, function (set2, id2) {
                if (id2 == 0) {
                    set2.reps = 5;
                }
                if (id2 == 1) {
                    set2.reps = 3;
                }
                if (id2 == 2) {
                    set2.reps = 1;
                }
            });
        }
        //console.log($scope.sets2)
        $scope.sets2 = _.first($scope.sets2, 3);
        $scope.liftCards[$scope.indexLift].sets = $scope.sets2;
        //console.log($scope.sets2)
    }

    $scope.historyPop = function (index) {
        if ($scope.liftCards[index].name == 'Select Lift' ||
            ($scope.liftCards[index].sets[0].reps == 0 &&
            $scope.liftCards[index].sets[0].wt == 0)) {
            return
        }

        $scope.histIndex = index;
        var listReps = [];
        var name = $scope.liftCards[index].name;
        //console.log("Index", index);
        angular.forEach($scope.liftCards[index].sets, function (set1, index) {
            listReps.push(set1.reps)
            //console.log("index", set1.reps);
        });
        $scope.uniqueRepsHist = _.unique(listReps);
        $scope.maxList = {}
        $scope.lastList = {}
        angular.forEach($scope.uniqueRepsHist, function (uRep, index) {
            if (localStore.getMax(name, uRep).wt) {
                $scope.maxList[uRep] = localStore.getMax(name, uRep).wt;
                //needed reverse here because of the feed order change.
                $scope.lastList[uRep] = localStore.getChartData(name, uRep, 3).reverse().slice(-1)[0].wt
            }
        })
        if ($scope.maxList.length == 0 && $scope.lastList.length == 0) {
            var confirmPopup = $ionicPopup.show({
                title: 'Lift History',
                subTitle: "No recorded numbers for selected lift and reps",
                scope: $scope,
                buttons: [
                    {
                        text: '<b >Done</b>',
                        type: 'button-dark',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            confirmPopup.then(function (res) {
                //console.log('Tapped!', res);
            });
        }
        else {
            var confirmPopup = $ionicPopup.show({
                templateUrl: 'pop/pop-history.html',
                title: 'Lift History',
                subTitle: "For selected lift and reps, this is your last weight lifted and max weight lifted",
                scope: $scope,
                buttons: [
                    {
                        text: '<b >Done</b>',
                        type: 'button-dark',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            confirmPopup.then(function (res) {
                //console.log('Tapped!', res);
            });
        }


    }

    $ionicPopover.fromTemplateUrl('pop/pop-liftnames.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.namePopupSubmit = function ($event) {
        document.body.classList.add('platform-ios');
        //console.log('nml', $scope.nameList)
        $scope.nameList = $rootScope.$storage.mainObj.nameList
        _.uniq($scope.nameList, false);
        var nameArray = []
        angular.forEach($scope.nameList, function (val, key) {
            //console.log("KEYPOP", key, val);
            if (val == "" && nameArray.indexOf("(No Name)") == -1) {
                $scope.nameList[key] = "(No Name)"
            }
            nameArray.push($scope.nameList[key]);

        })
        //console.log('nameArray',nameArray);

        $scope.nameList=_.uniq(nameArray,false);
        //console.log('namelist', $scope.nameList);
        $scope.popover.show($event);
    };

    $scope.namePopupSelect = function (name) {
        //console.log('clearing')
        if (name == 'clear') {
            $scope.nameFilter = "Name"
            $scope.popover.hide();
            $scope.filter();
            return
        }
        $scope.workoutName.name = name;
        $scope.popover.hide();
    }


    $scope.showConfirm = function () {
        var error = false;
        //stop for IAP limit
        console.log($scope.$storage.mainObj.unlocked , $scope.$storage.mainObj.liftCount ,  $scope.$storage.mainObj.liftLimit)
        if(!$scope.$storage.mainObj.unlocked && $scope.$storage.mainObj.liftCount >=  $scope.$storage.mainObj.liftLimit){
            $scope.iapPop(true);
            return
        }
        angular.forEach($scope.liftCards, function (lift, index) {
            if (lift.name == "Select Lift") {
                error = true;
            }
        });
        if (error) {
            var errorPopup = $ionicPopup.confirm({
                title: 'Remove or edit "Select Lift"',
                buttons:[
                    {
                        text: '<b >Cancel</b>',
                        type: 'button-light',
                        onTap: function (e) {

                        }
                    },
                    {
                        text: '<b >Done</b>',
                        type: 'button-dark',
                        onTap: function (e) {

                        }
                    }]
            });
            errorPopup.then(function (res) {
                if (res) {
                    //console.log('You are sure');
                } else {
                    //console.log('You are not sure');
                }
            });
        }
        if (!error) {
            $scope.openModal('none', 'none', 'none', 5)
            return
        }
    };

    $scope.dateErrorPop = function () {
        var confirmPopup = $ionicPopup.show({
            title: 'You already lifted today!',
            subTitle: "Slow down tiger! Only one workout per day! (otherwise our metrics get real messy). Delete today's lift from the calendar tab to re-enter",
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b >Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        //console.log('checkdate', localStore.checkDate($scope.liftDate));

                    }
                }
            ]
        })
    };

    $rootScope.betaPop = function () {
        var betaPop = $ionicPopup.show({
            title: 'Beta Feedback',
            scope: $rootScope,
            templateUrl: 'pop/pop-beta.html',
            buttons: [
                {
                    text: '<b>Cancel</b>',
                    type: 'button-light',
                    onTap: function (e) {

                    }
                },
                {
                    text: '<b>Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {

                    }
                }

            ]
        });
        betaPop.then(function (res) {
            //console.log('Tapped!', res);
            var Beta = Parse.Object.extend("Beta");
            var beta = new Beta();
            beta.save({email: $rootScope.betaInfo.email,uid:$rootScope.$storage.mainObj.userId,feedback:$rootScope.betaInfo.feedback})
                .then(function(object) {
                //alert("yay! it worked");
                    $rootScope.betaInfo.feedback = '';
            });
        });

    };


    $rootScope.emailPop = function () {
        if ($rootScope.stateW == 'heroku') {
            winston.log('info', $scope.$storage.mainObj.userId + ", opened email")

        }
        var emailPop = $ionicPopup.show({
            title: 'Like Gain Deck?',
            scope: $rootScope,
            templateUrl: 'pop/pop-email.html',
            buttons: [
                {
                    text: '<b>Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {

                    }
                }
            ]
        });
        emailPop.then(function (res) {
            //console.log('Tapped!', res);
            if ($rootScope.stateW == 'heroku') {

                if ($rootScope.email.email.length > 3 && $rootScope.email.email.indexOf('@') == -1 ) {
                    winston.log('info', $scope.$storage.mainObj.userId + " closed with no email")
                    var Reddit = Parse.Object.extend("Reddit");
                    var reddit = new Reddit();
                    reddit.save({username: $rootScope.email.email,uid:$rootScope.$storage.mainObj.userId}).then(function(object) {
                        //alert("yay! it worked");
                    });

                } else if($rootScope.email.email.length > 3 ) {
                    winston.log('info', $scope.$storage.mainObj.userId + " closed with email" + $rootScope.email.email)

                    var Email = Parse.Object.extend("Email");
                    var email = new Email();
                    email.save({address: $rootScope.email.email,uid:$rootScope.$storage.mainObj.userId}).then(function(object) {
                        //alert("yay! it worked");
                    });
                    //$scope.$storage.email = angular.copy($rootScope.email.email);
                    //$rootScope.$storage.user.set("email",$rootScope.email.email);
                }
                $scope.$broadcast('destroyEmail')
            }

        });

    };




    $rootScope.iapPop = function (errorFlag) {
        var promo = false;
        var restore = false;
        var title = errorFlag ? "Out of Lifts!" : 'Gain Unlimited!';
        //$rootScope.initStoreiOS();
        var iapPop = $ionicPopup.show({
            title: title,
            templateUrl:'pop/pop-iap.html',
            subTitle: '<b>Get the unlimited version to take full advantage of our tracking and analytics tools ' +
            'Only $1.99.'+'\n'+' Less than your notebook and pen!</b>',
            scope: $rootScope,
            template: "<style>.popup { width:380px !important; }</style>", //todo web demo only
            buttons: $rootScope.it ? [
                {
                    text: '<b>Cancel</b>',
                    type: 'button-light',
                    onTap: function (e) {

                    }
                },
                {
                    text: '<b>Restore</b>',
                    type: 'button-light',
                    onTap: function (e) {
                        restore = true;
                    }
                },
                {
                    text: '<b>Promo Code</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        promo  = true;

                    }
                },
                {
                    text: '<b>Buy</b>',
                    type: 'button-balanced',
                    onTap: function (e) {
                        if(window.cordova) {
                            //if ((window.device && device.platform === "iOS") && window.storekit) {
                            $rootScope.IAP.buy('unl');
                            //}
                        }
                    }
                }
            ] : [
                {
                    text: '<b>Cancel</b>',
                    type: 'button-light',
                    onTap: function (e) {

                    }
                },
                {
                    text: '<b>Restore</b>',
                    type: 'button-light',
                    onTap: function (e) {
                        restore = true;
                    }
                },
                {
                    text: '<b>Buy</b>',
                    type: 'button-balanced',
                    onTap: function (e) {
                        if(window.cordova) {
                            //if ((window.device && device.platform === "iOS") && window.storekit) {
                            $rootScope.IAP.buy('unl');
                            //}
                        }
                    }
                }
            ] 
        });
        iapPop.then(function (res) {
            //console.log('Tapped!', res);
            if(promo){
                $timeout(function(){promoCode()},200)
            }
            if(restore){
                $scope.restoreAgain();
            }

        });

    };




    var promoCode = function(){
        var promoPop = $ionicPopup.show({
            title: 'Promo Code',
            scope: $scope,
            templateUrl: 'pop/pop-promo.html',
            buttons: [
                {
                    text: '<b>Cancel</b>',
                    type: 'button-light',
                    onTap: function () {
                         $scope.cancelPromo = true;
                    }
                },
                {
                    text: '<b>Submit</b>',
                    type: 'button-dark',
                    onTap: function () {

                    }
                }

            ]
        });
        promoPop.then(function (res) {
            if(!$scope.cancelPromo){
                $scope.closeKeyboard();
                $scope.isValid = parseFactory.checkPromo($scope.promo.promo);
            }

        });
    };

    $scope.$on('promo-return',function(event,args){
        console.log('args',args)
        if(args){
            var success = true;
            $scope.$storage.mainObj.unlocked = true;
        }else{
            success = false;
        }

        var message = success ? 'Success! Gain on!' : 'Invalid Code'

        var promoResult = $ionicPopup.show({
            title: message,
            scope: $rootScope,
            buttons: [
                {
                    text: '<b>Close</b>',
                    type: 'button-dark',
                    onTap: function (e) {

                    }
                }
            ]
        });
        promoResult.then(function(res){
            if($scope.$storage.mainObj.unlocked){
                $scope.register()
            }
        });
    });

    $scope.$on('destroyEmail', function () {
        $timeout(function () {
            $rootScope.email.email = ''
        }, 3000)

    });

    $scope.showInfo = function () {
        if ($rootScope.stateW == 'heroku') {
            winston.log('info', $scope.$storage.mainObj.userId + ", viewed home info")
            var datenew = new Date()
        }
        var confirmPopup = $ionicPopup.show({
            title: 'New Workout',
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
                winston.log('info', $scope.$storage.mainObj.userId + ", closed home info after" + dateDiff)
            }
        });
    };

    $scope.removeLiftRow = function ($index,event,item) {

        if ($scope.removeFlag) {
            $scope.liftCards.splice($scope.liftCards.indexOf(item), 1);

        }
        $scope.removeFlag = !$scope.removeFlag;
    }

    $scope.swipeRemoveLiftRow = function ($index,event,item) {

        $scope.liftCards.splice($scope.liftCards.indexOf(item), 1);

    }


    $scope.keyPressed = function (keyEvent, formModel) {
        if (keyEvent.keyCode == 13) {
            //console.log('gotit')
            $scope.s()
        }
    };

    $scope.cloudPop = function(){
        var action = ''
        if(!$scope.$storage.mainObj.unlocked) {
            var confirmPopup = $ionicPopup.show({
                templateUrl: 'pop/pop-cloud.html',
                title: "Cloud Sync",
                subTitle: "<b>Purchase Unlimited to access! Or log in here<b>",
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Cancel</b>',
                        type: 'button-light',
                        onTap: function (e) {
                            action = '3';
                        }

                    },
                    {
                        text: '<b>Log in</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            action = '2';
                        }

                    },
                    {
                        text: '<b>Buy</b>',
                        type: 'button-balanced',
                        onTap: function (e) {
                            action = '1';
                        }

                    }

                ]
            });
        }else{
            var confirmPopup = $ionicPopup.show({
                templateUrl: 'pop/pop-cloud.html',
                title: "Cloud Sync",
                subTitle: "<b>Purchase Unlimited to access! Or log in here<b>",
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Cancel</b>',
                        type: 'button-light',
                        onTap: function (e) {
                            action = '3';
                        }

                    },
                    {
                        text: '<b>Log in</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            action = '2';
                        }

                    },
                    {
                        text: '<b>Register</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            action = '4';
                        }

                    }

                ]
            });
        }
        confirmPopup.then(function (res) {
            if(action === '1'){
                if(window.cordova) {
                    //if ((window.device && device.platform === "iOS") && window.storekit) {
                    $rootScope.IAP.buy('unl');
                    //}
                }
            }
            if(action === '2'){
                $scope.logIn();
            }
            if(action === '4'){
                $scope.register();
            }
        });
    };

    $scope.register = function () {
        var confirmPopup = $ionicPopup.show({
            templateUrl:'pop/pop-register.html',
            scope: $scope,
            title:'Register',
            subTitle:'Create your account to sync your data to the cloud and get access to our web client. The cloud icon will disappear and your data will be synced automatically',
            buttons: [
                {text: 'Later'},
                {
                    text: '<b>Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        parseFactory.register($scope.userData)
                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            $scope.closeKeyboard();
        });
    }

    $scope.logIn = function () {
        var confirmPopup = $ionicPopup.show({
            templateUrl:'pop/pop-signin.html',
            scope: $scope,
            title:'Log In',
            subTitle:'Enter your username and password here to load your profile',
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        parseFactory.logIn($scope.userData)

                    }

                }
            ]
        });
        confirmPopup.then(function (res) {

        });
    }

    $scope.clearLifts = function () {
        if($scope.removeFlag){
            $scope.removeFlag = false
        }
        var confirmPopup = $ionicPopup.show({
            title: 'Clear Lifts?',
            subTitle: "Today's data will be removed",
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Clear</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        localStore.clearLifts();
                        $scope.liftCards = $scope.$storage.mainObj.todaysLifts;
                        $scope.$storage.mainObj.tabTitle= 'Lift';
                        $scope.tabTitle='Lift';
                        $ionicScrollDelegate.scrollTop();
                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            //console.log('Tapped!', res);
        });

    };

    $scope.clearAll = function () {
        if($scope.removeFlag){
            $scope.removeFlag = false
        }
        var confirmPopup = $ionicPopup.show({
            title: 'Clear ALL APP DATA?',
            subTitle: "All data you have inputted will be cleared from the app. Proceed? (just tap the icon to clear today only)",
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Clear</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        localStore.clearAll();
                        $scope.liftCards = $scope.$storage.mainObj.todaysLifts;
                        $scope.$storage.mainObj.tabTitle= 'Lift';
                        $scope.tabTitle='Lift';
                        $ionicScrollDelegate.scrollTop();
                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            //console.log('Tapped!', res);
        });

    };


    $scope.clearAllStart = function () {

        if($scope.removeFlag){
            $scope.removeFlag = false
        }
        var confirmPopup = $ionicPopup.show({
            title: 'Clear sample Workouts?',
            subTitle: "Tap 'Clear Sample Workouts' to wipe the sample workout data and get to work. Your lifts and settings will be maintained",
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Clear Dummy Workouts</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        localStore.clearLiftsOnly();
                        $rootScope.$storage.mainObj.cleared = true;
                        $scope.liftCards = $scope.$storage.mainObj.todaysLifts;
                        $scope.$storage.mainObj.tabTitle= 'Lift';
                        $scope.tabTitle='Lift';
                        $ionicScrollDelegate.scrollTop();
                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            //console.log('Tapped!', res);
        });

    };

    $scope.submitWeight = function () {
        //console.log($scope.sets2);
        $scope.liftCards[$scope.indexLift].sets = $scope.sets2;
        //console.log($scope.sets2);
        $scope.closeModal('lift', 0, 2);
    }

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

    $scope.addSet = function (index) {
        if ($scope.liftCards[index].sets[0].reps != 0 ||
            $scope.liftCards[index].sets[0].wt != 0) {
            localStore.addSet(index);
        }


    }

    $scope.removeSet = function (index) {
        localStore.removeSet(index);
    }

    //goal modal
    $scope.updateGoals = function () {
        localStore.updateGoals($scope.goalMapEdit);
        $scope.goalMap = $scope.$storage.mainObj.goalsMap;
        $scope.closeModal('none', 0, 4);
    }

    $scope.outRemove = function () {
        if ($scope.removeFlag) {
            $scope.removeFlag = !$scope.removeFlag;
        }
    }

    $scope.popEditingNumber = function (num, bool) {
        if (num != $scope.editingShow.num) {
            if (bool) {
                $scope.changeNumber(num, bool)
            } else $scope.changeNumber(num)

        }
        $scope.editingNumber.id = 2
        $scope.wtSelectPress = $scope.editingNumber.index + "2"
        $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].wt}
    }



    //MODALS
    $ionicModal.fromTemplateUrl('modals/nav-liftselector.html', {
        id: '1',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'

    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('modals/nav-weightselector.html', {
        id: '2',
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal2 = modal;
    });

    $ionicModal.fromTemplateUrl('modals/nav-results.html', {
        id: '3',
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal3 = modal;
    });

    $ionicModal.fromTemplateUrl('modals/nav-goals.html', {
        id: '4',
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal4 = modal;
    });

    $ionicModal.fromTemplateUrl('modals/nav-confirm.html', {
        id: '5',
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal5 = modal;
    });
    //TODO pass in 2 indices.


    $scope.openModal = function (name, index, childIndex, id, hf) {
        if (name == 'Select Lift' && id == 2) {
            return
        }
        $scope.lightHeavyMap["Select Lift"] = "heavy";
        var openModalDelay = function () {
            $scope.modal.show();
        }
        if (id == 1) {//lift?
            $scope.blurFlag = true;
            if (window.cordova) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            $scope.$storage.mainObj.selectedLiftNames = [];
            angular.forEach($scope.liftCards, function (lift, index) {
                if (lift.name) {
                    $scope.$storage.mainObj.selectedLiftNames.push(lift.name);
                }
            });
            $timeout(openModalDelay(), 0);
            $scope.$storage.mainObj.editingLift = {'name': name, 'index': index};
            $timeout(function(){
                $scope.loading = false;
            },100);
        }
        else if (id == 2) {//weight?
            $scope.blurFlag = true;
            //$localStorage.editingLift= {'name':name,'index':index};
            //console.log($rootScope.nameLift);
            $rootScope.namelift = name;
            $scope.indexLift = index;


            angular.forEach($scope.$storage.mainObj.liftData, function (key, val) {
                if (key.name == name) {
                    $scope.weightRack = key.weight;
                }
            });

            $scope.focusIndex = 1;
            $scope.sets2 = $scope.liftCards[index].sets;
            $scope.editingNumber = $scope.sets2[0].reps;
            //console.log("editingNum" + $scope.editingNumber);
            //console.log("lightHeavyMap" + $scope.lightHeavyMap[name]);
            $scope.editingShow = {num: 0};
            if (hf) {
                $scope.selectNumber(childIndex, 2);
            }
            else {
                $scope.selectNumber(childIndex, 1);
            }
            $scope.kgMap = localStore.buildKgMap();

            console.log('kgmap',$scope.kgMap);
            $scope.modal2.show();
            //cordova.plugins.Keyboard.disableScroll(true);
        }
        else if (id == 3) {
            $scope.blurFlag = true;

            $scope.populateBodyWeightResults();
            $scope.buildResultsObject();
            $scope.modal3.show();

        } else if (id == 4) {
            if ($scope.liftCards[index].name == 'Select Lift' ||
                ($scope.liftCards[index].sets[0].reps == 0 &&
                $scope.liftCards[index].sets[0].wt == 0)) {
                return
            }
            $scope.blurFlag = true;
            $rootScope.namelift = name;
            $scope.indexLift = index;
            $scope.focusIndex = childIndex;
            $scope.goalMapEdit = angular.copy($scope.goalMap);
            $scope.sets2 = _.uniq($scope.liftCards[index].sets, false, function (set2) {
                return Number(set2.reps)
            });
            $scope.selectGoal(0);
            angular.forEach($scope.$storage.mainObj.liftData, function (key, val) {
                if (key.name == name) {
                    $scope.weightRack = key.weight;
                }
            });
            angular.forEach($scope.sets2, function (set2, ind) {
                if (!$scope.goalMapEdit[$rootScope.namelift + set2.reps]) {
                    $scope.goalMapEdit[$rootScope.namelift + set2.reps] = {wt: 0};
                    $scope.rangeMap[ind] = 0;
                } else {
                    $scope.rangeMap[ind] = $scope.goalMapEdit[$rootScope.namelift + set2.reps].wt;
                }
            });
            $scope.modal4.show();
        }
        else {
            console.log('go',$scope.$storage.mainObj.tabTitle,$scope.workoutName.name);
            if($scope.tabTitle != "Lift"){
                $scope.workoutName.name = angular.copy($scope.$storage.mainObj.tabTitle);
            }
            $scope.blurFlag = true;
            $scope.modal5.show()

        }
    };

    $scope.$on('lift-settings-change',function(event,args){
        console.log('stap up')
        $scope.bootStrapWeightModal(args.name)
    });

    $scope.bootStrapWeightModal = function(name){
        angular.forEach($scope.$storage.mainObj.liftData, function (key, val) {
            if (key.name == name) {
                $scope.weightRack = key.weight;
            }
        });
        $scope.kgMap = localStore.buildKgMap();
    };

    $scope.$on('modal.hidden', function () {
        //console.log(hideModalFlag)
        var newLift = hideModalFlag.newLift
        var sets = hideModalFlag.sets
        var id = hideModalFlag.id
        //console.log(newLift);
        if (id == 1) {
            if (window.cordova) {
                //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (newLift == "no change") {
                if ($scope.liftCards[$scope.$storage.mainObj.editingLift.index].name == "Select Lift") {
                    $scope.liftName = "Select Lift";
                }
            }
            if (newLift != 'no change') {
                $scope.liftCards[$scope.$storage.mainObj.editingLift.index].name = newLift.name;
                $scope.$storage.mainObj.lightHeavyMap[newLift.name] = newLift.weight;
                //console.log($scope.lightHeavyMap);
            }
            localStore.buildKgMap();
            $scope.kgMap = $scope.$storage.mainObj.kgMap
            $timeout(function () {
                $scope.$broadcast('reset-liftselect');
                //flag for force redraw
            }, 500);
        }
        else if (id == 2) {
        }
        else if (id == 3) {
            $timeout(function () {
                $scope.clearResults();
            }, 3000);

        }
        else if (id == 4) {

        }
        else {//confirm
            if (newLift == 1) { //TODO add lift check
                if(true){//!localStore.checkDate($scope.liftDate
                    localStore.saveLift($scope.liftDate, $scope.liftCards, $scope.workoutName, $scope.bodyWeight, $scope.notes);
                    $scope.resultsLifts = $scope.liftCards;
                    $scope.liftCards = $scope.$storage.mainObj.todaysLifts;
                    $scope.uniqueSortReps();
                    $scope.openModal('', '', '', '3');
                    $scope.workoutName.name ='';
                    $scope.notes.notes = '';
                    $scope.bodyWeight.wt = '';
                    $state.go('tab.calendar')//TODO reset filter etc so that it's showing via broadcast or emit
                    $scope.tabTitle = "Lift"
                }else {
                    $scope.dateErrorPop();
                }
            }
        }
    });

    $scope.closeModal = function (newLift, sets, id) {
        //console.log(newLift)
        hideModalFlag = {newLift: newLift, sets: sets, id: id};
        //console.log(hideModalFlag)
        $scope.blurFlag = false;
        if (id == 1) {
            $scope.modal.hide();

        }
        else if (id == 2) {
            $scope.modal2.hide();
        } else if (id == 3) {
            $scope.modal3.hide();

        } else if (id == 4) {
            $scope.modal4.hide();
        } else {
            $scope.modal5.hide()
        }
    };

    //Updates
    $rootScope.checkAndDoUpdate = function(networkState){
        console.log('Ionic Deploy: Checking for updates');
        $ionicDeploy.check().then(function(hasUpdate) {
            $rootScope.hasUpdate = hasUpdate;
            if(networkState == 'wifi' && hasUpdate ){
                alert('updating');
                $rootScope.doUpdate();
                var confirmPopup0 = $ionicPopup.show({
                    title: 'Update Available',
                    subTitle: "Hot-updating your app, updates will appear next time the app is opened. (I only do this automatically over wifi!)",
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Ok</b>',
                            type: 'button-dark'

                        }
                    ]
                });
                confirmPopup0.then(function (res) {
                    //console.log('Tapped!', res);
                });
            }
            else if (hasUpdate){
                var confirmPopup1 = $ionicPopup.show({
                    title: 'Update Available',
                    subTitle: "Tap Ok to *hot-update* your app over cellular (Automatically, no redirect to app store. Alternatively wait for wifi)",
                    scope: $scope,
                    buttons: [
                        {text: 'Later'},
                        {
                            text: '<b>Ok</b>',
                            type: 'button-dark',
                            onTap: function (e) {
                                $scope.$storage.mainObj.updating = true;
                                $rootScope.doUpdate();
                            }
                        }
                    ]
                });
                confirmPopup1.then(function (res) {
                });
            }
        }, function(err) {
            console.error('Ionic Deploy: Unable to check for updates', err);
        });
    };


    $scope.percentage = '';
    $rootScope.doUpdate = function() {
        alert('try updating')
        $ionicDeploy.download().then(function() {
            // called when the download has completed successfully
            alert('downloaded')
            $ionicDeploy.extract().then(function() {
                // called when the extraction completes succesfully
                alert('extracted')
                $scope.$storage.mainObj.updated = true;
                $scope.updated = true;
            }, function(error) {
                alert('error')
                // called when an error occurs
            }, function(deployExtractionProgress) {
                // this is a progress callback, so it will be called a lot
                // deployExtractionProgress will be an Integer representing the current
                // completion percentage.
                alert('extracting')
                $scope.percentage = deployExtractionProgress;
            });
        }, function(deployDownloadError) {
            alert('errord')
            // called when an error occurs
        }, function(deployDownloadProgress) {
            // this is a progress callback, so it will be called a lot
            // deployDownloadProgress will be an Integer representing the current
            // completion percentage.
            alert('downloading');
            $scope.percentage = deployDownloadProgress;
        });

    };

}]);



