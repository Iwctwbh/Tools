import{d as D,i as p,q as w,r as i,o as k,c as N,f as t,w as l,l as c,u as f,H as $,I as A,F as z,b as G}from"./index.49e52f86.js";const R=G("h1",{class:"title"}," \u731C\u6570\u6E38\u620F NumberGuess ",-1),M=D({__name:"NumberGuess",setup(T){const n=p(4),o=p(`\u731C\u6570\u6E38\u620F\u3002Guess The Number.\r
\u8BBE\u5B9A\u4F4D\u6570\uFF0C\u70B9\u51FB\u5F00\u59CB\u3002Set the number, then click Start.\r
`),d=p(),v=p(!1);let m=0,a=w({validation:""}),V=w({validation:[{required:!0,message:"Please input the answer.",trigger:"blur"}]});const y=async u=>{!u||await u.validate(e=>{if(e){if(o.value+=`\u7B54\u6848\uFF1A${a.validation}\r
`,a.validation.length===n.value)if(a.validation===m.toString())o.value+=`\u56DE\u7B54\u6B63\u786E\u3002\r
`;else{let _=0;o.value+=`\u6B63\u786E\u4F4D\u6570:${m.toString().split("").filter(s=>s===a.validation.split("")[_++]).length}, \u6B63\u786E\u4E2A\u6570:${m.toString().split("").filter(s=>a.validation.split("").includes(s)).length}\r
`}else o.value+=`\u8BF7\u8F93\u5165${n.value}\u4F4D\u6570\u3002\r
`;B(d.value),b()}})},B=u=>{!u||u.resetFields()},S=()=>{v.value=!0,m=Math.floor(Math.random()*(10**(n.value+1-1)-10**(n.value-1)))+10**(n.value-1),o.value=`\u6E38\u620F\u5F00\u59CB\u3002Game Started.\r
`,b()},b=()=>{let u=document.getElementById("textareaOut");u&&(u.scrollTop=u.scrollHeight)},h=()=>{v.value=!1,B(d.value)};return(u,e)=>{const _=i("el-input-number"),s=i("el-button"),g=i("el-col"),F=i("el-row"),x=i("el-input"),C=i("el-form-item"),E=i("el-form");return k(),N(z,null,[R,t(F,{style:{"justify-content":"center"}},{default:l(()=>[t(g,{span:"5",style:{"text-align":"center"}},{default:l(()=>[c(" \u4F4D\u6570 Digit "),t(_,{modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=r=>n.value=r),min:"1",size:"large",onChange:h},null,8,["modelValue"]),c(" \xA0 "),t(s,{size:"large",type:"primary",onClick:S},{default:l(()=>[c(" \u5F00\u59CB Start ")]),_:1})]),_:1})]),_:1}),t(F,{style:{"padding-top":"10px","justify-content":"center"}},{default:l(()=>[t(g,{lg:8,style:{"text-align":"center"}},{default:l(()=>[t(x,{id:"textareaOut",modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=r=>o.value=r),autosize:{minRows:15,maxRows:30},readonly:"",size:"large",type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1}),t(F,{style:{"padding-top":"10px","justify-content":"center"}},{default:l(()=>[t(g,{lg:8,style:{"text-align":"center"}},{default:l(()=>[t(E,{ref_key:"ruleFormRef",ref:d,model:f(a),rules:f(V),"label-width":"0","status-icon":"",onSubmit:e[4]||(e[4]=$(()=>{},["prevent"])),onKeyup:e[5]||(e[5]=A(r=>y(d.value),["enter","native"]))},{default:l(()=>[t(C,{prop:"validation"},{default:l(()=>[t(x,{modelValue:f(a).validation,"onUpdate:modelValue":e[2]||(e[2]=r=>f(a).validation=r),placeholder:"\u8BF7\u8F93\u5165\u7B54\u6848\u3002Please enter the answer."},null,8,["modelValue"])]),_:1}),t(C,null,{default:l(()=>[t(s,{disabled:!v.value,style:{width:"100%"},type:"primary",onClick:e[3]||(e[3]=r=>y(d.value))},{default:l(()=>[c(" \u63D0\u4EA4 Submit ")]),_:1},8,["disabled"])]),_:1})]),_:1},8,["model","rules"])]),_:1})]),_:1})],64)}}});export{M as default};
