function $(t=new Date,g){const e=t.getFullYear(),n=t.getMonth()+1<10?`0${t.getMonth()+1}`:t.getMonth()+1,o=t.getMonth()+1,s=t.getDate()<10?`0${t.getDate()}`:t.getDate(),r=t.getDate(),y=t.getHours()<10?`0${t.getHours()}`:t.getHours(),u=t.getMinutes()<10?`0${t.getMinutes()}`:t.getMinutes(),c=t.getSeconds()<10?`0${t.getSeconds()}`:t.getSeconds();switch(g){case"yyyy-MM-dd hh:mm:ss":return`${e}-${n}-${s} ${y}:${u}:${c}`;case"yyyy-MM-dd":return`${e}-${n}-${s}`;case"yyyy-M-d":return`${e}-${o}-${r}`;case"yyyy":return e;case"hh:mm:ss":return`${y}:${u}:${c}`;case"set":return{year:e,month:o,fullMonth:n,fullDay:s,day:r,time:t.getTime()};default:return t.getTime()}}export{$ as d};
