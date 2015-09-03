var app=angular.module("MyApp.chartcontrol",["MyApp.services","ngStorage"]);app.controller("chartcontrol",["$scope","$localStorage","localStore","$ionicModal","$timeout","$rootScope","$ionicPopup","$ionicPopover","$state",function(e,t,a,l,o,i,r,s,n){e.liftName="Select Lift",e.chartTitle="Dummy Lift for xx reps",e.reps2="reps",e.reps={reps:0},e.reps3=[{reps:0}],e.repsChart={reps:0},e.labels=["January","February","March","April","May","June","July","asdf","asdf","asdf","asdf","asdf","asdf","July","asdf","asdf","asdf","asdf","asdf","asdf"],e.labels2=["January","February","March"],e.series=["Series A"],e.selectedLift="Barbell Bench",e.data=[[145,155,160,155,165,175,185,100,120,130,140,150,154,140,120,150,100,120,120,150]],i.weightSet=[[],[225,225,245,245,245,250,255,255,275]],e.bodyWeightData=[],e.bodyWtFlag=!0,e.dateSet=[1,2,3,4,5,6,7,8,9],e.firstDate="Start Date",e.lastDate="End Date",e.chartTable=0,e.dateWeightObjectList=[],e.goalNum={wt:void 0},e.updateFlag=void 0,e.dateList=[],e.dateSetFull=[],e.firstDateFull="",e.spanSelect=20,e.selectedReps="Select Reps",n.enterCount=0,e.refreshCharts=function(t){c(!1),e.bodyWtFlag=!0,e.liftName="Select Lift",e.chartTitle="Dummy Lift",e.repsChart.reps="xx",e.selectedReps="Select Reps",e.dateSet=[1,2,3,4,5,6,7,8,9],e.dateSetFull=[1,2,3,4,5,6,7,8,9],e.firstDate="Start Date",e.lastDate="End Date",e.goalNum.wt=g(),e.chartTable=4,e.spanSelect=20,i.weightSet=[[],[225,225,245,245,245,250,255,255,275]],i.weightSetFull=[[],[225,225,245,245,245,250,255,255,275]],o(function(){e.chartTable=0,e.spanSelect=20,console.log("reset")},1),d(),t&&n.go(n.current,{},{reload:!0}),e.selectTimespan(20)},e.$on("$ionicView.beforeEnter",function(t,a){a.fromCache&&"tab.charts"==a.stateName&&e.refreshCharts()}),e.infoFlag=3,e.chartCeiling=void 0,e.chartOptions={pointDotRadius:2,scaleLabel:"<%= value%>",scaleOverride:!1,scaleSteps:10,scaleStepWidth:10,scaleStartValue:100,datasetFill:!1};var c=function(t,a,l){if(t){e.chartOptions.scaleOverride=!0;var o=10*Math.round(l/10)-20;e.chartOptions.scaleStartValue=o;var i=10*Math.round(a/10)-o+10,r=i/10;e.chartOptions.scaleSteps=r}else e.chartOptions.scaleOverride=!1};e.getReps=function(){e.reps3=a.buildRepList(e.liftName),e.repSelect(0,e.chartTable,!0)},e.$on("closeKeyboard",function(t){e.updateGoal(e.repsChart.reps)}),e.showInfo=function(){if("heroku"==i.stateW){var t=new Date;winston.log("info",e.$storage.userId+", viewed data info")}var a=r.show({title:"Data",scope:e,templateUrl:"pop/pop-maininfo.html",buttons:[{text:"<b>Done</b>",type:"button-dark",onTap:function(e){}}]});a.then(function(a){if("heroku"==i.stateW){var l=new Date-t;winston.log("info",e.$storage.userId+", closed data after"+l)}})},e.noDataPop=function(){var t=r.show({title:"Not Enough Data to Chart",subTitle:"We chart weekly max for a given lift and number of reps, so you need at least 2 weeks worth of this lift to see a trend. You can view your lifts in the table until then",scope:e,buttons:[{text:"<b>Close</b>",type:"button-dark",onTap:function(t){e.refreshCharts()}},{text:"<b>See Table</b>",type:"button-dark",onTap:function(t){e.repSelect(e.repsChart.reps,e.chartTable),e.chartTable=!e.chartTable}}]});t.then(function(e){})},e.keyPressed=function(e,t){},e.updateGoal=function(){if("Dummy Lift for xx reps"!=e.chartTitle){var t={};console.log("Bodywtflag",e.bodyWtFlag),e.bodyWtFlag?(t[e.liftName+String(e.repsGoal)]=e.goalNum.wt,a.updateGoals(t),e.repSelect(e.repsGoal,e.chartTable)):(t.BodyWt=e.goalNum.wt,a.updateGoals(t),e.updateFlag=1,e.chartBodyWeight(e.updateFlag))}},s.fromTemplateUrl("pop/pop-reps.html",{scope:e}).then(function(t){e.popover=t}),e.repPopup=function(t){"Select Lift"!=e.liftName&&(document.body.classList.add("platform-ios"),e.popover.show(t))},e.repPopSelect=function(t){e.repsChart.reps=t,e.repsGoal=t,e.selectedReps=String(t+" reps"),e.repSelect(t,e.chartTable),e.popover.hide()},e.changeView=function(t,a){if(e.selectTimespan(!1),e.bodyWtFlag){if("Dummy Lift for xx reps"==e.chartTitle)return void(e.chartTable=t);e.repSelect(a,t)}else e.chartBodyWeight(1,!0);e.chartTable=t},e.repSelect=function(t,l,r){e.chartTitle=e.liftName,e.repsChart.reps=t,c(!1),e.chartOptions.scaleOverride=!1,"Select Lift"==e.liftName||"Select Reps"==e.selectedReps||r?(i.weightSet=[[],[225,225,245,245,245,250,255,255,275]],e.dateSet=[1,2,3,4,5,6,7,8,9],e.dateWeightObjectList=[],i.weightSetFull=angular.copy(e.weightSet),e.bodyWtFlag=!0,e.selectTimespan(20)):(i.weightSet=void 0,i.weightSet=[],e.dateSet=[],e.dateSetFull=[],o(function(){if(i.weightSet=a.getChartData(e.liftName,t,1),e.weightSet[0].length<=1&&0==e.chartTable)return void e.noDataPop();e.dateSetFull=a.getChartData(e.liftName,t,2);var l=[];angular.forEach(e.dateSetFull,function(t,a){l.push({date:t,wt:e.weightSet[0][a]})}),l.reverse(),i.weightSet=a.normalizeToWeeks(l,1),e.dateSetFull=a.normalizeToWeeks(l,2),e.dateList=a.normalizeToWeeks(l,3),e.firstDateFull=e.dateList[0],e.lastDate=e.dateList.slice(-1)[0],e.dateSet=angular.copy(e.dateSetFull),e.firstDate=angular.copy(e.firstDateFull);var o=[];if(g()){e.goalNum.wt=g(),angular.forEach(e.dateSetFull,function(t,a){o.push(e.goalNum.wt.wt)}),e.weightSet.push(o);var r=angular.copy(e.weightSet[0]),s=angular.copy(e.weightSet[1]);e.weightSet[0]=s,e.weightSet[1]=r,i.weightSetFull=angular.copy(e.weightSet)}else e.weightSet.unshift([]),e.goalNum.wt=void 0,i.weightSetFull=angular.copy(e.weightSet);e.dateWeightObjectList=[],e.dateWeightObjectList=l,e.bodyWtFlag=!0,e.loadAnalytics(),e.selectTimespan(20)}))},e.selectTimespan=function(t){if("Dummy Lift for xx reps"!=e.chartTitle&&i.weightSet!=[[],[225,225,245,245,245,250,255,255,275]]){if(("Select Lift"==e.liftName||"Select Reps"==e.selectedReps)&&e.bodyWtFlag)return void(e.bodyWtFlag&&(e.spanSelect=t));e.spanSelect=t;var a=Number(_.last(e.dateSetFull)),l=angular.copy(i.weightSetFull);if(t&&a>t){var o=a-t,r=new Date(e.firstDateFull);r.setDate(r.getDate()+7*o),e.firstDate=r.getMonth()+1+"/"+r.getDate()+"/"+r.getFullYear(),e.dateSet=_.last(e.dateSetFull,t),e.weightSet[0]=angular.copy(l[0].splice(l[0].length-t)),e.weightSet[1]=angular.copy(l[1].splice(l[1].length-t))}else e.dateSet=e.dateSetFull,e.firstDate=e.firstDateFull,e.weightSet[0]=angular.copy(l[0]),e.weightSet[1]=angular.copy(l[1]);e.loadAnalytics()}},e.chartBodyWeight=function(t,l){if(e.firstDate="",e.lastDate="",e.liftName="Select Lift",d(),e.selectedReps="Select Reps",e.selectTimespan(!1),e.bodyWtFlag||1==t&&!e.bodyWtFlag)1==t&&(e.updateFlag=0),i.weightSet=[],e.dateSet=[],o(function(){if(i.weightSet=a.getBodyWeightData(1),e.dateSetFull=a.getBodyWeightData(2),e.weightSet[0].length<=1&&0==e.chartTable)return void e.noDataPop();e.dateWeightObjectList=[],angular.forEach(e.dateSetFull,function(t,a){e.dateWeightObjectList.push({date:t,wt:e.weightSet[0][a]})}),e.dateWeightObjectList.reverse(),i.weightSet=a.normalizeToWeeks(e.dateWeightObjectList,1),e.dateSetFull=a.normalizeToWeeks(e.dateWeightObjectList,2),i.weightSetFull=angular.copy(e.weightSet),l||(e.bodyWtFlag=!1),e.chartTitle="Body Weight";var t=a.normalizeToWeeks(e.dateWeightObjectList,3);if(e.firstDateFull=t[0],e.lastDate=t.slice(-1)[0],e.dateSet=angular.copy(e.dateSetFull),e.firstDate=angular.copy(e.firstDateFull),g()){var o=[];e.goalNum.wt=g(),console.log("print get goal",e.goalNum.wt),angular.forEach(e.dateSetFull,function(t,a){o.push(e.goalNum.wt.wt)}),console.log("print goal array",o),e.weightSet.push(o);var r=angular.copy(e.weightSet[0]),s=angular.copy(e.weightSet[1]);e.weightSet[0]=s,e.weightSet[1]=r,i.weightSetFull=angular.copy(e.weightSet),console.log("print full array",e.weightSet);var n=_.max([_.max(e.weightSet[0]),_.max(e.weightSet[1])]),d=_.min([_.min(e.weightSet[0]),_.min(e.weightSet[1])]);c(!0,n,d)}else c(!0,_.max(e.weightSet[0]),_.min(e.weightSet[0])),e.weightSet.unshift([]),e.goalNum.wt=void 0,i.weightSetFull=angular.copy(e.weightSet)});else{if(void 0==e.repsGoal)return i.weightSet=[[],[225,225,245,245,245,250,255,255,275]],e.dateSet=[1,2,3,4,5,6,7,8,9],e.firstDate="Start Date",e.lastDate="End Date",e.liftName="Select Lift",e.selectedReps="Select Reps",e.chartOptions.scaleOverride=!1,e.bodyWtFlag=!0,e.goalNum.wt=g(),void(e.chartTitle="Dummy Lift for xx reps");e.repSelect(e.repsGoal,0==e.chartTable),e.bodyWtFlag=!0}};var g=function(){if(e.bodyWtFlag){var t=e.liftName+String(e.repsChart.reps);return a.getGoal(t)}return a.getGoal("BodyWt")};e.onClick=function(e,t){},l.fromTemplateUrl("modals/nav-liftselector.html",{id:"1",scope:e,backdropClickToClose:!1,animation:"slide-in-up"}).then(function(t){e.modal=t}),e.openModal=function(){e.blurFlag=!0,e.modal.show()},e.closeModal=function(t,a,l){e.blurFlag=!1,e.newLiftModal=t,e.modal.hide()},e.$on("modal.hidden",function(){"no change"!=e.newLiftModal&&(e.liftName=e.newLiftModal.name,e.selectedReps="Select Reps",(e.liftName.length<2||"Select Lift"==e.liftName)&&(e.liftName="Select Lift"),e.getReps()),o(function(){e.$broadcast("reset-liftselect")},500)}),e.deltaWeeks="",e.deltaBody="",e.goalProject="",e.deltaWtBody="",e.showWeeks=!1,e.lastWt="",e.goalDiff="",e.loadAnalytics=function(){u(),h(),p()};var d=function(){e.deltaWeeks="",e.deltaBody="",e.goalProject="",e.deltaWtBody="",e.lastWt="",e.goalDiff="",e.goalProject=""},u=function(t){var a=t||i.weightSet[1],l=0,o=a.length-1;e.lastWt=i.weightSet[1][i.weightSet[1].length-1];for(var r=0;o>=r;r++)console.log("this ",a[r]," last ",a[r-1]),0!=r&&(l+=a[r]/a[r-1]-1);console.log("total",l,"count",o,l/o,l/o-1);var s=l/o*100;return t?s:void(e.deltaWeeks=s.toFixed(2))},h=function(){var t=e.deltaWeeks,a="";"undefined"!=typeof e.goalNum&&"undefined"!=typeof e.goalNum.wt&&"undefined"!=typeof e.goalNum.wt.wt&&(a=e.goalNum.wt.wt),console.log("goal",a);var l=i.weightSet[1][i.weightSet[1].length-1],o=a-l;0>t?(e.goalProject="Never",e.showWeeks=!1):l>=a||""==a?(e.goalProject="Reached or Empty",e.showWeeks=!1):(console.log("inc",1+t/100,"  "),e.showWeeks=!0,e.goalProject=Math.ceil(o/(l*(t/100))))},p=function(){var t=e.deltaWeeks,a=f(),l=u(a);e.deltaBody=l.toFixed(2),console.log("bod delta",a,l);var o=t/l;e.deltaWtBody=o.toFixed(4),e.bodyWtFlag||(e.deltaWtBody=1)},f=function(){var t=[];t=a.getBodyWeightData(1);var l=a.getBodyWeightData(2);if(t[0].length<=1&&0==e.chartTable)return void e.noDataPop();var o=[];return angular.forEach(l,function(e,a){o.push({date:e,wt:t[0][a]})}),o.reverse(),t=a.normalizeToWeeks(o,1),l=a.normalizeToWeeks(o,2),console.log("bod",t[0]),t[0]}}]);