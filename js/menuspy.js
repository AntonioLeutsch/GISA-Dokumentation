/*! MenuSpy v1.0.0 (Nov 29 2016) - http://leocs.me/menuspy/ - Copyright (c) 2016 Leonardo Santos; MIT License */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.MenuSpy=e()}(this,function(){"use strict";var t={extend:function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);return t},offset:function(t){var e=t.getBoundingClientRect();return{top:e.top+document.body.scrollTop,left:e.left+document.body.scrollLeft}},scrollTop:function(){return window.pageYOffset||document.documentElement.scrollTop},addClass:function(t,e){if(t.classList)t.classList.add(e);else{var s=t.className.split(" "),o=s.indexOf(e);o===-1&&s.push(e),t.className=s.join(" ")}},removeClass:function(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},debounce:function(t,e){var s=null;return function(){var o=arguments,n=this;s||(s=setTimeout(function(){return s=0,t.apply(n,o)},e))}}},e=function(e,s){var o=this;if(e){var n={menuItemSelector:'a[href^="#"]',activeClass:"active",threshold:15,hashTimeout:600,callback:null};this.element=e,this.options=t.extend(n,s),this.assignValues(),window.addEventListener("resize",t.debounce(function(){return o.assignValues()})),this.debouncedHashFn=t.debounce(function(){if(history.replaceState)history.replaceState(null,null,"#"+o.lastId);else{var e=t.scrollTop();window.location.hash=o.lastId,window.scrollTo(0,e)}},this.options.hashTimeout),this.cacheItems(),this.scrollFn()}};return e.prototype.assignValues=function(){this.currScrollTop=0,this.lastId="",this.menuHeight=this.element.offsetHeight+this.options.threshold,this.menuItems=[].slice.call(this.element.querySelectorAll(this.options.menuItemSelector))},e.prototype.cacheItems=function(){this.scrollItems=this.menuItems.map(function(e){var s=document.querySelector(e.getAttribute("href"));if(s){var o=t.offset(s).top;return{elm:s,offset:o}}console.warn("MenuSpy warning: %s not found on page.",e.href)}),this.scrollItems=this.scrollItems.filter(Boolean)},e.prototype.tick=function(){var t=this.currScrollTop+this.menuHeight,e=this.scrollItems.filter(function(e){return e.offset<t}).map(function(t){return t.elm});this.activateItem(e.pop())},e.prototype.activateItem=function(e){var s=this,o=e?e.id:"",n=this.options.activeClass,i=this.options.callback;this.lastId!==o&&(this.lastId=o,this.menuItems.forEach(function(l){t.removeClass(l.parentNode,n),l.getAttribute("href")==="#"+o&&(t.addClass(l.parentNode,n),"function"==typeof i&&i.call(s,l,e),s.debouncedHashFn())}))},e.prototype.scrollFn=function(){var e=t.scrollTop();this.currScrollTop!==e&&(this.currScrollTop=e,this.tick()),window.requestAnimationFrame(this.scrollFn.bind(this))},e});
