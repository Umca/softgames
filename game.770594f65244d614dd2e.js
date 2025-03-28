!function(){var t,e={1430:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AceOfShadows=void 0;const i=s(5894),n=s(4280);class r extends n.Base{cardAmount;cardObjects=[];movingCards=[];time;cardCounter;nextZIndex;delay;constructor(t,e,s,i){super(t,e),this.name="AceOfShadows",this.delay=i,this.cardAmount=s,this.container.sortableChildren=!0,this.createCards(),this.time=0,this.nextZIndex=this.cardAmount-1,this.cardCounter=this.cardAmount-1}createCards(){for(let t=0;t<this.cardAmount;t++){let e=i.Sprite.from("joker");e.y-=t,e.zIndex=t,this.container.addChild(e);e.y,this.cardAmount;this.cardObjects.push({sprite:e,toBeRemoved:!1,zIndex:t})}}start(){super.start(),this.movingCards.push(this.cardObjects[this.cardCounter])}update(t){if(!this.isStarted)return;t/=60,this.movingCards.forEach((e=>{e.sprite.x+=t/2*400,e.sprite.x>=400&&(e.sprite.x=400,e.toBeRemoved=!0)})),this.time+=t,this.time>this.delay&&(this.time=0,this.cardCounter--,this.cardCounter>=0&&(this.nextZIndex++,this.cardObjects[this.cardCounter].sprite.zIndex=this.nextZIndex,this.movingCards.push(this.cardObjects[this.cardCounter]))),this.movingCards=this.movingCards.filter((t=>!t.toBeRemoved)),this.movingCards.length||(this.isStarted=!1)}reset(){super.reset(),this.time=0,this.cardCounter=this.cardAmount-1,this.movingCards=[],this.cardObjects.forEach((t=>{t.sprite.x=0,t.toBeRemoved=!1;t.sprite.zIndex;t.sprite.zIndex!=t.zIndex&&(t.sprite.zIndex=t.zIndex)})),this.container.sortChildren()}}e.AceOfShadows=r},4280:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Base=void 0;const i=s(5894);e.Base=class{container;isStarted;stage;pos;name="";constructor(t,e){this.stage=t,this.container=new i.Container,this.pos=e,this.container.position.set(e.x,e.y),this.stage.addChild(this.container),this.isStarted=!1,this.container.visible=!1}getName(){return this.name}getContainer(){return this.container}start(){this.container.visible=!0,this.isStarted=!0}update(t){}reset(){this.isStarted=!1,this.container.visible=!1}}},2230:function(t,e,s){"use strict";var i,n=this&&this.__createBinding||(Object.create?function(t,e,s,i){void 0===i&&(i=s);var n=Object.getOwnPropertyDescriptor(e,s);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[s]}}),Object.defineProperty(t,i,n)}:function(t,e,s,i){void 0===i&&(i=s),t[i]=e[s]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),a=this&&this.__importStar||(i=function(t){return i=Object.getOwnPropertyNames||function(t){var e=[];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[e.length]=s);return e},i(t)},function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var s=i(t),a=0;a<s.length;a++)"default"!==s[a]&&n(e,t,s[a]);return r(e,t),e});Object.defineProperty(e,"__esModule",{value:!0}),e.PhoenixFlame=void 0;const o=a(s(2098)),h=s(5894),d=s(4280),c={alpha:{start:.66,end:.1},scale:{start:.25,end:1.15,minimumScaleMultiplier:1},color:{start:"#fff191",end:"#ff622c"},speed:{start:100,end:10,minimumSpeedMultiplier:1},acceleration:{x:0,y:0},maxSpeed:0,startRotation:{min:270,max:275},noRotation:!1,rotationSpeed:{min:0,max:1},lifetime:{min:.1,max:2},blendMode:"add",frequency:.001,emitterLifetime:-1,maxParticles:100,pos:{x:0,y:0},addAtBack:!1,spawnType:"circle",spawnCircle:{x:0,y:200,r:70}};class l extends d.Base{emitter;constructor(t,e){super(t,e),this.name="PhoenixFlame",this.container=new h.ParticleContainer,this.stage.addChild(this.container),this.emitter=new o.Emitter(this.container,o.upgradeConfig(c,[h.Texture.from("fire")])),this.emitter.updateOwnerPos(this.pos.x,this.pos.y),this.container=new h.ParticleContainer(100,{scale:!0,position:!0,rotation:!0,alpha:!0}),this.stage.addChild(this.container)}start(){super.start()}reset(){super.reset(),this.emitter.cleanup()}update(t){this.isStarted&&this.emitter&&this.emitter.update(.01*t)}}e.PhoenixFlame=l},8129:function(t,e,s){"use strict";s(3284);const i=s(5894),n=s(5325),r=1920,a=1080,o=new i.Application({backgroundColor:15914188,width:r,height:a});function h(){const t=o.view;let e,s,i,n,h;e=window.innerWidth/r,s=window.innerHeight/a,i=Math.min(e,s),i<1&&(i=1),t.style.transformOrigin="0 0",t.style.transform="scale("+i+") translate(0, 0)",n=t.offsetWidth>t.offsetHeight?t.offsetWidth*i<window.innerWidth?"horizontally":"vertically":t.offsetHeight*i<window.innerHeight?"vertically":"horizontally","horizontally"===n&&(h=(window.innerWidth-t.offsetWidth*i)/2,t.style.margin=`0px ${h}px`),"vertically"===n&&(h=(window.innerHeight-t.offsetHeight*i)/2,t.style.margin=`${h}px 0px`)}o.renderer.resize(r,a),window.onload=async()=>{let t=document.createElement("div");t.classList.add("fps-meter"),await async function(){const t={bundles:[{name:"init-assets",assets:[{alias:"fire",src:"./assets/Fire.png"},{alias:"particle",src:"./assets/particle.png"},{alias:"joker",src:"./assets/card.png"},{alias:"sheldon",src:"./assets/sheldon.png"},{alias:"penny",src:"./assets/penny.png"},{alias:"leonard",src:"./assets/leonard.png"},{alias:"satisfied",src:"./assets/satisfied.png"},{alias:"sad",src:"./assets/sad.png"},{alias:"neutral",src:"./assets/neutral.png"},{alias:"laughing",src:"./assets/laughing.png"},{alias:"intrigued",src:"./assets/intrigued.png"}]}]};await i.Assets.init({manifest:t}),await i.Assets.loadBundle(["init-assets"])}(),document.body.appendChild(o.view),document.body.appendChild(t),h();const e=new n.Scene(o.stage,{width:r,height:a});o.ticker.add((s=>{e.update(s),t.innerText=`FPS: ${o.ticker.FPS.toFixed(0)}`}))},window.addEventListener("resize",h)},993:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MagicWords=void 0;const i=s(5894),n=s(4280);class r extends n.Base{dialogue;users;constructor(t,e){super(t,e),this.name="MagicWords",this.users={sheldon:{name:"Sheldon",avatar:"sheldon",position:"left"},penny:{name:"Penny",avatar:"penny",position:"left"},leonard:{name:"Leonard",avatar:"leonard",position:"right"}},this.dialogue=[{user:this.users.sheldon,text:"I admit {satisfied} the design of Cookie Crush is quite elegant in its simplicity."},{user:this.users.leonard,text:"That’s practically a compliment, Sheldon. {intrigued} Are you feeling okay?"},{user:this.users.penny,text:"Don’t worry, Leonard. He’s probably just trying to justify playing it himself."},{user:this.users.sheldon,text:"Incorrect. {neutral} I’m studying its mechanics. The progression system is oddly satisfying."},{user:this.users.penny,text:"It’s called fun, Sheldon. You should try it more often."},{user:this.users.leonard,text:"She’s got a point. Sometimes, a simple game can be relaxing."},{user:this.users.sheldon,text:"Relaxing? I suppose there’s merit in low-stakes gameplay to reduce cortisol levels."},{user:this.users.penny,text:"Translation: Sheldon likes crushing cookies but won’t admit it. {laughing}"},{user:this.users.sheldon,text:"Fine. I find the color-matching oddly soothing. Happy?"},{user:this.users.leonard,text:"Very. Now we can finally play as a team in Wordscapes."},{user:this.users.penny,text:"Wait, Sheldon’s doing team games now? What’s next, co-op decorating?"},{user:this.users.sheldon,text:"Unlikely. But if the design involves symmetry and efficiency, I may consider it."},{user:this.users.penny,text:"See? Casual gaming brings people together!"},{user:this.users.leonard,text:"Even Sheldon. That’s a win for everyone. {satisfied}"},{user:this.users.sheldon,text:"Agreed. {neutral} Though I still maintain chess simulators are superior."},{user:this.users.penny,text:"Sure, Sheldon. {intrigued} You can play chess *after* we beat this next level."}],this.renderRemarks(),this.container.pivot.x=this.container.width/2,this.container.scale.set(.6),this.container.cacheAsBitmap=!0}createRemark(t){const e=this.parseRemarkText(t.text);return this.renderRemark(e,t.user.avatar)}parseRemarkText(t){const e=[];let s=!1,i="";for(let n=0;n<t.length;n++){const r=t[n];if("{"!==r)if("}"!==r)i+=r;else{s=!1;let{sprite:t,width:n,height:r}=this.createEmodjiSprite(i);e.push({value:t,width:n,height:r}),i=""}else if(s=!0,i){let{text:t,width:s,height:n}=this.createText(i);e.push({value:t,width:s,height:n}),i=""}}if(i){let{text:t,width:s,height:n}=this.createText(i);e.push({value:t,width:s,height:n}),i=""}return e}createText(t){let e=new i.Text(t);return e.anchor.y=.5,{text:e,width:e.width,height:e.height}}createEmodjiSprite(t){let e=i.Sprite.from(t);e.scale.set(.5),e.anchor.y=.5;let{width:s,height:n}=e;return{sprite:e,width:s,height:n}}renderRemark(t,e){const s=i.Sprite.from(e),n=new i.Container;s.anchor.y=.5,n.addChild(s);let r={value:s,width:s.width,height:s.height};return t.forEach((t=>{t.value.x=r?r.value.x+r.width:0,r=t,n.addChild(t.value)})),n}renderRemarks(){this.dialogue.forEach(((t,e)=>{const s=t.user.position;let i=this.createRemark(t);i.y=100*(e+1),"right"===s&&(i.x=200),this.container.addChild(i)}))}}e.MagicWords=r},5325:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Scene=void 0;const i=s(5894),n=s(2230),r=s(1430),a=s(993);e.Scene=class{stage;magicWordButton;aceButton;flameButton;states;state=null;constructor(t,e){this.stage=t;const s=new i.Container;s.position.set(e.width/2,50),this.magicWordButton=this.createButton(9295807,"Magic Of Words",{x:-300,y:0},s),this.aceButton=this.createButton(16736427,"Ace Of Shadows",{x:0,y:0},s),this.flameButton=this.createButton(16540216,"Phoenix Flame",{x:300,y:0},s),this.states={MagicWord:new a.MagicWords(this.stage,{x:e.width/2+50,y:80}),AceShadows:new r.AceOfShadows(this.stage,{x:650,y:350},144,1),PhoenixFlame:new n.PhoenixFlame(this.stage,{x:e.width/2,y:500})},this.setState(this.states.MagicWord);let o=.88;this.magicWordButton.scale.set(o),this.magicWordButton.on("pointerup",(()=>{"MagicWords"!=this.state?.getName()&&(this.resetButtons(),this.magicWordButton.scale.set(o),this.setState(this.states.MagicWord))})),this.aceButton.on("pointerup",(()=>{"AceOfShadows"!=this.state?.getName()&&(this.resetButtons(),this.aceButton.scale.set(o),this.setState(this.states.AceShadows))})),this.flameButton.on("pointerup",(()=>{"PhoenixFlame"!=this.state?.getName()&&(this.resetButtons(),this.flameButton.scale.set(o),this.setState(this.states.PhoenixFlame))})),this.stage.addChild(s)}update(t){this.state&&this.state.update(t)}resetButtons(){this.magicWordButton.scale.set(1),this.flameButton.scale.set(1),this.aceButton.scale.set(1)}setState(t){this.state&&this.state.reset(),this.state=t,this.state.start()}createButton(t,e,s,n){const r=new i.Container;let a=250,o=70;const h=new i.Graphics;h.beginFill(t),h.drawRoundedRect(0,0,a,o,5),h.pivot.x=a/2,h.pivot.y=o/2,r.addChild(h);const d=new i.Text(e,{fill:"#ffffff",stroke:"#f0eaea",strokeThickness:2});return d.anchor.set(.5),r.addChild(d),r.interactive=!0,r.position.set(s.x,s.y),n.addChild(r),r}}},3284:function(t,e,s){"use strict";s.r(e)},2634:function(){}},s={};function i(t){var n=s[t];if(void 0!==n)return n.exports;var r=s[t]={id:t,loaded:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.loaded=!0,r.exports}i.m=e,t=[],i.O=function(e,s,n,r){if(!s){var a=1/0;for(c=0;c<t.length;c++){s=t[c][0],n=t[c][1],r=t[c][2];for(var o=!0,h=0;h<s.length;h++)(!1&r||a>=r)&&Object.keys(i.O).every((function(t){return i.O[t](s[h])}))?s.splice(h--,1):(o=!1,r<a&&(a=r));if(o){t.splice(c--,1);var d=n();void 0!==d&&(e=d)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[s,n,r]},i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t},function(){var t={792:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,r,a=s[0],o=s[1],h=s[2],d=0;if(a.some((function(e){return 0!==t[e]}))){for(n in o)i.o(o,n)&&(i.m[n]=o[n]);if(h)var c=h(i)}for(e&&e(s);d<a.length;d++)r=a[d],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(c)},s=self.webpackChunkSoftgames_task=self.webpackChunkSoftgames_task||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var n=i.O(void 0,[745],(function(){return i(8129)}));n=i.O(n)}();