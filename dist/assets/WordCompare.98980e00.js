import{d as W,i as q,k as $,o as A,c as J,e as h,w,F as M,a as _,g as z,l as U}from"./index.c8e72e83.js";function d(){}d.prototype={diff:function(e,n){var u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=u.callback;typeof u=="function"&&(r=u,u={}),this.options=u;var o=this;function i(a){return r?(setTimeout(function(){r(void 0,a)},0),!0):a}e=this.castInput(e),n=this.castInput(n),e=this.removeEmpty(this.tokenize(e)),n=this.removeEmpty(this.tokenize(n));var s=n.length,l=e.length,f=1,v=s+l;u.maxEditLength&&(v=Math.min(v,u.maxEditLength));var p=[{newPos:-1,components:[]}],m=this.extractCommon(p[0],n,e,0);if(p[0].newPos+1>=s&&m+1>=l)return i([{value:this.join(n),count:n.length}]);function y(){for(var a=-1*f;a<=f;a+=2){var c=void 0,x=p[a-1],C=p[a+1],L=(C?C.newPos:0)-a;x&&(p[a-1]=void 0);var I=x&&x.newPos+1<s,T=C&&0<=L&&L<l;if(!I&&!T){p[a]=void 0;continue}if(!I||T&&x.newPos<C.newPos?(c=Z(C),o.pushComponent(c.components,void 0,!0)):(c=x,c.newPos++,o.pushComponent(c.components,!0,void 0)),L=o.extractCommon(c,n,e,a),c.newPos+1>=s&&L+1>=l)return i(H(o,c.components,n,e,o.useLongestToken));p[a]=c}f++}if(r)(function a(){setTimeout(function(){if(f>v)return r();y()||a()},0)})();else for(;f<=v;){var E=y();if(E)return E}},pushComponent:function(e,n,u){var r=e[e.length-1];r&&r.added===n&&r.removed===u?e[e.length-1]={count:r.count+1,added:n,removed:u}:e.push({count:1,added:n,removed:u})},extractCommon:function(e,n,u,r){for(var o=n.length,i=u.length,s=e.newPos,l=s-r,f=0;s+1<o&&l+1<i&&this.equals(n[s+1],u[l+1]);)s++,l++,f++;return f&&e.components.push({count:f}),e.newPos=s,l},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],u=0;u<e.length;u++)e[u]&&n.push(e[u]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};function H(t,e,n,u,r){for(var o=0,i=e.length,s=0,l=0;o<i;o++){var f=e[o];if(f.removed){if(f.value=t.join(u.slice(l,l+f.count)),l+=f.count,o&&e[o-1].added){var p=e[o-1];e[o-1]=e[o],e[o]=p}}else{if(!f.added&&r){var v=n.slice(s,s+f.count);v=v.map(function(y,E){var a=u[l+E];return a.length>y.length?a:y}),f.value=t.join(v)}else f.value=t.join(n.slice(s,s+f.count));s+=f.count,f.added||(l+=f.count)}}var m=e[i-1];return i>1&&typeof m.value=="string"&&(m.added||m.removed)&&t.equals("",m.value)&&(e[i-2].value+=m.value,e.pop()),e}function Z(t){return{newPos:t.newPos,components:t.components.slice(0)}}var k=new d;function G(t,e,n){return k.diff(t,e,n)}var B=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,F=/\S/,N=new d;N.equals=function(t,e){return this.options.ignoreCase&&(t=t.toLowerCase(),e=e.toLowerCase()),t===e||this.options.ignoreWhitespace&&!F.test(t)&&!F.test(e)};N.tokenize=function(t){for(var e=t.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),n=0;n<e.length-1;n++)!e[n+1]&&e[n+2]&&B.test(e[n])&&B.test(e[n+2])&&(e[n]+=e[n+2],e.splice(n+1,2),n--);return e};var R=new d;R.tokenize=function(t){var e=[],n=t.split(/(\n|\r\n)/);n[n.length-1]||n.pop();for(var u=0;u<n.length;u++){var r=n[u];u%2&&!this.options.newlineIsToken?e[e.length-1]+=r:(this.options.ignoreWhitespace&&(r=r.trim()),e.push(r))}return e};var Q=new d;Q.tokenize=function(t){return t.split(/(\S.+?[.!?])(?=\s+|$)/)};var X=new d;X.tokenize=function(t){return t.split(/([{}:;,]|\s+)/)};function D(t){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?D=function(e){return typeof e}:D=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(t)}var Y=Object.prototype.toString,g=new d;g.useLongestToken=!0;g.tokenize=R.tokenize;g.castInput=function(t){var e=this.options,n=e.undefinedReplacement,u=e.stringifyReplacer,r=u===void 0?function(o,i){return typeof i>"u"?n:i}:u;return typeof t=="string"?t:JSON.stringify(O(t,null,null,r),r,"  ")};g.equals=function(t,e){return d.prototype.equals.call(g,t.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"))};function O(t,e,n,u,r){e=e||[],n=n||[],u&&(t=u(r,t));var o;for(o=0;o<e.length;o+=1)if(e[o]===t)return n[o];var i;if(Y.call(t)==="[object Array]"){for(e.push(t),i=new Array(t.length),n.push(i),o=0;o<t.length;o+=1)i[o]=O(t[o],e,n,u,r);return e.pop(),n.pop(),i}if(t&&t.toJSON&&(t=t.toJSON()),D(t)==="object"&&t!==null){e.push(t),i={},n.push(i);var s=[],l;for(l in t)t.hasOwnProperty(l)&&s.push(l);for(s.sort(),o=0;o<s.length;o+=1)l=s[o],i[l]=O(t[l],e,n,u,l);e.pop(),n.pop()}else i=t;return i}var V=new d;V.tokenize=function(t){return t.slice()};V.join=V.removeEmpty=function(t){return t};const j=_("h1",{class:"title"}," \u6587\u672C\u5BF9\u6BD4 WordCompare ",-1),K=_("div",{id:"divDiffOut",style:{"min-height":"325px",border:"#dcdfe6 solid 1px",padding:"5px 11px"}},null,-1),P=_("p",null,[U(" \u6E90\u7801\u53C2\u8003: "),_("a",{href:"https://github.com/kpdecker/jsdiff",target:"_blank"},"jsdiff")],-1),S=W({__name:"WordCompare",setup(t){const e=q(""),n=q("");let u=[];return $([e,n],()=>{u=[],G(e.value,n.value).forEach(i=>{i.removed?u.push('<del title="\u5220\u9664\u7684\u90E8\u5206">'+i.value+"</del>"):i.added?u.push('<ins title="\u65B0\u589E\u7684\u90E8\u5206">'+i.value+"</ins>"):u.push('<span title="\u6CA1\u6709\u6539\u52A8\u7684\u90E8\u5206">'+i.value+"</span>")});let o=document.getElementById("divDiffOut");o&&(o.innerHTML=u.join(""))}),(r,o)=>{const i=z("el-input"),s=z("el-col"),l=z("el-row");return A(),J(M,null,[j,h(l,null,{default:w(()=>[h(s,{lg:8},{default:w(()=>[_("div",null,[h(i,{id:"textareaIn",modelValue:e.value,"onUpdate:modelValue":o[0]||(o[0]=f=>e.value=f),autosize:{minRows:15,maxRows:30},placeholder:"Please input text",type:"textarea"},null,8,["modelValue"])])]),_:1}),h(s,{lg:8},{default:w(()=>[h(i,{id:"textareaOut",modelValue:n.value,"onUpdate:modelValue":o[1]||(o[1]=f=>n.value=f),autosize:{minRows:15,maxRows:30},placeholder:"Please input text",type:"textarea"},null,8,["modelValue"])]),_:1}),h(s,{lg:8},{default:w(()=>[K]),_:1})]),_:1}),h(l,{style:{"justify-content":"center"}},{default:w(()=>[h(s,{span:"5",style:{"text-align":"center"}},{default:w(()=>[P]),_:1})]),_:1})],64)}}});export{S as default};
