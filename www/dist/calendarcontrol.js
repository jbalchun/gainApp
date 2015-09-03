var app=angular.module("MyApp.calendarcontrol",["ionic","MyApp.services","ngStorage"]);app.controller("calendarcontrol",["$scope","$ionicModal","$timeout","$ionicScrollDelegate","$rootScope","$localStorage","$state","localStore","$ionicPopup","$ionicPopover",function(t,e,a,o,n,r,i,l,s,f){t.$storage=r,t.workouts=t.$storage.workouts,t.filterList=angular.copy(t.$storage.workouts),t.searchQuery="",t.dateType="",t.today=new Date,t.dateObj={Year:"Year",Month:"Month",Day:"Day"},t.$storage=r,t.nameList=t.$storage.nameList,t.nameFilter="Name",t.liftName="Lift",t.monthMap={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12},t.calendar1=!0,t.infoFlag=2,t.date,t.$on("calRefresh",function(){t.filterList=angular.copy(t.$storage.workouts)}),t.toggleGroup=function(e){t.shownGroup=t.isGroupShown(e)?null:e},t.isGroupShown=function(e){return t.shownGroup===e},t.clearSearch=function(){t.searchQuery=""},t.isLiftDay=function(e){return e.length>2?!0:t.dateList.indexOf(2)>-1&&"Month"!=t.dateObj.Month?t.checkDayFiltered(e):t.dateList.indexOf(2)>-1&&"Month"==t.dateObj.Month?l.checkDay(e):void 0},t.checkDayFiltered=function(e){var a=!1;return angular.forEach(t.filterList,function(t,o){var n=Number(t.date.slice(3,6)),r=Number(e);n==r&&(a=!0)}),a},t.removeWorkout=function(e){var a=s.confirm({title:"Remove this workout permanently?"});a.then(function(a){a&&(l.removeWorkout(e),t.filterList=angular.copy(t.$storage.workouts),t.clearAll(),t.nameList=angular.copy(t.$storage.nameList))})},f.fromTemplateUrl("pop/pop-date.html",{scope:t}).then(function(e){t.popover=e}),f.fromTemplateUrl("pop/pop-liftnames.html",{scope:t}).then(function(e){t.popover2=e}),t.showInfo=function(){if(a(function(){},3),"heroku"==n.stateW){var e=new Date;winston.log("info",t.$storage.userId+", viewed calendar info")}var o=s.show({title:"Calendar",scope:t,templateUrl:"pop/pop-maininfo.html",buttons:[{text:"<b>Done</b>",type:"button-dark",onTap:function(t){}}]});o.then(function(a){if(!window.cordova){var o=new Date-e;winston.log("info",t.$storage.userId+", closed calendar after"+o)}})},t.datePopup=function(e,a){if(document.body.classList.add("platform-ios"),t.dateType=a,"Day"==a){for(var o=[],n=1;31>=n;n++)o.push(n);t.dateList=o}else"Month"==a?t.dateList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:"Year"==a&&(t.dateList=["2015","2016","2017","2018","2019","2020"]);t.popover.show(e)},t.clearAll=function(){t.dateObj={Year:"Year",Month:"Month",Day:"Day"},t.nameFilter="Name",t.liftName="Lift",t.filterList=angular.copy(t.$storage.workouts),o.$getByHandle("mainScroll").scrollTop()},t.namePopup=function(e){document.body.classList.add("platform-ios"),t.nameList=t.$storage.nameList,_.uniq(t.nameList,!1);var a=[];angular.forEach(t.nameList,function(e,o){""==e&&-1==a.indexOf("(No Name)")&&(t.nameList[o]="(No Name)"),a.push(t.nameList[o])}),t.nameList=_.uniq(a,!1),t.popover2.show(e)},t.datePopupSelect=function(e,a){return"clear"==e?(t.dateObj[angular.copy(t.dateType)]=angular.copy(t.dateType),t.popover.hide(),void t.filter()):(t.dateObj[angular.copy(t.dateType)]=e,t.dateType="",t.popover.hide(),void t.filter())},t.namePopupSelect=function(e){return"clear"==e?(t.nameFilter="Name",t.popover2.hide(),void t.filter()):(t.nameFilter=e,t.popover2.hide(),void t.filter())},t.clearHold=function(){},t.filter=function(e){t.filterList=[];var a=!1,n=!1,r=!1,i=!1,l=!1,s=[],f=[],c=[],u=[],p=[];i="Name"!=t.nameFilter?!0:!1,a="Month"!=t.dateObj.Month?!0:!1,r="Year"!=t.dateObj.Year?!0:!1,n="Day"!=t.dateObj.Day?!0:!1,l="Lift"!=t.liftName?!0:!1;(i||a||r||n||l)&&"clear"!=e||(t.filterList=angular.copy(t.$storage.workouts),o.$getByHandle("mainScroll").scrollTop()),angular.forEach(t.workouts,function(e,d){var m=new Date(e.date);l&&angular.forEach(e.lifts,function(a,o){a.name==t.liftName&&p.push(JSON.stringify(e))}),a&&m.getMonth()+1==t.monthMap[t.dateObj.Month]&&s.push(JSON.stringify(e)),n&&m.getDate()==t.dateObj.Day&&f.push(JSON.stringify(e)),r&&m.getFullYear()==String(t.dateObj.Year)&&c.push(JSON.stringify(e)),i&&(e.name==t.nameFilter&&u.push(JSON.stringify(e)),"(No Name)"==t.nameFilter&&""==e.name&&u.push(JSON.stringify(e))),o.$getByHandle("mainScroll").scrollTop()});var d=[{flag:n,array:f},{flag:a,array:s},{flag:r,array:c},{flag:i,array:u},{flag:l,array:p}],m=!1;if(angular.forEach(d,function(e,a){1!=e.flag||void 0!==e.array&&0!=e.array.length||(t.filterList=[],m=!0)}),!m){var h=[p,s,f,c,u],g=[];angular.forEach(h,function(t,e){t.length>=1&&g.push(t)});var y=[];y=g.length>1?_.intersection.apply(_,g):g[0],angular.forEach(y,function(e,a){t.filterList.push(JSON.parse(e))})}},t.loadLiftOptions=function(e){var a=s.show({title:"Load workout to editor?",scope:t,subTitle:'Editor content will be overwritten. "Load lifts only" only pulls in the lift names, "Load sets clean" loads all sets with weights set to 0',template:"<style>.popup { width:380px !important; }</style>",buttons:[{text:"Cancel"},{text:"<b>Load</b>",type:"button-dark",onTap:function(a){l.loadLiftFromCalendar(t.filterList[e]),i.go("tab.posts"),n.$broadcast("load-calendar",{name1:t.filterList[e].name})}},{text:"<b>Load lifts only</b>",type:"button-dark",onTap:function(a){l.loadLiftFromCalendar(t.filterList[e]),l.liftsOnly(t.filterList[e]),i.go("tab.posts")}},{text:"<b>Load sets clean</b>",type:"button-dark",onTap:function(a){l.loadLiftFromCalendar(t.filterList[e]),l.wipeWeights(),i.go("tab.posts")}}]});a.then(function(t){})},e.fromTemplateUrl("modals/nav-liftselector.html",{id:"1",scope:t,backdropClickToClose:!1,animation:"slide-in-up"}).then(function(e){t.modal=e}),t.openModal=function(){t.blurFlag=!0,t.modal.show()},t.closeModal=function(e){t.newLiftModal=e,t.blurFlag=!1,t.modal.hide()},t.$on("modal.hidden",function(){return"clear"==t.newLiftModal?(t.liftName="Lift",t.filter(),void a(function(){t.$broadcast("reset-liftselect")},500)):("no change"!=t.newLiftModal&&(t.liftName=t.newLiftModal.name,(t.liftName.length<2||"Lift"==t.liftName)&&(t.liftName="Lift"),t.filter()),void a(function(){t.$broadcast("reset-liftselect")},500))})}]);