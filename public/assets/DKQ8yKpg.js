/**
 * © 2025 Melvin Jones Repol. All rights reserved.
 * This project is licensed under the MIT License with Commons Clause.
*/
import{g as r}from"./Dph47E3T.js";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var t,e;const n=r(function(){if(e)return t;e=1;var r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;return t=function(){try{if(!Object.assign)return!1;var r=new String("abc");if(r[5]="de","5"===Object.getOwnPropertyNames(r)[0])return!1;for(var t={},e=0;e<10;e++)t["_"+String.fromCharCode(e)]=e;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(r){return t[r]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(r){n[r]=r})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(t,e){for(var a,c,i=function(r){if(null==r)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(r)}(t),f=1;f<arguments.length;f++){for(var s in a=Object(arguments[f]))n.call(a,s)&&(i[s]=a[s]);if(r){c=r(a);for(var u=0;u<c.length;u++)o.call(a,c[u])&&(i[c[u]]=a[c[u]])}}return i}}());export{n as o};
