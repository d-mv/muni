(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{130:function(e){e.exports={"5ce589a00a61b5a9ca9d9caf":[{name:"Votes, per petiiton",url:"https://charts.mongodb.com/charts-m220js-zjtqv/embed/charts?id=d6fecdcc-582b-4d2e-8e81-c3740a2f2755&tenant=b877ca60-6a48-4905-bc3e-c7f74418d5d7"},{name:"Municipality Replies, UP vs DOWN",url:"https://charts.mongodb.com/charts-m220js-zjtqv/embed/charts?id=84cd1412-4e12-4625-8b13-e52bd23a9c77&tenant=b877ca60-6a48-4905-bc3e-c7f74418d5d7"},{name:"Petitions per Month",url:"https://charts.mongodb.com/charts-m220js-zjtqv/embed/charts?id=ee8ce1fe-267b-4ca2-a1a2-2b151597c246&tenant=b877ca60-6a48-4905-bc3e-c7f74418d5d7"}]}},131:function(e,a,t){"use strict";t.r(a);var c=t(0),n=t.n(c),r=t(4),s=t(3),l=t(72),i=t.n(l),o=t(7),m=t(130);a.default=Object(r.b)(function(e){return{locations:e.locations,auth:e.auth,language:e.language,posts:e.posts,pinned:e.news.filter(function(e){return e.active&&e.pinned})}},{logOff:s.f})(function(e){var a=e.locations,t=e.auth.user,c=e.language.text,r=m,s=a.filter(function(e){return e._id===t.location})[0];return n.a.createElement("div",{className:i.a.desktop},n.a.createElement("div",{className:i.a.header},n.a.createElement("p",null,s),n.a.createElement("div",null,n.a.createElement(o.a,{mode:"primarySmall",action:e.logOff},c["profile.button.logOff"]))),n.a.createElement("div",{className:i.a.content},n.a.createElement("div",{className:i.a.graphs},r[t.location].map(function(e){return n.a.createElement("div",null,n.a.createElement("div",{className:i.a.chartTitle},e.name),n.a.createElement("iframe",{title:"static_html",className:i.a.chart,src:e.url}))}))))})}}]);
//# sourceMappingURL=3.2743941e.chunk.js.map