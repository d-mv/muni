(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{115:function(e,t,a){"use strict";var n=a(0),o=a.n(n),c=a(116),l=a.n(c);t.a=function(e){var t=l.a.block;return e.border?t=l.a.border:e.rectangle&&(t=l.a.borderRectangle),o.a.createElement("div",{className:t},e.children)}},116:function(e,t,a){e.exports={block:"Block_block__25D3U",border:"Block_border__3jZ4R",borderRectangle:"Block_borderRectangle__bDkgw"}},147:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(7),l=a(1);function r(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=a(22),s=a(4),u=a.n(s),d=a(85),m=a(16),p=a(9),f=a(31),b=a(88),v=a(80),g=a(105),E=a(117),h=a(79),_=a(111),j=a.n(_),y=a(21),O=a(74),w=Object(c.b)(function(e){return{language:e.language,location:e.locationData,post:e.posts.filter(function(t){return t._id===e.post._id})[0],mode:e.mode,prevModule:e.prevModule,token:e.token}},{vote:p.m,updatePost:f.d,setModule:p.j,fetchData:p.b,getPosts:p.c,deletePost:f.a,showPost:f.b})(function(e){var t=e.location.categories,a=e.language,c=a.direction,s=a.text,p=a.short,f=Object(n.useState)(!1),_=Object(i.a)(f,2),w=_[0],k=_[1],x=Object(n.useState)(!1),N=Object(i.a)(x,2),R=N[0],M=N[1],T=Object(n.useState)(!1),S=Object(i.a)(T,2),C=S[0],P=S[1],B=Object(n.useState)(""),D=Object(i.a)(B,2),L=D[0],Z=D[1],A=Object(n.useState)(!1),H=Object(i.a)(A,2),U=H[0],V=H[1],q=Object(n.useState)(e.post),J=Object(i.a)(q,2),X=J[0],z=J[1],I=Object(n.useState)(!1),K=Object(i.a)(I,2),Q=K[0],W=K[1],F=Object(n.useState)(!1),G=Object(i.a)(F,2),Y=G[0],$=G[1],ee=X._id,te=X.title,ae=X.photo,ne=X.link,oe=X.problem,ce=X.solution,le=X.votes,re=X.createdBy,ie=X.date,se=X.reply,ue=w?j.a.text:j.a.textClosed,de=1===le.length?s["post.voter"]:s["post.voters"],me=Object(d.a)(t,p,e.post.category),pe={more:s["post.show-more"],less:s["post.show-less"]},fe=le.includes(e.location._id),be=re===e.location._id,ve="muni"===e.location.type,ge=[].concat(r(X.reply.up),r(X.reply.down)).includes(e.location._id),Ee=function(){$(!Y)},he=function(){L&&e.updatePost({_id:ee,fields:{reply:{text:L,date:new Date}}}),V(!1)},_e=function(){P(!C);var t="/post/".concat(ee,"/vote?user=").concat(e.location._id);u()({method:"patch",url:t}).then(function(t){z(Object(l.a)({},X,{votes:[].concat(r(X.votes),[e.location._id])})),e.getPosts(e.location.location)}).catch(function(e){return console.log(e)})},je=s["post.age"],ye=o.a.createElement(E.g,{date:ie,daysText:je,direction:c,votes:le.length,voterText:de}),Oe=C?o.a.createElement(E.d,{close:_e,text:s["vote.thanks"]}):null,we=fe||be||ve?null:o.a.createElement("div",{className:j.a.voteButton,onClick:function(){return _e()}},o.a.createElement(b.a,null));le.includes(e.location._id)&&(we=o.a.createElement(E.o,{text:s["post.voted"],direction:c}));var ke,xe,Ne="",Re="";if(ke=ve&&!se?o.a.createElement(E.f,{action:function(){V(!U)}}):null,xe=U?o.a.createElement(g.a,{disabled:!0,close:he},o.a.createElement(E.e,{label:s["newreply.label"],value:L,placeholder:s["newreply.placeholder"],action:function(e){switch(e.target.name){case"replyText":Z(e.target.value)}},direction:c,submit:he,submitText:s["login.button.submit"]})):null,se){var Me=function(e,t){var a=e.up.length,n=e.down.length,o="secondary";return a<n&&(o="attention"),a===n&&(o="white"),{replyCardStyle:function(e,t,a){var n=e+t[0].toUpperCase()+t.slice(1);return a&&(n=n+a[0].toUpperCase()+a.slice(1)),n}("card",o,t?"open":"closed"),replyCardColor:o}}(se,R),Te=Me.replyCardStyle,Se=Me.replyCardColor;se.text&&!ge?Re=o.a.createElement(E.k,{fill:Se,onClick:function(t){console.log(t);var a=se.up,n=se.down;t?a.push(e.location._id):n.push(e.location._id);var o="/post/".concat(ee,"/reply/vote?user=").concat(e.location._id,"&vote=").concat(t);u()({method:"get",url:o}).then(function(t){z(Object(l.a)({},X,{reply:Object(l.a)({},X.reply,{up:a,down:n})})),e.getPosts(e.location.location)}).catch(function(e){return console.log(e)})}}):ge&&(Re=o.a.createElement(E.o,{text:s["post.voted"],direction:c}));var Ce=o.a.createElement(E.j,{replies:{up:se.up,down:se.down}});Ne=se.text?o.a.createElement("div",{className:j.a[Te]},o.a.createElement("div",{className:j.a[Object(y.a)("replyTitleLine",c)]},Ce,o.a.createElement("span",{className:j.a.replyCardTitle},s["munireply.title"])),o.a.createElement("div",{className:j.a.replyMessage},se.text),se.text.length>50?o.a.createElement(E.l,{color:"white",title:pe,direction:c,opened:R,action:M}):null):null}var Pe=Y?o.a.createElement(E.a,{text:s["post.delete.confirm"],close:Ee,action:function(t){"secondary"===t&&(e.deletePost(ee),e.getPosts(e.location.location),e.setModule("home"))},direction:c}):null,Be=Q?o.a.createElement("div",{className:j.a.deleteButton},o.a.createElement(O.a,{mode:"attention",action:Ee},s["post.delete.button"])):null,De=be&&!ve?{right:{icon:Object(m.h)("primary"),action:function(){W(!Q)},noRtl:!0}}:null,Le=Object(l.a)({name:e.location.name[e.language.short]},De,{left:{icon:Object(m.f)("primary"),action:function(){e.setModule(e.prevModule)}}});return o.a.createElement(h.a,{header:!0},o.a.createElement(v.a,Le),o.a.createElement("div",{className:j.a.wrapper},o.a.createElement("div",{"data-testid":"post__view",id:ee,className:j.a.post},o.a.createElement(E.n,{category:me,title:te,numbersLine:ye}),o.a.createElement(E.i,{src:ae,edit:Q,actions:{set:function(e){z(Object(l.a)({},X,{photo:e}))},remove:function(){z(Object(l.a)({},X,{photo:""}))}}}),o.a.createElement(E.b,{primary:!0,text:ne,direction:c,edit:Q,actions:{set:function(e){z(Object(l.a)({},X,{link:e}))},remove:function(){z(Object(l.a)({},X,{link:""}))}},editText:{message:s["post.link.edit"],confirm:s.confirm,cancel:s.cancel,label:s["new.field.link.label"],placeholder:s["new.field.link.prompt"]}}),o.a.createElement("div",{className:ue},o.a.createElement(E.m,{step:!0,title:s["post.problem"],text:oe,direction:c}),o.a.createElement(E.m,{back:!0,title:s["post.solution"],text:ce,direction:c})),o.a.createElement(E.l,{color:"primary",title:pe,direction:c,opened:w,action:k})),o.a.createElement("div",{className:j.a.voted},we),Oe,ke,xe,Ne,se.text?o.a.createElement("div",{className:j.a.replyVoted},Re):null,Be,Pe))}),k=a(115),x=Object(c.b)(function(e){return{language:e.language,location:e.locationData,prevModule:e.prevModule,post:e.locationData.municipality.filter(function(t){return t._id===e.post._id})[0]}},{setModule:p.j})(function(e){var t=e.post,a=e.language.direction,n={name:e.location.name[e.language.short],left:{icon:Object(m.f)("primary"),action:function(){e.setModule(e.prevModule)}}};return o.a.createElement(h.a,{header:!0},o.a.createElement(v.a,n),o.a.createElement("div",{className:j.a.wrapper},o.a.createElement("div",{"data-testid":"post__view",id:t._id,className:j.a.post},o.a.createElement(E.i,{src:t.photo}),o.a.createElement(k.a,null,o.a.createElement(E.b,{primary:!0,text:t.link,direction:a})),o.a.createElement(E.m,{muni:!0,text:t.text,direction:a}))))}),N=a(32);t.default=Object(c.b)(function(e){return{muni:"muni"===e.post.type}},{})(function(e){var t=e.muni?o.a.createElement(x,null):o.a.createElement(w,null);return o.a.createElement(N.a,null,t)})},80:function(e,t,a){"use strict";var n=a(22),o=a(21),c=a(74),l=a(0),r=a.n(l),i=a(5),s=function(e){return r.a.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 300 300",fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"1.41421"},r.a.createElement("path",{d:"M150,0c82.787,0 150,67.213 150,150c0,82.787 -67.213,150 -150,150c-82.787,0 -150,-67.213 -150,-150c0,-82.787 67.213,-150 150,-150Zm0,16.42c73.725,0 133.58,59.855 133.58,133.58c0,73.725 -59.855,133.58 -133.58,133.58c-73.725,0 -133.58,-59.855 -133.58,-133.58c0,-73.725 59.855,-133.58 133.58,-133.58Z",fill:i.a[e.color]}),r.a.createElement("path",{d:"M111.256,103.147c-2.669,0.668 -5.172,0.167 -7.508,-1.501c-2.336,-1.669 -3.504,-3.905 -3.504,-6.708l0,-1.602c0,-3.337 1.068,-6.34 3.204,-9.01c2.135,-2.67 4.805,-4.271 8.009,-4.805c12.414,-2.403 24.894,-3.604 37.442,-3.604c16.151,0 28.665,3.17 37.542,9.51c8.877,6.341 13.315,14.717 13.315,25.129c0,4.805 -0.634,9.11 -1.902,12.914c-1.268,3.804 -3.27,7.242 -6.007,10.312c-2.736,3.07 -5.206,5.473 -7.408,7.208c-2.203,1.735 -5.239,3.938 -9.11,6.607c-3.605,2.536 -6.408,4.539 -8.41,6.007c-2.002,1.468 -4.171,3.537 -6.507,6.207c-2.336,2.67 -4.105,5.473 -5.306,8.41c-2.937,7.475 -7.409,11.212 -13.415,11.212l-4.005,0c-3.203,0 -5.873,-1.168 -8.009,-3.504c-2.136,-2.336 -2.87,-4.972 -2.202,-7.909c1.201,-4.805 3.37,-9.377 6.507,-13.715c3.137,-4.338 5.873,-7.442 8.209,-9.311c2.336,-1.868 5.907,-4.605 10.712,-8.209c4.138,-2.937 7.175,-5.239 9.111,-6.908c1.935,-1.668 3.804,-3.937 5.606,-6.807c1.802,-2.87 2.703,-5.907 2.703,-9.111c0,-10.278 -8.476,-15.417 -25.429,-15.417c-9.878,0 -21.09,1.535 -33.638,4.605Zm25.029,92.905l6.607,0c3.07,0 5.74,1.134 8.009,3.404c2.269,2.269 3.404,4.939 3.404,8.009l0,5.206c0,3.07 -1.135,5.739 -3.404,8.009c-2.269,2.269 -4.939,3.403 -8.009,3.403l-6.607,0c-3.071,0 -5.74,-1.134 -8.009,-3.403c-2.27,-2.27 -3.404,-4.939 -3.404,-8.009l0,-5.206c0,-3.07 1.134,-5.74 3.404,-8.009c2.269,-2.27 4.938,-3.404 8.009,-3.404Z",fill:i.a[e.color],fillRule:"nonzero"}))},u=a(81),d=a.n(u),m=function(e){return r.a.createElement("h1",{className:"rtl"===e.direction?d.a.titleR:d.a.title},e.title)},p=a(7),f=a(82),b=a.n(f);t.a=Object(p.b)(function(e){return{language:e.language}},{})(function(e){var t=r.a.useState(!1),a=Object(n.a)(t,2),l=a[0],i=a[1],u=e.language.direction,d=e.name,p=function(e,t){var a=t?b.a.icon:b.a[Object(o.a)("icon",u)];return r.a.createElement("div",{className:a},e)},f=e.left?p(e.left.icon,e.left.noRtl):p(r.a.createElement(s,{color:"primary"}),!0),v=e.right?p(e.right.icon,e.right.noRtl):r.a.createElement("div",null);return r.a.createElement("header",{className:b.a[Object(o.a)("plank",u)]},r.a.createElement(c.a,{mode:"minimal",action:function(){e.left?e.left.action():i(!l)}},f),r.a.createElement(m,{title:d,direction:u}),r.a.createElement(c.a,{mode:"minimal",action:function(){e.right&&e.right.action()}},v))})},81:function(e,t,a){e.exports={title:"Title_title__3E1da",titleR:"Title_titleR__2xWHP"}},82:function(e,t,a){e.exports={plank:"Header_plank__1Xkcj",plankRTL:"Header_plankRTL__22swp",icon:"Header_icon__1KqqL",iconRTL:"Header_iconRTL__2ufUE"}},88:function(e,t,a){"use strict";var n=a(0),o=a.n(n),c=a(7),l=a(89),r=a.n(l);t.a=Object(c.b)(function(e){return{language:e.language}},{})(function(e){var t=e.language.text;return o.a.createElement("button",{className:r.a.vote},o.a.createElement("div",{className:r.a.inner},o.a.createElement("span",null,t["card.button.vote"])))})},89:function(e,t,a){e.exports={vote:"VoteButton_vote__lXrZs",inner:"VoteButton_inner__2gQwD"}}}]);
//# sourceMappingURL=10.5fa7e2dc.chunk.js.map