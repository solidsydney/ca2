/*!
 * CanJS - 2.0.7
 * http://canjs.us/
 * Copyright (c) 2014 Bitovi
 * Tue, 01 Apr 2014 09:18:31 GMT
 * Licensed MIT
 * Includes: can/construct/construct.js,can/compute/compute.js,can/view/view.js,can/control/control.js,can/view/ejs/ejs.js
 * Download from: http://bitbuilder.herokuapp.com/can.custom.js?configuration=jquery&minify=true&plugins=can%2Fconstruct%2Fconstruct.js&plugins=can%2Fcompute%2Fcompute.js&plugins=can%2Fview%2Fview.js&plugins=can%2Fcontrol%2Fcontrol.js&plugins=can%2Fview%2Fejs%2Fejs.js
 */
(function(undefined){var __m5=function(){var e=window.can||{};if(typeof GLOBALCAN==="undefined"||GLOBALCAN!==false){window.can=e}e.isDeferred=function(e){var t=this.isFunction;return e&&t(e.then)&&t(e.pipe)};var t=0;e.cid=function(e,n){if(!e._cid){t++;e._cid=(n||"")+t}return e._cid};e.VERSION="@EDGE";e.simpleExtend=function(e,t){for(var n in t){e[n]=t[n]}return e};return e}();var __m6=function(e){e.each=function(t,n,r){var i=0,s;if(t){if(typeof t.length==="number"&&t.pop){if(t.attr){t.attr("length")}for(s=t.length;i<s;i++){if(n.call(r||t[i],t[i],i,t)===false){break}}}else if(t.hasOwnProperty){if(e.Map&&t instanceof e.Map){if(e.__reading){e.__reading(t,"__keys")}t=t.__get()}for(s in t){if(t.hasOwnProperty(s)&&n.call(r||t[s],t[s],s,t)===false){break}}}}return t};return e}(__m5);var __m7=function(e){e.inserted=function(t){t=e.makeArray(t);var n=false,r=e.$(document.contains?document:document.body),i;for(var s=0,o;(o=t[s])!==undefined;s++){if(!n){if(o.getElementsByTagName){if(e.has(r,o).length){n=true}else{return}}else{continue}}if(n&&o.getElementsByTagName){i=e.makeArray(o.getElementsByTagName("*"));e.trigger(o,"inserted",[],false);for(var u=0,a;(a=i[u])!==undefined;u++){e.trigger(a,"inserted",[],false)}}}};e.appendChild=function(t,n){var r;if(n.nodeType===11){r=e.makeArray(n.childNodes)}else{r=[n]}t.appendChild(n);e.inserted(r)};e.insertBefore=function(t,n,r){var i;if(n.nodeType===11){i=e.makeArray(n.childNodes)}else{i=[n]}t.insertBefore(n,r);e.inserted(i)}}(__m5);var __m8=function(e){e.addEvent=function(e,t){var n=this.__bindEvents||(this.__bindEvents={}),r=n[e]||(n[e]=[]);r.push({handler:t,name:e});return this};e.listenTo=function(t,n,r){var i=this.__listenToEvents;if(!i){i=this.__listenToEvents={}}var s=e.cid(t);var o=i[s];if(!o){o=i[s]={obj:t,events:{}}}var u=o.events[n];if(!u){u=o.events[n]=[]}u.push(r);e.bind.call(t,n,r)};e.stopListening=function(t,n,r){var i=this.__listenToEvents,s=i,o=0;if(!i){return this}if(t){var u=e.cid(t);(s={})[u]=i[u];if(!i[u]){return this}}for(var a in s){var f=s[a],l;t=i[a].obj;if(!n){l=f.events}else{(l={})[n]=f.events[n]}for(var c in l){var h=l[c]||[];o=0;while(o<h.length){if(r&&r===h[o]||!r){e.unbind.call(t,c,h[o]);h.splice(o,1)}else{o++}}if(!h.length){delete f.events[c]}}if(e.isEmptyObject(f.events)){delete i[a]}}return this};e.removeEvent=function(e,t){if(!this.__bindEvents){return this}var n=this.__bindEvents[e]||[],r=0,i,s=typeof t==="function";while(r<n.length){i=n[r];if(s&&i.handler===t||!s&&i.cid===t){n.splice(r,1)}else{r++}}return this};e.dispatch=function(e,t){if(!this.__bindEvents){return}if(typeof e==="string"){e={type:e}}var n=e.type,r=(this.__bindEvents[n]||[]).slice(0),i;t=[e].concat(t||[]);for(var s=0,o=r.length;s<o;s++){i=r[s];i.handler.apply(this,t)}};return e}(__m5);var __m3=function(e,t){var n=function(e){return e.nodeName&&(e.nodeType===1||e.nodeType===9)||e==window};e.extend(t,e,{trigger:function(r,i,s){if(n(r)){e.event.trigger(i,s,r,true)}else if(r.trigger){r.trigger(i,s)}else{if(typeof i==="string"){i={type:i}}i.target=i.target||r;t.dispatch.call(r,i,s)}},addEvent:t.addEvent,removeEvent:t.removeEvent,buildFragment:function(t,n){var r=e.buildFragment,i;t=[t];n=n||document;n=!n.nodeType&&n[0]||n;n=n.ownerDocument||n;i=r.call(jQuery,t,n);return i.cacheable?e.clone(i.fragment):i.fragment||i},$:e,each:t.each,bind:function(r,i){if(this.bind&&this.bind!==t.bind){this.bind(r,i)}else if(n(this)){e.event.add(this,r,i)}else{t.addEvent.call(this,r,i)}return this},unbind:function(r,i){if(this.unbind&&this.unbind!==t.unbind){this.unbind(r,i)}else if(n(this)){e.event.remove(this,r,i)}else{t.removeEvent.call(this,r,i)}return this},delegate:function(t,r,i){if(this.delegate){this.delegate(t,r,i)}else if(n(this)){e(this).delegate(t,r,i)}else{}return this},undelegate:function(t,r,i){if(this.undelegate){this.undelegate(t,r,i)}else if(n(this)){e(this).undelegate(t,r,i)}else{}return this},proxy:function(e,t){return function(){return e.apply(t,arguments)}}});t.on=t.bind;t.off=t.unbind;e.each(["append","filter","addClass","remove","data","get","has"],function(e,n){t[n]=function(e){return e[n].apply(e,t.makeArray(arguments).slice(1))}});var r=e.cleanData;e.cleanData=function(n){e.each(n,function(e,n){if(n){t.trigger(n,"removed",[],false)}});r(n)};var i=e.fn.domManip,s;e.fn.domManip=function(e,t,n){for(var r=1;r<arguments.length;r++){if(typeof arguments[r]==="function"){s=r;break}}return i.apply(this,arguments)};e(document.createElement("div")).append(document.createElement("div"));e.fn.domManip=s===2?function(e,n,r){return i.call(this,e,n,function(e){var n=e.nodeType===11?t.makeArray(e.childNodes):null;var i=r.apply(this,arguments);t.inserted(n?n:[e]);return i})}:function(e,n){return i.call(this,e,function(e){var r=e.nodeType===11?t.makeArray(e.childNodes):null;var i=n.apply(this,arguments);t.inserted(r?r:[e]);return i})};e.event.special.inserted={};e.event.special.removed={};return t}(jQuery,__m5,__m6,__m7,__m8);var __m2=function(e){var t=/_|-/,n=/\=\=/,r=/([A-Z]+)([A-Z][a-z])/g,i=/([a-z\d])([A-Z])/g,s=/([a-z\d])([A-Z])/g,o=/\{([^\}]+)\}/g,u=/"/g,a=/'/g,f=/-+(.)?/g,l=/[a-z][A-Z]/g,c=function(e,t,n){var r=e[t];if(r===undefined&&n===true){r=e[t]={}}return r},h=function(e){return/^f|^o/.test(typeof e)},p=function(e){var t=e===null||e===undefined||isNaN(e)&&""+e==="NaN";return""+(t?"":e)};e.extend(e,{esc:function(e){return p(e).replace(/&/g,"&").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(u,"&#34;").replace(a,"&#39;")},getObject:function(t,n,r){var i=t?t.split("."):[],s=i.length,o,u=0,a,f,l;n=e.isArray(n)?n:[n||window];l=n.length;if(!s){return n[0]}for(u;u<l;u++){o=n[u];f=undefined;for(a=0;a<s&&h(o);a++){f=o;o=c(f,i[a])}if(f!==undefined&&o!==undefined){break}}if(r===false&&o!==undefined){delete f[i[a-1]]}if(r===true&&o===undefined){o=n[0];for(a=0;a<s&&h(o);a++){o=c(o,i[a],true)}}return o},capitalize:function(e,t){return e.charAt(0).toUpperCase()+e.slice(1)},camelize:function(e){return p(e).replace(f,function(e,t){return t?t.toUpperCase():""})},hyphenate:function(e){return p(e).replace(l,function(e,t){return e.charAt(0)+"-"+e.charAt(1).toLowerCase()})},underscore:function(e){return e.replace(n,"/").replace(r,"$1_$2").replace(i,"$1_$2").replace(s,"_").toLowerCase()},sub:function(t,n,r){var i=[];t=t||"";i.push(t.replace(o,function(t,s){var o=e.getObject(s,n,r===true?false:undefined);if(o===undefined||o===null){i=null;return""}if(h(o)&&i){i.push(o);return""}return""+o}));return i===null?i:i.length<=1?i[0]:i},replacer:o,undHash:t});return e}(__m3);var __m1=function(e){var t=0;e.Construct=function(){if(arguments.length){return e.Construct.extend.apply(e.Construct,arguments)}};e.extend(e.Construct,{constructorExtends:true,newInstance:function(){var e=this.instance(),t;if(e.setup){t=e.setup.apply(e,arguments)}if(e.init){e.init.apply(e,t||arguments)}return e},_inherit:function(t,n,r){e.extend(r||t,t||{})},_overwrite:function(e,t,n,r){e[n]=r},setup:function(t,n){this.defaults=e.extend(true,{},t.defaults,this.defaults)},instance:function(){t=1;var e=new this;t=0;return e},extend:function(n,r,i){function v(){if(!t){return this.constructor!==v&&arguments.length&&v.constructorExtends?v.extend.apply(v,arguments):v.newInstance.apply(v,arguments)}}if(typeof n!=="string"){i=r;r=n;n=null}if(!i){i=r;r=null}i=i||{};var s=this,o=this.prototype,u,a,f,l,c,h,p,d;d=this.instance();e.Construct._inherit(i,o,d);for(c in s){if(s.hasOwnProperty(c)){v[c]=s[c]}}e.Construct._inherit(r,s,v);if(n){u=n.split(".");h=u.pop();a=e.getObject(u.join("."),window,true);p=a;f=e.underscore(n.replace(/\./g,"_"));l=e.underscore(h);a[h]=v}e.extend(v,{constructor:v,prototype:d,namespace:p,_shortName:l,fullName:n,_fullName:f});if(h!==undefined){v.shortName=h}v.prototype.constructor=v;var m=[s].concat(e.makeArray(arguments)),g=v.setup.apply(v,m);if(v.init){v.init.apply(v,g||m)}return v}});e.Construct.prototype.setup=function(){};e.Construct.prototype.init=function(){};return e.Construct}(__m2);var __m10=function(e){e.bindAndSetup=function(){e.addEvent.apply(this,arguments);if(!this._init){if(!this._bindings){this._bindings=1;if(this._bindsetup){this._bindsetup()}}else{this._bindings++}}return this};e.unbindAndTeardown=function(t,n){e.removeEvent.apply(this,arguments);if(this._bindings===null){this._bindings=0}else{this._bindings--}if(!this._bindings&&this._bindteardown){this._bindteardown()}return this};return e}(__m3);var __m11=function(e){var t=1,n=0,r=[],i=[];e.batch={start:function(e){n++;if(e){i.push(e)}},stop:function(s,o){if(s){n=0}else{n--}if(n===0){var u=r.slice(0),a=i.slice(0);r=[];i=[];t++;if(o){e.batch.start()}e.each(u,function(t){e.trigger.apply(e,t)});e.each(a,function(e){e()})}},trigger:function(i,s,o){if(!i._init){if(n===0){return e.trigger(i,s,o)}else{s=typeof s==="string"?{type:s}:s;s.batchNum=t;r.push([i,s,o])}}}}}(__m5);var __m9=function(e,t){var n=["__reading","__clearReading","__setReading"],r=function(t){var r={};for(var i=0;i<n.length;i++){r[n[i]]=e[n[i]]}e.__reading=function(e,n){t.push({obj:e,attr:n+""})};e.__clearReading=function(){return t.splice(0,t.length)};e.__setReading=function(e){[].splice.apply(t,[0,t.length].concat(e))};return r},i=function(){};var s=function(t,n){var i=[],s=r(i),o=t.call(n);e.simpleExtend(e,s);return{value:o,observed:i}},o=function(t,n,r,i){var o={},u=true,a={value:undefined,teardown:function(){for(var e in o){var t=o[e];t.observe.obj.unbind(t.observe.attr,l);delete o[e]}}},f;var l=function(e){if(i&&!i.bound){return}if(e.batchNum===undefined||e.batchNum!==f){var t=a.value,n=c();a.value=n;if(n!==t){r(n,t)}f=f=e.batchNum}};var c=function(){var e=s(t,n),r=e.observed;var i=e.value,a;u=!u;for(var f=0,c=r.length;f<c;f++){a=r[f];if(o[a.obj._cid+"|"+a.attr]){o[a.obj._cid+"|"+a.attr].matched=u}else{o[a.obj._cid+"|"+a.attr]={matched:u,observe:a};a.obj.bind(a.attr,l)}}for(var h in o){a=o[h];if(a.matched!==u){a.observe.obj.unbind(a.observe.attr,l);delete o[h]}}return i};a.value=c();a.isListening=!e.isEmptyObject(o);return a};var u=function(t){return t instanceof e.Map||t&&t.__get};e.compute=function(t,n,r){if(t&&t.isComputed){return t}var u,a,f={bound:false,hasDependencies:false},l=i,c=i,h,p=function(){return h},d=function(e){h=e},v=true,m=e.makeArray(arguments),g=function(t,n){h=t;e.batch.trigger(a,"change",[t,n])},y;a=function(t){if(arguments.length){var r=h;var i=d.call(n,t,r);if(a.hasDependencies){return p.call(n)}if(i===undefined){h=p.call(n)}else{h=i}if(r!==h){e.batch.trigger(a,"change",[h,r])}return h}else{if(e.__reading&&v){e.__reading(a,"change");if(!f.bound){e.compute.temporarilyBind(a)}}if(f.bound){return h}else{return p.call(n)}}};if(typeof t==="function"){d=t;p=t;v=r===false?false:true;a.hasDependencies=false;l=function(e){u=o(t,n||this,e,f);a.hasDependencies=u.isListening;h=u.value};c=function(){if(u){u.teardown()}}}else if(n){if(typeof n==="string"){var b=n,w=t instanceof e.Map;if(w){a.hasDependencies=true}p=function(){if(w){return t.attr(b)}else{return t[b]}};d=function(e){if(w){t.attr(b,e)}else{t[b]=e}};var E;l=function(n){E=function(){n(p(),h)};e.bind.call(t,r||b,E);h=s(p).value};c=function(){e.unbind.call(t,r||b,E)}}else{if(typeof n==="function"){h=t;d=n;n=r;y="setter"}else{h=t;var S=n,x=g;g=function(){var e=p.call(n);if(e!==h){x(e,h)}};p=S.get||p;d=S.set||d;l=S.on||l;c=S.off||c}}}else{h=t}e.cid(a,"compute");return e.simpleExtend(a,{isComputed:true,_bindsetup:function(){f.bound=true;var t=e.__reading;delete e.__reading;l.call(this,g);e.__reading=t},_bindteardown:function(){c.call(this,g);f.bound=false},bind:e.bindAndSetup,unbind:e.unbindAndTeardown,clone:function(t){if(t){if(y==="setter"){m[2]=t}else{m[1]=t}}return e.compute.apply(e,m)}})};var a,f=function(){for(var e=0,t=a.length;e<t;e++){a[e].unbind("change",i)}a=null};e.compute.temporarilyBind=function(e){e.bind("change",i);if(!a){a=[];setTimeout(f,10)}a.push(e)};e.compute.binder=o;e.compute.truthy=function(t){return e.compute(function(){var e=t();if(typeof e==="function"){e=e()}return!!e})};e.compute.read=function(t,n,r){r=r||{};var i=t,s,o,a;for(var f=0,l=n.length;f<l;f++){o=i;if(o&&o.isComputed){if(r.foundObservable){r.foundObservable(o,f)}o=o()}if(u(o)){if(!a&&r.foundObservable){r.foundObservable(o,f)}a=1;if(typeof o[n[f]]==="function"&&o.constructor.prototype[n[f]]===o[n[f]]){if(r.returnObserveMethods){i=i[n[f]]}else if(n[f]==="constructor"&&o instanceof e.Construct){i=o[n[f]]}else{i=o[n[f]].apply(o,r.args||[])}}else{i=i.attr(n[f])}}else{i=o[n[f]]}if(i&&i.isComputed&&!r.isArgument&&f<l-1){if(!a&&r.foundObservable){r.foundObservable(o,f+1)}i=i()}s=typeof i;if(f<n.length-1&&(i===null||s!=="function"&&s!=="object")){if(r.earlyExit){r.earlyExit(o,f,i)}return{value:undefined,parent:o}}}if(typeof i==="function"){if(r.isArgument){if(!i.isComputed&&r.proxyMethods!==false){i=e.proxy(i,o)}}else{if(i.isComputed&&!a&&r.foundObservable){r.foundObservable(i,f)}i=i.call(o)}}if(i===undefined){if(r.earlyExit){r.earlyExit(o,f-1)}}return{value:i,parent:o}};return e.compute}(__m3,__m10,__m11);var __m12=function(e){var t=e.isFunction,n=e.makeArray,r=1,i=e.view=e.template=function(n,r,s,o){if(t(s)){o=s;s=undefined}var u=function(e){return i.frag(e)},a=t(o)?function(e){o(u(e))}:null,f=t(n)?n(r,s,a):i.render(n,r,s,a),l=e.Deferred();if(t(f)){return f}if(e.isDeferred(f)){f.then(function(e,t){l.resolve.call(l,u(e),t)},function(){l.fail.apply(l,arguments)});return l}return u(f)};e.extend(i,{frag:function(e,t){return i.hookup(i.fragment(e),t)},fragment:function(t){var n=e.buildFragment(t,document.body);if(!n.childNodes.length){n.appendChild(document.createTextNode(""))}return n},toId:function(t){return e.map(t.toString().split(/\/|\./g),function(e){if(e){return e}}).join("_")},hookup:function(t,n){var r=[],s,o;e.each(t.childNodes?e.makeArray(t.childNodes):t,function(t){if(t.nodeType===1){r.push(t);r.push.apply(r,e.makeArray(t.getElementsByTagName("*")))}});e.each(r,function(e){if(e.getAttribute&&(s=e.getAttribute("data-view-id"))&&(o=i.hookups[s])){o(e,n,s);delete i.hookups[s];e.removeAttribute("data-view-id")}});return t},hookups:{},hook:function(e){i.hookups[++r]=e;return" data-view-id='"+r+"'"},cached:{},cachedRenderers:{},cache:true,register:function(e){this.types["."+e.suffix]=e},types:{},ext:".ejs",registerScript:function(){},preload:function(){},render:function(r,s,f,l){if(t(f)){l=f;f=undefined}var c=u(s);var h,p,d,v,m;if(c.length){p=new e.Deferred;d=e.extend({},s);c.push(o(r,true));e.when.apply(e,c).then(function(t){var r=n(arguments),i=r.pop(),o;if(e.isDeferred(s)){d=a(t)}else{for(var u in s){if(e.isDeferred(s[u])){d[u]=a(r.shift())}}}o=i(d,f);p.resolve(o,d);if(l){l(o,d)}},function(){p.reject.apply(p,arguments)});return p}else{if(e.__reading){h=e.__reading;e.__reading=null}v=t(l);p=o(r,v);if(e.Map&&h){e.__reading=h}if(v){m=p;p.then(function(e){l(s?e(s,f):e)})}else{if(p.state()==="resolved"&&p.__view_id){var g=i.cachedRenderers[p.__view_id];return s?g(s,f):g}else{p.then(function(e){m=s?e(s,f):e})}}return m}},registerView:function(t,n,r,s){var o=(r||i.types[i.ext]).renderer(t,n);s=s||new e.Deferred;if(i.cache){i.cached[t]=s;s.__view_id=t;i.cachedRenderers[t]=o}return s.resolve(o)}});var s=function(e,t){if(!e.length){throw"can.view: No template or empty template:"+t}},o=function(t,n){var r=typeof t==="string"?t:t.url,o=t.engine||r.match(/\.[\w\d]+$/),u,a,f;if(r.match(/^#/)){r=r.substr(1)}if(a=document.getElementById(r)){o="."+a.type.match(/\/(x\-)?(.+)/)[2]}if(!o&&!i.cached[r]){r+=o=i.ext}if(e.isArray(o)){o=o[0]}f=i.toId(r);if(r.match(/^\/\//)){r=r.substr(2);r=!window.steal?r:steal.config().root.mapJoin(""+steal.id(r))}if(window.require){if(require.toUrl){r=require.toUrl(r)}}u=i.types[o];if(i.cached[f]){return i.cached[f]}else if(a){return i.registerView(f,a.innerHTML,u)}else{var l=new e.Deferred;e.ajax({async:n,url:r,dataType:"text",error:function(e){s("",r);l.reject(e)},success:function(e){s(e,r);i.registerView(f,e,u,l)}});return l}},u=function(t){var n=[];if(e.isDeferred(t)){return[t]}else{for(var r in t){if(e.isDeferred(t[r])){n.push(t[r])}}}return n},a=function(t){return e.isArray(t)&&t[1]==="success"?t[0]:t};e.extend(i,{register:function(e){this.types["."+e.suffix]=e;i[e.suffix]=function(t,n){if(!n){var r=function(){return i.frag(r.render.apply(this,arguments))};r.render=function(){var n=e.renderer(null,t);return n.apply(n,arguments)};return r}return i.preload(t,e.renderer(t,n))}},registerScript:function(e,t,n){return"can.view.preload('"+t+"',"+i.types["."+e].script(t,n)+");"},preload:function(t,n){function s(){return i.frag(n.apply(this,arguments))}var r=i.cached[t]=(new e.Deferred).resolve(function(e,t){return n.call(e,e,t)});s.render=n;r.__view_id=t;i.cachedRenderers[t]=n;return s}});return e}(__m3);var __m13=function(e){var t=function(t,n,r){e.bind.call(t,n,r);return function(){e.unbind.call(t,n,r)}},n=e.isFunction,r=e.extend,i=e.each,s=[].slice,o=/\{([^\}]+)\}/g,u=e.getObject("$.event.special",[e])||{},a=function(t,n,r,i){e.delegate.call(t,n,r,i);return function(){e.undelegate.call(t,n,r,i)}},f=function(n,r,i,s){return s?a(n,e.trim(s),r,i):t(n,r,i)},l;var c=e.Control=e.Construct({setup:function(){e.Construct.setup.apply(this,arguments);if(e.Control){var t=this,n;t.actions={};for(n in t.prototype){if(t._isAction(n)){t.actions[n]=t._action(n)}}}},_shifter:function(t,r){var i=typeof r==="string"?t[r]:r;if(!n(i)){i=t[i]}return function(){t.called=r;return i.apply(t,[this.nodeName?e.$(this):this].concat(s.call(arguments,0)))}},_isAction:function(e){var t=this.prototype[e],r=typeof t;return e!=="constructor"&&(r==="function"||r==="string"&&n(this.prototype[t]))&&!!(u[e]||h[e]||/[^\w]/.test(e))},_action:function(t,n){o.lastIndex=0;if(n||!o.test(t)){var r=n?e.sub(t,this._lookup(n)):t;if(!r){return null}var i=e.isArray(r),s=i?r[1]:r,u=s.split(/\s+/g),a=u.pop();return{processor:h[a]||l,parts:[s,u.join(" "),a],delegate:i?r[0]:undefined}}},_lookup:function(e){return[e,window]},processors:{},defaults:{}},{setup:function(t,n){var i=this.constructor,s=i.pluginName||i._fullName,o;this.element=e.$(t);if(s&&s!=="can_control"){this.element.addClass(s)}o=e.data(this.element,"controls");if(!o){o=[];e.data(this.element,"controls",o)}o.push(this);this.options=r({},i.defaults,n);this.on();return[this.element,this.options]},on:function(t,n,r,i){if(!t){this.off();var s=this.constructor,o=this._bindings,u=s.actions,a=this.element,l=e.Control._shifter(this,"destroy"),c,h;for(c in u){if(u.hasOwnProperty(c)&&(h=u[c]||s._action(c,this.options))){o.push(h.processor(h.delegate||a,h.parts[2],h.parts[1],c,this))}}e.bind.call(a,"removed",l);o.push(function(t){e.unbind.call(t,"removed",l)});return o.length}if(typeof t==="string"){i=r;r=n;n=t;t=this.element}if(i===undefined){i=r;r=n;n=null}if(typeof i==="string"){i=e.Control._shifter(this,i)}this._bindings.push(f(t,r,i,n));return this._bindings.length},off:function(){var e=this.element[0];i(this._bindings||[],function(t){t(e)});this._bindings=[]},destroy:function(){if(this.element===null){return}var t=this.constructor,n=t.pluginName||t._fullName,r;this.off();if(n&&n!=="can_control"){this.element.removeClass(n)}r=e.data(this.element,"controls");r.splice(e.inArray(this,r),1);e.trigger(this,"destroyed");this.element=null}});var h=e.Control.processors;l=function(t,n,r,i,s){return f(t,n,e.Control._shifter(s,i),r)};i(["change","click","contextmenu","dblclick","keydown","keyup","keypress","mousedown","mousemove","mouseout","mouseover","mouseup","reset","resize","scroll","select","submit","focusin","focusout","mouseenter","mouseleave","touchstart","touchmove","touchcancel","touchend","touchleave"],function(e){h[e]=l});return c}(__m3,__m1);var __m16=function(e){var t={tagToContentPropMap:{option:"textContent"in document.createElement("option")?"textContent":"innerText",textarea:"value"},attrMap:{"class":"className",value:"value",innerText:"innerText",textContent:"textContent",checked:true,disabled:true,readonly:true,required:true,src:function(e,t){if(t===null||t===""){e.removeAttribute("src")}else{e.setAttribute("src",t)}}},attrReg:/([^\s=]+)[\s]*=[\s]*/,defaultValue:["input","textarea"],tagMap:{"":"span",table:"tbody",tr:"td",ol:"li",ul:"li",tbody:"tr",thead:"tr",tfoot:"tr",select:"option",optgroup:"option"},reverseTagMap:{tr:"tbody",option:"select",td:"tr",th:"tr",li:"ul"},getParentNode:function(e,t){return t&&e.parentNode.nodeType===11?t:e.parentNode},setAttr:function(n,r,i){var s=n.nodeName.toString().toLowerCase(),o=t.attrMap[r];if(typeof o==="function"){o(n,i)}else if(o===true&&r==="checked"&&n.type==="radio"){if(e.inArray(s,t.defaultValue)>=0){n.defaultChecked=true}n[r]=true}else if(o===true){n[r]=true}else if(o){n[o]=i;if(o==="value"&&e.inArray(s,t.defaultValue)>=0){n.defaultValue=i}}else{n.setAttribute(r,i)}},getAttr:function(e,n){return(t.attrMap[n]&&e[t.attrMap[n]]?e[t.attrMap[n]]:e.getAttribute(n))||""},removeAttr:function(e,n){var r=t.attrMap[n];if(r===true){e[n]=false}else if(typeof r==="string"){e[r]=""}else{e.removeAttribute(n)}},contentText:function(e){if(typeof e==="string"){return e}if(!e&&e!==0){return""}return""+e},after:function(t,n){var r=t[t.length-1];if(r.nextSibling){e.insertBefore(r.parentNode,n,r.nextSibling)}else{e.appendChild(r.parentNode,n)}},replace:function(n,r){t.after(n,r);e.remove(e.$(n))}};(function(){var e=document.createElement("div");e.setAttribute("style","width: 5px");e.setAttribute("style","width: 10px");t.attrMap.style=function(e,t){e.style.cssText=t||""}})();return t}(__m3);var __m15=function(can,elements){var newLine=/(\r|\n)+/g,clean=function(e){return e.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("   ").join("\\t")},getTag=function(e,t,n){if(e){return e}else{while(n<t.length){if(t[n]==="<"&&elements.reverseTagMap[t[n+1]]){return elements.reverseTagMap[t[n+1]]}n++}}return""},bracketNum=function(e){return e.split("{").length-e.split("}").length},myEval=function(script){eval(script)},attrReg=/([^\s]+)[\s]*=[\s]*$/,startTxt="var ___v1ew = [];",finishTxt="return ___v1ew.join('')",put_cmd="___v1ew.push(\n",insert_cmd=put_cmd,htmlTag=null,quote=null,beforeQuote=null,rescan=null,getAttrName=function(){var e=beforeQuote.match(attrReg);return e&&e[1]},status=function(){return quote?"'"+getAttrName()+"'":htmlTag?1:0},top=function(e){return e[e.length-1]},automaticCustomElementCharacters=/[-\:]/,Scanner;can.view.Scanner=Scanner=function(e){can.extend(this,{text:{},tokens:[]},e);this.text.options=this.text.options||"";this.tokenReg=[];this.tokenSimple={"<":"<",">":">",'"':'"',"'":"'"};this.tokenComplex=[];this.tokenMap={};for(var t=0,n;n=this.tokens[t];t++){if(n[2]){this.tokenReg.push(n[2]);this.tokenComplex.push({abbr:n[1],re:new RegExp(n[2]),rescan:n[3]})}else{this.tokenReg.push(n[1]);this.tokenSimple[n[1]]=n[0]}this.tokenMap[n[0]]=n[1]}this.tokenReg=new RegExp("("+this.tokenReg.slice(0).concat(["<",">",'"',"'"]).join("|")+")","g")};Scanner.attributes={};Scanner.regExpAttributes={};Scanner.attribute=function(e,t){if(typeof e==="string"){Scanner.attributes[e]=t}else{Scanner.regExpAttributes[e]={match:e,callback:t}}};Scanner.hookupAttributes=function(e,t){can.each(e&&e.attrs||[],function(n){e.attr=n;if(Scanner.attributes[n]){Scanner.attributes[n](e,t)}else{can.each(Scanner.regExpAttributes,function(r){if(r.match.test(n)){r.callback(e,t)}})}})};Scanner.tag=function(e,t){if(window.html5){window.html5.elements+=" "+e;window.html5.shivDocument()}Scanner.tags[e.toLowerCase()]=t};Scanner.tags={};Scanner.hookupTag=function(e){var t=can.view.getHooks();return can.view.hook(function(n){can.each(t,function(e){e(n)});var r=e.tagName,i=e.options.read("helpers._tags."+r,{isArgument:true,proxyMethods:false}).value,s=i||Scanner.tags[r];var o=e.scope,u=s?s(n,e):o;if(u&&e.subtemplate){if(o!==u){o=o.add(u)}var a=can.view.frag(e.subtemplate(o,e.options));can.appendChild(n,a)}can.view.Scanner.hookupAttributes(e,n)})};Scanner.prototype={helpers:[],scan:function(e,t){var n=[],r=0,i=this.tokenSimple,s=this.tokenComplex;var o;e=e.replace(newLine,"\n");if(this.transform){e=this.transform(e)}e.replace(this.tokenReg,function(t,o){var u=arguments[arguments.length-2];if(u>r){n.push(e.substring(r,u))}if(i[t]){n.push(t)}else{for(var a=0,f;f=s[a];a++){if(f.re.test(t)){n.push(f.abbr);if(f.rescan){n.push(f.rescan(o))}break}}}r=u+o.length});if(r<e.length){n.push(e.substr(r))}var u="",a=[startTxt+(this.text.start||"")],f=function(e,t){a.push(put_cmd,'"',clean(e),'"'+(t||"")+");")},l=[],c,h=null,p=false,d={attributeHookups:[],tagHookups:[],lastTagHookup:""},v=function(){d.lastTagHookup=d.tagHookups.pop()+d.tagHookups.length},m="",g=[],y=false,b,w=false,E=0,S,x=this.tokenMap,T;htmlTag=quote=beforeQuote=null;for(;(S=n[E++])!==undefined;){if(h===null){switch(S){case x.left:case x.escapeLeft:case x.returnLeft:p=htmlTag&&1;case x.commentLeft:h=S;if(u.length){f(u)}u="";break;case x.escapeFull:p=htmlTag&&1;rescan=1;h=x.escapeLeft;if(u.length){f(u)}rescan=n[E++];u=rescan.content||rescan;if(rescan.before){f(rescan.before)}n.splice(E,0,x.right);break;case x.commentFull:break;case x.templateLeft:u+=x.left;break;case"<":if(n[E].indexOf("!--")!==0){htmlTag=1;p=0}u+=S;break;case">":htmlTag=0;var N=u.substr(u.length-1)==="/"||u.substr(u.length-2)==="--",C="";if(d.attributeHookups.length){C="attrs: ['"+d.attributeHookups.join("','")+"'], ";d.attributeHookups=[]}if(m+d.tagHookups.length!==d.lastTagHookup&&m===top(d.tagHookups)){if(N){u=u.substr(0,u.length-1)}a.push(put_cmd,'"',clean(u),'"',",can.view.Scanner.hookupTag({tagName:'"+m+"',"+C+"scope: "+(this.text.scope||"this")+this.text.options);if(N){a.push("}));");u="/>";v()}else if(n[E]==="<"&&n[E+1]==="/"+m){a.push("}));");u=S;v()}else{a.push(",subtemplate: function("+this.text.argNames+"){\n"+startTxt+(this.text.start||""));u=""}}else if(p||!y&&elements.tagToContentPropMap[g[g.length-1]]||C){var k=",can.view.pending({"+C+"scope: "+(this.text.scope||"this")+this.text.options+'}),"';if(N){f(u.substr(0,u.length-1),k+'/>"')}else{f(u,k+'>"')}u="";p=0}else{u+=S}if(N||y){g.pop();m=g[g.length-1];y=false}d.attributeHookups=[];break;case"'":case'"':if(htmlTag){if(quote&&quote===S){quote=null;var L=getAttrName();if(Scanner.attributes[L]){d.attributeHookups.push(L)}else{can.each(Scanner.regExpAttributes,function(e){if(e.match.test(L)){d.attributeHookups.push(L)}})}if(w){u+=S;f(u);a.push(finishTxt,"}));\n");u="";w=false;break}}else if(quote===null){quote=S;beforeQuote=c;T=getAttrName();if(m==="img"&&T==="src"||T==="style"){f(u.replace(attrReg,""));u="";w=true;a.push(insert_cmd,"can.view.txt(2,'"+getTag(m,n,E)+"',"+status()+",this,function(){",startTxt);f(T+"="+S);break}}};default:if(c==="<"){m=S.substr(0,3)==="!--"?"!--":S.split(/\s/)[0];var A=false;if(m.indexOf("/")===0){A=true;o=m.substr(1)}if(A){if(top(g)===o){m=o;y=true}if(top(d.tagHookups)===o){f(u.substr(0,u.length-1));a.push(finishTxt+"}}) );");u="><";v()}}else{if(m.lastIndexOf("/")===m.length-1){m=m.substr(0,m.length-1)}if(m!=="!--"&&(Scanner.tags[m]||automaticCustomElementCharacters.test(m))){if(m==="content"&&elements.tagMap[top(g)]){S=S.replace("content",elements.tagMap[top(g)])}d.tagHookups.push(m)}g.push(m)}}u+=S;break}}else{switch(S){case x.right:case x.returnRight:switch(h){case x.left:b=bracketNum(u);if(b===1){a.push(insert_cmd,"can.view.txt(0,'"+getTag(m,n,E)+"',"+status()+",this,function(){",startTxt,u);l.push({before:"",after:finishTxt+"}));\n"})}else{r=l.length&&b===-1?l.pop():{after:";"};if(r.before){a.push(r.before)}a.push(u,";",r.after)}break;case x.escapeLeft:case x.returnLeft:b=bracketNum(u);if(b){l.push({before:finishTxt,after:"}));\n"})}var O=h===x.escapeLeft?1:0,M={insert:insert_cmd,tagName:getTag(m,n,E),status:status(),specialAttribute:w};for(var _=0;_<this.helpers.length;_++){var D=this.helpers[_];if(D.name.test(u)){u=D.fn(u,M);if(D.name.source===/^>[\s]*\w*/.source){O=0}break}}if(typeof u==="object"){if(u.raw){a.push(u.raw)}}else if(w){a.push(insert_cmd,u,");")}else{a.push(insert_cmd,"can.view.txt(\n"+(typeof status()==="string"||O)+",\n'"+m+"',\n"+status()+",\n"+"this,\nfunction(){ "+(this.text.escape||"")+"return ",u,b?startTxt:"}));\n")}if(rescan&&rescan.after&&rescan.after.length){f(rescan.after.length);rescan=null}break}h=null;u="";break;case x.templateLeft:u+=x.left;break;default:u+=S;break}}c=S}if(u.length){f(u)}a.push(";");var P=a.join(""),H={out:(this.text.outStart||"")+P+" "+finishTxt+(this.text.outEnd||"")};myEval.call(H,"this.fn = (function("+this.text.argNames+"){"+H.out+"});\r\n//# sourceURL="+t+".js");return H}};can.view.Scanner.tag("content",function(e,t){return t.scope});return Scanner}(__m12,__m16);var __m19=function(e){var t=true;try{document.createTextNode("")._=0}catch(n){t=false}var r={},i={},s="ejs_"+Math.random(),o=0,u=function(e){if(t||e.nodeType!==3){if(e[s]){return e[s]}else{++o;return e[s]=(e.nodeName?"element_":"obj_")+o}}else{for(var n in i){if(i[n]===e){return n}}++o;i["text_"+o]=e;return"text_"+o}},a=[].splice;var f={id:u,update:function(t,n){e.each(t.childNodeLists,function(e){f.unregister(e)});t.childNodeLists=[];e.each(t,function(e){delete r[u(e)]});n=e.makeArray(n);e.each(n,function(e){r[u(e)]=t});var i=t.length,s=t[0];a.apply(t,[0,i].concat(n));var o=t;while(o=o.parentNodeList){a.apply(o,[e.inArray(s,o),i].concat(n))}},register:function(e,t,n){e.unregistered=t;e.childNodeLists=[];if(!n){if(e.length>1){throw"does not work"}var i=u(e[0]);n=r[i]}e.parentNodeList=n;if(n){n.childNodeLists.push(e)}return e},unregister:function(t){if(!t.isUnregistered){t.isUnregistered=true;delete t.parentNodeList;e.each(t,function(e){var t=u(e);delete r[t]});if(t.unregistered){t.unregistered()}e.each(t.childNodeLists,function(e){f.unregister(e)})}},nodeMap:r};return f}(__m3,__m16);var __m18=function(e,t,n,r){var i=function(t,n,r){var i=false,s=function(){if(!i){i=true;r(o);e.unbind.call(t,"removed",s)}return true},o={teardownCheck:function(e){return e?false:s()}};e.bind.call(t,"removed",s);n(o);return o},s=function(e,t,n){return i(e,function(){t.bind("change",n)},function(e){t.unbind("change",n);if(e.nodeList){r.unregister(e.nodeList)}})},o=function(e){return(e||"").replace(/['"]/g,"").split("=")},u=[].splice;var a={list:function(n,s,o,f,l){var c=[n],h=[],p=[],d=function(n,i,s){var a=document.createDocumentFragment(),l=[],d=[];e.each(i,function(t,n){var i=e.compute(n+s),u=o.call(f,t,i),h=e.view.fragment(u);l.push(r.register(e.makeArray(h.childNodes),undefined,c));a.appendChild(e.view.hookup(h));d.push(i)});if(!h[s]){t.after(s===0?[m]:h[s-1],a)}else{var v=h[s][0];e.insertBefore(v.parentNode,a,v)}u.apply(h,[s,0].concat(l));u.apply(p,[s,0].concat(d));for(var g=s+d.length,y=p.length;g<y;g++){p[g](g)}},v=function(t,n,i,s){if(!s&&w.teardownCheck(m.parentNode)){return}var o=h.splice(i,n.length),u=[];e.each(o,function(e){[].push.apply(u,e);r.update(e,[]);r.unregister(e)});p.splice(i,n.length);for(var a=i,f=p.length;a<f;a++){p[a](a)}e.remove(e.$(u))},m=document.createTextNode(""),g,y=function(){if(g&&g.unbind){g.unbind("add",d).unbind("remove",v)}v({},{length:h.length},0,true)},b=function(e,t,n){y();g=t||[];if(g.bind){g.bind("add",d).bind("remove",v)}d({},g,0)};l=t.getParentNode(n,l);var w=i(l,function(){if(e.isFunction(s)){s.bind("change",b)}},function(){if(e.isFunction(s)){s.unbind("change",b)}y()});a.replace(c,m,w.teardownCheck);b({},e.isFunction(s)?s():s)},html:function(n,i,o){var u;o=t.getParentNode(n,o);u=s(o,i,function(e,t,n){var r=a[0].parentNode;if(r){f(t)}u.teardownCheck(a[0].parentNode)});var a=[n],f=function(n){var i=e.view.fragment(""+n),s=e.makeArray(a);r.update(a,i.childNodes);i=e.view.hookup(i,o);t.replace(s,i)};u.nodeList=a;r.register(a,u.teardownCheck);f(i())},replace:function(n,i,s){var o=n.slice(0),u;r.register(n,s);if(typeof i==="string"){u=e.view.fragment(i)}else if(i.nodeType!==11){u=document.createDocumentFragment();u.appendChild(i)}else{u=i}r.update(n,u.childNodes);if(typeof i==="string"){u=e.view.hookup(u,n[0].parentNode)}t.replace(o,u);return n},text:function(e,n,r){var i=t.getParentNode(e,r);var o=s(i,n,function(e,t,n){if(typeof u.nodeValue!=="unknown"){u.nodeValue=""+t}o.teardownCheck(u.parentNode)}),u=document.createTextNode(n());o.nodeList=a.replace([e],u,o.teardownCheck)},attributes:function(e,n,r){var i=function(n){var r=o(n),i=r.shift();if(i!==u&&u){t.removeAttr(e,u)}if(i){t.setAttr(e,i,r.join("="));u=i}};s(e,n,function(e,t){i(t)});if(arguments.length>=3){var u=o(r)[0]}else{i(n())}},attributePlaceholder:"__!!__",attributeReplace:/__!!__/g,attribute:function(n,r,i){s(n,i,function(e,i){t.setAttr(n,r,h.render())});var o=e.$(n),u;u=e.data(o,"hooks");if(!u){e.data(o,"hooks",u={})}var f=t.getAttr(n,r),l=f.split(a.attributePlaceholder),c=[],h;c.push(l.shift(),l.join(a.attributePlaceholder));if(u[r]){u[r].computes.push(i)}else{u[r]={render:function(){var e=0,n=f?f.replace(a.attributeReplace,function(){return t.contentText(h.computes[e++]())}):t.contentText(h.computes[e++]());return n},computes:[i],batchNum:undefined}}h=u[r];c.splice(1,0,i());t.setAttr(n,r,c.join(""))},specialAttribute:function(e,n,r){s(e,r,function(r,i){t.setAttr(e,n,l(i))});t.setAttr(e,n,l(r()))}};var f=/(\r|\n)+/g;var l=function(e){var n=/^["'].*["']$/;e=e.replace(t.attrReg,"").replace(f,"");return n.test(e)?e.substr(1,e.length-2):e};e.view.live=a;e.view.nodeLists=r;e.view.elements=t;return a}(__m3,__m16,__m12,__m19);var __m17=function(e,t,n){var r=[],i=function(e){var n=t.tagMap[e]||"span";if(n==="span"){return"@@!!@@"}return"<"+n+">"+i(n)+"</"+n+">"},s=function(t,n){if(typeof t==="string"){return t}if(!t&&t!==0){return""}var i=t.hookup&&function(e,n){t.hookup.call(t,e,n)}||typeof t==="function"&&t;if(i){if(n){return"<"+n+" "+e.view.hook(i)+"></"+n+">"}else{r.push(i)}return""}return""+t},o=function(t,n){return typeof t==="string"||typeof t==="number"?e.esc(t):s(t,n)},u=false,a=function(){};var f;e.extend(e.view,{live:n,setupLists:function(){var t=e.view.lists,n;e.view.lists=function(e,t){n={list:e,renderer:t};return Math.random()};return function(){e.view.lists=t;return n}},pending:function(t){var n=e.view.getHooks();return e.view.hook(function(r){e.each(n,function(e){e(r)});e.view.Scanner.hookupAttributes(t,r)})},getHooks:function(){var e=r.slice(0);f=e;r=[];return e},onlytxt:function(e,t){return o(t.call(e))},txt:function(l,c,h,p,d){var v=t.tagMap[c]||"span",m=false,g,y,b,w,E;if(u){y=d.call(p)}else{if(typeof h==="string"||h===1){u=true}var S=e.view.setupLists();b=function(){g.unbind("change",a)};g=e.compute(d,p,false);g.bind("change",a);w=S();y=g();u=false;m=g.hasDependencies}if(w){if(b){b()}return"<"+v+e.view.hook(function(e,t){n.list(e,w.list,w.renderer,p,t)})+"></"+v+">"}if(!m||typeof y==="function"){if(b){b()}return(u||l===2||!l?s:o)(y,h===0&&v)}var x=t.tagToContentPropMap[c];if(h===0&&!x){return"<"+v+e.view.hook(l&&typeof y!=="object"?function(e,t){n.text(e,g,t);b()}:function(e,t){n.html(e,g,t);b()})+">"+i(v)+"</"+v+">"}else if(h===1){r.push(function(e){n.attributes(e,g,g());b()});return g()}else if(l===2){E=h;r.push(function(e){n.specialAttribute(e,E,g);b()});return g()}else{E=h===0?x:h;(h===0?f:r).push(function(e){n.attribute(e,E,g);b()});return n.attributePlaceholder}}});return e}(__m12,__m16,__m18,__m2);var __m14=function(e){var t=e.extend,n=function(e){if(this.constructor!==n){var r=new n(e);return function(e,t){return r.render(e,t)}}if(typeof e==="function"){this.template={fn:e};return}t(this,e);this.template=this.scanner.scan(this.text,this.name)};e.EJS=n;n.prototype.render=function(e,t){e=e||{};return this.template.fn.call(e,e,new n.Helpers(e,t||{}))};t(n.prototype,{scanner:new e.view.Scanner({text:{outStart:"with(_VIEW) { with (_CONTEXT) {",outEnd:"}}",argNames:"_CONTEXT,_VIEW"},tokens:[["templateLeft","<%%"],["templateRight","%>"],["returnLeft","<%=="],["escapeLeft","<%="],["commentLeft","<%#"],["left","<%"],["right","%>"],["returnRight","%>"]],helpers:[{name:/\s*\(([\$\w]+)\)\s*->([^\n]*)/,fn:function(e){var t=/\s*\(([\$\w]+)\)\s*->([^\n]*)/,n=e.match(t);return"can.proxy(function(__){var "+n[1]+"=can.$(__);"+n[2]+"}, this);"}}],transform:function(e){return e.replace(/<%([\s\S]+?)%>/gm,function(e,t){var n=[],r,i;t.replace(/[{}]/gm,function(e,t){n.push([e,t])});do{r=false;for(i=n.length-2;i>=0;i--){if(n[i][0]==="{"&&n[i+1][0]==="}"){n.splice(i,2);r=true;break}}}while(r);if(n.length>=2){var s=["<%"],o,u=0;for(i=0;o=n[i];i++){s.push(t.substring(u,u=o[1]));if(o[0]==="{"&&i<n.length-1||o[0]==="}"&&i>0){s.push(o[0]==="{"?"{ %><% ":" %><% }")}else{s.push(o[0])}++u}s.push(t.substring(u),"%>");return s.join("")}else{return"<%"+t+"%>"}})}})});n.Helpers=function(e,n){this._data=e;this._extras=n;t(this,n)};n.Helpers.prototype={list:function(t,n){e.each(t,function(e,r){n(e,r,t)})},each:function(t,n){if(e.isArray(t)){this.list(t,n)}else{e.view.lists(t,n)}}};e.view.register({suffix:"ejs",script:function(e,t){return"can.EJS(function(_CONTEXT,_VIEW) { "+(new n({text:t,name:e})).template.out+" })"},renderer:function(e,t){return n({text:t,name:e})}});return e}(__m3,__m12,__m2,__m9,__m15,__m17);var __m21=function(e){var t=/^\d+$/,n=/([^\[\]]+)|(\[\])/g,r=/([^?#]*)(#.*)?$/,i=function(e){return decodeURIComponent(e.replace(/\+/g," "))};e.extend(e,{deparam:function(s){var o={},u,a;if(s&&r.test(s)){u=s.split("&");e.each(u,function(e){var r=e.split("="),s=i(r.shift()),u=i(r.join("=")),f=o;if(s){r=s.match(n);for(var l=0,c=r.length-1;l<c;l++){if(!f[r[l]]){f[r[l]]=t.test(r[l+1])||r[l+1]==="[]"?[]:{}}f=f[r[l]]}a=r.pop();if(a==="[]"){f.push(u)}else{f[a]=u}}})}return o}});return e}(__m3,__m2);window["can"]=__m5})();
/**
 * DHL foundation javascript library
 * 
 * @projectTitle        LIB
 * @projectDescription  Empty class (for structure)
 * @namespace           dhl + (.comp, .lib)
 * 
 * @author              Heimann, ACHTGRAU GmbH
 * @version             2014.03.20
 * @copyright           Deutsche Post DHL, 2012-2014
 */

// create DHL namespace and subtree
var dhl = dhl || {};

can.extend(dhl, {
    comp: {}, // components
    lib: {} // library
});


$(function() {

    // Extend can.Construct prototype to catch initialization errors
    can.Construct.prototype.init = function(args) {
        try {
            // set component variable store
            this._var = {};
            // naming convention: "start"
            this.start(args);
        } catch(e) {
            dhl.lib.debug.log('Component init failed for ' + this.constructor.fullName, 'error');
        }
    };


    // Overwrite can.Control setup method to support deep recursion for this.options
    var setup = can.Control.prototype.setup;
    can.Control.prototype.setup = function(element, options) {
        // setup returns [this.element, this.options]
        var initData = can.proxy(setup, this)(element, options);

        // Option merging. (Added deep recursion flag)
        this.options = can.extend(true, {}, this.constructor.defaults, options);

        return [ initData[0], this.options ];
    };

});

/**
 * DHL foundation javascript library
 * 
 * @projectTitle        DEBUG
 * @projectDescription  Provides debugging helper functions
 * @namespace           dhl.lib.debug
 * 
 * @author              Heimann, ACHTGRAU GmbH
 * @version             2014.03.20
 * @copyright           Deutsche Post DHL, 2012-2014
 */

$(function() {

    can.Construct.extend('dhl.classes.lib.debug', {
        
        // logging is enabled by default
        logEnabled: true
    
    }, {

        start: function(el) {
            
            // check if logging has been disabled on element (e.g. body) level
            // fetch data by evaluating script config directly, 'cause dhl.lib.util isn't initialized yet
            var script = can.$(el).children('script.config');
            
            if (script.length > 0) {
                var config = eval( script.html() );
                this.constructor.logEnabled = config !== undefined ? config.config.logEnabled : this.constructor.logEnabled;
            }
            
            // Avoid `console` errors in browsers that lack a console.
            if (!(window.console && console.log)) {
                (function() {
                    var noop = function() {};
                    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
                    var length = methods.length;
                    var console = window.console = {};
                    while (length--) {
                        console[methods[length]] = noop;
                    }
                }());
            }
        },
    
        /**
         * proxy function for console object
         * @param {String} msg - message to be displayed
         * @param {String} type - type of message
         */
        log: function(msg, type) {
            if (this.constructor.logEnabled) {
                type !== undefined ? console[type](msg) : console.log(msg);
            }
        }
    });

    // create new instance
    dhl.lib.debug = new dhl.classes.lib.debug('.tracking');

});

/**
 * DHL foundation javascript library
 * 
 * @projectTitle        EVENT
 * @projectDescription  Provides event helper functions
 * @namespace           dhl.lib.event
 * 
 * @author              Heimann, ACHTGRAU GmbH
 * @version             2014.03.20
 * @copyright           Deutsche Post DHL, 2012-2014
 */

$(function() {

    can.Construct.extend('dhl.classes.lib.event', {

        start: function(el) {},
    
        /**
         * stop event completely (default + propagation)
         * @param {Event Object} ev - event object
         */
        stop: function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }

    });

    // create new instance
    dhl.lib.event = new dhl.classes.lib.event();

});

/**
 * DHL foundation javascript library
 * 
 * @projectTitle        UTIL
 * @projectDescription  Provides utility functions
 * @namespace           dhl.lib.util
 * 
 * @author              Heimann, ACHTGRAU GmbH
 * @version             2014.03.20
 * @copyright           Deutsche Post DHL, 2012-2014
 */

$(function() {

    can.Construct.extend('dhl.classes.lib.util', {
        
        start: function(root) {
            
            // init all component configurations
            root = root !== undefined ? can.$(root) : can.$('body');
            dhl.lib.debug.log(this.getDomName(root) + ' (root element): init component configurations', 'info');

            this.initConfig(root);
        },
    
        /**
         * retrieve the names of the DOM nodes and the classname (if existent)
         * @param {Object} el - Nodelist
         */
        getDomName: function(el) {
            return el.length > 0 ? el[0].nodeName + ' (' + el[0].className + ')' : el.nodeName + ' (' + el.className + ')'; 
        },

        /**
         * test wether the object has a given property or not (no deep recursion)
         * @param {Object} obj - object with properties
         * @param {String} prop - property to test for
         */
        hasProperty: function(obj, prop) {
            return obj && obj[prop] && obj[prop] !== undefined && obj[prop] !== '' ? true : false;
        },

        /**
         * parse and init component config
         * @param {Object} root - dom root element to search for script.config
         */
        initConfig: function(root) {
            var lib = this;
            can.each(can.makeArray(can.$('script.config', root)), function(value) {
                var script = can.$(value);

                // get config content
                var config = eval( script.html() );
                // check if parent dom node or dom node with certain classname should be chosen
                var component = lib.hasProperty(config, 'name') ? script.closest('.' + config.name) : script.parent();
                
                // write config
                lib.setConfig(component, config.config);
            });
        },
        
        /**
         * get component config (data attribute)
         * @param {String} element - css selector
         * @param {Boolena} forceReinit - true to read data from script config and not from data attribute
         * @return {Array/String} - configuration information
         */
        getConfig: function(element, forceReinit) {
            if (forceReinit) {
                this.initConfig(element);
            }
            return can.data( can.$(element), 'config');
        },
        
        /**
         * set component config (data attribute)
         * @param {String} element - css selector
         * @param {Object} config - configuration data
         * 
         */
        setConfig: function(element, config) {
            if (element !== undefined) {
                if (config !== undefined) {
                    can.data( can.$(element), 'config', config);
                    dhl.lib.debug.log(this.getDomName(element) + ': data on component was set', 'info');
                } else {
                    dhl.lib.debug.log(this.getDomName(element) + ' component configuration missing or corrupt: data on component was not set', 'warn');
                }
            } else {
                dhl.lib.debug.log('component missing: data on component was not set', 'warn');
            }
        },
        
        /**
         * setup new instances of a registered control class
         * @param {String} componentClass - component class name
         * @param {Object} superClass - component super class
         * @param {String} cssClassname - css class name of component
         * @param {String} cssContext - css context in which the component should be searched and registered
         * @param {Boolena} forceReinit - true to read data from script config and not from data attribute
         */
        setupControl: function(componentClass, superClass, cssClassname, cssContext, forceReinit) {
            // extend component tree
            dhl.comp[componentClass] = [];
            
            // use superclass or class
            var instance = superClass || dhl.classes.comp[componentClass];
        
            // get nodes
            var nodes = this.getControlNodes(componentClass, cssClassname, cssContext);

            // create new instances
            var registered = true;
            can.each(can.makeArray(nodes), function(value) {
                try {
                    dhl.comp[componentClass].push(new instance( value, dhl.lib.util.getConfig(value, forceReinit) ));
                } catch(e) {
                    registered = false;
                }
            });

            if (registered) {
                if (nodes.length == 0) {
                    dhl.lib.debug.log('No components with class "' + componentClass + '" on page', 'info');
                } else {
                    dhl.lib.debug.log([
                        'Component class "' + componentClass + '" has been registered',
                        'number of components: ' + nodes.length,
                        nodes
                    ], 'info');
                }
            } else {
                dhl.lib.debug.log('Component registration failed for ' + componentClass, 'error');
            }
        },

        /**
         * get nodes with given css classname and context
         * @param {String} componentClass - component class name
         * @param {String} cssClassname - css class name of component
         * @param {String} cssContext - css context in which the component should be searched and registered
         */
        getControlNodes: function(componentClass, cssClassname, cssContext) {
            return can.$((cssContext || '#ui') + ' .' + (cssClassname || componentClass));
        },

        /**
         * get specfic control
         * @param {Object} domReference - dom object to retrieve corresponding canJS controls for
         * @return {Object} - the control or null
         */
        getControl: function(domReference) {
            var controls = can.data(domReference, 'controls');
            
            return (controls && controls.length > 0) ? controls[0] : null;
        },
        
        /**
         * extend control class
         * @param {String} componentClass - component class name
         * @param {Object} value - DOM component
         */
        extendControl: function(componentClass, value) {
            if (dhl.lib.util.isBlank(dhl.comp[componentClass])) {
                dhl.lib.debug.log('Component class "' + componentClass + '" couldn\'t be extended: it hasn\'t been registered yet', 'warn');
            } else {
                dhl.lib.debug.log('Component class "' + componentClass + '" has been extended', 'info');
                dhl.comp[componentClass].push(new dhl.classes.comp[componentClass]( value, dhl.lib.util.getConfig(value) ));
            }
        },

        /**
         * find specific control for a DOM element and destroy it
         * @param {String} componentClass - component class name
         * @param {Object} el - DOM element
         */
        destroyControl: function(componentClass, el) {
        	var control,
        	    comps = [];

        	// find control by DOM element and collect remaining controls of this type
        	can.each(dhl.comp[componentClass], function(item) {
        		if(item.element[0] == el) {
        			control = item;
        		} else {
        			comps.push(item);
        		}
        	});

        	if(control) {
                dhl.lib.debug.log('Destroying control with component class "' + componentClass + '"', 'info');
        		dhl.comp[componentClass] = comps;
        		control.destroy();
        	}
        },

        /**
         * test if one of the given browsers is detected (depends on modernizr!)
         * @param {Array} browsers - Array of browser classes to test for (e.g. 'ie6')
         * @return {Boolean} - test result
         */
        isBrowser: function(browsers) {
            var test = false;
            for (var i = 0; i < browsers.length; i++) {
                if ($('html').hasClass(browsers[i])) {
                    test = true;
                    break;
                }
            }
            return test;
        },
        
        /**
         * check whether the given object is blank
         * it identifies any object that evaluates to false (null, undefined, [], {}) or a whitespace string as blank.
         * boolean true/false evaluates to false(!)
         * 
         * Credits:
         * Lakshan Perera (http://www.laktek.com/2011/01/07/jquery-isblank/)
         * 
         * @param {Object} obj - object to test for
         * @param {String} property - property to test nested objects for
         * @return {Boolean} - test result
         */
        isBlank: function(obj, property) {
            // check: undefined or null
            if (obj === undefined || obj === null) {
                return true;
            };
            // skip number and boolean (!)
            if (typeof(obj) === "number" || typeof(obj) === "boolean") {
                return false;
            }
            // check: empty array
            if (can.isArray(obj) && obj.length === 0) {
                return true;
            }
            // check: empty object
            if (typeof(obj) === "object") {
                try {
                    // test nested object
                    if (property && typeof(property) === 'string') {
                        var properties = property.split('.'),
                            testObj = obj,
                            isBlank = false,
                            i = -1;
    
                        while (++i < properties.length && !isBlank) {
                            testObj = testObj[properties[i]];
                            isBlank = dhl.lib.util.isBlank(testObj);
                        }
    
                        return isBlank;
                    }

                    return can.isEmptyObject(obj);
                } catch (e) {
                    // can.isEmptyObject() fails on window.parent object, if accessed cross-domain in Google Chrome, Safari
                    return true;
                }
            }
            // check: empty string 
            return can.trim(obj) === "";
        },

        /**
         * retrieve local storage object
         * @param {String} key - key to search for in local storage
         * @return {Array} - stored data
         */
        getStorage: function(key) {
            var data;
            if (window.localStorage && window.JSON) {
                data = JSON.parse(localStorage.getItem(key));
                dhl.lib.debug.log({
                    'local storage': 'read',
                    key: key,
                    data: data
                }, 'info');
            }
            return data;
        },

        /**
         * store data in local storage object
         * @param {String} key - key to store in local storage
         * @param {Object} data -data to store
         */
        setStorage: function(key, data) {
            if (window.localStorage && window.JSON) {
                dhl.lib.debug.log({
                    'local storage': 'write',
                    key: key,
                    data: data
                }, 'info');
                localStorage.setItem(key, JSON.stringify(data));
            }
        },

        /**
         * clean data from local storage object
         * @param {String} key - key to remove from local storage
         */
        clearStorage: function(key) {
            if (window.localStorage) {
                dhl.lib.debug.log({
                    'local storage': 'clear',
                    key: key
                }, 'info');
                localStorage.removeItem(key);
            }
        },

        /**
         * open new browser window
         * @param {String} url - url to open
         * @param {Object} customOptions - custom window options
         * @return {window} - new window object
         */
        openWindow: function(url, customOptions) {
            var defaultOptions = {
                height: 700,
                location: 0,
                menubar: 0,
                toolbar: 0,
                width: 500
            };
            can.extend(defaultOptions, customOptions);
            
            return window.open(url, 'newWindow', can.param(defaultOptions).replace(/&/g, ','));
        },

        /**
         * get the device pixel ratio, if present
         * @return {Float} - device pixel ratio
         */
        getDevicePixelRatio: function() {
            return dhl.lib.util.isBlank(window.devicePixelRatio) ? 1 : window.devicePixelRatio;
        },

        /**
         * get element dimensions (falls back to document)
         * @param {String} element - css selector to retrieve element
         * @return {Object} - height and width of document
         */
        getDimensions: function( element ) {
            var elem = element || document; 
            return {
                height: can.$( elem ).height(),
                width: can.$( elem ).width()
            };
        }
    });

    // create new instance
    dhl.lib.util = new dhl.classes.lib.util();

});

/**
 * DHL.com javascript components
 * 
 * @title           TRACKING MEASUREMENT
 * @description     collect and analyze tracking component performance
 * @namespace       dhl.comp.trackingMeasurement
 * 
 * @author          Heimann
 * @version         2014.05.22
 */

$(function() {

    can.Construct.extend('dhl.classes.comp.trackingMeasurement', {

        key : 'dhl-tracking-measurement',
        maxRuns: 100

    }, {

        // component variable store
        _var: {},

        start: function() {},
        
        /**
         * enable component (needs to be called first)
         */
        enable: function() {
            this._var.isEnabled = true;

            this._var.measurement = {
                ajax: {},
                overall: {}
            };
        },
        
        /**
         * measure tracking execution time: start
         * @param {String} category - name of measurement catgeory, e.g. 'overall'
         */
        setStart: function( category ) {
            if ( this._var.isEnabled ) {
                if ( dhl.lib.util.isBlank( this._var.measurement[ category ] ) ) {
                    this._var.measurement[ category ] = {};
                }
                this._var.measurement[ category ].start = new Date();
            }
        },
        
        /**
         * measure tracking execution time: stop
         * @param {String} category - name of measurement catgeory, e.g. 'overall'
         */
        setStop: function( category ) {
            if ( this._var.isEnabled ) {
                if ( dhl.lib.util.isBlank( this._var.measurement[ category ] ) ) {
                    this._var.measurement[ category ] = {};
                }
                this._var.measurement[ category ].stop = new Date();
            }
        },
        
        /**
         * measure tracking execution time: duration
         * @param {String} category - name of measurement catgeory, e.g. 'overall'
         */
        setDuration: function( category ) {
            this._var.measurement[ category ].duration = ( this._var.measurement[ category ].stop - this._var.measurement[ category ].start ); 
        },
        
        /**
         *  calculate all time runs average
         * @param {Integer} duration - accumulated duration time of all runs
         * @param {Integer} runs - number of runs
         * @return {Float} - time in s
         */
        setAverageDuration: function( duration, runs ) {
            return Math.round( duration / runs ) / 1000 + 's';
        },
        
        /**
         * analyze tracking execution time: stop
         * @param {String} category - name of measurement catgeory, e.g. 'overall'
         */
        analyze: function( isShipmentTracking ) {
            if ( this._var.isEnabled ) {
                // calculate single run durations
                this.setDuration( 'overall' );
                this.setDuration( 'ajax' );
                
                // get former measurement results
                var measurement = dhl.lib.util.getStorage( this.constructor.key ) || {},
                    trackingType = isShipmentTracking ? 'shipmentTracking' : 'shipperReference';
                
                if ( dhl.lib.util.isBlank( measurement ) || dhl.lib.util.isBlank( measurement[ trackingType ] )) {
                    measurement[ trackingType ] = {
                        runs: []
                    };
                }
                // check if max runs doesn't get exceeded
                while ( measurement[ trackingType ].runs.length >= this.constructor.maxRuns ) {
                    measurement[ trackingType ].runs.shift();
                }
                // add new measurement results
                measurement[ trackingType ].runs.push( this._var.measurement );

                // sum up all time runs average
                var overview = {
                    averageDuration: {
                        ajax: 0,
                        overall: 0
                    },
                    totalRuns: measurement[ trackingType ].runs.length
                };
                can.each( measurement[ trackingType ].runs, function( value ) {
                    overview.averageDuration.ajax += value.ajax.duration;
                    overview.averageDuration.overall += value.overall.duration;
                } );

                // calculate all time runs average
                overview.averageDuration.overall = this.setAverageDuration( overview.averageDuration.overall, overview.totalRuns );
                overview.averageDuration.ajax = this.setAverageDuration( overview.averageDuration.ajax, overview.totalRuns );
                
                // store measurement results
                can.extend( measurement[ trackingType ], overview ); 
                dhl.lib.util.setStorage( this.constructor.key, measurement );
            }
        }
        
    });

    // create new instance
    dhl.comp.trackingMeasurement = new dhl.classes.comp.trackingMeasurement();
});
/**
 * DHL.com javascript components
 * 
 * @title           TRACKING PARAMS
 * @description     handle tracking parameter
 * @namespace       dhl.comp.trackingParams
 * 
 * @author          Heimann
 * @version         2014.10.15
 */

$(function() {

    can.Control('dhl.classes.comp.trackingParams', {

        defaults: {
            filter: {
                rules: [
                    // replace CRLF with ","
                    [ /[\n\r]/g, ',' ],
                    // whitelisting: allowed character set
                    [ /[^A-Za-z0-9\+\-#\*\(\)_\.\/ ,\n\r]/gi, '' ],
                    // replace multiple "," with single one
                    [ /,{2,}/g, ',' ],
                    // remove leading and trailing ","
                    [ /^,|,$/g, '' ]
                ]
            },
            /*
             * all parameter can have the following properties:
             * - length.filler: {String} - character to add to parameter value if it is shorter than specified
             * - length.min: {Int} - minimal length of parameter string
             * - mapped: {String} - parameter to map to for backend request (currently not used)
             * - private: {boolean} - only private url parameter -> should not be shown in URL to the user
             * - public: {boolean} - only public url parameter -> should not be send to the backend via AJAX call
             * - query: {boolean} - stores if value is derived from URL (will be set on runtime)
             * - value: {String} - default value
             */
            params: {
                accountNumber: {
                    private: true,
                    value: ''
                },
                AWB: {
                    //mapped: 'q',
                    value: ''
                },
                brand: {
                    public: true,
                    value: ''
                },
                countryCode: {
                    private: true,
                    value: 'g0'
                },
                destCountryCode: {
                    private: true,
                    value: ''
                },
                fromDayValue: {
                    length: {
                        filler: '0',
                        min: 2
                    },
                    value: ''
                },
                fromMonthValue: {
                    length: {
                        filler: '0',
                        min: 2
                    },
                    value: ''
                },
                fromYearValue: {
                    value: ''
                },
                languageCode: {
                    private: true,
                    value: 'en'
                },
                shipperReference: {
                    value: ''
                },
                toDayValue: {
                    length: {
                        filler: '0',
                        min: 2
                    },
                    value: ''
                },
                toMonthValue: {
                    length: {
                        filler: '0',
                        min: 2
                    },
                    value: ''
                },
                toYearValue: {
                    value: ''
                }
            }
        }

    }, {

        start: function() {},
        
        /**
         * get stored parameter
         * @return {Object} - parameter
         */
        get: function() {
            return this._var.params;
        },

        /**
         * store parameter or clear, if empty
         * a) filter valid params
         * b) encode all params
         * @param {Object} params - parameter set
         */
        set: function( params ) {
            this._var.params = params ? this.encode( this.filter( params ) ) : null;
            dhl.lib.debug.log(['Tracking: stored parameter (filtered, encoded)', this._var.params], 'info');
        },

        /**
         * get url parameter
         * @param {String} - url parameter
         * @return {Array|null} - url parameter set
         */
        getFromUrl: function( url ) {
            var params = url || window.location.search;

            if ( !dhl.lib.util.isBlank( params ) ) {
                // get from url
                params = can.deparam( params.substring( 1, params.length ) );

                // wrap values into objects
                can.each( params, can.proxy( function( value, key ) {
                    params[ key ] = {
                        query: true,
                        value: value
                    };
                }, this ) );

                // store params
                this.set( params );
            }

            return this.get();
        },

        /**
         * filter parameter and store only allowed keys
         * @param {Object} params - parameter key/value pairs
         * @return {Object} - filtered parameter set 
         */
        filter: function( params ) {
            var matchedParams = {};

            // extend with defaults
            params = can.extend( true, {}, this.options.params, params );

            can.each( params || this.get(), can.proxy( function( obj, key ) {
                // filter malicious chars in values
                obj.value = this.applyRules( obj.value );
                
                // filter allowed parameter keys
                can.each( this.options.params, can.proxy( function( optionsObj, optionsKey ) {
                    if ( key == optionsKey && !dhl.lib.util.isBlank( obj.value ) ) {
                        // extend with defaults and adapt to defined length, if necessary
                        matchedParams[ key ] = this.adapt( can.extend( true, {}, optionsObj, obj ) );
                    }
                }, this ) );
            }, this ) );

            return matchedParams;
        },
        
        /**
         * apply filter rules to parameter value
         * @param {String} value - parameter value
         * @return {String} - filtered value
         */
        applyRules: function( value ) {
            if ( !dhl.lib.util.isBlank( value ) ) {
                var rules = this.options.filter.rules,
                    delimiter = ',',
                    values = value.split( delimiter );

                // iterate over multipart value
                for ( var i = 0; i < values.length; i++ ) {
                    for ( var j = 0; j < rules.length; j++ ) {
                        // apply filter rules
                        values[ i ] = values[ i ].replace( rules[ j ][ 0 ], rules[ j ][ 1 ] );
                    }

                    // trim whitespace
                    values[ i ] = can.trim( values[ i ] );

                    // skip value if empty
                    if ( values[ i ].length == 0 ) {
                        values.splice( i, 1 );
                        i--;
                    } else if ( values[ i ].indexOf( delimiter ) != -1 ) {
                        // verify CRLF based splitted values again
                        values[ i ] = this.applyRules( values[ i ] );
                    }
                }

                value = values.join( delimiter );
            }

            return value;
        },

        /**
         * adapt parameter to specified ranges
         * @param {Object} param - parameter key/value pairs
         * @return {Object} - adapted parameter 
         */
        adapt: function( param ) {
            if ( !dhl.lib.util.isBlank( param.length ) ) {
                var delta = param.length.min - param.value.length,
                    extendValue = '';

                if ( delta > 0 ) {
                    for ( var i = 0; i < delta; i++ ) {
                        extendValue += param.length.filler;
                    }
                    param.value = extendValue + param.value;
                }
            }

            return param;
        },

        /**
         * decode parameter
         * @param {Object} params - parameter key/value pairs
         * @return {Object} - decoded parameter set 
         */
        decode: function( params ) {
            can.each( params, function( obj, key ) {
                params[ key ].value = decodeURIComponent( obj.value );
            } );
            
            return params;
        },

        /**
         * encode parameter for xss protection
         * @param {Object} params - parameter key/value pairs
         * @return {Object} - encoded parameter set 
         */
        encode: function( params ) {
            can.each( params, function( obj, key ) {
                params[ key ].value = encodeURIComponent( obj.value );
            } );
            
            return params;
        },
        
        /**
         * return a serialized representation of the params
         * @param {Object} params - parameter object
         * @return {String} - serialized parameter
         */
        serialize: function( params, skipPrivateParams, mapParams ) {
            var serializedParams = '',
                includeParam;

            can.each( params || this.get(), function( obj, key ) {
                includeParam = skipPrivateParams ? ( obj.private ? false : true ) : ( obj.public ? false : true );

                if (includeParam) {
                    key = mapParams && !dhl.lib.util.isBlank( obj.mapped ) ? obj.mapped : key; 
                    serializedParams += '&' + key + '=' + obj.value;
                }
            } );

            return serializedParams.substring( 1, serializedParams.length );
        }

    });

    // register new control
    dhl.lib.util.setupControl('trackingParams', null, 'tracking', '.parsys.containerpar');

});
/**
 * DHL.com javascript components
 * 
 * @title           TRACKING FORM
 * @description     handle tracking inputs
 * @namespace       dhl.comp.trackingForm
 * 
 * @author          Heimann
 * @version         2014.05.12
 */

$(function() {

    can.Control('dhl.classes.comp.trackingForm', {

        defaults: {
            awbDefaultValue: 'Enter your tracking number(s)',
            fields: {
                shipment: [
                    'AWB',
                    'brand'
                ],
                shipperReference: [
                    'shipperReference',
                    'fromDayValue',
                    'fromMonthValue',
                    'fromYearValue',
                    'toDayValue',
                    'toMonthValue',
                    'toYearValue',
                    'accountNumber',
                    'destCountryCode'
                ]
            },
            trackingEngines: [
                'DHL',
                'HBN',
                'CRN',
                'I',
                'R',
                'CN',
                'BOLN',
                'DOC'
            ],
            text: {
                newSearch: 'Try new search'
            }
        }

    }, {

        start: function() {
            this._var.params = dhl.lib.util.getControl( this.element.closest( '.tracking' ) );

            this._var.isShipment = this.element.hasClass( 'tracking-shipment' );
            this._var.fields = this._var.isShipment ? this.options.fields.shipment : this.options.fields.shipperReference;
            this._var.formElm = this.element.find( 'form' ).get( 0 );
            this._var.submitEnabled = true;
        },
        
        /**
         * add submit listener to tracking form
         * @param {Object} el - element on which the event is triggered
         * @param {Object} ev - event object
         * @return {Boolean} - false (prevent default form submit)
         */
        'form submit': function( el, ev ) {
            this._var.results = dhl.lib.util.getControl( this.element.closest( '.tracking' ).find( '.tracking-results' ) );

            if ( this._var.submitEnabled && this.validateForm( el ) && !dhl.lib.util.isBlank( this._var.results ) ) {
                dhl.lib.debug.log( 'Tracking: form validation succeeded', 'info' );
                
                // disable submit button temporarily
                this._var.submitEnabled = false;

                // replace current url with new tracking params
                var url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + this._var.params.serialize( null, true );
                this.setHistory( this._var.params.get(), url );

                // clear possible error messages
                can.$( this._var.isShipment ? '.tracking-form-error' : '#errorDivison' ).empty();
                
                // load new results
                this._var.results.loadResults();
            } else {
                dhl.lib.debug.log( 'Tracking: form validation failed', 'warn' );

                this._var.results.clearResults();
                this.showForm();

                // trigger iframe dimension recalculation
                this._var.results.triggerFrameCommunication();
            }

            return false;
        },
        
        /**
         * add field listener
         * @param {Object} el - element on which the event is triggered
         * @param {Object} ev - event object
         */
        'form .tracking-button click': function( el, ev ) {
            dhl.lib.event.stop( ev );
            
            can.trigger( el.closest( 'form' ), 'submit' );
        },
        
        /**
         * shipment tracking: add field listener
         * @param {Object} el - element on which the event is triggered
         * @param {Object} ev - event object
         */
        '#AWB focus': function( el, ev ) {
            el.val( this.validateIsNotDefault( el.val(), this.options.awbDefaultValue ) ? el.val() : '' );
        },
        
        /**
         * shipment tracking: add field listener
         * @param {Object} el - element on which the event is triggered
         * @param {Object} ev - event object
         */
        '#AWB blur': function( el, ev ) {
            el.val( dhl.lib.util.isBlank( el.val() ) ? this.options.awbDefaultValue : el.val() );
        },
        
        /**
         * shipment tracking: add field listener
         * @param {Object} el - element on which the event is triggered
         * @param {Object} ev - event object
         */
        '#AWB keypress': function( el, ev ) {
            // use "old" validation util
            if ( !fnCheckEnter( ev, this._var.formElm ) && !dhl.lib.util.isBlank( this._var.results ) ) {
                // trigger iframe dimension recalculation
                this._var.results.triggerFrameCommunication();
            }
        },
        
        /**
         * shipper reference tracking: add field listener
         * @param {Object} el - element on which the event is triggered
         * @param {Object} ev - event object
         */
        '#destCountryCode change': function( el, ev ) {
            can.$( '#destCountryCodeIndex' ).val( el.prop( 'selectedIndex' ) );
        },
        
        /**
         * populates form fields with given values
         * @param {Object} params - parameter set
         */
        populateForm: function( params ) {
            var isBlank = dhl.lib.util.isBlank( params );
            if (!isBlank) {
                params = this._var.params.decode( params );
            }
            
            /**
             * check select field, if given value match to existing options value
             * @param {String} field - name of form field
             * @param {Object} context - can control (this.element)
             */
            function hasOptionMatch( field, context, params ) {
                var options = can.$( '#' + field, context ).children( 'option' ),
                    match = false;

                if ( options.length > 0 ) {
                    options.each( function() {
                        if ( can.$( this ).val() == params[ field ].value ) {
                            match = true;
                        }
                    } );
                }
                
                return match;
            }

            /**
             * set date fields with current date (shipper reference)
             * @param {String} field - name of form field
             * @param {Object} context - can control (this)
             */
            function setDates( field, context ) {
                var today = new Date();

                if ( field.indexOf( 'Day' ) != -1 ) {
                    context.setInput( '#' + field, properDate( today.getDate() ) );
                } else if ( field.indexOf( 'Month' ) != -1 ) {
                    context.setInput( '#' + field, properDate( today.getMonth() + 1 ) );
                } else if ( field.indexOf( 'Year' ) != -1 ) {
                    context.setInput( '#' + field, today.getFullYear() );
                }
            }

            /**
             * special case:
             * map countryCode parameter to destCountryCode
             * - if it was derived from query parameter
             * - if destCountryCode is not present
             * 
             * reset countryCode to country domain info afterwards
             * 
             * @param {Object} context - can control (this)
             */
            function mapCountryCode( context ) {
                var countryCode = params[ 'countryCode' ],
                    destCountryCode = params[ 'destCountryCode' ];

                if ( dhl.lib.util.isBlank( destCountryCode ) && !dhl.lib.util.isBlank( countryCode, 'value' ) && countryCode.query ) {
                    // set destination country code
                    params[ 'destCountryCode' ] = {
                        value: countryCode.value
                    };
                    
                    // reset country code
                    var config = dhl.lib.util.getConfig( context._var.params.element );
                    
                    if ( !dhl.lib.util.isBlank( config, 'params.countryCode.value' ) ) {
                        countryCode.value = config.params.countryCode.value;
                        countryCode.query = false;
                    }
                }
            }

            var field,
                isInRange,
                readyForSubmit = false;
            
            if ( this._var.isShipment ) {
                if ( !isBlank ) {
                    if ( this.validateIsNotEmpty( params.brand ) ) {
                        // check if brand parameter matches to configured tracking engine OR has value of 'DHL' (quirky requirement - bypass validation)
                        if ( hasOptionMatch( 'brand', this.element, params ) ) {
                            this.setInput( '#brand', params.brand.value );
                        } else {
                            for ( var i = 0; i < this.options.trackingEngines.length; i++ ) {
                                if ( params.brand.value == this.options.trackingEngines[ i ] ) {
                                    // create temporary option for valid but non existing tracking engine
                                    this._var.brandOptionAdded = params.brand.value;
                                    this.addOption( '#brand', params.brand.value, params.brand.value );
                                    this.setInput( '#brand', params.brand.value );
                                    break;
                                }
                            }
                        }
                    }
                    if ( readyForSubmit = this.validateIsNotEmpty( params.AWB ) ) {
                        this.setInput( '#AWB', params.AWB.value );
                    }
                    dhl.lib.debug.log( 'Tracking: form has been populated with URL parameter', 'info' );
                } else {
                    // try populating the field with an AWB stored in a cookie -> use "old" validation utils
                    initForm( this._var.formElm );
                    dhl.lib.debug.log( 'Tracking: form has been populated with cookie value', 'info' );
                }
            } else {
                // populate date fields with max date ranges 
                populateDates( this._var.formElm );

                // set field values with url parameters, if present 
                if ( !isBlank ) {
                    mapCountryCode( this );

                    for ( var i = 0; i < this._var.fields.length; i++ ) {
                        field = this._var.fields[ i ];

                        if ( this.validateIsNotEmpty( params[ field ] ) ) {
                            isInRange = can.$( '#' + field, this.element ).is( 'select' ) ? hasOptionMatch( field, this.element, params ) : true;
                            
                            if (isInRange) {
                                // set input value
                                this.setInput( '#' + field, params[ field ].value );
                            } else if ( field == 'destCountryCode' ) {
                                // reset destination country code parameter, if not in range (special case)
                                params[ 'destCountryCode' ].value = '';
                            } else {
                                // set input values for date fields (defaults)
                                setDates( field, this );
                            }

                            // check mandatory field
                            if ( field == 'shipperReference' ) {
                                readyForSubmit = true;
                            }
                        } else {
                            setDates( field, this );
                        }
                    }
                    dhl.lib.debug.log( 'Tracking: form has been populated with URL parameter', 'info' );
                } else {
                    // try setting field values -> use "old" validation utils
                    selectDates( this._var.formElm );
                    dhl.lib.debug.log( 'Tracking: form has been populated with cookie value', 'info' );
                }
            }
            
            return readyForSubmit;
        },

        /**
         * store and validate form inputs
         */
        validateForm: function() {
            var field,
                key,
                params = {},
                valid = false;

            // gather user input (form fields)
            for ( var i = 0; i < this._var.fields.length; i++ ) {
                key = this._var.fields[ i ];
                params[ key ] = {
                    value: this.getInput( '#' + key )
                };

                // check if field is a text input element
                field = can.$( '#' + key );
                if ( field.filter( '[type=text]' ).length > 0 || field.is( 'textarea' ) ) {
                    // apply filter rules to param value
                    params[ key ].value = this._var.params.applyRules( params[ key ].value );
                    
                    // populate field with trimmed value
                    this.setInput( '#' + key, params[ key ].value );
                }
            }

            // merge, store, filter and encode params
            this._var.params.set( can.extend( {}, this._var.params.get(), params ) );
            
            // start validation: checks from "old" validation utils
            valid = this._var.isShipment ? this.checkURL( this._var.formElm, params ) : shipperForm( this._var.formElm );

            // trigger WebTrends analytics
            if ( valid ) {
                // "old" code
                enableWebtrendsTracking();
            }

            return valid;
        },
        
        /**
         * validate: parameter object and value not empty?
         * @param {String} param - parameter object with value node
         * @return {Boolean} - validation result
         */
        validateIsNotEmpty: function( param ) {
            return !dhl.lib.util.isBlank( param, 'value' );
        },

        /**
         * validate: value != default value ?
         * @param {String} value - user input value
         * @param {String} defaultValue - default value for field
         * @return {Boolean} - validation result
         */
        validateIsNotDefault: function( value, defaultValue ) {
            return decodeURIComponent( value ) != decodeURIComponent( defaultValue );
        },

        /**
         * check if chosen tracking engine is external or not and open accordingly
         * @param {Object} form - shipment tracking form
         * @return {Boolean} - proof if form submit should be processed or not
         */
        checkURL: function( form, params ) {
            // finalPieceStr, trackingEngines are global vars from "old implementation"
            var brand = this.validateIsNotEmpty( params.brand ) ? params.brand.value : '',
                trackingNumber = this.validateIsNotEmpty( params.AWB ) ? params.AWB.value : '',
                newWindow = null,
                features = 'height=800,width=900,left=100,top=100,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=no,resizable=yes',
                doCheck = can.proxy( function( url ) {
                    if ( url != '' ) {
                        // use external tracking engine
                        url = url.replace( '#', trackingNumber );
                        newWindow = window.open( url, 'Tracking', features );  
                    } else if ( checkForm( form ) ) {
                        if ( brand == 'DHL' ) {
                            this.setInput( '#AWB', finalPieceStr );
                        }
    
                        return true;
                    }
    
                    return false;
                }, this );

            // iterate over configured tracking engines
            for ( var i = 0; i < trackingEngines.length; i++ ) {
                if ( brand == trackingEngines[ i ].brand ) {
                    return doCheck( trackingEngines[ i ].url );
                }
            }

            // still no match to brand parameter? Add extra check to bypass tracking engine match (if AWB validation succeeds) (e.g. spain tracking)
            return doCheck( '' );
        },

        /**
         * get form field value
         * @param {String} cssElem - css class or id of element
         */
        getInput: function( cssElem ) {
            return can.$( cssElem, this.element ).val();
        },

        /**
         * (re)set form field to (default) value
         * @param {String} cssElem - css class or id of element
         * @param {String} value - new input value (e.g. default value)
         */
        setInput: function( cssElem, value ) {
            can.$( cssElem, this.element ).val( value );
        },

        /**
         * set history state for given url
         * @param {String} params - parameter for state object
         * @param {String} url - url to set history for
         */
        setHistory: function( params, url ) {
            if ( !this._var.results._var.iframe.isEmbedded && window.history && window.history.pushState ) {
                window.history.pushState( {
                    'params': params
                }, "", url );
            }
        },

        /**
         * add option to select field
         * @param {String} selector - css selector
         * @param {String} value - option value
         * @param {String} text - viewable option text
         */
        addOption: function( selector, value, text ) {
            can.$( selector ).append( '<option value="' + value + '">' + text + '</option>' );
        },

        /**
         * remove option from select field
         * @param {String} selector - css selector
         * @param {String} value - option value
         */
        removeOption: function( selector, value ) {
            can.$( 'option[value="' + value + '"]', selector ).remove();
        },

        /**
         * remove class after loading of tracking results
         */
        hideLoadingState: function() {
            this.element.removeClass( 'loading' );
        },

        /**
         * add class between loading of tracking results
         */
        showLoadingState: function() {
            this.element.addClass( 'loading' );
        },

        /**
         * show the form component (triggered when no valid parameter is present in URL)
         */
        showForm: function() {
            this.element.removeClass( 'hd' );
        },

        /**
         * hide form and display link to reveal it
         */
        hideNewSearchOption: function() {
            this.element.find( '.tracking-form-new-search').remove();
            this.element.find( '.tracking-results-additional-link').remove();
            this.element.find( '.wrap1' ).removeClass( 'hd' );
            
            this._var.results.clearResults();
            this._var.results.showEnvironment();
        },

        /**
         * hide form and display link to reveal it
         */
        showNewSearchOption: function() {
            this.element.find( '.wrap1' ).addClass( 'hd' );
            if ( this.element.find( '.tracking-results-additional-link' ).length == 0 ) {
                if(this.options.resultsAddLinks && this.options.resultsAddLinks.length > 0){
                    var i = this.options.resultsAddLinks.length - 1;
                    for(; i>=0; i--) {
                        this.element.prepend( '<p class="tracking-results-additional-link"><a class="' + this.options.resultsAddLinks[i].icon + '" target="'+ this.options.resultsAddLinks[i].target +'" href="' + this.options.resultsAddLinks[i].url + '">' + this.options.resultsAddLinks[i].text + '</a></p>' );
                    }
                }
            }

            if ( this.element.find( '.tracking-form-new-search' ).length == 0 )
                this.element.prepend( '<p class="tracking-form-new-search"><a class="arrow" href="#">' + this.options.text.newSearch + '</a></p>' );
        },

        /**
         * add click listener to "open/close" link (new search)
         * @param {Object} el - element on which the event is triggered
         * @param {Object} ev - event object
         */
        '.tracking-form-new-search a click': function( el, ev ) {
            dhl.lib.event.stop( ev );

            // remove temporary option for brand, if necessary
            if ( !dhl.lib.util.isBlank( this._var.brandOptionAdded ) ) {
                this.removeOption( '#brand', this._var.brandOptionAdded );
                this._var.brandOptionAdded = null;
            }
            
            // hide new search link
            this.hideNewSearchOption();

            // clear parameter set - keep only parameters set originally in URL
            var queriedParams = {};
            can.each( this._var.params.get(), function( obj, key ) {
                if ( obj.query ) {
                    queriedParams[ key ] = obj;
                }
            } );

            this._var.params.set( queriedParams );

            // clear window history state
            var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
            this.setHistory( '', url );
            
            // reenable form submit
            this._var.submitEnabled = true;
            
            // trigger iframe dimension recalculation
            this._var.results.triggerFrameCommunication();
        }

    });

    // register new control
    dhl.lib.util.setupControl('trackingForm', null, 'tracking-form', '.tracking');

});
/**
 * DHL.com javascript components
 * 
 * @title           TRACKING RESULTS
 * @description     receive tracking results
 * @namespace       dhl.comp.trackingResults
 * 
 * @author          Heimann
 * @version         2014.05.12
 */

$(function() {

    can.Control('dhl.classes.comp.trackingResults', {

        defaults: {
            ajax: {
                selector: '/shipmentTracking'
            },
            measurement: {
                enabled: false
            },
            iframe: {
                targetOrigin: 'http://www.dhl.de'
            },
            eddRedText: {
                Country: 'GB'
            },
            text: {
                loading: {
                    progress: 'Tracking results are being retrieved... Please stand by.'
                },
                messages: {
                    checkpoints: {
                        summary: 'DHL Express shipments checkpoints'
                    },
                    delivery: {
                        code: '100',
                        status: ''
                    },
                    details: {
                        all: {
                            hide: 'Hide All Details',
                            show: 'Show All Details'
                        },
                        furtherdetail: 'Further Detail',
                        nextstep: 'Next Step',
                        single: {
                            hide: 'Hide Details',
                            show: 'Show Details'
                        },
                        summary: 'Your DHL Express shipment no.'
                    },
                    duplicates: {
                        button: 'Resolve',
                        hint: 'Multiple shipments with the same identifier are present in our system. Please choose your Origin and Destination below. Please be assured that this will not impact your transit time.',
                        label: 'Resolve Duplicate',
                        summary: 'DHL Express shipments duplicates'
                    },
                    error: {
                        emptyResults: 'Tracking results are empty. Please try again later.',
                        label: 'Some of your queries resulted in an error',
                        noResults: 'Tracking results could not be loaded from server. Please try again later.'
                    },
                    extraShipmentDetails: {
                        header: {
                            details: 'Shipment Details...',
                            from: 'From',
                            information: 'Shipment Information',
                            to: 'To'
                        },
                        help: {
                            label: 'Help',
                            url: ''
                        },
                        summary: 'DHL Express extra shipments details'
                    },
                    label: 'Result summary',
                    print: 'Print'
                }
            },
            webtrends: {
                enabled: false
            }
        }

    }, {

        start: function() {
            this._var.measurement = dhl.comp.trackingMeasurement;
            // enable tracking measurement
            if ( this.options.measurement.enabled ) {
                this._var.measurement.enable();
            }
            // measure tracking execution time: overall start
            this._var.measurement.setStart( 'overall' );

            // check if component is embedded inside external domain page (e.g. dhl.de)
            this._var.iframe = {
                isConfigured: !dhl.lib.util.isBlank( this.options.iframe.targetOrigin ),
                isEmbedded: window != window.parent,
                isSameDomain: !dhl.lib.util.isBlank( window, 'parent.location.href' )
            };

            // get reference to component holding all parameters
            this._var.params = dhl.lib.util.getControl( this.element.closest( '.tracking' ) );
            // get parameter from url, filter, encode and store them
            var params = this._var.params.getFromUrl();

            // store form reference
            this._var.form = dhl.lib.util.getControl( this.element.closest( '.tracking' ).find( '.tracking-form' ) );

            // check if form reference is there
            if ( !dhl.lib.util.isBlank( this._var.form ) ) {

                // populate form with url params and check if ready for submit
                if ( this._var.form.populateForm( params ) ) {
                    // submit form asynchronously (and trigger load results, if validation is successful)
                    window.setTimeout( can.proxy( function() {
                        can.$( 'form', this._var.form.element ).submit();
                    }, this ), 250 );
                } else {
                    // show form if not submitable
                    this._var.form.showForm();
                }
            }
        },

        /**
         * clear former tracking result output
         * skip scripts and chat module
         */
        clearResults: function() {
            this.element.addClass( 'hd' ).children().not( 'script, .tracking-chat' ).remove();
        },

        /**
         * adjust various section to display results properly: tracking form, sidebar
         */
        hideEnvironment: function() {
            this._var.form.showNewSearchOption();

            can.$( '.main' ).addClass( 'tracking-progress' );
        },

        /**
         * Set red color for GB EDD available message on tracking result
         */
        setEddGBRed: function() {
            var Country = this._var.params.options.params.countryCode,
                eddCountry = this.options.eddRedText.Country;
            if ( Country.value.toLowerCase() == eddCountry.toLocaleLowerCase()) {
                        can.$('.result-eddd-label', this.element).addClass('eddd-label-red');
                        can.$('.result-eddd-date-text', this.element).addClass('eddd-text-red');
                        can.$('.result-eddd-product-text', this.element).addClass('eddd-text-red');
                }
        },

        /**
         * restore various section to display tracking form properly
         */
        showEnvironment: function() {
            can.$( '.main' ).removeClass( 'tracking-progress' );
        },

        /**
         * Remove hint
         */
        hideLoadingState: function() {
            this.element.find( 'p.loading' ).remove();
            this._var.form.hideLoadingState();
            can.$( '.tracking-chat', this.element ).removeClass( 'hd' );
        },

        /**
         * Display hint to users, while ajax call is being processed
         */
        showLoadingState: function() {
            this._var.form.showLoadingState();
            this.element.prepend( '<p class="loading">' + this.options.text.loading.progress + '</p>' );
            can.$( '.tracking-chat', this.element ).addClass( 'hd' );
            this.element.removeClass( 'hd' );
        },

        /**
         * load tracking results (JSON) via AJAX
         * display them depending on tracking type
         */
        loadResults: function() {
            // remove old results 
            this.clearResults();

            // display loading... state and show tracking results section 
            this.showLoadingState();
            
            // remember current component
            var comp = this;

            // measure tracking execution time: ajax call start
            this._var.measurement.setStart( 'ajax' );

            // trigger backend call
            can.ajax({
                cache: false,
                dataType: "json",
                url: window.location.protocol + '//' + window.location.host + this.options.ajax.selector,
                data: this._var.params.serialize( null, false, true ), // map certain parameters for ajax call
                success: function( response, status, xhr ) {
                    // measure tracking execution time: ajax call stop
                    comp._var.measurement.setStop( 'ajax' );

                    dhl.lib.debug.log( 'Tracking: Ajax call successful', 'info' );
                    comp.displayResults( response, comp );
                },
                error: function() {
                    dhl.lib.debug.log( 'Tracking: Ajax call failed', 'warn' );
                    comp.displayResults( {
                        errors: [ {
                            message: comp.options.text.messages.error.noResults
                        } ]
                    }, comp );
                }
            });
        },

        /**
         * make sure given data structure to template is complete
         * @param {Object} obj - response or precomposed object
         * @return {Object} - object with complete data structure for template
         */
        prepareTemplateInput: function( obj ) {
            return can.extend( {
                duplicates: {},
                errors: [],
                messages: [],
                results: [],
                signature: []
            }, obj );
        },

        /**
         * display tracking results
         * @param {Object} response - JSON response
         * @param {Object} comp - tracking component
         */
        displayResults: function( response, comp ) {
            // hide loading state
            this._var.form.showForm();
            this.hideLoadingState();
            this.hideEnvironment();
            
            // find duplicates and prepare for template
            if ( !dhl.lib.util.isBlank( response.results ) ) {
                var duplicates = {
                    results: {},
                    total: 0
                };
    
                can.each( response.results, function( result, i ) {
                    if ( result.duplicate ) {
                        duplicates.total++;
                        // gather all duplicates
                        dhl.lib.util.isBlank( duplicates.results[ result.id ] ) ? duplicates.results[ result.id ] = [ i ] : duplicates.results[ result.id ].push( i );
                    }
                });
            }

            // Fallback mapping for delivery status if no status is provided
            can.each( response.results, can.proxy( function( result, i) {
                if ( dhl.lib.util.isBlank( result.delivery ) ) {
                    result.delivery = this.options.text.messages.delivery;
                }
            }, this ) );

            // prepare template input
            var resultData = this.prepareTemplateInput( can.extend( {}, response, {
                duplicates: duplicates,
                messages: this.options.text.messages
            } ) );
            comp.element.append( can.view( 'tracking-results-express-template', resultData ) );

            // measure tracking execution time: overall stop
            this._var.measurement.setStop( 'overall' );
            // analyze measurements
            this._var.measurement.analyze( this._var.form._var.isShipment );
            
            // trigger iframe height recalculation, if embedded inside portal (non-tracking code)
            var smepBaseURL = this._var.params.options.params.smepBaseURL;
            if ( typeof( updateIframeHeight ) === 'function' && !dhl.lib.util.isBlank( smepBaseURL, 'value' ) ) {
                updateIframeHeight( smepBaseURL.value );
            }
            
            // trigger iframe dimension recalculation, if embedded inside external domain page (e.g. dhl.de)
            this.triggerFrameCommunication();

            // change to red EDD available message for GB only
            this.setEddGBRed();
        },

        /**
         * retrieve text for show/hide details link, depending on checkpoints visibility
         * @param {Object} checkpoints
         * @return {String} - text of details link
         */
        toggleText: function( checkpoints ) {
            return checkpoints.css( 'display' ) == 'none' ? this.options.text.messages.details.single.show : this.options.text.messages.details.single.hide;
        },

        /**
         * trigger iframe communication and send iframe dimensions
         * use fall back if postMessage feature is not supported
         */
        triggerFrameCommunication: function() {
            if ( this._var.iframe.isEmbedded ) {
                // dhl.de variant
                if ( this._var.iframe.isConfigured ) {
                    var dimensions = can.param( dhl.lib.util.getDimensions( 'body' ) );

                    if ( typeof( window.postMessage ) != 'function') { // IE browser in IE7 emulate mode
                        window.parent.name = dimensions + '&origin=' + this.options.iframe.targetOrigin;
                    } else {
                        window.parent.postMessage( dimensions, this.options.iframe.targetOrigin );
                    }
                }
                
                // MyDHL variant (trigger listener on div element)
                if ( this._var.iframe.isSameDomain ) {
                    this._var.form.element.trigger( 'click' );
                }
            }
        },

        // add listener to show/hide single result details
        '.tracking-result .result-details-toggle a click': function( el, ev, args ) {
            dhl.lib.event.stop( ev );

            var result = el.closest( '.tracking-result' ),
                checkpoints = result.find( '.result-checkpoints' ),
                extraDetails = result.find( '.result-extra-shipment-details' );
            
            if ( args === undefined ) {
                checkpoints.fadeToggle( can.proxy( function() {
                    el.toggleClass( 'show' ).text( this.toggleText( checkpoints ) );

                    // trigger iframe dimension recalculation
                    this.triggerFrameCommunication();
                }, this ) );
                extraDetails.fadeToggle();
            } else if ( args ) {
                checkpoints.fadeIn( can.proxy( function() {
                    el.removeClass( 'show' ).text( this.toggleText( checkpoints ) );

                    // trigger iframe dimension recalculation
                    this.triggerFrameCommunication();
                }, this ) );
                extraDetails.fadeIn();
            } else {
                checkpoints.fadeOut( can.proxy( function() {
                    el.addClass( 'show' ).text( this.toggleText( checkpoints ) );

                    // trigger iframe dimension recalculation
                    this.triggerFrameCommunication();
                }, this ) );
                extraDetails.fadeOut();
            }
        },

        // add listener to show/hide all result details
        '.result-details-toggle-all a click': function( el, ev ) {
            dhl.lib.event.stop( ev );
            
            var show = el.hasClass( 'show' );
            el.text( !show ? this.options.text.messages.details.all.show : this.options.text.messages.details.all.hide );
            can.trigger( el.closest( '.tracking-results' ).find( '.result-details-toggle a' ), 'click' , [ show ]);
            el.toggleClass( 'show' );
        },

        // add listener to show/hide all pieceID details in summary
        '.result-pieces p click': function( el, ev ) {
            dhl.lib.event.stop( ev );
            
            el.toggleClass( 'close' ).next( 'ul' ).slideToggle( can.proxy( this.triggerFrameCommunication, this ) );
        },

        // add listener to show/hide all event remarks/next steps
        '.result-event-remarks strong click': function( el, ev ) {
            dhl.lib.event.stop( ev );
            
            var remarks = el.closest( 'tr' ).find( 'p' );
            
            el.toggleClass( 'close' );
            remarks.slideToggle( can.proxy( this.triggerFrameCommunication, this ) );
        },

        // add listener to trigger WebTrends on single ePod link
        '.result-summary .waybill a click': function( el, ev ) {
            if ( !dhl.lib.util.isBlank( this.options.webtrends, 'single' ) && this.options.webtrends.enabled ) {
                dcsMultiTrack( 'DCS.dcsuri' , el.attr( 'href' ), this.options.webtrends.single.tags );
            }
        },

        // add listener to trigger WebTrends on all ePod link
        '.result-epods a click': function( el, ev ) {
            if ( !dhl.lib.util.isBlank( this.options.webtrends, 'multiple' ) && this.options.webtrends.enabled ) {
                dcsMultiTrack( 'DCS.dcsuri' , this.options.webtrends.multiple.url, this.options.webtrends.multiple.tags );
            }
        },

        // add listener to show chosen duplicate
        '.result-duplicates submit': function( el, ev ) {
            dhl.lib.event.stop( ev );
            
            // get duplicate selection
            var selectedDuplicate = el.find( 'input:checked' );

            if (selectedDuplicate.length > 0) {
                var index = selectedDuplicate.closest( 'tr' ).attr( 'data-result-index' ),
                    duplicatesWrapper = el.closest( '.tracking-duplicates' ),
                    numberOfDuplicatesSections = duplicatesWrapper.find( '.result-duplicates' ).length,
                    resultHeader = can.$( '.tracking-result-header', this.element ),
                    resultDetailsToggle = can.$( '.result-details-toggle-all', resultHeader ),
                    results = can.$( '.tracking-result', this.element ),
                    resultEpods = can.$( '.result-epods',  this.element ),
                    resultPrint = can.$( '.results-print',  this.element );

                if ( resultHeader.hasClass( 'hd') ) {
                    duplicatesWrapper.removeClass( 'all-results' );
                    resultDetailsToggle.addClass( 'hd' );
                    resultEpods.addClass( 'hd' );
                    resultHeader.removeClass( 'hd' );
                    resultPrint.removeClass( 'hd' );
                }
                
                // display checkpoints directly only
                // - if this is the first result visible
                // - if only one table with duplicates is present
                if ( results.filter(":visible").length == 0 && numberOfDuplicatesSections == 1 ) {
                    var checkpoints = results.eq( index ).find( '.result-checkpoints' );
                    checkpoints.addClass( 'show' );
                    can.trigger( results.eq( index ).find( '.result-details-toggle a' ), 'click' , [ checkpoints.hasClass( 'show' ) ]);
                }

                results.eq( index ).fadeIn( can.proxy( function() {
                    // display show all details links only if more than 1 result visible
                    if ( results.filter(":visible").length > 1 ) {
                        resultDetailsToggle.removeClass( 'hd' );
                        resultEpods.removeClass( 'hd' );
                    }
    
                    if ( numberOfDuplicatesSections == 1 ) {
                        duplicatesWrapper.slideUp( can.proxy( function() {
                            // remove duplicates section completely
                           duplicatesWrapper.remove();

                            // trigger iframe dimension recalculation
                            this.triggerFrameCommunication();
                        }, this ) );
                    } else {
                        var closestDuplicate = el.closest( '.result-duplicates' );
                        closestDuplicate.slideUp( can.proxy( function() {
                            // remove table completely
                            closestDuplicate.remove();

                            // trigger iframe dimension recalculation
                            this.triggerFrameCommunication();
                        }, this ) );
                    }
                }, this ) );
            };

            return false;
        },

        // add listener to print button
        '.results-print click': function( el, ev ) {
            dhl.lib.event.stop( ev );
            
            window.print();
        }

    });

    // register new control
    dhl.lib.util.setupControl('trackingResults', null, 'tracking-results', '.tracking');

});
