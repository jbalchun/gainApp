var app=angular.module("MyApp.maincontrol",["ionic","MyApp.services","ngStorage","ngCordova"]);app.controller("liftcontrol",["$scope","$ionicModal","$localStorage","$rootScope","$state","localStore","$ionicPopup","$ionicPopover","$ionicPlatform","$timeout","$ionicScrollDelegate",function(e,t,i,a,n,o,s,r,l,u,d){e.removeFlag=!1,e.blurFlag=!1,e.indexLift=0,e.userId="userX",e.focusIndex=0,e.date=new Date,e.liftDate=String(e.date).substring(4,15),e.workoutName={name:""},e.bodyWeight={wt:""},e.maxList={},e.lastList={};var m={},f={};e.todaysMaxs={},e.lastClickedRep={},e.goalMap=e.$storage.goalsMap,e.unpackedGoalsMap={},e.$storage=i,e.rangeMap={},e.rangeFlipFlag=!0,e.editingShow=0,e.lightHeavyMap=e.$storage.lightHeavyMap,e.nameList=e.$storage.nameList;var c=0,p=0,g=0;e.uniqueNameSetsMap={},e.resultsSourceNameMap={},e.resultsSource=[],e.notes={notes:""};var h=new Date;e.dateObj={Year:h.getFullYear(),Month:[h.getMonth()],Day:h.getDate()},e.dateList=[],e.calendar1=!1,e.infoFlag=1;var w={newlift:"",sets:"",id:""};e.auto={sets:0,reps:0},e.autoSetChoice=[{set1:3},{set1:4},{set1:5},{set1:6}],e.autoRepChoice=[3,5,6,8,10],e.liftCards=e.$storage.todaysLifts,r.fromTemplateUrl("pop/pop-date.html",{scope:e}).then(function(t){e.popover2=t}),e.closeKeyboard=function(){document.activeElement.blur(),document.activeElement.blur()},e.datePopup=function(t,i){if(document.body.classList.add("platform-ios"),e.dateType=i,"Day"==i){for(var a=[],n=1;31>=n;n++)a.push(n);e.dateList=a}else"Month"==i?e.dateList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:"Year"==i&&(e.dateList=["2015","2016","2017","2018","2019","2020"]);e.popover2.show(t)},e.addLift=function(){o.addLift("Select Lift",[{reps:"0",wt:"0"}]),d.$getByHandle("small").scrollBottom()},e.$on("loadedFromCalendar",function(t,i){e.liftCards=e.$storage.todaysLifts}),e.removeLift=function(){e.liftCards.length>1&&(e.removeFlag=!e.removeFlag)},e.uniqueSortReps=function(){e.sets=e.resultsLifts;var t=[];angular.forEach(e.resultsLifts,function(e,i){var a=[];angular.forEach(e.sets,function(e,t){a.push(e.reps)}),t.push(a)});var i=[];angular.forEach(t,function(e,t){var a=_.unique(e),n=a.sort(function(e,t){return e-t});i.push(n)}),e.uniqueSortedReps=i},e.populateBodyWeightResults=function(){var t=Number(e.bodyWeight.wt);if(t&&t>10){{var i=o.getMax("Body Weight",0);Math.abs(t)-_.max(i,function(e){return e.wt}).wt,Math.abs(t)-i.slice(-1)[0].wt}return e.maxList["Body Weight"]=Math.abs(Math.abs(t)-_.max(i,function(e){return e.wt}).wt),e.lastList["Body Weight"]=Math.abs(Math.abs(t)-i.slice(-1)[0].wt),{name:"Body Weight",reps:0,todaysMax:e.bodyWeight.wt,max:_.max(i,function(e){return e.wt}).wt,last:i.reverse().slice(-2)[0].wt}}e.maxList["Body Weight"]="None",e.lastList["Body Weight"]="None"},e.buildResultsObject=function(){var t=[];e.uniqueNameSetsMap={},angular.forEach(e.resultsLifts,function(i,a){var n=_.uniq(i.sets,function(e){return e.reps});e.uniqueNameSetsMap[i.name]=n,angular.forEach(n,function(a,n){t.push(e.populateResults(i.name,a.reps))})}),e.resultsSource=t,angular.forEach(e.resultsSource,function(t,i){e.resultsSourceNameMap[t.name+String(t.reps)]=t}),e.resultsSourceNameMap["Body Weight"]=e.populateBodyWeightResults()},e.populateResults=function(t,i){var a=[],n=[];e.lastClickedRep[t]=i,angular.forEach(e.resultsLifts,function(e,o){e.name==t&&angular.forEach(e.sets,function(t,o){Number(t.reps)==Number(i)&&(n.push({name:e.name,wt:Number(t.wt)}),a.push(Number(t.wt)))})});var s=_.max(n,function(e){return e.wt});e.todaysMaxs[t+String(i)]=s.wt;var r=o.getMax(t,i),l=o.getChartData(t,i,3);if(1==l.length)var u={wt:"None",date:l[0].date};else u=l[1];return console.log("lastItem",u),1==r.only1?{name:t,reps:i,todaysMax:e.todaysMaxs[t+String(i)],max:0,last:0}:(-1e3>r||!r||r>1e3?e.maxList[t]="None":(e.maxList[t]=Math.abs(s.wt-Number(r.wt)),m[t]=s.wt&&s.wt-Number(r.wt)>0?0:1),-1e3>u||!u||u>1e3?e.lastList[t]="None":(e.lastList[t]=Math.abs(s.wt-Number(u.wt)),f[t]=s.wt&&s.wt-Number(u.wt)>0?0:1),console.log("lastItem",u),{name:t,reps:i,todaysMax:e.todaysMaxs[t+String(i)],max:r,last:u})},e.changeNumber=function(t,i){if(e.editingNumber.id)if(1==e.editingNumber.id){if(i)return e.sets2[e.editingNumber.index].reps=t,c=t,void(e.editingShow={num:e.sets2[e.editingNumber.index].reps});c=e.sets2[e.editingNumber.index].reps+t,c>=0&&(e.sets2[e.editingNumber.index].reps=Number(e.sets2[e.editingNumber.index].reps)+t,e.editingShow={num:e.sets2[e.editingNumber.index].reps})}else if(2==e.editingNumber.id){if(i)return p=t,e.sets2[e.editingNumber.index].wt=t,void(e.editingShow={num:e.sets2[e.editingNumber.index].wt});p=e.sets2[e.editingNumber.index].wt+t,p>=0&&(e.sets2[e.editingNumber.index].wt=Number(e.sets2[e.editingNumber.index].wt)+t,e.editingShow={num:e.sets2[e.editingNumber.index].wt})}else if(3==e.editingNumber.id){var a=String(e.sets2[e.editingNumber.index].reps),n=Number(e.goalMapEdit[e.nameLift+a].wt);if(i)return g=t,void(e.goalMapEdit[e.nameLift+a]={wt:t});g=e.goalMapEdit[e.nameLift+a].wt+t,g>=0&&(e.goalMapEdit[e.nameLift+a]={wt:n+t})}},e.clearResults=function(){e.maxList={},e.lastList={},m={},f={},e.todaysMaxs={},e.lastClickedRep={}},e.onRelease=function(t,i){e.goalMapEdit[e.nameLift+t]={wt:e.rangeMap[i]}},e.selectNumber=function(t,i){1==i?(e.rangeFlipFlag=!0,e.editingShow={num:e.sets2[t].reps},e.editingNumber={index:t,id:i},e.wtSelectPress=t+String(i),console.log("main",e.wtSelectPress)):2==i&&(e.rangeFlipFlag=!1,e.editingShow={num:e.sets2[t].wt},e.editingNumber={index:t,id:i},e.wtSelectPress=t+String(i))},e.popAddSet=function(){var t=e.sets2.length-1;console.log(t),1==e.editingNumber.id?(e.rangeFlipFlag=!0,e.editingShow={num:e.sets2[t].reps},e.editingNumber.index=t,e.wtSelectPress=t+String(1)):(e.rangeFlipFlag=!0,e.editingShow={num:e.sets2[t].wt},e.editingNumber.index=t,e.wtSelectPress=t+String(2))},e.selectGoal=function(t){e.wtSelectPress=t+String(3),e.editingShow={num:e.goalMapEdit[e.nameLift+String(e.sets2[t].reps)]},e.editingNumber={index:t,id:3}},e.onReleaseNumber=function(){1==e.editingNumber.id?(c=e.editingShow.num,e.sets2[e.editingNumber.index].reps=e.editingShow.num):2==e.editingNumber.id&&(e.sets2[e.editingNumber.index].wt=e.editingShow.num,p=e.editingShow.num)},e.preset=function(t){var i=e.sets2.length-3;0>i&&(e.sets2.push(angular.copy(e.sets2[0])),i++,0>i&&e.sets2.push(angular.copy(e.sets2[0]))),1==t?angular.forEach(e.sets2,function(e,t){e.reps=5}):2==t?angular.forEach(e.sets2,function(e,t){e.reps=6}):3==t?angular.forEach(e.sets2,function(e,t){e.reps=8}):4==t&&angular.forEach(e.sets2,function(e,t){0==t&&(e.reps=5),1==t&&(e.reps=3),2==t&&(e.reps=1)}),e.sets2=_.first(e.sets2,3),e.liftCards[e.indexLift].sets=e.sets2},e.historyPop=function(t){if("Select Lift"!=e.liftCards[t].name&&(0!=e.liftCards[t].sets[0].reps||0!=e.liftCards[t].sets[0].wt)){e.histIndex=t;var i=[],a=e.liftCards[t].name;if(angular.forEach(e.liftCards[t].sets,function(e,t){i.push(e.reps)}),e.uniqueRepsHist=_.unique(i),e.maxList={},e.lastList={},angular.forEach(e.uniqueRepsHist,function(t,i){o.getMax(a,t).wt&&(e.maxList[t]=o.getMax(a,t).wt,e.lastList[t]=o.getChartData(a,t,3).reverse().slice(-1)[0].wt)}),0==e.maxList.length&&0==e.lastList.length){var n=s.show({title:"Lift History",subTitle:"No recorded numbers for selected lift and reps",scope:e,buttons:[{text:"<b >Done</b>",type:"button-dark",onTap:function(e){}}]});n.then(function(e){})}else{var n=s.show({templateUrl:"pop/pop-history.html",title:"Lift History",subTitle:"For selected lift and reps, this is your last weight lifted and max weight lifted",scope:e,buttons:[{text:"<b >Done</b>",type:"button-dark",onTap:function(e){}}]});n.then(function(e){})}}},r.fromTemplateUrl("pop/pop-liftnames.html",{scope:e}).then(function(t){e.popover=t}),e.namePopupSubmit=function(t){document.body.classList.add("platform-ios"),e.nameList=a.$storage.nameList,_.uniq(e.nameList,!1);var i=[];angular.forEach(e.nameList,function(t,a){""==t&&-1==i.indexOf("(No Name)")&&(e.nameList[a]="(No Name)"),i.push(e.nameList[a])}),e.nameList=_.uniq(i,!1),e.popover.show(t)},e.namePopupSelect=function(t){return"clear"==t?(e.nameFilter="Name",e.popover.hide(),void e.filter()):(e.workoutName.name=t,void e.popover.hide())},e.showConfirm=function(){var t=!1;if(angular.forEach(e.liftCards,function(e,i){"Select Lift"==e.name&&(t=!0)}),t){var i=s.confirm({title:'Remove or edit "Select Lift"'});i.then(function(e){})}return t?void 0:void e.openModal("none","none","none",5)},e.dateErrorPop=function(){s.show({title:"You already lifted today!",subTitle:"Slow down tiger! Only one workout per day! (otherwise our metrics get real messy). Delete today's lift from the calendar tab to re-enter",scope:e,buttons:[{text:"Cancel"},{text:"<b >Done</b>",type:"button-dark",onTap:function(e){}}]})},a.emailPop=function(){"heroku"==a.stateW&&winston.log("info",e.$storage.userId+", opened email");var t=s.show({title:"Like Gain Deck?",scope:a,templateUrl:"pop/pop-email.html",buttons:[{text:"<b>Done</b>",type:"button-dark",onTap:function(e){}}]});t.then(function(t){if("heroku"==a.stateW){if(a.email.email.length>3&&-1==a.email.email.indexOf("@")){winston.log("info",e.$storage.userId+" closed with no email");var i=Parse.Object.extend("Reddit"),n=new i;n.save({username:a.email.email,uid:a.$storage.userId}).then(function(e){})}else if(a.email.email.length>3){winston.log("info",e.$storage.userId+" closed with email"+a.email.email);var o=Parse.Object.extend("Email"),s=new o;s.save({address:a.email.email,uid:a.$storage.userId}).then(function(e){})}e.$broadcast("destroyEmail")}})},e.$on("destroyEmail",function(){u(function(){a.email.email=""},3e3)}),e.showInfo=function(){if("heroku"==a.stateW){winston.log("info",e.$storage.userId+", viewed home info");var t=new Date}var i=s.show({title:"New Workout",scope:e,templateUrl:"pop/pop-maininfo.html",buttons:[{text:"<b>Done</b>",type:"button-dark",onTap:function(e){}}]});i.then(function(i){if("heroku"==a.stateW){var n=new Date-t;winston.log("info",e.$storage.userId+", closed home info after"+n)}})},e.removeLiftRow=function(t){e.removeFlag&&e.liftCards.splice(t,1)},e.keyPressed=function(t,i){13==t.keyCode&&e.s()},e.clearLifts=function(){var t=s.show({title:"Clear Lifts?",subTitle:"Today's data will be removed",scope:e,buttons:[{text:"Cancel"},{text:"<b>Clear</b>",type:"button-dark",onTap:function(t){o.clearLifts(),e.liftCards=e.$storage.todaysLifts,d.scrollTop()}}]});t.then(function(e){})},e.submitWeight=function(){e.liftCards[e.indexLift].sets=e.sets2,e.closeModal("lift",0,2)},e.toggleGroup=function(t){e.shownGroup=e.isGroupShown(t)?null:t},e.isGroupShown=function(t){return e.shownGroup===t},e.addSet=function(t){(0!=e.liftCards[t].sets[0].reps||0!=e.liftCards[t].sets[0].wt)&&o.addSet(t)},e.removeSet=function(e){o.removeSet(e)},e.updateGoals=function(){o.updateGoals(e.goalMapEdit),e.goalMap=e.$storage.goalsMap,e.closeModal("none",0,4)},e.outRemove=function(){e.removeFlag&&(e.removeFlag=!e.removeFlag)},e.popEditingNumber=function(t,i){t!=e.editingShow.num&&(i?e.changeNumber(t,i):e.changeNumber(t)),e.editingNumber.id=2,e.wtSelectPress=e.editingNumber.index+"2",e.editingShow={num:e.sets2[e.editingNumber.index].wt}},t.fromTemplateUrl("modals/nav-liftselector.html",{id:"1",scope:e,backdropClickToClose:!1,animation:"slide-in-up"}).then(function(t){e.modal=t}),t.fromTemplateUrl("modals/nav-weightselector.html",{id:"2",scope:e,backdropClickToClose:!0,animation:"slide-in-up"}).then(function(t){e.modal2=t}),t.fromTemplateUrl("modals/nav-results.html",{id:"3",scope:e,backdropClickToClose:!0,animation:"slide-in-up"}).then(function(t){e.modal3=t}),t.fromTemplateUrl("modals/nav-goals.html",{id:"4",scope:e,backdropClickToClose:!0,animation:"slide-in-up"}).then(function(t){e.modal4=t}),t.fromTemplateUrl("modals/nav-confirm.html",{id:"5",scope:e,backdropClickToClose:!0,animation:"slide-in-up"}).then(function(t){e.modal5=t}),e.openModal=function(t,i,a,n,o){if("Select Lift"!=t||2!=n){e.lightHeavyMap["Select Lift"]="heavy";var s=function(){e.modal.show()};if(1==n)e.blurFlag=!0,window.cordova&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),e.$storage.selectedLiftNames=[],angular.forEach(e.liftCards,function(t,i){t.name&&e.$storage.selectedLiftNames.push(t.name)}),u(s(),0),e.$storage.editingLift={name:t,index:i};else if(2==n)e.blurFlag=!0,e.nameLift=t,e.indexLift=i,angular.forEach(e.$storage.liftData,function(i,a){i.name==t&&(e.weightRack=i.weight)}),e.focusIndex=1,e.sets2=e.liftCards[i].sets,e.editingNumber=e.sets2[0].reps,e.editingShow={num:0},o?e.selectNumber(a,2):e.selectNumber(a,1),e.modal2.show();else if(3==n)e.blurFlag=!0,e.populateBodyWeightResults(),e.buildResultsObject(),e.modal3.show();else if(4==n){if("Select Lift"==e.liftCards[i].name||0==e.liftCards[i].sets[0].reps&&0==e.liftCards[i].sets[0].wt)return;e.blurFlag=!0,e.nameLift=t,e.indexLift=i,e.focusIndex=a,e.goalMapEdit=angular.copy(e.goalMap),e.sets2=_.uniq(e.liftCards[i].sets,!1,function(e){return Number(e.reps)}),e.selectGoal(0),angular.forEach(e.$storage.liftData,function(i,a){i.name==t&&(e.weightRack=i.weight)}),angular.forEach(e.sets2,function(t,i){e.goalMapEdit[e.nameLift+t.reps]?e.rangeMap[i]=e.goalMapEdit[e.nameLift+t.reps].wt:(e.goalMapEdit[e.nameLift+t.reps]={wt:0},e.rangeMap[i]=0)}),e.modal4.show()}else e.blurFlag=!0,e.modal5.show()}},e.$on("modal.hidden",function(){var t=w.newLift,i=(w.sets,w.id);1==i?(window.cordova,"no change"==t&&"Select Lift"==e.liftCards[e.$storage.editingLift.index].name&&(e.liftName="Select Lift"),"no change"!=t&&(e.liftCards[e.$storage.editingLift.index].name=t.name,e.$storage.lightHeavyMap[t.name]=t.weight),o.buildKgMap(),e.kgMap=e.$storage.kgMap,u(function(){e.$broadcast("reset-liftselect")},500)):2==i||(3==i?u(function(){e.clearResults()},3e3):4==i||1==t&&(o.checkDate(e.liftDate)?e.dateErrorPop():(o.saveLift(e.liftDate,e.liftCards,e.workoutName,e.bodyWeight,e.notes),e.resultsLifts=e.liftCards,e.liftCards=e.$storage.todaysLifts,e.uniqueSortReps(),e.openModal("","","","3"),e.workoutName.name="",e.notes.notes="",e.bodyWeight.wt="",n.go("tab.calendar"))))}),e.closeModal=function(t,i,a){w={newLift:t,sets:i,id:a},e.blurFlag=!1,1==a?e.modal.hide():2==a?e.modal2.hide():3==a?e.modal3.hide():4==a?e.modal4.hide():e.modal5.hide()}}]);