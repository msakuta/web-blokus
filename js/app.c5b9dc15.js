(function(e){function t(t){for(var o,a,l=t[0],i=t[1],u=t[2],s=0,b=[];s<l.length;s++)a=l[s],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&b.push(c[a][0]),c[a]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);f&&f(t);while(b.length)b.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,l=1;l<n.length;l++){var i=n[l];0!==c[i]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},c={app:0},r=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var f=i;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},4830:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),c=n("cf05"),r=n.n(c),a={class:"appContainer"},l=Object(o["f"])("img",{alt:"Vue logo",src:r.a},null,-1),i=Object(o["f"])("hr",null,null,-1),u=Object(o["e"])(" Powered by "),f=Object(o["f"])("a",{href:"https://v3.vuejs.org/"},"Vue.js",-1);function s(e,t,n,c,r,s){var b=Object(o["n"])("web-brokus");return Object(o["h"])(),Object(o["d"])("div",a,[l,Object(o["f"])(b),i,u,f])}var b=n("5530"),p=Object(o["q"])("data-v-18141f93");Object(o["j"])("data-v-18141f93");var v={style:{display:"inline-block"}},O=Object(o["f"])("br",null,null,-1),d=Object(o["e"])(" Pieces:"),j={class:"hello"},h={class:"outerFrame"};Object(o["i"])();var k=p((function(e,t,n,c,r,a){var l=Object(o["n"])("BlockPreview");return Object(o["h"])(),Object(o["d"])(o["a"],null,[Object(o["f"])("div",null,[Object(o["f"])("input",{type:"button",onClick:t[1]||(t[1]=function(){return c.resetGame.apply(c,arguments)}),value:"Reset Game"})]),(Object(o["h"])(!0),Object(o["d"])(o["a"],null,Object(o["m"])(c.players,(function(e,t){return Object(o["h"])(),Object(o["d"])("div",{key:t,class:{playerFrame:!0,inactive:t!==c.activePlayerIdx}},[Object(o["f"])("span",v,[Object(o["e"])("Player "+Object(o["o"])(t+1),1),O,d]),(Object(o["h"])(!0),Object(o["d"])(o["a"],null,Object(o["m"])(e.blockOptions,(function(t,n){return Object(o["h"])(),Object(o["d"])(l,{key:n,block:t,selected:e.selectedBlockOption===n,color:e.color,onClick:function(t){return c.previewClicked(e,n)}},null,8,["block","selected","color","onClick"])})),128))],2)})),128)),Object(o["f"])("div",null,[Object(o["f"])("input",{type:"button",onClick:t[2]||(t[2]=function(){return c.rotate.apply(c,arguments)}),value:"Rotate"}),Object(o["f"])("input",{type:"button",onClick:t[3]||(t[3]=function(){return c.randomTry.apply(c,arguments)}),value:"Random try"}),Object(o["f"])("input",{type:"button",onClick:t[4]||(t[4]=function(){return c.pass.apply(c,arguments)}),value:"Pass"})]),Object(o["f"])("div",j,[Object(o["f"])("div",h,[(Object(o["h"])(!0),Object(o["d"])(o["a"],null,Object(o["m"])(c.computedBoard,(function(e,t){return Object(o["h"])(),Object(o["d"])("div",{key:t},[Object(o["f"])("div",{class:Object(b["a"])({cell:!0},c.cellClass(e,t)),style:c.cellStyle(e,t),onClick:function(e){return c.tryPlace(t)},onMouseenter:function(e){return c.previewPiece(t)}},null,46,["onClick","onMouseenter"])])})),128))])])],64)})),y=(n("99af"),n("4de4"),n("4160"),n("d81d"),n("a434"),n("159b"),n("2909")),g=n("3835"),m=n("b85c"),w=n("d4ec"),B=n("ade3");function P(e,t,n,c,r,a){return Object(o["h"])(),Object(o["d"])("div",{class:{outerFramePreview:!0,selected:n.selected},onClick:t[1]||(t[1]=function(t){return e.$emit("click")})},[(Object(o["h"])(!0),Object(o["d"])(o["a"],null,Object(o["m"])(c.board,(function(e,t){return Object(o["h"])(),Object(o["d"])("div",{key:t,class:"cell",style:c.cellStyle(e,t)},null,4)})),128))],2)}var C=5,M=0,x=1,S={name:"BlockPreview",props:{block:Object,selected:Boolean,color:String},setup:function(e){var t=Object(o["k"])(new Array(C*C));function n(){for(var n=0;n<C;n++)for(var o=0;o<C;o++)t[o+n*C]=M;var c,r=Object(m["a"])(e.block.shape);try{for(r.s();!(c=r.n()).done;){var a=Object(g["a"])(c.value,2),l=a[0],i=a[1];switch(e.block.rotation){case 0:break;case 1:var u=[i,C-l-1];l=u[0],i=u[1];break;case 2:var f=[C-l-1,C-i-1];l=f[0],i=f[1];break;case 3:var s=[C-i-1,l];l=s[0],i=s[1];break}l<0||C<=l||i<0||C<=i||(t[l+i*C]=x)}}catch(b){r.e(b)}finally{r.f()}}function c(t,n){return"position: absolute; left: ".concat(n%C*6,"px; top: ").concat(6*Math.floor(n/C),"px; background-color:").concat(1===t?e.color:2===t?"#7f7fff":"white")}return Object(o["p"])(n),{board:t,cellStyle:c}}};n("7b8d");S.render=P;var _=S,T=20,A=[[[0,0]],[[0,0],[0,1]],[[0,0],[1,0]],[[0,0],[0,1],[0,2]],[[0,0],[0,1],[1,0]],[[0,0],[0,1],[1,1]],[[0,0],[0,1],[0,2],[0,3]],[[0,0],[0,1],[0,2],[1,2]],[[0,0],[0,1],[0,2],[1,1]],[[0,0],[0,1],[1,1],[1,2]],[[0,0],[1,0],[1,1],[2,1]],[[0,0],[1,0],[0,1],[1,1]],[[0,0],[1,0],[2,0],[2,1],[3,0]],[[0,0],[1,0],[2,0],[3,0],[4,0]],[[0,0],[1,0],[2,0],[3,0],[1,1]],[[0,0],[1,0],[0,1],[1,1],[2,1]]],F=0,G=4,I=3,R=8,E=16;function J(e){return e&G}function V(e){if(!J(e))throw"The cell must be occupied";return e&I}var W=function e(t){Object(w["a"])(this,e),Object(B["a"])(this,"blocks",[]),Object(B["a"])(this,"blockOptions",Object(o["k"])(A.map((function(e){return{origin:[0,0],rotation:0,shape:e}})))),Object(B["a"])(this,"selectedBlockOption",Object(o["l"])(0)),this.color=t},q={name:"WebBrokus",components:{BlockPreview:_},setup:function(){var e=Object(o["k"])(new Array(T*T)),t=Object(o["k"])(["#ff7f7f","#ffff00","#00ff00","#7f7fff"].map((function(e){return new W(e)}))),n=Object(o["l"])(0),c=Object(o["l"])(null);function r(){var e,n=Object(m["a"])(t);try{var o=function(){var t=e.value;t.blocks.length=0,t.blockOptions.length=0,A.forEach((function(e){return t.blockOptions.push({origin:[0,0],rotation:0,shape:e})})),t.selectedBlockOption=0};for(n.s();!(e=n.n()).done;)o()}catch(c){n.e(c)}finally{n.f()}a()}function a(){for(var n=0;n<T;n++)for(var o=0;o<T;o++)e[o+n*T]=F;t.forEach((function(t,n){var o,c=Object(m["a"])(t.blocks);try{for(c.s();!(o=c.n()).done;){var r,a=o.value,u=Object(m["a"])(a.shape);try{for(u.s();!(r=u.n()).done;){var f=Object(g["a"])(r.value,2),b=f[0],p=f[1],v=i(l([b,p],a.rotation),a.origin),O=Object(g["a"])(v,2);b=O[0],p=O[1],b<0||T<=b||p<0||T<=p||(e[b+p*T]=G|n)}}catch(h){u.e(h)}finally{u.f()}}}catch(h){c.e(h)}finally{c.f()}for(var d=0;d<T;d++)for(var j=0;j<T;j++)e[j+d*T]===F&&s([j,d])&&(e[j+d*T]=R)}))}function l(e,t){var n=Object(g["a"])(e,2),o=n[0],c=n[1];switch(t){case 0:break;case 1:var r=[c,-o];o=r[0],c=r[1];break;case 2:var a=[-o,-c];o=a[0],c=a[1];break;case 3:var l=[-c,o];o=l[0],c=l[1];break}return[o,c]}function i(e,t){var n=Object(g["a"])(e,2),o=n[0],c=n[1];return o+=t[0],c+=t[1],[o,c]}var u=Object(o["b"])((function(){var t=Object(y["a"])(e);if(c.value){var n,o=Object(m["a"])(c.value.shape);try{for(o.s();!(n=o.n()).done;){var r=n.value,a=i(l(r,c.value.rotation),c.value.origin);t[a[0]+a[1]*T]===F&&(t[a[0]+a[1]*T]=E)}}catch(u){o.e(u)}finally{o.f()}}return t}));function f(){var e=t[n.value];0<=e.selectedBlockOption&&(e.blockOptions[e.selectedBlockOption].rotation=(e.blockOptions[e.selectedBlockOption].rotation+1)%4,c.value&&(c.value.rotation=e.blockOptions[e.selectedBlockOption].rotation))}function s(t){var o=[1,0,1,0,0,0,1,0,1],c=[0,1,0,1,1,1,0,1,0],r=0;(0===n.value&&0===t[0]&&0===t[1]||1===n.value&&0===t[0]&&t[1]===T-1||2===n.value&&t[0]===T-1&&t[1]===T-1||3===n.value&&t[0]===T-1&&0===t[1])&&r++;for(var a=-1;a<=1;a++){var l=t[1]+a;if(!(l<0||T<=l))for(var i=-1;i<=1;i++){var u=t[0]+i;if(!(u<0||T<=u)){var f=e[u+l*T];if(J(f)){if(c[i+1+3*(a+1)]&&V(f)===n.value)return!1;o[i+1+3*(a+1)]&&V(f)===n.value&&r++}}}}return!!r}function b(e,n){return"position: absolute; left: ".concat(n%20*32,"px; top: ").concat(32*Math.floor(n/20),"px; background-color:").concat(J(e)?t[V(e)].color:e===R?"#7f7fff":e===E?"#7fff7f":"white")}function p(e){return{ridge:J(e)}}function v(o){var c=t[n.value];if(c.selectedBlockOption<0)return console.log("Block is not selected!"),!1;var r,u=[o%T,Math.floor(o/T)],f=u[0],b=u[1],p=[[-1,0],[0,-1],[1,0],[0,1]],v=c.blockOptions[c.selectedBlockOption],O=!1,d=Object(m["a"])(v.shape);try{for(d.s();!(r=d.n()).done;){var j=Object(g["a"])(r.value,2),h=j[0],k=j[1],y=i(l([h,k],v.rotation),[f,b]),w=Object(g["a"])(y,2);if(h=w[0],k=w[1],h<0||T<=h||k<0||T<=k)return!1;if(s([h,k])&&(O=!0),J(e[h+k*T]))return console.log("Cannot place there because it will be colliding to another player's block: ".concat(h,",").concat(k)),!1;var B,P=Object(m["a"])(p);try{for(P.s();!(B=P.n()).done;){var C=B.value,M=h+C[0],x=k+C[1];if(!(M<0||T<=M||x<0||T<=x)){var S=e[M+x*T];if(J(S)&&V(S)===n.value)return console.log("Cannot place there because it will be touching another block of yourself: ".concat(h,",").concat(k," and ").concat(M,",").concat(x)),!1}}}catch(_){P.e(_)}finally{P.f()}}}catch(_){d.e(_)}finally{d.f()}return O?(c.blocks.push({origin:[f,b],shape:c.blockOptions[c.selectedBlockOption].shape,rotation:c.blockOptions[c.selectedBlockOption].rotation}),c.blockOptions.splice(c.selectedBlockOption,1),c.blockOptions.length<=c.selectedBlockOption&&(c.selectedBlockOption=c.blockOptions.length-1),n.value=(n.value+1)%4,a(),!0):(console.log("Cannot place there because it will not be touching another block with a corner of yours"),!1)}function O(e){var o=t[n.value];if(o.selectedBlockOption<0)c.value=null;else{var r=[e%T,Math.floor(e/T)],a=r[0],l=r[1];c.value={origin:[a,l],shape:o.blockOptions[o.selectedBlockOption].shape,rotation:o.blockOptions[o.selectedBlockOption].rotation}}}function d(){var o=t[n.value],c=e.map((function(e,t){return[e,t]})).filter((function(e){return e[0]&R}));if(0<c.length&&0<o.blockOptions.length)for(var r=0;r<100;r++){var a=Math.floor(Math.random()*c.length),i=c[a][1],u=[i%T,Math.floor(i/T)],f=u[0],s=u[1],b=Math.floor(Math.random()*o.blockOptions.length),p=Math.floor(4*Math.random());o.selectedBlockOption=b;for(var O=o.blockOptions[b].shape,d=0;d<O.length;d++){var j=l(O[d],p);if(v(f-j[0]+(s-j[1])*T))return!0}}return!1}function j(){n.value=(n.value+1)%4,a()}return Object(o["g"])((function(){})),a(),{board:e,computedBoard:u,rotate:f,resetGame:r,randomTry:d,pass:j,cellStyle:b,cellClass:p,tryPlace:v,previewClicked:function(e,t){return e.selectedBlockOption=t},players:t,activePlayerIdx:n,activePlayer:Object(o["b"])((function(){return t[n.value]})),previewPiece:O}}};n("a673");q.render=k,q.__scopeId="data-v-18141f93";var $=q,z={name:"App",components:{WebBrokus:$}};n("64be");z.render=s;var D=z;Object(o["c"])(D).mount("#app")},"64be":function(e,t,n){"use strict";n("c894")},"7b8d":function(e,t,n){"use strict";n("c951")},a673:function(e,t,n){"use strict";n("4830")},c894:function(e,t,n){},c951:function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.c5b9dc15.js.map