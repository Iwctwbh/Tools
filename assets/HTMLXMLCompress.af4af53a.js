import{d as S,j as d,k as h,l as v,s as w,v as R,r as E,o as I,e as L,w as u,f as p,c as C,m as T,F as k,b}from"./index.9d615820.js";function N(s){var a="    ";if(isNaN(parseInt(s)))a=s;else switch(s){case 1:a=" ";break;case 2:a="  ";break;case 3:a="   ";break;case 4:a="    ";break;case 5:a="     ";break;case 6:a="      ";break;case 7:a="       ";break;case 8:a="        ";break;case 9:a="         ";break;case 10:a="          ";break;case 11:a="           ";break;case 12:a="            ";break}for(var e=[`
`],o=0;o<100;o++)e.push(e[o]+a);return e}function g(){this.step="    ",this.shift=N(this.step)}g.prototype.xml=function(s,a){var e=s.replace(/>\s{0,}</g,"><").replace(/</g,"~::~<").replace(/\s*xmlns\:/g,"~::~xmlns:").replace(/\s*xmlns\=/g,"~::~xmlns=").split("~::~"),o=e.length,t=!1,n=0,l="",r=0,i=a?N(a):this.shift;for(r=0;r<o;r++)e[r].search(/<!/)>-1?(l+=i[n]+e[r],t=!0,(e[r].search(/-->/)>-1||e[r].search(/\]>/)>-1||e[r].search(/!DOCTYPE/)>-1)&&(t=!1)):e[r].search(/-->/)>-1||e[r].search(/\]>/)>-1?(l+=e[r],t=!1):/^<\w/.exec(e[r-1])&&/^<\/\w/.exec(e[r])&&/^<[\w:\-\.\,]+/.exec(e[r-1])==/^<\/[\w:\-\.\,]+/.exec(e[r])[0].replace("/","")?(l+=e[r],t||n--):e[r].search(/<\w/)>-1&&e[r].search(/<\//)==-1&&e[r].search(/\/>/)==-1?l=t?l+=e[r]:l+=i[n++]+e[r]:e[r].search(/<\w/)>-1&&e[r].search(/<\//)>-1?l=t?l+=e[r]:l+=i[n]+e[r]:e[r].search(/<\//)>-1?l=t?l+=e[r]:l+=i[--n]+e[r]:e[r].search(/\/>/)>-1?l=t?l+=e[r]:l+=i[n]+e[r]:e[r].search(/<\?/)>-1||e[r].search(/xmlns\:/)>-1||e[r].search(/xmlns\=/)>-1?l+=i[n]+e[r]:l+=e[r];return l[0]==`
`?l.slice(1):l};g.prototype.json=function(s,e){var e=e||this.step;return typeof JSON>"u"?s:typeof s=="string"?JSON.stringify(JSON.parse(s),null,e):typeof s=="object"?JSON.stringify(s,null,e):s};g.prototype.css=function(s,a){var e=s.replace(/\s{1,}/g," ").replace(/\{/g,"{~::~").replace(/\}/g,"~::~}~::~").replace(/\;/g,";~::~").replace(/\/\*/g,"~::~/*").replace(/\*\//g,"*/~::~").replace(/~::~\s{0,}~::~/g,"~::~").split("~::~"),o=e.length,t=0,n="",l=0,r=a?N(a):this.shift;for(l=0;l<o;l++)/\{/.exec(e[l])?n+=r[t++]+e[l]:/\}/.exec(e[l])?n+=r[--t]+e[l]:(/\*\\/.exec(e[l]),n+=r[t]+e[l]);return n.replace(/^\n{1,}/,"")};function A(s,a){return a-(s.replace(/\(/g,"").length-s.replace(/\)/g,"").length)}function V(s,a){return s.replace(/\s{1,}/g," ").replace(/ AND /ig,"~::~"+a+a+"AND ").replace(/ BETWEEN /ig,"~::~"+a+"BETWEEN ").replace(/ CASE /ig,"~::~"+a+"CASE ").replace(/ ELSE /ig,"~::~"+a+"ELSE ").replace(/ END /ig,"~::~"+a+"END ").replace(/ FROM /ig,"~::~FROM ").replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ").replace(/ HAVING /ig,"~::~HAVING ").replace(/ IN /ig," IN ").replace(/ JOIN /ig,"~::~JOIN ").replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ").replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ").replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ").replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ").replace(/ ON /ig,"~::~"+a+"ON ").replace(/ OR /ig,"~::~"+a+a+"OR ").replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ").replace(/ OVER /ig,"~::~"+a+"OVER ").replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ").replace(/\)\s{0,}SELECT /ig,")~::~SELECT ").replace(/ THEN /ig," THEN~::~"+a).replace(/ UNION /ig,"~::~UNION~::~").replace(/ USING /ig,"~::~USING ").replace(/ WHEN /ig,"~::~"+a+"WHEN ").replace(/ WHERE /ig,"~::~WHERE ").replace(/ WITH /ig,"~::~WITH ").replace(/ ALL /ig," ALL ").replace(/ AS /ig," AS ").replace(/ ASC /ig," ASC ").replace(/ DESC /ig," DESC ").replace(/ DISTINCT /ig," DISTINCT ").replace(/ EXISTS /ig," EXISTS ").replace(/ NOT /ig," NOT ").replace(/ NULL /ig," NULL ").replace(/ LIKE /ig," LIKE ").replace(/\s{0,}SELECT /ig,"SELECT ").replace(/\s{0,}UPDATE /ig,"UPDATE ").replace(/ SET /ig," SET ").replace(/~::~{1,}/g,"~::~").split("~::~")}g.prototype.sql=function(s,a){var e=s.replace(/\s{1,}/g," ").replace(/\'/ig,"~::~'").split("~::~"),o=e.length,t=[],n=0,l=this.step,r=0,i="",c=0,f=a?N(a):this.shift;for(c=0;c<o;c++)c%2?t=t.concat(e[c]):t=t.concat(V(e[c],l));for(o=t.length,c=0;c<o;c++)r=A(t[c],r),/\s{0,}\s{0,}SELECT\s{0,}/.exec(t[c])&&(t[c]=t[c].replace(/\,/g,`,
`+l+l)),/\s{0,}\s{0,}SET\s{0,}/.exec(t[c])&&(t[c]=t[c].replace(/\,/g,`,
`+l+l)),/\s{0,}\(\s{0,}SELECT\s{0,}/.exec(t[c])?(n++,i+=f[n]+t[c]):/\'/.exec(t[c])?(r<1&&n&&n--,i+=t[c]):(i+=f[n]+t[c],r<1&&n&&n--);return i=i.replace(/^\n{1,}/,"").replace(/\n{1,}/g,`
`),i};g.prototype.xmlmin=function(s,a){var e=a?s:s.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"").replace(/[ \r\n\t]{1,}xmlns/g," xmlns");return e.replace(/>\s{0,}</g,"><")};g.prototype.jsonmin=function(s){return typeof JSON>"u"?s:JSON.stringify(JSON.parse(s),null,0)};g.prototype.cssmin=function(s,a){var e=a?s:s.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"");return e.replace(/\s{1,}/g," ").replace(/\{\s{1,}/g,"{").replace(/\}\s{1,}/g,"}").replace(/\;\s{1,}/g,";").replace(/\/\*\s{1,}/g,"/*").replace(/\*\/\s{1,}/g,"*/")};g.prototype.sqlmin=function(s){return s.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")")};var D=new g;const y=S({__name:"textarea-row-number",props:{textareaId:{default:Math.random().toString(36).substring(2)},textRowNumberId:{default:Math.random().toString(36).substring(2)},textarea:{}},setup(s,{expose:a}){const e=s,o=d("");let t=null,n=null;const l=h(()=>e.textareaId),r=h(()=>e.textRowNumberId),i=d("");return v(i,()=>{let c=i.value.split(`
`).length;o.value=[...Array(c)].map((f,m)=>m+1).join(`
`)}),w(()=>{R(()=>{n=document.getElementById(l.value),t=document.getElementById(r.value),n.addEventListener("scroll",()=>t.scrollTop=n.scrollTop),t.addEventListener("scroll",()=>n.scrollTop=t.scrollTop)})}),a({textValue:i}),(c,f)=>{const m=E("el-input"),_=E("el-col"),O=E("el-row");return I(),L(O,{style:{"padding-top":"20px"}},{default:u(()=>[p(_,{span:2,style:{"max-width":"50px"}},{default:u(()=>[p(m,{id:r.value,type:"textarea",modelValue:o.value,"onUpdate:modelValue":f[0]||(f[0]=x=>o.value=x),readonly:"",resize:"none",autosize:{minRows:15,maxRows:15},style:{width:"100%"},class:"blackshopClass"},null,8,["id","modelValue"])]),_:1}),p(_,{span:22},{default:u(()=>[p(m,{id:l.value,type:"textarea",modelValue:i.value,"onUpdate:modelValue":f[1]||(f[1]=x=>i.value=x),resize:"none",autosize:{minRows:15,maxRows:15},style:{width:"100%"},class:"right_textarea"},null,8,["id","modelValue"])]),_:1})]),_:1})}}});const B=b("h1",{class:"title"}," HTML \u538B\u7F29/\u89E3\u538B ",-1),H=S({__name:"HTMLXMLCompress",setup(s){const a=d(),e=d(),o=()=>{a.value.textValue=D.xml(e.value.textValue)},t=()=>{let n=a.value.textValue;if(n.length==0){e.value.textValue="\u5F85\u538B\u7F29\u7684HTML\u4E0D\u80FD\u4E3A\u7A7A\uFF01";return}e.value.textValue=n.replace(new RegExp(/\n+/g),"").replace(new RegExp(/\/\*.*?\*\//ig),"").replace(new RegExp(/>\s{2,}/ig),">").replace(new RegExp(/\s{2,}</ig),"<")};return(n,l)=>{const r=E("el-button"),i=E("el-col"),c=E("el-row");return I(),C(k,null,[B,p(c,{style:{"justify-content":"center"}},{default:u(()=>[p(i,{lg:2},{default:u(()=>[p(r,{style:{},size:"large",type:"primary",onClick:t},{default:u(()=>[T(" \u538B\u7F29 ")]),_:1})]),_:1}),p(i,{lg:2},{default:u(()=>[p(r,{style:{},size:"large",type:"primary",onClick:o},{default:u(()=>[T(" \u89E3\u538B ")]),_:1})]),_:1})]),_:1}),p(c,{style:{"justify-content":"center"}},{default:u(()=>[p(i,{lg:12},{default:u(()=>[p(y,{ref_key:"areaText",ref:a,style:{overflow:"hidden"}},null,512)]),_:1}),p(i,{lg:12},{default:u(()=>[p(y,{"textarea-id":"textareaOut",ref_key:"areaText2",ref:e},null,512)]),_:1})]),_:1})],64)}}});export{H as default};
