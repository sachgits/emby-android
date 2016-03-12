define(["visibleinviewport","imageFetcher"],function(e,t){function n(t,n){return e(t,!0,f,d,n)}function r(e){var n=e.getAttribute("data-src");n&&(h.enableFade?t.loadImage(e,n).then(a):t.loadImage(e,n),e.setAttribute("data-src",""))}function a(e){if(!e.classList.contains("noFade")){var t=[{opacity:"0",offset:0},{opacity:"1",offset:1}],n={duration:300,iterations:1};e.animate(t,n)}}function i(e){for(var t=0,n=e.length;n>t;t++)e[t]=!0}function o(e){function t(t){for(var i=[],s=!1,u=!1,c={innerHeight:window.innerHeight,innerWidth:window.innerWidth},l=0,f=e.length;f>l;l++){if(o[t])return;var d=e[l];!u&&n(d,c)?(s=!0,r(d)):(s&&(u=!0),i.push(d))}e=i,e.length||(document.removeEventListener("focus",a,!0),document.removeEventListener("scroll",a,!0),document.removeEventListener(v,a,!0),window.removeEventListener("resize",a,!0))}function a(){i(o);var e=o.length;o.length++,setTimeout(function(){t(e)},1)}if(e.length){var o=[];document.addEventListener("scroll",a,!0),document.addEventListener("focus",a,!0),document.addEventListener(v,a,!0),window.addEventListener("resize",a,!0),a()}}function s(e){for(var t=0,n=e.length;n>t;t++){var r=e[0],a=r.getAttribute("data-src");a&&(ImageStore.setImageInto(r,a),r.setAttribute("data-src",""))}}function u(e){o(e.getElementsByClassName("lazy"))}function c(e,t){e.setAttribute("data-src",t),s([e])}function l(e){for(var t=[],n=0,r=e.length;r>n;n++){var a=e[n].PrimaryImageAspectRatio||0;a&&(t[t.length]=a)}if(!t.length)return null;t.sort(function(e,t){return e-t});var i,o=Math.floor(t.length/2);i=t.length%2?t[o]:(t[o-1]+t[o])/2;var s=2/3;if(Math.abs(s-i)<=.15)return s;var u=16/9;if(Math.abs(u-i)<=.2)return u;if(Math.abs(1-i)<=.15)return 1;var c=4/3;return Math.abs(c-i)<=.15?c:i}function s(e){for(var t=0,n=e.length;n>t;t++){var a=e[0];r(a)}}function c(e,t){e.setAttribute("data-src",t),r(e)}var f=screen.availWidth,d=screen.availHeight,v=document.implementation.hasFeature("Event.wheel","3.0")?"wheel":"mousewheel",h={};return h.fillImages=s,h.lazyImage=c,h.lazyChildren=u,h.getPrimaryImageAspectRatio=l,h});