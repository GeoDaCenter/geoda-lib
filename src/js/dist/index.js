var Pn=Object.create;var Ar=Object.defineProperty;var $n=Object.getOwnPropertyDescriptor;var Cn=Object.getOwnPropertyNames;var wn=Object.getPrototypeOf,Tn=Object.prototype.hasOwnProperty;var Fr=(d=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(d,{get:(c,i)=>(typeof require<"u"?require:c)[i]}):d)(function(d){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+d+'" is not supported')});var An=(d,c)=>()=>(c||d((c={exports:{}}).exports,c),c.exports);var Fn=(d,c,i,h)=>{if(c&&typeof c=="object"||typeof c=="function")for(let p of Cn(c))!Tn.call(d,p)&&p!==i&&Ar(d,p,{get:()=>c[p],enumerable:!(h=$n(c,p))||h.enumerable});return d};var Dn=(d,c,i)=>(i=d!=null?Pn(wn(d)):{},Fn(c||!d||!d.__esModule?Ar(i,"default",{value:d,enumerable:!0}):i,d));var Ir=An((Rr,Ge)=>{"use strict";var Dr=(()=>{var d=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(d=d||__filename),function(c={}){var i=c,h,p;i.ready=new Promise((e,r)=>{h=e,p=r});var _=Object.assign({},i),F=[],m="./this.program",y=(e,r)=>{throw r},$=typeof window=="object",w=typeof importScripts=="function",T=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",g="";function R(e){return i.locateFile?i.locateFile(e,g):g+e}var E,x,z,V;if(T){var ve=Fr("fs"),Z=Fr("path");w?g=Z.dirname(g)+"/":g=__dirname+"/",E=(e,r)=>(e=me(e)?new URL(e):Z.normalize(e),ve.readFileSync(e,r?void 0:"utf8")),z=e=>{var r=E(e,!0);return r.buffer||(r=new Uint8Array(r)),r},x=(e,r,t,n=!0)=>{e=me(e)?new URL(e):Z.normalize(e),ve.readFile(e,n?void 0:"utf8",(o,a)=>{o?t(o):r(n?a.buffer:a)})},!i.thisProgram&&process.argv.length>1&&(m=process.argv[1].replace(/\\/g,"/")),F=process.argv.slice(2),y=(e,r)=>{throw process.exitCode=e,r},i.inspect=()=>"[Emscripten Module object]"}else($||w)&&(w?g=self.location.href:typeof document<"u"&&document.currentScript&&(g=document.currentScript.src),d&&(g=d),g.indexOf("blob:")!==0?g=g.substr(0,g.replace(/[?#].*/,"").lastIndexOf("/")+1):g="",E=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.send(null),r.responseText},w&&(z=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)}),x=(e,r,t)=>{var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=()=>{if(n.status==200||n.status==0&&n.response){r(n.response);return}t()},n.onerror=t,n.send(null)},V=e=>document.title=e);var On=i.print||console.log.bind(console),ae=i.printErr||console.error.bind(console);Object.assign(i,_),_=null,i.arguments&&(F=i.arguments),i.thisProgram&&(m=i.thisProgram),i.quit&&(y=i.quit);var se;i.wasmBinary&&(se=i.wasmBinary);var jn=i.noExitRuntime||!0;typeof WebAssembly!="object"&&ye("no native wasm support detected");var he,He=!1,Ur,Q,M,ue,ge,re,D,Ne,Le;function ze(){var e=he.buffer;i.HEAP8=Q=new Int8Array(e),i.HEAP16=ue=new Int16Array(e),i.HEAPU8=M=new Uint8Array(e),i.HEAPU16=ge=new Uint16Array(e),i.HEAP32=re=new Int32Array(e),i.HEAPU32=D=new Uint32Array(e),i.HEAPF32=Ne=new Float32Array(e),i.HEAPF64=Le=new Float64Array(e)}var qe,Ke=[],Xe=[],Ze=[],Er=!1;function Vr(){if(i.preRun)for(typeof i.preRun=="function"&&(i.preRun=[i.preRun]);i.preRun.length;)xr(i.preRun.shift());Ie(Ke)}function Or(){Er=!0,Ie(Xe)}function jr(){if(i.postRun)for(typeof i.postRun=="function"&&(i.postRun=[i.postRun]);i.postRun.length;)Gr(i.postRun.shift());Ie(Ze)}function xr(e){Ke.unshift(e)}function Br(e){Xe.unshift(e)}function Gr(e){Ze.unshift(e)}var Y=0,Re=null,le=null;function Hr(e){Y++,i.monitorRunDependencies&&i.monitorRunDependencies(Y)}function Nr(e){if(Y--,i.monitorRunDependencies&&i.monitorRunDependencies(Y),Y==0&&(Re!==null&&(clearInterval(Re),Re=null),le)){var r=le;le=null,r()}}function ye(e){i.onAbort&&i.onAbort(e),e="Aborted("+e+")",ae(e),He=!0,Ur=1,e+=". Build with -sASSERTIONS for more info.";var r=new WebAssembly.RuntimeError(e);throw p(r),r}var Lr="data:application/octet-stream;base64,";function Qe(e){return e.startsWith(Lr)}function me(e){return e.startsWith("file://")}var te;(te = '../../../../../geoda.wasm'), Qe(te) || (te = R(te));function Ye(e){if(e==te&&se)return new Uint8Array(se);if(z)return z(e);throw"both async and sync fetching of the wasm failed"}function zr(e){if(!se&&($||w)){if(typeof fetch=="function"&&!me(e))return fetch(e,{credentials:"same-origin"}).then(r=>{if(!r.ok)throw"failed to load wasm binary file at '"+e+"'";return r.arrayBuffer()}).catch(()=>Ye(e));if(x)return new Promise((r,t)=>{x(e,n=>r(new Uint8Array(n)),t)})}return Promise.resolve().then(()=>Ye(e))}function Je(e,r,t){return zr(e).then(n=>WebAssembly.instantiate(n,r)).then(n=>n).then(t,n=>{ae(`failed to asynchronously prepare wasm: ${n}`),ye(n)})}function qr(e,r,t,n){return!e&&typeof WebAssembly.instantiateStreaming=="function"&&!Qe(r)&&!me(r)&&!T&&typeof fetch=="function"?fetch(r,{credentials:"same-origin"}).then(o=>{var a=WebAssembly.instantiateStreaming(o,t);return a.then(n,function(u){return ae(`wasm streaming compile failed: ${u}`),ae("falling back to ArrayBuffer instantiation"),Je(r,t,n)})}):Je(r,t,n)}function Kr(){var e={a:hn};function r(n,o){var a=n.exports;return a=bn(a),O=a,he=O.v,ze(),qe=O.x,Br(O.w),Nr("wasm-instantiate"),a}Hr("wasm-instantiate");function t(n){r(n.instance)}if(i.instantiateWasm)try{return i.instantiateWasm(e,r)}catch(n){ae(`Module.instantiateWasm callback failed with error: ${n}`),p(n)}return qr(se,te,e,t).catch(p),{}}var Ie=e=>{for(;e.length>0;)e.shift()(i)},er=[],be=0,rr=0,Xr=()=>{var e=er.pop();e||ye("no exception to throw");var r=e.excPtr;throw e.get_rethrown()||(er.push(e),e.set_rethrown(!0),e.set_caught(!1),rr++),be=r,be};function Zr(e){this.excPtr=e,this.ptr=e-24,this.set_type=function(r){D[this.ptr+4>>>2>>>0]=r},this.get_type=function(){return D[this.ptr+4>>>2>>>0]},this.set_destructor=function(r){D[this.ptr+8>>>2>>>0]=r},this.get_destructor=function(){return D[this.ptr+8>>>2>>>0]},this.set_caught=function(r){r=r?1:0,Q[this.ptr+12>>>0>>>0]=r},this.get_caught=function(){return Q[this.ptr+12>>>0>>>0]!=0},this.set_rethrown=function(r){r=r?1:0,Q[this.ptr+13>>>0>>>0]=r},this.get_rethrown=function(){return Q[this.ptr+13>>>0>>>0]!=0},this.init=function(r,t){this.set_adjusted_ptr(0),this.set_type(r),this.set_destructor(t)},this.set_adjusted_ptr=function(r){D[this.ptr+16>>>2>>>0]=r},this.get_adjusted_ptr=function(){return D[this.ptr+16>>>2>>>0]},this.get_exception_ptr=function(){var r=Pr(this.get_type());if(r)return D[this.excPtr>>>2>>>0];var t=this.get_adjusted_ptr();return t!==0?t:this.excPtr}}function Qr(e,r,t){e>>>=0,r>>>=0,t>>>=0;var n=new Zr(e);throw n.init(r,t),be=e,rr++,be}function Yr(e,r,t,n,o){e>>>=0,r>>>=0,t>>>=0}var Jr=()=>{for(var e=new Array(256),r=0;r<256;++r)e[r]=String.fromCharCode(r);tr=e},tr=void 0,S=e=>{for(var r="",t=e;M[t>>>0];)r+=tr[M[t++>>>0]];return r},ne={},J={},_e={},ie=void 0,b=e=>{throw new ie(e)},nr=void 0,Pe=e=>{throw new nr(e)},oe=(e,r,t)=>{e.forEach(function(s){_e[s]=r});function n(s){var f=t(s);f.length!==e.length&&Pe("Mismatched type converter count");for(var l=0;l<e.length;++l)B(e[l],f[l])}var o=new Array(r.length),a=[],u=0;r.forEach((s,f)=>{J.hasOwnProperty(s)?o[f]=J[s]:(a.push(s),ne.hasOwnProperty(s)||(ne[s]=[]),ne[s].push(()=>{o[f]=J[s],++u,u===a.length&&n(o)}))}),a.length===0&&n(o)};function et(e,r,t={}){var n=r.name;if(e||b(`type "${n}" must have a positive integer typeid pointer`),J.hasOwnProperty(e)){if(t.ignoreDuplicateRegistrations)return;b(`Cannot register type '${n}' twice`)}if(J[e]=r,delete _e[e],ne.hasOwnProperty(e)){var o=ne[e];delete ne[e],o.forEach(a=>a())}}function B(e,r,t={}){if(!("argPackAdvance"in r))throw new TypeError("registerType registeredInstance requires argPackAdvance");return et(e,r,t)}var q=8;function rt(e,r,t,n){e>>>=0,r>>>=0,r=S(r),B(e,{name:r,fromWireType:function(o){return!!o},toWireType:function(o,a){return a?t:n},argPackAdvance:q,readValueFromPointer:function(o){return this.fromWireType(M[o>>>0])},destructorFunction:null})}function tt(e){if(!(this instanceof K)||!(e instanceof K))return!1;for(var r=this.$$.ptrType.registeredClass,t=this.$$.ptr,n=e.$$.ptrType.registeredClass,o=e.$$.ptr;r.baseClass;)t=r.upcast(t),r=r.baseClass;for(;n.baseClass;)o=n.upcast(o),n=n.baseClass;return r===n&&t===o}var nt=e=>({count:e.count,deleteScheduled:e.deleteScheduled,preservePointerOnDelete:e.preservePointerOnDelete,ptr:e.ptr,ptrType:e.ptrType,smartPtr:e.smartPtr,smartPtrType:e.smartPtrType}),Me=e=>{function r(t){return t.$$.ptrType.registeredClass.name}b(r(e)+" instance already deleted")},ke=!1,ir=e=>{},it=e=>{e.smartPtr?e.smartPtrType.rawDestructor(e.smartPtr):e.ptrType.registeredClass.rawDestructor(e.ptr)},or=e=>{e.count.value-=1;var r=e.count.value===0;r&&it(e)},ar=(e,r,t)=>{if(r===t)return e;if(t.baseClass===void 0)return null;var n=ar(e,r,t.baseClass);return n===null?null:t.downcast(n)},sr={},ot=()=>Object.keys(de).length,at=()=>{var e=[];for(var r in de)de.hasOwnProperty(r)&&e.push(de[r]);return e},ce=[],Se=()=>{for(;ce.length;){var e=ce.pop();e.$$.deleteScheduled=!1,e.delete()}},fe=void 0,st=e=>{fe=e,ce.length&&fe&&fe(Se)},ut=()=>{i.getInheritedInstanceCount=ot,i.getLiveInheritedInstances=at,i.flushPendingDeletes=Se,i.setDelayFunction=st},de={},lt=(e,r)=>{for(r===void 0&&b("ptr should not be undefined");e.baseClass;)r=e.upcast(r),e=e.baseClass;return r},ct=(e,r)=>(r=lt(e,r),de[r]),$e=(e,r)=>{(!r.ptrType||!r.ptr)&&Pe("makeClassHandle requires ptr and ptrType");var t=!!r.smartPtrType,n=!!r.smartPtr;return t!==n&&Pe("Both smartPtrType and smartPtr must be specified"),r.count={value:1},pe(Object.create(e,{$$:{value:r}}))};function ft(e){var r=this.getPointee(e);if(!r)return this.destructor(e),null;var t=ct(this.registeredClass,r);if(t!==void 0){if(t.$$.count.value===0)return t.$$.ptr=r,t.$$.smartPtr=e,t.clone();var n=t.clone();return this.destructor(e),n}function o(){return this.isSmartPointer?$e(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:r,smartPtrType:this,smartPtr:e}):$e(this.registeredClass.instancePrototype,{ptrType:this,ptr:e})}var a=this.registeredClass.getActualType(r),u=sr[a];if(!u)return o.call(this);var s;this.isConst?s=u.constPointerType:s=u.pointerType;var f=ar(r,this.registeredClass,s.registeredClass);return f===null?o.call(this):this.isSmartPointer?$e(s.registeredClass.instancePrototype,{ptrType:s,ptr:f,smartPtrType:this,smartPtr:e}):$e(s.registeredClass.instancePrototype,{ptrType:s,ptr:f})}var pe=e=>typeof FinalizationRegistry>"u"?(pe=r=>r,e):(ke=new FinalizationRegistry(r=>{or(r.$$)}),pe=r=>{var t=r.$$,n=!!t.smartPtr;if(n){var o={$$:t};ke.register(r,o,r)}return r},ir=r=>ke.unregister(r),pe(e));function dt(){if(this.$$.ptr||Me(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var e=pe(Object.create(Object.getPrototypeOf(this),{$$:{value:nt(this.$$)}}));return e.$$.count.value+=1,e.$$.deleteScheduled=!1,e}function pt(){this.$$.ptr||Me(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&b("Object already scheduled for deletion"),ir(this),or(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)}function vt(){return!this.$$.ptr}function ht(){return this.$$.ptr||Me(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&b("Object already scheduled for deletion"),ce.push(this),ce.length===1&&fe&&fe(Se),this.$$.deleteScheduled=!0,this}var gt=()=>{K.prototype.isAliasOf=tt,K.prototype.clone=dt,K.prototype.delete=pt,K.prototype.isDeleted=vt,K.prototype.deleteLater=ht};function K(){}var yt=48,mt=57,We=e=>{if(e===void 0)return"_unknown";e=e.replace(/[^a-zA-Z0-9_]/g,"$");var r=e.charCodeAt(0);return r>=yt&&r<=mt?`_${e}`:e};function Ue(e,r){return e=We(e),{[e]:function(){return r.apply(this,arguments)}}[e]}var ur=(e,r,t)=>{if(e[r].overloadTable===void 0){var n=e[r];e[r]=function(){return e[r].overloadTable.hasOwnProperty(arguments.length)||b(`Function '${t}' called with an invalid number of arguments (${arguments.length}) - expects one of (${e[r].overloadTable})!`),e[r].overloadTable[arguments.length].apply(this,arguments)},e[r].overloadTable=[],e[r].overloadTable[n.argCount]=n}},lr=(e,r,t)=>{i.hasOwnProperty(e)?((t===void 0||i[e].overloadTable!==void 0&&i[e].overloadTable[t]!==void 0)&&b(`Cannot register public name '${e}' twice`),ur(i,e,e),i.hasOwnProperty(t)&&b(`Cannot register multiple overloads of a function with the same number of arguments (${t})!`),i[e].overloadTable[t]=r):(i[e]=r,t!==void 0&&(i[e].numArguments=t))};function bt(e,r,t,n,o,a,u,s){this.name=e,this.constructor=r,this.instancePrototype=t,this.rawDestructor=n,this.baseClass=o,this.getActualType=a,this.upcast=u,this.downcast=s,this.pureVirtualFunctions=[]}var Ee=(e,r,t)=>{for(;r!==t;)r.upcast||b(`Expected null or instance of ${t.name}, got an instance of ${r.name}`),e=r.upcast(e),r=r.baseClass;return e};function _t(e,r){if(r===null)return this.isReference&&b(`null is not a valid ${this.name}`),0;r.$$||b(`Cannot pass "${je(r)}" as a ${this.name}`),r.$$.ptr||b(`Cannot pass deleted object as a pointer of type ${this.name}`);var t=r.$$.ptrType.registeredClass,n=Ee(r.$$.ptr,t,this.registeredClass);return n}function Pt(e,r){var t;if(r===null)return this.isReference&&b(`null is not a valid ${this.name}`),this.isSmartPointer?(t=this.rawConstructor(),e!==null&&e.push(this.rawDestructor,t),t):0;r.$$||b(`Cannot pass "${je(r)}" as a ${this.name}`),r.$$.ptr||b(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&r.$$.ptrType.isConst&&b(`Cannot convert argument of type ${r.$$.smartPtrType?r.$$.smartPtrType.name:r.$$.ptrType.name} to parameter type ${this.name}`);var n=r.$$.ptrType.registeredClass;if(t=Ee(r.$$.ptr,n,this.registeredClass),this.isSmartPointer)switch(r.$$.smartPtr===void 0&&b("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:r.$$.smartPtrType===this?t=r.$$.smartPtr:b(`Cannot convert argument of type ${r.$$.smartPtrType?r.$$.smartPtrType.name:r.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:t=r.$$.smartPtr;break;case 2:if(r.$$.smartPtrType===this)t=r.$$.smartPtr;else{var o=r.clone();t=this.rawShare(t,Te.toHandle(()=>o.delete())),e!==null&&e.push(this.rawDestructor,t)}break;default:b("Unsupporting sharing policy")}return t}function $t(e,r){if(r===null)return this.isReference&&b(`null is not a valid ${this.name}`),0;r.$$||b(`Cannot pass "${je(r)}" as a ${this.name}`),r.$$.ptr||b(`Cannot pass deleted object as a pointer of type ${this.name}`),r.$$.ptrType.isConst&&b(`Cannot convert argument of type ${r.$$.ptrType.name} to parameter type ${this.name}`);var t=r.$$.ptrType.registeredClass,n=Ee(r.$$.ptr,t,this.registeredClass);return n}function cr(e){return this.fromWireType(D[e>>>2>>>0])}function Ct(e){return this.rawGetPointee&&(e=this.rawGetPointee(e)),e}function wt(e){this.rawDestructor&&this.rawDestructor(e)}var Tt=e=>{e!==null&&e.delete()},At=()=>{G.prototype.getPointee=Ct,G.prototype.destructor=wt,G.prototype.argPackAdvance=q,G.prototype.readValueFromPointer=cr,G.prototype.deleteObject=Tt,G.prototype.fromWireType=ft};function G(e,r,t,n,o,a,u,s,f,l,v){this.name=e,this.registeredClass=r,this.isReference=t,this.isConst=n,this.isSmartPointer=o,this.pointeeType=a,this.sharingPolicy=u,this.rawGetPointee=s,this.rawConstructor=f,this.rawShare=l,this.rawDestructor=v,!o&&r.baseClass===void 0?n?(this.toWireType=_t,this.destructorFunction=null):(this.toWireType=$t,this.destructorFunction=null):this.toWireType=Pt}var fr=(e,r,t)=>{i.hasOwnProperty(e)||Pe("Replacing nonexistant public symbol"),i[e].overloadTable!==void 0&&t!==void 0?i[e].overloadTable[t]=r:(i[e]=r,i[e].argCount=t)},Ft=(e,r,t)=>{var n=i["dynCall_"+e];return t&&t.length?n.apply(null,[r].concat(t)):n.call(null,r)},Ce=[],dr=e=>{var r=Ce[e];return r||(e>=Ce.length&&(Ce.length=e+1),Ce[e]=r=qe.get(e)),r},Dt=(e,r,t)=>{if(e.includes("j"))return Ft(e,r,t);var n=dr(r).apply(null,t);return n},Rt=(e,r)=>{var t=[];return function(){return t.length=0,Object.assign(t,arguments),Dt(e,r,t)}},ee=(e,r)=>{e=S(e);function t(){return e.includes("j")?Rt(e,r):dr(r)}var n=t();return typeof n!="function"&&b(`unknown function pointer with signature ${e}: ${r}`),n},It=(e,r)=>{var t=Ue(r,function(n){this.name=r,this.message=n;var o=new Error(n).stack;o!==void 0&&(this.stack=this.toString()+`
`+o.replace(/^Error(:[^\n]*)?\n/,""))});return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.prototype.toString=function(){return this.message===void 0?this.name:`${this.name}: ${this.message}`},t},pr=void 0,vr=e=>{var r=_r(e),t=S(r);return H(r),t},we=(e,r)=>{var t=[],n={};function o(a){if(!n[a]&&!J[a]){if(_e[a]){_e[a].forEach(o);return}t.push(a),n[a]=!0}}throw r.forEach(o),new pr(`${e}: `+t.map(vr).join([", "]))};function Mt(e,r,t,n,o,a,u,s,f,l,v,P,A){e>>>=0,r>>>=0,t>>>=0,n>>>=0,o>>>=0,a>>>=0,u>>>=0,s>>>=0,f>>>=0,l>>>=0,v>>>=0,P>>>=0,A>>>=0,v=S(v),a=ee(o,a),s&&(s=ee(u,s)),l&&(l=ee(f,l)),A=ee(P,A);var C=We(v);lr(C,function(){we(`Cannot construct ${v} due to unbound types`,[n])}),oe([e,r,t],n?[n]:[],function(I){I=I[0];var U,k;n?(U=I.registeredClass,k=U.instancePrototype):k=K.prototype;var X=Ue(C,function(){if(Object.getPrototypeOf(this)!==Be)throw new ie("Use 'new' to construct "+v);if(j.constructor_body===void 0)throw new ie(v+" has no accessible constructor");var Tr=j.constructor_body[arguments.length];if(Tr===void 0)throw new ie(`Tried to invoke ctor of ${v} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(j.constructor_body).toString()}) parameters instead!`);return Tr.apply(this,arguments)}),Be=Object.create(k,{constructor:{value:X}});X.prototype=Be;var j=new bt(v,X,Be,A,U,a,s,l);j.baseClass&&(j.baseClass.__derivedClasses===void 0&&(j.baseClass.__derivedClasses=[]),j.baseClass.__derivedClasses.push(j));var _n=new G(v,j,!0,!1,!1),Cr=new G(v+"*",j,!1,!1,!1),wr=new G(v+" const*",j,!1,!0,!1);return sr[e]={pointerType:Cr,constPointerType:wr},fr(C,X),[_n,Cr,wr]})}var Ve=(e,r)=>{for(var t=[],n=0;n<e;n++)t.push(D[r+n*4>>>2>>>0]);return t},kt=e=>{for(;e.length;){var r=e.pop(),t=e.pop();t(r)}};function St(e,r){if(!(e instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof e} which is not a function`);var t=Ue(e.name||"unknownFunctionName",function(){});t.prototype=e.prototype;var n=new t,o=e.apply(n,r);return o instanceof Object?o:n}function Oe(e,r,t,n,o,a){var u=r.length;u<2&&b("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var s=r[1]!==null&&t!==null,f=!1,l=1;l<r.length;++l)if(r[l]!==null&&r[l].destructorFunction===void 0){f=!0;break}for(var v=r[0].name!=="void",P="",A="",l=0;l<u-2;++l)P+=(l!==0?", ":"")+"arg"+l,A+=(l!==0?", ":"")+"arg"+l+"Wired";var C=`
        return function ${We(e)}(${P}) {
        if (arguments.length !== ${u-2}) {
          throwBindingError('function ${e} called with ' + arguments.length + ' arguments, expected ${u-2}');
        }`;f&&(C+=`var destructors = [];
`);var I=f?"destructors":"null",U=["throwBindingError","invoker","fn","runDestructors","retType","classParam"],k=[b,n,o,kt,r[0],r[1]];s&&(C+="var thisWired = classParam.toWireType("+I+`, this);
`);for(var l=0;l<u-2;++l)C+="var arg"+l+"Wired = argType"+l+".toWireType("+I+", arg"+l+"); // "+r[l+2].name+`
`,U.push("argType"+l),k.push(r[l+2]);if(s&&(A="thisWired"+(A.length>0?", ":"")+A),C+=(v||a?"var rv = ":"")+"invoker(fn"+(A.length>0?", ":"")+A+`);
`,f)C+=`runDestructors(destructors);
`;else for(var l=s?1:2;l<r.length;++l){var X=l===1?"thisWired":"arg"+(l-2)+"Wired";r[l].destructorFunction!==null&&(C+=X+"_dtor("+X+"); // "+r[l].name+`
`,U.push(X+"_dtor"),k.push(r[l].destructorFunction))}return v&&(C+=`var ret = retType.fromWireType(rv);
return ret;
`),C+=`}
`,U.push(C),St(Function,U).apply(null,k)}function Wt(e,r,t,n,o,a){e>>>=0,t>>>=0,n>>>=0,o>>>=0,a>>>=0;var u=Ve(r,t);o=ee(n,o),oe([],[e],function(s){s=s[0];var f=`constructor ${s.name}`;if(s.registeredClass.constructor_body===void 0&&(s.registeredClass.constructor_body=[]),s.registeredClass.constructor_body[r-1]!==void 0)throw new ie(`Cannot register multiple constructors with identical number of parameters (${r-1}) for class '${s.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return s.registeredClass.constructor_body[r-1]=()=>{we(`Cannot construct ${s.name} due to unbound types`,u)},oe([],u,l=>(l.splice(1,0,null),s.registeredClass.constructor_body[r-1]=Oe(f,l,null,o,a),[])),[]})}function Ut(e,r,t,n,o,a,u,s,f){e>>>=0,r>>>=0,n>>>=0,o>>>=0,a>>>=0,u>>>=0;var l=Ve(t,n);r=S(r),a=ee(o,a),oe([],[e],function(v){v=v[0];var P=`${v.name}.${r}`;r.startsWith("@@")&&(r=Symbol[r.substring(2)]),s&&v.registeredClass.pureVirtualFunctions.push(r);function A(){we(`Cannot call ${P} due to unbound types`,l)}var C=v.registeredClass.instancePrototype,I=C[r];return I===void 0||I.overloadTable===void 0&&I.className!==v.name&&I.argCount===t-2?(A.argCount=t-2,A.className=v.name,C[r]=A):(ur(C,r,P),C[r].overloadTable[t-2]=A),oe([],l,function(U){var k=Oe(P,U,v,a,u,f);return C[r].overloadTable===void 0?(k.argCount=t-2,C[r]=k):C[r].overloadTable[t-2]=k,[]}),[]})}function Et(){Object.assign(hr.prototype,{get(e){return this.allocated[e]},has(e){return this.allocated[e]!==void 0},allocate(e){var r=this.freelist.pop()||this.allocated.length;return this.allocated[r]=e,r},free(e){this.allocated[e]=void 0,this.freelist.push(e)}})}function hr(){this.allocated=[void 0],this.freelist=[]}var W=new hr;function gr(e){e>>>=0,e>=W.reserved&&--W.get(e).refcount===0&&W.free(e)}var Vt=()=>{for(var e=0,r=W.reserved;r<W.allocated.length;++r)W.allocated[r]!==void 0&&++e;return e},Ot=()=>{W.allocated.push({value:void 0},{value:null},{value:!0},{value:!1}),W.reserved=W.allocated.length,i.count_emval_handles=Vt},Te={toValue:e=>(e||b("Cannot use deleted val. handle = "+e),W.get(e).value),toHandle:e=>{switch(e){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:return W.allocate({refcount:1,value:e})}}};function yr(e){return this.fromWireType(re[e>>>2>>>0])}var jt=function(e,r){e>>>=0,r>>>=0,r=S(r),B(e,{name:r,fromWireType:t=>{var n=Te.toValue(t);return gr(t),n},toWireType:(t,n)=>Te.toHandle(n),argPackAdvance:q,readValueFromPointer:yr,destructorFunction:null})},je=e=>{if(e===null)return"null";var r=typeof e;return r==="object"||r==="array"||r==="function"?e.toString():""+e},xt=(e,r)=>{switch(r){case 4:return function(t){return this.fromWireType(Ne[t>>>2>>>0])};case 8:return function(t){return this.fromWireType(Le[t>>>3>>>0])};default:throw new TypeError(`invalid float width (${r}): ${e}`)}},Bt=function(e,r,t){e>>>=0,r>>>=0,t>>>=0,r=S(r),B(e,{name:r,fromWireType:n=>n,toWireType:(n,o)=>o,argPackAdvance:q,readValueFromPointer:xt(r,t),destructorFunction:null})};function Gt(e,r,t,n,o,a,u){e>>>=0,t>>>=0,n>>>=0,o>>>=0,a>>>=0;var s=Ve(r,t);e=S(e),o=ee(n,o),lr(e,function(){we(`Cannot call ${e} due to unbound types`,s)},r-1),oe([],s,function(f){var l=[f[0],null].concat(f.slice(1));return fr(e,Oe(e,l,null,o,a,u),r-1),[]})}var Ht=(e,r,t)=>{switch(r){case 1:return t?n=>Q[n>>>0>>>0]:n=>M[n>>>0>>>0];case 2:return t?n=>ue[n>>>1>>>0]:n=>ge[n>>>1>>>0];case 4:return t?n=>re[n>>>2>>>0]:n=>D[n>>>2>>>0];default:throw new TypeError(`invalid integer width (${r}): ${e}`)}};function Nt(e,r,t,n,o){e>>>=0,r>>>=0,t>>>=0,r=S(r),o===-1&&(o=4294967295);var a=v=>v;if(n===0){var u=32-8*t;a=v=>v<<u>>>u}var s=r.includes("unsigned"),f=(v,P)=>{},l;s?l=function(v,P){return f(P,this.name),P>>>0}:l=function(v,P){return f(P,this.name),P},B(e,{name:r,fromWireType:a,toWireType:l,argPackAdvance:q,readValueFromPointer:Ht(r,t,n!==0),destructorFunction:null})}function Lt(e,r,t){e>>>=0,t>>>=0;var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],o=n[r];function a(u){var s=D[u>>>2>>>0],f=D[u+4>>>2>>>0];return new o(Q.buffer,f,s)}t=S(t),B(e,{name:t,fromWireType:a,argPackAdvance:q,readValueFromPointer:a},{ignoreDuplicateRegistrations:!0})}var zt=(e,r,t,n)=>{if(t>>>=0,!(n>0))return 0;for(var o=t,a=t+n-1,u=0;u<e.length;++u){var s=e.charCodeAt(u);if(s>=55296&&s<=57343){var f=e.charCodeAt(++u);s=65536+((s&1023)<<10)|f&1023}if(s<=127){if(t>=a)break;r[t++>>>0]=s}else if(s<=2047){if(t+1>=a)break;r[t++>>>0]=192|s>>6,r[t++>>>0]=128|s&63}else if(s<=65535){if(t+2>=a)break;r[t++>>>0]=224|s>>12,r[t++>>>0]=128|s>>6&63,r[t++>>>0]=128|s&63}else{if(t+3>=a)break;r[t++>>>0]=240|s>>18,r[t++>>>0]=128|s>>12&63,r[t++>>>0]=128|s>>6&63,r[t++>>>0]=128|s&63}}return r[t>>>0]=0,t-o},qt=(e,r,t)=>zt(e,M,r,t),Kt=e=>{for(var r=0,t=0;t<e.length;++t){var n=e.charCodeAt(t);n<=127?r++:n<=2047?r+=2:n>=55296&&n<=57343?(r+=4,++t):r+=3}return r},mr=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Xt=(e,r,t)=>{r>>>=0;for(var n=r+t,o=r;e[o]&&!(o>=n);)++o;if(o-r>16&&e.buffer&&mr)return mr.decode(e.subarray(r,o));for(var a="";r<o;){var u=e[r++];if(!(u&128)){a+=String.fromCharCode(u);continue}var s=e[r++]&63;if((u&224)==192){a+=String.fromCharCode((u&31)<<6|s);continue}var f=e[r++]&63;if((u&240)==224?u=(u&15)<<12|s<<6|f:u=(u&7)<<18|s<<12|f<<6|e[r++]&63,u<65536)a+=String.fromCharCode(u);else{var l=u-65536;a+=String.fromCharCode(55296|l>>10,56320|l&1023)}}return a},Zt=(e,r)=>(e>>>=0,e?Xt(M,e,r):""),Qt=function(e,r){e>>>=0,r>>>=0,r=S(r);var t=r==="std::string";B(e,{name:r,fromWireType:n=>{var o=D[n>>>2>>>0],a=n+4,u;if(t)for(var s=a,f=0;f<=o;++f){var l=a+f;if(f==o||M[l>>>0]==0){var v=l-s,P=Zt(s,v);u===void 0?u=P:(u+=String.fromCharCode(0),u+=P),s=l+1}}else{for(var A=new Array(o),f=0;f<o;++f)A[f]=String.fromCharCode(M[a+f>>>0]);u=A.join("")}return H(n),u},toWireType:(n,o)=>{o instanceof ArrayBuffer&&(o=new Uint8Array(o));var a,u=typeof o=="string";u||o instanceof Uint8Array||o instanceof Uint8ClampedArray||o instanceof Int8Array||b("Cannot pass non-string to std::string"),t&&u?a=Kt(o):a=o.length;var s=xe(4+a+1),f=s+4;if(D[s>>>2>>>0]=a,t&&u)qt(o,f,a+1);else if(u)for(var l=0;l<a;++l){var v=o.charCodeAt(l);v>255&&(H(f),b("String has UTF-16 code units that do not fit in 8 bits")),M[f+l>>>0]=v}else for(var l=0;l<a;++l)M[f+l>>>0]=o[l];return n!==null&&n.push(H,s),s},argPackAdvance:q,readValueFromPointer:cr,destructorFunction:n=>H(n)})},br=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Yt=(e,r)=>{for(var t=e,n=t>>1,o=n+r/2;!(n>=o)&&ge[n>>>0];)++n;if(t=n<<1,t-e>32&&br)return br.decode(M.subarray(e>>>0,t>>>0));for(var a="",u=0;!(u>=r/2);++u){var s=ue[e+u*2>>>1>>>0];if(s==0)break;a+=String.fromCharCode(s)}return a},Jt=(e,r,t)=>{if(t===void 0&&(t=2147483647),t<2)return 0;t-=2;for(var n=r,o=t<e.length*2?t/2:e.length,a=0;a<o;++a){var u=e.charCodeAt(a);ue[r>>>1>>>0]=u,r+=2}return ue[r>>>1>>>0]=0,r-n},en=e=>e.length*2,rn=(e,r)=>{for(var t=0,n="";!(t>=r/4);){var o=re[e+t*4>>>2>>>0];if(o==0)break;if(++t,o>=65536){var a=o-65536;n+=String.fromCharCode(55296|a>>10,56320|a&1023)}else n+=String.fromCharCode(o)}return n},tn=(e,r,t)=>{if(r>>>=0,t===void 0&&(t=2147483647),t<4)return 0;for(var n=r,o=n+t-4,a=0;a<e.length;++a){var u=e.charCodeAt(a);if(u>=55296&&u<=57343){var s=e.charCodeAt(++a);u=65536+((u&1023)<<10)|s&1023}if(re[r>>>2>>>0]=u,r+=4,r+4>o)break}return re[r>>>2>>>0]=0,r-n},nn=e=>{for(var r=0,t=0;t<e.length;++t){var n=e.charCodeAt(t);n>=55296&&n<=57343&&++t,r+=4}return r},on=function(e,r,t){e>>>=0,r>>>=0,t>>>=0,t=S(t);var n,o,a,u,s;r===2?(n=Yt,o=Jt,u=en,a=()=>ge,s=1):r===4&&(n=rn,o=tn,u=nn,a=()=>D,s=2),B(e,{name:t,fromWireType:f=>{for(var l=D[f>>>2>>>0],v=a(),P,A=f+4,C=0;C<=l;++C){var I=f+4+C*r;if(C==l||v[I>>>s]==0){var U=I-A,k=n(A,U);P===void 0?P=k:(P+=String.fromCharCode(0),P+=k),A=I+r}}return H(f),P},toWireType:(f,l)=>{typeof l!="string"&&b(`Cannot pass non-string to C++ string type ${t}`);var v=u(l),P=xe(4+v+r);return D[P>>>2]=v>>s,o(l,P+4,v+r),f!==null&&f.push(H,P),P},argPackAdvance:q,readValueFromPointer:yr,destructorFunction:f=>H(f)})},an=function(e,r){e>>>=0,r>>>=0,r=S(r),B(e,{isVoid:!0,name:r,argPackAdvance:0,fromWireType:()=>{},toWireType:(t,n)=>{}})};function sn(e){e>>>=0,e>4&&(W.get(e).refcount+=1)}var un=(e,r)=>{var t=J[e];return t===void 0&&b(r+" has unknown type "+vr(e)),t};function ln(e,r){e>>>=0,r>>>=0,e=un(e,"_emval_take_value");var t=e.readValueFromPointer(r);return Te.toHandle(t)}var cn=()=>{ye("")};function fn(e,r,t){return e>>>=0,r>>>=0,t>>>=0,M.copyWithin(e>>>0,r>>>0,r+t>>>0)}var dn=()=>3221225472,pn=e=>{var r=he.buffer,t=(e-r.byteLength+65535)/65536;try{return he.grow(t),ze(),1}catch{}};function vn(e){e>>>=0;var r=M.length,t=dn();if(e>t)return!1;for(var n=(f,l)=>f+(l-f%l)%l,o=1;o<=4;o*=2){var a=r*(1+.2/o);a=Math.min(a,e+100663296);var u=Math.min(t,n(Math.max(e,a),65536)),s=pn(u);if(s)return!0}return!1}Jr(),ie=i.BindingError=class extends Error{constructor(r){super(r),this.name="BindingError"}},nr=i.InternalError=class extends Error{constructor(r){super(r),this.name="InternalError"}},gt(),ut(),At(),pr=i.UnboundTypeError=It(Error,"UnboundTypeError"),Et(),Ot();var hn={u:Xr,h:Qr,p:Yr,t:rt,c:Mt,d:Wt,a:Ut,s:jt,l:Bt,g:Gt,e:Nt,b:Lt,k:Qt,i:on,m:an,n:gr,o:sn,f:ln,j:cn,r:fn,q:vn},O=Kr(),gn=()=>(gn=O.w)(),_r=e=>(_r=O.y)(e),yn=i.__embind_initialize_bindings=()=>(yn=i.__embind_initialize_bindings=O.z)(),mn=()=>(mn=O.__errno_location)(),xe=e=>(xe=O.A)(e),H=e=>(H=O.B)(e),Pr=e=>(Pr=O.C)(e);function bn(e){e=Object.assign({},e);var r=n=>o=>n(o)>>>0,t=n=>()=>n()>>>0;return e.y=r(e.y),e.__errno_location=t(e.__errno_location),e.A=r(e.A),e.stackSave=t(e.stackSave),e.stackAlloc=r(e.stackAlloc),e}var Ae;le=function e(){Ae||$r(),Ae||(le=e)};function $r(){if(Y>0||(Vr(),Y>0))return;function e(){Ae||(Ae=!0,i.calledRun=!0,!He&&(Or(),h(i),i.onRuntimeInitialized&&i.onRuntimeInitialized(),jr()))}i.setStatus?(i.setStatus("Running..."),setTimeout(function(){setTimeout(function(){i.setStatus("")},1),e()},1)):e()}if(i.preInit)for(typeof i.preInit=="function"&&(i.preInit=[i.preInit]);i.preInit.length>0;)i.preInit.pop()();return $r(),c.ready}})();typeof Rr=="object"&&typeof Ge=="object"?Ge.exports=Dr:typeof define=="function"&&define.amd&&define([],()=>Dr)});var Mr=Dn(Ir(),1),kr=Mr.default,Fe=null;async function N(){return Fe===null&&(Fe=kr()),Fe}function Rn(){Fe=null,De=null,kr().then(d=>{De=d})}var De=null;function In(d){De=d}function Mn(){return De}async function Sr(d,c,i){if(!i)return null;if(d.point){let h=c.map(p=>p.points);return Wr(h,i)}else if(d.line){let h=c.map(p=>p.lines);return kn(h,i)}else if(d.polygon){let h=c.map(p=>p.polygons);return Sn(h,i)}return null}function Wr(d,c){let i=new c.VectorDouble,h=new c.VectorDouble,p=new c.VectorUInt,_=new c.VectorUInt,F=!1;for(let y=0;y<d.length;y++){let $=d[y];if($){let w=$.positions.value;for(let g=0;g<w.length;g+=2)i.push_back(w[g]),h.push_back(w[g+1]);let T=0;for(let g=0;g<$.featureIds.value.length;g++)(g===0||$.featureIds.value[g]!==$.featureIds.value[g-1])&&p.push_back(T),T++;for(let g=1;g<p.size();g++)_.push_back(p.get(g)-p.get(g-1));p.size()>0&&_.push_back(T-p.get(p.size()-1))}}return new c.PointCollection(i,h,p,_,F)}function kn(d,c){let i=new c.VectorDouble,h=new c.VectorDouble,p=new c.VectorUInt,_=new c.VectorUInt,F=!1;for(let y=0;y<d.length;y++){let $=d[y];if($){let w=$.positions.value,T=$.pathIndices.value;for(let R=0;R<w.length;R+=2)i.push_back(w[R]),h.push_back(w[R+1]);let g=0;for(let R=0;R<T.length-1;R++){let E=T[R];p.push_back(E),R>0&&$.featureIds.value[E]!==$.featureIds.value[E-1]&&(_.push_back(g),g=0),g+=1}_.push_back(g)}}return new c.LineCollection(i,h,p,_,F)}function Sn(d,c){let i=new c.VectorDouble,h=new c.VectorDouble,p=new c.VectorUInt,_=new c.VectorUInt,F=new c.VectorUInt,m=!0,y=!1;for(let w=0;w<d.length;w++){let T=d[w];if(T){let g=T.positions.value,R=T.polygonIndices.value,E=T.primitivePolygonIndices.value;for(let V=0;V<g.length;V+=2)i.push_back(g[V]),h.push_back(g[V+1]);let x=0,z=0;for(let V=0;V<R.length-1;V++){let ve=R[V],Z=R[V+1];for(;E[x]<Z;)E[x]>ve?_.push_back(1):_.push_back(0),p.push_back(E[x]),x++,z+=1;T.featureIds.value[Z]!==T.featureIds.value[Z-1]&&(F.push_back(z),z=0)}}}return new c.PolygonCollection(i,h,p,_,F,m,y)}async function Wn({k:d,binaryGeometryType:c,binaryGeometries:i}){if(!i||i.length===0)return[];let h=[],p=await N(),_=await Sr(c,i,p);if(_){let F=p.getNearestNeighbors(_,d);for(let m=0;m<F.size();++m){let y=F.get(m),$=Array(y.size());for(let w=0,T=y.size();w<T;++w)$[w]=y.get(w);h[m]=$}}return h}function Xn(d){let c=d.length,i=Math.min(...d.map(y=>y.length)),h=Math.max(...d.map(y=>y.length)),p=d.reduce((y,$)=>y+$.length,0)/c,_=d.map(y=>y.length).sort((y,$)=>y-$)[Math.floor(c/2)],m=d.reduce((y,$)=>y+$.length,0)/(c*c);return{numberOfObservations:c,minNeighbors:i,maxNeighbors:h,meanNeighbors:p,medianNeighbors:_,pctNoneZero:m}}function L(d){let c=[],i=d.size();for(let h=0;h<i;++h)c.push(d.get(h));return c}async function Un(d,c,i){let h=await N(),p=d.length,_=new h.VectorDouble;_.resize(p,0);for(let y=0;y<p;++y)_.set(y,d[y]);let F=new h.VecVecUInt;for(let y=0;y<p;++y){let $=c[y],w=new h.VectorUInt;for(let T=0,g=$.length;T<g;++T)w.push_back($[T]);F.push_back(w)}let m=h.localMoran(_,F,i);return{isValid:m.isValid(),clusters:L(m.getClusters()),lagValues:L(m.getLagValues()),lisaValues:L(m.getLisaValues()),pValues:L(m.getPValues())}}async function En(d,c){let i=await N(),h=c.length,p=new i.VectorInt;p.resize(h,0);let _=new i.VectorDouble;_.resize(h,0);for(let m=0;m<h;++m)_.set(m,c[m]),(c[m]===void 0||c[m]===null)&&p.set(m,1);let F=i.quantileBreaks(d,_,p);return L(F)}async function Vn(d,c){let i=await N(),h=c.length,p=new i.VectorInt;p.resize(h,0);let _=new i.VectorDouble;_.resize(h,0);for(let m=0;m<h;++m)_.set(m,c[m]),(c[m]===void 0||c[m]===null)&&p.set(m,1);let F=i.naturalBreaks(d,_,p);return L(F)}export{Wr as createGeoDaPointsFromBinaryFeatures,Mn as getGeoDa,Xn as getMetaFromWeights,Wn as getNearestNeighborsFromBinaryGeometries,N as initGeoDa,Un as localMoran,Vn as naturalBreaks,En as quantileBreaks,Rn as resetGeoDa,In as setGeoDa};
//# sourceMappingURL=index.js.map