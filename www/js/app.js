var app = angular.module('MyApp', [
    'ionic','ionic.service.core','ionic.service.deploy',
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
    'templates'
]);

app.run(function ($ionicPlatform, $timeout, $state, $localStorage, $rootScope, localStore,$templateCache,$ionicDeploy) {
    $rootScope.$storage = $localStorage.$default({
        x: 53,
        userId: '',
        visitCount: 0,
        tabTitle:'Lift',
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
            name: "Barbell Curls",
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
                    'sets': [{'reps': '5', wt: '225'}, {'reps': '3', wt: '250'}, {'reps': '1', wt: '285'}]
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
                        'name': 'Standing Machine Calf Raises',
                        'super':true,
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
                        'name': 'Dumbell Pec Flys',
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
                        'name': 'Dumbell Pec Flys',
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
                        'super':true,
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
                        'name': 'Dumbell Shoulder Press',
                        'super':true,
                        'sets': [{'reps': '5', wt: '185'}, {'reps': '10', wt: '185'}, {'reps': '15', wt: '185'}]
                    },
                    {
                        'name': 'Seated Dumbell Shoulder Press',
                        'sets': [{'reps': '10', wt: '200'}, {'reps': '10', wt: '250'}, {'reps': '15', wt: '250'}]
                    },
                    {
                        'name': 'Dips',
                        'super':true,
                        'sets': [{'reps': '8', wt: '45'}, {'reps': '8', wt: '45'}, {'reps': '8', wt: '45'}]
                    },
                    {
                        'name': 'Standing Dumbell Side Raises',
                        'sets': [{'reps': '10', wt: '200'}, {'reps': '10', wt: '250'}, {'reps': '15', wt: '250'}]
                    }
                ]
            },

        ]
    });

    var  generateUUID = function () {
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

    $rootScope.checkAndDoUpdate = function(){
        console.log('Ionic Deploy: Checking for updates');
        $ionicDeploy.check().then(function(hasUpdate) {
            console.log('Ionic Deploy: Update available: ' + hasUpdate);
            $rootScope.hasUpdate = hasUpdate;
            alert('Updating your app in the background. The screen will refresh in a few seconds with updates, use as normal till then')
            $rootScope.doUpdate();
            alert(hasUpdate);
        }, function(err) {
            console.error('Ionic Deploy: Unable to check for updates', err);
            alert(err);
        });
    }

    $rootScope.checkForUpdates = function() {
        console.log('Ionic Deploy: Checking for updates');
        $ionicDeploy.check().then(function(hasUpdate) {
            console.log('Ionic Deploy: Update available: ' + hasUpdate);
            $rootScope.hasUpdate = hasUpdate;

        }, function(err) {
            console.error('Ionic Deploy: Unable to check for updates', err);
        });
    };
    $rootScope.doUpdate = function() {
        $ionicDeploy.update().then(function(res) {
            console.log('Ionic Deploy: Update Success! ', res);
            alert('Successfully Hot-Updated Gain ;)');
        }, function(err) {
            console.log('Ionic Deploy: Update error! ', err);
        }, function(prog) {
            console.log('Ionic Deploy: Progress... ', prog);
        });
    };

    $rootScope.hasUpdate = '';
    $rootScope.stateW = '';
    $rootScope.email = {email: ''};
    $rootScope.weightSet = [[], [225, 225, 245, 245, 245, 250, 255, 255, 275],];
    $rootScope.weightSetFull = [[], [225, 225, 245, 245, 245, 250, 255, 255, 275],];

    $rootScope.$on('$ionicView.loaded', function() {
        $ionicPlatform.ready(function () {
            if(navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            //PARSE
            Parse.initialize("SiCbzRW2kNcln8iLcYyPj85mY5qp8Xa1R3nkWOZi", "Bdyh495XAOVYCbZVVDasYmZ3f94U04OrUuS6q7th");
            if ($rootScope.$storage.populated == false) {//load in dummy data for demos
                //$rootScope.$storage.dummy.reverse();

                angular.forEach($rootScope.$storage.dummy, function (workout, key) {
                    //console.log('notes', workout)
                    localStore.saveLift(workout.date, workout.lifts, workout.name, workout.bodyWeight, workout.notes)
                })
                $rootScope.$storage.populated = true
                location.reload();
            }

            if (!window.cordova) {
                $rootScope.$broadcast('do-update');
                if (typeof winston !== "undefined") {
                    $rootScope.stateW = 'heroku'
                    ////console.log($rootScope.stateW)
                }
            }
            if (window.cordova) {
                $rootScope.stateW = 'cordova'
            }
            //console.log(typeof winston == undefined)
            if (typeof winston == "undefined" && !window.cordova) {
                $rootScope.stateW = 'local'
            }
            //determine state so we can track heroku demos/ show the email button
            //console.log('state', $rootScope.stateW)
            if ($rootScope.stateW == 'heroku') {
                if ($rootScope.$storage.userId.length > 1) {//if they have a user id
                    ++$rootScope.$storage.visitCount
                    winston.log('info', 'user returning for the ' + $rootScope.$storage.visitCount + " time xlog:" + $rootScope.$storage.userId);
                    var ViewCount = Parse.Object.extend("ViewCount");
                    var viewCount = new ViewCount();
                    viewCount.save({uid: $rootScope.$storage.userId,viewCount:$rootScope.$storage.visitCount }).then(function(object) {
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
                    $rootScope.$storage.userId = generateUUID()
                    winston.log('info', 'first visit for ' + $rootScope.$storage.userId);
                    ++$rootScope.$storage.visitCount;
                    console.log('parsing');
                    var Uid = Parse.Object.extend("Uid");
                    var uid = new Uid();
                    uid.save({uid: $rootScope.$storage.userId}).then(function(object) {
                        //alert("yay! it worked");
                    });
                    winston.log('info', 'parsed');
                }
            }

            if (window.cordova && window.cordova.plugins.Keyboard) {
                window.addEventListener('native.keyboardhide', keyboardHideHandler);
                navigator.splashscreen.hide();
                //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            //lastly, check for updates!




        });
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
