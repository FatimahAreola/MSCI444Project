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
!function(j,O,k,I){"use strict";j.isWindow=j.isWindow||function(e){return null!=e&&e===e.window},j.isFunction=j.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},O=void 0!==O&&O.Math==Math?O:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),j.fn.tab=function(l){var d,u=j.isFunction(this)?j(O):j(this),b=u.selector||"",g=(new Date).getTime(),f=[],F=l,w="string"==typeof F,S=[].slice.call(arguments,1),E=!1;return u.each(function(){var h,o,p,v,m,y,T=j.isPlainObject(l)?j.extend(!0,{},j.fn.tab.settings,l):j.extend({},j.fn.tab.settings),L=T.className,x=T.metadata,t=T.selector,A=T.error,a=T.regExp,e="."+T.namespace,n="module-"+T.namespace,P=j(this),i={},C=!0,r=0,s=this,c=P.data(n);m={initialize:function(){m.debug("Initializing tab menu item",P),m.fix.callbacks(),m.determineTabs(),m.debug("Determining tabs",T.context,o),T.auto&&m.set.auto(),m.bind.events(),T.history&&!E&&(m.initializeHistory(),E=!0),c===I&&null==m.determine.activeTab()&&(m.debug("No active tab detected, setting first tab active",m.get.initialPath()),m.changeTab(m.get.initialPath())),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),c=m,P.data(n,m)},destroy:function(){m.debug("Destroying tabs",P),P.removeData(n).off(e)},bind:{events:function(){j.isWindow(s)||(m.debug("Attaching tab activation events to element",P),P.on("click"+e,m.event.click))}},determineTabs:function(){var e;"parent"===T.context?(0<P.closest(t.ui).length?(e=P.closest(t.ui),m.verbose("Using closest UI element as parent",e)):e=P,h=e.parent(),m.verbose("Determined parent element for creating context",h)):T.context?(h=j(T.context),m.verbose("Using selector for tab context",T.context,h)):h=j("body"),T.childrenOnly?(o=h.children(t.tabs),m.debug("Searching tab context children for tabs",h,o)):(o=h.find(t.tabs),m.debug("Searching tab context for tabs",h,o))},fix:{callbacks:function(){j.isPlainObject(l)&&(l.onTabLoad||l.onTabInit)&&(l.onTabLoad&&(l.onLoad=l.onTabLoad,delete l.onTabLoad,m.error(A.legacyLoad,l.onLoad)),l.onTabInit&&(l.onFirstLoad=l.onTabInit,delete l.onTabInit,m.error(A.legacyInit,l.onFirstLoad)),T=j.extend(!0,{},j.fn.tab.settings,l))}},initializeHistory:function(){if(m.debug("Initializing page state"),j.address===I)return m.error(A.state),!1;if("state"==T.historyType){if(m.debug("Using HTML5 to manage state"),!1===T.path)return m.error(A.path),!1;j.address.history(!0).state(T.path)}j.address.bind("change",m.event.history.change)},event:{click:function(e){var t=j(this).data(x.tab);t!==I?(T.history?(m.verbose("Updating page state",e),j.address.value(t)):(m.verbose("Changing tab",e),m.changeTab(t)),e.preventDefault()):m.debug("No tab specified")},history:{change:function(e){var t=e.pathNames.join("/")||m.get.initialPath(),a=T.templates.determineTitle(t)||!1;m.performance.display(),m.debug("History change event",t,e),y=e,t!==I&&m.changeTab(t),a&&j.address.title(a)}}},refresh:function(){p&&(m.debug("Refreshing tab",p),m.changeTab(p))},cache:{read:function(e){return e!==I&&i[e]},add:function(e,t){e=e||p,m.debug("Adding cached content for",e),i[e]=t},remove:function(e){e=e||p,m.debug("Removing cached content for",e),delete i[e]}},escape:{string:function(e){return(e=String(e)).replace(a.escape,"\\$&")}},set:{auto:function(){var e="string"==typeof T.path?T.path.replace(/\/$/,"")+"/{$tab}":"/{$tab}";m.verbose("Setting up automatic tab retrieval from server",e),j.isPlainObject(T.apiSettings)?T.apiSettings.url=e:T.apiSettings={url:e}},loading:function(e){var t=m.get.tabElement(e);t.hasClass(L.loading)||(m.verbose("Setting loading state for",t),t.addClass(L.loading).siblings(o).removeClass(L.active+" "+L.loading),0<t.length&&T.onRequest.call(t[0],e))},state:function(e){j.address.value(e)}},changeTab:function(u){var b=O.history&&O.history.pushState&&T.ignoreFirstLoad&&C,g=T.auto||j.isPlainObject(T.apiSettings),f=g&&!b?m.utilities.pathToArray(u):m.get.defaultPathArray(u);u=m.utilities.arrayToPath(f),j.each(f,function(e,t){var a,n,i,o,r=f.slice(0,e+1),s=m.utilities.arrayToPath(r),c=m.is.tab(s),l=e+1==f.length,d=m.get.tabElement(s);if(m.verbose("Looking for tab",t),c){if(m.verbose("Tab was found",t),p=s,v=m.utilities.filterArray(f,r),l?o=!0:(n=f.slice(0,e+2),i=m.utilities.arrayToPath(n),(o=!m.is.tab(i))&&m.verbose("Tab parameters found",n)),o&&g)return b?(m.debug("Ignoring remote content on first tab load",s),C=!1,m.cache.add(u,d.html()),m.activate.all(s),T.onFirstLoad.call(d[0],s,v,y),T.onLoad.call(d[0],s,v,y)):(m.activate.navigation(s),m.fetch.content(s,u)),!1;m.debug("Opened local tab",s),m.activate.all(s),m.cache.read(s)||(m.cache.add(s,!0),m.debug("First time tab loaded calling tab init"),T.onFirstLoad.call(d[0],s,v,y)),T.onLoad.call(d[0],s,v,y)}else{if(-1!=u.search("/")||""===u)return m.error(A.missingTab,P,h,s),!1;if(u=m.escape.string(u),s=(a=j("#"+u+', a[name="'+u+'"]')).closest("[data-tab]").data(x.tab),d=m.get.tabElement(s),a&&0<a.length&&s)return m.debug("Anchor link used, opening parent tab",d,a),d.hasClass(L.active)||setTimeout(function(){m.scrollTo(a)},0),m.activate.all(s),m.cache.read(s)||(m.cache.add(s,!0),m.debug("First time tab loaded calling tab init"),T.onFirstLoad.call(d[0],s,v,y)),T.onLoad.call(d[0],s,v,y),!1}})},scrollTo:function(e){var t=!!(e&&0<e.length)&&e.offset().top;!1!==t&&(m.debug("Forcing scroll to an in-page link in a hidden tab",t,e),j(k).scrollTop(t))},update:{content:function(e,t,a){var n=m.get.tabElement(e),i=n[0];a=a!==I?a:T.evaluateScripts,"string"==typeof T.cacheType&&"dom"==T.cacheType.toLowerCase()&&"string"!=typeof t?n.empty().append(j(t).clone(!0)):a?(m.debug("Updating HTML and evaluating inline scripts",e,t),n.html(t)):(m.debug("Updating HTML",e,t),i.innerHTML=t)}},fetch:{content:function(t,a){var e,n,i=m.get.tabElement(t),o={dataType:"html",encodeParameters:!1,on:"now",cache:T.alwaysRefresh,headers:{"X-Remote":!0},onSuccess:function(e){"response"==T.cacheType&&m.cache.add(a,e),m.update.content(t,e),t==p?(m.debug("Content loaded",t),m.activate.tab(t)):m.debug("Content loaded in background",t),T.onFirstLoad.call(i[0],t,v,y),T.onLoad.call(i[0],t,v,y),T.loadOnce?m.cache.add(a,!0):"string"==typeof T.cacheType&&"dom"==T.cacheType.toLowerCase()&&0<i.children().length?setTimeout(function(){var e=i.children().clone(!0);e=e.not("script"),m.cache.add(a,e)},0):m.cache.add(a,i.html())},urlData:{tab:a}},r=i.api("get request")||!1,s=r&&"pending"===r.state();a=a||t,n=m.cache.read(a),T.cache&&n?(m.activate.tab(t),m.debug("Adding cached content",a),T.loadOnce||("once"==T.evaluateScripts?m.update.content(t,n,!1):m.update.content(t,n)),T.onLoad.call(i[0],t,v,y)):s?(m.set.loading(t),m.debug("Content is already loading",a)):j.api!==I?(e=j.extend(!0,{},T.apiSettings,o),m.debug("Retrieving remote content",a,e),m.set.loading(t),i.api(e)):m.error(A.api)}},activate:{all:function(e){m.activate.tab(e),m.activate.navigation(e)},tab:function(e){var t=m.get.tabElement(e),a="siblings"==T.deactivate?t.siblings(o):o.not(t),n=t.hasClass(L.active);m.verbose("Showing tab content for",t),n||(t.addClass(L.active),a.removeClass(L.active+" "+L.loading),0<t.length&&T.onVisible.call(t[0],e))},navigation:function(e){var t=m.get.navElement(e),a="siblings"==T.deactivate?t.siblings(u):u.not(t),n=t.hasClass(L.active);m.verbose("Activating tab navigation for",t,e),n||(t.addClass(L.active),a.removeClass(L.active+" "+L.loading))}},deactivate:{all:function(){m.deactivate.navigation(),m.deactivate.tabs()},navigation:function(){u.removeClass(L.active)},tabs:function(){o.removeClass(L.active+" "+L.loading)}},is:{tab:function(e){return e!==I&&0<m.get.tabElement(e).length}},get:{initialPath:function(){return u.eq(0).data(x.tab)||o.eq(0).data(x.tab)},path:function(){return j.address.value()},defaultPathArray:function(e){return m.utilities.pathToArray(m.get.defaultPath(e))},defaultPath:function(e){var t=u.filter("[data-"+x.tab+'^="'+m.escape.string(e)+'/"]').eq(0).data(x.tab)||!1;if(t){if(m.debug("Found default tab",t),r<T.maxDepth)return r++,m.get.defaultPath(t);m.error(A.recursion)}else m.debug("No default tabs found for",e,o);return r=0,e},navElement:function(e){return e=e||p,u.filter("[data-"+x.tab+'="'+m.escape.string(e)+'"]')},tabElement:function(e){var t,a,n,i;return e=e||p,n=m.utilities.pathToArray(e),i=m.utilities.last(n),t=o.filter("[data-"+x.tab+'="'+m.escape.string(e)+'"]'),a=o.filter("[data-"+x.tab+'="'+m.escape.string(i)+'"]'),0<t.length?t:a},tab:function(){return p}},determine:{activeTab:function(){var n=null;return o.each(function(e,t){if(j(t).hasClass(L.active)){var a=j(this).data(x.tab);u.filter("[data-"+x.tab+'="'+m.escape.string(a)+'"]').hasClass(L.active)&&(n=a)}}),n}},utilities:{filterArray:function(e,t){return j.grep(e,function(e){return-1==j.inArray(e,t)})},last:function(e){return!!Array.isArray(e)&&e[e.length-1]},pathToArray:function(e){return e===I&&(e=p),"string"==typeof e?e.split("/"):[e]},arrayToPath:function(e){return!!Array.isArray(e)&&e.join("/")}},setting:function(e,t){if(m.debug("Changing setting",e,t),j.isPlainObject(e))j.extend(!0,T,e);else{if(t===I)return T[e];j.isPlainObject(T[e])?j.extend(!0,T[e],t):T[e]=t}},internal:function(e,t){if(j.isPlainObject(e))j.extend(!0,m,e);else{if(t===I)return m[e];m[e]=t}},debug:function(){!T.silent&&T.debug&&(T.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,T.name+":"),m.debug.apply(console,arguments)))},verbose:function(){!T.silent&&T.verbose&&T.debug&&(T.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,T.name+":"),m.verbose.apply(console,arguments)))},error:function(){T.silent||(m.error=Function.prototype.bind.call(console.error,console,T.name+":"),m.error.apply(console,arguments))},performance:{log:function(e){var t,a;T.performance&&(a=(t=(new Date).getTime())-(g||t),g=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:s,"Execution Time":a})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var e=T.name+":",a=0;g=!1,clearTimeout(m.performance.timer),j.each(f,function(e,t){a+=t["Execution Time"]}),e+=" "+a+"ms",b&&(e+=" '"+b+"'"),(console.group!==I||console.table!==I)&&0<f.length&&(console.groupCollapsed(e),console.table?console.table(f):j.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(n,e,t){var i,o,a,r=c;return e=e||S,t=s||t,"string"==typeof n&&r!==I&&(n=n.split(/[\. ]/),i=n.length-1,j.each(n,function(e,t){var a=e!=i?t+n[e+1].charAt(0).toUpperCase()+n[e+1].slice(1):n;if(j.isPlainObject(r[a])&&e!=i)r=r[a];else{if(r[a]!==I)return o=r[a],!1;if(!j.isPlainObject(r[t])||e==i)return r[t]!==I?o=r[t]:m.error(A.method,n),!1;r=r[t]}})),j.isFunction(o)?a=o.apply(t,e):o!==I&&(a=o),Array.isArray(d)?d.push(a):d!==I?d=[d,a]:a!==I&&(d=a),o}},w?(c===I&&m.initialize(),m.invoke(F)):(c!==I&&c.invoke("destroy"),m.initialize())}),d!==I?d:this},j.tab=function(){j(O).tab.apply(this,arguments)},j.fn.tab.settings={name:"Tab",namespace:"tab",silent:!1,debug:!1,verbose:!1,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,deactivate:"siblings",alwaysRefresh:!1,cache:!0,loadOnce:!1,cacheType:"response",ignoreFirstLoad:!1,apiSettings:!1,evaluateScripts:"once",onFirstLoad:function(e,t,a){},onLoad:function(e,t,a){},onVisible:function(e,t,a){},onRequest:function(e,t,a){},templates:{determineTitle:function(e){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found. Tabs are case-sensitive.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",legacyInit:"onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.",legacyLoad:"onTabLoad has been renamed to onLoad in 2.0. Please adjust your code",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},regExp:{escape:/[-[\]{}()*+?.,\\^$|#\s:=@]/g},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}}(jQuery,window,document);