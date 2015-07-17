/**
 * Created by Jbalchun on 12/26/14.
 */
var app = angular.module('MyApp.postscontrol', ['ionic','MyApp.services','ngStorage','ngCordova']);

app.controller('liftcontrol', function ($scope,$ionicModal,$localStorage,localStore,$ionicPopup,$ionicPopover,$ionicPlatform,$timeout, $ionicScrollDelegate) {

    $scope.removeFlag = false;
    //$scope.reorderFlag=false;
    $scope.blurFlag=false;
    $scope.indexLift = 0;
    $scope.userId="userX";
    $scope.focusIndex = 0;
    $scope.date = new Date();
    $scope.liftDate = String($scope.date).substring(4,15);
    //$scope.list1 = [1,2,3];
    $scope.workoutName = {name:''};
    $scope.bodyWeight ={wt:''};
    $scope.maxList ={};
    $scope.lastList ={};
    $scope.plusMinusMax = {};
    $scope.plusMinusLast ={};
    $scope.todaysMaxs = {};
    $scope.lastClickedRep = {};
    $scope.goalMap = $scope.$storage.goalsMap;
    $scope.unpackedGoalsMap = {};
    $scope.$storage = $localStorage;
    $scope.rangeMap={};
    $scope.rangeFlipFlag = true;
    $scope.editingShow =0;
    $scope.lightHeavyMap = $scope.$storage.lightHeavyMap
    $scope.nameList = $scope.$storage.nameList;
    $scope.lastAmount=0;
    $scope.lastAmount2=0;
    $scope.lastAmount3=0;
    $scope.uniqueNameSetsMap = {};
    $scope.resultsSourceNameMap ={};
    $scope.resultsSource = [];
    $scope.notes = {notes:''};
    var dateGo = new Date();
    $scope.dateObj = {'Year':dateGo.getFullYear(),'Month':[dateGo.getMonth()],'Day':dateGo.getDate()};
    $scope.dateList = [];
    $scope.calendar1 = false;
    $scope.infoFlag =1;

        //prevent selection of the same lift, unless its "new lift"
    //for autoselect in weightselect modal
    $scope.auto ={sets:0,reps:0}
    $scope.autoSetChoice=[{set1:3},{set1:4},{set1:5},{set1:6}];
    $scope.autoRepChoice=[3,5,6,8,10]

    $scope.liftCards =  $scope.$storage.todaysLifts;
    //$scope.$watch('$localStorage.todaysLifts', function() {
    //    $scope.liftCards =  $localStorage.todaysLifts;
    //});

    $ionicPopover.fromTemplateUrl('pop-date.html', {
        scope: $scope
    }).then(function(popover2) {
        $scope.popover2 = popover2;
    });

    $scope.closeKeyboard = function(){
        //cordova.plugins.Keyboard.hide()
        document.activeElement.blur();
        document.activeElement.blur()
    }



    $scope.datePopup = function($event,date){
        document.body.classList.add('platform-ios');
        $scope.dateType = date;
        console.log('day',date)
        if(date == "Day"){
            var numberArray = []
            for(var i = 1; i <= 31 ;i++){
                numberArray.push(i);
            }
            $scope.dateList = numberArray;
        }else if(date == "Month"){
            console.log('day',date)
            $scope.dateList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        }else if(date == "Year"){
            $scope.dateList = ["2015","2016","2017","2018","2019","2020"];
        }
        $scope.popover2.show($event);
    };

    $scope.addLift = function () {
        localStore.addLift('Select Lift',[{'reps':'0',wt:'0'}]);
    }

    $scope.$on('loadedFromCalendar', function(event, args) {
        $scope.liftCards =  $scope.$storage.todaysLifts;
    });

    $scope.removeLift = function(){
        if($scope.liftCards.length>1){
            $scope.removeFlag = !$scope.removeFlag
        }
    }

    $scope.uniqueSortReps = function(){
        $scope.sets = $scope.resultsLifts;
        var repListList = [];
        angular.forEach($scope.resultsLifts, function(lift,index ) {
            var repList2 = []
            angular.forEach(lift.sets, function (setr, index) {
                repList2.push(setr.reps)
            });
            repListList.push(repList2);
        });
        var repListListUS = []
        angular.forEach(repListList, function(list,index){
            var repListU = _.unique(list);
            var repListS = repListU.sort(function(a,b) { return a - b; });
                repListListUS.push(repListS);
        });
        console.log(repListListUS)
        $scope.uniqueSortedReps = repListListUS;
        console.log("resultsLifts",$scope.resultsLifts);
        console.log("usreps",  $scope.uniqueSortedReps  );
    };

    $scope.populateBodyWeightResults = function(){
        var bodyWeight = Number($scope.bodyWeight.wt)
        if(bodyWeight && bodyWeight > 10){ //probably more restrictions. things are a little loose now.
            var bodyWeightList = localStore.getMax("Body Weight", 0) // not processed.
            var maxDelta = Math.abs(bodyWeight) - _.max(bodyWeightList,function(lift){ return lift.wt; }).wt;
            var lastDelta = Math.abs(bodyWeight) -  bodyWeightList.slice(-1)[0].wt;
            $scope.maxList["Body Weight"] = Math.abs(Math.abs(bodyWeight) - _.max(bodyWeightList,function(lift){ return lift.wt; }).wt);
            $scope.lastList["Body Weight"] = Math.abs(Math.abs(bodyWeight) -  bodyWeightList.slice(-1)[0].wt);
            console.log($scope.maxList,bodyWeight);

            if( Number(maxDelta) > 0){
                $scope.plusMinusMax["Body Weight"] = 0;
            }else $scope.plusMinusMax["Body Weight"] = 1;

            if(Number(lastDelta) > 0){
                $scope.plusMinusLast["Body Weight"] = 0;
            }else $scope.plusMinusLast["Body Weight"] = 1;
            return{name:"Body Weight",reps:0,todaysMax:$scope.bodyWeight.wt,max:_.max(bodyWeightList,function(lift){ return lift.wt; }).wt,last:bodyWeightList.slice(-1)[0].wt}
        }
        else{
            $scope.maxList["Body Weight"] = "None";
            $scope.lastList["Body Weight"] = "None";
        }


    };

    $scope.buildResultsObject = function(){
        var resultsSource = [];
        $scope.uniqueNameSetsMap = {};
        angular.forEach($scope.resultsLifts,function(lift,index){
            var uniqueSets = _.uniq(lift.sets,function(set1){ return set1.reps; })
            $scope.uniqueNameSetsMap[lift.name]=uniqueSets;
            //_.uniq(personArray, function(person) { return person.age; });
            console.log("uniqueSets",uniqueSets)
            angular.forEach(uniqueSets,function(set1,index){
                resultsSource.push($scope.populateResults(lift.name,set1.reps))
            });
        })

        $scope.resultsSource = resultsSource;

        angular.forEach($scope.resultsSource,function(result,index){
            $scope.resultsSourceNameMap[result.name+String(result.reps)]=result;
        });
        console.log("uniqueNameSetsMap",$scope.uniqueNameSetsMap);
        console.log("$scope.resultsSourceNameMap",$scope.resultsSourceNameMap);

        $scope.resultsSourceNameMap["Body Weight"]= $scope.populateBodyWeightResults();
        console.log("bodywet",   $scope.resultsSourceNameMap["Body Weight"])


    };

    $scope.populateResults = function(name,reps){ // note we return the dates, if we want to add them. we should.
        //TODO no one needs duplicate lifts, limit that.
        // find the max of that rep and pass the delta to the key
        var weightListTemp = [];
        var liftListMaxTemp = [];

        $scope.lastClickedRep[name] = reps;
        angular.forEach($scope.resultsLifts, function(lift, index){
            if (lift.name == name){
                angular.forEach(lift.sets,function(set1, index){
                    if(Number(set1.reps) == Number(reps)){
                        liftListMaxTemp.push({name:lift.name, wt:Number(set1.wt)});
                        weightListTemp.push(Number(set1.wt));
                    }
                });
            }
        });
        var weightsMax = _.max(liftListMaxTemp,function(lift){return lift.wt;});
        $scope.todaysMaxs[name+String(reps)] = weightsMax.wt;//

        var maxItem= localStore.getMax(name,reps);
        var lastItem = localStore.getDataAngular(name,reps,3).slice(-1)[0];

        if(maxItem < -1000 || !maxItem || maxItem >1000){
            $scope.maxList[name] = 'None';
        }else{
            $scope.maxList[name] = Math.abs(weightsMax.wt - Number(maxItem.wt));
            if(weightsMax.wt && weightsMax.wt - Number(maxItem.wt) > 0){
                $scope.plusMinusMax[name] = 0;
            }else $scope.plusMinusMax[name] = 1
        }
        if(lastItem < -1000 || !lastItem || lastItem>1000){
            $scope.lastList[name] = 'None';

        }else{
            $scope.lastList[name] = Math.abs(weightsMax.wt -Number(lastItem.wt));

            if(weightsMax.wt &&  weightsMax.wt - Number(lastItem.wt) > 0){
                $scope.plusMinusLast[name] = 0;
            }else $scope.plusMinusLast[name] = 1
        }
        //TODO intervene if max/last = the only one
        return{name:name,reps:reps,todaysMax:$scope.todaysMaxs[name+String(reps)],max:maxItem,last:lastItem}
        //last clicked rep for a given lift
    };


    $scope.changeNumber = function(amount,button){//gasp if button means if it's a button pressed. behave different

        if($scope.editingNumber.id) {
            if ($scope.editingNumber.id == 1) {

                if (button) {
                    $scope.sets2[$scope.editingNumber.index].reps = amount;
                    $scope.lastAmount = amount;
                    $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].reps}
                    return
                }
                console.log("reps and amount",$scope.sets2[$scope.editingNumber.index].reps ,amount)
                $scope.lastAmount = $scope.sets2[$scope.editingNumber.index].reps + amount
                console.log("reps and amount",$scope.sets2[$scope.editingNumber.index].reps ,amount,$scope.lastAmount)
                if($scope.lastAmount>=0){
                    $scope.sets2[$scope.editingNumber.index].reps = Number($scope.sets2[$scope.editingNumber.index].reps) + amount;
                    $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].reps}
                }

            } else if ($scope.editingNumber.id == 2) {
                if (button) {
                    $scope.lastAmount2 = amount;
                    $scope.sets2[$scope.editingNumber.index].wt = amount;
                    $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].wt}
                    return
                }
                $scope.lastAmount2 =$scope.sets2[$scope.editingNumber.index].wt +amount
                console.log('wts',$scope.sets2[$scope.editingNumber.index].wt,$scope.lastAmount2,amount);
                if( $scope.lastAmount2>= 0) {
                    console.log('in',$scope.lastAmount2)
                    $scope.sets2[$scope.editingNumber.index].wt = Number($scope.sets2[$scope.editingNumber.index].wt) + amount;
                    $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].wt};
                }
            } else if ($scope.editingNumber.id == 3) { //goals

                var repsLocal = String($scope.sets2[$scope.editingNumber.index].reps);
                var oldGoal = Number($scope.goalMapEdit[$scope.nameLift + repsLocal].wt);
                if (button) { // go to amount
                    $scope.lastAmount3 = amount;
                    $scope.goalMapEdit[$scope.nameLift + repsLocal] = {wt: amount};
                    return
                }
                $scope.lastAmount3 = $scope.goalMapEdit[$scope.nameLift + repsLocal].wt + amount;
                if( $scope.lastAmount3>=0) { // add to amount
                    $scope.goalMapEdit[$scope.nameLift + repsLocal] = {wt: oldGoal + amount};

                }

            }
        }
    }

    $scope.clearResults = function(){
        $scope.maxList ={};
        $scope.lastList ={};
        $scope.plusMinusMax = {};
        $scope.plusMinusLast ={};
        $scope.todaysMaxs = {};
        $scope.lastClickedRep = {};

    };

    $scope.onRelease = function(reps,index){
        $scope.goalMapEdit[$scope.nameLift+reps] = {wt:$scope.rangeMap[index]};
    }

    $scope.selectNumber = function(index,id){

        if(id ==1){
            $scope.rangeFlipFlag = true;
            $scope.editingShow = {num:$scope.sets2[index].reps}
            $scope.editingNumber ={index:index,id:id}
            $scope.wtSelectPress = index + String(id)

        }
        else if(id==2){
            $scope.rangeFlipFlag = false;
            $scope.editingShow= {num:$scope.sets2[index].wt}
            $scope.editingNumber = {index:index,id:id}
            $scope.wtSelectPress = index + String(id)
        }
    }

    $scope.selectGoal = function(index){
        $scope.wtSelectPress = index + String(3)
        //console.log('zero',$scope.sets2[0]);
        $scope.editingShow ={num:$scope.goalMapEdit[$scope.nameLift+String($scope.sets2[index].reps)]}
        $scope.editingNumber ={index:index,id:3};

    }

    $scope.onReleaseNumber =function(){
        if($scope.editingNumber.id ==1){
            $scope.lastAmount = $scope.editingShow.num;
            $scope.sets2[$scope.editingNumber.index].reps = $scope.editingShow.num ;
        }else if($scope.editingNumber.id ==2){
            $scope.sets2[$scope.editingNumber.index].wt =$scope.editingShow.num ;
            $scope.lastAmount2 = $scope.editingShow.num;

        }
    }

    $scope.preset = function(id){ //need to make it so this sets sets2 to length 3
        var diff = $scope.sets2.length-3;
        if(diff<0){
            $scope.sets2.push(angular.copy($scope.sets2[0]));
            diff++;
            if(diff<0){
                $scope.sets2.push(angular.copy($scope.sets2[0]));
            }
        }

        if(id == 1){
            angular.forEach($scope.sets2,function(set2,id2){
                set2.reps = 5;
            })
        }else if(id == 2){
            angular.forEach($scope.sets2,function(set2,id2){
                set2.reps = 6;
            })

        }
        else if(id == 3){
            angular.forEach($scope.sets2,function(set2,id2){
                set2.reps = 8;
            })
        }
        else if(id == 4){
            angular.forEach($scope.sets2,function(set2,id2){
                if(id2 ==0 ){
                    set2.reps = 5;
                }
                if(id2 ==1 ){
                    set2.reps = 3;
                }
                if(id2 ==2){
                    set2.reps = 1;
                }
            });
        }
        console.log($scope.sets2)
        $scope.sets2 = _.first($scope.sets2,3);
        $scope.liftCards[$scope.indexLift].sets = $scope.sets2;
        console.log($scope.sets2)
    }

    $scope.historyPop = function(index){
        if($scope.liftCards[index].name =='Select Lift' || ($scope.liftCards[index].sets[0].reps == 0 && $scope.liftCards[index].sets[0].wt==0)){
            return
        }

        $scope.histIndex = index;
        var listReps =[];
        var name = $scope.liftCards[index].name;
        console.log("Index",index);
        angular.forEach($scope.liftCards[index].sets,function(set1,index){
            listReps.push(set1.reps)
            console.log("index",set1.reps);
        });
        $scope.uniqueRepsHist = _.unique(listReps);
         $scope.maxList ={}
         $scope.lastList ={}
        angular.forEach($scope.uniqueRepsHist,function(uRep,index){
            if(localStore.getMax(name,uRep).wt){

                $scope.maxList[uRep]=localStore.getMax(name,uRep).wt;
                $scope.lastList[uRep]=localStore.getDataAngular(name,uRep,3).slice(-1)[0].wt
            }
        })
        if($scope.maxList.length ==0 && $scope.lastList.length == 0){
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
                console.log('Tapped!', res);
            });
        }
        else{
            var confirmPopup = $ionicPopup.show({
                templateUrl: 'pop-history.html',
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
                console.log('Tapped!', res);
            });
        }


    }

    $ionicPopover.fromTemplateUrl('pop-liftnames.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.namePopupSubmit = function($event){
        document.body.classList.add('platform-ios');
        _.uniq($scope.nameList,false,name);
        var nameArray =[]
        angular.forEach($scope.nameList,function(val,key){
            console.log("KEYPOP",key, val);
            if(val == "" && nameArray.indexOf("(No Name)")==-1){
                $scope.nameList[key] = "(No Name)"
                nameArray.push($scope.nameList[key]);
            }
        })
        _.uniq($scope.nameList,name);
        //console.log('namelist',$scope.nameList);
        //console.log('show?',Object.keys($scope.nameList).length)
        if(Object.keys($scope.nameList).length>0){
            console.log('show')
            $scope.popover.show($event);
        }
    };

    $scope.namePopupSelect=function(name){
        console.log('clearing')
        if(name =='clear'){
            $scope.nameFilter = "Name"
            $scope.popover.hide();
            $scope.filter();
            //$scope.filterList = angular.copy($scope.workouts);
            return
        }
        $scope.workoutName.name = name;
        $scope.popover.hide();
    }


    $scope.showConfirm = function() {
        //$scope.openModal('none','none','none',5)
        //return
        //console.log("trying ");
        var error =false;
        angular.forEach($scope.liftCards,function(lift,index){
            if(lift.name == "Select Lift"){
                error = true;
            }
        });
        if(error){
            var errorPopup = $ionicPopup.confirm({
                title: 'Remove or edit "Select Lift"'

            });
            errorPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }if(!error){
            $scope.openModal('none','none','none',5)
            return
        }

        //else {
        //    var confirmPopup = $ionicPopup.show({
        //        templateUrl: 'pop-confirm.html',
        //        title: 'Done lifting?',
        //        subTitle: "(Optional) add a workout name and track your body weight",
        //        scope: $scope,
        //        buttons: [
        //            {text: 'Cancel'},
        //            {
        //                text: '<b >Done</b>',
        //                type: 'button-dark',
        //                onTap: function (e) {
        //                    console.log('checkdate',localStore.checkDate($scope.liftDate));
        //                    if(!localStore.checkDate($scope.liftDate)){
        //                        localStore.saveLift($scope.liftDate, $scope.liftCards, $scope.workoutName, $scope.bodyWeight,$scope.notes);
        //                        $scope.resultsLifts = $scope.liftCards;
        //                        $scope.liftCards = $scope.$storage.todaysLifts;
        //                        $scope.uniqueSortReps();
        //                        $scope.openModal('', '', '', '3');
        //                    }else{
        //                        $scope.dateErrorPop();
        //                    }
        //                }
        //            }
        //        ]
        //    });
        //    confirmPopup.then(function (res) {
        //        console.log('Tapped!', res);
        //    });
        //}
    };

    $scope.dateErrorPop = function(){
        var confirmPopup = $ionicPopup.show({
            title: 'You already lifted today!',
            subTitle: "Slow down tiger! Only one workout per day! (otherwise our metrics get real messy)",
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b >Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        console.log('checkdate',localStore.checkDate($scope.liftDate));

                    }
                }
            ]
        })
    }


    $scope.showInfo = function(){
        var confirmPopup = $ionicPopup.show({
            title: 'New Workout',
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
            console.log('Tapped!', res);
        });

    };


    $scope.removeLiftRow = function ($index) {
        if ($scope.removeFlag) {
            $scope.liftCards.splice($index, 1);
        }
    }


    $scope.keyPressed = function(keyEvent, formModel) {
        if (keyEvent.keyCode == 13) {
            console.log('gotit')
            $scope.showInfo()
        }
    };

    $scope.clearLifts = function(){
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
                        $scope.liftCards = $scope.$storage.todaysLifts;
                        $ionicScrollDelegate.scrollTop();
                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            console.log('Tapped!', res);
        });

    };

    $scope.submitWeight = function(){
        console.log($scope.sets2);
        $scope.liftCards[$scope.indexLift].sets = $scope.sets2;
        console.log($scope.sets2);
        $scope.closeModal('lift',0,2);
    }

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

    $scope.addSet = function(index){
        //TODO make logic applicable for template load.
        if($scope.liftCards[index].sets[0].reps != 0 || $scope.liftCards[index].sets[0].wt!=0)
        {
            localStore.addSet(index);
        }
    }

    $scope.removeSet = function(index){
        localStore.removeSet(index);
    }

    //goal modal
    $scope.updateGoals = function(){
       localStore.updateGoals($scope.goalMapEdit);
        $scope.goalMap = $scope.$storage.goalsMap;
        $scope.closeModal('none',0,4);
    }

    //MODAL STUFF
    $ionicModal.fromTemplateUrl('nav-liftselector.html', {
        id:'1',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'

    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('nav-weightselector.html', {
        id: '2', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal2 = modal;
    });

    $ionicModal.fromTemplateUrl('nav-results.html', {
        id: '3', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal3 = modal;
    });

    $ionicModal.fromTemplateUrl('nav-goals.html', {
        id: '4', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal4 = modal;
    });

    $ionicModal.fromTemplateUrl('pop-confirm.html', {
        id: '5', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal5 = modal;
    });
    //TODO pass in 2 indices.

    $scope.outRemove = function(){
        if($scope.removeFlag){
            $scope.removeFlag = !$scope.removeFlag;
        }
    }
    $scope.popEditingNumber = function(num,bool){
        if(num!=$scope.editingShow.num){
            if(bool){
                $scope.changeNumber(num,bool)
            }else $scope.changeNumber(num)

        }

        $scope.editingNumber.id = 2
        $scope.wtSelectPress = $scope.editingNumber.index+"2"
        $scope.editingShow = {num: $scope.sets2[$scope.editingNumber.index].wt}

    }

    $scope.openModal = function(name, index,childIndex ,id,hf) {
        if(name == 'Select Lift' && id == 2){
            return
        }
        $scope.lightHeavyMap["Select Lift"] = "heavy";
        var openModalDelay = function(){
            $scope.modal.show();
        }
        if(id==1){
            $scope.blurFlag = true;
            if(window.cordova){
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            $scope.$storage.selectedLiftNames =[];
            angular.forEach($scope.liftCards,function(lift,index){
                if(lift.name) {
                    $scope.$storage.selectedLiftNames.push(lift.name);
                }
            });
            $timeout(openModalDelay(), 0);
            $scope.$storage.editingLift= {'name':name,'index':index};
        }
        else if (id==2 ){
            $scope.blurFlag = true;
            //$localStorage.editingLift= {'name':name,'index':index};
            $scope.nameLift = name;
            $scope.indexLift = index;

            angular.forEach($scope.$storage.liftData,function(key,val){
               if(key.name == name){
                   $scope.weightRack = key.weight;
               }
            });

            $scope.focusIndex = 1;
            $scope.sets2 = $scope.liftCards[index].sets;
            $scope.editingNumber = $scope.sets2[0].reps;
            console.log("editingNum"+$scope.editingNumber);
            console.log("lightHeavyMap"+$scope.lightHeavyMap[name]);
            $scope.editingShow = {num:0};
            if(hf){
                $scope.selectNumber(childIndex,2);
            }
            else{
                $scope.selectNumber(childIndex,1);
            }
            $scope.modal2.show();
            //cordova.plugins.Keyboard.disableScroll(true);
        }
        else if(id ==3){
            $scope.blurFlag = true;
            $scope.populateBodyWeightResults();
            $scope.buildResultsObject();
            $scope.modal3.show();
        }else if(id == 4){
            if($scope.liftCards[index].name =='Select Lift' || ($scope.liftCards[index].sets[0].reps == 0 && $scope.liftCards[index].sets[0].wt==0)){
                return
            }
            $scope.blurFlag = true;
            $scope.nameLift = name;
            $scope.indexLift = index;
            $scope.focusIndex = childIndex;
            $scope.goalMapEdit = angular.copy($scope.goalMap);
            $scope.sets2 = _.uniq($scope.liftCards[index].sets,false,function(set2){return Number(set2.reps)});
            $scope.selectGoal(0);
            angular.forEach($scope.$storage.liftData,function(key,val){
                if(key.name == name){
                    $scope.weightRack = key.weight;
                }
            });
            angular.forEach($scope.sets2,function(set2,ind){
                if(!$scope.goalMapEdit[$scope.nameLift+set2.reps]){
                    $scope.goalMapEdit[$scope.nameLift+set2.reps] = {wt:0};
                    $scope.rangeMap[ind]=0;
                }else{
                    $scope.rangeMap[ind]=$scope.goalMapEdit[$scope.nameLift+set2.reps].wt;
                }
            });
            $scope.modal4.show();
        }
        else{
            $scope.blurFlag = true;
            $scope.modal5.show()

        }
    };
    $scope.closeModal = function(newLift,sets,id) {
        $scope.blurFlag = false;
        if(id==1){

            if(window.cordova){
                //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(newLift == "no change"){
                if( $scope.liftCards[$scope.$storage.editingLift.index].name == "Select Lift"){
                    $scope.liftName = "Select Lift";
                }
            }
            $scope.modal.hide();
            if(newLift!='no change'){
                $scope.liftCards[$scope.$storage.editingLift.index].name = newLift.name;
                $scope.$storage.lightHeavyMap[newLift.name] = newLift.weight;
                console.log($scope.lightHeavyMap);
            }
            localStore.buildKgMap();
            $scope.kgMap= $scope.$storage.kgMap
            console.log($scope.kgMap)
        }

        else if(id ==2) {
            $scope.modal2.hide();
            //$scope.liftCards[$scope.editingLiftIndex].sets = sets;
        }else if (id ==3){
            $scope.modal3.hide();
            $timeout(function() {
                $scope.clearResults();
            }, 3000);

        }else if(id==4){
            $scope.modal4.hide();
        }else{
            if(newLift == 1){ //TODO make sure date isn't date
                if(!localStore.checkDate($scope.liftDate)){
                    localStore.saveLift($scope.liftDate, $scope.liftCards, $scope.workoutName, $scope.bodyWeight,$scope.notes);
                    $scope.resultsLifts = $scope.liftCards;
                    $scope.liftCards = $scope.$storage.todaysLifts;
                    $scope.uniqueSortReps();
                    $scope.openModal('', '', '', '3');
                }else {
                    $scope.dateErrorPop();
                }
                $scope.modal5.hide()
            }
            $scope.modal5.hide()
        }

    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
        $scope.modal2.remove();
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



