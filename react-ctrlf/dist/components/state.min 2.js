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
!function(w,e,C){"use strict";w.isFunction=w.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),w.fn.state=function(v){var g,b=w(this),x=b.selector||"",p=(new Date).getTime(),h=[],m=v,T="string"==typeof m,y=[].slice.call(arguments,1);return b.each(function(){var c,i=w.isPlainObject(v)?w.extend(!0,{},w.fn.state.settings,v):w.extend({},w.fn.state.settings),r=i.error,n=i.metadata,t=i.className,e=i.namespace,a=i.states,o=i.text,s="."+e,l=e+"-module",u=w(this),d=this,f=u.data(l);c={initialize:function(){c.verbose("Initializing module"),i.automatic&&c.add.defaults(),i.context&&""!==x?w(i.context).on(x,"mouseenter"+s,c.change.text).on(x,"mouseleave"+s,c.reset.text).on(x,"click"+s,c.toggle.state):u.on("mouseenter"+s,c.change.text).on("mouseleave"+s,c.reset.text).on("click"+s,c.toggle.state),c.instantiate()},instantiate:function(){c.verbose("Storing instance of module",c),f=c,u.data(l,c)},destroy:function(){c.verbose("Destroying previous module",f),u.off(s).removeData(l)},refresh:function(){c.verbose("Refreshing selector cache"),u=w(d)},add:{defaults:function(){var n=v&&w.isPlainObject(v.states)?v.states:{};w.each(i.defaults,function(e,t){c.is[e]!==C&&c.is[e]()&&(c.verbose("Adding default states",e,d),w.extend(i.states,t,n))})}},is:{active:function(){return u.hasClass(t.active)},loading:function(){return u.hasClass(t.loading)},inactive:function(){return!u.hasClass(t.active)},state:function(e){return t[e]!==C&&u.hasClass(t[e])},enabled:function(){return!u.is(i.filter.active)},disabled:function(){return u.is(i.filter.active)},textEnabled:function(){return!u.is(i.filter.text)},button:function(){return u.is(".button:not(a, .submit)")},input:function(){return u.is("input")},progress:function(){return u.is(".ui.progress")}},allow:function(e){c.debug("Now allowing state",e),a[e]=!0},disallow:function(e){c.debug("No longer allowing",e),a[e]=!1},allows:function(e){return a[e]||!1},enable:function(){u.removeClass(t.disabled)},disable:function(){u.addClass(t.disabled)},setState:function(e){c.allows(e)&&u.addClass(t[e])},removeState:function(e){c.allows(e)&&u.removeClass(t[e])},toggle:{state:function(){var e;if(c.allows("active")&&c.is.enabled()){if(c.refresh(),w.fn.api!==C)if(e=u.api("get request"),u.api("was cancelled"))c.debug("API Request cancelled by beforesend"),i.activateTest=function(){return!1},i.deactivateTest=function(){return!1};else if(e)return void c.listenTo(e);c.change.state()}}},listenTo:function(e){c.debug("API request detected, waiting for state signal",e),e&&(o.loading&&c.update.text(o.loading),w.when(e).then(function(){"resolved"==e.state()?(c.debug("API request succeeded"),i.activateTest=function(){return!0},i.deactivateTest=function(){return!0}):(c.debug("API request failed"),i.activateTest=function(){return!1},i.deactivateTest=function(){return!1}),c.change.state()}))},change:{state:function(){c.debug("Determining state change direction"),c.is.inactive()?c.activate():c.deactivate(),i.sync&&c.sync(),i.onChange.call(d)},text:function(){c.is.textEnabled()&&(c.is.disabled()?(c.verbose("Changing text to disabled text",o.hover),c.update.text(o.disabled)):c.is.active()?o.hover?(c.verbose("Changing text to hover text",o.hover),c.update.text(o.hover)):o.deactivate&&(c.verbose("Changing text to deactivating text",o.deactivate),c.update.text(o.deactivate)):o.hover?(c.verbose("Changing text to hover text",o.hover),c.update.text(o.hover)):o.activate&&(c.verbose("Changing text to activating text",o.activate),c.update.text(o.activate)))}},activate:function(){i.activateTest.call(d)&&(c.debug("Setting state to active"),u.addClass(t.active),c.update.text(o.active),i.onActivate.call(d))},deactivate:function(){i.deactivateTest.call(d)&&(c.debug("Setting state to inactive"),u.removeClass(t.active),c.update.text(o.inactive),i.onDeactivate.call(d))},sync:function(){c.verbose("Syncing other buttons to current state"),c.is.active()?b.not(u).state("activate"):b.not(u).state("deactivate")},get:{text:function(){return i.selector.text?u.find(i.selector.text).text():u.html()},textFor:function(e){return o[e]||!1}},flash:{text:function(e,t,n){var a=c.get.text();c.debug("Flashing text message",e,t),e=e||i.text.flash,t=t||i.flashDuration,n=n||function(){},c.update.text(e),setTimeout(function(){c.update.text(a),n.call(d)},t)}},reset:{text:function(){var e=o.active||u.data(n.storedText),t=o.inactive||u.data(n.storedText);c.is.textEnabled()&&(c.is.active()&&e?(c.verbose("Resetting active text",e),c.update.text(e)):t&&(c.verbose("Resetting inactive text",e),c.update.text(t)))}},update:{text:function(e){var t=c.get.text();e&&e!==t?(c.debug("Updating text",e),i.selector.text?u.data(n.storedText,e).find(i.selector.text).text(e):u.data(n.storedText,e).html(e)):c.debug("Text is already set, ignoring update",e)}},setting:function(e,t){if(c.debug("Changing setting",e,t),w.isPlainObject(e))w.extend(!0,i,e);else{if(t===C)return i[e];w.isPlainObject(i[e])?w.extend(!0,i[e],t):i[e]=t}},internal:function(e,t){if(w.isPlainObject(e))w.extend(!0,c,e);else{if(t===C)return c[e];c[e]=t}},debug:function(){!i.silent&&i.debug&&(i.performance?c.performance.log(arguments):(c.debug=Function.prototype.bind.call(console.info,console,i.name+":"),c.debug.apply(console,arguments)))},verbose:function(){!i.silent&&i.verbose&&i.debug&&(i.performance?c.performance.log(arguments):(c.verbose=Function.prototype.bind.call(console.info,console,i.name+":"),c.verbose.apply(console,arguments)))},error:function(){i.silent||(c.error=Function.prototype.bind.call(console.error,console,i.name+":"),c.error.apply(console,arguments))},performance:{log:function(e){var t,n;i.performance&&(n=(t=(new Date).getTime())-(p||t),p=t,h.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:d,"Execution Time":n})),clearTimeout(c.performance.timer),c.performance.timer=setTimeout(c.performance.display,500)},display:function(){var e=i.name+":",n=0;p=!1,clearTimeout(c.performance.timer),w.each(h,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",x&&(e+=" '"+x+"'"),(console.group!==C||console.table!==C)&&0<h.length&&(console.groupCollapsed(e),console.table?console.table(h):w.each(h,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),h=[]}},invoke:function(a,e,t){var i,o,n,s=f;return e=e||y,t=d||t,"string"==typeof a&&s!==C&&(a=a.split(/[\. ]/),i=a.length-1,w.each(a,function(e,t){var n=e!=i?t+a[e+1].charAt(0).toUpperCase()+a[e+1].slice(1):a;if(w.isPlainObject(s[n])&&e!=i)s=s[n];else{if(s[n]!==C)return o=s[n],!1;if(!w.isPlainObject(s[t])||e==i)return s[t]!==C?o=s[t]:c.error(r.method,a),!1;s=s[t]}})),w.isFunction(o)?n=o.apply(t,e):o!==C&&(n=o),Array.isArray(g)?g.push(n):g!==C?g=[g,n]:n!==C&&(g=n),o}},T?(f===C&&c.initialize(),c.invoke(m)):(f!==C&&f.invoke("destroy"),c.initialize())}),g!==C?g:this},w.fn.state.settings={name:"State",debug:!1,verbose:!1,namespace:"state",performance:!0,onActivate:function(){},onDeactivate:function(){},onChange:function(){},activateTest:function(){return!0},deactivateTest:function(){return!0},automatic:!0,sync:!1,flashDuration:1e3,filter:{text:".loading, .disabled",active:".disabled"},context:!1,error:{beforeSend:"The before send function has cancelled state change",method:"The method you called is not defined."},metadata:{promise:"promise",storedText:"stored-text"},className:{active:"active",disabled:"disabled",error:"error",loading:"loading",success:"success",warning:"warning"},selector:{text:!1},defaults:{input:{disabled:!0,loading:!0,active:!0},button:{disabled:!0,loading:!0,active:!0},progress:{active:!0,success:!0,warning:!0,error:!0}},states:{active:!0,disabled:!0,error:!0,loading:!0,success:!0,warning:!0},text:{disabled:!1,flash:!1,hover:!1,active:!1,inactive:!1,activate:!1,deactivate:!1}}}(jQuery,window,void document);