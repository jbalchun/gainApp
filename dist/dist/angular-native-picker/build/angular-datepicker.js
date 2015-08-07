!function(e){"function"==typeof define&&define.amd?define("picker",["angular"],e):this.Picker=e(angular)}(function(e){function t(e,i,r,o){function s(){return t._.node("div",t._.node("div",t._.node("div",t._.node("div",v.component.nodes(f.open),m.box),m.wrap),m.frame),m.holder)}function l(){h.data(i,v),h.addClass(m.input),h[0].value=h.attr("data-value")?v.get("select",p.format):e.value,angular.element(document.querySelectorAll("#"+f.id)).on("focus",d),angular.element(document.querySelectorAll("#"+f.id)).on("click",d),p.editable||angular.element(document.querySelectorAll("#"+f.id)).on("keydown",function(e){var t=e.keyCode,n=/^(8|46)$/.test(t);return 27==t?(v.close(),!1):void((32==t||n||!f.open&&v.component.key[t])&&(e.preventDefault(),e.stopPropagation(),n?v.clear().close():v.open()))}),n(e,{haspopup:!0,expanded:!1,readonly:!1,owns:e.id+"_root"+(v._hidden?" "+v._hidden.id:"")})}function c(){function i(){angular.element(v.$root[0].querySelectorAll("[data-pick], [data-nav], [data-clear]")).on("click",function(){var n=angular.element(this),r=n.hasClass(m.navDisabled)||n.hasClass(m.disabled),a=document.activeElement;a=a&&(a.type||a.href)&&a,(r||a&&!v.$root[0].contains(a))&&e.focus(),n.attr("data-nav")&&!r?(v.set("highlight",v.component.item.highlight,{nav:parseInt(n.attr("data-nav"))}),i()):t._.isInteger(parseInt(n.attr("data-pick")))&&!r?(v.set("select",parseInt(n.attr("data-pick"))).close(!0),i()):n.attr("data-clear")&&(v.clear().close(!0),i())})}v.$root.on("focusin",function(e){v.$root.removeClass(m.focused),n(v.$root[0],"selected",!1),e.stopPropagation()}),v.$root.on("mousedown click",function(t){var n=t.target;n!=v.$root.children()[0]&&(t.stopPropagation(),"mousedown"==t.type&&"input"!==angular.element(n)[0].tagName&&"OPTION"!=n.nodeName&&(t.preventDefault(),e.focus()))}),i(),n(v.$root[0],"hidden",!0)}function u(){var t=["string"==typeof p.hiddenPrefix?p.hiddenPrefix:"","string"==typeof p.hiddenSuffix?p.hiddenSuffix:"_submit"];v._hidden=angular.element('<input type=hidden name="'+t[0]+e.name+t[1]+'"id="'+t[0]+e.id+t[1]+'"'+(h.attr("data-value")||e.value?' value="'+v.get("select",p.formatSubmit)+'"':"")+">")[0],h.on("change."+f.id,function(){v._hidden.value=e.value?v.get("select",p.formatSubmit):""}).after(v._hidden)}function d(e){e.stopPropagation(),"focus"==e.type&&(v.$root.addClass(m.focused),n(v.$root[0],"selected",!0)),v.open()}if(!e)return t;var p;r?(p=r.defaults,angular.extend(p,o)):p=o||{};var m=t.klasses();angular.extend(m,p.klass);var f={id:e.id||"P"+Math.abs(~~(Math.random()*new Date))},h=angular.element(e),g=function(){return this.start()},v=g.prototype={constructor:g,$node:h,start:function(){return f&&f.start?v:(f.methods={},f.start=!0,f.open=!1,f.type=e.type,e.autofocus=e==document.activeElement,e.type="text",e.readOnly=!p.editable,e.id=e.id||f.id,v.component=new r(v,p),v.$root=angular.element(t._.node("div",s(),m.picker,'id="'+e.id+'_root"')),c(),p.formatSubmit&&u(),l(),p.container?angular.element(p.container).append(v.$root):h.after(v.$root),v.on({start:v.component.onStart,render:v.component.onRender,stop:v.component.onStop,open:v.component.onOpen,close:v.component.onClose,set:v.component.onSet}).on({start:p.onStart,render:p.onRender,stop:p.onStop,open:p.onOpen,close:p.onClose,set:p.onSet}),e.autofocus&&v.open(),v.trigger("start").trigger("render"))},render:function(e){return e?v.$root.html(s()):angular.element(v.$root[0].querySelectorAll("."+m.box)).html(v.component.nodes(f.open)),v.trigger("render")},stop:function(){return f.start?(v.close(),v._hidden&&v._hidden.parentNode.removeChild(v._hidden),v.$root.remove(),h.removeClass(m.input).removeData(i),setTimeout(function(){h.off("."+f.id)},0),e.type=f.type,e.readOnly=!1,v.trigger("stop"),f.methods={},f.start=!1,v):v},open:function(i){return f.open?v:(h.addClass(m.active),n(e,"expanded",!0),v.$root.addClass(m.opened),n(v.$root[0],"hidden",!1),i!==!1&&(f.open=!0,h.triggerHandler("focus"),angular.element(document.querySelectorAll("#"+f.id)).on("click focusin",function(t){var n=t.target;n!=e&&n!=document&&3!=t.which&&v.close(n===v.$root.children()[0])}),angular.element(document.querySelectorAll("#"+f.id)).on("keydown",function(n){var i=n.keyCode,r=v.component.key[i],a=n.target;27==i?v.close(!0):a!=e||!r&&13!=i?v.$root[0].contains(a)&&13==i&&(n.preventDefault(),a.click()):(n.preventDefault(),r?t._.trigger(v.component.key.go,v,[t._.trigger(r)]):angular.element(v.$root[0].querySelectorAll("."+m.highlighted)).hasClass(m.disabled)||v.set("select",v.component.item.highlight).close())})),v.trigger("open"))},close:function(t){return t&&(h.off("focus."+f.id),h.triggerHandler("focus"),setTimeout(function(){angular.element(document.querySelectorAll("#"+f.id)).on("focus",d)},0)),h.removeClass(m.active),n(e,"expanded",!1),v.$root.removeClass(m.opened+" "+m.focused),n(v.$root[0],"hidden",!0),n(v.$root[0],"selected",!1),f.open?(setTimeout(function(){f.open=!1},1e3),a.off("."+f.id),v.trigger("close")):v},clear:function(){return v.set("clear")},set:function(e,t,n){var i,r,a=angular.isObject(e),o=a?e:{};if(n=a&&angular.isObject(t)?t:n||{},e){a||(o[e]=t);for(i in o)r=o[i],i in v.component.item&&v.component.set(i,r,n),("select"==i||"clear"==i)&&(h[0].value="clear"==i?"":v.get(i,p.format),h.triggerHandler("change"));v.render()}return n.muted?v:v.trigger("set",o)},get:function(n,i){return n=n||"value",null!=f[n]?f[n]:"value"==n?e.value:n in v.component.item?"string"==typeof i?t._.trigger(v.component.formats.toString,v.component,[i,v.component.get(n)]):v.component.get(n):void 0},on:function(e,t){var n,i,r=angular.isObject(e),a=r?e:{};if(e){r||(a[e]=t);for(n in a)i=a[n],f.methods[n]=f.methods[n]||[],f.methods[n].push(i)}return v},off:function(){var e,t,n=arguments;for(e=0,namesCount=n.length;namesCount>e;e+=1)t=n[e],t in f.methods&&delete f.methods[t];return v},trigger:function(e,n){var i=f.methods[e];return i&&i.map(function(e){t._.trigger(e,v,[n])}),v}};return new g}function n(e,t,n){if(angular.isObject(t))for(var r in t)i(e,r,t[r]);else i(e,t,n)}function i(e,t,n){angular.element(e).attr(("role"==t?"":"aria-")+t,n)}function r(e,t){angular.isObject(e)||(e={attribute:t}),t="";for(var n in e){var i=("role"==n?"":"aria-")+n,r=e[n];t+=null==r?"":i+'="'+e[n]+'"'}return t}var a=angular.element(document);return t.klasses=function(e){return e=e||"picker",{picker:e,opened:e+"--opened",focused:e+"--focused",input:e+"__input",active:e+"__input--active",holder:e+"__holder",frame:e+"__frame",wrap:e+"__wrap",box:e+"__box"}},t._={group:function(e){for(var n,i="",r=t._.trigger(e.min,e);r<=t._.trigger(e.max,e,[r]);r+=e.i)n=t._.trigger(e.item,e,[r]),i+=t._.node(e.node,n[0],n[1],n[2]);return i},node:function(t,n,i,r){return n?(n=e.isArray(n)?n.join(""):n,i=i?' class="'+i+'"':"",r=r?" "+r:"","<"+t+i+r+">"+n+"</"+t+">"):""},lead:function(e){return(10>e?"0":"")+e},trigger:function(e,t,n){return"function"==typeof e?e.apply(t,n||[]):e},digits:function(e){return/\d/.test(e[1])?2:1},isDate:function(e){return{}.toString.call(e).indexOf("Date")>-1&&this.isInteger(e.getDate())},isInteger:function(e){return{}.toString.call(e).indexOf("Number")>-1&&e%1===0},ariaAttr:r},t.extend=function(e,n){angular.element.prototype[e]=function(i,r){var a=this.data(e);if("picker"==i)return a;if(a&&"string"==typeof i)return t._.trigger(a[i],a,[r]),this;for(var o=0;o<this.length;o++){var s=angular.element(this[o]);s.data(e)||new t(s[0],e,n,i)}},angular.element.prototype[e].defaults=n.defaults},t}),!function(e){"function"==typeof define&&define.amd?define(["picker","angular"],e):e(Picker,angular)}(function(e,t){function n(e,n){var i=this,r=e.$node[0].value,a=e.$node.attr("data-value"),o=a||r,s=a?n.formatSubmit:n.format,l=function(){return"rtl"===getComputedStyle(e.$root[0]).direction};i.settings=n,i.$node=e.$node,i.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},i.item={},i.item.disable=(n.disable||[]).slice(0),i.item.enable=-function(e){return e[0]===!0?e.shift():-1}(i.item.disable),i.set("min",n.min).set("max",n.max).set("now"),o?i.set("select",o,{format:s,fromValue:!!r}):i.set("select",null).set("highlight",i.item.now),i.key={40:7,38:-7,39:function(){return l()?-1:1},37:function(){return l()?1:-1},go:function(e){var t=i.item.highlight,n=new Date(t.year,t.month,t.date+e);i.set("highlight",[n.getFullYear(),n.getMonth(),n.getDate()],{interval:e}),this.render()}},e.on("render",function(){t.element(e.$root[0].querySelectorAll("."+n.klass.selectMonth)).on("change",function(){var i=this.value;i&&(e.set("highlight",[e.get("view").year,i,e.get("highlight").date]),t.element(e.$root[0].querySelectorAll("."+n.klass.selectMonth)).triggerHandler("focus"))}),t.element(e.$root[0].querySelectorAll("."+n.klass.selectYear)).on("change",function(){var i=this.value;i&&(e.set("highlight",[i,e.get("view").month,e.get("highlight").date]),t.element(e.$root[0].querySelectorAll("."+n.klass.selectYear)).triggerHandler("focus"))})}).on("open",function(){t.element(e.$root[0].querySelectorAll("button, select")).attr("disabled",!1)}).on("close",function(){t.element(e.$root[0].querySelectorAll("button, select")).attr("disabled",!0)})}var i=7,r=6,a=e._;n.prototype.set=function(e,t,n){var i=this,r=i.item;return null===t?(r[e]=t,i):(r["enable"==e?"disable":"flip"==e?"enable":e]=i.queue[e].split(" ").map(function(r){return t=i[r](e,t,n)}).pop(),"select"==e?i.set("highlight",r.select,n):"highlight"==e?i.set("view",r.highlight,n):e.match(/^(flip|min|max|disable|enable)$/)&&(r.select&&i.disabled(r.select)&&i.set("select",r.select,n),r.highlight&&i.disabled(r.highlight)&&i.set("highlight",r.highlight,n)),i)},n.prototype.get=function(e){return this.item[e]},n.prototype.create=function(e,n,i){var r,o=this;return n=void 0===n?e:n,n==-1/0||1/0==n?r=n:t.isObject(n)&&a.isInteger(n.pick)?n=n.obj:t.isArray(n)?(n=new Date(n[0],n[1],n[2]),n=a.isDate(n)?n:o.create().obj):n=a.isInteger(n)||a.isDate(n)?o.normalize(new Date(n),i):o.now(e,n,i),{year:r||n.getFullYear(),month:r||n.getMonth(),date:r||n.getDate(),day:r||n.getDay(),obj:r||n,pick:r||n.getTime()}},n.prototype.createRange=function(e,n){var i=this,r=function(e){return e===!0||t.isArray(e)||a.isDate(e)?i.create(e):e};return a.isInteger(e)||(e=r(e)),a.isInteger(n)||(n=r(n)),a.isInteger(e)&&t.isObject(n)?e=[n.year,n.month,n.date+e]:a.isInteger(n)&&t.isObject(e)&&(n=[e.year,e.month,e.date+n]),{from:r(e),to:r(n)}},n.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},n.prototype.overlapRanges=function(e,t){var n=this;return e=n.createRange(e.from,e.to),t=n.createRange(t.from,t.to),n.withinRange(e,t.from)||n.withinRange(e,t.to)||n.withinRange(t,e.from)||n.withinRange(t,e.to)},n.prototype.now=function(e,t,n){return t=new Date,n&&n.rel&&t.setDate(t.getDate()+n.rel),this.normalize(t,n)},n.prototype.navigate=function(e,n,i){var r,a,o,s,l=t.isArray(n),c=t.isObject(n),u=this.item.view;if(l||c){for(c?(a=n.year,o=n.month,s=n.date):(a=+n[0],o=+n[1],s=+n[2]),i&&i.nav&&u&&u.month!==o&&(a=u.year,o=u.month),r=new Date(a,o+(i&&i.nav?i.nav:0),1),a=r.getFullYear(),o=r.getMonth();new Date(a,o,s).getMonth()!==o;)s-=1;n=[a,o,s]}return n},n.prototype.normalize=function(e){return e.setHours(0,0,0,0),e},n.prototype.measure=function(e,t){var n=this;return t?a.isInteger(t)&&(t=n.now(e,t,{rel:t})):t="min"==e?-1/0:1/0,t},n.prototype.viewset=function(e,t){return this.create([t.year,t.month,1])},n.prototype.validate=function(e,n,i){var r,o,s,l,c=this,u=n,d=i&&i.interval?i.interval:1,p=-1===c.item.enable,m=c.item.min,f=c.item.max,h=p&&c.item.disable.filter(function(e){if(t.isArray(e)){var i=c.create(e).pick;i<n.pick?r=!0:i>n.pick&&(o=!0)}return a.isInteger(e)}).length;if((!i||!i.nav)&&(!p&&c.disabled(n)||p&&c.disabled(n)&&(h||r||o)||!p&&(n.pick<=m.pick||n.pick>=f.pick)))for(p&&!h&&(!o&&d>0||!r&&0>d)&&(d*=-1);c.disabled(n)&&(Math.abs(d)>1&&(n.month<u.month||n.month>u.month)&&(n=u,d=d>0?1:-1),n.pick<=m.pick?(s=!0,d=1,n=c.create([m.year,m.month,m.date-1])):n.pick>=f.pick&&(l=!0,d=-1,n=c.create([f.year,f.month,f.date+1])),!s||!l);)n=c.create([n.year,n.month,n.date+d]);return n},n.prototype.disabled=function(e){var n=this,i=n.item.disable.filter(function(i){return a.isInteger(i)?e.day===(n.settings.firstDay?i:i-1)%7:t.isArray(i)||a.isDate(i)?e.pick===n.create(i).pick:t.isObject(i)?n.withinRange(i,e):void 0});return i=i.length&&!i.filter(function(e){return t.isArray(e)&&"inverted"==e[3]||t.isObject(e)&&e.inverted}).length,-1===n.item.enable?!i:i||e.pick<n.item.min.pick||e.pick>n.item.max.pick},n.prototype.parse=function(e,n,i){var r,o=this,s={};return!n||a.isInteger(n)||t.isArray(n)||a.isDate(n)||t.isObject(n)&&a.isInteger(n.pick)?n:(i&&i.format||(i=i||{},i.format=o.settings.format),r="string"!=typeof n||i.fromValue?0:1,o.formats.toArray(i.format).map(function(e){var t=o.formats[e],i=t?a.trigger(t,o,[n,s]):e.replace(/^!/,"").length;t&&(s[e]=n.substr(0,i)),n=n.substr(i)}),[s.yyyy||s.yy,+(s.mm||s.m)-r,s.dd||s.d])},n.prototype.formats=function(){function e(e,t,n){var i=e.match(/\w+/)[0];return n.mm||n.m||(n.m=t.indexOf(i)),i.length}function t(e){return e.match(/\w+/)[0].length}return{d:function(e,t){return e?a.digits(e):t.date},dd:function(e,t){return e?2:a.lead(t.date)},ddd:function(e,n){return e?t(e):this.settings.weekdaysShort[n.day]},dddd:function(e,n){return e?t(e):this.settings.weekdaysFull[n.day]},m:function(e,t){return e?a.digits(e):t.month+1},mm:function(e,t){return e?2:a.lead(t.month+1)},mmm:function(t,n){var i=this.settings.monthsShort;return t?e(t,i,n):i[n.month]},mmmm:function(t,n){var i=this.settings.monthsFull;return t?e(t,i,n):i[n.month]},yy:function(e,t){return e?2:(""+t.year).slice(2)},yyyy:function(e,t){return e?4:t.year},toArray:function(e){return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(e,t){var n=this;return n.formats.toArray(e).map(function(e){return a.trigger(n.formats[e],n,[0,t])||e.replace(/^!/,"")}).join("")}}}(),n.prototype.isDateExact=function(e,n){var i=this;return a.isInteger(e)&&a.isInteger(n)||"boolean"==typeof e&&"boolean"==typeof n?e===n:(a.isDate(e)||t.isArray(e))&&(a.isDate(n)||t.isArray(n))?i.create(e).pick===i.create(n).pick:t.isObject(e)&&t.isObject(n)?i.isDateExact(e.from,n.from)&&i.isDateExact(e.to,n.to):!1},n.prototype.isDateOverlap=function(e,n){var i=this;return a.isInteger(e)&&(a.isDate(n)||t.isArray(n))?e===i.create(n).day+1:a.isInteger(n)&&(a.isDate(e)||t.isArray(e))?n===i.create(e).day+1:t.isObject(e)&&t.isObject(n)?i.overlapRanges(e,n):!1},n.prototype.flipEnable=function(e){var t=this.item;t.enable=e||(-1==t.enable?1:-1)},n.prototype.deactivate=function(e,n){var i=this,r=i.item.disable.slice(0);return"flip"==n?i.flipEnable():n===!1?(i.flipEnable(1),r=[]):n===!0?(i.flipEnable(-1),r=[]):n.map(function(e){for(var n,o=0;o<r.length;o+=1)if(i.isDateExact(e,r[o])){n=!0;break}n||(a.isInteger(e)||a.isDate(e)||t.isArray(e)||t.isObject(e)&&e.from&&e.to)&&r.push(e)}),r},n.prototype.activate=function(e,n){var i=this,r=i.item.disable,o=r.length;return"flip"==n?i.flipEnable():n===!0?(i.flipEnable(1),r=[]):n===!1?(i.flipEnable(-1),r=[]):n.map(function(e){var n,s,l,c;for(l=0;o>l;l+=1){if(s=r[l],i.isDateExact(s,e)){n=r[l]=null,c=!0;break}if(i.isDateOverlap(s,e)){t.isObject(e)?(e.inverted=!0,n=e):t.isArray(e)?(n=e,n[3]||n.push("inverted")):a.isDate(e)&&(n=[e.getFullYear(),e.getMonth(),e.getDate(),"inverted"]);break}}if(n)for(l=0;o>l;l+=1)if(i.isDateExact(r[l],e)){r[l]=null;break}if(c)for(l=0;o>l;l+=1)if(i.isDateOverlap(r[l],e)){r[l]=null;break}n&&r.push(n)}),r.filter(function(e){return null!=e})},n.prototype.nodes=function(e){var t=this,n=t.settings,o=t.item,s=o.now,l=o.select,c=o.highlight,u=o.view,d=o.disable,p=o.min,m=o.max,f=function(e){return n.firstDay&&e.push(e.shift()),a.node("thead",a.node("tr",a.group({min:0,max:i-1,i:1,node:"th",item:function(t){return[e[t],n.klass.weekdays]}})))}((n.showWeekdaysFull?n.weekdaysFull:n.weekdaysShort).slice(0)),h=function(e){return a.node("div"," ",n.klass["nav"+(e?"Next":"Prev")]+(e&&u.year>=m.year&&u.month>=m.month||!e&&u.year<=p.year&&u.month<=p.month?" "+n.klass.navDisabled:""),"data-nav="+(e||-1))},g=function(t){return n.selectMonths?a.node("select",a.group({min:0,max:11,i:1,node:"option",item:function(e){return[t[e],0,"value="+e+(u.month==e?" selected":"")+(u.year==p.year&&e<p.month||u.year==m.year&&e>m.month?" disabled":"")]}}),n.klass.selectMonth,e?"":"disabled"):a.node("div",t[u.month],n.klass.month)},v=function(){var t=u.year,i=n.selectYears===!0?5:~~(n.selectYears/2);if(i){var r=p.year,o=m.year,s=t-i,l=t+i;if(r>s&&(l+=r-s,s=r),l>o){var c=s-r,d=l-o;s-=c>d?d:c,l=o}return a.node("select",a.group({min:s,max:l,i:1,node:"option",item:function(e){return[e,0,"value="+e+(t==e?" selected":"")]}}),n.klass.selectYear,e?"":"disabled")}return a.node("div",t,n.klass.year)};return a.node("div",h()+h(1)+g(n.showMonthsShort?n.monthsShort:n.monthsFull)+v(),n.klass.header)+a.node("table",f+a.node("tbody",a.group({min:0,max:r-1,i:1,node:"tr",item:function(e){var r=n.firstDay&&0===t.create([u.year,u.month,1]).day?-7:0;return[a.group({min:i*e-u.day+r+1,max:function(){return this.min+i-1},i:1,node:"td",item:function(e){e=t.create([u.year,u.month,e+(n.firstDay?1:0)]);var i=l&&l.pick==e.pick,r=c&&c.pick==e.pick,o=d&&t.disabled(e)||e.pick<p.pick||e.pick>m.pick;return[a.node("div",e.date,function(t){return t.push(u.month==e.month?n.klass.infocus:n.klass.outfocus),s.pick==e.pick&&t.push(n.klass.now),i&&t.push(n.klass.selected),r&&t.push(n.klass.highlighted),o&&t.push(n.klass.disabled),t.join(" ")}([n.klass.day]),"data-pick="+e.pick+" "+a.ariaAttr({role:"button",controls:t.$node[0].id,checked:i&&t.$node[0].value===a.trigger(t.formats.toString,t,[n.format,e])?!0:null,activedescendant:r?!0:null,disabled:o?!0:null}))]}})]}})),n.klass.table)+a.node("div",a.node("button",n.today,n.klass.buttonToday,"type=button data-pick="+s.pick+(e?"":" disabled"))+a.node("button",n.clear,n.klass.buttonClear,"type=button data-clear=1"+(e?"":" disabled")),n.klass.footer)},n.defaults=function(e){return{monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",format:"d mmmm, yyyy",klass:{table:e+"table",header:e+"header",navPrev:e+"nav--prev",navNext:e+"nav--next",navDisabled:e+"nav--disabled",month:e+"month",year:e+"year",selectMonth:e+"select--month",selectYear:e+"select--year",weekdays:e+"weekday",day:e+"day",disabled:e+"day--disabled",selected:e+"day--selected",highlighted:e+"day--highlighted",now:e+"day--today",infocus:e+"day--infocus",outfocus:e+"day--outfocus",footer:e+"footer",buttonClear:e+"button--clear",buttonToday:e+"button--today"}}}(e.klasses().picker+"__"),e.extend("pickadate",n)}),!function(e){"function"==typeof define&&define.amd?define(["picker","angular"],e):e(Picker,angular)}(function(e,t){function n(e,t){var n=this,i=e.$node[0].value,r=e.$node.data("value"),a=r||i,o=r?t.formatSubmit:t.format;n.settings=t,n.$node=e.$node,n.queue={interval:"i",min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse create validate",view:"parse create validate",disable:"deactivate",enable:"activate"},n.item={},n.item.interval=t.interval||30,n.item.disable=(t.disable||[]).slice(0),n.item.enable=-function(e){return e[0]===!0?e.shift():-1}(n.item.disable),n.set("min",t.min).set("max",t.max).set("now"),a?n.set("select",a,{format:o,fromValue:!!i}):n.set("select",null).set("highlight",n.item.now),n.key={40:1,38:-1,39:1,37:-1,go:function(e){n.set("highlight",n.item.highlight.pick+e*n.item.interval,{interval:e*n.item.interval}),this.render()}},e.on("render",function(){var n=e.$root.children(),i=n.find("."+t.klass.viewset);i.length&&(n[0].scrollTop=~~i.position().top-2*i[0].clientHeight)}).on("open",function(){e.$root.find("button").attr("disable",!1)}).on("close",function(){e.$root.find("button").attr("disable",!0)})}var i=24,r=60,a=12,o=i*r,s=e._;n.prototype.set=function(e,t,n){var i=this,r=i.item;return null===t?(r[e]=t,i):(r["enable"==e?"disable":"flip"==e?"enable":e]=i.queue[e].split(" ").map(function(r){return t=i[r](e,t,n)}).pop(),"select"==e?i.set("highlight",r.select,n):"highlight"==e?i.set("view",r.highlight,n):"interval"==e?i.set("min",r.min,n).set("max",r.max,n):e.match(/^(flip|min|max|disable|enable)$/)&&("min"==e&&i.set("max",r.max,n),r.select&&i.disabled(r.select)&&i.set("select",r.select,n),r.highlight&&i.disabled(r.highlight)&&i.set("highlight",r.highlight,n)),i)},n.prototype.get=function(e){return this.item[e]},n.prototype.create=function(e,n,a){var l=this;return n=void 0===n?e:n,s.isDate(n)&&(n=[n.getHours(),n.getMinutes()]),t.isObject(n)&&s.isInteger(n.pick)?n=n.pick:t.isArray(n)?n=+n[0]*r+ +n[1]:s.isInteger(n)||(n=l.now(e,n,a)),"max"==e&&n<l.item.min.pick&&(n+=o),"min"!=e&&"max"!=e&&(n-l.item.min.pick)%l.item.interval!==0&&(n+=l.item.interval),n=l.normalize(e,n,a),{hour:~~(i+n/r)%i,mins:(r+n%r)%r,time:(o+n)%o,pick:n}},n.prototype.createRange=function(e,n){var i=this,r=function(e){return e===!0||t.isArray(e)||s.isDate(e)?i.create(e):e};return s.isInteger(e)||(e=r(e)),s.isInteger(n)||(n=r(n)),s.isInteger(e)&&t.isObject(n)?e=[n.hour,n.mins+e*i.settings.interval]:s.isInteger(n)&&t.isObject(e)&&(n=[e.hour,e.mins+n*i.settings.interval]),{from:r(e),to:r(n)}},n.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},n.prototype.overlapRanges=function(e,t){var n=this;return e=n.createRange(e.from,e.to),t=n.createRange(t.from,t.to),n.withinRange(e,t.from)||n.withinRange(e,t.to)||n.withinRange(t,e.from)||n.withinRange(t,e.to)},n.prototype.now=function(e,t){var n,i=this.item.interval,a=new Date,o=a.getHours()*r+a.getMinutes(),l=s.isInteger(t);return o-=o%i,n=0>t&&-i>=i*t+o,o+="min"==e&&n?0:i,l&&(o+=i*(n&&"max"!=e?t+1:t)),o},n.prototype.normalize=function(e,t){var n=this.item.interval,i=this.item.min&&this.item.min.pick||0;return t-="min"==e?0:(t-i)%n},n.prototype.measure=function(e,n,a){var o=this;return n?n===!0||s.isInteger(n)?n=o.now(e,n,a):t.isObject(n)&&s.isInteger(n.pick)&&(n=o.normalize(e,n.pick,a)):n="min"==e?[0,0]:[i-1,r-1],n},n.prototype.validate=function(e,t,n){var i=this,r=n&&n.interval?n.interval:i.item.interval;return i.disabled(t)&&(t=i.shift(t,r)),t=i.scope(t),i.disabled(t)&&(t=i.shift(t,-1*r)),t},n.prototype.disabled=function(e){var n=this,i=n.item.disable.filter(function(i){return s.isInteger(i)?e.hour==i:t.isArray(i)||s.isDate(i)?e.pick==n.create(i).pick:t.isObject(i)?n.withinRange(i,e):void 0});return i=i.length&&!i.filter(function(e){return t.isArray(e)&&"inverted"==e[2]||t.isObject(e)&&e.inverted}).length,-1===n.item.enable?!i:i||e.pick<n.item.min.pick||e.pick>n.item.max.pick},n.prototype.shift=function(e,t){var n=this,i=n.item.min.pick,r=n.item.max.pick;for(t=t||n.item.interval;n.disabled(e)&&(e=n.create(e.pick+=t),!(e.pick<=i||e.pick>=r)););return e},n.prototype.scope=function(e){var t=this.item.min.pick,n=this.item.max.pick;return this.create(e.pick>n?n:e.pick<t?t:e)},n.prototype.parse=function(e,n,i){var a,o,l,c,u,d=this,p={};if(!n||s.isInteger(n)||t.isArray(n)||s.isDate(n)||t.isObject(n)&&s.isInteger(n.pick))return n;i&&i.format||(i=i||{},i.format=d.settings.format),d.formats.toArray(i.format).map(function(e){var t,i=d.formats[e],r=i?s.trigger(i,d,[n,p]):e.replace(/^!/,"").length;i&&(t=n.substr(0,r),p[e]=t.match(/^\d+$/)?+t:t),n=n.substr(r)});for(c in p)u=p[c],s.isInteger(u)?c.match(/^(h|hh)$/i)?(a=u,("h"==c||"hh"==c)&&(a%=12)):"i"==c&&(o=u):c.match(/^a$/i)&&u.match(/^p/i)&&("h"in p||"hh"in p)&&(l=!0);return(l?a+12:a)*r+o},n.prototype.formats={h:function(e,t){return e?s.digits(e):t.hour%a||a},hh:function(e,t){return e?2:s.lead(t.hour%a||a)},H:function(e,t){return e?s.digits(e):""+t.hour%24},HH:function(e,t){return e?s.digits(e):s.lead(t.hour%24)},i:function(e,t){return e?2:s.lead(t.mins)},a:function(e,t){return e?4:o/2>t.time%o?"a.m.":"p.m."},A:function(e,t){return e?2:o/2>t.time%o?"AM":"PM"},toArray:function(e){return e.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(e,t){var n=this;return n.formats.toArray(e).map(function(e){return s.trigger(n.formats[e],n,[0,t])||e.replace(/^!/,"")}).join("")}},n.prototype.isTimeExact=function(e,n){var i=this;return s.isInteger(e)&&s.isInteger(n)||"boolean"==typeof e&&"boolean"==typeof n?e===n:(s.isDate(e)||t.isArray(e))&&(s.isDate(n)||t.isArray(n))?i.create(e).pick===i.create(n).pick:t.isObject(e)&&t.isObject(n)?i.isTimeExact(e.from,n.from)&&i.isTimeExact(e.to,n.to):!1},n.prototype.isTimeOverlap=function(e,n){var i=this;return s.isInteger(e)&&(s.isDate(n)||t.isArray(n))?e===i.create(n).hour:s.isInteger(n)&&(s.isDate(e)||t.isArray(e))?n===i.create(e).hour:t.isObject(e)&&t.isObject(n)?i.overlapRanges(e,n):!1},n.prototype.flipEnable=function(e){var t=this.item;t.enable=e||(-1==t.enable?1:-1)},n.prototype.deactivate=function(e,n){var i=this,r=i.item.disable.slice(0);return"flip"==n?i.flipEnable():n===!1?(i.flipEnable(1),r=[]):n===!0?(i.flipEnable(-1),r=[]):n.map(function(e){for(var n,a=0;a<r.length;a+=1)if(i.isTimeExact(e,r[a])){n=!0;break}n||(s.isInteger(e)||s.isDate(e)||t.isArray(e)||t.isObject(e)&&e.from&&e.to)&&r.push(e)}),r},n.prototype.activate=function(e,n){var i=this,r=i.item.disable,a=r.length;return"flip"==n?i.flipEnable():n===!0?(i.flipEnable(1),r=[]):n===!1?(i.flipEnable(-1),r=[]):n.map(function(e){var n,o,l,c;for(l=0;a>l;l+=1){if(o=r[l],i.isTimeExact(o,e)){n=r[l]=null,c=!0;break}if(i.isTimeOverlap(o,e)){t.isObject(e)?(e.inverted=!0,n=e):t.isArray(e)?(n=e,n[2]||n.push("inverted")):s.isDate(e)&&(n=[e.getFullYear(),e.getMonth(),e.getDate(),"inverted"]);break}}if(n)for(l=0;a>l;l+=1)if(i.isTimeExact(r[l],e)){r[l]=null;break}if(c)for(l=0;a>l;l+=1)if(i.isTimeOverlap(r[l],e)){r[l]=null;break}n&&r.push(n)}),r.filter(function(e){return null!=e})},n.prototype.i=function(e,t){return s.isInteger(t)&&t>0?t:this.item.interval},n.prototype.nodes=function(e){var t=this,n=t.settings,i=t.item.select,r=t.item.highlight,a=t.item.view,o=t.item.disable;return s.node("ul",s.group({min:t.item.min.pick,max:t.item.max.pick,i:t.item.interval,node:"li",item:function(e){e=t.create(e);var l=e.pick,c=i&&i.pick==l,u=r&&r.pick==l,d=o&&t.disabled(e);return[s.trigger(t.formats.toString,t,[s.trigger(n.formatLabel,t,[e])||n.format,e]),function(e){return c&&e.push(n.klass.selected),u&&e.push(n.klass.highlighted),a&&a.pick==l&&e.push(n.klass.viewset),d&&e.push(n.klass.disabled),e.join(" ")}([n.klass.listItem]),"data-pick="+e.pick+" "+s.ariaAttr({role:"button",controls:t.$node[0].id,checked:c&&t.$node.val()===s.trigger(t.formats.toString,t,[n.format,e])?!0:null,activedescendant:u?!0:null,disabled:d?!0:null})]}})+s.node("li",s.node("button",n.clear,n.klass.buttonClear,"type=button data-clear=1"+(e?"":" disable"))),n.klass.list)},n.defaults=function(e){return{clear:"Clear",format:"h:i A",interval:30,klass:{picker:e+" "+e+"--time",holder:e+"__holder",list:e+"__list",listItem:e+"__list-item",disabled:e+"__list-item--disabled",selected:e+"__list-item--selected",highlighted:e+"__list-item--highlighted",viewset:e+"__list-item--viewset",now:e+"__list-item--now",buttonClear:e+"__button--clear"}}}(e.klasses().picker),e.extend("pickatime",n)}),[].map||(Array.prototype.map=function(e,t){for(var n=this,i=n.length,r=new Array(i),a=0;i>a;a++)a in n&&(r[a]=e.call(t,n[a],a,n));return r}),[].filter||(Array.prototype.filter=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var i=[],r=arguments[1],a=0;n>a;a++)if(a in t){var o=t[a];e.call(r,o,a,t)&&i.push(o)}return i}),[].indexOf||(Array.prototype.indexOf=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var i=0;if(arguments.length>1&&(i=Number(arguments[1]),i!=i?i=0:0!==i&&1/0!=i&&i!=-1/0&&(i=(i>0||-1)*Math.floor(Math.abs(i)))),i>=n)return-1;for(var r=i>=0?i:Math.max(n-Math.abs(i),0);n>r;r++)if(r in t&&t[r]===e)return r;return-1});var nativeSplit=String.prototype.split,compliantExecNpcg=void 0===/()??/.exec("")[1];String.prototype.split=function(e,t){var n=this;if("[object RegExp]"!==Object.prototype.toString.call(e))return nativeSplit.call(n,e,t);var i,r,a,o,s=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),c=0;for(e=new RegExp(e.source,l+"g"),n+="",compliantExecNpcg||(i=new RegExp("^"+e.source+"$(?!\\s)",l)),t=void 0===t?-1>>>0:t>>>0;(r=e.exec(n))&&(a=r.index+r[0].length,!(a>c&&(s.push(n.slice(c,r.index)),!compliantExecNpcg&&r.length>1&&r[0].replace(i,function(){for(var e=1;e<arguments.length-2;e++)void 0===arguments[e]&&(r[e]=void 0)}),r.length>1&&r.index<n.length&&Array.prototype.push.apply(s,r.slice(1)),o=r[0].length,c=a,s.length>=t)));)e.lastIndex===r.index&&e.lastIndex++;return c===n.length?(o||!e.test(""))&&s.push(""):s.push(n.slice(c)),s.length>t?s.slice(0,t):s},angular.module("angular-datepicker",[]).directive("pickADate",function(){return{restrict:"A",scope:{pickADate:"=",pickADateOptions:"="},link:function(e,t){function n(n){if("function"==typeof a&&a.apply(this,arguments),!e.$$phase&&!e.$root.$$phase){var i=t.pickadate("picker").get("select");e.$apply(function(){return n.hasOwnProperty("clear")?void(e.pickADate=null):(e.pickADate&&"string"!=typeof e.pickADate||(e.pickADate=new Date(0)),e.pickADate.setYear(i.obj.getYear()+1900),e.pickADate.setMonth(i.obj.getMonth()),void e.pickADate.setDate(i.obj.getDate()))})}}function i(){if("function"==typeof o&&o.apply(this,arguments),"undefined"!=typeof cordova&&cordova.plugins&&cordova.plugins.Keyboard){var e=function(){cordova.plugins.Keyboard.close(),window.removeEventListener("native.keyboardshow",this)};window.addEventListener("native.keyboardshow",e),setTimeout(function(){window.removeEventListener("native.keyboardshow",e)},500)}}var r=e.pickADateOptions||{},a=r.onSet,o=r.onClose;t.pickadate(angular.extend(r,{onSet:n,onClose:i,container:document.body})),setTimeout(function(){e.pickADate&&t.pickadate("picker").set("select",e.pickADate)},1e3)}}}).directive("pickATime",function(){return{restrict:"A",scope:{pickATime:"=",pickATimeOptions:"="},link:function(e,t){function n(n){if("function"==typeof a&&a.apply(this,arguments),!e.$$phase&&!e.$root.$$phase){var i=t.pickatime("picker").get("select");e.$apply(function(){return n.hasOwnProperty("clear")?void(e.pickATime=null):(e.pickATime&&"string"!=typeof e.pickATime||(e.pickATime=new Date),e.pickATime.setHours(i.hour),e.pickATime.setMinutes(i.mins),e.pickATime.setSeconds(0),void e.pickATime.setMilliseconds(0))})}}function i(){if("function"==typeof o&&o.apply(this,arguments),"undefined"!=typeof cordova&&cordova.plugins&&cordova.plugins.Keyboard){var e=function(){cordova.plugins.Keyboard.close(),window.removeEventListener("native.keyboardshow",this)};window.addEventListener("native.keyboardshow",e),setTimeout(function(){window.removeEventListener("native.keyboardshow",e)},500)}}var r=e.pickATimeOptions||{},a=r.onSet,o=r.onClose;t.pickatime(angular.extend(r,{onSet:n,onClose:i,container:document.body})),setTimeout(function(){e.pickATime&&t.pickatime("picker").set("select",e.pickATime)},1e3)}}});