(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{115:function(e,t,n){"use strict";var a=n(32),o=n(109),c=n(26),l=n(0),r=n.n(l),i=n(9),u=n(10),s=n(3),d=n(17);function p(){var e=Object(i.a)(["\ncolor: ","\nfont: ","\n"]);return p=function(){return e},e}var m=u.a.h1(p(),function(e){return e.muni?s.j:s.f},d.a),f=n(12),h=n(118),b=n.n(h),v=n(7),g=n(119),y=n.n(g),E=Object(f.b)(function(e){return{language:e.language,type:e.type}},{})(function(e){var t=e.language,n=t.direction,l=t.text,i=y.a[Object(a.a)("header",n)],u=y.a[Object(a.a)("headerDesc",n)],s=y.a[Object(a.a)("title",n)];return r.a.createElement("div",{className:y.a.content},r.a.createElement("section",{className:i},r.a.createElement(o.a,{mode:"minimal",action:e.cancel},Object(c.j)("white")),r.a.createElement("div",{className:s},l["help.mycity"]),r.a.createElement(o.a,{mode:"minimal"})),r.a.createElement("section",{className:u},r.a.createElement("div",null,l["help.button.help"])),r.a.createElement("section",{className:y.a.pinned},r.a.createElement("div",null,l["help.post.pinned"])),r.a.createElement("section",{className:y.a.card},r.a.createElement("div",{className:y.a.photo},l["help.post.photo"]),r.a.createElement("div",{className:y.a.category},l["help.post.category"]),r.a.createElement("div",{className:y.a.title},l["help.post.title"]),r.a.createElement("div",{className:y.a.lineThree},l["help.post.age"])),r.a.createElement("section",null,r.a.createElement("div",{className:y.a.voteButtonText},l["muni"===e.type?"help.new.muni":"help.new"])),r.a.createElement("section",null,r.a.createElement("div",{className:y.a.navLeft},l["help.navigation"]),r.a.createElement("div",{className:y.a.navRight},l["help.navigation"])))}),j=Object(f.b)(function(e){return{module:e.module,language:e.language,help:e.help}},{showHelp:v.showHelp})(function(e){var t=e.language.direction,n=Object(a.a)("help-content",t),o=function(){e.showHelp(!e.help)},c=r.a.createElement("div",{className:n});switch(e.module){case"post":break;case"home":c=r.a.createElement(E,{cancel:o})}return r.a.createElement("div",{onClick:function(){return o()},className:"help"},c)});t.a=Object(f.b)(function(e){return{language:e.language,user:e.auth.user,help:e.help,module:e.module}},{showHelp:v.showHelp})(function(e){var t=e.language.direction,n=e.name,i=e.user,u=e.module,s=function(e,n){var o=n?b.a.icon:b.a[Object(a.a)("icon",t)];return r.a.createElement("div",{className:o},e)};Object(l.useEffect)(function(){i.settings.help&&e.showHelp(!0)},[]);var d=e.left?s(e.left.icon,e.left.noRtl):"home"===u?s(Object(c.j)("muni"===e.user.type?"secondary":"primary"),!0):r.a.createElement("div",null),p=e.right?s(e.right.icon,e.right.noRtl):r.a.createElement("div",null);return r.a.createElement("header",{className:b.a[Object(a.a)("plank",t)]},r.a.createElement(o.a,{mode:"minimal",action:function(){e.left?e.left.action():"home"===u&&e.showHelp(!e.help)}},d),r.a.createElement(m,{muni:"muni"===e.user.type},n),r.a.createElement(o.a,{mode:"minimal",action:function(){e.right&&e.right.action()}},p),e.help?r.a.createElement(j,null):null)})},118:function(e,t,n){e.exports={plank:"Header_plank__1Xkcj",plankRTL:"Header_plankRTL__22swp",icon:"Header_icon__1KqqL",iconRTL:"Header_iconRTL__2ufUE"}},119:function(e,t,n){e.exports={content:"style_content__2T40g",central:"style_central__ADLjj",header:"style_header__tQ9Sx",headerRTL:"style_headerRTL__2kFRT",icon:"style_icon__1YFTz",iconRTL:"style_iconRTL__3HH5-",title:"style_title__1WHmK",titleRTL:"style_titleRTL__vpycB",headerDesc:"style_headerDesc__3ANCb",headerDescRTL:"style_headerDescRTL__3knRN",pinned:"style_pinned__Kl-fS",card:"style_card__1D5C-",photo:"style_photo__2fnix",category:"style_category__24IMX",lineThree:"style_lineThree__NkwpN",voteButtonText:"style_voteButtonText__2_n0m",navLeft:"style_navLeft__bzWVA",navRight:"style_navRight__k7-Uq"}},121:function(e,t,n){"use strict";var a=n(9),o=n(10),c=n(13);function l(){var e=Object(a.a)(["\n  margin: 1.5rem auto;\n  width: 90%;\n  border-radius: ",";\n  box-shadow: ",";\n"]);return l=function(){return e},e}var r=o.a.article(l(),c.j,c.g);t.a=r},129:function(e,t,n){"use strict";var a=n(9);function o(){var e=Object(a.a)(["\n  padding: ",";\n"]);return o=function(){return e},e}var c=n(10).a.div(o(),function(e){return e.padding?e.padding:0});t.a=c},142:function(e,t,n){"use strict";var a=n(0),o=n.n(a),c=n(143),l=n.n(c);t.a=function(e){var t=l.a.block;return e.border?t=l.a.border:e.rectangle&&(t=l.a.borderRectangle),o.a.createElement("div",{className:t},e.children)}},143:function(e,t,n){e.exports={block:"Block_block__25D3U",border:"Block_border__3jZ4R",borderRectangle:"Block_borderRectangle__bDkgw"}},145:function(e,t,n){"use strict";var a=n(0),o=n.n(a),c=n(9),l=n(10),r=n(3),i=n(13),u=n(17);function s(){var e=Object(c.a)(["\n  width: 100%;\n  text-align: center;\n  user-select: none;\n  font: ",";\n  color: ",";\n"]);return s=function(){return e},e}function d(){var e=Object(c.a)(["\n  box-shadow: ",";\n  width: 6.5rem;\n  height: 6.5rem;\n  border-radius: 50%;\n  background-color: ",";\n  border: "," !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return d=function(){return e},e}var p=l.a.button(d(),Object(i.f)(r.g),r.f,i.d),m=l.a.div(s(),u.f,r.n);t.a=function(e){return o.a.createElement(p,null,o.a.createElement(m,null,e.title))}},181:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(6),l=n(52),r=n(27),i=n(12),u=n(126),s=n(26),d=n(7),p=n(18),m=n(145),f=n(115),h=n(127),b=n(130),v=n(125),g=n(140),y=n(129),E=n(139),j=n.n(E),_=n(32),O=n(109),w=n(11),x=n(5),k=n(9),N=n(10),R=n(120);function T(){var e=Object(k.a)(["\n  height: 2.5rem;\n  width: 1.5rem;\n  padding: .5rem 1rem .5rem .8rem;\n  transform: rotate(270deg);\n"]);return T=function(){return e},e}var P=Object(N.a)(R.a)(T()),S=n(112),C=n(3),L=n(17);function M(){var e=Object(k.a)(["\nwhite-space: nowrap;\npadding: 0.5rem 2rem;\ntext-align: center;\nmargin: 0 auto;\nbackground-color: white;\ncolor: ","\nfont: ","\n"]);return M=function(){return e},e}var H=N.a.div(M(),C.f,L.j),D=n(48),B=n(114),U=n(117),A=n(51),q=n(121);function F(){var e=Object(k.a)(["\n  background-color: ",";\n  width:90%;\n  margin: 0 auto;\n"]);return F=function(){return e},e}var K=Object(N.a)(q.a)(F(),function(e){return e.color?e.color:"white"}),z=n(147),J=Object(i.b)(function(e){return{language:e.language,locations:e.locations,posts:e.posts,post:e.post,mode:e.mode,prevModule:e.prevModule,token:e.token,auth:e.auth,categories:e.categories}},{vote:d.vote,updatePost:p.j,setModule:d.setModule,fetchData:d.fetchData,getPosts:p.e,deletePost:p.c,showPost:p.h,votePost:p.k})(function(e){var t=e.categories,n=e.auth,i=e.locations,d=e.post,p=n.user,E=e.language,k=E.direction,N=E.text,T=E.short,L=Object(a.useState)(!1),M=Object(r.a)(L,2),q=M[0],F=M[1],J=Object(a.useState)(!1),V=Object(r.a)(J,2),W=V[0],X=(V[1],Object(a.useState)(!1)),I=Object(r.a)(X,2),Q=I[0],Y=I[1],Z=Object(a.useState)(!1),G=Object(r.a)(Z,2),$=G[0],ee=G[1],te=(o.a.createRef(),e.posts.filter(function(t){return t._id===e.post._id})[0]),ne=Object(a.useState)(!1),ae=Object(r.a)(ne,2),oe=ae[0],ce=ae[1],le=Object(a.useState)(!1),re=Object(r.a)(le,2),ie=re[0],ue=re[1],se=Object(a.useState)(!1),de=Object(r.a)(se,2),pe=de[0],me=de[1],fe=Object(a.useState)(!1),he=Object(r.a)(fe,2),be=he[0],ve=he[1],ge=Object(a.useState)(!1),ye=Object(r.a)(ge,2),Ee=ye[0],je=ye[1],_e=Object(a.useState)(!1),Oe=Object(r.a)(_e,2),we=Oe[0],xe=Oe[1],ke=i.filter(function(e){return e._id===p.location})[0],Ne=q?j.a.text:j.a.textClosed,Re=1===d.votes.length?N["post.voter"]:N["post.voters"],Te=Object(u.a)(t,T,d.category),Pe={more:N["post.show-more"],less:N["post.show-less"]},Se=d.votes.includes(e.auth.user._id),Ce=d.createdBy===e.auth.user._id,Le="muni"===n.user.type;Object(a.useEffect)(function(){console.log("posts changed"),e.showPost(e.posts.filter(function(t){return t._id===e.post._id})[0])},[e.posts]);var Me=!1;d.reply.up||d.reply.down?d.reply.up.length>0&&d.reply.down.length>0?Me=[].concat(Object(l.a)(d.reply.up),Object(l.a)(d.reply.down)).includes(e.auth.user._id):d.reply.up.length>0?Me=d.reply.up.includes(e.auth.user._id):d.reply.down.length>0&&(Me=d.reply.down.includes(e.auth.user._id)):Me=!0;var He,De=function(){ee(!$)},Be=function(){me(!pe)},Ue=function(){ue(!ie)},Ae=function(){ve(!be)},qe=function(){je(!Ee)},Fe=function(){xe(!we)},Ke=function(t){e.showPost({reply:{text:t.target.value}})},ze=function(t){Object(x.a)({text:"submitUpdatePost:",emph:t||"",type:"positive"}),xe(!1),ve(!1),ee(!1),t?(ce(!1),me(!1),"attention"===t?e.showPost(te):e.updatePost(d)):e.updatePost(d)},Je=function(t){console.log("object"),Object(x.a)({text:"handleReplyVoting:",emph:t.toString(),type:"positive"});var n=d.reply.up,a=d.reply.down;t?n.push(e.auth.user._id):a.push(e.auth.user._id);var o=Object(c.a)({},d.reply,{reply:Object(c.a)({},d.reply,{up:n,down:a})});e.updatePost(Object(c.a)({},d,{reply:o}))},Ve=N["post.age"],We=Q?o.a.createElement(b.d,{close:function(){Y(!Q)},text:N["vote.thanks"]}):null,Xe=d.votes.includes(e.auth.user._id),Ie=function(){return Xe?o.a.createElement(H,null,N["post.voted"]):Se||Ce||Le?void 0:o.a.createElement("div",{className:j.a.voteButton,onClick:function(){return Y(!0),setTimeout(function(){Y(!1)},2e3),e.showPost(Object(c.a)({},d,{votes:[d.votes,p._id]})),void e.votePost(d._id)}},o.a.createElement(m.a,{title:N["card.button.vote"]}))},Qe="",Ye="",Ze=Le&&!d.reply.text?o.a.createElement(b.f,{action:De,text:N["post.muni.newreply"]}):null;if(d.reply){var Ge=function(e,t){var n=e.up?e.up.length:0,a=e.down?e.down.length:0,o="secondary";return n<a&&(o="attention"),n===a&&(o="white"),{replyCardStyle:function(e,t,n){var a=e+t[0].toUpperCase()+t.slice(1);return n&&(a=a+n[0].toUpperCase()+n.slice(1)),a}("card",o,t?"open":"closed"),replyCardColor:o}}(d.reply,W);Ge.replyCardStyle,Ge.replyCardColor,d.reply.text&&!Me?Ye=o.a.createElement("div",{className:j.a[Object(_.a)("thumbsContainer",k)]},o.a.createElement("div",{onClick:function(e){return Je(!0)}},Object(s.f)("white")),o.a.createElement("div",{onClick:function(e){return Je(!1)}},Object(s.f)("white"))):Me&&(Ye="");var $e=null,et=null,tt=null;Le&&($e=be?o.a.createElement("div",{className:j.a[Object(_.a)("replyEditButtons",k)]},o.a.createElement(O.a,{mode:"secondary",title:N["muni-reply.edit"],action:Fe}),o.a.createElement(O.a,{mode:"attention",title:N["muni-reply.delete"],actionMessage:qe})):null,et=Ee?o.a.createElement(b.c,{close:qe,action:function(t){if(Object(x.a)({text:"submitDeletePost:",emph:t,type:"positive"}),"primary"===t){var n=Object(c.a)({},d,{reply:{}});e.showPost(n),e.updatePost(n)}ve(!1)},text:N["muni-reply.delete.text"]}):null,tt=we?o.a.createElement(b.c,{close:Fe,action:ze,text:N["muni-reply.edit.text"]},o.a.createElement("div",{className:"section"},o.a.createElement(A.a,{direction:k,autoFocus:!0,type:"text",name:"reply",value:d.reply.text,onChange:function(e){return Ke(e)},placeholder:N["muni.post.prompt.text"],required:!0}))):null),Qe=d.reply.text?o.a.createElement(K,null,o.a.createElement(D.a,{padding:"1rem 1rem 0 1rem",direction:k,justify:"space-between"},o.a.createElement(U.a,{direction:k},N["munireply.title"]),o.a.createElement(b.i,{replies:{up:d.reply.up,down:d.reply.down},direction:k})),o.a.createElement(B.a,{direction:k},o.a.createElement(z.a,{direction:k},d.reply.text),Xe?null:o.a.createElement(H,null,N["post.voted"])),$e,et,tt,o.a.createElement(S.a,{space:5})):null,Le&&(Ye=null)}var nt=ie?o.a.createElement(b.a,{text:N["post.delete.confirm"],close:Ue,action:function(t){Object(x.a)({text:"submitDeletePost:",emph:t,type:"positive"}),"secondary"===t&&(e.deletePost(d._id),e.setModule(e.prevModule))},direction:k}):null;He=$?o.a.createElement(h.a,{disabled:!0,close:De},o.a.createElement(b.e,{label:N["newreply.label"],value:d.reply.text,placeholder:N["newreply.placeholder"],action:Ke,direction:k,submit:ze,submitText:N["login.button.submit"]})):null;var at=pe?o.a.createElement("div",null,o.a.createElement(b.a,{text:N["post.update.confirm"],close:Be,action:ze,direction:k})):null,ot=oe?o.a.createElement("div",{className:j.a.deleteButton},o.a.createElement(O.a,{mode:"attention",action:Ue},N["post.delete.button"])):null,ct=Ce||Le?{right:{icon:Object(s.i)(Le?"secondary":"primary"),action:Le?Ae:function(){ce(!oe)},noRtl:!0}}:null;(oe||be)&&(ct={right:{icon:Object(s.g)(be?"secondary":"primary"),action:be?Ae:Be,noRtl:!0}});var lt=Object(c.a)({name:ke.name[p.settings.language]},ct,{left:{icon:Object(s.f)(Le?"secondary":"primary"),action:function(){e.showPost(Object(c.a)({show:!1},w.c)),e.setModule(e.prevModule)}}});return o.a.createElement(y.a,null,o.a.createElement(f.a,lt),o.a.createElement(S.a,{space:7}),o.a.createElement(g.a,null,o.a.createElement(B.a,{direction:k,padding:"0 1rem"},o.a.createElement(D.a,{direction:k,justify:"space-between"},o.a.createElement(R.a,null,Te),d.reply.text?o.a.createElement(P,{back:C.l},Object(s.f)("white")):null),o.a.createElement(U.a,{direction:k,padding:"0 1rem;"},d.title),o.a.createElement(b.g,{date:d.createdAt,daysText:Ve,direction:k,votes:d.votes.length,voterText:Re})),o.a.createElement(b.h,{src:d.photo,edit:oe,actions:{set:function(t){e.showPost({photo:t})},remove:function(){e.showPost({photo:""})}}}),o.a.createElement(b.b,{primary:!0,text:d.link,direction:k,edit:oe,actions:{set:function(t){e.showPost({link:t})},remove:function(){e.showPost({link:""})}},editText:{message:N["post.link.edit"],confirm:N.confirm,cancel:N.cancel,label:N["new.field.link.label"],placeholder:N["new.field.link.prompt"]}}),o.a.createElement("div",{className:Ne},o.a.createElement(v.a,{step:!0,title:N["post.problem"],text:d.problem,direction:k}),d.solution?o.a.createElement(v.a,{back:!0,title:N["post.solution"],text:d.solution,direction:k}):null),o.a.createElement(D.a,{direction:k,justify:"space-between"},Xe?Ie():null,o.a.createElement(b.j,{color:"primary",title:Pe,direction:k,opened:q,action:F}))),Xe?null:Ie(),o.a.createElement(S.a,{space:3}),We,Ze,He,Qe,d.reply.text?Ye:null,ot,nt,at)}),V=n(14),W=n.n(V),X=n(142),I=Object(i.b)(function(e){return{auth:e.auth,language:e.language,locations:e.locations,prevModule:e.prevModule,post:e.news.filter(function(t){return t._id===e.post._id})[0]}},{setModule:d.setModule,getNews:p.d})(function(e){var t=e.language,n=t.direction,l=t.text,i=e.auth.user,u=e.locations.filter(function(e){return e._id===i.location})[0],d=Object(a.useState)(e.post),p=Object(r.a)(d,2),m=p[0],h=p[1],E=Object(a.useState)(!1),_=Object(r.a)(E,2),w=_[0],x=_[1],k=Object(a.useState)(!1),N=Object(r.a)(k,2),R=N[0],T=N[1],P=Object(a.useState)(!1),C=Object(r.a)(P,2),L=C[0],M=C[1],H="muni"===i.type;console.log(m.title);var D=function(){M(!L)},A=function(){x(!w)},q=function(){T(!R)},F=L?o.a.createElement("div",{className:j.a.deleteButton},o.a.createElement(O.a,{mode:"attention",action:A},l["post.delete.button"])):null,K=R?o.a.createElement("div",null,o.a.createElement(b.a,{text:l["post.update.confirm"],close:q,action:function(t){if("attention"===t)D(),h(e.post),q();else{var n="/muni/".concat(i.location);W.a.patch(n,Object(c.a)({},m)).then(function(t){D(),e.getNews(i.location)}).catch(function(e){console.log(e)})}},direction:n})):null,z=w?o.a.createElement(b.a,{text:l["post.delete.confirm"],close:A,action:function(t){if("secondary"===t){var n="/muni/".concat(i.location);W.a.put(n,{post:m._id}).then(function(t){D(),e.getNews(i.location)}).catch(function(e){console.log(e)})}},direction:n}):null,J=l["post.age"],V=H?{right:{icon:Object(s.i)("secondary"),action:D,noRtl:!0}}:null;L&&(V={right:{icon:Object(s.g)("secondary"),action:q,noRtl:!0}});var I=Object(c.a)({name:u.name[i.settings.language]},V,{left:{icon:Object(s.f)(H?"secondary":"primary"),action:function(){e.setModule(e.prevModule)}}});return console.log(u),o.a.createElement(y.a,null,o.a.createElement(f.a,I),o.a.createElement(S.a,{space:7}),o.a.createElement(g.a,null,o.a.createElement(B.a,{direction:n,padding:"0 1rem"},o.a.createElement(S.a,{space:1}),o.a.createElement(U.a,{direction:n,padding:"0 1rem;"},m.title),o.a.createElement(b.g,{date:m.createdAt,daysText:J,direction:n})),o.a.createElement(b.h,{src:m.photo,edit:L,actions:{set:function(e){h(Object(c.a)({},m,{photo:e}))},remove:function(){h(Object(c.a)({},m,{photo:""}))}}}),o.a.createElement(X.a,null,o.a.createElement(b.b,{primary:!0,text:m.link,direction:n,edit:L,actions:{set:function(e){h(Object(c.a)({},m,{link:e}))},remove:function(){h(Object(c.a)({},m,{link:""}))}},editText:{message:l["post.link.edit"],confirm:l.confirm,cancel:l.cancel,label:l["new.field.link.label"],placeholder:l["new.field.link.prompt"]}})),o.a.createElement(v.a,{muni:!0,text:m.text,direction:n,edit:L,action:function(e){h(Object(c.a)({},m,{text:e}))}})),F,z,K)}),Q=n(110);t.default=function(e){return o.a.createElement(Q.a,null,e.news?o.a.createElement(I,null):o.a.createElement(J,null))}}}]);
//# sourceMappingURL=8.bb294857.chunk.js.map