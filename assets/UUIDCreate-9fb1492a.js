import{d as L,i as s,k as j,r as f,o as O,c as S,f as t,w as l,l as u,b as i,F as A}from"./index-c3fa7103.js";const B=i("h1",{class:"title"}," UUID生成 UUIDCreate ",-1),F={style:{display:"flex","justify-content":"center","white-space":"nowrap"}},H={id:"divCase"},M=i("strong",{style:{"font-size":"20px"}}," A ",-1),q=i("strong",{style:{"font-size":"20px"}}," Aa ",-1),E=i("strong",{style:{"font-size":"20px"}}," a ",-1),T=i("strong",{style:{"font-size":"20px"}}," 0-9 ",-1),$=i("strong",{style:{"font-size":"20px"}}," !@# ",-1),K=L({__name:"UUIDCreate",setup(G){const y=s(""),c=s(""),x=s(1),U=s(1),V=s(12),r=s(!1),d=s(!0),m=s(!1),b=s(!0),C=s(!0),I=["0","1","2","3","4","5","6","7","8","9"],D=["`","~","!","@","#","$","%","^","&","*","(",")","-","_","=","+","[","{","]","}","|",";",":",",","<",".",">","/","?"],w=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],z=w.map(n=>n.toUpperCase()),N=()=>{let n=[];for(let e=0;e<x.value;++e)n.push(h());y.value=n.join(`
`)},k=()=>{let n=[],e="",p="";r.value?e+=z.join(""):d.value?(e+=z.join(""),e+=w.join("")):m.value&&(e+=w.join("")),b.value&&(e+=I.join("")),C.value&&(e+=D.join(""));for(let o=0;o<U.value;++o){p="";for(let _=0;_<V.value;++_)p+=e[Math.floor(Math.random()*e.length)];n.push(p)}c.value=n.join(`
`)};j([r],()=>{r.value&&(d.value=!1,m.value=!1)}),j([d],()=>{d.value&&(r.value=!1,m.value=!1)}),j([m],()=>{m.value&&(r.value=!1,d.value=!1)});function h(){var n=URL.createObjectURL(new Blob),e=n.toString();return URL.revokeObjectURL(n),e.substring(e.lastIndexOf("/")+1)}return(n,e)=>{const p=f("el-input-number"),o=f("el-col"),_=f("el-button"),v=f("el-row"),R=f("el-input"),g=f("el-checkbox");return O(),S(A,null,[B,t(v,{style:{"justify-content":"space-between"}},{default:l(()=>[t(o,{lg:11,style:{}},{default:l(()=>[t(v,{style:{"text-align":"center"}},{default:l(()=>[t(o,{lg:12,style:{margin:"0 0 10px 0"}},{default:l(()=>[u(" 数量 Count : "),t(p,{modelValue:x.value,"onUpdate:modelValue":e[0]||(e[0]=a=>x.value=a),max:"999",min:"1",size:"large"},null,8,["modelValue"])]),_:1}),t(o,{lg:12},{default:l(()=>[t(_,{style:{},size:"large",type:"primary",onClick:N},{default:l(()=>[u(" UUID生成 UUIDCreate ")]),_:1})]),_:1})]),_:1}),t(v,{style:{"min-height":"50px"}},{default:l(()=>[t(o,{span:"24"})]),_:1}),t(v,{style:{"padding-top":"10px","justify-content":"center"}},{default:l(()=>[t(o,{lg:24,style:{"text-align":"center",margin:"0 0 10px 0"}},{default:l(()=>[t(R,{id:"textareaOutuuid",modelValue:y.value,"onUpdate:modelValue":e[1]||(e[1]=a=>y.value=a),autosize:{minRows:15,maxRows:30},readonly:"",size:"large",type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),t(o,{lg:11,style:{}},{default:l(()=>[t(v,{style:{"text-align":"center"}},{default:l(()=>[t(o,{lg:12,style:{margin:"0 0 10px 0"}},{default:l(()=>[u(" 数量 Count "),t(p,{modelValue:U.value,"onUpdate:modelValue":e[2]||(e[2]=a=>U.value=a),max:"999",min:"1",size:"large",style:{float:"right"}},null,8,["modelValue"])]),_:1}),t(o,{lg:12},{default:l(()=>[u(" 位数 Digit "),t(p,{modelValue:V.value,"onUpdate:modelValue":e[3]||(e[3]=a=>V.value=a),min:"1",size:"large",style:{float:"right"}},null,8,["modelValue"])]),_:1}),t(o,{lg:12,style:{"padding-top":"10px"}},{default:l(()=>[i("div",F,[i("div",H,[t(g,{id:"isCaseUpper",modelValue:r.value,"onUpdate:modelValue":e[4]||(e[4]=a=>r.value=a),border:"",class:"",title:"全大写"},{default:l(()=>[M]),_:1},8,["modelValue"]),t(g,{id:"isCaseInsensitive",modelValue:d.value,"onUpdate:modelValue":e[5]||(e[5]=a=>d.value=a),border:"",class:"center",title:"不区分大小写"},{default:l(()=>[q]),_:1},8,["modelValue"]),t(g,{id:"isCaseLower",modelValue:m.value,"onUpdate:modelValue":e[6]||(e[6]=a=>m.value=a),border:"",class:"",title:"全小写"},{default:l(()=>[E]),_:1},8,["modelValue"])]),u("   "),t(g,{id:"hasNumber",modelValue:b.value,"onUpdate:modelValue":e[7]||(e[7]=a=>b.value=a),border:"",class:"",title:"是否含有数字"},{default:l(()=>[T]),_:1},8,["modelValue"]),u("   "),t(g,{id:"has",modelValue:C.value,"onUpdate:modelValue":e[8]||(e[8]=a=>C.value=a),border:"",class:"",title:"是否含有特殊符号"},{default:l(()=>[$]),_:1},8,["modelValue"]),u("   ")])]),_:1}),t(o,{lg:12,style:{"padding-top":"10px"}},{default:l(()=>[t(_,{style:{},size:"large",type:"primary",onClick:k},{default:l(()=>[u(" 随机数生成 RandomNumberCreate ")]),_:1})]),_:1}),t(o,{lg:24,style:{"text-align":"center","padding-top":"10px"}},{default:l(()=>[t(R,{id:"textareaOut",modelValue:c.value,"onUpdate:modelValue":e[9]||(e[9]=a=>c.value=a),autosize:{minRows:15,maxRows:30},readonly:"",size:"large",type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})],64)}}});export{K as default};
