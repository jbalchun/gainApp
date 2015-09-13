var app = angular.module('MyApp.services', ['ngStorage']);

app.factory('Post', function () {
    return {
        find: function (id) {
            this.posts[id];
        },

        add: function (post) {
            this.posts.push(
                {id: this.posts.length, url: post.url, title: post.title}
            );
        },

        posts: [
            {id: 0, url: "#/some-url/0", title: "How to do item A"},
            {id: 1, url: "#/some-url/1", title: "How to do item B"},
            {id: 2, url: "#/some-url/2", title: "YOLO"},
        ]

    };

});
app.factory('UserData', function () {
});

app.factory('localStore', function ($rootScope, $localStorage) {
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

    return {
        addLift: function (name, sets,superFlag) {
            $rootScope.$storage.todaysLifts.push({'name': name, 'sets': sets,'super':superFlag})
        },
        saveLift: function (date,lifts,name,bodyWeight,notes) {
            //console.log('saving',{'date': date, 'name':name.name,'bodyWeight':bodyWeight.wt, 'lifts': lifts,'notes':notes.notes})
            $rootScope.$storage.workouts.unshift({'date': date, 'name':name.name,'bodyWeight':bodyWeight.wt, 'lifts': lifts,'notes':notes.notes}),
            $rootScope.$storage.nameList[name.name+date] = name.name;

            //console.log('namelistStore',$rootScope.$storage.nameList);
            $rootScope.$storage.todaysLifts = [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0'}],
                'super':false
            },];
            $rootScope.$broadcast('calRefresh');

        },

        removeWorkout:function(workout){//TODO change if you allow free dates?
            angular.forEach($rootScope.$storage.workouts,function(workout2,index){
                //console.log('workouts',workout,workout2)
                if(workout.date == workout2.date){
                    //console.log('in to remove',index)
                    $rootScope.$storage.workouts.splice(index,1);
                }

            });
            angular.forEach($rootScope.$storage.nameList,function(name,key){
               console.log('name',name, 'key',key, 'targetttt', workout.name+workout.date);
                delete $rootScope.$storage.nameList[workout.name+workout.date];

            });

            //delete $rootScope.$storage.nameList[name.name+date];

        },
        checkDay:function(day){//for checking the whole list
          var resultFlag=false;
          angular.forEach($rootScope.$storage.workouts,function(workout,index){
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
            angular.forEach($rootScope.$storage.workouts,function(workout,index){
                if(workout.date == date){
                    returnFlag= true
                }
            });
            return returnFlag;
        },
        clearLifts:function(){
            //$localStorage.$reset();
            //location.reload()
            $rootScope.$storage.todaysLifts = [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0'}]
            },];
        },
        clearAll:function(){
            console.log('resetting' +
            '')
            $localStorage.$reset();
            //location.reload(); TODO, make talk to app.js so it doesn't reload.
            $rootScope.$storage.todaysLifts = [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0'}]
            },];
        },
        addSet: function (index) {
            if ($rootScope.$storage.todaysLifts[index].sets.length < 10 ) {
                var lastSet = angular.copy( _.last( $rootScope.$storage.todaysLifts[index].sets));
                $rootScope.$storage.todaysLifts[index].sets.push(lastSet);
            }
        },
        removeSet: function (index) {
            if($rootScope.$storage.todaysLifts[index].sets.length > 1){
                $rootScope.$storage.todaysLifts[index].sets.splice(-1, 1);
            }

        },
        buildKgMap:function(){
            $rootScope.$storage.kgMap ={};
          angular.forEach($rootScope.$storage.liftData,function(lift,ind){
            if(lift.weight == "heavykg"){
                $rootScope.$storage.kgMap[lift.name]='kgs'
            }else{
                $rootScope.$storage.kgMap[lift.name]='lbs'
            }

          })
            //console.log('kgmap',$rootScope.$storage.kgMap)
        },
        getChartData: function(name,reps,flag){ //its a monster, watch type stuff
            var weightSetTemp = [];
            var dateSetTemp =[]
            var weightDateSet = [];
            var tempMaxMap ={};
            angular.forEach($rootScope.$storage.workouts, function(day, index) {
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
            angular.forEach($rootScope.$storage.liftData,function(lift,index){
               if(lift.name == name){
                   $rootScope.$storage.liftData.splice(index,1);
               }
            });

        },
        addLiftToList: function(name){
            $rootScope.$storage.liftData.unshift({'name':name,attr1: ".",
                attr2: ".",
                attr3: ".",
                custom:true,
                weight:'heavy'});
        },
        getLiftByName: function(name){
            var liftObj = {};
            angular.forEach($rootScope.$storage.liftData, function (lift, index) {//todo this should be in services
                if (name == lift.name) {
                     liftObj = lift;
                }
            });
            return liftObj;
        },
        loadLiftFromCalendar:function(workout){ //has to search, can't just go off index asshole.
            angular.forEach($rootScope.$storage.workouts,function(workout2,ind){
                console.log('name',workout.name,workout.date)
                if(workout.name == workout2.name && workout.date == workout2.date){
                    $rootScope.$storage.todaysLifts = angular.copy(workout2.lifts);
                }
            });
            if(workout.name){
                $rootScope.$storage.tabTitle = workout.name;
            }

                //$rootScope.$storage.todaysLifts = angular.copy($rootScope.$storage.workouts[index].lifts);

        },
        wipeWeights:function(){
            angular.forEach( $rootScope.$storage.todaysLifts,function(lift,ind){
                angular.forEach(lift.sets,function(set1,ind){
                    set1.wt = 0;
                });
            });
            $rootScope.$broadcast("loadedFromCalendar");
        },
        liftsOnly:function(){
            angular.forEach( $rootScope.$storage.todaysLifts,function(lift,ind){
                lift.sets = [{'reps': '0', wt: '0'}];
            });
            $rootScope.$broadcast("loadedFromCalendar");
        },

        buildRepList:function(name){
            var repList = [];
            angular.forEach($rootScope.$storage.workouts, function(day, index) {
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
            angular.forEach($rootScope.$storage.workouts, function(day, index) {
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

            angular.forEach($rootScope.$storage.workouts, function(day, index) {
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
              $rootScope.$storage.goalsMap[key]=value;
              console.log($rootScope.$storage.goalsMap)
          });
        },
        getGoal:function(key){
            return  $rootScope.$storage.goalsMap[key];
        },
        setStartTime:function(){
            $rootScope.$storage.startTime = +new Date()
        },
        getStartTime:function(){
            return $rootScope.$storage.startTime;
        },
        resetStartTime:function(){
            $rootScope.$storage.startTime = 0;
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
});
