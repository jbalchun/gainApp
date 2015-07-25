/**
 * Created by Jbalchun on 12/26/14.
 */
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

//app.service('liftData', function () {
//    var liftData = [{
//        name: "Barbell Bench Press",
//        attr1: "1",
//        attr2: "1",
//        attr3: "1",
//        date: "14.01.2015"
//    }, {
//        name: "Supine Pull Ups",
//        attr1: "2",
//        attr2: "4",
//        attr3: "2",
//    }, {
//        name: "Barbell Back Squat",
//        attr1: "3",
//        attr2: "1",
//        attr3: "2",
//    },
//
//        {
//            name: "Russian Twists",
//            attr1: "4",
//            attr2: "4",
//            attr3: "1",
//        }, {
//            name: "Seated Dumbell Shoulder Press",
//            attr1: "1",
//            attr2: "2",
//            attr3: "1",
//        }, {
//            name: "Power Clean",
//            attr1: "5",
//            attr2: "1",
//            attr3: "2",
//        }, {
//            name: "Seated Cable Row",
//            attr1: "2",
//            attr2: "3",
//            attr3: "1",
//        }, {
//            name: "Barbell Curls",
//            attr1: "2",
//            attr2: "1",
//            attr3: "2",
//        }, {
//            name: "Dumbell Pec Flys",
//            attr1: "1",
//            attr2: "2",
//            attr3: "1",
//        }, {
//            name: "Standing Dumbell Side Raises",
//            attr1: "1",
//            attr2: "2",
//            attr3: "2",
//        }, {
//            name: "Standing Bent Over Barbell Rows",
//            attr1: "2",
//            attr2: "1",
//            attr3: "2",
//        }, {
//            name: "Seated Machine Calf Raises",
//            attr1: "3",
//            attr2: "3",
//            attr3: "1",
//        }, {
//            name: "Inclined Crunches",
//            attr1: "4",
//            attr2: "4",
//            attr3: "2",
//        }, {
//            name: "HyperExtensions",
//            attr1: "4", // /^[-+](3|4)$/ how to do multiple matches?
//            attr2: "4",
//            attr3: "1",
//        }, {
//            name: "Barbell Upright Rows",
//            attr1: "2",
//            attr2: "1",
//            attr3: "2",
//        }, {
//            name: "Dips",
//            attr1: "1",
//            attr2: "4",
//            attr3: "2",
//        },
//    ];
//
//    return {
//        getLiftData: function () {
//            return liftData;
//        },
//        setLiftData: function (lift) {
//            liftData.push(lift);
//        },
//        getCustomLiftData:function(){
//            var customList=[];
//            angular.forEach(liftData,function(lift,index){
//                if(lift.custom){
//                    customList.push(lift);
//                }
//            });
//            return customList;
//        }
//    };
//});

//main service for data. user{workouts{date,lift,sets}}
app.factory('UserData', function () {



    //var userData =
    //{
    //    "users": [{
    //        "username": "user1",
    //        "workouts": [{
    //            "date": "1-1-1",
    //            "lifts": [{
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            }, {
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            }, {
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            }, {
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            },
    //
    //
    //            ]
    //        }, {
    //            "date": '1-2-1',
    //            "lifts": [{
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            }]
    //        }
    //        ]
    //
    //    }, {
    //        "username": "user2",
    //        "workouts": [{
    //            "date": '1-1-1',
    //            "lifts": [{
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            }, {
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            }, {
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            }, {
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            },
    //            ]
    //        }, {
    //            "date": '1-2-1',
    //            "lifts": [{
    //                "name": "Select",
    //                "sets": ['', '', '']
    //            }]
    //        }
    //        ]
    //
    //    },
    //    ]
    //};
    //
    //
    //
    //
    ////var liftCards = [{
    ////    name: "Barbell Bench Press",
    ////    sets: "1",
    ////    weights: "1"
    ////
    ////}, {
    ////    name: "Barbell Curls",
    ////    sets: "1",
    ////    weights: "1"
    ////}, {
    ////    name: "Barbell Squat",
    ////    sets: "1",
    ////    weights: "1"
    ////}, {
    ////    name: "Dumbell Shoulder",
    ////    sets: "1",
    ////    weights: "1"
    ////}, {
    ////    name: "Hang Clean",
    ////    sets: "1",
    ////    weights: "1"
    ////}];
    //
    ////var setLiftName= function (user,date,index,name) {
    ////    userData.users[user].workouts[].lifts[index].name = name ;
    ////}
    ////var setLiftSet= function (user,date,liftIndex,setIndex,weight) {
    ////    userData.users[user].workouts[date].lifts[liftIndex].sets[setIndex] = weight ;
    ////}
    //
    //return  {
    //
    //    getLifts:function(user, date){
    //        var lifts = [];
    //        var i=0;
    //        var j=0;
    //        for (var userFromList in userData.users){
    //            if(userFromList.username==user) {
    //                for (var workout in userFromList.workouts) {
    //                    if (workout.date == date) {
    //                        for (var lift in workout.lifts) {
    //                            lifts.push(lift);
    //                        }
    //                    }
    //
    //                }
    //            }
    //        }
    //        return lifts;
    //
    //    //    angular.forEach(userData.users, function(user, index) {
    //    //
    //    //        angular.forEach(artist.albums, function(album, index){
    //    //            $scope.albums.push(album);
    //    //        });
    //    //    });
    //    //})
    //    }
    //    //setLiftName:setLiftName,
    //    //setLiftSet:setLiftSet
    //};
    //    //getLifts: function (user,date) {
    //    //    return userData.users[user].workouts[date].lifts;
    //    //},
    //    //setLiftName: function (user,date,index,name) {
    //    //    userData.users[user].workouts[date].lifts[index].name = name ;
    //    //},
    //    //setLiftSet: function (user,date,liftIndex,setIndex,weight) {
    //    //    userData.users[user].workouts[date].lifts[liftIndex].sets[setIndex] = weight ;
    //    //},
    //    //addWorkout: function (user, date, lift, sets) {
    //    //    userData[user].workouts.date = date;
    //    //    userData[user].workouts.lift = lift;
    //    //    userData[user].workouts.sets = sets;
    //    //}

});
//Don't show today's workouts live on the calendar. Show ll
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
        addLift: function (name, sets) {
            $rootScope.$storage.todaysLifts.push({'name': name, 'sets': sets,'super':false})
        },
        saveLift: function (date,lifts,name,bodyWeight,notes) {
            $rootScope.$storage.workouts.unshift({'date': date, 'name':name.name,'bodyWeight':bodyWeight.wt, 'lifts': lifts,'notes':notes.notes}),
            $rootScope.$storage.nameList[name.name+date] = name.name;

            console.log('namelistStore',$rootScope.$storage.nameList);
            $rootScope.$storage.todaysLifts = [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0'}],
                'super':false
            },];
            $rootScope.$broadcast('calRefresh');

            //{
            //    'date': '2/2/2015',
            //    bodyWeight:'202',
            //    lifts: [{
            //    'name': 'Barbell Bench Press',
            //    'sets': [{'reps': '5', wt: 250}, {'reps': '10', wt: '130'}, {'reps': '15', wt: '70'}]
            //},
            //    {
            //        'name': 'Curls',
            //        'sets': [{'reps': '5', wt: '45'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '10'}]
            //    },
            //    {
            //        'name': 'Barbell Back Squat',
            //        'sets': [{'reps': '5', wt: 500}, {'reps': '10', wt: 400}, {'reps': '15', wt: 250}]
            //    }
            //]
            //}

        },

        removeWorkout:function(workout){//TODO change if you allow free dates?
            angular.forEach($rootScope.$storage.workouts,function(workout2,index){
                console.log('workouts',workout,workout2)
                if(workout.date == workout2.date){
                    console.log('in to remove',index)
                    $rootScope.$storage.workouts.splice(index,1)
                }

            });
        },
        checkDay:function(day){//for checking the whole list
          var resultFlag=false;
          angular.forEach($rootScope.$storage.workouts,function(workout,index){
              var currentDay = Number(workout.date.slice(3,6));
              var numDay = Number(day);
                  if(currentDay == numDay){
                    resultFlag = true;
                      console.log(resultFlag)
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
            console.log('kgmap',$rootScope.$storage.kgMap)
        },
        getDataAngular: function(name,reps,flag){ //its a monster, watch type stuff
            var weightSetTemp = [];
            var dateSetTemp =[]
            var weightDateSet = [];
            var tempMaxMap ={};
            angular.forEach($rootScope.$storage.workouts, function(day, index) {
                angular.forEach(day.lifts, function(lift, index){
                    console.log('day lifts',lift);
                    if (lift.name == name){
                        angular.forEach(lift.sets,function(set1, index){
                            console.log('lift sets',set1);
                          if(Number(set1.reps) == Number(reps)){
                              if(tempMaxMap[String(lift.name)+String(set1.reps)+String(day.date)] > 0){ // if we have an entry
                                 var lastLiftReps = Number(tempMaxMap[String(lift.name)+String(set1.reps)+String(day.date)]);
                                  if (lastLiftReps < set1.wt){// and if that entry is not the max
                                      weightSetTemp.pop();
                                      weightDateSet.pop();
                                      weightSetTemp.push(Number(set1.wt));
                                      weightDateSet.push({wt:Number(set1.wt),date:day.date});
                                  }
                              }else{
                                  tempMaxMap[String(lift.name)+String(set1.reps)+String(day.date)] = Number(set1.wt);
                                  weightSetTemp.push(Number(set1.wt));
                                  dateSetTemp.push(day.date);
                                  weightDateSet.push({wt:Number(set1.wt),date:day.date});
                              }
                          }
                        });
                    }
                });
            });
            if(flag == 1){
                if(weightSetTemp.length == 0){
                    weightSetTemp = [0];
                }
                var weightSetBuild =[weightSetTemp,];
                return weightSetBuild;
            }
            else if (flag == 2){
                if(dateSetTemp.length == 0){
                dateSetTemp=['','No Data Available']
                }
                return dateSetTemp;
            }
            else{
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
            $rootScope.$storage.liftData.push({'name':name,attr1: ".",
                attr2: ".",
                attr3: ".",
                custom:true,
                weight:'light'});
        },
        loadLiftFromCalendar:function(index,template){
            if(!template){
                $rootScope.$storage.todaysLifts = angular.copy($rootScope.$storage.workouts[index].lifts);
            }
            else{
                $rootScope.$storage.todaysLifts = angular.copy($rootScope.$storage.workouts[index].lifts);

            }
            $rootScope.$broadcast("loadedFromCalendar");
        },
        wipeWeights:function(){
            angular.forEach( $rootScope.$storage.todaysLifts,function(lift,ind){
                angular.forEach(lift.sets,function(set1,ind){
                    set1.wt = 0;
                })
            })
        },

        buildRepList:function(name){
            var repList = [];
            angular.forEach($rootScope.$storage.workouts, function(day, index) {
                //var weightSetDayTemp= [];
                //var dateSetDayTemp =[];
                console.log('day replist',day)
                angular.forEach(day.lifts, function(lift, index){
                    console.log('day lifts',lift)
                    if (lift.name == name){
                        angular.forEach(lift.sets,function(set1, index){
                                //if rep not in replist
                            console.log('set lifts',set1)
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
            console.log("zerooo",repListF[0])
            if (repListF[0]==undefined ){
                repListF = [{reps:0},]
            }
            console.log("repListF",repListF);
            return repListF;
        },
        getBodyWeightData: function(flag){
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
                angular.forEach(day.lifts, function(lift, index){
                    if (lift.name == name){
                        angular.forEach(lift.sets,function(set1, index){
                            if(Number(set1.reps) == Number(reps)){
                                weightsDates.push({wt:Number(set1.wt),date:day.date});
                            }
                        });
                    }
                });
            });
            var maxObj = _.max(weightsDates, function(lift){ return lift.wt;})
            if(weightsDates.length == 1){
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

        normalizeToWeeks:function(dateWeightList,flag){
                var dateShow = 'none';
                var weekListFinal = [];
                var liftListFinal =[];
                var dateList =dateWeightList;
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

                var normalWeeks =[];//lets just make two arrays bc that's what the app takes.
                var liftWrapArray =[];
                var normalLifts =[];
                var lastWeight = 0;
                var lastDate;
                var normalDate =[];

                //Maps entries to their week number if they are present that week, else take last weight.

                for(var i=0;i<normalLastWeek+1;i++){//for every week between start and finish
                    normalWeeks[i] =String(i);//add the week regardless
                    if(weekList[i] && weekList[i].hasOwnProperty('wt')){//if that week has a designated weight
                        normalLifts[i] = Number(weekList[i].wt);
                        normalDate[i] =weekList[i].date;
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
                    return liftListFinal;
                }else if(flag==2){
                    return weekListFinal;
                }else{
                    return normalDate;
                }

        }
    }
});
