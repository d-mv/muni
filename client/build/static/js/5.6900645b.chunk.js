(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{120:function(e,t,a){"use strict";var n=a(0),l=a.n(n),o=a(121),c=a.n(o);t.a=function(e){var t=c.a.block;return e.border?t=c.a.border:e.rectangle&&(t=c.a.borderRectangle),l.a.createElement("div",{className:t},e.children)}},121:function(e,t,a){e.exports={block:"Block_block__25D3U",border:"Block_border__3jZ4R",borderRectangle:"Block_borderRectangle__bDkgw"}},153:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(7),c=a(1);function r(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=a(12),s=a(6),u=a.n(s),d=a(91),m=a(16),p=a(3),_=a(23),v=a(98),b=a(93),f=a(114),g=a(122),h=a(88),E=a(117),y=a.n(E),j=a(10),O=a(27),w=Object(o.b)(function(e){return{language:e.language,location:e.locationData,post:e.posts.filter(function(t){return t._id===e.post._id})[0],mode:e.mode,prevModule:e.prevModule,token:e.token}},{vote:p.n,updatePost:_.d,setModule:p.k,fetchData:p.b,getPosts:p.c,deletePost:_.a,showPost:_.b})(function(e){var t=e.location.categories,a=e.language,o=a.direction,s=a.text,p=a.short,_=Object(n.useState)(!1),E=Object(i.a)(_,2),w=E[0],N=E[1],k=Object(n.useState)(!1),x=Object(i.a)(k,2),T=x[0],R=x[1],L=Object(n.useState)(!1),S=Object(i.a)(L,2),D=S[0],C=S[1],M=Object(n.useState)(""),B=Object(i.a)(M,2),H=B[0],P=B[1],A=Object(n.useState)(!1),U=Object(i.a)(A,2),V=U[0],q=U[1],J=Object(n.useState)(e.post),K=Object(i.a)(J,2),W=K[0],X=K[1],z=Object(n.useState)(!1),F=Object(i.a)(z,2),I=F[0],Q=F[1],Z=Object(n.useState)(!1),Y=Object(i.a)(Z,2),G=Y[0],$=Y[1],ee=Object(n.useState)(!1),te=Object(i.a)(ee,2),ae=te[0],ne=te[1],le=W._id,oe=W.title,ce=W.photo,re=W.link,ie=W.problem,se=W.solution,ue=W.votes,de=W.createdBy,me=W.date,pe=W.reply,_e=w?y.a.text:y.a.textClosed,ve=1===ue.length?s["post.voter"]:s["post.voters"],be=Object(d.a)(t,p,e.post.category),fe={more:s["post.show-more"],less:s["post.show-less"]},ge=ue.includes(e.location._id),he=de===e.location._id,Ee="muni"===e.location.type,ye=[].concat(r(W.reply.up),r(W.reply.down)).includes(e.location._id),je=function(){Q(!I)},Oe=function(){ne(!ae)},we=function(){$(!G)},Ne=function(){H&&e.updatePost({_id:le,fields:{reply:{text:H,date:new Date}}}),q(!1)},ke=function(){C(!D);var t="/post/".concat(le,"/vote?user=").concat(e.location._id);u()({method:"patch",url:t}).then(function(t){X(Object(c.a)({},W,{votes:[].concat(r(W.votes),[e.location._id])})),e.getPosts(e.location.location)}).catch(function(e){return console.log(e)})},xe=s["post.age"],Te=l.a.createElement(g.g,{date:me,daysText:xe,direction:o,votes:ue.length,voterText:ve}),Re=D?l.a.createElement(g.d,{close:ke,text:s["vote.thanks"]}):null,Le=ge||he||Ee?null:l.a.createElement("div",{className:y.a.voteButton,onClick:function(){return ke()}},l.a.createElement(v.a,null));ue.includes(e.location._id)&&(Le=l.a.createElement(g.o,{text:s["post.voted"],direction:o}));var Se,De,Ce="",Me="";if(Se=Ee&&!pe?l.a.createElement(g.f,{action:function(){q(!V)}}):null,pe){var Be=function(e,t){var a=e.up.length,n=e.down.length,l="secondary";return a<n&&(l="attention"),a===n&&(l="white"),{replyCardStyle:function(e,t,a){var n=e+t[0].toUpperCase()+t.slice(1);return a&&(n=n+a[0].toUpperCase()+a.slice(1)),n}("card",l,t?"open":"closed"),replyCardColor:l}}(pe,T),He=Be.replyCardStyle,Pe=Be.replyCardColor;pe.text&&!ye?Me=l.a.createElement(g.k,{fill:Pe,onClick:function(t){console.log(t);var a=pe.up,n=pe.down;t?a.push(e.location._id):n.push(e.location._id);var l="/post/".concat(le,"/reply/vote?user=").concat(e.location._id,"&vote=").concat(t);u()({method:"get",url:l}).then(function(t){X(Object(c.a)({},W,{reply:Object(c.a)({},W.reply,{up:a,down:n})})),e.getPosts(e.location.location)}).catch(function(e){return console.log(e)})}}):ye&&(Me=l.a.createElement(g.o,{text:s["post.voted"],direction:o}));var Ae=l.a.createElement(g.j,{replies:{up:pe.up,down:pe.down}});Ce=pe.text?l.a.createElement("div",{className:y.a[He]},l.a.createElement("div",{className:y.a[Object(j.a)("replyTitleLine",o)]},Ae,l.a.createElement("span",{className:y.a.replyCardTitle},s["munireply.title"])),l.a.createElement("div",{className:y.a.replyMessage},pe.text),pe.text.length>50?l.a.createElement(g.l,{color:"white"===Pe?"primary":"white",title:fe,direction:o,opened:T,action:R}):null):null,Ee&&(Me=null)}var Ue=G?l.a.createElement(g.a,{text:s["post.delete.confirm"],close:we,action:function(t){"secondary"===t&&(e.deletePost(le),e.getPosts(e.location.location),e.setModule("home"))},direction:o}):null;De=V?l.a.createElement(f.a,{disabled:!0,close:Ne},l.a.createElement(g.e,{label:s["newreply.label"],value:H,placeholder:s["newreply.placeholder"],action:function(e){switch(e.target.name){case"replyText":P(e.target.value)}},direction:o,submit:Ne,submitText:s["login.button.submit"]})):null;var Ve=ae?l.a.createElement("div",null,l.a.createElement(g.a,{text:s["post.update.confirm"],close:Oe,action:function(t){if(console.log(t),"attention"===t)je(),X(e.post),Oe();else{var a="/post/".concat(le);u.a.patch(a,{post:JSON.stringify(W)}).then(function(t){je(),e.getPosts(e.location.location)}).catch(function(e){console.log(e)})}},direction:o})):null,qe=I?l.a.createElement("div",{className:y.a.deleteButton},l.a.createElement(O.a,{mode:"attention",action:we},s["post.delete.button"])):null,Je=he&&!Ee?{right:{icon:Object(m.i)("primary"),action:je,noRtl:!0}}:null;I&&(Je={right:{icon:Object(m.g)("primary"),action:Oe,noRtl:!0}});var Ke=Object(c.a)({name:e.location.name[e.language.short]},Je,{left:{icon:Object(m.f)("primary"),action:function(){e.setModule(e.prevModule)}}});return l.a.createElement(h.a,{header:!0},l.a.createElement(b.a,Ke),l.a.createElement("div",{className:y.a.wrapper},l.a.createElement("div",{"data-testid":"post__view",id:le,className:y.a.post},l.a.createElement(g.n,{category:be,title:oe,numbersLine:Te}),l.a.createElement(g.i,{src:ce,edit:I,actions:{set:function(e){X(Object(c.a)({},W,{photo:e}))},remove:function(){X(Object(c.a)({},W,{photo:""}))}}}),l.a.createElement(g.b,{primary:!0,text:re,direction:o,edit:I,actions:{set:function(e){X(Object(c.a)({},W,{link:e}))},remove:function(){X(Object(c.a)({},W,{link:""}))}},editText:{message:s["post.link.edit"],confirm:s.confirm,cancel:s.cancel,label:s["new.field.link.label"],placeholder:s["new.field.link.prompt"]}}),l.a.createElement("div",{className:_e},l.a.createElement(g.m,{step:!0,title:s["post.problem"],text:ie,direction:o}),l.a.createElement(g.m,{back:!0,title:s["post.solution"],text:se,direction:o})),l.a.createElement(g.l,{color:"primary",title:fe,direction:o,opened:w,action:N})),l.a.createElement("div",{className:y.a.voted},Le),Re,Se,De,Ce,pe.text?l.a.createElement("div",{className:y.a.replyVoted},Me):null,qe,Ue,Ve))}),N=a(120),k=Object(o.b)(function(e){return{language:e.language,location:e.locationData,prevModule:e.prevModule,post:e.locationData.municipality.filter(function(t){return t._id===e.post._id})[0]}},{setModule:p.k})(function(e){var t=e.post,a=e.language.direction,n={name:e.location.name[e.language.short],left:{icon:Object(m.f)("primary"),action:function(){e.setModule(e.prevModule)}}};return l.a.createElement(h.a,{header:!0},l.a.createElement(b.a,n),l.a.createElement("div",{className:y.a.wrapper},l.a.createElement("div",{"data-testid":"post__view",id:t._id,className:y.a.post},l.a.createElement(g.i,{src:t.photo}),l.a.createElement(N.a,null,l.a.createElement(g.b,{primary:!0,text:t.link,direction:a})),l.a.createElement(g.m,{muni:!0,text:t.text,direction:a}))))}),x=a(36);t.default=Object(o.b)(function(e){return{muni:"muni"===e.post.type}},{})(function(e){var t=e.muni?l.a.createElement(k,null):l.a.createElement(w,null);return l.a.createElement(x.a,null,t)})},93:function(e,t,a){"use strict";var n=a(12),l=a(10),o=a(27),c=a(16),r=a(0),i=a.n(r),s=a(94),u=a.n(s),d=function(e){return i.a.createElement("h1",{className:"rtl"===e.direction?u.a.titleR:u.a.title},e.title)},m=a(7),p=a(95),_=a.n(p),v=a(96),b=a.n(v),f=Object(m.b)(function(e){return{language:e.language}},{})(function(e){var t=e.language,a=t.direction,n=t.text,r=b.a[Object(l.a)("header",a)],s=b.a[Object(l.a)("headerDesc",a)],u=b.a[Object(l.a)("title",a)];return i.a.createElement("div",{className:b.a.content},i.a.createElement("section",{className:r},i.a.createElement(o.a,{mode:"minimal",action:e.cancel},Object(c.j)("white")),i.a.createElement("div",{className:u},n["help.mycity"]),i.a.createElement(o.a,{mode:"minimal"})),i.a.createElement("section",{className:s},i.a.createElement("div",null,n["help.button.help"])),i.a.createElement("section",{className:b.a.pinned},i.a.createElement("div",null,n["help.post.pinned"])),i.a.createElement("section",{className:b.a.card},i.a.createElement("div",{className:b.a.photo},n["help.post.photo"]),i.a.createElement("div",{className:b.a.category},n["help.post.category"]),i.a.createElement("div",{className:b.a.title},n["help.post.title"]),i.a.createElement("div",{className:b.a.lineThree},n["help.post.age"])),i.a.createElement("section",null,i.a.createElement("div",{className:b.a.voteButtonText},n["help.new"])),i.a.createElement("section",null,i.a.createElement("div",{className:b.a.navLeft},n["help.navigation"]),i.a.createElement("div",{className:b.a.navRight},n["help.navigation"])))}),g=Object(m.b)(function(e){return{module:e.module,language:e.language}},{})(function(e){var t=e.language.direction,a=Object(l.a)("help-content",t),n=i.a.createElement("div",{className:a});switch(e.module){case"post":break;case"home":n=i.a.createElement(f,{cancel:e.showHelp})}return i.a.createElement("div",{onClick:function(){return e.showHelp()},className:"help"},n)});t.a=Object(m.b)(function(e){return{language:e.language}},{})(function(e){var t=i.a.useState(!1),a=Object(n.a)(t,2),r=a[0],s=a[1],u=e.language.direction,m=e.name,p=function(e,t){var a=t?_.a.icon:_.a[Object(l.a)("icon",u)];return i.a.createElement("div",{className:a},e)},v=function(){s(!r)},b=e.left?p(e.left.icon,e.left.noRtl):p(Object(c.j)("primary"),!0),f=e.right?p(e.right.icon,e.right.noRtl):i.a.createElement("div",null);return i.a.createElement("header",{className:_.a[Object(l.a)("plank",u)]},i.a.createElement(o.a,{mode:"minimal",action:function(){e.left?e.left.action():v()}},b),i.a.createElement(d,{title:m,direction:u}),i.a.createElement(o.a,{mode:"minimal",action:function(){e.right&&e.right.action()}},f),r?i.a.createElement(g,{showHelp:v}):null)})},94:function(e,t,a){e.exports={title:"Title_title__3-ab1",titleR:"Title_titleR__1AdDW"}},95:function(e,t,a){e.exports={plank:"Header_plank__1Xkcj",plankRTL:"Header_plankRTL__22swp",icon:"Header_icon__1KqqL",iconRTL:"Header_iconRTL__2ufUE"}},96:function(e,t,a){e.exports={content:"style_content__2T40g",central:"style_central__ADLjj",header:"style_header__tQ9Sx",headerRTL:"style_headerRTL__2kFRT",icon:"style_icon__1YFTz",iconRTL:"style_iconRTL__3HH5-",title:"style_title__1WHmK",titleRTL:"style_titleRTL__vpycB",headerDesc:"style_headerDesc__3ANCb",headerDescRTL:"style_headerDescRTL__3knRN",pinned:"style_pinned__Kl-fS",card:"style_card__1D5C-",photo:"style_photo__2fnix",category:"style_category__24IMX",lineThree:"style_lineThree__NkwpN",voteButtonText:"style_voteButtonText__2_n0m",navLeft:"style_navLeft__bzWVA",navRight:"style_navRight__k7-Uq"}},98:function(e,t,a){"use strict";var n=a(0),l=a.n(n),o=a(7),c=a(99),r=a.n(c);t.a=Object(o.b)(function(e){return{language:e.language}},{})(function(e){var t=e.language.text;return l.a.createElement("button",{className:r.a.vote},l.a.createElement("div",{className:r.a.inner},l.a.createElement("span",null,t["card.button.vote"])))})},99:function(e,t,a){e.exports={vote:"VoteButton_vote__lXrZs",inner:"VoteButton_inner__2gQwD"}}}]);
//# sourceMappingURL=5.6900645b.chunk.js.map