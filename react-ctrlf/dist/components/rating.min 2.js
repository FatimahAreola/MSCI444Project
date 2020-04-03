 /*
 * # Fomantic UI - 2.8.4
 * https://github.com/fomantic/Fomantic-UI
 * http://fomantic-ui.com/
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
!function(A,e,T){"use strict";A.isFunction=A.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),A.fn.rating=function(f){var v,p=A(this),b=p.selector||"",h=(new Date).getTime(),y=[],C=f,x="string"==typeof C,R=[].slice.call(arguments,1);return p.each(function(){var e,o,r=A.isPlainObject(f)?A.extend(!0,{},A.fn.rating.settings,f):A.extend({},A.fn.rating.settings),n=r.namespace,s=r.className,t=r.metadata,i=r.selector,l=r.cssVars,a="."+n,c="module-"+n,u=this,d=A(this).data(c),g=A(this),m=g.find(i.icon);o={initialize:function(){o.verbose("Initializing rating module",r),0===m.length&&o.setup.layout(),r.interactive&&!o.is.disabled()?o.enable():o.disable(),o.set.initialLoad(),o.set.rating(o.get.initialRating()),o.remove.initialLoad(),o.instantiate()},instantiate:function(){o.verbose("Instantiating module",r),d=o,g.data(c,o)},destroy:function(){o.verbose("Destroying previous instance",d),o.remove.events(),g.removeData(c)},refresh:function(){m=g.find(i.icon)},setup:{layout:function(){var e=o.get.maxRating(),n=o.get.icon(),t=A.fn.rating.settings.templates.icon(e,n);o.debug("Generating icon html dynamically"),g.html(t),o.refresh()}},event:{mouseenter:function(){var e=A(this);e.nextAll().removeClass(s.selected),g.addClass(s.selected),e.addClass(s.selected).prevAll().addClass(s.selected)},mouseleave:function(){g.removeClass(s.selected),m.removeClass(s.selected)},click:function(){var e=A(this),n=o.get.rating(),t=m.index(e)+1;("auto"==r.clearable?1===m.length:r.clearable)&&n==t?o.clearRating():o.set.rating(t)}},clearRating:function(){o.debug("Clearing current rating"),o.set.rating(0)},bind:{events:function(){o.verbose("Binding events"),g.on("mouseenter"+a,i.icon,o.event.mouseenter).on("mouseleave"+a,i.icon,o.event.mouseleave).on("click"+a,i.icon,o.event.click)}},remove:{events:function(){o.verbose("Removing events"),g.off(a)},initialLoad:function(){e=!1}},enable:function(){o.debug("Setting rating to interactive mode"),o.bind.events(),g.removeClass(s.disabled)},disable:function(){o.debug("Setting rating to read-only mode"),o.remove.events(),g.addClass(s.disabled)},is:{initialLoad:function(){return e},disabled:function(){return g.hasClass(s.disabled)}},get:{icon:function(){var e=g.data(t.icon);return e&&g.removeData(t.icon),e||r.icon},initialRating:function(){return g.data(t.rating)!==T?(g.removeData(t.rating),g.data(t.rating)):r.initialRating},maxRating:function(){return g.data(t.maxRating)!==T?(g.removeData(t.maxRating),g.data(t.maxRating)):r.maxRating},rating:function(){var e=m.filter("."+s.active).length;return o.verbose("Current rating retrieved",e),e}},set:{rating:function(e){var n=Math.floor(0<=e-1?e-1:0),t=m.eq(n),i=e<=1?t:t.next(),a=e%1*100;g.removeClass(s.selected),m.removeClass(s.selected).removeClass(s.active).removeClass(s.partiallyActive),0<e&&(o.verbose("Setting current rating to",e),t.prevAll().addBack().addClass(s.active),t.next()&&e%1!=0&&(i.addClass(s.partiallyActive).addClass(s.active),i.css(l.filledCustomPropName,a+"%"),"transparent"===i.css("backgroundColor")&&i.removeClass(s.partiallyActive).removeClass(s.active))),o.is.initialLoad()||r.onRate.call(u,e)},initialLoad:function(){e=!0}},setting:function(e,n){if(o.debug("Changing setting",e,n),A.isPlainObject(e))A.extend(!0,r,e);else{if(n===T)return r[e];A.isPlainObject(r[e])?A.extend(!0,r[e],n):r[e]=n}},internal:function(e,n){if(A.isPlainObject(e))A.extend(!0,o,e);else{if(n===T)return o[e];o[e]=n}},debug:function(){!r.silent&&r.debug&&(r.performance?o.performance.log(arguments):(o.debug=Function.prototype.bind.call(console.info,console,r.name+":"),o.debug.apply(console,arguments)))},verbose:function(){!r.silent&&r.verbose&&r.debug&&(r.performance?o.performance.log(arguments):(o.verbose=Function.prototype.bind.call(console.info,console,r.name+":"),o.verbose.apply(console,arguments)))},error:function(){r.silent||(o.error=Function.prototype.bind.call(console.error,console,r.name+":"),o.error.apply(console,arguments))},performance:{log:function(e){var n,t;r.performance&&(t=(n=(new Date).getTime())-(h||n),h=n,y.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:u,"Execution Time":t})),clearTimeout(o.performance.timer),o.performance.timer=setTimeout(o.performance.display,500)},display:function(){var e=r.name+":",t=0;h=!1,clearTimeout(o.performance.timer),A.each(y,function(e,n){t+=n["Execution Time"]}),e+=" "+t+"ms",b&&(e+=" '"+b+"'"),1<p.length&&(e+=" ("+p.length+")"),(console.group!==T||console.table!==T)&&0<y.length&&(console.groupCollapsed(e),console.table?console.table(y):A.each(y,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),y=[]}},invoke:function(i,e,n){var a,o,t,r=d;return e=e||R,n=u||n,"string"==typeof i&&r!==T&&(i=i.split(/[\. ]/),a=i.length-1,A.each(i,function(e,n){var t=e!=a?n+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(A.isPlainObject(r[t])&&e!=a)r=r[t];else{if(r[t]!==T)return o=r[t],!1;if(!A.isPlainObject(r[n])||e==a)return r[n]!==T&&(o=r[n]),!1;r=r[n]}})),A.isFunction(o)?t=o.apply(n,e):o!==T&&(t=o),Array.isArray(v)?v.push(t):v!==T?v=[v,t]:t!==T&&(v=t),o}},x?(d===T&&o.initialize(),o.invoke(C)):(d!==T&&d.invoke("destroy"),o.initialize())}),v!==T?v:this},A.fn.rating.settings={name:"Rating",namespace:"rating",icon:"star",silent:!1,debug:!1,verbose:!1,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",fireOnInit:!1,onRate:function(e){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating",icon:"icon"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading",partiallyActive:"partial"},cssVars:{filledCustomPropName:"--full"},selector:{icon:".icon"},templates:{icon:function(e,n){for(var t=1,i="";t<=e;)i+='<i class="'+n+' icon"></i>',t++;return i}}}}(jQuery,window,void document);