/**
 * Created by Jbalchun on 12/26/14.
 */
var app = angular.module('MyApp.controllers', ['MyApp.services','ngStorage','ngCordova','chart.js']);

app.filter('liftFilter', function() {
    return function(input, scope) {
        var patt = new RegExp(scope.attr1Pressed + scope.attr2Pressed + scope.attr3Pressed);
        var out = [];
        // $scope.$watch(scope.searchText)
        if(input) {
            for (var i = 0; i < input.length; i++) {
                if (patt.test(input[i].attr1 + input[i].attr2 + input[i].attr3)){
                    out.push(input[i]);
                }

            }
        }
        return out;
    };
});

app.filter('customFilter', function() {
    return function(input, custom) {
        var out = [];
        // $scope.$watch(scope.searchText)
        if(input) {
            if (custom) {
                for (var i = 0; i < input.length; i++) {

                    if (input[i].custom) {
                        out.push(input[i]);
                    }
                }
            }
            else return input;
        }
        return out;
    };
});

//TODO For focusing on modal fields when opened. get to work w. repeat
//app.directive('customAutofocus', function() {
//    return{
//        restrict: 'A',
//
//        link: function(scope, element, attrs){
//            scope.$watch(function(){
//                return scope.$eval(attrs.customAutofocus);
//            },function (newValue){
//                if (newValue == true){
//                    element[0].focus();//use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
//                }
//            });
//        }
//    };
//})
app.directive('takeFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
});


app.directive('selectOnFocus', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('focus', function () {
                //this.select();
                this.setSelectionRange(0, 9999);
            });
        }
    };
});

app.directive('selectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                //this.select();
                this.setSelectionRange(0, 9999);
            });
        }
    };
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.controller('buttonCtrl',
    function($scope,$ionicScrollDelegate,$ionicPlatform,$localStorage,localStore,$ionicPopup,$rootScope) {

        $scope.liftData = $localStorage.liftData;
        $scope.matchedLifts = [];
        $scope.attr1Pressed = '.';
        $scope.attr2Pressed = '.';
        $scope.attr3Pressed = '.';
        $scope.searchTextC='';
        $scope.selectLift={name:"Select Lift"};
        $scope.newLiftName={name:''};
        $scope.custom =false;
        $scope.customLifts = [];
        $scope.removeFlagB=false;
        $scope.liftForSettingsChange = '';
        $scope.liftObjectForSettingsChange ={};
        $scope.liftSelectorState = 'All Lifts';

        $scope.closeKeyboard = function(){
            //cordova.plugins.Keyboard.hide()
            document.activeElement.blur();
            document.activeElement.blur()
        }



        $scope.showInfo = function(){
            if ($rootScope.stateW =='heroku') {
                var datenew = new Date()
                winston.log('info', $scope.$storage.userId + ", viewed liftselect info")
            }
            var confirmPopup = $ionicPopup.show({
                title: 'Lift select',
                //subTitle: "Click 'Select Lift' to choose your movement" + "\n"
                //+ "Click 'Add Weight' to select reps and weight" + "\n"
                //+ " Use the clock to see your history" + "\n" + "\n"
                //+ " Plus and minus add/remove sets and lifts, check button to complete the workout ",
                scope: $scope,
                templateUrl:'pop-maininfo.html',
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
                if ($rootScope.stateW =='heroku') {
                    var dateDiff = new Date() - datenew
                    winston.log('info', $scope.$storage.userId + ", closed liftselect after" +dateDiff)
                }
            });

        };
        //$scope.addLiftFlag = false;

        //Removal function. This feature is overkill for now.
        //$scope.$watch(function () { return $localStorage.selectedLiftNames; },function(){
        //    $scope.selectedLiftNames2 = $localStorage.selectedLiftNames;
        //
        //    var newList1 =$scope.liftData;
        //    angular.forEach($scope.liftData,function(lift,index){
        //        console.log('inforit')
        //        if(lift.name && $scope.selectedLiftNames2.indexOf(lift.name)> -1){
        //            newList1.splice(index,1);
        //        }
        //    });
        //
        //    $scope.liftData = newList1;
        //
        //});


        $scope.liftDataRm= function(){
            console.log($scope.liftData);
            return newList;
        }

        $scope.changeSort= function(index,index2){
            if(index!=4){//if we aren't selecting the weight Rack
                $scope.liftObjectForSettingsChange['attr'+String(index)]=index2;
            }else{
                $scope.liftObjectForSettingsChange['weight']=index2;
            }
        }

        $scope.editSettings = function(name){
            $scope.liftForSettingsChange = name;

            angular.forEach($scope.$storage.liftData,function(lift,index){
                if(name==lift.name){
                    $scope.liftObjectForSettingsChange = lift
                }
            });
            var confirmPopup = $ionicPopup.show({
                templateUrl: 'pop-liftset.html',
                title:'Settings for lift',
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
                console.log('Tapped!', res);
            });
        }

        $scope.listSort = function(cat, val) {
            $ionicScrollDelegate.scrollTop();
            if (cat == 1) {
                if ($scope.attr1Pressed == val) {
                    $scope.attr1Pressed = '.'
                } else $scope.attr1Pressed = val;
            } else if (cat == 2) {
                if ($scope.attr2Pressed == val) {
                    $scope.attr2Pressed = '.'
                } else $scope.attr2Pressed = val;
            } else if (cat == 3) {
                if ($scope.attr3Pressed == val) {
                    $scope.attr3Pressed = '.'
                } else $scope.attr3Pressed = val;
            }
            $ionicScrollDelegate.scrollTop();
        };

        $scope.filterCustom = function(dontFlip){//flag for whether or not you should switch
            $scope.reset();
            $scope.custom ? $scope.liftSelectorState = "All Lifts": $scope.liftSelectorState = "User Entered Lifts"
            if(dontFlip && !$scope.custom){
                $scope.custom = !$scope.custom;
            }
            else if(!dontFlip){
                $scope.custom = !$scope.custom;
            }
            $ionicScrollDelegate.scrollTop();
        };

        $scope.reset = function() {
            $scope.attr1Pressed = '.';
            $scope.attr2Pressed = '.';
            $scope.attr3Pressed = '.';
            $scope.selected = '.';
        }
        // $scope.selected = 0;


        $scope.watch = function (searchText) {
            $scope.searchTextC = searchText;
        };

        $scope.$on('reset-liftselect',function(){
            $scope.reset();
        })

        $scope.isSelected = function(lift) {
            return $scope.selected === lift;
        }

        $scope.removeLiftEntry = function(index){

            if ($scope.removeFlag) {
                localStore.removeLiftEntry(index);
                //$scope.removeFlag = false;
            }
            //$scope.removeFlag = false;
        }

        $scope.setLift = function(lift,index) {
            console.log('remove',lift,index);
            if($scope.removeFlagB){
                localStore.removeLiftEntry(lift.name);
                return;
            }
            $scope.selected = lift;
            $scope.closeModal(lift,0,1);
        }

        $scope.backFrom=function(){
            $scope.closeModal('no change',0,1);

        }
        $scope.swipeLeftLift = function(){
            $scope.closeModal("",0,1);
        }

        $scope.addLift = function(){
            $scope
        }

        $scope.goToUrl = function(name,$ionicPlatform){
            var namePlus= name.replace(/ /g,"+");
            var link = 'https://www.google.com/search?q=' + namePlus;
            //window.open( link, '_system', 'location=yes');
            var ref = window.open(link, '_blank', 'location=no');
            //ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
            //ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
            ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message);
                ref.close();
            });
            //ref.addEventListener('exit', function(event) { alert(event.type); });

        }

        $scope.addLiftPopup = function() {

            console.log("trying ");
            var addLiftPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="newLiftName.name" maxlength="30">',
                title: 'Enter new lift name',
                subTitle: "Press 'View Added' Button to filter to your added lifts",
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: '<b>Add</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            $scope.addLiftFlag = !$scope.addLiftFlag
                            if ($scope.newLiftName.name == '') {
                                //TODO grey out button until they type something
                                //TODO focus snap
                                e.preventDefault();
                            } else {
                                localStore.addLiftToList($scope.newLiftName.name);
                                $scope.newLiftName.name = '';
                                $scope.liftData = $localStorage.liftData;
                                $scope.filterCustom(true);
                            }
                        }
                    }
                ]
            });
            addLiftPopup.then(function (res) {
                $scope.addLiftFlag = !$scope.addLiftFlag
                console.log('Tapped!', res);
            });

        };

    }
);

app.controller('weightcontrol', function($scope) {
    //
    //$scope.$on( '$ionicView.afterEnter', function () {
    //    // Handle iOS-specific issue with jumpy viewport when interacting with input fields.
    //    if ( window.cordova && window.cordova.plugins.Keyboard ) {
    //        cordova.plugins.Keyboard.disableScroll( true );
    //    }
    //    console.log('on in')
    //});
    //$scope.$on( '$ionicView.beforeLeave', function () {
    //    //if ( window.cordova && window.cordova.plugins.Keyboard ) {
    //    //    // return to keyboard default scroll state
    //    //    cordova.plugins.Keyboard.disableScroll( false );
    //    //}
    //    console.log('on out')
    //});
    $scope.removeFlag = false;
    console.log("weightxx"+$scope.indexLift);
    $scope.kgLookup = function(nameLift){


    }

    $scope.remove = function(){
        if ($scope.sets2.length>1){
            $scope.removeFlag = !$scope.removeFlag
        }
    }

    //console.log("nameof 1"+$scope.todaysLiftsM2[0].name);
    //$scope.sets2 = $scope.todaysLiftsM2[$localStorage.editingLift.index].sets;
    //$scope.lift = $scope.liftCards[$scope.indexLift];
    //$scope.sets2 = $scope.lift.sets;

    $scope.lock = function(){

        this.setSelectionRange(0, 1);
    }


    $scope.outRemove2 = function(){
        if($scope.removeFlag){
            $scope.removeFlag = false;
        }
    }

    $scope.addSet = function() {
        console.log('sets2',$scope.editingNumber.id,$scope.wtSelectPress,$scope.wtSelectPress)
        if($scope.sets2[0].reps !=0 || $scope.sets2[0].wt!=0 || $scope.sets2.length>1){
            var last = angular.copy(_.last($scope.sets2));
            $scope.sets2.push(
                last
            );
        }

    }

    $scope.removeSet = function ($index) {
        if ($scope.removeFlag) {
            $scope.sets2.splice($index, 1);
        }
    }

    $scope.submitWeight = function(){

        $scope.closeModal('lift',0,2);
    }


});

app.controller('NavCtrl', function($scope, $location, $state,$rootScope, Post) {//, Auth) {


    $scope.calendar = function(){
        $state.go('tab.calendar')

        if ($rootScope.stateW =='heroku') {
            winston.log('info', $rootScope.$storage.userId + ",went to Calendar")
        }
        //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    $scope.posts = function(){
        $state.go('tab.posts');
        if ($rootScope.stateW =='heroku') {
            winston.log('info', $rootScope.$storage.userId + ",went to Home")
        }
        //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    $scope.charts = function(){
        $state.go('tab.charts')
        //cordova.plugins.Keyboard.disableScroll();
        if ($rootScope.stateW =='heroku') {
            winston.log('info', $rootScope.$storage.userId + ",went to Charts")
        }
        if(window.cordova){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

        }

    }

    $scope.timerNav=function(){
        $state.go('tab.timer')
        if ($rootScope.stateW =='heroku') {
            winston.log('info', $rootScope.$storage.userId + ",went to Timer")
        }
        //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

});


app.controller("LineCtrl",  function ($scope ,$localStorage,localStore,$ionicModal,$timeout,$rootScope, $ionicPopup,$ionicPopover,$state) {
    //$scope.$state = $state;

    //if($state.includes('tab.charts')){
    //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    //
    //}

    $scope.infoFlag =3;
    //AXIS MANIPULATION
    $scope.chartCeiling = undefined;
    $scope.chartOptions = {
        //scaleBeginAtZero: true,
        pointDotRadius : 2,
        scaleLabel : "<%= value%>",
        scaleOverride: false,
        scaleSteps: 10,
        scaleStepWidth: 10,
        scaleStartValue: 100,
        datasetFill:false
    };

    //$scope.showInfo = function(){
    //    var confirmPopup = $ionicPopup.show({
    //        title: 'Charting info',
    //        subTitle: "For a given lift and number of reps, the maximum of each day and week is calculated. Weeks are shown on the x axis, weight on the y axis. Table view shows this data, not all sets",
    //        scope: $scope,
    //        buttons: [
    //            {
    //                text: '<b>Done</b>',
    //                type: 'button-dark',
    //                onTap: function (e) {
    //
    //                }
    //            }
    //        ]
    //    });
    //    confirmPopup.then(function (res) {
    //        console.log('Tapped!', res);
    //    });
    //
    //};


    var axisAdjust = function(zeroFlag,max,min){//zeroflag true means Show the zero(body wt)
        if(zeroFlag){//rounding is off if it's 2 digit
            console.log(max,min,"passing in to axis");
            $scope.chartOptions.scaleOverride = true;
            var maxToStep = 20;//always want steps of 10

            var roundMin = (Math.round(min/10)*10)-20;
            $scope.chartOptions.scaleStartValue = roundMin;

            //MAX Calc
            //subtract, max -100, get the distance. add 20. this is our range from 100. divide by ten.
            var distance = ((Math.round(max/10)*10)-roundMin)+10;
            var steps = distance/10;
            console.log(roundMin,distance,steps,"distance");
            $scope.chartOptions.scaleSteps = steps;
            //MinCalc
        }
        else{
            console.log("reset axis")
            $scope.chartOptions.scaleOverride = false;

        }
    }
    $scope.liftName = "Select Lift";
    $scope.chartTitle = 'Dummy Lift for xx reps';
    $scope.reps2 = "reps";
    $scope.reps = {reps:0};
    $scope.reps3 =[{reps:0},];
    $scope.repsChart = {reps:0};
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July",'asdf','asdf','asdf','asdf','asdf','asdf',"July",'asdf','asdf','asdf','asdf','asdf','asdf'];
    $scope.labels2 = ["January", "February", "March"];
    $scope.series = ['Series A'];
    $scope.selectedLift = "Barbell Bench"
    $scope.data = [
        [145,155,160,155,165,175,185,100,120,130,140,150,154,140,120,150,100,120,120,150],
    ];
    $scope.weightSet =[[], [225,225,245,245,245,250,255,255,275],];
    $scope.bodyWeightData =[];
    $scope.bodyWtFlag = true;
    $scope.dateSet = [1,2,3,4,5,6,7,8,9];
    $scope.firstDate ='Start Date';
    $scope.lastDate='End Date';
    $scope.chartTable =true;
    $scope.dateWeightObjectList =[];
    $scope.goalNum = {wt:undefined};
    $scope.updateFlag = undefined;
    $scope.dateList=[];
    $scope.dateSetFull =[]
    $scope.firstDateFull = '';
    $scope.spanSelect = 0;
    $scope.selectedReps = "Select Reps";
    //broken
    $scope.getReps = function(){
        //went with a flag for returning data as last parameter. Kind of messy.
            $scope.reps3 = localStore.buildRepList($scope.liftName);
            //$scope.reps = $scope.reps3[0];
            console.log("rep3");
            console.log($scope.reps3);

            $scope.repSelect(0,$scope.chartTable,true);
    }

    $scope.$on('closeKeyboard',function(event){
        $scope.updateGoal($scope.repsChart.reps)
    })


    $scope.showInfo = function(){
        if ($rootScope.stateW =='heroku') {
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
            templateUrl:'pop-maininfo.html',
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
            if ($rootScope.stateW =='heroku') {
                var dateDiff = new Date() - datenew
                winston.log('info', $scope.$storage.userId + ", closed data after" +dateDiff)
            }
        });

    };
    $scope.keyPressed = function(keyEvent, formModel) {
        //if (keyEvent.keyCode == 13) {
            console.log(keyEvent)
            //$scope.
            // ()
        //}
    };

    $scope.updateGoal = function(){
        if($scope.chartTitle = "Dummy Lift for xx reps"){
            return
        }

        console.log("reppero",$scope.repsChart.reps)
        var goalMap1 = {};
        console.log("goal before update",$scope.goalNum.wt);
        console.log("Bodywtflag",$scope.bodyWtFlag);
        if(!$scope.bodyWtFlag ){//if we've already drawn body weight
            console.log("init");
            console.log("reppero",$scope.repsChart.reps)
            goalMap1["BodyWt"] = $scope.goalNum.wt;
            localStore.updateGoals(goalMap1);
            //$scope.bodyWtFlag == true;
            $scope.updateFlag = 1; //Used 1 and 0 incase i have like 5 cases. idk if this is ok in my life
            $scope.chartBodyWeight($scope.updateFlag);

        }else{
            console.log("reppero",$scope.repsChart.reps)
            goalMap1[$scope.liftName+String($scope.repsGoal)] = $scope.goalNum.wt;
            localStore.updateGoals(goalMap1);
            $scope.repSelect($scope.repsGoal,$scope.chartTable);
        }
    }

    //$ionicPopover.fromTemplateUrl('../pop-reps.html', function(popover) {
    //    $scope.popover = popover;
    //    popover.show(".ion-more");
    //
    //});

    $ionicPopover.fromTemplateUrl('pop-reps.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.repPopup = function($event){
        document.body.classList.add('platform-ios');
        $scope.popover.show($event);
        };

    $scope.repPopSelect=function(reps){
        console.log("reps here",reps)
        $scope.repsChart.reps = reps;
        $scope.repsGoal = reps
        console.log("reps here",  $scope.repsChart.reps)
        $scope.selectedReps = String(reps+" reps")
        $scope.repSelect(reps,$scope.chartTable);
        $scope.popover.hide();

    }
    $scope.changeView = function(flag,reps){
        console.log('fagflag',$scope.chartTitle);
        if(!$scope.bodyWtFlag){
            $scope.chartBodyWeight(1,true)
        }else if($scope.chartTitle == "Dummy Lift for xx reps"){
            $scope.chartTable = flag;
            return
        }else {
            $scope.repSelect(reps, flag)
        }
        $scope.chartTable = flag;
    }

    $scope.repSelect = function(reps,viewFlag,clearFlag){
        $scope.chartTitle = $scope.liftName;
        $scope.repsChart.reps = reps;
        axisAdjust(false);
        $scope.chartOptions.scaleOverride = false;

        //popover.hide(".liftSelectEntry"); //find out to hide popup
         console.log('selected',$scope.selectedReps);
        if($scope.liftName != "Select Lift" && $scope.selectedReps != "Select Reps" && !clearFlag){
            $scope.weightSet = undefined;
            console.log("repSElect")
            console.log($scope.repsChart.reps)
            $scope.weightSet =[];
            $scope.dateSet=[];
            $scope.dateSetFull=[];
            $timeout(function(){//needed to force redraw on this janky angular chart thing
                $scope.weightSet =  localStore.getDataAngular($scope.liftName,reps,1);
                $scope.dateSetFull = localStore.getDataAngular($scope.liftName,reps,2);
                var dateWeightObjectList =[];
                angular.forEach($scope.dateSetFull,function(date,index){
                    dateWeightObjectList.push({date:date,wt:$scope.weightSet[0][index]})
                });

                if(!viewFlag){

                    console.log("earlybreak")
                    return
                }
                $scope.weightSet = localStore.normalizeToWeeks(dateWeightObjectList,1);

                console.log("fullweightset",$scope.weightSetFull)
                $scope.dateSetFull = localStore.normalizeToWeeks(dateWeightObjectList,2);
                $scope.dateList = localStore.normalizeToWeeks(dateWeightObjectList,3);
                $scope.firstDateFull = $scope.dateList[0];
                $scope.lastDate = $scope.dateList.slice(-1)[0];
                console.log(_.max($scope.weightSet[0]),'maxy')
                $scope.dateSet = angular.copy($scope.dateSetFull);
                $scope.firstDate = angular.copy($scope.firstDateFull);
                var goalArray = [];
                if (getGoal()) {//if its not undefined, make the goal array
                    $scope.goalNum.wt = getGoal();
                    console.log("print get goal",$scope.goalNum.wt);
                    angular.forEach($scope.dateSetFull, function (date, index) {
                        goalArray.push($scope.goalNum.wt.wt);
                    });
                    console.log("print goal array",goalArray);
                    $scope.weightSet.push(goalArray);
                    var zero = angular.copy($scope.weightSet[0]) // dont ask why unshift wouldnt work
                    var one = angular.copy($scope.weightSet[1])
                    $scope.weightSet[0] = one;
                    $scope.weightSet[1] = zero;
                    $scope.weightSetFull = angular.copy($scope.weightSet)
                }
                else {
                    $scope.weightSet.unshift([]);
                    $scope.goalNum.wt=undefined;
                    $scope.weightSetFull = angular.copy($scope.weightSet)
                }
                $scope.dateWeightObjectList = [];
                $scope.dateWeightObjectList = dateWeightObjectList;
                $scope.bodyWtFlag = true;
            });}
            else{
            $scope.weightSet =[[], [200,300,400],];
            $scope.dateSetFull = ['Jan','Feb','March'];
            $scope.dateWeightObjectList = [];
            $scope.weightSetFull = angular.copy($scope.weightSet)
            $scope.bodyWtFlag = true;
            }
    }

    $scope.selectTimespan = function(span){
        if($scope.chartTitle = "Dummy Lift for xx reps"){
            return
        }
        $scope.spanSelect = span;
        var weekSpan= Number(_.last($scope.dateSetFull));
        var weekSetFullCopy = angular.copy($scope.weightSetFull);
        if(span && span <weekSpan){
            var dateSpan = weekSpan - span ;
            var firstDateDate = new Date($scope.firstDateFull);
            console.log(dateSpan,firstDateDate,"date stuff")
            firstDateDate.setDate(firstDateDate.getDate()+dateSpan*7);
            $scope.firstDate = (firstDateDate.getMonth() + 1) + '/' + firstDateDate.getDate() + '/' +  firstDateDate.getFullYear()
            $scope.dateSet = _.last($scope.dateSetFull,span);
            console.log("weightsetFUllGoals",$scope.weightSetFull[1])
            $scope.weightSet[0] = angular.copy(weekSetFullCopy[0].splice(weekSetFullCopy[0].length-span));
            $scope.weightSet[1] = angular.copy(weekSetFullCopy[1].splice(weekSetFullCopy[1].length-span));
            console.log("weightset0",$scope.weightSet[0])

        }else{
            console.log('else',$scope.weightSetFull[1])
            $scope.dateSet = $scope.dateSetFull;
            $scope.firstDate = $scope.firstDateFull;
            $scope.weightSet[0] = angular.copy(weekSetFullCopy[0])
            $scope.weightSet[1] = angular.copy(weekSetFullCopy[1])
            console.log('else',$scope.weightSetFull[1])
        }

    }

    $scope.chartBodyWeight = function(updateFlag,fromNav){
        $scope.firstDate ='';
        $scope.lastDate='';
        if($scope.bodyWtFlag || (updateFlag ==1 && !$scope.bodyWtFlag)){ //it's true, meaning we haven't drawn
            if(updateFlag ==1){
                $scope.updateFlag = 0;
            }
            $scope.weightSet =[];
            $scope.dateSet =[];
            $timeout(function(){
                $scope.weightSet = localStore.getBodyWeightData(1);
                $scope.dateSetFull = localStore.getBodyWeightData(2);
                $scope.dateWeightObjectList = [];
                angular.forEach($scope.dateSetFull,function(date,index){
                    $scope.dateWeightObjectList.push({date:date,wt:$scope.weightSet[0][index]})
                });
                $scope.weightSet = localStore.normalizeToWeeks($scope.dateWeightObjectList,1);
                $scope.dateSetFull = localStore.normalizeToWeeks($scope.dateWeightObjectList,2);
                $scope.weightSetFull = angular.copy($scope.weightSet)
                if(!fromNav){
                    $scope.bodyWtFlag = false;
                }
                $scope.chartTitle = 'Body Weight';
                var dateList = localStore.normalizeToWeeks($scope.dateWeightObjectList,3);
                console.log(dateList);
                $scope.firstDateFull = dateList[0];
                $scope.lastDate = dateList.slice(-1)[0];
                $scope.dateSet = angular.copy($scope.dateSetFull);
                $scope.firstDate = angular.copy($scope.firstDateFull);
                console.log($scope.firstDate,'date')
                if (getGoal()) {//if its not undefined, make the goal array
                    var goalArray =[];
                    //var zeroArray = [];
                    $scope.goalNum.wt = getGoal();
                    console.log("print get goal",$scope.goalNum.wt);
                    angular.forEach($scope.dateSetFull, function (date, index) {
                        goalArray.push($scope.goalNum.wt);
                        //zeroArray.push(0);
                    });
                    console.log("print goal array",goalArray);
                    $scope.weightSet.push(goalArray);
                    var zero = angular.copy($scope.weightSet[0]) // dont ask why unshift wouldnt work
                    var one = angular.copy($scope.weightSet[1])
                    $scope.weightSet[0] = one;
                    $scope.weightSet[1] = zero;
                    $scope.weightSetFull = angular.copy($scope.weightSet)
                    var totalMax = _.max([_.max($scope.weightSet[0]), _.max($scope.weightSet[1])]);
                    var totalMin =_.min([_.min($scope.weightSet[0]), _.min($scope.weightSet[1])]);
                    axisAdjust(true,totalMax,totalMin);
                    //$scope.weightSet.push(zeroArray);
                }else {
                    axisAdjust(true,_.max($scope.weightSet[0]),_.min($scope.weightSet[0]));
                    $scope.weightSet.unshift([]);
                    $scope.goalNum.wt=undefined;
                    $scope.weightSetFull = angular.copy($scope.weightSet)
                }
            })
        } else{//it's false, meaning we've drawn.
            console.log('repsgoal,',$scope.repsGoal)
            if($scope.repsGoal == undefined){
                $scope.weightSet =[[], [225,225,245,245,245,250,255,255,275],];
                $scope.dateSet = [1,2,3,4,5,6,7,8,9];
                $scope.firstDate ='Start Date';
                $scope.lastDate='End Date';
                $scope.chartOptions.scaleOverride = false;
                $scope.bodyWtFlag = true;
                $scope.chartTitle = "Dummy Lift for xx reps"
                return
            }
            $scope.repSelect($scope.repsGoal,$scope.chartTable);
            $scope.bodyWtFlag = true;
        }
    }

    var getGoal = function(){
        if($scope.bodyWtFlag){
            var key = $scope.liftName + String($scope.repsChart.reps);
            return localStore.getGoal(key);
        }else return localStore.getGoal('BodyWt');

    };

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $ionicModal.fromTemplateUrl('nav-liftselector.html', {
        id:'1',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'

    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.blurFlag = true;
            $scope.modal.show();
    };

    $scope.closeModal = function(newLift,sets,id) {
        $scope.blurFlag = false;
        $scope.modal.hide();
        console.log('neither');
        if(newLift != "no change"){
            $scope.liftName = newLift.name;
            $scope.selectedReps="Select Reps";
            $timeout(function(){

            })

            if($scope.liftName.length < 2 || $scope.liftName == "Select Lift"){
                $scope.liftName = "Select Lift";
            }
            $scope.getReps();

        }

    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
        console.log('Destroying modals...');
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

});


app.controller('AccountCtrl', function($scope, $state) {
});

app.controller('accordionCtrl',function($scope){
    $scope.groups = [];
    for (var i=0; i<10; i++) {
        $scope.groups[i] = {
            name: i,
            items: []
        };
        for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
        }
    }

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = $scope.liftCards;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

});


// Homepage Set-A-Goal Controller
    // Prefill the slider to 9:30
    app.controller('GoalCtrl', function($scope,$ionicPopup,$timeout,$rootScope) {
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
                templateUrl:'pop-maininfo.html',
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
                console.log('Tapped!', res);
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
            console.log($scope.startStopFlag);
            if($scope.startStopFlag){
                if($scope.timerClear){
                    $scope.$broadcast('timer-start');
                    //window.plugins.insomnia.keepAwake();
                    $scope.timerClear = false;
                    console.log($scope.timerClear)
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
                console.log('reset');
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
    })
