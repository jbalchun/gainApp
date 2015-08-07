var app=angular.module("MyApp.controllers",["MyApp.services","ngStorage","ngCordova","chart.js"]);app.filter("liftFilter",function(){return function(t,n){var r=new RegExp(n.attr1Pressed+n.attr2Pressed+n.attr3Pressed),e=[];if(t)for(var o=0;o<t.length;o++)r.test(t[o].attr1+t[o].attr2+t[o].attr3)&&e.push(t[o]);return e}}),app.filter("customFilter",function(){return function(t,n){var r=[];if(t){if(!n)return t;for(var e=0;e<t.length;e++)t[e].custom&&r.push(t[e])}return r}}),app.directive("takeFocus",["$timeout",function(t){return{restrict:"AC",link:function(n,r){t(function(){r[0].focus()},0)}}}]),app.directive("selectOnFocus",function(){return{restrict:"A",link:function(t,n,r){n.on("focus",function(){this.setSelectionRange(0,9999)})}}}),app.directive("selectOnClick",function(){return{restrict:"A",link:function(t,n,r){n.on("click",function(){this.setSelectionRange(0,9999)})}}}),app.directive("ngEnter",function(){return function(t,n,r){n.bind("keydown keypress",function(n){13===n.which&&(t.$apply(function(){t.$eval(r.ngEnter)}),n.preventDefault())})}}),app.controller("accordionCtrl",["$scope",function(t){t.groups=[];for(var n=0;10>n;n++){t.groups[n]={name:n,items:[]};for(var r=0;3>r;r++)t.groups[n].items.push(n+"-"+r)}t.toggleGroup=function(n){t.shownGroup=t.isGroupShown(n)?null:t.liftCards},t.isGroupShown=function(n){return t.shownGroup===n}}]);