(self.webpackChunkgame=self.webpackChunkgame||[]).push([[391],{9895:(n,e,t)=>{"use strict";t.d(e,{Z:()=>u});var o=t(1253),r=t(2122),i=t(7294),a=(t(5697),t(6010)),c=t(2543),l=i.forwardRef((function(n,e){var t=n.classes,c=n.className,l=n.component,u=void 0===l?"div":l,s=n.square,f=void 0!==s&&s,d=n.elevation,v=void 0===d?1:d,h=n.variant,p=void 0===h?"elevation":h,m=(0,o.Z)(n,["classes","className","component","square","elevation","variant"]);return i.createElement(u,(0,r.Z)({className:(0,a.Z)(t.root,c,"outlined"===p?t.outlined:t["elevation".concat(v)],!f&&t.rounded),ref:e},m))}));const u=(0,c.Z)((function(n){var e={};return n.shadows.forEach((function(n,t){e["elevation".concat(t)]={boxShadow:n}})),(0,r.Z)({root:{backgroundColor:n.palette.background.paper,color:n.palette.text.primary,transition:n.transitions.create("box-shadow")},rounded:{borderRadius:n.shape.borderRadius},outlined:{border:"1px solid ".concat(n.palette.divider)}},e)}),{name:"MuiPaper"})(l)},2387:(n,e,t)=>{"use strict";t.d(e,{ZP:()=>w});var o=t(2122),r=t(1253),i=t(7294),a=(t(5697),t(3935)),c=t(9437),l=t(6010),u=t(626),s=t(713),f=t(2568),d=t(2543),v=t(351),h=t(170),p=t(9895);function m(n,e){var t=0;return"number"==typeof e?t=e:"center"===e?t=n.height/2:"bottom"===e&&(t=n.height),t}function E(n,e){var t=0;return"number"==typeof e?t=e:"center"===e?t=n.width/2:"right"===e&&(t=n.width),t}function g(n){return[n.horizontal,n.vertical].map((function(n){return"number"==typeof n?"".concat(n,"px"):n})).join(" ")}function Z(n){return"function"==typeof n?n():n}var b=i.forwardRef((function(n,e){var t=n.action,d=n.anchorEl,b=n.anchorOrigin,w=void 0===b?{vertical:"top",horizontal:"left"}:b,x=n.anchorPosition,P=n.anchorReference,y=void 0===P?"anchorEl":P,C=n.children,k=n.classes,z=n.className,N=n.container,O=n.elevation,R=void 0===O?8:O,T=n.getContentAnchorEl,H=n.marginThreshold,M=void 0===H?16:H,D=n.onEnter,W=n.onEntered,A=n.onEntering,L=n.onExit,S=n.onExited,q=n.onExiting,B=n.open,V=n.PaperProps,j=void 0===V?{}:V,I=n.transformOrigin,X=void 0===I?{vertical:"top",horizontal:"left"}:I,Y=n.TransitionComponent,F=void 0===Y?h.Z:Y,G=n.transitionDuration,J=void 0===G?"auto":G,K=n.TransitionProps,Q=void 0===K?{}:K,U=(0,r.Z)(n,["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","classes","className","container","elevation","getContentAnchorEl","marginThreshold","onEnter","onEntered","onEntering","onExit","onExited","onExiting","open","PaperProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps"]),$=i.useRef(),_=i.useCallback((function(n){if("anchorPosition"===y)return x;var e=Z(d),t=(e&&1===e.nodeType?e:(0,u.Z)($.current).body).getBoundingClientRect(),o=0===n?w.vertical:"center";return{top:t.top+m(t,o),left:t.left+E(t,w.horizontal)}}),[d,w.horizontal,w.vertical,x,y]),nn=i.useCallback((function(n){var e=0;if(T&&"anchorEl"===y){var t=T(n);if(t&&n.contains(t)){var o=function(n,e){for(var t=e,o=0;t&&t!==n;)o+=(t=t.parentElement).scrollTop;return o}(n,t);e=t.offsetTop+t.clientHeight/2-o||0}}return e}),[w.vertical,y,T]),en=i.useCallback((function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return{vertical:m(n,X.vertical)+e,horizontal:E(n,X.horizontal)}}),[X.horizontal,X.vertical]),tn=i.useCallback((function(n){var e=nn(n),t={width:n.offsetWidth,height:n.offsetHeight},o=en(t,e);if("none"===y)return{top:null,left:null,transformOrigin:g(o)};var r=_(e),i=r.top-o.vertical,a=r.left-o.horizontal,c=i+t.height,l=a+t.width,u=(0,s.Z)(Z(d)),f=u.innerHeight-M,v=u.innerWidth-M;if(i<M){var h=i-M;i-=h,o.vertical+=h}else if(c>f){var p=c-f;i-=p,o.vertical+=p}if(a<M){var m=a-M;a-=m,o.horizontal+=m}else if(l>v){var E=l-v;a-=E,o.horizontal+=E}return{top:"".concat(Math.round(i),"px"),left:"".concat(Math.round(a),"px"),transformOrigin:g(o)}}),[d,y,_,nn,en,M]),on=i.useCallback((function(){var n=$.current;if(n){var e=tn(n);null!==e.top&&(n.style.top=e.top),null!==e.left&&(n.style.left=e.left),n.style.transformOrigin=e.transformOrigin}}),[tn]),rn=i.useCallback((function(n){$.current=a.findDOMNode(n)}),[]);i.useEffect((function(){B&&on()})),i.useImperativeHandle(t,(function(){return B?{updatePosition:function(){on()}}:null}),[B,on]),i.useEffect((function(){if(B){var n=(0,c.Z)((function(){on()}));return window.addEventListener("resize",n),function(){n.clear(),window.removeEventListener("resize",n)}}}),[B,on]);var an=J;"auto"!==J||F.muiSupportAuto||(an=void 0);var cn=N||(d?(0,u.Z)(Z(d)).body:void 0);return i.createElement(v.Z,(0,o.Z)({container:cn,open:B,ref:e,BackdropProps:{invisible:!0},className:(0,l.Z)(k.root,z)},U),i.createElement(F,(0,o.Z)({appear:!0,in:B,onEnter:D,onEntered:W,onExit:L,onExited:S,onExiting:q,timeout:an},Q,{onEntering:(0,f.Z)((function(n,e){A&&A(n,e),on()}),Q.onEntering)}),i.createElement(p.Z,(0,o.Z)({elevation:R,ref:rn},j,{className:(0,l.Z)(k.paper,j.className)}),C)))}));const w=(0,d.Z)({root:{},paper:{position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}},{name:"MuiPopover"})(b)},6234:(n,e,t)=>{"use strict";t.d(e,{Z:()=>l});var o=t(7294),r=t(3935),i=(t(5697),t(4236)),a=t(7149),c="undefined"!=typeof window?o.useLayoutEffect:o.useEffect;const l=o.forwardRef((function(n,e){var t=n.children,l=n.container,u=n.disablePortal,s=void 0!==u&&u,f=n.onRendered,d=o.useState(null),v=d[0],h=d[1],p=(0,a.Z)(o.isValidElement(t)?t.ref:null,e);return c((function(){s||h(function(n){return n="function"==typeof n?n():n,r.findDOMNode(n)}(l)||document.body)}),[l,s]),c((function(){if(v&&!s)return(0,i.Z)(e,v),function(){(0,i.Z)(e,null)}}),[e,v,s]),c((function(){f&&(v||s)&&f()}),[f,v,s]),s?o.isValidElement(t)?o.cloneElement(t,{ref:p}):t:v?r.createPortal(t,v):v}))}}]);