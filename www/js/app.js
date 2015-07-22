// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


var app = angular.module('MyApp', [
  'ionic',
  'MyApp.controllers',
  'MyApp.services',
  'ui.bootstrap',
  'MyApp.postscontrol',
  'MyApp.weightcontrol',
  'MyApp.calendarcontrol',
  'timer',
  'ngStorage',
  'ngCordova',
  'autocomplete'
]);

app.run(function($ionicPlatform,$timeout,$state,$localStorage,$rootScope) {

  //$ionicPlatform.ready(function() {
  //  navigator.splashscreen.hide();
  //});

  //$timeout(function() {
  //  $state.go('tab.posts');
  //}, 5000);



  function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  $rootScope.$storage = $localStorage.$default({
    x : 53,
    userId:'',
    visitCount:0,
    editingLift:[],
    goalsMap:{},
    kgMap:{},
    nameList:{},
    //nameList:{'Arms6/2/2015':'Arms','Legs6/15/2015':'Legs'},
    selectedLiftNames:[],
    weightSet:[],
    dateSet:[],
    dateList:[],
    lightHeavyMap:{key:'val'},
    todaysLifts:[{
      'name': 'Select Lift',
      'sets': [{'reps': '0', wt: '0',goal:''}],
      'super':false
    }],
    workouts:[],
    liftData:[{
      name: "Barbell Bench Press",
      attr1: "1",
      attr2: "1",
      attr3: "1",
      date: "14.01.2015",
      goals: {},
      weight:'heavy'

    }, {
      name: "Supine Pull Ups",
      attr1: "2",
      attr2: "4",
      attr3: "2",
      goals: {},
      weight:'light'
    }, {
      name: "Barbell Back Squat",
      attr1: "3",
      attr2: "1",
      attr3: "2",
      goals: {},
      weight:'heavy'
    },

      {
        name: "Russian Twists",
        attr1: "4",
        attr2: "4",
        attr3: "1",
        goals: {},
        weight:'light'
      }, {
        name: "Seated Dumbell Shoulder Press",
        attr1: "1",
        attr2: "2",
        attr3: "1",
        goals: {},
        weight:'light'
      }, {
        name: "Power Clean",
        attr1: "5",
        attr2: "1",
        attr3: "2",
        goals: {},
        weight:'heavy'
      }, {
        name: "Seated Cable Row",
        attr1: "2",
        attr2: "3",
        attr3: "1",
        goals: {},
        weight:'light'
      }, {
        name: "Barbell Curls",
        attr1: "2",
        attr2: "1",
        attr3: "2",
        goals: {},
        weight:'light'
      }, {
        name: "Dumbell Pec Flys",
        attr1: "1",
        attr2: "2",
        attr3: "1",
        goals: {},
        weight:'light'
      }, {
        name: "Standing Dumbell Side Raises",
        attr1: "1",
        attr2: "2",
        attr3: "2",
        goals: {},
        weight:'light'
      }, {
        name: "Standing Bent Over Barbell Rows",
        attr1: "2",
        attr2: "1",
        attr3: "2",
        goals: {},
        weight:'heavy'
      }, {
        name: "Seated Machine Calf Raises",
        attr1: "3",
        attr2: "3",
        attr3: "1",
        weight:'light'
      }, {
        name: "Inclined Crunches",
        attr1: "4",
        attr2: "4",
        attr3: "2",
        goals: {},
        weight:'light'
      }, {
        name: "HyperExtensions",
        attr1: "4", // /^[-+](3|4)$/ how to do multiple matches?
        attr2: "4",
        attr3: "1",
        goals: {},
        weight:'light'
      }, {
        name: "Barbell Upright Rows",
        attr1: "2",
        attr2: "1",
        attr3: "2",
        goals: {},
        weight:'light'
      }, {
        name: "Dips",
        attr1: "1",
        attr2: "4",
        attr3: "2",
        goals: {},
        weight:'light'
      },
    ],
    dummy:
     [
        {
          'date': '6/2/2015',
          bodyWeight:'200',
          name:'Arms',
          lifts: [{
            'name': 'Barbell Bench Press',
            'sets': [{'reps': '5', wt: '225'}, {'reps': '3', wt: '265'}, {'reps': '1', wt: '285'}]
          },
            {
              'name': 'Curls',
              'sets': [{'reps': '5', wt: '40'}, {'reps': '10', wt: '40'}, {'reps': '15', wt: '35'}]
            },
            {
              'name': 'Dumbell Pec Flys',
              'sets': [{'reps': '10', wt: '25'}, {'reps': '10', wt: '25'}, {'reps': '10', wt: '25'}]
            }
          ]
        },{
          'date': '6/15/2015',
          bodyWeight:'202',
          name:'Legs',
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
        },{
          'date': '6/25/2015',
          bodyWeight:'203',
          name:'Arms',
          lifts: [{
            'name': 'Barbell Bench Press',
            'sets': [{'reps': '5', wt: '235'}, {'reps': '3', wt: '270'}, {'reps': '1', wt: '285'}]
          },
            {
              'name': 'Curls',
              'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
            },
            {
              'name': 'Barbell Back Squat',
              'sets': [{'reps': '5', wt: '700'}, {'reps': '10', wt: '500'}, {'reps': '15', wt: '300'}]
            }
          ]
        } ,
        {
          'date': '7/3/2015',
          bodyWeight:'210',
          name:'Arms',
          lifts: [{
            'name': 'Barbell Bench Press',
            'sets': [{'reps': '5', wt: '245'}, {'reps': '3', wt: '270'}, {'reps': '1', wt: '290'}]
          },
            {
              'name': 'Curls',
              'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
            },
            {
              'name': 'Barbell Back Squat',
              'sets': [{'reps': '5', wt: '400'}, {'reps': '10', wt: '500'}, {'reps': '15', wt: '300'}]
            }
          ]
        },
        {
          'date': '7/12/2015',
          bodyWeight:'210',
          name:'Legs',
          lifts: [{
            'name': 'Standing Calf Raises',
            'sets': [{'reps': '5', wt: 400}, {'reps': '10', wt: '120'}, {'reps': '15', wt: '60'}]
          },
            {
              'name': 'Curls',
              'sets': [{'reps': '5', wt: '50'}, {'reps': '10', wt: '35'}, {'reps': '15', wt: '15'}]
            },
            {
              'name': 'Barbell Back Squat',
              'sets': [{'reps': '5', wt: '400'}, {'reps': '10', wt: '500'}, {'reps': '15', wt: '300'}]
            }
          ]
        },
       {
         'date': '7/3/2015',
         bodyWeight:'210',
         name:'Arms',
         lifts: [{
           'name': 'Barbell Bench Press',
           'sets': [{'reps': '5', wt: '255'}, {'reps': '3', wt: '270'}, {'reps': '1', wt: '295'}]
         },
           {
             'name': 'Curls',
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
  function keyboardHideHandler(e){
    $rootScope.$broadcast('closeKeyboard')
  }



  $ionicPlatform.ready(function() {
    if($rootScope.$storage.userId.length > 1){//if they have a user id
      ++$rootScope.$storage.visitCount
      console.log('user returning for the '+ $rootScope.$storage.visitCount+ " time ////// "  +  $rootScope.$storage.userId );
    }else{
      $rootScope.$storage.userId = generateUUID()
      console.log('startup for ' +  $rootScope.$storage.userId );
      ++$rootScope.$storage.visitCount
    }
    var tattletale = new Tattletale('https://gaindeck.herokuapp.com/log');

    tattletale.log('“My name is Ozymandias, king of kings:');
    tattletale.log('Look on my works, ye Mighty, and despair!”');

    tattletale.send();
    //var winston = require('winston');

    //
    // Requiring `winston-papertrail` will expose
    // `winston.transports.Papertrail`
    //
    //
    //
    //var logger = new winston.Logger({
    //  transports: [
    //    new winston.transports.Papertrail({
    //      host: 'logs3.papertrailapp.com',
    //      port: 44424
    //    })
    //  ]
    //});
    //
    //logger.info('this is my message');



    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    //for dummy data
    //angular.forEach($rootScope.$storage.workouts,function(workout,val){
    //  $rootScope.$storage.nameList[workout.name+workout.date] = workout.name;
    //});
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
            controller: 'NavCtrl'

          }
        }

      })

      .state('tab.charts', {
        url: '/chart',
        views: {
          'tab-charts': {
            templateUrl: 'tab-charts.html',
            controller: 'NavCtrl'

          }
        }
      })

      .state('tab.calendar', {
        url: '/calendar',
        views: {
          'tab-calendar': {
            templateUrl: 'tab-calendar.html',
            controller: 'NavCtrl'
          }
        }
      })



      .state('tab.timer', {
        url: '/timer',
        views: {
          'tab-timer': {
            templateUrl: 'tab-timer.html',
            controller: 'NavCtrl'
          }
        }
      })



  $urlRouterProvider.otherwise('/tab/posts');

});
