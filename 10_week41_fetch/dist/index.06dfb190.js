function e(e,t,s,i){Object.defineProperty(e,t,{get:s,set:i,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},a={},r=s.parcelRequiref7cf;null==r&&((r=function(e){if(e in i)return i[e].exports;if(e in a){var t=a[e];delete a[e];var s={id:e,exports:{}};return i[e]=s,t.call(s.exports,s,s.exports),s.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},s.parcelRequiref7cf=r),r.register("27Lyk",(function(t,s){var i,a;e(t.exports,"register",(()=>i),(e=>i=e)),e(t.exports,"resolve",(()=>a),(e=>a=e));var r={};i=function(e){for(var t=Object.keys(e),s=0;s<t.length;s++)r[t[s]]=e[t[s]]},a=function(e){var t=r[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),r.register("DB6tq",(function(e,t){e.exports=new URL(r("27Lyk").resolve("1PCjP"),import.meta.url).toString()})),r("27Lyk").register(JSON.parse('{"g3LtT":"index.06dfb190.js","1PCjP":"war.34d96e76.gif","az9Gg":"card-back-2.75829339.png","cKcPc":"wargames_logo.6673790a.webp","32S1s":"intro.b02d6007.jpg"}'));class n{static GAME={USER:"user",COMPUTER:"computer",WIN:"win",LOSE:"lose",WAR:"war",ERROR:"error",START_PILE:26,OVERLAY:{WAR:"overlay-war",START:"overlay-start",GAME_OVER:"overlay-game-over",HELP:"overlay-help"},DEV_MODE:"1"};static API={BASE_URL:"https://deckofcardsapi.com/api/deck",DECK_TOP:"",DECK_BOTTOM:"bottom/",DECK_RANDOM:"random/",LOG:!1}}class o{#e=[];constructor(e){this.id,this.options,this.populate(e)}set classList(e){"string"==typeof e&&(e=e.split(" ")),this.#e=[...this.#e,...e]}get classList(){return this.#e}populate(e){e&&Object.assign(this,e)}}class l extends HTMLElement{#t;constructor(e){super(),this.config=e||new o,this.validateConfig(),this.populateFromConfig()}set config(e){this.#t=e}get config(){return this.#t}get defaults(){return{id:"",classList:""}}render(e){this.innerHTML=e}appendTo(e){return e.append(this),this}prependTo(e){return e.prepend(this),this}validateConfig(){this.config.id=this.config.id?this.config.id:this.defaults.id,this.config.classList=this.defaults.classList}populateFromConfig(){this.id=this.config.id,this.classList.add(...this.config.classList)}destroy(){this.parentElement&&this.parentElement.removeChild(this)}}class h{constructor(e){this.id=e,this.card,this.ramaining,this.state,this.prevState}}class d extends l{static MODE_INFO="info";static MODE_SUCCESS="success";static MODE_ERROR="error";static POSITION_GLOBAL="global";static POSITION_TARGET="target";#s=20;constructor(e){super(e),this.render()}get defaults(){return{id:"tooltip",classList:"tooltip"}}get targetElement(){return this.config.targetElement}get globalPosition(){const e=this.config.targetElement.getBoundingClientRect();return{left:e.left+window.scrollX+this.config.offsetX,top:e.top+window.scrollY+this.config.offsetY-this.offsetHeight-this.#s}}render(){super.render(this.config.msg),this.classList.add(this.config.mode,"show"),this.config.position===d.POSITION_GLOBAL?(document.body.appendChild(this),this.style.left=this.globalPosition.left+"px",this.style.top=this.globalPosition.top+"px",this.offsetLeft+this.offsetWidth>document.body.clientWidth&&(this.style.marginLeft=this.config.offsetX-this.offsetWidth+"px",this.classList.add("left"))):(this.targetElement.appendChild(this),this.style.left=this.config.offsetX+"px",this.style.top=this.config.offsetY-this.offsetHeight-this.#s+"px")}destroy(){this.parentElement&&this.parentElement.removeChild(this)}}window.customElements.define("component-tooltip",d);class c extends o{constructor(e){super(),this.mode=d.MODE_INFO,this.targetElement=document.body,this.position=d.POSITION_GLOBAL,this.offsetX=200,this.offsetY=200,this.msg="Tooltip text here",this.populate(e)}}class u extends l{#i=0;#a;#r;constructor(e){super(e),this.render()}get defaults(){return{id:"game-card",classList:"game__card"}}get player(){return this.config.options.pVO}get isUser(){return this.player.id===n.GAME.USER}get isWarCard(){return this.config.options.isWarCard}set animIndex(e){this.#i=e}set animOutState(e){this.#a=e}set animZIndex(e){this.#r=e}render(){if(super.render(t('<div class="game__card-inner"> <div class="game__card-front"> </div> <div class="game__card-back"> <img src="card-back-2.75829339.png"> </div> </div>')),this.classList.add(this.config.options.pVO.id),!this.isWarCard){const e=this.config.options.pVO.card.imageElement;this.querySelector(".game__card-front").appendChild(e)}}animateIn(){return this.#n("in")}animateOut(){return this.#n("out")}#n(e){const t=[];let s;"in"===e?(t.push("animate-in"),this.isWarCard&&t.push("war"),s=.5):(this.classList.remove("animate-in"),t.push("animate-out"),t.push(this.#a),s=.2,this.parentElement.style.zIndex=25),this.style.zIndex=this.#r;const i=this.#i*s+"s";return this.querySelector(".game__card-inner").style.animationDelay=i,this.onanimationstart=()=>{0===this.player.remaining&&document.querySelector("#slot-pile-"+this.player.id).classList.add("is-hidden")},new Promise((e=>{this.onanimationend=()=>{this.parentElement.style.zIndex="auto",this.style.zIndex="auto",e()},this.classList.add(...t)}))}}window.customElements.define("element-card",u);class m extends l{constructor(e){super(e),this.render()}get defaults(){return{id:"game-hud",classList:"game__hud"}}render(){super.render(t('<div class="inner"> <div class="game__hud-name"></div> <div class="game__hud-score"> <span class="game__hud-score-points"></span> <span class="game__hud-score-header">cards</span> </div> </div>')),this.classList.add(this.config.options.player),this.querySelector(".game__hud-name").innerHTML=this.config.options.name,this.update(0)}update(e){this.querySelector(".game__hud-score-points").innerHTML=e}animateIn(){this.classList.remove("animate-out"),this.classList.add("animate-in")}animateOut(){this.classList.contains("animate-in")&&this.classList.add("animate-out"),this.classList.remove("animate-in")}}window.customElements.define("element-hud",m);class g extends l{#o;#l=!1;constructor(e){super(e),this.render()}get defaults(){return{id:"game-overlay",classList:"game__overlay"}}get mode(){return this.config.options.mode}get state(){return this.config.options.state}get isInAnimnation(){return this.#l}render(){switch(this.mode){case n.GAME.OVERLAY.START:this.#h();break;case n.GAME.OVERLAY.WAR:this.#d();break;case n.GAME.OVERLAY.GAME_OVER:this.#c();break;case n.GAME.OVERLAY.HELP:this.#u()}}#h(){this.classList.add("game__overlay-start"),super.render(t('<img src="wargames_logo.6673790a.webp" alt=""><img src="intro.b02d6007.jpg" alt=""><button id="btn-new-game" class="generic-button">START</button>')),this.#m(),this.animateIn()}#d(){this.classList.add("game__overlay-war"),this.#o="2.5s",super.render(t('<div class="inner"> <div class="screen"> </div> <div class="header"> <p>WAR</p> </div> </div>')),this.querySelector(".screen").appendChild(this.config.options.img)}#c(){this.classList.add("game__overlay-game-over",this.state),super.render(t('<div class="inner"> <div class="msg msg-win"> <h2>You won!</h2> <p>You beat the NORAD supercomputer WOPR (War Operation Plan Response).</p> </div> <div class="msg msg-lose"> <h2>Sorry, you lost!</h2> <p>The NORAD supercomputer WOPR (War Operation Plan Response) beat you.</p> </div> <div class="msg msg-error"> <h2>Something went wrong while loading data :-(</h2> <p>Maybe WOPR is in a bad mood, please come back later.</p> </div> </div><button id="btn-new-game" class="generic-button">PLAY AGAIN</button>')),this.state!==n.GAME.ERROR&&this.#m(),this.animateIn()}#u(){this.classList.add("game__overlay-help"),super.render(t('<div class="inner"> <p><em>Beat the NORAD supercomputer WOPR (War Operation Plan Response) and prevent global thermonuclear war!</em> </p> <h2>Rules</h2> <p>War is a 2-player game. The goal is to collect the full deck to win the game.</p> <p>It uses a 52-card deck, divided equally among the players. They must stack their cards face down in front of them. Then, each player turns up a card at the same time. The one with the highest number wins and can add the two cards to the bottom of their stack.</p> <p>If it is a draw, then it is war! Each player draws a card from their stack and places it face down on the table. Then they turn up a card from the stack. The player who wins gets to collect the cards that led to war, the cards that went to “battle” and the ones facing down (6 cards in total).</p> </div>')),this.animateIn()}#m(){this.querySelector("#btn-new-game").addEventListener("click",(()=>this.animateOut().then((()=>v.instance.game.newGame()))))}animateIn(){return this.#n("animate-in")}animateOut(){return this.#o&&(this.style.animationDelay=this.#o),this.#n("animate-out")}#n(e){return this.#l=!0,new Promise((t=>{this.onanimationend=()=>{this.#l=!1,t()},this.classList.add(e)}))}}window.customElements.define("element-overlay",g);class p extends l{#g=[];#p=[];#E=[];#w;#y;#v;#f;#O;#A;#R;#_;#b;#L;#I=!0;#T;constructor(){super()}get defaults(){return{id:"game",classList:"game"}}get warImage(){return this.#T}render(){super.render(t('<button id="btn-help" class="circle-button">?</button><div class="game__stage"> <div id="slot-pile-computer" class="game__stage-slot is-hidden"> <img src="card-back-2.75829339.png"> </div> <div id="slot-card-computer" class="game__stage-slot">  </div> <div id="slot-pile-user" class="game__stage-slot game__stage-slot-button is-hidden"> <img src="card-back-2.75829339.png"> </div> <div id="slot-card-user" class="game__stage-slot">  </div> <svg class="loader__spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"/></svg> </div>')),this.#G(n.GAME.USER,"YOU").appendTo(this),this.#G(n.GAME.COMPUTER,"WOPR").prependTo(this),this.#S(),this.#P(!1),this.#M(),this.#E.push(this.#w),this.#E.push(this.querySelector("#slot-pile-"+n.GAME.COMPUTER)),this.#T=new Image,this.#T.src=r("DB6tq"),this.#v=this.#C(n.GAME.OVERLAY.START)}newGame(){this.#H(!0),this.#D(),v.instance.gameService.setupNewGame().then((e=>this.#W(e))).catch((e=>{console.error("Game.newGame"),console.error(e),this.#H(!1),this.#k()}))}#W(e){this.#g=[],this.#H(!1),this.#x(n.GAME.COMPUTER,e),this.#x(n.GAME.USER,e),this.#P(!0),this.#N(!0),this.#I&&(this.#B(!0),this.#I=!1),this.#U()}#S(){this.#w=this.querySelector("#slot-pile-"+n.GAME.USER),this.#w.addEventListener("click",(()=>{this.#P(!1),this.#B(!1),v.instance.gameService.playTurn().then((e=>{e&&this.#F(e)})).catch((e=>{console.error("Game.#btnDeal.click"),console.error(e),this.#k()}))}))}#M(){this.#y=this.querySelector("#btn-help"),this.#y.addEventListener("click",(()=>{this.#q()}))}#F(e){this.#b||(this.#g=[]),this.#R=e,this.#V(this.#R.user),this.#V(this.#R.computer),this.#Y()}#Y(){Promise.all(this.#$("in",this.#g.length-2)).then((()=>{this.#j()}))}#j(){this.#R.isWar?(this.#b=!0,this.#Q()):(this.#b=!1,setTimeout((()=>{this.#K()}),750))}#Q(){this.#_=setTimeout((()=>{this.#f=this.#C(n.GAME.OVERLAY.WAR,null,this.#T),this.#f.animateIn().then((()=>this.#f.animateOut())).then((()=>{this.#X(this.#f);let e=0;const t=t=>{t.remaining>0&&(this.#V(t,!0),e+=1)};if(t(this.#R.user),t(this.#R.computer),e>0)return Promise.all(this.#$("in",this.#g.length-e));this.#z()})).then((()=>{this.#R.isGameOver?this.#z():this.#P(!0)}))}),1e3)}#z(){this.#x(n.GAME.COMPUTER,this.#R.computer.remaining),this.#x(n.GAME.USER,this.#R.user.remaining),this.#Z()}#K(){this.#x(n.GAME.COMPUTER,this.#R.computer.remaining),this.#x(n.GAME.USER,this.#R.user.remaining),Promise.all(this.#$("out")).then((()=>{this.#J()}))}#J(){this.#ee(),this.#R.isGameOver?this.#Z():this.#P(!0)}#Z(e){e||this.#te(),this.#P(!1),this.#_=setTimeout((()=>{this.#O=this.#C(n.GAME.OVERLAY.GAME_OVER,e)}),2e3)}#te(){this.querySelector(`#slot-pile-${this.#R.loser.id}`).classList.add("lose")}#V(e,t=!1){const s=this.#g.length,i=new o({id:`game-card-${s}`,options:{pVO:e,isWarCard:t}}),a=new u(i).appendTo(this.querySelector(`#slot-card-${e.id}`));this.#g.push(a)}#$(e,t=0){t=Math.max(t,0);const s=[],i=[];for(let i=t;i<this.#g.length;i++){const t=this.#g[i];"in"===e?t.isUser?s.unshift(t):s.push(t):t.player.id===this.#R.winner.id?(t.animOutState=n.GAME.WIN,s.unshift(t)):(t.animOutState=n.GAME.LOSE,s.push(t))}return s.forEach(((t,s)=>{t.animIndex=s,"in"===e?(t.animZIndex=s,i.push(t.animateIn())):i.push(t.animateOut())})),i}#ee(){this.#g.forEach((e=>{this.#X(e)}))}#G(e,t){const s=new o({id:`game-hud-${e}`,options:{name:t,player:e}}),i=new m(s);return this.#p.push(i),i}#x(e,t,s=!1){this.#p.find((i=>{i.id===`game-hud-${e}`&&i.update(t),s&&i.classList.remove("animate-in")}))}#U(){this.#p.forEach((e=>e.animateIn()))}#se(){this.#p.forEach((e=>e.animateOut()))}#k(){this.#C(n.GAME.OVERLAY.GAME_OVER,n.GAME.ERROR)}#C(e,t,s){t=t||(this.#R?this.#R.user.state:void 0);const i=new o({id:`game-${e}`,options:{mode:e,state:t,img:s}});return new g(i).appendTo(this.querySelector(".game__stage"))}#P(e){e?this.#w.classList.remove("is-disabled"):this.#w.classList.add("is-disabled")}#H(e){const t=this.querySelector(".loader__spinner");e?t.classList.add("show"):t.classList.remove("show")}#q(){this.#A&&this.#A.isInAnimation||(this.#A?(this.#y.innerText="?",this.#A.animateOut().then((()=>{this.#X(this.#A),this.#A=void 0}))):(this.#y.innerText="X",this.#A=this.#C(n.GAME.OVERLAY.HELP)))}#B(e){e&&!this.#L?this.#L=new d(new c({mode:d.MODE_INFO,targetElement:this.#w,position:d.POSITION_TARGET,offsetX:.5*this.#w.clientWidth,offsetY:20,msg:"Click on your card stack<br>to start the next turn."})):this.#L&&(this.#L.destroy(),this.#L=void 0)}#N(e){this.#E.forEach((t=>e?t.classList.remove("is-hidden"):t.classList.add("is-hidden")))}#ie(){this.#E.forEach((e=>e.classList.remove("lose")))}#D(){this.#_&&clearTimeout(this.#_),this.#se(),this.#ee(),this.#P(!1),this.#N(!1),this.#ie(),this.#X(this.#f),this.#X(this.#v),this.#X(this.#O),this.#X(this.#A),this.#b=!1}#X(e){e&&e.destroy&&e.destroy()}}window.customElements.define("component-game",p);class E{#ae;constructor(){}async getNewDeck(e=1){const t=await this.#re(`/new/shuffle/?deck_count=${e}`);this.#ae=t.deck_id}drawFromDeck(e,t=n.API.DECK_TOP){return this.#re(`/${this.#ae}/draw/${t}?count=${e}`)}drawFromPile(e,t=1,s=n.API.DECK_BOTTOM){return this.#re(`/${this.#ae}/pile/${e}/draw/${s}?count=${t}`)}addToPile(e,t){return this.#re(`/${this.#ae}/pile/${e}/add/?cards=${t}`)}returnToDeck(e){return this.#re(`/${this.#ae}/return/?cards=${e}`)}getCardCodes(e){return e.map((e=>e.code)).join(",")}#re(e){return new Promise(((t,s)=>{n.API.LOG&&console.log("%c[API Call]"+e,"color: grey"),fetch(n.API.BASE_URL+e,{method:"GET"}).then((e=>(e.ok||s(e.statusText),e.json()))).then((e=>{n.API.LOG&&console.log("%c[API Data]","color: grey",e),t(e)})).catch((e=>{console.error("GameService.#doApiFetch.error"),s(e)}))}))}}class w{#ne;constructor(e){this.code,this.image,this.images={svg:"",png:""},this.suit,this.value,Object.assign(this,e)}get imageElement(){return this.#ne}get valueByNumber(){if(!Number.isNaN(Number.parseInt(this.value)))return+this.value;switch(this.value.toUpperCase()){case"JACK":return 11;case"QUEEN":return 12;case"KING":return 13;case"ACE":return 14}}loadImage(){return new Promise(((e,t)=>{this.#ne=new Image,this.#ne.onload=()=>{e()},this.#ne.onerror=()=>{e()},this.#ne.src=this.images.png}))}}class y{#oe;#le;#he;#de;#ce;#ue;constructor(e){this.#le=e,this.#oe=new E}get devMode(){return this.#le===n.GAME.DEV_MODE}async setupNewGame(){let e;console.clear(),console.log("%cSetting up new game...","color: yellow"),this.#he=[],this.#de=[],this.#ce=!1,this.#ue=!1;let t=n.GAME.START_PILE;this.devMode&&(e={user:"8H,4C,9S,8C",computer:"5C,4D,7S,KH"},t=e.user.split(",").length);try{return await this.#oe.getNewDeck(),await this.#me(n.GAME.USER,e),await this.#me(n.GAME.COMPUTER,e),console.log("%cConsole will always be 1 turn ahead of the interface,\nsince the next turn is preloaded in the background.","color: yellow"),console.log("-------------------"),console.log("%cNext turn","color: yellow"),await this.#ge(),console.log("%cNew game ready","color: yellow"),t}catch(e){return console.error("GameService.setupNewGame.error"),Promise.reject(e)}}async playTurn(){if(!this.#ue){console.log("-------------------"),console.log("%cNext turn","color: yellow");try{0===this.#he.length&&await this.#ge();const e=this.#he.shift();return this.#ce||this.#ge(),e}catch(e){return Promise.reject(e)}}}async#me(e,t){let s;if(t){s=await this.#oe.drawFromDeck(52);const i=t[e];let a=[];for(const e of s.cards)i.split(",").includes(e.code)||a.push(e.code);await this.#oe.addToPile(e,i),await this.#oe.returnToDeck(a)}else s=await this.#oe.drawFromDeck(n.GAME.START_PILE),await this.#oe.addToPile(e,this.#oe.getCardCodes(s.cards))}async#ge(){this.#ue=!0;try{const e=new h(n.GAME.USER),t=new h(n.GAME.COMPUTER);await this.#pe(e),await this.#pe(t),console.log("user.card: "+e.card.valueByNumber),console.log("computer.card: "+t.card.valueByNumber);let s,i,a=!1;e.card.valueByNumber===t.card.valueByNumber?(console.log("%cWAR","color: red"),a=!0,e.state=t.state=n.GAME.WAR,await this.#pe(e,!0),await this.#pe(t,!0),console.log("%cWar: ","color: red",e),console.log("%cWar: ","color: red",t)):(e.card.valueByNumber>t.card.valueByNumber?(s=e,i=t):(s=t,i=e),s.state=n.GAME.WIN,i.state=n.GAME.LOSE,await this.#Ee(s),console.log("%cWinner: ","color: lightgreen",s),console.log("%cLoser: ","color: red",i));const r=this.#we([e,t]);r&&(s=r.winner,i=r.loser,await this.#Ee(s));const o={user:e,computer:t,winner:s,loser:i,isWar:a,isGameOver:this.#ce};this.#he.push(o),this.#ue=!1}catch(e){return this.#ue=!1,console.error("%cGameService.#createTurn.error"),Promise.reject(e)}}async#pe(e,t=!1){const s=await this.#oe.drawFromPile(e.id),i=new w(s.cards[0]);t||(await i.loadImage(),e.card=i),this.#de.push(i),e.remaining=s.piles[e.id].remaining}async#Ee(e){if(this.#de.length>0){console.log("Cards in play for winner: ",this.#de);const t=await this.#oe.addToPile(e.id,this.#oe.getCardCodes(this.#de));e.remaining=t.piles[e.id].remaining,this.#de=[]}}#we(e){const t=e.find((e=>0==e.remaining));let s;return t?(t.state=n.GAME.LOSE,s=e.find((e=>0!=e.remaining)),s.state=n.GAME.WIN,this.#ce=!0,console.log("-------------------"),console.log("%cGame Over!","color: yellow"),console.log("%cWinner: ","color: lightgreen",s),console.log("%cLoser: ","color: red",t),{winner:s,loser:t}):void 0}}class v{static#ye;static get instance(){return this.#ye||(this.#ye=new v),this.#ye}#ve;#fe;constructor(){}get gameService(){return this.#ve}get game(){return this.#fe}run(){const e=new URLSearchParams(document.location.search).get("dev");this.#ve=new y(e),this.#fe=new p,document.querySelector("main").appendChild(this.#fe),this.#fe.render()}}v.instance.run();
//# sourceMappingURL=index.06dfb190.js.map
