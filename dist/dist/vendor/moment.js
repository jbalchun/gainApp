(function(e){function t(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function n(e,t){function n(){ue.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}var r=!0;return u(function(){return r&&(n(),r=!1),t.apply(this,arguments)},t)}function r(e,t){return function(n){return f(e.call(this,n),t)}}function s(e,t){return function(n){return this.lang().ordinal(e.call(this,n),t)}}function a(){}function i(e){v(e),u(this,e)}function o(e){var t=p(e),n=t.year||0,r=t.quarter||0,s=t.month||0,a=t.week||0,i=t.day||0,o=t.hour||0,u=t.minute||0,c=t.second||0,d=t.millisecond||0;this._milliseconds=+d+1e3*c+6e4*u+36e5*o,this._days=+i+7*a,this._months=+s+3*r+12*n,this._data={},this._bubble()}function u(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return t.hasOwnProperty("toString")&&(e.toString=t.toString),t.hasOwnProperty("valueOf")&&(e.valueOf=t.valueOf),e}function c(e){var t,n={};for(t in e)e.hasOwnProperty(t)&&De.hasOwnProperty(t)&&(n[t]=e[t]);return n}function d(e){return 0>e?Math.ceil(e):Math.floor(e)}function f(e,t,n){for(var r=""+Math.abs(e),s=e>=0;r.length<t;)r="0"+r;return(s?n?"+":"":"-")+r}function h(e,t,n,r){var s=t._milliseconds,a=t._days,i=t._months;r=null==r?!0:r,s&&e._d.setTime(+e._d+s*n),a&&re(e,"Date",ne(e,"Date")+a*n),i&&te(e,ne(e,"Month")+i*n),r&&ue.updateOffset(e,a||i)}function l(e){return"[object Array]"===Object.prototype.toString.call(e)}function _(e){return"[object Date]"===Object.prototype.toString.call(e)||e instanceof Date}function m(e,t,n){var r,s=Math.min(e.length,t.length),a=Math.abs(e.length-t.length),i=0;for(r=0;s>r;r++)(n&&e[r]!==t[r]||!n&&Y(e[r])!==Y(t[r]))&&i++;return i+a}function y(e){if(e){var t=e.toLowerCase().replace(/(.)s$/,"$1");e=Re[e]||Be[t]||t}return e}function p(e){var t,n,r={};for(n in e)e.hasOwnProperty(n)&&(t=y(n),t&&(r[t]=e[n]));return r}function g(t){var n,r;if(0===t.indexOf("week"))n=7,r="day";else{if(0!==t.indexOf("month"))return;n=12,r="month"}ue[t]=function(s,a){var i,o,u=ue.fn._lang[t],c=[];if("number"==typeof s&&(a=s,s=e),o=function(e){var t=ue().utc().set(r,e);return u.call(ue.fn._lang,t,s||"")},null!=a)return o(a);for(i=0;n>i;i++)c.push(o(i));return c}}function Y(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=t>=0?Math.floor(t):Math.ceil(t)),n}function w(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()}function M(e,t,n){return B(ue([e,11,31+t-n]),t,n).week}function D(e){return k(e)?366:365}function k(e){return e%4===0&&e%100!==0||e%400===0}function v(e){var t;e._a&&-2===e._pf.overflow&&(t=e._a[me]<0||e._a[me]>11?me:e._a[ye]<1||e._a[ye]>w(e._a[_e],e._a[me])?ye:e._a[pe]<0||e._a[pe]>23?pe:e._a[ge]<0||e._a[ge]>59?ge:e._a[Ye]<0||e._a[Ye]>59?Ye:e._a[we]<0||e._a[we]>999?we:-1,e._pf._overflowDayOfYear&&(_e>t||t>ye)&&(t=ye),e._pf.overflow=t)}function b(e){return null==e._isValid&&(e._isValid=!isNaN(e._d.getTime())&&e._pf.overflow<0&&!e._pf.empty&&!e._pf.invalidMonth&&!e._pf.nullInput&&!e._pf.invalidFormat&&!e._pf.userInvalidated,e._strict&&(e._isValid=e._isValid&&0===e._pf.charsLeftOver&&0===e._pf.unusedTokens.length)),e._isValid}function S(e){return e?e.toLowerCase().replace("_","-"):e}function T(e,t){return t._isUTC?ue(e).zone(t._offset||0):ue(e).local()}function O(e,t){return t.abbr=e,Me[e]||(Me[e]=new a),Me[e].set(t),Me[e]}function W(e){delete Me[e]}function G(e){var t,n,r,s,a=0,i=function(e){if(!Me[e]&&ke)try{require("./lang/"+e)}catch(t){}return Me[e]};if(!e)return ue.fn._lang;if(!l(e)){if(n=i(e))return n;e=[e]}for(;a<e.length;){for(s=S(e[a]).split("-"),t=s.length,r=S(e[a+1]),r=r?r.split("-"):null;t>0;){if(n=i(s.slice(0,t).join("-")))return n;if(r&&r.length>=t&&m(s,r,!0)>=t-1)break;t--}a++}return ue.fn._lang}function F(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function C(e){var t,n,r=e.match(Te);for(t=0,n=r.length;n>t;t++)r[t]=nt[r[t]]?nt[r[t]]:F(r[t]);return function(s){var a="";for(t=0;n>t;t++)a+=r[t]instanceof Function?r[t].call(s,e):r[t];return a}}function P(e,t){return e.isValid()?(t=U(t,e.lang()),Ke[t]||(Ke[t]=C(t)),Ke[t](e)):e.lang().invalidDate()}function U(e,t){function n(e){return t.longDateFormat(e)||e}var r=5;for(Oe.lastIndex=0;r>=0&&Oe.test(e);)e=e.replace(Oe,n),Oe.lastIndex=0,r-=1;return e}function z(e,t){var n,r=t._strict;switch(e){case"Q":return Ae;case"DDDD":return Ze;case"YYYY":case"GGGG":case"gggg":return r?Ee:Fe;case"Y":case"G":case"g":return Ne;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return r?je:Ce;case"S":if(r)return Ae;case"SS":if(r)return xe;case"SSS":if(r)return Ze;case"DDD":return Ge;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ue;case"a":case"A":return G(t._l)._meridiemParse;case"X":return He;case"Z":case"ZZ":return ze;case"T":return Le;case"SSSS":return Pe;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return r?xe:We;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return We;case"Do":return Ie;default:return n=new RegExp(j(E(e.replace("\\","")),"i"))}}function L(e){e=e||"";var t=e.match(ze)||[],n=t[t.length-1]||[],r=(n+"").match(Qe)||["-",0,0],s=+(60*r[1])+Y(r[2]);return"+"===r[0]?-s:s}function H(e,t,n){var r,s=n._a;switch(e){case"Q":null!=t&&(s[me]=3*(Y(t)-1));break;case"M":case"MM":null!=t&&(s[me]=Y(t)-1);break;case"MMM":case"MMMM":r=G(n._l).monthsParse(t),null!=r?s[me]=r:n._pf.invalidMonth=t;break;case"D":case"DD":null!=t&&(s[ye]=Y(t));break;case"Do":null!=t&&(s[ye]=Y(parseInt(t,10)));break;case"DDD":case"DDDD":null!=t&&(n._dayOfYear=Y(t));break;case"YY":s[_e]=ue.parseTwoDigitYear(t);break;case"YYYY":case"YYYYY":case"YYYYYY":s[_e]=Y(t);break;case"a":case"A":n._isPm=G(n._l).isPM(t);break;case"H":case"HH":case"h":case"hh":s[pe]=Y(t);break;case"m":case"mm":s[ge]=Y(t);break;case"s":case"ss":s[Ye]=Y(t);break;case"S":case"SS":case"SSS":case"SSSS":s[we]=Y(1e3*("0."+t));break;case"X":n._d=new Date(1e3*parseFloat(t));break;case"Z":case"ZZ":n._useUTC=!0,n._tzm=L(t);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":e=e.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":e=e.substr(0,2),t&&(n._w=n._w||{},n._w[e]=t)}}function I(e){var t,n,r,s,a,i,o,u,c,d,f=[];if(!e._d){for(r=x(e),e._w&&null==e._a[ye]&&null==e._a[me]&&(a=function(t){var n=parseInt(t,10);return t?t.length<3?n>68?1900+n:2e3+n:n:null==e._a[_e]?ue().weekYear():e._a[_e]},i=e._w,null!=i.GG||null!=i.W||null!=i.E?o=K(a(i.GG),i.W||1,i.E,4,1):(u=G(e._l),c=null!=i.d?Q(i.d,u):null!=i.e?parseInt(i.e,10)+u._week.dow:0,d=parseInt(i.w,10)||1,null!=i.d&&c<u._week.dow&&d++,o=K(a(i.gg),d,c,u._week.doy,u._week.dow)),e._a[_e]=o.year,e._dayOfYear=o.dayOfYear),e._dayOfYear&&(s=null==e._a[_e]?r[_e]:e._a[_e],e._dayOfYear>D(s)&&(e._pf._overflowDayOfYear=!0),n=J(s,0,e._dayOfYear),e._a[me]=n.getUTCMonth(),e._a[ye]=n.getUTCDate()),t=0;3>t&&null==e._a[t];++t)e._a[t]=f[t]=r[t];for(;7>t;t++)e._a[t]=f[t]=null==e._a[t]?2===t?1:0:e._a[t];f[pe]+=Y((e._tzm||0)/60),f[ge]+=Y((e._tzm||0)%60),e._d=(e._useUTC?J:$).apply(null,f)}}function A(e){var t;e._d||(t=p(e._i),e._a=[t.year,t.month,t.day,t.hour,t.minute,t.second,t.millisecond],I(e))}function x(e){var t=new Date;return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function Z(e){e._a=[],e._pf.empty=!0;var t,n,r,s,a,i=G(e._l),o=""+e._i,u=o.length,c=0;for(r=U(e._f,i).match(Te)||[],t=0;t<r.length;t++)s=r[t],n=(o.match(z(s,e))||[])[0],n&&(a=o.substr(0,o.indexOf(n)),a.length>0&&e._pf.unusedInput.push(a),o=o.slice(o.indexOf(n)+n.length),c+=n.length),nt[s]?(n?e._pf.empty=!1:e._pf.unusedTokens.push(s),H(s,n,e)):e._strict&&!n&&e._pf.unusedTokens.push(s);e._pf.charsLeftOver=u-c,o.length>0&&e._pf.unusedInput.push(o),e._isPm&&e._a[pe]<12&&(e._a[pe]+=12),e._isPm===!1&&12===e._a[pe]&&(e._a[pe]=0),I(e),v(e)}function E(e){return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,r,s){return t||n||r||s})}function j(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function N(e){var n,r,s,a,i;if(0===e._f.length)return e._pf.invalidFormat=!0,void(e._d=new Date(0/0));for(a=0;a<e._f.length;a++)i=0,n=u({},e),n._pf=t(),n._f=e._f[a],Z(n),b(n)&&(i+=n._pf.charsLeftOver,i+=10*n._pf.unusedTokens.length,n._pf.score=i,(null==s||s>i)&&(s=i,r=n));u(e,r||n)}function q(e){var t,n,r=e._i,s=qe.exec(r);if(s){for(e._pf.iso=!0,t=0,n=$e.length;n>t;t++)if($e[t][1].exec(r)){e._f=$e[t][0]+(s[6]||" ");break}for(t=0,n=Je.length;n>t;t++)if(Je[t][1].exec(r)){e._f+=Je[t][0];break}r.match(ze)&&(e._f+="Z"),Z(e)}else ue.createFromInputFallback(e)}function V(t){var n=t._i,r=ve.exec(n);n===e?t._d=new Date:r?t._d=new Date(+r[1]):"string"==typeof n?q(t):l(n)?(t._a=n.slice(0),I(t)):_(n)?t._d=new Date(+n):"object"==typeof n?A(t):"number"==typeof n?t._d=new Date(n):ue.createFromInputFallback(t)}function $(e,t,n,r,s,a,i){var o=new Date(e,t,n,r,s,a,i);return 1970>e&&o.setFullYear(e),o}function J(e){var t=new Date(Date.UTC.apply(null,arguments));return 1970>e&&t.setUTCFullYear(e),t}function Q(e,t){if("string"==typeof e)if(isNaN(e)){if(e=t.weekdaysParse(e),"number"!=typeof e)return null}else e=parseInt(e,10);return e}function X(e,t,n,r,s){return s.relativeTime(t||1,!!n,e,r)}function R(e,t,n){var r=le(Math.abs(e)/1e3),s=le(r/60),a=le(s/60),i=le(a/24),o=le(i/365),u=45>r&&["s",r]||1===s&&["m"]||45>s&&["mm",s]||1===a&&["h"]||22>a&&["hh",a]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",le(i/30)]||1===o&&["y"]||["yy",o];return u[2]=t,u[3]=e>0,u[4]=n,X.apply({},u)}function B(e,t,n){var r,s=n-t,a=n-e.day();return a>s&&(a-=7),s-7>a&&(a+=7),r=ue(e).add("d",a),{week:Math.ceil(r.dayOfYear()/7),year:r.year()}}function K(e,t,n,r,s){var a,i,o=J(e,0,1).getUTCDay();return n=null!=n?n:s,a=s-o+(o>r?7:0)-(s>o?7:0),i=7*(t-1)+(n-s)+a+1,{year:i>0?e:e-1,dayOfYear:i>0?i:D(e-1)+i}}function ee(t){var n=t._i,r=t._f;return null===n||r===e&&""===n?ue.invalid({nullInput:!0}):("string"==typeof n&&(t._i=n=G().preparse(n)),ue.isMoment(n)?(t=c(n),t._d=new Date(+n._d)):r?l(r)?N(t):Z(t):V(t),new i(t))}function te(e,t){var n;return"string"==typeof t&&(t=e.lang().monthsParse(t),"number"!=typeof t)?e:(n=Math.min(e.date(),w(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e)}function ne(e,t){return e._d["get"+(e._isUTC?"UTC":"")+t]()}function re(e,t,n){return"Month"===t?te(e,n):e._d["set"+(e._isUTC?"UTC":"")+t](n)}function se(e,t){return function(n){return null!=n?(re(this,e,n),ue.updateOffset(this,t),this):ne(this,e)}}function ae(e){ue.duration.fn[e]=function(){return this._data[e]}}function ie(e,t){ue.duration.fn["as"+e]=function(){return+this/t}}function oe(e){"undefined"==typeof ender&&(ce=he.moment,he.moment=e?n("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",ue):ue)}for(var ue,ce,de,fe="2.6.0",he="undefined"!=typeof global?global:this,le=Math.round,_e=0,me=1,ye=2,pe=3,ge=4,Ye=5,we=6,Me={},De={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},ke="undefined"!=typeof module&&module.exports,ve=/^\/?Date\((\-?\d+)/i,be=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Se=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Te=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,Oe=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,We=/\d\d?/,Ge=/\d{1,3}/,Fe=/\d{1,4}/,Ce=/[+\-]?\d{1,6}/,Pe=/\d+/,Ue=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,ze=/Z|[\+\-]\d\d:?\d\d/gi,Le=/T/i,He=/[\+\-]?\d+(\.\d{1,3})?/,Ie=/\d{1,2}/,Ae=/\d/,xe=/\d\d/,Ze=/\d{3}/,Ee=/\d{4}/,je=/[+-]?\d{6}/,Ne=/[+-]?\d+/,qe=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ve="YYYY-MM-DDTHH:mm:ssZ",$e=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Je=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Qe=/([\+\-]|\d\d)/gi,Xe=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),Re={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},Be={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},Ke={},et="DDD w W M D d".split(" "),tt="M D H h m s w W".split(" "),nt={M:function(){return this.month()+1},MMM:function(e){return this.lang().monthsShort(this,e)},MMMM:function(e){return this.lang().months(this,e)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(e){return this.lang().weekdaysMin(this,e)},ddd:function(e){return this.lang().weekdaysShort(this,e)},dddd:function(e){return this.lang().weekdays(this,e)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return f(this.year()%100,2)},YYYY:function(){return f(this.year(),4)},YYYYY:function(){return f(this.year(),5)},YYYYYY:function(){var e=this.year(),t=e>=0?"+":"-";return t+f(Math.abs(e),6)},gg:function(){return f(this.weekYear()%100,2)},gggg:function(){return f(this.weekYear(),4)},ggggg:function(){return f(this.weekYear(),5)},GG:function(){return f(this.isoWeekYear()%100,2)},GGGG:function(){return f(this.isoWeekYear(),4)},GGGGG:function(){return f(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return Y(this.milliseconds()/100)},SS:function(){return f(Y(this.milliseconds()/10),2)},SSS:function(){return f(this.milliseconds(),3)},SSSS:function(){return f(this.milliseconds(),3)},Z:function(){var e=-this.zone(),t="+";return 0>e&&(e=-e,t="-"),t+f(Y(e/60),2)+":"+f(Y(e)%60,2)},ZZ:function(){var e=-this.zone(),t="+";return 0>e&&(e=-e,t="-"),t+f(Y(e/60),2)+f(Y(e)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},rt=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];et.length;)de=et.pop(),nt[de+"o"]=s(nt[de],de);for(;tt.length;)de=tt.pop(),nt[de+de]=r(nt[de],2);for(nt.DDDD=r(nt.DDD,3),u(a.prototype,{set:function(e){var t,n;for(n in e)t=e[n],"function"==typeof t?this[n]=t:this["_"+n]=t},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(e){return this._months[e.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(e){return this._monthsShort[e.month()]},monthsParse:function(e){var t,n,r;for(this._monthsParse||(this._monthsParse=[]),t=0;12>t;t++)if(this._monthsParse[t]||(n=ue.utc([2e3,t]),r="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[t]=new RegExp(r.replace(".",""),"i")),this._monthsParse[t].test(e))return t},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(e){return this._weekdays[e.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(e){return this._weekdaysShort[e.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(e){return this._weekdaysMin[e.day()]},weekdaysParse:function(e){var t,n,r;for(this._weekdaysParse||(this._weekdaysParse=[]),t=0;7>t;t++)if(this._weekdaysParse[t]||(n=ue([2e3,1]).day(t),r="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[t]=new RegExp(r.replace(".",""),"i")),this._weekdaysParse[t].test(e))return t},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(e){var t=this._longDateFormat[e];return!t&&this._longDateFormat[e.toUpperCase()]&&(t=this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e]=t),t},isPM:function(e){return"p"===(e+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(e,t){var n=this._calendar[e];return"function"==typeof n?n.apply(t):n},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(e,t,n,r){var s=this._relativeTime[n];return"function"==typeof s?s(e,t,n,r):s.replace(/%d/i,e)},pastFuture:function(e,t){var n=this._relativeTime[e>0?"future":"past"];return"function"==typeof n?n(t):n.replace(/%s/i,t)},ordinal:function(e){return this._ordinal.replace("%d",e)},_ordinal:"%d",preparse:function(e){return e},postformat:function(e){return e},week:function(e){return B(e,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),ue=function(n,r,s,a){var i;return"boolean"==typeof s&&(a=s,s=e),i={},i._isAMomentObject=!0,i._i=n,i._f=r,i._l=s,i._strict=a,i._isUTC=!1,i._pf=t(),ee(i)},ue.suppressDeprecationWarnings=!1,ue.createFromInputFallback=n("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(e){e._d=new Date(e._i)}),ue.utc=function(n,r,s,a){var i;return"boolean"==typeof s&&(a=s,s=e),i={},i._isAMomentObject=!0,i._useUTC=!0,i._isUTC=!0,i._l=s,i._i=n,i._f=r,i._strict=a,i._pf=t(),ee(i).utc()},ue.unix=function(e){return ue(1e3*e)},ue.duration=function(e,t){var n,r,s,a=e,i=null;return ue.isDuration(e)?a={ms:e._milliseconds,d:e._days,M:e._months}:"number"==typeof e?(a={},t?a[t]=e:a.milliseconds=e):(i=be.exec(e))?(n="-"===i[1]?-1:1,a={y:0,d:Y(i[ye])*n,h:Y(i[pe])*n,m:Y(i[ge])*n,s:Y(i[Ye])*n,ms:Y(i[we])*n}):(i=Se.exec(e))&&(n="-"===i[1]?-1:1,s=function(e){var t=e&&parseFloat(e.replace(",","."));return(isNaN(t)?0:t)*n},a={y:s(i[2]),M:s(i[3]),d:s(i[4]),h:s(i[5]),m:s(i[6]),s:s(i[7]),w:s(i[8])}),r=new o(a),ue.isDuration(e)&&e.hasOwnProperty("_lang")&&(r._lang=e._lang),r},ue.version=fe,ue.defaultFormat=Ve,ue.momentProperties=De,ue.updateOffset=function(){},ue.lang=function(e,t){var n;return e?(t?O(S(e),t):null===t?(W(e),e="en"):Me[e]||G(e),n=ue.duration.fn._lang=ue.fn._lang=G(e),n._abbr):ue.fn._lang._abbr},ue.langData=function(e){return e&&e._lang&&e._lang._abbr&&(e=e._lang._abbr),G(e)},ue.isMoment=function(e){return e instanceof i||null!=e&&e.hasOwnProperty("_isAMomentObject")},ue.isDuration=function(e){return e instanceof o},de=rt.length-1;de>=0;--de)g(rt[de]);ue.normalizeUnits=function(e){return y(e)},ue.invalid=function(e){var t=ue.utc(0/0);return null!=e?u(t._pf,e):t._pf.userInvalidated=!0,t},ue.parseZone=function(){return ue.apply(null,arguments).parseZone()},ue.parseTwoDigitYear=function(e){return Y(e)+(Y(e)>68?1900:2e3)},u(ue.fn=i.prototype,{clone:function(){return ue(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var e=ue(this).utc();return 0<e.year()&&e.year()<=9999?P(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):P(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var e=this;return[e.year(),e.month(),e.date(),e.hours(),e.minutes(),e.seconds(),e.milliseconds()]},isValid:function(){return b(this)},isDSTShifted:function(){return this._a?this.isValid()&&m(this._a,(this._isUTC?ue.utc(this._a):ue(this._a)).toArray())>0:!1},parsingFlags:function(){return u({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(e){var t=P(this,e||ue.defaultFormat);return this.lang().postformat(t)},add:function(e,t){var n;return n="string"==typeof e?ue.duration(+t,e):ue.duration(e,t),h(this,n,1),this},subtract:function(e,t){var n;return n="string"==typeof e?ue.duration(+t,e):ue.duration(e,t),h(this,n,-1),this},diff:function(e,t,n){var r,s,a=T(e,this),i=6e4*(this.zone()-a.zone());return t=y(t),"year"===t||"month"===t?(r=432e5*(this.daysInMonth()+a.daysInMonth()),s=12*(this.year()-a.year())+(this.month()-a.month()),s+=(this-ue(this).startOf("month")-(a-ue(a).startOf("month")))/r,s-=6e4*(this.zone()-ue(this).startOf("month").zone()-(a.zone()-ue(a).startOf("month").zone()))/r,"year"===t&&(s/=12)):(r=this-a,s="second"===t?r/1e3:"minute"===t?r/6e4:"hour"===t?r/36e5:"day"===t?(r-i)/864e5:"week"===t?(r-i)/6048e5:r),n?s:d(s)},from:function(e,t){return ue.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)},fromNow:function(e){return this.from(ue(),e)},calendar:function(){var e=T(ue(),this).startOf("day"),t=this.diff(e,"days",!0),n=-6>t?"sameElse":-1>t?"lastWeek":0>t?"lastDay":1>t?"sameDay":2>t?"nextDay":7>t?"nextWeek":"sameElse";return this.format(this.lang().calendar(n,this))},isLeapYear:function(){return k(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=Q(e,this.lang()),this.add({d:e-t})):t},month:se("Month",!0),startOf:function(e){switch(e=y(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e?this.weekday(0):"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(e){return e=y(e),this.startOf(e).add("isoWeek"===e?"week":e,1).subtract("ms",1)},isAfter:function(e,t){return t="undefined"!=typeof t?t:"millisecond",+this.clone().startOf(t)>+ue(e).startOf(t)},isBefore:function(e,t){return t="undefined"!=typeof t?t:"millisecond",+this.clone().startOf(t)<+ue(e).startOf(t)},isSame:function(e,t){return t=t||"ms",+this.clone().startOf(t)===+T(e,this).startOf(t)},min:function(e){return e=ue.apply(null,arguments),this>e?this:e},max:function(e){return e=ue.apply(null,arguments),e>this?this:e},zone:function(e,t){var n=this._offset||0;return null==e?this._isUTC?n:this._d.getTimezoneOffset():("string"==typeof e&&(e=L(e)),Math.abs(e)<16&&(e=60*e),this._offset=e,this._isUTC=!0,n!==e&&(!t||this._changeInProgress?h(this,ue.duration(n-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,ue.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(e){return e=e?ue(e).zone():0,(this.zone()-e)%60===0},daysInMonth:function(){return w(this.year(),this.month())},dayOfYear:function(e){var t=le((ue(this).startOf("day")-ue(this).startOf("year"))/864e5)+1;return null==e?t:this.add("d",e-t)},quarter:function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},weekYear:function(e){var t=B(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==e?t:this.add("y",e-t)},isoWeekYear:function(e){var t=B(this,1,4).year;return null==e?t:this.add("y",e-t)},week:function(e){var t=this.lang().week(this);return null==e?t:this.add("d",7*(e-t))},isoWeek:function(e){var t=B(this,1,4).week;return null==e?t:this.add("d",7*(e-t))},weekday:function(e){var t=(this.day()+7-this.lang()._week.dow)%7;return null==e?t:this.add("d",e-t)},isoWeekday:function(e){return null==e?this.day()||7:this.day(this.day()%7?e:e-7)},isoWeeksInYear:function(){return M(this.year(),1,4)},weeksInYear:function(){var e=this._lang._week;return M(this.year(),e.dow,e.doy)},get:function(e){return e=y(e),this[e]()},set:function(e,t){return e=y(e),"function"==typeof this[e]&&this[e](t),this},lang:function(t){return t===e?this._lang:(this._lang=G(t),this)}}),ue.fn.millisecond=ue.fn.milliseconds=se("Milliseconds",!1),ue.fn.second=ue.fn.seconds=se("Seconds",!1),ue.fn.minute=ue.fn.minutes=se("Minutes",!1),ue.fn.hour=ue.fn.hours=se("Hours",!0),ue.fn.date=se("Date",!0),ue.fn.dates=n("dates accessor is deprecated. Use date instead.",se("Date",!0)),ue.fn.year=se("FullYear",!0),ue.fn.years=n("years accessor is deprecated. Use year instead.",se("FullYear",!0)),ue.fn.days=ue.fn.day,ue.fn.months=ue.fn.month,ue.fn.weeks=ue.fn.week,ue.fn.isoWeeks=ue.fn.isoWeek,ue.fn.quarters=ue.fn.quarter,ue.fn.toJSON=ue.fn.toISOString,u(ue.duration.fn=o.prototype,{_bubble:function(){var e,t,n,r,s=this._milliseconds,a=this._days,i=this._months,o=this._data;o.milliseconds=s%1e3,e=d(s/1e3),o.seconds=e%60,t=d(e/60),o.minutes=t%60,n=d(t/60),o.hours=n%24,a+=d(n/24),o.days=a%30,i+=d(a/30),o.months=i%12,r=d(i/12),o.years=r},weeks:function(){return d(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*Y(this._months/12)},humanize:function(e){var t=+this,n=R(t,!e,this.lang());return e&&(n=this.lang().pastFuture(t,n)),this.lang().postformat(n)},add:function(e,t){var n=ue.duration(e,t);return this._milliseconds+=n._milliseconds,this._days+=n._days,this._months+=n._months,this._bubble(),this},subtract:function(e,t){var n=ue.duration(e,t);return this._milliseconds-=n._milliseconds,this._days-=n._days,this._months-=n._months,this._bubble(),this},get:function(e){return e=y(e),this[e.toLowerCase()+"s"]()},as:function(e){return e=y(e),this["as"+e.charAt(0).toUpperCase()+e.slice(1)+"s"]()},lang:ue.fn.lang,toIsoString:function(){var e=Math.abs(this.years()),t=Math.abs(this.months()),n=Math.abs(this.days()),r=Math.abs(this.hours()),s=Math.abs(this.minutes()),a=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(e?e+"Y":"")+(t?t+"M":"")+(n?n+"D":"")+(r||s||a?"T":"")+(r?r+"H":"")+(s?s+"M":"")+(a?a+"S":""):"P0D"}});for(de in Xe)Xe.hasOwnProperty(de)&&(ie(de,Xe[de]),ae(de.toLowerCase()));ie("Weeks",6048e5),ue.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},ue.lang("en",{ordinal:function(e){var t=e%10,n=1===Y(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),ke?module.exports=ue:"function"==typeof define&&define.amd?(define("moment",function(e,t,n){return n.config&&n.config()&&n.config().noGlobal===!0&&(he.moment=ce),ue}),oe(!0)):oe()}).call(this);