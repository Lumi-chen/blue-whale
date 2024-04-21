import{_ as Q,r as W,a as y,o as k,b as p,e as w,g as r,h as s,F as M,j as Y,i as N,t as D,l as A,n as q,f as X,m as Z,q as V,v as I,p as ee,k as te}from"./index-BQVCukA3.js";import{d as E}from"./datetime-BKYupwzs.js";const ae=b=>(ee("data-v-08053238"),b=b(),te(),b),le=ae(()=>w("h3",{style:{"font-size":"20px"}},"📅 Imitate the Mac calendar component",-1)),ne={class:"mode-box calender"},oe={style:{height:"100%"}},re={class:"tasklist"},se={__name:"index",setup(b){const _=E(new Date,"set"),n=W({year:_.year,month:_.month}),v=W([0,0,0]),$=["周日","周一","周二","周三","周四","周五","周六"],f=W(),u=W({name:"",startDate:"",endDate:"",remark:"",id:""}),c=W([]);function z(e,t){return new Date(e,t,0).getDate()}function B(e,t,a=1){return new Date(e,t-1,a).getDay()}function F(){v.value[0]=z(n.value.year,n.value.month-1),v.value[1]=z(n.value.year,n.value.month),v.value[2]=z(n.value.year,n.value.month+1)}function C(e,t,a){return E(new Date(e,t-1,a),"set")}function L(){const e=B(n.value.year,n.value.month),t=B(n.value.year,n.value.month,v.value[1]),a=v.value[1]+e+(7-t),d=Math.floor(a/7);let o=[];c.value=[];for(let l=0;l<d;l++)o.push([]),c.value.push([]);for(let l=0;l<a-1;l++){const i=Math.floor(l/7);l<e?o[i][l%7]={...C(n.value.year,n.value.month,l-e+1),weekday:$[l%7],week:i,weekNum:l%7}:l>v.value[1]+e?o[i][l%7]={...C(n.value.year,n.value.month+1,l-v.value[1]),weekday:$[l%7],week:i,weekNum:l%7}:o[i][l%7]={...C(n.value.year,n.value.month,l-e+1),weekday:$[l%7],week:i,weekNum:l%7}}f.value=o,console.log(f)}function O(e,t){return e.day===t.day&&e.month===t.month?"today":""}function S(e){switch(e){case"last":n.value.month===1?(n.value.year--,n.value.month=12):n.value.month--;break;case"next":n.value.month===12?(n.value.year++,n.value.month=1):n.value.month++;break;case"today":n.value.year=_.year,n.value.month=_.month;break}F(),L()}function R(e){u.value.endDate=`${e.year}/${e.fullMonth}/${e.fullDay}`,u.value.startDate=`${e.year}/${e.fullMonth}/${e.fullDay}`,u.value.id="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){let a=Math.random()*16|0;return(t=="x"?a:a&3|8).toString(16)})}function G(){u.value.name===""&&(u.value.name="新建日程");const e=j(u.value.startDate),t=j(u.value.endDate);if(console.log(e.week===t.week),e.week===t.week)c.value[e.week].push({...u.value,startWeek:{...e},endWeek:{...t}});else for(let a=e.week;a<t.week+1;a++)c.value[a].push({...u.value,startWeek:{...e},endWeek:{...t}});u.value={name:"",startDate:"",endDate:"",remark:""},console.log(c.value),document.body.click()}function j(e){const t=Number(e.split("/")[0]),a=Number(e.split("/")[1]),d=Number(e.split("/")[2]),o=new Date(t,a-1,d);let l=o.getDay();if(l===0&&(l=7),t<n.value.year)return{week:0,weekday:0};if(t>n.value.year)return{week:f.value.length,weekdays:6};if(a===n.value.month)return console.log(Math.ceil((o.getDate()+6-l)/7)),{week:l===7?Math.ceil((o.getDate()+6-l)/7):Math.ceil((o.getDate()+6-l)/7)-1,weekday:l===7?0:l};if(a<n.value.month)return o.getTime()<=f.value[0][0].time?{week:0,weekday:0}:{week:0,weekday:l===7?0:l};if(a>n.value.month)return o.getTime()>f.value[f.value.length-1][6].time?{week:f.length-1,weekday:6}:{week:f.value.length-1,weekday:l===7?0:l}}function H(e,t){const a={};a.fontSize="12px",a.left=e.startWeek.weekday===0?0:`calc((100% / 7) * ${e.startWeek.weekday})`,console.log(c.value[t]);const d=c.value[t].filter(l=>l.startWeek.week!==t?l.endWeek.week===t?l.endWeek.weekday>=e.startWeek.weekday:!0:l.startWeek.weekday<=e.startWeek.weekday&&l.endWeek.weekday>=e.endWeek.weekday),o=d.findIndex(l=>l.id===e.id)+1;return o>2?(a.display="none",a):(console.log(o,"index",d,t),e.startDate===e.endDate?(a.width="calc((100% / 7) - 8px)",a.top=`${o*30}px`):e.startWeek.week===e.endWeek.week?(a.width=`calc(((100% / 7) * ${e.endWeek.weekday-e.startWeek.weekday+1} - 8px))`,a.top=`${o*30}px`,a.background="#e91e63",a.color="#fff"):e.startWeek.week<e.endWeek.week&&(t===e.endWeek.week?(a.width=`calc(((100% / 7 )* ${e.endWeek.weekday+1} - 8px))`,a.left=0):t===e.startWeek.week?a.width=`calc(((100% / 7 )* ${7-e.startWeek.weekday} - 8px))`:t>e.startWeek.week&&t<e.endWeek.week&&(a.width="calc((100% - 8px))",a.left=0),a.top=`${o*30}px`,a.backgroundColor="#e91e63",a.color="#fff"),console.log(a),a)}function P(e){return c.value[e.week].filter(a=>a.startWeek.week!==e.week?a.endWeek.week===e.week?a.endWeek.weekday>=e.weekNum:!0:a.startWeek.weekday<=e.weekNum&&a.endWeek.weekday>=e.weekNum).length}return F(),L(),(e,t)=>{const a=y("el-col"),d=y("el-button"),o=y("el-row"),l=y("el-input"),i=y("el-form-item"),U=y("el-date-picker"),J=y("el-form"),K=y("el-popover");return k(),p(M,null,[le,w("div",ne,[r(o,{type:"flex",justify:"space-between"},{default:s(()=>[r(a,{span:12,style:{"font-size":"20px","font-weight":"700"}},{default:s(()=>[N(D(n.value.year)+" 年 "+D(n.value.month)+" 月",1)]),_:1}),r(a,{span:12,style:{"text-align":"end"}},{default:s(()=>[r(d,{icon:"ArrowLeft",size:"small",onClick:t[0]||(t[0]=h=>S("last"))}),r(d,{size:"small",onClick:t[1]||(t[1]=h=>S("today"))},{default:s(()=>[N("今天")]),_:1}),r(d,{size:"small",icon:"ArrowRight",onClick:t[2]||(t[2]=h=>S("next"))})]),_:1})]),_:1}),r(o,{type:"flex"},{default:s(()=>[(k(),p(M,null,Y($,(h,g)=>w("div",{class:"weekday",key:g},D(h),1)),64))]),_:1}),(k(!0),p(M,null,Y(f.value,(h,g)=>(k(),A(o,{key:g,type:"flex",class:"week"},{default:s(()=>[r(o,{type:"flex"},{default:s(()=>[(k(!0),p(M,null,Y(h,(m,T)=>(k(),p("div",{key:T,class:q(["weekday day",T===0||T===6?"weekend":""])},[r(K,{trigger:"click",placement:"right",width:"300",teleported:!1,onShow:x=>R(m)},{reference:s(()=>[w("div",oe,[r(o,{type:"flex"},{default:s(()=>[r(a,{span:12,style:{"text-align":"start"}}),r(a,{span:12},{default:s(()=>[w("span",{class:q(O(m,X(_)))},D(m.day),3),N("日 ")]),_:2},1024)]),_:2},1024),P(m)>2?(k(),A(o,{key:0,class:"content"},{default:s(()=>[w("div",null,D(P(m)-2)+" more",1)]),_:2},1024)):Z("",!0)])]),default:s(()=>[r(J,{class:"form","label-suffix":":",size:"small"},{default:s(()=>[r(i,null,{default:s(()=>[r(l,{placeholder:"新建日程"})]),_:1}),r(i,{label:"开始时间"},{default:s(()=>[r(U,{modelValue:u.value.startDate,"onUpdate:modelValue":t[3]||(t[3]=x=>u.value.startDate=x),teleported:!1,type:"date",placeholder:"Pick a day",size:"small","value-format":"YYYY/MM/DD",format:"YYYY/MM/DD",onFocus:t[4]||(t[4]=V(()=>{},["stop"])),onBlur:t[5]||(t[5]=V(()=>{},["stop"]))},null,8,["modelValue"])]),_:1}),r(i,{label:"结束时间"},{default:s(()=>[r(U,{modelValue:u.value.endDate,"onUpdate:modelValue":t[6]||(t[6]=x=>u.value.endDate=x),teleported:!1,type:"date","value-format":"YYYY/MM/DD",format:"YYYY/MM/DD",placeholder:"Pick a day",size:"small",onFocus:t[7]||(t[7]=V(()=>{},["stop"])),onBlur:t[8]||(t[8]=V(()=>{},["stop"]))},null,8,["modelValue"])]),_:1}),r(i,null,{default:s(()=>[r(l,{modelValue:u.value.remark,"onUpdate:modelValue":t[9]||(t[9]=x=>u.value.remark=x),placeholder:"添加备注"},null,8,["modelValue"])]),_:1}),r(d,{type:"primary",onClick:G},{default:s(()=>[N("save")]),_:1})]),_:1})]),_:2},1032,["onShow"])],2))),128))]),_:2},1024),w("div",re,[(k(!0),p(M,null,Y(c.value[g],m=>(k(),p("div",{class:"task",style:I(H(m,g))},D(m.name),5))),256))])]),_:2},1024))),128))])],64)}}},ie=Q(se,[["__scopeId","data-v-08053238"]]);export{ie as default};
