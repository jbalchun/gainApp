var app = angular.module('MyApp', [
    'ionic', 'ionic.service.core', 'ionic.service.deploy', 'ionic.service.analytics',
    'MyApp.controllers',
    'MyApp.services',
    'ui.bootstrap',
    'MyApp.maincontrol',
    'MyApp.weightcontrol',
    'MyApp.calendarcontrol',
    'MyApp.chartcontrol',
    'MyApp.liftselectcontrol',
    'MyApp.timercontrol',
    'MyApp.navcontrol',
    'timer',
    'ngStorage',
    'ngCordova',
    'templates',
    'ngIOS9UIWebViewPatch'
]);

app.config(['$ionicConfigProvider', function ($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

}]);

app.run(function ($ionicPlatform, $timeout, $ionicPopup, $state, $localStorage, $http, $rootScope, localStore, $templateCache, $ionicDeploy, $ionicUser, $ionicAnalytics, QuickActionService) {

    $rootScope.$storage = $localStorage.$default({
        mainObj: {
            x: 53,
            userId: '',
            visitCount: 3,
            //PROD: IAP etc, initial condition vars
            //   updating: false,
            //   //if we just performed a cloud reload
            //   justLoaded: false,
            //   firstVisit: true,
            //   //if they paid
            //   unlocked: false,
            //   allClear: false,
            //   cleared: false,
            //   //if they registered for cloud
            //   registered: false,
            //   beta: false,
            //DEMO: Unlocked
            //    updating: false,
            //    //if we just performed a cloud reload
            //    justLoaded: false,
            //    firstVisit: true,
            //    //if they paid
            //    unlocked: true,
            //    allClear: true,
            //    cleared: true,
            //    //if they registered for cloud
            //    registered: true,
            //    beta: false,
            //BETA: IAP etc, initial condition vars
                updating:false,
                //if we just performed a cloud reload
                justLoaded:false,
                firstVisit:true,
                //if they paid
                unlocked:true,
                allClear:false,
                cleared:false,
                //if they registered for cloud
                registered:true,
                beta:true,
            username: '',
            addCount: 0,
            liftLimit: 4,
            liftCount: 0,
            sound: true,
            startTime: '',
            tabTitle: 'Lift',
            editingLift: [],
            goalsMap: {},
            kgMap: {},
            liftMap: {},
            nameList: {},
            selectedCycle: 5,
            email: {},
            //nameList:{'Arms6/2/2015':'Arms','Legs6/15/2015':'Legs'},
            selectedLiftNames: [],
            weightSet: [],
            dateSet: [],
            dateList: [],
            populated: false,
            lightHeavyMap: {key: 'val'},
            todaysLifts: [{
                'name': 'Select Lift',
                'sets': [{'reps': '0', wt: '0', goal: ''}],
                'super': false
            }],
            workouts: [],
            liftData: [
                //Arms
                {
                name: "Barbell Bench Press",
                attr1: "1",
                attr2: "1",
                attr3: "1",
                date: "14.01.2015",
                goals: {},
                weight: 'heavy'

            }, {
                    name: "Seated Dumbbell Shoulder Press",
                    attr1: "1",
                    attr2: "2",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                },
                {
                    name: "Seated Barbell Shoulder Press",
                    attr1: "1",
                    attr2: "1",
                    attr3: "1",
                    goals: {},
                    weight: 'heavy'
                },
                {
                    name: "Incline Barbell Bench Press",
                    attr1: "1",
                    attr2: "1",
                    attr3: "1",
                    goals: {},
                    weight: 'heavy'
                },

                {
                    name: "Incline Dumbbell Bench Press",
                    attr1: "1",
                    attr2: "2",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                },
                {
                    name: "Dips",
                    attr1: "1",
                    attr2: "4",
                    attr3: "2",
                    goals: {},
                    weight: 'light'
                },

                {
                name: "Supine Pull Ups",
                attr1: "2",
                attr2: "4",
                attr3: "2",
                goals: {},
                weight: 'light'
            },
                {
                    name: "Pronated Pull Ups",
                    attr1: "2",
                    attr2: "4",
                    attr3: "2",
                    goals: {},
                    weight: 'light'
                },
                {
                    name: "Machine Lat Pull Downs",
                    attr1: "2",
                    attr2: "3",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                },
                {
                    name: "Barbell Wrist Curls",
                    attr1: "2",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'light'
                },

                //Legs
                {
                name: "Barbell Back Squat",
                attr1: "3",
                attr2: "1",
                attr3: "2",
                goals: {},
                weight: 'heavy'
            },
                {
                    name: "Straight Leg Deadlift",
                    attr1: "3",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'heavy'
                },

                {
                    name: "Classic Deadlift",
                    attr1: "3",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'heavy'
                },


                //Cross
                {
                    name: "Power Clean",
                    attr1: "5",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'heavy'
                },
                {
                    name: "Hang Clean",
                    attr1: "5",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'heavy'
                },
                {
                    name: "Barbell Snatch",
                    attr1: "5",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'heavy'
                },
                {
                    name: "Barbell Hang Snatch",
                    attr1: "5",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'heavy'
                },

                {
                    name: "Seated Cable Row",
                    attr1: "2",
                    attr2: "3",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                }, {
                    name: "Straight Bar Curls",
                    attr1: "2",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'light'
                },
                {
                    name: "Dumbbell Curls",
                    attr1: "2",
                    attr2: "2",
                    attr3: "2",
                    goals: {},
                    weight: 'light'
                },
                {
                    name: "Dumbbell Pec Flys",
                    attr1: "1",
                    attr2: "2",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                }, {
                    name: "Standing Dumbbell Side Raises",
                    attr1: "1",
                    attr2: "2",
                    attr3: "2",
                    goals: {},
                    weight: 'light'
                }, {
                    name: "Standing Bent Over Barbell Rows",
                    attr1: "2",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'heavy'
                }, {
                    name: "Seated Machine Calf Raises",
                    attr1: "3",
                    attr2: "3",
                    attr3: "1",
                    weight: 'light'
                }, {
                    name: "Inclined Crunches",
                    attr1: "4",
                    attr2: "4",
                    attr3: "2",
                    goals: {},
                    weight: 'light'
                }, {
                    name: "HyperExtensions",
                    attr1: "4", // /^[-+](3|4)$/ how to do multiple matches?
                    attr2: "4",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                }, {
                    name: "Barbell Upright Rows",
                    attr1: "2",
                    attr2: "1",
                    attr3: "2",
                    goals: {},
                    weight: 'light'
                },
                //Core
                {
                    name: "Front Ab Planks",
                    attr1: "4",
                    attr2: "4",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                },
                {
                    name: "Side Ab Planks",
                    attr1: "4",
                    attr2: "4",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                },
                {
                    name: "Leg Raises",
                    attr1: "4",
                    attr2: "4",
                    attr3: "1",
                    goals: {},
                    weight: 'light'
                }

            ],
            dummy: [
                {
                    'date': 'Jun 02 2015',
                    bodyWeight: {wt: '200'},
                    'name': {name: 'Arms'},
                    notes: {notes: ''},
                    lifts: [{
                        'name': 'Barbell Bench Press',
                        'sets': [{'reps': '5', wt: '225'}, {'reps': '3', wt: '250'}, {'reps': '1', wt: '285'}]
                    },
                        {
                            'name': 'Barbell Curls',
                            'sets': [{'reps': '5', wt: 40}, {'reps': '10', wt: 40}, {'reps': '15', wt: '35'}]
                        },
                        {
                            'name': 'Dumbbell Pec Flys',
                            'sets': [{'reps': '10', wt: '25'}, {'reps': '10', wt: '25'}, {'reps': '10', wt: '25'}]
                        }
                    ]
                }, {
                    'date': 'Jun 15 2015',
                    bodyWeight: {wt: '202'},
                    name: {name: 'Legs'},
                    notes: {notes: ''},
                    lifts: [{
                        'name': 'Barbell Back Squat',
                        'sets': [{'reps': '8', wt: '315'}, {'reps': '8', wt: '335'}, {'reps': '8', wt: '355'}]
                    },
                        {
                            'name': 'Standing Machine Calf Raises',
                            'super': true,
                            'sets': [{'reps': '5', wt: '180'}, {'reps': '10', wt: '180'}, {'reps': '15', wt: '180'}]
                        },
                        {
                            'name': 'HyperExtensions',
                            'sets': [{'reps': '5', wt: 45}, {'reps': '10', wt: 25}, {'reps': '15', wt: 10}]
                        }
                    ]
                }, {
                    'date': 'Jun 25 2015',
                    bodyWeight: {wt: '203'},
                    name: {name: 'Arms'},
                    notes: {notes: ''},
                    lifts: [{
                        'name': 'Barbell Bench Press',
                        'sets': [{'reps': '5', wt: '235'}, {'reps': '3', wt: '260'}, {'reps': '1', wt: '285'}]
                    },
                        {
                            'name': 'Barbell Curls',
                            'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
                        },
                        {
                            'name': 'Dumbbell Pec Flys',
                            'sets': [{'reps': '10', wt: '30'}, {'reps': '10', wt: '30'}, {'reps': '10', wt: '30'}]
                        }
                    ]
                },
                {
                    'date': 'Jul 03 2015',
                    bodyWeight: {wt: '204'},
                    name: {name: 'Arms'},
                    notes: {notes: ''},
                    lifts: [{
                        'name': 'Barbell Bench Press',
                        'sets': [{'reps': '5', wt: '255'}, {'reps': '3', wt: '265'}, {'reps': '1', wt: '290'}]
                    },
                        {
                            'name': 'Barbell Curls',
                            'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
                        },
                        {
                            'name': 'Dumbbell Pec Flys',
                            'sets': [{'reps': '10', wt: '35'}, {'reps': '10', wt: '35'}, {'reps': '10', wt: '35'}]
                        }
                    ]
                },
                {
                    'date': 'Jul 12 2015',
                    bodyWeight: {wt: '210'},
                    name: {name: 'Legs'},
                    notes: {notes: 'Workout notes.. lines between lifts indicate a super set. Use the blue arrow to load this workout to the editor'},
                    lifts: [
                        {
                            'name': 'Barbell Back Squat',
                            'sets': [{'reps': '8', wt: '335'}, {'reps': '8', wt: '365'}, {'reps': '8', wt: '385'}]
                        },
                        {
                            'name': 'Standing Machine Calf Raises',
                            'super': true,
                            'sets': [{'reps': '5', wt: '200'}, {'reps': '10', wt: '200'}, {'reps': '15', wt: '200'}]
                        },
                        {
                            'name': 'HyperExtensions',
                            'sets': [{'reps': '5', wt: 55}, {'reps': '10', wt: 45}, {'reps': '15', wt: 25}]
                        },

                    ]
                },
                {
                    'date': 'Jul 25 2015',
                    bodyWeight: {wt: '215'},
                    name: {name: 'Arms'},
                    notes: {notes: 'Try charting this data on the next tab. Select Barbell Bench Press for 5 reps, for example'},
                    lifts: [{
                        'name': 'Barbell Bench Press',
                        'sets': [{'reps': '5', wt: '245'}, {'reps': '3', wt: '270'}, {'reps': '1', wt: '295'}]
                    },
                        {
                            'name': 'Barbell Curls',
                            'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
                        },
                        {
                            'name': 'Dumbbell Shoulder Press',
                            'super': true,
                            'sets': [{'reps': '5', wt: '185'}, {'reps': '10', wt: '185'}, {'reps': '15', wt: '185'}]
                        },
                        {
                            'name': 'Seated Dumbbell Shoulder Press',
                            'sets': [{'reps': '10', wt: '200'}, {'reps': '10', wt: '250'}, {'reps': '15', wt: '250'}]
                        },
                        {
                            'name': 'Dips',
                            'super': true,
                            'sets': [{'reps': '8', wt: '45'}, {'reps': '8', wt: '45'}, {'reps': '8', wt: '45'}]
                        },
                        {
                            'name': 'Standing Dumbbell Side Raises',
                            'sets': [{'reps': '10', wt: '200'}, {'reps': '10', wt: '250'}, {'reps': '15', wt: '250'}]
                        }
                    ]
                },

            ]
        }
    });

    var generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function keyboardHideHandler(e) {
        $rootScope.$broadcast('closeKeyboard');
    }

    $rootScope.refreshUpdate = function () {
        location.reload();
    };

    $rootScope.hasUpdate = '';
    $rootScope.stateW = '';
    $rootScope.iapButton = 'Upgrade';
    $rootScope.email = {email: ''};
    $rootScope.weightSet = [[], [225, 225, 245, 245, 245, 250, 255, 255, 275],];
    $rootScope.weightSetFull = [[], [225, 225, 245, 245, 245, 250, 255, 255, 275],];

    $rootScope.$on('$ionicView.loaded', function () {
        $ionicPlatform.ready(function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            if(!window.cordova){
                Parse.initialize("SiCbzRW2kNcln8iLcYyPj85mY5qp8Xa1R3nkWOZi", "Bdyh495XAOVYCbZVVDasYmZ3f94U04OrUuS6q7th");
            }

            if (window.cordova) {
                document.addEventListener('deviceready', function () {

                    //3d
                    QuickActionService.configure();
                    ThreeDeeTouch.onHomeIconPressed = function (payload) {
                        $rootScope.$broadcast('tab-quick', payload);
                    };
                    //analytics
                    $ionicAnalytics.register();
                    //parse
                    Parse.initialize("SiCbzRW2kNcln8iLcYyPj85mY5qp8Xa1R3nkWOZi", "Bdyh495XAOVYCbZVVDasYmZ3f94U04OrUuS6q7th");

                    //keyboard
                    window.addEventListener('native.keyboardhide', keyboardHideHandler);
                    navigator.splashscreen.hide();
                    //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                    //ionic user
                    $ionicUser.identify({
                        user_id: device.uuid
                    });
                }, false);


            }


            if ($rootScope.$storage.mainObj.populated == false) {//load in dummy data for demos
                //$rootScope.$storage.dummy.reverse();
                console.log('setpop', $rootScope.$storage.mainObj.populated)
                angular.forEach($rootScope.$storage.mainObj.dummy, function (workout, key) {
                    //console.log('notes', workout)
                    localStore.saveLift(workout.date, workout.lifts, workout.name, workout.bodyWeight, workout.notes);
                });

                $rootScope.$broadcast('clear-cal');
                $rootScope.$storage.mainObj.populated = true;
            }

            if (!window.cordova) {
                $rootScope.$broadcast('do-update');

                //determine state so we can track heroku demos/ show the email button
                //console.log('state', $rootScope.stateW)
                if (false) {
                    if ($rootScope.$storage.mainObj.userId.length > 1) {//if they have a user id
                        ++$rootScope.$storage.mainObj.visitCount
                        winston.log('info', 'user returning for the ' + $rootScope.$storage.mainObj.visitCount + " time xlog:" + $rootScope.$storage.mainObj.userId);
                        var ViewCount = Parse.Object.extend("ViewCount");
                        var viewCount = new ViewCount();
                        viewCount.save({
                            uid: $rootScope.$storage.mainObj.userId,
                            viewCount: $rootScope.$storage.mainObj.visitCount
                        }).then(function (object) {
                            //alert("yay! it worked");
                        });
                        //Parse.User.logIn($rootScope.$storage.userId , "password", {
                        //success: function(user) {
                        //    // Do stuff after successful login.
                        //},
                        //error: function(user, error) {
                        //    // The login failed. Check error to see why.
                        //}
                        //});
                    } else {
                        $rootScope.$storage.mainObj.userId = generateUUID();
                        winston.log('info', 'first visit for ' + $rootScope.$storage.mainObj.userId);
                        ++$rootScope.$storage.mainObj.visitCount;
                        console.log('parsing');
                        var Uid = Parse.Object.extend("Uid");
                        var uid = new Uid();
                        uid.save({uid: $rootScope.$storage.mainObj.userId}).then(function (object) {
                            //alert("yay! it worked");
                        });
                        //winston.log('info', 'parsed');
                    }
                }
            }

                $rootScope.showWelcomePopup = function (scope) {
                    var showWelcomePopup = $ionicPopup.show({
                        title: 'Welcome to Gain Deck!',
                        scope: scope,
                        templateUrl: 'pop/pop-welcome.html',
                        buttons: [
                            {
                                text: '<b>Close</b>',
                                type: 'button-dark',
                                onTap: function (e) {

                                    $rootScope.$storage.mainObj.liftCount = 0;
                                }
                            }
                        ]
                    });
                    showWelcomePopup.then(function (res) {
                        ////console.log('Tapped!', res);
                    });
                };


            })
        });
    });


    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: 'tabs.html'
            })

            .state('tab.posts', {
                url: '/posts',
                views: {
                    'tab-posts': {
                        templateUrl: 'tab-posts.html',
                        controller: 'navcontrol'

                    }
                }

            })

            .state('tab.charts', {
                url: '/chart',
                views: {
                    'tab-charts': {
                        templateUrl: 'tab-charts.html',
                        controller: 'navcontrol'

                    }
                }
            })

            .state('tab.calendar', {
                url: '/calendar',
                views: {
                    'tab-calendar': {
                        templateUrl: 'tab-calendar.html',
                        controller: 'navcontrol'
                    }
                }
            })

            .state('tab.timer', {
                url: '/timer',
                views: {
                    'tab-timer': {
                        templateUrl: 'tab-timer.html',
                        controller: 'navcontrol'
                    }
                }
            });
        $urlRouterProvider.otherwise('/tab/posts');

    });
