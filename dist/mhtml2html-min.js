!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.mhtml2html=e()}}(function(){var e;return function e(t,n,o){function r(d,a){if(!n[d]){if(!t[d]){var f="function"==typeof require&&require;if(!a&&f)return f(d,!0);if(i)return i(d,!0);var u=new Error("Cannot find module '"+d+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[d]={exports:{}};t[d][0].call(l.exports,function(e){var n=t[d][1][e];return r(n||e)},l,l.exports,e,t,n,o)}return n[d].exports}for(var i="function"==typeof require&&require,d=0;d<o.length;d++)r(o[d]);return r}({1:[function(t,n,o){(function(t){!function(r){var i="object"==typeof o&&o,d="object"==typeof n&&n&&n.exports==i&&n,a="object"==typeof t&&t;a.global!==a&&a.window!==a||(r=a);var f=String.fromCharCode,u=function(e){return e.replace(/[\t\x20]$/gm,"").replace(/=(?:\r\n?|\n|$)/g,"").replace(/=([a-fA-F0-9]{2})/g,function(e,t){var n=parseInt(t,16);return f(n)})},l=function(e){return e.replace(/\x20$/,"=20").replace(/\t$/,"=09")},c=/[\0-\x08\n-\x1F=\x7F-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,s=function(e){for(var t=e.replace(c,function(e){if(e>"ÿ")throw RangeError("`quotedPrintable.encode()` expects extended ASCII input only. Don’t forget to encode the input first using a character encoding like UTF-8.");return"="+("0"+e.charCodeAt(0).toString(16).toUpperCase()).slice(-2)}),n=t.split(/\r\n?|\n/g),o=-1,r=n.length,i=[];++o<r;)for(var d=n[o],a=75,f=0,u=d.length;f<u;){var s=t.slice(f,f+a);/=$/.test(s)?(s=s.slice(0,a-1),f+=a-1):/=[A-F0-9]$/.test(s)?(s=s.slice(0,a-2),f+=a-2):f+=a,i.push(s)}var p=s.length;return/[\t\x20]$/.test(s)&&(i.pop(),p+2<=a+1?i.push(l(s)):i.push(s.slice(0,p-1),l(s.slice(p-1,p)))),i.join("=\r\n")},p={encode:s,decode:u,version:"1.0.1"};if("function"==typeof e&&"object"==typeof e.amd&&e.amd)e(function(){return p});else if(i&&!i.nodeType)if(d)d.exports=p;else for(var v in p)p.hasOwnProperty(v)&&(i[v]=p[v]);else r.quotedPrintable=p}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,n){"use strict";function o(e,t){if(!e)throw new Error(t)}function r(e){var t=/[\\\"\x00-\x1f\x7f-\uffff]/g,n={"\b":"\b","\t":"\t","\n":"\n","\f":"\f","\r":"\r",'"':'"',"\\":"\\"};return t.lastIndex=0,t.test(e)?e.replace(t,function(e){var t=n[e];return"string"==typeof t?t:"\\"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}):e}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d=e("quoted-printable"),a=void 0,f=void 0,u=void 0;!function(){"undefined"!=typeof window&&(a=window.mhtml2html);var t=void 0!==e?e:null;if("undefined"==typeof DOMParser){var n=t("jsdom").jsdom;u=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];return n.apply(void 0,t.concat([{}]))}}else{var o=new DOMParser;u=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.parseFromString.apply(o,t.concat(["text/html"]))}}f="undefined"==typeof btoa?t("btoa"):btoa}();var l={noConflict:function(){return"undefined"!=typeof window&&(window.mhtml2html=a),l},parse:function(e){function t(){for(;o(M<e.length-1,"Unexpected EOF"),/\s/.test(e[M]);)M++,"\n"==e[M]&&w++}function n(t){var n;for(T=M;;){if("\n"==e[M]){M++,w++;break}o(M++<e.length-1,"Unexpected EOF")}switch(n=e.substring(T,M),t){case"quoted-printable":return d.decode(n);case"base64":return n.trim();default:return n}}function r(e,t){var n=e.split(/[:=](.+)?/);o(n.length>=2,"Invalid header; Line "+w),t[n[0].trim()]=n[1].trim()}var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a={MHTML_HEADERS:0,MTHML_CONTENT:1,MHTML_DATA:2,MHTML_END:3},f=void 0,l=void 0,c=void 0,s=void 0,p=void 0,v=void 0,y=void 0,h=void 0,g=void 0,b=void 0,m=void 0,x=void 0,M=void 0,T=void 0,w=void 0,E=void 0;for(l={},c={},s={},p={},b=a.MHTML_HEADERS,M=w=0;b!=a.MHTML_END;)switch(b){case a.MHTML_HEADERS:m=n(),0!=m&&"\n"!=m?r(m,l):(E=l.boundary,o(void 0!==E,"Missing boundary from document headers; Line "+w),E=E.replace(/\"/g,""),t(),m=n(),o(m.includes(E),"Expected boundary; Line "+w),c={},b=a.MTHML_CONTENT);break;case a.MTHML_CONTENT:m=n(),0!=m&&"\n"!=m?r(m,c):(y=c["Content-Transfer-Encoding"],h=c["Content-Type"],g=c["Content-ID"],v=c["Content-Location"],void 0===x&&(x=v,o(void 0!==x&&"text/html"===h,"Index not found; Line "+w)),o(void 0!==g||void 0!==v,"ID or location header not provided;  Line "+w),o(void 0!==y,"Content-Transfer-Encoding not provided;  Line "+w),o(void 0!==h,"Content-Type not provided; Line "+w),f={encoding:y,type:h,data:"",id:g},void 0!==g&&(p[g]=f),void 0!==v&&void 0===s[v]&&(s[v]=f),t(),c={},b=a.MHTML_DATA);break;case a.MHTML_DATA:for(m=n(y);!m.includes(E);)f.data+=m,m=n(y);try{f.data=decodeURIComponent(escape(f.data))}catch(e){}if(!0===i&&void 0!==x)return u(f.data);b=M>=e.length-1?a.MHTML_END:a.MTHML_CONTENT}return{frames:p,media:s,index:x}},convert:function(e){function t(e,t){function n(n){r=e.split("/"),i=t.split("/"),n&&r.pop();for(var o=0;o<i.length;o++)".."==i[o]?r.pop():"."!=i[o]&&r.push(i[o]);return r.join("/")}var o,r,i,d;return/^((http|https|ftp):\/\/)/.test(t)?t:"/"==t[0]?(o=e.match(new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?")),o[2]+"://"+o[4]+t):(d=n(),null==c[d]?n(!0):d)}function n(e,n){var o,i;return p=n.substring(v,n.indexOf(")",v)),v+=p.length,o=t(e,p.replace(/(\"|\')/g,"")),null==c[o]?null:(p="url('data:"+c[o].type+";base64,"+("base64"===c[o].encoding?c[o].data:f(unescape(encodeURIComponent(r(c[o].data)))))+"')",i=v,v=y+p.length,""+n.substring(0,y)+p+n.substring(i+1))}var a=void 0,c=void 0,s=void 0,p=void 0,v=void 0,y=void 0;return(void 0===e?"undefined":i(e))===i("")?e=l.parse(e):o((void 0===e?"undefined":i(e))===i({}),"Expected argument of type string or object"),s=e.frames,c=e.media,a=e.index,o((void 0===s?"undefined":i(s))===i({}),"MHTML error: invalid frames"),o((void 0===c?"undefined":i(c))===i({}),"MHTML error: invalid media"),o((void 0===a?"undefined":i(a))===i(" "),"MHTML error: invalid index"),o(c[a]&&"text/html"===c[a].type,"MHTML error: invalid index"),function(e){var t=void 0,o=void 0,i=void 0,u=void 0,l=void 0,s=void 0,h=void 0;for(i=[e];i.length;){for(t=i.shift(),o=new Array(Object.keys(t.childNodes).length),v=0;v<o.length;v++)o[v]=t.childNodes[v];o.forEach(function(o){switch(o.getAttribute&&(l=o.getAttribute("href"),s=o.getAttribute("src")),o.tagName){case"HEAD":u=e.createElement("base"),u.setAttribute("target","_parent"),o.insertBefore(u,o.firstChild);break;case"LINK":if(void 0!==c[l]&&"text/css"===c[l].type){for(h=e.createElement("style"),h.type="text/css",v=0;(v=c[l].data.indexOf("url(",v))>0;)y=v,v+="url(".length,null!=(p=n(l,c[l].data))&&(c[l].data=p);h.appendChild(e.createTextNode(r(c[l].data))),t.replaceChild(h,o)}break;case"IMG":if(void 0!==c[s]&&c[s].type.includes("image")){switch(c[s].encoding){case"quoted-printable":p="data:"+c[s].type+";utf8,"+d.decode(c[s].data);break;case"base64":p="data:"+c[s].type+";base64,"+c[s].data;break;default:p="data:"+c[s].type+";base64,"+f(unescape(encodeURIComponent(r(c[s].data))))}o.setAttribute("src",p)}default:for(h in o.style)if("string"==typeof o.style[h])for(;(v=o.style[h].indexOf("url(",v))>0;)y=v,v+="url(".length,null!=(p=n(a,o.style[h]))&&(o.style[h]=p)}o.removeAttribute&&o.removeAttribute("integrity"),i.push(o)})}return e}(u(c[a].data))}};t.exports=l},{"quoted-printable":1}]},{},[2])(2)});