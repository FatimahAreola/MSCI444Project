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
!function(E,e,Y,F){"use strict";E.isFunction=E.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),E.fn.shape=function(b){var x,y=E(this),w=(new Date).getTime(),C=[],S=b,T="string"==typeof S,W=[].slice.call(arguments,1),A=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,0)};return y.each(function(){var n,o,r,t=y.selector||"",s=E.isPlainObject(b)?E.extend(!0,{},E.fn.shape.settings,b):E.extend({},E.fn.shape.settings),e=s.namespace,d=s.selector,i=s.error,l=s.className,a="."+e,u="module-"+e,c=E(this),f=c.find(">"+d.sides),g=f.find(">"+d.side),h=!1,m=this,p=c.data(u);if(r={initialize:function(){r.verbose("Initializing module for",m),r.set.defaultSide(),r.instantiate()},instantiate:function(){r.verbose("Storing instance of module",r),p=r,c.data(u,p)},destroy:function(){r.verbose("Destroying previous module for",m),c.removeData(u).off(a)},refresh:function(){r.verbose("Refreshing selector cache for",m),c=E(m),f=E(this).find(d.sides),g=E(this).find(d.side)},repaint:function(){r.verbose("Forcing repaint event");(f[0]||Y.createElement("div")).offsetWidth},animate:function(e,t){r.verbose("Animating box with properties",e),t=t||function(e){r.verbose("Executing animation callback"),e!==F&&e.stopPropagation(),r.reset(),r.set.active()},s.beforeChange.call(o[0]),r.get.transitionEvent()?(r.verbose("Starting CSS animation"),c.addClass(l.animating),f.css(e).one(r.get.transitionEvent(),t),r.set.duration(s.duration),A(function(){c.addClass(l.animating),n.addClass(l.hidden)})):t()},queue:function(e){r.debug("Queueing animation of",e),f.one(r.get.transitionEvent(),function(){r.debug("Executing queued animation"),setTimeout(function(){c.shape(e)},0)})},reset:function(){r.verbose("Animating states reset"),c.removeClass(l.animating).attr("style","").removeAttr("style"),f.attr("style","").removeAttr("style"),g.attr("style","").removeAttr("style").removeClass(l.hidden),o.removeClass(l.animating).attr("style","").removeAttr("style")},is:{complete:function(){return g.filter("."+l.active)[0]==o[0]},animating:function(){return c.hasClass(l.animating)},hidden:function(){return 0<c.closest(":hidden").length}},set:{defaultSide:function(){n=g.filter("."+s.className.active),o=0<n.next(d.side).length?n.next(d.side):g.first(),h=!1,r.verbose("Active side set to",n),r.verbose("Next side set to",o)},duration:function(e){e="number"==typeof(e=e||s.duration)?e+"ms":e,r.verbose("Setting animation duration",e),!s.duration&&0!==s.duration||f.add(g).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},currentStageSize:function(){var e=g.filter("."+s.className.active),t=e.outerWidth(!0),i=e.outerHeight(!0);c.css({width:t,height:i})},stageSize:function(){var e=c.clone().addClass(l.loading),t=e.find(">"+d.sides+">"+d.side),i=t.filter("."+s.className.active),n=h?t.eq(h):0<i.next(d.side).length?i.next(d.side):t.first(),o="next"===s.width?n.outerWidth(!0):"initial"===s.width?c.width():s.width,a="next"===s.height?n.outerHeight(!0):"initial"===s.height?c.height():s.height;i.removeClass(l.active),n.addClass(l.active),e.insertAfter(c),e.remove(),"auto"!==s.width&&(c.css("width",o+s.jitter),r.verbose("Specifying width during animation",o)),"auto"!==s.height&&(c.css("height",a+s.jitter),r.verbose("Specifying height during animation",a))},nextSide:function(e){h=e,o=g.filter(e),h=g.index(o),0===o.length&&(r.set.defaultSide(),r.error(i.side)),r.verbose("Next side manually set to",o)},active:function(){r.verbose("Setting new side to active",o),g.removeClass(l.active),o.addClass(l.active),s.onChange.call(o[0]),r.set.defaultSide()}},flip:{to:function(e,t){if(r.is.hidden())r.debug("Module not visible",o);else if(!r.is.complete()||r.is.animating()||s.allowRepeats){var i=r.get.transform[e]();r.is.animating()?r.queue("flip "+e):(r.debug("Flipping "+e,o),r.set.stageSize(),r.stage[t](),r.animate(i))}else r.debug("Side already visible",o)},up:function(){r.flip.to("up","above")},down:function(){r.flip.to("down","below")},left:function(){r.flip.to("left","left")},right:function(){r.flip.to("right","right")},over:function(){r.flip.to("over","behind")},back:function(){r.flip.to("back","behind")}},get:{transform:{up:function(){var e=n.outerHeight(!0)/2;return{transform:"translateY("+(o.outerHeight(!0)-e)+"px) translateZ(-"+e+"px) rotateX(-90deg)"}},down:function(){var e=n.outerHeight(!0)/2;return{transform:"translateY(-"+e+"px) translateZ(-"+e+"px) rotateX(90deg)"}},left:function(){var e=n.outerWidth(!0)/2;return{transform:"translateX("+(o.outerWidth(!0)-e)+"px) translateZ(-"+e+"px) rotateY(90deg)"}},right:function(){var e=n.outerWidth(!0)/2;return{transform:"translateX(-"+e+"px) translateZ(-"+e+"px) rotateY(-90deg)"}},over:function(){return{transform:"translateX("+-(n.outerWidth(!0)-o.outerWidth(!0))/2+"px) rotateY(180deg)"}},back:function(){return{transform:"translateX("+-(n.outerWidth(!0)-o.outerWidth(!0))/2+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=Y.createElement("element"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in i)if(t.style[e]!==F)return i[e]},nextSide:function(){return 0<n.next(d.side).length?n.next(d.side):g.first()}},stage:{above:function(){var e={origin:(n.outerHeight(!0)-o.outerHeight(!0))/2,depth:{active:o.outerHeight(!0)/2,next:n.outerHeight(!0)/2}};r.verbose("Setting the initial animation position as above",o,e),n.css({transform:"rotateX(0deg)"}),o.addClass(l.animating).css({top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px) translateY(-"+e.depth.active+"px)"})},below:function(){var e={origin:(n.outerHeight(!0)-o.outerHeight(!0))/2,depth:{active:o.outerHeight(!0)/2,next:n.outerHeight(!0)/2}};r.verbose("Setting the initial animation position as below",o,e),n.css({transform:"rotateX(0deg)"}),o.addClass(l.animating).css({top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px) translateY("+e.depth.active+"px)"})},left:function(){var e=n.outerWidth(!0),t=o.outerWidth(!0),i={origin:(e-t)/2,depth:{active:t/2,next:e/2}};r.verbose("Setting the initial animation position as left",o,i),n.css({transform:"rotateY(0deg)"}),o.addClass(l.animating).css({left:i.origin+"px",transform:"rotateY(-90deg) translateZ("+i.depth.next+"px) translateX(-"+i.depth.active+"px)"})},right:function(){var e=n.outerWidth(!0),t=o.outerWidth(!0),i={origin:(e-t)/2,depth:{active:t/2,next:e/2}};r.verbose("Setting the initial animation position as right",o,i),n.css({transform:"rotateY(0deg)"}),o.addClass(l.animating).css({left:i.origin+"px",transform:"rotateY(90deg) translateZ("+i.depth.next+"px) translateX("+i.depth.active+"px)"})},behind:function(){var e=n.outerWidth(!0),t=o.outerWidth(!0),i={origin:(e-t)/2,depth:{active:t/2,next:e/2}};r.verbose("Setting the initial animation position as behind",o,i),n.css({transform:"rotateY(0deg)"}),o.addClass(l.animating).css({left:i.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(e,t){if(r.debug("Changing setting",e,t),E.isPlainObject(e))E.extend(!0,s,e);else{if(t===F)return s[e];E.isPlainObject(s[e])?E.extend(!0,s[e],t):s[e]=t}},internal:function(e,t){if(E.isPlainObject(e))E.extend(!0,r,e);else{if(t===F)return r[e];r[e]=t}},debug:function(){!s.silent&&s.debug&&(s.performance?r.performance.log(arguments):(r.debug=Function.prototype.bind.call(console.info,console,s.name+":"),r.debug.apply(console,arguments)))},verbose:function(){!s.silent&&s.verbose&&s.debug&&(s.performance?r.performance.log(arguments):(r.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),r.verbose.apply(console,arguments)))},error:function(){s.silent||(r.error=Function.prototype.bind.call(console.error,console,s.name+":"),r.error.apply(console,arguments))},performance:{log:function(e){var t,i;s.performance&&(i=(t=(new Date).getTime())-(w||t),w=t,C.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:m,"Execution Time":i})),clearTimeout(r.performance.timer),r.performance.timer=setTimeout(r.performance.display,500)},display:function(){var e=s.name+":",i=0;w=!1,clearTimeout(r.performance.timer),E.each(C,function(e,t){i+=t["Execution Time"]}),e+=" "+i+"ms",t&&(e+=" '"+t+"'"),1<y.length&&(e+=" ("+y.length+")"),(console.group!==F||console.table!==F)&&0<C.length&&(console.groupCollapsed(e),console.table?console.table(C):E.each(C,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),C=[]}},invoke:function(n,e,t){var o,a,i,r=p;return e=e||W,t=m||t,"string"==typeof n&&r!==F&&(n=n.split(/[\. ]/),o=n.length-1,E.each(n,function(e,t){var i=e!=o?t+n[e+1].charAt(0).toUpperCase()+n[e+1].slice(1):n;if(E.isPlainObject(r[i])&&e!=o)r=r[i];else{if(r[i]!==F)return a=r[i],!1;if(!E.isPlainObject(r[t])||e==o)return r[t]!==F&&(a=r[t]),!1;r=r[t]}})),E.isFunction(a)?i=a.apply(t,e):a!==F&&(i=a),Array.isArray(x)?x.push(i):x!==F?x=[x,i]:i!==F&&(x=i),a}},T){p===F&&r.initialize();var v=c.find("input");0<v.length?(v.blur(),setTimeout(function(){r.invoke(S)},150)):r.invoke(S)}else p!==F&&p.invoke("destroy"),r.initialize()}),x!==F?x:this},E.fn.shape.settings={name:"Shape",silent:!1,debug:!1,verbose:!1,jitter:0,performance:!0,namespace:"shape",width:"initial",height:"initial",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:!1,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}}(jQuery,window,document);