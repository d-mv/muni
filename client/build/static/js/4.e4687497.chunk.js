(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{100:function(e,t,a){"use strict";var n=a(0),l=a.n(n);t.a=function(e){var t="content";return e.padded&&(t="content-padded"),e.header&&(t="content-header"),e.headerSub&&(t="content-header-sub"),e.paddedFlat&&(t="content-padded-flat"),l.a.createElement("div",{className:t},e.children)}},101:function(e,t,a){"use strict";var n=a(13),l=a(31),r=a(18),i=a(0),c=a.n(i),o=a(102),s=a.n(o),u=function(e){return c.a.createElement("h1",{className:"rtl"===e.direction?s.a.titleR:s.a.title},e.title)},_=a(8),m=a(103),d=a.n(m),p=a(6),h=a(104),g=a.n(h),f=Object(_.b)(function(e){return{language:e.language,type:e.type}},{})(function(e){var t=e.language,a=t.direction,i=t.text,o=g.a[Object(n.a)("header",a)],s=g.a[Object(n.a)("headerDesc",a)],u=g.a[Object(n.a)("title",a)];return c.a.createElement("div",{className:g.a.content},c.a.createElement("section",{className:o},c.a.createElement(l.a,{mode:"minimal",action:e.cancel},Object(r.j)("white")),c.a.createElement("div",{className:u},i["help.mycity"]),c.a.createElement(l.a,{mode:"minimal"})),c.a.createElement("section",{className:s},c.a.createElement("div",null,i["help.button.help"])),c.a.createElement("section",{className:g.a.pinned},c.a.createElement("div",null,i["help.post.pinned"])),c.a.createElement("section",{className:g.a.card},c.a.createElement("div",{className:g.a.photo},i["help.post.photo"]),c.a.createElement("div",{className:g.a.category},i["help.post.category"]),c.a.createElement("div",{className:g.a.title},i["help.post.title"]),c.a.createElement("div",{className:g.a.lineThree},i["help.post.age"])),c.a.createElement("section",null,c.a.createElement("div",{className:g.a.voteButtonText},i["muni"===e.type?"help.new.muni":"help.new"])),c.a.createElement("section",null,c.a.createElement("div",{className:g.a.navLeft},i["help.navigation"]),c.a.createElement("div",{className:g.a.navRight},i["help.navigation"])))}),v=Object(_.b)(function(e){return{module:e.module,language:e.language,help:e.help}},{showHelp:p.showHelp})(function(e){var t=e.language.direction,a=Object(n.a)("help-content",t),l=function(){e.showHelp(!e.help)},r=c.a.createElement("div",{className:a});switch(e.module){case"post":break;case"home":r=c.a.createElement(f,{cancel:l})}return c.a.createElement("div",{onClick:function(){return l()},className:"help"},r)});t.a=Object(_.b)(function(e){return{language:e.language,user:e.auth.user,help:e.help}},{showHelp:p.showHelp})(function(e){var t=e.language.direction,a=e.name,o=e.user,s=function(e,a){var l=a?d.a.icon:d.a[Object(n.a)("icon",t)];return c.a.createElement("div",{className:l},e)};Object(i.useEffect)(function(){o.settings.help&&e.showHelp(!0)},[]);var _=e.left?s(e.left.icon,e.left.noRtl):s(Object(r.j)("muni"===e.user.type?"secondary":"primary"),!0),m=e.right?s(e.right.icon,e.right.noRtl):c.a.createElement("div",null);return c.a.createElement("header",{className:d.a[Object(n.a)("plank",t)]},c.a.createElement(l.a,{mode:"minimal",action:function(){e.left?e.left.action():e.showHelp(!e.help)}},_),c.a.createElement(u,{title:a,direction:t}),c.a.createElement(l.a,{mode:"minimal",action:function(){e.right&&e.right.action()}},m),e.help?c.a.createElement(v,null):null)})},102:function(e,t,a){e.exports={title:"Title_title__3-ab1",titleR:"Title_titleR__1AdDW"}},103:function(e,t,a){e.exports={plank:"Header_plank__1Xkcj",plankRTL:"Header_plankRTL__22swp",icon:"Header_icon__1KqqL",iconRTL:"Header_iconRTL__2ufUE"}},104:function(e,t,a){e.exports={content:"style_content__2T40g",central:"style_central__ADLjj",header:"style_header__tQ9Sx",headerRTL:"style_headerRTL__2kFRT",icon:"style_icon__1YFTz",iconRTL:"style_iconRTL__3HH5-",title:"style_title__1WHmK",titleRTL:"style_titleRTL__vpycB",headerDesc:"style_headerDesc__3ANCb",headerDescRTL:"style_headerDescRTL__3knRN",pinned:"style_pinned__Kl-fS",card:"style_card__1D5C-",photo:"style_photo__2fnix",category:"style_category__24IMX",lineThree:"style_lineThree__NkwpN",voteButtonText:"style_voteButtonText__2_n0m",navLeft:"style_navLeft__bzWVA",navRight:"style_navRight__k7-Uq"}},105:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(13),i=a(121),c=a.n(i);t.a=function(e){return l.a.createElement("article",{id:e.id,className:c.a[Object(r.a)("card",e.direction)],style:{marginTop:e.margin},onClick:function(){return e.action()}},e.children)}},106:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n=function(e,t,a){var n=function(e,t){var a=[];return Object.keys(e).map(function(n){return a.push({value:e[n]._id,label:e[n].name[t]})}),a}(e,t),l="";return n.forEach(function(e){return e.value===a?l=e.label:null}),l}},107:function(e,t,a){e.exports={information:"PostCard_information__3qitB",informationRTL:"PostCard_informationRTL__3Bawz",data:"PostCard_data__2AQ7N",dataRTL:"PostCard_dataRTL__cjtBm",line:"PostCard_line__MFh0a",lineRTL:"PostCard_lineRTL__2sjYH",voters:"PostCard_voters__2woAn",button:"PostCard_button__1kGN3",bottomline:"PostCard_bottomline__rDAwi",bottomlineRTL:"PostCard_bottomlineRTL__2zv1L"}},108:function(e,t,a){e.exports={voters:"Voters_voters__wU9rW",votersRight:"Voters_votersRight__cHBms",icon:"Voters_icon__2Ilmf",number:"Voters_number__LcvYi",text:"Voters_text__20y1i"}},109:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(8),i=a(110),c=a.n(i);t.a=Object(r.b)(function(e){return{language:e.language}},{})(function(e){var t=e.language.text;return l.a.createElement("button",{className:c.a.vote},l.a.createElement("div",{className:c.a.inner},l.a.createElement("span",null,t["card.button.vote"])))})},110:function(e,t,a){e.exports={vote:"VoteButton_vote__lXrZs",inner:"VoteButton_inner__2gQwD"}},111:function(e,t,a){e.exports=a.p+"static/media/image__default.a29b97e6.png"},112:function(e,t,a){e.exports={category:"Category_category__32Ja0"}},113:function(e,t,a){e.exports={age:"Age_age__3OFDc",ageR:"Age_ageR__LEaOu",text:"Age_text__lQC7J"}},114:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(13),i=a(122),c=a.n(i);t.a=function(e){var t="paragraph";e.thin?t="paraThin":e.flat&&(t="flat");var a="";return a=e.direction?c.a[Object(r.a)(t,e.direction)]:c.a[t],l.a.createElement("div",{className:a},e.children)}},115:function(e,t,a){"use strict";t.a=function(e,t){return e&&t&&"string"===typeof e&&"number"===typeof t&&0!==e.length&&0!==t?e.length<=t?e:"".concat(e.split("").splice(0,t).join(""),"..."):""}},117:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(13),i=a(124),c=a.n(i);t.a=function(e){var t=c.a[Object(r.a)("line",e.direction)];return e.thin?t=c.a[Object(r.a)("thin",e.direction)]:e.flat&&(t=c.a[Object(r.a)("flat",e.direction)]),l.a.createElement("div",{className:t},e.children)}},118:function(e,t,a){e.exports={photo:"Photo_photo__2b4J_",photoRTL:"Photo_photoRTL__1JTK7"}},119:function(e,t,a){e.exports={title:"Title_title__285w7",titleRTL:"Title_titleRTL__17OH-",titleNews:"Title_titleNews__2b4ve",titleNewsRTL:"Title_titleNewsRTL__1nDyh"}},120:function(e,t,a){e.exports={tag:"RepliedTag_tag__3xirb",tagRTL:"RepliedTag_tagRTL__2Oaha"}},121:function(e,t,a){e.exports={"card-template":"Card_card-template__3uJ4i",card:"Card_card__3mid8",cardRTL:"Card_cardRTL__2qsIY",photoSection:"Card_photoSection___wJQw"}},122:function(e,t,a){e.exports={paragraph:"Paragraph_paragraph__3Syr1",paragraphRTL:"Paragraph_paragraphRTL__1QixD",paraThinRTL:"Paragraph_paraThinRTL__MbUoL",flatRTL:"Paragraph_flatRTL__2Wrf9",paraThin:"Paragraph_paraThin__3MveS",flat:"Paragraph_flat__1ADWb"}},124:function(e,t,a){e.exports={"line-template":"Line_line-template__10CJ2",line:"Line_line__3JP9h",thin:"Line_thin__3xGw8",thinRTL:"Line_thinRTL__RhqQo",lineRTL:"Line_lineRTL__1gIVi",flat:"Line_flat__QIoDb",flatRTL:"Line_flatRTL__2J-nY"}},125:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(4),i=a(8),c=a(115),o=a(106),s=a(15),u=a(98),_=a(109),m=a(118),d=a.n(m),p=a(13),h=function(e){var t="";t=e.photo?e.photo:a(111);var n={background:"url(".concat(t,") no-repeat scroll center center / cover")},r=e.direction?d.a[Object(p.a)("photo",e.direction)]:d.a.photo;return l.a.createElement("div",{style:n,className:r},e.children)},g=a(99),f=a(119),v=a.n(f),E=function(e){return l.a.createElement("h2",{id:"title",className:v.a[Object(p.a)(e.news?"titleNews":"title",e.direction)]},e.title)},b=a(97),R=a(120),T=a.n(R),L=function(e){return l.a.createElement("div",{className:T.a[Object(p.a)("tag",e.direction)]},l.a.createElement("p",null,e.text))},y=a(105),w=a(41),N=a(107),x=a.n(N),j=Object(i.b)(function(e){return{language:e.language,categories:e.categories,auth:e.auth}},{showPost:s.h})(function(e){var t,a=e.categories,n=e.auth.user,i=e.language,s=i.text,m=i.direction,d=i.short,f=e.post,v=f._id,R=f.title,T=f.createdAt,N=f.photo,j=f.category,O=f.createdBy,k=f.reply,P=e.post.votes?e.post.votes:[],C=l.a.createElement(w.c,null),Z=l.a.createElement(w.c,null),D=Object(o.a)(a,d,j||"");C=l.a.createElement(g.a,{category:D}),t=1===P.length?s["post.voter"]:s["post.voters"],Z=l.a.createElement(u.a,{number:P.length,text:t,direction:m});var H=O===n._id,B=P.includes(n._id),A="muni"===n.type,M=H||B||A?l.a.createElement("div",{className:x.a.button}):l.a.createElement("span",{className:x.a.button},l.a.createElement(_.a,null)),J=k.text?l.a.createElement(L,{text:s["post.replied"],direction:m}):null,S=s["post.age"];return l.a.createElement(y.a,{id:v,direction:m,action:function(){e.showPost(Object(r.a)({show:!0,type:"user"},e.post))}},l.a.createElement(h,{photo:N,direction:m},J),l.a.createElement("section",{className:"rtl"===m?x.a.informationRTL:x.a.information},C,l.a.createElement(E,{title:Object(c.a)(R,50),direction:m}),l.a.createElement("section",{className:x.a[Object(p.a)("bottomline",m)]},l.a.createElement("div",{className:x.a[Object(p.a)("data",m)]},l.a.createElement(b.a,{date:T,text:S,direction:m}),Z),M)))}),O=Object(i.b)(function(e){return{language:e.language}},{showPost:s.h})(function(e){var t=e.language,a=t.text,n=t.direction,i=e.post,c=i._id,o=i.title,s=(i.date,i.photo),u=i.createdAt,_=a["post.age"];return l.a.createElement(y.a,{id:c,direction:n,action:function(){e.showPost(Object(r.a)({show:!0,type:"news"},e.post))}},l.a.createElement(h,{photo:s},l.a.createElement("div",null,"''")),l.a.createElement("section",{className:"rtl"===n?x.a.informationRTL:x.a.information},l.a.createElement(E,{news:!0,title:o,direction:n}),l.a.createElement("section",{id:"age",className:"rtl"===n?x.a.dataRTL:x.a.data},l.a.createElement(b.a,{date:u,text:_,direction:n}))))});t.a=function(e){return e.posts.map(function(t){return e.muni?l.a.createElement(O,{key:t._id,post:t}):l.a.createElement(j,{key:t._id,post:t})})}},130:function(e,t,a){"use strict";var n=a(11),l=n;t.a=function(e,t,a){var r=new Date(Date.parse(e));if(!e&&!t||""===e||""===t||"Invalid Date"===r.toString())return"";if(a){var i=r.getMonth()+1,c=i<10?"0".concat(i):i;return"".concat(r.getDate(),"/").concat(c,"/").concat(r.getFullYear())}var o=Object.keys(n.language).includes(t)?t:"\u05e2\u05d1";return"".concat(function(e,t){return l.language[e].months[t]}(o,r.getMonth())," ").concat(r.getDate(),", ").concat(r.getFullYear())}},134:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(135),i=a.n(r);t.a=function(e){var t=i.a.block;return e.border?t=i.a.border:e.rectangle&&(t=i.a.borderRectangle),l.a.createElement("div",{className:t},e.children)}},135:function(e,t,a){e.exports={block:"Block_block__25D3U",border:"Block_border__3jZ4R",borderRectangle:"Block_borderRectangle__bDkgw"}},159:function(e,t,a){e.exports={line:"PinnedCard_line__1SjUh",lineRTL:"PinnedCard_lineRTL__2z-Ks",title:"PinnedCard_title__3-2nk",date:"PinnedCard_date__38JiD",text:"PinnedCard_text__IKtnR","icon-template":"PinnedCard_icon-template__XLarc",icon:"PinnedCard_icon__3iCIl",iconRTL:"PinnedCard_iconRTL__2-WHS"}},170:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(8),i=a(4),c=a(15),o=a(130),s=a(115),u=a(13),_=a(134),m=a(105),d=a(117),p=a(114),h=a(3),g=function(e){var t,a=Object.keys(h.a).includes(e.color)?h.a[e.color]:"white";return e.filled?(t=a,l.a.createElement("svg",{width:"90%",height:"90%",viewBox:"0 0 390 429",xmlns:"http://www.w3.org/2000/svg",fillRule:"evenodd",clipRule:"evenodd",strokeMiterlimit:"1.414"},l.a.createElement("path",{d:"M369.367,408.915l-349.467,0l0,-13.721l349.467,0l0,13.721Zm-25.826,-25.827l-26.634,0l0,-149.311l26.634,0l0,149.311Zm-180.787,0l-78.287,0l0,-149.311l39.547,0l0,135.59l12.106,0l0,-135.59l26.634,0l0,149.311Zm51.653,0l-39.547,0l0,-149.311l39.547,0l0,149.311Zm38.74,0l-26.633,0l0,-149.311l26.633,0l0,149.311Zm51.654,0l-39.547,0l0,-149.311l39.547,0l0,149.311Zm-232.44,0l-26.634,0l0,-149.311l26.634,0l0,149.311Zm297.006,-161.417l-349.467,0l0,-13.72l349.467,0l0,13.72Zm-39.362,-25.826l-269.936,0l134.968,-89.979l134.968,89.979Zm-154.337,-38.74l-12.914,0l0,12.106l12.914,0l0,-12.106Zm51.653,0l-12.914,0l0,12.106l12.914,0l0,-12.106Zm-25.827,0l-12.913,0l0,12.106l12.913,0l0,-12.106Zm38.74,-103.307l-39.547,0l0,-26.634l39.547,0l0,26.634Z",fill:t}),l.a.createElement("path",{d:"M355.647,383.088l0,-149.311l25.827,0l0,-37.932l-29.644,0l-151.143,-100.494l0,-29.447l51.653,0l0,-50.846l-51.653,0l0,-7.264l-12.106,0l0,87.557l-150.336,100.494l-30.451,0l0,37.932l25.827,0l0,149.311l-25.827,0l0,37.933l373.68,0l0,-37.933l-25.827,0Zm-115.413,-355.924l0,26.634l-39.547,0l0,-26.634l39.547,0Zm-220.334,180.787l349.467,0l0,13.72l-349.467,0l0,-13.72Zm349.467,200.964l-349.467,0l0,-13.721l349.467,0l0,13.721Z",fill:"none",fillRule:"nonzero",stroke:t,strokeWidth:"9"}))):function(e){return l.a.createElement("svg",{width:"90%",height:"90%",viewBox:"0 0 379 418",xmlns:"http://www.w3.org/2000/svg",fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"1.414"},l.a.createElement("g",{fill:e},l.a.createElement("rect",{x:"157.057",y:"150.972",width:"13.088",height:"12.241"}),l.a.createElement("rect",{x:"183.234",y:"150.972",width:"13.088",height:"12.241"}),l.a.createElement("rect",{x:"209.41",y:"150.972",width:"13.088",height:"12.241"}),l.a.createElement("path",{d:"M352.561,379.469l0,-150.971l26.177,0l0,-38.355l-30.046,0l-153.188,-101.612l0,-29.774l52.352,0l0,-51.412l-52.352,0l0,-7.345l-12.27,0l0,88.531l-152.371,101.612l-30.863,0l0,38.355l26.176,0l0,150.971l-26.176,0l0,38.355l378.738,0l0,-38.355l-26.177,0Zm-12.27,0l-26.994,0l0,-150.971l26.994,0l0,150.971Zm-222.498,-150.971l0,137.098l12.27,0l0,-137.098l26.994,0l0,150.971l-79.346,0l0,-150.971l40.082,0Zm51.535,0l40.082,0l0,150.971l-40.082,0l0,-150.971Zm52.352,0l26.994,0l0,150.971l-26.994,0l0,-150.971Zm39.264,0l40.083,0l0,150.971l-40.083,0l0,-150.971Zm-25.358,-208.912l0,26.93l-40.082,0l0,-26.93l40.082,0Zm-45.808,79.577l136.794,90.98l-273.59,0l136.796,-90.98Zm-177.508,103.221l354.197,0l0,13.873l-354.197,0l0,-13.873Zm26.176,26.114l26.995,0l0,150.971l-26.995,0l0,-150.971Zm328.021,177.085l-354.197,0l0,-13.873l354.197,0l0,13.873Z",fillRule:"nonzero"})))}(a)},f=a(159),v=a.n(f),E=Object(r.b)(function(e){return{language:e.language,type:e.auth.user.type}},{showPost:c.h})(function(e){var t=e.language.direction,a=Object(u.a)("icon",t);return l.a.createElement(m.a,{direction:t,id:e.post._id,margin:25,action:function(){e.showPost(Object(i.a)({show:!0,type:"news"},e.post))}},l.a.createElement("div",{className:v.a[a]},l.a.createElement(g,{filled:!0,color:"muni"===e.type?"secondary":"primary"})),l.a.createElement(_.a,null,l.a.createElement(d.a,{direction:t},l.a.createElement("span",{className:v.a.title},Object(s.a)(e.post.title,55))),l.a.createElement(d.a,{thin:!0,direction:t},l.a.createElement("span",{className:v.a.date},Object(o.a)(e.post.createdAt,t))),l.a.createElement(p.a,{direction:t},Object(s.a)(e.post.text,95))))}),b=a(101),R=a(125),T=a(40),L=a(100);t.default=Object(r.b)(function(e){return{locations:e.locations,user:e.auth.user,posts:e.posts,pinned:e.news.filter(function(e){return e.active&&e.pinned})[0]}},{})(function(e){var t=e.posts,a=e.pinned,n=e.locations,r=e.user,i={name:n.filter(function(e){return e._id===r.location})[0].name[r.settings.language],right:{icon:l.a.createElement("div",null),action:function(){}}};return console.log(a),l.a.createElement(T.a,null,l.a.createElement(b.a,i),l.a.createElement(L.a,{header:!0},a?l.a.createElement(E,{post:a}):null,l.a.createElement(R.a,{posts:function(e){return e.sort(function(e,t){return e.votes.length<t.votes.length?1:-1})}(t)}),";"))})},97:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=function(e){var t=new Date,a=new Date(e),n=Math.round((t-a)/1e3/60/60/24),l=Math.round((t-a)/1e3/60/60),r=Math.round((t-a)/1e3/60),i={"day(s)":n};return n||(i={"hour(s)":l}),l||(i={"minute(s)":r}),i},i=a(113),c=a.n(i);t.a=function(e){var t=r(e.date),a=t[Object.keys(t)[0]],n={age:c.a.age,text:c.a.text},i=e.text[Object.keys(t)[0]];return"rtl"===e.direction&&(n.age=c.a.ageR),l.a.createElement("p",{className:n.age},a.toLocaleString(),l.a.createElement("span",{className:n.text},i))}},98:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(18),i=a(108),c=a.n(i);t.a=function(e){return l.a.createElement("p",{className:"rtl"===e.direction?c.a.votersRight:c.a.voters},l.a.createElement("span",{className:c.a.icon}," ",r.k),l.a.createElement("span",{className:c.a.number},e.number.toLocaleString()," "),l.a.createElement("span",{className:c.a.text},e.text))}},99:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(112),i=a.n(r);t.a=function(e){return l.a.createElement("h5",{id:"category",className:i.a.category},e.category)}}}]);
//# sourceMappingURL=4.e4687497.chunk.js.map