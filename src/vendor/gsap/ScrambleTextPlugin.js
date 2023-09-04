/*!
 * VERSION: 0.5.1
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * ScrambleTextPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
import{_gsScope}from"gsap/TweenLite.js";var _getText=function(t){var e=t.nodeType,s="";if(1===e||9===e||11===e){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)s+=_getText(t)}else if(3===e||4===e)return t.nodeValue;return s},_scrambleText=function(t,e){for(var s=e.length,i="";--t>-1;)i+=e[Math.random()*s|0];return i},CharSet=function(t){var e;for(this.chars=_emojiSafeSplit(t),this.sets=[],this.length=50,e=0;e<20;e++)this.sets[e]=_scrambleText(80,this.chars);this.grow=function(t){for(e=0;e<20;e++)this.sets[e]+=_scrambleText(t-this.length,this.chars);this.length=t}},_emoji="[-]|\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|[⚔-⚗]|\ud83e[\udd10-\udd5d]|[\ud800-\udbff][\udc00-\udfff]",_emojiExp=new RegExp(_emoji),_emojiAndCharsExp=new RegExp(_emoji+"|.","g"),_emojiSafeSplit=function(t,e){return""!==e&&e||!_emojiExp.test(t)?t.split(e||""):t.match(_emojiAndCharsExp)},_upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ",_lower=_upper.toLowerCase(),_charsLookup={upperCase:new CharSet(_upper),lowerCase:new CharSet(_lower),upperAndLowerCase:new CharSet(_upper+_lower)},ScrambleTextPlugin=_gsScope._gsDefine.plugin({propName:"scrambleText",version:"0.5.1",API:2,overwriteProps:["scrambleText","text"],init:function(t,e,s,i){return this._prop="innerHTML"in t?"innerHTML":"textContent"in t?"textContent":0,!!this._prop&&("function"==typeof e&&(e=e(i,t)),this._target=t,"object"!=typeof e&&(e={text:e}),this._delimiter=h=e.delimiter||"",this._original=_emojiSafeSplit(_getText(t).replace(/\s+/g," ").split("&nbsp;").join(""),h),"{original}"!==e.text&&!0!==e.text&&null!=e.text||(e.text=this._original.join(h)),this._text=_emojiSafeSplit((e.text||e.value||"").replace(/\s+/g," "),h),this._hasClass=!1,"string"==typeof e.newClass&&(this._newClass=e.newClass,this._hasClass=!0),"string"==typeof e.oldClass&&(this._oldClass=e.oldClass,this._hasClass=!0),r=""===h,this._textHasEmoji=_emojiExp.test(this._text.join(h))&&r,this._charsHaveEmoji=!!e.chars&&_emojiExp.test(e.chars),this._length=r?this._original.length:this._original.join(h).length,this._lengthDif=(r?this._text.length:this._text.join(h).length)-this._length,this._fillChar=e.fillChar||e.chars&&-1!==e.chars.indexOf(" ")?"&nbsp;":"",this._charSet=a=_charsLookup[e.chars||"upperCase"]||new CharSet(e.chars),this._speed=.016/(e.speed||1),this._prevScrambleTime=0,this._setIndex=20*Math.random()|0,(n=this._length+Math.max(this._lengthDif,0))>a.length&&a.grow(n),this._chars=a.sets[this._setIndex],this._revealDelay=e.revealDelay||0,this._tweenLength=!1!==e.tweenLength,this._tween=s,this._rightToLeft=!!e.rightToLeft,!0);var h,n,a,r},set:function(t){var e,s,i,h,n,a,r,_,o,l=this._text.length,p=this._delimiter,g=this._tween._time,c=g-this._prevScrambleTime;this._revealDelay&&(this._tween.vars.runBackwards&&(g=this._tween._duration-g),t=0===g?0:g<this._revealDelay?1e-6:g===this._tween._duration?1:this._tween._ease.getRatio((g-this._revealDelay)/(this._tween._duration-this._revealDelay))),t<0?t=0:t>1&&(t=1),this._rightToLeft&&(t=1-t),e=t*l+.5|0,t?((c>this._speed||c<-this._speed)&&(this._setIndex=(this._setIndex+(19*Math.random()|0))%20,this._chars=this._charSet.sets[this._setIndex],this._prevScrambleTime+=c),h=this._chars):h=this._original.join(p),this._rightToLeft?1!==t||!this._tween.vars.runBackwards&&"isFromStart"!==this._tween.data?(r=this._text.slice(e).join(p),i=this._charsHaveEmoji?_emojiSafeSplit(h).slice(0,this._length+(this._tweenLength?1-t*t*t:1)*this._lengthDif-(this._textHasEmoji?_emojiSafeSplit(r):r).length+.5|0).join(""):h.substr(0,this._length+(this._tweenLength?1-t*t*t:1)*this._lengthDif-(this._textHasEmoji?_emojiSafeSplit(r):r).length+.5|0),h=r):(i="",h=this._original.join(p)):(i=this._text.slice(0,e).join(p),s=(this._textHasEmoji?_emojiSafeSplit(i):i).length,h=this._charsHaveEmoji?_emojiSafeSplit(h).slice(s,this._length+(this._tweenLength?1-(t=1-t)*t*t*t:1)*this._lengthDif+.5|0).join(""):h.substr(s,this._length+(this._tweenLength?1-(t=1-t)*t*t*t:1)*this._lengthDif-s+.5|0)),this._hasClass?(_=this._rightToLeft?this._oldClass:this._newClass,o=this._rightToLeft?this._newClass:this._oldClass,n=_&&0!==e,a=o&&e!==l,r=(n?"<span class='"+_+"'>":"")+i+(n?"</span>":"")+(a?"<span class='"+o+"'>":"")+p+h+(a?"</span>":"")):r=i+p+h,this._target[this._prop]="&nbsp;"===this._fillChar&&-1!==r.indexOf("  ")?r.split("  ").join("&nbsp;&nbsp;"):r}}),p=ScrambleTextPlugin.prototype;for(p in p._newClass=p._oldClass="",_charsLookup)_charsLookup[p.toLowerCase()]=_charsLookup[p],_charsLookup[p.toUpperCase()]=_charsLookup[p];export{ScrambleTextPlugin,ScrambleTextPlugin as default};
