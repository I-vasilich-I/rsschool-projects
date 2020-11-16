(()=>{"use strict";(()=>{function t(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var i=[],o=!0,n=!1,s=void 0;try{for(var r,a=t[Symbol.iterator]();!(o=(r=a.next()).done)&&(i.push(r.value),!e||i.length!==e);o=!0);}catch(t){n=!0,s=t}finally{try{o||null==a.return||a.return()}finally{if(n)throw s}}return i}}(t,e)||o(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||o(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){if(t){if("string"==typeof t)return n(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?n(t,e):void 0}}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,o=new Array(e);i<e;i++)o[i]=t[i];return o}function s(o,n,s,r){var a,l=null;try{l=document.createElement(o)}catch(t){throw new Error("Unable to create HTMLElemnt! Wrong data")}n&&(a=l.classList).add.apply(a,i(n.split(" "))),s&&Array.isArray(s)?s.forEach((function(t){return t&&l.appendChild(t)})):s&&"object"===e(s)?l.appendChild(s):s&&"string"==typeof s&&(l.innerHTML=s),r&&r.appendChild(l);for(var h=arguments.length,c=new Array(h>4?h-4:0),u=4;u<h;u++)c[u-4]=arguments[u];return c.length&&c.forEach((function(e){var i=t(e,2),o=i[0],n=i[1];""===n&&l.setAttribute(o,""),o.match(/value|id|placeholder|rows|autocorretc|spellcheck|src|alt|type/)?l.setAttribute(o,n):l.dataset[o]=n})),l}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var l,h,c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;r(this,t),this.startTime=0,this.elapsedTime=e}var e,i;return e=t,(i=[{key:"timeToText",value:function(t){var e=t/36e5,i=60*(e-Math.floor(e)),o=Math.floor(i),n=60*(i-o),s=Math.floor(n);return"".concat(this.padTime(o),":").concat(this.padTime(s))}},{key:"padTime",value:function(t){return t.toString().padStart(2,"0")}},{key:"start",value:function(t){var e=this;this.startTime=Date.now()-this.elapsedTime,l=setInterval((function(){e.elapsedTime=Date.now()-e.startTime,e.setElapsedTime(t,e.elapsedTime)}),1e3)}},{key:"stop",value:function(){return clearInterval(l),this.getElapsedTime()}},{key:"getElapsedTime",value:function(){return this.elapsedTime}},{key:"setElapsedTime",value:function(t,e){t.innerHTML="Time: ".concat(this.timeToText(e))}}])&&a(e.prototype,i),t}(),u=function t(e,i,o,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.posicionX=e,this.posicionY=i,this.value=o,this.elem=n};function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var f=function(){function t(e,i,o){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;p(this,t),this.imageSrc=n,this.that=i,this.tileSize=o,this.boardSize=e,this.tilesAmount=e*e-1}var e,i;return e=t,(i=[{key:"init",value:function(){var t=this;return h=new Image,null===this.imageSrc&&(this.imageSrc="./box/".concat(Math.floor(Math.random()*Math.floor(150)),".jpg")),h.src=this.imageSrc,h.onload=function(){t.splitImg()},this}},{key:"splitImg",value:function(){var t=this;h.width=this.tileSize*this.boardSize,h.height=h.width;for(var e=h.width/this.boardSize,i=h.height/this.boardSize,o=function(o){t.that.tiles.forEach((function(n){if(n.value===o+1){var s=o%t.boardSize,r=(o-s)/t.boardSize;n.elem.style.backgroundImage="url(".concat(h.src,")"),n.elem.style.backgroundPosition="-".concat(s*e,"px -").concat(r*i,"px"),n.elem.style.backgroundSize="".concat(h.height,"px"),n.elem.style.fontSize="0px"}}))},n=0;n<this.tilesAmount;n++)o(n)}},{key:"removeImg",value:function(){for(var t=0;t<this.tilesAmount;t++)this.that.tiles.forEach((function(t){t.elem.style.backgroundImage="",t.elem.style.backgroundPosition="",t.elem.style.backgroundSize="",t.elem.style.fontSize=""}))}}])&&d(e.prototype,i),t}();function m(t){this.grid=[],this.fixed=[],this.numbers=[],this.solution=[],this.originalGrid=t}function y(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var i=[],o=!0,n=!1,s=void 0;try{for(var r,a=t[Symbol.iterator]();!(o=(r=a.next()).done)&&(i.push(r.value),!e||i.length!==e);o=!0);}catch(t){n=!0,s=t}finally{try{o||null==a.return||a.return()}finally{if(n)throw s}}return i}}(t,e)||g(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t){return function(t){if(Array.isArray(t))return b(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||g(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(t,e){if(t){if("string"==typeof t)return b(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?b(t,e):void 0}}function b(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,o=new Array(e);i<e;i++)o[i]=t[i];return o}function x(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}m.prototype.setupSolver=function(){this.numbers=[],this.fixed=[],this.grid=[];for(var t=0;t<this.originalGrid.length;t++){this.fixed[t]=[],this.grid[t]=[];for(var e=0;e<this.originalGrid.length;e++){var i=this.originalGrid[t][e];this.grid[t][e]=i,this.fixed[t][e]=!1,this.numbers[i]={x:e,y:t}}}},m.prototype.solve=function(){this.setupSolver();try{this.solveGrid(this.grid.length)}catch(t){return console.log(t.message),null}return this.solution},m.prototype.solveGrid=function(t){t>2?(this.solveRow(t),this.solveColumn(t),this.solveGrid(t-1)):2==t&&(this.solveRow(t),""===this.grid[this.grid.length-1][this.grid.length-t]&&this.swapE({x:this.grid.length-1,y:this.grid.length-1}))},m.prototype.solveRow=function(t){for(var e=this.grid.length-t,i=e;i<this.grid.length-2;i++){var o=e*this.grid.length+(i+1);this.moveNumberTowards(o,{x:i,y:e}),this.fixed[e][i]=!0}var n=e*this.grid.length+this.grid.length-1,s=n+1;if(this.moveNumberTowards(n,{x:this.grid.length-1,y:e}),this.moveNumberTowards(s,{x:this.grid.length-1,y:e+1}),this.numbers[n].x!=this.grid.length-1||this.numbers[n].y!=e||this.numbers[s].x!=this.grid.length-1||this.numbers[s].y!=e+1){this.moveNumberTowards(n,{x:this.grid.length-1,y:e}),this.moveNumberTowards(s,{x:this.grid.length-2,y:e}),this.moveEmptyTo({x:this.grid.length-2,y:e+1});var r={x:this.grid.length-1,y:e+1};this.applyRelativeMoveList(r,["ul","u","","l","dl","d","","l","ul","u","","l","ul","u","","d"])}this.specialTopRightRotation(e)},m.prototype.solveColumn=function(t){for(var e=this.grid.length-t,i=e;i<this.grid.length-2;i++){var o=i*this.grid.length+1+e;this.moveNumberTowards(o,{x:e,y:i}),this.fixed[i][e]=!0}var n=(this.grid.length-2)*this.grid.length+1+e,s=n+this.grid.length;if(this.moveNumberTowards(n,{x:e,y:this.grid.length-1}),this.moveNumberTowards(s,{x:e+1,y:this.grid.length-1}),this.numbers[n].x!=e||this.numbers[n].y!=this.grid.length-1||this.numbers[s].x!=e+1||this.numbers[s].y!=this.grid.length-1){this.moveNumberTowards(n,{x:e,y:this.grid.length-1}),this.moveNumberTowards(s,{x:e,y:this.grid.length-2}),this.moveEmptyTo({x:e+1,y:this.grid.length-2});var r={x:e+1,y:this.grid.length-1};this.applyRelativeMoveList(r,["ul","l","","u","ur","r","","u","ul","l","","u","ul","l","","r"])}this.specialLeftBottomRotation(e)},m.prototype.applyRelativeMoveList=function(t,e){for(var i=0;i<e.length;i++)""==e[i]?this.swapE(t):this.swapE(this.offsetPosition(t,e[i]))},m.prototype.moveNumberTowards=function(t,e){if(this.numbers[t].x!=e.x||this.numbers[t].y!=e.y)for(this.makeEmptyNeighborTo(t);this.numbers[t].x!=e.x||this.numbers[t].y!=e.y;){var i=this.getDirectionToProceed(t,e);if(!this.areNeighbors(t,""))throw"cannot rotate without empty";"u"==i||"d"==i?this.rotateVertical(t,"u"==i):this.rotateHorizontal(t,"l"==i)}},m.prototype.rotateHorizontal=function(t,e){var i=e?"l":"r",o=e?"r":"l",n=this.numbers[""],s=this.numbers[t];if(n.y!=s.y){var r=n.y<s.y?"u":"d";this.moveable(this.offsetPosition(s,r+i))&&this.moveable(this.offsetPosition(s,r))?(this.swapE(this.offsetPosition(s,r+i)),this.swapE(this.offsetPosition(s,i))):(this.swapE(this.offsetPosition(s,r+o)),this.swapE(this.offsetPosition(s,o)),this.proper3By2RotationHorizontal(s,e))}else(n.x<s.x&&!e||n.x>s.x&&e)&&this.proper3By2RotationHorizontal(s,e);this.swapE(s)},m.prototype.proper3By2RotationHorizontal=function(t,e){var i=e?"l":"r",o=e?"r":"l",n="u";if(this.moveable(this.offsetPosition(t,"d".concat(i)))&&this.moveable(this.offsetPosition(t,"d"))&&this.moveable(this.offsetPosition(t,"d".concat(o))))n="d";else if(!this.moveable(this.offsetPosition(t,"u".concat(i)))||!this.moveable(this.offsetPosition(t,"u"))||!this.moveable(this.offsetPosition(t,"u".concat(o))))throw"unable to move up all spots fixed";this.swapE(this.offsetPosition(t,n+o)),this.swapE(this.offsetPosition(t,n)),this.swapE(this.offsetPosition(t,n+i)),this.swapE(this.offsetPosition(t,i))},m.prototype.rotateVertical=function(t,e){var i=e?"u":"d",o=e?"d":"u",n=this.numbers[""],s=this.numbers[t];if(n.x!=s.x){var r=n.x<s.x?"l":"r";this.moveable(this.offsetPosition(s,i+r))&&this.moveable(this.offsetPosition(s,r))?(this.swapE(this.offsetPosition(s,i+r)),this.swapE(this.offsetPosition(s,i))):(this.swapE(this.offsetPosition(s,o+r)),this.swapE(this.offsetPosition(s,o)),this.proper2By3RotationVertical(s,e))}else(n.y<s.y&&!e||n.y>s.y&&e)&&this.proper2By3RotationVertical(s,e);this.swapE(s)},m.prototype.proper2By3RotationVertical=function(t,e){var i=e?"u":"d",o=e?"d":"u",n="r";if(this.moveable(this.offsetPosition(t,"".concat(i,"l")))&&this.moveable(this.offsetPosition(t,"l"))&&this.moveable(this.offsetPosition(t,"".concat(o,"l"))))n="l";else if(!this.moveable(this.offsetPosition(t,"".concat(i,"r")))||!this.moveable(this.offsetPosition(t,"r"))||!this.moveable(this.offsetPosition(t,"".concat(o,"r"))))throw"Unable to preform move, the puzzle is quite possibly unsolveable";this.swapE(this.offsetPosition(t,o+n)),this.swapE(this.offsetPosition(t,n)),this.swapE(this.offsetPosition(t,i+n)),this.swapE(this.offsetPosition(t,i))},m.prototype.specialTopRightRotation=function(t){this.fixed[t][this.grid.length-1]=!0,this.fixed[t+1][this.grid.length-1]=!0;var e={x:this.grid.length-1,y:t};this.moveEmptyTo(this.offsetPosition(e,"l")),this.swapE(e),this.swapE(this.offsetPosition(e,"d")),this.fixed[t+1][this.grid.length-1]=!1,this.fixed[e.y][e.x-1]=!0},m.prototype.specialLeftBottomRotation=function(t){this.fixed[this.grid.length-1][t]=!0,this.fixed[this.grid.length-1][t+1]=!0;var e={x:t,y:this.grid.length-1};this.moveEmptyTo(this.offsetPosition(e,"u")),this.swapE(e),this.swapE(this.offsetPosition(e,"r")),this.fixed[this.grid.length-1][t+1]=!1,this.fixed[e.y-1][e.x]=!0},m.prototype.getDirectionToProceed=function(t,e){var i=this.numbers[t],o=e.x-i.x,n=e.y-i.y;if(o<0&&this.moveable({x:i.x-1,y:i.y}))return"l";if(o>0&&this.moveable({x:i.x+1,y:i.y}))return"r";if(n<0&&this.moveable({x:i.x,y:i.y-1}))return"u";if(n>0&&this.moveable({x:i.x,y:i.y+1}))return"d";throw"There is no valid move, the puzzle was incorrectly shuffled"},m.prototype.makeEmptyNeighborTo=function(t,e){for(var i=this.numbers[t],o=1;(this.numbers[""].x!=i.x||this.numbers[""].y!=i.y)&&!this.areNeighbors("",t);)if(this.movingEmptyLoop(i),++o>100)throw"Infinite loop hit while solving the puzzle, it is quite likely this puzzle is invalid"},m.prototype.moveEmptyTo=function(t){if(this.fixed[t.y][t.x])throw"cannot move empty to a fixed position";for(var e=1;this.numbers[""].x!=t.x||this.numbers[""].y!=t.y;)if(this.movingEmptyLoop(t),++e>100){console.log("problem trying to move the piece");break}},m.prototype.movingEmptyLoop=function(t){var e=this.numbers[""],i=e.x-t.x,o=e.y-t.y;i<0&&this.canSwap(e,this.offsetPosition(e,"r"))?this.swap(e,this.offsetPosition(e,"r")):i>0&&this.canSwap(e,this.offsetPosition(e,"l"))?this.swap(e,this.offsetPosition(e,"l")):o<0&&this.canSwap(e,this.offsetPosition(e,"d"))?this.swap(e,this.offsetPosition(e,"d")):o>0&&this.canSwap(e,this.offsetPosition(e,"u"))&&this.swap(e,this.offsetPosition(e,"u"))},m.prototype.offsetPosition=function(t,e){return"u"==e?{x:t.x,y:t.y-1}:"d"==e?{x:t.x,y:t.y+1}:"l"==e?{x:t.x-1,y:t.y}:"r"==e?{x:t.x+1,y:t.y}:"ul"==e?{x:t.x-1,y:t.y-1}:"ur"==e?{x:t.x+1,y:t.y-1}:"dl"==e?{x:t.x-1,y:t.y+1}:"dr"==e?{x:t.x+1,y:t.y+1}:t},m.prototype.areNeighbors=function(t,e){var i=this.numbers[t],o=this.numbers[e];return 1==Math.abs(i.x-o.x)&&i.y==o.y||1==Math.abs(i.y-o.y)&&i.x==o.x},m.prototype.moveable=function(t){return this.validPos(t)&&!this.fixed[t.y][t.x]},m.prototype.validPos=function(t){return!(t.x<0||t.x>=this.grid.length||t.y<0||t.y>=this.grid.length)},m.prototype.canSwap=function(t,e){if(!this.validPos(t)||!this.validPos(e))return!1;var i=this.grid[t.y][t.x],o=this.grid[e.y][e.x];return!!this.areNeighbors(i,o)&&!(this.fixed[t.y][t.x]||this.fixed[e.y][e.x])},m.prototype.swapE=function(t){this.swap(this.numbers[""],t)},m.prototype.swap=function(t,e){var i=this.grid[t.y][t.x],o=this.grid[e.y][e.x];if(!this.areNeighbors(i,o))throw"These numbers are not neighbors and cannot be swapped";if(""!=i&&""!=o)throw"You must swap with an empty space";var n=this.numbers[i];this.numbers[i]=this.numbers[o],this.numbers[o]=n,this.grid[t.y][t.x]=o,this.grid[e.y][e.x]=i,this.solution.push({empty:""==i?t:e,piece:""==i?e:t,number:""==i?o:i})};var w=0,T=100,S=4;T=(Math.min(window.innerWidth,window.innerHeight)-40)/S-10,T=Math.min(T,100);var k,E=S*S,P=s("header"),I=s("div","header__wrapper",null,P),z=s("div","inform-container",null,I),M=s("time","timer",null,z),A=s("div","counter",null,z),O=s("button","",null,z),W=s("main"),C=s("div","game-board",null,W),G=s("footer"),N=s("div","footer__wrapper",null,G),L=s("button","footer__button",null,N),R=s("button","footer__button",null,N),_=s("div","checkbox__container",null,N),H=s("div","checkbox",null,_),j=s("input","",null,H,["type","checkbox"],["id","soundEffects"]);j.checked=!0,s("lable","",null,H).innerText="Sound effects";var B=s("div","checkbox",null,_),Y=s("input","",null,B,["type","checkbox"],["id","backgroundImg"]);Y.checked=!0,s("lable","",null,B).innerText="Background image";var D=s("audio","",null,N,["src","shifting.wav"]),X=s("audio","",null,N,["src","Ta_Da.wav"]);(new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.isTimerOn=0,this.elapsedTime=0,this.tiles=[],this.emptyTile=new u(S-1,S-1,0,null),this.stopWatch=new c(this.elapsedTime),this.solved=!1}var e,i;return e=t,(i=[{key:"init",value:function(){var t=this;return C.style.width="".concat(T*S,"px"),C.style.height="".concat(T*S,"px"),I.style.width="".concat(T*S+10,"px"),N.style.width="".concat(T*S+10,"px"),M.innerText="Time: 00:00",A.innerText="Moves: ".concat(w),O.innerText="Pause",O.disabled=!0,L.innerText="Menu",R.innerText="Solve",document.body.prepend(G),document.body.prepend(W),document.body.prepend(P),window.addEventListener("resize",(function(){t.adaptiveResize()})),this.backgroundImageClass=null,Y.addEventListener("click",(function(){Y.checked?t.backgroundImageClass.imageSrc&&t.setImagesOnTiles(t.backgroundImageClass.imageSrc):t.backgroundImageClass.removeImg()})),this}},{key:"generateTiles",value:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(e)do{k=v(Array(E-1).keys()).map((function(t){return t+1})).sort((function(){return Math.random()-.5}))}while(!this.isGameSolveble());for(var i=function(e){var i=e%S,o=(e-i)/S,n=s("div","tile","".concat(k[e]),C);n.style.left="".concat(i*T,"px"),n.style.top="".concat(o*T,"px"),window.innerWidth<400||window.innerHeight<400||(window.innerWidth<800||window.innerHeight<800)&&S>6?(n.style.fontSize="16px",n.style.borderRadius="5px",n.style.boxShadow="2px 2px 2px",n.style.width="".concat(T-5,"px"),n.style.height="".concat(T-5,"px")):(n.style.fontSize="",n.style.borderRadius="",n.style.boxShadow="",n.style.width="".concat(T-10,"px"),n.style.height="".concat(T-10,"px"));var r=new u(i,o,k[e],n);t.tiles.push(r),C.appendChild(r.elem),n.addEventListener("click",(function(){t.moveTile(r)}))},o=0;o<k.length;o++)i(o);return Y.checked&&(this.imageSrcSolve?(this.setImagesOnTiles(this.imageSrcSolve),this.imageSrcSolve=null):this.setImagesOnTiles()),this}},{key:"generateLoadedTiles",value:function(){var t=this;this.tiles.forEach((function(e){var i=e.posicionX,o=e.posicionY,n=s("div","tile","".concat(e.value),C);n.style.left="".concat(i*T,"px"),n.style.top="".concat(o*T,"px"),window.innerWidth<400||window.innerHeight<400||(window.innerWidth<800||window.innerHeight<800)&&S>6?(n.style.fontSize="16px",n.style.borderRadius="5px",n.style.boxShadow="2px 2px 2px",n.style.width="".concat(T-5,"px"),n.style.height="".concat(T-5,"px")):(n.style.fontSize="",n.style.borderRadius="",n.style.boxShadow="",n.style.width="".concat(T-10,"px"),n.style.height="".concat(T-10,"px")),e.elem=n,C.appendChild(e.elem),n.addEventListener("click",(function(){t.moveTile(e)}))})),Y.checked&&this.setImagesOnTiles(this.backgroundImageClass.imageSrc)}},{key:"activateButtons",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];e?(this.newGame.addEventListener("click",(function(){confirm("Are you sure you want to start a new game?")&&t.startNewGame(),t.popup.innerHTML="",document.body.removeChild(t.popup),z.removeChild(O),N.removeChild(L),N.removeChild(R),L=null,O=null,R=null,t.activateButtons()})),this.loadGame.addEventListener("click",(function(){if(confirm("Are you sure you want to end this game and load saved game?")){var e=JSON.parse(localStorage.getItem("SavedGame-".concat(S)));if(e){var i;t.pauseTime();var o=y(e,5);t.tiles=o[0],t.emptyTile=o[1],i=o[2],w=o[3],t.backgroundImageClass.imageSrc=o[4],C.innerHTML="",t.generateLoadedTiles(),t.stopWatch=new c(i),t.stopWatch.setElapsedTime(M,i),A.innerText="Moves: ".concat(w)}else alert("There are no saved ".concat(S,"x").concat(S," games yet."))}document.body.removeChild(t.popup)})),this.saveGame.addEventListener("click",(function(){t.pauseTime(),JSON.parse(localStorage.getItem("SavedGame-".concat(S)))?confirm("There is already saved game. Would you like to rewrite it?")&&(localStorage.setItem("SavedGame-".concat(S),JSON.stringify([t.tiles,t.emptyTile,t.stopWatch.getElapsedTime(),w,t.backgroundImageClass.imageSrc])),alert("Game ".concat(S,"x").concat(S," saved"))):(localStorage.setItem("SavedGame-".concat(S),JSON.stringify([t.tiles,t.emptyTile,t.stopWatch.getElapsedTime(),w,t.backgroundImageClass.imageSrc])),alert("Game ".concat(S,"x").concat(S," saved"))),document.body.removeChild(t.popup)}))):(null!==L&&null!==O&&null!==R||(L=s("button","footer__button",null),R=s("button","footer__button",null),N.prepend(R),N.prepend(L),(O=s("button","",null,z)).innerText="Pause",O.disabled=!0,L.innerText="Menu",R.innerText="Solve"),O.addEventListener("click",(function(){t.isTimerOn?t.pauseTime():(t.isTimerOn++,1!==t.isTimerOn||t.AreWeDone||t.resumeTime())})),L.addEventListener("click",(function(){t.isTimerOn&&t.pauseTime(),t.generatePopup()})),R.addEventListener("click",(function(){t.solve()})))}},{key:"moveTile",value:function(t){var e=t.elem,i=t.posicionX,o=t.posicionY;Math.abs(i-this.emptyTile.posicionX)+Math.abs(o-this.emptyTile.posicionY)>1||(this.isTimerOn++,w++,A.innerText="Moves: ".concat(w),e.style.left="".concat(this.emptyTile.posicionX*T,"px"),e.style.top="".concat(this.emptyTile.posicionY*T,"px"),t.posicionX=this.emptyTile.posicionX,t.posicionY=this.emptyTile.posicionY,this.emptyTile.posicionX=i,this.emptyTile.posicionY=o,D.currentTime=0,j.checked&&D.play(),this.AreWeDone&&this.startNewGame(),this.AreWeDone=this.isWin(),this.onOffStopWatch())}},{key:"winMessage",value:function(){var t=this;j.checked&&X.play(),setTimeout((function(){alert("Hooray! You solved the puzzle in ".concat(t.stopWatch.timeToText(t.stopWatch.getElapsedTime())," and ").concat(w," moves"))}),500)}},{key:"isWin",value:function(){return this.tiles.every((function(t){return t.value===t.posicionY*S+t.posicionX+1}))}},{key:"onOffStopWatch",value:function(){this.AreWeDone&&(this.pauseTime(),O.disabled=!0,this.winMessage(),this.solved||this.saveBestScore()),1===this.isTimerOn&&this.resumeTime()}},{key:"pauseTime",value:function(){this.stopWatch.stop(),this.isTimerOn=0,O.innerText="Resume"}},{key:"resumeTime",value:function(){this.stopWatch.start(M),O.innerText="Pause",O.disabled=!1}},{key:"isGameSolveble",value:function(){for(var t=0,e=0;e<k.length;e++)for(var i=e+1;i<k.length;i++)k[i]<k[e]&&t++;var o=S;return o%2&&(o=0),(t+=o)%2==0}},{key:"generatePopup",value:function(){var t=this;this.popup=s("div","popup blackout",null),this.popup.addEventListener("click",(function(e){"popup blackout"===e.target.className&&(t.popup.innerHTML="",document.body.removeChild(t.popup))}));var e=s("div","popup__container",null,this.popup);this.newGame=s("button","footer__button",null,e),this.newGame.innerText="New Game",this.loadGame=s("button","footer__button",null,e),this.loadGame.innerText="Load Game",this.saveGame=s("button","footer__button",null,e),this.saveGame.innerText="Save Game",this.select=s("select","",null,e),s("option","",null,this.select,["value",0]).innerText="Size";for(var i=3;i<9;i++)s("option","",null,this.select,["value","".concat(i)]).innerText="".concat(i,"x").concat(i);s("p","score__title",null,e).innerText="Best score";var o=s("div","popup__score",null,e),n=JSON.parse(localStorage.getItem("score-".concat(S))),r=0;n&&n.forEach((function(e){if(10!==r){var i=e.date,n=e.time,a=e.moves;s("div","",null,o).innerText=i,s("div","",null,o).innerText="".concat(S,"x").concat(S),s("div","",null,o).innerText=t.stopWatch.timeToText(n),s("div","",null,o).innerText=a,r++}})),document.body.prepend(this.popup),this.activateButtons(!0)}},{key:"saveBestScore",value:function(){var t={date:new Intl.DateTimeFormat("en-US").format(new Date),time:this.stopWatch.getElapsedTime(),moves:w},e=[];(e=JSON.parse(localStorage.getItem("score-".concat(S))))?e.push(t):(e=[]).push(t),e=function(t){for(var e=0;e<t.length;e++)for(var i=e;i<t.length;i++)if(t[e].time>t[i].time||t[e].time===t[i].time&&t[e].moves>t[i].moves){var o=[t[i],t[e]];t[e]=o[0],t[i]=o[1]}return t}(e),localStorage.setItem("score-".concat(S),JSON.stringify(e))}},{key:"adaptiveResize",value:function(){T=(Math.min(window.innerWidth,window.innerHeight)-40)/S-10,T=Math.min(T,100),T=Math.max(T,25),C.style.width="".concat(T*S,"px"),C.style.height="".concat(T*S,"px"),I.style.width="".concat(T*S+10,"px"),N.style.width="".concat(T*S+10,"px"),this.tiles.forEach((function(t){var e=t.posicionX,i=t.posicionY,o=t.elem;o.style.left="".concat(e*T,"px"),o.style.top="".concat(i*T,"px"),window.innerWidth<400||window.innerHeight<400||(window.innerWidth<800||window.innerHeight<800)&&S>6?(o.style.fontSize="16px",o.style.borderRadius="5px",o.style.boxShadow="2px 2px 2px",o.style.width="".concat(T-5,"px"),o.style.height="".concat(T-5,"px")):(o.style.fontSize="",o.style.borderRadius="",o.style.boxShadow="",o.style.width="".concat(T-10,"px"),o.style.height="".concat(T-10,"px"))})),Y.checked&&this.backgroundImageClass.imageSrc&&this.setImagesOnTiles(this.backgroundImageClass.imageSrc)}},{key:"startNewGame",value:function(){var t,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.solved=!1,this.stopWatch.stop(),O.disabled=!0,this.isTimerOn=0,this.elapsedTime=0,this.AreWeDone=!1,w=0,M.innerText="Time: 00:00",A.innerText="Moves: ".concat(w),this.stopWatch=new c(this.elapsedTime),this.select&&(t=+this.select.value),C.innerHTML="",t>0&&(E=(S=t)*S,T=(Math.min(window.innerWidth,window.innerHeight)-40)/S-10,T=Math.min(T,100),T=Math.max(T,25),C.style.width="".concat(T*S,"px"),C.style.height="".concat(T*S,"px"),I.style.width="".concat(T*S+10,"px"),N.style.width="".concat(T*S+10,"px")),this.emptyTile=new u(S-1,S-1,0,null),this.tiles.length=0,this.generateTiles(e)}},{key:"setImagesOnTiles",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=new f(S,this,T,t);this.backgroundImageClass=e.init()}},{key:"solve",value:function(){var t=this;if(!this.AreWeDone){this.emptyTile.posicionX!==this.emptyTile.posicionY&&this.emptyTile.posicionY!==S-1&&(alert("In order to solve this puzzle, it would be restored to starting position and then would be solved"),this.imageSrcSolve=this.backgroundImageClass.imageSrc,this.startNewGame(!1)),this.solved=!0;var e=new m(function(t,e,i){var o=t.slice(0,t.length),n=i.posicionY*e+i.posicionX;o.splice(n,0,i);for(var s=[],r=0;r<o.length;r+=e)s.push(o.slice(r,r+e).map((function(t){return 0===t.value?"":t.value})));return s}(this.tiles,S,this.emptyTile)).solve();null===e&&(alert("In order to solve this puzzle, it would be restored to starting position and then would be solved"),this.imageSrcSolve=this.backgroundImageClass.imageSrc,this.startNewGame(!1)),this.preparedSolution=[],e.forEach((function(e){t.tiles.forEach((function(i){i.value===e.number&&t.preparedSolution.push(i)}))}));var i=0;console.log("Max amount of moves needed to solve the puzzle: ",this.preparedSolution.length);var o=setInterval((function(){!t.AreWeDone&&i<=t.preparedSolution.length?(t.moveTile(t.preparedSolution[i]),i++):clearInterval(o)}),500)}}}])&&x(e.prototype,i),t}())).init().generateTiles().activateButtons()})()})();