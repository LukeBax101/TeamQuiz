(function(t){function e(e){for(var o,i,u=e[0],a=e[1],c=e[2],f=0,l=[];f<u.length;f++)i=u[f],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&l.push(s[i][0]),s[i]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(t[o]=a[o]);m&&m(e);while(l.length)l.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,u=1;u<n.length;u++){var a=n[u];0!==s[a]&&(o=!1)}o&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var o={},s={app:0},r=[];function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=e,u=u.slice();for(var c=0;c<u.length;c++)e(u[c]);var m=a;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var o=n("64a9"),s=n.n(o);s.a},1:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o,s=n("2b0e"),r=n("8c4f"),i=n("f87c"),u=n("8055"),a=n.n(u),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},m=[],f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.open?n("div",[t.teamSelected?n("div",[t._v("\n      Choose the person who's team you'd like to be on:\n      "),n("button",{attrs:{type:"button"},on:{click:function(e){return t.chooseTeamSamuel()}}},[t._v(" Team Samuel")]),n("button",{attrs:{type:"button"},on:{click:function(e){return t.chooseTeamAmy()}}},[t._v(" Team Amy")]),n("div",[t._v("\n        If you really can't decide then click here to pick randomly:\n        "),n("button",{attrs:{type:"button"},on:{click:function(e){return t.chooseRandomTeam()}}},[t._v(" Random ")])])]):n("div",[n("Score"),t._v("\n      You're on team: "+t._s(t.team)+"\n      "),0===t.questionStage?n("Question",{attrs:{team:t.team,active:!0}}):t._e(),0!==t.questionNo?n("Results",{attrs:{team:t.team}}):t._e()],1)]):n("div",[t._v("\n    Waiting...\n  ")])])},l=[],h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return 0===t.questionNo?n("div",[t._v("\n  waiting for quiz to start\n")]):n("div",[n("div",[t._v("\n    Question "+t._s(t.questionNo)+"\n  ")]),n("div",[t._v("\n     "+t._s(t.questionText)+"\n  ")]),t._l(t.questionOptions,(function(e,o){return n("button",{class:{current:t.currentChoice===o},on:{click:function(e){return t.selectOption(o)}}},[t._v(" "+t._s(e)+"    ")])})),t.timeLeft>0?n("div",[t._v("\n    "+t._s(t.auto?"Warning, random option chosen! Choose for yourself in "+t.timeLeft+" second"+(t.timeLeft>1?"s":"")+"!":t.timeLeft+" second"+(t.timeLeft>1?"s":"")+" left!")+"\n  ")]):t._e()],2)},p=[],d={name:"Quizer",data:function(){return{currentChoice:-1,auto:!1}},props:["team","active"],computed:{questionNo:function(){return this.$store.getters.getQuestionNo},questionText:function(){return"amy"===this.team?this.$store.getters.getCurrentAmyQuestion.question:this.$store.getters.getCurrentSamQuestion.question},questionOptions:function(){return"amy"===this.team?this.$store.getters.getCurrentAmyQuestion.options:this.$store.getters.getCurrentSamQuestion.options},timeLeft:function(){return this.$store.getters.getTimeLeft}},watch:{timeLeft:function(t,e){5===t&&-1==this.currentChoice&&(this.selectOption(Math.floor(4*Math.random())),this.auto=!0)},questionNo:function(t,e){this.currentChoice=-1}},methods:{selectOption:function(t){this.active&&t!==this.currentChoice&&(this.auto=!1,-1!==this.currentChoice?this.$socket.client.emit("change_vote",{team:this.team,choice:t,prev:this.currentChoice}):this.$socket.client.emit("change_vote",{team:this.team,choice:t}),this.currentChoice=t)}}},g=d,v=(n("7ae5"),n("2877")),_=Object(v["a"])(g,h,p,!1,null,"4ed11915",null),S=_.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  Results are in for question "+t._s(t.questionNo)+"\n  "+t._s(t.results)+"\n  "),2===t.questionStage?n("div",[t._v("\n    The correct answer is: "+t._s(t.answer)+"\n  ")]):t._e()])},q=[],b={name:"Results",data:function(){return{}},props:["team"],computed:{questionNo:function(){return this.$store.getters.getQuestionNo},results:function(){return"amy"===this.team?this.$store.getters.getCurrentAmyResults:this.$store.getters.getCurrentSamResults},questionStage:function(){return this.$store.getters.getQuestionStage},answer:function(){return"amy"===this.team?this.$store.getters.getCurrentAmyAnswer:this.$store.getters.getCurrentSamAnswer}},methods:{}},w=b,$=Object(v["a"])(w,y,q,!1,null,"297bcbc1",null),Q=$.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  Amy: "+t._s(t.amyScore)+"\n  Sam: "+t._s(t.samScore)+"\n")])},N=[],C={name:"Score",data:function(){return{}},props:["team"],computed:{amyScore:function(){return this.$store.getters.getAmyScore},samScore:function(){return this.$store.getters.getSamScore}},methods:{}},O=C,A=Object(v["a"])(O,k,N,!1,null,"33f7a38b",null),R=A.exports,x={name:"Quizer",data:function(){return{team:""}},computed:{teamSelected:function(){return"samuel"!==this.team&&"amy"!==this.team},open:function(){return this.$store.getters.getOpen},questionStage:function(){return this.$store.getters.getQuestionStage},questionNo:function(){return this.$store.getters.getQuestionNo}},components:{Question:S,Results:Q,Score:R},methods:{chooseTeamSamuel:function(){this.team="samuel"},chooseTeamAmy:function(){this.team="amy"},chooseRandomTeam:function(){this.team=Math.random()>.5?"Samuel":"Amy"}}},T=x,j=Object(v["a"])(T,f,l,!1,null,"561b8f8d",null),L=j.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.verified?n("div",[n("div",[t._v("\n      Server status:\n      "),n("div",[t._v(t._s(t.open?"Open":"Closed"))]),0!==t.questionNo?n("div",[n("div",[t._v(" On question "+t._s(t.questionNo))]),n("div",[t._v(t._s(0===t.questionStage?"Showing Question":1===t.questionStage?"Question finished":"Showing answers"))]),n("div",[t._v(" "+t._s(t.ended?"On Final Results!":"Not finished"))])]):n("div",[t._v("\n        Quiz not started\n      ")])]),n("div",[n("button",{attrs:{type:"button"},on:{click:function(e){return t.toggleServer()}}},[t._v(" "+t._s(t.toggleText))]),t.ended?t._e():n("button",{attrs:{type:"button"},on:{click:function(e){return t.nextStage()}}},[t._v(" "+t._s(t.nextStageText))]),0!==t.questionNo?n("button",{attrs:{type:"button"},on:{click:function(e){return t.resetServer()}}},[t._v(" Reset Quiz ")]):t._e()]),0!==t.questionNo?n("div",[n("Score"),n("div",[t._v("\n        Current Amy Question:\n        "),n("Question",{attrs:{team:t.amy,active:!1}}),t._v("\n        Current Sam Question:\n        "),n("Question",{attrs:{team:t.sam,active:!1}})],1),n("div",[t._v("\n        Current Amy Results:\n        "),n("Results",{attrs:{team:t.amy}}),t._v("\n        Current Sam Results:\n        "),n("Results",{attrs:{team:t.sam}})],1)],1):t._e()]):n("div",[t._v("\n    Enter password:\n    "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])])},V=[],E={name:"Controller",computed:{verified:function(){return"test"===this.password},nextStageText:function(){return 0===this.questionNo?"Start Quiz":0===this.questionStage?"Send time warning for question ".concat(this.questionNo):1===this.questionStage?"Show answers for question ".concat(this.questionNo):"Move onto question ".concat(this.questionNo+1)},open:function(){return this.$store.getters.getOpen},toggleText:function(){return this.open?"Close Server":"Open Server"},questionNo:function(){return this.$store.getters.getQuestionNo},questionStage:function(){return this.$store.getters.getQuestionStage},ended:function(){return this.$store.getters.getMaxQuestionNo==this.questionNo&&2===this.questionStage},amyScore:function(){return this.$store.getters.getAmyScore},samScore:function(){return this.$store.getters.getSamScore},amyAnswer:function(){return this.$store.getters.getCurrentAmyAnswer},amyVotes:function(){return this.$store.getters.getCurrentAmyResults},samAnswer:function(){return this.$store.getters.getCurrentSamAnswer},samVotes:function(){return this.$store.getters.getCurrentSamResults}},data:function(){return{verfied:!1,password:"",amy:"amy",sam:"samuel"}},components:{Question:S,Results:Q,Score:R},methods:{toggleServer:function(){this.$socket.client.emit("open_update",!this.open)},resetServer:function(){this.$socket.client.emit("question_no_update",0),this.$socket.client.emit("question_stage_update",0),this.$socket.client.emit("reset_vote"),this.$socket.client.emit("reset_score")},nextStage:function(){0===this.questionNo?(this.$socket.client.emit("question_no_update",1),this.$socket.client.emit("question_stage_update",0)):0===this.questionStage?this.startQuestionWarning():1===this.questionStage?(this.$socket.client.emit("question_stage_update",2),setTimeout(this.calculateScores(),3e3)):(this.$socket.client.emit("question_no_update",this.questionNo+1),this.$socket.client.emit("question_stage_update",0),this.$socket.client.emit("reset_vote"))},startQuestionWarning:function(){var t=this,e=5;this.$socket.client.emit("question_end_warning",e);var n=setInterval((function(){e>0?(e--,t.$socket.client.emit("question_end_warning",e)):(t.$socket.client.emit("question_end_warning",-1),t.$socket.client.emit("question_stage_update",1),clearInterval(n))}),1e3)},calculateScores:function(){var t=this,e=this.amyVotes.filter((function(e,n){return n!==t.amyAnswer})).some((function(e,n){return e>=t.amyVotes[t.amyAnswer]})),n=e?this.amyScore:this.amyScore+1,o=this.samVotes.filter((function(e,n){return n!==t.samAnswer})).some((function(e,n){return e>=t.samVotes[t.samAnswer]})),s=o?this.samScore:this.samScore+1;this.$socket.client.emit("score_update",{amy:n,sam:s})}}},P=E,z=Object(v["a"])(P,M,V,!1,null,"463d4a7f",null),U=z.exports,W={name:"app",components:{Quizer:L,Controller:U}},I=W,J=(n("034f"),Object(v["a"])(I,c,m,!1,null,null,null)),F=J.exports,B=n("2f62"),D=n("bd86"),G="updateOpen",H="updateQuestionStage",K="updateTimeLeft",X="updateAmyScore",Y="updateSamScore",Z={open:!1,questionStage:0,timeLeft:-1,amyScore:0,samScore:0},tt={getCounter:function(t){return t.counter},getOpen:function(t){return t.open},getQuestionStage:function(t){return t.questionStage},getTimeLeft:function(t){return t.timeLeft},getAmyScore:function(t){return t.amyScore},getSamScore:function(t){return t.samScore}},et={socket_openUpdate:function(t,e){t.commit(G,e)},socket_questionStageUpdate:function(t,e){t.commit(H,e)},socket_questionEndWarning:function(t,e){t.commit(K,e)},socket_scoreUpdate:function(t,e){var n=e.amyScore,o=e.samScore;t.commit(X,n),t.commit(Y,o)}},nt=(o={},Object(D["a"])(o,G,(function(t,e){t.open=e})),Object(D["a"])(o,H,(function(t,e){t.questionStage=e})),Object(D["a"])(o,K,(function(t,e){t.timeLeft=e})),Object(D["a"])(o,X,(function(t,e){t.amyScore=e})),Object(D["a"])(o,Y,(function(t,e){t.samScore=e})),o),ot={state:Z,actions:et,mutations:nt,getters:tt},st="updateQuestionNo",rt={questionNo:1,amyQuestions:[{question:"is this a question?",options:["A","B","C","D"],correct:0},{question:"is this me?",options:["E","F","G","H"],correct:1},{question:"is this you?",options:["I","J","K","L"],correct:2}],samQuestions:[{question:"is this a sam question?",options:["M","N","O","P"],correct:3},{question:"is this sam?",options:["Q","R","S","T"],correct:1},{question:"is this?",options:["U","V","W","X"],correct:2}]},it={getCurrentAmyQuestion:function(t){return t.amyQuestions[t.questionNo-1]},getCurrentSamQuestion:function(t){return t.samQuestions[t.questionNo-1]},getCurrentAmyAnswer:function(t){return t.amyQuestions[t.questionNo-1].correct},getCurrentSamAnswer:function(t){return t.samQuestions[t.questionNo-1].correct},getQuestionNo:function(t){return t.questionNo},getMaxQuestionNo:function(t){return Math.min(t.amyQuestions.length,t.samQuestions.length)}},ut={socket_questionNoUpdate:function(t,e){t.commit(st,e)}},at=Object(D["a"])({},st,(function(t,e){t.questionNo=e})),ct={state:rt,actions:ut,mutations:at,getters:it},mt="updateVotes",ft={amyResults:[0,0,0,0],samResults:[0,0,0,0]},lt={getCurrentAmyResults:function(t){return t.amyResults},getCurrentSamResults:function(t){return t.samResults}},ht={socket_voteUpdate:function(t,e){t.commit(mt,e)}},pt=Object(D["a"])({},mt,(function(t,e){var n=e.amyVotes,o=e.samVotes;t.amyResults=n,t.samResults=o})),dt={state:ft,actions:ht,mutations:pt,getters:lt};s["a"].use(B["a"]);var gt=new B["a"].Store({debug:!1,modules:{socket:ot,questions:ct,results:dt}}),vt=gt;n.d(e,"socket",(function(){return St})),s["a"].config.productionTip=!1;var _t=window.location.origin,St=a()(_t,{transports:["websocket"]});s["a"].use(i["a"],St,{store:vt}),s["a"].use(r["a"]);var yt=new r["a"]({routes:[{path:"/",component:L},{path:"/controller",component:U}]});new s["a"]({render:function(t){return t(F)},store:vt,router:yt}).$mount("#app")},"64a9":function(t,e,n){},"7ae5":function(t,e,n){"use strict";var o=n("8e84"),s=n.n(o);s.a},"8e84":function(t,e,n){}});
//# sourceMappingURL=app.d7ebc757.js.map