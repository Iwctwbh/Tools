import{d as F,i as q,k as B,r as E,o as A,c as J,f as h,w,b as _,F as M,l as U}from"./index-6d59523f.js";function d(){}d.prototype={diff:function(e,n){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=o.callback;typeof o=="function"&&(r=o,o={}),this.options=o;var i=this;function u(a){return r?(setTimeout(function(){r(void 0,a)},0),!0):a}e=this.castInput(e),n=this.castInput(n),e=this.removeEmpty(this.tokenize(e)),n=this.removeEmpty(this.tokenize(n));var s=n.length,l=e.length,f=1,v=s+l;o.maxEditLength&&(v=Math.min(v,o.maxEditLength));var p=[{newPos:-1,components:[]}],m=this.extractCommon(p[0],n,e,0);if(p[0].newPos+1>=s&&m+1>=l)return u([{value:this.join(n),count:n.length}]);function y(){for(var a=-1*f;a<=f;a+=2){var c=void 0,x=p[a-1],C=p[a+1],z=(C?C.newPos:0)-a;x&&(p[a-1]=void 0);var I=x&&x.newPos+1<s,T=C&&0<=z&&z<l;if(!I&&!T){p[a]=void 0;continue}if(!I||T&&x.newPos<C.newPos?(c=Z(C),i.pushComponent(c.components,void 0,!0)):(c=x,c.newPos++,i.pushComponent(c.components,!0,void 0)),z=i.extractCommon(c,n,e,a),c.newPos+1>=s&&z+1>=l)return u(H(i,c.components,n,e,i.useLongestToken));p[a]=c}f++}if(r)(function a(){setTimeout(function(){if(f>v)return r();y()||a()},0)})();else for(;f<=v;){var L=y();if(L)return L}},pushComponent:function(e,n,o){var r=e[e.length-1];r&&r.added===n&&r.removed===o?e[e.length-1]={count:r.count+1,added:n,removed:o}:e.push({count:1,added:n,removed:o})},extractCommon:function(e,n,o,r){for(var i=n.length,u=o.length,s=e.newPos,l=s-r,f=0;s+1<i&&l+1<u&&this.equals(n[s+1],o[l+1]);)s++,l++,f++;return f&&e.components.push({count:f}),e.newPos=s,l},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],o=0;o<e.length;o++)e[o]&&n.push(e[o]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};function H(t,e,n,o,r){for(var i=0,u=e.length,s=0,l=0;i<u;i++){var f=e[i];if(f.removed){if(f.value=t.join(o.slice(l,l+f.count)),l+=f.count,i&&e[i-1].added){var p=e[i-1];e[i-1]=e[i],e[i]=p}}else{if(!f.added&&r){var v=n.slice(s,s+f.count);v=v.map(function(y,L){var a=o[l+L];return a.length>y.length?a:y}),f.value=t.join(v)}else f.value=t.join(n.slice(s,s+f.count));s+=f.count,f.added||(l+=f.count)}}var m=e[u-1];return u>1&&typeof m.value=="string"&&(m.added||m.removed)&&t.equals("",m.value)&&(e[u-2].value+=m.value,e.pop()),e}function Z(t){return{newPos:t.newPos,components:t.components.slice(0)}}var k=new d;function G(t,e,n){return k.diff(t,e,n)}var N=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,R=/\S/,W=new d;W.equals=function(t,e){return this.options.ignoreCase&&(t=t.toLowerCase(),e=e.toLowerCase()),t===e||this.options.ignoreWhitespace&&!R.test(t)&&!R.test(e)};W.tokenize=function(t){for(var e=t.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),n=0;n<e.length-1;n++)!e[n+1]&&e[n+2]&&N.test(e[n])&&N.test(e[n+2])&&(e[n]+=e[n+2],e.splice(n+1,2),n--);return e};var $=new d;$.tokenize=function(t){var e=[],n=t.split(/(\n|\r\n)/);n[n.length-1]||n.pop();for(var o=0;o<n.length;o++){var r=n[o];o%2&&!this.options.newlineIsToken?e[e.length-1]+=r:(this.options.ignoreWhitespace&&(r=r.trim()),e.push(r))}return e};var Q=new d;Q.tokenize=function(t){return t.split(/(\S.+?[.!?])(?=\s+|$)/)};var X=new d;X.tokenize=function(t){return t.split(/([{}:;,]|\s+)/)};function D(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?D=function(e){return typeof e}:D=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(t)}var Y=Object.prototype.toString,g=new d;g.useLongestToken=!0;g.tokenize=$.tokenize;g.castInput=function(t){var e=this.options,n=e.undefinedReplacement,o=e.stringifyReplacer,r=o===void 0?function(i,u){return typeof u>"u"?n:u}:o;return typeof t=="string"?t:JSON.stringify(O(t,null,null,r),r,"  ")};g.equals=function(t,e){return d.prototype.equals.call(g,t.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"))};function O(t,e,n,o,r){e=e||[],n=n||[],o&&(t=o(r,t));var i;for(i=0;i<e.length;i+=1)if(e[i]===t)return n[i];var u;if(Y.call(t)==="[object Array]"){for(e.push(t),u=new Array(t.length),n.push(u),i=0;i<t.length;i+=1)u[i]=O(t[i],e,n,o,r);return e.pop(),n.pop(),u}if(t&&t.toJSON&&(t=t.toJSON()),D(t)==="object"&&t!==null){e.push(t),u={},n.push(u);var s=[],l;for(l in t)t.hasOwnProperty(l)&&s.push(l);for(s.sort(),i=0;i<s.length;i+=1)l=s[i],u[l]=O(t[l],e,n,o,l);e.pop(),n.pop()}else u=t;return u}var V=new d;V.tokenize=function(t){return t.slice()};V.join=V.removeEmpty=function(t){return t};const j=_("h1",{class:"title"}," 文本对比 WordCompare ",-1),K=_("div",{id:"divDiffOut",style:{"min-height":"325px",border:"#dcdfe6 solid 1px",padding:"5px 11px"}},null,-1),P=_("p",null,[U(" 源码参考: "),_("a",{href:"https://github.com/kpdecker/jsdiff",target:"_blank"},"jsdiff")],-1),S=F({__name:"WordCompare",setup(t){const e=q(""),n=q("");let o=[];return B([e,n],()=>{o=[],G(e.value,n.value).forEach(u=>{u.removed?o.push('<del title="删除的部分">'+u.value+"</del>"):u.added?o.push('<ins title="新增的部分">'+u.value+"</ins>"):o.push('<span title="没有改动的部分">'+u.value+"</span>")});let i=document.getElementById("divDiffOut");i&&(i.innerHTML=o.join(""))}),(r,i)=>{const u=E("el-input"),s=E("el-col"),l=E("el-row");return A(),J(M,null,[j,h(l,null,{default:w(()=>[h(s,{lg:8},{default:w(()=>[_("div",null,[h(u,{id:"textareaIn",modelValue:e.value,"onUpdate:modelValue":i[0]||(i[0]=f=>e.value=f),autosize:{minRows:15,maxRows:30},placeholder:"Please input text",type:"textarea"},null,8,["modelValue"])])]),_:1}),h(s,{lg:8},{default:w(()=>[h(u,{id:"textareaOut",modelValue:n.value,"onUpdate:modelValue":i[1]||(i[1]=f=>n.value=f),autosize:{minRows:15,maxRows:30},placeholder:"Please input text",type:"textarea"},null,8,["modelValue"])]),_:1}),h(s,{lg:8},{default:w(()=>[K]),_:1})]),_:1}),h(l,{style:{"justify-content":"center"}},{default:w(()=>[h(s,{span:"5",style:{"text-align":"center"}},{default:w(()=>[P]),_:1})]),_:1})],64)}}});export{S as default};
