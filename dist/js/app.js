(function(t){function e(e){for(var a,n,i=e[0],l=e[1],c=e[2],u=0,p=[];u<i.length;u++)n=i[u],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&p.push(r[n][0]),r[n]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);d&&d(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),s()}function s(){for(var t,e=0;e<o.length;e++){for(var s=o[e],a=!0,i=1;i<s.length;i++){var l=s[i];0!==r[l]&&(a=!1)}a&&(o.splice(e--,1),t=n(n.s=s[0]))}return t}var a={},r={app:0},o=[];function n(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=a,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(s,a,function(e){return t[e]}.bind(null,a));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var d=l;o.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);var a=s("2b0e"),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app container"}},[s("Context",{ref:"ctx"}),s("div",{staticClass:"container"},[s("b-tabs",{model:{value:t.tabIndex,callback:function(e){t.tabIndex=e},expression:"tabIndex"}},[s("b-tab",{attrs:{title:t.firstTab},on:{click:t.logout}},[s("Login",{on:{login:t.login,logCtx:t.logCtx}})],1),s("b-tab",{attrs:{title:"Flights"}},[s("Flights",{attrs:{user:{username:t.username,token:t.token},basket:t.basket},on:{logCtx:t.logCtx}})],1),s("b-tab",{attrs:{title:"Basket",disabled:!t.token}},[s("Basket",{attrs:{user:{username:t.username,token:t.token},basket:t.basket},on:{logCtx:t.logCtx}})],1),s("b-tab",{attrs:{title:"Booked",disabled:!t.token},on:{click:function(e){return t.$refs.booked.update()}}},[s("Booked",{ref:"booked",attrs:{user:{username:t.username,token:t.token}},on:{logCtx:t.logCtx}})],1),s("b-tab",{attrs:{title:"Hotels"}},[s("Hotels",{on:{logCtx:t.logCtx}})],1)],1)],1)],1)},o=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"row mt-3 mb-4"},[s("div",{staticClass:"col-lg-7"},[s("h3",{staticClass:"ml-1"},[t._v("Query Log")]),s("pre",{ref:"log",staticClass:"pre-scrollable m-1 p-1 h-100 bg-dark",staticStyle:{height:"200px !important"}},[s("code",{staticClass:"text-light"},t._l(t.ctx,(function(e,a){return s("span",{key:a,class:{"font-weight-bold":t.extraIndex===a},on:{click:function(e){t.showExtra(a)}}},[t._v(t._s(e.message)+"\n")])})),0)])]),s("div",{staticClass:"col-lg-5"},[s("h3",{staticClass:"ml-1"},[t._v("Query Details")]),s("pre",{staticClass:"pre-scrollable m-1 p-1 h-100 bg-dark",staticStyle:{height:"200px !important"}},[s("code",{staticClass:"text-light"},[t._v(t._s(void 0!==t.extraIndex?t.ctx[t.extraIndex].extra:""))])])])])])},i=[];function l(t){return console.log(t),t.replace(/ ([A-Z]{4,})/g,(t,e)=>"\n"+e)}var c={data(){return{ctx:[],extraIndex:void 0}},methods:{logCtx(t){1!=t.length&&t[1]?(console.log(t),this.ctx.push({message:"• "+t[0],extra:t.slice(1).map(l).join("\n\n")})):this.ctx.push({message:t[0]}),setTimeout(()=>{this.$refs["log"].scrollTop=this.$refs["log"].scrollHeight,this.showExtra(this.ctx.length-1)},50)},showExtra:function(t){this.ctx[t].extra?this.extraIndex=t:this.extraIndex=void 0}}},d=c,u=s("2877"),p=Object(u["a"])(d,n,i,!1,null,null,null),m=p.exports,h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-sm"},[s("div",{staticClass:"input-group mt-3"},[t._m(0),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text","aria-describedby":"basic-addon1"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),s("div",{staticClass:"input-group mt-3"},[t._m(1),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password","aria-describedby":"basic-addon2"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t.error_message?s("div",{staticClass:"alert alert-danger mt-3"},[s("strong",[t._v("Error:")]),t._v(" "+t._s(t.error_message)+" ")]):t._e(),s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-sm"},[s("b-button",{staticClass:"w-100",attrs:{variant:"primary"},on:{click:t.login}},[t._v("Log In")])],1),s("div",{staticClass:"col-sm"},[s("b-button",{staticClass:"w-100",attrs:{variant:"outline-primary"},on:{click:t.register}},[t._v("Register")])],1)])]),t._m(2)])])},g=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("Username")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon2"}},[t._v("Password")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-sm"},[s("h1",[t._v("CBTravel "),s("img",{attrs:{src:"assets/CBTravel.LOGO.png",alt:"CBTravel Logo"}})]),s("p",[t._v("This is a sample app to demonstrate some of the things Couchbase can do. Create an account, book flights and search hotels while the app displays what's going on behind the scenes.")]),s("p",[t._v("You can find documentation for this app "),s("a",{attrs:{href:"https://docs.couchbase.com/server/4.5/travel-app/travel-app-walkthough.html",target:"_blank"}},[t._v("here")]),t._v(", and docs for each SDK backend below:")]),s("table",{staticClass:"table"},[s("tr",[s("td",{staticClass:"text-center"},[s("a",{attrs:{href:"https://docs.couchbase.com/java-sdk/current/sample-app-backend.html",target:"_blank"}},[t._v("Java")])]),s("td",{staticClass:"text-center"},[s("a",{attrs:{href:"https://docs.couchbase.com/python-sdk/current/sample-app-backend.html",target:"_blank"}},[t._v("Python")])]),s("td",{staticClass:"text-center"},[s("a",{attrs:{href:"https://docs.couchbase.com/nodejs-sdk/current/sample-app-backend.html",target:"_blank"}},[t._v("Javascript")])])]),s("tr",[s("td",{staticClass:"text-center"},[s("a",{attrs:{href:"https://docs.couchbase.com/dotnet-sdk/current/sample-app-backend.html",target:"_blank"}},[t._v(".NET")])]),s("td",{staticClass:"text-center"},[s("a",{attrs:{href:"https://docs.couchbase.com/go-sdk/current/sample-app-backend.html",target:"_blank"}},[t._v("Go")])]),s("td",{staticClass:"text-center"},[s("a",{attrs:{href:"https://docs.couchbase.com/php-sdk/current/sample-app-backend.html",target:"_blank"}},[t._v("PHP")])])])])])}],f=s("bc3a"),v=s.n(f),b=(s("5118"),{name:"login",data(){return{username:"",password:"",error_message:void 0}},methods:{login:function(){let t=this;v.a.post(rt.baseURL+"user/login",{user:this.username,password:md5(this.password)}).then(t=>{this.$emit("login",{token:t.data.data.token,user:this.username}),this.$emit("logCtx",["Authenticated with server; Retrieved token",t.data.context])}).catch(e=>{t.error_message=e.response.error||e.message})},register:function(){let t=this;v.a.post(rt.baseURL+"user/signup",{user:this.username,password:md5(this.password)}).then(e=>{t.$emit("login",{token:e.data.data.token,user:this.username}),this.$emit("logCtx",["Authenticated with server; Assigned token",e.data.context])}).catch(e=>{t.error_message=e.response.error||e.message})}}}),_=b,C=Object(u["a"])(_,h,g,!1,null,null,null),x=C.exports,k=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container flights"},[s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"input-group col-sm"},[t._m(0),s("input",{directives:[{name:"model",rawName:"v-model",value:t.from_airport,expression:"from_airport"}],staticClass:"form-control",attrs:{type:"text",list:"from_airports",placeholder:"Locations loaded with timeout","aria-describedby":"basic-addon1"},domProps:{value:t.from_airport},on:{input:[function(e){e.target.composing||(t.from_airport=e.target.value)},t.from_update]}}),s("datalist",{attrs:{id:"from_airports"}},t._l(t.from_suggest,(function(e,a){return s("option",{key:a,domProps:{value:e}},[t._v(" "+t._s(t.isAirportCode(t.from_airport)?t.from_airport.toUpperCase():"")+" ")])})),0)]),s("div",{staticClass:"input-group col-sm"},[t._m(1),s("input",{directives:[{name:"model",rawName:"v-model",value:t.to_airport,expression:"to_airport"}],staticClass:"form-control",attrs:{type:"text",list:"to_airports",placeholder:"Locations loaded with timeout","aria-describedby":"basic-addon1"},domProps:{value:t.to_airport},on:{input:[function(e){e.target.composing||(t.to_airport=e.target.value)},t.to_update]}}),s("datalist",{attrs:{id:"to_airports"}},t._l(t.to_suggest,(function(e,a){return s("option",{key:a,domProps:{value:e}},[t._v(" "+t._s(t.isAirportCode(t.to_airport)?t.to_airport.toUpperCase():"")+" ")])})),0)])]),s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"input-group col-sm"},[t._m(2),s("input",{directives:[{name:"model",rawName:"v-model",value:t.leave_date,expression:"leave_date"}],staticClass:"form-control",attrs:{id:"leave",type:"date","aria-describedby":"basic-addon1"},domProps:{value:t.leave_date},on:{input:function(e){e.target.composing||(t.leave_date=e.target.value)}}})]),s("div",{staticClass:"input-group col-sm"},[t._m(3),s("input",{directives:[{name:"model",rawName:"v-model",value:t.return_date,expression:"return_date"}],staticClass:"form-control",attrs:{id:"return",type:"date","aria-describedby":"basic-addon1"},domProps:{value:t.return_date},on:{input:function(e){e.target.composing||(t.return_date=e.target.value)}}})])]),s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col"},[s("p",{staticClass:"text-danger",class:{"d-none":!!t.$attrs.user.token}},[t._v("You must log in to be able to book flights!")])]),s("div",{staticClass:"col"},[s("b-button",{staticClass:"float-right",attrs:{variant:"primary"},on:{click:t.search_flights}},[t._v("Search")])],1)]),s("h3",[t._v("Outbound Flights")]),s("b-table",{staticClass:"mt-3",attrs:{items:t.out_results,fields:t.fields},scopedSlots:t._u([{key:"cell(flightpath)",fn:function(e){return[t._v(" "+t._s(e.item.sourceairport)+" -> "+t._s(e.item.destinationairport)+" ")]}},{key:"cell(actions)",fn:function(e){return[s("button",{staticClass:"btn btn-primary btn-sm mr-3",attrs:{disabled:!t.$attrs.user.token||t.isInBasket("outBtn-"+e.index)},on:{click:function(s){return t.addToBasket(e.index,t.out_results,"outBtn-"+e.index)}}},[s("strong",[t._v("Add to basket")])])]}}])}),s("h3",[t._v("Returning Flights")]),s("b-table",{staticClass:"mt-3",attrs:{items:t.in_results,fields:t.fields},scopedSlots:t._u([{key:"cell(flightpath)",fn:function(e){return[t._v(" "+t._s(e.item.sourceairport)+" -> "+t._s(e.item.destinationairport)+" ")]}},{key:"cell(actions)",fn:function(e){return[s("button",{staticClass:"btn btn-primary btn-sm mr-3",attrs:{disabled:!t.$attrs.user.token||t.isInBasket("rtnBtn-"+e.index)},on:{click:function(s){return t.addToBasket(e.index,t.in_results,"rtnBtn-"+e.index)}}},[s("strong",[t._v("Add to basket")])])]}}])})],1)},y=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("From")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("To")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("Leave")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("Return")])])}];let w=[],$=[],E=[],L=[];function P(t,e,s){let a=s[t];e.length=0,""!=a&&v.a.get(rt.baseURL+"airports?search="+a).then(r=>{if(s.$emit("logCtx",[`Searched for airports matching "${a}"`,...r.data.context]),s[t]!=a)return;e.length=0;let o=r.data.data.slice(0,10);o.map(t=>e.push(t.airportname))})}function B(t){let e=t.split("-"),s=e.shift();return e.push(s),e.join("/")}function O(t,e,s,a,r){E.length=0,L.length=0,r.booked.length=0,console.log(r.booked),s&&(v.a.get(rt.baseURL+`flightPaths/${t}/${e}?leave=`+B(s)).then(t=>{let e=t.data.data;e.forEach((t,e,a)=>a[e].date=B(s)),E.push(...e),r.$emit("logCtx",["Queried for outbound flights",...t.data.context])}),a&&v.a.get(rt.baseURL+`flightPaths/${e}/${t}?leave=`+B(a)).then(t=>{let e=t.data.data;e.forEach((t,e,s)=>s[e].date=B(a)),L.push(...e),r.$emit("logCtx",["Queried for inbound flights",...t.data.context])}))}var T={name:"flights",data(){return{from_airport:"",to_airport:"",leave_date:"",return_date:"",from_suggest:w,to_suggest:$,out_results:E,in_results:L,booked:[],fields:["name","flight","utc","flightpath","price","actions"]}},methods:{from_update:function(){P("from_airport",this.from_suggest,this)},to_update:function(){P("to_airport",this.to_suggest,this)},search_flights:function(){O(this.from_airport,this.to_airport,this.leave_date,this.return_date,this)},addToBasket:function(t,e,s){let a=e[t];this.$attrs.basket.push(a),this.booked.push(s),console.log(this.booked)},isInBasket:function(t){return this.booked.indexOf(t)>-1},isAirportCode:function(t){return(t.toLowerCase()==t||t.toUpperCase()==t)&&(3==t.length||4==t.length)}}},j=T,S=Object(u["a"])(j,k,y,!1,null,null,null),I=S.exports,U=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-lg"},[0!=this.$attrs.basket.length||t.error_message?t._e():s("div",{staticClass:"alert alert-primary"},[t._m(0),s("p",{staticClass:"mb-0"},[t._v("Try adding some from the flights tab")])]),t.error_message?s("div",{staticClass:"alert alert-danger mt-3"},[s("strong",[t._v("Error:")]),t._v(" "+t._s(t.error_message)+" ")]):t._e(),s("b-table",{staticClass:"mt-3",attrs:{items:this.$attrs.basket,fields:t.fields},scopedSlots:t._u([{key:"cell(flightpath)",fn:function(e){return[t._v(" "+t._s(e.item.sourceairport)+" -> "+t._s(e.item.destinationairport)+" ")]}},{key:"cell(actions)",fn:function(e){return[s("button",{staticClass:"btn btn-primary btn-sm mr-3",on:{click:function(s){return t.buy(e.index)}}},[s("strong",[t._v("Buy")])]),s("button",{staticClass:"btn btn-danger btn-sm",on:{click:function(s){return t.cancel(e.index)}}},[s("strong",[t._v("X")])])]}}])})],1)])])},R=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[s("strong",[t._v("You haven't added any flights to your basket yet!")])])}],A={name:"basket",data(){return{fields:["name","flight","date","flightpath","actions"],error_message:void 0}},methods:{buy:function(t){let e=this;v.a.post(rt.baseURL+`user/${this.$attrs.user.username}/flights`,{flights:[this.$attrs.basket.splice(t,1)[0]]},{headers:{Authorization:"Bearer "+this.$attrs.user.token}}).then(t=>{console.log(t),e.$emit("logCtx",["Purchased item from basket",t.data.context])}).catch(t=>{this.error_message=t.response?t.response.data.failure:t.message})},cancel:function(t,e){this.$attrs.basket.pop(e)}}},N=A,F=Object(u["a"])(N,U,R,!1,null,null,null),H=F.exports,J=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-lg"},[0==t.booked.length?s("div",{staticClass:"alert alert-primary"},[t._m(0),s("p",{staticClass:"mb-0"},[t._v("Try purchasing some from your basket")])]):t._e(),s("b-table",{staticClass:"mt-3",attrs:{items:t.booked,fields:t.fields},on:{update:t.update},scopedSlots:t._u([{key:"cell(flightpath)",fn:function(e){return[t._v(" "+t._s(e.item.sourceairport)+" -> "+t._s(e.item.destinationairport)+" ")]}}])})],1)])])},M=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[s("strong",[t._v("You haven't purchased any flights yet!")])])}],Q={name:"booked",data(){return{fields:["name","flight","date","flightpath"],booked:[]}},methods:{update:async function(){let t=this;console.log("updating..."),v.a.get(rt.baseURL+`user/${this.$attrs.user.username}/flights`,{headers:{Authorization:"Bearer "+this.$attrs.user.token}}).then(e=>{t.booked.length=0,e.data&&t.booked.push(...e.data.data),t.$emit("logCtx",["Updated booked flights lists",e.data.context])})}}},Y=Q,z=Object(u["a"])(Y,J,M,!1,null,null,null),D=z.exports,G=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-md-5 input-group mb-3"},[t._m(0),s("input",{directives:[{name:"model",rawName:"v-model",value:t.location,expression:"location"}],staticClass:"form-control",attrs:{type:"text",placeholder:"E.g: London, France","aria-describedby":"basic-addon1"},domProps:{value:t.location},on:{input:function(e){e.target.composing||(t.location=e.target.value)}}})]),s("div",{staticClass:"col-md-5 input-group mb-3"},[t._m(1),s("input",{directives:[{name:"model",rawName:"v-model",value:t.desc,expression:"desc"}],staticClass:"form-control",attrs:{type:"text",placeholder:"(optional)","aria-describedby":"basic-addon1"},domProps:{value:t.desc},on:{input:function(e){e.target.composing||(t.desc=e.target.value)}}})]),s("div",{staticClass:"col-md mb-3"},[s("b-button",{staticClass:"w-100",attrs:{variant:"primary"},on:{click:t.search}},[t._v("Search")])],1)]),s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-lg"},[s("b-table",{staticClass:"mt-3",attrs:{items:t.hotels,fields:t.fields},scopedSlots:t._u([{key:"address",fn:function(e){return[t._v(" "+t._s(e.item.address)+" "),s("br"),t._v(" "+t._s(e.item.state?e.item.state:"")+" "),e.item.state?s("br"):t._e(),t._v(" "+t._s(e.item.country)+" ")]}}])})],1)])])},K=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("Location")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("Search Term")])])}],X={name:"hotels",data(){return{fields:["address","name","description"],hotels:[],desc:"",location:""}},methods:{search:async function(){let t=this;v.a.get(rt.baseURL+`hotel/${this.desc||"*"}/${this.location||"*"}/`).then(e=>{t.hotels.length=0,t.hotels.push(...e.data.data),t.$emit("logCtx",["Searched for hotels matching "+(t.location?t.location:"")+(t.location&&t.desc?" and ":"")+(t.desc?t.desc:""),e.data.context])})}}},Z=X,q=Object(u["a"])(Z,G,K,!1,null,null,null),V=q.exports,W={name:"app",components:{Context:m,Login:x,Flights:I,Basket:H,Booked:D,Hotels:V},data(){return{token:void 0,username:void 0,basket:[],tabIndex:0,firstTab:"Login",context:[]}},methods:{login:function(t){this.token=t.token,this.username=t.user,this.tabIndex=1,this.firstTab="Logout"},logout:function(){this.token=void 0,this.username=void 0,this.basket=[],this.tabIndex=0,this.firstTab="Login"},logCtx(t){console.log(t),this.$refs["ctx"].logCtx(t)}}},tt=W,et=Object(u["a"])(tt,r,o,!1,null,null,null),st=et.exports,at=s("5f5b");s("f9e3"),s("2dd8");s.d(e,"config",(function(){return rt})),a["default"].use(at["a"]),a["default"].config.productionTip=!1,new a["default"]({render:t=>t(st)}).$mount("#app");const rt=new a["default"]({data:{baseURL:"/api/"}})}});
//# sourceMappingURL=app.b7257fce.js.map