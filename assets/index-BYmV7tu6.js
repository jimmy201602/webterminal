var fs=Object.defineProperty;var bs=(n,e,t)=>e in n?fs(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var k=(n,e,t)=>bs(n,typeof e!="symbol"?e+"":e,t);import{e as In,f as ys,g as wt,r as R,u as Hn,L as j,N as ws,h as _n,i as Ss,j as Mn,k as vs,l as te,R as ks,B as xs}from"./react-DNMuSVav.js";import{B as F,R as Ps,a as Me,b as Rs,D as As,c as Cs,d as Ls,e as Nt,f as Fe,S as Ts,g as Ds,C as Ns,h as js,i as Fn,j as Os,k as Es,l as Wn,m as $s,n as Is,o as Hs,I as _s,p as Ms,q as Fs,r as Ws,T as zs,s as jt,t as Ot,u as qs,v as Qs,w as Bs,x as Us,y as Vs,A as Gs}from"./antd-BSs4FKsC.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var Ye={exports:{}},de={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Et;function Ks(){if(Et)return de;Et=1;var n=In(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,r={key:!0,ref:!0,__self:!0,__source:!0};function i(l,c,h){var d,u={},p=null,g=null;h!==void 0&&(p=""+h),c.key!==void 0&&(p=""+c.key),c.ref!==void 0&&(g=c.ref);for(d in c)a.call(c,d)&&!r.hasOwnProperty(d)&&(u[d]=c[d]);if(l&&l.defaultProps)for(d in c=l.defaultProps,c)u[d]===void 0&&(u[d]=c[d]);return{$$typeof:e,type:l,key:p,ref:g,props:u,_owner:s.current}}return de.Fragment=t,de.jsx=i,de.jsxs=i,de}var $t;function Ys(){return $t||($t=1,Ye.exports=Ks()),Ye.exports}var o=Ys(),$e={},It;function Zs(){if(It)return $e;It=1;var n=ys();return $e.createRoot=n.createRoot,$e.hydrateRoot=n.hydrateRoot,$e}var Xs=Zs();const Js=wt(Xs),b=n=>typeof n=="string",he=()=>{let n,e;const t=new Promise((a,s)=>{n=a,e=s});return t.resolve=n,t.reject=e,t},Ht=n=>n==null?"":""+n,ea=(n,e,t)=>{n.forEach(a=>{e[a]&&(t[a]=e[a])})},ta=/###/g,_t=n=>n&&n.indexOf("###")>-1?n.replace(ta,"."):n,Mt=n=>!n||b(n),Ce=(n,e,t)=>{const a=b(e)?e.split("."):e;let s=0;for(;s<a.length-1;){if(Mt(n))return{};const r=_t(a[s]);!n[r]&&t&&(n[r]=new t),Object.prototype.hasOwnProperty.call(n,r)?n=n[r]:n={},++s}return Mt(n)?{}:{obj:n,k:_t(a[s])}},Ft=(n,e,t)=>{const{obj:a,k:s}=Ce(n,e,Object);if(a!==void 0||e.length===1){a[s]=t;return}let r=e[e.length-1],i=e.slice(0,e.length-1),l=Ce(n,i,Object);for(;l.obj===void 0&&i.length;)r=`${i[i.length-1]}.${r}`,i=i.slice(0,i.length-1),l=Ce(n,i,Object),l!=null&&l.obj&&typeof l.obj[`${l.k}.${r}`]<"u"&&(l.obj=void 0);l.obj[`${l.k}.${r}`]=t},na=(n,e,t,a)=>{const{obj:s,k:r}=Ce(n,e,Object);s[r]=s[r]||[],s[r].push(t)},We=(n,e)=>{const{obj:t,k:a}=Ce(n,e);if(t&&Object.prototype.hasOwnProperty.call(t,a))return t[a]},sa=(n,e,t)=>{const a=We(n,t);return a!==void 0?a:We(e,t)},zn=(n,e,t)=>{for(const a in e)a!=="__proto__"&&a!=="constructor"&&(a in n?b(n[a])||n[a]instanceof String||b(e[a])||e[a]instanceof String?t&&(n[a]=e[a]):zn(n[a],e[a],t):n[a]=e[a]);return n},ie=n=>n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var aa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};const ra=n=>b(n)?n.replace(/[&<>"'\/]/g,e=>aa[e]):n;class ia{constructor(e){this.capacity=e,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(e){const t=this.regExpMap.get(e);if(t!==void 0)return t;const a=new RegExp(e);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(e,a),this.regExpQueue.push(e),a}}const oa=[" ",",","?","!",";"],la=new ia(20),ca=(n,e,t)=>{e=e||"",t=t||"";const a=oa.filter(i=>e.indexOf(i)<0&&t.indexOf(i)<0);if(a.length===0)return!0;const s=la.getRegExp(`(${a.map(i=>i==="?"?"\\?":i).join("|")})`);let r=!s.test(n);if(!r){const i=n.indexOf(t);i>0&&!s.test(n.substring(0,i))&&(r=!0)}return r},ct=(n,e,t=".")=>{if(!n)return;if(n[e])return Object.prototype.hasOwnProperty.call(n,e)?n[e]:void 0;const a=e.split(t);let s=n;for(let r=0;r<a.length;){if(!s||typeof s!="object")return;let i,l="";for(let c=r;c<a.length;++c)if(c!==r&&(l+=t),l+=a[c],i=s[l],i!==void 0){if(["string","number","boolean"].indexOf(typeof i)>-1&&c<a.length-1)continue;r+=c-r+1;break}s=i}return s},Te=n=>n==null?void 0:n.replace("_","-"),da={type:"logger",log(n){this.output("log",n)},warn(n){this.output("warn",n)},error(n){this.output("error",n)},output(n,e){var t,a;(a=(t=console==null?void 0:console[n])==null?void 0:t.apply)==null||a.call(t,console,e)}};class ze{constructor(e,t={}){this.init(e,t)}init(e,t={}){this.prefix=t.prefix||"i18next:",this.logger=e||da,this.options=t,this.debug=t.debug}log(...e){return this.forward(e,"log","",!0)}warn(...e){return this.forward(e,"warn","",!0)}error(...e){return this.forward(e,"error","")}deprecate(...e){return this.forward(e,"warn","WARNING DEPRECATED: ",!0)}forward(e,t,a,s){return s&&!this.debug?null:(b(e[0])&&(e[0]=`${a}${this.prefix} ${e[0]}`),this.logger[t](e))}create(e){return new ze(this.logger,{prefix:`${this.prefix}:${e}:`,...this.options})}clone(e){return e=e||this.options,e.prefix=e.prefix||this.prefix,new ze(this.logger,e)}}var G=new ze;class Ke{constructor(){this.observers={}}on(e,t){return e.split(" ").forEach(a=>{this.observers[a]||(this.observers[a]=new Map);const s=this.observers[a].get(t)||0;this.observers[a].set(t,s+1)}),this}off(e,t){if(this.observers[e]){if(!t){delete this.observers[e];return}this.observers[e].delete(t)}}emit(e,...t){this.observers[e]&&Array.from(this.observers[e].entries()).forEach(([s,r])=>{for(let i=0;i<r;i++)s(...t)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([s,r])=>{for(let i=0;i<r;i++)s.apply(s,[e,...t])})}}class Wt extends Ke{constructor(e,t={ns:["translation"],defaultNS:"translation"}){super(),this.data=e||{},this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(e){this.options.ns.indexOf(e)<0&&this.options.ns.push(e)}removeNamespaces(e){const t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)}getResource(e,t,a,s={}){var h,d;const r=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,i=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let l;e.indexOf(".")>-1?l=e.split("."):(l=[e,t],a&&(Array.isArray(a)?l.push(...a):b(a)&&r?l.push(...a.split(r)):l.push(a)));const c=We(this.data,l);return!c&&!t&&!a&&e.indexOf(".")>-1&&(e=l[0],t=l[1],a=l.slice(2).join(".")),c||!i||!b(a)?c:ct((d=(h=this.data)==null?void 0:h[e])==null?void 0:d[t],a,r)}addResource(e,t,a,s,r={silent:!1}){const i=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator;let l=[e,t];a&&(l=l.concat(i?a.split(i):a)),e.indexOf(".")>-1&&(l=e.split("."),s=t,t=l[1]),this.addNamespaces(t),Ft(this.data,l,s),r.silent||this.emit("added",e,t,a,s)}addResources(e,t,a,s={silent:!1}){for(const r in a)(b(a[r])||Array.isArray(a[r]))&&this.addResource(e,t,r,a[r],{silent:!0});s.silent||this.emit("added",e,t,a)}addResourceBundle(e,t,a,s,r,i={silent:!1,skipCopy:!1}){let l=[e,t];e.indexOf(".")>-1&&(l=e.split("."),s=a,a=t,t=l[1]),this.addNamespaces(t);let c=We(this.data,l)||{};i.skipCopy||(a=JSON.parse(JSON.stringify(a))),s?zn(c,a,r):c={...c,...a},Ft(this.data,l,c),i.silent||this.emit("added",e,t,a)}removeResourceBundle(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit("removed",e,t)}hasResourceBundle(e,t){return this.getResource(e,t)!==void 0}getResourceBundle(e,t){return t||(t=this.options.defaultNS),this.getResource(e,t)}getDataByLanguage(e){return this.data[e]}hasLanguageSomeTranslations(e){const t=this.getDataByLanguage(e);return!!(t&&Object.keys(t)||[]).find(s=>t[s]&&Object.keys(t[s]).length>0)}toJSON(){return this.data}}var qn={processors:{},addPostProcessor(n){this.processors[n.name]=n},handle(n,e,t,a,s){return n.forEach(r=>{var i;e=((i=this.processors[r])==null?void 0:i.process(e,t,a,s))??e}),e}};const Qn=Symbol("i18next/PATH_KEY");function ha(){const n=[],e=Object.create(null);let t;return e.get=(a,s)=>{var r;return(r=t==null?void 0:t.revoke)==null||r.call(t),s===Qn?n:(n.push(s),t=Proxy.revocable(a,e),t.proxy)},Proxy.revocable(Object.create(null),e).proxy}function dt(n,e){const{[Qn]:t}=n(ha());return t.join((e==null?void 0:e.keySeparator)??".")}const zt={},Ze=n=>!b(n)&&typeof n!="boolean"&&typeof n!="number";class qe extends Ke{constructor(e,t={}){super(),ea(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],e,this),this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=G.create("translator")}changeLanguage(e){e&&(this.language=e)}exists(e,t={interpolation:{}}){const a={...t};if(e==null)return!1;const s=this.resolve(e,a);if((s==null?void 0:s.res)===void 0)return!1;const r=Ze(s.res);return!(a.returnObjects===!1&&r)}extractFromKey(e,t){let a=t.nsSeparator!==void 0?t.nsSeparator:this.options.nsSeparator;a===void 0&&(a=":");const s=t.keySeparator!==void 0?t.keySeparator:this.options.keySeparator;let r=t.ns||this.options.defaultNS||[];const i=a&&e.indexOf(a)>-1,l=!this.options.userDefinedKeySeparator&&!t.keySeparator&&!this.options.userDefinedNsSeparator&&!t.nsSeparator&&!ca(e,a,s);if(i&&!l){const c=e.match(this.interpolator.nestingRegexp);if(c&&c.length>0)return{key:e,namespaces:b(r)?[r]:r};const h=e.split(a);(a!==s||a===s&&this.options.ns.indexOf(h[0])>-1)&&(r=h.shift()),e=h.join(s)}return{key:e,namespaces:b(r)?[r]:r}}translate(e,t,a){let s=typeof t=="object"?{...t}:t;if(typeof s!="object"&&this.options.overloadTranslationOptionHandler&&(s=this.options.overloadTranslationOptionHandler(arguments)),typeof s=="object"&&(s={...s}),s||(s={}),e==null)return"";typeof e=="function"&&(e=dt(e,{...this.options,...s})),Array.isArray(e)||(e=[String(e)]);const r=s.returnDetails!==void 0?s.returnDetails:this.options.returnDetails,i=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,{key:l,namespaces:c}=this.extractFromKey(e[e.length-1],s),h=c[c.length-1];let d=s.nsSeparator!==void 0?s.nsSeparator:this.options.nsSeparator;d===void 0&&(d=":");const u=s.lng||this.language,p=s.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((u==null?void 0:u.toLowerCase())==="cimode")return p?r?{res:`${h}${d}${l}`,usedKey:l,exactUsedKey:l,usedLng:u,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:`${h}${d}${l}`:r?{res:l,usedKey:l,exactUsedKey:l,usedLng:u,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:l;const g=this.resolve(e,s);let m=g==null?void 0:g.res;const f=(g==null?void 0:g.usedKey)||l,w=(g==null?void 0:g.exactUsedKey)||l,N=["[object Number]","[object Function]","[object RegExp]"],T=s.joinArrays!==void 0?s.joinArrays:this.options.joinArrays,E=!this.i18nFormat||this.i18nFormat.handleAsObject,A=s.count!==void 0&&!b(s.count),D=qe.hasDefaultValue(s),M=A?this.pluralResolver.getSuffix(u,s.count,s):"",q=s.ordinal&&A?this.pluralResolver.getSuffix(u,s.count,{ordinal:!1}):"",X=A&&!s.ordinal&&s.count===0,I=X&&s[`defaultValue${this.options.pluralSeparator}zero`]||s[`defaultValue${M}`]||s[`defaultValue${q}`]||s.defaultValue;let C=m;E&&!m&&D&&(C=I);const Oe=Ze(C),x=Object.prototype.toString.apply(C);if(E&&C&&Oe&&N.indexOf(x)<0&&!(b(T)&&Array.isArray(C))){if(!s.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const S=this.options.returnedObjectHandler?this.options.returnedObjectHandler(f,C,{...s,ns:c}):`key '${l} (${this.language})' returned an object instead of string.`;return r?(g.res=S,g.usedParams=this.getUsedParamsDetails(s),g):S}if(i){const S=Array.isArray(C),v=S?[]:{},L=S?w:f;for(const _ in C)if(Object.prototype.hasOwnProperty.call(C,_)){const Q=`${L}${i}${_}`;D&&!m?v[_]=this.translate(Q,{...s,defaultValue:Ze(I)?I[_]:void 0,joinArrays:!1,ns:c}):v[_]=this.translate(Q,{...s,joinArrays:!1,ns:c}),v[_]===Q&&(v[_]=C[_])}m=v}}else if(E&&b(T)&&Array.isArray(m))m=m.join(T),m&&(m=this.extendTranslation(m,e,s,a));else{let S=!1,v=!1;!this.isValidLookup(m)&&D&&(S=!0,m=I),this.isValidLookup(m)||(v=!0,m=l);const _=(s.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&v?void 0:m,Q=D&&I!==m&&this.options.updateMissing;if(v||S||Q){if(this.logger.log(Q?"updateKey":"missingKey",u,h,l,Q?I:m),i){const W=this.resolve(l,{...s,keySeparator:!1});W&&W.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let J=[];const Ee=this.languageUtils.getFallbackCodes(this.options.fallbackLng,s.lng||this.language);if(this.options.saveMissingTo==="fallback"&&Ee&&Ee[0])for(let W=0;W<Ee.length;W++)J.push(Ee[W]);else this.options.saveMissingTo==="all"?J=this.languageUtils.toResolveHierarchy(s.lng||this.language):J.push(s.lng||this.language);const Lt=(W,ee,ce)=>{var Dt;const Tt=D&&ce!==m?ce:_;this.options.missingKeyHandler?this.options.missingKeyHandler(W,h,ee,Tt,Q,s):(Dt=this.backendConnector)!=null&&Dt.saveMissing&&this.backendConnector.saveMissing(W,h,ee,Tt,Q,s),this.emit("missingKey",W,h,ee,m)};this.options.saveMissing&&(this.options.saveMissingPlurals&&A?J.forEach(W=>{const ee=this.pluralResolver.getSuffixes(W,s);X&&s[`defaultValue${this.options.pluralSeparator}zero`]&&ee.indexOf(`${this.options.pluralSeparator}zero`)<0&&ee.push(`${this.options.pluralSeparator}zero`),ee.forEach(ce=>{Lt([W],l+ce,s[`defaultValue${ce}`]||I)})}):Lt(J,l,I))}m=this.extendTranslation(m,e,s,g,a),v&&m===l&&this.options.appendNamespaceToMissingKey&&(m=`${h}${d}${l}`),(v||S)&&this.options.parseMissingKeyHandler&&(m=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${h}${d}${l}`:l,S?m:void 0,s))}return r?(g.res=m,g.usedParams=this.getUsedParamsDetails(s),g):m}extendTranslation(e,t,a,s,r){var c,h;if((c=this.i18nFormat)!=null&&c.parse)e=this.i18nFormat.parse(e,{...this.options.interpolation.defaultVariables,...a},a.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!a.skipInterpolation){a.interpolation&&this.interpolator.init({...a,interpolation:{...this.options.interpolation,...a.interpolation}});const d=b(e)&&(((h=a==null?void 0:a.interpolation)==null?void 0:h.skipOnVariables)!==void 0?a.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let u;if(d){const g=e.match(this.interpolator.nestingRegexp);u=g&&g.length}let p=a.replace&&!b(a.replace)?a.replace:a;if(this.options.interpolation.defaultVariables&&(p={...this.options.interpolation.defaultVariables,...p}),e=this.interpolator.interpolate(e,p,a.lng||this.language||s.usedLng,a),d){const g=e.match(this.interpolator.nestingRegexp),m=g&&g.length;u<m&&(a.nest=!1)}!a.lng&&s&&s.res&&(a.lng=this.language||s.usedLng),a.nest!==!1&&(e=this.interpolator.nest(e,(...g)=>(r==null?void 0:r[0])===g[0]&&!a.context?(this.logger.warn(`It seems you are nesting recursively key: ${g[0]} in key: ${t[0]}`),null):this.translate(...g,t),a)),a.interpolation&&this.interpolator.reset()}const i=a.postProcess||this.options.postProcess,l=b(i)?[i]:i;return e!=null&&(l!=null&&l.length)&&a.applyPostProcessor!==!1&&(e=qn.handle(l,e,t,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(a)},...a}:a,this)),e}resolve(e,t={}){let a,s,r,i,l;return b(e)&&(e=[e]),e.forEach(c=>{if(this.isValidLookup(a))return;const h=this.extractFromKey(c,t),d=h.key;s=d;let u=h.namespaces;this.options.fallbackNS&&(u=u.concat(this.options.fallbackNS));const p=t.count!==void 0&&!b(t.count),g=p&&!t.ordinal&&t.count===0,m=t.context!==void 0&&(b(t.context)||typeof t.context=="number")&&t.context!=="",f=t.lngs?t.lngs:this.languageUtils.toResolveHierarchy(t.lng||this.language,t.fallbackLng);u.forEach(w=>{var N,T;this.isValidLookup(a)||(l=w,!zt[`${f[0]}-${w}`]&&((N=this.utils)!=null&&N.hasLoadedNamespace)&&!((T=this.utils)!=null&&T.hasLoadedNamespace(l))&&(zt[`${f[0]}-${w}`]=!0,this.logger.warn(`key "${s}" for languages "${f.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),f.forEach(E=>{var M;if(this.isValidLookup(a))return;i=E;const A=[d];if((M=this.i18nFormat)!=null&&M.addLookupKeys)this.i18nFormat.addLookupKeys(A,d,E,w,t);else{let q;p&&(q=this.pluralResolver.getSuffix(E,t.count,t));const X=`${this.options.pluralSeparator}zero`,I=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(p&&(t.ordinal&&q.indexOf(I)===0&&A.push(d+q.replace(I,this.options.pluralSeparator)),A.push(d+q),g&&A.push(d+X)),m){const C=`${d}${this.options.contextSeparator||"_"}${t.context}`;A.push(C),p&&(t.ordinal&&q.indexOf(I)===0&&A.push(C+q.replace(I,this.options.pluralSeparator)),A.push(C+q),g&&A.push(C+X))}}let D;for(;D=A.pop();)this.isValidLookup(a)||(r=D,a=this.getResource(E,w,D,t))}))})}),{res:a,usedKey:s,exactUsedKey:r,usedLng:i,usedNS:l}}isValidLookup(e){return e!==void 0&&!(!this.options.returnNull&&e===null)&&!(!this.options.returnEmptyString&&e==="")}getResource(e,t,a,s={}){var r;return(r=this.i18nFormat)!=null&&r.getResource?this.i18nFormat.getResource(e,t,a,s):this.resourceStore.getResource(e,t,a,s)}getUsedParamsDetails(e={}){const t=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],a=e.replace&&!b(e.replace);let s=a?e.replace:e;if(a&&typeof e.count<"u"&&(s.count=e.count),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!a){s={...s};for(const r of t)delete s[r]}return s}static hasDefaultValue(e){const t="defaultValue";for(const a in e)if(Object.prototype.hasOwnProperty.call(e,a)&&t===a.substring(0,t.length)&&e[a]!==void 0)return!0;return!1}}class qt{constructor(e){this.options=e,this.supportedLngs=this.options.supportedLngs||!1,this.logger=G.create("languageUtils")}getScriptPartFromCode(e){if(e=Te(e),!e||e.indexOf("-")<0)return null;const t=e.split("-");return t.length===2||(t.pop(),t[t.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(t.join("-"))}getLanguagePartFromCode(e){if(e=Te(e),!e||e.indexOf("-")<0)return e;const t=e.split("-");return this.formatLanguageCode(t[0])}formatLanguageCode(e){if(b(e)&&e.indexOf("-")>-1){let t;try{t=Intl.getCanonicalLocales(e)[0]}catch{}return t&&this.options.lowerCaseLng&&(t=t.toLowerCase()),t||(this.options.lowerCaseLng?e.toLowerCase():e)}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e}isSupportedCode(e){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(e=this.getLanguagePartFromCode(e)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(e)>-1}getBestMatchFromCodes(e){if(!e)return null;let t;return e.forEach(a=>{if(t)return;const s=this.formatLanguageCode(a);(!this.options.supportedLngs||this.isSupportedCode(s))&&(t=s)}),!t&&this.options.supportedLngs&&e.forEach(a=>{if(t)return;const s=this.getScriptPartFromCode(a);if(this.isSupportedCode(s))return t=s;const r=this.getLanguagePartFromCode(a);if(this.isSupportedCode(r))return t=r;t=this.options.supportedLngs.find(i=>{if(i===r)return i;if(!(i.indexOf("-")<0&&r.indexOf("-")<0)&&(i.indexOf("-")>0&&r.indexOf("-")<0&&i.substring(0,i.indexOf("-"))===r||i.indexOf(r)===0&&r.length>1))return i})}),t||(t=this.getFallbackCodes(this.options.fallbackLng)[0]),t}getFallbackCodes(e,t){if(!e)return[];if(typeof e=="function"&&(e=e(t)),b(e)&&(e=[e]),Array.isArray(e))return e;if(!t)return e.default||[];let a=e[t];return a||(a=e[this.getScriptPartFromCode(t)]),a||(a=e[this.formatLanguageCode(t)]),a||(a=e[this.getLanguagePartFromCode(t)]),a||(a=e.default),a||[]}toResolveHierarchy(e,t){const a=this.getFallbackCodes((t===!1?[]:t)||this.options.fallbackLng||[],e),s=[],r=i=>{i&&(this.isSupportedCode(i)?s.push(i):this.logger.warn(`rejecting language code not found in supportedLngs: ${i}`))};return b(e)&&(e.indexOf("-")>-1||e.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&r(this.formatLanguageCode(e)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&r(this.getScriptPartFromCode(e)),this.options.load!=="currentOnly"&&r(this.getLanguagePartFromCode(e))):b(e)&&r(this.formatLanguageCode(e)),a.forEach(i=>{s.indexOf(i)<0&&r(this.formatLanguageCode(i))}),s}}const Qt={zero:0,one:1,two:2,few:3,many:4,other:5},Bt={select:n=>n===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class ua{constructor(e,t={}){this.languageUtils=e,this.options=t,this.logger=G.create("pluralResolver"),this.pluralRulesCache={}}addRule(e,t){this.rules[e]=t}clearCache(){this.pluralRulesCache={}}getRule(e,t={}){const a=Te(e==="dev"?"en":e),s=t.ordinal?"ordinal":"cardinal",r=JSON.stringify({cleanedCode:a,type:s});if(r in this.pluralRulesCache)return this.pluralRulesCache[r];let i;try{i=new Intl.PluralRules(a,{type:s})}catch{if(!Intl)return this.logger.error("No Intl support, please use an Intl polyfill!"),Bt;if(!e.match(/-|_/))return Bt;const c=this.languageUtils.getLanguagePartFromCode(e);i=this.getRule(c,t)}return this.pluralRulesCache[r]=i,i}needsPlural(e,t={}){let a=this.getRule(e,t);return a||(a=this.getRule("dev",t)),(a==null?void 0:a.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(e,t,a={}){return this.getSuffixes(e,a).map(s=>`${t}${s}`)}getSuffixes(e,t={}){let a=this.getRule(e,t);return a||(a=this.getRule("dev",t)),a?a.resolvedOptions().pluralCategories.sort((s,r)=>Qt[s]-Qt[r]).map(s=>`${this.options.prepend}${t.ordinal?`ordinal${this.options.prepend}`:""}${s}`):[]}getSuffix(e,t,a={}){const s=this.getRule(e,a);return s?`${this.options.prepend}${a.ordinal?`ordinal${this.options.prepend}`:""}${s.select(t)}`:(this.logger.warn(`no plural rule found for: ${e}`),this.getSuffix("dev",t,a))}}const Ut=(n,e,t,a=".",s=!0)=>{let r=sa(n,e,t);return!r&&s&&b(t)&&(r=ct(n,t,a),r===void 0&&(r=ct(e,t,a))),r},Xe=n=>n.replace(/\$/g,"$$$$");class pa{constructor(e={}){var t;this.logger=G.create("interpolator"),this.options=e,this.format=((t=e==null?void 0:e.interpolation)==null?void 0:t.format)||(a=>a),this.init(e)}init(e={}){e.interpolation||(e.interpolation={escapeValue:!0});const{escape:t,escapeValue:a,useRawValueToEscape:s,prefix:r,prefixEscaped:i,suffix:l,suffixEscaped:c,formatSeparator:h,unescapeSuffix:d,unescapePrefix:u,nestingPrefix:p,nestingPrefixEscaped:g,nestingSuffix:m,nestingSuffixEscaped:f,nestingOptionsSeparator:w,maxReplaces:N,alwaysFormat:T}=e.interpolation;this.escape=t!==void 0?t:ra,this.escapeValue=a!==void 0?a:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=r?ie(r):i||"{{",this.suffix=l?ie(l):c||"}}",this.formatSeparator=h||",",this.unescapePrefix=d?"":u||"-",this.unescapeSuffix=this.unescapePrefix?"":d||"",this.nestingPrefix=p?ie(p):g||ie("$t("),this.nestingSuffix=m?ie(m):f||ie(")"),this.nestingOptionsSeparator=w||",",this.maxReplaces=N||1e3,this.alwaysFormat=T!==void 0?T:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const e=(t,a)=>(t==null?void 0:t.source)===a?(t.lastIndex=0,t):new RegExp(a,"g");this.regexp=e(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=e(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=e(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(e,t,a,s){var g;let r,i,l;const c=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},h=m=>{if(m.indexOf(this.formatSeparator)<0){const T=Ut(t,c,m,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(T,void 0,a,{...s,...t,interpolationkey:m}):T}const f=m.split(this.formatSeparator),w=f.shift().trim(),N=f.join(this.formatSeparator).trim();return this.format(Ut(t,c,w,this.options.keySeparator,this.options.ignoreJSONStructure),N,a,{...s,...t,interpolationkey:w})};this.resetRegExp();const d=(s==null?void 0:s.missingInterpolationHandler)||this.options.missingInterpolationHandler,u=((g=s==null?void 0:s.interpolation)==null?void 0:g.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:m=>Xe(m)},{regex:this.regexp,safeValue:m=>this.escapeValue?Xe(this.escape(m)):Xe(m)}].forEach(m=>{for(l=0;r=m.regex.exec(e);){const f=r[1].trim();if(i=h(f),i===void 0)if(typeof d=="function"){const N=d(e,r,s);i=b(N)?N:""}else if(s&&Object.prototype.hasOwnProperty.call(s,f))i="";else if(u){i=r[0];continue}else this.logger.warn(`missed to pass in variable ${f} for interpolating ${e}`),i="";else!b(i)&&!this.useRawValueToEscape&&(i=Ht(i));const w=m.safeValue(i);if(e=e.replace(r[0],w),u?(m.regex.lastIndex+=i.length,m.regex.lastIndex-=r[0].length):m.regex.lastIndex=0,l++,l>=this.maxReplaces)break}}),e}nest(e,t,a={}){let s,r,i;const l=(c,h)=>{const d=this.nestingOptionsSeparator;if(c.indexOf(d)<0)return c;const u=c.split(new RegExp(`${d}[ ]*{`));let p=`{${u[1]}`;c=u[0],p=this.interpolate(p,i);const g=p.match(/'/g),m=p.match(/"/g);(((g==null?void 0:g.length)??0)%2===0&&!m||m.length%2!==0)&&(p=p.replace(/'/g,'"'));try{i=JSON.parse(p),h&&(i={...h,...i})}catch(f){return this.logger.warn(`failed parsing options string in nesting for key ${c}`,f),`${c}${d}${p}`}return i.defaultValue&&i.defaultValue.indexOf(this.prefix)>-1&&delete i.defaultValue,c};for(;s=this.nestingRegexp.exec(e);){let c=[];i={...a},i=i.replace&&!b(i.replace)?i.replace:i,i.applyPostProcessor=!1,delete i.defaultValue;const h=/{.*}/.test(s[1])?s[1].lastIndexOf("}")+1:s[1].indexOf(this.formatSeparator);if(h!==-1&&(c=s[1].slice(h).split(this.formatSeparator).map(d=>d.trim()).filter(Boolean),s[1]=s[1].slice(0,h)),r=t(l.call(this,s[1].trim(),i),i),r&&s[0]===e&&!b(r))return r;b(r)||(r=Ht(r)),r||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${e}`),r=""),c.length&&(r=c.reduce((d,u)=>this.format(d,u,a.lng,{...a,interpolationkey:s[1].trim()}),r.trim())),e=e.replace(s[0],r),this.regexp.lastIndex=0}return e}}const ma=n=>{let e=n.toLowerCase().trim();const t={};if(n.indexOf("(")>-1){const a=n.split("(");e=a[0].toLowerCase().trim();const s=a[1].substring(0,a[1].length-1);e==="currency"&&s.indexOf(":")<0?t.currency||(t.currency=s.trim()):e==="relativetime"&&s.indexOf(":")<0?t.range||(t.range=s.trim()):s.split(";").forEach(i=>{if(i){const[l,...c]=i.split(":"),h=c.join(":").trim().replace(/^'+|'+$/g,""),d=l.trim();t[d]||(t[d]=h),h==="false"&&(t[d]=!1),h==="true"&&(t[d]=!0),isNaN(h)||(t[d]=parseInt(h,10))}})}return{formatName:e,formatOptions:t}},Vt=n=>{const e={};return(t,a,s)=>{let r=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(r={...r,[s.interpolationkey]:void 0});const i=a+JSON.stringify(r);let l=e[i];return l||(l=n(Te(a),s),e[i]=l),l(t)}},ga=n=>(e,t,a)=>n(Te(t),a)(e);class fa{constructor(e={}){this.logger=G.create("formatter"),this.options=e,this.init(e)}init(e,t={interpolation:{}}){this.formatSeparator=t.interpolation.formatSeparator||",";const a=t.cacheInBuiltFormats?Vt:ga;this.formats={number:a((s,r)=>{const i=new Intl.NumberFormat(s,{...r});return l=>i.format(l)}),currency:a((s,r)=>{const i=new Intl.NumberFormat(s,{...r,style:"currency"});return l=>i.format(l)}),datetime:a((s,r)=>{const i=new Intl.DateTimeFormat(s,{...r});return l=>i.format(l)}),relativetime:a((s,r)=>{const i=new Intl.RelativeTimeFormat(s,{...r});return l=>i.format(l,r.range||"day")}),list:a((s,r)=>{const i=new Intl.ListFormat(s,{...r});return l=>i.format(l)})}}add(e,t){this.formats[e.toLowerCase().trim()]=t}addCached(e,t){this.formats[e.toLowerCase().trim()]=Vt(t)}format(e,t,a,s={}){const r=t.split(this.formatSeparator);if(r.length>1&&r[0].indexOf("(")>1&&r[0].indexOf(")")<0&&r.find(l=>l.indexOf(")")>-1)){const l=r.findIndex(c=>c.indexOf(")")>-1);r[0]=[r[0],...r.splice(1,l)].join(this.formatSeparator)}return r.reduce((l,c)=>{var u;const{formatName:h,formatOptions:d}=ma(c);if(this.formats[h]){let p=l;try{const g=((u=s==null?void 0:s.formatParams)==null?void 0:u[s.interpolationkey])||{},m=g.locale||g.lng||s.locale||s.lng||a;p=this.formats[h](l,m,{...d,...s,...g})}catch(g){this.logger.warn(g)}return p}else this.logger.warn(`there was no format function for ${h}`);return l},e)}}const ba=(n,e)=>{n.pending[e]!==void 0&&(delete n.pending[e],n.pendingCount--)};class ya extends Ke{constructor(e,t,a,s={}){var r,i;super(),this.backend=e,this.store=t,this.services=a,this.languageUtils=a.languageUtils,this.options=s,this.logger=G.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],(i=(r=this.backend)==null?void 0:r.init)==null||i.call(r,a,s.backend,s)}queueLoad(e,t,a,s){const r={},i={},l={},c={};return e.forEach(h=>{let d=!0;t.forEach(u=>{const p=`${h}|${u}`;!a.reload&&this.store.hasResourceBundle(h,u)?this.state[p]=2:this.state[p]<0||(this.state[p]===1?i[p]===void 0&&(i[p]=!0):(this.state[p]=1,d=!1,i[p]===void 0&&(i[p]=!0),r[p]===void 0&&(r[p]=!0),c[u]===void 0&&(c[u]=!0)))}),d||(l[h]=!0)}),(Object.keys(r).length||Object.keys(i).length)&&this.queue.push({pending:i,pendingCount:Object.keys(i).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(r),pending:Object.keys(i),toLoadLanguages:Object.keys(l),toLoadNamespaces:Object.keys(c)}}loaded(e,t,a){const s=e.split("|"),r=s[0],i=s[1];t&&this.emit("failedLoading",r,i,t),!t&&a&&this.store.addResourceBundle(r,i,a,void 0,void 0,{skipCopy:!0}),this.state[e]=t?-1:2,t&&a&&(this.state[e]=0);const l={};this.queue.forEach(c=>{na(c.loaded,[r],i),ba(c,e),t&&c.errors.push(t),c.pendingCount===0&&!c.done&&(Object.keys(c.loaded).forEach(h=>{l[h]||(l[h]={});const d=c.loaded[h];d.length&&d.forEach(u=>{l[h][u]===void 0&&(l[h][u]=!0)})}),c.done=!0,c.errors.length?c.callback(c.errors):c.callback())}),this.emit("loaded",l),this.queue=this.queue.filter(c=>!c.done)}read(e,t,a,s=0,r=this.retryTimeout,i){if(!e.length)return i(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:e,ns:t,fcName:a,tried:s,wait:r,callback:i});return}this.readingCalls++;const l=(h,d)=>{if(this.readingCalls--,this.waitingReads.length>0){const u=this.waitingReads.shift();this.read(u.lng,u.ns,u.fcName,u.tried,u.wait,u.callback)}if(h&&d&&s<this.maxRetries){setTimeout(()=>{this.read.call(this,e,t,a,s+1,r*2,i)},r);return}i(h,d)},c=this.backend[a].bind(this.backend);if(c.length===2){try{const h=c(e,t);h&&typeof h.then=="function"?h.then(d=>l(null,d)).catch(l):l(null,h)}catch(h){l(h)}return}return c(e,t,l)}prepareLoading(e,t,a={},s){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();b(e)&&(e=this.languageUtils.toResolveHierarchy(e)),b(t)&&(t=[t]);const r=this.queueLoad(e,t,a,s);if(!r.toLoad.length)return r.pending.length||s(),null;r.toLoad.forEach(i=>{this.loadOne(i)})}load(e,t,a){this.prepareLoading(e,t,{},a)}reload(e,t,a){this.prepareLoading(e,t,{reload:!0},a)}loadOne(e,t=""){const a=e.split("|"),s=a[0],r=a[1];this.read(s,r,"read",void 0,void 0,(i,l)=>{i&&this.logger.warn(`${t}loading namespace ${r} for language ${s} failed`,i),!i&&l&&this.logger.log(`${t}loaded namespace ${r} for language ${s}`,l),this.loaded(e,i,l)})}saveMissing(e,t,a,s,r,i={},l=()=>{}){var c,h,d,u,p;if((h=(c=this.services)==null?void 0:c.utils)!=null&&h.hasLoadedNamespace&&!((u=(d=this.services)==null?void 0:d.utils)!=null&&u.hasLoadedNamespace(t))){this.logger.warn(`did not save key "${a}" as the namespace "${t}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(a==null||a==="")){if((p=this.backend)!=null&&p.create){const g={...i,isUpdate:r},m=this.backend.create.bind(this.backend);if(m.length<6)try{let f;m.length===5?f=m(e,t,a,s,g):f=m(e,t,a,s),f&&typeof f.then=="function"?f.then(w=>l(null,w)).catch(l):l(null,f)}catch(f){l(f)}else m(e,t,a,s,l,g)}!e||!e[0]||this.store.addResource(e[0],t,a,s)}}}const Gt=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:n=>{let e={};if(typeof n[1]=="object"&&(e=n[1]),b(n[1])&&(e.defaultValue=n[1]),b(n[2])&&(e.tDescription=n[2]),typeof n[2]=="object"||typeof n[3]=="object"){const t=n[3]||n[2];Object.keys(t).forEach(a=>{e[a]=t[a]})}return e},interpolation:{escapeValue:!0,format:n=>n,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),Kt=n=>{var e,t;return b(n.ns)&&(n.ns=[n.ns]),b(n.fallbackLng)&&(n.fallbackLng=[n.fallbackLng]),b(n.fallbackNS)&&(n.fallbackNS=[n.fallbackNS]),((t=(e=n.supportedLngs)==null?void 0:e.indexOf)==null?void 0:t.call(e,"cimode"))<0&&(n.supportedLngs=n.supportedLngs.concat(["cimode"])),typeof n.initImmediate=="boolean"&&(n.initAsync=n.initImmediate),n},Ie=()=>{},wa=n=>{Object.getOwnPropertyNames(Object.getPrototypeOf(n)).forEach(t=>{typeof n[t]=="function"&&(n[t]=n[t].bind(n))})};class Le extends Ke{constructor(e={},t){if(super(),this.options=Kt(e),this.services={},this.logger=G,this.modules={external:[]},wa(this),t&&!this.isInitialized&&!e.isClone){if(!this.options.initAsync)return this.init(e,t),this;setTimeout(()=>{this.init(e,t)},0)}}init(e={},t){this.isInitializing=!0,typeof e=="function"&&(t=e,e={}),e.defaultNS==null&&e.ns&&(b(e.ns)?e.defaultNS=e.ns:e.ns.indexOf("translation")<0&&(e.defaultNS=e.ns[0]));const a=Gt();this.options={...a,...this.options,...Kt(e)},this.options.interpolation={...a.interpolation,...this.options.interpolation},e.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=e.keySeparator),e.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=e.nsSeparator);const s=h=>h?typeof h=="function"?new h:h:null;if(!this.options.isClone){this.modules.logger?G.init(s(this.modules.logger),this.options):G.init(null,this.options);let h;this.modules.formatter?h=this.modules.formatter:h=fa;const d=new qt(this.options);this.store=new Wt(this.options.resources,this.options);const u=this.services;u.logger=G,u.resourceStore=this.store,u.languageUtils=d,u.pluralResolver=new ua(d,{prepend:this.options.pluralSeparator,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),this.options.interpolation.format&&this.options.interpolation.format!==a.interpolation.format&&this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"),h&&(!this.options.interpolation.format||this.options.interpolation.format===a.interpolation.format)&&(u.formatter=s(h),u.formatter.init&&u.formatter.init(u,this.options),this.options.interpolation.format=u.formatter.format.bind(u.formatter)),u.interpolator=new pa(this.options),u.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},u.backendConnector=new ya(s(this.modules.backend),u.resourceStore,u,this.options),u.backendConnector.on("*",(g,...m)=>{this.emit(g,...m)}),this.modules.languageDetector&&(u.languageDetector=s(this.modules.languageDetector),u.languageDetector.init&&u.languageDetector.init(u,this.options.detection,this.options)),this.modules.i18nFormat&&(u.i18nFormat=s(this.modules.i18nFormat),u.i18nFormat.init&&u.i18nFormat.init(this)),this.translator=new qe(this.services,this.options),this.translator.on("*",(g,...m)=>{this.emit(g,...m)}),this.modules.external.forEach(g=>{g.init&&g.init(this)})}if(this.format=this.options.interpolation.format,t||(t=Ie),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const h=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);h.length>0&&h[0]!=="dev"&&(this.options.lng=h[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(h=>{this[h]=(...d)=>this.store[h](...d)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(h=>{this[h]=(...d)=>(this.store[h](...d),this)});const l=he(),c=()=>{const h=(d,u)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),l.resolve(u),t(d,u)};if(this.languages&&!this.isInitialized)return h(null,this.t.bind(this));this.changeLanguage(this.options.lng,h)};return this.options.resources||!this.options.initAsync?c():setTimeout(c,0),l}loadResources(e,t=Ie){var r,i;let a=t;const s=b(e)?e:this.language;if(typeof e=="function"&&(a=e),!this.options.resources||this.options.partialBundledLanguages){if((s==null?void 0:s.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return a();const l=[],c=h=>{if(!h||h==="cimode")return;this.services.languageUtils.toResolveHierarchy(h).forEach(u=>{u!=="cimode"&&l.indexOf(u)<0&&l.push(u)})};s?c(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(d=>c(d)),(i=(r=this.options.preload)==null?void 0:r.forEach)==null||i.call(r,h=>c(h)),this.services.backendConnector.load(l,this.options.ns,h=>{!h&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),a(h)})}else a(null)}reloadResources(e,t,a){const s=he();return typeof e=="function"&&(a=e,e=void 0),typeof t=="function"&&(a=t,t=void 0),e||(e=this.languages),t||(t=this.options.ns),a||(a=Ie),this.services.backendConnector.reload(e,t,r=>{s.resolve(),a(r)}),s}use(e){if(!e)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!e.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return e.type==="backend"&&(this.modules.backend=e),(e.type==="logger"||e.log&&e.warn&&e.error)&&(this.modules.logger=e),e.type==="languageDetector"&&(this.modules.languageDetector=e),e.type==="i18nFormat"&&(this.modules.i18nFormat=e),e.type==="postProcessor"&&qn.addPostProcessor(e),e.type==="formatter"&&(this.modules.formatter=e),e.type==="3rdParty"&&this.modules.external.push(e),this}setResolvedLanguage(e){if(!(!e||!this.languages)&&!(["cimode","dev"].indexOf(e)>-1)){for(let t=0;t<this.languages.length;t++){const a=this.languages[t];if(!(["cimode","dev"].indexOf(a)>-1)&&this.store.hasLanguageSomeTranslations(a)){this.resolvedLanguage=a;break}}!this.resolvedLanguage&&this.languages.indexOf(e)<0&&this.store.hasLanguageSomeTranslations(e)&&(this.resolvedLanguage=e,this.languages.unshift(e))}}changeLanguage(e,t){this.isLanguageChangingTo=e;const a=he();this.emit("languageChanging",e);const s=l=>{this.language=l,this.languages=this.services.languageUtils.toResolveHierarchy(l),this.resolvedLanguage=void 0,this.setResolvedLanguage(l)},r=(l,c)=>{c?this.isLanguageChangingTo===e&&(s(c),this.translator.changeLanguage(c),this.isLanguageChangingTo=void 0,this.emit("languageChanged",c),this.logger.log("languageChanged",c)):this.isLanguageChangingTo=void 0,a.resolve((...h)=>this.t(...h)),t&&t(l,(...h)=>this.t(...h))},i=l=>{var d,u;!e&&!l&&this.services.languageDetector&&(l=[]);const c=b(l)?l:l&&l[0],h=this.store.hasLanguageSomeTranslations(c)?c:this.services.languageUtils.getBestMatchFromCodes(b(l)?[l]:l);h&&(this.language||s(h),this.translator.language||this.translator.changeLanguage(h),(u=(d=this.services.languageDetector)==null?void 0:d.cacheUserLanguage)==null||u.call(d,h)),this.loadResources(h,p=>{r(p,h)})};return!e&&this.services.languageDetector&&!this.services.languageDetector.async?i(this.services.languageDetector.detect()):!e&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(i):this.services.languageDetector.detect(i):i(e),a}getFixedT(e,t,a){const s=(r,i,...l)=>{let c;typeof i!="object"?c=this.options.overloadTranslationOptionHandler([r,i].concat(l)):c={...i},c.lng=c.lng||s.lng,c.lngs=c.lngs||s.lngs,c.ns=c.ns||s.ns,c.keyPrefix!==""&&(c.keyPrefix=c.keyPrefix||a||s.keyPrefix);const h=this.options.keySeparator||".";let d;return c.keyPrefix&&Array.isArray(r)?d=r.map(u=>(typeof u=="function"&&(u=dt(u,{...this.options,...i})),`${c.keyPrefix}${h}${u}`)):(typeof r=="function"&&(r=dt(r,{...this.options,...i})),d=c.keyPrefix?`${c.keyPrefix}${h}${r}`:r),this.t(d,c)};return b(e)?s.lng=e:s.lngs=e,s.ns=t,s.keyPrefix=a,s}t(...e){var t;return(t=this.translator)==null?void 0:t.translate(...e)}exists(...e){var t;return(t=this.translator)==null?void 0:t.exists(...e)}setDefaultNamespace(e){this.options.defaultNS=e}hasLoadedNamespace(e,t={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const a=t.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,r=this.languages[this.languages.length-1];if(a.toLowerCase()==="cimode")return!0;const i=(l,c)=>{const h=this.services.backendConnector.state[`${l}|${c}`];return h===-1||h===0||h===2};if(t.precheck){const l=t.precheck(this,i);if(l!==void 0)return l}return!!(this.hasResourceBundle(a,e)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||i(a,e)&&(!s||i(r,e)))}loadNamespaces(e,t){const a=he();return this.options.ns?(b(e)&&(e=[e]),e.forEach(s=>{this.options.ns.indexOf(s)<0&&this.options.ns.push(s)}),this.loadResources(s=>{a.resolve(),t&&t(s)}),a):(t&&t(),Promise.resolve())}loadLanguages(e,t){const a=he();b(e)&&(e=[e]);const s=this.options.preload||[],r=e.filter(i=>s.indexOf(i)<0&&this.services.languageUtils.isSupportedCode(i));return r.length?(this.options.preload=s.concat(r),this.loadResources(i=>{a.resolve(),t&&t(i)}),a):(t&&t(),Promise.resolve())}dir(e){var s,r;if(e||(e=this.resolvedLanguage||(((s=this.languages)==null?void 0:s.length)>0?this.languages[0]:this.language)),!e)return"rtl";try{const i=new Intl.Locale(e);if(i&&i.getTextInfo){const l=i.getTextInfo();if(l&&l.direction)return l.direction}}catch{}const t=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],a=((r=this.services)==null?void 0:r.languageUtils)||new qt(Gt());return e.toLowerCase().indexOf("-latn")>1?"ltr":t.indexOf(a.getLanguagePartFromCode(e))>-1||e.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(e={},t){const a=new Le(e,t);return a.createInstance=Le.createInstance,a}cloneInstance(e={},t=Ie){const a=e.forkResourceStore;a&&delete e.forkResourceStore;const s={...this.options,...e,isClone:!0},r=new Le(s);if((e.debug!==void 0||e.prefix!==void 0)&&(r.logger=r.logger.clone(e)),["store","services","language"].forEach(l=>{r[l]=this[l]}),r.services={...this.services},r.services.utils={hasLoadedNamespace:r.hasLoadedNamespace.bind(r)},a){const l=Object.keys(this.store.data).reduce((c,h)=>(c[h]={...this.store.data[h]},c[h]=Object.keys(c[h]).reduce((d,u)=>(d[u]={...c[h][u]},d),c[h]),c),{});r.store=new Wt(l,s),r.services.resourceStore=r.store}return r.translator=new qe(r.services,s),r.translator.on("*",(l,...c)=>{r.emit(l,...c)}),r.init(s,t),r.translator.options=s,r.translator.backendConnector.services.utils={hasLoadedNamespace:r.hasLoadedNamespace.bind(r)},r}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const O=Le.createInstance();O.createInstance;O.dir;O.init;O.loadResources;O.reloadResources;O.use;O.changeLanguage;O.getFixedT;O.t;O.exists;O.setDefaultNamespace;O.hasLoadedNamespace;O.loadNamespaces;O.loadLanguages;const Sa=(n,e,t,a)=>{var r,i,l,c;const s=[t,{code:e,...a||{}}];if((i=(r=n==null?void 0:n.services)==null?void 0:r.logger)!=null&&i.forward)return n.services.logger.forward(s,"warn","react-i18next::",!0);se(s[0])&&(s[0]=`react-i18next:: ${s[0]}`),(c=(l=n==null?void 0:n.services)==null?void 0:l.logger)!=null&&c.warn?n.services.logger.warn(...s):console!=null&&console.warn&&console.warn(...s)},Yt={},Bn=(n,e,t,a)=>{se(t)&&Yt[t]||(se(t)&&(Yt[t]=new Date),Sa(n,e,t,a))},Un=(n,e)=>()=>{if(n.isInitialized)e();else{const t=()=>{setTimeout(()=>{n.off("initialized",t)},0),e()};n.on("initialized",t)}},ht=(n,e,t)=>{n.loadNamespaces(e,Un(n,t))},Zt=(n,e,t,a)=>{if(se(t)&&(t=[t]),n.options.preload&&n.options.preload.indexOf(e)>-1)return ht(n,t,a);t.forEach(s=>{n.options.ns.indexOf(s)<0&&n.options.ns.push(s)}),n.loadLanguages(e,Un(n,a))},va=(n,e,t={})=>!e.languages||!e.languages.length?(Bn(e,"NO_LANGUAGES","i18n.languages were undefined or empty",{languages:e.languages}),!0):e.hasLoadedNamespace(n,{lng:t.lng,precheck:(a,s)=>{if(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&a.services.backendConnector.backend&&a.isLanguageChangingTo&&!s(a.isLanguageChangingTo,n))return!1}}),se=n=>typeof n=="string",ka=n=>typeof n=="object"&&n!==null,xa=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,Pa={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},Ra=n=>Pa[n],Aa=n=>n.replace(xa,Ra);let ut={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:Aa};const Ca=(n={})=>{ut={...ut,...n}},La=()=>ut;let Vn;const Ta=n=>{Vn=n},Da=()=>Vn,Na={type:"3rdParty",init(n){Ca(n.options.react),Ta(n)}},ja=R.createContext();class Oa{constructor(){this.usedNamespaces={}}addUsedNamespaces(e){e.forEach(t=>{this.usedNamespaces[t]||(this.usedNamespaces[t]=!0)})}getUsedNamespaces(){return Object.keys(this.usedNamespaces)}}var Je={exports:{}},et={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xt;function Ea(){if(Xt)return et;Xt=1;var n=In();function e(u,p){return u===p&&(u!==0||1/u===1/p)||u!==u&&p!==p}var t=typeof Object.is=="function"?Object.is:e,a=n.useState,s=n.useEffect,r=n.useLayoutEffect,i=n.useDebugValue;function l(u,p){var g=p(),m=a({inst:{value:g,getSnapshot:p}}),f=m[0].inst,w=m[1];return r(function(){f.value=g,f.getSnapshot=p,c(f)&&w({inst:f})},[u,g,p]),s(function(){return c(f)&&w({inst:f}),u(function(){c(f)&&w({inst:f})})},[u]),i(g),g}function c(u){var p=u.getSnapshot;u=u.value;try{var g=p();return!t(u,g)}catch{return!0}}function h(u,p){return p()}var d=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?h:l;return et.useSyncExternalStore=n.useSyncExternalStore!==void 0?n.useSyncExternalStore:d,et}var Jt;function $a(){return Jt||(Jt=1,Je.exports=Ea()),Je.exports}var Ia=$a();const Ha=(n,e)=>se(e)?e:ka(e)&&se(e.defaultValue)?e.defaultValue:Array.isArray(n)?n[n.length-1]:n,_a={t:Ha,ready:!1},Ma=()=>()=>{},Fa=(n,e={})=>{var I,C,Oe;const{i18n:t}=e,{i18n:a,defaultNS:s}=R.useContext(ja)||{},r=t||a||Da();r&&!r.reportNamespaces&&(r.reportNamespaces=new Oa),r||Bn(r,"NO_I18NEXT_INSTANCE","useTranslation: You will need to pass in an i18next instance by using initReactI18next");const i=R.useMemo(()=>{var x;return{...La(),...(x=r==null?void 0:r.options)==null?void 0:x.react,...e}},[r,e]),{useSuspense:l,keyPrefix:c}=i,h=s||((I=r==null?void 0:r.options)==null?void 0:I.defaultNS),d=se(h)?[h]:h||["translation"],u=R.useMemo(()=>d,d);(Oe=(C=r==null?void 0:r.reportNamespaces)==null?void 0:C.addUsedNamespaces)==null||Oe.call(C,u);const p=R.useRef(0),g=R.useCallback(x=>{if(!r)return Ma;const{bindI18n:S,bindI18nStore:v}=i,L=()=>{p.current+=1,x()};return S&&r.on(S,L),v&&r.store.on(v,L),()=>{S&&S.split(" ").forEach(_=>r.off(_,L)),v&&v.split(" ").forEach(_=>r.store.off(_,L))}},[r,i]),m=R.useRef(),f=R.useCallback(()=>{if(!r)return _a;const x=!!(r.isInitialized||r.initializedStoreOnce)&&u.every(J=>va(J,r,i)),S=e.lng||r.language,v=p.current,L=m.current;if(L&&L.ready===x&&L.lng===S&&L.keyPrefix===c&&L.revision===v)return L;const Q={t:r.getFixedT(S,i.nsMode==="fallback"?u:u[0],c),ready:x,lng:S,keyPrefix:c,revision:v};return m.current=Q,Q},[r,u,c,i,e.lng]),[w,N]=R.useState(0),{t:T,ready:E}=Ia.useSyncExternalStore(g,f,f);R.useEffect(()=>{if(r&&!E&&!l){const x=()=>N(S=>S+1);e.lng?Zt(r,e.lng,u,x):ht(r,u,x)}},[r,e.lng,u,E,l,w]);const A=r||{},D=R.useRef(null),M=R.useRef(),q=x=>{const S=Object.getOwnPropertyDescriptors(x);S.__original&&delete S.__original;const v=Object.create(Object.getPrototypeOf(x),S);if(!Object.prototype.hasOwnProperty.call(v,"__original"))try{Object.defineProperty(v,"__original",{value:x,writable:!1,enumerable:!1,configurable:!1})}catch{}return v},X=R.useMemo(()=>{const x=A,S=x==null?void 0:x.language;let v=x;x&&(D.current&&D.current.__original===x?M.current!==S?(v=q(x),D.current=v,M.current=S):v=D.current:(v=q(x),D.current=v,M.current=S));const L=[T,v,E];return L.t=T,L.i18n=v,L.ready=E,L},[T,A,E,A.resolvedLanguage,A.language,A.languages]);if(r&&l&&!E)throw new Promise(x=>{const S=()=>x();e.lng?Zt(r,e.lng,u,S):ht(r,u,S)});return X},Gn={meta:{title:"Webterminal — 开源堡垒机",description:"浏览器与本地客户端统一接入服务器、桌面、数据库和 Kubernetes，账号级授权、审批、改密与全程审计。"},nav:{home:"首页",features:"功能",docs:"文档",compare:"产品对比",editions:"版本",community:"社区",github:"GitHub",language:"English"},common:{getStarted:"快速部署",readDocs:"阅读文档",viewOnGithub:"在 GitHub 上查看",learnMore:"了解更多",contactUs:"联系我们",copy:"复制",copied:"已复制",notFound:"页面不存在",backHome:"返回首页"},hero:{eyebrow:"安全接入 · 精细授权 · 全程可审计",title:"一个入口，|管住每一次运维访问",subtitle:'Webterminal 是可自托管的开源堡垒机：在浏览器里或用你习惯的本地工具访问 Linux、Windows、数据库和 Kubernetes，按"用户 × 资产 × 账号 × 协议 × 动作"授权，命令、SQL、文件和画面全程留痕。',primary:"快速部署",secondary:"阅读文档",protocols:["SSH","SFTP","RDP","VNC","Telnet","FTP","MySQL","PostgreSQL","SQL Server","Oracle","Redis","MongoDB","Kubernetes","RemoteApp"]},highlights:[{value:"14",label:"种接入协议"},{value:"6",label:"种数据库线协议代理"},{value:"Web + 原生",label:"浏览器与本地客户端两条路"},{value:"单机 / 多副本",label:"Docker Compose 或 Helm 高可用"}],pillars:{title:"从接入到审计的完整闭环",subtitle:"不只是把远程协议搬进浏览器：身份、授权、凭据、连接和审计在一条路径上串起来。",items:[{key:"access",title:"统一接入",desc:"服务器、桌面、数据库、容器和应用，一个入口全部覆盖。",points:["浏览器内 SSH 终端、SFTP 文件管理、RDP / VNC 桌面","网页数据库客户端，支持六种主流数据库","Kubernetes 容器终端，按命名空间与 Pod 标签授权","RemoteApp 应用发布，程序像本地窗口一样打开","Xshell、mstsc、Navicat、DBeaver 等本地客户端直连代理端口，另有 Telnet、FTP 代理"]},{key:"authz",title:"精细授权",desc:'授权落到"哪个账号、哪种协议、哪些动作"，而不只是"能不能连"。',points:["主体（用户 / 用户组）× 资产或节点 × 托管账号 × 协议","动作逐项控制：上传、下载、删除、重命名、剪贴板方向、端口转发、X11、Agent 转发、协作共享","访问策略：来源 IP、时间段、多因子认证、强制录像、水印、会话时长与并发、数据库只读","权限申请与审批工单、限时临时授权，到期自动回收","内置角色职责分离：管理员、资产管理员、审批人、审计员、普通用户"]},{key:"accounts",title:"账号与凭据",desc:"密码集中托管、定期轮换，运维人员不需要知道目标机密码。",points:["托管账号加密存储，连接时由堡垒机代填","自动改密：SSH、WinRM、LDAP / LDAPS、数据库、SMB，RDP 兜底","改密时联动依赖该账号的 Windows 服务与计划任务","查看明文密码需审批，改密历史可追溯","定期巡检资产连通性与账号可用性，失败自动告警"]},{key:"database",title:"数据库安全",desc:"原生线协议代理，在 SQL 层面做控制，而不只是录屏。",points:["MySQL、PostgreSQL、SQL Server、Oracle、Redis、MongoDB 线协议代理","SQL 规则：拒绝、审批、复核，危险语句执行前拦下","动态脱敏：手机号、身份证、邮箱等按规则遮盖","只读模式、返回行数上限与 SQL 配额","变更回滚与结构迁移，每条 SQL 都有记录"]},{key:"audit",title:"审计合规",desc:"谁、在什么时候、用哪个账号、对哪台机器做了什么，都能查到、回放、证明。",points:["字符与图形会话全程录像，在线回放","命令、SQL、文件传输、网络访问逐条记录，跨会话检索","实时监控、协作共享、管理员接管与强制断开","审计日志哈希链与录像封存，防篡改可校验","Syslog / SIEM 外发、数据保留策略、实时告警与行为分析"]},{key:"ops",title:"运维与集成",desc:"融入现有的身份体系和网络环境，部署和升级都只要一条命令。",points:["作业中心：批量命令与文件分发，走 SSH / WinRM / RDP 通道，支持定时执行","网络网关：隔离网段一行命令部署，无需开放入站端口","LDAP / AD 用户同步，OIDC / SAML 2.0 / CAS 单点登录","多因子认证：TOTP、邮件、企业微信、钉钉、飞书、短信","告警通知：邮件、Webhook、企业微信、钉钉、飞书、短信"]}]},native:{title:"用你习惯的工具，照样被管住",subtitle:"不想用网页终端？直接用本地客户端连接堡垒机的代理端口，授权、策略、命令过滤、录像和审计一样生效。装上 Webterminal Helper，网页上点一下就能拉起本地客户端。",clients:[{proto:"SSH / SFTP",tools:"OpenSSH、Xshell、SecureCRT、Termius、WinSCP、FileZilla"},{proto:"RDP / VNC",tools:"mstsc、Windows App（macOS）、FreeRDP、mterminal"},{proto:"数据库",tools:"Navicat、DBeaver、DataGrip、HeidiSQL、TablePlus、命令行客户端"}],codeTitle:"本地客户端连接示例",helperTitle:"Webterminal Helper",helperDesc:'注册 wterm:// 链接，网页上点"一键连接"时读取一次性令牌并拉起你选择的客户端；Windows 下自动代填凭据，支持 RemoteApp。'},screens:{title:"产品界面",subtitle:"截图来自演示环境，数据均为示例。",items:[{key:"assets",label:"资产管理",desc:"资产、托管账号、改密策略和网关集中管理。"},{key:"authorization",label:"资产授权",desc:"按用户、资产、账号、协议和动作授权，关联访问策略。"},{key:"audit",label:"会话审计",desc:"在线会话监控，历史录像回放，命令 / SQL / 文件 / 网络访问逐条检索。"},{key:"database",label:"SQL 管控",desc:"SQL 过滤、审批、脱敏、配额和结构迁移。"},{key:"jobs",label:"作业中心",desc:"对多台主机批量执行命令、分发文件，支持定时作业。"},{key:"workspace",label:"资产连接",desc:"按节点组织的资产树，双击在浏览器中连接，右键用本地客户端打开。"}]},architecture:{title:"架构",subtitle:"所有访问都经过堡垒机：认证、授权、协议代理和审计在同一个进程链路上完成。",users:{title:"用户",items:["浏览器","本地客户端","Webterminal Helper"]},core:{title:"Webterminal",items:["控制台与 API","身份认证 / SSO / MFA","授权与策略引擎","协议代理（SSH · RDP · VNC · 数据库 · K8s）","录像与审计","作业、改密、巡检"]},gateway:{title:"网络网关（可选）",items:["隔离网段","主动回连，无需入站端口"]},targets:{title:"资产",items:["Linux / Unix","Windows","数据库","Kubernetes","网络设备"]}},steps:{title:"三步跑通第一次连接",items:[{title:"部署",desc:"一条命令完成 Docker Compose 安装，打开控制台走完初始化向导。"},{title:"添加资产与账号",desc:"登记主机、数据库或集群，托管登录账号并测试连接。"},{title:"授权并开始审计",desc:"给用户授权资产、账号和动作，会话自动录像、命令自动记录。"}],codeTitle:"单机安装"},deploy:{title:"部署在你自己的环境里",subtitle:"数据库、录像和凭据都留在你的网络内，支持内网离线部署。",cards:[{title:"Docker Compose",points:["install.sh 一键安装，自动生成随机密钥","upgrade.sh 升级前自动快照，restore.sh 回滚","SQLite 起步，生产可用 MySQL / PostgreSQL"]},{title:"Kubernetes / Helm",points:["Helm Chart 一条命令安装","多副本高可用：会话控制跨副本转发，无需会话粘滞","滚动升级，PodDisruptionBudget 保底"]},{title:"网络网关",points:["资产在隔离网段时，网关主动连回堡垒机","Linux / Windows 一行命令安装，或用容器运行","网关离线即拒绝连接，绝不回退直连"]}],ports:"默认端口：8080 控制台 · 2222 SSH/SFTP · 3389 RDP · 13306 / 15432 / 11433 / 11521 MySQL / PostgreSQL / SQL Server / Oracle · 16379 Redis · 37017 MongoDB"},security:{title:"安全设计",items:[{title:"凭据不出堡垒机",desc:"目标机密码加密保存，连接时代填；本地客户端的令牌只对本次会话有效。"},{title:"每个动作都鉴权",desc:"建立连接时鉴权一次还不够：上传、下载、剪贴板、端口转发在每次发生时再检查，拒绝即审计。"},{title:"失败即拒绝",desc:'网关不可用、证书不匹配、策略无法解析时一律拒绝，不做"降级放行"。'},{title:"审计可证明",desc:"审计日志串成哈希链，录像结束即封存，可随时校验是否被篡改。"}]},faq:{title:"常见问题",items:[{q:"这和 GitHub 上原来的 Django 版 Webterminal 是什么关系？",a:"这是 Webterminal 的新一代版本，后端用 Go 重写，前端换成 React，协议代理、授权模型和审计能力全面升级。旧版仍保留在仓库历史中。"},{q:"社区版和企业版有什么区别？",a:'社区版免费，包含全部常用协议的接入、账号级授权、录像审计、命令和 SQL 过滤、基础改密和作业，同时最多 3 个图形会话、1 个网关、单副本。企业版增加集群高可用、合规报表、数据脱敏、SAML / CAS、目录同步、定时作业、RemoteApp、Kubernetes 等，并提供支持与 SLA。安装后可以免费试用企业版 15 天。详见"版本"页面。'},{q:"支持哪些数据库作为元数据库？",a:"演示或小规模可用 SQLite；生产环境建议 MySQL 或 PostgreSQL，多副本高可用必须使用这两者之一。"},{q:"可以只用本地客户端，不用网页吗？",a:"可以。SSH、RDP、数据库都提供代理端口，直接用 Xshell、mstsc、Navicat 等连接即可，授权、策略和审计同样生效。"},{q:"能在完全隔离的内网部署吗？",a:"可以。在能联网的机器上构建镜像后导出，再导入内网主机运行；运行时不依赖任何外部服务。"}]},cta:{title:"现在就开始",subtitle:"十分钟部署，第一次连接就有完整审计。"},footer:{tagline:"开源堡垒机：统一接入、精细授权、全程审计",product:"产品",resources:"资源",contact:"联系",copyright:"Webterminal"},docs:{title:"文档",search:"搜索文档…",noResult:"没有找到相关内容",onThisPage:"本页目录",groups:{start:"开始",guide:"使用指南",more:"更多"},names:{overview:"产品介绍",install:"安装部署",quickstart:"快速入门","user-guide":"用户手册","admin-guide":"管理员手册",faq:"常见问题"},consoleHint:"控制台菜单",edit:"在 GitHub 上编辑此页"},compare:{title:"产品对比",subtitle:"与常见的开源 / 社区版堡垒机按公开资料对比，帮助你判断是否合适。",note:'依据各产品官网公开信息整理（2026 年 10 月）。"企业版 / 付费版"表示官网写明该项属于商业版本；"见官网"表示公开资料未写明，请以对方官网为准。',columns:["能力","Webterminal 社区版","JumpServer 社区版","Next Terminal 免费版"],groups:[{title:"授权与开源",rows:[{k:"源码",v:["社区版开源","开源（GPL-3.0）","前端开源，服务端自 v2.0 起闭源"]},{k:"资产数量",v:["不限","最多 5,000","最多 100"]},{k:"图形会话并发（RDP / VNC，网页与本地合计）",v:["3 个（企业版按授权）","见官网","见官网"]},{k:"企业功能试用",v:["安装即可试用 15 天","见官网","见官网"]}]},{title:"接入协议",rows:[{k:"SSH / SFTP / RDP / VNC / Telnet",v:["yes","yes","yes"]},{k:"MySQL / PostgreSQL / Redis / MongoDB",v:["yes","yes","见官网"]},{k:"Oracle / SQL Server",v:["yes","企业版","见官网"]},{k:"Kubernetes 容器终端",v:["企业版","yes","—"]},{k:"RemoteApp 应用发布",v:["企业版","企业版","见官网"]},{k:"Web 网站资产（HTTP 代理）",v:["—","yes","yes"]},{k:"本地客户端直连（ssh、mstsc、Navicat…）",v:["yes","部分","见官网"]}]},{title:"授权与身份",rows:[{k:"按托管账号 × 协议 × 动作授权",v:["yes","yes","见官网"]},{k:"权限申请与审批工单",v:["yes","企业版","见官网"]},{k:"LDAP / AD 登录、OIDC 单点登录",v:["yes","企业版","付费版"]},{k:"SAML / CAS 单点登录、用户目录同步",v:["企业版","企业版","付费版"]},{k:"TOTP 多因子认证",v:["yes","yes","yes"]},{k:"多租户 / 多组织",v:["—","企业版","见官网"]}]},{title:"账号与数据库",rows:[{k:"自动改密（SSH、WinRM、数据库账号）",v:["yes","企业版","见官网"]},{k:"高级改密（网络设备、LDAP、SMB，依赖服务联动）",v:["企业版","企业版","见官网"]},{k:"SQL 拦截与审批",v:["yes","见官网","见官网"]},{k:"动态脱敏、SQL 配额、SQL 回滚、结构迁移",v:["企业版","见官网","见官网"]}]},{title:"审计与运维",rows:[{k:"录像回放、命令记录",v:["yes","yes","yes"]},{k:"实时监控、会话共享与接管",v:["yes","yes","见官网"]},{k:"审计防篡改（哈希链、录像封存）",v:["yes","见官网","见官网"]},{k:"批量作业（SSH 通道）",v:["yes","yes","见官网"]},{k:"定时作业、RDP / WinRM 通道作业",v:["企业版","见官网","见官网"]},{k:"网络网关（隔离网段）",v:["1 个（企业版不限）","yes","付费版"]},{k:"多副本高可用",v:["企业版","企业版","见官网"]},{k:"合规报表、异常行为分析、录像文字检索、日志外发",v:["企业版","见官网","见官网"]}]}],legendYes:"支持"},editions:{title:"版本",subtitle:"社区版免费使用，覆盖接入、授权与审计主线；企业版增加规模、合规、数据库高级管控和自动化，并提供商业保障。安装后可免费试用企业版 15 天。",recommended:"推荐",contact:"咨询企业版",download:"免费部署"},community:{title:"社区与联系",subtitle:"使用中遇到问题、想提建议或洽谈企业版，都可以通过下面的方式找到我们。",wechatGroup:"微信交流群",wechatGroupDesc:"扫码加入 Webterminal 交流群。",qrExpired:'群二维码有效期为 7 天，过期后请添加作者微信，备注"webterminal"拉你进群。',wechat:"作者微信",email:"邮箱",emailDesc:"企业版、商务合作与安全问题",github:"GitHub",issues:"提交问题",issuesDesc:"缺陷报告与功能建议请提交 Issue，附上版本号和复现步骤。",pr:"贡献代码",prDesc:"欢迎提交 Pull Request，改进代码与文档。",security:"安全问题请发邮件私下报告，不要公开提交 Issue。"}},Kn={meta:{title:"Webterminal — Open source bastion host",description:"Browser and native-client access to servers, desktops, databases and Kubernetes, with account-scoped authorization, approvals, password rotation and full audit."},nav:{home:"Home",features:"Features",docs:"Docs",compare:"Compare",editions:"Editions",community:"Community",github:"GitHub",language:"中文"},common:{getStarted:"Get started",readDocs:"Read the docs",viewOnGithub:"View on GitHub",learnMore:"Learn more",contactUs:"Contact us",copy:"Copy",copied:"Copied",notFound:"Page not found",backHome:"Back to home"},hero:{eyebrow:"Secure access · Least privilege · Full audit",title:"One entry point|for every privileged session",subtitle:"Webterminal is a self-hosted, open source bastion host. Reach Linux, Windows, databases and Kubernetes from the browser or the tools you already use, authorize by user × asset × account × protocol × action, and keep every command, query, file and screen on record.",primary:"Get started",secondary:"Read the docs",protocols:["SSH","SFTP","RDP","VNC","Telnet","FTP","MySQL","PostgreSQL","SQL Server","Oracle","Redis","MongoDB","Kubernetes","RemoteApp"]},highlights:[{value:"14",label:"access protocols"},{value:"6",label:"database wire-protocol proxies"},{value:"Web + native",label:"browser or your own clients"},{value:"1 or N nodes",label:"Docker Compose or Helm HA"}],pillars:{title:"From access to audit, one closed loop",subtitle:"More than remote protocols in a browser: identity, authorization, credentials, connectivity and audit on a single path.",items:[{key:"access",title:"Unified access",desc:"Servers, desktops, databases, containers and applications behind one entry point.",points:["In-browser SSH terminals, SFTP file manager, RDP / VNC desktops","Web database client for six major databases","Kubernetes container terminals scoped by namespace and pod labels","RemoteApp publishing: programs open like local windows","Native clients — Xshell, mstsc, Navicat, DBeaver… — straight to the proxy ports, plus Telnet and FTP proxies"]},{key:"authz",title:"Fine-grained authorization",desc:'Grant which account, which protocol and which actions — not just "may connect".',points:["Subject (user / group) × asset or node × managed account × protocol","Per-action control: upload, download, delete, rename, clipboard direction, port forwarding, X11, agent forwarding, sharing","Access policies: source IP, time windows, MFA, forced recording, watermark, session length and concurrency, read-only databases","Access requests with approval tickets and time-boxed grants that expire on their own","Separation of duties: administrator, asset admin, approver, auditor and user roles"]},{key:"accounts",title:"Accounts and credentials",desc:"Passwords held and rotated centrally; operators never need to know them.",points:["Managed accounts encrypted at rest and injected at connect time","Automatic rotation over SSH, WinRM, LDAP / LDAPS, databases and SMB, with RDP as fallback","Rotation updates the Windows services and scheduled tasks that use the account","Revealing a password requires approval; rotation history is kept","Periodic checks of asset reachability and account validity, with alerts"]},{key:"database",title:"Database security",desc:"Native wire-protocol proxies that control SQL itself, not just a screen recording.",points:["MySQL, PostgreSQL, SQL Server, Oracle, Redis and MongoDB wire-protocol proxies","SQL rules — deny, approve, review — stop risky statements before they run","Dynamic masking of phone numbers, IDs, e-mail addresses and more","Read-only mode, row limits and SQL quotas","Change rollback and schema migration, every statement on record"]},{key:"audit",title:"Audit and compliance",desc:"Who did what, when, with which account, on which machine — searchable, replayable, provable.",points:["Recording of text and graphical sessions with in-browser replay","Commands, SQL, file transfers and network access logged and searchable across sessions","Live monitoring, session sharing, administrator takeover and forced disconnect","Hash-chained audit log and sealed recordings: tampering is detectable","Syslog / SIEM forwarding, retention policies, real-time alerts and behaviour analytics"]},{key:"ops",title:"Operations and integration",desc:"Fits the identity system and network you already have; install and upgrade with one command.",points:["Job center: batch commands and file distribution over SSH / WinRM / RDP, on a schedule if needed","Network gateways for isolated segments, one-line install, no inbound ports","LDAP / AD user sync; OIDC / SAML 2.0 / CAS single sign-on","MFA: TOTP, e-mail, WeCom, DingTalk, Feishu, SMS","Alerts via e-mail, webhook, WeCom, DingTalk, Feishu and SMS"]}]},native:{title:"Keep your tools — and the controls",subtitle:"Prefer your own client? Connect it to the bastion's proxy ports: authorization, policies, command filtering, recording and audit apply all the same. With Webterminal Helper, one click in the console opens your local client.",clients:[{proto:"SSH / SFTP",tools:"OpenSSH, Xshell, SecureCRT, Termius, WinSCP, FileZilla"},{proto:"RDP / VNC",tools:"mstsc, Windows App (macOS), FreeRDP, mterminal"},{proto:"Databases",tools:"Navicat, DBeaver, DataGrip, HeidiSQL, TablePlus, command-line clients"}],codeTitle:"Native client examples",helperTitle:"Webterminal Helper",helperDesc:'Registers wterm:// links: "Connect" in the console hands a one-time token to the client you picked. Fills in credentials on Windows and launches RemoteApp programs.'},screens:{title:"Product tour",subtitle:"Screenshots from a demo instance; all data is sample data.",items:[{key:"assets",label:"Assets",desc:"Assets, managed accounts, rotation policies and gateways in one place."},{key:"authorization",label:"Authorization",desc:"Grant by user, asset, account, protocol and action, with an access policy attached."},{key:"audit",label:"Session audit",desc:"Live monitoring, recording replay, and commands / SQL / files / network access searchable one by one."},{key:"database",label:"SQL control",desc:"SQL filters, approvals, masking, quotas and schema migration."},{key:"jobs",label:"Job center",desc:"Run commands and distribute files across many hosts, once or on a schedule."},{key:"workspace",label:"Workspace",desc:"Assets organized in a node tree: double-click to connect in the browser, right-click for a native client."}]},architecture:{title:"Architecture",subtitle:"Every access goes through the bastion: authentication, authorization, protocol proxying and audit on the same path.",users:{title:"Users",items:["Browser","Native clients","Webterminal Helper"]},core:{title:"Webterminal",items:["Console and API","Authentication / SSO / MFA","Authorization and policy engine","Protocol proxies (SSH · RDP · VNC · databases · K8s)","Recording and audit","Jobs, rotation, checks"]},gateway:{title:"Network gateway (optional)",items:["Isolated segments","Dials out, no inbound ports"]},targets:{title:"Assets",items:["Linux / Unix","Windows","Databases","Kubernetes","Network devices"]}},steps:{title:"First connection in three steps",items:[{title:"Deploy",desc:"Install with Docker Compose in one command, then finish the setup wizard in the console."},{title:"Add assets and accounts",desc:"Register hosts, databases or clusters, store their login accounts and test them."},{title:"Grant and audit",desc:"Grant users assets, accounts and actions; sessions are recorded and commands logged automatically."}],codeTitle:"Single-host install"},deploy:{title:"Runs on your infrastructure",subtitle:"Database, recordings and credentials stay inside your network; air-gapped installs are supported.",cards:[{title:"Docker Compose",points:["install.sh does the whole install and generates random secrets","upgrade.sh snapshots data first; restore.sh rolls back","Start on SQLite, run production on MySQL / PostgreSQL"]},{title:"Kubernetes / Helm",points:["Install the Helm chart with one command","Multi-replica HA: session control is relayed between replicas, no sticky sessions","Rolling upgrades guarded by a PodDisruptionBudget"]},{title:"Network gateways",points:["For isolated segments, the gateway dials back to the bastion","One-line install on Linux / Windows, or run it as a container","A gateway offline means refused — never a direct fallback"]}],ports:"Default ports: 8080 console · 2222 SSH/SFTP · 3389 RDP · 13306 / 15432 / 11433 / 11521 MySQL / PostgreSQL / SQL Server / Oracle · 16379 Redis · 37017 MongoDB"},security:{title:"Secure by design",items:[{title:"Credentials stay inside",desc:"Target passwords are encrypted and injected at connect time; native-client tokens are valid for one session only."},{title:"Every action is checked",desc:"Not just at connect: uploads, downloads, clipboard and port forwards are checked each time they happen, and refusals are audited."},{title:"Fail closed",desc:'An unavailable gateway, a mismatched certificate or an unreadable policy means refused — no "degraded" pass-through.'},{title:"Provable audit",desc:"The audit log is hash-chained and recordings are sealed when they end, so tampering can be verified at any time."}]},faq:{title:"FAQ",items:[{q:"How does this relate to the Django Webterminal on GitHub?",a:"This is the next generation of Webterminal: the back end is rewritten in Go and the front end in React, with new protocol proxies, authorization model and audit. The old version stays in the repository history."},{q:"What is the difference between the editions?",a:"The Community Edition is free: access over every common protocol, account-scoped grants, recording and audit, command and SQL filtering, basic rotation and jobs, with up to 3 concurrent graphical sessions, 1 gateway and a single replica. Enterprise adds cluster HA, compliance reports, data masking, SAML / CAS, directory sync, scheduled jobs, RemoteApp, Kubernetes and more, plus support and an SLA. Every installation can try Enterprise free for 15 days. See the Editions page."},{q:"Which databases can hold the bastion's own data?",a:"SQLite for a demo or a small team; MySQL or PostgreSQL for production. Multi-replica HA requires one of the two."},{q:"Can we use native clients only, without the web console?",a:"Yes. SSH, RDP and databases have proxy ports: connect with Xshell, mstsc, Navicat and so on, with the same authorization, policies and audit."},{q:"Can it run in a fully air-gapped network?",a:"Yes. Build the images on a connected machine, export them, and load them on the internal host; nothing at runtime depends on external services."}]},cta:{title:"Get started now",subtitle:"Deployed in minutes, with a full audit trail from the very first session."},footer:{tagline:"Open source bastion host: unified access, least privilege, full audit",product:"Product",resources:"Resources",contact:"Contact",copyright:"Webterminal"},docs:{title:"Docs",search:"Search the docs…",noResult:"Nothing found",onThisPage:"On this page",groups:{start:"Getting started",guide:"Guides",more:"More"},names:{overview:"Overview",install:"Installation",quickstart:"Quick start","user-guide":"User guide","admin-guide":"Administrator guide",faq:"FAQ"},consoleHint:"Console menu",edit:"Edit this page on GitHub"},compare:{title:"Compare",subtitle:"How Webterminal lines up against common open source / community bastion hosts, based on public information.",note:`Compiled from each product's public website (October 2026). "Enterprise" / "Paid" means their site lists the item under a commercial edition; "See their site" means it is not stated publicly — check the vendor's site.`,columns:["Capability","Webterminal Community","JumpServer Community","Next Terminal Free"],groups:[{title:"License",rows:[{k:"Source code",v:["Community Edition open source","Open source (GPL-3.0)","Front end open source; server closed since v2.0"]},{k:"Assets",v:["Unlimited","Up to 5,000","Up to 100"]},{k:"Concurrent graphical sessions (RDP / VNC, web + native)",v:["3 (Enterprise: per license)","See their site","See their site"]},{k:"Enterprise trial",v:["15 days from installation","See their site","See their site"]}]},{title:"Protocols",rows:[{k:"SSH / SFTP / RDP / VNC / Telnet",v:["yes","yes","yes"]},{k:"MySQL / PostgreSQL / Redis / MongoDB",v:["yes","yes","See their site"]},{k:"Oracle / SQL Server",v:["yes","Enterprise","See their site"]},{k:"Kubernetes container terminals",v:["Enterprise","yes","—"]},{k:"RemoteApp publishing",v:["Enterprise","Enterprise","See their site"]},{k:"Web site assets (HTTP proxy)",v:["—","yes","yes"]},{k:"Native clients (ssh, mstsc, Navicat…)",v:["yes","Partial","See their site"]}]},{title:"Authorization and identity",rows:[{k:"Grants by managed account × protocol × action",v:["yes","yes","See their site"]},{k:"Access requests and approval tickets",v:["yes","Enterprise","See their site"]},{k:"LDAP / AD sign-in, OIDC single sign-on",v:["yes","Enterprise","Paid"]},{k:"SAML / CAS single sign-on, directory user sync",v:["Enterprise","Enterprise","Paid"]},{k:"TOTP multi-factor authentication",v:["yes","yes","yes"]},{k:"Multi-tenancy / organizations",v:["—","Enterprise","See their site"]}]},{title:"Accounts and databases",rows:[{k:"Password rotation (SSH, WinRM, database accounts)",v:["yes","Enterprise","See their site"]},{k:"Advanced rotation (network devices, LDAP, SMB, dependent services)",v:["Enterprise","Enterprise","See their site"]},{k:"SQL blocking and approval",v:["yes","See their site","See their site"]},{k:"Dynamic masking, SQL quotas, SQL rollback, schema migration",v:["Enterprise","See their site","See their site"]}]},{title:"Audit and operations",rows:[{k:"Recording replay, command log",v:["yes","yes","yes"]},{k:"Live monitoring, session sharing and takeover",v:["yes","yes","See their site"]},{k:"Tamper evidence (hash chain, sealed recordings)",v:["yes","See their site","See their site"]},{k:"Batch jobs (SSH channel)",v:["yes","yes","See their site"]},{k:"Scheduled jobs, jobs over RDP / WinRM",v:["Enterprise","See their site","See their site"]},{k:"Network gateways (isolated segments)",v:["1 (Enterprise: unlimited)","yes","Paid"]},{k:"Multi-replica high availability",v:["Enterprise","Enterprise","See their site"]},{k:"Compliance reports, behavior analytics, recording text search, log forwarding",v:["Enterprise","See their site","See their site"]}]}],legendYes:"Supported"},editions:{title:"Editions",subtitle:"The Community Edition is free and covers access, authorization and audit; Enterprise adds scale, compliance, advanced database control and automation, with commercial assurance. Try Enterprise free for 15 days after installing.",recommended:"Recommended",contact:"Talk to us",download:"Deploy for free"},community:{title:"Community and contact",subtitle:"Questions, ideas or an enterprise inquiry — here is how to reach us.",wechatGroup:"WeChat group",wechatGroupDesc:"Scan to join the Webterminal WeChat group.",qrExpired:'Group QR codes are valid for 7 days. If it has expired, add the author on WeChat with the note "webterminal" to be invited.',wechat:"Author on WeChat",email:"E-mail",emailDesc:"Enterprise edition, partnerships and security reports",github:"GitHub",issues:"Report an issue",issuesDesc:"File bugs and feature requests as issues, with the version and steps to reproduce.",pr:"Contribute",prDesc:"Pull requests improving the code or the docs are welcome.",security:"Please report security problems privately by e-mail, not in a public issue."}},pt="wt-site-lang",mt={zh:Gn,en:Kn};function Wa(){var a;const n=new URLSearchParams(window.location.search).get("lang");if(n==="zh"||n==="en")return localStorage.setItem(pt,n),n;const e=localStorage.getItem(pt);return e==="zh"||e==="en"?e:(((a=navigator.languages)==null?void 0:a[0])||navigator.language||"").toLowerCase().startsWith("zh")?"zh":"en"}const Yn=n=>{var e;document.documentElement.lang=n==="zh"?"zh-CN":"en",document.title=mt[n].meta.title,(e=document.querySelector('meta[name="description"]'))==null||e.setAttribute("content",mt[n].meta.description)};O.use(Na).init({resources:{zh:{translation:Gn},en:{translation:Kn}},lng:Wa(),fallbackLng:"en",interpolation:{escapeValue:!1}});Yn(O.language);O.on("languageChanged",n=>Yn(n));function za(n){localStorage.setItem(pt,n),O.changeLanguage(n)}function V(){const{i18n:n}=Fa(),e=n.language==="zh"?"zh":"en";return{c:mt[e],lang:e}}var ue={},tt={exports:{}},en;function Z(){return en||(en=1,(function(n){function e(t){return t&&t.__esModule?t:{default:t}}n.exports=e,n.exports.__esModule=!0,n.exports.default=n.exports})(tt)),tt.exports}var pe={},tn;function qa(){if(tn)return pe;tn=1,Object.defineProperty(pe,"__esModule",{value:!0}),pe.default=void 0;var n={items_per_page:"条/页",jump_to:"跳至",jump_to_confirm:"确定",page:"页",prev_page:"上一页",next_page:"下一页",prev_5:"向前 5 页",next_5:"向后 5 页",prev_3:"向前 3 页",next_3:"向后 3 页",page_size:"页码"};return pe.default=n,pe}var me={},ge={},fe={},nt={exports:{}},st={exports:{}},at={exports:{}},rt={exports:{}},nn;function Zn(){return nn||(nn=1,(function(n){function e(t){"@babel/helpers - typeof";return n.exports=e=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},n.exports.__esModule=!0,n.exports.default=n.exports,e(t)}n.exports=e,n.exports.__esModule=!0,n.exports.default=n.exports})(rt)),rt.exports}var it={exports:{}},sn;function Qa(){return sn||(sn=1,(function(n){var e=Zn().default;function t(a,s){if(e(a)!="object"||!a)return a;var r;if(typeof Symbol<"u"&&(r=a[Symbol.toPrimitive])!==void 0){var i=r.call(a,s||"default");if(e(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(s==="string"?String:Number)(a)}n.exports=t,n.exports.__esModule=!0,n.exports.default=n.exports})(it)),it.exports}var an;function Ba(){return an||(an=1,(function(n){var e=Zn().default,t=Qa();function a(s){var r=t(s,"string");return e(r)=="symbol"?r:r+""}n.exports=a,n.exports.__esModule=!0,n.exports.default=n.exports})(at)),at.exports}var rn;function Ua(){return rn||(rn=1,(function(n){var e=Ba();function t(a,s,r){return(s=e(s))in a?Object.defineProperty(a,s,{value:r,enumerable:!0,configurable:!0,writable:!0}):a[s]=r,a}n.exports=t,n.exports.__esModule=!0,n.exports.default=n.exports})(st)),st.exports}var on;function Xn(){return on||(on=1,(function(n){var e=Ua();function t(s,r){var i=Object.keys(s);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(s);r&&(l=l.filter(function(c){return Object.getOwnPropertyDescriptor(s,c).enumerable})),i.push.apply(i,l)}return i}function a(s){for(var r=1;r<arguments.length;r++){var i=arguments[r]!=null?arguments[r]:{};r%2?t(Object(i),!0).forEach(function(l){e(s,l,i[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach(function(l){Object.defineProperty(s,l,Object.getOwnPropertyDescriptor(i,l))})}return s}n.exports=a,n.exports.__esModule=!0,n.exports.default=n.exports})(nt)),nt.exports}var be={},ln;function Jn(){return ln||(ln=1,Object.defineProperty(be,"__esModule",{value:!0}),be.commonLocale=void 0,be.commonLocale={yearFormat:"YYYY",dayFormat:"D",cellMeridiemFormat:"A",monthBeforeYear:!0}),be}var cn;function Va(){if(cn)return fe;cn=1;var n=Z().default;Object.defineProperty(fe,"__esModule",{value:!0}),fe.default=void 0;var e=n(Xn()),t=Jn(),a=(0,e.default)((0,e.default)({},t.commonLocale),{},{locale:"zh_CN",today:"今天",now:"此刻",backToToday:"返回今天",ok:"确定",timeSelect:"选择时间",dateSelect:"选择日期",weekSelect:"选择周",clear:"清除",week:"周",month:"月",year:"年",previousMonth:"上个月 (翻页上键)",nextMonth:"下个月 (翻页下键)",monthSelect:"选择月份",yearSelect:"选择年份",decadeSelect:"选择年代",previousYear:"上一年 (Control键加左方向键)",nextYear:"下一年 (Control键加右方向键)",previousDecade:"上一年代",nextDecade:"下一年代",previousCentury:"上一世纪",nextCentury:"下一世纪",yearFormat:"YYYY年",cellDateFormat:"D",monthBeforeYear:!1});return fe.default=a,fe}var ye={},dn;function es(){if(dn)return ye;dn=1,Object.defineProperty(ye,"__esModule",{value:!0}),ye.default=void 0;const n={placeholder:"请选择时间",rangePlaceholder:["开始时间","结束时间"]};return ye.default=n,ye}var hn;function ts(){if(hn)return ge;hn=1;var n=Z().default;Object.defineProperty(ge,"__esModule",{value:!0}),ge.default=void 0;var e=n(Va()),t=n(es());const a={lang:Object.assign({placeholder:"请选择日期",yearPlaceholder:"请选择年份",quarterPlaceholder:"请选择季度",monthPlaceholder:"请选择月份",weekPlaceholder:"请选择周",rangePlaceholder:["开始日期","结束日期"],rangeYearPlaceholder:["开始年份","结束年份"],rangeMonthPlaceholder:["开始月份","结束月份"],rangeQuarterPlaceholder:["开始季度","结束季度"],rangeWeekPlaceholder:["开始周","结束周"]},e.default),timePickerLocale:Object.assign({},t.default)};return a.lang.ok="确定",ge.default=a,ge}var un;function Ga(){if(un)return me;un=1;var n=Z().default;Object.defineProperty(me,"__esModule",{value:!0}),me.default=void 0;var e=n(ts());return me.default=e.default,me}var pn;function Ka(){if(pn)return ue;pn=1;var n=Z().default;Object.defineProperty(ue,"__esModule",{value:!0}),ue.default=void 0;var e=n(qa()),t=n(Ga()),a=n(ts()),s=n(es());const r="${label}不是一个有效的${type}",i={locale:"zh-cn",Pagination:e.default,DatePicker:a.default,TimePicker:s.default,Calendar:t.default,global:{placeholder:"请选择",close:"关闭"},Table:{filterTitle:"筛选",filterConfirm:"确定",filterReset:"重置",filterEmptyText:"无筛选项",filterCheckAll:"全选",filterSearchPlaceholder:"在筛选项中搜索",emptyText:"暂无数据",selectAll:"全选当页",selectInvert:"反选当页",selectNone:"清空所有",selectionAll:"全选所有",sortTitle:"排序",expand:"展开行",collapse:"关闭行",triggerDesc:"点击降序",triggerAsc:"点击升序",cancelSort:"取消排序"},Modal:{okText:"确定",cancelText:"取消",justOkText:"知道了"},Tour:{Next:"下一步",Previous:"上一步",Finish:"结束导览"},Popconfirm:{cancelText:"取消",okText:"确定"},Transfer:{titles:["",""],searchPlaceholder:"请输入搜索内容",itemUnit:"项",itemsUnit:"项",remove:"删除",selectCurrent:"全选当页",removeCurrent:"删除当页",selectAll:"全选所有",deselectAll:"取消全选",removeAll:"删除全部",selectInvert:"反选当页"},Upload:{uploading:"文件上传中",removeFile:"删除文件",uploadError:"上传错误",previewFile:"预览文件",downloadFile:"下载文件"},Empty:{description:"暂无数据"},Icon:{icon:"图标"},Text:{edit:"编辑",copy:"复制",copied:"复制成功",expand:"展开",collapse:"收起"},Form:{optional:"（可选）",defaultValidateMessages:{default:"字段验证错误${label}",required:"请输入${label}",enum:"${label}必须是其中一个[${enum}]",whitespace:"${label}不能为空字符",date:{format:"${label}日期格式无效",parse:"${label}不能转换为日期",invalid:"${label}是一个无效日期"},types:{string:r,method:r,array:r,object:r,number:r,date:r,boolean:r,integer:r,float:r,regexp:r,email:r,url:r,hex:r},string:{len:"${label}须为${len}个字符",min:"${label}最少${min}个字符",max:"${label}最多${max}个字符",range:"${label}须在${min}-${max}字符之间"},number:{len:"${label}必须等于${len}",min:"${label}最小值为${min}",max:"${label}最大值为${max}",range:"${label}须在${min}-${max}之间"},array:{len:"须为${len}个${label}",min:"最少${min}个${label}",max:"最多${max}个${label}",range:"${label}数量须在${min}-${max}之间"},pattern:{mismatch:"${label}与模式不匹配${pattern}"}}},Image:{preview:"预览"},QRCode:{expired:"二维码过期",refresh:"点击刷新",scanned:"已扫描"},ColorPicker:{presetEmpty:"暂无",transparent:"无色",singleColor:"单色",gradientColor:"渐变色"}};return ue.default=i,ue}var ot,mn;function Ya(){return mn||(mn=1,ot=Ka()),ot}var Za=Ya();const Xa=wt(Za);var we={},Se={},gn;function Ja(){if(gn)return Se;gn=1,Object.defineProperty(Se,"__esModule",{value:!0}),Se.default=void 0;var n={items_per_page:"/ page",jump_to:"Go to",jump_to_confirm:"confirm",page:"Page",prev_page:"Previous Page",next_page:"Next Page",prev_5:"Previous 5 Pages",next_5:"Next 5 Pages",prev_3:"Previous 3 Pages",next_3:"Next 3 Pages",page_size:"Page Size"};return Se.default=n,Se}var ve={},ke={},xe={},fn;function er(){if(fn)return xe;fn=1;var n=Z().default;Object.defineProperty(xe,"__esModule",{value:!0}),xe.default=void 0;var e=n(Xn()),t=Jn(),a=(0,e.default)((0,e.default)({},t.commonLocale),{},{locale:"en_US",today:"Today",now:"Now",backToToday:"Back to today",ok:"OK",clear:"Clear",week:"Week",month:"Month",year:"Year",timeSelect:"select time",dateSelect:"select date",weekSelect:"Choose a week",monthSelect:"Choose a month",yearSelect:"Choose a year",decadeSelect:"Choose a decade",dateFormat:"M/D/YYYY",dateTimeFormat:"M/D/YYYY HH:mm:ss",previousMonth:"Previous month (PageUp)",nextMonth:"Next month (PageDown)",previousYear:"Last year (Control + left)",nextYear:"Next year (Control + right)",previousDecade:"Last decade",nextDecade:"Next decade",previousCentury:"Last century",nextCentury:"Next century"});return xe.default=a,xe}var Pe={},bn;function ns(){if(bn)return Pe;bn=1,Object.defineProperty(Pe,"__esModule",{value:!0}),Pe.default=void 0;const n={placeholder:"Select time",rangePlaceholder:["Start time","End time"]};return Pe.default=n,Pe}var yn;function ss(){if(yn)return ke;yn=1;var n=Z().default;Object.defineProperty(ke,"__esModule",{value:!0}),ke.default=void 0;var e=n(er()),t=n(ns());const a={lang:Object.assign({placeholder:"Select date",yearPlaceholder:"Select year",quarterPlaceholder:"Select quarter",monthPlaceholder:"Select month",weekPlaceholder:"Select week",rangePlaceholder:["Start date","End date"],rangeYearPlaceholder:["Start year","End year"],rangeQuarterPlaceholder:["Start quarter","End quarter"],rangeMonthPlaceholder:["Start month","End month"],rangeWeekPlaceholder:["Start week","End week"]},e.default),timePickerLocale:Object.assign({},t.default)};return ke.default=a,ke}var wn;function tr(){if(wn)return ve;wn=1;var n=Z().default;Object.defineProperty(ve,"__esModule",{value:!0}),ve.default=void 0;var e=n(ss());return ve.default=e.default,ve}var Sn;function nr(){if(Sn)return we;Sn=1;var n=Z().default;Object.defineProperty(we,"__esModule",{value:!0}),we.default=void 0;var e=n(Ja()),t=n(tr()),a=n(ss()),s=n(ns());const r="${label} is not a valid ${type}",i={locale:"en",Pagination:e.default,DatePicker:a.default,TimePicker:s.default,Calendar:t.default,global:{placeholder:"Please select",close:"Close"},Table:{filterTitle:"Filter menu",filterConfirm:"OK",filterReset:"Reset",filterEmptyText:"No filters",filterCheckAll:"Select all items",filterSearchPlaceholder:"Search in filters",emptyText:"No data",selectAll:"Select current page",selectInvert:"Invert current page",selectNone:"Clear all data",selectionAll:"Select all data",sortTitle:"Sort",expand:"Expand row",collapse:"Collapse row",triggerDesc:"Click to sort descending",triggerAsc:"Click to sort ascending",cancelSort:"Click to cancel sorting"},Tour:{Next:"Next",Previous:"Previous",Finish:"Finish"},Modal:{okText:"OK",cancelText:"Cancel",justOkText:"OK"},Popconfirm:{okText:"OK",cancelText:"Cancel"},Transfer:{titles:["",""],searchPlaceholder:"Search here",itemUnit:"item",itemsUnit:"items",remove:"Remove",selectCurrent:"Select current page",removeCurrent:"Remove current page",selectAll:"Select all data",deselectAll:"Deselect all data",removeAll:"Remove all data",selectInvert:"Invert current page"},Upload:{uploading:"Uploading...",removeFile:"Remove file",uploadError:"Upload error",previewFile:"Preview file",downloadFile:"Download file"},Empty:{description:"No data"},Icon:{icon:"icon"},Text:{edit:"Edit",copy:"Copy",copied:"Copied",expand:"Expand",collapse:"Collapse"},Form:{optional:"(optional)",defaultValidateMessages:{default:"Field validation error for ${label}",required:"Please enter ${label}",enum:"${label} must be one of [${enum}]",whitespace:"${label} cannot be a blank character",date:{format:"${label} date format is invalid",parse:"${label} cannot be converted to a date",invalid:"${label} is an invalid date"},types:{string:r,method:r,array:r,object:r,number:r,date:r,boolean:r,integer:r,float:r,regexp:r,email:r,url:r,hex:r},string:{len:"${label} must be ${len} characters",min:"${label} must be at least ${min} characters",max:"${label} must be up to ${max} characters",range:"${label} must be between ${min}-${max} characters"},number:{len:"${label} must be equal to ${len}",min:"${label} must be minimum ${min}",max:"${label} must be maximum ${max}",range:"${label} must be between ${min}-${max}"},array:{len:"Must be ${len} ${label}",min:"At least ${min} ${label}",max:"At most ${max} ${label}",range:"The amount of ${label} must be between ${min}-${max}"},pattern:{mismatch:"${label} does not match the pattern ${pattern}"}}},Image:{preview:"Preview"},QRCode:{expired:"QR code expired",refresh:"Refresh",scanned:"Scanned"},ColorPicker:{presetEmpty:"Empty",transparent:"Transparent",singleColor:"Single",gradientColor:"Gradient"}};return we.default=i,we}var lt,vn;function sr(){return vn||(vn=1,lt=nr()),lt}var ar=sr();const rr=wt(ar),$={github:"https://github.com/jimmy201602/webterminal",issues:"https://github.com/jimmy201602/webterminal/issues",docsSource:"",email:"zhengge2012@gmail.com",wechat:"313484953",wechatGroupQr:"images/wechat-group.png"},ir="/webterminal/";function or(){const{c:n,lang:e}=V(),{pathname:t}=Hn(),[a,s]=R.useState(!1),[r,i]=R.useState(!1),l=t==="/"&&!r;R.useEffect(()=>{const u=()=>i(window.scrollY>24);return u(),window.addEventListener("scroll",u,{passive:!0}),()=>window.removeEventListener("scroll",u)},[]),R.useEffect(()=>s(!1),[t]);const c=[{to:"/",label:n.nav.home,end:!0},{to:"/docs/overview",label:n.nav.docs,match:"/docs"},{to:"/compare",label:n.nav.compare},{to:"/editions",label:n.nav.editions},{to:"/community",label:n.nav.community}],h=u=>c.map(p=>o.jsx(ws,{to:p.to,end:p.end,className:({isActive:g})=>`${u}${g||p.match&&t.startsWith(p.match)?" active":""}`,children:p.label},p.to)),d=o.jsx(F,{type:"text",className:"lang-btn",icon:o.jsx(Ps,{}),"data-testid":"lang-switch",onClick:()=>za(e==="zh"?"en":"zh"),children:n.nav.language});return o.jsxs("header",{className:`site-header${l?" dark":""}`,children:[o.jsxs("div",{className:"container header-inner",children:[o.jsxs(j,{to:"/",className:"brand",children:[o.jsx("img",{src:`${ir}logo.png`,alt:"",width:30,height:30}),o.jsx("span",{children:"Webterminal"})]}),o.jsx("nav",{className:"header-nav",children:h("nav-link")}),o.jsxs("div",{className:"header-actions",children:[d,o.jsx(F,{type:"text",className:"gh-btn",icon:o.jsx(Me,{}),href:$.github,target:"_blank",rel:"noopener noreferrer",children:n.nav.github}),o.jsx(F,{className:"menu-btn",type:"text",icon:o.jsx(Rs,{}),"aria-label":"menu",onClick:()=>s(!0)})]})]}),o.jsx(As,{open:a,onClose:()=>s(!1),width:260,title:"Webterminal",children:o.jsx("div",{className:"drawer-nav",children:h("drawer-link")})})]})}const lr="/webterminal/";function cr(){const{c:n}=V();return o.jsxs("footer",{className:"site-footer",children:[o.jsxs("div",{className:"container footer-grid",children:[o.jsxs("div",{children:[o.jsxs("div",{className:"brand footer-brand",children:[o.jsx("img",{src:`${lr}logo.png`,alt:"",width:28,height:28}),o.jsx("span",{children:"Webterminal"})]}),o.jsx("p",{className:"footer-tagline",children:n.footer.tagline})]}),o.jsxs("div",{children:[o.jsx("h4",{children:n.footer.product}),o.jsx(j,{to:"/",children:n.nav.home}),o.jsx(j,{to:"/compare",children:n.nav.compare}),o.jsx(j,{to:"/editions",children:n.nav.editions})]}),o.jsxs("div",{children:[o.jsx("h4",{children:n.footer.resources}),o.jsx(j,{to:"/docs/install",children:n.docs.names.install}),o.jsx(j,{to:"/docs/quickstart",children:n.docs.names.quickstart}),o.jsx(j,{to:"/docs/admin-guide",children:n.docs.names["admin-guide"]}),o.jsx("a",{href:$.github,target:"_blank",rel:"noopener noreferrer",children:"GitHub"})]}),o.jsxs("div",{children:[o.jsx("h4",{children:n.footer.contact}),o.jsx(j,{to:"/community",children:n.nav.community}),o.jsx("a",{href:`mailto:${$.email}`,children:$.email}),o.jsxs("span",{children:[n.community.wechat,": ",$.wechat]})]})]}),o.jsxs("div",{className:"container footer-bottom",children:["© ",new Date().getFullYear()," ",n.footer.copyright]})]})}function kn({code:n,title:e}){const{c:t}=V(),[a,s]=R.useState(!1),r=()=>{var i;(i=navigator.clipboard)==null||i.writeText(n.split(`
`).filter(l=>!l.trim().startsWith("#")).join(`
`)),s(!0),setTimeout(()=>s(!1),1500)};return o.jsxs("div",{className:"code-block",children:[o.jsxs("div",{className:"code-head",children:[o.jsxs("span",{className:"dots",children:[o.jsx("i",{}),o.jsx("i",{}),o.jsx("i",{})]}),o.jsx("span",{className:"code-title",children:e}),o.jsxs("button",{type:"button",onClick:r,"aria-label":t.common.copy,children:[a?o.jsx(Cs,{}):o.jsx(Ls,{})," ",a?t.common.copied:t.common.copy]})]}),o.jsx("pre",{children:n.split(`
`).map((i,l)=>o.jsx("div",{className:i.trim().startsWith("#")?"cm":void 0,children:i||" "},l))})]})}const xn="/webterminal/",dr={access:o.jsx($s,{}),authz:o.jsx(Wn,{}),accounts:o.jsx(Es,{}),database:o.jsx(Os,{}),audit:o.jsx(Fn,{}),ops:o.jsx(js,{})},hr=[o.jsx(Is,{},"l"),o.jsx(Wn,{},"s"),o.jsx(Hs,{},"x"),o.jsx(Fn,{},"a")],ur=n=>`git clone ${$.github}.git
cd webterminal/deploy/docker-compose
./install.sh
# ${n?"浏览器打开 http://<主机>:8080，完成初始化向导":"open http://<host>:8080 and finish the setup wizard"}`,pr=n=>`# ${n?"SSH：堡垒机用户 alice 登录资产 web01":"SSH: bastion user alice to asset web01"}
ssh -p 2222 alice@web01@bastion.example.com
# ${n?"SFTP：指定托管账号 root":"SFTP with the managed account root"}
sftp -P 2222 alice/root@web01@bastion.example.com
# ${n?"MySQL / PostgreSQL：用户名为 堡垒机用户/资产ID":"MySQL / PostgreSQL: user is bastion-user/asset-id"}
mysql -h bastion.example.com -P 13306 -u alice/12 -p
psql -h bastion.example.com -p 15432 -U alice/13 postgres
# ${n?"RDP：mstsc 连接 bastion.example.com:3389，用户名 alice@win01":"RDP: mstsc to bastion.example.com:3389 as alice@win01"}`;function mr({zh:n}){return o.jsxs("div",{className:"hero-terminal","aria-hidden":!0,children:[o.jsxs("div",{className:"code-head",children:[o.jsxs("span",{className:"dots",children:[o.jsx("i",{}),o.jsx("i",{}),o.jsx("i",{})]}),o.jsx("span",{className:"code-title",children:"alice@workstation"})]}),o.jsxs("div",{className:"term-body",children:[o.jsxs("div",{children:[o.jsx("span",{className:"p",children:"$"})," ssh -p 2222 alice@web-frontend-01@bastion.example.com"]}),o.jsx("div",{className:"info",children:n?"Webterminal · 账号 root · 本会话全程录像":"Webterminal · account root · this session is recorded"}),o.jsxs("div",{children:[o.jsx("span",{className:"p",children:"root@web-frontend-01:~#"})," systemctl reload nginx"]}),o.jsxs("div",{children:[o.jsx("span",{className:"p",children:"root@web-frontend-01:~#"})," rm -rf /var/lib/mysql"]}),o.jsx("div",{className:"deny",children:n?"✖ 命令被拦截：匹配规则 [^rm\\s+-rf]，已写入审计":"✖ Command blocked: matched rule [^rm\\s+-rf], audited"}),o.jsxs("div",{children:[o.jsx("span",{className:"p",children:"root@web-frontend-01:~#"})," ",o.jsx("span",{className:"cursor"})]})]})]})}function gr(){const{c:n,lang:e}=V(),t=e==="zh",[a,s]=R.useState(n.screens.items[0].key),r=n.screens.items.find(i=>i.key===a)||n.screens.items[0];return o.jsxs("div",{className:"home",children:[o.jsxs("section",{className:"hero",children:[o.jsx("div",{className:"hero-glow"}),o.jsxs("div",{className:"container hero-inner",children:[o.jsxs("div",{className:"hero-copy",children:[o.jsx("div",{className:"eyebrow",children:n.hero.eyebrow}),o.jsx("h1",{children:n.hero.title.split("|").map((i,l)=>o.jsx("span",{className:"line",children:i},l))}),o.jsx("p",{className:"hero-sub",children:n.hero.subtitle}),o.jsxs("div",{className:"hero-actions",children:[o.jsx(j,{to:"/docs/install",children:o.jsx(F,{type:"primary",size:"large",icon:o.jsx(Nt,{}),children:n.hero.primary})}),o.jsx(j,{to:"/docs/overview",children:o.jsx(F,{size:"large",ghost:!0,children:n.hero.secondary})}),o.jsx(F,{size:"large",type:"text",className:"hero-gh",icon:o.jsx(Me,{}),href:$.github,target:"_blank",rel:"noopener noreferrer",children:"GitHub"})]}),o.jsx("div",{className:"protocols",children:n.hero.protocols.map(i=>o.jsx("span",{className:"chip",children:i},i))})]}),o.jsx(mr,{zh:t})]}),o.jsx("div",{className:"container highlights",children:n.highlights.map(i=>o.jsxs("div",{className:"highlight",children:[o.jsx("div",{className:"hv",children:i.value}),o.jsx("div",{className:"hl",children:i.label})]},i.label))})]}),o.jsx("section",{className:"section",id:"features",children:o.jsxs("div",{className:"container",children:[o.jsxs("div",{className:"section-head",children:[o.jsx("h2",{children:n.pillars.title}),o.jsx("p",{children:n.pillars.subtitle})]}),o.jsx("div",{className:"pillar-grid",children:n.pillars.items.map(i=>o.jsxs("div",{className:"pillar",children:[o.jsx("div",{className:"pillar-icon",children:dr[i.key]}),o.jsx("h3",{children:i.title}),o.jsx("p",{className:"pillar-desc",children:i.desc}),o.jsx("ul",{children:i.points.map(l=>o.jsxs("li",{children:[o.jsx(Fe,{}),l]},l))})]},i.key))})]})}),o.jsx("section",{className:"section section-alt",id:"tour",children:o.jsxs("div",{className:"container",children:[o.jsxs("div",{className:"section-head",children:[o.jsx("h2",{children:n.screens.title}),o.jsx("p",{children:n.screens.subtitle})]}),o.jsx("div",{className:"screen-tabs",children:o.jsx(Ts,{value:a,onChange:i=>s(i),options:n.screens.items.map(i=>({value:i.key,label:i.label}))})}),o.jsx("p",{className:"screen-desc",children:r.desc}),o.jsxs("div",{className:"browser-frame",children:[o.jsxs("div",{className:"code-head light",children:[o.jsxs("span",{className:"dots",children:[o.jsx("i",{}),o.jsx("i",{}),o.jsx("i",{})]}),o.jsx("span",{className:"url",children:"bastion.example.com"})]}),o.jsx("img",{src:`${xn}images/screens/${e}/${r.key}.png`,alt:r.label,"data-testid":"screen-img"})]})]})}),o.jsx("section",{className:"section",children:o.jsxs("div",{className:"container two-col",children:[o.jsxs("div",{children:[o.jsx("h2",{children:n.native.title}),o.jsx("p",{className:"lead",children:n.native.subtitle}),o.jsx("div",{className:"client-list",children:n.native.clients.map(i=>o.jsxs("div",{className:"client-row",children:[o.jsx("span",{className:"client-proto",children:i.proto}),o.jsx("span",{children:i.tools})]},i.proto))}),o.jsxs("div",{className:"helper-card",children:[o.jsx(Ds,{}),o.jsxs("div",{children:[o.jsx("b",{children:n.native.helperTitle}),o.jsx("p",{children:n.native.helperDesc})]})]})]}),o.jsx(kn,{title:n.native.codeTitle,code:pr(t)})]})}),o.jsx("section",{className:"section section-dark",children:o.jsxs("div",{className:"container",children:[o.jsxs("div",{className:"section-head",children:[o.jsx("h2",{children:n.architecture.title}),o.jsx("p",{children:n.architecture.subtitle})]}),o.jsxs("div",{className:"arch",children:[o.jsxs("div",{className:"arch-col",children:[o.jsx("div",{className:"arch-title",children:n.architecture.users.title}),n.architecture.users.items.map(i=>o.jsx("div",{className:"arch-box",children:i},i))]}),o.jsx("div",{className:"arch-arrow",children:"→"}),o.jsxs("div",{className:"arch-col arch-core",children:[o.jsxs("div",{className:"arch-title",children:[o.jsx("img",{src:`${xn}logo.png`,alt:"",width:22,height:22}),n.architecture.core.title]}),o.jsx("div",{className:"arch-core-grid",children:n.architecture.core.items.map(i=>o.jsx("div",{className:"arch-box",children:i},i))})]}),o.jsx("div",{className:"arch-arrow",children:"→"}),o.jsxs("div",{className:"arch-col",children:[o.jsx("div",{className:"arch-title",children:n.architecture.gateway.title}),n.architecture.gateway.items.map(i=>o.jsx("div",{className:"arch-box dashed",children:i},i))]}),o.jsx("div",{className:"arch-arrow",children:"→"}),o.jsxs("div",{className:"arch-col",children:[o.jsx("div",{className:"arch-title",children:n.architecture.targets.title}),n.architecture.targets.items.map(i=>o.jsx("div",{className:"arch-box",children:i},i))]})]})]})}),o.jsx("section",{className:"section",children:o.jsxs("div",{className:"container two-col",children:[o.jsxs("div",{children:[o.jsx("h2",{children:n.steps.title}),o.jsx("ol",{className:"steps",children:n.steps.items.map((i,l)=>o.jsxs("li",{children:[o.jsx("span",{className:"step-no",children:l+1}),o.jsxs("div",{children:[o.jsx("b",{children:i.title}),o.jsx("p",{children:i.desc})]})]},i.title))}),o.jsx(j,{to:"/docs/install",children:o.jsx(F,{type:"primary",children:n.common.readDocs})})]}),o.jsx(kn,{title:n.steps.codeTitle,code:ur(t)})]})}),o.jsx("section",{className:"section section-alt",children:o.jsxs("div",{className:"container",children:[o.jsxs("div",{className:"section-head",children:[o.jsx("h2",{children:n.deploy.title}),o.jsx("p",{children:n.deploy.subtitle})]}),o.jsx("div",{className:"card-grid three",children:n.deploy.cards.map(i=>o.jsxs("div",{className:"plain-card",children:[o.jsx("h3",{children:i.title}),o.jsx("ul",{children:i.points.map(l=>o.jsxs("li",{children:[o.jsx(Fe,{}),l]},l))})]},i.title))}),o.jsx("p",{className:"ports",children:n.deploy.ports})]})}),o.jsx("section",{className:"section",children:o.jsxs("div",{className:"container",children:[o.jsx("div",{className:"section-head",children:o.jsx("h2",{children:n.security.title})}),o.jsx("div",{className:"card-grid four",children:n.security.items.map((i,l)=>o.jsxs("div",{className:"sec-card",children:[o.jsx("div",{className:"sec-icon",children:hr[l]}),o.jsx("h3",{children:i.title}),o.jsx("p",{children:i.desc})]},i.title))})]})}),o.jsx("section",{className:"section section-alt",children:o.jsxs("div",{className:"container narrow",children:[o.jsx("div",{className:"section-head",children:o.jsx("h2",{children:n.faq.title})}),o.jsx(Ns,{accordion:!0,size:"large",items:n.faq.items.map((i,l)=>({key:l,label:i.q,children:o.jsx("p",{children:i.a})})),defaultActiveKey:[0]})]})}),o.jsx("section",{className:"cta",children:o.jsxs("div",{className:"container",children:[o.jsx("h2",{children:n.cta.title}),o.jsx("p",{children:n.cta.subtitle}),o.jsxs("div",{className:"hero-actions center",children:[o.jsx(j,{to:"/docs/install",children:o.jsx(F,{type:"primary",size:"large",icon:o.jsx(Nt,{}),children:n.common.getStarted})}),o.jsx(j,{to:"/community",children:o.jsx(F,{size:"large",ghost:!0,children:n.common.contactUs})})]})]})})]})}function St(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var re=St();function as(n){re=n}var ne={exec:()=>null};function oe(n){let e=[];return t=>{let a=Math.max(0,Math.min(3,t-1)),s=e[a];return s||(s=n(a),e[a]=s),s}}function y(n,e=""){let t=typeof n=="string"?n:n.source,a={replace:(s,r)=>{let i=typeof r=="string"?r:r.source;return i=i.replace(H.caret,"$1"),t=t.replace(s,i),a},getRegex:()=>new RegExp(t,e)};return a}var fr=((n="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+n)}catch{return!1}})(),H={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:oe(n=>new RegExp(`^ {0,${n}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:oe(n=>new RegExp(`^ {0,${n}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),fencesBeginRegex:oe(n=>new RegExp(`^ {0,${n}}(?:\`\`\`|~~~)`)),headingBeginRegex:oe(n=>new RegExp(`^ {0,${n}}#`)),htmlBeginRegex:oe(n=>new RegExp(`^ {0,${n}}(?:</?(?:${Ne})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`,"i")),blockquoteBeginRegex:oe(n=>new RegExp(`^ {0,${n}}>`))},br=/^(?:[ \t]*(?:\n|$))+/,yr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,wr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,De=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Sr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vt=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,rs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,is=y(rs).replace(/bull/g,vt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),vr=y(rs).replace(/bull/g,vt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),kt=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,kr=/^[^\n]+/,xt=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,xr=y(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",xt).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pr=y(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,vt).getRegex(),Ne="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Pt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Rr=y("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Pt).replace("tag",Ne).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),os=n=>y(kt).replace("hr",De).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list",n).replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Ar=os(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Cr=os(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),Lr=y(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Cr).getRegex(),Rt={blockquote:Lr,code:yr,def:xr,fences:wr,heading:Sr,hr:De,html:Rr,lheading:is,list:Pr,newline:br,paragraph:Ar,table:ne,text:kr},Pn=y("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",De).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex(),Tr={...Rt,lheading:vr,table:Pn,paragraph:y(kt).replace("hr",De).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Pn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ne).getRegex()},Dr={...Rt,html:y(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Pt).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ne,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:y(kt).replace("hr",De).replace("heading",` *#{1,6} *[^
]`).replace("lheading",is).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Nr=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,jr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ls=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,Or=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,K=/[\p{P}\p{S}]/u,le=/[\s\p{P}\p{S}]/u,je=/[^\s\p{P}\p{S}]/u,Er=y(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,le).getRegex(),$r=/[\p{Pi}\p{Ps}"']/u,cs=/(?!~)[\p{P}\p{S}]/u,Ir=/(?!~)[\s\p{P}\p{S}]/u,Hr=/(?:[^\s\p{P}\p{S}]|~)/u,_r=y(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",fr?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ds=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Mr=y(ds,"u").replace(/punct/g,K).getRegex(),Fr=y(ds,"u").replace(/punct/g,cs).getRegex(),Wr=/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,zr=y(Wr,"u").replace(/openQuote/g,$r).replace(/punct/g,K).getRegex(),hs="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",qr=y(hs,"gu").replace(/notPunctSpace/g,je).replace(/punctSpace/g,le).replace(/punct/g,K).getRegex(),Qr=y(hs,"gu").replace(/notPunctSpace/g,Hr).replace(/punctSpace/g,Ir).replace(/punct/g,cs).getRegex(),Br="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)",Ur=y(Br,"gu").replace(/notPunctSpace/g,je).replace(/punctSpace/g,le).replace(/punct/g,K).getRegex(),Vr=y("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,je).replace(/punctSpace/g,le).replace(/punct/g,K).getRegex(),Gr="^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)",Kr=y(Gr,"gu").replace(/notPunctSpace/g,je).replace(/punctSpace/g,le).replace(/punct/g,K).getRegex(),Yr=y(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,K).getRegex(),Zr="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Xr=y(Zr,"gu").replace(/notPunctSpace/g,je).replace(/punctSpace/g,le).replace(/punct/g,K).getRegex(),Jr=y(/\\(punct)/,"gu").replace(/punct/g,K).getRegex(),ei=y(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ti=y(Pt).replace("(?:-->|$)","-->").getRegex(),ni=y("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ti).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),us=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,Qe=y(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets",us).getRegex(),si=y(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",Qe).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ai=y(/^!?\[(label)\]\[(ref)\]/).replace("label",Qe).replace("ref",xt).getRegex(),ri=y(/^!?\[(ref)\](?:\[\])?/).replace("ref",xt).getRegex(),Rn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,ii=y(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets",us).getRegex(),oi=y("reflink|nolink(?!\\()","g").replace("reflink",y(/^!?\[(label)\]\[(ref)\]/).replace("label",ii).replace("ref",Rn).getRegex()).replace("nolink",y(/^!?\[(ref)\](?:\[\])?/).replace("ref",Rn).getRegex()).getRegex(),An=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,At={_backpedal:ne,anyPunctuation:Jr,autolink:ei,blockSkip:_r,br:ls,code:jr,del:ne,delLDelim:ne,delRDelim:ne,emStrongLDelim:Mr,emStrongRDelimAst:qr,emStrongRDelimUnd:Vr,escape:Nr,link:si,nolink:ri,punctuation:Er,reflink:ai,reflinkSearch:oi,tag:ni,text:Or,url:ne},li={...At,emStrongLDelim:zr,emStrongRDelimAst:Ur,emStrongRDelimUnd:Kr,link:y(/^!?\[(label)\]\((.*?)\)/).replace("label",Qe).getRegex(),reflink:y(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Qe).getRegex()},gt={...At,emStrongRDelimAst:Qr,emStrongLDelim:Fr,delLDelim:Yr,delRDelim:Xr,url:y(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",An).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:y(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",An).getRegex()},ci={...gt,br:y(ls).replace("{2,}","*").getRegex(),text:y(gt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},He={normal:Rt,gfm:Tr,pedantic:Dr},Re={normal:At,gfm:gt,breaks:ci,pedantic:li},di={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Cn=n=>di[n];function z(n,e){if(e){if(H.escapeTest.test(n))return n.replace(H.escapeReplace,Cn)}else if(H.escapeTestNoEncode.test(n))return n.replace(H.escapeReplaceNoEncode,Cn);return n}function Ln(n){try{n=encodeURI(n).replace(H.percentDecode,"%")}catch{return null}return n}function Tn(n,e){var r;let t=n.replace(H.findPipe,(i,l,c)=>{let h=!1,d=l;for(;--d>=0&&c[d]==="\\";)h=!h;return h?"|":" |"}),a=t.split(H.splitPipe),s=0;if(a[0].trim()||a.shift(),a.length>0&&!((r=a.at(-1))!=null&&r.trim())&&a.pop(),e)if(a.length>e)a.splice(e);else for(;a.length<e;)a.push("");for(;s<a.length;s++)a[s]=a[s].trim().replace(H.slashPipe,"|");return a}function Y(n,e,t){let a=n.length;if(a===0)return"";let s=0;for(;s<a&&n.charAt(a-s-1)===e;)s++;return n.slice(0,a-s)}function Dn(n){let e=n.split(`
`),t=e.length-1;for(;t>=0&&H.blankLine.test(e[t]);)t--;return e.length-t<=2?n:e.slice(0,t+1).join(`
`)}function Be(n){return n.toLowerCase().toUpperCase().toLowerCase()}function hi(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let a=0;a<n.length;a++)if(n[a]==="\\")a++;else if(n[a]===e[0])t++;else if(n[a]===e[1]&&(t--,t<0))return a;return t>0?-2:-1}function ui(n,e=0){let t=e,a="";for(let s of n)if(s==="	"){let r=4-t%4;a+=" ".repeat(r),t+=r}else a+=s,t++;return a}function Nn(n,e,t,a,s){let r=e.href,i=e.title||null,l=n[1].replace(s.other.outputLinkReplace,"$1"),c=n[0].charAt(0)==="!";a.state.inLink=!0;let h=a.state.linkEmitted,d=a.state.inRawBlock;a.state.linkEmitted=!1;let u=a.inlineTokens(l),p=a.state.linkEmitted;if(a.state.linkEmitted=h,a.state.inLink=!1,!c){if(p){a.state.inRawBlock=d;return}a.state.linkEmitted=!0}return{type:c?"image":"link",raw:t,href:r,title:i,text:l,tokens:u}}function pi(n,e,t){let a=n.match(t.other.indentCodeCompensation);if(a===null)return e;let s=a[1];return e.split(`
`).map(r=>{let i=r.match(t.other.beginningSpace);if(i===null)return r;let[l]=i;return r.slice(Math.min(l.length,s.length))}).join(`
`)}function jn(n,e,t,a){if(!e.includes("<"))return!1;for(let s=0;s<e.length;s++){if(e[s]==="\\"){s++;continue}if(e[s]==="`"){let l=a.inline.code.exec(e.slice(s));if(l){s+=l[0].length-1;continue}}if(e[s]!=="<")continue;let r=n.slice(t+s),i=a.inline.tag.exec(r)||a.inline.autolink.exec(r);if(i){if(i[0].length>e.length-s)return!0;s+=i[0].length-1}}return!1}var Ue=class{constructor(n){k(this,"options");k(this,"rules");k(this,"lexer");this.options=n||re}space(n){let e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){let e=this.rules.block.code.exec(n);if(e){let t=this.options.pedantic?e[0]:Dn(e[0]),a=t.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t,codeBlockStyle:"indented",text:a}}}fences(n){let e=this.rules.block.fences.exec(n);if(e){let t=e[0],a=pi(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:a}}}heading(n){let e=this.rules.block.heading.exec(n);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let a=Y(t,"#");(this.options.pedantic||!a||this.rules.other.endingSpaceTabChar.test(a))&&(t=a.trim())}return{type:"heading",raw:Y(e[0],`
`),depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(n){let e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:Y(e[0],`
`)}}blockquote(n){let e=this.rules.block.blockquote.exec(n);if(e){let t=Y(e[0],`
`).split(`
`),a="",s="",r=[];for(;t.length>0;){let i=!1,l=[],c;for(c=0;c<t.length;c++)if(this.rules.other.blockquoteStart.test(t[c]))l.push(t[c]),i=!0;else if(!i)l.push(t[c]);else break;t=t.slice(c);let h=l.join(`
`),d=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");a=a?`${a}
${h}`:h,s=s?`${s}
${d}`:d;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,r,!0),this.lexer.state.top=u,t.length===0)break;let p=r.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){let g=p,m=t.join(`
`),f=g.raw+`
`+m.replace(this.rules.other.blockquoteSetextReplace2,""),w=this.blockquote(f);r[r.length-1]=w,a=`${a}
${m}`,s=s.substring(0,s.length-g.text.length)+w.text;break}else if((p==null?void 0:p.type)==="list"){let g=p,m=g.raw+`
`+t.join(`
`),f=this.list(m);r[r.length-1]=f,a=a.substring(0,a.length-p.raw.length)+f.raw,s=s.substring(0,s.length-g.raw.length)+f.raw,t=m.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:a,tokens:r,text:s}}}list(n){let e=this.rules.block.list.exec(n);if(e){let t=e[1].trim(),a=t.length>1,s={type:"list",raw:"",ordered:a,start:a?+t.slice(0,-1):"",loose:!1,items:[]};t=a?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=a?t:"[*+-]");let r=this.rules.other.listItemRegex(t),i=!1;for(;n;){let c=!1,h="",d="";if(!(e=r.exec(n))||this.rules.block.hr.test(n))break;h=e[0],n=n.substring(h.length);let u=ui(e[2].split(`
`,1)[0],e[1].length),p=n.split(`
`,1)[0],g=!u.trim(),m=0;if(this.options.pedantic?(m=2,d=u.trimStart()):g?m=e[1].length+1:(m=u.search(this.rules.other.nonSpaceChar),m=m>4?1:m,d=u.slice(m),m+=e[1].length),g&&this.rules.other.blankLine.test(p)&&(h+=p+`
`,n=n.substring(p.length+1),c=!0),!c){let f=this.rules.other.nextBulletRegex(m),w=this.rules.other.hrRegex(m),N=this.rules.other.fencesBeginRegex(m),T=this.rules.other.headingBeginRegex(m),E=this.rules.other.htmlBeginRegex(m),A=this.rules.other.blockquoteBeginRegex(m);for(;n;){let D=n.split(`
`,1)[0],M;if(p=D,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),M=p):M=p.replace(this.rules.other.tabCharGlobal,"    "),N.test(p)||T.test(p)||E.test(p)||A.test(p)||f.test(p)||w.test(p))break;if(M.search(this.rules.other.nonSpaceChar)>=m||!p.trim())d+=`
`+M.slice(m);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||N.test(u)||T.test(u)||w.test(u))break;d+=`
`+p}g=!p.trim(),h+=D+`
`,n=n.substring(D.length+1),u=M.slice(m)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(i=!0)),s.items.push({type:"list_item",raw:h,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=h}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items)if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),!s.loose){let h=c.tokens.filter(u=>u.type==="space"),d=h.length>0&&h.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}for(let c of s.items){let h=c.tokens[0];if(c.task&&((h==null?void 0:h.type)==="text"||(h==null?void 0:h.type)==="paragraph")){c.text=c.text.replace(this.rules.other.listReplaceTask,""),h.raw=h.raw.replace(this.rules.other.listReplaceTask,""),h.text=h.text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=u.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=u.raw+c.tokens[0].raw,c.tokens[0].text=u.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(u)):c.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):c.tokens.unshift(u)}}else c.task&&(c.task=!1)}if(s.loose)for(let c of s.items){c.loose=!0;for(let h of c.tokens)h.type==="text"&&(h.type="paragraph")}return s}}html(n){let e=this.rules.block.html.exec(n);if(e){let t=Dn(e[0]);return{type:"html",block:!0,raw:t,pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:t}}}def(n){let e=this.rules.block.def.exec(n);if(e){let t=Be(e[1]).replace(this.rules.other.multipleSpaceGlobal," "),a=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:Y(e[0],`
`),href:a,title:s}}}table(n){var i;let e=this.rules.block.table.exec(n);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=Tn(e[1]),a=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(i=e[3])!=null&&i.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:Y(e[0],`
`),header:[],align:[],rows:[]};if(t.length===a.length){for(let l of a)this.rules.other.tableAlignRight.test(l)?r.align.push("right"):this.rules.other.tableAlignCenter.test(l)?r.align.push("center"):this.rules.other.tableAlignLeft.test(l)?r.align.push("left"):r.align.push(null);for(let l=0;l<t.length;l++)r.header.push({text:t[l],tokens:this.lexer.inline(t[l]),header:!0,align:r.align[l]});for(let l of s)r.rows.push(Tn(l,r.header.length).map((c,h)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:r.align[h]})));return r}}lheading(n){let e=this.rules.block.lheading.exec(n);if(e){let t=e[1].trim();return{type:"heading",raw:Y(e[0],`
`),depth:e[2].charAt(0)==="="?1:2,text:t,tokens:this.lexer.inline(t)}}}paragraph(n){let e=this.rules.block.paragraph.exec(n);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(n){let e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){let e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(n){let e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){let e=this.rules.inline.link.exec(n);if(e){let t=e[0].charAt(0)==="!"?2:1;if(!this.options.pedantic&&jn(n,e[1],t,this.rules))return;let a=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(a)){if(!this.rules.other.endAngleBracket.test(a))return;let i=Y(a.slice(0,-1),"\\");if((a.length-i.length)%2===0)return}else{let i=hi(e[2],"()");if(i===-2)return;if(i>-1){let l=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,l).trim(),e[3]=""}}let s=e[2],r="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],r=i[3])}else r=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(a)?s=s.slice(1):s=s.slice(1,-1)),Nn(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(n,e){let t;if((t=this.rules.inline.reflink.exec(n))||(t=this.rules.inline.nolink.exec(n))){let a=t[0].charAt(0)==="!"?2:1;if(!this.options.pedantic&&jn(n,t[1],a,this.rules))return;let s=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=e[Be(s)];if(!r){let i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return Nn(t,r,t[0],this.lexer,this.rules)}}emStrong(n,e,t=""){let a=this.rules.inline.emStrongLDelim.exec(n);if(!(!a||!a[1]&&!a[2]&&!a[3]&&!a[4]||a[4]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(a[1]||a[3])||!t||this.rules.inline.punctuation.exec(t))){let s=[...a[0]].length-1,r,i,l=s,c=0,h=a[0][0],d=t===h,u=h==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*n.length+s);(a=u.exec(e))!==null;){if(r=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!r)continue;if(i=[...r].length,a[3]||a[4]){l+=i;continue}else if(a[5]||a[6]){if(s%3&&!((s+i)%3)){c+=i;continue}if(d)break}if(l-=i,l>0)continue;i=Math.min(i,i+l+c);let p=[...a[0]][0].length,g=n.slice(0,s+a.index+p+i);if(Math.min(s,i)%2){let f=g.slice(1,-1);return{type:"em",raw:g,text:f,tokens:this.lexer.inlineTokens(f)}}let m=g.slice(2,-2);return{type:"strong",raw:g,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(n){let e=this.rules.inline.code.exec(n);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),a=this.rules.other.nonSpaceChar.test(t),s=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return a&&s&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(n){let e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n,e,t=""){let a=this.rules.inline.delLDelim.exec(n);if(a&&(!a[1]||!t||this.rules.inline.punctuation.exec(t))){let s=[...a[0]].length-1,r,i,l=s,c=this.rules.inline.delRDelim;for(c.lastIndex=0,e=e.slice(-1*n.length+s);(a=c.exec(e))!==null;){if(r=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!r||(i=[...r].length,i!==s))continue;if(a[3]||a[4]){l+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l);let h=[...a[0]][0].length,d=n.slice(0,s+a.index+h+i),u=d.slice(s,-s);return{type:"del",raw:d,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(n){let e=this.rules.inline.autolink.exec(n);if(e){let t,a;return e[2]==="@"?(t=e[1],a="mailto:"+t):(t=e[1],a=t),{type:"link",raw:e[0],text:t,href:a,autolink:!0,tokens:[{type:"text",raw:t,text:t}]}}}url(n){var t;let e;if(e=this.rules.inline.url.exec(n)){let a,s;if(e[2]==="@")a=e[0],s="mailto:"+a;else{let r;do r=e[0],e[0]=((t=this.rules.inline._backpedal.exec(e[0]))==null?void 0:t[0])??"";while(r!==e[0]);a=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:a,href:s,autolink:!0,tokens:[{type:"text",raw:a,text:a}]}}}inlineText(n){let e=this.rules.inline.text.exec(n);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},B=class ft{constructor(e){k(this,"tokens");k(this,"options");k(this,"state");k(this,"inlineQueue");k(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||re,this.options.tokenizer=this.options.tokenizer||new Ue,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,top:!0};let t={other:H,block:He.normal,inline:Re.normal};this.options.pedantic?(t.block=He.pedantic,t.inline=Re.pedantic):this.options.gfm&&(t.block=He.gfm,this.options.breaks?t.inline=Re.breaks:t.inline=Re.gfm),this.tokenizer.rules=t}static get rules(){return{block:He,inline:Re}}static lex(e,t){return new ft(t).lex(e)}static lexInline(e,t){return new ft(t).inlineTokens(e)}lex(e){e=e.replace(H.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let a=this.inlineQueue[t];this.inlineTokens(a.src,a.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],a=!1){var r,i,l;this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(H.tabCharGlobal,"    ").replace(H.spaceLine,""));let s=1/0;for(;e;){if(e.length<s)s=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let c;if((i=(r=this.options.extensions)==null?void 0:r.block)!=null&&i.some(d=>(c=d.call({lexer:this},e,t))?(e=e.substring(c.raw.length),t.push(c),!0):!1))continue;if(c=this.tokenizer.space(e)){e=e.substring(c.raw.length);let d=t.at(-1);c.raw.length===1&&d!==void 0?d.raw+=`
`:t.push(c);continue}if(c=this.tokenizer.code(e)){e=e.substring(c.raw.length);let d=t.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=(d.raw.endsWith(`
`)?"":`
`)+c.raw,d.text+=`
`+c.text,this.inlineQueue.at(-1).src=d.text):t.push(c);continue}if(c=this.tokenizer.fences(e)){e=e.substring(c.raw.length),t.push(c);continue}if(c=this.tokenizer.heading(e)){e=e.substring(c.raw.length),t.push(c);continue}if(c=this.tokenizer.hr(e)){e=e.substring(c.raw.length),t.push(c);continue}if(c=this.tokenizer.blockquote(e)){e=e.substring(c.raw.length),t.push(c);continue}if(c=this.tokenizer.list(e)){e=e.substring(c.raw.length),t.push(c);continue}if(c=this.tokenizer.html(e)){e=e.substring(c.raw.length),t.push(c);continue}if(c=this.tokenizer.def(e)){e=e.substring(c.raw.length);let d=t.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=(d.raw.endsWith(`
`)?"":`
`)+c.raw,d.text+=`
`+c.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[c.tag]||(this.tokens.links[c.tag]={href:c.href,title:c.title},t.push(c));continue}if(c=this.tokenizer.table(e)){e=e.substring(c.raw.length),t.push(c);continue}if(c=this.tokenizer.lheading(e)){e=e.substring(c.raw.length),t.push(c);continue}let h=e;if((l=this.options.extensions)!=null&&l.startBlock){let d=1/0,u=e.slice(1),p;this.options.extensions.startBlock.forEach(g=>{p=g.call({lexer:this},u),typeof p=="number"&&p>=0&&(d=Math.min(d,p))}),d<1/0&&d>=0&&(h=e.substring(0,d+1))}if(this.state.top&&(c=this.tokenizer.paragraph(h))){let d=t.at(-1);a&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=(d.raw.endsWith(`
`)?"":`
`)+c.raw,d.text+=`
`+c.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):t.push(c),a=h.length!==e.length,e=e.substring(c.raw.length);continue}if(c=this.tokenizer.text(e)){e=e.substring(c.raw.length);let d=t.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=(d.raw.endsWith(`
`)?"":`
`)+c.raw,d.text+=`
`+c.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):t.push(c);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes("["))return!1;let t=this.tokenizer.rules.inline.link;for(let a of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(a[0])&&e.charAt(a.index-1)!=="!")return!0;for(let a of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let s=a[0],r=s.lastIndexOf("[");if(!(s.charAt(0)==="!"||!Object.hasOwn(this.tokens.links,Be(s.slice(r+1,-1))))&&!(r>1&&this.linkInText(s.slice(1,r-1))))return!0}return!1}inlineTokens(e,t=[]){var l,c,h,d,u;this.tokenizer.lexer=this;let a=e;if(this.tokens.links&&e.includes("[")){let p=this.tokenizer.rules.inline.reflinkSearch,g=m=>{let f=m.lastIndexOf("[");if(!Object.hasOwn(this.tokens.links,Be(m.slice(f+1,-1))))return m;if(f>1&&m.charAt(0)!=="!"){let w=m.slice(1,f-1);if(this.linkInText(w))return"["+w.replace(p,g)+"]["+"a".repeat(m.length-f-2)+"]"}return"["+"a".repeat(m.length-2)+"]"};a=a.replace(p,g)}a=a.replace(this.tokenizer.rules.inline.anyPunctuation,p=>"+".repeat(p.length)),a=a.replace(this.tokenizer.rules.inline.blockSkip,(p,g,m)=>{let f=m?m.length:0;return p.slice(0,f)+"["+"a".repeat(p.length-f-2)+"]"}),a=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},a))??a;let s=!1,r="",i=1/0;for(;e;){if(e.length<i)i=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}s||(r=""),s=!1;let p;if((d=(h=this.options.extensions)==null?void 0:h.inline)!=null&&d.some(m=>(p=m.call({lexer:this},e,t))?(e=e.substring(p.raw.length),t.push(p),!0):!1))continue;if(p=this.tokenizer.escape(e)){e=e.substring(p.raw.length),t.push(p);continue}if(p=this.tokenizer.tag(e)){e=e.substring(p.raw.length),t.push(p);continue}if(p=this.tokenizer.link(e)){e=e.substring(p.raw.length),t.push(p);continue}if(p=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(p.raw.length);let m=t.at(-1);p.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=p.raw,m.text+=p.text):t.push(p);continue}if(p=this.tokenizer.emStrong(e,a,r)){e=e.substring(p.raw.length),t.push(p);continue}if(p=this.tokenizer.codespan(e)){e=e.substring(p.raw.length),t.push(p);continue}if(p=this.tokenizer.br(e)){e=e.substring(p.raw.length),t.push(p);continue}if(p=this.tokenizer.del(e,a,r)){e=e.substring(p.raw.length),t.push(p);continue}if(p=this.tokenizer.autolink(e)){e=e.substring(p.raw.length),t.push(p);continue}if(!this.state.inLink&&(p=this.tokenizer.url(e))){e=e.substring(p.raw.length),t.push(p);continue}let g=e;if((u=this.options.extensions)!=null&&u.startInline){let m=1/0,f=e.slice(1),w;this.options.extensions.startInline.forEach(N=>{w=N.call({lexer:this},f),typeof w=="number"&&w>=0&&(m=Math.min(m,w))}),m<1/0&&m>=0&&(g=e.substring(0,m+1))}if(p=this.tokenizer.inlineText(g)){e=e.substring(p.raw.length),p.raw.slice(-1)!=="_"&&(r=p.raw.slice(-1)),s=!0;let m=t.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=p.raw,m.text+=p.text):t.push(p);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t="Infinite loop on byte: "+e;if(this.options.silent)console.error(t);else throw new Error(t)}},Ve=class{constructor(n){k(this,"options");k(this,"parser");this.options=n||re}space(n){return""}code({text:n,lang:e,escaped:t}){var r;let a=(r=(e||"").match(H.notSpaceStart))==null?void 0:r[0],s=n?n.replace(H.endingNewline,"")+`
`:"";return a?'<pre><code class="language-'+z(a)+'">'+(t?s:z(s,!0))+`</code></pre>
`:"<pre><code>"+(t?s:z(s,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}def(n){return""}heading({tokens:n,depth:e}){return`<h${e}>${this.parser.parseInline(n)}</h${e}>
`}hr(n){return`<hr>
`}list(n){let e=n.ordered,t=n.start,a="";for(let i=0;i<n.items.length;i++){let l=n.items[i];a+=this.listitem(l)}let s=e?"ol":"ul",r=e&&t!==1?' start="'+t+'"':"";return"<"+s+r+`>
`+a+"</"+s+`>
`}listitem(n){return`<li>${this.parser.parse(n.tokens)}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let e="",t="";for(let s=0;s<n.header.length;s++)t+=this.tablecell(n.header[s]);e+=this.tablerow({text:t});let a="";for(let s=0;s<n.rows.length;s++){let r=n.rows[s];t="";for(let i=0;i<r.length;i++)t+=this.tablecell(r[i]);a+=this.tablerow({text:t})}return a&&(a=`<tbody>${a}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+a+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){let e=this.parser.parseInline(n.tokens),t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${z(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:e,text:t,tokens:a,autolink:s}){let r=s?z(t,!0):this.parser.parseInline(a),i=Ln(n);if(i===null)return r;n=z(i,s);let l='<a href="'+n+'"';return e&&(l+=' title="'+z(e)+'"'),l+=">"+r+"</a>",l}image({href:n,title:e,text:t,tokens:a}){a&&(t=this.parser.parseInline(a,this.parser.textRenderer));let s=Ln(n);if(s===null)return z(t);n=s;let r=`<img src="${z(n)}" alt="${z(t)}"`;return e&&(r+=` title="${z(e)}"`),r+=">",r}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:z(n.text)}},Ct=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}checkbox({raw:n}){return n}},U=class bt{constructor(e){k(this,"options");k(this,"renderer");k(this,"textRenderer");this.options=e||re,this.options.renderer=this.options.renderer||new Ve,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ct}static parse(e,t){return new bt(t).parse(e)}static parseInline(e,t){return new bt(t).parseInline(e)}parse(e){var a,s;this.renderer.parser=this;let t="";for(let r=0;r<e.length;r++){let i=e[r];if((s=(a=this.options.extensions)==null?void 0:a.renderers)!=null&&s[i.type]){let c=i,h=this.options.extensions.renderers[c.type].call({parser:this},c);if(h!==!1||!["space","hr","heading","code","table","blockquote","list","checkbox","html","def","paragraph","text"].includes(c.type)){t+=h||"";continue}}let l=i;switch(l.type){case"space":{t+=this.renderer.space(l);break}case"hr":{t+=this.renderer.hr(l);break}case"heading":{t+=this.renderer.heading(l);break}case"code":{t+=this.renderer.code(l);break}case"table":{t+=this.renderer.table(l);break}case"blockquote":{t+=this.renderer.blockquote(l);break}case"list":{t+=this.renderer.list(l);break}case"checkbox":{t+=this.renderer.checkbox(l);break}case"html":{t+=this.renderer.html(l);break}case"def":{t+=this.renderer.def(l);break}case"paragraph":{t+=this.renderer.paragraph(l);break}case"text":{t+=this.renderer.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return t}parseInline(e,t=this.renderer){var s,r;this.renderer.parser=this;let a="";for(let i=0;i<e.length;i++){let l=e[i];if((r=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&r[l.type]){let h=this.options.extensions.renderers[l.type].call({parser:this},l);if(h!==!1||!["escape","html","link","image","checkbox","strong","em","codespan","br","del","text"].includes(l.type)){a+=h||"";continue}}let c=l;switch(c.type){case"escape":{a+=t.text(c);break}case"html":{a+=t.html(c);break}case"link":{a+=t.link(c);break}case"image":{a+=t.image(c);break}case"checkbox":{a+=t.checkbox(c);break}case"strong":{a+=t.strong(c);break}case"em":{a+=t.em(c);break}case"codespan":{a+=t.codespan(c);break}case"br":{a+=t.br(c);break}case"del":{a+=t.del(c);break}case"text":{a+=t.text(c);break}default:{let h='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return a}},_e,Ae=(_e=class{constructor(n){k(this,"options");k(this,"block");this.options=n||re}preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}emStrongMask(n){return n}provideLexer(n=this.block){return n?B.lex:B.lexInline}provideParser(n=this.block){return n?U.parse:U.parseInline}},k(_e,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),k(_e,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),_e),ps=class{constructor(...n){k(this,"defaults",St());k(this,"options",this.setOptions);k(this,"parse",this.parseMarkdown(!0));k(this,"parseInline",this.parseMarkdown(!1));k(this,"Parser",U);k(this,"Renderer",Ve);k(this,"TextRenderer",Ct);k(this,"Lexer",B);k(this,"Tokenizer",Ue);k(this,"Hooks",Ae);this.use(...n)}walkTokens(n,e){var a,s;let t=[];for(let r of n)switch(t=t.concat(e.call(this,r)),r.type){case"table":{let i=r;for(let l of i.header)t=t.concat(this.walkTokens(l.tokens,e));for(let l of i.rows)for(let c of l)t=t.concat(this.walkTokens(c.tokens,e));break}case"list":{let i=r;t=t.concat(this.walkTokens(i.items,e));break}default:{let i=r;(s=(a=this.defaults.extensions)==null?void 0:a.childTokens)!=null&&s[i.type]?this.defaults.extensions.childTokens[i.type].forEach(l=>{let c=i[l].flat(1/0);t=t.concat(this.walkTokens(c,e))}):i.tokens&&(t=t.concat(this.walkTokens(i.tokens,e)))}}return t}use(...n){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(t=>{let a={...t};if(a.async=this.defaults.async||a.async||!1,t.extensions&&(t.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let r=e.renderers[s.name];r?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=r.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let r=e[s.level];r?r.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),a.extensions=e),t.renderer){let s=this.defaults.renderer||new Ve(this.defaults);for(let r in t.renderer){if(!(r in s))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let i=r,l=t.renderer[i],c=s[i];s[i]=(...h)=>{let d=l.apply(s,h);return d===!1&&(d=c.apply(s,h)),d||""}}a.renderer=s}if(t.tokenizer){let s=this.defaults.tokenizer||new Ue(this.defaults);for(let r in t.tokenizer){if(!(r in s))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let i=r,l=t.tokenizer[i],c=s[i];s[i]=(...h)=>{let d=l.apply(s,h);return d===!1&&(d=c.apply(s,h)),d}}a.tokenizer=s}if(t.hooks){let s=this.defaults.hooks||new Ae;for(let r in t.hooks){if(!(r in s))throw new Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let i=r,l=t.hooks[i],c=s[i];Ae.passThroughHooks.has(r)?s[i]=h=>{if(this.defaults.async&&Ae.passThroughHooksRespectAsync.has(r))return(async()=>{let u=await l.call(s,h);return c.call(s,u)})();let d=l.call(s,h);return c.call(s,d)}:s[i]=(...h)=>{if(this.defaults.async)return(async()=>{let u=await l.apply(s,h);return u===!1&&(u=await c.apply(s,h)),u})();let d=l.apply(s,h);return d===!1&&(d=c.apply(s,h)),d}}a.hooks=s}if(t.walkTokens){let s=this.defaults.walkTokens,r=t.walkTokens;a.walkTokens=function(i){let l=[];return l.push(r.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...a}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,e){return B.lex(n,e??this.defaults)}parser(n,e){return U.parse(n,e??this.defaults)}parseMarkdown(n){return(e,t)=>{let a={...t},s={...this.defaults,...a},r=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&a.async===!1)return r(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return r(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=n),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer(n):n?B.lex:B.lexInline)(i,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let h=await(s.hooks?await s.hooks.provideParser(n):n?U.parse:U.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(h):h})().catch(r);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer(n):n?B.lex:B.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser(n):n?U.parse:U.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return r(i)}}}onError(n,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let a="<p>An error occurred:</p><pre>"+z(t.message+"",!0)+"</pre>";return e?Promise.resolve(a):a}if(e)return Promise.reject(t);throw t}}},ae=new ps;function P(n,e){return ae.parse(n,e)}P.options=P.setOptions=function(n){return ae.setOptions(n),P.defaults=ae.defaults,as(P.defaults),P};P.getDefaults=St;P.defaults=re;function mi(...n){return ae.use(...n),P.defaults=ae.defaults,as(P.defaults),P}P.use=mi;P.walkTokens=function(n,e){return ae.walkTokens(n,e)};P.parseInline=ae.parseInline;P.Parser=U;P.parser=U.parse;P.Renderer=Ve;P.TextRenderer=Ct;P.Lexer=B;P.lexer=B.lex;P.Tokenizer=Ue;P.Hooks=Ae;P.parse=P;P.options;P.setOptions;P.walkTokens;P.parseInline;U.parse;B.lex;const Ge="/webterminal/",ms=new ps({gfm:!0}),On=n=>ms.parseInline(n),gi=n=>n.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;"),fi=/^(#{2,4}) (.+?) \{#([\w-]+)\}\s*$/gm;function bi(n,e){const t=n.replace(fi,(a,s,r,i)=>`<h${s.length} id="${i}">${On(r)}</h${s.length}>
`).replace(/\[([^\]]+)\]\(#\/[^)]*\)/g,(a,s)=>`<span class="console-path" title="${gi(e)}">${On(s)}</span>`).replace(/\]\(help:([\w-]+)(#[\w-]+)?\)/g,(a,s,r="")=>`](${Ge}docs/${s}${r})`).replace(/\]\(\/help\/images\//g,`](${Ge}help/images/`);return ms.parse(t)}function yi({source:n}){const{c:e}=V(),t=R.useRef(null),a=_n(),s=R.useMemo(()=>bi(n,e.docs.consoleHint),[n,e.docs.consoleHint]);R.useEffect(()=>{const i=t.current;i&&(i.querySelectorAll('a[href^="http"]').forEach(l=>{l.target="_blank",l.rel="noopener noreferrer"}),i.querySelectorAll("img").forEach(l=>{l.loading="lazy"}),i.querySelectorAll("pre").forEach(l=>{if(l.querySelector(".copy-btn"))return;const c=document.createElement("button");c.className="copy-btn",c.type="button",c.textContent=e.common.copy,c.onclick=()=>{var h,d;(d=navigator.clipboard)==null||d.writeText(((h=l.querySelector("code"))==null?void 0:h.textContent)||""),c.textContent=e.common.copied,setTimeout(()=>{c.textContent=e.common.copy},1500)},l.appendChild(c)}))},[s,e.common.copy,e.common.copied]);const r=i=>{const l=i.target.closest("a"),c=l==null?void 0:l.getAttribute("href");!c||!c.startsWith(Ge)||(l==null?void 0:l.target)==="_blank"||i.metaKey||i.ctrlKey||(i.preventDefault(),a("/"+c.slice(Ge.length)))};return o.jsx("div",{ref:t,className:"markdown",onClick:r,dangerouslySetInnerHTML:{__html:s}})}const wi=`# 产品介绍

Webterminal 是一款可自托管的堡垒机（特权访问管理）系统。运维人员通过它访问服务器、桌面、数据库和 Kubernetes 集群；管理员决定谁能用哪个账号、通过哪种协议、做哪些操作；审计员可以查到并回放每一次访问。

## 解决什么问题 {#why}

- **账号散落**：目标机密码掌握在个人手里，离职、轮岗后无法回收。Webterminal 集中托管账号并定期改密，运维人员连接时由堡垒机代填，不需要知道密码。
- **权限过宽**：能登录就能做任何事。Webterminal 把授权细化到"账号 × 协议 × 动作"，例如允许下载但不允许上传、允许 SSH 但不允许端口转发。
- **过程不可追溯**：出了问题说不清是谁做的。所有会话录像，命令、SQL、文件传输、网络访问逐条记录，审计日志串成哈希链防篡改。
- **网络复杂**：资产分布在多个隔离网段。网络网关从隔离网段主动连回堡垒机，网段本身不需要开放入站端口。

## 核心概念 {#concepts}

| 概念 | 含义 |
|---|---|
| **资产** | 一台主机、一个数据库实例或一个 Kubernetes 集群，带地址和支持的协议 |
| **节点** | 资产树上的分组，例如"生产 / 测试"，授权和网关可以按节点继承 |
| **托管账号** | 资产上的登录账号，由堡垒机加密保存 |
| **资产授权** | 用户或用户组 × 资产或节点 × 账号 × 协议 × 允许的动作，可关联访问策略 |
| **访问策略** | 授权之上的附加条件：来源 IP、时间段、多因子认证、强制录像、水印、会话时长与并发、数据库只读等 |
| **会话** | 一次连接，全程录像，可实时监控、共享、接管 |
| **工单** | 需要审批的事项：申请资产权限、SQL 审批、查看账号密码等 |

## 支持的协议与客户端 {#protocols}

| 类型 | 协议 | 浏览器 | 本地客户端 |
|---|---|---|---|
| 字符终端 | SSH | ✓ | OpenSSH、Xshell、SecureCRT、Termius |
| 字符终端 | Telnet（网络设备等） | — | telnet、SecureCRT（本地代理，在配置文件中开启） |
| 文件 | SFTP | ✓（文件管理器） | sftp、WinSCP、FileZilla |
| 文件 | FTP / FTPS | — | FileZilla 等（本地代理，在配置文件中开启） |
| 图形桌面 | RDP、VNC | ✓ | mstsc、Windows App（macOS）、FreeRDP、mterminal |
| 远程应用 | RemoteApp | — | 通过 Webterminal Helper 启动 |
| 数据库 | MySQL、PostgreSQL、SQL Server、Oracle、Redis、MongoDB | ✓ | Navicat、DBeaver、DataGrip、HeidiSQL、TablePlus、命令行 |
| 容器 | Kubernetes（pods/exec） | ✓ | — |
| Windows 管理 | WinRM | 作业中心 | — |

浏览器方式不需要安装任何软件；本地客户端方式直接连接堡垒机的代理端口，授权、策略和审计同样生效。安装 [Webterminal Helper](help:user-guide#helper) 后，网页上点"一键连接"即可拉起本地客户端。

## 组成部分 {#components}

| 组件 | 说明 |
|---|---|
| 控制台 | React 前端，管理、连接、审计都在这里完成 |
| 后端服务 | Go 编写，包含 API、协议代理（SSH、RDP、VNC、数据库、Kubernetes）、录像、作业、改密和巡检 |
| 元数据库 | SQLite（演示 / 小规模）、MySQL 或 PostgreSQL |
| Redis | 缓存与多副本协同 |
| 网络网关（可选） | 部署在隔离网段，主动连回堡垒机，转发到该网段资产的连接 |
| Webterminal Helper（可选） | 用户电脑上的小程序，注册 \`wterm://\` 链接，拉起本地客户端 |

## 内置角色 {#roles}

| 角色 | 职责 |
|---|---|
| 系统管理员 | 全部功能与系统设置 |
| 资产管理员 | 资产、账号、授权、策略、应用发布、网关、作业 |
| 审批人 | 处理权限申请、SQL 审批等工单 |
| 审计员 | 会话审计、录像回放、操作记录 |
| 普通用户 | 连接已授权的资产与应用，提交申请 |

角色可以自定义；详见 [管理员手册 · 角色与分工](help:admin-guide#roles)。

## 下一步 {#next}

- [安装部署](help:install#compose)：一条命令完成单机安装。
- [快速入门](help:quickstart#init)：十分钟跑通第一次连接。
`,Si=`# Overview

Webterminal is a self-hosted bastion host (privileged access management) system. Operators use it to reach servers, desktops, databases and Kubernetes clusters; administrators decide who may use which account, over which protocol, to do what; auditors can find and replay every access.

## What it solves {#why}

- **Scattered credentials**: target passwords live with individuals and cannot be taken back when people leave. Webterminal holds the accounts centrally and rotates them; operators connect without ever seeing the password.
- **Over-broad access**: being able to log in means being able to do anything. Webterminal grants per account × protocol × action — download but not upload, SSH but no port forwarding.
- **No accountability**: when something breaks, nobody knows who did it. Every session is recorded; commands, SQL, file transfers and network access are logged one by one, and the audit log is hash-chained against tampering.
- **Complex networks**: assets sit in many isolated segments. A network gateway dials back from the segment to the bastion, so the segment needs no inbound ports.

## Core concepts {#concepts}

| Concept | Meaning |
|---|---|
| **Asset** | A host, a database instance or a Kubernetes cluster, with an address and the protocols it offers |
| **Node** | A group in the asset tree, e.g. "Production / Test"; grants and gateways can be inherited by node |
| **Managed account** | A login account on an asset, stored encrypted by the bastion |
| **Asset grant** | User or group × asset or node × account × protocol × allowed actions, optionally with an access policy |
| **Access policy** | Conditions on top of a grant: source IP, time windows, MFA, forced recording, watermark, session length and concurrency, read-only databases… |
| **Session** | One connection, recorded end to end, with live monitoring, sharing and takeover |
| **Ticket** | Something that needs approval: an access request, a SQL approval, revealing a password… |

## Protocols and clients {#protocols}

| Kind | Protocols | Browser | Native clients |
|---|---|---|---|
| Terminals | SSH | ✓ | OpenSSH, Xshell, SecureCRT, Termius |
| Terminals | Telnet (network devices…) | — | telnet, SecureCRT (native proxy, enabled in the config file) |
| Files | SFTP | ✓ (file manager) | sftp, WinSCP, FileZilla |
| Files | FTP / FTPS | — | FileZilla and others (native proxy, enabled in the config file) |
| Desktops | RDP, VNC | ✓ | mstsc, Windows App (macOS), FreeRDP, mterminal |
| Remote apps | RemoteApp | — | launched through Webterminal Helper |
| Databases | MySQL, PostgreSQL, SQL Server, Oracle, Redis, MongoDB | ✓ | Navicat, DBeaver, DataGrip, HeidiSQL, TablePlus, command line |
| Containers | Kubernetes (pods/exec) | ✓ | — |
| Windows management | WinRM | job center | — |

The browser needs nothing installed. Native clients connect to the bastion's proxy ports, with the same authorization, policies and audit. With [Webterminal Helper](help:user-guide#helper) installed, "Connect" in the console opens your local client.

## Components {#components}

| Component | Description |
|---|---|
| Console | React front end for administration, connecting and auditing |
| Server | Written in Go: API, protocol proxies (SSH, RDP, VNC, databases, Kubernetes), recording, jobs, rotation and checks |
| Metadata database | SQLite (demo / small teams), MySQL or PostgreSQL |
| Redis | Cache and coordination between replicas |
| Network gateway (optional) | Runs in an isolated segment, dials back to the bastion and relays connections to that segment |
| Webterminal Helper (optional) | A small program on the user's computer that registers \`wterm://\` links and opens local clients |

## Built-in roles {#roles}

| Role | Responsibilities |
|---|---|
| System administrator | Everything, including system settings |
| Asset admin | Assets, accounts, grants, policies, app publishing, gateways, jobs |
| Approver | Access requests, SQL approvals and other tickets |
| Auditor | Session audit, recording replay, activity logs |
| User | Connects to granted assets and apps, submits requests |

Roles can be customized; see [Administrator guide · Roles](help:admin-guide#roles).

## Next steps {#next}

- [Installation](help:install#compose): a single-host install in one command.
- [Quick start](help:quickstart#init): your first connection in ten minutes.
`,vi=`# 安装部署

Webterminal 支持两种部署方式：单机 **Docker Compose**（推荐起步）和 **Kubernetes / Helm**（支持多副本高可用）。两种方式都只需要你自己的服务器，数据不出你的网络。

## 环境要求 {#requirements}

| 项目 | 要求 |
|---|---|
| 操作系统 | Linux x86_64 或 arm64（需要审计真实客户端 IP 时必须是 Linux；Docker Desktop 会改写来源地址） |
| 容器运行时 | Docker，带 Compose 插件（\`docker compose\`） |
| 元数据库 | 内置 SQLite 可直接起步；生产建议 MySQL 或 PostgreSQL |
| 浏览器 | Chrome、Edge、Firefox、Safari 的较新版本 |

源码构建时，后端通过 \`replace ../<name>\` 引用几个同级模块（gateway、gokit、hooks、grdp-nla、sshproxy、sshterm、rdp-redemption），默认放在仓库同级目录，也可以用 \`<NAME>_DIR\` 环境变量指定位置，例如 \`GRDP_NLA_DIR=~/src/grdp-nla ./build.sh\`。

## Docker Compose 单机部署 {#compose}

\`\`\`bash
git clone https://github.com/jimmy201602/webterminal.git
cd webterminal/deploy/docker-compose
./install.sh
\`\`\`

\`install.sh\` 依次完成：检查依赖和端口占用、生成 \`.env\`（含随机的 \`REDIS_PASSWORD\`；已有 \`.env\` 时只补缺失项）、构建镜像、启动容器并等待后端健康检查通过。

完成后浏览器打开 \`http://<主机>:8080\`，进入初始化向导：

1. 阅读并确认须知；
2. 选择元数据库：SQLite（数据落在 \`gva-data\` 卷），或填写自有 MySQL / PostgreSQL；
3. 设置管理员 \`admin\` 的密码，点 **立即初始化**；
4. 用刚才的密码登录，按 [快速入门](help:quickstart#step-asset) 添加第一台资产。

![初始化表单](/help/images/init-form.png)

## 端口 {#ports}

| 端口 | 用途 |
|---|---|
| 8080 | 控制台（\`WEB_PORT\`） |
| 2222 | SSH / SFTP 代理 |
| 3389 | RDP 代理 |
| 13306 / 15432 / 11433 / 11521 | MySQL / PostgreSQL / SQL Server / Oracle 代理 |
| 16379 / 37017 | Redis / MongoDB 代理 |

所有宿主端口都可以在 \`.env\` 中修改；不对外提供的协议，在 \`docker-compose.yaml\` 中注释掉对应端口即可。元数据库和 Redis 不映射宿主端口，不会与 13306 等代理端口冲突。

## 升级、备份与回滚 {#upgrade}

所有状态都在 \`gva-data\` 卷的 \`/data\` 下：\`config.yaml\`、数据库、录像、上传文件、日志、Helper 安装包。

\`\`\`bash
./upgrade.sh                                   # 先快照 gva-data 到 backups/，再构建新镜像并重启
./restore.sh backups/gva-data-<时间戳>.tar.gz  # 回滚：整体覆盖卷数据（需输入 y 确认）
\`\`\`

数据库结构由后端启动时自动迁移，不需要手工执行 SQL。手工备份同样有效：

\`\`\`bash
docker run --rm -v bastion_gva-data:/d -v $PWD:/b alpine tar czf /b/gva-data.tgz -C /d .
\`\`\`

## Kubernetes / Helm {#helm}

镜像用 \`deploy/docker-compose/build.sh\` 构建（\`bastion/server\`、\`bastion/web\`），推送到你的镜像仓库后安装：

\`\`\`bash
helm install bastion deploy/helm/bastion \\
  --set image.server=registry.example.com/bastion/server:1.0 \\
  --set image.web=registry.example.com/bastion/web:1.0 \\
  --set ingress.enabled=true --set ingress.host=bastion.example.com
\`\`\`

打开控制台完成初始化向导。原生客户端端口由 \`proxies.type\`（默认 \`LoadBalancer\`）对外提供，Service 使用 \`externalTrafficPolicy: Local\` 保留客户端真实地址。

## 高可用（多副本） {#ha}

> 多副本高可用属于企业版功能（社区版单副本），可以先用试用期验证。

多副本需要满足三个条件（不满足时 Chart 拒绝 \`replicaCount > 1\`）：

| 条件 | 原因 |
|---|---|
| 数据卷 \`ReadWriteMany\`（NFS、CephFS、EFS、Azure Files…） | 配置、录像、主机密钥、上传文件在副本间共享 |
| 元数据库为 MySQL 或 PostgreSQL | 多个副本不能共用一个 SQLite 文件 |
| Redis（内置或外接） | 副本之间通过它协同；生产请使用主从 / 哨兵 |

先以 1 个副本安装并在 MySQL / PostgreSQL 上完成初始化，再扩容：

\`\`\`bash
helm upgrade bastion deploy/helm/bastion --reuse-values \\
  --set replicaCount=2 --set persistence.accessMode=ReadWriteMany
\`\`\`

副本之间共享：会话的监控、共享、接管和强制断开会转发到会话所在副本；定时任务（改密、目录同步、巡检、数据保留、日志外发等）在集群内每个周期只执行一次；登录失败计数与锁定集群共享。入口和代理 Service **不需要会话粘滞**。交互会话是长连接，负载均衡的空闲超时请设置为 12 小时以上。

## 网络网关 {#gateway}

资产在堡垒机直连不到的隔离网段时，在该网段运行一个网关：它通过控制台的 HTTPS 端口主动连回堡垒机，网段本身不需要任何入站端口。

1. 控制台 **资产管理 → 网关** 新建网关，填写允许访问的网段，点 **生成一键安装命令**。
2. 在隔离网段的 Linux / Windows 主机上执行生成的那一行命令，脚本会下载代理、校验 SHA-256、注册为系统服务并等待上线。
3. 在节点或资产的 **网络路由** 中选择该网关。

网关离线时连接直接失败，**不会回退为直连**；同一网关可以运行多个代理互为备份。详见 [管理员手册 · 网关](help:admin-guide#gateway)。

![网关](/help/images/gateway-list.png)

## 版本与试用 {#license}

- 安装后即可试用全部企业功能 15 天。能联网时自动向授权服务登记试用：同一台机器或同一个 Kubernetes 集群重装不会重新开始试用。暂时连不上时先给 3 天临时试用（从旧版本升级上来的安装为 15 天）。
- 内网离线部署请设置环境变量 \`BASTION_LICENSE_OFFLINE=1\`：不登记试用，直接是社区版；需要试用时在"系统设置 → 授权许可"复制申请码联系我们，签发 15 天离线试用授权。
- 社区版限额：RDP / VNC 图形会话（网页和本地客户端合计）同时 3 个、网络网关 1 个、单副本。高可用多副本属于企业版。
- Docker Compose 的安装和升级脚本会把宿主机 \`/etc/machine-id\` 以只读方式挂进容器，Helm chart 创建一个只能读取 \`kube-system\` 命名空间对象的 ServiceAccount（\`licenseRBAC.enabled\`），用于把授权和试用绑定到环境，只使用其哈希。
- 详见 [管理员手册 · 授权许可](help:admin-guide#license)。

## 生产环境检查清单 {#production}

- **代理加密**：原生代理默认明文（日志提示 \`PLAINTEXT\`）。在 \`/data/config.yaml\` 的数据库代理段配置 \`tls-cert-file\`，或把端口限制在可信网段。
- **控制台 HTTPS**：在前面放置 HTTPS 反向代理或负载均衡。
- **真实客户端 IP**：后端只信任 \`TRUSTED_PROXIES\`（默认为 compose 网络所在私网段）传来的 \`X-Forwarded-For\`。前面再加一层负载均衡时，把它的地址加进 \`.env\` 的 \`TRUSTED_PROXIES\`；来源白名单、失败锁定和审计里的客户端 IP 都依赖它。
- **元数据库**：生产使用 MySQL 或 PostgreSQL，并纳入日常备份。
- **录像存储**：录像在 \`/data/record\`，按 [数据保留](help:admin-guide#audit) 策略清理，注意磁盘容量。
- **管理员账号**：开启多因子认证，按 [登录与认证](help:admin-guide#login-auth) 设置来源限制和失败锁定。

## 内网离线部署 {#offline}

在能联网的机器上构建镜像并导出，再导入内网主机：

\`\`\`bash
./build.sh
docker save bastion/server bastion/web redis:7.2-alpine | gzip > webterminal-images.tgz
# 拷贝到内网主机后
docker load < webterminal-images.tgz
docker compose up -d
\`\`\`

运行时不依赖任何外部服务。
`,ki=`# Installation

Webterminal deploys two ways: a single host with **Docker Compose** (the recommended start) or **Kubernetes / Helm** (with multi-replica high availability). Both run on your own servers; no data leaves your network.

## Requirements {#requirements}

| Item | Requirement |
|---|---|
| Operating system | Linux x86_64 or arm64 (Linux is required to audit real client IPs; Docker Desktop rewrites source addresses) |
| Container runtime | Docker with the Compose plugin (\`docker compose\`) |
| Metadata database | Built-in SQLite to start; MySQL or PostgreSQL recommended for production |
| Browser | A recent Chrome, Edge, Firefox or Safari |

When building from source, the server references several sibling modules through \`replace ../<name>\` (gateway, gokit, hooks, grdp-nla, sshproxy, sshterm, rdp-redemption). They are expected next to the repository by default; point elsewhere with \`<NAME>_DIR\`, e.g. \`GRDP_NLA_DIR=~/src/grdp-nla ./build.sh\`.

## Docker Compose {#compose}

\`\`\`bash
git clone https://github.com/jimmy201602/webterminal.git
cd webterminal/deploy/docker-compose
./install.sh
\`\`\`

\`install.sh\` checks dependencies and port usage, writes \`.env\` (with a random \`REDIS_PASSWORD\`; an existing \`.env\` only gets missing entries), builds the images, starts the containers and waits for the server health check.

Then open \`http://<host>:8080\` and follow the setup wizard:

1. Read and confirm the notes;
2. Pick the metadata database: SQLite (stored on the \`gva-data\` volume) or your own MySQL / PostgreSQL;
3. Set the password of the \`admin\` user and click **Initialize Now**;
4. Sign in with it and add your first asset as described in the [Quick start](help:quickstart#step-asset).

![Setup form](/help/images/en/init-form.png)

## Ports {#ports}

| Port | Purpose |
|---|---|
| 8080 | Console (\`WEB_PORT\`) |
| 2222 | SSH / SFTP proxy |
| 3389 | RDP proxy |
| 13306 / 15432 / 11433 / 11521 | MySQL / PostgreSQL / SQL Server / Oracle proxies |
| 16379 / 37017 | Redis / MongoDB proxies |

Every host port can be changed in \`.env\`; comment out the ports of protocols you do not offer in \`docker-compose.yaml\`. The metadata database and Redis are not published on the host, so they never collide with proxy ports such as 13306.

## Upgrade, backup and rollback {#upgrade}

All state lives under \`/data\` on the \`gva-data\` volume: \`config.yaml\`, the database, recordings, uploads, logs and Helper packages.

\`\`\`bash
./upgrade.sh                                       # snapshot gva-data to backups/, then rebuild and restart
./restore.sh backups/gva-data-<timestamp>.tar.gz   # roll back: overwrites the whole volume (asks for y)
\`\`\`

The server migrates its schema on start; no manual SQL is needed. A manual backup works too:

\`\`\`bash
docker run --rm -v bastion_gva-data:/d -v $PWD:/b alpine tar czf /b/gva-data.tgz -C /d .
\`\`\`

## Kubernetes / Helm {#helm}

Build the images with \`deploy/docker-compose/build.sh\` (\`bastion/server\`, \`bastion/web\`), push them to your registry, then:

\`\`\`bash
helm install bastion deploy/helm/bastion \\
  --set image.server=registry.example.com/bastion/server:1.0 \\
  --set image.web=registry.example.com/bastion/web:1.0 \\
  --set ingress.enabled=true --set ingress.host=bastion.example.com
\`\`\`

Open the console and finish the setup wizard. Native-client ports are exposed through \`proxies.type\` (default \`LoadBalancer\`); the Service uses \`externalTrafficPolicy: Local\` to keep real client addresses.

## High availability {#ha}

> Multi-replica HA is an Enterprise feature (Community runs one replica); the trial lets you validate it first.

More than one replica needs three things (the chart refuses \`replicaCount > 1\` otherwise):

| Requirement | Why |
|---|---|
| A \`ReadWriteMany\` volume (NFS, CephFS, EFS, Azure Files…) | Configuration, recordings, host keys and uploads are shared by the replicas |
| MySQL or PostgreSQL as metadata database | Replicas cannot share one SQLite file |
| Redis (bundled or external) | Replicas coordinate through it; use a replicated Redis in production |

Install with one replica, finish the wizard on MySQL / PostgreSQL, then scale:

\`\`\`bash
helm upgrade bastion deploy/helm/bastion --reuse-values \\
  --set replicaCount=2 --set persistence.accessMode=ReadWriteMany
\`\`\`

What the replicas share: monitoring, sharing, takeover and termination of a session are relayed to the replica holding it; scheduled work (rotation, directory sync, checks, retention, log forwarding…) runs once per period across the cluster; sign-in failure counters and locks are cluster-wide. Neither the ingress nor the proxy Service needs **sticky sessions**. Interactive sessions are long-lived: set load-balancer idle timeouts to 12 hours or more.

## Network gateways {#gateway}

When assets sit in a segment the bastion cannot reach, run a gateway there: it dials back to the bastion over the console's HTTPS port, so the segment needs no inbound ports.

1. In **Assets → Gateways**, create a gateway, enter the networks it may reach and click **Generate one-line install commands**.
2. Run that one line on a Linux / Windows host in the segment; the script downloads the agent, verifies its SHA-256, registers a system service and waits until it is online.
3. Select the gateway in the **Network route** of a node or asset.

When a gateway is offline, connections fail — there is **never a direct fallback**. Several agents can serve one gateway for redundancy. See [Administrator guide · Gateways](help:admin-guide#gateway).

![Gateways](/help/images/en/gateway-list.png)

## Editions and trial {#license}

- Every installation can try all Enterprise features for 15 days. When online, the trial is registered with the license service: reinstalling on the same machine or Kubernetes cluster does not restart it. While the service cannot be reached a 3-day provisional trial applies (15 days for an installation upgraded from an older version).
- For air-gapped installs set \`BASTION_LICENSE_OFFLINE=1\`: no trial registration, the Community Edition from the start; to try Enterprise, copy the request code from Settings → License and contact us for a 15-day offline trial license.
- Community limits: 3 concurrent RDP / VNC graphical sessions (web and native together), 1 network gateway, a single replica. Multi-replica HA is an Enterprise feature.
- The Docker Compose scripts mount the host's \`/etc/machine-id\` read-only into the container; the Helm chart creates a ServiceAccount that can read only the \`kube-system\` namespace object (\`licenseRBAC.enabled\`). They tie the license and the trial to the environment; only hashes are used.
- See [Administrator guide · License](help:admin-guide#license).

## Production checklist {#production}

- **Encrypt the proxies**: native proxies are clear text by default (the log says \`PLAINTEXT\`). Set \`tls-cert-file\` in the database proxy section of \`/data/config.yaml\`, or restrict the ports to trusted networks.
- **HTTPS for the console**: put an HTTPS reverse proxy or load balancer in front.
- **Real client IPs**: the server trusts \`X-Forwarded-For\` only from \`TRUSTED_PROXIES\` (by default the compose network's private range). Add any extra load balancer to \`TRUSTED_PROXIES\` in \`.env\`; source allow-lists, lockouts and audit client IPs depend on it.
- **Metadata database**: use MySQL or PostgreSQL in production and include it in your backups.
- **Recording storage**: recordings live in \`/data/record\` and are pruned by the [retention](help:admin-guide#audit) policy; watch disk capacity.
- **Administrator accounts**: enable MFA and set source restrictions and lockouts under [Sign-in and authentication](help:admin-guide#login-auth).

## Air-gapped install {#offline}

Build and export the images on a connected machine, then load them on the internal host:

\`\`\`bash
./build.sh
docker save bastion/server bastion/web redis:7.2-alpine | gzip > webterminal-images.tgz
# on the internal host
docker load < webterminal-images.tgz
docker compose up -d
\`\`\`

Nothing at runtime depends on external services.
`,xi=`# 快速入门

十分钟跑通第一次连接：管理员添加资产并授权，用户在「资产连接」里打开会话。以下步骤以系统管理员（admin）身份操作。

## 首次初始化 {#init}

全新部署首次打开控制台会自动进入初始化向导：确认须知后填写管理员密码并选择数据库类型（演示/小规模可用 sqlite，生产建议 MySQL 或 PostgreSQL），点 **立即初始化** 完成建库建表，随后用刚才设置的管理员账号登录。

![初始化须知](/help/images/init-welcome.png)

![初始化表单](/help/images/init-form.png)

## 概念速览 {#overview}

| 概念 | 含义 |
|---|---|
| **资产** | 一台主机或一个数据库实例，带地址、协议（SSH / RDP / VNC / SFTP / MySQL / PostgreSQL / SQL Server / Oracle / Redis / MongoDB） |
| **托管账号** | 资产上的登录账号（用户名 + 密码或密钥），由堡垒机保存，用户连接时无需知道密码 |
| **资产授权** | 「谁」可以用「哪些账号」访问「哪些资产」，以及允许的动作（连接、上传、下载、剪贴板……） |
| **访问策略** | 授权之上的附加条件：来源 IP、多因子认证、强制录像、水印、会话时长与并发、数据库只读 |
| **会话** | 一次连接。全程录像，命令 / SQL / 文件传输逐条记录，可回放 |
| **工单** | 需要审批的事项：申请资产权限、SQL 审批、查看账号密码等 |

## 第 1 步：添加资产 {#step-asset}

1. 打开 [资产管理 → 资产与账号](#/layout/bastion/bastionAssetCenter?tab=asset)。
2. 左侧资产树可以先建节点（如「生产 / 测试」）用于分组；不建也可以，资产会归入「未分组」。
3. 点 **新增资产**，填写名称、地址、端口，勾选协议。
4. 保存后在资产行点 **账号**，添加至少一个托管账号，并点闪电图标 **测试连接** 确认账号可用。

![资产账号](/help/images/asset-account-drawer.png)

## 第 2 步：准备用户 {#step-user}

- 手动创建：[系统管理 → 用户管理](#/layout/admin/user)，给用户分配内置角色 **User**（普通运维人员）。
- 批量导入：在 [系统设置 → 用户同步](#/layout/admin/bastionSettings?tab=userSync) 接入 LDAP / AD，定时同步。
- 按团队组织：在 [用户组](#/layout/bastionUserGroup) 建组，授权给组比逐个授权更省事。

## 第 3 步：授权 {#step-grant}

1. 打开 [访问控制 → 资产授权](#/layout/bastion/bastionAccessControl?tab=authorization)，点 **新增授权**。
2. 选择用户或用户组、资产（或整个节点）、协议，在「授权账号」里选 **全部账号**（先跑通，之后可以收紧成指定账号），勾选允许的动作。
3. 可选：在 [访问策略](#/layout/bastion/bastionAccessControl?tab=policy) 为敏感资产加上多因子认证、IP 白名单或只读限制。

> 没有授权的用户在「资产连接」里看不到任何资产，可以在那里直接提交授权申请，由审批人在「工单」中处理。

![新增授权规则](/help/images/authorization-drawer.png)

## 第 4 步：连接 {#step-connect}

以被授权的用户登录，打开 [资产连接](#/layout/bastion/bastionConnect)：

- 会在新窗口打开连接工作台，左侧是可访问的资产树。
- **双击**资产，或鼠标悬停时点右侧的连接图标，即在浏览器中打开会话（SSH 终端 / 远程桌面 / 数据库控制台）。
- 一台资产有多个账号或协议时会先让你选择。

![资产连接](/help/images/workspace-asset-tree.png)

## 第 5 步（推荐）：安装本地客户端 {#step-client}

想用 mstsc、Xshell、Navicat、DBeaver 等本地工具连接时：

1. 在资产上 **右键 → 本地客户端**（或悬停点本地客户端图标）。
2. 首次使用会提示安装 **Webterminal Helper**，按提示下载对应系统的安装包，安装后点 **重新检测**。
3. 之后点 **通过 Helper 一键连接**，Helper 会带上一次性令牌拉起你配置的本地客户端，无需输入密码。

详见 [用户手册 → 本地客户端](help:user-guide#native)。

![本地客户端连接窗口](/help/images/native-client-card.png)

## 下一步 {#next}

- 管理员：阅读 [管理员手册](help:admin-guide#roles)，了解角色分工、改密、审计与告警。
- 用户：阅读 [用户手册](help:user-guide#workspace)。
- 遇到问题：查看 [常见问题](help:faq#helper-not-detected)。
`,Pi=`# Quick start

Get to the first connection in ten minutes: an administrator adds an asset and grants access, then a user opens a session from Asset Connect. The steps below are performed as the system administrator (admin).

## First-time initialization {#init}

A fresh deployment opens the initialization wizard the first time the console loads: confirm the notice, set the administrator password and pick a database type (sqlite works for demos and small installs; MySQL or PostgreSQL for production), then click **Initialize** to create the schema and sign in with the account you just set.

![Initialization notice](/help/images/en/init-welcome.png)

![Initialization form](/help/images/en/init-form.png)

## Key concepts {#overview}

| Concept | Meaning |
|---|---|
| **Asset** | A host or database instance with an address and protocols (SSH / RDP / VNC / SFTP / MySQL / PostgreSQL / SQL Server / Oracle / Redis / MongoDB) |
| **Managed account** | A login on the asset (user name + password or key) stored by the bastion; users connect without ever seeing the password |
| **Authorization** | *Who* may use *which accounts* on *which assets*, and the allowed actions (connect, upload, download, clipboard…) |
| **Access policy** | Extra conditions on top of an authorization: source IP, MFA, forced recording, watermark, session duration and concurrency, database read-only |
| **Session** | One connection. Fully recorded; commands, SQL and file transfers are logged one by one and can be replayed |
| **Ticket** | Anything that needs approval: asset access requests, SQL approval, viewing an account password… |

## Step 1: add an asset {#step-asset}

1. Open [Asset Management → Assets & Accounts](#/layout/bastion/bastionAssetCenter?tab=asset).
2. Optionally create nodes in the tree on the left (e.g. "Production / Test") to group assets; ungrouped assets go to "Ungrouped".
3. Click **Add asset**, fill in the name, address and port, and select the protocols.
4. After saving, click **Accounts** on the asset row, add at least one managed account and click the lightning icon (**Test connection**) to verify it.

![Asset accounts](/help/images/en/asset-account-drawer.png)

## Step 2: prepare users {#step-user}

- Manually: [System → Users](#/layout/admin/user); give operators the built-in role **User**.
- In bulk: connect LDAP / AD in [Settings → User Sync](#/layout/admin/bastionSettings?tab=userSync) and sync on a schedule.
- By team: create [user groups](#/layout/bastionUserGroup); granting a group is easier than granting people one by one.

## Step 3: grant access {#step-grant}

1. Open [Access Control → Authorization](#/layout/bastion/bastionAccessControl?tab=authorization) and click **Add rule**.
2. Pick users or user groups, assets (or a whole node), protocols, choose **All accounts** under Authorized accounts (tighten to selected accounts later), and the allowed actions.
3. Optionally add MFA, an IP allow-list or read-only limits for sensitive assets in [Access Policies](#/layout/bastion/bastionAccessControl?tab=policy).

> Users without any authorization see an empty asset tree in Asset Connect and can submit an access request right there; approvers handle it under Tickets.

![New authorization rule](/help/images/en/authorization-drawer.png)

## Step 4: connect {#step-connect}

Sign in as the authorized user and open [Asset Connect](#/layout/bastion/bastionConnect):

- The connection workspace opens in a new window with the accessible assets on the left.
- **Double-click** an asset, or hover it and click the connect icon, to open a browser session (SSH terminal / remote desktop / database console).
- When an asset has several accounts or protocols you choose one first.

![Asset connect](/help/images/en/workspace-asset-tree.png)

## Step 5 (recommended): install the local client {#step-client}

To connect with mstsc, Xshell, Navicat, DBeaver and other local tools:

1. **Right-click the asset → Local client** (or hover and click the local-client icon).
2. The first time you are asked to install **Webterminal Helper**; download the package for your OS, install it and click **Re-check**.
3. From then on click **Connect via Helper**: Helper launches your configured client with a one-time token, no password needed.

See [User guide → Local clients](help:user-guide#native).

![Native client window](/help/images/en/native-client-card.png)

## Next steps {#next}

- Administrators: read the [Administrator guide](help:admin-guide#roles) for roles, password rotation, auditing and alerts.
- Users: read the [User guide](help:user-guide#workspace).
- Having trouble? See the [FAQ](help:faq#helper-not-detected).
`,Ri=`# 用户手册

面向日常使用堡垒机的运维、开发和 DBA。你能看到的资产和功能由管理员的授权决定。

## 连接工作台 {#workspace}

打开 [资产连接](#/layout/bastion/bastionConnect) 会在新窗口打开工作台（被浏览器拦截时点页面上的按钮手动打开）。

- **左侧资产树**：只显示授权给你的资产，顶部可搜索名称或 IP。树顶有两个虚拟分组：**收藏**（点资产行上的星标加入，再点取消；收藏只对自己可见，换设备登录也在）和 **最近访问**（最近连接过的资产，按最近一次连接排序，并显示当时用的账号）。
- **打开会话**：双击资产，或悬停后点右侧的连接图标。有多个账号 / 协议时先选择——下拉框里只列出授权给你的账号，可能还有 **手动输入账号**（用你自己的目标机凭据登录，凭据一次性有效、不落库）或 **匿名登录**（无需凭据的协议）。
- **Kubernetes 集群**：双击集群资产后选择命名空间、Pod 和容器即可打开容器终端；列表里只有授权给你的命名空间和 Pod。终端操作方式与 SSH 相同，同样录像、过命令过滤。
- **多标签**：每个会话一个标签；标签上右键可重连、复制会话、关闭其他 / 左侧 / 右侧标签。
- **命令广播**：顶栏的广播图标可把一个终端里敲的键同步发到勾选的其他 SSH 标签页——适合在多台机器上做相同操作。每个会话仍各自过命令过滤与审计；不需要广播的标签取消勾选即可。广播开启后，参与的标签名前有橙色广播标记，终端上方显示提示条列出同步的会话，可直接点「关闭广播」。
- **会话共享**：SSH 会话的工具栏上有共享图标，点「创建邀请链接」生成一次性邀请（10 分钟内有效，仅能用一次），把链接发给有权限的同事。对方打开链接点「加入会话」后**默认只读**——能看到你的屏幕，敲键不会生效。参与者在共享面板里逐个列出：打开「允许输入」开关才允许对方写入，点移除按钮可立刻请出。加入方的授权规则必须勾选「协作共享」动作，否则加入会被拒绝。会话结束或重启后所有邀请与参与者自动失效。**浏览器中打开的 RDP / VNC 桌面**同样可以共享：共享图标在画面右上角，加入者打开链接后立即看到完整桌面；面板里的开关在桌面会话中是「控制权」——同一时刻只有一人可操作，交给某位参与者后**你自己的键盘和鼠标暂停**（会有提示），关掉开关、对方离开或被移出即归还给你；参与者只能操作鼠标、键盘和滚轮，不能使用剪贴板和文件传输。用本地 mstsc / VNC 客户端打开的会话不支持共享。
- **管理员接管**：管理员在「会话审计 → 在线会话」里可对 SSH 会话点「接管」——你的输入会被临时挂起，管理员在其协作窗口中操作；管理员关闭窗口或断开时输入自动归还；接管期间你的终端会显示提示。接管与释放都会记入审计日志。
- **SSH**：工具栏可打开 SFTP 面板，拖动分隔条调整大小，支持上传下载（需要授权中勾选了对应动作）。
- **远程桌面（RDP / VNC）**：右侧悬浮工具栏可映射本地文件夹、静音、断开；剪贴板在授权允许时自动同步。
- **数据库**：进入 SQL 控制台，支持元数据浏览、补全、执行计划、结果导出和 SQL 模板。


![资产树与搜索](/help/images/workspace-asset-tree.png)

![资产右键菜单](/help/images/workspace-asset-menu.png)

![选择连接参数](/help/images/connect-params.png)

> 所有会话都会被录像和逐条审计，这是堡垒机的合规要求。

## 本地客户端 {#native}

除了浏览器，也可以用本地工具经堡垒机连接，操作同样被审计：

| 协议 | 支持的本地工具 |
|---|---|
| SSH / SFTP | 系统终端、Xshell、SecureCRT、PuTTY、WinSCP、FileZilla、mterminal |
| RDP / VNC | mstsc（Windows）、Windows App（macOS）、FreeRDP（Linux）、mterminal |
| 数据库 | Navicat、DBeaver、DataGrip、HeidiSQL、TablePlus、mysql / psql 命令行、mterminal |

在资产上 **右键 → 本地客户端**，窗口里提供三种方式：

1. **通过 Helper 一键连接**（推荐）：需要安装 Webterminal Helper，见下一节。
2. **下载 .rdp 文件**（RDP / VNC）：双击用 mstsc 或 Windows App 打开。
3. **手动连接信息**：堡垒机地址、端口、登录名和连接命令，可一键复制。
   - SSH：\`ssh -p <端口> 你的用户名@资产IP@<堡垒机地址>\`
   - 数据库：用户名为 \`你的用户名/资产ID\`，密码为你的堡垒机密码。
   - RDP：用户名填 \`你的用户名@资产IP\`（也可以用资产 ID），密码是你的堡垒机密码。客户端会把它拆成"域\\用户"的形式发出来（mstsc、Windows App、FreeRDP、mterminal 都一样），堡垒机两种写法都认。若同一个 IP 上登记了多个资产，用**资产 ID** 更准确。连上后如果你被授权了多个账号，会先出现账号选择界面。


![本地客户端连接窗口](/help/images/native-client-card.png)

**命令行示例**：

\`\`\`bash
# SSH / SFTP：堡垒机用户 alice，资产 web01（也可写资产 IP），指定账号 root 时写 alice/root@web01
ssh -p 2222 alice@web01@bastion.example.com
sftp -P 2222 alice/root@web01@bastion.example.com

# 数据库：用户名为「堡垒机用户/资产 ID」，密码为堡垒机密码
mysql -h bastion.example.com -P 13306 -u alice/12 -p
psql "host=bastion.example.com port=15432 user=alice/13 dbname=postgres"
\`\`\`

RDP：mstsc 的「计算机」填 \`bastion.example.com:3389\`，用户名填 \`alice@win01\`，密码为堡垒机密码。

## Webterminal Helper {#helper}

Helper 是一个很小的本地程序，注册 \`wterm://\` 链接：网页上点一键连接时，它读取一次性令牌并拉起你选择的本地客户端，不需要常驻后台。

- **安装**：连接窗口检测到未安装时会给出下载按钮，自动匹配你的操作系统。「本地下载」来自堡垒机缓存（内网可用，可能不是最新版），「GitHub 最新版」需要能访问外网。
- **首次运行**：安装后运行一次，完成 \`wterm://\` 注册，然后点 **重新检测**。
- **选择客户端**：在 Helper 的设置窗口按协议（SSH / RDP / VNC / DATABASE）选择要拉起的工具。
- **推荐搭配 mterminal**：一个程序管理 RDP / VNC / SSH / SFTP / 数据库标签页，免装多套工具。

## 远程应用 {#remoteapp}

[远程应用 → 我的应用](#/layout/bastion/bastionRemoteApp?tab=portal) 列出管理员发布给你的 Windows 程序（如 Navicat、SSMS、浏览器）。

- 点 **启动**：通过 Helper 以 RemoteApp 方式打开，程序像本地窗口一样出现，而不是整个远程桌面。应用有多个授权账号时先选择账号；管理员也可以允许你手动输入账号。
- 需要支持 RemoteApp（RAIL）的客户端：**Windows App**（macOS）、**mstsc**（Windows）、**FreeRDP**（Linux）。如果 Helper 里 RDP 客户端设成了 mterminal 等不支持的工具，会弹窗提示你改设置。
- 也可以点 **下载 .rdp** 用系统客户端手动打开。
- 没有想要的应用？在同一页点 **申请应用**。


![我的应用](/help/images/remoteapp-portal.png)

## 申请权限 {#request}

看不到需要的资产时：

1. 在连接工作台的空白页点 **申请访问权限**，或到 [工单](#/layout/bastion/bastionTicket) 点 **申请资产授权**。
2. 选择资产、协议、需要的账号（全部账号或指定账号，审批人可能收窄）、动作和时长，写明原因后提交。
3. 审批通过后权限自动生效，到期自动收回；状态可在「工单 → 我的申请」查看。

## 多因子认证 {#mfa}

管理员可能要求登录或连接某些资产时进行二次验证。

- 点右上角头像 → **多因子认证**，用 Google Authenticator、Microsoft Authenticator 等 App 扫码绑定。
- 连接要求 MFA 但你还没绑定时，会提示并提供跳转链接。
- 部分策略使用邮件、短信、企业微信、钉钉或飞书下发的验证码，按提示点「发送验证码」。

![绑定多因子认证](/help/images/mfa-setup.png)

## 工单与消息 {#tickets}

- **工单**：你提交的申请和需要你审批的事项都在 [工单](#/layout/bastion/bastionTicket)，侧栏角标是待你审批的数量。
- **SQL 审批**：高危 SQL（如无条件 UPDATE / DELETE、DDL）被策略拦截时，可直接提交审批，通过后再执行。
- **站内消息**：右上角铃铛图标 显示审批结果、告警等通知。

![申请资产授权](/help/images/access-request-drawer.png)
`,Ai=`# User guide

For operators, developers and DBAs using the bastion day to day. The assets and features you see depend on what administrators have granted you.

## Connection workspace {#workspace}

[Asset Connect](#/layout/bastion/bastionConnect) opens the workspace in a new window (if the browser blocks it, click the button on the page).

- **Asset tree**: only assets granted to you; search by name or IP at the top. Two virtual groups sit above the tree: **Favorites** (star an asset's row to add it, click again to remove; favorites are personal and follow your account) and **Recent** (assets you connected to lately, newest first, with the account used last time).
- **Open a session**: double-click an asset, or hover it and click the connect icon. Pick an account / protocol when there are several — the list only shows the accounts granted to you, plus possibly **Enter manually** (sign in with your own target credentials; one-time, never stored) or **Anonymous** (for credential-less protocols).
- **Kubernetes clusters**: double-click a cluster, then pick the namespace, pod and container to open a container terminal; only namespaces and pods granted to you are listed. It works like an SSH terminal and is recorded and command-filtered the same way.
- **Tabs**: one tab per session; right-click a tab to reconnect, duplicate, or close other / left / right tabs.
- **Input broadcast**: the broadcast icon in the top bar mirrors what you type in one terminal to the other checked SSH tabs — handy for the same operation on many hosts. Every session still goes through its own command filter and audit; uncheck a tab to exclude it. While broadcasting, participating tabs carry an orange broadcast mark and a banner above the terminal names the mirrored sessions, with a Stop broadcast button.
- **Session sharing**: an SSH session's toolbar has a share icon — "Create invite link" mints a one-time link (valid 10 minutes, usable once) to send to a permitted colleague. They open it and click "Join session", landing **read-only**: they see your screen but their keys do nothing. Participants are listed in the share panel; switch on "Can input" to let them type, or the remove button to detach them. The invitee's authorization rule must include the share action or joining is refused. Every invite and participant is dropped when the session ends or the server restarts. **RDP / VNC desktops opened in the browser** can be shared too: the share icon is at the top right of the screen, and a joiner sees the whole desktop at once. On a desktop the switch is **control** — one person operates at a time; handing it to a participant **pauses your own keyboard and mouse** (you are told), and it returns to you when you switch it off or the holder leaves or is removed. Participants get mouse, keyboard and wheel only — no clipboard, no file transfer. Sessions opened in a native mstsc / VNC client cannot be shared.
- **Admin takeover**: under Session audit → Online sessions an admin can "Take over" an SSH session — your input is suspended while the admin operates from their collaboration window, and closing or leaving it returns input to you; your terminal tells you while input is held. Takeover and release are both written to the audit log.
- **SSH**: the toolbar opens an SFTP panel (drag the divider to resize) for uploads and downloads, if your authorization allows them.
- **Remote desktop (RDP / VNC)**: the floating toolbar on the right maps a local folder, mutes audio and disconnects; the clipboard syncs automatically when allowed.
- **Databases**: a SQL console with metadata browsing, completion, explain plans, CSV export and SQL templates.

![Asset tree with search](/help/images/en/workspace-asset-tree.png)

![Asset context menu](/help/images/en/workspace-asset-menu.png)

![Choosing connection parameters](/help/images/en/connect-params.png)

> Every session is recorded and audited — a compliance requirement of the bastion.

## Local clients {#native}

Besides the browser you can connect through the bastion with local tools; they are audited the same way:

| Protocol | Supported local tools |
|---|---|
| SSH / SFTP | System terminal, Xshell, SecureCRT, PuTTY, WinSCP, FileZilla, mterminal |
| RDP / VNC | mstsc (Windows), Windows App (macOS), FreeRDP (Linux), mterminal |
| Databases | Navicat, DBeaver, DataGrip, HeidiSQL, TablePlus, mysql / psql CLI, mterminal |

**Right-click an asset → Local client** offers three ways:

1. **Connect via Helper** (recommended): requires Webterminal Helper, see below.
2. **Download .rdp file** (RDP / VNC): open it with mstsc or Windows App.
3. **Manual connection info**: bastion address, port, login name and command, each one click to copy.
   - SSH: \`ssh -p <port> your-name@asset-ip@<bastion-host>\`
   - Databases: user name \`your-name/asset-id\`, password is your bastion password.
   - RDP: user name \`your-name@asset-ip\` (the asset ID works too), password is your bastion password. Clients rewrite it into the down-level \`domain\\user\` form (mstsc, Windows App, FreeRDP and mterminal all do); the bastion accepts both. Use the **asset ID** when several assets share one IP. If you are authorized for more than one account, an account picker appears first.

![Local client connect dialog](/help/images/en/native-client-card.png)

**Command-line examples**:

\`\`\`bash
# SSH / SFTP: bastion user alice, asset web01 (or its IP); for a specific account write alice/root@web01
ssh -p 2222 alice@web01@bastion.example.com
sftp -P 2222 alice/root@web01@bastion.example.com

# Databases: user name "<bastion user>/<asset ID>", password = your bastion password
mysql -h bastion.example.com -P 13306 -u alice/12 -p
psql "host=bastion.example.com port=15432 user=alice/13 dbname=postgres"
\`\`\`

RDP: in mstsc set Computer to \`bastion.example.com:3389\` and the user name to \`alice@win01\`; the password is your bastion password.

## Webterminal Helper {#helper}

Helper is a small local program that registers \`wterm://\` links: when you click one-click connect it reads a one-time token and launches the client you chose. It does not run in the background.

- **Install**: the connect dialog offers a download matching your OS when Helper is missing. "Local mirror" comes from the bastion's cache (works on internal networks, may lag behind); "Latest on GitHub" needs internet access.
- **First run**: run it once after installing to register \`wterm://\`, then click **Re-check**.
- **Choose clients**: in Helper's settings pick the tool per protocol (SSH / RDP / VNC / DATABASE).
- **Pair it with mterminal**: one program for RDP / VNC / SSH / SFTP / database tabs instead of several tools.

## Remote apps {#remoteapp}

[Remote Apps → My Apps](#/layout/bastion/bastionRemoteApp?tab=portal) lists the Windows programs published to you (Navicat, SSMS, a browser…).

- **Launch** opens the app through Helper as a RemoteApp: it appears as a single local-looking window, not a whole remote desktop. Pick an account when the app rule grants several; the rule may also let you enter an account manually.
- It needs a RemoteApp (RAIL) capable client: **Windows App** (macOS), **mstsc** (Windows) or **FreeRDP** (Linux). If Helper's RDP client is set to something else, such as mterminal, a dialog tells you to change it.
- You can also click **Download .rdp** and open it with your system client.
- Missing an app? Click **Request app** on the same page.

![My apps](/help/images/en/remoteapp-portal.png)

## Requesting access {#request}

When an asset you need is missing:

1. Click **Request access** on the empty workspace, or **Request asset access** under [Tickets](#/layout/bastion/bastionTicket).
2. Choose assets, protocols, the accounts you need (all accounts or specific ones — the approver may narrow them), actions and duration, state the reason and submit.
3. Once approved, access takes effect automatically and expires on time; track it under Tickets → My requests.

![Asset authorization request](/help/images/en/access-request-drawer.png)

## Multi-factor authentication {#mfa}

Administrators may require a second factor to sign in or to connect to some assets.

- Avatar menu (top right) → **MFA**: scan the QR code with Google Authenticator, Microsoft Authenticator or similar.
- If a connection needs MFA and you have not enrolled yet, you are prompted with a link.
- Some policies send a code by email, SMS, WeCom, DingTalk or Feishu — click "Send code".

![Binding MFA](/help/images/en/mfa-setup.png)

## Tickets and messages {#tickets}

- **Tickets**: your requests and the items awaiting your approval are under [Tickets](#/layout/bastion/bastionTicket); the sidebar badge counts items waiting for you.
- **SQL approval**: when a risky statement (UPDATE / DELETE without WHERE, DDL…) is blocked by policy, submit it for approval and run it once approved.
- **Messages**: the bell icon at the top right shows approval results, alerts and other notifications.
`,Ci=`# 管理员手册

面向资产管理员、审批人、审计员和系统管理员。建议先完成 [快速入门](help:quickstart#overview)。

## 角色与分工 {#roles}

系统内置四个角色（首次启动创建，之后可在 [角色管理](#/layout/admin/authority) 调整）：

| 角色 | 职责 | 默认首页 |
|---|---|---|
| **Asset Admin** 资产管理员 | 资产、账号、授权、策略、远程应用、作业中心、全部工单审批 | 概览 |
| **Approver** 审批人 | 审批资产 / 应用授权、SQL、会话、密码查看 | 工单 |
| **Auditor** 审计员 | 会话录像、命令 / SQL / 文件 / 网络记录 | 会话审计 |
| **User** 普通用户 | 连接资产、使用远程应用、提交申请 | 资产连接 |

- 内置角色之后新增的功能菜单（如作业中心）会在升级后补给对应的内置角色一次；管理员之后移除的不会再被加回。
- 权限就是菜单：角色勾选了哪些菜单（含隐藏的页签菜单）就能用哪些功能；审批权限是「工单」菜单下的 \`approve_<类型>\` 按钮。
- **三权分立**（\`bastion.separation-of-duties: true\`）：管理员看不到审计菜单，审计员不能做管理和审批，满足等保 / 合规要求。
- **自我审批**：单管理员部署可开启 \`bastion.ticket.allow-self-approve\`，否则申请人不能审批自己的工单。

## 资产与账号 {#assets}

[资产管理 → 资产与账号](#/layout/bastion/bastionAssetCenter?tab=asset)

- **节点**：左侧树用于分组，授权可以直接授予整个节点，新加入节点的资产自动继承。
- **标签**：资产可带任意多个 \`key=value\` 标签（如 \`env=prod\`、\`team=dba\`），列表可按标签过滤，工作台资产树搜索也匹配标签。授权规则里用「按资产标签」选择器时，凡是带齐所列标签的资产都会动态获得授权——改标签即改授权范围，连接时实时生效，无缓存延迟。因此修改资产的标签或所属节点、导致某条授权开始或不再覆盖它时，会记录 \`asset-scope-change\` 审计；开启三权分立时，只有持有资产授权或应用授权页面的管理员能做这类修改。
- **协议**：一台资产可同时开启多种协议（如 SSH + SFTP，或 RDP + VNC）。
- **托管账号**：密码或 SSH 密钥加密保存；用户连接时堡垒机代填，用户看不到密码。勾选「隐藏凭据」后，用户在连接选择器里只能看到显示名，连用户名也不显示（仅界面层隐藏，审计仍记录真实用户名）。
- **测试连接**：账号行的闪电图标，保存后建议立即测试。
- **查看密码**：出于安全，查看明文密码需要走「账号密码查看」工单，且申请人必须已被授权该账号。
- **改名提醒**：授权按账号名匹配。新建或改名账号时如果命中了现有授权里的账号名，该账号会立即进入授权范围；反过来改名也会让原本匹配的授权失配。保存时界面会列出受影响的规则，确认后才写入，并记录 \`account-identity-change\` 审计；开启三权分立时，只有持有「资产授权」或「应用授权」页面的管理员能做这类修改。

### 账号填写示例：不带域与带域 {#account-examples}

在资产行点「账号」→「新增账号」。**用户名只填用户名本身，域单独填在「域」里**，不要把 \`CORP\\zhangsan\` 或 \`zhangsan@corp.example.com\` 整串写进用户名。

**示例 1：Linux / 数据库 / 网络设备账号（不带域）**

| 字段 | 填写 |
|---|---|
| 账号名称 | \`root\`（界面上显示的名字，可以随意起） |
| 用户名 | \`root\` |
| 密码 | 目标机上的密码 |
| 域 | 留空 |

**示例 2：Windows 本地账号（不带域）**

| 字段 | 填写 |
|---|---|
| 账号名称 | \`Administrator（本机）\` |
| 用户名 | \`Administrator\` |
| 密码 | 本机密码 |
| 域 | 留空 |
| 账号范围 | 本地账号 |

**示例 3：Windows 域账号（带域）**

| 字段 | 填写 |
|---|---|
| 账号名称 | \`张三（CORP 域）\` |
| 用户名 | \`zhangsan\` |
| 密码 | 域密码 |
| 域 | \`CORP\`（NetBIOS 名）或 \`corp.example.com\`（DNS 名），两种都能登录 |
| 账号范围 | 域账号 |

带域与不带域在三个地方表现不同：

| | 不带域 | 带域 |
|---|---|---|
| 授权规则「账号」里怎么写 | \`root\`、\`Administrator\` | \`CORP\\zhangsan\`——**域的写法要和账号里填的一致**：账号填 \`corp.example.com\` 就写 \`corp.example.com\\zhangsan\` |
| 规则里只写 \`zhangsan\` | 匹配同名的无域账号 | **不匹配**，避免把同名本地账号和域账号混为一谈；\`@all\` 两种都匹配 |
| 改密方式（留空自动选） | 按协议选 SSH / WinRM / 数据库 / SMB；只开 3389 的主机可手动选 \`rdp_shell\` 兜底 | 「账号范围」为**域账号**时自动走 LDAP/LDAPS 改域密码（只填了域、范围没选域账号不会走 LDAP），需先在 [系统设置 → 用户同步](#/layout/admin/bastionSettings?tab=userSync) 配好域控和域 CA；\`rdp_shell\` 不支持域账号 |

- 一个域账号要登录多台主机时，在每台资产下各建一个账号（用户名和域相同）；改密时勾选「联动依赖」，其他主机上以该账号运行的服务和计划任务会一起更新。
- 域账号登录远程桌面还需要目标机授予「允许通过远程桌面服务登录」（例如加入 Remote Desktop Users）；登录域控时，普通域用户默认没有这个权限。
- 用户经本地客户端连接时，登录名永远是**自己的堡垒机用户名**加资产（如 \`alice@10.0.0.5\`），不是上面的域账号；堡垒机会按授权代填目标账号，见 [用户手册 → 本地客户端](help:user-guide#native)。


![资产列表与节点树](/help/images/asset-center.png)

![资产的托管账号](/help/images/asset-account-drawer.png)

## 账号改密 {#rotation}

[资产管理 → 账号改密](#/layout/bastion/bastionAssetCenter?tab=rotation)

- 按计划（周期 + 维护窗口）自动修改托管账号密码，并记录每次执行结果。
- **执行凭证**：用于登录目标机执行改密的特权账号（例如 root 或域管理员），可以与被改密账号不同。
- **依赖项**：改密后需要同步更新的服务 / 计划任务 / 应用池，勾选「联动依赖」后一并更新。
- 失败的改密会在概览待办中提示。

### 改密方式及其前置条件 {#rotation-methods}

改密方式可以留空（自动按账号协议选择），也可以指定。新密码只有在**独立校验通过**后才写入凭证库；校验失败一律回滚，并把结果记为失败或"不确定"，不会假报成功。

| 方式 | 适用 | 目标机前置条件 |
|---|---|---|
| \`ssh\` | Linux / 网络设备 | 账号可登录 SSH；校验方式是用新密码重新登录一次 |
| \`winrm\` | Windows 本地账号 | 有 WinRM 监听（推荐 5986 HTTPS，首次连接固定证书）；校验由执行凭证在目标机本地核对 SAM，不要求被改密账号自己能用 WinRM |
| \`ldap\` / \`ldaps\` | 域账号 | 目录源里配置了域控和域 CA；执行凭证有改密权限 |
| \`db\` | 数据库账号 | 执行凭证有修改口令的权限 |
| \`smb\` | Windows / Samba，仅开放 445 | Windows 目标请配置**执行凭证**：自助改密（SAMR）在部分 Windows 版本上会被断开连接，此时改走执行凭证的 \`rpcclient chgpasswd2\`。无法经网关（外部 Samba 工具不走网关路由）。改密自带最小 \`smb.conf\`，不依赖本机 Samba 配置；需要自定义时设 \`BASTION_SMB_CONF\` |
| \`rdp_shell\` | Windows 本地账号，**只开放 3389、没有 WinRM** 时的兜底 | ①目标机允许启动 RemoteApp 程序：\`HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Terminal Server\\TSAppAllowList\\fDisabledAllowList=1\`，或把 powershell.exe 发布为 RemoteApp；被拒绝时改密会直接失败并提示这一项。②被改密账号本身要允许远程桌面登录（例如加入 Remote Desktop Users），因为校验是以该账号做一次 NLA 认证。③命令行会在目标机进程表里短暂出现新密码，所以这是兜底方式，有 WinRM 时优先用 WinRM |

![新增改密策略](/help/images/rotation-policy-drawer.png)

**示例：为 \`winrm\` 方式在目标机上开启 HTTPS 监听（5986）**，以管理员身份在 PowerShell 中执行：

\`\`\`powershell
$cert = New-SelfSignedCertificate -DnsName $env:COMPUTERNAME -CertStoreLocation Cert:\\LocalMachine\\My
New-Item -Path WSMan:\\localhost\\Listener -Transport HTTPS -Address * -CertificateThumbPrint $cert.Thumbprint -Force
New-NetFirewallRule -DisplayName "WinRM HTTPS" -Direction Inbound -Protocol TCP -LocalPort 5986 -Action Allow
\`\`\`

**示例：为 \`rdp_shell\` 方式允许启动远程程序**，以管理员身份执行：

\`\`\`bat
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Terminal Server\\TSAppAllowList" /v fDisabledAllowList /t REG_DWORD /d 1 /f
\`\`\`

## 结构迁移 {#migration}

[资产管理 → 结构迁移](#/layout/bastion/bastionAssetCenter?tab=migration) 对比两个数据库资产的表结构，生成差异 SQL；执行需要审批。

操作步骤：点 **新建**，填写版本号、选择数据库资产，写好执行 SQL 和回滚 SQL；提交审批后，审批通过才能执行，执行失败可用回滚 SQL 撤销。

![新建结构迁移](/help/images/migration-drawer.png)

## 网关 {#gateway}

[资产管理 → 网关](#/layout/bastion/bastionAssetCenter?tab=gateway)

资产在堡垒机直连不到的隔离网段里（另一个机房、客户内网、只出不进的网络）时，在那个网段里运行一个**网关代理**。代理主动用 HTTPS（WebSocket）连回堡垒机控制台的同一个端口，不需要在隔离网段开放任何入站端口；堡垒机访问该网段资产的所有连接都经它转发。

1. **新建网关**：填名称后保存，弹出部署说明，里面有**只显示一次**的令牌和堡垒机网关主机密钥指纹。令牌丢失只能「重置令牌」，旧令牌立即失效，在线代理被断开。
2. **部署代理**：在部署说明里填**允许代理访问的网段**（必填），多个用逗号分隔，可带端口（如 \`10.1.0.0/16:22\`、\`10.2.0.0/16:1433-1521\`）。没列出的地址一律拒绝；回环和链路本地地址（含云主机元数据 \`169.254.169.254\`）即使写了 \`0.0.0.0/0\` 也不放行，必须单独写明。代理名称可选，默认用主机名。点「生成一键安装命令」，在网关主机上执行 Linux 或 Windows 的那一行命令即可，见下方[一键安装](help:admin-guide#gateway-install)。也可以用 Docker 或手动运行二进制。代理会校验指纹，连到的不是这台堡垒机就拒绝连接。
3. **绑定资产**：在节点上选网关，节点及下级节点里的资产都经它访问；资产的「网络路由」可选**继承节点**（默认）、**直连**或**指定网关**。资产列表的「网络路由」列显示实际生效的路由。修改资产路由会记录 \`asset-route-change\` 审计。
4. **状态**：列表显示在线代理数，展开可看每个代理的主机名、来源 IP、版本、放行范围和活动连接数。同一个网关可以运行多个代理互为备份，堡垒机轮流使用。

![网关列表与在线代理](/help/images/gateway-list.png)

- **失败关闭**：资产绑定的网关离线、停用或配置不完整时，连接直接失败，**不会**回退成直连——即使堡垒机本身能连到那个地址。
- 所有协议（SSH、RDP/VNC、Telnet、FTP、六种数据库、Web 终端）以及改密、测试连接都走网关。FTP 主动模式会自动转成上游被动模式。**SMB 改密**调用外部 Samba 工具，无法经网关，网关后的资产请改用 WinRM 或 RDP 改密方式。
- 网关的增删改、重置令牌、代理上线/下线都写入审计；令牌在库里只保存哈希。配置迁移会带上网关和绑定关系，但不带令牌，导入后需要在新实例上重置令牌再部署代理。

### 一键安装代理 {#gateway-install}

做法和 openrport 的 pairing 一样：堡垒机生成一个**安装码**，一条命令就能在网关主机上完成下载、校验、配置、注册服务和启动。

| | Linux | Windows |
|---|---|---|
| 怎么执行 | 以 root 执行 \`curl -fsSL '…/install.sh' \\| sudo sh\` | 以管理员身份打开 PowerShell，粘贴生成的那一行 |
| 系统要求 | x86_64 / aarch64，systemd 或 OpenRC（含 Alpine），有 curl 或 wget | Windows Server 2016 / Windows 10 及以上（x64 / ARM64） |
| 程序 | \`/usr/local/bin/bastion-gateway\` | \`%ProgramFiles%\\BastionGateway\\bastion-gateway.exe\` |
| 配置（含令牌） | \`/etc/bastion-gateway/gateway.conf\`，\`root:bastion-gateway 0640\` | \`%ProgramData%\\BastionGateway\\gateway.conf\`，只有 SYSTEM、管理员和服务账号可读 |
| 服务 | \`bastion-gateway\`，以专用低权限用户 \`bastion-gateway\` 运行，开机自启，systemd 下带沙箱限制 | \`BastionGateway\`，以 \`LocalService\` 运行，开机自启，失败自动重启 |
| 日志 | \`journalctl -u bastion-gateway\`（OpenRC：\`/var/log/bastion-gateway/gateway.log\`） | \`%ProgramData%\\BastionGateway\\gateway.log\` |

- **安装脚本做的事**：识别 CPU 架构，从**堡垒机本身**下载对应的代理程序（不依赖外网），校验 SHA-256，写配置，注册并启动服务，最后等到堡垒机看到这台代理上线才报成功；60 秒内没上线会打印最近的日志。重复执行即升级代理并改写配置。
- **安装码**：1 小时内有效，可在多台主机上使用（同一网关部署多台代理做冗余）。同一网关只有一个有效安装码：重新生成、重置令牌、停用或删除网关后旧命令立即失效。生成安装码必须持有当前令牌，所以只能在新建网关或重置令牌后的部署说明里生成。
- **安全**：命令和脚本里含令牌，不要外传或保存。安装码错误次数过多的来源 IP 会被暂时封禁；每次生成和下载安装脚本都写审计（\`gateway-pairing-create\`、\`gateway-pairing-fetch\`）。控制台用 HTTPS 自签名证书时，勾选「堡垒机使用自签名证书」：代理仍用主机密钥指纹认证堡垒机，但安装脚本本身的下载不再校验证书，只建议在可信网络里使用。
- **命令里的地址**取自你打开控制台用的地址。网关主机要能访问这个地址；如果你是用内网 IP 或 localhost 打开的控制台，请改用网关主机能访问的域名打开控制台后再生成。
- **安装包**：服务器镜像自带 Linux 和 Windows（amd64 / arm64）的代理程序；源码部署时执行 \`make gateway-dist\`，生成到 \`server/gatewaydist\`（可用 \`BASTION_GATEWAY_DIST_DIR\` 指定其他目录）。缺少某个平台的安装包时，部署说明会提示。
- **卸载**：部署说明底部「卸载代理」里有 Linux 和 Windows 的卸载命令，会删除服务、程序、配置（含令牌）和日志。网关本身仍保留在控制台里。

## 资产授权 {#authorization}

[访问控制 → 资产授权](#/layout/bastion/bastionAccessControl?tab=authorization)

- 一条授权 = 用户 / 用户组 × 资产 / 节点 × 协议 × 账号 × 动作 × 有效期。**账号是必填维度**：用户对资产只有连接权还不够，还必须被授权某个具体账号。
- **授权账号**分两部分，至少授予一项：
  - **纳管账号**（堡垒机保管凭据的账号）：
    - 「全部账号」：目标资产上所有纳管账号，以后新增的也包含；
    - 「指定账号」：按账号名（不区分大小写）选择，域账号写成 \`域\\用户名\`（如 \`CORP\\administrator\`，单写 \`administrator\` 只匹配本地账号）；也可以选 [账号组](help:admin-guide#account-group)，或勾选「同名账号」——自动匹配与用户登录名相同的账号，但不会匹配特权账号；
    - 「不授予」：只允许下面的其他登录方式。
  - **其他登录方式**（不使用堡垒机保管的凭据，可与纳管账号同时授予）：
    - 「手动输入账号密码」：用户连接时自己输入目标账号和密码，用于应急场景。凭据只用一次、不保存，但能登录哪个账号取决于用户知道哪个密码，建议搭配 MFA 或有效期；
    - 「匿名登录」：无需凭据，仅 Redis、MongoDB、VNC 协议可用。
- **动作**：按最小权限勾选。「连接」是前提，没有它其他动作都不生效。各动作管控的操作：

  | 动作 | 管控的操作 |
  |---|---|
  | 上传 | SFTP 上传与修改权限（chmod）、scp / rsync 上传、终端 rz（ZMODEM）、FTP 上传与 \`SITE CHMOD\`、RDP 目标机读取用户本机的文件（网页「映射文件夹」和原生客户端的磁盘映射）、作业中心文件分发 |
  | 下载 | SFTP 下载、scp / rsync 下载、终端 sz、FTP 下载、RDP 目标机在用户本机的映射文件夹里写入、新建、重命名或删除文件 |
  | 删除 | SFTP / FTP 删除文件和目录 |
  | 重命名/新建 | SFTP / FTP 重命名、新建目录、创建链接和服务端复制 |
  | 剪贴板粘贴 | 剪贴板从本地到远端（RDP / VNC，网页与原生客户端） |
  | 剪贴板复制 | 剪贴板从远端到本地（RDP / VNC，网页与原生客户端） |
  | 协作共享 | 作为被邀请人加入他人的共享会话 |
  | 端口转发 / 远程端口转发 / X11 / SSH Agent | 原生 SSH 的 \`-L\`/\`-D\`、\`-R\`、\`-X\`、\`-A\`（另需在系统设置中开启端口转发） |

  上传和下载都没有时，网页 RDP 不提供「映射文件夹」，目标机上也看不到这个盘。RDP 剪贴板里复制文件需要同时有上传和下载。原生 SSH 不能用 exec 方式启动 sftp-server，请用 SFTP 子系统。动作管控的是专门的传输通道：能执行命令的用户仍可以用 \`cat\`、\`base64\` 等命令在终端里搬运内容，需要时配合命令过滤。数据库协议只看「连接」，读写由 SQL 规则和策略控制。
- **限定数据库**：数据库资产可再收窄到库 / Schema 清单，会话内切换库越界会被拦截。这是界面层收窄，真正的库级隔离仍取决于数据库账号自身权限。
- 授权给用户组时，组内成员及其下级组成员都生效。
- 多条授权命中同一连接时取账号与动作的并集，策略取最严格的值。
- 用户自助申请通过后会生成临时授权，到期自动失效。


![新增授权规则](/help/images/authorization-drawer.png)

## 应用授权 {#app-authorization}

[访问控制 → 应用授权](#/layout/bastion/bastionAccessControl?tab=appAuthorization)

远程应用的授权与资产授权共用同一套规则：一条应用授权 = 用户 / 用户组 × 应用 × 账号 × 有效期。

- 客体选择已发布的应用；账号维度的含义与资产授权相同（全部 / 指定 / \`@self\` / \`@input\` / 账号组），应用规则隐含该应用所在资产与 RDP 协议。
- 应用发布页上的「授权」按钮会直接跳到本页签并为该应用预建规则。
- 用户在「我的应用」里只能看到并启动被应用授权覆盖的应用，也只能用授权范围内的账号启动。
- 应用规则与资产规则互不匹配：授权应用不等于授权这台机器的远程桌面，资产授权也不能用来启动应用。
- 剪贴板、上传、下载等动作设置对应用会话同样生效。
- 应用授权限制的是入口，不是桌面隔离：Alternate Shell 模式下用户可能经程序的「打开文件」对话框跳出。敏感服务器请用 RemoteApp 模式并配合 AppLocker。

![新增应用授权](/help/images/app-authorization-drawer.png)

## 账号组 {#account-group}

[访问控制 → 账号组](#/layout/bastion/bastionAccessControl?tab=accountGroup)

账号组把分布在不同资产上的同名账号聚合成一个集合（例如所有资产上的 \`app\` 服务账号），在授权的账号维度里整组引用。

### 账号组与用户组的区别 {#account-group-vs-user-group}

一条授权规则回答的是「**谁** × **能访问哪些资产** × **用哪个账号登录** × 协议 / 动作 × 有效期」。两种组分别作用在不同的维度上：

| | 用户组（系统管理 → 用户组） | 账号组（访问控制 → 账号组） |
|---|---|---|
| 成员是什么 | 堡垒机用户（登录堡垒机的人） | 目标资产上的登录账号，如 \`root\`、\`app\`、\`CORP\\svc-backup\` |
| 在规则里填在哪 | 授权对象（主体） | 授权账号（账号维度） |
| 成员怎么定 | 手工添加或由 LDAP / AD 同步，可以有上下级，授权给上级组时下级组成员也生效 | 按账号身份匹配，跨所有资产生效：任何资产上新建同一身份的账号，自动算进组 |
| 改了组会怎样 | 组里加一个人，这个人就拿到该组的全部授权 | 组里加一个账号身份，所有引用这个组的规则就多允许一个账号 |

通常两者配合使用：**用户组管人，账号组管账号**，例如「开发用户组 × 应用服务器节点 × 普通应用账号组 × SSH」。

### 使用场景 {#account-group-scenarios}

- **规则只写一次**：运维要能用 \`app\`、\`deploy\`、\`appadmin\` 三个账号登录所有应用服务器。建一个「应用运维账号」组放这三个账号，资产授权和应用授权都引用它；以后要加 \`appops\`，只改组，所有规则一起生效。
- **按权限高低分开授**：同一批机器上，开发只能用 \`app\` 这类普通账号，DBA 能用 \`oracle\`、\`postgres\`。建「普通应用账号」「数据库管理账号」两个组，分别授给开发用户组和 DBA 用户组。规则一目了然，也避免为了省事写 \`@all\` 而把 \`root\` 一起放出去。
- **域服务账号统一引用**：\`CORP\\svc-backup\`、\`CORP\\svc-monitor\` 这类域账号分布在几十台 Windows 主机上，用账号组统一引用；新主机建好同一域账号后自动被覆盖。
- **共享账号退役**：某个共享账号要停用时，从组里移除即可，所有引用它的规则当场不再允许它，不用逐条翻规则。

### 规则与注意事项 {#account-group-rules}

- **按账号身份匹配**：成员填写的是账号的**用户名**（域账号为 \`域\\用户名\`），不是资产账号的显示名称。不带域的成员只匹配无域账号，\`域\\用户名\` 只匹配该域的账号，域的写法要和账号上填的一致（\`CORP\` 与 \`corp.example.com\` 视为不同），详见 [账号填写示例](help:admin-guide#account-examples)。
- **只管账号，不管资产**：账号组决定"能用哪些账号"，能访问哪些资产仍由规则里的资产、节点或标签决定。规则覆盖的资产上恰好有组内的账号，才会被允许。
- **改组等于改授权**：修改成员会同时改变所有引用它的规则的账号范围，请像修改授权一样谨慎，操作会写审计（\`update-account-group\`）；能改账号组的是持有「账号组」页面的角色，请按授权管理员来分配这个页面。
- 规则按组 ID 引用，组改名不影响规则；被规则引用的账号组不能删除，先在规则里去掉引用。
- 只用到一两个账号的规则，直接在规则里写账号更直观，不必建组。

![新建账号组](/help/images/account-group-drawer.png)

## 访问策略 {#policy}

[访问控制 → 访问策略](#/layout/bastion/bastionAccessControl?tab=policy) 在授权之上附加条件：

- **IP 白名单**：只允许指定 IP / CIDR 发起连接；
- **二次认证**：身份验证器（TOTP）、下发验证码（邮件 / 短信 / 企业微信 / 钉钉 / 飞书）或 RADIUS；
- **强制录像**、**屏幕水印**（文本、透明度、角度、密度可调）；
- **会话限制**：最长会话时长、最长空闲时间、并发会话上限；
- **数据库**：Web 终端只读、单次最多返回行数。

策略绑定到授权上生效；连接前需要人工审批的场景使用工单中的「会话审批」。


![新增访问策略](/help/images/policy-drawer.png)

## 命令过滤 {#command-filter}

[访问控制 → 命令过滤](#/layout/bastion/bastionAccessControl?tab=command) 对 SSH / SFTP 会话逐条匹配命令。每条规则有优先级、作用范围（SSH / SFTP）、匹配方式（正则 / 精确）和动作：

- **拒绝**：直接阻断，并实时告警。
- **复核**：暂停该会话的输入，用户终端提示“等待复核”；审批人在 [工单 → 待我审批](#/layout/bastion/bastionTicket?box=todo) 中看到完整命令，通过后命令照原样执行，驳回、超时（默认 2 分钟）或用户断开则丢弃。不能审批自己的命令。Telnet 和 SFTP 路径规则无法暂停，复核按拒绝处理。
- **告警**：允许执行，但记录并实时告警，适合需要事后关注的敏感命令。
- **允许**：放行，用于在拒绝 / 复核规则之前开白名单。

匹配既看用户输入的内容，也看终端回显（覆盖 Tab 补全、历史命令）；粘贴多行命令时逐行检查。编辑键（↑、Tab、Ctrl-R 等）与回车在终端刷新前一起到达时，无法确定实际执行的命令，按拒绝处理并提示重新输入。命中会记录在「命令记录」并计入概览的拦截统计。


![命令过滤规则](/help/images/command-filter.png)

## 批量作业 {#job}

[批量作业](#/layout/bastion/bastionJob) 把一条 SSH 命令或一个文件批量下发到多台资产：选择作业类型，填入命令或选择文件，勾选一组「资产 + 账号」目标（最多 200 个）后执行，各目标并行、互不阻塞。

- **分发文件**：单个文件（最大 100 MB）经 SFTP 写入每个目标的「目标路径」——留空表示账号主目录下的同名文件，以 \`/\` 结尾表示目录；已存在的文件会被覆盖。目标需在授权中开放 sftp 协议并勾选「上传」动作，SFTP 路径过滤规则同样生效；每次写入记入 SFTP 事件日志，结果中显示写入字节数与 SHA-256。文件内容先按「SSH 代理 → SFTP DLP」关键字 / 正则检查，阻断模式下命中则整个作业被拒绝并写审计。Linux（OpenSSH）与 Windows（Win32-OpenSSH）目标均支持。
- **只开放 RDP 的 Windows 资产**：资产协议没有 ssh、只有 rdp 时，目标经无界面 RDP 登录执行（下拉中标注「RDP」）：堡垒机以账号凭据登录，通过重定向盘下发 Session Probe 代理，代理在账号的用户目录下以 \`cmd /c\` 运行命令，回传输出（按目标代码页转为 UTF-8）和退出码后**注销会话**。授权需开放 rdp 协议（分发文件另需「上传」动作），命令过滤同样生效，审计记为 \`rdp-exec\` / \`rdp-upload\`。限制：使用 cmd 语法、命令不超过 1000 个字符；分发文件经只读重定向盘 \`copy /Y\` 写入、以 \`certutil\` 校验 SHA-256，路径用 Windows 格式，不支持 \`"\` 与 \`%\`。这是一次真实的交互式登录：建议使用专用作业账号（可能接管同一账号已断开的会话），目标组策略禁止驱动器重定向时会失败。支持 Windows 7 / Server 2008 R2 至 Windows 11 / Server 2022；未激活或登录时弹出模态窗口（如「激活期限已过」）会阻止代理启动。
- **取消**：执行中的作业可在列表或结果页「取消作业」——未开始的目标不再执行，执行中的目标断开连接（RDP 目标注销会话，正在运行的进程随之结束；命令可能已在主机上产生效果），作业状态为「已取消」并写审计 \`job-cancel\`。
- **中断**：堡垒机重启或执行节点失联时，未完成的目标标记为「已中断」（主机上的结果未知），作业关闭、相关会话结束；多副本部署下只处理心跳超时的作业。

- **权限**：目标下拉只列出你能通过 SSH 访问的资产与账号；「批量添加」可一次选多台资产并按账号名（如 root）添加。每个目标分别走授权校验（用户 × 资产 × 账号 × ssh 协议，按创建者的真实来源 IP 评估 IP 白名单 / 地域规则）和命令过滤——命中拒绝规则的目标记「被拦截」，命中复核规则的目标进入审批等待（审批通过后继续执行），未授权记「拒绝」，都不影响其他目标。
- **访问策略**：与交互式连接一致——策略要求双因素时，提交作业前会要求输入一次验证码（对本次全部目标有效）；策略要求会话审批时，该目标显示「等待审批」，审批通过后才执行，被拒记「已拒绝」。执行前会弹窗确认目标数量和命令。
- **主机指纹**：作业与「测试连接」首次连接目标时记录 SSH 主机指纹，之后指纹变化即拒绝连接（防止凭据发往冒充的主机）；主机确实重装后，在账号的「测试连接」提示里清除指纹即可。
- **执行通道与命令语言**：每个目标按 SSH → WinRM → RDP 选择资产已登记且你已被授权的通道（见 [执行通道](help:admin-guide#channel)）；「命令语言」（cmd / PowerShell）决定命令由谁解释，与通道无关。
- **可见范围**：作业及其输出只对创建者本人可见；拥有「在线会话」审计菜单的角色可查看全部作业。
- **结果**：逐目标显示状态、退出码、输出与错误信息，作业行汇总 完成 / 失败 / 被拦截 计数；点开作业可看到每个目标的明细和会话号。
- **审计**：每个目标是一个独立的 \`job\` 类型会话，各自写审计记录（被拦截目标同样有 \`ssh-exec\` 阻断记录），可在会话审计中追溯。

![批量作业](/help/images/job.png)

### 定时作业 {#job-schedule}

点 **新建作业**，勾选 **定时作业**，表单会换成定时作业的设置（在「定时作业」页签里点新建作业时已默认勾选），按 Cron 表达式周期执行一条命令。已保存的定时作业在「定时作业」页签里管理：查看下次执行时间、上次结果和执行历史，暂停 / 恢复、立即执行一次、编辑、删除。分发文件暂不支持定时。

定时作业**在无人值守时以创建人的身份执行**，因此规则比一次性作业更严：

- **每次执行都重新检查**：每次执行都会生成一个普通作业，每个目标按创建人**当时的**授权、访问策略和命令过滤重新判定。授权被收回、账号被删、规则改成拒绝，下一次执行对应目标就记「拒绝」或「被拦截」，不会沿用保存时的结论。
- **不能等人的目标不允许设为定时**：访问策略要求会话审批、或每次连接都要多因子认证的目标，保存时直接被拒绝，弹窗逐个列出原因；命令命中「复核」规则的目标同样不能保存。保存之后规则才变化的，执行时命中复核**按拒绝处理**，需要审批或多因子的目标记「拒绝」——不会生成审批工单、也不会挂起等待。
- **必须有截止时间**：最长一年，到期自动变为「已到期」。创建人被停用或删除后，其全部定时作业自动变为「已停用」，并通知管理员，不会继续以离职人员的名义执行。
- **频率下限**：最短每 5 分钟一次；含只开放 RDP 的目标时最短 30 分钟（每次都是一次完整的交互式登录）。Cron 为标准 5 段（分 时 日 月 周），按所选时区计算，编辑时会预览接下来几次执行时间。
- **不重叠、不补跑**：上一次还没执行完又到点时跳过本次（「已跳过」）；堡垒机停机期间错过的执行不会在恢复后补跑，只记一次「已错过」。多副本部署下，同一次执行只会在一个副本上运行。
- **谁能操作**：只有创建人能编辑、恢复和立即执行（作业以其身份运行）；拥有「在线会话」审计菜单的角色可以查看、暂停和删除他人的定时作业。
- **告警与审计**：开始失败时（以及恢复成功时）通知创建人和管理员并推送告警渠道，连续失败不会每次都发；创建、修改、暂停、恢复、删除、每次执行、跳过、错过、到期、停用都写审计（\`job-schedule-*\`）。执行记录与作业历史一起，按「数据保留」中操作审计的天数清理。

## 执行通道 {#channel}

[资产管理](#/layout/bastion/bastionAssetCenter?tab=asset) → 某资产 → 更多 → **执行通道**：作业中心在这台资产上执行命令走哪条通道。

- **为什么重要**：只登记了 RDP 的 Windows 资产，作业要走一次完整的交互式登录（约 10 秒，可能接管同一账号已断开的会话，登录时的模态窗口会卡住它）。同一台机器往往也跑着 OpenSSH 或 WinRM，执行一条命令不到一秒，也不打扰正在使用的人。
- **探测**：点「立即探测」只连接该资产自己的 SSH、WinRM、RDP 端口并读取协议问候，**不发送任何凭据**，不会导致账号锁定。也可在 系统设置 → 资产巡检 里开启定期探测（默认关闭，建议每天一次）。
- **采纳**：探测结果只是建议。点「采纳」会把该协议写入资产，弹窗先列出**哪些已有授权规则会因此开始在这台资产上授予该协议**；开启三员分立时只有负责资产授权的角色能做这一步。每次采纳都有审计。不想再看到某个建议可以点「不再建议」。巡检里也有「自动采纳」开关——省事，但会自动改变授权覆盖面。
- **选择顺序**：作业按 SSH → WinRM → RDP 选，只在资产已登记、且执行者已被授权的协议里选。资产上的「命令通道」可以固定为某一条（某个服务不稳定时有用）。
- **WinRM 的两种监听器**：HTTPS（5986）会在首次使用时固定证书，之后证书变化即拒绝执行，主机确实换证后点「清除固定」（有审计）。明文 HTTP（5985）默认不可用：需要在该资产上点「接受风险」（凭据和内容由 NTLM 消息加密保护，但连接本身是明文，且该资产必须不经网关直连），更推荐的做法是在主机上启用 5986。
- **账号级验证**：在资产的账号列表里点「验证通道可用性」，会用保存的凭据在每条通道上登录一次，确认该账号在新通道上真的可用，并记录命令由哪个 shell 解释。这是真实登录，每次都有审计；RDP 不参与验证。
- **命令语言**：作业表单里的「命令语言」（cmd / PowerShell）决定命令由谁解释，与通道无关——同一条作业在 SSH、WinRM、RDP 上行为一致。

在 Windows 上开启 WinRM HTTPS 监听的命令见 [账号改密](help:admin-guide#rotation) 一节的示例。

## Kubernetes 集群 {#k8s}

把 Kubernetes 集群作为资产，让运维人员通过堡垒机进入容器终端（\`pods/exec\`），全程录像、命令过滤，不必分发 kubeconfig。

- **资产**：协议选 **Kubernetes**，地址和端口填 API Server（默认 6443）。经网关的集群同样走网关。
- **账号**：一个账号对应一个 ServiceAccount。「ServiceAccount 令牌」填 \`kubectl create token <sa>\` 生成的令牌；该 SA 至少需要 \`pods\` 的 get / list 和 \`pods/exec\` 的 **get** 权限（列出全部命名空间还需 \`namespaces\` 的 list）。「集群 CA 证书」可选：填写后按该 CA 校验 API Server；不填则**首次连接时固定 API Server 证书**，之后证书变化即拒绝连接（确认集群换证后重置账号的主机指纹即可重新固定）。
- **授权**：规则勾选 Kubernetes 协议后多出两项——**命名空间**（只能在这些命名空间打开终端，留空为全部）和 **Pod 标签选择器**（与 \`kubectl -l\` 相同的写法，如 \`app=web,tier!=db\`、\`env in (prod,stage)\`，留空为所有 Pod）。选择器按 Pod **当前**的标签实时判断；多条规则取并集。这是在 ServiceAccount 自身 RBAC 之上的再次收窄，两者都允许才可进入。
- **会话**：与 Web SSH 终端一致——访问策略（双因素、审批、时段、并发）、命令过滤、asciicast 录像与回放、在线监控、会话共享和管理员接管都适用；会话记录里协议显示为 k8s。
- **限制**：终端使用 pods/exec 的 WebSocket 通道（channel.k8s.io），不提供文件传输和端口转发；镜像里没有 \`sh\` 的容器（如 distroless）无法打开终端。

**示例：创建 ServiceAccount 并授予所需权限**（命名空间、名称按需修改）：

\`\`\`yaml
apiVersion: v1
kind: ServiceAccount
metadata: { name: bastion-exec, namespace: default }
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata: { name: bastion-exec }
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["get", "create"]
  - apiGroups: [""]
    resources: ["namespaces"]
    verbs: ["list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata: { name: bastion-exec }
roleRef: { apiGroup: rbac.authorization.k8s.io, kind: ClusterRole, name: bastion-exec }
subjects:
  - { kind: ServiceAccount, name: bastion-exec, namespace: default }
\`\`\`

然后生成令牌，填入账号的「ServiceAccount 令牌」：

\`\`\`bash
kubectl apply -f bastion-exec.yaml
kubectl create token bastion-exec -n default --duration=8760h
\`\`\`

\`pods/exec\` 必须有 \`get\`：堡垒机通过 WebSocket 建立 exec，API Server 按 \`get\` 鉴权（已在 Kubernetes 1.32 上实测，只给 \`create\` 会返回 403）。\`create\` 是 \`kubectl exec\` 走 SPDY 时需要的，同一个 ServiceAccount 也给 kubectl 用时保留即可。

## SQL 过滤与配额 {#sql-filter}

[访问控制 → SQL 过滤](#/layout/bastion/bastionAccessControl?tab=sql)

- 规则类型覆盖自定义正则、敏感表，以及数十种内置检查：UPDATE / DELETE 必须带 WHERE、禁止 TRUNCATE / DROP、禁止 SELECT *、DDL 命名与主键规范、执行计划扫描行数等。
- 级别：**错误**（阻断）、**警告**（放行并记录）、**需审批**（生成 SQL 审批工单，通过后执行）。
- **SQL 配额**：限制用户的查询频率（QPS）和每日返回行数，防止批量拖库。
- 被执行的变更可在「SQL 回滚」中生成反向语句。


![SQL 过滤规则](/help/images/sql-filter.png)

## 数据脱敏 {#masking}

[访问控制 → 数据脱敏](#/layout/bastion/bastionAccessControl?tab=masking) 按库 / 表 / 列设置脱敏规则，方式有全部遮蔽、部分遮蔽（两侧保留 N 个字符）和 SHA-256 哈希前缀；查询结果在代理层遮盖，原始数据不出堡垒机。

**示例**：列匹配 \`phone|mobile\`、方式 \`partial\`、保留 3 个字符时，\`13812345678\` 显示为 \`138*****678\`；方式 \`hash\` 时显示为哈希前缀，同一个值始终得到相同结果，仍可用于比对。

![添加脱敏规则](/help/images/masking-rule-drawer.png)

## 应用发布 {#publish}

[远程应用 → 应用发布](#/layout/bastion/bastionRemoteApp?tab=publish)

- 选择一台 Windows 资产作为应用服务器，点 **扫描应用** 自动发现已安装程序，或手动填写程序路径。
- **RemoteApp 模式**：需要目标机开启 RemoteApp 并登记别名（\`||别名\`），用户端显示为单个应用窗口。
- **Alternate Shell 模式**：不需要服务器端配置，以程序代替桌面外壳启动，兼容性更好。
- 发布、修改需要变更工单审批。发布后点应用行的 **授权** 跳转到 [应用授权](help:admin-guide#app-authorization) 为它建立授权规则，被授权的用户才能在「我的应用」里看到并启动。

![发布应用](/help/images/publish-app-drawer.png)

## 会话审计 {#audit}

[会话审计](#/layout/bastion/bastionSessionAudit)

- **在线会话**：实时监控画面 / 终端，必要时强制断开。Web 终端打开的 SSH、RDP、VNC 会话额外提供**接管**按钮（原生客户端会话不支持）：接管会挂起原用户的输入（原用户终端会收到提示）并把控制权交给管理员（在新窗口中以协作终端接入），管理员关闭窗口、断网或离开即自动归还。接管者自己必须有该资产、该账号的连接授权，并满足自己的访问策略（要求双因素时需输入验证码；要求会话审批的策略不能接管）；开启三员分立后接管不可用，审计角色只能旁观；接管、释放与用户侧的会话共享邀请 / 授权 / 移除全部记入审计日志。共享邀请为一次性、10 分钟有效、随会话结束或重启失效；加入方需其授权规则勾选「协作共享」动作。RDP / VNC 桌面共享时控制权是独占的：交给参与者即挂起所有者输入，每次交出 / 收回都以「交出控制权」「收回控制权」写入审计日志，可与录像时间轴对照，分辨每段操作由谁完成；参与者不会收到所有者的剪贴板、音频与文件传输内容（会话监控同样只看到画面）。
- **会话记录**：回放 SSH、RDP、VNC、数据库会话，时间线可跳转到具体命令。
- **活动检索**：跨会话搜索命令、SQL、文件传输和网络访问记录，支持按用户、资产、结果筛选。网络访问记录的是 SSH 端口转发，见[SSH 端口转发与网络访问](help:admin-guide#port-forward)。
- 可选：开启 OCR 后，图形会话画面中的文字也能被检索。
- **防篡改**：操作记录和 SQL 记录都写入带密钥的哈希链，会话结束时录像文件会被封存（记录 SHA-256 并写入审计链）。
  - 在「操作记录」点 **完整性校验**：逐条校验两条审计链，能定位被修改、删除、隐藏或截断的具体记录；每次校验本身也会记入审计。
  - 回放录像时，标题旁显示校验结果：**录像完整**、**录像校验失败**（文件被改动、替换或丢失，或数据库中的封存值被改），或 **未封存**（启用封存前的旧录像）。
  - **数据保留**：在「操作记录」点 **数据保留** 设置会话录像、操作记录（含网络访问与文件传输事件）、已归档 SQL 记录各保留多少天（0 为永久，否则至少 30 天），每天自动清理。清理会作为一条「数据保留清理」记入审计链，完整性校验照常通过；而绕过策略直接删除记录仍会被校验发现。日志外发尚未送达的记录不会被清理。被清理的录像在回放时显示「已按保留策略清理」。此设置属于审计职责，开启三权分立时由审计员维护。
  - 审计密钥保存在后端工作目录的 \`.bastion_audit_key\`（也可用环境变量 \`BASTION_AUDIT_KEY\` 指定），请和凭据密钥 \`.bastion_key\` 一起备份。密钥丢失后历史记录将无法校验。


![操作记录检索](/help/images/audit-activity.png)

## SSH 端口转发与网络访问 {#port-forward}

[系统设置 → SSH 代理](#/layout/admin/bastionSettings?tab=native) · [会话审计 → 操作记录 → 网络访问](#/layout/bastion/bastionSessionAudit?tab=activity)

用户用原生 SSH 客户端经堡垒机（默认端口 2222）登录资产时，可以做端口转发：

| 用法 | 含义 | 典型场景 |
|---|---|---|
| \`ssh -L 15432:127.0.0.1:5432 …\` | 本地转发：用户电脑上的端口，经资产连到资产能访问的服务 | 用本地数据库客户端连资产上的 PostgreSQL；访问只在内网开放的管理页面 |
| \`ssh -D 1080 …\` | SOCKS 代理：浏览器等程序经资产访问多个地址（OpenSSH 用的也是本地转发） | 临时浏览资产所在网络的多个 Web 服务 |
| \`ssh -R 9090:localhost:8080 …\` | 远程转发：**在目标主机上**开 9090 端口，目标主机上的程序经它连回用户一侧 | 给不能上网的服务器临时提供软件源；远程调试回连 IDE |

**需要同时满足的条件**

1. 系统设置里的总开关：「本地端口转发（-L / -D）」「远程端口转发（-R）」，默认都关闭。
2. 授权规则勾选了「端口转发」（-L / -D）或「远程端口转发」（-R）动作，默认不授予。
3. 转发目标在允许范围内：
   - **-L / -D 默认只能连资产本身**（资产自己的地址、localhost、127.0.0.1）。否则拿到一台主机的转发权限，就等于能经它访问它所在网络的所有主机。
   - 需要访问其他地址时，在「转发目标白名单」里列出：网段或 IP，可带端口，如 \`10.1.0.0/16:3306\`、\`10.2.0.5\`、\`10.3.0.0/24:8000-8100\`。
   - 主机名（\`db.corp\`、\`*.svc.corp:443\`）要单独列出，因为名字由目标主机解析，堡垒机无法事先判断它指向哪里。
   - 写 \`*\` 表示目标能访问的任意地址；但链路本地地址和云主机元数据 \`169.254.169.254\` 即使写了 \`*\` 也要单独列出。
   - **-R 的监听端口开在目标主机上，默认只能绑定回环地址**，此时只有目标主机本机能连。要让目标网络里的其他机器也能连，在「远程转发可绑定地址」里写目标主机上的 IP 或 \`*\`，目标 sshd 的 \`GatewayPorts\` 也要允许。堡垒机自身不会为 -R 开任何端口。
4. 目标主机的 sshd 允许转发（OpenSSH 和 Windows 自带的 OpenSSH 默认允许）。

每个会话最多同时 64 条转发连接、8 个 -R 监听，超出会被拒绝并记录。

**网络访问记录**

每条转发连接都会记到「操作记录 → 网络访问」，包括被拒绝的：

- **连接级**（始终记录）：已拒绝（原因）、失败（目标连不上）、连接、关闭（发送 / 接收字节数、持续时长）、-R 的监听；带用户、资产、转发类型、目标、来源。
- **协议级**（开启「解析转发连接里的协议」后）：HTTP 请求和响应、TLS 握手（SNI / ALPN）、MySQL / PostgreSQL 登录和语句、服务端错误（如密码错误）、Redis 命令，以及 MongoDB、Kafka、SMTP、LDAP、DNS 等的关键信息。
  - 删库、删表、不带 WHERE 的 DELETE / UPDATE、FLUSHALL 等标为高风险；改结构、改权限标为中风险。
  - 语句和命令里的密码会脱敏（\`IDENTIFIED BY '******'\`、\`AUTH ******\`），登录包里的认证数据从不记录。
  - 加密连接（HTTPS、MySQL / PostgreSQL 的 TLS）只能看到握手，之后的内容不可见。
  - 单条连接最多记录 1000 条协议事件，超出时记一条「超出上限」，之后只记高风险事件，连接本身不受影响。

在列表里可以按用户、资产、地址、关键字、事件、转发类型、协议、风险、时间筛选；点摘要打开详情，再点「查看这条连接的全部事件」可以按时间顺序看一条连接从建立到关闭的完整经过。这些记录按「数据保留」里操作记录的天数清理。

**示例**（堡垒机用户 alice；\`/postgres\`、\`/root\` 是指定的目标账号）：

\`\`\`bash
# 本地转发：本机 15432 端口 → 资产 db01 上的 PostgreSQL
ssh -p 2222 -N -L 15432:127.0.0.1:5432 alice/postgres@db01@bastion.example.com
psql -h 127.0.0.1 -p 15432 -U app appdb

# SOCKS 代理：浏览器把代理设为 127.0.0.1:1080
ssh -p 2222 -N -D 1080 alice/root@web01@bastion.example.com

# 远程转发：目标主机上访问 127.0.0.1:9090，等于访问本机的 8080
ssh -p 2222 -N -R 9090:localhost:8080 alice/root@web01@bastion.example.com
\`\`\`

![客户端接入设置中的端口转发](/help/images/native-access-settings.png)

## 用户同步 {#user-sync}

[系统设置 → 用户同步](#/layout/admin/bastionSettings?tab=userSync) 接入 LDAP / Active Directory：配置地址、Base DN、绑定账号和过滤条件，先 **预览** 再启用定时同步。同步的用户用目录密码登录。

**示例：Active Directory 常用配置**

| 项目 | 示例 |
|---|---|
| 地址 / 端口 | \`dc01.corp.local\` / \`636\`（LDAPS，导入域 CA 证书） |
| Base DN | \`OU=Staff,DC=corp,DC=local\` |
| 绑定账号 | \`CN=svc-bastion,OU=Service,DC=corp,DC=local\`（只需读权限） |
| 用户过滤（排除禁用账号） | \`(&(objectCategory=person)(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))\` |
| 增量游标类型 | \`USN (uSNChanged)\`；OpenLDAP、群晖选 \`modifyTimestamp\` |

![新增目录源](/help/images/user-sync-drawer.png)

### 恢复在控制台删除的用户 {#restore-directory-user}

在「用户管理」里删除一个同步来的用户后，同步会一直跳过该目录条目，不会把用户（和他通过目录组获得的权限）自动建回来。要重新接入这个用户：

1. 在用户同步列表的该目录源上点 **已删除用户**，找到该用户，点 **恢复**。
2. 执行一次 **全量同步**（增量同步只处理目录里有变化的条目）。

恢复后会创建一个**新账号**：目录源的默认角色，以及他在目录中所属的用户组。原账号上手工加的角色、手工用户组和直接授权不会恢复，需要重新授予。原账号的会话与审计记录保留不变。

## 登录与认证 {#login-auth}

[系统设置 → 登录与认证](#/layout/admin/bastionSettings?tab=loginAuth)

- 已绑定动态口令（MFA）的用户登录控制台时需要二次验证；验证码策略可设为始终需要或连续失败 N 次后需要。
- 密码规则：最短长度、字符类别（小写/大写/数字/符号）、禁止重复使用最近 N 个密码、密码有效期（到期后登录时必须先设新密码，校验通过后才会签发会话）。注册、修改密码、管理员重置时都会校验；LDAP/AD 目录账号的密码由目录管理，不受此规则约束。
- 失败锁定：连续失败 N 次后锁定账号指定时长，控制台与原生客户端（SSH/RDP/数据库等）共享失败计数。已锁定的账号在同页下方列出，管理员可手动解锁；锁定事件会写入审计链并触发实时告警。
- 允许登录的来源网段：每行一个 IP 或 CIDR，留空不限制。保存时校验必须包含你当前的地址，防止把自己锁在门外；若仍误配，可用环境变量 \`BASTION_LOGIN_CIDR_BYPASS=1\` 重启后台临时忽略。
- 控制台空闲登出：浏览器中无操作超过该时长自动退出登录，0 表示不限制。
- 单点登录：OIDC、SAML 2.0、CAS。启用 SSO 后可关闭密码登录（至少保留一个可用的 SSO 时才生效，避免锁死控制台）。

**示例：接入 OIDC（以 Keycloak 为例）**

| 项目 | 示例 |
|---|---|
| 类型 | OIDC |
| Issuer | \`https://sso.example.com/realms/corp\` |
| 客户端 ID / 密钥 | 在 Keycloak 中为堡垒机创建的客户端 |
| 回调地址（在 IdP 登记） | \`https://bastion.example.com/api/bastion/sso/callback\` |
| Scope | \`openid profile email\` |
| 用户名声明 | \`preferred_username\` |

SAML 的回调（ACS）地址为 \`https://bastion.example.com/api/bastion/sso/acs\`。

![登录与认证设置](/help/images/login-auth-settings.png)

## 客户端接入 {#native}

[系统设置 → 客户端接入](#/layout/admin/bastionSettings?tab=native)

- 本地客户端直连代理的开关与端口在 \`server/config.yaml\` 的 \`bastion\` 段设置：SSH 默认 2222，RDP 默认 3389，数据库默认 MySQL 13306 / PostgreSQL 15432 / SQL Server 11433 / Oracle 11521 / Redis 16379 / MongoDB 37017。
- 防火墙需要对用户网段放行这些端口。
- **SSH 空连接保留**（SSH 代理设置）：最后一个通道结束后保留已认证连接的秒数（0–3600，默认 0 即立即断开）。设为 30–300 秒后，OpenSSH ControlMaster、VS Code Remote-SSH 可在同一连接上继续开新通道而不必重新认证；超过上限的值会被自动截断为 3600。
- **Helper / mterminal 安装包**：点「从 GitHub 在线同步」镜像最新版本（无需 GitHub 账号），或手动上传安装包，供内网用户在连接窗口下载。

**示例**：

\`\`\`bash
# SSH / SFTP：堡垒机用户 alice，资产 web01（也可写资产 IP），指定账号 root 时写 alice/root@web01
ssh -p 2222 alice@web01@bastion.example.com
sftp -P 2222 alice/root@web01@bastion.example.com

# 数据库：用户名为「堡垒机用户/资产 ID」，密码为堡垒机密码
mysql -h bastion.example.com -P 13306 -u alice/12 -p
psql "host=bastion.example.com port=15432 user=alice/13 dbname=postgres"
\`\`\`

RDP：mstsc 的「计算机」填 \`bastion.example.com:3389\`，用户名填 \`alice@win01\`，密码为堡垒机密码。

![客户端接入设置](/help/images/native-access-settings.png)

## 告警通知 {#alert}

[系统设置 → 告警通知](#/layout/admin/bastionSettings?tab=alert) 把高危命令、审批待办、改密失败等事件推送到邮件、Webhook、企业微信、钉钉、飞书、短信；可按严重级别和事件类型过滤。

**实时安全告警**：以下事件发生时，立即通知所有可查看「会话审计」的人员（开启三权分立时为审计员），并按告警通道的类型（\`alert\`）和级别外发：

| 事件 | 级别 |
|---|---|
| 高危命令被拦截（SSH / Telnet，含命令和命中的规则） | warn |
| SFTP 文件操作、端口 / X11 / Agent 转发被拦截 | warn |
| 危险 SQL 被规则拦截（需审批的语句走工单，不告警） | warn |
| 原生客户端登录失败（同一来源 IP 每 10 分钟最多一次） | warn |
| FTP 传输命中敏感数据（DLP）被拦截 | error |
| 审计日志或录像完整性校验失败 | error |

同一用户在同一资产上重复触发同一事件时，1 分钟内只告警一次，避免脚本循环刷屏。

**日志外发（Syslog / SIEM）**：同一页下方的「日志外发」把操作记录（会话、命令、文件传输、控制台与原生客户端登录等审计链事件）和 SQL 记录推送到 SIEM / 日志平台。

- 协议支持 UDP、TCP、TLS；TCP / TLS 使用 RFC 6587 八位组计数分帧，与 rsyslog、syslog-ng、Splunk、QRadar 等兼容。
- 格式可选 Syslog RFC 5424（字段在结构化数据 \`[bastion@32473 …]\` 中）或 CEF（ArcSight / QRadar）。设施为 13（log audit），被拦截或失败的事件为 warning 级别。
- 按提交顺序发送。接收端不可用时记录会积压，恢复后自动补发，不会丢失（个别记录可能重复）。新建的目标只发送此后产生的记录。多节点部署时，每个目标同一时刻只有一个节点在发送。
- 保存前可以点 **发送测试消息** 验证连通性；列表中显示发送数量、最近发送时间和最近一次错误。

审批结果与告警也会出现在右上角 [站内消息](#/layout/bastion/bastionNotification) 中。

![站内消息](/help/images/notification.png)

## 资产巡检 {#check}

[系统设置 → 资产巡检](#/layout/admin/bastionSettings?tab=check) 让堡垒机定期对资产和账号做主动检查，替代人工逐台「测试连接」：

- **资产探活**：每分钟检查一次到期资产，对 \`IP:端口\` 做一次 TCP 探测（走资产的路由，含网关，网关不可达即失败）。
- **账号校验**：按间隔重放「测试连接」（SSH 登录校验 / 其他协议 TCP 探测）。默认每天一次，避免触发目标机的锁定策略；失败后到下个周期才重试。
- **降级**：资产探活失败期间，其账号校验标记为「跳过」，不会对已宕机的目标白白发登录请求。
- **结果**：每台资产 / 每个账号记录 \`lastCheckAt\`、\`lastCheckResult\` 和连续失败次数，资产列表显示巡检状态列。
- **告警**：连续失败达到「告警阈值」时通知全体系统管理员并按告警通道外发（\`alert\` 类型，error 级别）；恢复后再发一次 info 级别通知。
- **执行通道探测**（默认关闭）：定期检查资产是否同时提供 SSH / WinRM，供作业中心改走更稳定的通道；「在新通道上验证凭据」会对每个账号真实登录，「自动采纳」会自动改变授权覆盖面，详见 [执行通道](help:admin-guide#channel)。

频率、并发与阈值都可调；「立即巡检」手动执行一轮（忽略调度开关和间隔，检查全部启用资产及其账号，会对每个账号发起一次真实登录，执行前有确认）。同一时间只运行一轮巡检。已停用资产的账号不做登录校验；每次自动登录校验都写入审计日志（\`account-check\`）。账号的巡检结果显示在资产的账号抽屉中。

![巡检策略](/help/images/check-policy.png)

## 配置迁移 {#config-transfer}

[系统设置 → 配置迁移](#/layout/admin/bastionSettings?tab=transfer) 把节点、资产、账号、账号分组、授权、访问策略、命令过滤、SQL 过滤、脱敏规则、数据库配额、发布应用和用户组导出为一个 JSON 文件，用于迁入另一套实例或留档。

- **导出**：点 **导出** 下载 \`bastion-config-<日期>.json\`。默认**不含任何账号凭据**（口令、私钥留在原实例），导入端需要为账号重新补录凭据。勾选「包含账号凭据」并设置口令（至少 8 位）时，凭据用口令派生密钥加密（scrypt + AES-GCM）随包导出——导出文件与口令都要妥善保管。导出凭据等同批量查看密码：仅系统管理员可用，并需再次输入自己的登录密码确认（输错计入登录失败锁定），操作写入审计。
- **导入**：选择文件后先 **校验（试运行）**，报告每类对象将新建、更新、跳过的数量和问题列表（如引用了不存在的用户或资产），不写库；确认后再 **正式导入** 执行实际写入。不含凭据的导出文件导入时保留目标实例已有的账号凭据；授权规则与界面保存时同样校验，不合法的整条跳过。开启三权分立时，正式导入需要持有资产授权或应用授权页面。
- 对象按名称/编码等稳定标识匹配，不依赖数据库自增 ID，因此可以跨实例迁移；已存在的同名对象按导出内容更新。审批链里的用户、授权规则里的资产/账号/策略等引用全部在导入时按名称重新解析，解析不了的整条跳过并列入问题清单，不会产生悬空引用。
- 迁移建议：先在目标实例建齐用户（或开目录同步），再导入配置；账号凭据随后由各自管理员补录。

![配置迁移](/help/images/config-transfer.png)

## 审计分析 {#analysis}

[会话审计 → 审计分析](#/layout/bastion/bastionSessionAudit?tab=analysis) 汇集三项企业版分析，需要会话审计权限：

- **合规报表**：按等保 2.0 三级或 ISO/IEC 27001:2022 逐项检查堡垒机自身的配置和审计证据（多因子认证、授权、录像、命令过滤、日志外发、改密等），给出满足、部分满足、不满足、需人工确认和总分，可导出 CSV 作为测评材料。统计周期默认 90 天。
- **异常行为**：以每个用户自己的历史行为为基线，每小时分析一次登录时间、来源地址、访问的资产、命令和传输量，明显偏离时打 0～100 分并列出原因，严重的同时发告警。**立即分析**按最近的数据马上分析一次。
- **录像文字检索**：在 RDP / VNC 录像里识别出的屏幕文字中搜索（如订单号、文件名），结果给出会话、资产、用户和出现的时间点。需要在配置文件 \`bastion.ocr\` 中开启 OCR，录像结束后自动识别。

当前授权不包含这些功能时，页签上有"企业版"标签，页面顶部会说明。

![合规报表](/help/images/analysis-compliance.png)

## 授权许可 {#license}

[系统设置 → 授权许可](#/layout/admin/bastionSettings?tab=license) 显示当前版本、用量与限额、企业功能开放情况，并用于安装企业版授权。只有系统管理员能看到这个页签。

![授权许可](/help/images/license-page.png)

**版本与试用**

- **社区版**：免费，包含接入、授权、录像审计、命令和 SQL 过滤等主线功能。限制：RDP / VNC 图形会话**网页和本地客户端合计最多同时 3 个**，集群副本 1 个，网络网关 1 个。
- **试用**：可以试用全部企业功能 15 天，试用期内没有数量限制。
  - **能联网**：首次启动后自动向授权服务登记试用（"授权服务"卡片里也可以点 **立即登记**）。授权服务按这台机器或集群的标识记录试用，**重装或换库不能重新试用**，拿到的仍是第一次的日期。
  - **暂时连不上授权服务**：先给 3 天临时试用（从旧版本升级上来的安装为 15 天），期间每小时重试登记。
  - **离线环境**：部署时设置环境变量 \`BASTION_LICENSE_OFFLINE=1\`，不登记、不给临时试用；需要试用时点 **生成申请码**，把申请码和公司、邮箱发给我们，我们签发 15 天的离线试用授权。每个环境、公司或邮箱只能试用一次。
  - Docker Compose 部署会把宿主机的 machine-id 以只读方式挂进容器、Helm 部署读取集群的 \`kube-system\` 命名空间 UID，用来识别同一环境；没有任何可用标识时（例如删掉了挂载）只给临时试用，之后需要离线申请。
- **企业版**：按授权文件开放功能和额度。

**安装授权**

1. 点 **生成申请码**，把申请码（\`WTR1.\` 开头）发给我们。
2. 收到授权文件（\`WTL1.\` 开头，或 \`.lic\` 文件）后，粘贴或选择文件，点 **安装授权**。
3. 授权文件只对申请它的这套安装有效；签名不对、属于别的安装或已过期的文件会被拒绝，现有授权保持不变。安装、拒绝、状态变化都写入变更记录和审计日志。

**在线激活**

- 授权文件里带有授权服务地址的，安装后自动在线激活，之后每天续期一次。"授权服务"卡片显示激活状态和租约到期时间，可以 **立即同步**。
- 标为"必须在线激活"的授权以租约为准：租约过期仍未续上就进入宽限期。授权服务连不上几天不影响使用（租约一般 30 天）。
- **释放激活**：把授权迁到另一套安装前，先在旧安装上点这个按钮释放席位。旧安装已无法使用时联系我们在服务端释放。
- 授权服务判定这套安装是另一套安装的复制品（例如整机克隆后两边都在续期），或者授权已被吊销时，进入宽限期，页面会说明原因。
- **服务地址**：默认 \`https://jimmy2021nas.ddnsfree.com\`。可以在"授权服务"卡片里改；也可以用环境变量 \`BASTION_LICENSE_SERVER\` 指定。只支持 HTTPS，会使用 \`HTTPS_PROXY\` 代理。上报内容只有安装 ID、环境标识的哈希、版本号和用量计数。

**环境绑定**

授权文件绑定这套安装的环境标识（只存哈希）：元数据库实例、Kubernetes 集群、主机硬件（machine-id、主板 UUID、网卡 MAC、CPU 型号，4 项中 2 项一致即可，换网卡或换 CPU 不影响）。数据库换到另一个实例、搬到别的集群或主机时，授权进入宽限期，需要用新的申请码重新申请。"本安装"卡片显示每个标识是否一致。

**到期与限额**

- 到期前 30 天开始提醒；到期后有 15 天宽限期，企业功能照常可用；宽限期结束后：
  - **安全类功能**（日志外发、数据脱敏、SQL 配额、SAML / CAS 单点登录、用户目录同步、高级改密）已有规则**继续生效**，但不能新建或修改；
  - **其余企业功能**停止，配置保留，重新安装授权后恢复。
- 任何状态下都不会中断正在进行的会话，不会停止录像和审计，也不会阻止管理员登录。
- 超出限额时只拒绝新的操作（新建资产、用户、网关，或新的图形会话），已有的照常使用；被拒绝的操作写入审计（\`license-limit-reached\`）。

企业功能的页签和菜单上带有"企业版"标签；当前授权不包含时，页面顶部会说明哪些仍然可用。
`,Li=`# Administrator guide

For asset administrators, approvers, auditors and system administrators. Complete the [Quick start](help:quickstart#overview) first.

## Roles and duties {#roles}

Four built-in roles are created on first start (adjust them afterwards in [Roles](#/layout/admin/authority)):

| Role | Duties | Home page |
|---|---|---|
| **Asset Admin** | Assets, accounts, authorizations, policies, remote apps, job center, approving all tickets | Overview |
| **Approver** | Approves asset / app access, SQL, sessions, password views | Tickets |
| **Auditor** | Session recordings; command / SQL / file / network logs | Session Audit |
| **User** | Connects to assets, uses remote apps, submits requests | Asset Connect |

- Feature menus added to a built-in role later (e.g. the job center) are granted to that role once on upgrade; one an administrator removes is not added back.
- Permissions are menus: a role can use exactly the menus (including hidden tab menus) it is granted; approval rights are the \`approve_<type>\` buttons under the Tickets menu.
- **Separation of duties** (\`bastion.separation-of-duties: true\`): administrators lose the audit menus, auditors cannot manage or approve — as compliance frameworks require.
- **Self-approval**: single-admin deployments can enable \`bastion.ticket.allow-self-approve\`; otherwise requesters cannot approve their own tickets.

## Assets and accounts {#assets}

[Asset Management → Assets & Accounts](#/layout/bastion/bastionAssetCenter?tab=asset)

- **Nodes** group assets in the tree; granting a node covers assets added to it later.
- **Labels**: assets can carry any number of \`key=value\` labels (e.g. \`env=prod\`, \`team=dba\`); the list filters by label and the workspace tree search matches them too. When a rule uses the "By asset label" selector, every asset carrying all the listed labels is granted dynamically — changing a label changes the grant, evaluated at connect time with no caching delay. So an edit to an asset's labels or node that makes a rule start or stop covering it is audited as \`asset-scope-change\`, and with separation of duties on only administrators holding an authorization page may make it.
- **Protocols**: one asset can enable several (SSH + SFTP, RDP + VNC…).
- **Managed accounts**: passwords and SSH keys are stored encrypted; the bastion fills them in and users never see them. With **conceal credential** on, the connection selector shows only the display name — not even the username (a UI-level concealment; audit still records the real username).
- **Test connection**: the lightning icon on an account row — test right after saving.
- **Viewing a password** requires an "account password view" ticket, and the requester must already be authorized for that account.
- **Renaming caveat**: authorizations match accounts by name. Creating or renaming an account to a name used in existing rules puts it into their scope immediately; renaming away breaks the match. Saving lists the affected rules for confirmation and writes an \`account-identity-change\` audit entry; with separation of duties on, only administrators holding the Asset or App Authorization page may make such changes.

### Account examples: without and with a domain {#account-examples}

On an asset row click **Accounts → Add account**. **Put only the user name in Username and the domain in Domain** — do not type \`CORP\\zhangsan\` or \`zhangsan@corp.example.com\` into Username.

**Example 1: Linux / database / network-device account (no domain)**

| Field | Value |
|---|---|
| Account Name | \`root\` (the display name; any label you like) |
| Username | \`root\` |
| Password | The password on the target |
| Domain | Empty |

**Example 2: Windows local account (no domain)**

| Field | Value |
|---|---|
| Account Name | \`Administrator (local)\` |
| Username | \`Administrator\` |
| Password | The local password |
| Domain | Empty |
| Account scope | Local account |

**Example 3: Windows domain account (with a domain)**

| Field | Value |
|---|---|
| Account Name | \`Zhang San (CORP)\` |
| Username | \`zhangsan\` |
| Password | The domain password |
| Domain | \`CORP\` (NetBIOS name) or \`corp.example.com\` (DNS name) — both log on |
| Account scope | Domain account |

The two kinds behave differently in three places:

| | No domain | With a domain |
|---|---|---|
| Account entry in an authorization rule | \`root\`, \`Administrator\` | \`CORP\\zhangsan\` — **spell the domain exactly as on the account**: an account with \`corp.example.com\` needs \`corp.example.com\\zhangsan\` |
| A rule listing just \`zhangsan\` | Matches the domainless account of that name | **Does not match**, so a local and a domain account with the same name are never confused; \`@all\` matches both |
| Rotation method (empty = automatic) | By protocol: SSH / WinRM / database / SMB; choose \`rdp_shell\` manually for hosts exposing only 3389 | With Account scope set to **Domain account**, rotation changes the domain password over LDAP/LDAPS (a domain alone, without that scope, does not) — configure the domain controller and its CA under [Settings → User Sync](#/layout/admin/bastionSettings?tab=userSync) first; \`rdp_shell\` refuses domain accounts |

- For a domain account used on several hosts, add it under each asset (same username and domain); enable "update dependents" on rotation so services and scheduled tasks running as it on the other hosts are updated together.
- Remote Desktop logon with a domain account also needs "Allow log on through Remote Desktop Services" on the target (e.g. membership of Remote Desktop Users); on a domain controller, ordinary domain users do not have it by default.
- When users connect with a local client they always sign in as **their own bastion user** plus the asset (e.g. \`alice@10.0.0.5\`), never as the domain account above; the bastion fills in the target account per their authorization — see [User guide → Local clients](help:user-guide#native).


![Asset list and node tree](/help/images/en/asset-center.png)

![Managed accounts of an asset](/help/images/en/asset-account-drawer.png)

## Password rotation {#rotation}

[Asset Management → Password Rotation](#/layout/bastion/bastionAssetCenter?tab=rotation)

- Rotates managed-account passwords on a schedule (interval + maintenance window) and records every run.
- **Execution credential**: the privileged account (root, a domain admin…) used to log in and change the password; it may differ from the rotated account.
- **Dependencies**: services / scheduled tasks / app pools to update after rotation; enable "update dependents" to update them together.
- Failed rotations show up in the Overview to-dos.

### Methods and their host prerequisites {#rotation-methods}

Leave the method empty to pick one from the account's protocol, or set it explicitly. A new password is stored in the vault only after an **independent verification** succeeds; a failed verification always rolls back and is recorded as failed or "uncertain" — never as success.

| Method | Use for | Prerequisite on the target |
|---|---|---|
| \`ssh\` | Linux / network devices | The account can log in over SSH; verification is a fresh SSH login with the new password |
| \`winrm\` | Windows local accounts | A WinRM listener (5986/HTTPS preferred — its certificate is pinned on first use). Verification runs locally against SAM through the execution credential, so the rotated account itself does not need WinRM access |
| \`ldap\` / \`ldaps\` | Domain accounts | A directory source providing the domain controller and its CA; the execution credential may change passwords |
| \`db\` | Database accounts | The execution credential may change passwords |
| \`smb\` | Windows / Samba exposing only 445 | For Windows targets configure an **execution credential**: the self-service (SAMR) change is dropped by some Windows builds, and rotation then falls back to \`rpcclient chgpasswd2\` as the executor. Not available through a gateway (the external Samba tools cannot follow the route). Rotation ships its own minimal \`smb.conf\` so it does not depend on local Samba configuration; set \`BASTION_SMB_CONF\` to override |
| \`rdp_shell\` | Windows local accounts on hosts with **only 3389 and no WinRM** | (1) The host must allow launching a RemoteApp program: \`HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Terminal Server\\TSAppAllowList\\fDisabledAllowList=1\`, or publish powershell.exe as a RemoteApp — a refusal fails the rotation with exactly that message. (2) The rotated account must be allowed to log on over RDP (e.g. in Remote Desktop Users), because verification authenticates as that account over NLA. (3) The new password is briefly visible in the target's process table, so prefer WinRM where it exists |

![New change-secret policy](/help/images/en/rotation-policy-drawer.png)

**Example: enable the HTTPS listener (5986) for the \`winrm\` method**, in an elevated PowerShell on the target:

\`\`\`powershell
$cert = New-SelfSignedCertificate -DnsName $env:COMPUTERNAME -CertStoreLocation Cert:\\LocalMachine\\My
New-Item -Path WSMan:\\localhost\\Listener -Transport HTTPS -Address * -CertificateThumbPrint $cert.Thumbprint -Force
New-NetFirewallRule -DisplayName "WinRM HTTPS" -Direction Inbound -Protocol TCP -LocalPort 5986 -Action Allow
\`\`\`

**Example: allow remote programs for the \`rdp_shell\` method**, elevated:

\`\`\`bat
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Terminal Server\\TSAppAllowList" /v fDisabledAllowList /t REG_DWORD /d 1 /f
\`\`\`

## Schema migration {#migration}

[Asset Management → Schema Migration](#/layout/bastion/bastionAssetCenter?tab=migration) compares the schemas of two database assets and generates the diff SQL; running it requires approval.

Steps: click **New**, enter a version, pick the database asset and write the apply and rollback SQL; after approval it can be run, and the rollback SQL undoes it if needed.

![New schema migration](/help/images/en/migration-drawer.png)

## Network gateways {#gateway}

[Asset Management → Network Gateways](#/layout/bastion/bastionAssetCenter?tab=gateway)

When assets sit in a network the bastion cannot reach directly (another data center, a customer network, an outbound-only segment), run a **gateway agent** inside that network. The agent connects OUT to the bastion over HTTPS (WebSocket) on the console's own port, so the isolated network opens no inbound port; every connection the bastion makes to assets there goes through it.

1. **New gateway**: enter a name and save. The deployment guide shows a token **only once** and the bastion gateway host key fingerprint. A lost token can only be reset: the old one stops working at once and connected agents are disconnected.
2. **Deploy the agent**: in the deployment guide enter the **networks the agent may reach** (required) — comma separated, optional ports (\`10.1.0.0/16:22\`, \`10.2.0.0/16:1433-1521\`). Anything not listed is refused; loopback and link-local addresses (including the cloud metadata endpoint \`169.254.169.254\`) stay closed even under \`0.0.0.0/0\` unless named explicitly. The agent name is optional and defaults to the host name. Click **Generate one-line install commands** and run the Linux or Windows line on the gateway host — see [One-line installation](help:admin-guide#gateway-install). Docker and a manual binary run remain available. The agent pins the fingerprint and refuses any server that is not this bastion.
3. **Bind assets**: pick a gateway on a node and the assets in it and its sub-nodes are reached through it; an asset's **Network route** can **inherit from node** (default), be **direct**, or use a **specific gateway**. The asset list's Network route column shows the effective route. Route changes are audited as \`asset-route-change\`.
4. **Status**: the list shows how many agents are online; expand a row for each agent's host, source IP, version, allowed targets and active connections. Several agents may serve one gateway for redundancy; the bastion rotates between them.

![Gateway list with an online agent](/help/images/en/gateway-list.png)

- **Fail closed**: when an asset's gateway is offline, disabled or misconfigured, the connection fails — it never falls back to a direct connection, even if the bastion could reach the address itself.
- Every protocol (SSH, RDP/VNC, Telnet, FTP, the six databases, web terminals) plus password rotation and connection tests use the gateway. FTP active mode is converted to upstream passive automatically. **SMB rotation** shells out to Samba tools that cannot use a gateway; use the WinRM or RDP method for assets behind one.
- Gateway changes, token resets and agents going online/offline are audited; only a hash of the token is stored. Configuration transfer carries gateways and bindings but never tokens: reset the token on the target instance before deploying agents there.


### One-line agent installation {#gateway-install}

This works like openrport's pairing: the bastion issues an **install code**, and one command on the gateway host downloads, verifies, configures, registers and starts the agent.

| | Linux | Windows |
|---|---|---|
| How to run | as root: \`curl -fsSL '…/install.sh' \\| sudo sh\` | open PowerShell as administrator and paste the generated line |
| Requirements | x86_64 / aarch64, systemd or OpenRC (Alpine included), curl or wget | Windows Server 2016 / Windows 10 or later (x64 / ARM64) |
| Program | \`/usr/local/bin/bastion-gateway\` | \`%ProgramFiles%\\BastionGateway\\bastion-gateway.exe\` |
| Settings (with the token) | \`/etc/bastion-gateway/gateway.conf\`, \`root:bastion-gateway 0640\` | \`%ProgramData%\\BastionGateway\\gateway.conf\`, readable by SYSTEM, administrators and the service account only |
| Service | \`bastion-gateway\`, running as the unprivileged user \`bastion-gateway\`, started at boot, sandboxed under systemd | \`BastionGateway\`, running as \`LocalService\`, started at boot, restarted on failure |
| Logs | \`journalctl -u bastion-gateway\` (OpenRC: \`/var/log/bastion-gateway/gateway.log\`) | \`%ProgramData%\\BastionGateway\\gateway.log\` |

- **What the script does**: detects the CPU architecture, downloads the matching agent **from the bastion itself** (no internet access needed), verifies its SHA-256, writes the settings, registers and starts the service, and reports success only once the bastion sees this agent online; if it is not online within 60 seconds it prints the recent log. Running it again upgrades the agent and rewrites the settings.
- **Install code**: valid for 1 hour and usable on several hosts (several agents of one gateway for redundancy). A gateway has one live code: generating a new one, resetting the token, or disabling or deleting the gateway voids the old commands at once. Generating a code requires the current token, so it is only possible in the deployment guide right after creating the gateway or resetting its token.
- **Security**: the commands and scripts contain the token — do not share or keep them. Source IPs that try too many wrong codes are locked out for a while; every code generation and installer download is audited (\`gateway-pairing-create\`, \`gateway-pairing-fetch\`). If the console uses a self-signed HTTPS certificate, tick **The bastion uses a self-signed certificate**: the agent still authenticates the bastion by the host key fingerprint, but the installer download itself is no longer certificate-checked, so use this only on trusted networks.
- **The address in the commands** is the one you opened the console with. The gateway host must be able to reach it; if you opened the console by an internal IP or localhost, open it by a name the gateway host can reach and generate again.
- **Packages**: the server image ships the Linux and Windows (amd64 / arm64) agents; for source deployments run \`make gateway-dist\` (output in \`server/gatewaydist\`, or set \`BASTION_GATEWAY_DIST_DIR\`). The deployment guide warns when a platform's package is missing.
- **Uninstall**: **Uninstall the agent** at the bottom of the deployment guide has Linux and Windows commands that remove the service, program, settings (with the token) and logs. The gateway itself stays in the console.

## Authorization {#authorization}

[Access Control → Authorization](#/layout/bastion/bastionAccessControl?tab=authorization)

- One rule = users / groups × assets / nodes × protocols × accounts × actions × validity period. **Accounts are mandatory**: asset access alone is not enough — the user must be authorized for the specific account they connect with.
- **Authorized accounts** has two parts; grant at least one:
  - **Managed accounts** (credentials kept by the bastion):
    - **All accounts**: every managed account on the target assets, including ones added later;
    - **Selected accounts**: pick account names (case-insensitive); write domain accounts as \`DOMAIN\\user\` (e.g. \`CORP\\administrator\`; a bare \`administrator\` only matches local accounts). You can also pick [account groups](help:admin-guide#account-group), or check **Same-name account** — the account named like the user's login name, never a privileged one;
    - **None**: only the other sign-in methods below.
  - **Other sign-in methods** (no credential kept by the bastion; may be combined with managed accounts):
    - **Enter credentials manually**: the user types the target username and password when connecting — for emergencies. Credentials are used once and never stored, but the reachable account is whichever password the user knows; combine with MFA or a validity window;
    - **Anonymous**: no credentials; Redis, MongoDB and VNC only.
- **Actions**: grant the least you can. "Connect" is required; without it no other action applies. What each action covers:

  | Action | Covers |
  |---|---|
  | Upload | SFTP upload and chmod, scp / rsync upload, rz (ZMODEM) in terminals, FTP upload and \`SITE CHMOD\`, the RDP target reading files on the user's machine (web "Map folder" and native drive redirection), job-center file distribution |
  | Download | SFTP download, scp / rsync download, sz in terminals, FTP download, the RDP target writing, creating, renaming or deleting files in the folder mapped from the user's machine |
  | Delete | Deleting files and directories over SFTP / FTP |
  | Rename / create | SFTP / FTP rename, create directory, links and server-side copies |
  | Clipboard paste | Clipboard from the local machine to the remote one (RDP / VNC, web and native clients) |
  | Clipboard copy | Clipboard from the remote machine to the local one (RDP / VNC, web and native clients) |
  | Co-op sharing | Joining someone else's shared session as an invitee |
  | Port forwarding / remote port forwarding / X11 / SSH agent | Native SSH \`-L\`/\`-D\`, \`-R\`, \`-X\`, \`-A\` (port forwarding must also be enabled in System settings) |

  Without upload or download, web RDP does not offer "Map folder" and the target does not see the drive. Copying files through the RDP clipboard needs both upload and download. Native SSH refuses an sftp-server started through exec; use the SFTP subsystem. Actions control the dedicated transfer channels: a user who can run commands can still move content through the terminal (\`cat\`, \`base64\`); combine with command filters where needed. Database protocols only look at "connect"; reads and writes are controlled by SQL rules and policies.
- **Restrict databases**: on database assets the rule can narrow access to a list of databases/schemas; switching beyond the list is blocked mid-session. This is a UI-level narrowing — real database-level isolation still depends on the database account's own privileges.
- Granting a user group covers its members and the members of its sub-groups.
- When several rules match a connection, accounts and actions are unioned and the strictest policy values win.
- Approved self-service requests create temporary authorizations that expire automatically.


![Creating an authorization rule](/help/images/en/authorization-drawer.png)

## App authorization {#app-authorization}

[Access Control → App Authorization](#/layout/bastion/bastionAccessControl?tab=appAuthorization)

Remote-app authorization shares the same rule engine: one app rule = users / groups × apps × accounts × validity period.

- Pick published applications as the object; the account dimension works exactly like asset rules (all / selected / \`@self\` / \`@input\` / account groups), and an app rule implies the app's asset and the RDP protocol.
- The **Authorize** button on a published app jumps straight to this tab with a rule prefilled for that app.
- Users see and launch only the apps covered by an app rule, and only with the accounts that rule allows.
- App rules and asset rules never match each other: authorizing an app does not grant the machine's desktop, and an asset rule cannot launch an app.
- Clipboard, upload and download actions still apply to app sessions.
- An app rule limits the entry point, it is not desktop isolation: in alternate-shell mode a user may escape through the program's Open File dialog. Use RemoteApp mode plus AppLocker on sensitive servers.

![New app authorization](/help/images/en/app-authorization-drawer.png)

## Account groups {#account-group}

[Access Control → Account Groups](#/layout/bastion/bastionAccessControl?tab=accountGroup)

An account group aggregates same-named accounts across assets (e.g. the \`app\` service account on every server) so a rule can reference the whole set at once.

### Account groups vs. user groups {#account-group-vs-user-group}

An authorization rule answers "**who** × **which assets** × **with which account** × protocol / actions × validity". The two kinds of group work on different dimensions:

| | User groups (Administration → User Groups) | Account groups (Access Control → Account Groups) |
|---|---|---|
| Members | Bastion users (people who sign in to the bastion) | Login accounts on the target assets, e.g. \`root\`, \`app\`, \`CORP\\svc-backup\` |
| Where a rule uses it | Subject (who) | Accounts (account dimension) |
| How membership is set | By hand or synced from LDAP / AD; groups can be nested, and a grant to a parent group covers its subgroups | By account identity, across all assets: an account with the same identity created on any asset joins automatically |
| Effect of a change | Adding a person gives them all the group's grants | Adding an account identity lets every referencing rule use one more account |

They are usually combined — **user groups for people, account groups for accounts** — e.g. "Developers user group × application-server node × Standard app accounts group × SSH".

### When to use one {#account-group-scenarios}

- **Write the rule once**: operators must log in to every application server as \`app\`, \`deploy\` or \`appadmin\`. Put those three in an "App operators" group and reference it from asset and app rules; adding \`appops\` later is a single group edit, and every rule follows.
- **Grant by privilege level**: on the same servers, developers may only use ordinary accounts such as \`app\`, while DBAs may use \`oracle\` and \`postgres\`. Two groups ("Standard app accounts", "DB admin accounts") granted to the Developers and DBA user groups keep the rules readable — and avoid writing \`@all\` and handing out \`root\` by accident.
- **Domain service accounts**: \`CORP\\svc-backup\`, \`CORP\\svc-monitor\` and the like live on dozens of Windows hosts; one group references them all, and a new host is covered as soon as the same domain account exists on it.
- **Retiring a shared account**: remove it from the group and every referencing rule stops allowing it at once, without hunting through rules.

### Rules and caveats {#account-group-rules}

- **Matched by account identity**: a member is the account's **username** (\`DOMAIN\\user\` for domain accounts), not the account's display name. A member without a domain matches only accounts without one, and \`DOMAIN\\user\` only accounts of that domain — spelled exactly as on the account (\`CORP\` and \`corp.example.com\` are different); see [Account examples](help:admin-guide#account-examples).
- **Accounts only, not assets**: the group decides which accounts may be used; which assets may be reached is still decided by the rule's assets, nodes or labels. An account is allowed only on assets the rule covers.
- **Editing a group edits authorizations**: changing members changes the account scope of every rule that references it — treat it like editing authorizations; the change is audited (\`update-account-group\`), and only roles holding the Account Groups page may make it — assign that page as you would an authorization page.
- Rules reference the group by ID, so renaming it is safe; a group referenced by rules cannot be deleted — remove the references first.
- For a rule that needs only one or two accounts, naming them directly in the rule is clearer than a group.

![New account group](/help/images/en/account-group-drawer.png)

## Access policies {#policy}

[Access Control → Access Policies](#/layout/bastion/bastionAccessControl?tab=policy) add conditions on top of authorizations:

- **IP allow-list**: only the listed IPs / CIDRs may connect;
- **Second factor**: authenticator (TOTP), a delivered code (email / SMS / WeCom / DingTalk / Feishu) or RADIUS;
- **Forced recording** and **screen watermark** (text, opacity, angle, density);
- **Session limits**: maximum session time, maximum idle time, concurrent sessions;
- **Databases**: read-only web console, maximum rows per result.

Policies take effect through authorizations; for manual approval before connecting use the "session approval" ticket.


![Creating an access policy](/help/images/en/policy-drawer.png)

## Command filters {#command-filter}

[Access Control → Command Filters](#/layout/bastion/bastionAccessControl?tab=command) match every SSH / SFTP command. Each rule has a priority, a scope (SSH / SFTP), a match type (regex / exact) and an action:

- **Deny**: block the command and alert.
- **Review**: pause the session's input; the user's terminal shows that the command awaits review. Approvers see the full command under [Tickets → To approve](#/layout/bastion/bastionTicket?box=todo); once approved it runs exactly as typed, while rejection, timeout (2 minutes by default) or the user disconnecting drops it. Nobody can approve their own command. Telnet and SFTP path rules cannot pause, so review acts as deny there.
- **Warn**: let it run, but record and alert — for sensitive commands worth a look afterwards.
- **Allow**: let it through ahead of deny / review rules (allow-listing).

Matching looks at what the user typed as well as the terminal echo (which covers Tab completion and history); multi-line pastes are checked line by line. When editing keys (↑, Tab, Ctrl-R…) and Enter arrive before the terminal redraws the line, the command that would run is unknown, so it is refused with a request to type it again. Hits are logged under Command Log and counted in the Overview.


![Command filter rules](/help/images/en/command-filter.png)

## Batch jobs {#job}

[Batch jobs](#/layout/bastion/bastionJob) push one SSH command or one file to many assets at once: choose the job type, type the command or pick the file, pick a set of asset + account targets (up to 200) and run — each target executes in parallel without blocking the others.

- **Distribute file**: one file (up to 100 MB) is written over SFTP to each target's destination — empty means the same name in the account's home, a trailing \`/\` means a directory; an existing file is overwritten. Targets need the sftp protocol and the Upload action in their authorization, and SFTP path filter rules apply. Every write goes to the SFTP event log and the result shows the bytes written and the SHA-256. The content is first checked against the SSH proxy's SFTP DLP keywords / regexes; in blocking mode a hit refuses the whole job and is audited. Linux (OpenSSH) and Windows (Win32-OpenSSH) targets both work.
- **Windows assets that offer only RDP**: when an asset's protocols include rdp but not ssh, its target runs through a headless RDP logon (marked "RDP" in the picker): the bastion logs on with the account's credentials, serves the Session Probe agent over a redirected drive, and the agent runs the command as \`cmd /c\` from the account's profile folder, returns its output (converted from the target's code page to UTF-8) and exit code, then **logs the session off**. The authorization must grant rdp (file jobs also need Upload); command filters apply, and the audit actions are \`rdp-exec\` / \`rdp-upload\`. Limits: cmd syntax, commands up to 1000 characters; files are copied with \`copy /Y\` from a read-only redirected drive and checked with \`certutil\` SHA-256, paths are Windows paths and may not contain \`"\` or \`%\`. It is a real interactive logon: prefer a dedicated job account (it may take over a disconnected session of the same account), and it fails when group policy disables drive redirection. Windows 7 / Server 2008 R2 through Windows 11 / Server 2022 are supported; a modal window at logon (e.g. an expired-activation prompt) keeps the agent from starting.
- **Cancel**: a running job can be canceled from the list or the result drawer — targets that have not started are skipped, running ones are disconnected (RDP targets are logged off, which ends the running process; the command may already have taken effect); the job ends as Canceled and \`job-cancel\` is audited.
- **Interrupted**: if the bastion restarts or the running node disappears, unfinished targets become Interrupted (outcome on the host unknown), the job is closed and its sessions ended; with several replicas only jobs whose heartbeat went stale are touched.

- **Permissions**: the target pickers list only assets and accounts you can reach over SSH; **Bulk add** adds many assets at once by account name (e.g. root). Every target goes through its own authorization check (user × asset × account × ssh protocol, with IP allow-list / GeoIP rules evaluated against the creator's real address) and command filtering — a target matching a deny rule is recorded as **blocked**, one matching a review rule waits for approval (it continues once approved), and an unauthorized target is **denied**; none of that affects the other targets.
- **Access policy**: as for interactive connections — when a policy requires two-factor authentication you enter one code before the job is submitted (it covers all targets); when it requires session approval the target shows **Awaiting approval** and runs only once approved (a rejection is recorded as **rejected**). Running asks you to confirm the target count and the command.
- **Host keys**: jobs and Test connection pin the target's SSH host fingerprint on first contact and refuse a changed key afterwards (credentials are never sent to an impostor); after a genuine rebuild, clear the fingerprint from the Test connection prompt.
- **Channel and command language**: each target uses SSH, then WinRM, then RDP among the protocols the asset declares and you are authorized for (see [Exec channels](help:admin-guide#channel)); the "Command language" (cmd / PowerShell) decides what interprets the command, independently of the channel.
- **Visibility**: jobs and their outputs are visible to their creator only; roles holding the Online sessions audit menu see every job.
- **Results**: each target shows its status, exit code, output or error, and the job row totals done / failed / blocked. Open a job for per-target detail and session IDs.
- **Audit**: each target is an independent \`job\`-type session with its own audit entries (blocked targets still get an \`ssh-exec\` blocked record), traceable under Session Audit.

![Batch jobs](/help/images/en/job.png)

### Scheduled jobs {#job-schedule}

Click **New job** and tick **Scheduled job** — the form switches to the schedule settings (it is ticked already when you start from the "Scheduled jobs" tab) — to run one command on a cron schedule. The "Scheduled jobs" tab lists them with next run, last result and run history; you can pause / resume, run once now, edit and delete. File distribution cannot be scheduled yet.

A scheduled job **runs unattended, in its creator's name**, so the rules are stricter than for a one-off job:

- **Every run is checked again**: each run creates an ordinary job, and every target is judged by the creator's authorizations, access policy and command filters **as they are at that moment**. A revoked grant, a deleted account or a new deny rule turns that target "denied" or "blocked" on the next run.
- **Targets that need a person cannot be scheduled**: if the access policy requires session approval or two-factor authentication on every connection, saving is refused with the reason listed per target; so is a command that matches a review rule. If the rules change after saving, a review match at run time **counts as a denial** and approval / MFA targets are denied — no approval ticket is created and nothing waits.
- **An end date is required**: at most a year ahead; the schedule then becomes "Expired". When the creator is disabled or deleted, all their scheduled jobs become "Suspended" and administrators are notified — nothing keeps running in a departed user's name.
- **Interval floor**: every 5 minutes at most; 30 minutes when a target is reached only over RDP (each run is a full interactive logon). Cron uses the standard 5 fields (minute hour day month weekday) in the chosen time zone; the editor previews the next run times.
- **No overlap, no catch-up**: if the previous run is still going, the occurrence is skipped ("Skipped"); occurrences missed while the bastion was down are not replayed afterwards, only recorded once as "Missed". With several replicas, each occurrence runs on exactly one.
- **Who may act**: only the creator edits, resumes or runs it now (it runs in their name); roles holding the Online Sessions audit menu may view, pause and delete other users' scheduled jobs.
- **Alerts and audit**: the creator and administrators (and the alert channels) are notified when a schedule starts failing and when it recovers — not on every failed run. Create, update, pause, resume, delete, every run, skips, misses, expiry and suspension are audited (\`job-schedule-*\`). Runs are part of the job history, which the operation-audit days in Data retention also prune.

## Exec channels {#channel}

[Assets](#/layout/bastion/bastionAssetCenter?tab=asset) → an asset → More → **Exec channels**: which channel the job center uses to run commands on that asset.

- **Why it matters**: on a Windows asset registered for RDP only, a job needs a full interactive logon (about 10 seconds, it may take over a disconnected session of the same account, and a modal window at logon blocks it). The same host often also runs OpenSSH or WinRM, which run a command in under a second and disturb nobody.
- **Detection**: "Detect now" checks the asset's own SSH, WinRM and RDP ports and reads the protocol greeting. **No credential is sent**, so no account can be locked out. Periodic detection can be switched on under Settings → Asset inspection (off by default; daily is plenty).
- **Adoption**: a detected channel is only a suggestion. "Adopt" adds the protocol to the asset, and the confirmation first lists **which existing authorization rules will start granting that protocol on this asset**. With separation of duties on, only a role that manages asset authorization may do it. Every adoption is audited. "Don't suggest" hides a suggestion for good. The inspection policy also has an auto-adopt switch — convenient, but it changes authorization coverage on its own.
- **Order**: jobs prefer SSH, then WinRM, then RDP, and only among the protocols the asset declares and the user is authorized for. The asset's "Command channel" pins one, which helps when a service on the host is unreliable.
- **The two WinRM listeners**: HTTPS (5986) has its certificate pinned on first use; a changed certificate refuses the job until "Clear the pin" (audited). Plain HTTP (5985) is unusable until "Accept the risk" is set on that asset (the credential and the content are protected by NTLM message encryption, but the connection itself is plain, and the asset must be reachable without a gateway) — enabling 5986 on the host is the better fix.
- **Per-account verification**: "Verify on channels" in the asset's account list signs in with the stored credential once per channel, confirms the account really works there, and records which shell interprets commands. It is a real login and every attempt is audited; RDP is never used for it.
- **Command language**: the job form's "Command language" (cmd / PowerShell) decides what interprets the command, independently of the channel — the same job behaves the same over SSH, WinRM and RDP.

The commands that enable a WinRM HTTPS listener on Windows are in the example under [Change secret](help:admin-guide#rotation).

## Kubernetes clusters {#k8s}

Register a Kubernetes cluster as an asset so operators open container terminals (\`pods/exec\`) through the bastion — recorded and command-filtered, with no kubeconfig handed out.

- **Asset**: protocol **Kubernetes**, address and port of the API server (default 6443). Gateway routing applies as for any asset.
- **Account**: one account per ServiceAccount. "ServiceAccount token" takes a token from \`kubectl create token <sa>\`; the SA needs at least get / list on \`pods\` and **get** on \`pods/exec\` (plus list on \`namespaces\` to browse all namespaces). "Cluster CA certificate" is optional: with it the API server is verified against that CA; without it the API server certificate is **pinned on first use** and a different certificate is refused (reset the account's host fingerprint after confirming the cluster changed its certificate).
- **Authorization**: a rule with the Kubernetes protocol gains two fields — **namespaces** (terminals only in these, empty = all) and **pod label selector** (\`kubectl -l\` syntax such as \`app=web,tier!=db\` or \`env in (prod,stage)\`, empty = every pod). The selector is checked against the pod's **current** labels; several rules add up. This narrows on top of the ServiceAccount's own RBAC — both must allow.
- **Sessions**: like a web SSH terminal — access policies (MFA, approval, time windows, concurrency), command filters, asciicast recording and replay, live monitoring, session sharing and admin takeover all apply; sessions show protocol k8s.
- **Limits**: terminals use the pods/exec WebSocket stream (channel.k8s.io); no file transfer or port forwarding; containers without \`sh\` (e.g. distroless) cannot open a terminal.

**Example: a ServiceAccount with the permissions needed** (adjust the namespace and names):

\`\`\`yaml
apiVersion: v1
kind: ServiceAccount
metadata: { name: bastion-exec, namespace: default }
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata: { name: bastion-exec }
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["get", "create"]
  - apiGroups: [""]
    resources: ["namespaces"]
    verbs: ["list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata: { name: bastion-exec }
roleRef: { apiGroup: rbac.authorization.k8s.io, kind: ClusterRole, name: bastion-exec }
subjects:
  - { kind: ServiceAccount, name: bastion-exec, namespace: default }
\`\`\`

Then create a token and paste it into the account's "ServiceAccount token":

\`\`\`bash
kubectl apply -f bastion-exec.yaml
kubectl create token bastion-exec -n default --duration=8760h
\`\`\`

\`pods/exec\` needs \`get\`: the bastion opens exec over WebSocket, which the API server authorizes as \`get\` (measured on Kubernetes 1.32 — \`create\` alone is refused with 403). \`create\` is what \`kubectl exec\` over SPDY needs; keep it if the same ServiceAccount is also used with kubectl.

## SQL filters and quotas {#sql-filter}

[Access Control → SQL Filters](#/layout/bastion/bastionAccessControl?tab=sql)

- Rule types cover custom regex, sensitive tables and dozens of built-in checks: UPDATE / DELETE must have WHERE, no TRUNCATE / DROP, no SELECT *, DDL naming and primary-key conventions, explain-plan row estimates and more.
- Levels: **error** (block), **warning** (allow and log), **approval** (creates a SQL approval ticket; runs once approved).
- **SQL quotas** cap a user's query rate (QPS) and daily returned rows to prevent bulk exfiltration.
- Executed changes can be reverted from SQL Rollback, which generates the inverse statements.


![SQL filter rules](/help/images/en/sql-filter.png)

## Data masking {#masking}

[Access Control → Data Masking](#/layout/bastion/bastionAccessControl?tab=masking) sets rules per database / table / column: full mask, partial mask (keep N characters on each side) or SHA-256 hash prefix. Results are masked in the proxy, so raw data never leaves the bastion.

**Example**: with columns \`phone|mobile\`, method \`partial\` and 3 characters kept, \`13812345678\` shows as \`138*****678\`; with \`hash\` it shows a hash prefix, the same value always giving the same result so it can still be compared.

![New masking rule](/help/images/en/masking-rule-drawer.png)

## Publishing apps {#publish}

[Remote Apps → App Publishing](#/layout/bastion/bastionRemoteApp?tab=publish)

- Pick a Windows asset as the app server, click **Scan apps** to discover installed programs, or enter a program path manually.
- **RemoteApp mode** needs RemoteApp enabled on the server with a registered alias (\`||alias\`); users get a single app window.
- **Alternate shell mode** needs no server configuration: the program replaces the desktop shell, which is more compatible.
- Publishing and changes go through change-ticket approval. Afterwards use **Authorize** on the app row to create a rule in [App authorization](help:admin-guide#app-authorization) — only covered users see it under My Apps.

![Publish an application](/help/images/en/publish-app-drawer.png)

## Session audit {#audit}

[Session Audit](#/layout/bastion/bastionSessionAudit)

- **Online sessions**: watch the screen / terminal live and terminate if needed. SSH, RDP and VNC sessions opened in the web terminal also offer a **Take over** action (native-client sessions do not): it suspends the owner's input (the owner's terminal says so) and hands control to the admin (attached through a collaboration terminal in a new window); closing that window, losing the network or leaving returns input automatically. The admin must hold a connect grant for the same asset and account and satisfy their own access policy (a two-factor code if required; policies requiring session approval cannot take over). With separation of duties on, takeover is unavailable — audit roles can only watch. Takeover, release, and every user-side share invite / grant / removal are written to the audit log. Share invites are one-time, valid for 10 minutes, and die with the session or a restart; invitees need the share action granted in their authorization rule. On an RDP / VNC desktop control is exclusive: handing it to a participant suspends the owner's input, and every handoff is audited as "Control handed over" / "Control returned", so the recording can be matched against who was operating. Participants never receive the owner's clipboard, audio or file-transfer traffic (the session monitor sees only the screen as well).
- **Session history**: replay SSH, RDP, VNC and database sessions; the timeline jumps to individual commands.
- **Activity search**: search commands, SQL, file transfers and network access across sessions, filtered by user, asset and result. Network access records SSH port forwarding: see [SSH port forwarding and network access](help:admin-guide#port-forward).
- Optional: with OCR enabled, text shown in graphical sessions becomes searchable.
- **Tamper evidence**: operation records and SQL records are written to keyed hash chains, and each recording is sealed when its session ends (its SHA-256 goes into the audit chain).
  - Click **Verify integrity** on Activity → Commands to check both chains; the result names the exact record that was edited, removed, hidden or truncated. Every check is itself audited.
  - The replay dialog shows the recording's status next to its title: **Recording intact**, **Integrity check failed** (the file was changed, replaced or lost, or its seal was edited in the database), or **Not sealed** (recorded before sealing existed).
  - **Retention**: **Retention** on Activity → Commands sets how many days session recordings, operation records (with network-access and file-transfer events) and archived SQL records are kept (0 = forever, otherwise at least 30), removed daily. Each purge is recorded in the audit chain as a retention purge, so integrity checks keep passing — while records deleted around the policy are still detected. Records a log-forwarding destination has not received yet are kept. A removed recording shows *Removed by retention* at playback. This is an audit duty: with separation of duties on, the auditor maintains it.
  - The audit key lives in \`.bastion_audit_key\` in the backend's working directory (or the \`BASTION_AUDIT_KEY\` environment variable). Back it up together with the credential key \`.bastion_key\`; without it past records cannot be verified.


![Activity search](/help/images/en/audit-activity.png)

## SSH port forwarding and network access {#port-forward}

[System settings → SSH proxy](#/layout/admin/bastionSettings?tab=native) · [Session audit → Activity → Network access](#/layout/bastion/bastionSessionAudit?tab=activity)

Users who log in to an asset through the bastion with a native SSH client (port 2222 by default) can forward ports:

| Usage | Meaning | Typical use |
|---|---|---|
| \`ssh -L 15432:127.0.0.1:5432 …\` | Local forward: a port on the user's machine reaches, through the asset, a service the asset can reach | A local database client on the asset's PostgreSQL; an admin page only open inside the network |
| \`ssh -D 1080 …\` | SOCKS proxy: a browser reaches several addresses through the asset (OpenSSH uses local forwarding for it) | Browsing several web services in the asset's network |
| \`ssh -R 9090:localhost:8080 …\` | Remote forward: port 9090 opens **on the target host**, and programs there connect back to the user's side through it | A temporary package mirror for an offline server; a debugger on the target connecting back to the IDE |

**All of these must hold**

1. The master switches in system settings: Local port forwarding (-L / -D) and Remote port forwarding (-R), both off by default.
2. An authorization rule grants the Port forwarding (-L / -D) or Remote port forwarding (-R) action; neither is granted by default.
3. The destination is allowed:
   - **-L / -D may only reach the asset itself by default** (its own address, localhost, 127.0.0.1). Otherwise a forwarding grant on one host would reach every host in its network.
   - List other destinations in **Forward destinations**: networks or IPs with optional ports, e.g. \`10.1.0.0/16:3306\`, \`10.2.0.5\`, \`10.3.0.0/24:8000-8100\`.
   - Host names (\`db.corp\`, \`*.svc.corp:443\`) need their own entries, because the target resolves them and the bastion cannot know in advance where they point.
   - \`*\` allows anything the target can reach, but link-local addresses and the cloud metadata endpoint \`169.254.169.254\` still need an explicit entry.
   - **-R listens on the target host and may bind loopback only by default**, so only the target host itself can connect. To let other machines on its network connect, list an IP of the target (or \`*\`) in **Remote forward bind addresses**; the target sshd's \`GatewayPorts\` must allow it too. The bastion itself never opens a port for -R.
4. The target's sshd allows forwarding (OpenSSH and Windows' built-in OpenSSH do by default).

A session may hold 64 forwarded connections and 8 -R listeners at once; more are refused and recorded.

**Network access records**

Every forwarded connection is recorded in Activity → Network access, refused ones included:

- **Connection level** (always): refused (with the reason), failed (target unreachable), connect, close (bytes sent / received, duration), and -R listeners; with the user, asset, forward type, destination and source.
- **Protocol level** (with **Parse protocols inside forwarded connections** on): HTTP requests and responses, TLS handshakes (SNI / ALPN), MySQL / PostgreSQL logins and statements, server errors (e.g. a wrong password), Redis commands, and key facts of MongoDB, Kafka, SMTP, LDAP and DNS.
  - Dropping databases or tables, DELETE / UPDATE without WHERE, FLUSHALL and the like are high risk; schema and privilege changes are medium.
  - Passwords in statements and commands are redacted (\`IDENTIFIED BY '******'\`, \`AUTH ******\`); the authentication data of a login is never recorded.
  - Encrypted connections (HTTPS, MySQL / PostgreSQL TLS) only show their handshake.
  - One connection records at most 1000 protocol events; past that a "limit reached" entry is written and only high-risk events follow. The connection itself is unaffected.

Filter by user, asset, address, keyword, event, forward type, protocol, risk and time; click a summary for the detail, then **Show all events of this connection** to follow one connection from start to end. The records are pruned with the activity retention days.

**Examples** (bastion user alice; \`/postgres\`, \`/root\` pick the target account):

\`\`\`bash
# Local forward: port 15432 on your machine -> PostgreSQL on asset db01
ssh -p 2222 -N -L 15432:127.0.0.1:5432 alice/postgres@db01@bastion.example.com
psql -h 127.0.0.1 -p 15432 -U app appdb

# SOCKS proxy: point the browser at 127.0.0.1:1080
ssh -p 2222 -N -D 1080 alice/root@web01@bastion.example.com

# Remote forward: 127.0.0.1:9090 on the target reaches port 8080 on your machine
ssh -p 2222 -N -R 9090:localhost:8080 alice/root@web01@bastion.example.com
\`\`\`

![Port forwarding in the native client settings](/help/images/en/native-access-settings.png)

## User sync {#user-sync}

[Settings → User Sync](#/layout/admin/bastionSettings?tab=userSync) connects LDAP / Active Directory: configure the address, base DN, bind account and filter, **preview** first, then enable scheduled sync. Synced users sign in with their directory password.

**Example: a typical Active Directory source**

| Field | Example |
|---|---|
| Host / port | \`dc01.corp.local\` / \`636\` (LDAPS, import the domain CA) |
| Base DN | \`OU=Staff,DC=corp,DC=local\` |
| Bind DN | \`CN=svc-bastion,OU=Service,DC=corp,DC=local\` (read access is enough) |
| User filter (skip disabled accounts) | \`(&(objectCategory=person)(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))\` |
| Incremental cursor | \`USN (uSNChanged)\`; OpenLDAP or Synology: \`modifyTimestamp\` |

![New directory source](/help/images/en/user-sync-drawer.png)

### Restoring users deleted in the console {#restore-directory-user}

When you delete a synced user under Users, sync keeps skipping that directory entry: it never re-creates the user (or the access their directory groups grant) on its own. To bring the user back:

1. On the directory source in the user sync list, click **Deleted users**, find the user and click **Restore**.
2. Run a **full sync** (an incremental sync only handles entries changed in the directory).

Restoring creates a **new account** with the source's default role and the user's directory groups. Roles, manual user groups and direct authorizations of the old account are not restored and must be granted again. The old account's sessions and audit records are kept.

## Sign-in and authentication {#login-auth}

[Settings → Sign-in & Authentication](#/layout/admin/bastionSettings?tab=loginAuth)

- Users who enrolled an authenticator (MFA) must enter a code at console sign-in; the captcha can be always on or required after N failures.
- Password rules: minimum length, character classes (lower/upper/digit/symbol), no reuse of the last N passwords, and a maximum age — an expired password must be replaced during sign-in before any session is issued. The rules apply to registration, self-service changes and admin resets; accounts whose password a directory manages (LDAP/AD) are exempt.
- Lockout: after N consecutive failures the account locks for the configured period, with the failure count shared between the console and the native clients (SSH/RDP/databases). Locked accounts are listed on the same page and can be unlocked manually; each lock is written to the audit chain and raises a real-time alert.
- Allowed sign-in networks: one IP or CIDR per line, empty means unrestricted. Saving refuses a list that excludes your own address; if you still lock yourself out, restart the backend with \`BASTION_LOGIN_CIDR_BYPASS=1\` to ignore the list.
- Idle sign-out: the browser session ends after this many minutes without input; 0 disables it.
- Single sign-on: OIDC, SAML 2.0 and CAS. With SSO enabled you may turn off password sign-in (only effective while an SSO provider is enabled, so the console cannot be locked out).

**Example: OIDC with Keycloak**

| Field | Example |
|---|---|
| Type | OIDC |
| Issuer | \`https://sso.example.com/realms/corp\` |
| Client ID / secret | The client created for the bastion in Keycloak |
| Callback URL (register at the IdP) | \`https://bastion.example.com/api/bastion/sso/callback\` |
| Scope | \`openid profile email\` |
| User name claim | \`preferred_username\` |

For SAML the callback (ACS) URL is \`https://bastion.example.com/api/bastion/sso/acs\`.

![Sign-in & SSO settings](/help/images/en/login-auth-settings.png)

## Client access {#native}

[Settings → Client Access](#/layout/admin/bastionSettings?tab=native)

- Local-client proxy switches and ports live in the \`bastion\` section of \`server/config.yaml\`: SSH 2222, RDP 3389, databases MySQL 13306 / PostgreSQL 15432 / SQL Server 11433 / Oracle 11521 / Redis 16379 / MongoDB 37017 by default.
- Open these ports on the firewall for user networks.
- **SSH empty-connection grace** (SSH proxy settings): seconds an authenticated connection stays open after its last channel ends (0–3600, default 0 = close at once). With 30–300 s, OpenSSH ControlMaster and VS Code Remote-SSH can open further channels on the same connection without re-authenticating; larger values are capped at 3600.
- **Helper / mterminal packages**: click "Sync from GitHub" to mirror the latest release (no GitHub account needed) or upload packages manually, so internal users can download them from the connect dialog.

**Examples**:

\`\`\`bash
# SSH / SFTP: bastion user alice, asset web01 (or its IP); for a specific account write alice/root@web01
ssh -p 2222 alice@web01@bastion.example.com
sftp -P 2222 alice/root@web01@bastion.example.com

# Databases: user name "<bastion user>/<asset ID>", password = your bastion password
mysql -h bastion.example.com -P 13306 -u alice/12 -p
psql "host=bastion.example.com port=15432 user=alice/13 dbname=postgres"
\`\`\`

RDP: in mstsc set Computer to \`bastion.example.com:3389\` and the user name to \`alice@win01\`; the password is your bastion password.

![Native client access settings](/help/images/en/native-access-settings.png)

## Alert notifications {#alert}

[Settings → Alerts](#/layout/admin/bastionSettings?tab=alert) push risky commands, pending approvals, failed rotations and other events to email, webhooks, WeCom, DingTalk, Feishu or SMS, filtered by severity and event type.

**Real-time security alerts**: the events below notify everyone who can open Session Audit (the auditors, with separation of duties on) right away, and go out through alert channels subscribed to type \`alert\` at the matching severity:

| Event | Severity |
|---|---|
| High-risk command blocked (SSH / Telnet, with the command and the rule) | warn |
| SFTP file operation or port / X11 / agent forwarding blocked | warn |
| Dangerous SQL blocked by a rule (statements held for approval become tickets instead) | warn |
| Failed native-client login (at most once per source IP every 10 minutes) | warn |
| FTP transfer blocked by data-loss prevention | error |
| Audit log or recording integrity check failed | error |

Repeats of the same event by the same user on the same asset alert once per minute, so a looping script does not flood the channels.

**Log forwarding (Syslog / SIEM)**: below the alert channels, *Log forwarding* streams operation records (sessions, commands, file transfers, console and native-client sign-ins — every audit-chain event) and SQL records to a SIEM or log platform.

- Transports: UDP, TCP and TLS; TCP / TLS use RFC 6587 octet counting, compatible with rsyslog, syslog-ng, Splunk, QRadar and others.
- Formats: Syslog RFC 5424 (fields in the \`[bastion@32473 …]\` structured data) or CEF (ArcSight / QRadar). Facility 13 (log audit); blocked or failed events are sent at warning severity.
- Records go out in commit order. While the receiver is unreachable they queue up and are sent once it is back, so none are lost (an occasional duplicate is possible). A new destination receives records from now on. In a multi-node deployment one node sends to each destination at a time.
- **Send test message** checks connectivity before saving; the list shows how many records were sent, when, and the last error.

Approval results and alerts also appear under the bell icon in [Messages](#/layout/bastion/bastionNotification).

![Message center](/help/images/en/notification.png)

## Asset checks {#check}

[Settings → Asset Checks](#/layout/admin/bastionSettings?tab=check) makes the bastion proactively check assets and accounts instead of running “Test connection” by hand:

- **Asset probe**: every minute the scheduler picks up due assets and opens one TCP connection to \`IP:port\` through the asset's route (including gateways — an unreachable gateway counts as a failure).
- **Account check**: re-runs “Test connection” on its interval (SSH login check / TCP probe for other protocols). Defaults to once a day so target lockout policies are not triggered; after a failure the account is not retried until the next interval.
- **Degraded mode**: while an asset's own probe is failing, its accounts are stamped “skipped” — no wasted login attempts against a dead host.
- **Results**: each asset/account keeps \`lastCheckAt\`, \`lastCheckResult\` and a consecutive-failure counter; the asset list shows a check-status column.
- **Alerting**: reaching the failure threshold notifies all system administrators and dispatches to the alert channels (\`alert\` type, error severity); recovery sends one info notification.
- **Exec channel detection** (off by default): periodically checks whether an asset also offers SSH / WinRM, so the job center can use a more stable channel. "Verify credentials on new channels" logs in to every account and "Adopt found channels automatically" changes authorization coverage on its own — see [Exec channels](help:admin-guide#channel).

Interval, concurrency and threshold are configurable; **Run checks now** performs one sweep manually (ignores the enable switch and the intervals: every enabled asset and its accounts are checked, which means one real login per account — it asks for confirmation). Only one sweep runs at a time. Accounts of disabled assets are never logged into; every automated login check is audited (\`account-check\`). Account results show in the asset's account drawer.

![Check policy](/help/images/en/check-policy.png)

## Configuration transfer {#config-transfer}

[Settings → Configuration Transfer](#/layout/admin/bastionSettings?tab=transfer) exports nodes, assets, accounts, account groups, authorizations, access policies, command filters, SQL filters, masking rules, database quotas, published apps and user groups into one JSON file — for migrating to another instance or archiving.

- **Export**: click **Export** to download \`bastion-config-<date>.json\`. By default **no account credentials are included** (passwords and keys stay on the source instance; accounts need re-entered credentials on the target). Check "Include account credentials" and set a passphrase (8+ characters) to ship credentials encrypted with a passphrase-derived key (scrypt + AES-GCM) — guard both the file and the passphrase. Exporting credentials amounts to revealing every password at once: only system administrators can do it, after re-entering their own sign-in password (failures count toward the sign-in lockout); it is audited.
- **Import**: pick the file, then **Validate (dry run)** — the report shows how many objects of each kind will be created, updated or skipped, plus problems such as references to users or assets that do not exist; nothing is written. Then **Apply import** to write. A bundle without credentials keeps the credentials the target already holds; authorization rules are validated exactly as when saved in the editor, and invalid ones are skipped. With separation of duties on, applying requires the asset or app authorization page.
- Objects match by stable identities (names, node keys), never database IDs, so bundles move across instances; same-named objects are updated. Every reference — approval chains, asset/account/policy references inside authorization rules — is re-resolved by name at import; an entry that cannot be resolved is skipped and listed as a problem instead of producing a dangling reference.
- Recommended order: create the users on the target first (or enable directory sync), then import the configuration, then have each asset administrator re-enter account credentials.

![Config transfer](/help/images/en/config-transfer.png)

## Audit analysis {#analysis}

[Session audit → Analysis](#/layout/bastion/bastionSessionAudit?tab=analysis) gathers three Enterprise analyses; the session-audit permission is required:

- **Compliance**: checks the bastion's own configuration and audit evidence against GB/T 22239 (Dengbao 2.0) level 3 or ISO/IEC 27001:2022 control by control (MFA, authorization, recording, command filtering, log forwarding, rotation…), with satisfied / partial / gap / manual counts and a score; export CSV for assessors. Default period: 90 days.
- **Behavior anomalies**: each user's own history is the baseline; sign-in times, source addresses, assets, commands and transfer volume are analysed hourly and scored 0–100 with reasons when far from it; critical ones also raise an alert. **Analyze now** runs one immediately.
- **Recording text search**: search the text recognized on screen in RDP / VNC recordings (an order number, a file name); hits name the session, asset, user and moment. Enable OCR in the config file (\`bastion.ocr\`); recordings are recognized when they end.

Without a license covering them the tab carries an "Enterprise" tag and the page says so.

![Compliance report](/help/images/en/analysis-compliance.png)

## License {#license}

[Settings → License](#/layout/admin/bastionSettings?tab=license) shows the current edition, usage against the limits and which Enterprise features are open, and installs an Enterprise license. Only system administrators see this tab.

![License](/help/images/en/license-page.png)

**Editions and trial**

- **Community Edition**: free, with access, authorization, recording and audit, command and SQL filtering. Limits: **at most 3 concurrent RDP / VNC graphical sessions, web and native clients together**, 1 cluster replica, 1 network gateway.
- **Trial**: every Enterprise feature can be tried for 15 days, without limits.
  - **Online**: after the first start the trial is registered with the license service (or click **Register now** on the "License service" card). The service records the trial by this machine's or cluster's identifiers, so **a reinstall or a new database does not start a new trial**: the original dates come back.
  - **License service unreachable**: a 3-day provisional trial applies (15 days for an installation upgraded from an older version) and registration is retried hourly.
  - **Offline installations**: set \`BASTION_LICENSE_OFFLINE=1\`; nothing is registered and there is no provisional trial. To try the Enterprise Edition, click **Generate request code** and send it with your company and email; we issue a 15-day offline trial license. One trial per environment, company or email.
  - Docker Compose mounts the host's machine-id read-only into the container, Helm reads the cluster's \`kube-system\` namespace UID, to recognise the environment. Without any identifier (e.g. the mount removed) only the provisional trial applies, then an offline trial license is the way.
- **Enterprise Edition**: features and limits as granted by the license file.

**Installing a license**

1. Click **Generate request code** and send us the code (starting with \`WTR1.\`).
2. When the license file arrives (starting with \`WTL1.\`, or a \`.lic\` file), paste it or choose the file and click **Install license**.
3. A license file is valid for the installation it was requested for only; a file with a bad signature, for another installation or already expired is refused and the current license stays. Installs, refusals and state changes are recorded in the history and the audit log.

**Online activation**

- A license that names a license service is activated online when installed and renewed daily. The "License service" card shows the activation and lease expiry; **Sync now** renews immediately.
- A license marked "online activation required" is bounded by its lease: when the lease runs out without renewal, the grace period starts. A few days without the service do no harm (leases usually last 30 days).
- **Release activation**: before moving the license to another installation, release the seat here. If the old installation is gone, ask us to release it on the server.
- When the license service considers this installation a copy of another (e.g. a cloned machine renewing alongside the original), or the license was revoked, the grace period starts and the page explains why.
- **Server address**: \`https://jimmy2021nas.ddnsfree.com\` by default; change it on the "License service" card or with \`BASTION_LICENSE_SERVER\`. HTTPS only; \`HTTPS_PROXY\` is honoured. Reported: install ID, hashes of the environment identifiers, version and usage counts.

**Environment binding**

A license is bound to the installation's environment identifiers (hashes only): the metadata database instance, the Kubernetes cluster and the host hardware (machine-id, board UUID, NIC MAC, CPU model — two of four must match, so replacing a NIC or a CPU does not matter). Moving the database to another instance, or the installation to another cluster or host, starts the grace period until a new license is requested with the current request code. The "This installation" card shows each identifier's state.

**Expiry and limits**

- Reminders start 30 days before expiry; a 15-day grace period follows with Enterprise features still available; after it:
  - **security features** (log forwarding, data masking, SQL quotas, SAML / CAS single sign-on, directory user sync, advanced rotation) **keep enforcing** existing rules but cannot be created or changed;
  - **the other Enterprise features** stop, with their configuration kept until a license is installed again.
- No state ever cuts a live session, stops recording or audit, or keeps administrators from signing in.
- Over a limit only new operations are refused (new assets, users, gateways or graphical sessions); existing ones keep working. Refusals are audited (\`license-limit-reached\`).

Enterprise tabs and menus carry an "Enterprise" tag; when the license does not include them, a notice at the top of the page explains what still works.
`,Ti=`# 常见问题

## 一直显示「Helper 未安装」 {#helper-not-detected}

1. 确认已经安装并**运行过一次** Helper（首次运行完成 \`wterm://\` 注册）。
2. 点连接窗口里的 **重新检测**。
3. 浏览器弹出「是否打开 Webterminal Helper」时选择允许，并勾选「始终允许」。
4. macOS 首次打开提示「无法验证开发者」时，在「系统设置 → 隐私与安全性」中点「仍要打开」。

## 点「启动」远程应用没反应或弹出警告 {#remoteapp-client}

RemoteApp 需要支持 RAIL 的客户端。打开 Helper 设置，把 RDP 客户端改为 **Windows App**（macOS）、**mstsc**（Windows）或 **FreeRDP**（Linux）。也可以改用「下载 .rdp」手动打开。

## 资产连接里什么都看不到 {#no-assets}

说明还没有授权给你的资产。点工作台里的 **申请访问权限** 提交申请，或联系资产管理员。已授权但仍看不到时，检查授权是否已过期、访问策略的时间段或来源 IP 限制。

## 连接时要求多因子认证 {#mfa}

该资产的访问策略要求二次验证。点右上角头像 → **多因子认证** 绑定验证器 App 后重试。

## 「本地代理未启用」 {#native-disabled}

管理员尚未开启本地客户端直连代理。请管理员在 \`server/config.yaml\` 的 \`bastion\` 段启用对应代理（或设置 \`BASTION_SSH_PROXY_ENABLED\` / \`BASTION_RDP_PROXY_ENABLED\`）并重启服务。期间可以继续使用浏览器连接。

## Helper 检查更新报 403 {#update-403}

GitHub 对匿名访问限流（每个出口 IP 每小时 60 次）。稍后重试，或由管理员在「客户端接入」同步安装包后，从连接窗口本地下载新版。

## 连接时下拉里没有我要的账号 {#account-not-listed}

账号下拉框只列出授权给你的账号。可能的原因：授权里没有包含这个账号名、该账号刚被改名导致授权失配、或授权只允许「手动输入」。请联系管理员调整授权的账号范围，或提交资产授权申请注明需要的账号。

## 为什么我的操作被拦截 {#blocked}

可能命中了三种限制：命令过滤 / SQL 过滤规则、授权未覆盖你选择的账号或协议、或访问策略（来源 IP、时间段）。提示中会给出原因；SQL 规则为「需审批」级别时可直接提交 SQL 审批，通过后执行；其余情况请联系管理员调整规则或授权。

## 会话录像保存在哪里 {#recording}

录像默认保存在服务器本地，可配置上传到 S3 / MinIO 等对象存储。审计员在「会话审计 → 会话记录」中回放。
`,Di=`# FAQ

## "Helper not installed" never goes away {#helper-not-detected}

1. Make sure Helper is installed and has been **run once** (the first run registers \`wterm://\`).
2. Click **Re-check** in the connect dialog.
3. When the browser asks whether to open Webterminal Helper, allow it and tick "always allow".
4. On macOS, if the first launch says the developer cannot be verified, click "Open Anyway" in System Settings → Privacy & Security.

## Launching a remote app does nothing or shows a warning {#remoteapp-client}

RemoteApp needs a RAIL-capable client. In Helper's settings set the RDP client to **Windows App** (macOS), **mstsc** (Windows) or **FreeRDP** (Linux), or use "Download .rdp" instead.

## Asset Connect shows nothing {#no-assets}

No assets have been granted to you yet. Click **Request access** in the workspace or contact the asset administrator. If you were granted access but still see nothing, check whether the authorization has expired or an access policy restricts your source IP.

## A connection asks for MFA {#mfa}

The asset's access policy requires a second factor. Enroll an authenticator app via avatar menu → **MFA** and try again.

## "Local proxy not enabled" {#native-disabled}

The local-client proxies are off. An administrator enables them in the \`bastion\` section of \`server/config.yaml\` (or with \`BASTION_SSH_PROXY_ENABLED\` / \`BASTION_RDP_PROXY_ENABLED\`) and restarts the server. Browser connections keep working meanwhile.

## Helper's update check fails with 403 {#update-403}

GitHub rate-limits anonymous requests (60 per hour per public IP). Try again later, or download the new version from the connect dialog once an administrator has synced the packages under Client Access.

## The account I need isn't in the connect list {#account-not-listed}

The account selector only lists the accounts granted to you. Common causes: the rule doesn't include that account name, the account was just renamed so the rule no longer matches, or the rule only allows manual input. Ask an administrator to adjust the rule's account scope, or submit an asset-access request naming the account you need.

## Why was my command blocked? {#blocked}

Three kinds of limits may apply: command / SQL filter rules, an authorization that doesn't cover the account or protocol you picked, or an access policy (source IP, time window). The message says which; for SQL rules at the "approval" level, submit a SQL approval and run the statement once approved; otherwise ask an administrator to adjust the rule or your authorization.

## Where are recordings kept? {#recording}

Recordings are stored on the server by default and can be uploaded to object storage such as S3 / MinIO. Auditors replay them under Session Audit → Session History.
`,yt=["overview","install","quickstart","user-guide","admin-guide","faq"],Ni=[{group:"start",docs:["overview","install","quickstart"]},{group:"guide",docs:["user-guide","admin-guide"]},{group:"more",docs:["faq"]}],ji={zh:{overview:wi,install:vi,quickstart:xi,"user-guide":Ri,"admin-guide":Ci,faq:Ti},en:{overview:Si,install:ki,quickstart:Pi,"user-guide":Ai,"admin-guide":Li,faq:Di}},Oi=n=>!!n&&yt.includes(n),gs=(n,e)=>ji[e][n],Ei=/^## (.+?) \{#([\w-]+)\}\s*$/gm,En=n=>n.replace(/!\[[^\]]*\]\([^)]*\)/g,"").replace(/\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/^\s*(?:[-*]|\d+\.)\s+/gm,"").replace(/^\|?[-| :]+\|?$/gm,"").replace(/[`*>#|]/g," ").replace(/\s+/g," ").trim();function $n(n,e){const t=gs(n,e),a=[],s=[...t.matchAll(Ei)];return s.forEach((r,i)=>{const l=i+1<s.length?s[i+1].index:t.length;a.push({doc:n,id:r[2],title:En(r[1]),text:En(t.slice(r.index+r[0].length,l))})}),a}function $i(){const{doc:n}=Ss(),{c:e,lang:t}=V(),a=_n(),[s,r]=R.useState(""),i=R.useMemo(()=>yt.flatMap(d=>$n(d,t)),[t]),l=R.useMemo(()=>{const d=s.trim().toLowerCase();return d?i.filter(u=>u.title.toLowerCase().includes(d)||u.text.toLowerCase().includes(d)).slice(0,30):[]},[s,i]);if(!Oi(n))return o.jsx(Mn,{to:"/docs/overview",replace:!0});const c=$n(n,t),h=d=>{const u=s.trim().toLowerCase(),p=d.text.toLowerCase().indexOf(u);return p<0?d.text.slice(0,80):(p>30?"…":"")+d.text.slice(Math.max(0,p-30),p+60)+"…"};return o.jsxs("div",{className:"docs container",children:[o.jsxs("aside",{className:"docs-side",children:[o.jsx(_s,{allowClear:!0,prefix:o.jsx(Ms,{}),placeholder:e.docs.search,value:s,onChange:d=>r(d.target.value),"data-testid":"docs-search"}),s.trim()?o.jsxs("div",{className:"docs-results","data-testid":"docs-results",children:[l.length===0&&o.jsx("div",{className:"muted",children:e.docs.noResult}),l.map(d=>o.jsxs(j,{to:`/docs/${d.doc}#${d.id}`,onClick:()=>r(""),className:"docs-result",children:[o.jsx("b",{children:d.title}),o.jsx("span",{className:"muted",children:e.docs.names[d.doc]}),o.jsx("p",{children:h(d)})]},`${d.doc}#${d.id}`))]}):Ni.map(d=>o.jsxs("div",{className:"docs-group",children:[o.jsx("div",{className:"docs-group-title",children:e.docs.groups[d.group]}),d.docs.map(u=>o.jsx(j,{to:`/docs/${u}`,className:`docs-link${u===n?" active":""}`,children:e.docs.names[u]},u))]},d.group))]}),o.jsxs("article",{className:"docs-main",children:[o.jsx(Fs,{className:"docs-mobile-select",value:n,onChange:d=>a(`/docs/${d}`),options:yt.map(d=>({value:d,label:e.docs.names[d]}))}),o.jsx(yi,{source:gs(n,t)}),$.docsSource]}),o.jsxs("nav",{className:"docs-toc",children:[o.jsx("div",{className:"docs-group-title",children:e.docs.onThisPage}),c.map(d=>o.jsx(j,{to:`/docs/${n}#${d.id}`,children:d.title},d.id))]})]})}const Ii=({v:n,label:e})=>n==="yes"?o.jsx("span",{className:"yes",title:e,children:o.jsx(Fe,{})}):n==="—"?o.jsx("span",{className:"no",children:o.jsx(Ws,{})}):o.jsx("span",{className:"partial",children:n});function Hi(){const{c:n}=V();return o.jsxs("div",{className:"page container",children:[o.jsxs("div",{className:"page-head",children:[o.jsx("h1",{children:n.compare.title}),o.jsx("p",{children:n.compare.subtitle})]}),o.jsx("div",{className:"table-wrap",children:o.jsxs("table",{className:"compare-table","data-testid":"compare-table",children:[o.jsx("thead",{children:o.jsx("tr",{children:n.compare.columns.map((e,t)=>o.jsx("th",{className:t===1?"ours":void 0,children:e},e))})}),o.jsx("tbody",{children:n.compare.groups.map(e=>[o.jsx("tr",{className:"group-row",children:o.jsx("td",{colSpan:n.compare.columns.length,children:e.title})},e.title),...e.rows.map(t=>o.jsxs("tr",{children:[o.jsx("td",{children:t.k}),t.v.map((a,s)=>o.jsx("td",{className:s===0?"ours":void 0,children:o.jsx(Ii,{v:a,label:n.compare.legendYes})},s))]},e.title+t.k))])})]})}),o.jsx("p",{className:"note",children:n.compare.note})]})}const _i={zh:[{key:"community",name:"社区版",price:"免费",desc:"免费，覆盖接入、授权与审计主线，适合自行部署与维护。",action:"deploy",features:["接入协议：SSH、SFTP、RDP、VNC、Telnet、FTP、MySQL、PostgreSQL、SQL Server、Oracle、Redis、MongoDB","网页终端与本地客户端（Helper 一键拉起）","账号级授权、动作控制、访问策略、MFA、权限申请与审批","LDAP / AD 登录、OIDC 单点登录","托管账号，SSH、WinRM、数据库账号自动改密","命令过滤、SQL 过滤与 SQL 工单","录像回放、实时监控、会话共享与接管、审计哈希链","批量作业（SSH 通道）、资产巡检、告警通知","限额：图形会话（RDP / VNC）同时 3 个，网络网关 1 个，单副本","社区支持：GitHub Issues、微信交流群"]},{key:"enterprise",name:"企业版",price:"按规模订阅",desc:"在社区版基础上增加高级功能与商业保障；安装后可免费试用 15 天。",action:"contact",recommended:!0,features:["包含社区版全部功能，图形会话、资产、用户等限额按授权","规模与高可用：集群多副本、多网关","合规审计：合规报表（等保 2.0 / ISO 27001）、异常行为分析、录像文字检索、日志外发","数据库高级管控：动态脱敏、SQL 配额、规则模板、SQL 回滚、结构迁移与漂移检测、SQL 高级分析","身份与自动化：SAML / CAS、用户目录同步、高级改密、定时作业、RDP / WinRM 通道作业","远程应用（RemoteApp）、Kubernetes 容器终端","商业授权、部署与升级支持、SLA 与优先修复、定制开发、培训"]}],en:[{key:"community",name:"Community",price:"Free",desc:"Free, covering access, authorization and audit — for teams that deploy and run it themselves.",action:"deploy",features:["Protocols: SSH, SFTP, RDP, VNC, Telnet, FTP, MySQL, PostgreSQL, SQL Server, Oracle, Redis, MongoDB","Web terminals and native clients (one-click launch with Helper)","Account-scoped grants, action control, access policies, MFA, access requests and approvals","LDAP / AD sign-in, OIDC single sign-on","Managed accounts; rotation for SSH, WinRM and database accounts","Command filtering, SQL filtering and SQL tickets","Recording replay, live monitoring, session sharing and takeover, audit hash chain","Batch jobs (SSH channel), asset checks, alert notifications","Limits: 3 concurrent graphical (RDP / VNC) sessions, 1 network gateway, single replica","Community support: GitHub issues, WeChat group"]},{key:"enterprise",name:"Enterprise",price:"Subscription by scale",desc:"Advanced features and commercial assurance on top of Community; try it free for 15 days after installing.",action:"contact",recommended:!0,features:["Everything in Community; limits on graphical sessions, assets and users per license","Scale and HA: multi-replica cluster, multiple gateways","Compliance audit: compliance reports (Dengbao 2.0 / ISO 27001), behavior analytics, recording text search, log forwarding","Advanced database control: dynamic masking, SQL quotas, rule templates, SQL rollback, schema migration and drift, advanced SQL analysis","Identity and automation: SAML / CAS, directory sync, advanced rotation, scheduled jobs, jobs over RDP / WinRM","Remote apps (RemoteApp), Kubernetes container terminals","Commercial license, deployment and upgrade support, SLA and priority fixes, custom development, training"]}]};function Mi(){const{c:n,lang:e}=V();return o.jsxs("div",{className:"page container",children:[o.jsxs("div",{className:"page-head",children:[o.jsx("h1",{children:n.editions.title}),o.jsx("p",{children:n.editions.subtitle})]}),o.jsx("div",{className:"edition-grid",children:_i[e].map(t=>o.jsxs("div",{className:`edition${t.recommended?" recommended":""}`,"data-testid":`edition-${t.key}`,children:[o.jsxs("div",{className:"edition-head",children:[o.jsx("h2",{children:t.name}),t.recommended&&o.jsx(zs,{color:"blue",children:n.editions.recommended})]}),o.jsx("div",{className:"edition-price",children:t.price}),o.jsx("p",{className:"muted",children:t.desc}),o.jsx("ul",{children:t.features.map(a=>o.jsxs("li",{children:[o.jsx(Fe,{}),a]},a))}),t.action==="deploy"?o.jsx(j,{to:"/docs/install",children:o.jsx(F,{block:!0,size:"large",children:n.editions.download})}):o.jsx(F,{block:!0,size:"large",type:"primary",href:`mailto:${$.email}?subject=Webterminal%20Enterprise`,children:n.editions.contact})]},t.key))})]})}const Fi="/webterminal/";function Wi(){const{c:n}=V();return o.jsxs("div",{className:"page container",children:[o.jsxs("div",{className:"page-head",children:[o.jsx("h1",{children:n.community.title}),o.jsx("p",{children:n.community.subtitle})]}),o.jsxs("div",{className:"community-grid",children:[o.jsxs("div",{className:"plain-card qr-card",children:[o.jsxs("h3",{children:[o.jsx(jt,{})," ",n.community.wechatGroup]}),o.jsx("p",{className:"muted",children:n.community.wechatGroupDesc}),o.jsx("img",{src:`${Fi}${$.wechatGroupQr}`,alt:n.community.wechatGroup,className:"qr","data-testid":"wechat-qr"}),o.jsx("p",{className:"muted small",children:n.community.qrExpired})]}),o.jsxs("div",{className:"contact-list",children:[o.jsxs("div",{className:"plain-card contact",children:[o.jsx(jt,{className:"contact-icon wechat"}),o.jsxs("div",{children:[o.jsx("b",{children:n.community.wechat}),o.jsx(Ot.Paragraph,{copyable:{text:$.wechat},className:"contact-value",children:$.wechat})]})]}),o.jsxs("div",{className:"plain-card contact",children:[o.jsx(qs,{className:"contact-icon"}),o.jsxs("div",{children:[o.jsx("b",{children:n.community.email}),o.jsx(Ot.Paragraph,{copyable:{text:$.email},className:"contact-value",children:o.jsx("a",{href:`mailto:${$.email}`,children:$.email})}),o.jsx("span",{className:"muted",children:n.community.emailDesc})]})]}),o.jsxs("div",{className:"plain-card contact",children:[o.jsx(Qs,{className:"contact-icon"}),o.jsxs("div",{children:[o.jsx("b",{children:n.community.issues}),o.jsx("p",{className:"muted",children:n.community.issuesDesc}),o.jsx(F,{icon:o.jsx(Me,{}),href:$.issues,target:"_blank",rel:"noopener noreferrer",children:"GitHub Issues"})]})]}),o.jsxs("div",{className:"plain-card contact",children:[o.jsx(Bs,{className:"contact-icon"}),o.jsxs("div",{children:[o.jsx("b",{children:n.community.pr}),o.jsx("p",{className:"muted",children:n.community.prDesc}),o.jsx(F,{icon:o.jsx(Me,{}),href:$.github,target:"_blank",rel:"noopener noreferrer",children:n.common.viewOnGithub})]})]}),o.jsx("p",{className:"muted small",children:n.community.security})]})]})]})}function zi(){const{c:n}=V();return o.jsx("div",{className:"page container",children:o.jsx(Us,{status:"404",title:"404",subTitle:n.common.notFound,extra:o.jsx(j,{to:"/",children:o.jsx(F,{type:"primary",children:n.common.backHome})})})})}const qi="#0ea5e9";function Qi(){const{pathname:n,hash:e}=Hn();return R.useEffect(()=>{if(!e){window.scrollTo(0,0);return}const t=decodeURIComponent(e.slice(1));let a=0;const s=()=>{const r=document.getElementById(t);r?window.scrollTo({top:r.getBoundingClientRect().top+window.scrollY-80}):a++<20&&setTimeout(s,50)};s()},[n,e]),null}function Bi(){const{lang:n}=V();return o.jsx(Vs,{locale:n==="zh"?Xa:rr,theme:{token:{colorPrimary:qi,borderRadius:8,fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Roboto, sans-serif"}},children:o.jsxs(Gs,{children:[o.jsx(Qi,{}),o.jsx(or,{}),o.jsx("main",{className:"site-main",children:o.jsxs(vs,{children:[o.jsx(te,{path:"/",element:o.jsx(gr,{})}),o.jsx(te,{path:"/docs",element:o.jsx(Mn,{to:"/docs/overview",replace:!0})}),o.jsx(te,{path:"/docs/:doc",element:o.jsx($i,{})}),o.jsx(te,{path:"/compare",element:o.jsx(Hi,{})}),o.jsx(te,{path:"/editions",element:o.jsx(Mi,{})}),o.jsx(te,{path:"/community",element:o.jsx(Wi,{})}),o.jsx(te,{path:"*",element:o.jsx(zi,{})})]})}),o.jsx(cr,{})]})})}Js.createRoot(document.getElementById("root")).render(o.jsx(ks.StrictMode,{children:o.jsx(xs,{basename:"/webterminal/".replace(/\/$/,""),children:o.jsx(Bi,{})})}));
