!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(1),n(3);$(".one").myPlugin({range:!1}),$(".two").myPlugin({range:!0}),$(".three").myPlugin(),$(".four").myPlugin({vertical:!0}),$(".five").myPlugin({range:!0,vertical:!0})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(2);jQuery.fn.myPlugin=function(e){var t=new s.View(e);this.html(t.slider)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e){this.slider=document.createElement("div"),this.base=document.createElement("div"),this.filler=document.createElement("div"),this.runner=document.createElement("div"),this.runner.classList.add("rangeByD-slider__runner"),this.runner.classList.add("left-runner"),this.filler.classList.add("rangeByD-slider__filler"),this.base.classList.add("rangeByD-slider__base"),this.slider.classList.add("rangeByD-slider"),e&&(e.range&&(this.runner2=document.createElement("div"),this.runner2.classList.add("rangeByD-slider__runner"),this.runner2.classList.add("right-runner"),this.filler.classList.add("filler-range")),e.vertical&&(this.slider.classList.add("vertical-view"),this.base.classList.add("vertical-view"),this.runner.classList.remove("left-runner"),this.runner.classList.add("rangeByD-slider__runner__vertical"),this.runner.classList.add("bottom-runner"),this.filler.classList.add("vertical-view"),e.range&&(this.runner2=document.createElement("div"),this.runner2.classList.add("rangeByD-slider__runner"),this.runner2.classList.add("rangeByD-slider__runner__vertical"),this.runner2.classList.add("top-runner"),this.filler.classList.add("filler-range")))),this.base.appendChild(this.runner),this.base.appendChild(this.filler),this.runner2&&(this.base.appendChild(this.runner2),this.runner2.addEventListener("mousedown",this.moveSlider)),this.slider.appendChild(this.base),this.runner.addEventListener("mousedown",this.moveSlider),this.base.addEventListener("click",this.clickMove)}return e.prototype.moveSlider=function(e){for(var t,n=e.target.parentElement,s=e.target,r=s.offsetWidth/2,i=e.target.parentElement.getBoundingClientRect(),l=0;l<n.children.length;l++)n.children[l].classList.contains("rangeByD-slider__filler")&&(t=n.children[l]);document.onmousemove=function(e){var l,o;if(s.classList.contains("rangeByD-slider__runner__vertical")?(l=e.clientY,o=n.offsetHeight-(l-i.top)-s.offsetHeight/2):o=(l=e.pageX)-i.left-r,s.classList.contains("rangeByD-slider__runner__vertical")?(o=(o=o<0?0:o)>=n.offsetHeight-r?n.offsetHeight-s.offsetHeight/2:o,s.classList.contains("top-runner")?s.style.top=n.offsetHeight-o-s.offsetHeight+"px":s.style.bottom=o+"px"):(o=(o=o<-2?-2:o)>=n.offsetWidth-r?n.offsetWidth-r:o,s.style.left=o+"px"),s.classList.contains("left-runner"))for(var a=0;a<n.children.length;a++)n.children[a].classList.contains("right-runner")?(t.style.left=s.offsetLeft+"px",t.style.width=t.nextElementSibling.offsetLeft-s.offsetLeft+r+"px",s.offsetLeft+s.offsetWidth>=t.nextElementSibling.offsetLeft&&(s.style.left=t.nextElementSibling.offsetLeft-s.offsetWidth+"px",t.style.left=s.style.left,t.style.width="0px")):t.style.width=s.offsetLeft+r+"px";else s.classList.contains("rangeByD-slider__runner__vertical")?t.style.height=n.offsetHeight-s.offsetTop-s.offsetHeight/2+"px":(t.style.width=s.offsetLeft-t.previousSibling.offsetLeft+r+"px",s.offsetLeft<=t.previousElementSibling.offsetLeft+s.offsetWidth&&(s.style.left=t.previousElementSibling.offsetLeft+s.offsetWidth+"px"));if(s.classList.contains("bottom-runner")){for(a=0;a<n.children.length;a++)if(n.children[a].classList.contains("top-runner")){var f=n.children[a];t.style.bottom=s.style.bottom,t.style.height=n.offsetHeight-o-f.offsetTop-s.offsetHeight/2+"px"}}else for(a=0;a<n.children.length;a++)if(n.children[a].classList.contains("bottom-runner")){var c=n.children[a];t.style.bottom=c.style.bottom||"0px",t.style.height=n.offsetHeight-s.offsetTop-(n.offsetHeight-c.offsetTop)+s.offsetHeight/2+"px"}},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}},e.prototype.clickMove=function(e){for(var t=e.target,n=0;n<e.path.length&&!t.classList.contains("rangeByD-slider__base");n++)t=e.target.parentElement;var s,r,i,l=[],o=t.getBoundingClientRect();s=t.classList.contains("vertical-view")?t.offsetHeight-(e.clientY-o.top):e.pageX-t.offsetLeft;for(n=0;n<t.children.length;n++)t.children[n].classList.contains("rangeByD-slider__runner")&&l.push(t.children[n]);for(n=0;n<t.children.length;n++)t.children[n].classList.contains("rangeByD-slider__filler")&&(i=t.children[n]);var a=i.offsetWidth/2;if(r=l[0].offsetWidth/2,l.length>=2){s<=(l[0].classList.contains("rangeByD-slider__runner__vertical")?t.offsetHeight/2:l[0].offsetLeft+a)?l[0].classList.contains("rangeByD-slider__runner__vertical")?(l[0].style.bottom=s-r+"px",i.style.bottom=l[0].style.bottom+"px",i.style.height=l[0].offsetTop-l[1].offsetTop+"px"):(l[0].style.left=s-r+"px",i.style.left=l[0].style.left,i.style.width=l[1].offsetLeft-l[0].offsetLeft+r+"px"):l[0].classList.contains("rangeByD-slider__runner__vertical")?(l[1].style.top=t.offsetHeight-s-l[1].offsetHeight+"px",i.style.bottom=l[0].style.bottom+"px",i.style.height=l[0].offsetTop-l[1].offsetTop+"px"):(l[1].style.left=s-r+"px",i.style.left=l[0].style.left,i.style.width=l[1].offsetLeft-l[0].offsetLeft+r+"px")}else l[0].classList.contains("bottom-runner")?(l[0].style.bottom=s-l[0].offsetHeight/2+"px",i.style.height=s+r+"px"):(l[0].style.left=s-r+"px",i.style.width=s+r+"px")},e}();t.View=s},function(e,t,n){var s=n(4);"string"==typeof s&&(s=[[e.i,s,""]]);var r={insert:"head",singleton:!1};n(5)(s,r);s.locals&&(e.exports=s.locals)},function(e,t,n){},function(e,t,n){"use strict";var s,r={},i=function(){return void 0===s&&(s=Boolean(window&&document&&document.all&&!window.atob)),s},l=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}();function o(e,t){for(var n=[],s={},r=0;r<e.length;r++){var i=e[r],l=t.base?i[0]+t.base:i[0],o={css:i[1],media:i[2],sourceMap:i[3]};s[l]?s[l].parts.push(o):n.push(s[l]={id:l,parts:[o]})}return n}function a(e,t){for(var n=0;n<e.length;n++){var s=e[n],i=r[s.id],l=0;if(i){for(i.refs++;l<i.parts.length;l++)i.parts[l](s.parts[l]);for(;l<s.parts.length;l++)i.parts.push(g(s.parts[l],t))}else{for(var o=[];l<s.parts.length;l++)o.push(g(s.parts[l],t));r[s.id]={id:s.id,refs:1,parts:o}}}}function f(e){var t=document.createElement("style");if(void 0===e.attributes.nonce){var s=n.nc;s&&(e.attributes.nonce=s)}if(Object.keys(e.attributes).forEach(function(n){t.setAttribute(n,e.attributes[n])}),"function"==typeof e.insert)e.insert(t);else{var r=l(e.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}return t}var c,d=(c=[],function(e,t){return c[e]=t,c.filter(Boolean).join("\n")});function u(e,t,n,s){var r=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=d(t,r);else{var i=document.createTextNode(r),l=e.childNodes;l[t]&&e.removeChild(l[t]),l.length?e.insertBefore(i,l[t]):e.appendChild(i)}}var h=null,p=0;function g(e,t){var n,s,r;if(t.singleton){var i=p++;n=h||(h=f(t)),s=u.bind(null,n,i,!1),r=u.bind(null,n,i,!0)}else n=f(t),s=function(e,t,n){var s=n.css,r=n.media,i=n.sourceMap;if(r&&e.setAttribute("media",r),i&&btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=s;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(s))}}.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i());var n=o(e,t);return a(n,t),function(e){for(var s=[],i=0;i<n.length;i++){var l=n[i],f=r[l.id];f&&(f.refs--,s.push(f))}e&&a(o(e,t),t);for(var c=0;c<s.length;c++){var d=s[c];if(0===d.refs){for(var u=0;u<d.parts.length;u++)d.parts[u]();delete r[d.id]}}}}}]);
//# sourceMappingURL=main.js.map