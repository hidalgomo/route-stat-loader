(()=>{"use strict";var e={559:(e,n,t)=>{t.d(n,{Z:()=>g});var o=t(537),r=t.n(o),i=t(645),a=t.n(i),s=t(667),A=t.n(s),d=new URL(t(812),t.b),l=new URL(t(72),t.b),c=a()(r()),u=A()(d),p=A()(l);c.push([e.id,"@media only screen and (max-width: 600px) {\n    div.borough { width: 100% !important; }\n    div.borough-label { background-color: #fff; }\n}\n\n@media only screen and (max-width: 1350px) {\n    div.route { width: 100% !important; }\n}\n\n@media only screen and (max-width: 390px) {\n    section.toolbar-container div.brand { max-width: 300px;  }\n    section.toolbar-container div.brand h2 { padding: 0 0 0 4rem !important; }\n}\n\n@media only screen and (max-width: 395px) {\n    section.toolbar-container div.brand h2 { padding: 0 0 0 5rem !important; }\n}\n\nhtml, body {\n    font-family: Helvetica, Arial, sans-serif;\n    font-size: 0.90em;\n    position: relative;\n    margin: 0;\n    padding: 0;\n    color: #262626;\n}\n\nsection.toolbar-container {\n    position: relative;\n    padding: 1rem;\n    border-bottom: solid 1px #333;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    justify-content: space-between;\n}\n\nsection.toolbar-container div.brand h2 { \n    margin: 0;\n    padding: .32rem 0 .32rem 3rem;\n    background: url("+u+") no-repeat center left;\n    background-size: contain;\n}\n\nsection.toolbar-container div.tool-list {\n    display: flex;\n    flex-flow: row wrap;\n}\n\nsection.toolbar-container div.tool-list a.tool {\n    display: block;\n    padding: .2rem .3rem;\n    color: #eee;\n    text-decoration: none;\n    font-weight: bold;\n    margin: 0 0.3rem;\n    height: 24px;\n    width: 30px;\n    border-radius: 9px;\n    border: solid 1px #0B6623;\n    background: linear-gradient(145deg, #0a5c20, #0c6d25);\n    box-shadow:  4px 4px 8px #09571e,\n                 -4px -4px 8px #0d7528;\n}\nspan.icon {\n    display: block; \n    height: 100%;\n    width: 100%;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: contain;\n}\n\nspan.home-icon { background-image: url("+p+"); }\n\nsection.toolbar-container div.tool-list .tool:hover { border: solid 1px #008000; }\n\n.display-none { display: none !important; }\n.primary-color { background-color: #0B6623 !important; color: #fff !important; }\n.red-bg { background-color: #ff0000; }\n.yellow-bg { background-color: #FFFF00; }\n.light-green-bg { background-color: #adff2f; }\n.mid-green-bg { background-color: #00ff00; }\n.dark-green-bg { background-color: #32cd32; }\n\n\n.logo-bg {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: url("+u+') no-repeat center center;\n    opacity: .1;\n    z-index: -1;\n    background-size: contain;\n\n    -webkit-filter: blur(1px);\n    -moz-filter: blur(1px);\n    -ms-filter: blur(1px);\n    -o-filter: blur(1px);\n}\n\n.modal-bg { position: fixed; }\n\n.modal-bg { \n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #000;\n    z-index: 9990;\n    opacity: 0.6;\n}\n\n.container-fluid,\n.borough-container { position: inherit; }\n.borough { float: left; width: 33.33%; }\n\ndiv.borough div.borough-label {\n    text-transform: uppercase;\n    box-shadow: 0 4px 3px -4px #008000;\n    font-size: 1.5em;\n    backdrop-filter: blur(7px);\n    border-bottom: solid 1px #999;\n    border-top: solid 1px #fff;\n    white-space: nowrap;\n    font-weight: bold;\n}\n\ndiv.borough div.borough-label > div,\ndiv.borough div.route-container { padding: 1rem; }\n\ndiv.route {\n    position: relative;\n    display: inline-block; \n    white-space: nowrap;\n    min-height: 3rem;\n}\n\ndiv.route .link { \n    text-decoration: none;\n    display: inline-block;\n    padding: 5px 0;\n    color: rgb(86, 129, 209);\n    font-weight: bold;\n}\n\n.borough-container .borough div.route {\n    width: 46%;\n    margin-right: 1rem !important;\n    cursor: pointer;\n    margin: 2.5rem 0;\n}\n\n.borough-container .borough div.route .truck-map { display: none; }\n\n.route-detail-container .route-detail div.route { width: 100%; margin: 1.5rem 0; }\n.route-detail-container .route-detail div.route div.route-label::before { content: "Equipment: "; }\n.route-detail-container .route-detail div.route .route-map { display: none; }\n.route-detail-container .route-detail div.route .progress-percent { display: none; }\n\ndiv.route div.route-label {\n    font-size: 1.2rem;\n    text-transform: capitalize;\n    font-weight: bold;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\ndiv.route div.outer-progress-bar,\ndiv.route div.outer-progress-bar .inner-progress-bar { border-radius: 20px; }\n\ndiv.route div.outer-progress-bar {\n    position: relative;\n    min-height: inherit;\n    overflow: hidden;\n    border: solid 1px #aaa;\n    backdrop-filter: blur(5px);\n}\n\ndiv.route div.outer-progress-bar .inner-progress-bar,\ndiv.route div.outer-progress-bar .progress-percent { position: absolute; top:0; left: 0; width: 100%; }\ndiv.route div.outer-progress-bar .inner-progress-bar { height: 100%; width: 0; transition: ease-in-out .8s; }\n\ndiv.route div.outer-progress-bar .progress-percent {\n    text-align: center;\n    font-size: 1.4rem;\n    padding: .7rem 0;\n    transition: ease-in-out .1s;\n}\n\n.borough-container .borough div.route:hover div.outer-progress-bar .progress-percent { font-size: 2rem;  }\n\naside.route-detail-container {\n    position: fixed;\n    top: 0;\n    right:0;\n    height: 100%;\n    width: 0;\n    z-index: 9991;\n    background-color: #fff;\n    max-width: 400px;\n    box-shadow: 1px 0 3px #333;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    transition: ease-in-out .3s;\n}\n\naside.route-detail-container div.tool-list { text-align: right; font-weight: 100; color: #444; }\n\naside.route-detail-container div.tool-list .tool { \n    display: inline-block; \n    font-size: 2.6rem; \n    cursor: pointer; \n    padding: 0 2rem; \n    outline: none;\n    user-select: none;\n}\n\ndiv.selected-route-label { padding: 0 2rem; font-weight: bold; font-size: 1.2rem; }\n\nsection.route-detail {\n    padding: 2rem;\n    padding-top: 0;\n    display: flex;\n    flex-flow: row wrap;\n}\n\nsection.route-detail .inner-progress-bar { background-color: rgb(222, 222, 222) !important; }\n\n/* NOTIFICATION STYLES */\n\ndiv.notification-container {\n    width: 300px;\n    min-height: 70px;\n    background-color: #fff;\n    position: fixed;\n    right: 4%;\n    bottom: 8%;\n    box-shadow: 0 0 10px 1px #444;\n    border-radius: 8px;\n    border: solid 2px #000;\n}\n\ndiv.message-list {\n    padding: 10px 20px;\n    position: relative;\n    height: 100%;\n    width: calc(100% - 40px);\n}\n\ndiv.message { border-bottom: solid 1px #eee; padding-bottom: 15px; }\ndiv.message:first-child { border-bottom: none !important; }\ndiv.message-actions { display: flex; }\n\ndiv.message-actions button {\n    border: none;\n    background: none;\n    cursor: pointer;\n    margin-left: auto;\n}\n\ndiv.message-body { font-size: 1rem; }\n\nsection.datetime-container {\n    padding-right: 1rem;\n    text-align: right;\n    color: #333;\n    backdrop-filter: blur(7px);\n}\n\n',"",{version:3,sources:["webpack://./src/app/styles.css"],names:[],mappings:"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",sourcesContent:['@media only screen and (max-width: 600px) {\n    div.borough { width: 100% !important; }\n    div.borough-label { background-color: #fff; }\n}\n\n@media only screen and (max-width: 1350px) {\n    div.route { width: 100% !important; }\n}\n\n@media only screen and (max-width: 390px) {\n    section.toolbar-container div.brand { max-width: 300px;  }\n    section.toolbar-container div.brand h2 { padding: 0 0 0 4rem !important; }\n}\n\n@media only screen and (max-width: 395px) {\n    section.toolbar-container div.brand h2 { padding: 0 0 0 5rem !important; }\n}\n\nhtml, body {\n    font-family: Helvetica, Arial, sans-serif;\n    font-size: 0.90em;\n    position: relative;\n    margin: 0;\n    padding: 0;\n    color: #262626;\n}\n\nsection.toolbar-container {\n    position: relative;\n    padding: 1rem;\n    border-bottom: solid 1px #333;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    justify-content: space-between;\n}\n\nsection.toolbar-container div.brand h2 { \n    margin: 0;\n    padding: .32rem 0 .32rem 3rem;\n    background: url(./assets/dsny_logo.png) no-repeat center left;\n    background-size: contain;\n}\n\nsection.toolbar-container div.tool-list {\n    display: flex;\n    flex-flow: row wrap;\n}\n\nsection.toolbar-container div.tool-list a.tool {\n    display: block;\n    padding: .2rem .3rem;\n    color: #eee;\n    text-decoration: none;\n    font-weight: bold;\n    margin: 0 0.3rem;\n    height: 24px;\n    width: 30px;\n    border-radius: 9px;\n    border: solid 1px #0B6623;\n    background: linear-gradient(145deg, #0a5c20, #0c6d25);\n    box-shadow:  4px 4px 8px #09571e,\n                 -4px -4px 8px #0d7528;\n}\nspan.icon {\n    display: block; \n    height: 100%;\n    width: 100%;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: contain;\n}\n\nspan.home-icon { background-image: url(./assets/home_ico.png); }\n\nsection.toolbar-container div.tool-list .tool:hover { border: solid 1px #008000; }\n\n.display-none { display: none !important; }\n.primary-color { background-color: #0B6623 !important; color: #fff !important; }\n.red-bg { background-color: #ff0000; }\n.yellow-bg { background-color: #FFFF00; }\n.light-green-bg { background-color: #adff2f; }\n.mid-green-bg { background-color: #00ff00; }\n.dark-green-bg { background-color: #32cd32; }\n\n\n.logo-bg {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: url(./assets/dsny_logo.png) no-repeat center center;\n    opacity: .1;\n    z-index: -1;\n    background-size: contain;\n\n    -webkit-filter: blur(1px);\n    -moz-filter: blur(1px);\n    -ms-filter: blur(1px);\n    -o-filter: blur(1px);\n}\n\n.modal-bg { position: fixed; }\n\n.modal-bg { \n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #000;\n    z-index: 9990;\n    opacity: 0.6;\n}\n\n.container-fluid,\n.borough-container { position: inherit; }\n.borough { float: left; width: 33.33%; }\n\ndiv.borough div.borough-label {\n    text-transform: uppercase;\n    box-shadow: 0 4px 3px -4px #008000;\n    font-size: 1.5em;\n    backdrop-filter: blur(7px);\n    border-bottom: solid 1px #999;\n    border-top: solid 1px #fff;\n    white-space: nowrap;\n    font-weight: bold;\n}\n\ndiv.borough div.borough-label > div,\ndiv.borough div.route-container { padding: 1rem; }\n\ndiv.route {\n    position: relative;\n    display: inline-block; \n    white-space: nowrap;\n    min-height: 3rem;\n}\n\ndiv.route .link { \n    text-decoration: none;\n    display: inline-block;\n    padding: 5px 0;\n    color: rgb(86, 129, 209);\n    font-weight: bold;\n}\n\n.borough-container .borough div.route {\n    width: 46%;\n    margin-right: 1rem !important;\n    cursor: pointer;\n    margin: 2.5rem 0;\n}\n\n.borough-container .borough div.route .truck-map { display: none; }\n\n.route-detail-container .route-detail div.route { width: 100%; margin: 1.5rem 0; }\n.route-detail-container .route-detail div.route div.route-label::before { content: "Equipment: "; }\n.route-detail-container .route-detail div.route .route-map { display: none; }\n.route-detail-container .route-detail div.route .progress-percent { display: none; }\n\ndiv.route div.route-label {\n    font-size: 1.2rem;\n    text-transform: capitalize;\n    font-weight: bold;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\ndiv.route div.outer-progress-bar,\ndiv.route div.outer-progress-bar .inner-progress-bar { border-radius: 20px; }\n\ndiv.route div.outer-progress-bar {\n    position: relative;\n    min-height: inherit;\n    overflow: hidden;\n    border: solid 1px #aaa;\n    backdrop-filter: blur(5px);\n}\n\ndiv.route div.outer-progress-bar .inner-progress-bar,\ndiv.route div.outer-progress-bar .progress-percent { position: absolute; top:0; left: 0; width: 100%; }\ndiv.route div.outer-progress-bar .inner-progress-bar { height: 100%; width: 0; transition: ease-in-out .8s; }\n\ndiv.route div.outer-progress-bar .progress-percent {\n    text-align: center;\n    font-size: 1.4rem;\n    padding: .7rem 0;\n    transition: ease-in-out .1s;\n}\n\n.borough-container .borough div.route:hover div.outer-progress-bar .progress-percent { font-size: 2rem;  }\n\naside.route-detail-container {\n    position: fixed;\n    top: 0;\n    right:0;\n    height: 100%;\n    width: 0;\n    z-index: 9991;\n    background-color: #fff;\n    max-width: 400px;\n    box-shadow: 1px 0 3px #333;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    transition: ease-in-out .3s;\n}\n\naside.route-detail-container div.tool-list { text-align: right; font-weight: 100; color: #444; }\n\naside.route-detail-container div.tool-list .tool { \n    display: inline-block; \n    font-size: 2.6rem; \n    cursor: pointer; \n    padding: 0 2rem; \n    outline: none;\n    user-select: none;\n}\n\ndiv.selected-route-label { padding: 0 2rem; font-weight: bold; font-size: 1.2rem; }\n\nsection.route-detail {\n    padding: 2rem;\n    padding-top: 0;\n    display: flex;\n    flex-flow: row wrap;\n}\n\nsection.route-detail .inner-progress-bar { background-color: rgb(222, 222, 222) !important; }\n\n/* NOTIFICATION STYLES */\n\ndiv.notification-container {\n    width: 300px;\n    min-height: 70px;\n    background-color: #fff;\n    position: fixed;\n    right: 4%;\n    bottom: 8%;\n    box-shadow: 0 0 10px 1px #444;\n    border-radius: 8px;\n    border: solid 2px #000;\n}\n\ndiv.message-list {\n    padding: 10px 20px;\n    position: relative;\n    height: 100%;\n    width: calc(100% - 40px);\n}\n\ndiv.message { border-bottom: solid 1px #eee; padding-bottom: 15px; }\ndiv.message:first-child { border-bottom: none !important; }\ndiv.message-actions { display: flex; }\n\ndiv.message-actions button {\n    border: none;\n    background: none;\n    cursor: pointer;\n    margin-left: auto;\n}\n\ndiv.message-body { font-size: 1rem; }\n\nsection.datetime-container {\n    padding-right: 1rem;\n    text-align: right;\n    color: #333;\n    backdrop-filter: blur(7px);\n}\n\n'],sourceRoot:""}]);const g=c},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,r,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(o)for(var s=0;s<this.length;s++){var A=this[s][0];null!=A&&(a[A]=!0)}for(var d=0;d<e.length;d++){var l=[].concat(e[d]);o&&a[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),n.push(l))}},n}},667:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},537:e=>{e.exports=function(e){var n=e[1],t=e[3];if(!t)return n;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),i="/*# ".concat(r," */"),a=t.sources.map((function(e){return"/*# sourceURL=".concat(t.sourceRoot||"").concat(e," */")}));return[n].concat(a).concat([i]).join("\n")}return[n].join("\n")}},379:e=>{var n=[];function t(e){for(var t=-1,o=0;o<n.length;o++)if(n[o].identifier===e){t=o;break}return t}function o(e,o){for(var i={},a=[],s=0;s<e.length;s++){var A=e[s],d=o.base?A[0]+o.base:A[0],l=i[d]||0,c="".concat(d," ").concat(l);i[d]=l+1;var u=t(c),p={css:A[1],media:A[2],sourceMap:A[3],supports:A[4],layer:A[5]};if(-1!==u)n[u].references++,n[u].updater(p);else{var g=r(p,o);o.byIndex=s,n.splice(s,0,{identifier:c,updater:g,references:1})}a.push(c)}return a}function r(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var i=o(e=e||[],r=r||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var s=t(i[a]);n[s].references--}for(var A=o(e,r),d=0;d<i.length;d++){var l=t(i[d]);0===n[l].references&&(n[l].updater(),n.splice(l,1))}i=A}}},569:e=>{var n={};e.exports=function(e,t){var o=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(o,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},812:(e,n,t)=>{e.exports=t.p+"dsny_logo.png"},72:(e,n,t)=>{e.exports=t.p+"home_ico.png"}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={id:o,exports:{}};return e[o](i,i.exports,t),i.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var o=n.getElementsByTagName("script");o.length&&(e=o[o.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{var e=t(379),n=t.n(e),o=t(795),r=t.n(o),i=t(569),a=t.n(i),s=t(565),A=t.n(s),d=t(216),l=t.n(d),c=t(589),u=t.n(c),p=t(559),g={};g.styleTagTransform=u(),g.setAttributes=A(),g.insert=a().bind(null,"head"),g.domAPI=r(),g.insertStyleElement=l(),n()(p.Z,g),p.Z&&p.Z.locals&&p.Z.locals;class h{executables=[];constructor(e){if(this.constructor===h)throw new Error("Artifact class cannot be instantiated.");Object.defineProperty(this,"element",{value:e,writable:!1})}}class m extends h{constructor(e){if(super(e),this.constructor===m)throw new Error("Abstract class cannot be instantiated.")}show=()=>this.element.classList.remove("display-none");hide=()=>this.element.classList.add("display-none")}const B=new class extends m{constructor(){super(document.querySelector(".modal-bg")),this.element&&this.element.addEventListener("click",(()=>this.executables.forEach((e=>e()))))}init=e=>this.executables=e};class b extends h{constructor(e){if(super(e),this.constructor===b)throw new Error("Abstract class cannot be instantiated.")}show=e=>this.element.style.width=e;hide=e=>this.element.style.width=0}const f=new class extends b{constructor(){super(document.querySelector(".route-detail-container"))}};f.selectedRoute=f.element.querySelector(".selected-route-label"),f.closeBtn=new class extends h{constructor(){super(document.getElementById("closeRouteDetailBtn")),this.element&&this.element.addEventListener("click",(()=>this.executables.forEach((e=>e()))))}init=e=>this.executables=e};const C=f,v={MB:{name:"Manhattan-Bronx",orderNum:1},BQ:{name:"Brooklyn-Queens",orderNum:2},SI:{name:"Staten Island",orderNum:3}},x={BQ_99_RH_H101:"Belt Parkway",MB_99_RH_H101:"Bronx River Parkway",BQ_99_RH_H102:"Brooklyn Queens Expressway",MB_99_RH_H102:"Bruckner Expressway",BQ_99_RH_H103:"Clearview Expressway",MB_99_RH_H103:"Cross Bronx Expressway",BQ_99_RH_H104:"Cross Island Parkway",SI_99_RH_H101:"Dr M L King Jr Expressway",MB_99_RH_H104:"Franklin D Roosevelt Drive",BQ_99_RH_H105:"Gowanus Expressway",BQ_99_RH_H106:"Grand Central Parkway",MB_99_RH_H105:"Harlem River Drive",MB_99_RH_H106:"Henry Hudson Parkway",MB_99_RH_H107:"Hutchinson River Parkway",BQ_99_RH_H107:"Jackie Robinson Parkway",SI_99_RH_H102:"Korean War Vets Parkway",BQ_99_RH_H108:"Long Island Expressway",MB_99_RH_H108:"Major Deegan Expressway",MB_99_RH_H109:"Mosholu Parkway",BQ_99_RH_H109:"Nassau Expressway",MB_99_RH_H110:"Pelham Parkway",BQ_99_RH_H110:"Prospect Expressway",MB_99_RH_H111:"Sheridan Boulevard",SI_99_RH_H103:"Staten Island Expressway",BQ_99_RH_H111:"Van Wyck Expressway",SI_99_RH_H104:"West Shore Expressway"};class w{constructor(){this.description="No class identified to properly instantiate"}}const I=new class{constructor(e){Object.assign(this,e)}create=(e,n)=>{try{return new this[e](n)}catch{return new w}}}({Route:class{#e(e){const n=Math.abs(100*e);return n<50?"red-bg":n>=50&&n<70?"yellow-bg":n>=70&&n<80?"light-green-bg":n>=80&&n<90?"mid-green-bg":"dark-green-bg"}constructor(e){Object.assign(this,e),this.fullName=x[this.route_name],this.equipments=[]}template(e="fullName",n="pctcomp_combined",t){const o=document.createElement("div");return o.classList.add("route"),o.id=this.route_name,o.title=this[e],o.innerHTML=`\n            <div class="route-label">${this[e]}</div>  \n            <a class="link route-map" href="http://10.155.228.80:4200/ruto-pub/percent-complete/${this.mongo_id}?startTime=${this.dateTimeStamp.start}&endTime=${this.dateTimeStamp.end}&equipment=${this.equipments.join(",")}" title="Route Map">Route Map</a>\n            <a class="link truck-map" href="http://10.155.228.80:4200/ruto-pub/percent-complete/${this.mongo_id}?startTime=${this.dateTimeStamp.start}&endTime=${this.dateTimeStamp.end}&equipment=${this.equipment_id}" title="Truck Map">Truck Map</a>\n            <div class="outer-progress-bar">\n                <div class="inner-progress-bar ${this.#e(this[n])}"></div>\n                <div class="progress-percent">${(100*this[n]).toFixed(1)}%</div>\n            </div>`,t&&o.addEventListener("click",(function(){t(this)})),o}},Borough:class{constructor(e){Object.assign(this,e),this.fullName=v[this.borough]&&v[this.borough].name,this.Route=[]}template(e){const n=document.createElement("div");return n.classList.add("borough"),n.id=this.borough,n.innerHTML=`\n            <div class="borough-label">\n                <div>${this.fullName}</div>\n            </div>\n            <div class="route-container"></div>`,e&&n.addEventListener("click",e),n}},Schema:class{constructor(e){Object.assign(this,e),this.table,this.relation}},NonArtifact:w}),E=new class{#n;#t=[];#o=[];#r;#i={start:null,end:null};#a(e){return[...new Set(e.map((e=>e.borough)))].map((n=>e.find((e=>e.borough===n))))}#s=e=>e.map((e=>this.#n.create("Borough",e)));#A=e=>e.map((e=>(e.dateTimeStamp=this.#i,this.#n.create("Route",e))));constructor(e){this.#n=e}load(e){this.#t=this.#s(this.#a(e.routes)),this.#o=this.#A(e.routes),this.#i.start=`${e.startStamp.date} ${e.startStamp.time}`,this.#i.end=`${e.endStamp.date} ${e.endStamp.time}`,this.#r=e}sortByOrderNum(){this.#t=this.#t.sort(((e,n)=>v[e.shortName]&&v[n.shortName]&&v[e.shortName].orderNum<v[n.shortName].orderNum?-1:1))}getUniqueRoutes(){const e={};for(let n of this.#o)e[n.route_name]?e[n.route_name].equipments.push(n.equipment_id):(n.equipments.push(n.equipment_id),e[n.route_name]=n);return Object.values(e)}getBoroughs=()=>this.#t;getRoutesByName=e=>this.#o.filter((n=>n.route_name===e));getDatetime=()=>`${this.#i.start} - ${this.#i.end}`;getLastPingDate=()=>`${this.#r.last_ping.date} ${this.#r.last_ping.time}`}(I),y=new class{#d;domain(e){return this.#d=e,this}getParameters=()=>window.location.hash.substring(1);get(e){const n=this.#d+e;return fetch(n).then((e=>{if(e.ok)return e.json();throw new Error("Unable to load data")}))}};class k{constructor(){if(this.constructor===k)throw new Error("Renderer class cannot be instantiated.")}render(e,n,t){return new Promise(((o,r)=>{for(let o of n)e(o).appendChild(t(o));setTimeout(o,100)}))}}const _=new class extends k{getContainer=()=>document.getElementById("boroughContainer");renderBoroughs=e=>this.render(this.getContainer,e,(e=>e.template()))};class H extends k{getContainer=e=>{let n=e?document.getElementById(e.borough):document;return n=n.querySelectorAll(".route-container"),e?n[0]:n};getRoutesFromContainers(e){const n=[];return e.forEach((e=>n.push(...e.children))),n}setPercentageFill(){let e=this.getContainer();e=e.tagName?[e]:e;const n=this.getRoutesFromContainers(e);let t,o;for(let e of n)o=e.querySelector(".progress-percent").innerHTML,t=e.querySelector(".inner-progress-bar"),t.style.width=o}renderRoute=(e,n)=>this.render(this.getContainer,e,(e=>e.template(void 0,void 0,n)))}const R=new H,S=new class extends H{getContainer=()=>document.getElementById("routeDetail");renderRoute=async e=>{this.getContainer().innerHTML="",await this.render(this.getContainer,e,(e=>e.template("equipment_id","pctcomp_specific")))}},M=new class extends h{constructor(){super(document.querySelector(".datetime-container"))}},q=new class extends m{#l(e){const n=document.createElement("div");return n.classList.add("message"),n.innerHTML=`\n            <div class="message">\n                <div class="message-actions">\n                    <button class="btn message-close-btn" title="Close Message">X</button>\n                </div>\n                <div class="message-body">${e}</div>\n            </div>`,n.querySelector(".message-close-btn").addEventListener("click",(e=>{n.remove(),this.messageListNode.innerHTML||this.hide()})),n}constructor(){super(document.querySelector(".notification-container")),this.messageListNode=this.element.querySelector(".message-list")}add(e){this.show(),this.messageListNode.appendChild(this.#l(e))}};B.init([e=>B.hide(),e=>C.hide()]),C.closeBtn.init([e=>B.hide(),e=>C.hide()]),y.domain("./json_dataset.json").get(y.getParameters()).then((e=>E.load(e))).then((e=>E.sortByOrderNum())).then((e=>_.renderBoroughs(E.getBoroughs()))).then((e=>R.renderRoute(E.getUniqueRoutes(),(e=>{const n=E.getRoutesByName(e.id);S.renderRoute(n).then((e=>{C.selectedRoute.textContent=n[0].fullName,C.show("70%"),B.show()})).then((e=>S.setPercentageFill()))})))).then((e=>R.setPercentageFill())).then((e=>M.element.textContent=E.getLastPingDate())).catch((e=>q.add(e.message))),t.p})()})();
//# sourceMappingURL=bundlec0d2c70d23a9e6ad0bad.js.map