!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(1),n(3);$(".one").myPlugin({range:!1}),$(".two").myPlugin({range:!0}),$(".three").myPlugin(),$(".four").myPlugin({vertical:!0})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);jQuery.fn.myPlugin=function(e){var t=new r.View(e);this.html(t.slider)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e){this.slider=document.createElement("div"),this.base=document.createElement("div"),this.filler=document.createElement("div"),this.runner=document.createElement("div"),this.runner.classList.add("rangeByD-slider__runner"),this.runner.classList.add("left-runner"),this.filler.classList.add("rangeByD-slider__filler"),this.base.classList.add("rangeByD-slider__base"),this.slider.classList.add("rangeByD-slider"),e&&(e.range&&(this.runner2=document.createElement("div"),this.runner2.classList.add("rangeByD-slider__runner"),this.runner2.classList.add("right-runner"),this.filler.classList.add("filler-range")),e.vertical&&this.base.classList.add("vertical-view")),this.base.appendChild(this.runner),this.base.appendChild(this.filler),this.runner2&&(this.base.appendChild(this.runner2),this.runner2.addEventListener("mousedown",this.moveSlider)),this.slider.appendChild(this.base),this.runner.addEventListener("mousedown",this.moveSlider),this.base.addEventListener("click",this.clickMove)}return e.prototype.moveSlider=function(e){for(var t,n=e.target.parentElement,r=e.target,i=r.offsetWidth/2,s=0;s<n.children.length;s++)n.children[s].classList.contains("rangeByD-slider__filler")&&(t=n.children[s]);document.onmousemove=function(e){var s=e.pageX-n.offsetLeft-i;if(s=(s=s<-2?-2:s)>=n.offsetWidth-i?n.offsetWidth-i:s,r.style.left=s+"px",r.classList.contains("left-runner"))for(var o=0;o<n.children.length;o++)n.children[o].classList.contains("right-runner")?(t.style.left=r.offsetLeft+"px",t.style.width=t.nextElementSibling.offsetLeft-r.offsetLeft+i+"px",r.offsetLeft+r.offsetWidth>=t.nextElementSibling.offsetLeft&&(r.style.left=t.nextElementSibling.offsetLeft-r.offsetWidth+"px",t.style.left=r.style.left,t.style.width="0px")):t.style.width=r.offsetLeft+i+"px";else t.style.width=r.offsetLeft-t.previousSibling.offsetLeft+i+"px",r.offsetLeft<=t.previousElementSibling.offsetLeft+r.offsetWidth&&(r.style.left=t.previousElementSibling.offsetLeft+r.offsetWidth+"px")},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}},e.prototype.clickMove=function(e){for(var t=e.target,n=0;n<e.path.length&&!t.classList.contains("rangeByD-slider__base");n++)t=e.target.parentElement;var r,i,s=e.pageX-t.offsetLeft,o=[];for(n=0;n<t.children.length;n++)t.children[n].classList.contains("rangeByD-slider__runner")&&o.push(t.children[n]);for(n=0;n<t.children.length;n++)t.children[n].classList.contains("rangeByD-slider__filler")&&(i=t.children[n]);var l=i.offsetWidth/2;(r=o[0].offsetWidth/2,o.length>=2)?s<=o[0].offsetLeft-t.offsetLeft+l?o[0].style.left=s-r+"px":o[1].style.left=s-r+"px":(o[0].style.left=s-r+"px",i.style.width=s+r+"px")},e}();t.View=r},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]);var i={insert:"head",singleton:!1};n(5)(r,i);r.locals&&(e.exports=r.locals)},function(e,t,n){},function(e,t,n){"use strict";var r,i={},s=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}();function l(e,t){for(var n=[],r={},i=0;i<e.length;i++){var s=e[i],o=t.base?s[0]+t.base:s[0],l={css:s[1],media:s[2],sourceMap:s[3]};r[o]?r[o].parts.push(l):n.push(r[o]={id:o,parts:[l]})}return n}function a(e,t){for(var n=0;n<e.length;n++){var r=e[n],s=i[r.id],o=0;if(s){for(s.refs++;o<s.parts.length;o++)s.parts[o](r.parts[o]);for(;o<r.parts.length;o++)s.parts.push(v(r.parts[o],t))}else{for(var l=[];o<r.parts.length;o++)l.push(v(r.parts[o],t));i[r.id]={id:r.id,refs:1,parts:l}}}}function f(e){var t=document.createElement("style");if(void 0===e.attributes.nonce){var r=n.nc;r&&(e.attributes.nonce=r)}if(Object.keys(e.attributes).forEach(function(n){t.setAttribute(n,e.attributes[n])}),"function"==typeof e.insert)e.insert(t);else{var i=o(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var u,d=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function c(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=d(t,i);else{var s=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(s,o[t]):e.appendChild(s)}}var h=null,p=0;function v(e,t){var n,r,i;if(t.singleton){var s=p++;n=h||(h=f(t)),r=c.bind(null,n,s,!1),i=c.bind(null,n,s,!0)}else n=f(t),r=function(e,t,n){var r=n.css,i=n.media,s=n.sourceMap;if(i&&e.setAttribute("media",i),s&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}.bind(null,n,t),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}e.exports=function(e,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s());var n=l(e,t);return a(n,t),function(e){for(var r=[],s=0;s<n.length;s++){var o=n[s],f=i[o.id];f&&(f.refs--,r.push(f))}e&&a(l(e,t),t);for(var u=0;u<r.length;u++){var d=r[u];if(0===d.refs){for(var c=0;c<d.parts.length;c++)d.parts[c]();delete i[d.id]}}}}}]);
//# sourceMappingURL=main.js.map