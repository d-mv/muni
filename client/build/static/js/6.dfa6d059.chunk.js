(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{113:function(e,t,a){"use strict";var n=a(0),l=a.n(n),o=a(118),i=a.n(o);t.a=function(e){return l.a.createElement("h2",{className:"rtl"===e.direction?i.a.titleR:i.a.title},e.title)}},118:function(e,t,a){e.exports={title:"SubTitle_title__2Xfou",titleR:"SubTitle_titleR__3z-AB"}},139:function(e,t,a){e.exports={container:"PhotoUpload_container__1-JOj",image:"PhotoUpload_image__2Zabf",imageDef:"PhotoUpload_imageDef__2JDPm",input:"PhotoUpload_input__1piRJ"}},140:function(e,t,a){e.exports={step:"Step_step__2Ob0-",filled:"Step_filled__1vPZN"}},141:function(e,t,a){e.exports={"line-template":"Steps_line-template__1pr6S",line:"Steps_line__3O_Uu",lineRTL:"Steps_lineRTL__3yzCh"}},142:function(e,t,a){e.exports={message:"Message_message__wCUkq",messageRTL:"Message_messageRTL__pxl-h",messageForm:"Message_messageForm__3meN4",messageFormRTL:"Message_messageFormRTL__17eOj",attention:"Message_attention__384Il",cancel:"Message_cancel__3bI_Z",primary:"Message_primary__eLBOT",secondary:"Message_secondary__8AWKh"}},143:function(e,t,a){e.exports={center:"Center_center__SOzh3",centerBlock:"Center_centerBlock__2xXiY"}},152:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(12),i=a(7),c=a(6),r=a.n(c),s=a(28),u=a(114),m=a(109),p=a(117),d=a.n(p),b=function(e){var t=e.post,a=t.title,n=(t.category,t.problem),o=t.solution,i=t.photo,c=t.link;l.a.createElement("span",null);return l.a.createElement("div",{className:d.a.wrapper},l.a.createElement("div",{"data-testid":"post__preview",className:d.a.post},l.a.createElement(u.l,{muni:!0,title:a}),i?l.a.createElement(u.h,{src:i,edit:!1}):null,l.a.createElement(u.b,{primary:!0,text:c,direction:e.direction,edit:!1}),l.a.createElement("div",{className:d.a.text},l.a.createElement(m.a,{step:!0,title:e.text.problem,text:n,direction:e.direction}),e.muni?l.a.createElement(m.a,{back:!0,title:e.text.solution,text:o||"",direction:e.direction}):null)))},f=a(17),g=a(23),_=a(3),E=a(27),v=a(38),h=a(122),w=a(21),k=a.n(w),O=a(139),j=a.n(O),S=function(e){var t=l.a.useState(e.photo?e.photo:null),a=Object(o.a)(t,2),n=a[0],i=a[1],c=n?l.a.createElement("img",{src:n,alt:"upload-image",className:j.a.image}):l.a.createElement("img",{src:"https://res.cloudinary.com/diciu4xpu/image/upload/v1560088174/dev/photo.svg",alt:"upload-image",className:j.a.imageDef});return l.a.createElement("div",{className:j.a.container},c,l.a.createElement("input",{id:"file",type:"file",name:"file",className:j.a.input,onChange:function(t){return a=t,void Object(h.b)(a.target.files[0],function(t){var a=Object(h.a)(t);i(a),e.action(t)});var a}}),l.a.createElement("label",{htmlFor:"file",className:k.a.primarySmall},e.label))},y=a(140),x=a.n(y),M=function(e){var t=e.current<e.step+1?x.a.step:x.a.filled;return l.a.createElement("div",{"data-testid":"step-icon",className:t,onClick:function(){return e.action(e.step)}},e.step)},N=a(141),T=a.n(N),R=a(10),P=function(e){var t=T.a[Object(R.a)("line",e.direction)],a=e.muni?[1,2,3]:[1,2,3,4,5];return l.a.createElement("section",{className:t},a.map(function(t){return l.a.createElement(M,{key:t,step:t,current:e.current,action:e.action})}))},F=a(142),z=a.n(F),C=function(e){var t=z.a,a=e.use?e.use[0].toUpperCase()+e.use.slice(1):"",n=t[Object(R.a)("message".concat(a),e.direction)],o=t[e.mode];return l.a.createElement("div",{className:n},l.a.createElement("span",{className:o},e.children))},L=a(86),U=function(e){return l.a.createElement(L.a,{paddedFlat:!0},e.stepOne,e.stepTwo,e.stepThree,e.stepFour,e.stepFive,e.preview,l.a.createElement(C,{direction:e.direction,mode:"attention",use:"form"},e.message),e.loadingElement)},Z=a(39),A=a(143),D=a.n(A),B=function(e){var t=D.a["center".concat(e.block?"Block":"")];return l.a.createElement("div",{className:t},e.children)},J=a(29),I=a(102),X=a(101),q=a(113),K=a(37),W=a(103),Y=function(e){return l.a.createElement(W.a,{direction:e.direction},l.a.createElement("p",{className:"textStandard"},function(e,t){var a="";return t.map(function(t){t._id===e&&(a=t.description)}),a}(e.category,e.categories)))},G=a(93),H=Object(i.b)(function(e){return{language:e.language,location:e.locationData,token:e.token,submitResult:e.submitPost,step:e.step,prevModule:e.prevModule}},{setStep:f.c,submitPost:g.c,setModule:_.l})(function(e){var t=e.language,a=t.direction,n=t.text,i=e.location,c=i.categories,u=i._id,m=i.location,p=l.a.useState(e.step),d=Object(o.a)(p,2),f=d[0],g=d[1],_=l.a.useState(!1),h=Object(o.a)(_,2),w=h[0],k=h[1],O=l.a.useState(!1),j=Object(o.a)(O,2),y=j[0],x=j[1],M=l.a.useState(""),N=Object(o.a)(M,2),T=N[0],R=N[1],F=l.a.useState(c[0]._id),z=Object(o.a)(F,2),C=z[0],A=z[1],D=l.a.useState(""),W=Object(o.a)(D,2),H=W[0],Q=W[1],V=l.a.useState(""),$=Object(o.a)(V,2),ee=$[0],te=$[1],ae=l.a.useState(""),ne=Object(o.a)(ae,2),le=ne[0],oe=ne[1],ie=l.a.useState(""),ce=Object(o.a)(ie,2),re=ce[0],se=ce[1],ue=l.a.useState(""),me=Object(o.a)(ue,2),pe=me[0],de=me[1];l.a.useEffect(function(){6===f&&!1===w&&k(!0)},[f]);var be=function(e){switch(de(""),e.target.name){case"title":R(e.target.value);break;case"problem":Q(e.target.value);break;case"solution":te(e.target.value);break;case"link":se(e.target.value)}},fe=n["new.steps.title"],ge=l.a.createElement(P,{current:f,direction:a,action:function(e){w&&g(e)}}),_e=l.a.createElement(E.a,{mode:"primary",action:function(){if(f+1<=6){var e=!0,t=n["new.message.fieldEmpty"];switch(f){case 1:e=""!==T;break;case 2:e=""!==C;break;case 3:e=""!==H;break;case 4:e=""!==ee;break;case 5:re&&((e=new RegExp("^([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?").test(re))||(t=n["new.message.urlMalformed"]))}e?(de(""),g(f+1)):de(t)}}},n["new.steps.button.next"]);6===f&&(ge=l.a.createElement(K.c,null),fe=n["new.preview"],_e=l.a.createElement(E.a,{mode:"primary",action:function(){var t={user:u,location:m,token:e.token,post:{title:T,category:C,problem:H,solution:ee,photo:le,link:re}};r.a.post("/post/create",t).then(function(t){x(!1),de(t.data.message),t.status&&e.setModule("home")}).catch(function(e){e.response?e.response.data:e.toString()}),x(!0),e.setStep(6),e.submitPost(t)}},n["new.steps.button.submit"]));var Ee=1===f?Object(s.a)({label:n["new.field.title.label"],type:"text",name:"title",value:T,placeholder:n["new.field.title.prompt"],action:be,length:2,focus:!0}):null,ve=2===f?l.a.createElement("div",{className:"none"},Object(s.b)({list:function(){var t=[];return c.map(function(a){var n=Object.keys(a).includes(e.language.short)?e.language.short:"\u05e2\u05d1";t.push({value:a._id,label:a[n]})}),t}(),direction:a,label:n["new.field.category.label"],action:function(e){A(e.target.value)},focus:!0}),l.a.createElement(Y,{direction:a,category:C,categories:c})):null,he=3===f?Object(s.a)({label:n["new.field.problem.label"],type:"textarea",name:"problem",value:H,placeholder:n["new.field.problem.prompt"],action:be,length:50,focus:!0}):null,we=4===f?Object(s.a)({label:n["new.field.solution.label"],type:"textarea",name:"solution",value:ee,placeholder:n["new.field.solution.prompt"],action:be,length:50,focus:!0}):null,ke=5===f?l.a.createElement(I.a,null,l.a.createElement(J.a,{direction:a,value:n["new.field.photo.label"]}),l.a.createElement(S,{label:n["new.field.photo.prompt"],direction:a,action:function(e){oe(e)},photo:le}),Object(s.a)({label:n["new.field.link.label"],type:"url",name:"link",value:re,placeholder:n["new.field.link.prompt"],action:be,length:5})):null,Oe=Object(G.a)(c,e.language.short,C),je={title:T,category:Oe,problem:H,solution:ee,photo:le,link:re},Se=6===f?l.a.createElement(b,{post:je,direction:a,text:{problem:n["post.problem"],solution:n["post.solution"]}}):null,ye=y?l.a.createElement(v.a,null):null;l.a.createElement("div",null,"back");return console.log(pe),l.a.createElement(L.a,{padded:!0},l.a.createElement(B,null,l.a.createElement(q.a,{title:fe,direction:a}),ge),l.a.createElement(X.a,{direction:a},n["new.steps.step.".concat(f)]),l.a.createElement(U,{stepOne:Ee,stepTwo:ve,stepThree:he,stepFour:we,stepFive:ke,preview:Se,loadingElement:ye,direction:a,message:pe}),l.a.createElement(Z.a,{row:!0,direction:a},_e,l.a.createElement(E.a,{mode:"secondary",disabled:1===f,action:function(){f-1>0&&g(f-1)}},n["new.steps.button.back"])))}),Q=Object(i.b)(function(e){return{language:e.language,location:e.locationData,token:e.token,submitResult:e.submitPost,step:e.step,prevModule:e.prevModule}},{setStep:f.c,submitPost:g.c,setModule:_.l})(function(e){var t=e.language,a=t.direction,n=t.text,i=e.location,c=(i._id,i.location),u=l.a.useState(e.step),m=Object(o.a)(u,2),p=m[0],d=m[1],f=l.a.useState(!1),g=Object(o.a)(f,2),_=g[0],h=g[1],w=l.a.useState(!1),k=Object(o.a)(w,2),O=k[0],j=k[1],y=l.a.useState(""),x=Object(o.a)(y,2),M=x[0],N=x[1],T=l.a.useState(""),R=Object(o.a)(T,2),F=R[0],z=R[1],C=l.a.useState(""),A=Object(o.a)(C,2),D=A[0],W=A[1],Y=l.a.useState(""),G=Object(o.a)(Y,2),H=G[0],Q=G[1],V=l.a.useState(""),$=Object(o.a)(V,2),ee=$[0],te=$[1];l.a.useEffect(function(){6===p&&!1===_&&h(!0)},[p]);var ae=function(e){switch(te(""),e.target.name){case"title":N(e.target.value);break;case"problem":z(e.target.value);break;case"link":Q(e.target.value)}},ne=n["new.steps.title"],le=l.a.createElement(P,{muni:!0,current:p,direction:a,action:function(e){_&&d(e)}}),oe=l.a.createElement(E.a,{mode:"primary",action:function(){if(p+1<=4){var e=!0,t=n["new.message.fieldEmpty"];switch(p){case 1:e=""!==M;break;case 2:e=""!==F;break;case 3:H&&((e=new RegExp("^([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?").test(H))||(t=n["new.message.urlMalformed"]))}e?(te(""),d(p+1)):te(t)}}},n["new.steps.button.next"]);4===p&&(le=l.a.createElement(K.c,null),ne=n["new.preview"],oe=l.a.createElement(E.a,{mode:"primary",action:function(){var t={location:c,token:e.token,post:{title:M,problem:F,photo:D,link:H}};r.a.post("/muni/create",t).then(function(t){j(!1),te(t.data.message),t.status&&e.setModule("municipality")}).catch(function(e){console.log(e)})}},n["new.steps.button.submit"]));var ie=1===p?Object(s.a)({label:n["new.field.title.label"],type:"text",name:"title",value:M,placeholder:n["new.field.title.prompt"],action:ae,length:2,focus:!0}):null,ce=2===p?Object(s.a)({label:n["new.field.problem.label"],type:"textarea",name:"problem",value:F,placeholder:n["new.field.problem.prompt"],action:ae,length:50,focus:!0}):null,re=3===p?l.a.createElement(I.a,null,l.a.createElement(J.a,{direction:a,value:n["new.field.photo.label"]}),l.a.createElement(S,{label:n["new.field.photo.prompt"],direction:a,action:function(e){W(e)},photo:D}),Object(s.a)({label:n["new.field.link.label"],type:"url",name:"link",value:H,placeholder:n["new.field.link.prompt"],action:ae,length:5})):null,se={title:M,problem:F,photo:D,link:H},ue=4===p?l.a.createElement(b,{muni:!0,post:se,direction:a,text:{problem:n["post.problem"],solution:n["post.solution"]}}):null,me=O?l.a.createElement(v.a,null):null;l.a.createElement("div",null,"back");return console.log(ee),l.a.createElement(L.a,{padded:!0},l.a.createElement(B,null,l.a.createElement(q.a,{title:ne,direction:a}),le),l.a.createElement(X.a,{direction:a},n["new.steps.step.".concat(p)]),l.a.createElement(U,{stepOne:ie,stepTwo:ce,stepThree:re,preview:ue,loadingElement:me,direction:a,message:ee}),l.a.createElement(Z.a,{row:!0,direction:a},oe,l.a.createElement(E.a,{mode:"secondary",disabled:1===p,action:function(){p-1>0&&d(p-1)}},n["new.steps.button.back"])))}),V=a(36);t.default=function(e){return l.a.createElement(V.a,{opposite:!0},e.muni?l.a.createElement(Q,null):l.a.createElement(H,null))}}}]);
//# sourceMappingURL=6.dfa6d059.chunk.js.map