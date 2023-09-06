import{d as N,i as b,r as j,o as P,c as S,f as m,w as p,b as c,l as g,F as A}from"./index-c3fa7103.js";function C(e){return e===null?"null":typeof e}function _(e){return!!e&&typeof e=="object"}function J(e){if(e===void 0)return"";if(e===null||typeof e=="object"&&!e.constructor)return"Object";var t=/function ([^(]*)/.exec(e.constructor.toString());return t&&t.length>1?t[1]:""}function x(e,t,n){return e==="null"||e==="undefined"?e:(e!=="string"&&e!=="stringifiable"||(n='"'+n.replace(/"/g,'\\"')+'"'),e==="function"?t.toString().replace(/[\r\n]/g,"").replace(/\{.*\}/,"")+"{…}":n)}function k(e){var t="";return _(e)?(t=J(e),Array.isArray(e)&&(t+="["+e.length+"]")):t=x(C(e),e,e),t}function f(e){return"json-formatter-"+e}function a(e,t,n){var r=document.createElement(e);return t&&r.classList.add(f(t)),n!==void 0&&(n instanceof Node?r.appendChild(n):r.appendChild(document.createTextNode(String(n)))),r}(function(e){if(e&&typeof window<"u"){var t=document.createElement("style");t.setAttribute("media","screen"),t.innerHTML=e,document.head.appendChild(t)}})(`.json-formatter-row {
  font-family: monospace;
}
.json-formatter-row,
.json-formatter-row a,
.json-formatter-row a:hover {
  color: black;
  text-decoration: none;
}
.json-formatter-row .json-formatter-row {
  margin-left: 1rem;
}
.json-formatter-row .json-formatter-children.json-formatter-empty {
  opacity: 0.5;
  margin-left: 1rem;
}
.json-formatter-row .json-formatter-children.json-formatter-empty:after {
  display: none;
}
.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {
  content: "No properties";
}
.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {
  content: "[]";
}
.json-formatter-row .json-formatter-string,
.json-formatter-row .json-formatter-stringifiable {
  color: green;
  white-space: pre;
  word-wrap: break-word;
}
.json-formatter-row .json-formatter-number {
  color: blue;
}
.json-formatter-row .json-formatter-boolean {
  color: red;
}
.json-formatter-row .json-formatter-null {
  color: #855A00;
}
.json-formatter-row .json-formatter-undefined {
  color: #ca0b69;
}
.json-formatter-row .json-formatter-function {
  color: #FF20ED;
}
.json-formatter-row .json-formatter-date {
  background-color: rgba(0, 0, 0, 0.05);
}
.json-formatter-row .json-formatter-url {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
.json-formatter-row .json-formatter-bracket {
  color: blue;
}
.json-formatter-row .json-formatter-key {
  color: #00008B;
  padding-right: 0.2rem;
}
.json-formatter-row .json-formatter-toggler-link {
  cursor: pointer;
}
.json-formatter-row .json-formatter-toggler {
  line-height: 1.2rem;
  font-size: 0.7rem;
  vertical-align: middle;
  opacity: 0.6;
  cursor: pointer;
  padding-right: 0.2rem;
}
.json-formatter-row .json-formatter-toggler:after {
  display: inline-block;
  transition: transform 100ms ease-in;
  content: "►";
}
.json-formatter-row > a > .json-formatter-preview-text {
  opacity: 0;
  transition: opacity 0.15s ease-in;
  font-style: italic;
}
.json-formatter-row:hover > a > .json-formatter-preview-text {
  opacity: 0.6;
}
.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {
  transform: rotate(90deg);
}
.json-formatter-row.json-formatter-open > .json-formatter-children:after {
  display: inline-block;
}
.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {
  display: none;
}
.json-formatter-row.json-formatter-open.json-formatter-empty:after {
  display: block;
}
.json-formatter-dark.json-formatter-row {
  font-family: monospace;
}
.json-formatter-dark.json-formatter-row,
.json-formatter-dark.json-formatter-row a,
.json-formatter-dark.json-formatter-row a:hover {
  color: white;
  text-decoration: none;
}
.json-formatter-dark.json-formatter-row .json-formatter-row {
  margin-left: 1rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty {
  opacity: 0.5;
  margin-left: 1rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty:after {
  display: none;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {
  content: "No properties";
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {
  content: "[]";
}
.json-formatter-dark.json-formatter-row .json-formatter-string,
.json-formatter-dark.json-formatter-row .json-formatter-stringifiable {
  color: #31F031;
  white-space: pre;
  word-wrap: break-word;
}
.json-formatter-dark.json-formatter-row .json-formatter-number {
  color: #66C2FF;
}
.json-formatter-dark.json-formatter-row .json-formatter-boolean {
  color: #EC4242;
}
.json-formatter-dark.json-formatter-row .json-formatter-null {
  color: #EEC97D;
}
.json-formatter-dark.json-formatter-row .json-formatter-undefined {
  color: #ef8fbe;
}
.json-formatter-dark.json-formatter-row .json-formatter-function {
  color: #FD48CB;
}
.json-formatter-dark.json-formatter-row .json-formatter-date {
  background-color: rgba(255, 255, 255, 0.05);
}
.json-formatter-dark.json-formatter-row .json-formatter-url {
  text-decoration: underline;
  color: #027BFF;
  cursor: pointer;
}
.json-formatter-dark.json-formatter-row .json-formatter-bracket {
  color: #9494FF;
}
.json-formatter-dark.json-formatter-row .json-formatter-key {
  color: #23A0DB;
  padding-right: 0.2rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler-link {
  cursor: pointer;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler {
  line-height: 1.2rem;
  font-size: 0.7rem;
  vertical-align: middle;
  opacity: 0.6;
  cursor: pointer;
  padding-right: 0.2rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler:after {
  display: inline-block;
  transition: transform 100ms ease-in;
  content: "►";
}
.json-formatter-dark.json-formatter-row > a > .json-formatter-preview-text {
  opacity: 0;
  transition: opacity 0.15s ease-in;
  font-style: italic;
}
.json-formatter-dark.json-formatter-row:hover > a > .json-formatter-preview-text {
  opacity: 0.6;
}
.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {
  transform: rotate(90deg);
}
.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-children:after {
  display: inline-block;
}
.json-formatter-dark.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {
  display: none;
}
.json-formatter-dark.json-formatter-row.json-formatter-open.json-formatter-empty:after {
  display: block;
}
`);var F=/(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/,E=/\d{2}:\d{2}:\d{2} GMT-\d{4}/,T=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,y=window.requestAnimationFrame||function(e){return e(),0},u={hoverPreviewEnabled:!1,hoverPreviewArrayCount:100,hoverPreviewFieldCount:5,animateOpen:!0,animateClose:!0,theme:null,useToJSON:!0,sortPropertiesBy:null},O=function(){function e(t,n,r,l){n===void 0&&(n=1),r===void 0&&(r=u),this.json=t,this.open=n,this.config=r,this.key=l,this._isOpen=null,this.config.hoverPreviewEnabled===void 0&&(this.config.hoverPreviewEnabled=u.hoverPreviewEnabled),this.config.hoverPreviewArrayCount===void 0&&(this.config.hoverPreviewArrayCount=u.hoverPreviewArrayCount),this.config.hoverPreviewFieldCount===void 0&&(this.config.hoverPreviewFieldCount=u.hoverPreviewFieldCount),this.config.useToJSON===void 0&&(this.config.useToJSON=u.useToJSON),this.key===""&&(this.key='""')}return Object.defineProperty(e.prototype,"isOpen",{get:function(){return this._isOpen!==null?this._isOpen:this.open>0},set:function(t){this._isOpen=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isDate",{get:function(){return this.json instanceof Date||this.type==="string"&&(F.test(this.json)||T.test(this.json)||E.test(this.json))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isUrl",{get:function(){return this.type==="string"&&this.json.indexOf("http")===0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isArray",{get:function(){return Array.isArray(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isObject",{get:function(){return _(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isEmptyObject",{get:function(){return!this.keys.length&&!this.isArray},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isEmpty",{get:function(){return this.isEmptyObject||this.keys&&!this.keys.length&&this.isArray},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"useToJSON",{get:function(){return this.config.useToJSON&&this.type==="stringifiable"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hasKey",{get:function(){return this.key!==void 0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"constructorName",{get:function(){return J(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"type",{get:function(){return this.config.useToJSON&&this.json&&this.json.toJSON?"stringifiable":C(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"keys",{get:function(){if(this.isObject){var t=Object.keys(this.json);return!this.isArray&&this.config.sortPropertiesBy?t.sort(this.config.sortPropertiesBy):t}return[]},enumerable:!0,configurable:!0}),e.prototype.toggleOpen=function(){this.isOpen=!this.isOpen,this.element&&(this.isOpen?this.appendChildren(this.config.animateOpen):this.removeChildren(this.config.animateClose),this.element.classList.toggle(f("open")))},e.prototype.openAtDepth=function(t){t===void 0&&(t=1),t<0||(this.open=t,this.isOpen=t!==0,this.element&&(this.removeChildren(!1),t===0?this.element.classList.remove(f("open")):(this.appendChildren(this.config.animateOpen),this.element.classList.add(f("open")))))},e.prototype.getInlinepreview=function(){var t=this;if(this.isArray)return this.json.length>this.config.hoverPreviewArrayCount?"Array["+this.json.length+"]":"["+this.json.map(k).join(", ")+"]";var n=this.keys,r=n.slice(0,this.config.hoverPreviewFieldCount).map(function(i){return i+":"+k(t.json[i])}),l=n.length>=this.config.hoverPreviewFieldCount?"…":"";return"{"+r.join(", ")+l+"}"},e.prototype.render=function(){this.element=a("div","row");var t=this.isObject?a("a","toggler-link"):a("span");if(this.isObject&&!this.useToJSON&&t.appendChild(a("span","toggler")),this.hasKey&&t.appendChild(a("span","key",this.key+":")),this.isObject&&!this.useToJSON){var n=a("span","value"),r=a("span"),l=a("span","constructor-name",this.constructorName);if(r.appendChild(l),this.isArray){var i=a("span");i.appendChild(a("span","bracket","[")),i.appendChild(a("span","number",this.json.length)),i.appendChild(a("span","bracket","]")),r.appendChild(i)}n.appendChild(r),t.appendChild(n)}else{(n=this.isUrl?a("a"):a("span")).classList.add(f(this.type)),this.isDate&&n.classList.add(f("date")),this.isUrl&&(n.classList.add(f("url")),n.setAttribute("href",this.json));var o=x(this.type,this.json,this.useToJSON?this.json.toJSON():this.json);n.appendChild(document.createTextNode(o)),t.appendChild(n)}if(this.isObject&&this.config.hoverPreviewEnabled){var s=a("span","preview-text");s.appendChild(document.createTextNode(this.getInlinepreview())),t.appendChild(s)}var d=a("div","children");return this.isObject&&d.classList.add(f("object")),this.isArray&&d.classList.add(f("array")),this.isEmpty&&d.classList.add(f("empty")),this.config&&this.config.theme&&this.element.classList.add(f(this.config.theme)),this.isOpen&&this.element.classList.add(f("open")),this.element.appendChild(t),this.element.appendChild(d),this.isObject&&this.isOpen&&this.appendChildren(),this.isObject&&!this.useToJSON&&t.addEventListener("click",this.toggleOpen.bind(this)),this.element},e.prototype.appendChildren=function(t){var n=this;t===void 0&&(t=!1);var r=this.element.querySelector("div."+f("children"));if(r&&!this.isEmpty)if(t){var l=0,i=function(){var o=n.keys[l],s=new e(n.json[o],n.open-1,n.config,o);r.appendChild(s.render()),(l+=1)<n.keys.length&&(l>10?i():y(i))};y(i)}else this.keys.forEach(function(o){var s=new e(n.json[o],n.open-1,n.config,o);r.appendChild(s.render())})},e.prototype.removeChildren=function(t){t===void 0&&(t=!1);var n=this.element.querySelector("div."+f("children"));if(t){var r=0,l=function(){n&&n.children.length&&(n.removeChild(n.children[0]),(r+=1)>10?l():y(l))};y(l)}else n&&(n.innerHTML="")},e}();const L=c("h1",{class:"title"}," Json格式化 JsonFormat ",-1),B={style:{display:"flex","flex-direction":"column","justify-content":"space-evenly",height:"100%"}},V={style:{"align-self":"center"}},D=c("div",{style:{height:"10px"}},null,-1),I={style:{"align-self":"center"}},M=c("div",{id:"divJsonOut"},null,-1),U=c("p",null,[g(" 源码参考: "),c("a",{href:"https://github.com/mohsen1/json-formatter-js",target:"_blank"},"json-formatter-js")],-1),H=N({__name:"JsonFormat",setup(e){const t=b(""),n=b(""),r=()=>{try{JSON.parse(t.value),n.value=JSON.stringify(JSON.parse(t.value),null,4);let i=JSON.parse(t.value),o=new O(i),s=document.getElementById("divJsonOut");s&&(s.innerHTML="",s.appendChild(o.render()))}catch{n.value="Json有误 Json has a mistake."}},l=()=>{try{JSON.parse(n.value),t.value=JSON.stringify(JSON.parse(n.value));let i=JSON.parse(t.value),o=new O(i),s=document.getElementById("divJsonOut");s&&(s.innerHTML="",s.appendChild(o.render()))}catch{t.value="Json有误 Json has a mistake."}};return(i,o)=>{const s=j("el-input"),d=j("el-col"),v=j("el-button"),w=j("el-row");return P(),S(A,null,[L,m(w,null,{default:p(()=>[m(d,{lg:9},{default:p(()=>[c("div",null,[m(s,{id:"textareaIn",modelValue:t.value,"onUpdate:modelValue":o[0]||(o[0]=h=>t.value=h),autosize:{minRows:15,maxRows:30},placeholder:"Please input text",type:"textarea"},null,8,["modelValue"])])]),_:1}),m(d,{lg:5,style:{margin:"0 auto",padding:"10px 0"}},{default:p(()=>[c("div",B,[c("div",V,[m(v,{type:"primary",onClick:o[1]||(o[1]=h=>r())},{default:p(()=>[g(" 格式化 >> ")]),_:1})]),D,c("div",I,[m(v,{type:"primary",onClick:o[2]||(o[2]=h=>l())},{default:p(()=>[g(" << 压缩 ")]),_:1})])])]),_:1}),m(d,{lg:9},{default:p(()=>[m(s,{id:"textareaOut",modelValue:n.value,"onUpdate:modelValue":o[3]||(o[3]=h=>n.value=h),autosize:{minRows:15,maxRows:15},placeholder:"Please input text",type:"textarea"},null,8,["modelValue"]),M]),_:1})]),_:1}),m(w,{style:{"justify-content":"center"}},{default:p(()=>[m(d,{span:"5",style:{"text-align":"center"}},{default:p(()=>[U]),_:1})]),_:1})],64)}}});export{H as default};
