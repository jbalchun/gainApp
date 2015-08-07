"use strict";function inherit(r,n){return extend(new(extend(function(){},{prototype:r})),n)}function merge(r){return forEach(arguments,function(n){n!==r&&forEach(n,function(n,t){r.hasOwnProperty(t)||(r[t]=n)})}),r}function ancestors(r,n){var t=[];for(var e in r.path){if(r.path[e]!==n.path[e])break;t.push(r.path[e])}return t}function objectKeys(r){if(Object.keys)return Object.keys(r);var n=[];return angular.forEach(r,function(r,t){n.push(t)}),n}function indexOf(r,n){if(Array.prototype.indexOf)return r.indexOf(n,Number(arguments[2])||0);var t=r.length>>>0,e=Number(arguments[2])||0;for(e=0>e?Math.ceil(e):Math.floor(e),0>e&&(e+=t);t>e;e++)if(e in r&&r[e]===n)return e;return-1}function inheritParams(r,n,t,e){var u,a=ancestors(t,e),o={},i=[];for(var c in a)if(a[c].params&&(u=objectKeys(a[c].params),u.length))for(var f in u)indexOf(i,u[f])>=0||(i.push(u[f]),o[u[f]]=r[u[f]]);return extend({},o,n)}function equalForKeys(r,n,t){if(!t){t=[];for(var e in r)t.push(e)}for(var u=0;u<t.length;u++){var a=t[u];if(r[a]!=n[a])return!1}return!0}function filterByKeys(r,n){var t={};return forEach(r,function(r){t[r]=n[r]}),t}function indexBy(r,n){var t={};return forEach(r,function(r){t[r[n]]=r}),t}function pick(r){var n={},t=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));return forEach(t,function(t){t in r&&(n[t]=r[t])}),n}function omit(r){var n={},t=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var e in r)-1==indexOf(t,e)&&(n[e]=r[e]);return n}function pluck(r,n){var t=isArray(r)?[]:{};return forEach(r,function(r,e){t[e]=isFunction(n)?n(r):r[n]}),t}function filter(r,n){var t=isArray(r),e=t?[]:{};return forEach(r,function(r,u){n(r,u)&&(e[t?e.length:u]=r)}),e}function map(r,n){var t=isArray(r)?[]:{};return forEach(r,function(r,e){t[e]=n(r,e)}),t}var isDefined=angular.isDefined,isFunction=angular.isFunction,isString=angular.isString,isObject=angular.isObject,isArray=angular.isArray,forEach=angular.forEach,extend=angular.extend,copy=angular.copy;angular.module("ui.router.util",["ng"]),angular.module("ui.router.router",["ui.router.util"]),angular.module("ui.router.state",["ui.router.router","ui.router.util"]),angular.module("ui.router",["ui.router.state"]),angular.module("ui.router.compat",["ui.router"]);