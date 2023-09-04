/*!
 * VERSION: 0.2.1
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
import{_gsScope,Ease}from"gsap/TweenLite.js";import CustomEase from"./CustomEase.js";_gsScope._gsDefine("easing.CustomWiggle",["easing.CustomEase","easing.Ease"],function(){var t,e={easeOut:new CustomEase("","M0,1,C0.7,1,0.6,0,1,0"),easeInOut:new CustomEase("","M0,0,C0.104,0,0.242,1,0.444,1,0.644,1,0.608,0,1,0"),anticipate:new CustomEase("","M0,0,C0,0.222,0.024,0.386,0.06,0.402,0.181,0.455,0.647,0.646,0.7,0.67,0.9,0.76,1,0.846,1,1"),uniform:new CustomEase("","M0,0,C0,0.95,0.01,1,0.01,1,0.01,1,1,1,1,1,1,1,1,0.01,1,0")},a=new CustomEase,s=function(t,e){return(t=t.getRatio?t:Ease.map[t]||new CustomEase("",t)).rawBezier||!e?t:{getRatio:function(e){return 1-t.getRatio(e)}}},o=function(t,e){this.vars=e||{},CustomEase.call(this,t),this.update(this.vars)};return o.prototype=t=new CustomEase,t.constructor=o,t.update=function(t){var o,i,n,u,g,r,m,p,h,C=0|((t=t||this.vars).wiggles||10),E=1/C,c=E/2,f="anticipate"===t.type,l=e[t.type]||e.easeOut,R=a;if(f&&(R=l,l=e.easeOut),t.timingEase&&(R=s(t.timingEase)),t.amplitudeEase&&(l=s(t.amplitudeEase,!0)),p=[0,0,(r=R.getRatio(c))/4,0,r/2,m=f?-l.getRatio(c):l.getRatio(c),r,m],"random"===t.type){for(p.length=4,o=R.getRatio(E),i=2*Math.random()-1,h=2;h<C;h++)c=o,m=i,o=R.getRatio(E*h),i=2*Math.random()-1,n=Math.atan2(i-p[p.length-3],o-p[p.length-4]),u=Math.cos(n)*E,g=Math.sin(n)*E,p.push(c-u,m-g,c,m,c+u,m+g);p.push(o,0,1,0)}else{for(h=1;h<C;h++)p.push(R.getRatio(c+E/2),m),c+=E,m=(m>0?-1:1)*l.getRatio(h*E),r=R.getRatio(c),p.push(R.getRatio(c-E/2),m,r,m);p.push(R.getRatio(c+E/4),m,R.getRatio(c+E/4),0,1,0)}for(h=p.length;--h>-1;)p[h]=(1e3*p[h]|0)/1e3;p[2]="C"+p[2],this.setData("M"+p.join(","))},o.create=function(t,e){return new o(t,e)},o.version="0.2.1",o.eases=e,o},!0);export const CustomWiggle=_gsScope.CustomWiggle;export{CustomWiggle as default};
