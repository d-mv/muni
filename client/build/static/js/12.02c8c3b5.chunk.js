(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{128:function(e,t,a){"use strict";var n=a(8);function l(){var e=Object(n.a)(["\n  padding: ",";\n"]);return l=function(){return e},e}var i=a(9).a.div(l(),function(e){return e.padding?e.padding:0});t.a=i},166:function(e,t,a){"use strict";a.r(t);var n=a(34),l=a(51),i=a(26),o=a(0),r=a.n(o),c=a(11),s=a(41),u=a(5),g=a(50),m=a(39),d=a(40),p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(0===e.length||""===t)return[];if(e.filter(function(e){return Object.keys(e.name).includes(t)}).length!==e.length)return[];var a={},n=[];e.map(function(e){return a[e.name[t]]=e._id,n.push(e.name[t]),null});var l=[];return n.sort().map(function(e){return l.push({value:a[e],label:e}),null}),l},b=a(47),f=a(49),h=a(61),v=a(128);t.default=Object(c.b)(function(e){return{locations:e.locations,language:e.language,message:e.message,loading:e.loading,typed:e.typed}},{register:u.g,setModule:u.k,setMessage:u.j,setLoading:u.i,typingData:u.n})(function(e){var t=e.locations,a=e.language,c=e.message,u=e.loading,j=e.typed,y=e.setMessage,O=a.text,w=a.direction,E=a.short,N=j.location,M=j.fName,k=j.lName,D=j.pass,S=j.secondPass,x=j.email,L=Object(o.useState)(!0),B=Object(i.a)(L,2),J=B[0],P=B[1],_={label:O["register.prompt.city"],value:-1},q=p(t,E),A=Object(o.useState)([_].concat(Object(l.a)(q))),C=Object(i.a)(A,2),z=C[0],F=C[1];Object(o.useEffect)(function(){j.location&&""!==j.location&&z.length===q.length+1&&F(q)},[z,j]),Object(o.useEffect)(function(){M||k||N||x||D||S?M&&k&&N&&x&&D&&D.length>=7&&S&&D===S&&P(!1):P(!0)},[M,k,N,x,D,S]),Object(o.useEffect)(function(){S&&D&&D.length<7?y(O["register.passwords.min-7"]):D&&S&&D!==S&&y(O["register.passwords.dont-match"])},[D,S]);var G=function(t){c&&e.setMessage("");var a=t.target.value,l=t.target.name;l||(l="location"),j[l]!==a&&e.typingData(Object(n.a)({},l,a))},H=u?r.a.createElement("div",{className:"formLoading"},r.a.createElement(g.a,null)):r.a.createElement("div",{className:"formMessage"},c),I=Object(s.a)({label:O["login.label.email"],type:"email",name:"email",value:j[x],placeholder:O["login.prompt.email"],action:G,direction:w}),K=Object(s.a)({label:O["login.label.password"],type:"password",name:"pass",value:j[D],placeholder:O["login.prompt.password"],action:G,length:7,direction:w}),Q={regular:{},notMatching:{border:".1rem solid var(--colorAttention)"}},R=Object(s.b)({list:z,value:j.location,direction:w,label:O["login.label.location"],action:G,register:!0}),T=Object(s.a)({label:O["login.label.fname"],type:"text",name:"fName",value:j[M],placeholder:O["login.prompt.fname"],action:G,length:2,focus:!e.loading,direction:w}),U=Object(s.a)({label:O["login.label.lname"],type:"text",name:"lName",value:j[k],placeholder:O["login.prompt.lname"],action:G,length:3,direction:w});return r.a.createElement(v.a,{padding:"1rem"},r.a.createElement(h.a,{direction:w,onSubmit:function(t){t.preventDefault(),u||J||e.register({email:x,pass:D,location:N,fName:M,lName:k,settings:{language:e.language.short}})}},R,T,U,I,K,r.a.createElement("section",{className:"section"},r.a.createElement(d.a,{direction:w},O["login.label.password.repeat"]),r.a.createElement(f.a,{direction:w,type:"password",name:"secondPass",value:j[S],onChange:function(e){return G(e)},placeholder:O["login.prompt.password.repeat"],minLength:7,required:!0,style:D===S?Q.regular:Q.notMatching})),H,r.a.createElement(b.a,{direction:w,justify:"space-around"},r.a.createElement(m.a,{mode:"form",submit:!0,disabled:J||u,label:"Submit"},r.a.createElement("input",{type:"button",value:O["login.button.register"],id:"submit_button",className:J?"primaryButtonDisabled":"primaryButton"})))))})}}]);
//# sourceMappingURL=12.02c8c3b5.chunk.js.map