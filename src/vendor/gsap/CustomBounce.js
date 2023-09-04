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
import{_gsScope}from"gsap/TweenLite.js";import CustomEase from"./CustomEase.js";_gsScope._gsDefine("easing.CustomBounce",["easing.CustomEase"],function(){var s,t=function(s){var t,e=s.length,u=1/s[e-2];for(t=2;t<e;t+=2)s[t]=(s[t]*u*1e3|0)/1e3;s[e-2]=1},e=function(s,t){this.vars=t=t||{},t.squash&&(this.squash=new CustomEase(t.squashID||s+"-squash")),CustomEase.call(this,s),this.bounce=this,this.update(t)};return e.prototype=s=new CustomEase,s.constructor=e,s.update=function(s){s=s||this.vars;var e,u,o,n,a,i,h,r=Math.min(.999,s.strength||.7),c=r,f=(s.squash||0)/100,m=f,p=1/.03,C=.2,g=1,q=.1,l=[0,0,.07,0,.1,1,.1,1],E=[0,0,0,0,.1,0,.1,0];for(a=0;a<200&&(i=q+(C*=c*((c+1)/2)),n=1-(g*=r*r),u=(o=q+.49*C)+.8*(o-(e=q+g/p)),f&&(q+=f,e+=f,o+=f,u+=f,i+=f,h=f/m,E.push(q-f,0,q-f,h,q-f/2,h,q,h,q,0,q,0,q,-.6*h,q+(i-q)/6,0,i,0),l.push(q-f,1,q,1,q,1),f*=r*r),l.push(q,1,e,n,o,n,u,n,i,1,i,1),r*=.95,p=g/(i-u),q=i,!(n>.999));a++);if(s.endAtStart){if(o=-.1,l.unshift(o,1,o,1,-.07,0),m)for(o-=f=2.5*m,l.unshift(o,1,o,1,o,1),E.splice(0,6),E.unshift(o,0,o,0,o,1,o+f/2,1,o+f,1,o+f,0,o+f,0,o+f,-.6,o+f+.033,0),a=0;a<E.length;a+=2)E[a]-=o;for(a=0;a<l.length;a+=2)l[a]-=o,l[a+1]=1-l[a+1]}return f&&(t(E),E[2]="C"+E[2],this.squash||(this.squash=new CustomEase(s.squashID||this.id+"-squash")),this.squash.setData("M"+E.join(","))),t(l),l[2]="C"+l[2],this.setData("M"+l.join(","))},e.create=function(s,t){return new e(s,t)},e.version="0.2.1",e},!0);export const CustomBounce=_gsScope.CustomBounce;export{CustomBounce as default};
