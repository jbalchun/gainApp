var app = angular.module('MyApp', [
    'ionic',
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
    'autocomplete'
]);

app.run(function ($ionicPlatform, $timeout, $state, $localStorage, $rootScope, localStore) {
    $rootScope.$storage = $localStorage.$default({
        x: 53,
        userId: '',
        visitCount: 0,
        editingLift: [],
        goalsMap: {},
        kgMap: {},
        nameList: {},
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
        liftData: [{
            name: "Barbell Bench Press",
            attr1: "1",
            attr2: "1",
            attr3: "1",
            date: "14.01.2015",
            goals: {},
            weight: 'heavy'

        }, {
            name: "Supine Pull Ups",
            attr1: "2",
            attr2: "4",
            attr3: "2",
            goals: {},
            weight: 'light'
        }, {
            name: "Barbell Back Squat",
            attr1: "3",
            attr2: "1",
            attr3: "2",
            goals: {},
            weight: 'heavy'
        },

            {
                name: "Russian Twists",
                attr1: "4",
                attr2: "4",
                attr3: "1",
                goals: {},
                weight: 'light'
            }, {
                name: "Seated Dumbell Shoulder Press",
                attr1: "1",
                attr2: "2",
                attr3: "1",
                goals: {},
                weight: 'light'
            }, {
                name: "Power Clean",
                attr1: "5",
                attr2: "1",
                attr3: "2",
                goals: {},
                weight: 'heavy'
            }, {
                name: "Seated Cable Row",
                attr1: "2",
                attr2: "3",
                attr3: "1",
                goals: {},
                weight: 'light'
            }, {
                name: "Barbell Barbell Curls",
                attr1: "2",
                attr2: "1",
                attr3: "2",
                goals: {},
                weight: 'light'
            }, {
                name: "Dumbell Pec Flys",
                attr1: "1",
                attr2: "2",
                attr3: "1",
                goals: {},
                weight: 'light'
            }, {
                name: "Standing Dumbell Side Raises",
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
            }, {
                name: "Dips",
                attr1: "1",
                attr2: "4",
                attr3: "2",
                goals: {},
                weight: 'light'
            },
        ],
        dummy: [
            {
                'date': 'Jun 02 2015',
                bodyWeight: {wt: '200'},
                'name': {name: 'Arms'},
                notes: {notes: ''},
                lifts: [{
                    'name': 'Barbell Bench Press',
                    'sets': [{'reps': '5', wt: '225'}, {'reps': '3', wt: '265'}, {'reps': '1', wt: '285'}]
                },
                    {
                        'name': 'Barbell Curls',
                        'sets': [{'reps': '5', wt: 40}, {'reps': '10', wt: 40}, {'reps': '15', wt: '35'}]
                    },
                    {
                        'name': 'Dumbell Pec Flys',
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
                        'name': 'Standing Calf Raises',
                        'sets': [{'reps': '10', wt: '45'}, {'reps': '10', wt: '55'}, {'reps': '10', wt: '55'}]
                    },
                    {
                        'name': 'HyperExtensions',
                        'sets': [{'reps': '5', wt: 500}, {'reps': '10', wt: 400}, {'reps': '15', wt: 250}]
                    }
                ]
            }, {
                'date': 'Jun 25 2015',
                bodyWeight: {wt: '203'},
                name: {name: 'Arms'},
                notes: {notes: ''},
                lifts: [{
                    'name': 'Barbell Bench Press',
                    'sets': [{'reps': '5', wt: '235'}, {'reps': '3', wt: '270'}, {'reps': '1', wt: '285'}]
                },
                    {
                        'name': 'Barbell Curls',
                        'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
                    },
                    {
                        'name': 'Barbell Back Squat',
                        'sets': [{'reps': '5', wt: '700'}, {'reps': '10', wt: '500'}, {'reps': '15', wt: '300'}]
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
                    'sets': [{'reps': '5', wt: '245'}, {'reps': '3', wt: '270'}, {'reps': '1', wt: '290'}]
                },
                    {
                        'name': 'Barbell Curls',
                        'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
                    },
                    {
                        'name': 'Barbell Back Squat',
                        'sets': [{'reps': '5', wt: '400'}, {'reps': '10', wt: '500'}, {'reps': '15', wt: '300'}]
                    }
                ]
            },
            {
                'date': 'Jul 12 2015',
                bodyWeight: {wt: '210'},
                name: {name: 'Legs'},
                notes: {notes: ''},
                lifts: [{
                    'name': 'Standing Calf Raises',
                    'sets': [{'reps': '5', wt: 400}, {'reps': '10', wt: '120'}, {'reps': '15', wt: '60'}]
                },
                    {
                        'name': 'Barbell Curls',
                        'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
                    },
                    {
                        'name': 'Barbell Back Squat',
                        'sets': [{'reps': '5', wt: '400'}, {'reps': '10', wt: '500'}, {'reps': '15', wt: '300'}]
                    }
                ]
            },
            {
                'date': 'Jul 25 2015',
                bodyWeight: {wt: '215'},
                name: {name: 'Arms'},
                notes: {notes: 'Workout notes go here.. '},
                lifts: [{
                    'name': 'Barbell Bench Press',
                    'sets': [{'reps': '5', wt: '255'}, {'reps': '3', wt: '270'}, {'reps': '1', wt: '295'}]
                },
                    {
                        'name': 'Barbell Curls',
                        'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
                    },
                    {
                        'name': 'Barbell Back Squat',
                        'sets': [{'reps': '5', wt: '400'}, {'reps': '10', wt: '500'}, {'reps': '15', wt: '300'}]
                    }
                ]
            },

        ]
    });

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function keyboardHideHandler(e) {
        $rootScope.$broadcast('closeKeyboard')
    }

    $rootScope.stateW = '';
    $rootScope.email = {email: ''};

    $ionicPlatform.ready(function () {
        //console.log(winston != undefined)
        if ($rootScope.$storage.populated == false) {//load in dummy data for demos
            //$rootScope.$storage.dummy.reverse();
            angular.forEach($rootScope.$storage.dummy, function (workout, key) {
                console.log('notes', workout)
                localStore.saveLift(workout.date, workout.lifts, workout.name, workout.bodyWeight, workout.notes.notes)
            })
            $rootScope.$storage.populated = true
        }

        if (!window.cordova) {
            if (typeof winston !== "undefined") {
                $rootScope.stateW = 'heroku'
                //console.log($rootScope.stateW)
            }
        }
        if (window.cordova) {
            $rootScope.stateW = 'cordova'
        }
        console.log(typeof winston == undefined)
        if (typeof winston == "undefined" && !window.cordova) {
            $rootScope.stateW = 'local'
        }
        console.log('state', $rootScope.stateW)
        if ($rootScope.stateW == 'heroku') {
            if ($rootScope.$storage.userId.length > 1) {//if they have a user id
                ++$rootScope.$storage.visitCount
                winston.log('info', 'user returning for the ' + $rootScope.$storage.visitCount + " time xlog:" + $rootScope.$storage.userId);
            } else {
                $rootScope.$storage.userId = generateUUID()
                winston.log('info', 'first visit for ' + $rootScope.$storage.userId);
                ++$rootScope.$storage.visitCount
            }
        }
        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.addEventListener('native.keyboardhide', keyboardHideHandler);
            navigator.splashscreen.hide();
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //$cordovaKeyboard.disableScroll(true)
            //    .then(function(value) {
            //  console.log('keyboard locked'); // Success!
            //}, function(reason) {
            //  console.log('keyboard error '); // Error!
            //});
            //window.open = cordova.InAppBrowser.open;

        }
        //if (window.StatusBar) {
        //  // org.apache.cordova.statusbar required
        //  StatusBar.styleDefault();
        //}
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
        })
    $urlRouterProvider.otherwise('/tab/posts');

});
