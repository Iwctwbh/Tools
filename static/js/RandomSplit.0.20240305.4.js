import{d as g,j as m,r,o as V,c as w,a as t,w as n,f as o,n as s,F as h}from"./index.0.20240305.4.js";const R=o("h1",{class:"title"}," 随机分割 RandomSplit ",-1),C={style:{display:"flex","justify-content":"space-between","margin-bottom":"8px"}},S={style:{position:"relative",display:"flex","justify-content":"center"}},j={style:{display:"flex","justify-content":"space-between","margin-bottom":"8px"}},z={style:{"padding-bottom":"10px",width:"100%",display:"flex","flex-direction":"column","align-items":"center"}},k=o("br",null,null,-1),E=o("br",null,null,-1),N={style:{display:"flex","justify-content":"space-between","margin-bottom":"8px"}},A=g({__name:"RandomSplit",setup(T){const c=m(7),y=m(7),u=m(""),_=m(""),v=()=>{let f=[];[...Array(c.value)].forEach(e=>{let a=u.value.split(`
`).map(i=>i.trim()),d=[];[...Array(y.value)].forEach(i=>{let p=Math.random()*a.length;d.push(...a.splice(p,1))}),f.push(d)}),_.value=JSON.stringify(f,null,4)},x=()=>{u.value=["旺旺仙贝","旺旺雪饼","ad钙奶","米多奇 椒盐味","小浣熊 紫色袋子的 意式红烩味","趣多多 曲奇风味巧克力 最爱","乐事薯片 青柠味 黄瓜味","小卫龙","洽洽瓜子 核桃味","素毛肚","好丽友派","波力海苔","旺旺小小酥 不是葱香味 原味","星球杯","小瓜子 椒盐味","阿华田风味蛋糕卷","贤哥小小脆","呀土豆 番茄味","喜之郎果冻","奥利奥威化小饼干","奥利奥香草慕斯卷","香蕉片","星星杯 巧克力味","好多鱼 番茄味","奥利奥浓郁巧克力味脆卷","张君雅小妹妹 日式 和风","闲趣小饼干","王子饼干","蛋酥卷","妙芙 奶油味欧式蛋糕 经常吃"].join(`
`)};return(f,e)=>{const a=r("el-button"),d=r("el-input"),i=r("el-col"),p=r("el-input-number"),b=r("el-row");return V(),w(h,null,[R,t(b,null,{default:n(()=>[t(i,{lg:9},{default:n(()=>[o("div",C,[t(a,{type:"primary",onClick:e[0]||(e[0]=l=>x())},{default:n(()=>[s(" 例子 Sample ")]),_:1})]),o("div",S,[t(d,{id:"textareaIn",modelValue:u.value,"onUpdate:modelValue":e[1]||(e[1]=l=>u.value=l),autosize:{minRows:15,maxRows:30},size:"large",type:"textarea",placeholder:"请输入需要随机分割的文本，按换行分割。 Please enter the text to be randomly split, separated by line breaks."},null,8,["modelValue"])])]),_:1}),t(i,{lg:5,class:"paddingTop40px",style:{margin:"0 auto"}},{default:n(()=>[o("div",j,[t(a,{type:"primary",style:{visibility:"hidden"}},{default:n(()=>[s(" 例子 Sample ")]),_:1})]),o("div",z,[s(" 随机次数 RandomTimes   "),t(p,{modelValue:c.value,"onUpdate:modelValue":e[2]||(e[2]=l=>c.value=l),min:"1",size:"large"},null,8,["modelValue"]),k,s(" 分割份数 DividedCount   "),t(p,{modelValue:y.value,"onUpdate:modelValue":e[3]||(e[3]=l=>y.value=l),min:"1",size:"large"},null,8,["modelValue"]),E,t(a,{style:{width:"100%"},type:"primary",onClick:e[4]||(e[4]=l=>v())},{default:n(()=>[s(" 分割 Split ")]),_:1})])]),_:1}),t(i,{lg:9,style:{display:"flex","align-items":"center","flex-direction":"column",position:"relative"}},{default:n(()=>[o("div",N,[t(a,{type:"primary",style:{visibility:"hidden"}},{default:n(()=>[s(" 例子 Sample ")]),_:1})]),t(d,{id:"textareaOut",modelValue:_.value,"onUpdate:modelValue":e[5]||(e[5]=l=>_.value=l),autosize:{minRows:15,maxRows:30},size:"large",type:"textarea",placeholder:"随机分割结果。 Random split result."},null,8,["modelValue"])]),_:1})]),_:1})],64)}}});export{A as default};