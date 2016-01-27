var app = angular.module('MyApp.services', ['ngStorage']);


app.factory('UserData', function () {
});

app.factory('parseFactory', ["$rootScope", "$localStorage", "$timeout", "$ionicHistory", "$state", function ($rootScope, $localStorage,$timeout,$ionicHistory,$state) {
    return {
         register:function(userData){
             var factory = this;
             var user = new Parse.User();
             user.set("username", userData.email);
             user.set("password", userData.password);
             user.set("email", userData.email);
             $rootScope.$storage.mainObj.username = userData.email;
             user.signUp(null, {
                 success: function(user) {
                     //alert("success!");
                     $rootScope.$storage.mainObj.username = userData.email;
                     $rootScope.$storage.mainObj.email = userData.email;
                     $rootScope.$storage.mainObj.registered = true;
                     alert('Registration successful');
                     $rootScope.$broadcast('cloud-load');
                     factory.deleteAndSave();
                 },
                 error: function(user, error) {
                        console.log(error);
                     if(error.code == 125){
                         alert('Error, invalid email address');
                     }
                     if(error.code == 202){
                         alert('Error, username is taken! Already an account w/ this email');
                     }else{
                         alert('Error signing up, make sure email is valid');
                     }
                 }
             });
         },
        logIn:function(userData){
            var factory = this;
            $rootScope.$storage.mainObj.username = userData.email;
            $rootScope.$storage.mainObj.email = userData.email;
            console.log('logging in');
            Parse.User.logIn(userData.email, userData.password,{
                success: function(user) {
                    factory.loadFrom(userData.email);
                },
                error: function(user, error) {
                    alert('Error: No connection or invalid username/password');
                }
            });
        },
         saveNew:function(){
             var factory = this;
             if($rootScope.$storage.mainObj.unlocked && $rootScope.$storage.mainObj.registered && $rootScope.$storage.mainObj.username.length > 1){
                 var stringStorage = JSON.stringify($rootScope.$storage.mainObj);

                 var Backup = Parse.Object.extend("Backup");
                 var backup = new Backup();

                 backup.set('username',$rootScope.$storage.mainObj.username);
                 backup.set('file',stringStorage);
                 backup.save(null, {
                     success: function(backup) {
                         //alert('saved the file');
                     },
                     error: function(backup, error) {
                         //alert('Failed save');
                     }
                 });
             }
         },
        deleteAndSave:function(){//TODO dangerous to delete before save. should be a transaction of sorts
            var factory = this;
            var query = new Parse.Query("Backup");
            console.log('delSave', $rootScope.$storage.mainObj.unlocked ,$rootScope.$storage.mainObj.registered, $rootScope.$storage.mainObj.username.length > 1)
            if($rootScope.$storage.mainObj.unlocked && $rootScope.$storage.mainObj.registered && $rootScope.$storage.mainObj.username.length > 1){
                query.equalTo("username",$rootScope.$storage.mainObj.username);
                query.find({
                    success: function(results) {
                        //alert("Successfully retrieved " + results.length +$rootScope.$storage.mainObj.uid+ " scores.");
                        // Do something with the returned Parse.Object values
                        for (var i = 0; i < results.length; i++) {
                            results[i].destroy({});
                        }
                        factory.saveNew();
                    },
                    error: function(error) {
                        //alert("Error: " + error.code + " " + error.message);
                    }
                });
            }
        },
        loadFrom:function(username){
            //load row by userId
            //var stringStorage = JSON.stringify($rootScope.$storage);
            var query = new Parse.Query("Backup");
            query.equalTo("username",username);
            query.find({
                success: function(results) {
                    //alert("Successfully retrieved " + results.length +$rootScope.$storage.mainObj.uid+ " scores.");
                    // Do something with the returned Parse.Object values
                    console.log('result',results[0].get('file'));
                    console.log('parse',JSON.parse(results[0].get('file')));
                    //$localStorage.$reset();
                    $rootScope.$storage.mainObj = JSON.parse(results[0].get('file'));
                    $rootScope.$broadcast('cloud-load');
                    //location.reload(true);
                    //alert('Welcome ' + username + ', Your data has been restored! Please close the app and reopen if it does not seem to have loaded properly');
                    $timeout(function(){
                        $state.go('tab.calendar');
                        $rootScope.$broadcast('cloud-load');
                        $state.go('tab.posts');
                        $rootScope.$broadcast('cloud-load');
                    },30);
                    $rootScope.$storage.mainObj.justLoaded = true;
                    $rootScope.$storage.mainObj.registered = true;
                },
                error: function(error) {
                    //alert("Error: " + error.code + " " + error.message);
                }
            });

        },
        checkPromo:function(code){
            var query = new Parse.Query("Promo");
            query.equalTo("code",code);
            query.find({
                success: function(results) {
                    if(typeof results[0] !== 'undefined'){
                        var valid = results[0].get('valid');
                        console.log('valid',valid);
                        $rootScope.$broadcast('promo-return',results[0].get('valid'));
                    }else{
                        $rootScope.$broadcast('promo-return',false);
                    }

                },
                error: function(error) {
                    alert('Error contacting server, try again later');
                }
            });

        },
        getIt:function(){
            var query = new Parse.Query("ActiveP");
            query.equalTo("active",'active');
            query.find({
                success: function(results) {
                    if(typeof results[0] !== 'undefined'){
                        var valid = results[0].get('shown');
                        console.log('error active1')
                         $rootScope.$broadcast('active-return',results[0].get('shown')); 
                    }else{
                        $rootScope.$broadcast('active-return',false);
                    }

                },
                error: function(error) {
                    console.log('error active',error)
                    //alert('Error contacting server, try again later');
                }
            });

        }
    };
}]);

app.factory('QuickActionService', ["$rootScope", "$localStorage", "$q", "$ionicHistory", "$state", function ($rootScope, $localStorage,$q,$ionicHistory,$state) {
        var check3DTouchAvailability = function () {
            return $q(function(resolve, reject) {
                if (window.ThreeDeeTouch) {
                    window.ThreeDeeTouch.isAvailable(function (available) {
                        resolve(available);
                    });
                } else {
                    reject();
                }
            });
        };

        var configure = function () {
            // Check if 3D Touch is supported on the device
            check3DTouchAvailability().then(function(available) {

                if (available) {    // Comment out this check if testing in simulator

                    // Configure Quick Actions
                    window.ThreeDeeTouch.configureQuickActions([
                        {
                            type: 'tab.posts',
                            title: 'New Workout',
                            subtitle: '',
                           //iconType:
                        },
                        {
                            type: 'tab.calendar',
                            title: 'Calendar',
                            subtitle: '',

                        },
                        {
                            type: 'tab.charts',
                            title: 'Chart',
                            subtitle: '',

                        },
                        {
                            type: 'tab.timer',
                            title: 'Timer',
                            subtitle: '',

                        }
                    ]);

                    // Set event handler to check which Quick Action was pressed
                    window.ThreeDeeTouch.onHomeIconPressed = function(payload) {
                        $rootScope.$broadcast('tab-quick',payload);
                    };
                }
            });
        }

        return {
            configure: configure
        };

}]);




app.factory('localStore', ["$rootScope", "$localStorage", "$timeout", "parseFactory", function ($rootScope, $localStorage,$timeout,parseFactory) {
    var getWeek = function(date1) {
        //Monday is first day of new week. Ok with this.
        var date = new Date(date1);
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    };
    var refreshCal = function(){
        $rootScope.$broadcast('clear-cal');
        $rootScope.clearCal = true;
    };

    return {
        addLift: function (name, sets,superFlag) {
            console.log('ad ddeep')
            $rootScope.$storage.mainObj.todaysLifts.push({'name': name, 'sets': sets,'super':superFlag});

            console.log('ad ddeep1',$rootScope.$storage.mainObj.todaysLifts);
        },
        saveLift: function (date,lifts,name,bodyWeight,notes) {
            //console.log('saving',{'date': date, 'name':name.name,'bodyWeight':bodyWeight.wt, 'lifts': lifts,'notes':notes.notes})
            $rootScope.$storage.mainObj.workouts.unshift({'date': date, 'name':name.name,'bodyWeight':bodyWeight.wt, 'lifts': lifts,'notes':notes.notes}),
            $rootScope.$storage.mainObj.nameList[name.name+date] = name.name;

            angular.forEach(lifts,function(key,val){
                //console.log('name',key.name)
                if($rootScope.$storage.mainObj.liftMap[key.name]){
                    $rootScope.$storage.mainObj.liftMap[key.name]++;
                }else{
                    $rootScope.$storage.mainObj.liftMap[key.name] = 1;
                }

            });
            console.log('added');
            //console.log('namelistStore',$rootScope.$storage.nameList);
            $rootScope.$storage.mainObj.todaysLifts = [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0'}],
                'super':false
            },];
            $rootScope.$broadcast('calRefresh');
            $rootScope.$storage.mainObj.liftCount++;
            parseFactory.deleteAndSave();
        },

        removeWorkout:function(workout){//TODO change if you allow free dates?
            console.log(workout,$rootScope.$storage.mainObj.workouts)
            angular.forEach($rootScope.$storage.mainObj.workouts,function(workout2,index){
                //console.log('workouts',workout,workout2)
                if(workout.date == workout2.date){
                    //console.log('in to remove',index)
                    $rootScope.$storage.mainObj.workouts.splice(index,1);
                }

            });
            angular.forEach($rootScope.$storage.mainObj.nameList,function(name,key){
               console.log('name',name, 'key',key, 'targetttt', workout.name+workout.date);
                delete $rootScope.$storage.mainObj.nameList[workout.name+workout.date];

            });
            if($rootScope.$storage.mainObj.cleared){
                $rootScope.$storage.mainObj.liftCount--;
            }

            parseFactory.deleteAndSave();
        },
        checkDay:function(day){//for checking the whole list
          var resultFlag=false;
          angular.forEach($rootScope.$storage.mainObj.workouts,function(workout,index){
              var currentDay = Number(workout.date.slice(3,6));
              var numDay = Number(day);
                  if(currentDay == numDay){
                    resultFlag = true;
                      //console.log(resultFlag)
                  }
          });
            return resultFlag;
        },
        checkDate:function(date){
            var returnFlag = false;
            angular.forEach($rootScope.$storage.mainObj.workouts,function(workout,index){
                if(workout.date == date){
                    returnFlag= true
                }
            });
            return returnFlag;
        },
        clearLifts:function(){
            //$localStorage.$reset();
            //location.reload()
            $rootScope.$storage.mainObj.todaysLifts = [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0'}]
            },];
            //refreshCal();
        },
        clearAll:function(){
            $localStorage.$reset();
            //location.reload(); TODO, make talk to app.js so it doesn't reload.
            $rootScope.$storage.mainObj.todaysLifts = [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0'}]
            },];
            $rootScope.$storage.mainObj.populated = true;
            $rootScope.$storage.mainObj.firstVisit = false;
            $rootScope.$storage.mainObj.liftCount = 0;
            location.reload();
            refreshCal();
        },
        clearLiftsOnly:function(){
            $rootScope.$storage.mainObj.workouts = [];
            $rootScope.$storage.mainObj.nameList = {};
            $rootScope.$storage.mainObj.todaysLifts = [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0'}]
            },];
            $rootScope.$storage.mainObj.liftMap = {};
            $rootScope.$storage.mainObj.liftCount = 0;
            refreshCal();
            //$timeout(location.reload(),100);
        },
        addSet: function (index) {
            if ($rootScope.$storage.mainObj.todaysLifts[index].sets.length < 10 ) {
                var lastSet = angular.copy( _.last( $rootScope.$storage.mainObj.todaysLifts[index].sets));
                $rootScope.$storage.mainObj.todaysLifts[index].sets.push(lastSet);
            }
        },
        removeSet: function (index) {
            if($rootScope.$storage.mainObj.todaysLifts[index].sets.length > 1){
                $rootScope.$storage.mainObj.todaysLifts[index].sets.splice(-1, 1);
            }

        },
        buildKgMap:function(){
            $rootScope.$storage.mainObj.kgMap ={};
          angular.forEach($rootScope.$storage.mainObj.liftData,function(lift,ind){

            if(lift.weight == "heavykg"){
                $rootScope.$storage.mainObj.kgMap[lift.name]='kgs';
            }else{
                $rootScope.$storage.mainObj.kgMap[lift.name]='lbs';
            }
              console.log($rootScope.$storage.mainObj.kgMap);
          });
            var map =  angular.copy($rootScope.$storage.mainObj.kgMap);
            console.log('map',map);
            return map;
            //console.log('kgmap',$rootScope.$storage.kgMap)
        },
        getChartData: function(name,reps,flag){ //its a monster, watch type stuff
            var weightSetTemp = [];
            var dateSetTemp =[]
            var weightDateSet = [];
            var tempMaxMap ={};
            angular.forEach($rootScope.$storage.mainObj.workouts, function(day, index) {
                angular.forEach(day.lifts, function(lift, index){
                    ////console.log('day lifts',lift);
                    if (lift.name == name){
                        angular.forEach(lift.sets,function(set1, index){
                            //console.log('lift sets',set1);
                          if(Number(set1.reps) == Number(reps)){
                              //console.log('if number')
                              if(tempMaxMap[String(lift.name)+String(set1.reps)+String(day.date)] > 0){ // if we have an entry
                                 var lastLiftReps = Number(tempMaxMap[String(lift.name)+String(set1.reps)+String(day.date)]);
                                  if (lastLiftReps < set1.wt){// and if that entry is not the max
                                      weightSetTemp.pop();
                                      weightDateSet.pop();
                                      weightSetTemp.push(Number(set1.wt));
                                      weightDateSet.push({wt:Number(set1.wt),date:day.date});
                                  }
                              }else{
                                  //console.log('elser')
                                  tempMaxMap[String(lift.name)+String(set1.reps)+String(day.date)] = Number(set1.wt);
                                  weightSetTemp.push(Number(set1.wt));
                                  dateSetTemp.push(day.date);
                                  weightDateSet.push({wt:Number(set1.wt),date:day.date});
                                  //console.log(weightDateSet)
                              }
                          }
                        });
                    }
                });
            });
            if(flag == 1){
                //console.log('wtdt1',weightDateSet)
                if(weightSetTemp.length == 0){
                    weightSetTemp = [0];
                }
                var weightSetBuild =[weightSetTemp,];
                //console.log('returning',weightSetBuild)
                return weightSetBuild;
            }
            else if (flag == 2){
                //console.log('wtdt2',weightDateSet)
                if(dateSetTemp.length == 0){
                dateSetTemp=['','No Data Available']
                }
                //console.log('returning',dateSetTemp)
                return dateSetTemp;
            }
            else{
                //console.log('returning',weightDateSet)
                return weightDateSet;
            }
        },


        removeLiftEntry: function(name){
            angular.forEach($rootScope.$storage.mainObj.liftData,function(lift,index){
               if(lift.name == name){
                   $rootScope.$storage.mainObj.liftData.splice(index,1);
               }
            });

        },
        addLiftToList: function(name){
            $rootScope.$storage.mainObj.liftData.unshift({'name':name,attr1: ".",
                attr2: ".",
                attr3: ".",
                custom:true,
                weight:'heavy'});
            parseFactory.deleteAndSave();
        },
        getLiftByName: function(name){
            var liftObj = {};
            angular.forEach($rootScope.$storage.mainObj.liftData, function (lift, index) {//todo this should be in services
                if (name == lift.name) {
                     liftObj = lift;
                }
            });
            return liftObj;
        },
        loadLiftFromCalendar:function(workout){ //has to search, can't just go off index asshole.
            angular.forEach($rootScope.$storage.mainObj.workouts,function(workout2,ind){
                console.log('name',workout.name,workout.date)
                if(workout.name == workout2.name && workout.date == workout2.date){
                    $rootScope.$storage.mainObj.todaysLifts = angular.copy(workout2.lifts);
                }
            });
            console.log('name', workout.name);
            if(workout.name){
                console.log("adding name");
                $rootScope.$storage.mainObj.tabTitle = workout.name;
            }
                //$rootScope.$storage.todaysLifts = angular.copy($rootScope.$storage.workouts[index].lifts);

        },
        wipeWeights:function(){
            angular.forEach( $rootScope.$storage.mainObj.todaysLifts,function(lift,ind){
                angular.forEach(lift.sets,function(set1,ind){
                    set1.wt = 0;
                });
            });
            $rootScope.$broadcast("loadedFromCalendar");
        },
        liftsOnly:function(){
            angular.forEach( $rootScope.$storage.mainObj.todaysLifts,function(lift,ind){
                lift.sets = [{'reps': '0', wt: '0'}];
            });
            $rootScope.$broadcast("loadedFromCalendar");
        },
        makeCalendar:function(){
         return   {
                $storage : $localStorage,
                workouts : $storage.mainObj.workouts,
                filterList : angular.copy($storage.mainObj.workouts),
                searchQuery : '',
                dateType : '',
                today : new Date(),
                dateObj : {'Year': 'Year', 'Month': 'Month', 'Day': 'Day'},
                $storage : $localStorage,
                nameList : $storage.mainObj.nameList,
                nameFilter : "Name",
                liftName : "Lift",
                monthMap : {
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
                },
                calendar1 : true,
                infoFlag : 2
            };
        },
        buildRepList:function(name){
            var repList = [];
            angular.forEach($rootScope.$storage.mainObj.workouts, function(day, index) {
                //var weightSetDayTemp= [];
                //var dateSetDayTemp =[];
                //console.log('day replist',day)
                angular.forEach(day.lifts, function(lift, index){
                    //console.log('day lifts',lift)
                    if (lift.name == name){
                        angular.forEach(lift.sets,function(set1, index){
                                //if rep not in replist
                            //console.log('set lifts',set1)
                                repList.push(Number(set1.reps));
                                //do something
                        });
                    }
                });

            });
            var repListU = _.unique(repList);
            var repListS = repListU.sort(function(a,b) { return a - b; });
            var repListF=[];
            angular.forEach(repListS,function(rep,index){
                repListF.push({reps:Number(rep)});
            })
            //console.log("zerooo",repListF[0])
            if (repListF[0]==undefined ){
                repListF = [{reps:0},]
            }
            //console.log("repListF",repListF);
            return repListF;
        },
        getBodyWeightData: function(flag){//flag indicates dates or weights
            var bodyWeightData = [];
            var bodyWeightDates = [];
            angular.forEach($rootScope.$storage.mainObj.workouts, function(day, index) {
                if(day.bodyWeight) {
                    bodyWeightData.push(day.bodyWeight);
                    bodyWeightDates.push(day.date);
                }
            });
            if(flag ==1){
                if(bodyWeightData.length == 0){
                    bodyWeightData = [0];
                }
                var bodyWeightBuild =[bodyWeightData];
                return bodyWeightBuild;
            }else{
                if(bodyWeightDates.length == 0){
                    bodyWeightDates=['','No Data Available']
                }
                return bodyWeightDates;

            }

        },

        getMax: function(name,reps){ //This is a mess, but basically if we call it at "Body Weight" it won't return the max, just all. easier.
            var weightSetTemp = [];
            var dateSetTemp =[];
            var weightsDates = [];
            var bodyWeight = [];

            angular.forEach($rootScope.$storage.mainObj.workouts, function(day, index) {
                bodyWeight.push({wt:day.bodyWeight,date:day.date})
                angular.forEach(day.lifts, function(lift, index2){
                    if(index>0) {
                        if (lift.name == name) {
                            var tempDayList = [];
                            angular.forEach(lift.sets, function (set1, index3) {
                                if (Number(set1.reps) == Number(reps)) {
                                    console.log('reps', reps)
                                    tempDayList.push({wt: Number(set1.wt), date: day.date});
                                }
                            });
                            var tempMaxObj = _.max(tempDayList, function (lift) {
                                return lift.wt;
                            });
                            weightsDates.push(tempMaxObj);
                        }
                    }
                });

            });

            var maxObj = _.max(weightsDates, function(lift){ return lift.wt;})
            //console.log(weightsDates.length)
            if(weightsDates.length==1){
                maxObj['only1'] = true;
            }
            if (name == "Body Weight"){
                maxObj = bodyWeight;
            }
            return maxObj;

        },

        updateGoals: function(goalsMap){
          angular.forEach(goalsMap,function(value, key){
              console.log("inserted goal for:", key);
              $rootScope.$storage.mainObj.goalsMap[key]=value;
              console.log($rootScope.$storage.mainObj.goalsMap)
          });
        },
        getGoal:function(key){
            return  $rootScope.$storage.mainObj.goalsMap[key];
        },
        setStartTime:function(min, sec){
            $rootScope.$storage.mainObj.startTime = +new Date();

            console.log('timetrace', $rootScope.$storage.mainObj.startTime,min,sec );
            $rootScope.$storage.mainObj.min = min;
            $rootScope.$storage.mainObj.sec = sec;
            console.log('timetrace2', $rootScope.$storage.mainObj.startTime,$rootScope.$storage.mainObj.min,$rootScope.$storage.mainObj.sec );

        },
        getStartTime:function(){
            return $rootScope.$storage.mainObj.startTime;
        },
        getStartMinSec:function(){
            console.log('starttime return',{min:$rootScope.$storage.mainObj.min,sec:$rootScope.$storage.mainObj.sec });
            return {min:angular.copy($rootScope.$storage.mainObj.min),sec:angular.copy($rootScope.$storage.mainObj.sec )};
        },
        resetStartTime:function(){
            $rootScope.$storage.mainObj.startTime = 0;
            $rootScope.$storage.mainObj.min = 0;
            $rootScope.$storage.mainObj.sec = 0;
        },
        setSelectedCycle: function(cycle){
            $rootScope.$storage.mainObj.selectedCycle = cycle;
        },
        getSelectedCycle: function(cycle){
            return $rootScope.$storage.mainObj.selectedCycle;
        },
        getMillisecondsFromMinSec:function(){
            var min = $rootScope.$storage.mainObj.min;
            var sec = $rootScope.$storage.mainObj.sec;

            var milli = (min*60*1000) + (sec*1000);
            return milli;

        },
        normalizeToWeeks:function(dateWeightList,flag){
            //   This mess converts all of our dates into weeks from the start date, because chartjs doesnt
            //have time built into it's x axis'
                var dateShow = 'none';
                var weekListFinal = [];
                var liftListFinal =[];
                var dateList =dateWeightList;
                //console.log('dwlist',dateWeightList)
                var week = getWeek(  dateList[0].date)
                  dateShow = week;

                //Normalize to week 1
                var firstWeek = getWeek(dateList[0].date);
                var lastWeek = getWeek(dateList[  dateList.length -1].date);
                var normalFirstWeek = firstWeek - (firstWeek);
                //here compensate for the year logic. Want to just iterate later down from 1 -> whatever.
                var normalLastWeek = lastWeek - firstWeek;
                var firstWeekDate = new Date(  dateWeightList[0].date);
                var lastWeekDate = new Date(  dateList[  dateList.length -1].date);
                //Warning, 53 weeks. the 53rd week is leading up to the first thursday of january, which is always week 1.
                if(firstWeekDate.getFullYear() != lastWeekDate.getFullYear()){
                    if(lastWeek!=53){
                        var difference = lastWeekDate.getFullYear() -firstWeekDate.getFullYear()
                        lastWeek = lastWeek + (52*difference);
                        normalLastWeek = lastWeek - firstWeek;
                    }
                }
                var weekList ={};
                var repeatList ={};
                //Maps entries to their week number
                angular.forEach(  dateList,function(entry,index){
                    var weekFrom =   getWeek(entry.date)-firstWeek;
                    var currentDate = new Date(entry.date)
                    if(currentDate.getFullYear() != firstWeekDate.getFullYear() ){
                        if(weekFrom !=53){
                            weekFrom = weekFrom + (52*(currentDate.getFullYear()-firstWeekDate.getFullYear()))
                        }
                    }
                    if(!repeatList[weekFrom]){
                        repeatList[weekFrom] = entry;
                        weekList[weekFrom] = entry;
                    }else{
                        var maxWt = _.max([Number(repeatList[weekFrom].wt),Number(entry.wt)])
                        weekList[weekFrom] = {date:entry.date,wt:maxWt};
                        repeatList[weekFrom] = {date:entry,wt:maxWt};
                    }
                });
            //console.log('nmL',normalLifts)
                var normalWeeks =[];//lets just make two arrays bc that's what the app takes.
                var liftWrapArray =[];
                var normalLifts =[];
                var lastWeight = 0;
                var lastDate;
                var normalDate =[];
                //console.log('nmL',weekList)
                //Maps entries to their week number if they are present that week, else take last weight.
            //console.log('wkl',normalLastWeek)
                for(var i=0;i<normalLastWeek+1;i++){//for every week between start and finish
                    normalWeeks[i] =String(i);//add the week regardless
                    if(weekList[i] && weekList[i].hasOwnProperty('wt')){//if that week has a designated weight
                        normalLifts[i] = Number(weekList[i].wt);
                        normalDate[i] =weekList[i].date;
                        //console.log('nmL',normalLifts)
                        normalWeeks[i] = String(i);
                        lastWeight = weekList[i].wt
                        lastDate = new Date(weekList[i].date)
                    }else{//if not just add the last weight to normalLifts.
                        normalLifts[i] = Number(lastWeight);
                    }
                }
                liftWrapArray[0] = normalLifts;
                //normalWeeks = _.sortBy(normalWeeks,function(num){ return Number(num.week); })
                  var weekListFinal = normalWeeks;
                  var liftListFinal = [normalLifts];

                if(flag ==1){
                    //console.log('returning',liftListFinal)
                    return liftListFinal;
                }else if(flag==2){
                    //console.log('returning',weekListFinal)
                    return weekListFinal;
                }else{
                    //console.log('returning',normalDate)
                    return normalDate;
                }

        }
    }
}]);
