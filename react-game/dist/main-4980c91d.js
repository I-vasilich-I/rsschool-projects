(self.webpackChunkgame=self.webpackChunkgame||[]).push([[474],{2337:(t,n,r)=>{var e=r(1467),i=Math.max,o=Math.min;t.exports=function(t,n){return(t=e(t))<0?i(t+n,0):o(t,n)}},4843:(t,n,r)=>{var e=r(1467),i=r(875);t.exports=function(t){if(void 0===t)return 0;var n=e(t),r=i(n);if(n!==r)throw RangeError("Wrong length!");return r}},1467:t=>{var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},2110:(t,n,r)=>{var e=r(9797),i=r(1355);t.exports=function(t){return e(i(t))}},875:(t,n,r)=>{var e=r(1467),i=Math.min;t.exports=function(t){return t>0?i(e(t),9007199254740991):0}},508:(t,n,r)=>{var e=r(1355);t.exports=function(t){return Object(e(t))}},1689:(t,n,r)=>{var e=r(5286);t.exports=function(t,n){if(!e(t))return t;var r,i;if(n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;if("function"==typeof(r=t.valueOf)&&!e(i=r.call(t)))return i;if(!n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},8440:(t,n,r)=>{"use strict";if(r(7057)){var e=r(4461),i=r(3816),o=r(4253),u=r(2985),f=r(9383),c=r(1125),a=r(741),s=r(3328),l=r(681),h=r(7728),p=r(4408),v=r(1467),g=r(875),y=r(4843),w=r(2337),d=r(1689),b=r(9181),E=r(1488),A=r(5286),S=r(508),_=r(6555),I=r(2503),m=r(468),x=r(616).f,F=r(9002),B=r(3953),L=r(6314),T=r(50),U=r(9315),N=r(8364),O=r(6997),P=r(2803),M=r(7462),V=r(2974),W=r(6852),R=r(5216),D=r(9275),C=r(8693),k=D.f,j=C.f,Y=i.RangeError,G=i.TypeError,q=i.Uint8Array,z="ArrayBuffer",H="SharedArrayBuffer",J="BYTES_PER_ELEMENT",K=Array.prototype,Q=c.ArrayBuffer,X=c.DataView,Z=T(0),$=T(2),tt=T(3),nt=T(4),rt=T(5),et=T(6),it=U(!0),ot=U(!1),ut=O.values,ft=O.keys,ct=O.entries,at=K.lastIndexOf,st=K.reduce,lt=K.reduceRight,ht=K.join,pt=K.sort,vt=K.slice,gt=K.toString,yt=K.toLocaleString,wt=L("iterator"),dt=L("toStringTag"),bt=B("typed_constructor"),Et=B("def_constructor"),At=f.CONSTR,St=f.TYPED,_t=f.VIEW,It="Wrong length!",mt=T(1,(function(t,n){return Tt(N(t,t[Et]),n)})),xt=o((function(){return 1===new q(new Uint16Array([1]).buffer)[0]})),Ft=!!q&&!!q.prototype.set&&o((function(){new q(1).set({})})),Bt=function(t,n){var r=v(t);if(r<0||r%n)throw Y("Wrong offset!");return r},Lt=function(t){if(A(t)&&St in t)return t;throw G(t+" is not a typed array!")},Tt=function(t,n){if(!A(t)||!(bt in t))throw G("It is not a typed array constructor!");return new t(n)},Ut=function(t,n){return Nt(N(t,t[Et]),n)},Nt=function(t,n){for(var r=0,e=n.length,i=Tt(t,e);e>r;)i[r]=n[r++];return i},Ot=function(t,n,r){k(t,n,{get:function(){return this._d[r]}})},Pt=function(t){var n,r,e,i,o,u,f=S(t),c=arguments.length,s=c>1?arguments[1]:void 0,l=void 0!==s,h=F(f);if(null!=h&&!_(h)){for(u=h.call(f),e=[],n=0;!(o=u.next()).done;n++)e.push(o.value);f=e}for(l&&c>2&&(s=a(s,arguments[2],2)),n=0,r=g(f.length),i=Tt(this,r);r>n;n++)i[n]=l?s(f[n],n):f[n];return i},Mt=function(){for(var t=0,n=arguments.length,r=Tt(this,n);n>t;)r[t]=arguments[t++];return r},Vt=!!q&&o((function(){yt.call(new q(1))})),Wt=function(){return yt.apply(Vt?vt.call(Lt(this)):Lt(this),arguments)},Rt={copyWithin:function(t,n){return R.call(Lt(this),t,n,arguments.length>2?arguments[2]:void 0)},every:function(t){return nt(Lt(this),t,arguments.length>1?arguments[1]:void 0)},fill:function(t){return W.apply(Lt(this),arguments)},filter:function(t){return Ut(this,$(Lt(this),t,arguments.length>1?arguments[1]:void 0))},find:function(t){return rt(Lt(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function(t){return et(Lt(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function(t){Z(Lt(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function(t){return ot(Lt(this),t,arguments.length>1?arguments[1]:void 0)},includes:function(t){return it(Lt(this),t,arguments.length>1?arguments[1]:void 0)},join:function(t){return ht.apply(Lt(this),arguments)},lastIndexOf:function(t){return at.apply(Lt(this),arguments)},map:function(t){return mt(Lt(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function(t){return st.apply(Lt(this),arguments)},reduceRight:function(t){return lt.apply(Lt(this),arguments)},reverse:function(){for(var t,n=this,r=Lt(n).length,e=Math.floor(r/2),i=0;i<e;)t=n[i],n[i++]=n[--r],n[r]=t;return n},some:function(t){return tt(Lt(this),t,arguments.length>1?arguments[1]:void 0)},sort:function(t){return pt.call(Lt(this),t)},subarray:function(t,n){var r=Lt(this),e=r.length,i=w(t,e);return new(N(r,r[Et]))(r.buffer,r.byteOffset+i*r.BYTES_PER_ELEMENT,g((void 0===n?e:w(n,e))-i))}},Dt=function(t,n){return Ut(this,vt.call(Lt(this),t,n))},Ct=function(t){Lt(this);var n=Bt(arguments[1],1),r=this.length,e=S(t),i=g(e.length),o=0;if(i+n>r)throw Y(It);for(;o<i;)this[n+o]=e[o++]},kt={entries:function(){return ct.call(Lt(this))},keys:function(){return ft.call(Lt(this))},values:function(){return ut.call(Lt(this))}},jt=function(t,n){return A(t)&&t[St]&&"symbol"!=typeof n&&n in t&&String(+n)==String(n)},Yt=function(t,n){return jt(t,n=d(n,!0))?l(2,t[n]):j(t,n)},Gt=function(t,n,r){return!(jt(t,n=d(n,!0))&&A(r)&&b(r,"value"))||b(r,"get")||b(r,"set")||r.configurable||b(r,"writable")&&!r.writable||b(r,"enumerable")&&!r.enumerable?k(t,n,r):(t[n]=r.value,t)};At||(C.f=Yt,D.f=Gt),u(u.S+u.F*!At,"Object",{getOwnPropertyDescriptor:Yt,defineProperty:Gt}),o((function(){gt.call({})}))&&(gt=yt=function(){return ht.call(this)});var qt=p({},Rt);p(qt,kt),h(qt,wt,kt.values),p(qt,{slice:Dt,set:Ct,constructor:function(){},toString:gt,toLocaleString:Wt}),Ot(qt,"buffer","b"),Ot(qt,"byteOffset","o"),Ot(qt,"byteLength","l"),Ot(qt,"length","e"),k(qt,dt,{get:function(){return this[St]}}),t.exports=function(t,n,r,c){var a=t+((c=!!c)?"Clamped":"")+"Array",l="get"+t,p="set"+t,v=i[a],w=v||{},d=v&&m(v),b=!v||!f.ABV,S={},_=v&&v.prototype,F=function(t,r){k(t,r,{get:function(){return function(t,r){var e=t._d;return e.v[l](r*n+e.o,xt)}(this,r)},set:function(t){return function(t,r,e){var i=t._d;c&&(e=(e=Math.round(e))<0?0:e>255?255:255&e),i.v[p](r*n+i.o,e,xt)}(this,r,t)},enumerable:!0})};b?(v=r((function(t,r,e,i){s(t,v,a,"_d");var o,u,f,c,l=0,p=0;if(A(r)){if(!(r instanceof Q||(c=E(r))==z||c==H))return St in r?Nt(v,r):Pt.call(v,r);o=r,p=Bt(e,n);var w=r.byteLength;if(void 0===i){if(w%n)throw Y(It);if((u=w-p)<0)throw Y(It)}else if((u=g(i)*n)+p>w)throw Y(It);f=u/n}else f=y(r),o=new Q(u=f*n);for(h(t,"_d",{b:o,o:p,l:u,e:f,v:new X(o)});l<f;)F(t,l++)})),_=v.prototype=I(qt),h(_,"constructor",v)):o((function(){v(1)}))&&o((function(){new v(-1)}))&&M((function(t){new v,new v(null),new v(1.5),new v(t)}),!0)||(v=r((function(t,r,e,i){var o;return s(t,v,a),A(r)?r instanceof Q||(o=E(r))==z||o==H?void 0!==i?new w(r,Bt(e,n),i):void 0!==e?new w(r,Bt(e,n)):new w(r):St in r?Nt(v,r):Pt.call(v,r):new w(y(r))})),Z(d!==Function.prototype?x(w).concat(x(d)):x(w),(function(t){t in v||h(v,t,w[t])})),v.prototype=_,e||(_.constructor=v));var B=_[wt],L=!!B&&("values"==B.name||null==B.name),T=kt.values;h(v,bt,!0),h(_,St,a),h(_,_t,!0),h(_,Et,v),(c?new v(1)[dt]==a:dt in _)||k(_,dt,{get:function(){return a}}),S[a]=v,u(u.G+u.W+u.F*(v!=w),S),u(u.S,a,{BYTES_PER_ELEMENT:n}),u(u.S+u.F*o((function(){w.of.call(v,1)})),a,{from:Pt,of:Mt}),J in _||h(_,J,n),u(u.P,a,Rt),V(a),u(u.P+u.F*Ft,a,{set:Ct}),u(u.P+u.F*!L,a,kt),e||_.toString==gt||(_.toString=gt),u(u.P+u.F*o((function(){new v(1).slice()})),a,{slice:Dt}),u(u.P+u.F*(o((function(){return[1,2].toLocaleString()!=new v([1,2]).toLocaleString()}))||!o((function(){_.toLocaleString.call([1,2])}))),a,{toLocaleString:Wt}),P[a]=L?B:T,e||L||h(_,wt,T)}}else t.exports=function(){}},1125:(t,n,r)=>{"use strict";var e=r(3816),i=r(7057),o=r(4461),u=r(9383),f=r(7728),c=r(4408),a=r(4253),s=r(3328),l=r(1467),h=r(875),p=r(4843),v=r(616).f,g=r(9275).f,y=r(6852),w=r(2943),d="ArrayBuffer",b="DataView",E="Wrong index!",A=e.ArrayBuffer,S=e.DataView,_=e.Math,I=e.RangeError,m=e.Infinity,x=A,F=_.abs,B=_.pow,L=_.floor,T=_.log,U=_.LN2,N="buffer",O="byteLength",P="byteOffset",M=i?"_b":N,V=i?"_l":O,W=i?"_o":P;function R(t,n,r){var e,i,o,u=new Array(r),f=8*r-n-1,c=(1<<f)-1,a=c>>1,s=23===n?B(2,-24)-B(2,-77):0,l=0,h=t<0||0===t&&1/t<0?1:0;for((t=F(t))!=t||t===m?(i=t!=t?1:0,e=c):(e=L(T(t)/U),t*(o=B(2,-e))<1&&(e--,o*=2),(t+=e+a>=1?s/o:s*B(2,1-a))*o>=2&&(e++,o/=2),e+a>=c?(i=0,e=c):e+a>=1?(i=(t*o-1)*B(2,n),e+=a):(i=t*B(2,a-1)*B(2,n),e=0));n>=8;u[l++]=255&i,i/=256,n-=8);for(e=e<<n|i,f+=n;f>0;u[l++]=255&e,e/=256,f-=8);return u[--l]|=128*h,u}function D(t,n,r){var e,i=8*r-n-1,o=(1<<i)-1,u=o>>1,f=i-7,c=r-1,a=t[c--],s=127&a;for(a>>=7;f>0;s=256*s+t[c],c--,f-=8);for(e=s&(1<<-f)-1,s>>=-f,f+=n;f>0;e=256*e+t[c],c--,f-=8);if(0===s)s=1-u;else{if(s===o)return e?NaN:a?-m:m;e+=B(2,n),s-=u}return(a?-1:1)*e*B(2,s-n)}function C(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]}function k(t){return[255&t]}function j(t){return[255&t,t>>8&255]}function Y(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function G(t){return R(t,52,8)}function q(t){return R(t,23,4)}function z(t,n,r){g(t.prototype,n,{get:function(){return this[r]}})}function H(t,n,r,e){var i=p(+r);if(i+n>t[V])throw I(E);var o=t[M]._b,u=i+t[W],f=o.slice(u,u+n);return e?f:f.reverse()}function J(t,n,r,e,i,o){var u=p(+r);if(u+n>t[V])throw I(E);for(var f=t[M]._b,c=u+t[W],a=e(+i),s=0;s<n;s++)f[c+s]=a[o?s:n-s-1]}if(u.ABV){if(!a((function(){A(1)}))||!a((function(){new A(-1)}))||a((function(){return new A,new A(1.5),new A(NaN),A.name!=d}))){for(var K,Q=(A=function(t){return s(this,A),new x(p(t))}).prototype=x.prototype,X=v(x),Z=0;X.length>Z;)(K=X[Z++])in A||f(A,K,x[K]);o||(Q.constructor=A)}var $=new S(new A(2)),tt=S.prototype.setInt8;$.setInt8(0,2147483648),$.setInt8(1,2147483649),!$.getInt8(0)&&$.getInt8(1)||c(S.prototype,{setInt8:function(t,n){tt.call(this,t,n<<24>>24)},setUint8:function(t,n){tt.call(this,t,n<<24>>24)}},!0)}else A=function(t){s(this,A,d);var n=p(t);this._b=y.call(new Array(n),0),this[V]=n},S=function(t,n,r){s(this,S,b),s(t,A,b);var e=t[V],i=l(n);if(i<0||i>e)throw I("Wrong offset!");if(i+(r=void 0===r?e-i:h(r))>e)throw I("Wrong length!");this[M]=t,this[W]=i,this[V]=r},i&&(z(A,O,"_l"),z(S,N,"_b"),z(S,O,"_l"),z(S,P,"_o")),c(S.prototype,{getInt8:function(t){return H(this,1,t)[0]<<24>>24},getUint8:function(t){return H(this,1,t)[0]},getInt16:function(t){var n=H(this,2,t,arguments[1]);return(n[1]<<8|n[0])<<16>>16},getUint16:function(t){var n=H(this,2,t,arguments[1]);return n[1]<<8|n[0]},getInt32:function(t){return C(H(this,4,t,arguments[1]))},getUint32:function(t){return C(H(this,4,t,arguments[1]))>>>0},getFloat32:function(t){return D(H(this,4,t,arguments[1]),23,4)},getFloat64:function(t){return D(H(this,8,t,arguments[1]),52,8)},setInt8:function(t,n){J(this,1,t,k,n)},setUint8:function(t,n){J(this,1,t,k,n)},setInt16:function(t,n){J(this,2,t,j,n,arguments[2])},setUint16:function(t,n){J(this,2,t,j,n,arguments[2])},setInt32:function(t,n){J(this,4,t,Y,n,arguments[2])},setUint32:function(t,n){J(this,4,t,Y,n,arguments[2])},setFloat32:function(t,n){J(this,4,t,q,n,arguments[2])},setFloat64:function(t,n){J(this,8,t,G,n,arguments[2])}});w(A,d),w(S,b),f(S.prototype,u.VIEW,!0),n.ArrayBuffer=A,n.DataView=S},9383:(t,n,r)=>{for(var e,i=r(3816),o=r(7728),u=r(3953),f=u("typed_array"),c=u("view"),a=!(!i.ArrayBuffer||!i.DataView),s=a,l=0,h="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");l<9;)(e=i[h[l++]])?(o(e.prototype,f,!0),o(e.prototype,c,!0)):s=!1;t.exports={ABV:a,CONSTR:s,TYPED:f,VIEW:c}}}]);