var app=angular.module("MyApp.maincontrol",["ionic","MyApp.services","ngStorage","ngCordova"]);app.controller("liftcontrol",["$scope","$ionicModal","$localStorage","$rootScope","$state","QuickActionService","localStore","parseFactory","$ionicPopup","$ionicPopover","$ionicPlatform","$timeout","$ionicScrollDelegate","$ionicDeploy",function(t,e,o,n,a,i,s,r,l,u,d,c,p,f){t.removeFlag=!1,t.blurFlag=!1,t.promo={promo:""},t.indexLift=0,t.userId="userX",t.focusIndex=0,t.userData={},t.date=new Date,t.liftDate=String(t.date).substring(4,15),t.workoutName={name:""},t.bodyWeight={wt:""},t.maxList={},t.lastList={};var m={},g={};t.todaysMaxs={},t.lastClickedRep={},n.it=!1,t.goalMap=t.$storage.mainObj.goalsMap,t.unpackedGoalsMap={},t.$storage=o,t.rangeMap={},t.rangeFlipFlag=!0,t.editingShow=0,t.lightHeavyMap=t.$storage.mainObj.lightHeavyMap,t.nameList=t.$storage.mainObj.nameList;var b=0,h=0,w=0;t.uniqueNameSetsMap={},t.resultsSourceNameMap={},t.resultsSource=[],t.notes={notes:""};var y=new Date;t.dateObj={Year:y.getFullYear(),Month:[y.getMonth()],Day:y.getDate()},t.dateList=[],t.calendar1=!1,t.infoFlag=1,t.loading=!0,t.xyzabc="GOGAIN1234",t.tabTitle=t.$storage.mainObj.tabTitle,n.betabutton="Beta",n.beta=!1,n.betaInfo={feedback:"",email:""},n.$storage.mainObj.betaEmail=n.betaInfo.email;var v={newlift:"",sets:"",id:""};t.auto={sets:0,reps:0},t.autoSetChoice=[{set1:3},{set1:4},{set1:5},{set1:6}],t.autoRepChoice=[3,5,6,8,10],t.liftCards=t.$storage.mainObj.todaysLifts,t.updated=t.$storage.mainObj.updated,n.IAP={list:["unl"]},n.IAP.load=function(){return window.storekit?void storekit.init({debug:!0,ready:n.IAP.onReady,purchase:n.IAP.onPurchase,restore:n.IAP.onRestore,error:n.IAP.onError}):void alert("In-App Purchases not available")},t.restoreAgain=function(){storekit.restore()},n.IAP.onReady=function(){storekit.load(n.IAP.list,function(t,e){n.IAP.products=t,n.IAP.loaded=!0;for(var o=0;o<e.length;++o)console.log("Error: could not load "+e[o])})},n.IAP.onPurchase=function(e,o,a){if("unl"===o){t.$storage.mainObj.unlocked=!0;var i=l.show({title:"Success! Gain on!",scope:n,buttons:[{text:"<b>Close</b>",type:"button-dark",onTap:function(t){}}]});i.then(function(e){t.register()})}},n.IAP.onRestore=function(e,o){if("unl"===o){t.$storage.mainObj.unlocked=!0;var a=l.show({title:"Success! Gain on!",scope:n,buttons:[{text:"<b>Close</b>",type:"button-dark",onTap:function(t){}}]});a.then(function(e){t.register()})}},n.IAP.onError=function(t,e){alert(e)},n.IAP.buy=function(t){storekit.purchase(t)},d.ready(function(){console.log(t.$storage.mainObj.populated),t.$storage.mainObj.firstVisit&&(n.showWelcomePopup(t),t.$storage.mainObj.firstVisit=!1),window.cordova&&n.IAP.load(),t.$on("tab-quick",function(t,e){a.go(e.type)}),r.deleteAndSave(),i.configure(),console.log("getit"),r.getIt(),console.log(n.it,"it")}),u.fromTemplateUrl("pop/pop-date.html",{scope:t}).then(function(e){t.popover2=e}),t.$on("active-return",function(t,e){e&&(n.it=!0)}),n.closeKeyboard=function(){console.log("closekey"),window.cordova&&(console.log("closekeyCord"),cordova.plugins.Keyboard.close(),c(function(){cordova.plugins.Keyboard.close()},300)),document.activeElement.blur(),document.activeElement.blur()},t.$on("cloud-load",function(){t.liftCards=t.$storage.mainObj.todaysLifts}),t.$on("tab-quick",function(t,e){a.go(e.type)}),t.datePopup=function(e,o){if(document.body.classList.add("platform-ios"),t.dateType=o,"Day"==o){for(var n=[],a=1;31>=a;a++)n.push(a);t.dateList=n}else"Month"==o?t.dateList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:"Year"==o&&(t.dateList=["2015","2016","2017","2018","2019","2020"]);t.popover2.show(e)},t.addLift=function(e){console.log("adding"),s.addLift("Select Lift",[{reps:"0",wt:"0"}],e),console.log("added",t.liftCards),t.liftCards=t.$storage.mainObj.todaysLifts,p.$getByHandle("small").scrollBottom()},t.$on("loadedFromCalendar",function(e,o){t.liftCards=t.$storage.mainObj.todaysLifts,t.tabTitle=t.$storage.mainObj.tabTitle}),t.removeLift=function(){t.liftCards.length>1&&(t.removeFlag=!t.removeFlag)},t.uniqueSortReps=function(){t.sets=t.resultsLifts;var e=[];angular.forEach(t.resultsLifts,function(t,o){var n=[];angular.forEach(t.sets,function(t,e){n.push(t.reps)}),e.push(n)});var o=[];angular.forEach(e,function(t,e){var n=_.unique(t),a=n.sort(function(t,e){return t-e});o.push(a)}),t.uniqueSortedReps=o},t.populateBodyWeightResults=function(){var e=Number(t.bodyWeight.wt);if(e&&e>10){{var o=s.getMax("Body Weight",0);Math.abs(e)-_.max(o,function(t){return t.wt}).wt,Math.abs(e)-o.slice(-1)[0].wt}return t.maxList["Body Weight"]=Math.abs(Math.abs(e)-_.max(o,function(t){return t.wt}).wt),t.lastList["Body Weight"]=Math.abs(Math.abs(e)-o.slice(-1)[0].wt),{name:"Body Weight",reps:0,todaysMax:t.bodyWeight.wt,max:_.max(o,function(t){return t.wt}).wt,last:o.reverse().slice(-2)[0].wt}}t.maxList["Body Weight"]="None",t.lastList["Body Weight"]="None"},t.buildResultsObject=function(){var e=[];t.uniqueNameSetsMap={},angular.forEach(t.resultsLifts,function(o,n){var a=_.uniq(o.sets,function(t){return t.reps});t.uniqueNameSetsMap[o.name]=a,angular.forEach(a,function(n,a){e.push(t.populateResults(o.name,n.reps))})}),t.resultsSource=e,angular.forEach(t.resultsSource,function(e,o){t.resultsSourceNameMap[e.name+String(e.reps)]=e}),t.resultsSourceNameMap["Body Weight"]=t.populateBodyWeightResults()},t.populateResults=function(e,o,n){var a=[],i=[];t.lastClickedRep[e]=o,angular.forEach(t.resultsLifts,function(t,n){t.name==e&&angular.forEach(t.sets,function(e,n){Number(e.reps)==Number(o)&&(i.push({name:t.name,wt:Number(e.wt)}),a.push(Number(e.wt)))})});var r=_.max(i,function(t){return t.wt});t.todaysMaxs[e+String(o)]=r.wt;var n=s.getMax(e,o),l=s.getChartData(e,o,3);if(1==l.length)var u={wt:"None",date:l[0].date};else u=l[1];return console.log("lastItem",u),1==n.only1?(console.log("results preview lastone",{name:e,reps:o,todaysMax:t.todaysMaxs[e+String(o)],max:!1,last:0}),{name:e,reps:o,todaysMax:t.todaysMaxs[e+String(o)],max:0,last:0}):(-1e3>n||!n||n>1e3?t.maxList[e]="None":(t.maxList[e]=Math.abs(r.wt-Number(n.wt)),m[e]=r.wt&&r.wt-Number(n.wt)>0?0:1),-1e3>u||!u||u>1e3?t.lastList[e]="None":(t.lastList[e]=Math.abs(r.wt-Number(u.wt)),g[e]=r.wt&&r.wt-Number(u.wt)>0?0:1),console.log("results preview",{name:e,reps:o,todaysMax:t.todaysMaxs[e+String(o)],max:n,last:u}),{name:e,reps:o,todaysMax:t.todaysMaxs[e+String(o)],max:n,last:u})},t.centerTap=function(e){t.changeNumber(1===t.editingNumber.id?1*e:"light"===t.weightRack||"heavytens"===t.weightRack||"heavykg"===t.weightRack?.5*e:5*e)},t.changeNumber=function(e,o){if(console.log(e),t.editingNumber.id)if(1==t.editingNumber.id){if(o)return t.sets2[t.editingNumber.index].reps=e,void(t.editingShow={num:t.sets2[t.editingNumber.index].reps});b=Number(t.sets2[t.editingNumber.index].reps)+e,b>=0&&(t.sets2[t.editingNumber.index].reps=Number(t.sets2[t.editingNumber.index].reps)+e,t.editingShow={num:t.sets2[t.editingNumber.index].reps})}else if(2==t.editingNumber.id){if(o)return h=e,t.sets2[t.editingNumber.index].wt=e,void(t.editingShow={num:t.sets2[t.editingNumber.index].wt});h=Number(t.sets2[t.editingNumber.index].wt)+e,console.log(h),h>=0&&(t.sets2[t.editingNumber.index].wt=Number(t.sets2[t.editingNumber.index].wt)+e,t.editingShow={num:t.sets2[t.editingNumber.index].wt})}else if(3==t.editingNumber.id){var a=String(t.sets2[t.editingNumber.index].reps),i=Number(t.goalMapEdit[n.namelift+a].wt);if(o)return w=e,void(t.goalMapEdit[n.namelift+a]={wt:e});w=t.goalMapEdit[n.namelift+a].wt+e,w>=0&&(t.goalMapEdit[n.namelift+a]={wt:i+e})}},t.clearResults=function(){t.maxList={},t.lastList={},m={},g={},t.todaysMaxs={},t.lastClickedRep={}},t.onRelease=function(e,o){t.goalMapEdit[n.namelift+e]={wt:t.rangeMap[o]}},t.selectNumber=function(e,o){1==o?(t.rangeFlipFlag=!0,t.editingShow={num:t.sets2[e].reps},t.editingNumber={index:e,id:o},t.wtSelectPress=e+String(o),console.log("main",t.wtSelectPress)):2==o&&(t.rangeFlipFlag=!1,t.editingShow={num:t.sets2[e].wt},t.editingNumber={index:e,id:o},t.wtSelectPress=e+String(o))},t.popAddSet=function(){var e=t.sets2.length-1;console.log(e),1==t.editingNumber.id?(t.rangeFlipFlag=!0,t.editingShow={num:t.sets2[e].reps},t.editingNumber.index=e,t.wtSelectPress=e+String(1)):(t.rangeFlipFlag=!0,t.editingShow={num:t.sets2[e].wt},t.editingNumber.index=e,t.wtSelectPress=e+String(2))},t.selectGoal=function(e){t.wtSelectPress=e+String(3),t.editingShow={num:t.goalMapEdit[n.namelift+String(t.sets2[e].reps)]},t.editingNumber={index:e,id:3}},t.onReleaseNumber=function(){1==t.editingNumber.id?(b=t.editingShow.num,t.sets2[t.editingNumber.index].reps=t.editingShow.num):2==t.editingNumber.id&&(t.sets2[t.editingNumber.index].wt=t.editingShow.num,h=t.editingShow.num)},t.preset=function(e){var o=t.sets2.length-3;0>o&&(t.sets2.push(angular.copy(t.sets2[0])),o++,0>o&&t.sets2.push(angular.copy(t.sets2[0]))),1==e?angular.forEach(t.sets2,function(t,e){t.reps=5}):2==e?angular.forEach(t.sets2,function(t,e){t.reps=6}):3==e?angular.forEach(t.sets2,function(t,e){t.reps=8}):4==e&&angular.forEach(t.sets2,function(t,e){0==e&&(t.reps=5),1==e&&(t.reps=3),2==e&&(t.reps=1)}),t.sets2=_.first(t.sets2,3),t.liftCards[t.indexLift].sets=t.sets2},t.historyPop=function(e){if("Select Lift"!=t.liftCards[e].name&&(0!=t.liftCards[e].sets[0].reps||0!=t.liftCards[e].sets[0].wt)){t.histIndex=e;var o=[],n=t.liftCards[e].name;if(angular.forEach(t.liftCards[e].sets,function(t,e){o.push(t.reps)}),t.uniqueRepsHist=_.unique(o),t.maxList={},t.lastList={},angular.forEach(t.uniqueRepsHist,function(e,o){s.getMax(n,e).wt&&(t.maxList[e]=s.getMax(n,e).wt,t.lastList[e]=s.getChartData(n,e,3).reverse().slice(-1)[0].wt)}),0==t.maxList.length&&0==t.lastList.length){var a=l.show({title:"Lift History",subTitle:"No recorded numbers for selected lift and reps",scope:t,buttons:[{text:"<b >Done</b>",type:"button-dark",onTap:function(t){}}]});a.then(function(t){})}else{var a=l.show({templateUrl:"pop/pop-history.html",title:"Lift History",subTitle:"For selected lift and reps, this is your last weight lifted and max weight lifted",scope:t,buttons:[{text:"<b >Done</b>",type:"button-dark",onTap:function(t){}}]});a.then(function(t){})}}},u.fromTemplateUrl("pop/pop-liftnames.html",{scope:t}).then(function(e){t.popover=e}),t.namePopupSubmit=function(e){document.body.classList.add("platform-ios"),t.nameList=n.$storage.mainObj.nameList,_.uniq(t.nameList,!1);var o=[];angular.forEach(t.nameList,function(e,n){""==e&&-1==o.indexOf("(No Name)")&&(t.nameList[n]="(No Name)"),o.push(t.nameList[n])}),t.nameList=_.uniq(o,!1),t.popover.show(e)},t.namePopupSelect=function(e){return"clear"==e?(t.nameFilter="Name",t.popover.hide(),void t.filter()):(t.workoutName.name=e,void t.popover.hide())},t.showConfirm=function(){var e=!1;if(console.log(t.$storage.mainObj.unlocked,t.$storage.mainObj.liftCount,t.$storage.mainObj.liftLimit),!t.$storage.mainObj.unlocked&&t.$storage.mainObj.liftCount>=t.$storage.mainObj.liftLimit)return void t.iapPop(!0);if(angular.forEach(t.liftCards,function(t,o){"Select Lift"==t.name&&(e=!0)}),e){var o=l.confirm({title:'Remove or edit "Select Lift"',buttons:[{text:"<b >Cancel</b>",type:"button-light",onTap:function(t){}},{text:"<b >Done</b>",type:"button-dark",onTap:function(t){}}]});o.then(function(t){})}return e?void 0:void t.openModal("none","none","none",5)},t.dateErrorPop=function(){l.show({title:"You already lifted today!",subTitle:"Slow down tiger! Only one workout per day! (otherwise our metrics get real messy). Delete today's lift from the calendar tab to re-enter",scope:t,buttons:[{text:"Cancel"},{text:"<b >Done</b>",type:"button-dark",onTap:function(t){}}]})},n.betaPop=function(){var t=l.show({title:"Beta Feedback",scope:n,templateUrl:"pop/pop-beta.html",buttons:[{text:"<b>Cancel</b>",type:"button-light",onTap:function(t){}},{text:"<b>Done</b>",type:"button-dark",onTap:function(t){}}]});t.then(function(t){var e=Parse.Object.extend("Beta"),o=new e;o.save({email:n.betaInfo.email,uid:n.$storage.mainObj.userId,feedback:n.betaInfo.feedback}).then(function(t){n.betaInfo.feedback=""})})},n.emailPop=function(){"heroku"==n.stateW&&winston.log("info",t.$storage.mainObj.userId+", opened email");var e=l.show({title:"Like Gain Deck?",scope:n,templateUrl:"pop/pop-email.html",buttons:[{text:"<b>Done</b>",type:"button-dark",onTap:function(t){}}]});e.then(function(e){if("heroku"==n.stateW){if(n.email.email.length>3&&-1==n.email.email.indexOf("@")){winston.log("info",t.$storage.mainObj.userId+" closed with no email");var o=Parse.Object.extend("Reddit"),a=new o;a.save({username:n.email.email,uid:n.$storage.mainObj.userId}).then(function(t){})}else if(n.email.email.length>3){winston.log("info",t.$storage.mainObj.userId+" closed with email"+n.email.email);var i=Parse.Object.extend("Email"),s=new i;s.save({address:n.email.email,uid:n.$storage.mainObj.userId}).then(function(t){})}t.$broadcast("destroyEmail")}})},n.iapPop=function(e){var o=!1,a=!1,i=e?"Out of Lifts!":"Gain Unlimited!",s=l.show({title:i,templateUrl:"pop/pop-iap.html",subTitle:"<b>Get the unlimited version to take full advantage of our tracking and analytics tools Only $1.99.\n Less than your notebook and pen!</b>",scope:n,template:"<style>.popup { width:380px !important; }</style>",buttons:n.it?[{text:"<b>Cancel</b>",type:"button-light",onTap:function(t){}},{text:"<b>Restore</b>",type:"button-light",onTap:function(t){a=!0}},{text:"<b>Promo Code</b>",type:"button-dark",onTap:function(t){o=!0}},{text:"<b>Buy</b>",type:"button-balanced",onTap:function(t){window.cordova&&n.IAP.buy("unl")}}]:[{text:"<b>Cancel</b>",type:"button-light",onTap:function(t){}},{text:"<b>Restore</b>",type:"button-light",onTap:function(t){a=!0}},{text:"<b>Buy</b>",type:"button-balanced",onTap:function(t){window.cordova&&n.IAP.buy("unl")}}]});s.then(function(e){o&&c(function(){x()},200),a&&t.restoreAgain()})};var x=function(){var e=l.show({title:"Promo Code",scope:t,templateUrl:"pop/pop-promo.html",buttons:[{text:"<b>Cancel</b>",type:"button-light",onTap:function(){t.cancelPromo=!0}},{text:"<b>Submit</b>",type:"button-dark",onTap:function(){}}]});e.then(function(e){t.cancelPromo||(t.closeKeyboard(),t.isValid=r.checkPromo(t.promo.promo))})};t.$on("promo-return",function(e,o){if(console.log("args",o),o){var a=!0;t.$storage.mainObj.unlocked=!0}else a=!1;var i=a?"Success! Gain on!":"Invalid Code",s=l.show({title:i,scope:n,buttons:[{text:"<b>Close</b>",type:"button-dark",onTap:function(t){}}]});s.then(function(e){t.$storage.mainObj.unlocked&&t.register()})}),t.$on("destroyEmail",function(){c(function(){n.email.email=""},3e3)}),t.showInfo=function(){if("heroku"==n.stateW){winston.log("info",t.$storage.mainObj.userId+", viewed home info");var e=new Date}var o=l.show({title:"New Workout",scope:t,templateUrl:"pop/pop-maininfo.html",buttons:[{text:"<b>Done</b>",type:"button-dark",onTap:function(t){}}]});o.then(function(o){if("heroku"==n.stateW){var a=new Date-e;winston.log("info",t.$storage.mainObj.userId+", closed home info after"+a)}})},t.removeLiftRow=function(e,o,n){t.removeFlag&&t.liftCards.splice(t.liftCards.indexOf(n),1),t.removeFlag=!t.removeFlag},t.swipeRemoveLiftRow=function(e,o,n){t.liftCards.splice(t.liftCards.indexOf(n),1)},t.keyPressed=function(e,o){13==e.keyCode&&t.s()},t.cloudPop=function(){var e="";if(t.$storage.mainObj.unlocked)var o=l.show({templateUrl:"pop/pop-cloud.html",title:"Cloud Sync",subTitle:"<b>Purchase Unlimited to access! Or log in here<b>",scope:t,buttons:[{text:"<b>Cancel</b>",type:"button-light",onTap:function(t){e="3"}},{text:"<b>Log in</b>",type:"button-dark",onTap:function(t){e="2"}},{text:"<b>Register</b>",type:"button-dark",onTap:function(t){e="4"}}]});else var o=l.show({templateUrl:"pop/pop-cloud.html",title:"Cloud Sync",subTitle:"<b>Purchase Unlimited to access! Or log in here<b>",scope:t,buttons:[{text:"<b>Cancel</b>",type:"button-light",onTap:function(t){e="3"}},{text:"<b>Log in</b>",type:"button-dark",onTap:function(t){e="2"}},{text:"<b>Buy</b>",type:"button-balanced",onTap:function(t){e="1"}}]});o.then(function(o){"1"===e&&window.cordova&&n.IAP.buy("unl"),"2"===e&&t.logIn(),"4"===e&&t.register()})},t.register=function(){var e=l.show({templateUrl:"pop/pop-register.html",scope:t,title:"Register",subTitle:"Create your account to sync your data to the cloud and get access to our web client. The cloud icon will disappear and your data will be synced automatically",buttons:[{text:"Later"},{text:"<b>Done</b>",type:"button-dark",onTap:function(e){r.register(t.userData)}}]});e.then(function(e){t.closeKeyboard()})},t.logIn=function(){var e=l.show({templateUrl:"pop/pop-signin.html",scope:t,title:"Log In",subTitle:"Enter your username and password here to load your profile",buttons:[{text:"Cancel"},{text:"<b>Done</b>",type:"button-dark",onTap:function(e){r.logIn(t.userData)}}]});e.then(function(t){})},t.clearLifts=function(){t.removeFlag&&(t.removeFlag=!1);var e=l.show({title:"Clear Lifts?",subTitle:"Today's data will be removed",scope:t,buttons:[{text:"Cancel"},{text:"<b>Clear</b>",type:"button-dark",onTap:function(e){s.clearLifts(),t.liftCards=t.$storage.mainObj.todaysLifts,t.$storage.mainObj.tabTitle="Lift",t.tabTitle="Lift",p.scrollTop()}}]});e.then(function(t){})},t.clearAll=function(){t.removeFlag&&(t.removeFlag=!1);var e=l.show({title:"Clear ALL APP DATA?",subTitle:"All data you have inputted will be cleared from the app. Proceed? (just tap the icon to clear today only)",scope:t,buttons:[{text:"Cancel"},{text:"<b>Clear</b>",type:"button-dark",onTap:function(e){s.clearAll(),t.liftCards=t.$storage.mainObj.todaysLifts,t.$storage.mainObj.tabTitle="Lift",t.tabTitle="Lift",p.scrollTop()}}]});e.then(function(t){})},t.clearAllStart=function(){t.removeFlag&&(t.removeFlag=!1);var e=l.show({title:"Clear sample Workouts?",subTitle:"Tap 'Clear Sample Workouts' to wipe the sample workout data and get to work. Your lifts and settings will be maintained",scope:t,buttons:[{text:"Cancel"},{text:"<b>Clear Dummy Workouts</b>",type:"button-dark",onTap:function(e){s.clearLiftsOnly(),n.$storage.mainObj.cleared=!0,t.liftCards=t.$storage.mainObj.todaysLifts,t.$storage.mainObj.tabTitle="Lift",t.tabTitle="Lift",p.scrollTop()}}]});e.then(function(t){})},t.submitWeight=function(){t.liftCards[t.indexLift].sets=t.sets2,t.closeModal("lift",0,2)},t.toggleGroup=function(e){t.shownGroup=t.isGroupShown(e)?null:e},t.isGroupShown=function(e){return t.shownGroup===e},t.addSet=function(e){(0!=t.liftCards[e].sets[0].reps||0!=t.liftCards[e].sets[0].wt)&&s.addSet(e)},t.removeSet=function(t){s.removeSet(t)},t.updateGoals=function(){s.updateGoals(t.goalMapEdit),t.goalMap=t.$storage.mainObj.goalsMap,t.closeModal("none",0,4)},t.outRemove=function(){t.removeFlag&&(t.removeFlag=!t.removeFlag)},t.popEditingNumber=function(e,o){e!=t.editingShow.num&&(o?t.changeNumber(e,o):t.changeNumber(e)),t.editingNumber.id=2,t.wtSelectPress=t.editingNumber.index+"2",t.editingShow={num:t.sets2[t.editingNumber.index].wt}},e.fromTemplateUrl("modals/nav-liftselector.html",{id:"1",scope:t,backdropClickToClose:!1,animation:"slide-in-up"}).then(function(e){t.modal=e}),e.fromTemplateUrl("modals/nav-weightselector.html",{id:"2",scope:t,backdropClickToClose:!0,animation:"slide-in-up"}).then(function(e){t.modal2=e}),e.fromTemplateUrl("modals/nav-results.html",{id:"3",scope:t,backdropClickToClose:!0,animation:"slide-in-up"}).then(function(e){t.modal3=e}),e.fromTemplateUrl("modals/nav-goals.html",{id:"4",scope:t,backdropClickToClose:!0,animation:"slide-in-up"}).then(function(e){t.modal4=e}),e.fromTemplateUrl("modals/nav-confirm.html",{id:"5",scope:t,backdropClickToClose:!0,animation:"slide-in-up"}).then(function(e){t.modal5=e}),t.openModal=function(e,o,a,i,r){if("Select Lift"!=e||2!=i){t.lightHeavyMap["Select Lift"]="heavy";var l=function(){t.modal.show()};if(1==i)t.blurFlag=!0,window.cordova&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),t.$storage.mainObj.selectedLiftNames=[],angular.forEach(t.liftCards,function(e,o){e.name&&t.$storage.mainObj.selectedLiftNames.push(e.name)}),c(l(),0),t.$storage.mainObj.editingLift={name:e,index:o},c(function(){t.loading=!1},100);else if(2==i)t.blurFlag=!0,n.namelift=e,t.indexLift=o,angular.forEach(t.$storage.mainObj.liftData,function(o,n){o.name==e&&(t.weightRack=o.weight)}),t.focusIndex=1,t.sets2=t.liftCards[o].sets,t.editingNumber=t.sets2[0].reps,t.editingShow={num:0},r?t.selectNumber(a,2):t.selectNumber(a,1),t.kgMap=s.buildKgMap(),console.log("kgmap",t.kgMap),t.modal2.show();else if(3==i)t.blurFlag=!0,t.populateBodyWeightResults(),t.buildResultsObject(),t.modal3.show();else if(4==i){if("Select Lift"==t.liftCards[o].name||0==t.liftCards[o].sets[0].reps&&0==t.liftCards[o].sets[0].wt)return;t.blurFlag=!0,n.namelift=e,t.indexLift=o,t.focusIndex=a,t.goalMapEdit=angular.copy(t.goalMap),t.sets2=_.uniq(t.liftCards[o].sets,!1,function(t){return Number(t.reps)}),t.selectGoal(0),angular.forEach(t.$storage.mainObj.liftData,function(o,n){o.name==e&&(t.weightRack=o.weight)}),angular.forEach(t.sets2,function(e,o){t.goalMapEdit[n.namelift+e.reps]?t.rangeMap[o]=t.goalMapEdit[n.namelift+e.reps].wt:(t.goalMapEdit[n.namelift+e.reps]={wt:0},t.rangeMap[o]=0)}),t.modal4.show()}else console.log("go",t.$storage.mainObj.tabTitle,t.workoutName.name),"Lift"!=t.tabTitle&&(t.workoutName.name=angular.copy(t.$storage.mainObj.tabTitle)),t.blurFlag=!0,t.modal5.show()}},t.$on("lift-settings-change",function(e,o){console.log("stap up"),t.bootStrapWeightModal(o.name)}),t.bootStrapWeightModal=function(e){angular.forEach(t.$storage.mainObj.liftData,function(o,n){o.name==e&&(t.weightRack=o.weight)}),t.kgMap=s.buildKgMap()},t.$on("modal.hidden",function(){var e=v.newLift,o=(v.sets,v.id);1==o?(window.cordova,"no change"==e&&"Select Lift"==t.liftCards[t.$storage.mainObj.editingLift.index].name&&(t.liftName="Select Lift"),"no change"!=e&&(t.liftCards[t.$storage.mainObj.editingLift.index].name=e.name,t.$storage.mainObj.lightHeavyMap[e.name]=e.weight),s.buildKgMap(),t.kgMap=t.$storage.mainObj.kgMap,c(function(){t.$broadcast("reset-liftselect")},500)):2==o||(3==o?c(function(){t.clearResults()},3e3):4==o||1==e&&(s.saveLift(t.liftDate,t.liftCards,t.workoutName,t.bodyWeight,t.notes),t.resultsLifts=t.liftCards,t.liftCards=t.$storage.mainObj.todaysLifts,t.uniqueSortReps(),t.openModal("","","","3"),t.workoutName.name="",t.notes.notes="",t.bodyWeight.wt="",a.go("tab.calendar"),t.tabTitle="Lift"))}),t.closeModal=function(e,o,n){v={newLift:e,sets:o,id:n},t.blurFlag=!1,1==n?t.modal.hide():2==n?t.modal2.hide():3==n?t.modal3.hide():4==n?t.modal4.hide():t.modal5.hide()},n.checkAndDoUpdate=function(e){console.log("Ionic Deploy: Checking for updates"),f.check().then(function(o){if(n.hasUpdate=o,"wifi"==e&&o){alert("updating"),n.doUpdate();var a=l.show({title:"Update Available",subTitle:"Hot-updating your app, updates will appear next time the app is opened. (I only do this automatically over wifi!)",scope:t,buttons:[{text:"<b>Ok</b>",type:"button-dark"}]});a.then(function(t){})}else if(o){var i=l.show({title:"Update Available",subTitle:"Tap Ok to *hot-update* your app over cellular (Automatically, no redirect to app store. Alternatively wait for wifi)",scope:t,buttons:[{text:"Later"},{text:"<b>Ok</b>",type:"button-dark",onTap:function(e){t.$storage.mainObj.updating=!0,n.doUpdate()}}]});i.then(function(t){})}},function(t){console.error("Ionic Deploy: Unable to check for updates",t)})},t.percentage="",n.doUpdate=function(){alert("try updating"),f.download().then(function(){alert("downloaded"),f.extract().then(function(){alert("extracted"),t.$storage.mainObj.updated=!0,t.updated=!0},function(t){alert("error")},function(e){alert("extracting"),t.percentage=e})},function(t){alert("errord")},function(e){alert("downloading"),t.percentage=e})}}]);