!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="./",s(s.s=0)}([function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),s(1),s(5);$(".one").myPlugin({range:!1,minVal:-100,maxVal:100,tooltip:!0,step:5,from:50}),$(".two").myPlugin({range:!0,minVal:0,maxVal:15e3,tooltip:!0,step:100,from:500,to:600}),$(".three").myPlugin(),$(".four").myPlugin({vertical:!0,minVal:10,maxVal:100,tooltip:!0,step:5}),$(".five").myPlugin({range:!0,vertical:!0,tooltip:!0,minVal:100,maxVal:200,step:5})},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2),n=s(3),r=s(4);jQuery.fn.myPlugin=function(t){var e=new i.View;this.html(e.slider);var s=new n.Model,o=new r.Presenter(s,e,t);function a(){o.getOptionsFromVIew(e,s)}e.runner.addEventListener("mousedown",o.moveSlider.bind(o)),e.base.addEventListener("click",o.clickMove),e.runner.addEventListener("mousedown",function(){document.addEventListener("mousemove",a),document.addEventListener("mouseup",function(){document.removeEventListener("mousemove",a)})}),e.base.addEventListener("click",a),e.runner2&&(e.runner2.addEventListener("mousedown",o.moveSlider.bind(o)),e.runner2.addEventListener("mousedown",function(){document.addEventListener("mousemove",a),document.addEventListener("mouseup",function(){document.removeEventListener("mousemove",a)})}))}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.slider=document.createElement("div"),this.base=document.createElement("div"),this.filler=document.createElement("div"),this.runner=document.createElement("div"),this.values=document.createElement("div"),this.rangeValue=document.createElement("div"),this.runner.classList.add("rangeByD-slider__runner"),this.runner.classList.add("left-runner"),this.filler.classList.add("rangeByD-slider__filler"),this.base.classList.add("rangeByD-slider__base"),this.slider.classList.add("rangeByD-slider"),this.values.classList.add("rangeByD-slider__values"),this.rangeValue.classList.add("rangeByDi-slider__first-value"),this.base.appendChild(this.runner),this.base.appendChild(this.filler),this.values.appendChild(this.rangeValue),this.slider.appendChild(this.values),this.slider.appendChild(this.base),this.params={}}return t.prototype.setCustomView=function(t){for(var e in t)t.hasOwnProperty(e)&&(this.params[e]=t[e]);this.params.range&&(this.runner2=document.createElement("div"),this.runner2.classList.add("rangeByD-slider__runner"),this.runner2.classList.add("right-runner"),this.rangeValue2=document.createElement("div"),this.rangeValue2.classList.add("rangeByDi-slider__second-value"),this.values.classList.add("values-range"),this.filler.classList.add("filler-range")),this.params.vertical&&(this.slider.classList.add("vertical-view"),this.base.classList.add("vertical-view"),this.runner.classList.remove("left-runner"),this.runner.classList.add("rangeByD-slider__runner__vertical"),this.runner.classList.add("bottom-runner"),this.values.classList.add("vertical-view"),this.rangeValue.classList.add("vertical-value"),this.filler.classList.add("vertical-view"),this.params.range&&(this.runner2=document.createElement("div"),this.runner2.classList.add("rangeByD-slider__runner"),this.runner2.classList.add("rangeByD-slider__runner__vertical"),this.runner2.classList.add("top-runner"),this.values.classList.add("values-range"),this.rangeValue2=document.createElement("div"),this.rangeValue2.classList.add("rangeByDi-slider__second-value"),this.rangeValue2.classList.add("vertical-value"),this.filler.classList.add("filler-range"))),this.params.tooltip&&(this.tooltip=document.createElement("div"),this.tooltip.classList.add("rangeByD-slider__tooltip"),this.tooltip.innerText=""+this.params.minVal,this.base.insertBefore(this.tooltip,this.runner),this.params.vertical&&this.tooltip.classList.add("tooltip-bottom")),this.runner2&&this.rangeValue2&&(this.base.appendChild(this.runner2),this.params.tooltip&&(this.tooltip2=document.createElement("div"),this.tooltip2.classList.add("rangeByD-slider__tooltip"),this.tooltip2.classList.add("tooltip-right"),this.tooltip2.innerText=""+this.params.maxVal,this.runner2.classList.contains("rangeByD-slider__runner__vertical")&&(this.tooltip2.classList.remove("tooltip-right"),this.tooltip2.classList.add("tooltip-top")),this.base.insertBefore(this.tooltip2,this.runner2)),this.values.appendChild(this.rangeValue2)),(this.params.minVal||0===this.params.minVal)&&(this.rangeValue.innerText=""+this.params.minVal,this.rangeValue2&&(this.rangeValue2.innerText=""+this.params.maxVal))},t.prototype.changeView=function(t){this.rangeValue.innerText=t.minVal,this.rangeValue2&&(this.rangeValue2.innerText=t.maxVal),this.tooltip&&(this.tooltip.innerText=t.minVal,this.tooltip2&&(this.tooltip2.innerText=t.maxVal))},t}();e.View=i},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.min=0,this.max=100,this.minRange=0,this.maxRange=100,this.val=0,this.width=0,this.step=1}return t.prototype.getModelVals=function(){return{minVal:this.min,maxVal:this.max}},t.prototype.setCustomModel=function(t){this.min=t.minVal?t.minVal:this.min,this.max=t.maxVal?t.maxVal:this.max,this.minRange=t.minVal?t.minVal:this.min,this.maxRange=t.maxVal?t.maxVal:this.max,this.step=t.step?t.step:this.step,this.min=t.from?t.from:this.min},t.prototype.setValues=function(t){this.val=t.clickValue,this.width=t.baseValue,t.clickValue2&&(this.val2=t.clickValue2),this.countRangeValues()},t.prototype.countRangeValues=function(){this.min=this.count(this.width,this.val,this.minRange,this.maxRange),this.val2&&(this.max=this.count(this.width,this.val2,this.minRange,this.maxRange))},t.prototype.count=function(t,e,s,i){var n,r;return n=+(e/+(t/100).toFixed(2)).toFixed(2),(r=(r=(r=+(+((i-s)/100).toFixed(2)*n+s).toFixed(2))<s?s:r)>=i?i:r)%this.step>this.step/2?r+=this.step-r%this.step:r-=r%this.step,r},t}();e.Model=i},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e,s){for(var i in this.options={},s)s.hasOwnProperty(i)&&(this.options[i]=s[i]);e.setCustomView(t.getModelVals()),s&&(this.setOptToModel(t,s),this.setOptToView(e,s)),this.viewData={clickValue:0,baseValue:0}}return t.prototype.setOptToView=function(t,e){var s={};for(var i in e)e.hasOwnProperty(i)&&(s[i]=e[i]);t.setCustomView(s)},t.prototype.setOptToModel=function(t,e){t.setCustomModel(e)},t.prototype.getOptionsFromVIew=function(t,e){t.runner2&&(this.viewData.clickValue2=t.runner2.offsetLeft),t.slider.classList.contains("vertical-view")?(this.viewData.baseValue=t.base.offsetHeight,this.viewData.clickValue=t.base.offsetHeight-t.runner.offsetTop-t.runner.offsetHeight,t.runner2&&(this.viewData.clickValue2=t.base.offsetHeight-t.runner2.offsetTop)):(this.viewData.baseValue=t.base.offsetWidth-t.runner.offsetWidth,this.viewData.clickValue=t.runner.offsetLeft),e.setValues(this.viewData),t.changeView(e.getModelVals())},t.prototype.moveSlider=function(t){var e=this,s=t.target.parentElement,i=t.target,n=t.target.parentElement.getBoundingClientRect();document.onmousemove=function(t){var r,o;i.classList.contains("rangeByD-slider__runner__vertical")?(r=t.clientY,o=(o=(o=Math.round(s.offsetHeight-(r-n.top)-i.offsetHeight/2))<0?0:o)>=s.offsetHeight-i.offsetHeight?s.offsetHeight-i.offsetHeight:o,i.classList.contains("top-runner")?i.style.top=s.offsetHeight-o-i.offsetHeight+"px":i.style.bottom=o+"px"):(r=t.pageX,o=(o=(o=Math.round(r-n.left-i.offsetWidth/2))<0?0:o)>=s.offsetWidth-i.offsetWidth?s.offsetWidth-i.offsetWidth:o,i.style.left=o+"px");for(var a=[],l=0;l<s.children.length;l++)s.children[l].classList.contains("rangeByD-slider__runner")&&a.push(s.children[l]);2==a.length&&(i.classList.contains("left-runner")?i.offsetLeft+i.offsetWidth>=a[1].offsetLeft&&(i.style.left=a[1].offsetLeft-i.offsetWidth+"px"):i.classList.contains("right-runner")?i.offsetLeft<=a[0].offsetLeft+a[0].offsetWidth&&(i.style.left=a[0].offsetLeft+i.offsetWidth+"px"):i.classList.contains("top-runner")?i.offsetTop+i.offsetHeight>a[0].offsetTop&&(i.style.top=a[0].offsetTop-i.offsetHeight+"px"):i.classList.contains("bottom-runner")&&i.offsetTop<a[1].offsetTop+a[1].offsetHeight&&(i.style.bottom=s.offsetHeight-(a[1].offsetTop+2*a[1].offsetHeight)+"px")),e.changeFiller(i)},document.onmouseup=function(){i.previousElementSibling&&i.previousElementSibling.classList.contains("tooltip__visible")&&i.previousElementSibling.classList.remove("tooltip__visible"),document.onmousemove=document.onmouseup=null}},t.prototype.changeFiller=function(t){for(var e,s=t,i=[],n=0;n<s.parentElement.children.length;n++)s.parentElement.children[n].classList.contains("rangeByD-slider__filler")&&(e=s.parentElement.children[n]),s.parentElement.children[n].classList.contains("rangeByD-slider__runner")&&i.push(s.parentElement.children[n]);e.classList.contains("vertical-view")?e.classList.contains("filler-range")?s.classList.contains("bottom-runner")?(e.style.bottom=s.parentElement.offsetHeight-s.offsetTop-s.offsetHeight/2+"px",e.style.height=s.parentElement.offsetHeight-i[1].offsetTop-(s.parentElement.offsetHeight-s.offsetTop)+"px"):e.style.height=s.parentElement.offsetHeight-s.offsetTop-(s.parentElement.offsetHeight-i[0].offsetTop)+s.offsetHeight/4+"px":e.style.height=s.parentElement.offsetHeight-s.offsetTop-s.offsetHeight/2+"px":e.classList.contains("filler-range")?s.classList.contains("left-runner")?(e.style.left=s.offsetLeft+s.offsetWidth/2+"px",e.style.width=i[1].offsetLeft-s.offsetLeft+"px"):e.style.width=s.offsetLeft-i[0].offsetLeft+s.offsetWidth/2+"px":e.style.width=s.offsetLeft+s.offsetWidth/2+"px",this.options&&this.options.tooltip&&this.moveTooltip(s)},t.prototype.moveTooltip=function(t){var e=t,s=e.previousElementSibling;s.classList.add("tooltip__visible"),s.classList.contains("tooltip-top")?s.style.top=e.style.top:s.classList.contains("tooltip-bottom")?s.style.bottom=e.style.bottom:s.style.left=e.style.left},t.prototype.clickMove=function(t){for(var e=t.target,s=0;s<t.path.length&&!e.classList.contains("rangeByD-slider__base");s++)e=t.target.parentElement;var i,n,r,o=[],a=e.getBoundingClientRect();i=e.classList.contains("vertical-view")?e.offsetHeight-(t.clientY-a.top):t.pageX-e.offsetLeft;for(s=0;s<e.children.length;s++)e.children[s].classList.contains("rangeByD-slider__runner")&&o.push(e.children[s]);for(s=0;s<e.children.length;s++)e.children[s].classList.contains("rangeByD-slider__filler")&&(r=e.children[s]);var l=r.offsetWidth/2;if(n=o[0].offsetWidth/2,o.length>=2){i<=(o[0].classList.contains("rangeByD-slider__runner__vertical")?e.offsetHeight-o[0].offsetTop-o[0].offsetHeight+r.offsetHeight/2:o[0].offsetLeft+l)?o[0].classList.contains("rangeByD-slider__runner__vertical")?(o[0].style.bottom=i-n+"px",r.style.bottom=o[0].style.bottom,r.style.height=o[0].offsetTop-o[1].offsetTop+o[0].offsetHeight/2+"px"):(o[0].style.left=i-n+"px",r.style.left=o[0].style.left,r.style.width=o[1].offsetLeft-o[0].offsetLeft+n+"px"):o[0].classList.contains("rangeByD-slider__runner__vertical")?(o[1].style.top=e.offsetHeight-i-o[1].offsetHeight/2+"px",r.style.bottom=o[0].style.bottom,r.style.height=o[0].offsetTop-o[1].offsetTop+o[0].offsetHeight/2+"px"):(o[1].style.left=i-n+"px",r.style.left=o[0].style.left,r.style.width=o[1].offsetLeft-o[0].offsetLeft+n+"px")}else o[0].classList.contains("bottom-runner")?(o[0].style.bottom=i-o[0].offsetHeight/2+"px",r.style.height=i+n+"px"):(o[0].style.left=i-n+"px",r.style.width=i+n+"px")},t}();e.Presenter=i},function(t,e,s){var i=s(6);"string"==typeof i&&(i=[[t.i,i,""]]);var n={insert:"head",singleton:!1};s(7)(i,n);i.locals&&(t.exports=i.locals)},function(t,e,s){},function(t,e,s){"use strict";var i,n={},r=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},o=function(){var t={};return function(e){if(void 0===t[e]){var s=document.querySelector(e);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch(t){s=null}t[e]=s}return t[e]}}();function a(t,e){for(var s=[],i={},n=0;n<t.length;n++){var r=t[n],o=e.base?r[0]+e.base:r[0],a={css:r[1],media:r[2],sourceMap:r[3]};i[o]?i[o].parts.push(a):s.push(i[o]={id:o,parts:[a]})}return s}function l(t,e){for(var s=0;s<t.length;s++){var i=t[s],r=n[i.id],o=0;if(r){for(r.refs++;o<r.parts.length;o++)r.parts[o](i.parts[o]);for(;o<i.parts.length;o++)r.parts.push(m(i.parts[o],e))}else{for(var a=[];o<i.parts.length;o++)a.push(m(i.parts[o],e));n[i.id]={id:i.id,refs:1,parts:a}}}}function f(t){var e=document.createElement("style");if(void 0===t.attributes.nonce){var i=s.nc;i&&(t.attributes.nonce=i)}if(Object.keys(t.attributes).forEach(function(s){e.setAttribute(s,t.attributes[s])}),"function"==typeof t.insert)t.insert(e);else{var n=o(t.insert||"head");if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(e)}return e}var u,c=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function d(t,e,s,i){var n=s?"":i.css;if(t.styleSheet)t.styleSheet.cssText=c(e,n);else{var r=document.createTextNode(n),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(r,o[e]):t.appendChild(r)}}var h=null,p=0;function m(t,e){var s,i,n;if(e.singleton){var r=p++;s=h||(h=f(e)),i=d.bind(null,s,r,!1),n=d.bind(null,s,r,!0)}else s=f(e),i=function(t,e,s){var i=s.css,n=s.media,r=s.sourceMap;if(n&&t.setAttribute("media",n),r&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}.bind(null,s,e),n=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(s)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else n()}}t.exports=function(t,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=r());var s=a(t,e);return l(s,e),function(t){for(var i=[],r=0;r<s.length;r++){var o=s[r],f=n[o.id];f&&(f.refs--,i.push(f))}t&&l(a(t,e),e);for(var u=0;u<i.length;u++){var c=i[u];if(0===c.refs){for(var d=0;d<c.parts.length;d++)c.parts[d]();delete n[c.id]}}}}}]);
//# sourceMappingURL=main.js.map