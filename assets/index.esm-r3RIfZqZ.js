import{g as Re,F as ul,L as ll,j as Ot,k as cl,l as hl,S as fl,_ as dl,C as ml,r as Qi,m as gl,n as Wo,d as pl,a as _l,p as yl,q as El,u as Tl,e as Il,s as vl}from"./index.esm-CIvlP5Sc.js";var Wi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qt,Ho;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,m){function _(){}_.prototype=m.prototype,E.F=m.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(T,y,A){for(var p=Array(arguments.length-2),Et=2;Et<arguments.length;Et++)p[Et-2]=arguments[Et];return m.prototype[y].apply(T,p)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,m,_){_||(_=0);const T=Array(16);if(typeof m=="string")for(var y=0;y<16;++y)T[y]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(y=0;y<16;++y)T[y]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=E.g[0],_=E.g[1],y=E.g[2];let A=E.g[3],p;p=m+(A^_&(y^A))+T[0]+3614090360&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(y^m&(_^y))+T[1]+3905402710&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(_^A&(m^_))+T[2]+606105819&4294967295,y=A+(p<<17&4294967295|p>>>15),p=_+(m^y&(A^m))+T[3]+3250441966&4294967295,_=y+(p<<22&4294967295|p>>>10),p=m+(A^_&(y^A))+T[4]+4118548399&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(y^m&(_^y))+T[5]+1200080426&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(_^A&(m^_))+T[6]+2821735955&4294967295,y=A+(p<<17&4294967295|p>>>15),p=_+(m^y&(A^m))+T[7]+4249261313&4294967295,_=y+(p<<22&4294967295|p>>>10),p=m+(A^_&(y^A))+T[8]+1770035416&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(y^m&(_^y))+T[9]+2336552879&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(_^A&(m^_))+T[10]+4294925233&4294967295,y=A+(p<<17&4294967295|p>>>15),p=_+(m^y&(A^m))+T[11]+2304563134&4294967295,_=y+(p<<22&4294967295|p>>>10),p=m+(A^_&(y^A))+T[12]+1804603682&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(y^m&(_^y))+T[13]+4254626195&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(_^A&(m^_))+T[14]+2792965006&4294967295,y=A+(p<<17&4294967295|p>>>15),p=_+(m^y&(A^m))+T[15]+1236535329&4294967295,_=y+(p<<22&4294967295|p>>>10),p=m+(y^A&(_^y))+T[1]+4129170786&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^y&(m^_))+T[6]+3225465664&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^_&(A^m))+T[11]+643717713&4294967295,y=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(y^A))+T[0]+3921069994&4294967295,_=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(_^y))+T[5]+3593408605&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^y&(m^_))+T[10]+38016083&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^_&(A^m))+T[15]+3634488961&4294967295,y=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(y^A))+T[4]+3889429448&4294967295,_=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(_^y))+T[9]+568446438&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^y&(m^_))+T[14]+3275163606&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^_&(A^m))+T[3]+4107603335&4294967295,y=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(y^A))+T[8]+1163531501&4294967295,_=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(_^y))+T[13]+2850285829&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^y&(m^_))+T[2]+4243563512&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^_&(A^m))+T[7]+1735328473&4294967295,y=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(y^A))+T[12]+2368359562&4294967295,_=y+(p<<20&4294967295|p>>>12),p=m+(_^y^A)+T[5]+4294588738&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^y)+T[8]+2272392833&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^_)+T[11]+1839030562&4294967295,y=A+(p<<16&4294967295|p>>>16),p=_+(y^A^m)+T[14]+4259657740&4294967295,_=y+(p<<23&4294967295|p>>>9),p=m+(_^y^A)+T[1]+2763975236&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^y)+T[4]+1272893353&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^_)+T[7]+4139469664&4294967295,y=A+(p<<16&4294967295|p>>>16),p=_+(y^A^m)+T[10]+3200236656&4294967295,_=y+(p<<23&4294967295|p>>>9),p=m+(_^y^A)+T[13]+681279174&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^y)+T[0]+3936430074&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^_)+T[3]+3572445317&4294967295,y=A+(p<<16&4294967295|p>>>16),p=_+(y^A^m)+T[6]+76029189&4294967295,_=y+(p<<23&4294967295|p>>>9),p=m+(_^y^A)+T[9]+3654602809&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^y)+T[12]+3873151461&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^_)+T[15]+530742520&4294967295,y=A+(p<<16&4294967295|p>>>16),p=_+(y^A^m)+T[2]+3299628645&4294967295,_=y+(p<<23&4294967295|p>>>9),p=m+(y^(_|~A))+T[0]+4096336452&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~y))+T[7]+1126891415&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~_))+T[14]+2878612391&4294967295,y=A+(p<<15&4294967295|p>>>17),p=_+(A^(y|~m))+T[5]+4237533241&4294967295,_=y+(p<<21&4294967295|p>>>11),p=m+(y^(_|~A))+T[12]+1700485571&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~y))+T[3]+2399980690&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~_))+T[10]+4293915773&4294967295,y=A+(p<<15&4294967295|p>>>17),p=_+(A^(y|~m))+T[1]+2240044497&4294967295,_=y+(p<<21&4294967295|p>>>11),p=m+(y^(_|~A))+T[8]+1873313359&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~y))+T[15]+4264355552&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~_))+T[6]+2734768916&4294967295,y=A+(p<<15&4294967295|p>>>17),p=_+(A^(y|~m))+T[13]+1309151649&4294967295,_=y+(p<<21&4294967295|p>>>11),p=m+(y^(_|~A))+T[4]+4149444226&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~y))+T[11]+3174756917&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~_))+T[2]+718787259&4294967295,y=A+(p<<15&4294967295|p>>>17),p=_+(A^(y|~m))+T[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(y+(p<<21&4294967295|p>>>11))&4294967295,E.g[2]=E.g[2]+y&4294967295,E.g[3]=E.g[3]+A&4294967295}n.prototype.v=function(E,m){m===void 0&&(m=E.length);const _=m-this.blockSize,T=this.C;let y=this.h,A=0;for(;A<m;){if(y==0)for(;A<=_;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<m;)if(T[y++]=E.charCodeAt(A++),y==this.blockSize){i(this,T),y=0;break}}else for(;A<m;)if(T[y++]=E[A++],y==this.blockSize){i(this,T),y=0;break}}this.h=y,this.o+=m},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;m=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=m&255,m/=256;for(this.v(E),E=Array(16),m=0,_=0;_<4;++_)for(let T=0;T<32;T+=8)E[m++]=this.g[_]>>>T&255;return E};function o(E,m){var _=c;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=m(E)}function u(E,m){this.h=m;const _=[];let T=!0;for(let y=E.length-1;y>=0;y--){const A=E[y]|0;T&&A==m||(_[y]=A,T=!1)}this.g=_}var c={};function h(E){return-128<=E&&E<128?o(E,function(m){return new u([m|0],m<0?-1:0)}):new u([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return I;if(E<0)return N(d(-E));const m=[];let _=1;for(let T=0;E>=_;T++)m[T]=E/_|0,_*=4294967296;return new u(m,0)}function g(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return N(g(E.substring(1),m));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(m,8));let T=I;for(let A=0;A<E.length;A+=8){var y=Math.min(8,E.length-A);const p=parseInt(E.substring(A,A+y),m);y<8?(y=d(Math.pow(m,y)),T=T.j(y).add(d(p))):(T=T.j(_),T=T.add(d(p)))}return T}var I=h(0),P=h(1),S=h(16777216);r=u.prototype,r.m=function(){if(x(this))return-N(this).m();let E=0,m=1;for(let _=0;_<this.g.length;_++){const T=this.i(_);E+=(T>=0?T:4294967296+T)*m,m*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(M(this))return"0";if(x(this))return"-"+N(this).toString(E);const m=d(Math.pow(E,6));var _=this;let T="";for(;;){const y=ft(_,m).g;_=K(_,y.j(m));let A=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=y,M(_))return A+T;for(;A.length<6;)A="0"+A;T=A+T}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function M(E){if(E.h!=0)return!1;for(let m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function x(E){return E.h==-1}r.l=function(E){return E=K(this,E),x(E)?-1:M(E)?0:1};function N(E){const m=E.g.length,_=[];for(let T=0;T<m;T++)_[T]=~E.g[T];return new u(_,~E.h).add(P)}r.abs=function(){return x(this)?N(this):this},r.add=function(E){const m=Math.max(this.g.length,E.g.length),_=[];let T=0;for(let y=0;y<=m;y++){let A=T+(this.i(y)&65535)+(E.i(y)&65535),p=(A>>>16)+(this.i(y)>>>16)+(E.i(y)>>>16);T=p>>>16,A&=65535,p&=65535,_[y]=p<<16|A}return new u(_,_[_.length-1]&-2147483648?-1:0)};function K(E,m){return E.add(N(m))}r.j=function(E){if(M(this)||M(E))return I;if(x(this))return x(E)?N(this).j(N(E)):N(N(this).j(E));if(x(E))return N(this.j(N(E)));if(this.l(S)<0&&E.l(S)<0)return d(this.m()*E.m());const m=this.g.length+E.g.length,_=[];for(var T=0;T<2*m;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(let y=0;y<E.g.length;y++){const A=this.i(T)>>>16,p=this.i(T)&65535,Et=E.i(y)>>>16,ne=E.i(y)&65535;_[2*T+2*y]+=p*ne,G(_,2*T+2*y),_[2*T+2*y+1]+=A*ne,G(_,2*T+2*y+1),_[2*T+2*y+1]+=p*Et,G(_,2*T+2*y+1),_[2*T+2*y+2]+=A*Et,G(_,2*T+2*y+2)}for(E=0;E<m;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=m;E<2*m;E++)_[E]=0;return new u(_,0)};function G(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function W(E,m){this.g=E,this.h=m}function ft(E,m){if(M(m))throw Error("division by zero");if(M(E))return new W(I,I);if(x(E))return m=ft(N(E),m),new W(N(m.g),N(m.h));if(x(m))return m=ft(E,N(m)),new W(N(m.g),m.h);if(E.g.length>30){if(x(E)||x(m))throw Error("slowDivide_ only works with positive integers.");for(var _=P,T=m;T.l(E)<=0;)_=It(_),T=It(T);var y=st(_,1),A=st(T,1);for(T=st(T,2),_=st(_,2);!M(T);){var p=A.add(T);p.l(E)<=0&&(y=y.add(_),A=p),T=st(T,1),_=st(_,1)}return m=K(E,y.j(m)),new W(y,m)}for(y=I;E.l(m)>=0;){for(_=Math.max(1,Math.floor(E.m()/m.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),A=d(_),p=A.j(m);x(p)||p.l(E)>0;)_-=T,A=d(_),p=A.j(m);M(A)&&(A=P),y=y.add(A),E=K(E,p)}return new W(y,E)}r.B=function(E){return ft(this,E).h},r.and=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)&E.i(T);return new u(_,this.h&E.h)},r.or=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)|E.i(T);return new u(_,this.h|E.h)},r.xor=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)^E.i(T);return new u(_,this.h^E.h)};function It(E){const m=E.g.length+1,_=[];for(let T=0;T<m;T++)_[T]=E.i(T)<<1|E.i(T-1)>>>31;return new u(_,E.h)}function st(E,m){const _=m>>5;m%=32;const T=E.g.length-_,y=[];for(let A=0;A<T;A++)y[A]=m>0?E.i(A+_)>>>m|E.i(A+_+1)<<32-m:E.i(A+_);return new u(y,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Ho=n,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.B,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=d,u.fromString=g,Qt=u}).apply(typeof Wi<"u"?Wi:typeof self<"u"?self:typeof window<"u"?window:{});var Ln=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xo,Ze,Yo,Bn,Wr,Jo,Zo,ta;(function(){var r,t=Object.defineProperty;function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ln=="object"&&Ln];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var n=e(this);function i(s,a){if(a)t:{var l=n;s=s.split(".");for(var f=0;f<s.length-1;f++){var v=s[f];if(!(v in l))break t;l=l[v]}s=s[s.length-1],f=l[s],a=a(f),a!=f&&a!=null&&t(l,s,{configurable:!0,writable:!0,value:a})}}i("Symbol.dispose",function(s){return s||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(s){return s||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(s){return s||function(a){var l=[],f;for(f in a)Object.prototype.hasOwnProperty.call(a,f)&&l.push([f,a[f]]);return l}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},u=this||self;function c(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function h(s,a,l){return s.call.apply(s.bind,arguments)}function d(s,a,l){return d=h,d.apply(null,arguments)}function g(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var f=l.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function I(s,a){function l(){}l.prototype=a.prototype,s.Z=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Ob=function(f,v,w){for(var C=Array(arguments.length-2),U=2;U<arguments.length;U++)C[U-2]=arguments[U];return a.prototype[v].apply(f,C)}}var P=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?s=>s&&AsyncContext.Snapshot.wrap(s):s=>s;function S(s){const a=s.length;if(a>0){const l=Array(a);for(let f=0;f<a;f++)l[f]=s[f];return l}return[]}function M(s,a){for(let f=1;f<arguments.length;f++){const v=arguments[f];var l=typeof v;if(l=l!="object"?l:v?Array.isArray(v)?"array":l:"null",l=="array"||l=="object"&&typeof v.length=="number"){l=s.length||0;const w=v.length||0;s.length=l+w;for(let C=0;C<w;C++)s[l+C]=v[C]}else s.push(v)}}class x{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return this.h>0?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function N(s){u.setTimeout(()=>{throw s},0)}function K(){var s=E;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class G{constructor(){this.h=this.g=null}add(a,l){const f=W.get();f.set(a,l),this.h?this.h.next=f:this.g=f,this.h=f}}var W=new x(()=>new ft,s=>s.reset());class ft{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let It,st=!1,E=new G,m=()=>{const s=Promise.resolve(void 0);It=()=>{s.then(_)}};function _(){for(var s;s=K();){try{s.h.call(s.g)}catch(l){N(l)}var a=W;a.j(s),a.h<100&&(a.h++,s.next=a.g,a.g=s)}st=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var A=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};u.addEventListener("test",l,a),u.removeEventListener("test",l,a)}catch{}return s})();function p(s){return/^[\s\xa0]*$/.test(s)}function Et(s,a){y.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s&&this.init(s,a)}I(Et,y),Et.prototype.init=function(s,a){const l=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget,a||(l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement)),this.relatedTarget=a,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=s.pointerType,this.state=s.state,this.i=s,s.defaultPrevented&&Et.Z.h.call(this)},Et.prototype.h=function(){Et.Z.h.call(this);const s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var ne="closure_listenable_"+(Math.random()*1e6|0),Du=0;function bu(s,a,l,f,v){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!f,this.ha=v,this.key=++Du,this.da=this.fa=!1}function vn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function An(s,a,l){for(const f in s)a.call(l,s[f],f,s)}function Nu(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function Ks(s){const a={};for(const l in s)a[l]=s[l];return a}const Qs="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ws(s,a){let l,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(l in f)s[l]=f[l];for(let w=0;w<Qs.length;w++)l=Qs[w],Object.prototype.hasOwnProperty.call(f,l)&&(s[l]=f[l])}}function wn(s){this.src=s,this.g={},this.h=0}wn.prototype.add=function(s,a,l,f,v){const w=s.toString();s=this.g[w],s||(s=this.g[w]=[],this.h++);const C=Tr(s,a,f,v);return C>-1?(a=s[C],l||(a.fa=!1)):(a=new bu(a,this.src,w,!!f,v),a.fa=l,s.push(a)),a};function Er(s,a){const l=a.type;if(l in s.g){var f=s.g[l],v=Array.prototype.indexOf.call(f,a,void 0),w;(w=v>=0)&&Array.prototype.splice.call(f,v,1),w&&(vn(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function Tr(s,a,l,f){for(let v=0;v<s.length;++v){const w=s[v];if(!w.da&&w.listener==a&&w.capture==!!l&&w.ha==f)return v}return-1}var Ir="closure_lm_"+(Math.random()*1e6|0),vr={};function Hs(s,a,l,f,v){if(Array.isArray(a)){for(let w=0;w<a.length;w++)Hs(s,a[w],l,f,v);return null}return l=Js(l),s&&s[ne]?s.J(a,l,c(f)?!!f.capture:!1,v):ku(s,a,l,!1,f,v)}function ku(s,a,l,f,v,w){if(!a)throw Error("Invalid event type");const C=c(v)?!!v.capture:!!v;let U=wr(s);if(U||(s[Ir]=U=new wn(s)),l=U.add(a,l,f,C,w),l.proxy)return l;if(f=xu(),l.proxy=f,f.src=s,f.listener=l,s.addEventListener)A||(v=C),v===void 0&&(v=!1),s.addEventListener(a.toString(),f,v);else if(s.attachEvent)s.attachEvent(Ys(a.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return l}function xu(){function s(l){return a.call(s.src,s.listener,l)}const a=Mu;return s}function Xs(s,a,l,f,v){if(Array.isArray(a))for(var w=0;w<a.length;w++)Xs(s,a[w],l,f,v);else f=c(f)?!!f.capture:!!f,l=Js(l),s&&s[ne]?(s=s.i,w=String(a).toString(),w in s.g&&(a=s.g[w],l=Tr(a,l,f,v),l>-1&&(vn(a[l]),Array.prototype.splice.call(a,l,1),a.length==0&&(delete s.g[w],s.h--)))):s&&(s=wr(s))&&(a=s.g[a.toString()],s=-1,a&&(s=Tr(a,l,f,v)),(l=s>-1?a[s]:null)&&Ar(l))}function Ar(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[ne])Er(a.i,s);else{var l=s.type,f=s.proxy;a.removeEventListener?a.removeEventListener(l,f,s.capture):a.detachEvent?a.detachEvent(Ys(l),f):a.addListener&&a.removeListener&&a.removeListener(f),(l=wr(a))?(Er(l,s),l.h==0&&(l.src=null,a[Ir]=null)):vn(s)}}}function Ys(s){return s in vr?vr[s]:vr[s]="on"+s}function Mu(s,a){if(s.da)s=!0;else{a=new Et(a,this);const l=s.listener,f=s.ha||s.src;s.fa&&Ar(s),s=l.call(f,a)}return s}function wr(s){return s=s[Ir],s instanceof wn?s:null}var Rr="__closure_events_fn_"+(Math.random()*1e9>>>0);function Js(s){return typeof s=="function"?s:(s[Rr]||(s[Rr]=function(a){return s.handleEvent(a)}),s[Rr])}function dt(){T.call(this),this.i=new wn(this),this.M=this,this.G=null}I(dt,T),dt.prototype[ne]=!0,dt.prototype.removeEventListener=function(s,a,l,f){Xs(this,s,a,l,f)};function _t(s,a){var l,f=s.G;if(f)for(l=[];f;f=f.G)l.push(f);if(s=s.M,f=a.type||a,typeof a=="string")a=new y(a,s);else if(a instanceof y)a.target=a.target||s;else{var v=a;a=new y(f,s),Ws(a,v)}v=!0;let w,C;if(l)for(C=l.length-1;C>=0;C--)w=a.g=l[C],v=Rn(w,f,!0,a)&&v;if(w=a.g=s,v=Rn(w,f,!0,a)&&v,v=Rn(w,f,!1,a)&&v,l)for(C=0;C<l.length;C++)w=a.g=l[C],v=Rn(w,f,!1,a)&&v}dt.prototype.N=function(){if(dt.Z.N.call(this),this.i){var s=this.i;for(const a in s.g){const l=s.g[a];for(let f=0;f<l.length;f++)vn(l[f]);delete s.g[a],s.h--}}this.G=null},dt.prototype.J=function(s,a,l,f){return this.i.add(String(s),a,!1,l,f)},dt.prototype.K=function(s,a,l,f){return this.i.add(String(s),a,!0,l,f)};function Rn(s,a,l,f){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();let v=!0;for(let w=0;w<a.length;++w){const C=a[w];if(C&&!C.da&&C.capture==l){const U=C.listener,it=C.ha||C.src;C.fa&&Er(s.i,C),v=U.call(it,f)!==!1&&v}}return v&&!f.defaultPrevented}function Ou(s,a){if(typeof s!="function")if(s&&typeof s.handleEvent=="function")s=d(s.handleEvent,s);else throw Error("Invalid listener argument");return Number(a)>2147483647?-1:u.setTimeout(s,a||0)}function Zs(s){s.g=Ou(()=>{s.g=null,s.i&&(s.i=!1,Zs(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class Lu extends T{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Zs(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Le(s){T.call(this),this.h=s,this.g={}}I(Le,T);var ti=[];function ei(s){An(s.g,function(a,l){this.g.hasOwnProperty(l)&&Ar(a)},s),s.g={}}Le.prototype.N=function(){Le.Z.N.call(this),ei(this)},Le.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Vr=u.JSON.stringify,Fu=u.JSON.parse,Uu=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function ni(){}function ri(){}var Fe={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Pr(){y.call(this,"d")}I(Pr,y);function Sr(){y.call(this,"c")}I(Sr,y);var re={},si=null;function Vn(){return si=si||new dt}re.Ia="serverreachability";function ii(s){y.call(this,re.Ia,s)}I(ii,y);function Ue(s){const a=Vn();_t(a,new ii(a))}re.STAT_EVENT="statevent";function oi(s,a){y.call(this,re.STAT_EVENT,s),this.stat=a}I(oi,y);function yt(s){const a=Vn();_t(a,new oi(a,s))}re.Ja="timingevent";function ai(s,a){y.call(this,re.Ja,s),this.size=a}I(ai,y);function qe(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},a)}function je(){this.g=!0}je.prototype.ua=function(){this.g=!1};function qu(s,a,l,f,v,w){s.info(function(){if(s.g)if(w){var C="",U=w.split("&");for(let $=0;$<U.length;$++){var it=U[$].split("=");if(it.length>1){const at=it[0];it=it[1];const St=at.split("_");C=St.length>=2&&St[1]=="type"?C+(at+"="+it+"&"):C+(at+"=redacted&")}}}else C=null;else C=w;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+a+`
`+l+`
`+C})}function ju(s,a,l,f,v,w,C){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+a+`
`+l+`
`+w+" "+C})}function pe(s,a,l,f){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+zu(s,l)+(f?" "+f:"")})}function Bu(s,a){s.info(function(){return"TIMEOUT: "+a})}je.prototype.info=function(){};function zu(s,a){if(!s.g)return a;if(!a)return null;try{const w=JSON.parse(a);if(w){for(s=0;s<w.length;s++)if(Array.isArray(w[s])){var l=w[s];if(!(l.length<2)){var f=l[1];if(Array.isArray(f)&&!(f.length<1)){var v=f[0];if(v!="noop"&&v!="stop"&&v!="close")for(let C=1;C<f.length;C++)f[C]=""}}}}return Vr(w)}catch{return a}}var Pn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ui={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},li;function Cr(){}I(Cr,ni),Cr.prototype.g=function(){return new XMLHttpRequest},li=new Cr;function Be(s){return encodeURIComponent(String(s))}function Gu(s){var a=1;s=s.split(":");const l=[];for(;a>0&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function qt(s,a,l,f){this.j=s,this.i=a,this.l=l,this.S=f||1,this.V=new Le(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ci}function ci(){this.i=null,this.g="",this.h=!1}var hi={},Dr={};function br(s,a,l){s.M=1,s.A=Cn(Pt(a)),s.u=l,s.R=!0,fi(s,null)}function fi(s,a){s.F=Date.now(),Sn(s),s.B=Pt(s.A);var l=s.B,f=s.S;Array.isArray(f)||(f=[String(f)]),Ri(l.i,"t",f),s.C=0,l=s.j.L,s.h=new ci,s.g=zi(s.j,l?a:null,!s.u),s.P>0&&(s.O=new Lu(d(s.Y,s,s.g),s.P)),a=s.V,l=s.g,f=s.ba;var v="readystatechange";Array.isArray(v)||(v&&(ti[0]=v.toString()),v=ti);for(let w=0;w<v.length;w++){const C=Hs(l,v[w],f||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=s.J?Ks(s.J):{},s.u?(s.v||(s.v="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.B,s.v,s.u,a)):(s.v="GET",s.g.ea(s.B,s.v,null,a)),Ue(),qu(s.i,s.v,s.B,s.l,s.S,s.u)}qt.prototype.ba=function(s){s=s.target;const a=this.O;a&&zt(s)==3?a.j():this.Y(s)},qt.prototype.Y=function(s){try{if(s==this.g)t:{const U=zt(this.g),it=this.g.ya(),$=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||Ni(this.g)))){this.K||U!=4||it==7||(it==8||$<=0?Ue(3):Ue(2)),Nr(this);var a=this.g.ca();this.X=a;var l=$u(this);if(this.o=a==200,ju(this.i,this.v,this.B,this.l,this.S,U,a),this.o){if(this.U&&!this.L){e:{if(this.g){var f,v=this.g;if((f=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(f)){var w=f;break e}}w=null}if(s=w)pe(this.i,this.l,s,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,kr(this,s);else{this.o=!1,this.m=3,yt(12),se(this),ze(this);break t}}if(this.R){s=!0;let at;for(;!this.K&&this.C<l.length;)if(at=Ku(this,l),at==Dr){U==4&&(this.m=4,yt(14),s=!1),pe(this.i,this.l,null,"[Incomplete Response]");break}else if(at==hi){this.m=4,yt(15),pe(this.i,this.l,l,"[Invalid Chunk]"),s=!1;break}else pe(this.i,this.l,at,null),kr(this,at);if(di(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||l.length!=0||this.h.h||(this.m=1,yt(16),s=!1),this.o=this.o&&s,!s)pe(this.i,this.l,l,"[Invalid Chunked Response]"),se(this),ze(this);else if(l.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),jr(C),C.P=!0,yt(11))}}else pe(this.i,this.l,l,null),kr(this,l);U==4&&se(this),this.o&&!this.K&&(U==4?Ui(this.j,this):(this.o=!1,Sn(this)))}else ol(this.g),a==400&&l.indexOf("Unknown SID")>0?(this.m=3,yt(12)):(this.m=0,yt(13)),se(this),ze(this)}}}catch{}finally{}};function $u(s){if(!di(s))return s.g.la();const a=Ni(s.g);if(a==="")return"";let l="";const f=a.length,v=zt(s.g)==4;if(!s.h.i){if(typeof TextDecoder>"u")return se(s),ze(s),"";s.h.i=new u.TextDecoder}for(let w=0;w<f;w++)s.h.h=!0,l+=s.h.i.decode(a[w],{stream:!(v&&w==f-1)});return a.length=0,s.h.g+=l,s.C=0,s.h.g}function di(s){return s.g?s.v=="GET"&&s.M!=2&&s.j.Aa:!1}function Ku(s,a){var l=s.C,f=a.indexOf(`
`,l);return f==-1?Dr:(l=Number(a.substring(l,f)),isNaN(l)?hi:(f+=1,f+l>a.length?Dr:(a=a.slice(f,f+l),s.C=f+l,a)))}qt.prototype.cancel=function(){this.K=!0,se(this)};function Sn(s){s.T=Date.now()+s.H,mi(s,s.H)}function mi(s,a){if(s.D!=null)throw Error("WatchDog timer not null");s.D=qe(d(s.aa,s),a)}function Nr(s){s.D&&(u.clearTimeout(s.D),s.D=null)}qt.prototype.aa=function(){this.D=null;const s=Date.now();s-this.T>=0?(Bu(this.i,this.B),this.M!=2&&(Ue(),yt(17)),se(this),this.m=2,ze(this)):mi(this,this.T-s)};function ze(s){s.j.I==0||s.K||Ui(s.j,s)}function se(s){Nr(s);var a=s.O;a&&typeof a.dispose=="function"&&a.dispose(),s.O=null,ei(s.V),s.g&&(a=s.g,s.g=null,a.abort(),a.dispose())}function kr(s,a){try{var l=s.j;if(l.I!=0&&(l.g==s||xr(l.h,s))){if(!s.L&&xr(l.h,s)&&l.I==3){try{var f=l.Ba.g.parse(a)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){t:if(!l.v){if(l.g)if(l.g.F+3e3<s.F)xn(l),Nn(l);else break t;qr(l),yt(18)}}else l.xa=v[1],0<l.xa-l.K&&v[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=qe(d(l.Va,l),6e3));_i(l.h)<=1&&l.ta&&(l.ta=void 0)}else oe(l,11)}else if((s.L||l.g==s)&&xn(l),!p(a))for(v=l.Ba.g.parse(a),a=0;a<v.length;a++){let $=v[a];const at=$[0];if(!(at<=l.K))if(l.K=at,$=$[1],l.I==2)if($[0]=="c"){l.M=$[1],l.ba=$[2];const St=$[3];St!=null&&(l.ka=St,l.j.info("VER="+l.ka));const ae=$[4];ae!=null&&(l.za=ae,l.j.info("SVER="+l.za));const Gt=$[5];Gt!=null&&typeof Gt=="number"&&Gt>0&&(f=1.5*Gt,l.O=f,l.j.info("backChannelRequestTimeoutMs_="+f)),f=l;const $t=s.g;if($t){const On=$t.g?$t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(On){var w=f.h;w.g||On.indexOf("spdy")==-1&&On.indexOf("quic")==-1&&On.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(Mr(w,w.h),w.h=null))}if(f.G){const Br=$t.g?$t.g.getResponseHeader("X-HTTP-Session-Id"):null;Br&&(f.wa=Br,H(f.J,f.G,Br))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-s.F,l.j.info("Handshake RTT: "+l.T+"ms")),f=l;var C=s;if(f.na=Bi(f,f.L?f.ba:null,f.W),C.L){yi(f.h,C);var U=C,it=f.O;it&&(U.H=it),U.D&&(Nr(U),Sn(U)),f.g=C}else Li(f);l.i.length>0&&kn(l)}else $[0]!="stop"&&$[0]!="close"||oe(l,7);else l.I==3&&($[0]=="stop"||$[0]=="close"?$[0]=="stop"?oe(l,7):Ur(l):$[0]!="noop"&&l.l&&l.l.qa($),l.A=0)}}Ue(4)}catch{}}var Qu=class{constructor(s,a){this.g=s,this.map=a}};function gi(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=s.length>0&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function pi(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function _i(s){return s.h?1:s.g?s.g.size:0}function xr(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function Mr(s,a){s.g?s.g.add(a):s.h=a}function yi(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}gi.prototype.cancel=function(){if(this.i=Ei(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Ei(s){if(s.h!=null)return s.i.concat(s.h.G);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.G);return a}return S(s.i)}var Ti=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Wu(s,a){if(s){s=s.split("&");for(let l=0;l<s.length;l++){const f=s[l].indexOf("=");let v,w=null;f>=0?(v=s[l].substring(0,f),w=s[l].substring(f+1)):v=s[l],a(v,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function jt(s){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let a;s instanceof jt?(this.l=s.l,Ge(this,s.j),this.o=s.o,this.g=s.g,$e(this,s.u),this.h=s.h,Or(this,Vi(s.i)),this.m=s.m):s&&(a=String(s).match(Ti))?(this.l=!1,Ge(this,a[1]||"",!0),this.o=Ke(a[2]||""),this.g=Ke(a[3]||"",!0),$e(this,a[4]),this.h=Ke(a[5]||"",!0),Or(this,a[6]||"",!0),this.m=Ke(a[7]||"")):(this.l=!1,this.i=new We(null,this.l))}jt.prototype.toString=function(){const s=[];var a=this.j;a&&s.push(Qe(a,Ii,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(Qe(a,Ii,!0),"@"),s.push(Be(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&s.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(Qe(l,l.charAt(0)=="/"?Yu:Xu,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",Qe(l,Zu)),s.join("")},jt.prototype.resolve=function(s){const a=Pt(this);let l=!!s.j;l?Ge(a,s.j):l=!!s.o,l?a.o=s.o:l=!!s.g,l?a.g=s.g:l=s.u!=null;var f=s.h;if(l)$e(a,s.u);else if(l=!!s.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var v=a.h.lastIndexOf("/");v!=-1&&(f=a.h.slice(0,v+1)+f)}if(v=f,v==".."||v==".")f="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){f=v.lastIndexOf("/",0)==0,v=v.split("/");const w=[];for(let C=0;C<v.length;){const U=v[C++];U=="."?f&&C==v.length&&w.push(""):U==".."?((w.length>1||w.length==1&&w[0]!="")&&w.pop(),f&&C==v.length&&w.push("")):(w.push(U),f=!0)}f=w.join("/")}else f=v}return l?a.h=f:l=s.i.toString()!=="",l?Or(a,Vi(s.i)):l=!!s.m,l&&(a.m=s.m),a};function Pt(s){return new jt(s)}function Ge(s,a,l){s.j=l?Ke(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function $e(s,a){if(a){if(a=Number(a),isNaN(a)||a<0)throw Error("Bad port number "+a);s.u=a}else s.u=null}function Or(s,a,l){a instanceof We?(s.i=a,tl(s.i,s.l)):(l||(a=Qe(a,Ju)),s.i=new We(a,s.l))}function H(s,a,l){s.i.set(a,l)}function Cn(s){return H(s,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),s}function Ke(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Qe(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,Hu),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Hu(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Ii=/[#\/\?@]/g,Xu=/[#\?:]/g,Yu=/[#\?]/g,Ju=/[#\?@]/g,Zu=/#/g;function We(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function ie(s){s.g||(s.g=new Map,s.h=0,s.i&&Wu(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}r=We.prototype,r.add=function(s,a){ie(this),this.i=null,s=_e(this,s);let l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function vi(s,a){ie(s),a=_e(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function Ai(s,a){return ie(s),a=_e(s,a),s.g.has(a)}r.forEach=function(s,a){ie(this),this.g.forEach(function(l,f){l.forEach(function(v){s.call(a,v,f,this)},this)},this)};function wi(s,a){ie(s);let l=[];if(typeof a=="string")Ai(s,a)&&(l=l.concat(s.g.get(_e(s,a))));else for(s=Array.from(s.g.values()),a=0;a<s.length;a++)l=l.concat(s[a]);return l}r.set=function(s,a){return ie(this),this.i=null,s=_e(this,s),Ai(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},r.get=function(s,a){return s?(s=wi(this,s),s.length>0?String(s[0]):a):a};function Ri(s,a,l){vi(s,a),l.length>0&&(s.i=null,s.g.set(_e(s,a),S(l)),s.h+=l.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(let f=0;f<a.length;f++){var l=a[f];const v=Be(l);l=wi(this,l);for(let w=0;w<l.length;w++){let C=v;l[w]!==""&&(C+="="+Be(l[w])),s.push(C)}}return this.i=s.join("&")};function Vi(s){const a=new We;return a.i=s.i,s.g&&(a.g=new Map(s.g),a.h=s.h),a}function _e(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function tl(s,a){a&&!s.j&&(ie(s),s.i=null,s.g.forEach(function(l,f){const v=f.toLowerCase();f!=v&&(vi(this,f),Ri(this,v,l))},s)),s.j=a}function el(s,a){const l=new je;if(u.Image){const f=new Image;f.onload=g(Bt,l,"TestLoadImage: loaded",!0,a,f),f.onerror=g(Bt,l,"TestLoadImage: error",!1,a,f),f.onabort=g(Bt,l,"TestLoadImage: abort",!1,a,f),f.ontimeout=g(Bt,l,"TestLoadImage: timeout",!1,a,f),u.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else a(!1)}function nl(s,a){const l=new je,f=new AbortController,v=setTimeout(()=>{f.abort(),Bt(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:f.signal}).then(w=>{clearTimeout(v),w.ok?Bt(l,"TestPingServer: ok",!0,a):Bt(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(v),Bt(l,"TestPingServer: error",!1,a)})}function Bt(s,a,l,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(l)}catch{}}function rl(){this.g=new Uu}function Lr(s){this.i=s.Sb||null,this.h=s.ab||!1}I(Lr,ni),Lr.prototype.g=function(){return new Dn(this.i,this.h)};function Dn(s,a){dt.call(this),this.H=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}I(Dn,dt),r=Dn.prototype,r.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=s,this.D=a,this.readyState=1,Xe(this)},r.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const a={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};s&&(a.body=s),(this.H||u).fetch(new Request(this.D,a)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,He(this)),this.readyState=0},r.Pa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Xe(this)),this.g&&(this.readyState=3,Xe(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Pi(this)}else s.text().then(this.Oa.bind(this),this.ga.bind(this))};function Pi(s){s.j.read().then(s.Ma.bind(s)).catch(s.ga.bind(s))}r.Ma=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.B.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?He(this):Xe(this),this.readyState==3&&Pi(this)}},r.Oa=function(s){this.g&&(this.response=this.responseText=s,He(this))},r.Na=function(s){this.g&&(this.response=s,He(this))},r.ga=function(){this.g&&He(this)};function He(s){s.readyState=4,s.l=null,s.j=null,s.B=null,Xe(s)}r.setRequestHeader=function(s,a){this.A.append(s,a)},r.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join(`\r
`)};function Xe(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Dn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Si(s){let a="";return An(s,function(l,f){a+=f,a+=":",a+=l,a+=`\r
`}),a}function Fr(s,a,l){t:{for(f in l){var f=!1;break t}f=!0}f||(l=Si(l),typeof s=="string"?l!=null&&Be(l):H(s,a,l))}function J(s){dt.call(this),this.headers=new Map,this.L=s||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}I(J,dt);var sl=/^https?$/i,il=["POST","PUT"];r=J.prototype,r.Fa=function(s){this.H=s},r.ea=function(s,a,l,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():li.g(),this.g.onreadystatechange=P(d(this.Ca,this));try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(w){Ci(this,w);return}if(s=l||"",l=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)l.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const w of f.keys())l.set(w,f.get(w));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(l.keys()).find(w=>w.toLowerCase()=="content-type"),v=u.FormData&&s instanceof u.FormData,!(Array.prototype.indexOf.call(il,a,void 0)>=0)||f||v||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,C]of l)this.g.setRequestHeader(w,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(s),this.v=!1}catch(w){Ci(this,w)}};function Ci(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.o=5,Di(s),bn(s)}function Di(s){s.A||(s.A=!0,_t(s,"complete"),_t(s,"error"))}r.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=s||7,_t(this,"complete"),_t(this,"abort"),bn(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bn(this,!0)),J.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?bi(this):this.Xa())},r.Xa=function(){bi(this)};function bi(s){if(s.h&&typeof o<"u"){if(s.v&&zt(s)==4)setTimeout(s.Ca.bind(s),0);else if(_t(s,"readystatechange"),zt(s)==4){s.h=!1;try{const w=s.ca();t:switch(w){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var l;if(!(l=a)){var f;if(f=w===0){let C=String(s.D).match(Ti)[1]||null;!C&&u.self&&u.self.location&&(C=u.self.location.protocol.slice(0,-1)),f=!sl.test(C?C.toLowerCase():"")}l=f}if(l)_t(s,"complete"),_t(s,"success");else{s.o=6;try{var v=zt(s)>2?s.g.statusText:""}catch{v=""}s.l=v+" ["+s.ca()+"]",Di(s)}}finally{bn(s)}}}}function bn(s,a){if(s.g){s.m&&(clearTimeout(s.m),s.m=null);const l=s.g;s.g=null,a||_t(s,"ready");try{l.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function zt(s){return s.g?s.g.readyState:0}r.ca=function(){try{return zt(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),Fu(a)}};function Ni(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.F){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function ol(s){const a={};s=(s.g&&zt(s)>=2&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(p(s[f]))continue;var l=Gu(s[f]);const v=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const w=a[v]||[];a[v]=w,w.push(l)}Nu(a,function(f){return f.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ye(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function ki(s){this.za=0,this.i=[],this.j=new je,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ye("failFast",!1,s),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ye("baseRetryDelayMs",5e3,s),this.Za=Ye("retryDelaySeedMs",1e4,s),this.Ta=Ye("forwardChannelMaxRetries",2,s),this.va=Ye("forwardChannelRequestTimeoutMs",2e4,s),this.ma=s&&s.xmlHttpFactory||void 0,this.Ua=s&&s.Rb||void 0,this.Aa=s&&s.useFetchStreams||!1,this.O=void 0,this.L=s&&s.supportsCrossDomainXhr||!1,this.M="",this.h=new gi(s&&s.concurrentRequestLimit),this.Ba=new rl,this.S=s&&s.fastHandshake||!1,this.R=s&&s.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=s&&s.Pb||!1,s&&s.ua&&this.j.ua(),s&&s.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&s&&s.detectBufferingProxy||!1,this.ia=void 0,s&&s.longPollingTimeout&&s.longPollingTimeout>0&&(this.ia=s.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=ki.prototype,r.ka=8,r.I=1,r.connect=function(s,a,l,f){yt(0),this.W=s,this.H=a||{},l&&f!==void 0&&(this.H.OSID=l,this.H.OAID=f),this.F=this.X,this.J=Bi(this,null,this.W),kn(this)};function Ur(s){if(xi(s),s.I==3){var a=s.V++,l=Pt(s.J);if(H(l,"SID",s.M),H(l,"RID",a),H(l,"TYPE","terminate"),Je(s,l),a=new qt(s,s.j,a),a.M=2,a.A=Cn(Pt(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(a.A.toString(),"")}catch{}!l&&u.Image&&(new Image().src=a.A,l=!0),l||(a.g=zi(a.j,null),a.g.ea(a.A)),a.F=Date.now(),Sn(a)}ji(s)}function Nn(s){s.g&&(jr(s),s.g.cancel(),s.g=null)}function xi(s){Nn(s),s.v&&(u.clearTimeout(s.v),s.v=null),xn(s),s.h.cancel(),s.m&&(typeof s.m=="number"&&u.clearTimeout(s.m),s.m=null)}function kn(s){if(!pi(s.h)&&!s.m){s.m=!0;var a=s.Ea;It||m(),st||(It(),st=!0),E.add(a,s),s.D=0}}function al(s,a){return _i(s.h)>=s.h.j-(s.m?1:0)?!1:s.m?(s.i=a.G.concat(s.i),!0):s.I==1||s.I==2||s.D>=(s.Sa?0:s.Ta)?!1:(s.m=qe(d(s.Ea,s,a),qi(s,s.D)),s.D++,!0)}r.Ea=function(s){if(this.m)if(this.m=null,this.I==1){if(!s){this.V=Math.floor(Math.random()*1e5),s=this.V++;const v=new qt(this,this.j,s);let w=this.o;if(this.U&&(w?(w=Ks(w),Ws(w,this.U)):w=this.U),this.u!==null||this.R||(v.J=w,w=null),this.S)t:{for(var a=0,l=0;l<this.i.length;l++){e:{var f=this.i[l];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(a+=f,a>4096){a=l;break t}if(a===4096||l===this.i.length-1){a=l+1;break t}}a=1e3}else a=1e3;a=Oi(this,v,a),l=Pt(this.J),H(l,"RID",s),H(l,"CVER",22),this.G&&H(l,"X-HTTP-Session-Id",this.G),Je(this,l),w&&(this.R?a="headers="+Be(Si(w))+"&"+a:this.u&&Fr(l,this.u,w)),Mr(this.h,v),this.Ra&&H(l,"TYPE","init"),this.S?(H(l,"$req",a),H(l,"SID","null"),v.U=!0,br(v,l,null)):br(v,l,a),this.I=2}}else this.I==3&&(s?Mi(this,s):this.i.length==0||pi(this.h)||Mi(this))};function Mi(s,a){var l;a?l=a.l:l=s.V++;const f=Pt(s.J);H(f,"SID",s.M),H(f,"RID",l),H(f,"AID",s.K),Je(s,f),s.u&&s.o&&Fr(f,s.u,s.o),l=new qt(s,s.j,l,s.D+1),s.u===null&&(l.J=s.o),a&&(s.i=a.G.concat(s.i)),a=Oi(s,l,1e3),l.H=Math.round(s.va*.5)+Math.round(s.va*.5*Math.random()),Mr(s.h,l),br(l,f,a)}function Je(s,a){s.H&&An(s.H,function(l,f){H(a,f,l)}),s.l&&An({},function(l,f){H(a,f,l)})}function Oi(s,a,l){l=Math.min(s.i.length,l);const f=s.l?d(s.l.Ka,s.l,s):null;t:{var v=s.i;let U=-1;for(;;){const it=["count="+l];U==-1?l>0?(U=v[0].g,it.push("ofs="+U)):U=0:it.push("ofs="+U);let $=!0;for(let at=0;at<l;at++){var w=v[at].g;const St=v[at].map;if(w-=U,w<0)U=Math.max(0,v[at].g-100),$=!1;else try{w="req"+w+"_"||"";try{var C=St instanceof Map?St:Object.entries(St);for(const[ae,Gt]of C){let $t=Gt;c(Gt)&&($t=Vr(Gt)),it.push(w+ae+"="+encodeURIComponent($t))}}catch(ae){throw it.push(w+"type="+encodeURIComponent("_badmap")),ae}}catch{f&&f(St)}}if($){C=it.join("&");break t}}C=void 0}return s=s.i.splice(0,l),a.G=s,C}function Li(s){if(!s.g&&!s.v){s.Y=1;var a=s.Da;It||m(),st||(It(),st=!0),E.add(a,s),s.A=0}}function qr(s){return s.g||s.v||s.A>=3?!1:(s.Y++,s.v=qe(d(s.Da,s),qi(s,s.A)),s.A++,!0)}r.Da=function(){if(this.v=null,Fi(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var s=4*this.T;this.j.info("BP detection timer enabled: "+s),this.B=qe(d(this.Wa,this),s)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,yt(10),Nn(this),Fi(this))};function jr(s){s.B!=null&&(u.clearTimeout(s.B),s.B=null)}function Fi(s){s.g=new qt(s,s.j,"rpc",s.Y),s.u===null&&(s.g.J=s.o),s.g.P=0;var a=Pt(s.na);H(a,"RID","rpc"),H(a,"SID",s.M),H(a,"AID",s.K),H(a,"CI",s.F?"0":"1"),!s.F&&s.ia&&H(a,"TO",s.ia),H(a,"TYPE","xmlhttp"),Je(s,a),s.u&&s.o&&Fr(a,s.u,s.o),s.O&&(s.g.H=s.O);var l=s.g;s=s.ba,l.M=1,l.A=Cn(Pt(a)),l.u=null,l.R=!0,fi(l,s)}r.Va=function(){this.C!=null&&(this.C=null,Nn(this),qr(this),yt(19))};function xn(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function Ui(s,a){var l=null;if(s.g==a){xn(s),jr(s),s.g=null;var f=2}else if(xr(s.h,a))l=a.G,yi(s.h,a),f=1;else return;if(s.I!=0){if(a.o)if(f==1){l=a.u?a.u.length:0,a=Date.now()-a.F;var v=s.D;f=Vn(),_t(f,new ai(f,l)),kn(s)}else Li(s);else if(v=a.m,v==3||v==0&&a.X>0||!(f==1&&al(s,a)||f==2&&qr(s)))switch(l&&l.length>0&&(a=s.h,a.i=a.i.concat(l)),v){case 1:oe(s,5);break;case 4:oe(s,10);break;case 3:oe(s,6);break;default:oe(s,2)}}}function qi(s,a){let l=s.Qa+Math.floor(Math.random()*s.Za);return s.isActive()||(l*=2),l*a}function oe(s,a){if(s.j.info("Error code "+a),a==2){var l=d(s.bb,s),f=s.Ua;const v=!f;f=new jt(f||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Ge(f,"https"),Cn(f),v?el(f.toString(),l):nl(f.toString(),l)}else yt(2);s.I=0,s.l&&s.l.pa(a),ji(s),xi(s)}r.bb=function(s){s?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function ji(s){if(s.I=0,s.ja=[],s.l){const a=Ei(s.h);(a.length!=0||s.i.length!=0)&&(M(s.ja,a),M(s.ja,s.i),s.h.i.length=0,S(s.i),s.i.length=0),s.l.oa()}}function Bi(s,a,l){var f=l instanceof jt?Pt(l):new jt(l);if(f.g!="")a&&(f.g=a+"."+f.g),$e(f,f.u);else{var v=u.location;f=v.protocol,a=a?a+"."+v.hostname:v.hostname,v=+v.port;const w=new jt(null);f&&Ge(w,f),a&&(w.g=a),v&&$e(w,v),l&&(w.h=l),f=w}return l=s.G,a=s.wa,l&&a&&H(f,l,a),H(f,"VER",s.ka),Je(s,f),f}function zi(s,a,l){if(a&&!s.L)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Aa&&!s.ma?new J(new Lr({ab:l})):new J(s.ma),a.Fa(s.L),a}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Gi(){}r=Gi.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Mn(){}Mn.prototype.g=function(s,a){return new vt(s,a)};function vt(s,a){dt.call(this),this.g=new ki(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.sa&&(s?s["X-WebChannel-Client-Profile"]=a.sa:s={"X-WebChannel-Client-Profile":a.sa}),this.g.U=s,(s=a&&a.Qb)&&!p(s)&&(this.g.u=s),this.A=a&&a.supportsCrossDomainXhr||!1,this.v=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!p(a)&&(this.g.G=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new ye(this)}I(vt,dt),vt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},vt.prototype.close=function(){Ur(this.g)},vt.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.v&&(l={},l.__data__=Vr(s),s=l);a.i.push(new Qu(a.Ya++,s)),a.I==3&&kn(a)},vt.prototype.N=function(){this.g.l=null,delete this.j,Ur(this.g),delete this.g,vt.Z.N.call(this)};function $i(s){Pr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){t:{for(const l in a){s=l;break t}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}I($i,Pr);function Ki(){Sr.call(this),this.status=1}I(Ki,Sr);function ye(s){this.g=s}I(ye,Gi),ye.prototype.ra=function(){_t(this.g,"a")},ye.prototype.qa=function(s){_t(this.g,new $i(s))},ye.prototype.pa=function(s){_t(this.g,new Ki)},ye.prototype.oa=function(){_t(this.g,"b")},Mn.prototype.createWebChannel=Mn.prototype.g,vt.prototype.send=vt.prototype.o,vt.prototype.open=vt.prototype.m,vt.prototype.close=vt.prototype.close,ta=function(){return new Mn},Zo=function(){return Vn()},Jo=re,Wr={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Pn.NO_ERROR=0,Pn.TIMEOUT=8,Pn.HTTP_ERROR=6,Bn=Pn,ui.COMPLETE="complete",Yo=ui,ri.EventType=Fe,Fe.OPEN="a",Fe.CLOSE="b",Fe.ERROR="c",Fe.MESSAGE="d",dt.prototype.listen=dt.prototype.J,Ze=ri,J.prototype.listenOnce=J.prototype.K,J.prototype.getLastError=J.prototype.Ha,J.prototype.getLastErrorCode=J.prototype.ya,J.prototype.getStatus=J.prototype.ca,J.prototype.getResponseJson=J.prototype.La,J.prototype.getResponseText=J.prototype.la,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Fa,Xo=J}).apply(typeof Ln<"u"?Ln:typeof self<"u"?self:typeof window<"u"?window:{});const Hi="@firebase/firestore",Xi="4.9.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ne="12.7.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce=new ll("@firebase/firestore");function Ee(){return ce.logLevel}function b(r,...t){if(ce.logLevel<=Ot.DEBUG){const e=t.map(hs);ce.debug(`Firestore (${Ne}): ${r}`,...e)}}function Ft(r,...t){if(ce.logLevel<=Ot.ERROR){const e=t.map(hs);ce.error(`Firestore (${Ne}): ${r}`,...e)}}function Ve(r,...t){if(ce.logLevel<=Ot.WARN){const e=t.map(hs);ce.warn(`Firestore (${Ne}): ${r}`,...e)}}function hs(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(e){return JSON.stringify(e)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,ea(r,n,e)}function ea(r,t,e){let n=`FIRESTORE (${Ne}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw Ft(n),new Error(n)}function z(r,t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,r||ea(t,i,n)}function F(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends ul{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Al{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(gt.UNAUTHENTICATED)))}shutdown(){}}class wl{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class Rl{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){z(this.o===void 0,42304);let n=this.i;const i=h=>this.i!==n?(n=this.i,e(h)):Promise.resolve();let o=new Lt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Lt,t.enqueueRetryable((()=>i(this.currentUser)))};const u=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await i(this.currentUser)}))},c=h=>{b("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),u())};this.t.onInit((h=>c(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(b("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Lt)}}),0),u()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((n=>this.i!==t?(b("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(z(typeof n.accessToken=="string",31837,{l:n}),new na(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return z(t===null||typeof t=="string",2055,{h:t}),new gt(t)}}class Vl{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Pl{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new Vl(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(gt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Yi{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Sl{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,gl(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){z(this.o===void 0,3512);const n=o=>{o.error!=null&&b("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const u=o.token!==this.m;return this.m=o.token,b("FirebaseAppCheckTokenProvider",`Received ${u?"new":"existing"} token.`),u?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>n(o)))};const i=o=>{b("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>i(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):b("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Yi(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(z(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Yi(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=Cl(40);for(let o=0;o<i.length;++o)n.length<20&&i[o]<e&&(n+=t.charAt(i[o]%62))}return n}}function q(r,t){return r<t?-1:r>t?1:0}function Hr(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const i=r.charAt(n),o=t.charAt(n);if(i!==o)return zr(i)===zr(o)?q(i,o):zr(i)?1:-1}return q(r.length,t.length)}const Dl=55296,bl=57343;function zr(r){const t=r.charCodeAt(0);return t>=Dl&&t<=bl}function Pe(r,t,e){return r.length===t.length&&r.every(((n,i)=>e(n,t[i])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ji="__name__";class Ct{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&O(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Ct.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ct?t.forEach((n=>{e.push(n)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const o=Ct.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return q(t.length,e.length)}static compareSegments(t,e){const n=Ct.isNumericId(t),i=Ct.isNumericId(e);return n&&!i?-1:!n&&i?1:n&&i?Ct.extractNumericId(t).compare(Ct.extractNumericId(e)):Hr(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Qt.fromString(t.substring(4,t.length-2))}}class Q extends Ct{construct(t,e,n){return new Q(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new D(R.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((i=>i.length>0)))}return new Q(e)}static emptyPath(){return new Q([])}}const Nl=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ct extends Ct{construct(t,e,n){return new ct(t,e,n)}static isValidIdentifier(t){return Nl.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ct.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ji}static keyField(){return new ct([Ji])}static fromServerFormat(t){const e=[];let n="",i=0;const o=()=>{if(n.length===0)throw new D(R.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let u=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new D(R.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new D(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=h,i+=2}else c==="`"?(u=!u,i++):c!=="."||u?(n+=c,i++):(o(),i++)}if(o(),u)throw new D(R.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ct(e)}static emptyPath(){return new ct([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(t){this.path=t}static fromPath(t){return new k(Q.fromString(t))}static fromName(t){return new k(Q.fromString(t).popFirst(5))}static empty(){return new k(Q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Q.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Q.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new k(new Q(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(r,t,e){if(!e)throw new D(R.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function kl(r,t,e,n){if(t===!0&&n===!0)throw new D(R.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Zi(r){if(!k.isDocumentKey(r))throw new D(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function to(r){if(k.isDocumentKey(r))throw new D(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function sa(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function ir(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=(function(n){return n.constructor?n.constructor.name:null})(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O(12329,{type:typeof r})}function Ht(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new D(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ir(r);throw new D(R.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(r,t){const e={typeString:r};return t&&(e.value=t),e}function gn(r,t){if(!sa(r))throw new D(R.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const i=t[n].typeString,o="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const u=r[n];if(i&&typeof u!==i){e=`JSON field '${n}' must be a ${i}.`;break}if(o!==void 0&&u!==o.value){e=`Expected '${n}' field to equal '${o.value}'`;break}}if(e)throw new D(R.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo=-62135596800,no=1e6;class X{static now(){return X.fromMillis(Date.now())}static fromDate(t){return X.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*no);return new X(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<eo)throw new D(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/no}_compareTo(t){return this.seconds===t.seconds?q(this.nanoseconds,t.nanoseconds):q(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:X._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(gn(t,X._jsonSchema))return new X(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-eo;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}X._jsonSchemaVersion="firestore/timestamp/1.0",X._jsonSchema={type:nt("string",X._jsonSchemaVersion),seconds:nt("number"),nanoseconds:nt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new X(0,0))}static max(){return new L(new X(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=-1;function xl(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=L.fromTimestamp(n===1e9?new X(e+1,0):new X(e,n));return new Xt(i,k.empty(),t)}function Ml(r){return new Xt(r.readTime,r.key,un)}class Xt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Xt(L.min(),k.empty(),un)}static max(){return new Xt(L.max(),k.empty(),un)}}function Ol(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=k.comparator(r.documentKey,t.documentKey),e!==0?e:q(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Fl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ke(r){if(r.code!==R.FAILED_PRECONDITION||r.message!==Ll)throw r;b("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new V(((n,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,i)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof V?e:V.resolve(e)}catch(e){return V.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):V.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):V.reject(e)}static resolve(t){return new V(((e,n)=>{e(t)}))}static reject(t){return new V(((e,n)=>{n(t)}))}static waitFor(t){return new V(((e,n)=>{let i=0,o=0,u=!1;t.forEach((c=>{++i,c.next((()=>{++o,u&&o===i&&e()}),(h=>n(h)))})),u=!0,o===i&&e()}))}static or(t){let e=V.resolve(!1);for(const n of t)e=e.next((i=>i?V.resolve(i):n()));return e}static forEach(t,e){const n=[];return t.forEach(((i,o)=>{n.push(e.call(this,i,o))})),this.waitFor(n)}static mapArray(t,e){return new V(((n,i)=>{const o=t.length,u=new Array(o);let c=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next((g=>{u[d]=g,++c,c===o&&n(u)}),(g=>i(g)))}}))}static doWhile(t,e){return new V(((n,i)=>{const o=()=>{t()===!0?e().next((()=>{o()}),i):n()};o()}))}}function Ul(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function xe(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}or.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds=-1;function ar(r){return r==null}function Wn(r){return r===0&&1/r==-1/0}function ql(r){return typeof r=="number"&&Number.isInteger(r)&&!Wn(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia="";function jl(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=ro(t)),t=Bl(r.get(e),t);return ro(t)}function Bl(r,t){let e=t;const n=r.length;for(let i=0;i<n;i++){const o=r.charAt(i);switch(o){case"\0":e+="";break;case ia:e+="";break;default:e+=o}}return e}function ro(r){return r+ia+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function so(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function fe(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function oa(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t,e){this.comparator=t,this.root=e||lt.EMPTY}insert(t,e){return new Y(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,lt.BLACK,null,null))}remove(t){return new Y(this.comparator,this.root.remove(t,this.comparator).copy(null,null,lt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(i===0)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Fn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Fn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Fn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Fn(this.root,t,this.comparator,!0)}}class Fn{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class lt{constructor(t,e,n,i,o){this.key=t,this.value=e,this.color=n??lt.RED,this.left=i??lt.EMPTY,this.right=o??lt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,o){return new lt(t??this.key,e??this.value,n??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const o=n(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,n),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return lt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return lt.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,lt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,lt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}lt.EMPTY=null,lt.RED=!0,lt.BLACK=!1;lt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,n,i,o){return this}insert(t,e,n){return new lt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.comparator=t,this.data=new Y(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new io(this.data.getIterator())}getIteratorFrom(t){return new io(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((n=>{e=e.add(n)})),e}isEqual(t){if(!(t instanceof ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new ot(this.comparator);return e.data=t,e}}class io{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.fields=t,t.sort(ct.comparator)}static empty(){return new Rt([])}unionWith(t){let e=new ot(ct.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Rt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Pe(this.fields,t.fields,((e,n)=>e.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new aa("Invalid base64 string: "+o):o}})(t);return new ht(e)}static fromUint8Array(t){const e=(function(i){let o="";for(let u=0;u<i.length;++u)o+=String.fromCharCode(i[u]);return o})(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return q(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const zl=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Yt(r){if(z(!!r,39018),typeof r=="string"){let t=0;const e=zl.exec(r);if(z(!!e,46558,{timestamp:r}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:Z(r.seconds),nanos:Z(r.nanos)}}function Z(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Jt(r){return typeof r=="string"?ht.fromBase64String(r):ht.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua="server_timestamp",la="__type__",ca="__previous_value__",ha="__local_write_time__";function ms(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[la])==null?void 0:n.stringValue)===ua}function ur(r){const t=r.mapValue.fields[ca];return ms(t)?ur(t):t}function ln(r){const t=Yt(r.mapValue.fields[ha].timestampValue);return new X(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(t,e,n,i,o,u,c,h,d,g){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=o,this.forceLongPolling=u,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=g}}const Hn="(default)";class cn{constructor(t,e){this.projectId=t,this.database=e||Hn}static empty(){return new cn("","")}get isDefaultDatabase(){return this.database===Hn}isEqual(t){return t instanceof cn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa="__type__",$l="__max__",Un={mapValue:{}},da="__vector__",Xn="value";function Zt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?ms(r)?4:Ql(r)?9007199254740991:Kl(r)?10:11:O(28295,{value:r})}function Mt(r,t){if(r===t)return!0;const e=Zt(r);if(e!==Zt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return ln(r).isEqual(ln(t));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=Yt(i.timestampValue),c=Yt(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos})(r,t);case 5:return r.stringValue===t.stringValue;case 6:return(function(i,o){return Jt(i.bytesValue).isEqual(Jt(o.bytesValue))})(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return(function(i,o){return Z(i.geoPointValue.latitude)===Z(o.geoPointValue.latitude)&&Z(i.geoPointValue.longitude)===Z(o.geoPointValue.longitude)})(r,t);case 2:return(function(i,o){if("integerValue"in i&&"integerValue"in o)return Z(i.integerValue)===Z(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const u=Z(i.doubleValue),c=Z(o.doubleValue);return u===c?Wn(u)===Wn(c):isNaN(u)&&isNaN(c)}return!1})(r,t);case 9:return Pe(r.arrayValue.values||[],t.arrayValue.values||[],Mt);case 10:case 11:return(function(i,o){const u=i.mapValue.fields||{},c=o.mapValue.fields||{};if(so(u)!==so(c))return!1;for(const h in u)if(u.hasOwnProperty(h)&&(c[h]===void 0||!Mt(u[h],c[h])))return!1;return!0})(r,t);default:return O(52216,{left:r})}}function hn(r,t){return(r.values||[]).find((e=>Mt(e,t)))!==void 0}function Se(r,t){if(r===t)return 0;const e=Zt(r),n=Zt(t);if(e!==n)return q(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return q(r.booleanValue,t.booleanValue);case 2:return(function(o,u){const c=Z(o.integerValue||o.doubleValue),h=Z(u.integerValue||u.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1})(r,t);case 3:return oo(r.timestampValue,t.timestampValue);case 4:return oo(ln(r),ln(t));case 5:return Hr(r.stringValue,t.stringValue);case 6:return(function(o,u){const c=Jt(o),h=Jt(u);return c.compareTo(h)})(r.bytesValue,t.bytesValue);case 7:return(function(o,u){const c=o.split("/"),h=u.split("/");for(let d=0;d<c.length&&d<h.length;d++){const g=q(c[d],h[d]);if(g!==0)return g}return q(c.length,h.length)})(r.referenceValue,t.referenceValue);case 8:return(function(o,u){const c=q(Z(o.latitude),Z(u.latitude));return c!==0?c:q(Z(o.longitude),Z(u.longitude))})(r.geoPointValue,t.geoPointValue);case 9:return ao(r.arrayValue,t.arrayValue);case 10:return(function(o,u){var P,S,M,x;const c=o.fields||{},h=u.fields||{},d=(P=c[Xn])==null?void 0:P.arrayValue,g=(S=h[Xn])==null?void 0:S.arrayValue,I=q(((M=d==null?void 0:d.values)==null?void 0:M.length)||0,((x=g==null?void 0:g.values)==null?void 0:x.length)||0);return I!==0?I:ao(d,g)})(r.mapValue,t.mapValue);case 11:return(function(o,u){if(o===Un.mapValue&&u===Un.mapValue)return 0;if(o===Un.mapValue)return 1;if(u===Un.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),d=u.fields||{},g=Object.keys(d);h.sort(),g.sort();for(let I=0;I<h.length&&I<g.length;++I){const P=Hr(h[I],g[I]);if(P!==0)return P;const S=Se(c[h[I]],d[g[I]]);if(S!==0)return S}return q(h.length,g.length)})(r.mapValue,t.mapValue);default:throw O(23264,{he:e})}}function oo(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return q(r,t);const e=Yt(r),n=Yt(t),i=q(e.seconds,n.seconds);return i!==0?i:q(e.nanos,n.nanos)}function ao(r,t){const e=r.values||[],n=t.values||[];for(let i=0;i<e.length&&i<n.length;++i){const o=Se(e[i],n[i]);if(o)return o}return q(e.length,n.length)}function Ce(r){return Xr(r)}function Xr(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(e){const n=Yt(e);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(e){return Jt(e).toBase64()})(r.bytesValue):"referenceValue"in r?(function(e){return k.fromName(e).toString()})(r.referenceValue):"geoPointValue"in r?(function(e){return`geo(${e.latitude},${e.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(e){let n="[",i=!0;for(const o of e.values||[])i?i=!1:n+=",",n+=Xr(o);return n+"]"})(r.arrayValue):"mapValue"in r?(function(e){const n=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const u of n)o?o=!1:i+=",",i+=`${u}:${Xr(e.fields[u])}`;return i+"}"})(r.mapValue):O(61005,{value:r})}function zn(r){switch(Zt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=ur(r);return t?16+zn(t):16;case 5:return 2*r.stringValue.length;case 6:return Jt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((i,o)=>i+zn(o)),0)})(r.arrayValue);case 10:case 11:return(function(n){let i=0;return fe(n.fields,((o,u)=>{i+=o.length+zn(u)})),i})(r.mapValue);default:throw O(13486,{value:r})}}function uo(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function Yr(r){return!!r&&"integerValue"in r}function gs(r){return!!r&&"arrayValue"in r}function lo(r){return!!r&&"nullValue"in r}function co(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Gn(r){return!!r&&"mapValue"in r}function Kl(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[fa])==null?void 0:n.stringValue)===da}function rn(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return fe(r.mapValue.fields,((e,n)=>t.mapValue.fields[e]=rn(n))),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=rn(r.arrayValue.values[e]);return t}return{...r}}function Ql(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===$l}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t){this.value=t}static empty(){return new At({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Gn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=rn(e)}setAll(t){let e=ct.emptyPath(),n={},i=[];t.forEach(((u,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,n,i),n={},i=[],e=c.popLast()}u?n[c.lastSegment()]=rn(u):i.push(c.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,n,i)}delete(t){const e=this.field(t.popLast());Gn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Mt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];Gn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){fe(e,((i,o)=>t[i]=o));for(const i of n)delete t[i]}clone(){return new At(rn(this.value))}}function ma(r){const t=[];return fe(r.fields,((e,n)=>{const i=new ct([e]);if(Gn(n)){const o=ma(n.mapValue).fields;if(o.length===0)t.push(i);else for(const u of o)t.push(i.child(u))}else t.push(i)})),new Rt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t,e,n,i,o,u,c){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=o,this.data=u,this.documentState=c}static newInvalidDocument(t){return new pt(t,0,L.min(),L.min(),L.min(),At.empty(),0)}static newFoundDocument(t,e,n,i){return new pt(t,1,e,L.min(),n,i,0)}static newNoDocument(t,e){return new pt(t,2,e,L.min(),L.min(),At.empty(),0)}static newUnknownDocument(t,e){return new pt(t,3,e,L.min(),L.min(),At.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof pt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new pt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(t,e){this.position=t,this.inclusive=e}}function ho(r,t,e){let n=0;for(let i=0;i<r.position.length;i++){const o=t[i],u=r.position[i];if(o.field.isKeyField()?n=k.comparator(k.fromName(u.referenceValue),e.key):n=Se(u,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function fo(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Mt(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(t,e="asc"){this.field=t,this.dir=e}}function Wl(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{}class et extends ga{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Xl(t,e,n):e==="array-contains"?new Zl(t,n):e==="in"?new tc(t,n):e==="not-in"?new ec(t,n):e==="array-contains-any"?new nc(t,n):new et(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Yl(t,n):new Jl(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Se(e,this.value)):e!==null&&Zt(this.value)===Zt(e)&&this.matchesComparison(Se(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vt extends ga{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Vt(t,e)}matches(t){return pa(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function pa(r){return r.op==="and"}function _a(r){return Hl(r)&&pa(r)}function Hl(r){for(const t of r.filters)if(t instanceof Vt)return!1;return!0}function Jr(r){if(r instanceof et)return r.field.canonicalString()+r.op.toString()+Ce(r.value);if(_a(r))return r.filters.map((t=>Jr(t))).join(",");{const t=r.filters.map((e=>Jr(e))).join(",");return`${r.op}(${t})`}}function ya(r,t){return r instanceof et?(function(n,i){return i instanceof et&&n.op===i.op&&n.field.isEqual(i.field)&&Mt(n.value,i.value)})(r,t):r instanceof Vt?(function(n,i){return i instanceof Vt&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce(((o,u,c)=>o&&ya(u,i.filters[c])),!0):!1})(r,t):void O(19439)}function Ea(r){return r instanceof et?(function(e){return`${e.field.canonicalString()} ${e.op} ${Ce(e.value)}`})(r):r instanceof Vt?(function(e){return e.op.toString()+" {"+e.getFilters().map(Ea).join(" ,")+"}"})(r):"Filter"}class Xl extends et{constructor(t,e,n){super(t,e,n),this.key=k.fromName(n.referenceValue)}matches(t){const e=k.comparator(t.key,this.key);return this.matchesComparison(e)}}class Yl extends et{constructor(t,e){super(t,"in",e),this.keys=Ta("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Jl extends et{constructor(t,e){super(t,"not-in",e),this.keys=Ta("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Ta(r,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((n=>k.fromName(n.referenceValue)))}class Zl extends et{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return gs(e)&&hn(e.arrayValue,this.value)}}class tc extends et{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&hn(this.value.arrayValue,e)}}class ec extends et{constructor(t,e){super(t,"not-in",e)}matches(t){if(hn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!hn(this.value.arrayValue,e)}}class nc extends et{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!gs(e)||!e.arrayValue.values)&&e.arrayValue.values.some((n=>hn(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(t,e=null,n=[],i=[],o=null,u=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=o,this.startAt=u,this.endAt=c,this.Te=null}}function mo(r,t=null,e=[],n=[],i=null,o=null,u=null){return new rc(r,t,e,n,i,o,u)}function ps(r){const t=F(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((n=>Jr(n))).join(","),e+="|ob:",e+=t.orderBy.map((n=>(function(o){return o.field.canonicalString()+o.dir})(n))).join(","),ar(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((n=>Ce(n))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((n=>Ce(n))).join(",")),t.Te=e}return t.Te}function _s(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!Wl(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!ya(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!fo(r.startAt,t.startAt)&&fo(r.endAt,t.endAt)}function Zr(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(t,e=null,n=[],i=[],o=null,u="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=o,this.limitType=u,this.startAt=c,this.endAt=h,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function sc(r,t,e,n,i,o,u,c){return new pn(r,t,e,n,i,o,u,c)}function ys(r){return new pn(r)}function go(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Ia(r){return r.collectionGroup!==null}function sn(r){const t=F(r);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let c=new ot(ct.comparator);return u.filters.forEach((h=>{h.getFlattenedFilters().forEach((d=>{d.isInequality()&&(c=c.add(d.field))}))})),c})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new Jn(o,n))})),e.has(ct.keyField().canonicalString())||t.Ie.push(new Jn(ct.keyField(),n))}return t.Ie}function Dt(r){const t=F(r);return t.Ee||(t.Ee=ic(t,sn(r))),t.Ee}function ic(r,t){if(r.limitType==="F")return mo(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map((i=>{const o=i.dir==="desc"?"asc":"desc";return new Jn(i.field,o)}));const e=r.endAt?new Yn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Yn(r.startAt.position,r.startAt.inclusive):null;return mo(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function ts(r,t){const e=r.filters.concat([t]);return new pn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function es(r,t,e){return new pn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function lr(r,t){return _s(Dt(r),Dt(t))&&r.limitType===t.limitType}function va(r){return`${ps(Dt(r))}|lt:${r.limitType}`}function Te(r){return`Query(target=${(function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map((i=>Ea(i))).join(", ")}]`),ar(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map((i=>(function(u){return`${u.field.canonicalString()} (${u.dir})`})(i))).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((i=>Ce(i))).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((i=>Ce(i))).join(",")),`Target(${n})`})(Dt(r))}; limitType=${r.limitType})`}function cr(r,t){return t.isFoundDocument()&&(function(n,i){const o=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):k.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)})(r,t)&&(function(n,i){for(const o of sn(n))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0})(r,t)&&(function(n,i){for(const o of n.filters)if(!o.matches(i))return!1;return!0})(r,t)&&(function(n,i){return!(n.startAt&&!(function(u,c,h){const d=ho(u,c,h);return u.inclusive?d<=0:d<0})(n.startAt,sn(n),i)||n.endAt&&!(function(u,c,h){const d=ho(u,c,h);return u.inclusive?d>=0:d>0})(n.endAt,sn(n),i))})(r,t)}function oc(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Aa(r){return(t,e)=>{let n=!1;for(const i of sn(r)){const o=ac(i,t,e);if(o!==0)return o;n=n||i.field.isKeyField()}return 0}}function ac(r,t,e){const n=r.field.isKeyField()?k.comparator(t.key,e.key):(function(o,u,c){const h=u.data.field(o),d=c.data.field(o);return h!==null&&d!==null?Se(h,d):O(42886)})(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[i,o]of n)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),i=this.inner[n];if(i===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],t))return n.length===1?delete this.inner[e]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(t){fe(this.inner,((e,n)=>{for(const[i,o]of n)t(i,o)}))}isEmpty(){return oa(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc=new Y(k.comparator);function Ut(){return uc}const wa=new Y(k.comparator);function tn(...r){let t=wa;for(const e of r)t=t.insert(e.key,e);return t}function Ra(r){let t=wa;return r.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function ue(){return on()}function Va(){return on()}function on(){return new de((r=>r.toString()),((r,t)=>r.isEqual(t)))}const lc=new Y(k.comparator),cc=new ot(k.comparator);function j(...r){let t=cc;for(const e of r)t=t.add(e);return t}const hc=new ot(q);function fc(){return hc}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Wn(t)?"-0":t}}function Pa(r){return{integerValue:""+r}}function dc(r,t){return ql(t)?Pa(t):Es(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(){this._=void 0}}function mc(r,t,e){return r instanceof fn?(function(i,o){const u={fields:{[la]:{stringValue:ua},[ha]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&ms(o)&&(o=ur(o)),o&&(u.fields[ca]=o),{mapValue:u}})(e,t):r instanceof dn?Ca(r,t):r instanceof mn?Da(r,t):(function(i,o){const u=Sa(i,o),c=po(u)+po(i.Ae);return Yr(u)&&Yr(i.Ae)?Pa(c):Es(i.serializer,c)})(r,t)}function gc(r,t,e){return r instanceof dn?Ca(r,t):r instanceof mn?Da(r,t):e}function Sa(r,t){return r instanceof Zn?(function(n){return Yr(n)||(function(o){return!!o&&"doubleValue"in o})(n)})(t)?t:{integerValue:0}:null}class fn extends hr{}class dn extends hr{constructor(t){super(),this.elements=t}}function Ca(r,t){const e=ba(t);for(const n of r.elements)e.some((i=>Mt(i,n)))||e.push(n);return{arrayValue:{values:e}}}class mn extends hr{constructor(t){super(),this.elements=t}}function Da(r,t){let e=ba(t);for(const n of r.elements)e=e.filter((i=>!Mt(i,n)));return{arrayValue:{values:e}}}class Zn extends hr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function po(r){return Z(r.integerValue||r.doubleValue)}function ba(r){return gs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(t,e){this.field=t,this.transform=e}}function _c(r,t){return r.field.isEqual(t.field)&&(function(n,i){return n instanceof dn&&i instanceof dn||n instanceof mn&&i instanceof mn?Pe(n.elements,i.elements,Mt):n instanceof Zn&&i instanceof Zn?Mt(n.Ae,i.Ae):n instanceof fn&&i instanceof fn})(r.transform,t.transform)}class yc{constructor(t,e){this.version=t,this.transformResults=e}}class bt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new bt}static exists(t){return new bt(void 0,t)}static updateTime(t){return new bt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function $n(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class fr{}function Na(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new xa(r.key,bt.none()):new _n(r.key,r.data,bt.none());{const e=r.data,n=At.empty();let i=new ot(ct.comparator);for(let o of t.fields)if(!i.has(o)){let u=e.field(o);u===null&&o.length>1&&(o=o.popLast(),u=e.field(o)),u===null?n.delete(o):n.set(o,u),i=i.add(o)}return new me(r.key,n,new Rt(i.toArray()),bt.none())}}function Ec(r,t,e){r instanceof _n?(function(i,o,u){const c=i.value.clone(),h=yo(i.fieldTransforms,o,u.transformResults);c.setAll(h),o.convertToFoundDocument(u.version,c).setHasCommittedMutations()})(r,t,e):r instanceof me?(function(i,o,u){if(!$n(i.precondition,o))return void o.convertToUnknownDocument(u.version);const c=yo(i.fieldTransforms,o,u.transformResults),h=o.data;h.setAll(ka(i)),h.setAll(c),o.convertToFoundDocument(u.version,h).setHasCommittedMutations()})(r,t,e):(function(i,o,u){o.convertToNoDocument(u.version).setHasCommittedMutations()})(0,t,e)}function an(r,t,e,n){return r instanceof _n?(function(o,u,c,h){if(!$n(o.precondition,u))return c;const d=o.value.clone(),g=Eo(o.fieldTransforms,h,u);return d.setAll(g),u.convertToFoundDocument(u.version,d).setHasLocalMutations(),null})(r,t,e,n):r instanceof me?(function(o,u,c,h){if(!$n(o.precondition,u))return c;const d=Eo(o.fieldTransforms,h,u),g=u.data;return g.setAll(ka(o)),g.setAll(d),u.convertToFoundDocument(u.version,g).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((I=>I.field)))})(r,t,e,n):(function(o,u,c){return $n(o.precondition,u)?(u.convertToNoDocument(u.version).setHasLocalMutations(),null):c})(r,t,e)}function Tc(r,t){let e=null;for(const n of r.fieldTransforms){const i=t.data.field(n.field),o=Sa(n.transform,i||null);o!=null&&(e===null&&(e=At.empty()),e.set(n.field,o))}return e||null}function _o(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!(function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Pe(n,i,((o,u)=>_c(o,u)))})(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class _n extends fr{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class me extends fr{constructor(t,e,n,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function ka(r){const t=new Map;return r.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}})),t}function yo(r,t,e){const n=new Map;z(r.length===e.length,32656,{Re:e.length,Ve:r.length});for(let i=0;i<e.length;i++){const o=r[i],u=o.transform,c=t.data.field(o.field);n.set(o.field,gc(u,c,e[i]))}return n}function Eo(r,t,e){const n=new Map;for(const i of r){const o=i.transform,u=e.data.field(i.field);n.set(i.field,mc(o,u,t))}return n}class xa extends fr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ic extends fr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(t,e,n,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&Ec(o,t,n[i])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=an(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=an(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Va();return this.mutations.forEach((i=>{const o=t.get(i.key),u=o.overlayedDocument;let c=this.applyToLocalView(u,o.mutatedFields);c=e.has(i.key)?null:c;const h=Na(u,c);h!==null&&n.set(i.key,h),u.isValidDocument()||u.convertToNoDocument(L.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),j())}isEqual(t){return this.batchId===t.batchId&&Pe(this.mutations,t.mutations,((e,n)=>_o(e,n)))&&Pe(this.baseMutations,t.baseMutations,((e,n)=>_o(e,n)))}}class Ts{constructor(t,e,n,i){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=i}static from(t,e,n){z(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let i=(function(){return lc})();const o=t.mutations;for(let u=0;u<o.length;u++)i=i.insert(o[u].key,n[u].version);return new Ts(t,e,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tt,B;function Rc(r){switch(r){case R.OK:return O(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return O(15467,{code:r})}}function Ma(r){if(r===void 0)return Ft("GRPC error has no .code"),R.UNKNOWN;switch(r){case tt.OK:return R.OK;case tt.CANCELLED:return R.CANCELLED;case tt.UNKNOWN:return R.UNKNOWN;case tt.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case tt.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case tt.INTERNAL:return R.INTERNAL;case tt.UNAVAILABLE:return R.UNAVAILABLE;case tt.UNAUTHENTICATED:return R.UNAUTHENTICATED;case tt.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case tt.NOT_FOUND:return R.NOT_FOUND;case tt.ALREADY_EXISTS:return R.ALREADY_EXISTS;case tt.PERMISSION_DENIED:return R.PERMISSION_DENIED;case tt.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case tt.ABORTED:return R.ABORTED;case tt.OUT_OF_RANGE:return R.OUT_OF_RANGE;case tt.UNIMPLEMENTED:return R.UNIMPLEMENTED;case tt.DATA_LOSS:return R.DATA_LOSS;default:return O(39323,{code:r})}}(B=tt||(tt={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vc(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc=new Qt([4294967295,4294967295],0);function To(r){const t=Vc().encode(r),e=new Ho;return e.update(t),new Uint8Array(e.digest())}function Io(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Qt([e,n],0),new Qt([i,o],0)]}class Is{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new en(`Invalid padding: ${e}`);if(n<0)throw new en(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new en(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new en(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Qt.fromNumber(this.ge)}ye(t,e,n){let i=t.add(e.multiply(Qt.fromNumber(n)));return i.compare(Pc)===1&&(i=new Qt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=To(t),[n,i]=Io(e);for(let o=0;o<this.hashCount;o++){const u=this.ye(n,i,o);if(!this.we(u))return!1}return!0}static create(t,e,n){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),u=new Is(o,i,e);return n.forEach((c=>u.insert(c))),u}insert(t){if(this.ge===0)return;const e=To(t),[n,i]=Io(e);for(let o=0;o<this.hashCount;o++){const u=this.ye(n,i,o);this.Se(u)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class en extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(t,e,n,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const i=new Map;return i.set(t,yn.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new dr(L.min(),i,new Y(q),Ut(),j())}}class yn{constructor(t,e,n,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new yn(n,e,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(t,e,n,i){this.be=t,this.removedTargetIds=e,this.key=n,this.De=i}}class Oa{constructor(t,e){this.targetId=t,this.Ce=e}}class La{constructor(t,e,n=ht.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=i}}class vo{constructor(){this.ve=0,this.Fe=Ao(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=j(),e=j(),n=j();return this.Fe.forEach(((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:n=n.add(i);break;default:O(38017,{changeType:o})}})),new yn(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=Ao()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,z(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Sc{constructor(t){this.Ge=t,this.ze=new Map,this.je=Ut(),this.Je=qn(),this.He=qn(),this.Ye=new Y(q)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.We(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:O(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((n,i)=>{this.rt(i)&&e(i)}))}st(t){const e=t.targetId,n=t.Ce.count,i=this.ot(e);if(i){const o=i.target;if(Zr(o))if(n===0){const u=new k(o.path);this.et(e,u,pt.newNoDocument(u,L.min()))}else z(n===1,20013,{expectedCount:n});else{const u=this._t(e);if(u!==n){const c=this.ut(t),h=c?this.ct(c,t,u):1;if(h!==0){this.it(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,d)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:o=0}=e;let u,c;try{u=Jt(n).toUint8Array()}catch(h){if(h instanceof aa)return Ve("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new Is(u,i,o)}catch(h){return Ve(h instanceof en?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.ge===0?null:c}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let i=0;return n.forEach((o=>{const u=this.Ge.ht(),c=`projects/${u.projectId}/databases/${u.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.et(e,o,null),i++)})),i}Tt(t){const e=new Map;this.ze.forEach(((o,u)=>{const c=this.ot(u);if(c){if(o.current&&Zr(c.target)){const h=new k(c.target.path);this.It(h).has(u)||this.Et(u,h)||this.et(u,h,pt.newNoDocument(h,t))}o.Be&&(e.set(u,o.ke()),o.qe())}}));let n=j();this.He.forEach(((o,u)=>{let c=!0;u.forEachWhile((h=>{const d=this.ot(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(o))})),this.je.forEach(((o,u)=>u.setReadTime(t)));const i=new dr(t,e,this.Ye,this.je,n);return this.je=Ut(),this.Je=qn(),this.He=qn(),this.Ye=new Y(q),i}Xe(t,e){if(!this.rt(t))return;const n=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const i=this.nt(t);this.Et(t,e)?i.Qe(e,1):i.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new vo,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new ot(q),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new ot(q),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||b("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new vo),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function qn(){return new Y(k.comparator)}function Ao(){return new Y(k.comparator)}const Cc={asc:"ASCENDING",desc:"DESCENDING"},Dc={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},bc={and:"AND",or:"OR"};class Nc{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ns(r,t){return r.useProto3Json||ar(t)?t:{value:t}}function tr(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Fa(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function kc(r,t){return tr(r,t.toTimestamp())}function Nt(r){return z(!!r,49232),L.fromTimestamp((function(e){const n=Yt(e);return new X(n.seconds,n.nanos)})(r))}function vs(r,t){return rs(r,t).canonicalString()}function rs(r,t){const e=(function(i){return new Q(["projects",i.projectId,"databases",i.database])})(r).child("documents");return t===void 0?e:e.child(t)}function Ua(r){const t=Q.fromString(r);return z(Ga(t),10190,{key:t.toString()}),t}function ss(r,t){return vs(r.databaseId,t.path)}function Gr(r,t){const e=Ua(t);if(e.get(1)!==r.databaseId.projectId)throw new D(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new D(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new k(ja(e))}function qa(r,t){return vs(r.databaseId,t)}function xc(r){const t=Ua(r);return t.length===4?Q.emptyPath():ja(t)}function is(r){return new Q(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function ja(r){return z(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function wo(r,t,e){return{name:ss(r,t),fields:e.value.mapValue.fields}}function Mc(r,t){let e;if("targetChange"in t){t.targetChange;const n=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:O(39313,{state:d})})(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=(function(d,g){return d.useProto3Json?(z(g===void 0||typeof g=="string",58123),ht.fromBase64String(g||"")):(z(g===void 0||g instanceof Buffer||g instanceof Uint8Array,16193),ht.fromUint8Array(g||new Uint8Array))})(r,t.targetChange.resumeToken),u=t.targetChange.cause,c=u&&(function(d){const g=d.code===void 0?R.UNKNOWN:Ma(d.code);return new D(g,d.message||"")})(u);e=new La(n,i,o,c||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const i=Gr(r,n.document.name),o=Nt(n.document.updateTime),u=n.document.createTime?Nt(n.document.createTime):L.min(),c=new At({mapValue:{fields:n.document.fields}}),h=pt.newFoundDocument(i,o,u,c),d=n.targetIds||[],g=n.removedTargetIds||[];e=new Kn(d,g,h.key,h)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const i=Gr(r,n.document),o=n.readTime?Nt(n.readTime):L.min(),u=pt.newNoDocument(i,o),c=n.removedTargetIds||[];e=new Kn([],c,u.key,u)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const i=Gr(r,n.document),o=n.removedTargetIds||[];e=new Kn([],o,i,null)}else{if(!("filter"in t))return O(11601,{Rt:t});{t.filter;const n=t.filter;n.targetId;const{count:i=0,unchangedNames:o}=n,u=new wc(i,o),c=n.targetId;e=new Oa(c,u)}}return e}function Oc(r,t){let e;if(t instanceof _n)e={update:wo(r,t.key,t.value)};else if(t instanceof xa)e={delete:ss(r,t.key)};else if(t instanceof me)e={update:wo(r,t.key,t.data),updateMask:$c(t.fieldMask)};else{if(!(t instanceof Ic))return O(16599,{Vt:t.type});e={verify:ss(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((n=>(function(o,u){const c=u.transform;if(c instanceof fn)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof dn)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof mn)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Zn)return{fieldPath:u.field.canonicalString(),increment:c.Ae};throw O(20930,{transform:u.transform})})(0,n)))),t.precondition.isNone||(e.currentDocument=(function(i,o){return o.updateTime!==void 0?{updateTime:kc(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:O(27497)})(r,t.precondition)),e}function Lc(r,t){return r&&r.length>0?(z(t!==void 0,14353),r.map((e=>(function(i,o){let u=i.updateTime?Nt(i.updateTime):Nt(o);return u.isEqual(L.min())&&(u=Nt(o)),new yc(u,i.transformResults||[])})(e,t)))):[]}function Fc(r,t){return{documents:[qa(r,t.path)]}}function Uc(r,t){const e={structuredQuery:{}},n=t.path;let i;t.collectionGroup!==null?(i=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=qa(r,i);const o=(function(d){if(d.length!==0)return za(Vt.create(d,"and"))})(t.filters);o&&(e.structuredQuery.where=o);const u=(function(d){if(d.length!==0)return d.map((g=>(function(P){return{field:Ie(P.field),direction:Bc(P.dir)}})(g)))})(t.orderBy);u&&(e.structuredQuery.orderBy=u);const c=ns(r,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(t.endAt)),{ft:e,parent:i}}function qc(r){let t=xc(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let i=null;if(n>0){z(n===1,65062);const g=e.from[0];g.allDescendants?i=g.collectionId:t=t.child(g.collectionId)}let o=[];e.where&&(o=(function(I){const P=Ba(I);return P instanceof Vt&&_a(P)?P.getFilters():[P]})(e.where));let u=[];e.orderBy&&(u=(function(I){return I.map((P=>(function(M){return new Jn(ve(M.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(M.direction))})(P)))})(e.orderBy));let c=null;e.limit&&(c=(function(I){let P;return P=typeof I=="object"?I.value:I,ar(P)?null:P})(e.limit));let h=null;e.startAt&&(h=(function(I){const P=!!I.before,S=I.values||[];return new Yn(S,P)})(e.startAt));let d=null;return e.endAt&&(d=(function(I){const P=!I.before,S=I.values||[];return new Yn(S,P)})(e.endAt)),sc(t,i,u,o,c,"F",h,d)}function jc(r,t){const e=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:i})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Ba(r){return r.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=ve(e.unaryFilter.field);return et.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=ve(e.unaryFilter.field);return et.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=ve(e.unaryFilter.field);return et.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const u=ve(e.unaryFilter.field);return et.create(u,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}})(r):r.fieldFilter!==void 0?(function(e){return et.create(ve(e.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(e){return Vt.create(e.compositeFilter.filters.map((n=>Ba(n))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return O(1026)}})(e.compositeFilter.op))})(r):O(30097,{filter:r})}function Bc(r){return Cc[r]}function zc(r){return Dc[r]}function Gc(r){return bc[r]}function Ie(r){return{fieldPath:r.canonicalString()}}function ve(r){return ct.fromServerFormat(r.fieldPath)}function za(r){return r instanceof et?(function(e){if(e.op==="=="){if(co(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NAN"}};if(lo(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(co(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NOT_NAN"}};if(lo(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ie(e.field),op:zc(e.op),value:e.value}}})(r):r instanceof Vt?(function(e){const n=e.getFilters().map((i=>za(i)));return n.length===1?n[0]:{compositeFilter:{op:Gc(e.op),filters:n}}})(r):O(54877,{filter:r})}function $c(r){const t=[];return r.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Ga(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(t,e,n,i,o=L.min(),u=L.min(),c=ht.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=u,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new Kt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(t){this.yt=t}}function Qc(r){const t=qc({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?es(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(){this.Cn=new Hc}addToCollectionParentIndex(t,e){return this.Cn.add(e),V.resolve()}getCollectionParents(t,e){return V.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return V.resolve()}deleteFieldIndex(t,e){return V.resolve()}deleteAllFieldIndexes(t){return V.resolve()}createTargetIndexes(t,e){return V.resolve()}getDocumentsMatchingTarget(t,e){return V.resolve(null)}getIndexType(t,e){return V.resolve(0)}getFieldIndexes(t,e){return V.resolve([])}getNextCollectionGroupToUpdate(t){return V.resolve(null)}getMinOffset(t,e){return V.resolve(Xt.min())}getMinOffsetFromCollectionGroup(t,e){return V.resolve(Xt.min())}updateCollectionGroup(t,e,n){return V.resolve()}updateIndexEntries(t,e){return V.resolve()}}class Hc{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e]||new ot(Q.comparator),o=!i.has(n);return this.index[e]=i.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e];return i&&i.has(n)}getEntries(t){return(this.index[t]||new ot(Q.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},$a=41943040;class Tt{static withCacheSize(t){return new Tt(t,Tt.DEFAULT_COLLECTION_PERCENTILE,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Tt.DEFAULT_COLLECTION_PERCENTILE=10,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Tt.DEFAULT=new Tt($a,Tt.DEFAULT_COLLECTION_PERCENTILE,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Tt.DISABLED=new Tt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new De(0)}static cr(){return new De(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="LruGarbageCollector",Xc=1048576;function Po([r,t],[e,n]){const i=q(r,e);return i===0?q(t,n):i}class Yc{constructor(t){this.Ir=t,this.buffer=new ot(Po),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Po(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Jc{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){b(Vo,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){xe(e)?b(Vo,"Ignoring IndexedDB error during garbage collection: ",e):await ke(e)}await this.Vr(3e5)}))}}class Zc{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((n=>Math.floor(e/100*n)))}nthSequenceNumber(t,e){if(e===0)return V.resolve(or.ce);const n=new Yc(e);return this.mr.forEachTarget(t,(i=>n.Ar(i.sequenceNumber))).next((()=>this.mr.pr(t,(i=>n.Ar(i))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.mr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(b("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(Ro)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(b("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ro):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let n,i,o,u,c,h,d;const g=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((I=>(I>this.params.maximumSequenceNumbersToCollect?(b("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),i=this.params.maximumSequenceNumbersToCollect):i=I,u=Date.now(),this.nthSequenceNumber(t,i)))).next((I=>(n=I,c=Date.now(),this.removeTargets(t,n,e)))).next((I=>(o=I,h=Date.now(),this.removeOrphanedDocuments(t,n)))).next((I=>(d=Date.now(),Ee()<=Ot.DEBUG&&b("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${u-g}ms
	Determined least recently used ${i} in `+(c-u)+`ms
	Removed ${o} targets in `+(h-c)+`ms
	Removed ${I} documents in `+(d-h)+`ms
Total Duration: ${d-g}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:I}))))}}function th(r,t){return new Zc(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(){this.changes=new de((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,pt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?V.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(t,e,n,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=i}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((i=>(n=i,this.remoteDocumentCache.getEntry(t,e)))).next((i=>(n!==null&&an(n.mutation,i,Rt.empty(),X.now()),i)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.getLocalViewOfDocuments(t,n,j()).next((()=>n))))}getLocalViewOfDocuments(t,e,n=j()){const i=ue();return this.populateOverlays(t,i,e).next((()=>this.computeViews(t,e,i,n).next((o=>{let u=tn();return o.forEach(((c,h)=>{u=u.insert(c,h.overlayedDocument)})),u}))))}getOverlayedDocuments(t,e){const n=ue();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,j())))}populateOverlays(t,e,n){const i=[];return n.forEach((o=>{e.has(o)||i.push(o)})),this.documentOverlayCache.getOverlays(t,i).next((o=>{o.forEach(((u,c)=>{e.set(u,c)}))}))}computeViews(t,e,n,i){let o=Ut();const u=on(),c=(function(){return on()})();return e.forEach(((h,d)=>{const g=n.get(d.key);i.has(d.key)&&(g===void 0||g.mutation instanceof me)?o=o.insert(d.key,d):g!==void 0?(u.set(d.key,g.mutation.getFieldMask()),an(g.mutation,d,g.mutation.getFieldMask(),X.now())):u.set(d.key,Rt.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((d,g)=>u.set(d,g))),e.forEach(((d,g)=>c.set(d,new nh(g,u.get(d)??null)))),c)))}recalculateAndSaveOverlays(t,e){const n=on();let i=new Y(((u,c)=>u-c)),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((u=>{for(const c of u)c.keys().forEach((h=>{const d=e.get(h);if(d===null)return;let g=n.get(h)||Rt.empty();g=c.applyToLocalView(d,g),n.set(h,g);const I=(i.get(c.batchId)||j()).add(h);i=i.insert(c.batchId,I)}))})).next((()=>{const u=[],c=i.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,g=h.value,I=Va();g.forEach((P=>{if(!o.has(P)){const S=Na(e.get(P),n.get(P));S!==null&&I.set(P,S),o=o.add(P)}})),u.push(this.documentOverlayCache.saveOverlays(t,d,I))}return V.waitFor(u)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.recalculateAndSaveOverlays(t,n)))}getDocumentsMatchingQuery(t,e,n,i){return(function(u){return k.isDocumentKey(u.path)&&u.collectionGroup===null&&u.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Ia(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,i):this.getDocumentsMatchingCollectionQuery(t,e,n,i)}getNextDocuments(t,e,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,i).next((o=>{const u=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,i-o.size):V.resolve(ue());let c=un,h=o;return u.next((d=>V.forEach(d,((g,I)=>(c<I.largestBatchId&&(c=I.largestBatchId),o.get(g)?V.resolve():this.remoteDocumentCache.getEntry(t,g).next((P=>{h=h.insert(g,P)}))))).next((()=>this.populateOverlays(t,d,o))).next((()=>this.computeViews(t,h,d,j()))).next((g=>({batchId:c,changes:Ra(g)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new k(e)).next((n=>{let i=tn();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i}))}getDocumentsMatchingCollectionGroupQuery(t,e,n,i){const o=e.collectionGroup;let u=tn();return this.indexManager.getCollectionParents(t,o).next((c=>V.forEach(c,(h=>{const d=(function(I,P){return new pn(P,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,n,i).next((g=>{g.forEach(((I,P)=>{u=u.insert(I,P)}))}))})).next((()=>u))))}getDocumentsMatchingCollectionQuery(t,e,n,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next((u=>(o=u,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,i)))).next((u=>{o.forEach(((h,d)=>{const g=d.getKey();u.get(g)===null&&(u=u.insert(g,pt.newInvalidDocument(g)))}));let c=tn();return u.forEach(((h,d)=>{const g=o.get(h);g!==void 0&&an(g.mutation,d,Rt.empty(),X.now()),cr(e,d)&&(c=c.insert(h,d))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return V.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(i){return{id:i.id,version:i.version,createTime:Nt(i.createTime)}})(e)),V.resolve()}getNamedQuery(t,e){return V.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(i){return{name:i.name,query:Qc(i.bundledQuery),readTime:Nt(i.readTime)}})(e)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(){this.overlays=new Y(k.comparator),this.qr=new Map}getOverlay(t,e){return V.resolve(this.overlays.get(e))}getOverlays(t,e){const n=ue();return V.forEach(e,(i=>this.getOverlay(t,i).next((o=>{o!==null&&n.set(i,o)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((i,o)=>{this.St(t,e,o)})),V.resolve()}removeOverlaysForBatchId(t,e,n){const i=this.qr.get(n);return i!==void 0&&(i.forEach((o=>this.overlays=this.overlays.remove(o))),this.qr.delete(n)),V.resolve()}getOverlaysForCollection(t,e,n){const i=ue(),o=e.length+1,u=new k(e.child("")),c=this.overlays.getIteratorFrom(u);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>n&&i.set(h.getKey(),h)}return V.resolve(i)}getOverlaysForCollectionGroup(t,e,n,i){let o=new Y(((d,g)=>d-g));const u=this.overlays.getIterator();for(;u.hasNext();){const d=u.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let g=o.get(d.largestBatchId);g===null&&(g=ue(),o=o.insert(d.largestBatchId,g)),g.set(d.getKey(),d)}}const c=ue(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((d,g)=>c.set(d,g))),!(c.size()>=i)););return V.resolve(c)}St(t,e,n){const i=this.overlays.get(n.key);if(i!==null){const u=this.qr.get(i.largestBatchId).delete(n.key);this.qr.set(i.largestBatchId,u)}this.overlays=this.overlays.insert(n.key,new Ac(e,n));let o=this.qr.get(e);o===void 0&&(o=j(),this.qr.set(e,o)),this.qr.set(e,o.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return V.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(){this.Qr=new ot(ut.$r),this.Ur=new ot(ut.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const n=new ut(t,e);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(t,e){t.forEach((n=>this.addReference(n,e)))}removeReference(t,e){this.Gr(new ut(t,e))}zr(t,e){t.forEach((n=>this.removeReference(n,e)))}jr(t){const e=new k(new Q([])),n=new ut(e,t),i=new ut(e,t+1),o=[];return this.Ur.forEachInRange([n,i],(u=>{this.Gr(u),o.push(u.key)})),o}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new k(new Q([])),n=new ut(e,t),i=new ut(e,t+1);let o=j();return this.Ur.forEachInRange([n,i],(u=>{o=o.add(u.key)})),o}containsKey(t){const e=new ut(t,0),n=this.Qr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class ut{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return k.comparator(t.key,e.key)||q(t.Yr,e.Yr)}static Kr(t,e){return q(t.Yr,e.Yr)||k.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new ot(ut.$r)}checkEmpty(t){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,i){const o=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const u=new vc(o,e,n,i);this.mutationQueue.push(u);for(const c of i)this.Zr=this.Zr.add(new ut(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return V.resolve(u)}lookupMutationBatch(t,e){return V.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,i=this.ei(n),o=i<0?0:i;return V.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?ds:this.tr-1)}getAllMutationBatches(t){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new ut(e,0),i=new ut(e,Number.POSITIVE_INFINITY),o=[];return this.Zr.forEachInRange([n,i],(u=>{const c=this.Xr(u.Yr);o.push(c)})),V.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new ot(q);return e.forEach((i=>{const o=new ut(i,0),u=new ut(i,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([o,u],(c=>{n=n.add(c.Yr)}))})),V.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,i=n.length+1;let o=n;k.isDocumentKey(o)||(o=o.child(""));const u=new ut(new k(o),0);let c=new ot(q);return this.Zr.forEachWhile((h=>{const d=h.key.path;return!!n.isPrefixOf(d)&&(d.length===i&&(c=c.add(h.Yr)),!0)}),u),V.resolve(this.ti(c))}ti(t){const e=[];return t.forEach((n=>{const i=this.Xr(n);i!==null&&e.push(i)})),e}removeMutationBatch(t,e){z(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return V.forEach(e.mutations,(i=>{const o=new ut(i.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)})).next((()=>{this.Zr=n}))}ir(t){}containsKey(t,e){const n=new ut(e,0),i=this.Zr.firstAfterOrEqual(n);return V.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,V.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(t){this.ri=t,this.docs=(function(){return new Y(k.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,i=this.docs.get(n),o=i?i.size:0,u=this.ri(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:u}),this.size+=u-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return V.resolve(n?n.document.mutableCopy():pt.newInvalidDocument(e))}getEntries(t,e){let n=Ut();return e.forEach((i=>{const o=this.docs.get(i);n=n.insert(i,o?o.document.mutableCopy():pt.newInvalidDocument(i))})),V.resolve(n)}getDocumentsMatchingQuery(t,e,n,i){let o=Ut();const u=e.path,c=new k(u.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:d,value:{document:g}}=h.getNext();if(!u.isPrefixOf(d.path))break;d.path.length>u.length+1||Ol(Ml(g),n)<=0||(i.has(g.key)||cr(e,g))&&(o=o.insert(g.key,g.mutableCopy()))}return V.resolve(o)}getAllFromCollectionGroup(t,e,n,i){O(9500)}ii(t,e){return V.forEach(this.docs,(n=>e(n)))}newChangeBuffer(t){return new lh(this)}getSize(t){return V.resolve(this.size)}}class lh extends eh{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((n,i)=>{i.isValidDocument()?e.push(this.Nr.addEntry(t,i)):this.Nr.removeEntry(n)})),V.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(t){this.persistence=t,this.si=new de((e=>ps(e)),_s),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.oi=0,this._i=new As,this.targetCount=0,this.ai=De.ur()}forEachTarget(t,e){return this.si.forEach(((n,i)=>e(i))),V.resolve()}getLastRemoteSnapshotVersion(t){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return V.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.oi&&(this.oi=e),V.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new De(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,V.resolve()}updateTargetData(t,e){return this.Pr(e),V.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,V.resolve()}removeTargets(t,e,n){let i=0;const o=[];return this.si.forEach(((u,c)=>{c.sequenceNumber<=e&&n.get(c.targetId)===null&&(this.si.delete(u),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),i++)})),V.waitFor(o).next((()=>i))}getTargetCount(t){return V.resolve(this.targetCount)}getTargetData(t,e){const n=this.si.get(e)||null;return V.resolve(n)}addMatchingKeys(t,e,n){return this._i.Wr(e,n),V.resolve()}removeMatchingKeys(t,e,n){this._i.zr(e,n);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach((u=>{o.push(i.markPotentiallyOrphaned(t,u))})),V.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),V.resolve()}getMatchingKeysForTargetId(t,e){const n=this._i.Hr(e);return V.resolve(n)}containsKey(t,e){return V.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(t,e){this.ui={},this.overlays={},this.ci=new or(0),this.li=!1,this.li=!0,this.hi=new oh,this.referenceDelegate=t(this),this.Pi=new ch(this),this.indexManager=new Wc,this.remoteDocumentCache=(function(i){return new uh(i)})((n=>this.referenceDelegate.Ti(n))),this.serializer=new Kc(e),this.Ii=new sh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new ih,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ui[t.toKey()];return n||(n=new ah(e,this.referenceDelegate),this.ui[t.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,n){b("MemoryPersistence","Starting transaction:",t);const i=new hh(this.ci.next());return this.referenceDelegate.Ei(),n(i).next((o=>this.referenceDelegate.di(i).next((()=>o)))).toPromise().then((o=>(i.raiseOnCommittedEvent(),o)))}Ai(t,e){return V.or(Object.values(this.ui).map((n=>()=>n.containsKey(t,e))))}}class hh extends Fl{constructor(t){super(),this.currentSequenceNumber=t}}class ws{constructor(t){this.persistence=t,this.Ri=new As,this.Vi=null}static mi(t){return new ws(t)}get fi(){if(this.Vi)return this.Vi;throw O(60996)}addReference(t,e,n){return this.Ri.addReference(n,e),this.fi.delete(n.toString()),V.resolve()}removeReference(t,e,n){return this.Ri.removeReference(n,e),this.fi.add(n.toString()),V.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),V.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((i=>this.fi.add(i.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((i=>{i.forEach((o=>this.fi.add(o.toString())))})).next((()=>n.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.fi,(n=>{const i=k.fromPath(n);return this.gi(t,i).next((o=>{o||e.removeEntry(i,L.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((n=>{n?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return V.or([()=>V.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class er{constructor(t,e){this.persistence=t,this.pi=new de((n=>jl(n.path)),((n,i)=>n.isEqual(i))),this.garbageCollector=th(this,e)}static mi(t,e){return new er(t,e)}Ei(){}di(t){return V.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((n=>e.next((i=>n+i))))}wr(t){let e=0;return this.pr(t,(n=>{e++})).next((()=>e))}pr(t,e){return V.forEach(this.pi,((n,i)=>this.br(t,n,i).next((o=>o?V.resolve():e(i)))))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ii(t,(u=>this.br(t,u,e).next((c=>{c||(n++,o.removeEntry(u,L.min()))})))).next((()=>o.apply(t))).next((()=>n))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),V.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),V.resolve()}removeReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),V.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),V.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=zn(t.data.value)),e}br(t,e,n){return V.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.pi.get(e);return V.resolve(i!==void 0&&i>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(t,e,n,i){this.targetId=t,this.fromCache=e,this.Es=n,this.ds=i}static As(t,e){let n=j(),i=j();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Rs(t,e.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return cl()?8:Ul(hl())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,i){const o={result:null};return this.ys(t,e).next((u=>{o.result=u})).next((()=>{if(!o.result)return this.ws(t,e,i,n).next((u=>{o.result=u}))})).next((()=>{if(o.result)return;const u=new fh;return this.Ss(t,e,u).next((c=>{if(o.result=c,this.Vs)return this.bs(t,e,u,c.size)}))})).next((()=>o.result))}bs(t,e,n,i){return n.documentReadCount<this.fs?(Ee()<=Ot.DEBUG&&b("QueryEngine","SDK will not create cache indexes for query:",Te(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),V.resolve()):(Ee()<=Ot.DEBUG&&b("QueryEngine","Query:",Te(e),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.gs*i?(Ee()<=Ot.DEBUG&&b("QueryEngine","The SDK decides to create cache indexes for query:",Te(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Dt(e))):V.resolve())}ys(t,e){if(go(e))return V.resolve(null);let n=Dt(e);return this.indexManager.getIndexType(t,n).next((i=>i===0?null:(e.limit!==null&&i===1&&(e=es(e,null,"F"),n=Dt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next((o=>{const u=j(...o);return this.ps.getDocuments(t,u).next((c=>this.indexManager.getMinOffset(t,n).next((h=>{const d=this.Ds(e,c);return this.Cs(e,d,u,h.readTime)?this.ys(t,es(e,null,"F")):this.vs(t,d,e,h)}))))})))))}ws(t,e,n,i){return go(e)||i.isEqual(L.min())?V.resolve(null):this.ps.getDocuments(t,n).next((o=>{const u=this.Ds(e,o);return this.Cs(e,u,n,i)?V.resolve(null):(Ee()<=Ot.DEBUG&&b("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Te(e)),this.vs(t,u,e,xl(i,un)).next((c=>c)))}))}Ds(t,e){let n=new ot(Aa(t));return e.forEach(((i,o)=>{cr(t,o)&&(n=n.add(o))})),n}Cs(t,e,n,i){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Ss(t,e,n){return Ee()<=Ot.DEBUG&&b("QueryEngine","Using full collection scan to execute query:",Te(e)),this.ps.getDocumentsMatchingQuery(t,e,Xt.min(),n)}vs(t,e,n,i){return this.ps.getDocumentsMatchingQuery(t,n,i).next((o=>(e.forEach((u=>{o=o.insert(u.key,u)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs="LocalStore",mh=3e8;class gh{constructor(t,e,n,i){this.persistence=t,this.Fs=e,this.serializer=i,this.Ms=new Y(q),this.xs=new de((o=>ps(o)),_s),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(n)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new rh(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function ph(r,t,e,n){return new gh(r,t,e,n)}async function Qa(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",(n=>{let i;return e.mutationQueue.getAllMutationBatches(n).next((o=>(i=o,e.Bs(t),e.mutationQueue.getAllMutationBatches(n)))).next((o=>{const u=[],c=[];let h=j();for(const d of i){u.push(d.batchId);for(const g of d.mutations)h=h.add(g.key)}for(const d of o){c.push(d.batchId);for(const g of d.mutations)h=h.add(g.key)}return e.localDocuments.getDocuments(n,h).next((d=>({Ls:d,removedBatchIds:u,addedBatchIds:c})))}))}))}function _h(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const i=t.batch.keys(),o=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,h,d,g){const I=d.batch,P=I.keys();let S=V.resolve();return P.forEach((M=>{S=S.next((()=>g.getEntry(h,M))).next((x=>{const N=d.docVersions.get(M);z(N!==null,48541),x.version.compareTo(N)<0&&(I.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),g.addEntry(x)))}))})),S.next((()=>c.mutationQueue.removeMutationBatch(h,I)))})(e,n,t,o).next((()=>o.apply(n))).next((()=>e.mutationQueue.performConsistencyCheck(n))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(n,i,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let h=j();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(h=h.add(c.batch.mutations[d].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(n,i)))}))}function Wa(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function yh(r,t){const e=F(r),n=t.snapshotVersion;let i=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const u=e.Ns.newChangeBuffer({trackRemovals:!0});i=e.Ms;const c=[];t.targetChanges.forEach(((g,I)=>{const P=i.get(I);if(!P)return;c.push(e.Pi.removeMatchingKeys(o,g.removedDocuments,I).next((()=>e.Pi.addMatchingKeys(o,g.addedDocuments,I))));let S=P.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?S=S.withResumeToken(ht.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):g.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(g.resumeToken,n)),i=i.insert(I,S),(function(x,N,K){return x.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=mh?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0})(P,S,g)&&c.push(e.Pi.updateTargetData(o,S))}));let h=Ut(),d=j();if(t.documentUpdates.forEach((g=>{t.resolvedLimboDocuments.has(g)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,g))})),c.push(Eh(o,u,t.documentUpdates).next((g=>{h=g.ks,d=g.qs}))),!n.isEqual(L.min())){const g=e.Pi.getLastRemoteSnapshotVersion(o).next((I=>e.Pi.setTargetsMetadata(o,o.currentSequenceNumber,n)));c.push(g)}return V.waitFor(c).next((()=>u.apply(o))).next((()=>e.localDocuments.getLocalViewOfDocuments(o,h,d))).next((()=>h))})).then((o=>(e.Ms=i,o)))}function Eh(r,t,e){let n=j(),i=j();return e.forEach((o=>n=n.add(o))),t.getEntries(r,n).next((o=>{let u=Ut();return e.forEach(((c,h)=>{const d=o.get(c);h.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(c,h.readTime),u=u.insert(c,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),u=u.insert(c,h)):b(Vs,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",h.version)})),{ks:u,qs:i}}))}function Th(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",(n=>(t===void 0&&(t=ds),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t))))}function Ih(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",(n=>{let i;return e.Pi.getTargetData(n,t).next((o=>o?(i=o,V.resolve(i)):e.Pi.allocateTargetId(n).next((u=>(i=new Kt(t,u,"TargetPurposeListen",n.currentSequenceNumber),e.Pi.addTargetData(n,i).next((()=>i)))))))})).then((n=>{const i=e.Ms.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(n.targetId,n),e.xs.set(t,n.targetId)),n}))}async function os(r,t,e){const n=F(r),i=n.Ms.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,(u=>n.persistence.referenceDelegate.removeTarget(u,i)))}catch(u){if(!xe(u))throw u;b(Vs,`Failed to update sequence numbers for target ${t}: ${u}`)}n.Ms=n.Ms.remove(t),n.xs.delete(i.target)}function So(r,t,e){const n=F(r);let i=L.min(),o=j();return n.persistence.runTransaction("Execute query","readwrite",(u=>(function(h,d,g){const I=F(h),P=I.xs.get(g);return P!==void 0?V.resolve(I.Ms.get(P)):I.Pi.getTargetData(d,g)})(n,u,Dt(t)).next((c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.Pi.getMatchingKeysForTargetId(u,c.targetId).next((h=>{o=h}))})).next((()=>n.Fs.getDocumentsMatchingQuery(u,t,e?i:L.min(),e?o:j()))).next((c=>(vh(n,oc(t),c),{documents:c,Qs:o})))))}function vh(r,t,e){let n=r.Os.get(t)||L.min();e.forEach(((i,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)})),r.Os.set(t,n)}class Co{constructor(){this.activeTargetIds=fc()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Ah{constructor(){this.Mo=new Co,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,n){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new Co,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do="ConnectivityMonitor";class bo{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){b(Do,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){b(Do,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jn=null;function as(){return jn===null?jn=(function(){return 268435456+Math.round(2147483648*Math.random())})():jn++,"0x"+jn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r="RestConnection",Rh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Vh{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${n}/databases/${i}`,this.Wo=this.databaseId.database===Hn?`project_id=${n}`:`project_id=${n}&database_id=${i}`}Go(t,e,n,i,o){const u=as(),c=this.zo(t,e.toUriEncodedString());b($r,`Sending RPC '${t}' ${u}:`,c,n);const h={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(h,i,o);const{host:d}=new URL(c),g=Wo(d);return this.Jo(t,c,h,n,g).then((I=>(b($r,`Received RPC '${t}' ${u}: `,I),I)),(I=>{throw Ve($r,`RPC '${t}' ${u} failed with error: `,I,"url: ",c,"request:",n),I}))}Ho(t,e,n,i,o,u){return this.Go(t,e,n,i,o)}jo(t,e,n){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ne})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((i,o)=>t[o]=i)),n&&n.headers.forEach(((i,o)=>t[o]=i))}zo(t,e){const n=Rh[t];return`${this.Uo}/v1/${e}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="WebChannelConnection";class Sh extends Vh{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,n,i,o){const u=as();return new Promise(((c,h)=>{const d=new Xo;d.setWithCredentials(!0),d.listenOnce(Yo.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case Bn.NO_ERROR:const I=d.getResponseJson();b(mt,`XHR for RPC '${t}' ${u} received:`,JSON.stringify(I)),c(I);break;case Bn.TIMEOUT:b(mt,`RPC '${t}' ${u} timed out`),h(new D(R.DEADLINE_EXCEEDED,"Request time out"));break;case Bn.HTTP_ERROR:const P=d.getStatus();if(b(mt,`RPC '${t}' ${u} failed with status:`,P,"response text:",d.getResponseText()),P>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const M=S==null?void 0:S.error;if(M&&M.status&&M.message){const x=(function(K){const G=K.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(G)>=0?G:R.UNKNOWN})(M.status);h(new D(x,M.message))}else h(new D(R.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new D(R.UNAVAILABLE,"Connection failed."));break;default:O(9055,{l_:t,streamId:u,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{b(mt,`RPC '${t}' ${u} completed.`)}}));const g=JSON.stringify(i);b(mt,`RPC '${t}' ${u} sending request:`,i),d.send(e,"POST",g,n,15)}))}T_(t,e,n){const i=as(),o=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],u=ta(),c=Zo(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.jo(h.initMessageHeaders,e,n),h.encodeInitMessageHeaders=!0;const g=o.join("");b(mt,`Creating RPC '${t}' stream ${i}: ${g}`,h);const I=u.createWebChannel(g,h);this.I_(I);let P=!1,S=!1;const M=new Ph({Yo:N=>{S?b(mt,`Not sending because RPC '${t}' stream ${i} is closed:`,N):(P||(b(mt,`Opening RPC '${t}' stream ${i} transport.`),I.open(),P=!0),b(mt,`RPC '${t}' stream ${i} sending:`,N),I.send(N))},Zo:()=>I.close()}),x=(N,K,G)=>{N.listen(K,(W=>{try{G(W)}catch(ft){setTimeout((()=>{throw ft}),0)}}))};return x(I,Ze.EventType.OPEN,(()=>{S||(b(mt,`RPC '${t}' stream ${i} transport opened.`),M.o_())})),x(I,Ze.EventType.CLOSE,(()=>{S||(S=!0,b(mt,`RPC '${t}' stream ${i} transport closed`),M.a_(),this.E_(I))})),x(I,Ze.EventType.ERROR,(N=>{S||(S=!0,Ve(mt,`RPC '${t}' stream ${i} transport errored. Name:`,N.name,"Message:",N.message),M.a_(new D(R.UNAVAILABLE,"The operation could not be completed")))})),x(I,Ze.EventType.MESSAGE,(N=>{var K;if(!S){const G=N.data[0];z(!!G,16349);const W=G,ft=(W==null?void 0:W.error)||((K=W[0])==null?void 0:K.error);if(ft){b(mt,`RPC '${t}' stream ${i} received error:`,ft);const It=ft.status;let st=(function(_){const T=tt[_];if(T!==void 0)return Ma(T)})(It),E=ft.message;st===void 0&&(st=R.INTERNAL,E="Unknown error status: "+It+" with message "+ft.message),S=!0,M.a_(new D(st,E)),I.close()}else b(mt,`RPC '${t}' stream ${i} received:`,G),M.u_(G)}})),x(c,Jo.STAT_EVENT,(N=>{N.stat===Wr.PROXY?b(mt,`RPC '${t}' stream ${i} detected buffering proxy`):N.stat===Wr.NOPROXY&&b(mt,`RPC '${t}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{M.__()}),0),M}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}function Kr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(r){return new Nc(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(t,e,n=1e3,i=1.5,o=6e4){this.Mi=t,this.timerId=e,this.d_=n,this.A_=i,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),i=Math.max(0,e-n);i>0&&b("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No="PersistentStream";class Xa{constructor(t,e,n,i,o,u,c,h){this.Mi=t,this.S_=n,this.b_=i,this.connection=o,this.authCredentialsProvider=u,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ha(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===R.RESOURCE_EXHAUSTED?(Ft(e.toString()),Ft("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,i])=>{this.D_===e&&this.G_(n,i)}),(n=>{t((()=>{const i=new D(R.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(i)}))}))}G_(t,e){const n=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((i=>{n((()=>this.z_(i)))})),this.stream.onMessage((i=>{n((()=>++this.F_==1?this.J_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return b(No,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(b(No,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Ch extends Xa{constructor(t,e,n,i,o,u){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Mc(this.serializer,t),n=(function(o){if(!("targetChange"in o))return L.min();const u=o.targetChange;return u.targetIds&&u.targetIds.length?L.min():u.readTime?Nt(u.readTime):L.min()})(t);return this.listener.H_(e,n)}Y_(t){const e={};e.database=is(this.serializer),e.addTarget=(function(o,u){let c;const h=u.target;if(c=Zr(h)?{documents:Fc(o,h)}:{query:Uc(o,h).ft},c.targetId=u.targetId,u.resumeToken.approximateByteSize()>0){c.resumeToken=Fa(o,u.resumeToken);const d=ns(o,u.expectedCount);d!==null&&(c.expectedCount=d)}else if(u.snapshotVersion.compareTo(L.min())>0){c.readTime=tr(o,u.snapshotVersion.toTimestamp());const d=ns(o,u.expectedCount);d!==null&&(c.expectedCount=d)}return c})(this.serializer,t);const n=jc(this.serializer,t);n&&(e.labels=n),this.q_(e)}Z_(t){const e={};e.database=is(this.serializer),e.removeTarget=t,this.q_(e)}}class Dh extends Xa{constructor(t,e,n,i,o,u){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,z(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Lc(t.writeResults,t.commitTime),n=Nt(t.commitTime);return this.listener.na(n,e)}ra(){const t={};t.database=is(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((n=>Oc(this.serializer,n)))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{}class Nh extends bh{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new D(R.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,n,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,u])=>this.connection.Go(t,rs(e,n),i,o,u))).catch((o=>{throw o.name==="FirebaseError"?(o.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(R.UNKNOWN,o.toString())}))}Ho(t,e,n,i,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([u,c])=>this.connection.Ho(t,rs(e,n),i,u,c,o))).catch((u=>{throw u.name==="FirebaseError"?(u.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new D(R.UNKNOWN,u.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class kh{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ft(e),this.aa=!1):b("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he="RemoteStore";class xh{constructor(t,e,n,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=o,this.Aa.Oo((u=>{n.enqueueAndForget((async()=>{ge(this)&&(b(he,"Restarting streams for network reachability change."),await(async function(h){const d=F(h);d.Ea.add(4),await En(d),d.Ra.set("Unknown"),d.Ea.delete(4),await gr(d)})(this))}))})),this.Ra=new kh(n,i)}}async function gr(r){if(ge(r))for(const t of r.da)await t(!0)}async function En(r){for(const t of r.da)await t(!1)}function Ya(r,t){const e=F(r);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),Ds(e)?Cs(e):Me(e).O_()&&Ss(e,t))}function Ps(r,t){const e=F(r),n=Me(e);e.Ia.delete(t),n.O_()&&Ja(e,t),e.Ia.size===0&&(n.O_()?n.L_():ge(e)&&e.Ra.set("Unknown"))}function Ss(r,t){if(r.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Me(r).Y_(t)}function Ja(r,t){r.Va.Ue(t),Me(r).Z_(t)}function Cs(r){r.Va=new Sc({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),At:t=>r.Ia.get(t)||null,ht:()=>r.datastore.serializer.databaseId}),Me(r).start(),r.Ra.ua()}function Ds(r){return ge(r)&&!Me(r).x_()&&r.Ia.size>0}function ge(r){return F(r).Ea.size===0}function Za(r){r.Va=void 0}async function Mh(r){r.Ra.set("Online")}async function Oh(r){r.Ia.forEach(((t,e)=>{Ss(r,t)}))}async function Lh(r,t){Za(r),Ds(r)?(r.Ra.ha(t),Cs(r)):r.Ra.set("Unknown")}async function Fh(r,t,e){if(r.Ra.set("Online"),t instanceof La&&t.state===2&&t.cause)try{await(async function(i,o){const u=o.cause;for(const c of o.targetIds)i.Ia.has(c)&&(await i.remoteSyncer.rejectListen(c,u),i.Ia.delete(c),i.Va.removeTarget(c))})(r,t)}catch(n){b(he,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await nr(r,n)}else if(t instanceof Kn?r.Va.Ze(t):t instanceof Oa?r.Va.st(t):r.Va.tt(t),!e.isEqual(L.min()))try{const n=await Wa(r.localStore);e.compareTo(n)>=0&&await(function(o,u){const c=o.Va.Tt(u);return c.targetChanges.forEach(((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const g=o.Ia.get(d);g&&o.Ia.set(d,g.withResumeToken(h.resumeToken,u))}})),c.targetMismatches.forEach(((h,d)=>{const g=o.Ia.get(h);if(!g)return;o.Ia.set(h,g.withResumeToken(ht.EMPTY_BYTE_STRING,g.snapshotVersion)),Ja(o,h);const I=new Kt(g.target,h,d,g.sequenceNumber);Ss(o,I)})),o.remoteSyncer.applyRemoteEvent(c)})(r,e)}catch(n){b(he,"Failed to raise snapshot:",n),await nr(r,n)}}async function nr(r,t,e){if(!xe(t))throw t;r.Ea.add(1),await En(r),r.Ra.set("Offline"),e||(e=()=>Wa(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{b(he,"Retrying IndexedDB access"),await e(),r.Ea.delete(1),await gr(r)}))}function tu(r,t){return t().catch((e=>nr(r,e,t)))}async function pr(r){const t=F(r),e=te(t);let n=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:ds;for(;Uh(t);)try{const i=await Th(t.localStore,n);if(i===null){t.Ta.length===0&&e.L_();break}n=i.batchId,qh(t,i)}catch(i){await nr(t,i)}eu(t)&&nu(t)}function Uh(r){return ge(r)&&r.Ta.length<10}function qh(r,t){r.Ta.push(t);const e=te(r);e.O_()&&e.X_&&e.ea(t.mutations)}function eu(r){return ge(r)&&!te(r).x_()&&r.Ta.length>0}function nu(r){te(r).start()}async function jh(r){te(r).ra()}async function Bh(r){const t=te(r);for(const e of r.Ta)t.ea(e.mutations)}async function zh(r,t,e){const n=r.Ta.shift(),i=Ts.from(n,t,e);await tu(r,(()=>r.remoteSyncer.applySuccessfulWrite(i))),await pr(r)}async function Gh(r,t){t&&te(r).X_&&await(async function(n,i){if((function(u){return Rc(u)&&u!==R.ABORTED})(i.code)){const o=n.Ta.shift();te(n).B_(),await tu(n,(()=>n.remoteSyncer.rejectFailedWrite(o.batchId,i))),await pr(n)}})(r,t),eu(r)&&nu(r)}async function ko(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),b(he,"RemoteStore received new credentials");const n=ge(e);e.Ea.add(3),await En(e),n&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await gr(e)}async function $h(r,t){const e=F(r);t?(e.Ea.delete(2),await gr(e)):t||(e.Ea.add(2),await En(e),e.Ra.set("Unknown"))}function Me(r){return r.ma||(r.ma=(function(e,n,i){const o=F(e);return o.sa(),new Ch(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)})(r.datastore,r.asyncQueue,{Xo:Mh.bind(null,r),t_:Oh.bind(null,r),r_:Lh.bind(null,r),H_:Fh.bind(null,r)}),r.da.push((async t=>{t?(r.ma.B_(),Ds(r)?Cs(r):r.Ra.set("Unknown")):(await r.ma.stop(),Za(r))}))),r.ma}function te(r){return r.fa||(r.fa=(function(e,n,i){const o=F(e);return o.sa(),new Dh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)})(r.datastore,r.asyncQueue,{Xo:()=>Promise.resolve(),t_:jh.bind(null,r),r_:Gh.bind(null,r),ta:Bh.bind(null,r),na:zh.bind(null,r)}),r.da.push((async t=>{t?(r.fa.B_(),await pr(r)):(await r.fa.stop(),r.Ta.length>0&&(b(he,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(t,e,n,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=i,this.removalCallback=o,this.deferred=new Lt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((u=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,i,o){const u=Date.now()+n,c=new bs(t,e,u,i,o);return c.start(n),c}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(R.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ns(r,t){if(Ft("AsyncQueue",`${t}: ${r}`),xe(r))return new D(R.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{static emptySet(t){return new Ae(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||k.comparator(e.key,n.key):(e,n)=>k.comparator(e.key,n.key),this.keyedMap=tn(),this.sortedSet=new Y(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ae)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new Ae;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(){this.ga=new Y(k.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?t.type!==0&&n.type===3?this.ga=this.ga.insert(e,t):t.type===3&&n.type!==1?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.ga=this.ga.remove(e):t.type===1&&n.type===2?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):O(63341,{Rt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,n)=>{t.push(n)})),t}}class be{constructor(t,e,n,i,o,u,c,h,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=o,this.fromCache=u,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,i,o){const u=[];return e.forEach((c=>{u.push({type:0,doc:c})})),new be(t,e,Ae.emptySet(e),u,n,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&lr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==n[i].type||!e[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class Qh{constructor(){this.queries=Mo(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,n){const i=F(e),o=i.queries;i.queries=Mo(),o.forEach(((u,c)=>{for(const h of c.Sa)h.onError(n)}))})(this,new D(R.ABORTED,"Firestore shutting down"))}}function Mo(){return new de((r=>va(r)),lr)}async function ru(r,t){const e=F(r);let n=3;const i=t.query;let o=e.queries.get(i);o?!o.ba()&&t.Da()&&(n=2):(o=new Kh,n=t.Da()?0:1);try{switch(n){case 0:o.wa=await e.onListen(i,!0);break;case 1:o.wa=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(u){const c=Ns(u,`Initialization of query '${Te(t.query)}' failed`);return void t.onError(c)}e.queries.set(i,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&ks(e)}async function su(r,t){const e=F(r),n=t.query;let i=3;const o=e.queries.get(n);if(o){const u=o.Sa.indexOf(t);u>=0&&(o.Sa.splice(u,1),o.Sa.length===0?i=t.Da()?0:1:!o.ba()&&t.Da()&&(i=2))}switch(i){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function Wh(r,t){const e=F(r);let n=!1;for(const i of t){const o=i.query,u=e.queries.get(o);if(u){for(const c of u.Sa)c.Fa(i)&&(n=!0);u.wa=i}}n&&ks(e)}function Hh(r,t,e){const n=F(r),i=n.queries.get(t);if(i)for(const o of i.Sa)o.onError(e);n.queries.delete(t)}function ks(r){r.Ca.forEach((t=>{t.next()}))}var us,Oo;(Oo=us||(us={})).Ma="default",Oo.Cache="cache";class iu{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const n=[];for(const i of t.docChanges)i.type!==3&&n.push(i);t=new be(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const n=e!=="Offline";return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=be.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==us.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(t){this.key=t}}class au{constructor(t){this.key=t}}class Xh{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=j(),this.mutatedKeys=j(),this.eu=Aa(t),this.tu=new Ae(this.eu)}get nu(){return this.Ya}ru(t,e){const n=e?e.iu:new xo,i=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,u=i,c=!1;const h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal(((g,I)=>{const P=i.get(g),S=cr(this.query,I)?I:null,M=!!P&&this.mutatedKeys.has(P.key),x=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let N=!1;P&&S?P.data.isEqual(S.data)?M!==x&&(n.track({type:3,doc:S}),N=!0):this.su(P,S)||(n.track({type:2,doc:S}),N=!0,(h&&this.eu(S,h)>0||d&&this.eu(S,d)<0)&&(c=!0)):!P&&S?(n.track({type:0,doc:S}),N=!0):P&&!S&&(n.track({type:1,doc:P}),N=!0,(h||d)&&(c=!0)),N&&(S?(u=u.add(S),o=x?o.add(g):o.delete(g)):(u=u.delete(g),o=o.delete(g)))})),this.query.limit!==null)for(;u.size>this.query.limit;){const g=this.query.limitType==="F"?u.last():u.first();u=u.delete(g.key),o=o.delete(g.key),n.track({type:1,doc:g})}return{tu:u,iu:n,Cs:c,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,i){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const u=t.iu.ya();u.sort(((g,I)=>(function(S,M){const x=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Rt:N})}};return x(S)-x(M)})(g.type,I.type)||this.eu(g.doc,I.doc))),this.ou(n),i=i??!1;const c=e&&!i?this._u():[],h=this.Xa.size===0&&this.current&&!i?1:0,d=h!==this.Za;return this.Za=h,u.length!==0||d?{snapshot:new be(this.query,t.tu,o,u,t.mutatedKeys,h===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new xo,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=j(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))}));const e=[];return t.forEach((n=>{this.Xa.has(n)||e.push(new au(n))})),this.Xa.forEach((n=>{t.has(n)||e.push(new ou(n))})),e}cu(t){this.Ya=t.Qs,this.Xa=j();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return be.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const xs="SyncEngine";class Yh{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Jh{constructor(t){this.key=t,this.hu=!1}}class Zh{constructor(t,e,n,i,o,u){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=u,this.Pu={},this.Tu=new de((c=>va(c)),lr),this.Iu=new Map,this.Eu=new Set,this.du=new Y(k.comparator),this.Au=new Map,this.Ru=new As,this.Vu={},this.mu=new Map,this.fu=De.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function tf(r,t,e=!0){const n=du(r);let i;const o=n.Tu.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.lu()):i=await uu(n,t,e,!0),i}async function ef(r,t){const e=du(r);await uu(e,t,!0,!1)}async function uu(r,t,e,n){const i=await Ih(r.localStore,Dt(t)),o=i.targetId,u=r.sharedClientState.addLocalQueryTarget(o,e);let c;return n&&(c=await nf(r,t,o,u==="current",i.resumeToken)),r.isPrimaryClient&&e&&Ya(r.remoteStore,i),c}async function nf(r,t,e,n,i){r.pu=(I,P,S)=>(async function(x,N,K,G){let W=N.view.ru(K);W.Cs&&(W=await So(x.localStore,N.query,!1).then((({documents:E})=>N.view.ru(E,W))));const ft=G&&G.targetChanges.get(N.targetId),It=G&&G.targetMismatches.get(N.targetId)!=null,st=N.view.applyChanges(W,x.isPrimaryClient,ft,It);return Fo(x,N.targetId,st.au),st.snapshot})(r,I,P,S);const o=await So(r.localStore,t,!0),u=new Xh(t,o.Qs),c=u.ru(o.documents),h=yn.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",i),d=u.applyChanges(c,r.isPrimaryClient,h);Fo(r,e,d.au);const g=new Yh(t,e,u);return r.Tu.set(t,g),r.Iu.has(e)?r.Iu.get(e).push(t):r.Iu.set(e,[t]),d.snapshot}async function rf(r,t,e){const n=F(r),i=n.Tu.get(t),o=n.Iu.get(i.targetId);if(o.length>1)return n.Iu.set(i.targetId,o.filter((u=>!lr(u,t)))),void n.Tu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await os(n.localStore,i.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(i.targetId),e&&Ps(n.remoteStore,i.targetId),ls(n,i.targetId)})).catch(ke)):(ls(n,i.targetId),await os(n.localStore,i.targetId,!0))}async function sf(r,t){const e=F(r),n=e.Tu.get(t),i=e.Iu.get(n.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Ps(e.remoteStore,n.targetId))}async function of(r,t,e){const n=df(r);try{const i=await(function(u,c){const h=F(u),d=X.now(),g=c.reduce(((S,M)=>S.add(M.key)),j());let I,P;return h.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let M=Ut(),x=j();return h.Ns.getEntries(S,g).next((N=>{M=N,M.forEach(((K,G)=>{G.isValidDocument()||(x=x.add(K))}))})).next((()=>h.localDocuments.getOverlayedDocuments(S,M))).next((N=>{I=N;const K=[];for(const G of c){const W=Tc(G,I.get(G.key).overlayedDocument);W!=null&&K.push(new me(G.key,W,ma(W.value.mapValue),bt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,d,K,c)})).next((N=>{P=N;const K=N.applyToLocalDocumentSet(I,x);return h.documentOverlayCache.saveOverlays(S,N.batchId,K)}))})).then((()=>({batchId:P.batchId,changes:Ra(I)})))})(n.localStore,t);n.sharedClientState.addPendingMutation(i.batchId),(function(u,c,h){let d=u.Vu[u.currentUser.toKey()];d||(d=new Y(q)),d=d.insert(c,h),u.Vu[u.currentUser.toKey()]=d})(n,i.batchId,e),await Tn(n,i.changes),await pr(n.remoteStore)}catch(i){const o=Ns(i,"Failed to persist write");e.reject(o)}}async function lu(r,t){const e=F(r);try{const n=await yh(e.localStore,t);t.targetChanges.forEach(((i,o)=>{const u=e.Au.get(o);u&&(z(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?u.hu=!0:i.modifiedDocuments.size>0?z(u.hu,14607):i.removedDocuments.size>0&&(z(u.hu,42227),u.hu=!1))})),await Tn(e,n,t)}catch(n){await ke(n)}}function Lo(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const i=[];n.Tu.forEach(((o,u)=>{const c=u.view.va(t);c.snapshot&&i.push(c.snapshot)})),(function(u,c){const h=F(u);h.onlineState=c;let d=!1;h.queries.forEach(((g,I)=>{for(const P of I.Sa)P.va(c)&&(d=!0)})),d&&ks(h)})(n.eventManager,t),i.length&&n.Pu.H_(i),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function af(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const i=n.Au.get(t),o=i&&i.key;if(o){let u=new Y(k.comparator);u=u.insert(o,pt.newNoDocument(o,L.min()));const c=j().add(o),h=new dr(L.min(),new Map,new Y(q),u,c);await lu(n,h),n.du=n.du.remove(o),n.Au.delete(t),Ms(n)}else await os(n.localStore,t,!1).then((()=>ls(n,t,e))).catch(ke)}async function uf(r,t){const e=F(r),n=t.batch.batchId;try{const i=await _h(e.localStore,t);hu(e,n,null),cu(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await Tn(e,i)}catch(i){await ke(i)}}async function lf(r,t,e){const n=F(r);try{const i=await(function(u,c){const h=F(u);return h.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let g;return h.mutationQueue.lookupMutationBatch(d,c).next((I=>(z(I!==null,37113),g=I.keys(),h.mutationQueue.removeMutationBatch(d,I)))).next((()=>h.mutationQueue.performConsistencyCheck(d))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(d,g,c))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,g))).next((()=>h.localDocuments.getDocuments(d,g)))}))})(n.localStore,t);hu(n,t,e),cu(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await Tn(n,i)}catch(i){await ke(i)}}function cu(r,t){(r.mu.get(t)||[]).forEach((e=>{e.resolve()})),r.mu.delete(t)}function hu(r,t,e){const n=F(r);let i=n.Vu[n.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),n.Vu[n.currentUser.toKey()]=i}}function ls(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Iu.get(t))r.Tu.delete(n),e&&r.Pu.yu(n,e);r.Iu.delete(t),r.isPrimaryClient&&r.Ru.jr(t).forEach((n=>{r.Ru.containsKey(n)||fu(r,n)}))}function fu(r,t){r.Eu.delete(t.path.canonicalString());const e=r.du.get(t);e!==null&&(Ps(r.remoteStore,e),r.du=r.du.remove(t),r.Au.delete(e),Ms(r))}function Fo(r,t,e){for(const n of e)n instanceof ou?(r.Ru.addReference(n.key,t),cf(r,n)):n instanceof au?(b(xs,"Document no longer in limbo: "+n.key),r.Ru.removeReference(n.key,t),r.Ru.containsKey(n.key)||fu(r,n.key)):O(19791,{wu:n})}function cf(r,t){const e=t.key,n=e.path.canonicalString();r.du.get(e)||r.Eu.has(n)||(b(xs,"New document in limbo: "+e),r.Eu.add(n),Ms(r))}function Ms(r){for(;r.Eu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const t=r.Eu.values().next().value;r.Eu.delete(t);const e=new k(Q.fromString(t)),n=r.fu.next();r.Au.set(n,new Jh(e)),r.du=r.du.insert(e,n),Ya(r.remoteStore,new Kt(Dt(ys(e.path)),n,"TargetPurposeLimboResolution",or.ce))}}async function Tn(r,t,e){const n=F(r),i=[],o=[],u=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,h)=>{u.push(n.pu(h,t,e).then((d=>{var g;if((d||e)&&n.isPrimaryClient){const I=d?!d.fromCache:(g=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:g.current;n.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(d){i.push(d);const I=Rs.As(h.targetId,d);o.push(I)}})))})),await Promise.all(u),n.Pu.H_(i),await(async function(h,d){const g=F(h);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",(I=>V.forEach(d,(P=>V.forEach(P.Es,(S=>g.persistence.referenceDelegate.addReference(I,P.targetId,S))).next((()=>V.forEach(P.ds,(S=>g.persistence.referenceDelegate.removeReference(I,P.targetId,S)))))))))}catch(I){if(!xe(I))throw I;b(Vs,"Failed to update sequence numbers: "+I)}for(const I of d){const P=I.targetId;if(!I.fromCache){const S=g.Ms.get(P),M=S.snapshotVersion,x=S.withLastLimboFreeSnapshotVersion(M);g.Ms=g.Ms.insert(P,x)}}})(n.localStore,o))}async function hf(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){b(xs,"User change. New user:",t.toKey());const n=await Qa(e.localStore,t);e.currentUser=t,(function(o,u){o.mu.forEach((c=>{c.forEach((h=>{h.reject(new D(R.CANCELLED,u))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await Tn(e,n.Ls)}}function ff(r,t){const e=F(r),n=e.Au.get(t);if(n&&n.hu)return j().add(n.key);{let i=j();const o=e.Iu.get(t);if(!o)return i;for(const u of o){const c=e.Tu.get(u);i=i.unionWith(c.view.nu)}return i}}function du(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=lu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=ff.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=af.bind(null,t),t.Pu.H_=Wh.bind(null,t.eventManager),t.Pu.yu=Hh.bind(null,t.eventManager),t}function df(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=uf.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=lf.bind(null,t),t}class rr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=mr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return ph(this.persistence,new dh,t.initialUser,this.serializer)}Cu(t){return new Ka(ws.mi,this.serializer)}Du(t){return new Ah}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}rr.provider={build:()=>new rr};class mf extends rr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){z(this.persistence.referenceDelegate instanceof er,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Jc(n,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Tt.withCacheSize(this.cacheSizeBytes):Tt.DEFAULT;return new Ka((n=>er.mi(n,e)),this.serializer)}}class cs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Lo(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=hf.bind(null,this.syncEngine),await $h(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Qh})()}createDatastore(t){const e=mr(t.databaseInfo.databaseId),n=(function(o){return new Sh(o)})(t.databaseInfo);return(function(o,u,c,h){return new Nh(o,u,c,h)})(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return(function(n,i,o,u,c){return new xh(n,i,o,u,c)})(this.localStore,this.datastore,t.asyncQueue,(e=>Lo(this.syncEngine,e,0)),(function(){return bo.v()?new bo:new wh})())}createSyncEngine(t,e){return(function(i,o,u,c,h,d,g){const I=new Zh(i,o,u,c,h,d);return g&&(I.gu=!0),I})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(i){const o=F(i);b(he,"RemoteStore shutting down."),o.Ea.add(5),await En(o),o.Aa.shutdown(),o.Ra.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}cs.provider={build:()=>new cs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Ft("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee="FirestoreClient";class gf{constructor(t,e,n,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=i,this.user=gt.UNAUTHENTICATED,this.clientId=fs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,(async u=>{b(ee,"Received user=",u.uid),await this.authCredentialListener(u),this.user=u})),this.appCheckCredentials.start(n,(u=>(b(ee,"Received new app check token=",u),this.appCheckCredentialListener(u,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Lt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Ns(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function Qr(r,t){r.asyncQueue.verifyOperationInProgress(),b(ee,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener((async i=>{n.isEqual(i)||(await Qa(t.localStore,i),n=i)})),t.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=t}async function Uo(r,t){r.asyncQueue.verifyOperationInProgress();const e=await pf(r);b(ee,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener((n=>ko(t.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,i)=>ko(t.remoteStore,i))),r._onlineComponents=t}async function pf(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){b(ee,"Using user provided OfflineComponentProvider");try{await Qr(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(i){return i.name==="FirebaseError"?i.code===R.FAILED_PRECONDITION||i.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(e))throw e;Ve("Error using user provided cache. Falling back to memory cache: "+e),await Qr(r,new rr)}}else b(ee,"Using default OfflineComponentProvider"),await Qr(r,new mf(void 0));return r._offlineComponents}async function gu(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(b(ee,"Using user provided OnlineComponentProvider"),await Uo(r,r._uninitializedComponentsProvider._online)):(b(ee,"Using default OnlineComponentProvider"),await Uo(r,new cs))),r._onlineComponents}function _f(r){return gu(r).then((t=>t.syncEngine))}async function pu(r){const t=await gu(r),e=t.eventManager;return e.onListen=tf.bind(null,t.syncEngine),e.onUnlisten=rf.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=ef.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=sf.bind(null,t.syncEngine),e}function yf(r,t,e={}){const n=new Lt;return r.asyncQueue.enqueueAndForget((async()=>(function(o,u,c,h,d){const g=new mu({next:P=>{g.Nu(),u.enqueueAndForget((()=>su(o,I)));const S=P.docs.has(c);!S&&P.fromCache?d.reject(new D(R.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&P.fromCache&&h&&h.source==="server"?d.reject(new D(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(P)},error:P=>d.reject(P)}),I=new iu(ys(c.path),g,{includeMetadataChanges:!0,qa:!0});return ru(o,I)})(await pu(r),r.asyncQueue,t,e,n))),n.promise}function Ef(r,t,e={}){const n=new Lt;return r.asyncQueue.enqueueAndForget((async()=>(function(o,u,c,h,d){const g=new mu({next:P=>{g.Nu(),u.enqueueAndForget((()=>su(o,I))),P.fromCache&&h.source==="server"?d.reject(new D(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(P)},error:P=>d.reject(P)}),I=new iu(c,g,{includeMetadataChanges:!0,qa:!0});return ru(o,I)})(await pu(r),r.asyncQueue,t,e,n))),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _u(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu="firestore.googleapis.com",jo=!0;class Bo{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new D(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=yu,this.ssl=jo}else this.host=t.host,this.ssl=t.ssl??jo;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=$a;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Xc)throw new D(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}kl("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_u(t.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(n,i){return n.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class _r{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Bo({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Bo(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new Al;switch(n.type){case"firstParty":return new Pl(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const n=qo.get(e);n&&(b("ComponentProvider","Removing Datastore"),qo.delete(e),n.terminate())})(this),Promise.resolve()}}function Tf(r,t,e,n={}){var d;r=Ht(r,_r);const i=Wo(t),o=r._getSettings(),u={...o,emulatorOptions:r._getEmulatorOptions()},c=`${t}:${e}`;i&&(El(`https://${c}`),Tl("Firestore",!0)),o.host!==yu&&o.host!==c&&Ve("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:c,ssl:i,emulatorOptions:n};if(!Il(h,u)&&(r._setSettings(h),n.mockUserToken)){let g,I;if(typeof n.mockUserToken=="string")g=n.mockUserToken,I=gt.MOCK_USER;else{g=vl(n.mockUserToken,(d=r._app)==null?void 0:d.options.projectId);const P=n.mockUserToken.sub||n.mockUserToken.user_id;if(!P)throw new D(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");I=new gt(P)}r._authCredentials=new wl(new na(g,I))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Oe(this.firestore,t,this._query)}}class rt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new rt(this.firestore,t,this._key)}toJSON(){return{type:rt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(gn(e,rt._jsonSchema))return new rt(t,n||null,new k(Q.fromString(e.referencePath)))}}rt._jsonSchemaVersion="firestore/documentReference/1.0",rt._jsonSchema={type:nt("string",rt._jsonSchemaVersion),referencePath:nt("string")};class Wt extends Oe{constructor(t,e,n){super(t,e,ys(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new rt(this.firestore,null,new k(t))}withConverter(t){return new Wt(this.firestore,t,this._path)}}function Ff(r,t,...e){if(r=Re(r),ra("collection","path",t),r instanceof _r){const n=Q.fromString(t,...e);return to(n),new Wt(r,null,n)}{if(!(r instanceof rt||r instanceof Wt))throw new D(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Q.fromString(t,...e));return to(n),new Wt(r.firestore,null,n)}}function If(r,t,...e){if(r=Re(r),arguments.length===1&&(t=fs.newId()),ra("doc","path",t),r instanceof _r){const n=Q.fromString(t,...e);return Zi(n),new rt(r,null,new k(n))}{if(!(r instanceof rt||r instanceof Wt))throw new D(R.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Q.fromString(t,...e));return Zi(n),new rt(r.firestore,r instanceof Wt?r.converter:null,new k(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo="AsyncQueue";class Go{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ha(this,"async_queue_retry"),this._c=()=>{const n=Kr();n&&b(zo,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=t;const e=Kr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Kr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new Lt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!xe(t))throw t;b(zo,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((n=>{throw this.nc=n,this.rc=!1,Ft("INTERNAL UNHANDLED ERROR: ",$o(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const i=bs.createAndSchedule(this,t,e,n,(o=>this.hc(o)));return this.tc.push(i),i}uc(){this.nc&&O(47125,{Pc:$o(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,n)=>e.targetTimeMs-n.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function $o(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class In extends _r{constructor(t,e,n,i){super(t,e,n,i),this.type="firestore",this._queue=new Go,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Go(t),this._firestoreClient=void 0,await t}}}function Uf(r,t){const e=typeof r=="object"?r:pl(),n=typeof r=="string"?r:Hn,i=_l(e,"firestore").getImmediate({identifier:n});if(!i._initialized){const o=yl("firestore");o&&Tf(i,...o)}return i}function Os(r){if(r._terminated)throw new D(R.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||vf(r),r._firestoreClient}function vf(r){var n,i,o;const t=r._freezeSettings(),e=(function(c,h,d,g){return new Gl(c,h,d,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,_u(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator)})(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,t);r._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new gf(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&(function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}})(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new wt(ht.fromBase64String(t))}catch(e){throw new D(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new wt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:wt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(gn(t,wt._jsonSchema))return wt.fromBase64String(t.bytes)}}wt._jsonSchemaVersion="firestore/bytes/1.0",wt._jsonSchema={type:nt("string",wt._jsonSchemaVersion),bytes:nt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return q(this._lat,t._lat)||q(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:kt._jsonSchemaVersion}}static fromJSON(t){if(gn(t,kt._jsonSchema))return new kt(t.latitude,t.longitude)}}kt._jsonSchemaVersion="firestore/geoPoint/1.0",kt._jsonSchema={type:nt("string",kt._jsonSchemaVersion),latitude:nt("number"),longitude:nt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(n,i){if(n.length!==i.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==i[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:xt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(gn(t,xt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new xt(t.vectorValues);throw new D(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}xt._jsonSchemaVersion="firestore/vectorValue/1.0",xt._jsonSchema={type:nt("string",xt._jsonSchemaVersion),vectorValues:nt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Af=/^__.*__$/;class wf{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new me(t,this.data,this.fieldMask,e,this.fieldTransforms):new _n(t,this.data,e,this.fieldTransforms)}}function Eu(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{Ac:r})}}class Us{constructor(t,e,n,i,o,u){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=u||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new Us({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var i;const e=(i=this.path)==null?void 0:i.child(t),n=this.Vc({path:e,fc:!1});return n.gc(t),n}yc(t){var i;const e=(i=this.path)==null?void 0:i.child(t),n=this.Vc({path:e,fc:!1});return n.Rc(),n}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return sr(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(Eu(this.Ac)&&Af.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class Rf{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||mr(t)}Cc(t,e,n,i=!1){return new Us({Ac:t,methodName:e,Dc:n,path:ct.emptyPath(),fc:!1,bc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qs(r){const t=r._freezeSettings(),e=mr(r._databaseId);return new Rf(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Tu(r,t,e,n,i,o={}){const u=r.Cc(o.merge||o.mergeFields?2:0,t,e,i);Au("Data must be an object, but it was:",u,n);const c=Iu(n,u);let h,d;if(o.merge)h=new Rt(u.fieldMask),d=u.fieldTransforms;else if(o.mergeFields){const g=[];for(const I of o.mergeFields){const P=Pf(t,I,e);if(!u.contains(P))throw new D(R.INVALID_ARGUMENT,`Field '${P}' is specified in your field mask but missing from your input data.`);Cf(g,P)||g.push(P)}h=new Rt(g),d=u.fieldTransforms.filter((I=>h.covers(I.field)))}else h=null,d=u.fieldTransforms;return new wf(new At(c),h,d)}class js extends Fs{_toFieldTransform(t){return new pc(t.path,new fn)}isEqual(t){return t instanceof js}}function Vf(r,t,e,n=!1){return Bs(e,r.Cc(n?4:3,t))}function Bs(r,t){if(vu(r=Re(r)))return Au("Unsupported field value:",t,r),Iu(r,t);if(r instanceof Fs)return(function(n,i){if(!Eu(i.Ac))throw i.Sc(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Sc(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(n,i){const o=[];let u=0;for(const c of n){let h=Bs(c,i.wc(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}})(r,t)}return(function(n,i){if((n=Re(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return dc(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=X.fromDate(n);return{timestampValue:tr(i.serializer,o)}}if(n instanceof X){const o=new X(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:tr(i.serializer,o)}}if(n instanceof kt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof wt)return{bytesValue:Fa(i.serializer,n._byteString)};if(n instanceof rt){const o=i.databaseId,u=n.firestore._databaseId;if(!u.isEqual(o))throw i.Sc(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:vs(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof xt)return(function(u,c){return{mapValue:{fields:{[fa]:{stringValue:da},[Xn]:{arrayValue:{values:u.toArray().map((d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return Es(c.serializer,d)}))}}}}}})(n,i);throw i.Sc(`Unsupported field value: ${ir(n)}`)})(r,t)}function Iu(r,t){const e={};return oa(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):fe(r,((n,i)=>{const o=Bs(i,t.mc(n));o!=null&&(e[n]=o)})),{mapValue:{fields:e}}}function vu(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof X||r instanceof kt||r instanceof wt||r instanceof rt||r instanceof Fs||r instanceof xt)}function Au(r,t,e){if(!vu(e)||!sa(e)){const n=ir(e);throw n==="an object"?t.Sc(r+" a custom object"):t.Sc(r+" "+n)}}function Pf(r,t,e){if((t=Re(t))instanceof Ls)return t._internalPath;if(typeof t=="string")return wu(r,t);throw sr("Field path arguments must be of type string or ",r,!1,void 0,e)}const Sf=new RegExp("[~\\*/\\[\\]]");function wu(r,t,e){if(t.search(Sf)>=0)throw sr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Ls(...t.split("."))._internalPath}catch{throw sr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function sr(r,t,e,n,i){const o=n&&!n.isEmpty(),u=i!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||u)&&(h+=" (found",o&&(h+=` in field ${n}`),u&&(h+=` in document ${i}`),h+=")"),new D(R.INVALID_ARGUMENT,c+r+h)}function Cf(r,t){return r.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(t,e,n,i,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Df(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(zs("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Df extends Ru{data(){return super.data()}}function zs(r,t){return typeof t=="string"?wu(r,t):t instanceof Ls?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bf(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Gs{}class Nf extends Gs{}function qf(r,t,...e){let n=[];t instanceof Gs&&n.push(t),n=n.concat(e),(function(o){const u=o.filter((h=>h instanceof $s)).length,c=o.filter((h=>h instanceof yr)).length;if(u>1||u>0&&c>0)throw new D(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const i of n)r=i._apply(r);return r}class yr extends Nf{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new yr(t,e,n)}_apply(t){const e=this._parse(t);return Vu(t._query,e),new Oe(t.firestore,t.converter,ts(t._query,e))}_parse(t){const e=qs(t.firestore);return(function(o,u,c,h,d,g,I){let P;if(d.isKeyField()){if(g==="array-contains"||g==="array-contains-any")throw new D(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${g}' queries on documentId().`);if(g==="in"||g==="not-in"){Qo(I,g);const M=[];for(const x of I)M.push(Ko(h,o,x));P={arrayValue:{values:M}}}else P=Ko(h,o,I)}else g!=="in"&&g!=="not-in"&&g!=="array-contains-any"||Qo(I,g),P=Vf(c,u,I,g==="in"||g==="not-in");return et.create(d,g,P)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function jf(r,t,e){const n=t,i=zs("where",r);return yr._create(i,n,e)}class $s extends Gs{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new $s(t,e)}_parse(t){const e=this._queryConstraints.map((n=>n._parse(t))).filter((n=>n.getFilters().length>0));return e.length===1?e[0]:Vt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(i,o){let u=i;const c=o.getFlattenedFilters();for(const h of c)Vu(u,h),u=ts(u,h)})(t._query,e),new Oe(t.firestore,t.converter,ts(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Ko(r,t,e){if(typeof(e=Re(e))=="string"){if(e==="")throw new D(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ia(t)&&e.indexOf("/")!==-1)throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(Q.fromString(e));if(!k.isDocumentKey(n))throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return uo(r,new k(n))}if(e instanceof rt)return uo(r,e._key);throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ir(e)}.`)}function Qo(r,t){if(!Array.isArray(r)||r.length===0)throw new D(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Vu(r,t){const e=(function(i,o){for(const u of i)for(const c of u.getFlattenedFilters())if(o.indexOf(c.op)>=0)return c.op;return null})(r.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new D(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class kf{convertValue(t,e="none"){switch(Zt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Z(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Jt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return fe(t,((i,o)=>{n[i]=this.convertValue(o,e)})),n}convertVectorValue(t){var n,i,o;const e=(o=(i=(n=t.fields)==null?void 0:n[Xn].arrayValue)==null?void 0:i.values)==null?void 0:o.map((u=>Z(u.doubleValue)));return new xt(e)}convertGeoPoint(t){return new kt(Z(t.latitude),Z(t.longitude))}convertArray(t,e){return(t.values||[]).map((n=>this.convertValue(n,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=ur(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ln(t));default:return null}}convertTimestamp(t){const e=Yt(t);return new X(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Q.fromString(t);z(Ga(n),9688,{name:t});const i=new cn(n.get(1),n.get(3)),o=new k(n.popFirst(5));return i.isEqual(e)||Ft(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class nn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class le extends Ru{constructor(t,e,n,i,o,u){super(t,e,n,i,u),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Qn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(zs("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=le._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}le._jsonSchemaVersion="firestore/documentSnapshot/1.0",le._jsonSchema={type:nt("string",le._jsonSchemaVersion),bundleSource:nt("string","DocumentSnapshot"),bundleName:nt("string"),bundle:nt("string")};class Qn extends le{data(t={}){return super.data(t)}}class we{constructor(t,e,n,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new nn(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new Qn(this._firestore,this._userDataWriter,n.key,n,new nn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(i,o){if(i._snapshot.oldDocs.isEmpty()){let u=0;return i._snapshot.docChanges.map((c=>{const h=new Qn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new nn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:u++}}))}{let u=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((c=>o||c.type!==3)).map((c=>{const h=new Qn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new nn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,g=-1;return c.type!==0&&(d=u.indexOf(c.doc.key),u=u.delete(c.doc.key)),c.type!==1&&(u=u.add(c.doc),g=u.indexOf(c.doc.key)),{type:xf(c.type),doc:h,oldIndex:d,newIndex:g}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=we._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=fs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],i=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),n.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function xf(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bf(r){r=Ht(r,rt);const t=Ht(r.firestore,In);return yf(Os(t),r._key).then((e=>Mf(t,r,e)))}we._jsonSchemaVersion="firestore/querySnapshot/1.0",we._jsonSchema={type:nt("string",we._jsonSchemaVersion),bundleSource:nt("string","QuerySnapshot"),bundleName:nt("string"),bundle:nt("string")};class Su extends kf{constructor(t){super(),this.firestore=t}convertBytes(t){return new wt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new rt(this.firestore,null,e)}}function zf(r){r=Ht(r,Oe);const t=Ht(r.firestore,In),e=Os(t),n=new Su(t);return bf(r._query),Ef(e,r._query).then((i=>new we(t,n,r,i)))}function Gf(r,t,e){r=Ht(r,rt);const n=Ht(r.firestore,In),i=Pu(r.converter,t,e);return Cu(n,[Tu(qs(n),"setDoc",r._key,i,r.converter!==null,e).toMutation(r._key,bt.none())])}function $f(r,t){const e=Ht(r.firestore,In),n=If(r),i=Pu(r.converter,t);return Cu(e,[Tu(qs(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,bt.exists(!1))]).then((()=>n))}function Cu(r,t){return(function(n,i){const o=new Lt;return n.asyncQueue.enqueueAndForget((async()=>of(await _f(n),i,o))),o.promise})(Os(r),t)}function Mf(r,t,e){const n=e.docs.get(t._key),i=new Su(r);return new le(r,i,t._key,n,new nn(e.hasPendingWrites,e.fromCache),t.converter)}function Kf(){return new js("serverTimestamp")}(function(t,e=!0){(function(i){Ne=i})(fl),dl(new ml("firestore",((n,{instanceIdentifier:i,options:o})=>{const u=n.getProvider("app").getImmediate(),c=new In(new Rl(n.getProvider("auth-internal")),new Sl(u,n.getProvider("app-check-internal")),(function(d,g){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new D(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new cn(d.options.projectId,g)})(u,i),u);return o={useFetchStreams:e,...o},c._setSettings(o),c}),"PUBLIC").setMultipleInstances(!0)),Qi(Hi,Xi,t),Qi(Hi,Xi,"esm2020")})();export{kf as AbstractUserDataWriter,wt as Bytes,Wt as CollectionReference,rt as DocumentReference,le as DocumentSnapshot,Ls as FieldPath,Fs as FieldValue,In as Firestore,D as FirestoreError,kt as GeoPoint,Oe as Query,$s as QueryCompositeFilterConstraint,Nf as QueryConstraint,Qn as QueryDocumentSnapshot,yr as QueryFieldFilterConstraint,we as QuerySnapshot,nn as SnapshotMetadata,X as Timestamp,xt as VectorValue,fs as _AutoId,ht as _ByteString,cn as _DatabaseId,k as _DocumentKey,Al as _EmptyAuthCredentialsProvider,ct as _FieldPath,Ht as _cast,Ve as _logWarn,kl as _validateIsNotUsedTogether,$f as addDoc,Ff as collection,Tf as connectFirestoreEmulator,If as doc,Os as ensureFirestoreConfigured,Cu as executeWrite,Bf as getDoc,zf as getDocs,Uf as getFirestore,qf as query,Kf as serverTimestamp,Gf as setDoc,jf as where};
