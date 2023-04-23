/** xjScroll(自定义滚动条) | V0.4.0 | Apache Licence 2.0 | 2015-2022 © XJ.Chen | https://github.com/xjZone/xjScroll/ */
;(function(global, factory){
	if(typeof(define) === 'function' && (define.amd !== undefined || define.cmd !== undefined)){ define(function(require){ factory(require('jquery')) }) }else 
	if(typeof(module) !== 'undefined' && typeof(exports) === 'object'){ module.exports = factory(require('jquery')) }
	else{ if(!Boolean(global)){ global = self }; factory(global.jQuery); };
}(this, function($){ 'use strict';



/* 只提取了函数，模块化的东西不合适用在这里 */
/** xj.operate(判断操作方式) | V0.5.0 | Apache Licence 2.0 | 2016-2021 © XJ.Chen | https://github.com/xjZone/xj.operate/ */
!function(){"use strict";var a,b,c,d,e,f,h,i,j,k,n,o,p,q,r,s,t;return!function(){a=function(a,b){var c,d;return a.classList?a.classList.contains(b):(c=a.getAttribute("class"),d=c?c.split(/\s+/):[],-1===d.indexOf(b)?!1:!0)},b=function(a,b){var c,d;return a.classList?a.classList.add(b):(c=a.getAttribute("class"),d=c?c.split(/\s+/):[],0===d.length?a.setAttribute("class",b):-1===d.indexOf(b)&&a.setAttribute("class",d.join(" ")+" "+b),void 0)},c=function(a,b){var c,d;return a.classList?a.classList.remove(b):(c=a.getAttribute("class"),d=c?c.split(/\s+/):[],c="",-1!==d.indexOf(b)&&(d.forEach(function(a){a!==b&&(c+=a+" ")}),a.setAttribute("class",c.trim())),void 0)}}(),d="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof self?self:global,e=function(){},f="0.5.0",h={classTarget:document.documentElement,existClass:"xj-operate-exist",mouseClass:"xj-operate-mouse",touchClass:"xj-operate-touch",otherClass:"xj-operate-other",frequency:10,duration:1e3,mouseCallback:e,touchCallback:e,otherCallback:e},i={},void 0===d.xj&&(d.xj={}),void 0===d.xj.operateReturn&&(d.xj.operateReturn={}),void 0!==d.xj.operateReturn[f]?d.xj.operateReturn[f]:(void 0===d.xj.operateConfig&&(d.xj.operateConfig={}),void 0===d.xj.operateOption&&(d.xj.operateOption={}),void 0!==d.xj.operateConfig[f]&&Object.keys(d.xj.operateConfig[f]).forEach(function(a){h[a]=d.xj.operateConfig[f][a]}),void 0!==d.xj.operateOption[f]&&Object.keys(d.xj.operateOption[f]).forEach(function(a){i[a]=d.xj.operateOption[f][a]}),j=d,k=j.document,k.documentElement,k.body,n=0,o=Date.now(),p=0,q=new Array,r=function(a){a&&a.isTrusted===!1||t.touchSet()},s=function(a){a&&a.isTrusted===!1||(n=o,o=(new Date).getTime(),q.push(o-n),q.length<h.frequency||(q.forEach(function(a){p+=a}),p<=h.duration&&t.mouseSet(),p=0,q=[]))},t={version:f,mouse:!1,touch:!1,other:!1,mouseSet:e,touchSet:e,otherSet:e},t.mouseSet=function(a){n=o,o=Date.now(),p=0,q=[],void 0===a&&(a=!0),(h.mouseCallback===e||h.mouseCallback(a)!==!1)&&(t.mouse=!0,t.touch=!1,t.other=!1,b(h.classTarget,h.mouseClass),c(h.classTarget,h.touchClass),c(h.classTarget,h.otherClass),a===!0?(k.removeEventListener("mousemove",s,!0),k.addEventListener("touchstart",r,!0)):(k.removeEventListener("mousemove",s,!0),k.removeEventListener("touchstart",r,!0)))},t.touchSet=function(a){n=o,o=Date.now(),p=0,q=[],void 0===a&&(a=!0),(h.touchCallback===e||h.touchCallback(a)!==!1)&&(t.mouse=!1,t.touch=!0,t.other=!1,c(h.classTarget,h.mouseClass),b(h.classTarget,h.touchClass),c(h.classTarget,h.otherClass),a===!0?(k.addEventListener("mousemove",s,!0),k.removeEventListener("touchstart",r,!0)):(k.removeEventListener("mousemove",s,!0),k.removeEventListener("touchstart",r,!0)))},t.otherSet=function(a){n=o,o=Date.now(),p=0,q=[],void 0===a&&(a=!0),(h.otherCallback===e||h.otherCallback(a)!==!1)&&(t.mouse=!1,t.touch=!1,t.other=!0,c(h.classTarget,h.mouseClass),c(h.classTarget,h.touchClass),b(h.classTarget,h.otherClass),a===!0?(k.addEventListener("mousemove",s,!0),k.addEventListener("touchstart",r,!0)):(k.removeEventListener("mousemove",s,!0),k.removeEventListener("touchstart",r,!0)))},null!==h.classTarget&&""!==h.existClass&&b(h.classTarget,h.existClass),"ontouchstart"in j==!0?t.touchSet():t.mouseSet(),d.xj.operateReturn[f]=t)}();



// BezierEasing by Gaëtan Renaudeau
// bezierCurve for transition easing function, MIT License, https://github.com/gre/bezier-easing
var BezierEasing = function(){function h(a,b){return 1-3*b+3*a}function i(a,b){return 3*b-6*a}function j(a){return 3*a}function k(a,b,c){return((h(b,c)*a+i(b,c))*a+j(b))*a}function l(a,b,c){return 3*h(b,c)*a*a+2*i(b,c)*a+j(b)}function m(a,b,e,f,g){var h,i,j=0;do i=b+(e-b)/2,h=k(i,f,g)-a,h>0?e=i:b=i;while(Math.abs(h)>c&&++j<d);return i}function n(b,c,d,e){var f,g,h;for(f=0;a>f;++f){if(g=l(c,d,e),0===g)return c;h=k(c,d,e)-b,c-=h/g}return c}function o(a){return a}function p(a,c,d,h){function p(c){for(var k,o,p,g=0,h=1,j=e-1;h!==j&&i[h]<=c;++h)g+=f;return--h,k=(c-i[h])/(i[h+1]-i[h]),o=g+k*f,p=l(o,a,d),p>=b?n(c,o,a,d):0===p?o:m(c,g,g+f,a,d)}var i,j;if(!(a>=0&&1>=a&&d>=0&&1>=d))throw new Error("bezier x values must be in [0, 1] range");if(a===c&&d===h)return o;for(i=g?new Float32Array(e):new Array(e),j=0;e>j;++j)i[j]=k(j*f,a,d);return function(a){return 0===a||1===a?a:k(p(a),c,h)}}var a=4,b=.001,c=1e-7,d=10,e=11,f=1/(e-1),g="function"==typeof Float32Array;return{bezier:p,ease:p(.25,.1,.25,1),swing:p(.02,.01,.47,1),linear:p(0,0,1,1),"ease-in":p(.42,0,1,1),"ease-out":p(0,0,.58,1),"ease-in-out":p(.42,0,.58,1),easeInSine:p(.12,0,.39,0),easeOutSine:p(.61,1,.88,1),easeInOutSine:p(.37,0,.63,1),easeInQuad:p(.11,0,.5,0),easeOutQuad:p(.5,1,.89,1),easeInOutQuad:p(.45,0,.55,1),easeInCubic:p(.32,0,.67,0),easeOutCubic:p(.33,1,.68,1),easeInOutCubic:p(.65,0,.35,1),easeInQuart:p(.5,0,.75,0),easeOutQuart:p(.25,1,.5,1),easeInOutQuart:p(.76,0,.24,1),easeInQuint:p(.64,0,.78,0),easeOutQuint:p(.22,1,.36,1),easeInOutQuint:p(.83,0,.17,1),easeInExpo:p(.7,0,.84,0),easeOutExpo:p(.16,1,.3,1),easeInOutExpo:p(.87,0,.13,1),easeInCirc:p(.55,0,1,.45),easeOutCirc:p(0,.55,.45,1),easeInOutCirc:p(.85,0,.15,1),easeInBack:p(.36,0,.66,-.56),easeOutBack:p(.34,1.56,.64,1),easeInOutBack:p(.68,-.6,.32,1.6)}};

// Custom Animate() V0.1.8(2022-04-03)
// ani_animate 参数均为选填，easing 默认 'swing'，duration 默认 250 ms，callback 的 this 为 node
var ani_stopList={sort:0},ani_ease=BezierEasing(),ani_stop=function(a){return a.xjAnimateList||(a.xjAnimateList=[]),a.xjAnimateList.forEach(function(a){delete ani_stopList[a]}),a.xjAnimateList=[],a.xjAnimating=!1,a},ani_regList={translate3d:/translate3d\s*\(\s*(-?\d+\.?\d*)[^)]*?\s*,\s*(-?\d+\.?\d*)[^)]*?\s*,/},ani_isAnimating=function(a){return a.xjAnimating?!0:!1},ani_animate=function(){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,a=!1,b=null,c=Object.create(null),d=250,e=ani_ease.swing,f=void 0,g={};return Array.prototype.forEach.call(arguments,function(h){h instanceof window.Element?b=h:"object"==typeof h?a===!1?(c=h,a=!0):g=h:"number"==typeof h?d=h:"string"==typeof h?void 0!==ani_ease[h]&&(e=ani_ease[h]):"function"==typeof h&&(f=h)}),h=Object.create(null),i=Object.create(null),j=Object.keys(c),null===b||1!==b.nodeType||0===j.length?(f&&f.call(b),b):(k="xjScroll_"+(ani_stopList.sort+1),ani_stopList.sort=ani_stopList.sort+1,ani_stopList[k]=!0,b.xjAnimateList||(b.xjAnimateList=[]),b.xjAnimateList.push(k),l=g.wrapL,m=g.wrapT,n=g.wrapLT,o=g.mainX,p=g.mainY,q=g.mainXY,r=g.thumbX,s=g.thumbY,t=g.rippleX,u=g.rippleY,v=g.wrapMove,w=g.mainMove,o||p||q||r||s?(ani_regList.translate3d.test(b.getAttribute("style")),h["translateX"]=Number(RegExp.$1),h["translateY"]=Number(RegExp.$2),void 0!==c["scrollX"]&&(c["translateX"]=-c["scrollX"]),void 0!==c["scrollY"]&&(c["translateY"]=-c["scrollY"]),(o||q||r)&&(i["translateX"]=c["translateX"]-h["translateX"]),(p||q||s)&&(i["translateY"]=c["translateY"]-h["translateY"]),o?B=function(a){x=a*i["translateX"]+h["translateX"],y=h["translateY"],b.style.transform="translate3d("+x+"px, "+y+"px, 0px)",w()}:p?B=function(a){x=h["translateX"],y=a*i["translateY"]+h["translateY"],b.style.transform="translate3d("+x+"px, "+y+"px, 0px)",w()}:q?B=function(a){x=a*i["translateX"]+h["translateX"],y=a*i["translateY"]+h["translateY"],b.style.transform="translate3d("+x+"px, "+y+"px, 0px)",w()}:r?B=function(a){b.style.transform="translate3d("+(a*i["translateX"]+h["translateX"])+"px, "+h["translateY"]+"px, 0px)"}:s&&(B=function(a){b.style.transform="translate3d("+h["translateX"]+"px, "+(a*i["translateY"]+h["translateY"])+"px, 0px)"})):l||m||n?("scrollX"in c&&(h["scrollLeft"]=b.scrollLeft,i["scrollLeft"]=c["scrollX"]-h["scrollLeft"]),"scrollY"in c&&(h["scrollTop"]=b.scrollTop,i["scrollTop"]=c["scrollY"]-h["scrollTop"]),l?B=function(a){z=a*i["scrollLeft"]+h["scrollLeft"],b["scrollLeft"]=z,v()}:m?B=function(a){A=a*i["scrollTop"]+h["scrollTop"],b["scrollTop"]=A,v()}:n&&(B=function(a){z=a*i["scrollLeft"]+h["scrollLeft"],A=a*i["scrollTop"]+h["scrollTop"],b["scrollLeft"]=z,b["scrollTop"]=A,v()})):(t||u)&&(j.forEach(function(a){h[a]=b.style[a],h[a]||(h[a]=0),h[a]=parseFloat(h[a]),i[a]=c[a]-h[a]}),B=function(a){j.forEach(function(c){b.style[c]=a*i[c]+h[c]+("opacity"===c?"":"px")})}),b.xjAnimating=!0,C=Date.now(),D=void 0,function E(){D=(Date.now()-C)/d,D>1?(B(1),delete ani_stopList[k],b.xjAnimateList.splice(b.xjAnimateList.indexOf(k),1),0===b.xjAnimateList.length&&(b.xjAnimating=!1),void 0!==f&&f.call(b)):ani_stopList[k]===!0&&(requestAnimationFrame(E),B(e(D)))}(),b)};



// ---------------------------------------------------------------------------------------------
// globalThis | window | self | global
var pub_global = (typeof(globalThis) !== 'undefined' ? globalThis : typeof(window) !== 'undefined' ? window : typeof(self) !== 'undefined' ? self : global);

// public nothing, version, keyword
var pub_nothing = function(){}, pub_version = '0.4.0', pub_keyword = 'Scroll';

// public config, advance set
var pub_config = {
	
	selector : '[xjScroll]',			// 当 autoCreate 参数为 true 时，插件会在加载后，将页面上符合该选择器的元素节点进行自动实例化，默认值为 '[xjScroll]'
	autoCreate : true,					// 是否要自动实例化，默认是 true，插件加载完毕后，会自动将页面中符合 selector 参数的节点进行实例化，如果不希望进行这样的操作，可以将该参数设置为 false
	dispatchTime : 'ready',				// 何时执行自动实例化，默认是 'ready' 既 DOMContentLoaded 后，还可以是 'load' 或 'now'，分别是 window 的 load 事件或插件加载后立即执行，用 'load' 得确保事件在触发前插件就已经加载完毕了
	
	storageTemporary : true,			// 滚动位置数据存储是否为临时，默认是 true，此时将使用 sessionStorage 记录，存储在浏览器关闭后会丢失，如果想长久保存，就得将该参数设置为 false，插件将会改用 localStorage 来进行数据存储
	storageMaximum : 40,				// 滚动位置数据存储的最大条数，默认是 40，存储会以页面为单位，一个页面有多个实例，也是被当作一条数据，如果存储数量超出，先存入的数据会被去除，例如存入第 41 条数据，则第一条数据会被清掉
	storageSearch : false,				// 数据存储将会以页面的 url 地址作为键值，该参数用于控制是否将 url 中的 search 值纳入考虑范围，默认是 false，也就是 search 值不同也当作是同个页面，面对单页面应用，可以将该参数设为 true
	storageHash : false,				// 数据存储将会以页面的 url 地址作为键值，该参数用于控制是否将 url 中的 hash 值纳入考虑范围，默认是 false，也就是 hash 值不同也当作是同个页面，除非用 hash 定义 Router，否则保持默认即可
	
};

// public option(72 items)
var pub_option = {
	
	manual : false,						// * 是否手动实例化，默认是 false，为 true 则插件自动实例化会跳过该实例，全局配置的 autoCreate 为 false 则该参数无效
	native : false,						// * 是否使用原生滚动功能既 native 模式，默认为 false，native 模式效率高，反之可控性强，为 'auto’ 时移动端自动为 true
	
	axis : 'y',							// 1 滚轮移动的轴向，默认是 'y'，也可以是 'x'，不管是哪个值，按住了的 shift 键滚动鼠标的滚轮，都会变成另一个轴向的滚动
	duration : 250,						// 1 滚轮移动的时间，默认是 250(ms)，为 0 则无动画，滚动将会直接实现位移，此时可能难以用滚轮实现 scrollExceed 溢出滚动
	easing : 'swing',					// 1 滚轮移动的缓动，默认是 'swing'，由于用了更高效的 bezier-easing 缓动，所以不支持 Elastic & Bounce 这两种类型的缓动
	rate : '25%',						// 1 滚轮移动的速率，默认是 '25%'，也就是相对于 .xjScroll 容器宽度或容器高度的 25%，这样适应性更好，这里也可用 px 单位
	
	size : 'md',						// * 滚动条尺寸设置，默认是 'md'，备选项有 'lg' 和 'sm'，'sm' 尺寸下，滚动条的手柄和两侧的按钮都会比较小，就不好操作了
	color : 'default',					// * 滚动条颜色设置，默认是 'default'，备选项有 'black' 和 'white'，'default' 在 .xj-base-black 中将会自动变为浅色模式
	mode : 'default',					// * 滚动条模式设置，默认是 'default'，备选项有 'inset' 和 'dot'，也就是嵌入式和圆点式，当然你也可以尝试自定义其他样式
	align : ['bottom', 'right'],		// * 滚动条对齐设置，默认是 ['bottom', 'right']，对应 X | Y 轴的对齐，可以是 'bottom' 或 'top'，以及 'right' 或 'left'
	
	xbarShow : 'auto',					// * X 轴滚动条的显示，默认是 'auto'，需要才显示，'hide' 是一直隐藏，'show' 是一直显示，但如果无法滚动就只有轨道没手柄
	ybarShow : 'auto',					// * Y 轴滚动条的显示，默认是 'auto'，需要才显示，'hide' 是一直隐藏，'show' 是一直显示，但如果无法滚动就只有轨道没手柄
	barsShow : true,					// * 滚动条是否一直显示着，默认是 true，为 false，则是鼠标悬停或进行操作时才显示，鼠标离开或操作完毕后将再次隐藏滚动条
	barsHide : 500,						// * 当 barsShow 参数为 false，操作完毕后滚动条会被隐藏，该参数用于设置隐藏的延迟，默认是 500(ms)，延迟 500 毫秒后隐藏
	
	trackShow : true,					// * 是否显示滚动条轨道，默认是 true，为 false 则不显示，轨道需要参与尺寸计算，所以实际上不显示时是 visibility:hidden;
	thumbShow : true,					// * 是否显示滚动条手柄，默认是 true，为 false 则不显示，虽然是提供了这个参数，但滚动条手柄一般不会有需要隐藏的时候吧?
	
	buttonShow : false,					// * 是否显示滚动条按钮，默认是 false，该参数控制着滚动条上 4 个按钮的显示，此外就是当按钮被按住时，可以一直滚动到结尾
	
	resizeEnable : false,				// * 是否允许改变容器的尺寸，默认为 false，如果设置为 true，边角就会显示 resize 的按钮，拖曳这个按钮就可以改变容器尺寸
	resizeDetails : true,				// * resizeEnable 参数为 true 时可通过拖曳改变容器尺寸，此时是否要显示出容器的尺寸细节，默认是 true，为 false 则不显示
	resizeRecovery : false,				// * resizeEnable 参数为 true 时可通过拖曳改变容器尺寸，双击按钮是否可复原尺寸，默认是 false，复原最好有设置最小宽高度
	resizeDirection : 'both',			// * resizeEnable 参数为 true 时可通过拖曳改变容器尺寸，默认 'both' 可自由拖曳，参数备选项有 'vertical' | 'horizontal'
	
	replaceGlobal : false,				// * 目标实例是否作为代替全局滚动的存在，默认为 false，为 true 将自动计算宽高度，以解决移动端宽尺寸受到地址|工具栏影响
	forTextarea : false,				// * 该实例是否专门针对 textarea 标签，默认为 false，textarea 是特殊的标签，它的高度不会跟随内容变化，所以需要特别设置
	forIframe : false,					// * 该实例是否专门针对 iframe 标签，默认为 false，iframe 是特殊标签，它涉及跨页面事件传递和尺寸变化，所以需要特别设置
	
	mouseDrag : false,					// * 在 PC 端是否支持使用鼠标进行拖曳移动，默认是 fasle，设置为 true，则 PC 端使用鼠标点击拖曳，可像移动端那样实现滚动
	dragLimit : 8,						// * 拖曳距离必须大于等于这个参数，才会开始移动，默认是 8(px)，这是为了避免用户在点击时发生抖动，导致 click 变成了拖曳
	
	selfClass : '',						// * 设置实例最外层那个元素节点的额外类名，默认是 ''(空字符串)，多个值可用空格隔开，如 'col-success bg-warning rad4px'
	selfStyle : null,					// * 设置实例最外层那个元素节点的额外样式，默认是 null，以对象的键值对形式编写属性，如 {borderTop:'2px', color:'red',}
	
	mainClass : '',						// * 设置实例最里层的 main 容器的额外类名，默认是 ''(空字符串)，多个值可用空格隔开，如 'col-success bg-warning rad4px'
	mainStyle : null,					// * 设置实例最里层的 main 容器的额外样式，默认是 null，以对象的键值对形式编写属性，如 {borderTop:'2px', color:'red',}
	
	endingRipple : 'auto',				// * 滚动到边缘时，是否泛起波纹，就类似 Android 系统滚动到边缘泛起 ripple，默认是 'auto'，也就是只有 Android 端为 true
	rippleRadius : 25,					// * 边缘波纹半径，默认是 25(px)，实际上这是波纹的最大半径，半径不会大于容器的 25%，如果超过容器的 25%，则会缩小成 25%
	
	scrollExceed : 'auto',				// 1 是否允许溢出滚动，就类似 Safari(IOS) 那样允许滚动超出范围，默认为 'auto'，也就是只有在 Safari(IOS) 中为 true 而已
	exceedExtent : .5,					// 1 溢出滚动最大范围，默认为 .5，也就是容器尺寸的 50%，太大的话在滚轮下会显得很怪，但如果只在移动端使用，可适当增大◆
	
	startPrevent : false,				// 1 是否在触摸移动的 touchstart 事件中设置 preventDefault()，默认为 true，此时拖曳移动会更灵敏，但移动端无法使用双指缩放，这涉及到复杂的交互问题，如果需要灵敏和缩放并存，可用 native 模式
	
	locateByHash : 'auto',				// * 实例化的时候，如果页面的 url 地址中有 hash 值，且实例中有节点的 id 与该 hash 值相同，那么自动定位到这个节点的位置，该参数默认是 'auto'，也就是当自动实例化时才为 true，否则就是 false
	onHashChange : true,				// * hashchange 事件被触发时，如果实例中有节点的 id 等于当前的 hash 值，那么自动定位到目标节点的位置，该参数默认是 true，也就是说滚动条会自动跟随 hash 值的变化而进行定位，为 false 则不会
	
	keepPosition : '',					// * 是否使用 webStorage 记下滚动位置，在页面刷新后定位到页面刷新前的位置，这里得设置为目标节点的选择器，参数是 ''(空字符串)，设置选择器的时候务必保证选择器的独一无二，避免误选到其他实例
	storageDelay : 500,					// * 如果使用 webStorage 记下滚动位置，该参数用于控制记录数据的延迟时间，默认是 500(ms)，scroll 事件的触发较为频繁，如果不进行延迟，在滚动的时候将会频繁触发记录，这有可能会影响到滚动性能
	
	kbdScrollable : true,				// 1 是否允许键盘操作滚动，默认是 true，支持方向键(←↑↓→), 空格键, PageUp, pageDown, Home, End 共九个按键，事件生效的前提是鼠标在容器中挪动或点击过，在有冲突时，可将该参数设置为 false
	overScrollable : true,				// 1 滚动到边缘后，是否取消外部容器的滚动限制并恢复滚动，默认是 true，如果设为 false 则容器即使滚动到边缘，再拖曳或滑动滚轮，都不会触发外部容器的滚动，相当于设置 overscroll-behavior:none
	overflowOverlay : true,				// * 滚动条的悬浮，默认是 true，也就是滚动条不占据位置，类似 overflow:overlay，为 false 则滚动条会占据位置，也可用数组 ['Ypx', 'Xpx'] 分别设置滚动条占据的位置，但滚动条不显示则该参数无效
	
	autoDestroyTime : 60000,			// * 自动销毁实例的轮询时间，默认是 60000(ms)，也就是 1 分钟，插件检测到目标节点不在页面中了就销毁实例释放内存，也可用返回值对象的 destroy() 方法手动销毁，如果设为 -1，则不会进行自动销毁
	destroyCallback : pub_nothing,		// * 销毁实例前执行的回调，function(returnObject){}，returnObject 是当前实例的返回值对象，函数 return false 将阻止销毁，也许你只是暂时把节点抽离页面，那么 return false 就可以阻止销毁操作
	
	resizeCallbackType : 'debounce',	// * resize 事件触发的模式，默认是 'debounce'(事件连续触发时，只响应最后那次)，也可设为 'throttle'(事件连续触发时，在固定时间内必定会执行一次)，设为 'none' 则不做防抖或节流，触发了就执行
	resizeCallbackTime : 100,			// * resize 事件做防抖或节流的间隔时间，默认是 100(ms)，如果希望响应灵敏一些，可把参数改小，但过于频繁可能导致卡顿，所以一般保持默认即可，当 resizeCallbackType 参数为 'none' 时该参数无效
	resizeCallback : pub_nothing,		// * 容器尺寸变化后执行的回调，function(returnObject){}，returnObject 参数是当前实例的返回值对象，可用该对象的 innerWidth() & innerHeight() 和 outerWidth() & outerHeight() 来获取容器尺寸
	
	scrollCallbackType : 'throttle',	// * scroll 事件触发的模式，默认是 'throttle'(事件连续触发时，在固定时间内必定会执行一次)，也可设为 'debounce'(事件连续触发时，只响应最后那次)，设为 'none' 则不做防抖或节流，触发了就执行
	scrollCallbackTime : 100,			// * scroll 事件做防抖或节流的间隔时间，默认是 100(ms)，如果希望响应灵敏一些，可把参数改小，但过于频繁可能导致卡顿，所以一般保持默认即可，当 scrollCallbackType 参数为 'none' 时该参数无效
	scrollCallback : pub_nothing,		// * 容器触发滚动后执行的回调，function(returnObject){}，returnObject 参数是当前实例的返回值对象，可用 returnObject 对象的 scrollX() & scrollY() 方法来获取或者设置当前实例的滚动位置
	
	operateBefore : pub_nothing,		// * 在进行实例化的各种操作之前的回调，回调有个参数 returnObject，是当前实例的返回值对象，此时容器中的节点尚未插入到容器中，但除此之外的结构都是完整的，返回值对象中关于节点的属性都已存在
	operateAfter : pub_nothing,			// * 在进行实例化的各种操作之后的回调，回调有个参数 returnObject，是当前实例的返回值对象，此时容器中的节点已经插入到容器中，容器也已经被插入到 body 中，所有的插件初始化设置也都已经完成了
	
	arriveBottomCallback : pub_nothing,	// * 有移动的情况下，到达底部边缘触发的回调，此时如果 endingRipple 参数为 true，则移动方向的位置还会泛起波纹，回调有个 returnObject 对象参数，是当前插件返回的实例对象
	arriveRightCallback : pub_nothing,	// * 有移动的情况下，到达右侧边缘触发的回调，此时如果 endingRipple 参数为 true，则移动方向的位置还会泛起波纹，回调有个 returnObject 对象参数，是当前插件返回的实例对象
	arriveLeftCallback : pub_nothing,	// * 有移动的情况下，到达左侧边缘触发的回调，此时如果 endingRipple 参数为 true，则移动方向的位置还会泛起波纹，回调有个 returnObject 对象参数，是当前插件返回的实例对象
	arriveTopCallback : pub_nothing,	// * 有移动的情况下，到达顶部边缘触发的回调，此时如果 endingRipple 参数为 true，则移动方向的位置还会泛起波纹，回调有个 returnObject 对象参数，是当前插件返回的实例对象
	
	bounceBottomCallback : pub_nothing,	// 1 当 scrollExceed 参数为 true 时拖曳允许超出范围，这是拖曳滚动超底部后回弹时执行的回调，回调有个 returnObject 对象参数，是当前插件返回的实例对象
	bounceRightCallback : pub_nothing,	// 1 当 scrollExceed 参数为 true 时拖曳允许超出范围，这是拖曳滚动超右侧后回弹时执行的回调，回调有个 returnObject 对象参数，是当前插件返回的实例对象
	bounceLeftCallback : pub_nothing,	// 1 当 scrollExceed 参数为 true 时拖曳允许超出范围，这是拖曳滚动超左侧后回弹时执行的回调，回调有个 returnObject 对象参数，是当前插件返回的实例对象
	bounceTopCallback : pub_nothing,	// 1 当 scrollExceed 参数为 true 时拖曳允许超出范围，这是拖曳滚动超顶部后回弹时执行的回调，回调有个 returnObject 对象参数，是当前插件返回的实例对象
	
	dragCriticalPoint : 250,			// * 允许拖曳移动时，如果 touchstart 和 touchend 触发的间隔时间小于这个参数，就会产生滚动的动画，这个参数默认是 250 ms
	dragDistanceRate : 8,				// * 该参数是拖曳距离和拖曳滚动距离的比率，默认是 8，例如拖曳移动 100px，那么当滚动动画触发时，会移动 8 * 100 = 800 px
	dragDurationRate : 0.5,				// * 该参数是拖曳滚动距离和拖曳滚动时长的比率，默认是 0.5，例如拖曳滚动 800px，那么滚动动画的时长是 800 * 0.5 = 400 ms
	dragMinDuration : 250,				// * 拖曳滚动动画的最小时间，默认是 250，单位 ms，通过 dragDurationRate 计算得到的时长无法小于该值，太小在移动端会跳动
	dragMaxDuration : 1000,				// * 拖曳滚动动画的最大时间，默认是 1000(ms)，通过 dragDurationRate 计算得到的时长无法大于这个值，太大了会感觉移动缓慢
	
	scrollInTarget : null,				// * 设置返回值对象上 scrollIn() 方法的滚动目标，默认是 null，当使用 scrollIn() 方法时，这个参数是必填的，但在此处可以不用理会，它可以是元素节点或者 jQuery 实例对象，如果没设置则方法无效
	scrollInAxis : 'y',					// * 设置返回值对象上 scrollIn() 方法的滚动方向，默认是 'y'，也可以为 'x' 或 'xy'，不区分大小写
	scrollInAlign : ['left', 'top'],	// * 设置返回值对象上 scrollIn() 方法的对齐位置，默认是 ['left', 'top']，分别代表了 X 轴和 Y 轴的对齐，可以是 'left' | 'center' | 'right' 或者 'top' | 'middle' | 'bottom'，并不区分大小写
	scrollInOffset : [0, 0],			// * 设置返回值对象上 scrollIn() 方法的偏移尺寸，默认是 [0, 0]，第一个元素代表 X 轴的偏移，第二个元素代表 Y 轴的偏移，正数是往右下角偏移，负数则是往左上角偏移
	scrollInEasing : 'swing',			// * 设置返回值对象上 scrollIn() 方法的动画缓动，默认是 'swing'，由于使用了 bezier-easing 缓动，所以不支持 Elastic & Bounce 这两种类型的缓动
	scrollInDuration : 250,				// * 设置返回值对象上 scrollIn() 方法的动画速度，默认是 250(ms)，设置成 0 则没有动画，将会直接抵达目标并且执行回调函数
	scrollInCallback : pub_nothing,		// * 设置返回值对象上 scrollIn() 方法的动画回调，回调函数有个 self 参数，是滚动条所在的那个容器
	
};

// 测试无动画
// pub_option.duration = 0;

// 测试边角按钮双击复原
// pub_option.resizeRecovery = true;

// 测试 arrive 抵达四方边缘的回调
// pub_option.arriveBottomCallback = function(returnObject){ console.log('aiirve bottom', returnObject) };
// pub_option.arriveRightCallback = function(returnObject){ console.log('aiirve right', returnObject) };
// pub_option.arriveLeftCallback = function(returnObject){ console.log('aiirve left', returnObject) };
// pub_option.arriveTopCallback = function(returnObject){ console.log('aiirve top', returnObject) };

// 测试 exceed 超出回调，如果是鼠标滚动导致超出，则 exceedAmount 为 0
// pub_option.scrollExceed = true;	// 允许拖曳滚动的时候超出容器范围
// pub_option.bounceBottomCallback = function(returnObject){ console.log('bounce bottom', returnObject) };
// pub_option.bounceRightCallback = function(returnObject){ console.log('bounce right', returnObject) };
// pub_option.bounceLeftCallback = function(returnObject){ console.log('bounce left', returnObject) };
// pub_option.bounceTopCallback = function(returnObject){ console.log('bounce top', returnObject) };

// 优化思路，明确函数所需要的参数，将函数需要的参数传入，而不是过多的使用插件内部全局变量
// setButtonDisabled() - 需要变量 mainScrollX | mainScrollY | mainScrollX_max | mainScrollY_max



// ---------------------------------------------------------------------------------------------
// 创建全局 xj[Name] 和 return 属性
if(pub_global.xj === undefined){ pub_global.xj = {} };
if(pub_global.xj[pub_keyword] === undefined){ pub_global.xj[pub_keyword] = {} };
if(pub_global.xj[pub_keyword].return === undefined){ pub_global.xj[pub_keyword].return = {} };

// 创建并合并 config 和 option 参数
if(pub_global.xj[pub_keyword].config === undefined){ pub_global.xj[pub_keyword].config = {} };
if(pub_global.xj[pub_keyword].option === undefined){ pub_global.xj[pub_keyword].option = {} };
if(pub_global.xj[pub_keyword].config[pub_version]){ $.extend(pub_config, pub_global.xj[pub_keyword].config[pub_version]) };
if(pub_global.xj[pub_keyword].option[pub_version]){ $.extend(pub_option, pub_global.xj[pub_keyword].option[pub_version]) };

// ---------------------------------------------

// 创建页面最顶层四个全局节点的变量
var pub_win = pub_global;
var pub_doc = pub_win.document;
var pub_html = pub_doc.documentElement;
var pub_body = pub_doc.body;

// 创建出全局节点的 jQuery 实例对象
var pub_jqi_win = $(pub_win);
var pub_jqi_doc = $(pub_doc);
var pub_jqi_html = $(pub_html);
var pub_jqi_body = $(pub_body);

// ---------------------------------------------

// 实例对象排名，表明插件实例化次数
var pub_sort = 0;

// 自动实例化的标记，实例化时候判断
var pub_autoExec = false;

// 简化返回值的对象，避免每次的连缀
var pub_returnObject = xj.Scroll.return;

// 在拖曳时追加到 body 中的遮罩节点
var pub_jqi_masking = $('<div class="xjScroll-masking"></div>');

// 滚轮溢出时的分段，11 段合计 0.55
var pub_wheelPiecewise = [0.10, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01, 0.00, ];

// 触屏溢出时的分段，20 段合计 10.1
var pub_touchPiecewise = [1.0, 0.9, 0.9, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0.1, 0.0, ];

// 简化 Math 对象上的一些数学的方法
var pub_round = Math.round, pub_floor = Math.floor, pub_ceil = Math.ceil, pub_min = Math.min, pub_max = Math.max, pub_abs = Math.abs;

// 没 hash 值的时候 body 实例的位置
var pub_notHashPositions = [pub_win.pageXOffset, pub_win.pageYOffset];

// 简化 parseInt 和 parseFloat 函数
var pub_int = parseInt, pub_flo = parseFloat;

// 鼠标挪入那个节点，用于键盘的控制
var pub_keyTarget = null;

// 用 userAgent | vendor 判断浏览器
var pub_userAgent = navigator.userAgent, pub_vendor = navigator.vendor;
var pub_mobile = ((/Mobile|Android|IOS|iPhone|iPad/i.test(pub_userAgent) === true) ? true : false);
var pub_ios = (pub_vendor !== undefined && /Apple/i.test(pub_vendor) === true && /IOS|iPhone|iPad/i.test(pub_userAgent) === true);
var pub_ie = (pub_doc.documentMode !== undefined || /edge/i.test(pub_userAgent) === true), pub_firefox = ((/firefox/i.test(pub_userAgent) === true) ? true : false);
var pub_safari = (pub_vendor !== undefined && /Apple/i.test(pub_vendor) === true), pub_chrome = (pub_ie === false && pub_firefox === false && pub_safari === false);

// 获取或设置 style 的 translateX|Y
var pub_re_translate3d = /translate3d\s*\(\s*(-?\d+\.?\d*)[^)]*?\s*,\s*(-?\d+\.?\d*)[^)]*?\s*,/;
var pub_getTranslateX = function(node){ return pub_re_translate3d.test(node.getAttribute('style')) === true ? Number(RegExp.$1) : 0 };
var pub_getTranslateY = function(node){ return pub_re_translate3d.test(node.getAttribute('style')) === true ? Number(RegExp.$2) : 0 };
var pub_setTranslateX = function(node, xValue){ if(pub_re_translate3d.test(node.getAttribute('style')) === true){ node.style.transform = 'translate3d('+ xValue +'px, '+ RegExp.$2 +'px, 0px)' } };
var pub_setTranslateY = function(node, yValue){ if(pub_re_translate3d.test(node.getAttribute('style')) === true){ node.style.transform = 'translate3d('+ RegExp.$1 +'px, '+ yValue +'px, 0px)' } };

// 判断 readOnly 或 disabled 的状态
var pub_isReadOnly = function(jqi_node){ return (( (jqi_node.prop('readOnly') === true) || (jqi_node.attr('readOnly') !== undefined) ) ? true : false) };
var pub_isDisabled = function(jqi_node){ return (( (jqi_node.prop('disabled') === true) || (jqi_node.attr('disabled') !== undefined) ) ? true : false) };

// ---------------------------------------------

// 插件里将会用到的各种状态相关类名
var cla_prefix            = 'xjScroll-';

var cla_forbid_select     = cla_prefix + 'forbid-select';

var cla_global_define     = cla_prefix + 'global-define';
var cla_global_target     = cla_prefix + 'global-target';

var cla_native_scroll     = cla_prefix + 'native-scroll';

var cla_wrap_draggrab     = cla_prefix + 'wrap-draggrab';
var cla_wrap_dragging     = cla_prefix + 'wrap-dragging';

var cla_xbar_show         = cla_prefix + 'xbar-show';
var cla_ybar_show         = cla_prefix + 'ybar-show';

var cla_bars_hide         = cla_prefix + 'bars-hide';
var cla_bars_show         = cla_prefix + 'bars-show';

var cla_track_hide        = cla_prefix + 'track-hide';
var cla_thumb_hide        = cla_prefix + 'thumb-hide';

var cla_button_show       = cla_prefix + 'button-show';
var cla_button_disabled   = cla_prefix + 'button-disabled';

var cla_corner_resize     = cla_prefix + 'corner-resize';
var cla_corner_dragging   = cla_prefix + 'corner-dragging';

var cla_corner_horizontal = cla_prefix + 'corner-horizontal';
var cla_corner_vertical   = cla_prefix + 'corner-vertical';



// ---------------------------------------------

// 和拖曳相关的事件参数，根据是否支持触屏相关的系列事件，判断究竟是用触屏 touch 还是鼠标的 mouse
// 虽然较新的浏览器可以统一用 pointer 系列事件，IE10 用前缀也能支持，但 Safari(IOS) 12.4- 不支持
var eve_touchable = 'ontouchstart' in pub_doc;
var eve_tapstart = eve_touchable ? 'touchstart' : 'mousedown';
var eve_tapmove = eve_touchable ? 'touchmove' : 'mousemove';
var eve_tapend = eve_touchable ? 'touchend' : 'mouseup';

// 计算屏幕的触摸点总数，但是只有在使用 touch 系列事件的时候才需要进行计算，mouse 系列事件则不用
// 这是因为 Safari(IOS) 在双指缩放时设置 scrollLeft = scrollTop = 0 会导致页面跳动，需要特殊处理
var eve_fingerLength = 0;
(eve_touchable === true ? [eve_tapstart, eve_tapmove, ] : [])
.forEach(function(ele){ pub_doc.addEventListener(ele, function(e){ eve_fingerLength = e.touches.length }, true) });

// 判断 addEventListener() 方法的第三个参数是否支持对象，实际上只是检测是否需要设置 passive 属性
// 根据 MDN 的说法，第三个参数如果是对象，removeEventListener() 方法解除绑定时不需要使用同个对象
var eve_passiveAllow = false;
pub_doc.createElement('div').addEventListener('xjPassive', 
	pub_nothing, Object.defineProperty({}, 'passive', { get : function(){ eve_passiveAllow = true }, }));

// 测试发现浏览器不支持第三个参数为对象则设置无效，但也不会报错，继续保持默认 bubbles 或 capture
// 如果传入布尔值就直接返回，否则支持对象参数就返回对象，不支持就只返回 capture 属性，该属性必填
var eve_eventOptions = function(options){
	if(typeof(options) === 'boolean'){ return options }
	else{ return (eve_passiveAllow === true ? options : options.capture) };
}, eve_defaultFalse = function(){ return eve_eventOptions({capture:false, passive:false, }) };

// ---------------------------------------------

// wrap 或 bars 或 corner 被拖曳时，添加 forbid-select 类名到 html，这是为了避免图像或文本被选中
// 与此同时为所在的所有父级 .xjScroll 设置 dragging 类名，确保拖曳时滚动条可以一直保持着高亮状态
var eve_draggingClass = function(flag, jqi_pack){
	pub_jqi_html[flag ? 'addClass' : 'removeClass'](cla_forbid_select);
	jqi_pack.parents('.xjScroll')[flag ? 'addClass' : 'removeClass'](cla_wrap_dragging);
};

// wrap 或 bars 或 corner 被拖曳时，如果是使用鼠标操作，就添加遮罩，这样可以一直保持着指针的状态
// 默认情况下遮罩的指针是 grabbing，只适合 wrap 使用，bars | corner 使用的时候，还得另外进行设置
var eve_maskingHandle = function(flag, mouseCursor){
	// if(eve_touchable === true){ return }
	// else{ pub_jqi_masking.css({ cursor : mouseCursor }) };
	pub_jqi_masking.css({ cursor : mouseCursor });
	if(flag){ pub_jqi_body.append(pub_jqi_masking) }else{ pub_jqi_masking.remove() };
};

// 该函数用于实现波纹的动画，transition 过渡动画在实现复杂动画时非常拉跨，所以这部分改用逐帧动画
// 通过参数确定是 width 或 height 动画，自定义动画无法实现队列动画，改为在回调中执行第二部分动画
var eve_rippleAnimate = function(property, ele_ripple, rippleRadius){
	var firstProp = {opacity:'0.5',}, secondProp = {opacity:'0',};
	firstProp[property]=rippleRadius*2, secondProp[property]=0;
	var otherArguments = { rippleX : true, rippleY : true, };
	if(property === 'width'){ delete otherArguments.rippleX };
	if(property === 'height'){ delete otherArguments.rippleY };
	ani_stop(ele_ripple);
	ele_ripple.style.display = 'block';
	ani_animate(ele_ripple, firstProp, 250, function(){
		ani_animate(ele_ripple, secondProp, 1750, function(){
			ele_ripple.removeAttribute('style');
		}, otherArguments);
	}, otherArguments);
};



// ---------------------------------------------------------------------------------------------
// 判断节点是否可编辑，主要检测是否有 contentEditable 或 user-modify，并不判断 input 或 textarea
// 主要是因为 isContentEditable 属性在 IE11- 中会受到 disabled | readOnly 影响，所以检测会不准确
// 测试发现 Firefox 和 Chrome，对于 contentEditable="true" 的元素，在获取 *-user-modify 样式时会
// 返回 "read-write"，子节点也会继承到这个结果，IE11- 不支持 user-modify，所以最终返回 undefined
var pub_prefixUserModify = (/Firefox/i.test(pub_userAgent) === true ? 'MozUserModify' : 'webkitUserModify');
var pub_getStyleObject = function(element, pseudoSelector){ return pub_win.getComputedStyle(element, pseudoSelector ? pseudoSelector : null) };
var pub_isModifiable = function(element){
	if(/^input|textarea$/i.test(element.nodeName) === true){ return false };
	return (element.isContentEditable === true || (pub_doc.documentMode === undefined && /write/i.test(pub_getStyleObject(element)[pub_prefixUserModify]) === true)) ? true : false;
};

// 判断 color 控件是否被支持，参考 stackOverllow : https://stackoverflow.com/questions/13789163/
// 支持 color 控件 ! 值会变成 #000000，IE 为 input 设置不支持的 type 会出错，所以得用 try…catch
// 在拖曳的时候，PC 端要避开可以被输入和圈选的那些节点，因为圈选和拖曳是互斥的，不可以被同时支持
// 特别要设置的是 color 控件，要 IE14 和 Safari12.1、12.2 才支持，不支持会变成输入框，也得被排除
var pub_colorSupports = true;
(function(inputColorElement, flag){
	try{
		inputColorElement = pub_doc.createElement('input');
		inputColorElement.type = 'color', inputColorElement.value = '!';
		flag = (inputColorElement.type === 'color' && inputColorElement.value !== '!');
	}catch(e){};
	if(flag === false){ pub_colorSupports = false };
})(null, false);

// 判断节点是否可滚动，该函数并不是只考虑 scrollable，而是传入滚动具体方向，判断那个方向能否滚动
// 内容超出尺寸，即使 overflow 是 hidden 或 visible，scrolWidth 和 scrollHeight 也是返回实际尺寸
// 普通节点如果 overflow 设为 auto | scroll 就允许滚动，但 textarea 只要不为 hidden 就允许滚动了
// overflow 在 window.getComputedStyle() 返回值中会被分解为 overflowX 和 overflowY，直接使用即可
var pub_isScrollableTo = (function(){
	
	// 提前创建需要的变量，避免每次创建导致浪费
	var scrollRange, scrollLeft, scrollTop;
	var styleGroup = {}, isTextarea = /^textarea$/i;
	var scrollWidth, scrollHeight, clientWidth, clientHeight;
	
	// 传入需要判断是否能滚动的节点和滚动的方向
	return pub_isScrollableTo = function(node, direction){
		
		if(direction === 'bottom' || direction === 'top'){
			
			// overflow 会分解成 overflowY | X
			styleGroup = pub_win.getComputedStyle(node);
			
			// 非 textarea，则 visible 也不能滚
			if(styleGroup.overflowY === 'hidden'){ return false };
			if(styleGroup.overflowY === 'visible' && isTextarea.test(node.nodeName) === false){ return false };
			
			// 获取可滚动的范围和当前滚动的位置
			scrollHeight = pub_round(node.scrollHeight), clientHeight = pub_round(node.clientHeight);
			scrollRange = scrollHeight - clientHeight, scrollTop = pub_round(node.scrollTop);
			
			// 根据滚动方向判断是否容器还能滚动
			if(direction === 'bottom'){ return (scrollTop === scrollRange ? false : true) };
			if(direction === 'top'){ return (scrollTop === 0 ? false : true) };
			
		}else 
		if(direction === 'right' || direction === 'left'){
			
			// overflow 会分解成 overflowY | X
			styleGroup = pub_win.getComputedStyle(node);
			
			// 非 textarea，则 visible 也不能滚
			if(styleGroup.overflowX === 'hidden'){ return false };
			if(styleGroup.overflowX === 'visible' && isTextarea.test(node.nodeName) === false){ return false };
			
			// 获取可滚动的范围和当前滚动的位置
			scrollWidth = pub_round(node.scrollWidth), clientWidth = pub_round(node.clientWidth);
			scrollRange = scrollWidth - clientWidth, scrollLeft = pub_round(node.scrollLeft);
			
			// 根据滚动方向判断是否容器还能滚动
			if(direction === 'right'){ return (scrollLeft === scrollRange ? false : true) };
			if(direction === 'left'){ return (scrollLeft === 0 ? false : true) };
			
		};
		
	};
	
})();



// ---------------------------------------------------------------------------------------------
// 该函数用于响应 hash 值的定位，定位直接使用 Element.prototype.scrollIntoView()，毕竟不需要动画
// 使用 hash 值做选择器，可能会有非法字符，所以用 try 防止出错，出错或没找到目标节点，就直接返回
var pub_locateByHash = function(returnObject){
	
	// 创建目标节点变量，获取 hash 并去掉前缀 #
	var jqi_target = null;
	var hashValue = location.hash.slice(1);
	
	// 没 hash 值则直接返回，否则就尝试获取节点
	if(hashValue === ''){ return }
	else{ try{ jqi_target = $('#'+hashValue) }catch(error){ } };
	
	// 获取出错或没有节点或节点不在容器中则返回
	if(jqi_target === null || jqi_target.length === 0){ return }
	else if(jqi_target.closest('.xjScroll').get(0) !== returnObject.self.get(0)){ return };
	
	// 直接定位到目标处，立刻执行回调以避免延迟
	jqi_target.get(0).scrollIntoView();
	returnObject.scroll();
	
};

// 监听 hashchange 事件，遍历 returnObject，执行滚动定位，当没有 hash 值且存在全局滚动实例的时候
// pub_notHashPositions 对象可用于恢复到没 hash 前的位置，解决了无 hash 值无法返回初始位置的问题
pub_win.addEventListener('hashchange', function(){
	
	// 无 hash 值且为全局滚动时，恢复到最初位置
	var instance, targetId;
	var jqi_globalTarget = $('.'+cla_global_target);
	if(location.hash.slice(1) === '' && jqi_globalTarget.length !== 0){
		targetId = jqi_globalTarget.attr('xjScrollId');
		if(targetId === undefined){ return }else{ instance = pub_returnObject[targetId] };
		if(instance === undefined){ return }else{ instance.scrollX(pub_notHashPositions[0]), instance.scrollY(pub_notHashPositions[1]), instance.scroll(); };
	};
	
	// 遍历返回值对象，对那些响应事件的进行定位
	Object.keys(pub_returnObject)
	.forEach(function(id){ if(pub_returnObject[id]
	._onHashChange === true){ pub_locateByHash(pub_returnObject[id]) }; });
	
}, true);



// ---------------------------------------------------------------------------------------------
// 查看 storage 是否有存储相关数据，使用 url 和 selector 进行数据区分，以下是 storage 的数据结构
// 'xjScroll-restoration' = [{url:url, selector:{x:n, y:n}, selector:{x:n, y:n}, }, {url:url}, ]
var pub_keepPosition = function(returnObject, handle){
	
	// 获取选择器，选择器如果不对应实例直接返回
	var selector = returnObject._keepPosition;
	if(returnObject.self.is(selector) === false){ return };
	
	// 获取 url 地址，search 和 hash 值是选配的
	var url = location.protocol + location.host + location.pathname + 
	(pub_config.storageSearch ? location.search : '') + (pub_config.storageHash ? location.hash : '');
	
	// 根据参数决定存储类型，数据记录和中止标记
	var storage = (pub_config.storageTemporary ? pub_win.sessionStorage
	 : pub_win.localStorage), record = null, abort = false;
	
	// 进行数据的获取解析，如果出错了就直接返回
	try{ record = JSON.parse(storage.getItem('xjScroll-restoration')) }
	catch(e){ abort = true }; if(abort === true){ return };
	
	// 根据传入的参数，确定是要进行设置还是获取
	if(handle === 'set'){ pub_position_set(returnObject, selector, url, record, storage) };
	if(handle === 'get'){ pub_position_get(returnObject, selector, url, record, storage) };
	
};

// 该函数用于页面关闭前，保存容器的滚动位置到 storage 中，之后重新加载该页面再恢复之前滚动的位置
// record 对象是整个 restoration 数据，里面存有所有内容，得做遍历把符合当前 url 的那条数据挑出来
var pub_position_set = function(returnObject, selector, url, record, storage){
	
	// 没有 record 就创建，否则遍历以获取 detail
	var index, length, detail;
	if(record === null){ record = [] }else{ 
		for(index = 0, length = record.length; index < length; index++){
			if(record[index].url !== url){ continue }else{ detail = record[index]; break; }; }; };
	
	// 没有 detail 就创建，设置 x y 写入 storage
	if(detail === undefined){ record.push(detail = {url:url}) };
	detail[selector] = {x : pub_min(returnObject.maxScrollX(), pub_max(returnObject
		.scrollX(), 0)), y : pub_min(returnObject.maxScrollY(), pub_max(returnObject.scrollY(), 0)), };
	try{ storage.setItem('xjScroll-restoration', JSON.stringify( record.slice(-pub_config.storageMaximum) )) }catch(e){};
	
};

// 该函数用于初始化之后，获取在 storage 中存储的滚动位置，如果能找到相关的数据，就为容器设置位置
// record 对象在 pub_keepPosition 中已经获取到了，这里直接检测和遍历即可，无需再用 *storage 获取
var pub_position_get = function(returnObject, selector, url, record, storage){
	
	// 遍历 record 对象，获取数据进行 x y 的定位
	if(Array.isArray(record) === false || record.length === 0){ return };
	for(var index = 0, length = record.length, detail = undefined; index < length; index++){
		detail = record[index];
		if(detail['url'] !== url || detail[selector] === undefined){ continue };
		returnObject.scrollX(detail[selector].x), returnObject.scrollY(detail[selector].y), returnObject.scroll(); break;
	};
	
};



// ---------------------------------------------------------------------------------------------
// tapstart 和 focus 被触发时，相关的 .xjScroll 容器都得显示滚动条，但只有最近那个容器能响应键盘
// tapend 和 blur 触发时未必离开了实例容器，所以不理会，jQuery 的 focus 无法传递所以改用原生事件
[eve_tapstart, 'focus'].forEach(function(string){
	pub_doc.addEventListener(string, function(e){
	
	// 获取事件所在的 .xjScroll 以及 xjScrollId
	var ele_target = e.target,jqi_target = $(ele_target);
	var jqi_xjScroll = jqi_target.closest('.xjScroll');
	var xjScrollId = jqi_xjScroll.attr('xjScrollId');
	
	// 所有容器都不能响应键盘事件，并隐藏滚动条
	Object.keys(pub_returnObject).forEach(function(id){
		pub_returnObject[id]._kbdScrollable = false;
		pub_returnObject[id]._barsActive(false);
	});
	
	// 目标 id 对应的容器可响应键盘并显示滚动条
	if(xjScrollId !== undefined){
		pub_returnObject[xjScrollId]._kbdScrollable = true;
		pub_returnObject[xjScrollId]._barsActive(true);
		jqi_xjScroll.parents('.xjScroll').each(
		function(index, jqi_xjScroll){
			var xjScrollId = jqi_xjScroll.getAttribute('xjScrollId');
			if(xjScrollId !== undefined){ pub_returnObject[xjScrollId]._barsActive(true) };
		});
	};
	
	// 不是 .xjScroll 的元素就为 null，否则赋值
	if(jqi_target.closest('.xjScroll-main').length === 0)
	{ pub_keyTarget = null }else{ pub_keyTarget = ele_target };
	
}, true); });

// keydown 被触发时，是下面这 9 个键，并且当前被聚焦的不是特殊标签，那么让允许键盘滚动的容器滚动
// 32 = ' ', 33 = PageUp, 34 = PageDown, 35 = End, 36 = Home, 37 = ←, 38 = ↑, 39 = →, 40 = ↓
(function(){
var ele_active = null;
var keyCode='', nodeName='', inputType='';
pub_doc.addEventListener('keydown', function(event){
	
	// event.which 是 Number 类型值，得转字符串
	// 如果按下的不是和移动相关的按键，就不理会
	keyCode = String( event.which );
	if(/^32|33|34|35|36|37|38|39|40$/.
	test(keyCode) === false){ return };
	
	// 没聚焦元素 activeElement 为 body 或 null
	// 如果聚焦的是可输入或多媒体元素，也不理会
	ele_active = pub_doc.activeElement;
	if(ele_active === null){ ele_active = pub_body };
	if(pub_isModifiable(ele_active) === true){ return };
	nodeName = String(ele_active.nodeName).toLowerCase();
	if(/^audio|video|object|embed|iframe$/.test(nodeName)){ return 0 };
	
	// 被聚焦的元素没被禁用，进一步检查是否继续
	if(pub_isDisabled($(ele_active)) === false){
		
		// 下拉菜单会响应所有按键，所以直接返回
		if(/^select$/.test(nodeName) === true){ return }else 
		
		// 按钮和总结会响应空格，所以空格就返回
		if(/^button|summary$/.test(nodeName) === true && keyCode === '32'){ return };
		
		// input 和 textarea 得根据 type 来判断
		inputType = String( ele_active.type ).toLowerCase();
		if(nodeName === 'input' || nodeName === 'textarea'){
			
			// radio 按钮遇到空格或方向键则返回
			if(inputType === 'radio' && /^32|37|38|39|40$/.test(keyCode) === true){ return }
			
			// range 除了空格，遇到其他按键返回
			else if(inputType === 'range' && /^33|34|35|36|37|38|39|40$/.test(keyCode) === true){ return }
			
			// 按钮类控件的空格类似回车，不响应
			else if(/^checkbox|button|reset|submit|image$/.test(inputType) === true && keyCode === '32'){ return }
			
			// 其余控件如果不是只读的，直接返回
			else if(/^color|date|datetime|datetime-local|email|file|month|number|password|search|tel|text|textarea|time|url|week$/
			.test(inputType) === true && pub_isReadOnly($(ele_active)) === false)
			{ return };
			
		};
	};
	
	// 遍历返回值对象，为允许键盘的实例执行滚动
	Object.keys(pub_returnObject).forEach(function(id){
	if(pub_returnObject[id]._kbdScrollable === true){
	pub_returnObject[id]._kbdControl(event); }; });
	
}, false);
})();



// ---------------------------------------------------------------------------------------------
// 传入 returnObject.scrollIn() 方法的参数如果不是一个纯对象，而逐个参数的传入，那么就得进行解析
// 根据 pub_scrollIn_getScrollValue 函数需要的参数数据类型，逐个参数进行判断，最后再返回解析结果
var pub_scrollIn_parseArguments = function(parame, result){
	Array.prototype.slice.apply( parame )
	.forEach(function(el){
		
		// 节点是目标，原生节点转成 jQuery 实例
		if(el instanceof Element === true){ return result.target = $(el) }
		else if(el instanceof $ === true){ return result.target = el };
		
		// 数值是动画的时长，函数则是动画的回调
		if(typeof(el) === 'number'){ return result.duration = el }else 
		if(typeof(el) === 'function'){ return result.callback = el };
		
		// 数组是对齐或偏移，字符串是轴向或缓动
		if(Array.isArray(el)){
			if(typeof(el[0]) === 'string'){ result.align = el }else 
			if(typeof(el[0]) === 'number'){ result.offset = el };
		}else 
		if(typeof(el) === 'string'){
			if(/^x|y|xy|yx$/i.test(el)){ result.axis = el }else 
			if(/linear|swing|ease/i.test(el)){ result.easing = el };
		};
		
	});
	return result;
};

// 函数用于将实例滚动到目标节点的位置，由于滚动得同步 thumb 既手柄，所以动画依赖插件中的动画方法
// 功能类似于 xjArrive，虽然很多细节都不一样，但本质上还是计算目标节点位置，然后进行滚动定位而已
var pub_scrollIn_getScrollValue = function(returnObject, option){
	
	var ele_wrap = returnObject.wrap.get(0), ele_main = returnObject.main.get(0);
	var isNative = returnObject.self.hasClass('xjScroll-native-scroll');
	
	// 简化对象的属性，创建最终要返回的参数对象
	var target = option.target, axis = option.axis, align = option.align, offset = option.offset;
	var duration = option.duration, easing = option.easing, callback = option.callback;
	var animateObject = {duration:duration, easing:easing, callback:callback};
	
	// 目标节点不能是 jQuery 实例，得转元素节点
	var ele_self = target;
	if(target instanceof $)
	{ ele_self = target[0] };
	
	// 获取容器和目标的尺寸和位置，用于计算结构◆
	var wrap_scrollLeft = (isNative === true ? pub_round(ele_wrap.scrollLeft) : pub_round(-pub_getTranslateX(ele_main)));
	var wrap_scrollTop = (isNative === true ? pub_round(ele_wrap.scrollTop) : pub_round(-pub_getTranslateY(ele_main)));
	var wrap_clientWidth = pub_round(ele_wrap.clientWidth), wrap_clientHeight = pub_round(ele_wrap.clientHeight);
	var wrap_scrollWidth = pub_round(ele_wrap.scrollWidth), wrap_scrollHeight = pub_round(ele_wrap.scrollHeight);
	var selfDOMRect = ele_self.getBoundingClientRect(), thatDOMRect = ele_wrap.getBoundingClientRect();
	
	// 获取目标位置，减去边框加上当前位置和偏移
	var targetLeft = selfDOMRect.left - thatDOMRect.left - ele_wrap.clientLeft + wrap_scrollLeft + offset[0];
	var targetTop = selfDOMRect.top - thatDOMRect.top - ele_wrap.clientTop + wrap_scrollTop + offset[1];
	
	// 如果不是左对齐，就根据定位点微调水平位置◆offset 是否还得减去 padding 或 border 值？
	if(/center/i.test(align[0])){ targetLeft = targetLeft + ele_self.offsetWidth/2 - wrap_clientWidth/2 }else 
	if(/right/i.test(align[0])){ targetLeft = targetLeft + ele_self.offsetWidth - wrap_clientWidth };
	
	// 如果不是上对齐，就根据定位点微调垂直位置
	if(/middle/i.test(align[1])){ targetTop = targetTop + ele_self.offsetHeight/2 - wrap_clientHeight/2 }else 
	if(/bottom/i.test(align[1])){ targetTop = targetTop + ele_self.offsetHeight - wrap_clientHeight };
	
	// 滚动的目标值已经计算完，取整避免存在小数
	targetLeft = pub_round(targetLeft);
	targetTop = pub_round(targetTop);
	
	// 容器最大可滚动的宽高度，取整避免存在小数
	var maxLeft = pub_round(wrap_scrollWidth - wrap_clientWidth);
	var maxTop = pub_round(wrap_scrollHeight - wrap_clientHeight);
	
	// 目标值不可小于 0，也不可大于最大可滚动值
	if(targetLeft < 0){ targetLeft = 0 }; if(targetLeft > maxLeft){ targetLeft = maxLeft };
	if(targetTop  < 0){ targetTop  = 0 }; if(targetTop  > maxTop ){ targetTop  = maxTop  };
	
	// 根据滚动轴向设置对象，不可滚动则时长为 0
	if(/^xy|yx$/i.test(axis) !== false){
		if((wrap_clientWidth >= wrap_scrollWidth && wrap_clientHeight >= wrap_scrollHeight)
		||(targetLeft === wrap_scrollLeft && targetTop === wrap_scrollTop)){ duration = 0 }
		else{ animateObject.scrollLeft = targetLeft; animateObject.scrollTop = targetTop };
	}
	else if(/^x$/i.test(axis) === true){ 
		if(wrap_clientWidth >= wrap_scrollWidth || targetLeft 
		=== wrap_scrollLeft){ duration = 0 }else{ animateObject.scrollLeft = targetLeft };
	}
	else if(/^y$/i.test(axis) === true){
		if(wrap_clientHeight >= wrap_scrollHeight || targetTop 
		=== wrap_scrollTop){ duration = 0 }else{ animateObject.scrollTop = targetTop };
	};
	
	// 更新动画的时长参数，最终返回这个参数对象
	animateObject.duration = duration;
	return animateObject;
	
};



// ---------------------------------------------------------------------------------------------
// 插件主体
$.fn.xjScroll = function(option){



// 获取实例节点以及的 jQuery 实例对象和
var jqi_self = this.first();
var ele_self = jqi_self.get(0);

// 目标已经被实例化过了，就直接返回
var selfId = jqi_self.attr('xj'+ pub_keyword +'Id');
if(selfId){ return (pub_global .xj[pub_keyword] .return[selfId]) };

// 合并实例和全局设置的公共参数
if(option === undefined){ option = {} };
option = $.extend({}, pub_option, option );

// 合并设置在标签的内联属性
var inlineOption = jqi_self.attr('xj'+ pub_keyword);
if(inlineOption){ $.extend(option, eval('('+ inlineOption +')')) };



// 自动化判断和确认变量
if(pub_autoExec === true && option.manual === true){ return void 0 };
if(pub_body === null){ pub_body = pub_doc.body, pub_jqi_body = $(pub_body) };
if(pub_html === null){ pub_html = pub_doc.documentElement, pub_jqi_html = $(pub_html) };

// id = 时间戳 + 随机数
var id = 't'+ Date.now() +'r'+ (Math.random() + '' + 
	Math.random()).replace(/0\./g, '').slice(0, 13);
var dot_id = '.' + id; var num_id = '#' + id;
jqi_self.attr('xj' + pub_keyword + 'Id', id);

// 创建返回对象方便回调
var jqi_that = jqi_self;
var returnObject = {
	id : id, 
	sort : pub_sort++, version : pub_version, 
	self : jqi_self, that : jqi_that, 
	parentReturnObject : null, 
	parentReturnObjectUpdate : function(){
		parentReturnObjectId = jqi_self.parent().closest('.xjScroll').attr('xjScrollId');
		if(parentReturnObjectId !== undefined){ parentReturnObject = returnObject.parentReturnObject = pub_global.xj[pub_keyword].return[parentReturnObjectId] };
		return parentReturnObject;
	}, 
};

// 获取父容器返回值对象
var parentReturnObject = null;
var parentReturnObjectId = void(0);
returnObject.parentReturnObjectUpdate();

// 延迟保存滚动位置函数
var keepPositionTimeout = NaN;

// 滚轮和按钮滚动的延迟
var wheelScrollTimeout = NaN;
var buttonScrollTimeout = NaN;
var keydownScrollTimeout = NaN;

// 超出回弹时不能再滚动
// var isScrollLocked = false;
// var isRebounding = false;



// 简化实例参数避免冗余
var _manual = option.manual;
var _native = option.native;

var _axis = option.axis, _duration = option.duration, _easing = option.easing, _rate = option.rate;
var _size = option.size, _color = option.color, _mode = option.mode, _align = option.align;

var _xbarShow = option.xbarShow, _ybarShow = option.ybarShow;
var _barsShow = option.barsShow, _barsHide = option.barsHide;

var _trackShow = option.trackShow, _thumbShow = option.thumbShow;
var _buttonShow = option.buttonShow;

var _resizeEnable = option.resizeEnable;
var _resizeDetails = option.resizeDetails;
var _resizeRecovery = option.resizeRecovery;
var _resizeDirection = option.resizeDirection;

var _replaceGlobal = option.replaceGlobal;
var _forTextarea = option.forTextarea;
var _forIframe = option.forIframe;

var _mouseDrag = option.mouseDrag, _dragLimit = option.dragLimit;
var _selfClass = option.selfClass, _selfStyle = option.selfStyle;
var _mainClass = option.mainClass, _mainStyle = option.mainStyle;

var _endingRipple = option.endingRipple, _rippleRadius = option.rippleRadius;
var _scrollExceed = option.scrollExceed, _exceedExtent = option.exceedExtent;

var _startPrevent = option.startPrevent;

var _locateByHash = option.locateByHash, _onHashChange = option.onHashChange;
var _keepPosition = option.keepPosition, _storageDelay = option.storageDelay;

var _kbdScrollable = option.kbdScrollable, _overScrollable = option.overScrollable, _overflowOverlay = option.overflowOverlay;

var _autoDestroyTime = option.autoDestroyTime;
var _destroyCallback = option.destroyCallback;

var _resizeCallbackType = option.resizeCallbackType, _resizeCallbackTime = option.resizeCallbackTime, _resizeCallback = option.resizeCallback;
var _scrollCallbackType = option.scrollCallbackType, _scrollCallbackTime = option.scrollCallbackTime, _scrollCallback = option.scrollCallback;

var _operateBefore = option.operateBefore;
var _operateAfter = option.operateAfter;

var _arriveBottomCallback = option.arriveBottomCallback, _arriveRightCallback = option.arriveRightCallback, _arriveLeftCallback = option.arriveLeftCallback, _arriveTopCallback = option.arriveTopCallback;
var _bounceBottomCallback = option.bounceBottomCallback, _bounceRightCallback = option.bounceRightCallback, _bounceLeftCallback = option.bounceLeftCallback, _bounceTopCallback = option.bounceTopCallback;

var _dragCriticalPoint = option.dragCriticalPoint, _dragDistanceRate = option.dragDistanceRate, _dragDurationRate = option.dragDurationRate, _dragMinDuration = option.dragMinDuration, _dragMaxDuration = option.dragMaxDuration;

var _scrollInTarget = option.scrollInTarget, _scrollInAxis = option.scrollInAxis, _scrollInAlign = option.scrollInAlign, _scrollInOffset = option.scrollInOffset, _scrollInEasing = option.scrollInEasing, _scrollInDuration = option.scrollInDuration, _scrollInCallback = option.scrollInCallback;

// 获取滚动条占位的尺寸
var _overflowOverlaySize = 0;
if(_overflowOverlay === false){ _overflowOverlaySize = ({sm:4, md:8, lg:16})[_size] };

// 获取滚动动画基本速度
var _ratePercent = 0, _ratePixel = 0;
if(/%/.test(_rate) === true){ _ratePercent = parseFloat(_rate)/100 }else{ _ratePixel = parseInt(_rate) };

// 纠正波纹和溢出的参数
if(_endingRipple === 'auto'){ _endingRipple = (pub_mobile === true && pub_ios !== true) ? true : false };
if(_scrollExceed === 'auto'){ _scrollExceed = (pub_mobile === true && pub_ios === true) ? true : false };

// 确定模式和相关的操作
if(_native === 'auto'){ _native = (pub_mobile === true ? true : false) };
if(_native === true){ jqi_self.addClass(cla_native_scroll) };
if(_native === true){ _scrollExceed = false };

// 方法 scrollIn 的参数
var scrollInOption = {
	target : _scrollInTarget,
	axis : _scrollInAxis,
	align : _scrollInAlign,
	offset : _scrollInOffset,
	easing : _scrollInEasing,
	duration : _scrollInDuration,
	callback : _scrollInCallback,
};



// 创建和实例相关的结构
var jqi_pack               = $('<div class="xjScroll-pack"></div>')                             , ele_pack = jqi_pack[0];
var jqi_wrap               = $('<div class="xjScroll-wrap"></div>')                             , ele_wrap = jqi_wrap[0];
var jqi_main               = $('<div class="xjScroll-main"></div>')                             , ele_main = jqi_main[0];
var jqi_body               = $('<div class="xjScroll-body"></div>')                             , ele_body = jqi_body[0];

var jqi_size               = $('<div class="xjScroll-size"></div>')                             , ele_size = jqi_size[0];
var jqi_size_scroll        = $('<iframe class="xjScroll-size-scroll" tabIndex="-1"></iframe>')  , ele_size_scroll = jqi_size_scroll[0];

var jqi_xbar               = $('<div class="xjScroll-xbar"></div>')                             , ele_xbar = jqi_xbar[0];
var jqi_xbar_track         = $('<div class="xjScroll-xbar-track"></div>')                       , ele_xbar_track = jqi_xbar_track[0];
var jqi_xbar_thumb         = $('<div class="xjScroll-xbar-thumb"></div>')                       , ele_xbar_thumb = jqi_xbar_thumb[0];
var jqi_xbar_button_left   = $('<div class="xjScroll-xbar-button-left"></div>')                 , ele_xbar_button_left = jqi_xbar_button_left[0];
var jqi_xbar_button_right  = $('<div class="xjScroll-xbar-button-right"></div>')                , ele_xbar_button_right = jqi_xbar_button_right[0];

var jqi_ybar               = $('<div class="xjScroll-ybar"></div>')                             , ele_ybar = jqi_ybar[0];
var jqi_ybar_track         = $('<div class="xjScroll-ybar-track"></div>')                       , ele_ybar_track = jqi_ybar_track[0];
var jqi_ybar_thumb         = $('<div class="xjScroll-ybar-thumb"></div>')                       , ele_ybar_thumb = jqi_ybar_thumb[0];
var jqi_ybar_button_top    = $('<div class="xjScroll-ybar-button-top"></div>')                  , ele_ybar_button_top = jqi_ybar_button_top[0];
var jqi_ybar_button_bottom = $('<div class="xjScroll-ybar-button-bottom"></div>')               , ele_ybar_button_bottom = jqi_ybar_button_bottom[0];

var jqi_resize             = $('<div class="xjScroll-resize"></div>')                           , ele_resize = jqi_resize[0];
var jqi_resize_client      = $('<iframe class="xjScroll-resize-client" tabIndex="-1"></iframe>'), ele_resize_client = jqi_resize_client[0];

var jqi_corner             = $('<div class="xjScroll-corner"></div>')                           , ele_corner = jqi_corner[0];
var jqi_corner_icon        = $('<div class="xjScroll-corner-icon"></div>')                      , ele_corner_icon = jqi_corner_icon[0];
var jqi_corner_info        = $('<div class="xjScroll-corner-info"></div>')                      , ele_corner_info = jqi_corner_info[0];

var jqi_ripple             = $('<div class="xjScroll-ripple"></div>')                           , ele_ripple = jqi_ripple[0];
var jqi_ripple_top         = $('<div class="xjScroll-ripple-top"></div>')                       , ele_ripple_top = jqi_ripple_top[0];
var jqi_ripple_right       = $('<div class="xjScroll-ripple-right"></div>')                     , ele_ripple_right = jqi_ripple_right[0];
var jqi_ripple_bottom      = $('<div class="xjScroll-ripple-bottom"></div>')                    , ele_ripple_bottom = jqi_ripple_bottom[0];
var jqi_ripple_left        = $('<div class="xjScroll-ripple-left"></div>')                      , ele_ripple_left = jqi_ripple_left[0];



// 构筑出实例的基本结构
jqi_ripple.append(jqi_ripple_top,  jqi_ripple_right,  jqi_ripple_bottom,  jqi_ripple_left);
jqi_corner.append(jqi_corner_icon, jqi_corner_info);
jqi_resize.append(jqi_resize_client);

jqi_ybar.append(jqi_ybar_track, jqi_ybar_button_top, jqi_ybar_button_bottom);
jqi_xbar_track.append(jqi_xbar_thumb);

jqi_xbar.append(jqi_xbar_track, jqi_xbar_button_left, jqi_xbar_button_right);
jqi_ybar_track.append(jqi_ybar_thumb);

jqi_main.append(jqi_self.contents());
jqi_body.append(jqi_main, jqi_size.append(jqi_size_scroll));

jqi_wrap.append(jqi_body);
jqi_pack.append(jqi_wrap, jqi_xbar, jqi_ybar, jqi_resize, jqi_corner, jqi_ripple);

// 确定将滚动的目标容器
var ele_move = (_native === true ? ele_wrap : ele_main);
var jqi_move = (_native === true ? jqi_wrap : jqi_main);
ele_move.xjAnimating = false;

// 提前设置 translate3d
if(_native === false){ jqi_main.css('transform', 'translate3d(0px, 0px, 0px)') };
jqi_xbar_thumb.css('transform', 'translate3d(0px, 0px, 0px)');
jqi_ybar_thumb.css('transform', 'translate3d(0px, 0px, 0px)');

// 执行初始化之前的回调
returnObject = $.extend(returnObject, { pack : jqi_pack, wrap : jqi_wrap, body : jqi_body, main : jqi_main, });
if(_operateBefore !== pub_nothing){ _operateBefore(returnObject) };
jqi_self.append(jqi_pack);



// 根据参数进行初始设置
jqi_self.addClass(cla_prefix +'size-'+ _size +' '+ cla_prefix +'color-'+ _color);
jqi_self.addClass(cla_prefix +'mode-'+ _mode +' '+ cla_prefix +'align-'+ _align[0] +' '+ cla_prefix +'align-'+ _align[1]);

if(_barsShow === false){ jqi_self.addClass(cla_bars_hide) };
if(_trackShow === false){ jqi_self.addClass(cla_track_hide) };
if(_thumbShow === false){ jqi_self.addClass(cla_thumb_hide) };
if(_buttonShow === true){ jqi_self.addClass(cla_button_show) };

if(_resizeEnable === true){ jqi_self.addClass(cla_corner_resize) };
if(_resizeDirection === 'vertical'){ jqi_self.addClass(cla_corner_vertical) }
else if(_resizeDirection === 'horizontal'){ jqi_self.addClass(cla_corner_horizontal) };

if(_mouseDrag === true){ jqi_self.addClass(cla_wrap_draggrab) };

if(_overflowOverlay === false){ jqi_pack.css('padding-' + _align[0], 
	(_overflowOverlaySize ? _overflowOverlaySize : _overflowOverlay[0])) };

if(_overflowOverlay === false){ jqi_pack.css('padding-' + _align[1], 
	(_overflowOverlaySize ? _overflowOverlaySize : _overflowOverlay[1])) };

if(_selfClass !== ''){ jqi_self.addClass(_selfClass) };
if(_selfStyle !== null){ jqi_self.css(_selfStyle) };

if(_mainClass !== ''){ jqi_main.addClass(_mainClass) };
if(_mainStyle !== null){ jqi_main.css(_mainStyle) };



// 创建滚动尺寸相关变量
var packClientW = 0,               packClientH = 0;					// pack 容器的宽高度，包括了 padding
var wrapClientW = 0,               wrapClientH = 0;					// wrap 容器的宽高度，包括了 padding
var bodyClientW = 0,               bodyClientH = 0;					// body 容器的宽高度，包括了 padding
var mainClientW = 0,               mainClientH = 0;					// main 容器的宽高度，包括了 padding

var mainScrollX = 0,               mainScrollY = 0;					// wrap 容器的横竖轴所在位置
var mainScrollX_target = 0,        mainScrollY_target = 0;			// wrap 容器的横竖轴前往位置
var mainScrollX_before = 0,        mainScrollY_before = 0;			// wrap 容器的横竖轴所在位置__滚动前的值
var mainScrollX_detail = 0,        mainScrollY_detail = 0;			// wrap 容器的横竖轴前往位置__含小数的值

var mainScrollX_min = 0,           mainScrollY_min = 0;				// wrap 容器的横竖轴所在位置__最小值
var mainScrollX_min_out = 0,       mainScrollY_min_out = 0;			// wrap 容器的横竖轴所在位置__最小溢出值
var mainScrollX_min_out_abs = 0,   mainScrollY_min_out_abs = 0;		// wrap 容器的横竖轴所在位置__单溢出的值
var mainScrollX_max = 0,           mainScrollY_max = 0;				// wrap 容器的横竖轴所在位置__最大值
var mainScrollX_max_out = 0,       mainScrollY_max_out = 0;			// wrap 容器的横竖轴所在位置__最大溢出值
var mainScrollX_max_out_abs = 0,   mainScrollY_max_out_abs = 0;		// wrap 容器的横竖轴所在位置__单溢出的值

var xbarScrollX = 0,               ybarScrollY = 0;					// 手柄 thumb 当前的所在位置
var xbarScrollX_target = 0,        ybarScrollY_target = 0;			// 手柄 thumb 将要前往的位置
var xbarScrollX_before = 0,        ybarScrollY_before = 0;			// 手柄 thumb 将要前往的位置__移动前的值
var xbarScrollX_detail = 0,        ybarScrollY_detail = 0;			// 手柄 thumb 将要前往的位置__含小数的值

var xbarScrollX_min = 0,           ybarScrollY_min = 0;				// 手柄 thumb 当前最小滚动值__最小值
var xbarScrollX_min_out = 0,       ybarScrollY_min_out = 0;			// 手柄 thumb 当前最小滚动值__最小溢出值
var xbarScrollX_min_out_abs = 0,   ybarScrollY_min_out_abs = 0;		// 手柄 thumb 当前最小滚动值__单溢出的值
var xbarScrollX_max = 0,           ybarScrollY_max = 0;				// 手柄 thumb 当前最大滚动值__最大值
var xbarScrollX_max_out = 0,       ybarScrollY_max_out = 0;			// 手柄 thumb 当前最大滚动值__最大溢出值
var xbarScrollX_max_out_abs = 0,   ybarScrollY_max_out_abs = 0;		// 手柄 thumb 当前最大滚动值__单溢出的值

var mainScrollX_dvalue = 0,        mainScrollY_dvalue = 0;			// wrap 容器的横竖轴前往位置__与目标差值
var mainScrollX_target_before = 0, mainScrollY_target_before = 0;	// wrap 容器的横竖轴前往位置__上轮目标值

var xbarTrackClientW = 0,          ybarTrackClientH = 0;			// 滚动条轨道的尺寸，包括了 padding
var xbarthumbOffsetW = 0,          ybarthumbOffsetH = 0;			// 滚动条手柄的尺寸，包括了 padding 和 border

var wrapOffsetW = 0,               wrapOffsetH = 0;					// wrap 容器的偏移高度，比 Client 多了滚动条尺寸
var ybarNativeW = 0,               xbarNativeH = 0;					// wrap 容器的滚动条原始尺寸，大部分的情况下为 0

var wrapHiddenW = 0,               wrapHiddenH = 0;					// wrap 容器在 native 模式下额外的尺寸，用于纠正滚动条手柄的尺寸
var bodyHiddenW = 0,               bodyHiddenH = 0;					// body 容器在 native 模式下额外的尺寸，用于纠正滚动条手柄的尺寸

var globalW = 0,                   globalH = 0;						// 全局的实例的尺寸，在 replaceGlobal 为 true 的移动端(尤其是 Safari(IOS)) 用到



// 滚动动画所需要的参数
var animateProp = {};
var animateSpeed = 0;
var animateEasing = '';
var animateParame = {};
var otherArguments = { };
var needEdgeBounce = false;

// 全局模式下的尺寸回调
var globalResize = pub_nothing;

// 两条滚动条的样式对象
var xbarTrackStyleObject = null, ybarTrackStyleObject = null;

// 是否滚动位置发生变化
var isMovingX = false, isMovingY = false;

// 开始点击那刻的时间戳
var tapstartTime = Date.now();

// 是否正处于拖曳操作中
var isDragging = false;

// 滚动的轴向和滚动距离
var scrollAxis = '';
var scrollValue = 0;

// 容器即将要滚动的方向
var scrollPositionX = '';
var scrollPositionY = '';

// 按钮是否按下或滑动中
var isButtonMousedown = false;
var isButtonContinued = false;

// 键盘是否按下或滑动中
var isKeysetPressdown = false;
var isKeysetContinued = false;

// 拖曳的初始和移动位置
var clientX_start = 0, clientX_move = 0, clientX_end = 0;
var clientY_start = 0, clientY_move = 0, clientY_end = 0;

var clientX_old = 0, clientX_new = 0, clientX_gap = 0;
var clientY_old = 0, clientY_new = 0, clientY_gap = 0;

// 是否显示滚动条和手柄
var xbarShowing = false, xbarThumbShowing = false;
var ybarShowing = false, ybarThumbShowing = false;

// 根据滚动类型获取位置
var getMainScrollX = function(){ return pub_round(_native ? ele_wrap.scrollLeft : -pub_getTranslateX(ele_main)) };
var getMainScrollY = function(){ return pub_round(_native ? ele_wrap.scrollTop  : -pub_getTranslateY(ele_main)) };

// 停止所有动画
var stopScroll = function(){ ani_stop(ele_move), ani_stop(ele_xbar_thumb), ani_stop(ele_ybar_thumb) };



// 部分浏览器如 Firefox63-，由于不支持将滚动条隐藏掉但保留滚动功能，所以需要单独计算 wrap 的尺寸
// 这个基本只针对 PC 端的 Firefox63-，因为移动端的滚动条不占据位置而 IE 和 Chrome 都能隐藏滚动条
// wrap 的 offsetWidth & offsetHeight 跟 clientWidth & clientHeight 属性的差值就能算出滚动条尺寸
// 之所以不用 min-width 和 min-height，是因为这这两个样式无法满足子元素使用 % 单位设置尺寸的需求
if(_native === true){
	
	wrapOffsetW = pub_round(ele_wrap.offsetWidth);
	wrapOffsetH = pub_round(ele_wrap.offsetHeight);
	
	wrapClientW = pub_round(ele_wrap.clientWidth);
	wrapClientH = pub_round(ele_wrap.clientHeight);
	
	xbarNativeH = wrapOffsetH - wrapClientH;
	ybarNativeW = wrapOffsetW - wrapClientW;
	
	wrapHiddenW = 80, wrapHiddenH = 80;
	bodyHiddenW = 80, bodyHiddenH = 80;
	
	if(ybarNativeW !== 0){ wrapHiddenW = wrapHiddenW + ybarNativeW };
	if(xbarNativeH !== 0){ wrapHiddenH = wrapHiddenH + xbarNativeH };
	
	if(ybarNativeW !== 0){ jqi_wrap.css({ width : 'calc(100% + ' + (80 + ybarNativeW) + 'px)', }) };
	if(xbarNativeH !== 0){ jqi_wrap.css({ height : 'calc(100% + ' + (80 + xbarNativeH) + 'px)', }) };
	
};



// 移动端部分浏览器如 Safari(IOS)，body 使用 vh 做高度会有一部分尺寸被工具栏隐藏掉，只能是监听着
// resize 事件，使用 html 的宽高度重新设置 body 的尺寸，这样才能解决 vw 和 vh 单位不够精准的问题
// 后来发现在 Safari(IOS) 中，当浏览器横向显示时，html.clientHeight 会将工具栏计算在内，导致出错
// 所以只能借助 window.innerWidth|Height，计算无工具栏的高度，并滚动到顶部让内容不会被工具栏遮住
if(_replaceGlobal === true){
	
	globalResize = function(){
		if(eve_fingerLength < 2){ pub_win.scrollTo(0, 0) };
		globalW = pub_round(pub_html.clientWidth); globalH = pub_round(pub_html.clientHeight);
		if(pub_mobile === true){ globalH = pub_round(pub_win.innerHeight / pub_win.innerWidth * globalW) };
		jqi_self.css({maxWidth: globalW, maxHeight: globalH, width: globalW, height: globalH, });
	};
	
	pub_jqi_win.on('resize' + dot_id, function(){ globalResize() });
	pub_jqi_html.addClass(cla_global_define);
	jqi_self.addClass(cla_global_target);
	globalResize();
	
};



// 可能是因为四个 ripple 的 offsetParent 是 pack，所以在 IE 中会出现右下 ripple 影响滚动条的情况
// 具体表现为当 ripple 出现后，pack 的高度会把 ripple 算上，并且当 ripple 隐藏后这尺寸也不会恢复
// 所以特别的绑定 self 和 pack，当这两个元素出现 scroll 事件时，立即将位置设置为 0, 0 以禁止偏移
// 而面对全局滚动条的时候，还得将 html 的滚动也纳入考虑范围，一旦触发滚动条事件，也是恢复为 0, 0
[jqi_self, jqi_pack].forEach(function(jqi_node){ jqi_node.on('scroll'+ dot_id, 
	function(){ if(eve_fingerLength < 2){ jqi_node[0].scrollLeft = 0, jqi_node[0].scrollTop = 0 } }) });
if(_replaceGlobal === true){ pub_jqi_win.on('scroll'+ dot_id, function(){ if(eve_fingerLength < 2){ pub_win.scrollTo(0, 0) } }) };
setTimeout(function(){
	ele_self.scrollLeft = ele_self.scrollTop = ele_pack.scrollLeft = ele_pack.scrollTop = 0;
	if(_replaceGlobal === true){ pub_win.scrollTo(0, 0) };
}, 0);



// resize 后得更新尺寸相关变量，并重置滚动条的尺寸和位置，移动端缩放会导致位置有小数，所以得取整
// 把滚动条的设置和获取从函数挪出，因为 display:none 拿不到尺寸，所以在 *barResizeSetting 再操作
var mainResizeSetting = function(){
	
	// 改变参数的状态，并且停止容器和手柄的动画
	ani_stop(ele_move);
	ani_stop(ele_xbar_thumb);
	ani_stop(ele_ybar_thumb);
	
	// 获取 wrap 和 body 的宽高度，包括 padding
	wrapClientW = pub_round(ele_wrap.clientWidth);
	wrapClientH = pub_round(ele_wrap.clientHeight);
	bodyClientW = pub_round(ele_body.clientWidth);
	bodyClientH = pub_round(ele_body.clientHeight);
	
	// 获取 wrap 滚动的位置，以及可滚动的最大值
	mainScrollX = pub_round(_native ? ele_wrap.scrollLeft : -pub_getTranslateX(ele_main));
	mainScrollY = pub_round(_native ? ele_wrap.scrollTop : -pub_getTranslateY(ele_main));
	mainScrollX_max = bodyClientW - wrapClientW, mainScrollX_min = 0;
	mainScrollY_max = bodyClientH - wrapClientH, mainScrollY_min = 0;
	
	// 如果允许溢出，获取可溢出的最大最小范围值◆
	if(_scrollExceed === true){
		
		// 获取溢出的最大最小值，将超出边缘的值
		mainScrollX_max_out = wrapClientW * _exceedExtent + mainScrollX_max;
		mainScrollY_max_out = wrapClientH * _exceedExtent + mainScrollY_max;
		mainScrollX_min_out = -(wrapClientW * _exceedExtent);
		mainScrollY_min_out = -(wrapClientH * _exceedExtent);
		
		// 获取溢出的最大最小值，只是溢出那部分
		mainScrollX_max_out_abs = wrapClientW * _exceedExtent;
		mainScrollY_max_out_abs = wrapClientH * _exceedExtent;
		mainScrollX_min_out_abs = mainScrollX_min_out;
		mainScrollY_min_out_abs = mainScrollY_min_out;
		
	};
	
	// 重设手柄位置和按钮状态，执行 resize 回调
	mainScrollSetting();
	if(_resizeCallback !== pub_nothing){ 
	_resizeCallback(returnObject, wrapClientW, wrapClientH) };
	
};



// 设置滚动条 thumb 的位置，先根据参数判断轨道和手柄是否需要显示出来，再进行相关属性的设置和获取
// visibility 属性的设置，是因为有可能存在轨道显示着而手柄却不显示的情况，所以这个设置不能删除的
// ◆native 的情况下这里得减去 80 或 97，避免两代滚动条尺寸不统一
var barsResizeSetting = function(){
	
	(function(){
		
	// 不显示就返回，否则确认轨道和手柄是否显示
	if(_xbarShow === 'hide'){ return };
	xbarThumbShowing = xbarShowing = (wrapClientW >= bodyClientW ? false : true);
	
	// 再确认轨道和手柄是否显示，无需显示就返回
	if(_xbarShow === 'show' && xbarShowing === false){ xbarShowing = true };
	if(xbarShowing === true){ jqi_self.addClass(cla_xbar_show) }else{ return jqi_self.removeClass(cla_xbar_show) };
	if(xbarThumbShowing === true){ ele_xbar_thumb.style.visibility = 'visible' }else{ return ele_xbar_thumb.style.visibility = 'hidden' };
	
	// 获取轨道尺寸，得减掉滚动条容器的 padding
	xbarTrackStyleObject = pub_getStyleObject(ele_xbar_track);
	xbarTrackClientW = pub_round(ele_xbar_track.clientWidth);
	
	// 减去 padding 获取轨道尺寸，设置手柄 size
	xbarTrackClientW = xbarTrackClientW - parseInt(xbarTrackStyleObject.paddingLeft) - parseInt(xbarTrackStyleObject.paddingRight);
	ele_xbar_thumb.style.width = pub_round( (wrapClientW - wrapHiddenW) / (bodyClientW - bodyHiddenW) * xbarTrackClientW ) + 'px';
	
	// 重获尺寸和可滚动值，避免被 max, min 影响
	xbarthumbOffsetW = pub_round(ele_xbar_thumb.offsetWidth);
	xbarScrollX_max = xbarTrackClientW - xbarthumbOffsetW, xbarScrollX_min = 0;
	
	// 如果可溢出，还得计算手柄最大可超出的范围
	if(_scrollExceed === true){
		xbarScrollX_max_out = pub_round(mainScrollX_max_out / mainScrollX_max * xbarScrollX_max), 
		xbarScrollX_max_out_abs = xbarScrollX_max_out - xbarScrollX_max;
		xbarScrollX_min_out = xbarScrollX_max - xbarScrollX_max_out;
		xbarScrollX_min_out_abs = xbarScrollX_min_out;
	};
	
	// 根据 wrap 尺寸和位置，设置滚动条手柄位置
	pub_setTranslateX(ele_xbar_thumb, pub_round(mainScrollX / mainScrollX_max * xbarScrollX_max));
	// pub_setTranslateX(ele_xbar_thumb, mainScrollX / mainScrollX_max * xbarScrollX_max);
	
	})();
	
	(function(){
	
	// 不显示就返回，否则确认轨道和手柄是否显示
	if(_ybarShow === 'hide'){ return };
	ybarThumbShowing = ybarShowing = (wrapClientH >= bodyClientH ? false : true);
	
	// 再确认轨道和手柄是否显示，无需显示就返回
	if(_ybarShow === 'show' && ybarShowing === false){ ybarShowing = true };
	if(ybarShowing === true){ jqi_self.addClass(cla_ybar_show) }else{ return jqi_self.removeClass(cla_ybar_show) };
	if(ybarThumbShowing === true){ ele_ybar_thumb.style.visibility = 'visible' }else{ return ele_ybar_thumb.style.visibility = 'hidden' };
	
	// 获取轨道尺寸，得减掉滚动条容器的 padding
	ybarTrackStyleObject = pub_getStyleObject(ele_ybar_track);
	ybarTrackClientH = pub_round(ele_ybar_track.clientHeight);
	
	// 减去 padding 获取轨道尺寸，设置手柄 size
	ybarTrackClientH = ybarTrackClientH - parseInt(ybarTrackStyleObject.paddingTop) - parseInt(ybarTrackStyleObject.paddingBottom);
	ele_ybar_thumb.style.height = pub_round( (wrapClientH - wrapHiddenH) / (bodyClientH - bodyHiddenH) * ybarTrackClientH ) + 'px';
	
	// 重获尺寸和可滚动值，避免被 max, min 影响
	ybarthumbOffsetH = pub_round(ele_ybar_thumb.offsetHeight);
	ybarScrollY_max = ybarTrackClientH - ybarthumbOffsetH, ybarScrollY_min = 0;
	
	// 如果可溢出，还得计算手柄最大可超出的范围
	if(_scrollExceed === true){
		ybarScrollY_max_out = pub_round(mainScrollY_max_out / mainScrollY_max * ybarScrollY_max), 
		ybarScrollY_max_out_abs = ybarScrollY_max_out - ybarScrollY_max;
		ybarScrollY_min_out = ybarScrollY_max - ybarScrollY_max_out;
		ybarScrollY_min_out_abs = ybarScrollY_min_out;
	};
	
	// 根据 wrap 尺寸和位置，设置滚动条手柄位置
	pub_setTranslateY(ele_ybar_thumb, pub_round(mainScrollY / mainScrollY_max * ybarScrollY_max));
	// pub_setTranslateY(ele_ybar_thumb, mainScrollY / mainScrollY_max * ybarScrollY_max);
	
	})();
	
};



// 设置滚动条按钮的禁用状态，前两个参数是 axis，第三个参数 leave 为 true，就是从边缘离开移除类名
// 需要提前就准备好的变量包括当前和最大滚动的位置，当 leave 为 true 时还得知道滚动方向和滚动目标
var setButtonDisabled = function(axisX, axisY, leave){
	
	// 不显示按钮就直接返回，在这里判断避免重复
	if(_buttonShow === false){ return 'false' };
	
	// leave 为 true 就是在滚动前就进行判断设置
	if(axisX === true && _xbarShow !== 'hide'){
		if(leave === false){
			jqi_xbar_button_left[mainScrollX <= 0 ? 'addClass' : 'removeClass'](cla_button_disabled);
			jqi_xbar_button_right[mainScrollX >= mainScrollX_max ? 'addClass' : 'removeClass'](cla_button_disabled);
		}else{
			if(scrollPositionX === 'right' && mainScrollX_target > 0){ jqi_xbar_button_left.removeClass(cla_button_disabled) };
			if(scrollPositionX === 'left' && mainScrollX_target < mainScrollX_max){ jqi_xbar_button_right.removeClass(cla_button_disabled) };
		};
	};
	
	// leave 为 true 就是在滚动前就进行判断设置
	if(axisY === true && _ybarShow !== 'hide'){
		if(leave === false){
			jqi_ybar_button_top[mainScrollY <= 0 ? 'addClass' : 'removeClass'](cla_button_disabled);
			jqi_ybar_button_bottom[mainScrollY >= mainScrollY_max ? 'addClass' : 'removeClass'](cla_button_disabled);
		}else{
			if(scrollPositionY === 'bottom' && mainScrollY_target > 0){ jqi_ybar_button_top.removeClass(cla_button_disabled) };
			if(scrollPositionY === 'top' && mainScrollY_target < mainScrollY_max){ jqi_ybar_button_bottom.removeClass(cla_button_disabled) };
		};
	};
	
};



// 滚动之后需要执行的回调，不能只是手动执行 mainScrollSetting 这个函数，还是得依靠 scroll 事件的
// 因为滚动也可能并非人为操作，而是浏览器的行为且没被监听到，所以不绑定 scroll，只靠手动是不行的
// 新增 scrollExceed 溢出滚动后，arrive 回调和 ripple 波纹可能会在执行溢出滚动的动画时被提前执行
// 所以判断不处于动画中才执行，还得比对前后值，所以得用 setTimeout，否则可能因为值相同而无法触发
var mainScrollSetting = function(){
	
	// 获取横轴位置，如果位移了就执行波纹和回调
	mainScrollX = pub_round(_native ? ele_wrap.scrollLeft : -pub_getTranslateX(ele_main));
	if(mainScrollX !== mainScrollX_before){
		if(mainScrollX === 0){
			
			// 处于动画中或可溢出时正拖曳则返回
			setTimeout(function(){
				if(ani_isAnimating(ele_move)){ return };
				if(_scrollExceed === true && isDragging === true 
				&& -pub_getTranslateX(ele_main) !== mainScrollX_min){ return };
				if(_arriveLeftCallback !== pub_nothing){ _arriveLeftCallback(returnObject) };
				if(_endingRipple === true){ eve_rippleAnimate('width', ele_ripple_left, _rippleRadius) };
			}, 100);
			
		}else if(mainScrollX === mainScrollX_max){
			
			// 溢出拖曳时重新定位以避免溢出触发
			setTimeout(function(){
				if(ani_isAnimating(ele_move)){ return };
				if(_scrollExceed === true && isDragging === true 
				&& -pub_getTranslateX(ele_main) !== mainScrollX_max){ return };
				if(_arriveRightCallback !== pub_nothing){ _arriveRightCallback(returnObject) };
				if(_endingRipple === true){ eve_rippleAnimate('width', ele_ripple_right, _rippleRadius) };
			}, 100);
			
		};
		mainScrollX_before = mainScrollX; 
		isMovingX = true;
	};
	
	// 获取竖轴位置，如果位移了就执行波纹和回调
	mainScrollY = pub_round(_native ? ele_wrap.scrollTop : -pub_getTranslateY(ele_main));
	if(mainScrollY !== mainScrollY_before){
		if(mainScrollY === 0){
			
			// 处于动画中或可溢出时正拖曳则返回
			setTimeout(function(){
				if(ani_isAnimating(ele_move)){ return };
				if(_scrollExceed === true && isDragging === true 
				&& -pub_getTranslateY(ele_main) !== mainScrollY_min){ return };
				if(_arriveTopCallback !== pub_nothing){ _arriveTopCallback(returnObject) };
				if(_endingRipple === true){ eve_rippleAnimate('height', ele_ripple_top, _rippleRadius) };
			}, 100);
			
		}else if(mainScrollY === mainScrollY_max){
			
			// 溢出拖曳时重新定位以避免溢出触发
			setTimeout(function(){
				if(ani_isAnimating(ele_move)){ return };
				if(_scrollExceed === true && isDragging === true 
				&& -pub_getTranslateY(ele_main) !== mainScrollY_max){ return };
				if(_arriveBottomCallback !== pub_nothing){ _arriveBottomCallback(returnObject) };
				if(_endingRipple === true){ eve_rippleAnimate('height', ele_ripple_bottom, _rippleRadius) };
			}, 100);
			
		};
		mainScrollY_before = mainScrollY;
		isMovingY = true;
	};
	
	// 如果不在滚动中，就设置滚动条和按钮的状态
	if(ani_isAnimating(ele_move) === false){ barsResizeSetting(), setButtonDisabled(true, true, false) };
	
	// 全局滚动时，当 hash 值为空就记下当前位置
	if(_replaceGlobal === true && location.hash === ''){ 
	pub_notHashPositions = [mainScrollX, mainScrollY] };
	
	// 如果有回调，且确实发生了移动，就执行回调
	if(isMovingX === true 
	|| isMovingY === true){
		
		// 复原滚动标记，如果存在回调就执行回调
		isMovingX = false, isMovingY = false;
		if(_scrollCallback !== pub_nothing){ 
		   _scrollCallback(returnObject) };
		
		// 超时再记录位置，避免频繁触发影响性能
		if(_keepPosition !== ''){
			clearTimeout(keepPositionTimeout);
			keepPositionTimeout = setTimeout(function(){ 
				pub_keepPosition(returnObject, 'set') }, _storageDelay);
		};
		
	};
	
};



// wrap 容器的滚动位移动画，根据轴向设置动画属性，如果存在滚动条，还会同时执行滚动条手柄位移动画
// parame 参数包含动画的时长、缓动、回调、动画属性，如果没有明文设置这些属性，则使用插件的默认值
// native 模式下手柄既 thumb 并不需要执行 ani_animate() 动画，因为它在滚动事件的回调中会自动同步
// native 模式下不能实现溢出滚动，所以在动画回调中获取当前位置也无需考虑 scrollLeft 和 scrollTop
var mainScrollAnimate = function(parame){
	
	// 改变参数状态，并且停止 wrap 和手柄的动画
	ani_stop(ele_move);
	ani_stop(ele_ybar_thumb);
	ani_stop(ele_xbar_thumb);
	
	// 重置动画的两个对象，设置动画的时长和缓动
	animateProp = Object.create(null);
	animateEasing = (parame.easing ? parame.easing : _easing);
	animateSpeed = ((parame.duration === undefined) ? _duration : parame.duration);
	
	// 如果有传入目标位置，就为目标变量进行赋值
	if(parame.scrollX !== undefined){ mainScrollX_target = parame.scrollX };
	if(parame.scrollY !== undefined){ mainScrollY_target = parame.scrollY };
	
	// 根据滚动轴向，设置滚动动画需要的属性对象
	if(scrollAxis !== 'y'){ animateProp.scrollX = mainScrollX_target };
	if(scrollAxis !== 'x'){ animateProp.scrollY = mainScrollY_target };
	
	// 有传入手柄的目标，就直接获取，否则得计算◆ track 和 thumb 是不是还得排除 padding 或 border？
	if(parame.xbarScrollX !== undefined){ xbarScrollX_target = parame.xbarScrollX }
	else{ xbarScrollX_target = pub_round((mainScrollX_target / mainScrollX_max) * (xbarTrackClientW - xbarthumbOffsetW)) };
	if(parame.ybarScrollY !== undefined){ ybarScrollY_target = parame.ybarScrollY }
	else{ ybarScrollY_target = pub_round((mainScrollY_target / mainScrollY_max) * (ybarTrackClientH - ybarthumbOffsetH)) };
	
	// 轴向符合且手柄没被隐藏，就执行手柄的滚动
	if(_native === false && scrollAxis !== 'y' && xbarThumbShowing === true)
	{ ani_animate(ele_xbar_thumb, {translateX:xbarScrollX_target}, animateSpeed, animateEasing, {thumbX:true}) };
	if(_native === false && scrollAxis !== 'x' && ybarThumbShowing === true)
	{ ani_animate(ele_ybar_thumb, {translateY:ybarScrollY_target}, animateSpeed, animateEasing, {thumbY:true}) };
	
	// 根据滚动轴向，设置自定义动画的第二个对象
	otherArguments = new Object();
	if(_native === true){
		otherArguments.wrapMove = scrollHandler;
		if(scrollAxis === 'x'){ otherArguments.wrapL = true }else 
		if(scrollAxis === 'y'){ otherArguments.wrapT = true }else{ otherArguments.wrapLT = true };
	}else{
		otherArguments.mainMove = scrollHandler;
		if(scrollAxis === 'x'){ otherArguments.mainX = true }else 
		if(scrollAxis === 'y'){ otherArguments.mainY = true }else{ otherArguments.mainXY = true };
	};
	
	// 执行容器的滚动动画，并且在动画结束后回调
	ani_animate(ele_move, animateProp, animateSpeed, animateEasing, function(){
		if(parame.callback !== undefined){ parame.callback() };
		if(_scrollExceed === true){
			
			needEdgeBounce = false;
			animateParame = {duration : 250, easing : 'easeOutBack', };
			mainScrollX = -pub_round(pub_getTranslateX(ele_main)), mainScrollY = -pub_round(pub_getTranslateY(ele_main));
			
			if(mainScrollX > mainScrollX_max){
				if(_bounceRightCallback !== pub_nothing){ _bounceRightCallback(returnObject) };
				animateParame.scrollX = mainScrollX_max;
				needEdgeBounce = true;
			}else 
			if(mainScrollX < mainScrollX_min){
				if(_bounceLeftCallback !== pub_nothing){ _bounceLeftCallback(returnObject) };
				animateParame.scrollX = mainScrollX_min;
				needEdgeBounce = true;
			};
			
			if(mainScrollY > mainScrollY_max){
				if(_bounceBottomCallback !== pub_nothing){ _bounceBottomCallback(returnObject) };
				animateParame.scrollY = mainScrollY_max;
				needEdgeBounce = true;
			}else 
			if(mainScrollY < mainScrollY_min){
				if(_bounceTopCallback !== pub_nothing){ _bounceTopCallback(returnObject) };
				animateParame.scrollY = mainScrollY_min;
				needEdgeBounce = true;
			};
			
			if(needEdgeBounce === true){ 
			mainScrollAnimate(animateParame) };
			
		};
		
	}, otherArguments);
	
};



// self 容器绑定滚轮事件，事件连续触发时，如果动画未结束，则获取当前所在的位置，再加上滚动目标值
// 累加计算才能实现滚轮连续触发的快速位移，overScrollable 参数会动态变化，得判断是否允许事件传递
// 滚动到边缘得判断是否执行父容器的 wheel 事件，此时用 e.stopPropagation(); 阻止事件冒泡最为简单
// 但这样可能会影响到其他的操作，所以还是用 wheelScrollable 参数来判断是否继续，其他事件也是这样
(function(){
		
	// 如果在 native 模式下，不需要绑定滚轮事件
	if(_native === true){ return false };
	
	// 创建 wheelEvent 回调函数中需要用到的变量
	var ele_eventTarget, jqi_eventTarget;
	var jqi_parentsNode, ele_scrollNode;
	var scrollDirection, index, length;

	// 阻止当前容器和直接父级容器的默认滚动事件
	var preventAutoScroll = function(e){
		e.preventDefault();
		if(parentReturnObject !== null){ 
			parentReturnObject._wheelScrollable = false };
	};
	
	// 在实例节点上绑定事件，只响应该节点的滚轮
	ele_self.addEventListener('wheel', function(event){
		
		// ------------------------------------
		
		// 从下到上，不允许滚动则父实例也不能动
		if(returnObject._wheelScrollable === false){
			if(parentReturnObject !== null){ parentReturnObject._wheelScrollable = false };
			returnObject._wheelScrollable = true;
			return;
		};
		
		// 操作按钮键盘则返回，拖曳有遮罩不用理
		if(isButtonMousedown === true || isButtonContinued === true 
		|| isKeysetPressdown === true || isKeysetContinued === true){
			preventAutoScroll(event);
			return;
		};
		
		// ctrl | meta 被按住是缩放，则直接返回
		if(event.ctrlKey === true 
		|| event.metaKey === true
		){ return };
		
		// 重置两个滚动的方向和自定义动画的参数
		scrollPositionX = scrollPositionY = '';
		animateParame = {};
		
		// ------------------------------------
		
		// 判断轴向，shift 按键被按住则轴向相反
		if(event.shiftKey === false){ scrollAxis = _axis }
		else if(_axis === 'x'){ scrollAxis = 'y' }else if(_axis === 'y'){ scrollAxis = 'x' };
		
		// 获取滚动距离，根据百分比或像素值计算
		if(_ratePercent === 0){ scrollValue = _ratePixel }
		else{ scrollValue = pub_round(scrollAxis === 'x' ? _ratePercent * wrapClientW : _ratePercent * wrapClientH) };
		
		// 判断滚动方向，根据轴向确定下右或上左
		if(event.deltaY < 0 || event.deltaX < 0){ if(scrollAxis === 'x'){ scrollPositionX = 'left' }else{ scrollPositionY = 'top' } }else 
		if(event.deltaY > 0 || event.deltaX > 0){ if(scrollAxis === 'x'){ scrollPositionX = 'right' }else{ scrollPositionY = 'bottom' } };
		
		// 获取滚轮滚动方向，还有触发事件的目标
		if(scrollAxis === 'x'){ scrollDirection = scrollPositionX }else{ scrollDirection = scrollPositionY };
		ele_eventTarget = event.target, jqi_eventTarget = $(ele_eventTarget);
		
		// 获取相关上层节点，包括触发事件的目标
		jqi_parentsNode = jqi_eventTarget.parentsUntil('body');
		jqi_parentsNode[-1] = ele_eventTarget;
		
		// 从 -1 开始遍历，节点不在容器中就放弃
		for(index = -1, length = jqi_parentsNode.length; index < length; index++){
			ele_scrollNode = jqi_parentsNode[index];											// 从 -1 开始，所以第一个节点其实是 ele_eventTarget
			if(ele_main.contains(ele_scrollNode) === false){ break };							// 如果这个节点已不在当前实例中，就不再继续了
			if(pub_isScrollableTo(ele_scrollNode, scrollDirection) === true){					// 如果节点可朝 scrollDirection 滚动
				if(parentReturnObject !== null){ parentReturnObject._wheelScrollable = false };	// 有父实例就阻止它的滚轮事件
				return;																			// 在函数中的 for 循环可被 return 停止，这里不能用 break，因为 break 不能停止函数
			};
		};
		
		// ------------------------------------
		
		// 根据滚动的轴向计算将要滚动的目标位置
		if(scrollAxis === 'x'){
			
			// 根据滚动类型获取滚动值并进行取整
			if(_native === true){ mainScrollX = ele_wrap.scrollLeft }else{ mainScrollX = -pub_getTranslateX(ele_main) };
			mainScrollX = pub_round(mainScrollX);
			
			// 已在边缘且目标也是边缘就不再继续
			if((scrollPositionX === 'left' && mainScrollX === mainScrollX_min) || (scrollPositionX === 'right' && mainScrollX === mainScrollX_max)){
			return (_overScrollable === false ? preventAutoScroll(event) : void 0) };
			
			// 目标边缘且不能溢出又正在滚则返回
			if(((scrollPositionX === 'left' && mainScrollX_target === mainScrollX_min) || (scrollPositionX === 'right' && mainScrollX_target === mainScrollX_max))
			&& _scrollExceed === false && ani_isAnimating(ele_move) === true){ return preventAutoScroll(event) };
			
			// 如果正在滚动则目标值是旧值再加减
			mainScrollX_target_before = mainScrollX_target; if(ani_isAnimating(ele_move) === true){ mainScrollX_target = mainScrollX_target_before }else{ mainScrollX_target = mainScrollX };
			if(scrollPositionX === 'left'){ mainScrollX_target -= scrollValue }else if(scrollPositionX === 'right'){ mainScrollX_target += scrollValue };
			
			// 不允许超出时值不能超出最大最小值
			if(scrollPositionX === 'left'){
				if(_scrollExceed === false && mainScrollX_target 
				< mainScrollX_min){ mainScrollX_target = mainScrollX_min }else if(_scrollExceed === true){
					
					// 首次超出 + 0.1，之后分段
					if(mainScrollX_target_before >= mainScrollX_min && mainScrollX_target < mainScrollX_min){ mainScrollX_target = pub_wheelPiecewise[0] * mainScrollX_min_out_abs - mainScrollX_min }else 
					if(mainScrollX_target_before <= mainScrollX_min){ mainScrollX_target = pub_wheelPiecewise[pub_floor((mainScrollX_target_before + mainScrollX_min) 
					/ mainScrollX_min_out_abs * 10)] * mainScrollX_min_out_abs + mainScrollX_target_before };
					
					// 回弹时目标颠倒则重新处理
					if(mainScrollX <= mainScrollX_min && mainScrollX_target >= mainScrollX){ mainScrollX_target = pub_wheelPiecewise[pub_floor(
					(mainScrollX + mainScrollX_min) / mainScrollX_min_out_abs * 10)] * mainScrollX_min_out_abs + mainScrollX };
					if(mainScrollX_target < mainScrollX_min_out){ mainScrollX_target = mainScrollX_min_out };
					
				};
			}else 
			if(scrollPositionX === 'right'){
				if(_scrollExceed === false && mainScrollX_target 
				> mainScrollX_max){ mainScrollX_target = mainScrollX_max }else if(_scrollExceed === true){
					
					// 首次超出 + 0.1，之后分段
					if(mainScrollX_target_before <= mainScrollX_max && mainScrollX_target > mainScrollX_max){ mainScrollX_target = pub_wheelPiecewise[0] * mainScrollX_max_out_abs + mainScrollX_max }else 
					if(mainScrollX_target_before >= mainScrollX_max){ mainScrollX_target = pub_wheelPiecewise[pub_floor((mainScrollX_target_before - mainScrollX_max) 
					/ mainScrollX_max_out_abs * 10)] * mainScrollX_max_out_abs + mainScrollX_target_before };
					
					// 回弹时目标颠倒则重新处理
					if(mainScrollX >= mainScrollX_max && mainScrollX_target <= mainScrollX){ mainScrollX_target = pub_wheelPiecewise[pub_floor(
					(mainScrollX - mainScrollX_max) / mainScrollX_max_out_abs * 10)] * mainScrollX_max_out_abs + mainScrollX };
					if(mainScrollX_target > mainScrollX_max_out){ mainScrollX_target = mainScrollX_max_out };
					
				};
			};
			
			// 阻止默认的滚动，对目标值进行取整
			preventAutoScroll(event);
			mainScrollX_target = pub_round(mainScrollX_target);
			
			// 计算目标差距，确保不短距离长时间
			mainScrollX_dvalue = pub_abs(mainScrollX_target - mainScrollX);
			if(mainScrollX_dvalue < scrollValue && mainScrollX_target >= mainScrollX_min && 
			mainScrollX_target <= mainScrollX_max){ animateParame.duration = mainScrollX_dvalue / scrollValue * _duration };
			
			// 延迟再执行有利于解决滚动前的阻滞
			clearTimeout(wheelScrollTimeout);
			wheelScrollTimeout = setTimeout(function(){
				setButtonDisabled(true, false, true);
				mainScrollAnimate(animateParame);
			}, 0);
			
		};
		
		// ------------------------------------
		
		// 根据滚动的轴向计算将要滚动的目标位置
		if(scrollAxis === 'y'){
			
			// 根据滚动类型获取滚动值并进行取整
			if(_native === true){ mainScrollY = ele_wrap.scrollTop }else{ mainScrollY = -pub_getTranslateY(ele_main) };
			mainScrollY = pub_round(mainScrollY);
			
			// 已在边缘且目标也是边缘就不再继续
			if((scrollPositionY === 'top' && mainScrollY === mainScrollY_min) || (scrollPositionY === 'bottom' && mainScrollY === mainScrollY_max)){
			return (_overScrollable === false ? preventAutoScroll(event) : void 0) };
			
			// 目标边缘且不能溢出又正在滚则返回
			if(((scrollPositionY === 'top' && mainScrollY_target === mainScrollY_min) || (scrollPositionY === 'bottom' && mainScrollY_target === mainScrollY_max))
			&& _scrollExceed === false && ani_isAnimating(ele_move) === true){ return preventAutoScroll(event) };
			
			// 如果正在滚动则目标值是旧值再加减
			mainScrollY_target_before = mainScrollY_target; if(ani_isAnimating(ele_move) === true){ mainScrollY_target = mainScrollY_target_before }else{ mainScrollY_target = mainScrollY };
			if(scrollPositionY === 'top'){ mainScrollY_target -= scrollValue }else if(scrollPositionY === 'bottom'){ mainScrollY_target += scrollValue };
			
			// 不允许超出时值不能超出最大最小值
			if(scrollPositionY === 'top'){
				if(_scrollExceed === false && mainScrollY_target 
				< mainScrollY_min){ mainScrollY_target = mainScrollY_min }else if(_scrollExceed === true){
					
					// 首次超出 + 0.1，之后分段
					if(mainScrollY_target_before >= mainScrollY_min && mainScrollY_target < mainScrollY_min){ mainScrollY_target = pub_wheelPiecewise[0] * mainScrollY_min_out_abs - mainScrollY_min }else 
					if(mainScrollY_target_before <= mainScrollY_min){ mainScrollY_target = pub_wheelPiecewise[pub_floor((mainScrollY_target_before + mainScrollY_min) 
					/ mainScrollY_min_out_abs * 10)] * mainScrollY_min_out_abs + mainScrollY_target_before };
					
					// 回弹时目标颠倒则重新处理
					if(mainScrollY <= mainScrollY_min && mainScrollY_target >= mainScrollY){ mainScrollY_target = pub_wheelPiecewise[pub_floor(
					(mainScrollY + mainScrollY_min) / mainScrollY_min_out_abs * 10)] * mainScrollY_min_out_abs + mainScrollY };
					if(mainScrollY_target < mainScrollY_min_out){ mainScrollY_target = mainScrollY_min_out };
					
				};
			}else 
			if(scrollPositionY === 'bottom'){
				if(_scrollExceed === false && mainScrollY_target 
				> mainScrollY_max){ mainScrollY_target = mainScrollY_max }else if(_scrollExceed === true){
					
					// 首次超出 + 0.1，之后分段
					if(mainScrollY_target_before <= mainScrollY_max && mainScrollY_target > mainScrollY_max){ mainScrollY_target = pub_wheelPiecewise[0] * mainScrollY_max_out_abs + mainScrollY_max }else 
					if(mainScrollY_target_before >= mainScrollY_max){ mainScrollY_target = pub_wheelPiecewise[pub_floor((mainScrollY_target_before - mainScrollY_max) 
					/ mainScrollY_max_out_abs * 10)] * mainScrollY_max_out_abs + mainScrollY_target_before };
					
					// 回弹时目标颠倒则重新处理
					if(mainScrollY >= mainScrollY_max && mainScrollY_target <= mainScrollY){ mainScrollY_target = pub_wheelPiecewise[pub_floor(
					(mainScrollY - mainScrollY_max) / mainScrollY_max_out_abs * 10)] * mainScrollY_max_out_abs + mainScrollY };
					if(mainScrollY_target > mainScrollY_max_out){ mainScrollY_target = mainScrollY_max_out };
					
				};
			};
			
			// 阻止默认的滚动，对目标值进行取整
			preventAutoScroll(event);
			mainScrollY_target = pub_round(mainScrollY_target);
			
			// 计算目标差距，确保不短距离长时间
			mainScrollY_dvalue = pub_abs(mainScrollY_target - mainScrollY);
			if(mainScrollY_dvalue < scrollValue && mainScrollY_target >= mainScrollY_min && 
			mainScrollY_target <= mainScrollY_max){ animateParame.duration = mainScrollY_dvalue / scrollValue * _duration };
			
			// 延迟再执行有利于解决滚动前的阻滞
			clearTimeout(wheelScrollTimeout);
			wheelScrollTimeout = setTimeout(function(){
				setButtonDisabled(false, true, true);
				mainScrollAnimate(animateParame);
			}, 0);
			
		};
		
		// ------------------------------------
		
	}, eve_defaultFalse());
	
})();



// thumb 手柄的拖曳事件，IOS 得先绑定空事件，才能在事件的事件中用 preventDefault()，阻止默认事件
// 遮罩会导致手柄无法触发第二次 touchstart，实际上移动端也不需要用到遮罩，因此遮罩只配合鼠标使用？
// 触屏设备在没触发 touchmove 事件时，可用两根手指实现捏合缩放，但一旦触发过 touchmove，就不行了？
// 虽然原生设备在移动后是可缩放的，但这里由于设置过 preventDefault()，所以没法跟原生效果保持一致？◆拖曳后移动的功能似乎比较多余，还容易产生误操，还是算了吧？
(function(){
	
	// IOS 绑空事件才能在事件的事中阻止默认事件
	if(pub_ios === true){ [jqi_xbar_thumb, jqi_ybar_thumb, ].forEach(
		function(jqi_thumb){ jqi_thumb.on(eve_tapmove + ' ' + eve_tapend, pub_nothing) }) };
	
	// ----------------------------------------
	
	// document 的 tapend 回调，结束 thumb 拖曳
	var documentTapend = function(event){
		
		// 解绑全局绑定的 tapmove & tapend 事件
		pub_doc.removeEventListener(eve_tapmove, documentTapmove, eve_defaultFalse());
		pub_doc.removeEventListener(eve_tapend, documentTapend, eve_defaultFalse());
		
		// 改变拖曳状态，移除全局遮罩和拖曳类名
		eve_draggingClass(false, jqi_pack);
		eve_maskingHandle(false, '');
		isDragging = false;
		
		if(/mouseup/i.test(event.type) === true 
		|| event.touches.length === 0){
		switch(scrollAxis){
			case 'x' : {
				
				clientX_end = eve_touchable ? event.changedTouches[0].clientX : event.clientX;
				clientX_move = clientX_end - clientX_start;
				
				// 没移动或不能移动或超时了则返回
				if(clientX_move !== 0 && wrapClientW <= bodyClientW 
				&& Date.now() - tapstartTime < _dragCriticalPoint){
				
					xbarScrollX = pub_getTranslateX(ele_xbar_thumb);
					xbarScrollX_target = pub_round(xbarScrollX + (clientX_move * _dragDistanceRate));
					
					if(_scrollExceed === true){
						if(xbarScrollX_target < xbarScrollX_min_out){ xbarScrollX_target = xbarScrollX_min_out }else 
						if(xbarScrollX_target > xbarScrollX_max_out){ xbarScrollX_target = xbarScrollX_max_out };
					}else{
						if(xbarScrollX_target < xbarScrollX_min){ xbarScrollX_target = xbarScrollX_min }else 
						if(xbarScrollX_target > xbarScrollX_max){ xbarScrollX_target = xbarScrollX_max };
					};
					
					mainScrollX_target = pub_round(xbarScrollX_target / xbarScrollX_max * mainScrollX_max);
					animateSpeed = pub_abs(xbarScrollX_target - xbarScrollX) * _dragDurationRate;
					if(animateSpeed < _dragMinDuration){ animateSpeed = _dragMinDuration }else 
					if(animateSpeed > _dragMaxDuration){ animateSpeed = _dragMaxDuration };
					mainScrollAnimate({duration : animateSpeed});
					
				};
				
			}; break;
			case 'y' : {
				
				clientY_end = eve_touchable ? event.changedTouches[0].clientY : event.clientY;
				clientY_move = clientY_end - clientY_start;
				
				// 没移动或不能移动或超时了则返回
				if(clientY_move !== 0 && wrapClientH <= bodyClientH 
				&& Date.now() - tapstartTime < _dragCriticalPoint){
				
					ybarScrollY = pub_getTranslateY(ele_ybar_thumb);
					ybarScrollY_target = pub_round(ybarScrollY + (clientY_move * _dragDistanceRate));
								
					if(_scrollExceed === true){
						if(ybarScrollY_target < ybarScrollY_min_out){ ybarScrollY_target = ybarScrollY_min_out }else 
						if(ybarScrollY_target > ybarScrollY_max_out){ ybarScrollY_target = ybarScrollY_max_out };
					}else{
						if(ybarScrollY_target < ybarScrollY_min){ ybarScrollY_target = ybarScrollY_min }else 
						if(ybarScrollY_target > ybarScrollY_max){ ybarScrollY_target = ybarScrollY_max };
					};
					
					mainScrollY_target = pub_round(ybarScrollY_target / ybarScrollY_max * mainScrollY_max);
					animateSpeed = pub_abs(ybarScrollY_target - ybarScrollY) * _dragDurationRate;
					if(animateSpeed < _dragMinDuration){ animateSpeed = _dragMinDuration }else 
					if(animateSpeed > _dragMaxDuration){ animateSpeed = _dragMaxDuration };
					mainScrollAnimate({ybarScrollY : ybarScrollY_target, duration : animateSpeed, });
				
				};
				
			}; break;
		}; };
		
		// 容器溢出时执行一次当前位置的动画回归
		if(ani_isAnimating(ele_move) === false 
			&& _scrollExceed === true){
			switch(scrollAxis){
				case 'x' : {
					mainScrollX = getMainScrollX();
					if(mainScrollX < 0 || mainScrollX > mainScrollX_max){ 
						mainScrollAnimate({scrollX : mainScrollX, duration : 0, }); };
				}; break;
				case 'y' : {
					mainScrollY = getMainScrollY();
					if(mainScrollY < 0 || mainScrollY > mainScrollY_max){ 
						mainScrollAnimate({scrollY : mainScrollY, duration : 0, }); };
				}; break;
			};
		};
		
	};
	
	// ----------------------------------------
	
	// document 的 tapmove 回调，用于移动 thumb
	var documentTapmove = function(event){
		
		// touch 触摸操作并且有多个触摸点则返回
		if(eve_touchable === true && event.touches.length !== 1){ return documentTapend() };
		
		// 阻止默认事件，根据是否首次拖曳初始化
		event.preventDefault(); if(isDragging === false){ isDragging = true; eve_maskingHandle(true, 'default'); };
		
		// 根据滚动的轴向来确定容器和手柄的位移
		if(scrollAxis === 'x'){
			
			// 计算位置，不动返回，否则确定方向
			clientX_old = clientX_new;
			clientX_new = eve_touchable ? event.touches[0].clientX : event.clientX;
			clientX_gap = clientX_new - clientX_old;
			if(clientX_old === clientX_new){ return }else{ scrollPositionX = (clientX_new < clientX_old ? 'left' : 'right') };
			
			// 获取当前位置，计算拖动后后的位置
			xbarScrollX = pub_getTranslateX(ele_xbar_thumb);
			xbarScrollX_target = pub_round(xbarScrollX + clientX_gap);
			
			// 不允许超出时值不能超出最大最小值
			if(scrollPositionX === 'left'){
				if(_scrollExceed === false && xbarScrollX_target 
				< xbarScrollX_min){ xbarScrollX_target = xbarScrollX_min }else if(_scrollExceed === true){
					
					// 用 detail 记录含小数的值
					if(xbarScrollX <= xbarScrollX_min){
						if(xbarScrollX_detail === undefined || xbarScrollX_detail > xbarScrollX_min){ xbarScrollX_detail = xbarScrollX_min };
						xbarScrollX_detail = pub_touchPiecewise[pub_floor((xbarScrollX_detail + xbarScrollX_min) / xbarScrollX_min_out_abs * 20)] * clientX_gap + xbarScrollX_detail;
						if(xbarScrollX_detail < xbarScrollX_min_out){ xbarScrollX_detail = xbarScrollX_min_out };
						xbarScrollX_target = xbarScrollX_detail;
					}else 
					
					// 往下超出时逆向往上的操作
					if(xbarScrollX > xbarScrollX_max){
						xbarScrollX_detail = pub_touchPiecewise[pub_floor((xbarScrollX_detail - xbarScrollX_max) / xbarScrollX_max_out_abs * 19)] * clientX_gap + xbarScrollX_detail;
						if(xbarScrollX_detail < xbarScrollX_max){ xbarScrollX_detail = xbarScrollX_max };
						xbarScrollX_target = xbarScrollX_detail;
					};
					
				};
			}else 
			
			// 20 段是 0 会无变化，从 19 段开始
			if(scrollPositionX === 'right'){
				if(_scrollExceed === false && xbarScrollX_target 
				> xbarScrollX_max){ xbarScrollX_target = xbarScrollX_max }else if(_scrollExceed === true){
					
					// 用 detail 记录含小数的值
					if(xbarScrollX >= xbarScrollX_max){
						if(xbarScrollX_detail === undefined || xbarScrollX_detail < xbarScrollX_max){ xbarScrollX_detail = xbarScrollX_max };
						xbarScrollX_detail = pub_touchPiecewise[pub_floor((xbarScrollX_detail - xbarScrollX_max) / xbarScrollX_max_out_abs * 20)] * clientX_gap + xbarScrollX_detail;
						if(xbarScrollX_detail > xbarScrollX_max_out){ xbarScrollX_detail = xbarScrollX_max_out };
						xbarScrollX_target = xbarScrollX_detail;
					}else 
					
					// 往上超出时逆向往下的操作
					if(xbarScrollX < xbarScrollX_min){
						xbarScrollX_detail = pub_touchPiecewise[pub_floor((xbarScrollX_detail + xbarScrollX_min) / xbarScrollX_min_out_abs * 19)] * clientX_gap + xbarScrollX_detail;
						if(xbarScrollX_detail > xbarScrollX_min){ xbarScrollX_detail = xbarScrollX_min };
						xbarScrollX_target = xbarScrollX_detail;
					};
					
				};
			};
			
			// 设置手柄的位置，设置按钮禁用
			if(_scrollExceed === true && xbarScrollX_detail >= xbarScrollX_min && xbarScrollX_detail <= xbarScrollX_max){ xbarScrollX_detail = undefined };
			mainScrollX = pub_round(xbarScrollX_target / xbarScrollX_max * mainScrollX_max);
			pub_setTranslateX(ele_xbar_thumb, xbarScrollX_target);
			setButtonDisabled(true, false, false);
			
			// 设置容器位置，可能得手动回调
			if(_native === true){ return ele_wrap.scrollLeft = mainScrollX };
			pub_setTranslateX(ele_main, -mainScrollX);
			mainScrollSetting();
			
		}else 
		
		// 根据滚动的轴向来确定容器和手柄的位移
		if(scrollAxis === 'y'){
			
			// 计算位置，不动返回，否则确定方向
			clientY_old = clientY_new;
			clientY_new = eve_touchable ? event.touches[0].clientY : event.clientY;
			clientY_gap = clientY_new - clientY_old;
			if(clientY_old === clientY_new){ return }else{ scrollPositionY = (clientY_new < clientY_old ? 'top' : 'bottom') };
			
			// 获取当前位置，计算拖动后后的位置
			ybarScrollY = pub_getTranslateY(ele_ybar_thumb);
			ybarScrollY_target = pub_round(ybarScrollY + clientY_gap);
			
			// 不允许超出时值不能超出最大最小值
			if(scrollPositionY === 'top'){
				if(_scrollExceed === false && ybarScrollY_target 
				< ybarScrollY_min){ ybarScrollY_target = ybarScrollY_min }else if(_scrollExceed === true){
					
					// 用 detail 记录含小数的值
					if(ybarScrollY <= ybarScrollY_min){
						if(ybarScrollY_detail === undefined || ybarScrollY_detail > ybarScrollY_min){ ybarScrollY_detail = ybarScrollY_min };
						ybarScrollY_detail = pub_touchPiecewise[pub_floor((ybarScrollY_detail + ybarScrollY_min) / ybarScrollY_min_out_abs * 20)] * clientY_gap + ybarScrollY_detail;
						if(ybarScrollY_detail < ybarScrollY_min_out){ ybarScrollY_detail = ybarScrollY_min_out };
						ybarScrollY_target = ybarScrollY_detail;
					}else 
					
					// 往下超出时逆向往上的操作
					if(ybarScrollY > ybarScrollY_max){
						ybarScrollY_detail = pub_touchPiecewise[pub_floor((ybarScrollY_detail - ybarScrollY_max) / ybarScrollY_max_out_abs * 19)] * clientY_gap + ybarScrollY_detail;
						if(ybarScrollY_detail < ybarScrollY_max){ ybarScrollY_detail = ybarScrollY_max };
						ybarScrollY_target = ybarScrollY_detail;
					};
					
				};
			}else 
			
			// 20 段是 0 会无变化，从 19 段开始
			if(scrollPositionY === 'bottom'){
				if(_scrollExceed === false && ybarScrollY_target 
				> ybarScrollY_max){ ybarScrollY_target = ybarScrollY_max }else if(_scrollExceed === true){
					
					// 用 detail 记录含小数的值
					if(ybarScrollY >= ybarScrollY_max){
						if(ybarScrollY_detail === undefined || ybarScrollY_detail < ybarScrollY_max){ ybarScrollY_detail = ybarScrollY_max };
						ybarScrollY_detail = pub_touchPiecewise[pub_floor((ybarScrollY_detail - ybarScrollY_max) / ybarScrollY_max_out_abs * 20)] * clientY_gap + ybarScrollY_detail;
						if(ybarScrollY_detail > ybarScrollY_max_out){ ybarScrollY_detail = ybarScrollY_max_out };
						ybarScrollY_target = ybarScrollY_detail;
					}else 
					
					// 往上超出时逆向往下的操作
					if(ybarScrollY < ybarScrollY_min){
						ybarScrollY_detail = pub_touchPiecewise[pub_floor((ybarScrollY_detail + ybarScrollY_min) / ybarScrollY_min_out_abs * 19)] * clientY_gap + ybarScrollY_detail;
						if(ybarScrollY_detail > ybarScrollY_min){ ybarScrollY_detail = ybarScrollY_min };
						ybarScrollY_target = ybarScrollY_detail;
					};
					
				};
			};
			
			// 设置手柄的位置，设置按钮禁用
			if(_scrollExceed === true && ybarScrollY_detail >= ybarScrollY_min && ybarScrollY_detail <= ybarScrollY_max){ ybarScrollY_detail = undefined };
			mainScrollY = pub_round(ybarScrollY_target / ybarScrollY_max * mainScrollY_max);
			pub_setTranslateY(ele_ybar_thumb, ybarScrollY_target);
			setButtonDisabled(false, true, false);
			
			// 设置容器位置，可能得手动回调
			if(_native === true){ return ele_wrap.scrollTop = mainScrollY };
			pub_setTranslateY(ele_main, -mainScrollY);
			mainScrollSetting();
			
		};
		
	};
	
	// ----------------------------------------
	
	// 遍历两个滚动条中的手柄，实现拖曳移动功能
	[ele_xbar_thumb, ele_ybar_thumb].forEach(function(ele_thumb){
		ele_thumb.addEventListener(eve_tapstart, function(event){
						
			// 有多个触摸点或不是鼠标左键则返回
			if(eve_touchable === true && event.touches.length !== 1){ return documentTapend() }
			else if(/mousedown/i.test(event.type) === true && event.which !== 1){ return 0 };
			
			// 阻止默认的行为，阻止所有滚动动画
			if(eve_touchable === true && _startPrevent === true){ event.preventDefault() }; 
			[ele_move,ele_xbar_thumb,ele_ybar_thumb].forEach(function(e){ ani_stop(e) });
			
			// 绑定全局的 tapmove & tapend 事件
			pub_doc.addEventListener(eve_tapmove, documentTapmove, eve_defaultFalse());
			pub_doc.addEventListener(eve_tapend, documentTapend, eve_defaultFalse());
			
			// 拖曳中则 html 和 pack 得添加类名
			eve_draggingClass(true, jqi_pack); tapstartTime = Date.now();
			
			// 确定轴向，初始化详情值，获取位置
			if(ele_thumb === ele_xbar_thumb){
				scrollAxis = 'x', xbarScrollX_detail = undefined;
				clientX_start = clientX_new = eve_touchable ? event.touches[0].clientX : event.clientX;
			}else 
			
			// touch 事件的点击位置位于 touches
			if(ele_thumb === ele_ybar_thumb){
				scrollAxis = 'y'; ybarScrollY_detail = undefined;
				clientY_start = clientY_new = eve_touchable ? event.touches[0].clientY : event.clientY;
			};
			
		}, eve_defaultFalse());
	});
	
})();



// button 按钮的点击事件，当按住按钮时会持续滚动到边缘，但移动端不支持这功能，因为会变成文本选择
// _ybarShow | _xbarShow 和 _buttonShow 不用判断，因为如果不显示滚动条或按钮，则按钮也无法被点到
// rate 为绝对值时，滚轮滚动可能会超出容器，所以固定按钮滚动为容器尺寸的一半，确保内容可以被看到
// 当 duration 为 0 时，点击按钮会直接到达终点，这是因为两次动画之间无间隔导致，所以改为超时执行
(function(){
	
	// 遍历按钮，按下时滚动，按住时会滚动到边缘
	[jqi_xbar_button_left,jqi_xbar_button_right,jqi_ybar_button_top,jqi_ybar_button_bottom,].forEach(
	function(jqi_button){ jqi_button.on('mousedown', 
	function(event){
		
		// ------------------------------------
		
		// 不是左键或按钮禁用或键盘操作中则返回
		if(event.which !== 1 || jqi_button.hasClass(cla_button_disabled) === true 
		|| isKeysetPressdown === true || isKeysetContinued === true){ return };
		
		// 初始化按钮滚动动画需要用到的相关变量
		isButtonMousedown = true, isButtonContinued = false, buttonScrollTimeout = void 0;
		scrollPositionX = '', scrollPositionY = '', animateParame = Object.create(null);
		
		// ------------------------------------
		
		// 根据按钮判断轴向和方向，计算滚动距离
		if(jqi_button === jqi_ybar_button_bottom){ scrollAxis = 'y', scrollPositionY = 'bottom' }else 
		if(jqi_button === jqi_xbar_button_right){ scrollAxis = 'x', scrollPositionX = 'right' }else 
		if(jqi_button === jqi_xbar_button_left){ scrollAxis = 'x', scrollPositionX = 'left' }else 
		if(jqi_button === jqi_ybar_button_top){ scrollAxis = 'y', scrollPositionY = 'top' };
		if(scrollAxis === 'x'){ scrollValue = pub_round((wrapClientW-wrapHiddenW)*.5) };
		if(scrollAxis === 'y'){ scrollValue = pub_round((wrapClientH-wrapHiddenH)*.5) };
		
		// ------------------------------------
		
		// 绑定全局单次事件，鼠标抬起时结束动画
		pub_jqi_doc.one('mouseup', function(event){
			
			// 正在按住滚动中且允许溢出则得回归
			if(isButtonContinued === true 
			&& _scrollExceed === true){
				switch(scrollAxis){
					case 'x' : {
						mainScrollX = getMainScrollX();
						if(mainScrollX < 0 || mainScrollX > mainScrollX_max){ 
						mainScrollAnimate({scrollX:mainScrollX, duration:0, }) };
					}; break;
					case 'y' : {
						mainScrollY = getMainScrollY();
						if(mainScrollY < 0 || mainScrollY > mainScrollY_max){ 
						mainScrollAnimate({scrollY:mainScrollY, duration:0, }) };
					}; break;
				};
			};
			
			// 停止动画，改变状态，清掉按住超时
			if(isButtonContinued === true && ani_isAnimating(ele_move) === true){ stopScroll() };
			isButtonMousedown = false, isButtonContinued = false;
			clearTimeout(buttonScrollTimeout);
			
		});
		
		// ------------------------------------
		
		// X 轴，计算目标和时间，并执行滚动动画
		if(scrollAxis === 'x'){
			
			// 如果正滚动中且目标已是边缘则返回
			if(_scrollExceed === false && ani_isAnimating(ele_move) === true 
				&& ((scrollPositionX === 'left' && mainScrollX_target === mainScrollX_min) 
				|| (scrollPositionX === 'right' && mainScrollX_target === mainScrollX_max))){ return }
			else if(_scrollExceed === true && ani_isAnimating(ele_move) === true 
				&& ((scrollPositionX === 'left' && mainScrollX_target === mainScrollX_min_out) 
				|| (scrollPositionX === 'right' && mainScrollX_target === mainScrollX_max_out))){ return };
			
			// 如果正在滚动则目标值是旧值再加减
			mainScrollX_target_before = mainScrollX_target, mainScrollX = getMainScrollX();
			mainScrollX_target = ani_isAnimating(ele_move) ? mainScrollX_target_before : mainScrollX;
			if(scrollPositionX === 'left'){ mainScrollX_target = mainScrollX - scrollValue }
			else if(scrollPositionX === 'right'){ mainScrollX_target = mainScrollX + scrollValue };
			
			// 允许溢出时，值不能超过溢出的边缘
			if(_scrollExceed === true && mainScrollX_target < mainScrollX_min_out){ mainScrollX_target = mainScrollX_min_out }else 
			if(_scrollExceed === true && mainScrollX_target > mainScrollX_max_out){ mainScrollX_target = mainScrollX_max_out };
			
			// 不能溢出时，值不能超过容器的边缘
			if(_scrollExceed === false && mainScrollX_target < mainScrollX_min){ mainScrollX_target = mainScrollX_min }else 
			if(_scrollExceed === false && mainScrollX_target > mainScrollX_max){ mainScrollX_target = mainScrollX_max };
			
			// 计算滚动的距离，小距离使用小时间
			mainScrollX_dvalue = pub_abs(mainScrollX_target - mainScrollX);
			if(mainScrollX_dvalue < scrollValue && mainScrollX_target >= mainScrollX_min && 
			mainScrollX_target <= mainScrollX_max){ animateParame.duration = mainScrollX_dvalue / scrollValue * _duration };
			
			// 回调，按住鼠标第二次动画滚到边缘
			animateParame.callback = function(){
				if(isButtonMousedown === false){ return }
				else{ buttonScrollTimeout = setTimeout(function(){
					
					// 按键没放开就获取当前位置
					if(isButtonMousedown === false){ return };
					mainScrollX = getMainScrollX(), isButtonContinued = true;
					
					// 已到结尾，直接返回不继续
					if((scrollPositionX === 'left' && mainScrollX === mainScrollX_min)
					|| (scrollPositionX === 'right' && mainScrollX === mainScrollX_max)){ return };
					
					// 根据方向设置滚动边缘目标
					if(scrollPositionX === 'left'){ mainScrollX_target = _scrollExceed ? mainScrollX_min_out : mainScrollX_min }
					else if(scrollPositionX === 'right'){ mainScrollX_target = _scrollExceed ? mainScrollX_max_out : mainScrollX_max };
					
					// 动画的时间，和距离成正比
					mainScrollX_dvalue = pub_abs(mainScrollX_target - mainScrollX);
					mainScrollAnimate({duration : (mainScrollX_dvalue / scrollValue * _duration / 2)});
					
				}, 500) };
			};
			
			// 确认两侧按钮的禁用，执行滚动动画
			setButtonDisabled(true, false, true);
			mainScrollAnimate(animateParame);
			
		};
		
		// ------------------------------------
		
		// Y 轴，计算目标和时间，并执行滚动动画
		if(scrollAxis === 'y'){
			
			// 如果正滚动中且目标已是边缘则返回
			if(_scrollExceed === false && ani_isAnimating(ele_move) === true 
				&& ((scrollPositionY === 'top' && mainScrollY_target === mainScrollY_min) 
				|| (scrollPositionY === 'bottom' && mainScrollY_target === mainScrollY_max))){ return }
			else if(_scrollExceed === true && ani_isAnimating(ele_move) === true 
				&& ((scrollPositionY === 'top' && mainScrollY_target === mainScrollY_min_out) 
				|| (scrollPositionY === 'bottom' && mainScrollY_target === mainScrollY_max_out))){ return };
			
			// 如果正在滚动则目标值是旧值再加减
			mainScrollY_target_before = mainScrollY_target, mainScrollY = getMainScrollY();
			mainScrollY_target = ani_isAnimating(ele_move) ? mainScrollY_target_before : mainScrollY;
			if(scrollPositionY === 'top'){ mainScrollY_target = mainScrollY - scrollValue }
			else if(scrollPositionY === 'bottom'){ mainScrollY_target = mainScrollY + scrollValue };
			
			// 允许溢出时，值不能超过溢出的边缘
			if(_scrollExceed === true && mainScrollY_target < mainScrollY_min_out){ mainScrollY_target = mainScrollY_min_out }else 
			if(_scrollExceed === true && mainScrollY_target > mainScrollY_max_out){ mainScrollY_target = mainScrollY_max_out };
			
			// 不能溢出时，值不能超过容器的边缘
			if(_scrollExceed === false && mainScrollY_target < mainScrollY_min){ mainScrollY_target = mainScrollY_min }else 
			if(_scrollExceed === false && mainScrollY_target > mainScrollY_max){ mainScrollY_target = mainScrollY_max };
			
			// 计算滚动的距离，小距离使用小时间
			mainScrollY_dvalue = pub_abs(mainScrollY_target - mainScrollY);
			if(mainScrollY_dvalue < scrollValue && mainScrollY_target >= mainScrollY_min && 
			mainScrollY_target <= mainScrollY_max){ animateParame.duration = mainScrollY_dvalue / scrollValue * _duration };
			
			// 回调，按住鼠标第二次动画滚到边缘
			animateParame.callback = function(){
				if(isButtonMousedown === false){ return }
				else{ buttonScrollTimeout = setTimeout(function(){
					
					// 按键没放开就获取当前位置
					if(isButtonMousedown === false){ return };
					mainScrollY = getMainScrollY(), isButtonContinued = true;
					
					// 已到结尾，直接返回不继续
					if((scrollPositionY === 'top' && mainScrollY === mainScrollY_min)
					|| (scrollPositionY === 'bottom' && mainScrollY === mainScrollY_max)){ return };
					
					// 根据方向设置滚动边缘目标
					if(scrollPositionY === 'top'){ mainScrollY_target = _scrollExceed ? mainScrollY_min_out : mainScrollY_min }
					else if(scrollPositionY === 'bottom'){ mainScrollY_target = _scrollExceed ? mainScrollY_max_out : mainScrollY_max };
					
					// 动画的时间，和距离成正比
					mainScrollY_dvalue = pub_abs(mainScrollY_target - mainScrollY);
					mainScrollAnimate({duration : (mainScrollY_dvalue / scrollValue * _duration / 2)});
					
				}, 500) };
			};
			
			// 确认两侧按钮的禁用，执行滚动动画
			setButtonDisabled(false, true, true);
			mainScrollAnimate(animateParame);
			
		};
		
		// --------------------------------
		
	}) });
	
})();



// track 轨道的点击事件，动画不需要计算 duration，因为距离不确定，无法比对，所以使用默认参数即可
// 无需判断 _ybarShow 和 _xbarShow 和 _trackShow，因为如果不显示滚动条或轨道，自然也无法被点击到
// 目标是点击处减去手柄一半的尺寸，offsetX|Y 点到 padding 或 border 会返回负数，所以用 clientX|Y
// 轨道点击动画是动画函数中仅有的提前就知道 thumb 位置的情况，直接传入参数即可，其他情况都得计算
(function(){
	
	// 如果轨道被点击，手柄中心滑动到点击位置去
	[jqi_xbar_track, jqi_ybar_track, ].forEach(function(jqi_track){
	jqi_track.on('click' + dot_id, function(event){
		
		// ------------------------------------
		
		if(jqi_track === jqi_xbar_track){
			
			// 不是左键，无需滚动，点到手柄，则返回
			if(event.which !== 1 
			|| wrapClientW >= bodyClientW 
			|| event.target === ele_xbar_thumb){ return };
			
			// 手柄目标值是点击位置减去手柄尺寸一半
			xbarTrackStyleObject = pub_getStyleObject(ele_xbar_track);
			xbarScrollX_target = pub_round(event.clientX - ele_xbar_track.getBoundingClientRect().left 
			- parseInt(xbarTrackStyleObject.paddingLeft) - parseInt(xbarTrackStyleObject.borderLeftWidth) - (xbarthumbOffsetW / 2));
			
			// 允许溢出时，目标值不能超过溢出的边缘
			if(_scrollExceed === true && xbarScrollX_target < xbarScrollX_min_out){ xbarScrollX_target = xbarScrollX_min_out }else 
			if(_scrollExceed === true && xbarScrollX_target > xbarScrollX_max_out){ xbarScrollX_target = xbarScrollX_max_out }else 
			
			// 不能溢出时，目标值不能超过容器的边缘
			if(_scrollExceed === false && xbarScrollX_target < xbarScrollX_min){ xbarScrollX_target = xbarScrollX_min }else 
			if(_scrollExceed === false && xbarScrollX_target > xbarScrollX_max){ xbarScrollX_target = xbarScrollX_max };
			
			// 计算容器将要滚动的目标位置和目标方向
			mainScrollX_target = pub_round(xbarScrollX_target / xbarScrollX_max * mainScrollX_max);
			scrollPositionX = xbarScrollX_target < pub_getTranslateX(ele_xbar_thumb) ? 'left' : 'right';
			
			// 禁用按钮需要当前位置，动画则需要方向
			mainScrollX = getMainScrollX(), setButtonDisabled(true, false, true);
			scrollAxis = 'x', mainScrollAnimate({xbarScrollX : xbarScrollX_target, });
			
		};
		
		// ------------------------------------
		
		if(jqi_track === jqi_ybar_track){
			
			// 不是左键，无需滚动，点到手柄，则返回
			if(event.which !== 1 
			|| wrapClientH >= bodyClientH 
			|| event.target === ele_ybar_thumb){ return };
			
			// 手柄目标值是点击位置减去手柄尺寸一半
			ybarTrackStyleObject = pub_getStyleObject(ele_ybar_track);
			ybarScrollY_target = pub_round(event.clientY - ele_ybar_track.getBoundingClientRect().top 
			- parseInt(ybarTrackStyleObject.paddingTop ) - parseInt(ybarTrackStyleObject.borderTopWidth) - (ybarthumbOffsetH / 2));
			
			// 允许溢出时，目标值不能超过溢出的边缘
			if(_scrollExceed === true && ybarScrollY_target < ybarScrollY_min_out){ ybarScrollY_target = ybarScrollY_min_out }else 
			if(_scrollExceed === true && ybarScrollY_target > ybarScrollY_max_out){ ybarScrollY_target = ybarScrollY_max_out }else 
			
			// 不能溢出时，目标值不能超过容器的边缘
			if(_scrollExceed === false && ybarScrollY_target < ybarScrollY_min){ ybarScrollY_target = ybarScrollY_min }else 
			if(_scrollExceed === false && ybarScrollY_target > ybarScrollY_max){ ybarScrollY_target = ybarScrollY_max };
			
			// 计算容器将要滚动的目标位置和目标方向
			mainScrollY_target = pub_round(ybarScrollY_target / ybarScrollY_max * mainScrollY_max);
			scrollPositionY = ybarScrollY_target < pub_getTranslateY(ele_ybar_thumb) ? 'top' : 'bottom';
			
			// 禁用按钮需要当前位置，动画则需要方向
			mainScrollY = getMainScrollY(), setButtonDisabled(false, true, true);
			scrollAxis = 'y', mainScrollAnimate({ybarScrollY : ybarScrollY_target, });
			
		};
		
		// ------------------------------------
	
	}); });
		
})();



// corner 按钮的拖曳事件，和 thumb 的拖曳一样，为 IOS 绑定空事件，这样 preventDefault() 才能生效
// 边角按钮在拖曳时，尺寸细节在 hover 时就得显示，可避免双击闪烁，Android 上存在小数，所以得取整
// 边角按钮在拖曳时，还得额外的设置 .xjScroll-corner-dragging 类名，用于确保按钮和尺寸信息的显示
// 由于 resize 事件有防抖或节流，所以得手动执行 mainResizeSetting 及时设置尺寸，否则响应不够灵敏
(function(){
	
	// 不显示边角按钮就返回，无法触发相关的事件
	if(_resizeEnable === false){ return };
	
	// IOS 绑空事件才能在事件的事中阻止默认事件
	if(pub_ios === true){ jqi_corner.on(eve_tapmove + ' ' + eve_tapend, pub_nothing) };
	
	// 获取容器的尺寸，更新在 info 模块上的信息
	var setCornerInfoText = function(){ jqi_corner_info.text( pub_round(jqi_self.outerWidth()) +'px × '+ pub_round(jqi_self.outerHeight()) +'px') };
	
	// 显示细节就绑定相关事件，否则隐藏信息模块
	if(_resizeDetails === true){ jqi_corner.on('mouseenter', function(){ setCornerInfoText() }) }
	else{ jqi_corner_info.css('display', 'none') };
	
	// 开始时 self 的宽高度，以及时间戳和指针值
	var tapstartTime = Date.now();
	var outerWidth = 0, outerHeight = 0;
	var cursorResult = jqi_corner_icon.css('cursor');
	
	// document 的 tapend 回调，corner 结束拖曳
	var documentTapend = function(event){
		
		// 改变拖曳状态，移除全局遮罩和拖曳类名
		isDragging = false;
		eve_maskingHandle(false, '');
		eve_draggingClass(false, jqi_pack);
		jqi_self.removeClass(cla_corner_dragging);
		
		// X 轴溢出的时候执行当前位置的动画回归
		mainScrollX = getMainScrollX(); 
		if(mainScrollX < 0 || mainScrollX > mainScrollX_max
		){ mainScrollAnimate({ scrollX : mainScrollX, duration : 0, }) };
		
		// Y 轴溢出的时候执行当前位置的动画回归
		mainScrollY = getMainScrollY();
		if(mainScrollY < 0 || mainScrollY > mainScrollY_max
		){ mainScrollAnimate({ scrollY : mainScrollY, duration : 0, }) };
		
		// 解绑全局绑定的 tapmove & tapend 事件
		pub_doc.removeEventListener(eve_tapmove, documentTapmove, eve_defaultFalse());
		pub_doc.removeEventListener(eve_tapend, documentTapend, eve_defaultFalse());
		
	};
	
	// 改变容器尺寸，移动端会出现小数，进行取整
	var documentTapmove = function(event){
		
		// touch 触摸操作并且有多个触摸点则返回
		if(eve_touchable === true && event.touches.length !== 1){ return documentTapend() };
		
		// 阻止默认事件，根据是否首次拖曳初始化
		event.preventDefault(); if(isDragging === false){ isDragging = true; eve_maskingHandle(true, cursorResult); };
		
		clientX_move = (eve_touchable ? event.touches[0].clientX : event.clientX) - clientX_start;
		clientY_move = (eve_touchable ? event.touches[0].clientY : event.clientY) - clientY_start;
		
		if(_resizeDirection !== 'vertical'){ jqi_self.css({width : pub_round(outerWidth + clientX_move)}) };
		if(_resizeDirection !== 'horizontal'){ jqi_self.css({height : pub_round(outerHeight + clientY_move)}) };
		
		if(_resizeDetails === true){ setCornerInfoText() };
		if(_resizeCallbackType !== 'none'){ mainResizeSetting() };
		
	};
	
	// 为 corner 绑 mousedown | touchstart 事件
	ele_corner.addEventListener(eve_tapstart, function(event){
					
		// 有多个触摸点或不是鼠标左键则返回
		if(eve_touchable === true && event.touches.length !== 1){ return documentTapend() }
		else if(/mousedown/i.test(event.type) === true && event.which !== 1){ return 0 };
		
		// 双击的时候删掉设置以恢复容器尺寸
		if(_resizeRecovery === true && Date.now() - tapstartTime < 500){
			jqi_self.css('width', '').css('height', '');
			tapstartTime = Date.now();
			return;
		}else{ tapstartTime = Date.now() };
		
		// 阻止默认行为，阻止所有的滚动动画
		if(eve_touchable === true && _startPrevent === true){ event.preventDefault() }; 
		[ele_move,ele_xbar_thumb,ele_ybar_thumb].forEach(function(e){ ani_stop(e) });
		
		// 绑定全局的 tapmove & tapend 事件
		pub_doc.addEventListener(eve_tapmove, documentTapmove, eve_defaultFalse());
		pub_doc.addEventListener(eve_tapend, documentTapend, eve_defaultFalse());
		
		clientX_start = eve_touchable ? event.touches[0].clientX : event.clientX;
		clientY_start = eve_touchable ? event.touches[0].clientY : event.clientY;
		
		outerWidth = pub_round(jqi_self.outerWidth());
		outerHeight = pub_round(jqi_self.outerHeight());
		if(_resizeDetails === true){ setCornerInfoText() };
		jqi_self.addClass( cla_corner_dragging );
		eve_draggingClass(true, jqi_pack);
		
	}, eve_defaultFalse());
	
})();



// IE 可用 preventDefault() 阻止中键的自由位移，但其他浏览器不行，所以中键自由拖曳的想法只能作罢
// 实例嵌套则事件会多次触发，用 stopPropagation() 阻止事件传递可能会影响其他插件，只能直接返回了
// PC 端使用鼠标进行拖曳时不能圈选，如果圈选了就不能拖曳，主要是针对表单元素，不响应可编辑的元素
// 需要注意的是，当鼠标按下时，即使没有移动鼠标，只要不松开鼠标，就会自动连续触发 mousemove 事件◆注意 PC 端和 移动端的拖曳逻辑细节是不一样，测试需要分开进行
(function(){
	
	// 触屏且用原生模式或非触屏且无需拖曳则返回
	if(eve_touchable === true && _native === true){ return }
	else if(eve_touchable === false && _mouseDrag === false){ return };
	
	// 允许鼠标拖曳时得禁止图片文本被拖出新窗口
	if(eve_touchable === false && _mouseDrag === true){ jqi_self
	.on('dragstart' + dot_id, function(event){ event.preventDefault() }) };
	
	// IOS 绑空事件才能在事件的事中阻止默认事件
	if(pub_ios === true){ jqi_wrap.on(eve_tapmove + ' ' + eve_tapend, pub_nothing) };
	
	// ----------------------------------------
	
	// 创建拖曳移动需要用的变量，避免每次的重建
	var ele_target = null;					// tapstart 事件回调中的 event.target
	var jqi_target = null;					// tapstart 事件回调中的 $ ele_target
	
	var jqi_parent = null;					// tapstart 中的 target 的所有父节点
	var ele_scroll = null;					// tapstart 中的 target 能滚的父节点
	
	var isWritableTag = false;				// 点击的是否为可写的元素节点
	var isEnableRange = false;				// 点击的是否为没禁用的 Range
	
	var tapstartTime = 0;					// 首次点击的时间戳
	
	var parentTarget = null;				// 父实例返回值对象
	var animateSpeed = 0;					// 拖曳滚动动画时长
		
	var touchDirection = '';				// 移动端首次拖曳的主方向
	var chiefDirection = '';				// 拖曳主要是 X 轴或 Y 轴
	var dragDirectionX = '';				// 横拖方向，left | right
	var dragDirectionY = '';				// 竖拖方向，top | bottom
	
	var isDraggable = false;				// 是否允许拖曳
	var isDraggableX = false;				// 是否允许 X 轴拖曳
	var isDraggableY = false;				// 是否允许 Y 轴拖曳
	
	var isUndragged = false;				// 是否禁止拖曳
	var isUndraggedX = false;				// 是否禁止 X 轴拖曳
	var isUndraggedY = false;				// 是否禁止 Y 轴拖曳
	
	var checkNativeScrollable = false;		// 检测是否还能进行原生滚动
	var checkDraggedThreshold = false;		// 检测拖曳是否已经超过阈值
	var checkAlreadyScrollEnd = false;		// 检查滚动是否已经抵达边缘
	
	var index, length;
	
	// ----------------------------------------
	
	// 拖曳结束的回调，执行回调，并尝试执行动画
	var documentTapend = function(event){
				
		// 解绑全局绑定的 tapmove & tapend 事件
		pub_doc.removeEventListener(eve_tapmove, documentTapmove, eve_defaultFalse());
		pub_doc.removeEventListener(eve_tapend, documentTapend, eve_defaultFalse());
		
		clientX_end = clientX_new - clientX_start;
		clientY_end = clientY_new - clientY_start;
		scrollPositionX = '';
		scrollPositionY = '';

		// 改变拖曳状态，移除全局遮罩和拖曳类名
		eve_draggingClass(false, jqi_pack);
		eve_maskingHandle(false, '');
		isDragging = false;
		scrollAxis = '';
		
		// 确实发生了移动，并且时间得小于临界值
		if(returnObject._dragScrollable === true 
		&& (clientX_end !== 0 || clientY_end !== 0) 
		&& Date.now() - tapstartTime < _dragCriticalPoint){
			if(/mouseup/i.test(event.type) === true || event.touches.length === 0){
				
				// 容器能够水平滚动且有水平拖动且没超出
				if(mainScrollX_max !== 0 && clientX_end !== 0
				&& mainScrollX > mainScrollX_min && mainScrollX < mainScrollX_max){
					mainScrollX_target = pub_round(mainScrollX - clientX_end * _dragDistanceRate);
							
					if(_scrollExceed === true){
						if(mainScrollX_target < mainScrollX_min_out){ mainScrollX_target = mainScrollX_min_out }else 
						if(mainScrollX_target > mainScrollX_max_out){ mainScrollX_target = mainScrollX_max_out };
					}else{
						if(mainScrollX_target < mainScrollX_min){ mainScrollX_target = mainScrollX_min }else 
						if(mainScrollX_target > mainScrollX_max){ mainScrollX_target = mainScrollX_max };
					};
					
					if(clientX_end < 0){ scrollPositionX = 'right' }else if(clientX_end > 0){ scrollPositionX = 'left' };
				};
				
				// 容器能够垂直滚动且有垂直拖动且没超出
				if(mainScrollY_max !== 0 && clientY_end !== 0 
				&& mainScrollY > mainScrollY_min && mainScrollY < mainScrollY_max){
					
					mainScrollY_target = pub_round(mainScrollY - clientY_end * _dragDistanceRate);
					
					if(_scrollExceed === true){
						if(mainScrollY_target < mainScrollY_min_out){ mainScrollY_target = mainScrollY_min_out }else 
						if(mainScrollY_target > mainScrollY_max_out){ mainScrollY_target = mainScrollY_max_out };
					}else{
						if(mainScrollY_target < mainScrollY_min){ mainScrollY_target = mainScrollY_min }else 
						if(mainScrollY_target > mainScrollY_max){ mainScrollY_target = mainScrollY_max };
					};
					
					if(clientY_end < 0){ scrollPositionY = 'bottom' }else if(clientY_end > 0){ scrollPositionY = 'top' };
				};
				
				// 确定滚动轴向和滚动时间，执行滚动动画
				if(scrollPositionX !== '' && scrollPositionY !== ''){ scrollAxis = 'xy' }else if(scrollPositionX !== ''){ scrollAxis = 'x' }else if(scrollPositionY !== ''){ scrollAxis = 'y' };
				if(scrollAxis !== ''){
					animateSpeed = pub_max( pub_abs(mainScrollX_target - mainScrollX), pub_abs(mainScrollY_target - mainScrollY) ) * _dragDurationRate;
					if(animateSpeed < _dragMinDuration){ animateSpeed = _dragMinDuration }else 
					if(animateSpeed > _dragMaxDuration){ animateSpeed = _dragMaxDuration };
					mainScrollAnimate({duration : animateSpeed});
				};

			};
		};
		
		// 容器溢出时执行一次当前位置的动画回归
		if(ani_isAnimating(ele_move) === false && _scrollExceed === true){
			
			mainScrollX = getMainScrollX();
			mainScrollY = getMainScrollY();
			
			if(mainScrollX_max !== 0 && mainScrollY_max !== 0 && (mainScrollX < 0 || mainScrollX > mainScrollX_max) && (mainScrollY < 0 || mainScrollY > mainScrollY_max)){
				scrollAxis = 'xy'; mainScrollAnimate({scrollX : mainScrollX, scrollY : mainScrollY, duration : 0, });
			}
			else if(mainScrollX_max !== 0 && (mainScrollX < 0 || mainScrollX > mainScrollX_max)){ scrollAxis = 'x'; mainScrollAnimate({scrollX : mainScrollX, duration : 0, }); }
			else if(mainScrollY_max !== 0 && (mainScrollY < 0 || mainScrollY > mainScrollY_max)){ scrollAxis = 'y'; mainScrollAnimate({scrollY : mainScrollY, duration : 0, }); };
			
		};
		
	};
	
	// ----------------------------------------
	
	// 拖曳移动的回调，超出阈值才动，并移动容器
	var documentTapmove = function(event){
		
		// 不允许拖曳或者多点触屏则直接结束事件
		if(returnObject._dragScrollable === false){ return }else 
		if(eve_touchable === true && event.touches.length !== 1){ return documentTapend() };
		
		// 记住上轮移动的旧值并获取当前所在位置
		clientX_old = clientX_new, clientX_new = eve_touchable ?
		event.touches[0].clientX : event.clientX;
		clientY_old = clientY_new, clientY_new = eve_touchable ?
		event.touches[0].clientY : event.clientY;
		
		// 计算本次事件总共移动 X 轴和 Y 轴距离
		clientX_gap = clientX_old - clientX_new ;
		clientY_gap = clientY_old - clientY_new ;
		
		// mouse 按住会连续触发，但没移动则返回
		if(clientX_gap === clientY_gap 
		&& clientX_gap === 0){ return };
		
		// --------------------------------------
		
		// 移动端需要检测一次点击节点是否可滚动
		if(eve_touchable === true 
		&& checkNativeScrollable === false){
			
			// 根据数值判断方向，移动端总会有值
			if(pub_abs(clientX_gap) >= pub_abs(clientY_gap)
			){ touchDirection = clientX_gap < 0 ? 'left' : 'right' };
			
			// 如果距离相等，那么优先为垂直方向
			if(pub_abs(clientX_gap) <= pub_abs(clientY_gap)
			){ touchDirection = clientY_gap < 0 ? 'top' : 'bottom' };
			
			// 遍历相关上层节点，含目标节点本身
			jqi_parent = jqi_target.parentsUntil('body'), jqi_parent[-1] = ele_target;
			for(checkNativeScrollable = true, index = -1, length = 
			jqi_parent.length; index < length; 
			index++){
				
				// 节点在实例中且能朝该方向滚动
				ele_scroll = jqi_parent[index];
				if(ele_main.contains(ele_scroll) === false){ break }
				else if(pub_isScrollableTo(ele_scroll, touchDirection) === true){ // 可滚动的
					
					// 阻止自身和所有父实例移动
					returnObject._dragScrollable = false;
					parentTarget = parentReturnObject;
					while(parentTarget !== null){
						parentTarget._dragScrollable = false;
						parentTarget = parentTarget.parentReturnObject;
					};
					
					// return 还有 break 的功能
					return;
					
				};
			};
			
		};
		
		// --------------------------------------
		
		// 判断移动距离是否到达阈值，没有就返回
		if(checkDraggedThreshold === false){
			
			// 计算本次移动初始那个触摸点的距离
			clientX_move = clientX_start - clientX_new, clientY_move = clientY_start - clientY_new;
			
			// 如果移动没有超出阈值，那就先不动
			if(pub_abs(clientX_move) < _dragLimit && pub_abs(clientY_move) < _dragLimit){ return };
			
			// 是否有阻止 X 轴或 Y轴拖曳的类名
			isUndraggedX = Boolean( jqi_target.closest('.xjScroll-undragged-x').length > 0 );
			isUndraggedY = Boolean( jqi_target.closest('.xjScroll-undragged-y').length > 0 );
			
			// 根据拖曳的距离确定拖曳的主要方向
			if(pub_abs(clientX_move) >= pub_abs(clientY_move)){ chiefDirection = 'x' };
			if(pub_abs(clientX_move) <= pub_abs(clientY_move)){ chiefDirection = 'y' };
			
			// 类名设置不能朝目标方向移动就返回
			if((isUndraggedX === true && chiefDirection === 'x') 
			|| (isUndraggedY === true && chiefDirection === 'y')
			){  returnObject._dragScrollable = false;
				parentTarget = parentReturnObject;
				while(parentTarget !== null){
					parentTarget._dragScrollable = false;
					parentTarget = parentTarget.parentReturnObject;
				};
				return;
			};
			
			// 根据数值判断移动方向，没动就是空
			if(clientX_move < 0){ dragDirectionX = 'left' }
			else if(clientX_move > 0){ dragDirectionX = 'right'  };
			if(clientY_move < 0){ dragDirectionY = 'top'  }
			else if(clientY_move > 0){ dragDirectionY = 'bottom' };
			
			// 修改两个状态值，添加拖曳时的遮罩
			isDragging = true, checkDraggedThreshold = true;
			eve_maskingHandle(true, '');
			
		};
		
		// ------------------------------------
		
		// 获取当前容器滚动的 X 轴 Y 轴所在位置
		mainScrollX = getMainScrollX();
		mainScrollY = getMainScrollY();
		
		// 计算当前容器将前往 X 轴 Y 轴所在目标
		mainScrollX_target = pub_round(mainScrollX + clientX_gap);
		mainScrollY_target = pub_round(mainScrollY + clientY_gap);
		
		// 如果实例已经到达边缘则改为移动父实例
		(function(){
			
			// 如果滚动无需传递或全局模式则返回
			if(checkAlreadyScrollEnd === false){ checkAlreadyScrollEnd = true }
			else if(checkAlreadyScrollEnd === true){ return };
			if(_overScrollable === false || _replaceGlobal === true){ return };
			
			// 鼠标拖曳没父实例或不许拖曳则返回
			if(eve_touchable === false){
				if(parentReturnObject === null){ return }else 
				if(parentReturnObject !== null && parentReturnObject.mouseDrag === false){ return };
			};
			
			// 主方向为 X，已到达左右边缘了
			if(chiefDirection === 'x'){
				if((dragDirectionX === 'left'   
				 && mainScrollX === 0 && mainScrollX_target <= 0) 
				|| (dragDirectionX === 'right'  && mainScrollX === mainScrollX_max 
				 && mainScrollX_target >= mainScrollX_max)){ returnObject._dragScrollable = false };
			}else
			if(chiefDirection === 'y'){
				if((dragDirectionY === 'top'    
				 && mainScrollY === 0 && mainScrollY_target <= 0)
				|| (dragDirectionY === 'bottom' && mainScrollY === mainScrollY_max 
				 && mainScrollY_target >= mainScrollY_max)){ returnObject._dragScrollable = false };
			};
			
		})();
		
		// 抵达此处就是能滚动，阻止父容器的滚动
		if(returnObject._dragScrollable === false){ return }
		else{
			parentTarget = parentReturnObject;
			while(parentTarget !== null){
				parentTarget._dragScrollable = false;
				parentTarget = parentTarget.parentReturnObject;
			};
		};
		
		// 根据 X 轴 Y 轴移动距离判断移动的方向
		if(mainScrollX_max === 0 || clientX_old === clientX_new){ scrollPositionX = '' }
		else{ scrollPositionX = (clientX_new > clientX_old ? 'left' : 'right') };
		if(mainScrollY_max === 0 || clientY_old === clientY_new){ scrollPositionY = '' }
		else{ scrollPositionY = (clientY_new > clientY_old ? 'top' : 'bottom') };
		
		// ------------------------------------
		
		// 允许 X 轴移动的时候，处理具体移动逻辑
		(function(){
			
			// 不允许 X 轴拖曳则直接返回不做处理
			if(mainScrollX_max === 0 || isUndraggedX === true){ return };
			if((isWritableTag === true || isEnableRange === true) && isDraggableX === false){ return };
			
			// 不允许超出时值不能超出最大最小值
			if(scrollPositionX === 'left'){
				if(_scrollExceed === false && mainScrollX_target 
				< mainScrollX_min){ mainScrollX_target = mainScrollX_min }else if(_scrollExceed === true){
					
					// 用 detail 记录含小数的值
					if(mainScrollX <= mainScrollX_min){
						if(mainScrollX_detail === null || mainScrollX_detail > mainScrollX_min){ mainScrollX_detail = mainScrollX_min };
						mainScrollX_detail = pub_touchPiecewise[pub_floor((mainScrollX_detail + mainScrollX_min) / mainScrollX_min_out_abs * 20)] * clientX_gap + mainScrollX_detail;
						if(mainScrollX_detail < mainScrollX_min_out){ mainScrollX_detail = mainScrollX_min_out };
						mainScrollX_target = mainScrollX_detail;
					}else 
					
					// 往下超出时逆向往上的操作
					if(mainScrollX > mainScrollX_max){
						mainScrollX_detail = pub_touchPiecewise[pub_floor((mainScrollX_detail - mainScrollX_max) / mainScrollX_max_out_abs * 19)] * clientX_gap + mainScrollX_detail;
						if(mainScrollX_detail < mainScrollX_max){ mainScrollX_detail = mainScrollX_max };
						mainScrollX_target = mainScrollX_detail;
					};
					
				};
			}else 
			
			// 20 段是 0 会无变化，从 19 段开始
			if(scrollPositionX === 'right'){
				if(_scrollExceed === false && mainScrollX_target 
				> mainScrollX_max){ mainScrollX_target = mainScrollX_max }else if(_scrollExceed === true){
					
					// 用 detail 记录含小数的值
					if(mainScrollX >= mainScrollX_max){
						if(mainScrollX_detail === null || mainScrollX_detail < mainScrollX_max){ mainScrollX_detail = mainScrollX_max };
						mainScrollX_detail = pub_touchPiecewise[pub_floor((mainScrollX_detail - mainScrollX_max) / mainScrollX_max_out_abs * 20)] * clientX_gap + mainScrollX_detail;
						if(mainScrollX_detail > mainScrollX_max_out){ mainScrollX_detail = mainScrollX_max_out };
						mainScrollX_target = mainScrollX_detail;
					}else 
					
					// 往上超出时逆向往下的操作
					if(mainScrollX < mainScrollX_min){
						mainScrollX_detail = pub_touchPiecewise[pub_floor((mainScrollX_detail + mainScrollX_min) / mainScrollX_min_out_abs * 19)] * clientX_gap + mainScrollX_detail;
						if(mainScrollX_detail > mainScrollX_min){ mainScrollX_detail = mainScrollX_min };
						mainScrollX_target = mainScrollX_detail;
					};
					
				};
			};
			
			// 设置位置并重新获取，因为按钮还得用到
			if(_native === true){ ele_wrap.scrollLeft = mainScrollX_target }else{ 
			pub_setTranslateX(ele_main, -mainScrollX_target) };
			mainScrollX = mainScrollX_target;
			
		})();
		
		// ------------------------------------
		
		// 允许 Y 轴移动的时候，处理具体移动逻辑
		(function(){
			
			// 不允许 Y 轴拖曳则直接返回不做处理
			if(mainScrollY_max === 0 || isUndraggedY === true){ return };
			if((isWritableTag === true || isEnableRange === true) && isDraggableY === false){ return };
			
			// 不允许超出时值不能超出最大最小值
			if(scrollPositionY === 'top'){
				if(_scrollExceed === false && mainScrollY_target 
				< mainScrollY_min){ mainScrollY_target = mainScrollY_min }else if(_scrollExceed === true){
					
					// 用 detail 记录含小数的值
					if(mainScrollY <= mainScrollY_min){
						if(mainScrollY_detail === null || mainScrollY_detail > mainScrollY_min){ mainScrollY_detail = mainScrollY_min };
						mainScrollY_detail = pub_touchPiecewise[pub_floor((mainScrollY_detail + mainScrollY_min) / mainScrollY_min_out_abs * 20)] * clientY_gap + mainScrollY_detail;
						if(mainScrollY_detail < mainScrollY_min_out){ mainScrollY_detail = mainScrollY_min_out };
						mainScrollY_target = mainScrollY_detail;
					}else 
					
					// 往下超出时逆向往上的操作
					if(mainScrollY > mainScrollY_max){
						mainScrollY_detail = pub_touchPiecewise[pub_floor((mainScrollY_detail - mainScrollY_max) / mainScrollY_max_out_abs * 19)] * clientY_gap + mainScrollY_detail;
						if(mainScrollY_detail < mainScrollY_max){ mainScrollY_detail = mainScrollY_max };
						mainScrollY_target = mainScrollY_detail;
					};
					
				};
			}else 
			
			// 20 段是 0 会无变化，从 19 段开始
			if(scrollPositionY === 'bottom'){
				if(_scrollExceed === false && mainScrollY_target 
				> mainScrollY_max){ mainScrollY_target = mainScrollY_max }else if(_scrollExceed === true){
					
					// 用 detail 记录含小数的值
					if(mainScrollY >= mainScrollY_max){
						if(mainScrollY_detail === null || mainScrollY_detail < mainScrollY_max){ mainScrollY_detail = mainScrollY_max };
						mainScrollY_detail = pub_touchPiecewise[pub_floor((mainScrollY_detail - mainScrollY_max) / mainScrollY_max_out_abs * 20)] * clientY_gap + mainScrollY_detail;
						if(mainScrollY_detail > mainScrollY_max_out){ mainScrollY_detail = mainScrollY_max_out };
						mainScrollY_target = mainScrollY_detail;
					}else 
					
					// 往上超出时逆向往下的操作
					if(mainScrollY < mainScrollY_min){
						mainScrollY_detail = pub_touchPiecewise[pub_floor((mainScrollY_detail + mainScrollY_min) / mainScrollY_min_out_abs * 19)] * clientY_gap + mainScrollY_detail;
						if(mainScrollY_detail > mainScrollY_min){ mainScrollY_detail = mainScrollY_min };
						mainScrollY_target = mainScrollY_detail;
					};
					
				};
			};
			
			// 设置位置并重新获取，因为按钮还得用到
			if(_native === true){ ele_wrap.scrollTop = mainScrollY_target }else{ 
			pub_setTranslateY(ele_main, -mainScrollY_target) };
			mainScrollY = mainScrollY_target;
			
		})();
		
		// ------------------------------------
		
		// detail 值如果没有溢出则重新设为 null
		if(_scrollExceed === true && mainScrollX_detail >= mainScrollX_min &&
		mainScrollX_detail <= mainScrollX_max){ mainScrollX_detail = null } ;
		if(_scrollExceed === true && mainScrollY_detail >= mainScrollY_min && 
		mainScrollY_detail <= mainScrollY_max){ mainScrollY_detail = null } ;
		
		// 设置容器位置，可能得手动回调，设置按钮禁用
		if(_native === false){ mainScrollSetting() };
		setButtonDisabled(true, true, false);
		event.preventDefault(); // 可能需要提前？
		
	};
	
	// ----------------------------------------
	
	// 为容器绑定 musedown 或 touchstart 的事件
	ele_wrap.addEventListener(eve_tapstart, function(event){
		
		// 如果鼠标不是左键或触摸有多个点则返回
		if(eve_touchable === false && event.which !== 1){ return undefined };
		if(eve_touchable === true && event.touches.length !== 1){ return documentTapend() };
		
		// 获取被点击的节点，并生成 jQuery 实例
		ele_target = event.target;
		jqi_target = $(ele_target);
		
		// 不去响应滚动条和边角按钮和 ungragged
		if(jqi_target.closest('.xjScroll-xbar,.xjScroll-ybar,' + 
		'.xjScroll-corner,.xjScroll-undragged').length > 0){ return };
		
		// 获取点击位置的 clientX 和 clientY 值
		clientX_start = clientX_new = eve_touchable ? event.touches[0].clientX : event.clientX ;
		clientY_start = clientY_new = eve_touchable ? event.touches[0].clientY : event.clientY ;
		
		// ------------------------------------
		
		// 如果点击到了浏览器原生滚动条则不响应
		if(ele_target.classList.contains('xjScroll')      === false 
		&& ele_target.classList.contains('xjScroll-main') === false 
		&& ele_target.classList.contains('xjScroll-body') === false 
		&& ele_target.classList.contains('xjScroll-wrap') === false 
		&& ele_target.classList.contains('xjScroll-pack') === false){
			
			// 获取目标节点的矩形对象和样式对象
			var targetDOMRect = ele_target.getBoundingClientRect();
			var targetCSSList = pub_win.getComputedStyle(ele_target);
			
			// 获取目标节点的四条 border 的尺寸
			var borderTopWidth = pub_int(targetCSSList.borderTopWidth);
			var borderLeftWidth = pub_int(targetCSSList.borderLeftWidth);
			var borderRightWidth = pub_int(targetCSSList.borderRightWidth);
			var borderBottomWidth = pub_int(targetCSSList.borderBottomWidth);
			
			// 获取目标节点的 client* & offset*
			var targetClientW = ele_target.clientWidth, targetClientH = ele_target.clientHeight;
			var targetOffsetW = ele_target.offsetWidth, targetOffsetH = ele_target.offsetHeight;
			
			// 计算点目标节点的两条滚动条的尺寸
			var scrollbarX = targetOffsetW - targetClientW - borderLeftWidth - borderRightWidth;
			var scrollbarY = targetOffsetH - targetClientH - borderTopWidth - borderBottomWidth;
			
			// 点到 webkit 空边角按钮则允许拖曳
			var isWebkitCorner = false;
			if(scrollbarX > 0 && scrollbarY > 0 
			&& targetCSSList.resize === 'none' && 
			(pub_chrome === true || pub_safari === true)){
				
				// 如果点到右下角的 corner 按钮
				if(targetCSSList.direction === 'ltr' 
				&& clientX_start >  targetDOMRect.left  + borderLeftWidth  + targetClientW 
				&& clientX_start <= targetDOMRect.left  + borderLeftWidth  + targetClientW + scrollbarX 
				&& clientY_start >  targetDOMRect.top   + borderTopWidth   + targetClientH 
				&& clientY_start <= targetDOMRect.top   + borderTopWidth   + targetClientH + scrollbarY){ isWebkitCorner = true };
				
				// 如果点到左下角的 corner 按钮
				if(targetCSSList.direction === 'rtl' 
				&& clientX_start <  targetDOMRect.right - borderRightWidth - targetClientW 
				&& clientX_start >= targetDOMRect.right - borderRightWidth - targetClientW - scrollbarX 
				&& clientY_start >  targetDOMRect.top   + borderTopWidth   + targetClientH 
				&& clientY_start <= targetDOMRect.top   + borderTopWidth   + targetClientH + scrollbarY){ isWebkitCorner = true };
				
			};
			
			// 如果点到的不是 webkit 空边角按钮
			if(isWebkitCorner === false){
				
				// X 轴滚动条被点击则不继续响应
				if(scrollbarY > 0){
				//  if(targetCSSList.direction === 'ttb' 
					if(clientY_start >  targetDOMRect.top    + borderTopWidth    + targetClientH 
					&& clientY_start <= targetDOMRect.top    + borderTopWidth    + targetClientH + scrollbarY){ return undefined };
				//  if(targetCSSList.direction === 'btt' 
				//  if(clientY_start >  targetDOMRect.bottom - borderBottomWidth - targetClientH 
				//  && clientY_start <= targetDOMRect.bottom - borderBottomWidth - targetClientH - scrollbarY){ return undefined };
				};
				
				// Y 轴滚动条被点击则不继续响应
				if(scrollbarX > 0){
					if(targetCSSList.direction === 'ltr' 
					&& clientX_start >  targetDOMRect.left   + borderLeftWidth  + targetClientW 
					&& clientX_start <= targetDOMRect.left   + borderLeftWidth  + targetClientW + scrollbarX){ return undefined };
					if(targetCSSList.direction === 'rtl' 
					&& clientX_start <  targetDOMRect.right  - borderRightWidth - targetClientW 
					&& clientX_start >= targetDOMRect.right  - borderRightWidth - targetClientW - scrollbarX){ return undefined };
				};
				
			};
			
		};
		
		// ------------------------------------
		
		// 节点和它所有父节点是否有允许拖曳类名
		isDraggable  = (jqi_target.closest('.xjScroll-draggable'  ).length > 0) ? true : false ;
		isDraggableX = (jqi_target.closest('.xjScroll-draggable-x').length > 0) ? true : false ;
		isDraggableY = (jqi_target.closest('.xjScroll-draggable-y').length > 0) ? true : false ;
		
		// mouse 不能拖曳可编辑节点，除非有类名
		isWritableTag = false;
		if(eve_touchable === false){
			
			// 判断被点击的元素是否为可编辑节点
			if(pub_isModifiable(ele_target) === true){ isWritableTag = true }
			else if(/^input$/i.test(ele_target.nodeName) || /^textarea$/i.test(ele_target.nodeName)){
				if(pub_isDisabled(jqi_target) === false && /^color$/i.test(ele_target.type) === true && pub_colorSupports === false){ isWritableTag = true };
				if(pub_isDisabled(jqi_target) === false && /^textarea|text|email|tel|url|number|search|password|date|time|week|month|datetime|datetime-local|range$/i.test(ele_target.type) === true){ isWritableTag = true };
			};
			
			// 可编辑节点又没允许拖曳类名则返回
			if(isWritableTag === true 
			&& isDraggable === false && isDraggableX === false && isDraggableY === false){ return };
			
		};
		
		// touch 不能拖曳有效 range，除非有类名
		isEnableRange = false;
		if(eve_touchable === true){
			
			// 判断被点击的元素是否为有效 range
			if(/^input$/i.test(ele_target.nodeName) === true 
			&& /^range$/i.test(ele_target.type) === true 
			&& pub_isDisabled(jqi_target) === false)
			{ isEnableRange = true };
			
			if(isEnableRange === true 
			&& isDraggable === false && isDraggableX === false && isDraggableY === false){ return };
			
		};
		
		// ------------------------------------
		
		// 初始化被拖曳的方向，初始化滚动的方向
		scrollPositionX = scrollPositionY = '', dragDirectionX = dragDirectionY = '' ;
		
		// 检查原生滚动和拖曳阈值和已滚动到结尾
		checkNativeScrollable = checkDraggedThreshold = checkAlreadyScrollEnd = false;
		
		// 获取这一刻的时间戳，添加全局拖曳类名
		tapstartTime = Date.now(); eve_draggingClass(true, jqi_pack);
		
		// 主容器滚动的具体值，可以包含小数的值
		mainScrollY_detail = mainScrollX_detail = null;
		
		// 能执行到这里就改变状态允许 move 移动
		returnObject._dragScrollable = true;
		
		// 阻止拖曳默认的行为，阻止所有滚动动画
		if(eve_touchable === true && _startPrevent === true){ event.preventDefault() }; 
		[ele_move,ele_xbar_thumb,ele_ybar_thumb].forEach(function(e){ ani_stop(e) });
		
		// 在全局上绑定的 tapmove & tapend 事件
		pub_doc.addEventListener(eve_tapmove, documentTapmove, eve_defaultFalse());
		pub_doc.addEventListener(eve_tapend, documentTapend, eve_defaultFalse());
		
	}, eve_defaultFalse());
	
})();



// 键盘操作，跟按钮事件很类似，因为也存在按住键盘而连续滚动的情况，只是事件换成 keydown 和 keyup
// 同时按多个键则以最后一个为准，按住 shift 会让轴向相反，但无法配合空格键，因为会变成全半角切换
// _kbdControl() 方法还承担改变 _kbdScrollable 属性的功能，如果传入的是 Boolean 值，就是改变属性
// 32 = ' ', 33 = PageUp, 34 = PageDown, 35 = End, 36 = Home, 37 = ←, 38 = ↑, 39 = →, 40 = ↓
(function(){
	
	// 键盘事件只能绑在全局，所以提供方法给全局
	// 通过动画回调，按住后第二次动画滚动到边缘
	// kbdScrollable 为 true，kbdControl 才执行
	// 所以 kbdControl 中无需判断 kbdScrollable
	returnObject._kbdControl = function(event){
		
		// ------------------------------------
		
		// 传入布尔值是设置 _kbdScrollable 状态
		// 同时间只能有一个实例能是 true 的状态
		if(typeof(event) === 'boolean'){
			Object.keys(pub_returnObject).forEach(function(id){ pub_returnObject[id]._kbdScrollable = false });
			if(event === true){ returnObject._kbdScrollable = true };
			return;
		};
		
		// 如果是 native 模式则无需处理键盘事件
		// 重复触发或按住按钮则阻止默认事件返回
		if(_native === true){ return }else 
		if(isKeysetPressdown === true || isKeysetContinued === true || 
		isButtonMousedown === true || isButtonContinued === true){ return void(event.preventDefault()) };
		
		// ------------------------------------
		
		// 绑定全局单次事件，按键抬起时结束动画
		pub_jqi_doc.one('keyup', function(){
			
			// 正在按住滚动中且允许溢出则得回归
			if(isKeysetContinued === true 
			&& _scrollExceed === true){
				switch(scrollAxis){
					case 'x' : {
						mainScrollX = getMainScrollX();
						if(mainScrollX < 0 || mainScrollX > mainScrollX_max){ 
						mainScrollAnimate({scrollX:mainScrollX, duration:0, }) };
					}; break;
					case 'y' : {
						mainScrollY = getMainScrollY();
						if(mainScrollY < 0 || mainScrollY > mainScrollY_max){ 
						mainScrollAnimate({scrollY:mainScrollY, duration:0, }) };
					}; break;
				};
			};
			
			// 停止动画，改变状态，清掉按住超时
			if(isKeysetContinued === true && ani_isAnimating(ele_move) === true){ stopScroll() };
			isKeysetPressdown = false, isKeysetContinued = false;
			clearTimeout(keydownScrollTimeout);
			
		});
		
		// ------------------------------------
		
		// 初始化键盘滚动动画需要用到的相关变量
		animateParame = {};
		scrollPositionX = ''; scrollPositionY = '';
		isKeysetPressdown = true; isKeysetContinued = false; keydownScrollTimeout = void(0);
		
		// 获取 shiftKey 和 keyCode，绑定 keyup
		var shiftKey = event.shiftKey;
		var keyCode = String(event.keyCode);
		
		// 根据 keyCode & shiftKey 确定滚动轴向
		if(/^37|39$/.test(keyCode) === true){ scrollAxis = ((shiftKey === true) ? 'y' : 'x') }
		else if(/^38|40$/.test(keyCode) === true){ scrollAxis = ((shiftKey === true) ? 'x' : 'y') }else 
		if(/^32|33|34|35|36$/.test(keyCode) === true){ scrollAxis = (shiftKey ? (_axis==='y' ? 'x':'y'):_axis) };
		
		// 根据 keyCode & shiftKey 确定具体方向
		if(/^32|34|35|39|40$/.test(keyCode) === true){ if(scrollAxis === 'y'){ scrollPositionY = 'bottom' }else{ scrollPositionX = 'right' } }else 
		if(/^33|36|37|38$/.test(keyCode) === true){ if(scrollAxis === 'y'){ scrollPositionY = 'top' }else{ scrollPositionX = 'left' } };
		var keyDirection = ''; if(scrollAxis === 'x'){ keyDirection = scrollPositionX }else{ keyDirection = scrollPositionY };
		
		// 没有聚焦元素则改为获取 overNode 节点
		var ele_target = pub_doc.activeElement ;
		if(ele_target === null || ele_target === 
		pub_body){ ele_target = pub_keyTarget };
		
		// 如果目标节点在当前实例的 main 容器中
		if(ele_main.contains(ele_target) === true){
			
			// 遍历相关上层节点，含目标节点本身
			var jqi_target = $(ele_target), jqi_parent = jqi_target.parentsUntil('body'); jqi_parent[-1] = ele_target;
			for(var ele_scroll = null, index = -1, length = jqi_parent.length; 
			index < length; index++){
				
				// 节点在实例中且滚动则直接返回
				ele_scroll = jqi_parent[index];
				if(ele_main.contains(ele_scroll) === false){ break }
				else if(pub_isScrollableTo(ele_scroll, keyDirection) === true){ return };
				
			};
			
		};
		
		// 当前实例不支持键盘，把事件传到上一层
		if(_kbdScrollable === false){
			if(parentReturnObject !== null)
			{ parentReturnObject._kbdControl(true) };
			return;
		};
		
		// ------------------------------------
		
		// X 轴，计算目标和时间，并执行滚动动画
		if(scrollAxis === 'x'){
			
			// 如果正滚动中且目标已是边缘则返回
			if(_scrollExceed === false && ani_isAnimating(ele_move) === true 
				&& ((scrollPositionX === 'left' && mainScrollX_target === mainScrollX_min) 
				|| (scrollPositionX === 'right' && mainScrollX_target === mainScrollX_max))){ return }
			else if(_scrollExceed === true && ani_isAnimating(ele_move) === true 
				&& ((scrollPositionX === 'left' && mainScrollX_target === mainScrollX_min_out) 
				|| (scrollPositionX === 'right' && mainScrollX_target === mainScrollX_max_out))){ return };
			
			// 如果正在滚动则目标值是旧值再加减
			var scrollValue = pub_round( wrapClientW / 2 );
			mainScrollX_target_before = mainScrollX_target, mainScrollX = getMainScrollX();
			mainScrollX_target = ((ani_isAnimating(ele_move) === true) ? mainScrollX_target_before : mainScrollX);
			
			// 容器一半的距离，或者是直接到尽头
			if(keyCode === '35'){ mainScrollX_target = _scrollExceed ? mainScrollX_max_out : mainScrollX_max }else 
			if(keyCode === '36'){ mainScrollX_target = _scrollExceed ? mainScrollX_min_out : mainScrollX_min }else 
			if(scrollPositionX === 'left' ){ mainScrollX_target = mainScrollX - scrollValue }else
			if(scrollPositionX === 'right'){ mainScrollX_target = mainScrollX + scrollValue };
			
			// 允许溢出时，值不能超过溢出的边缘
			if(_scrollExceed === true && mainScrollX_target < mainScrollX_min_out){ mainScrollX_target = mainScrollX_min_out }else 
			if(_scrollExceed === true && mainScrollX_target > mainScrollX_max_out){ mainScrollX_target = mainScrollX_max_out };
			
			// 不能溢出时，值不能超过容器的边缘
			if(_scrollExceed === false && mainScrollX_target < mainScrollX_min){ mainScrollX_target = mainScrollX_min }else 
			if(_scrollExceed === false && mainScrollX_target > mainScrollX_max){ mainScrollX_target = mainScrollX_max };
			
			// 已在边缘了就不继续，判断是否溢出
			if((mainScrollX === mainScrollX_max && mainScrollX_target >= mainScrollX_max) || (mainScrollX === 0 && mainScrollX_target <= 0)){
				if(_overScrollable === false){ event.preventDefault() }else if(parentReturnObject 
				!== null){ parentReturnObject._kbdControl(event) };
				return;
			};
			
			// 计算滚动的距离，小距离使用小时间
			mainScrollX_dvalue = pub_abs(mainScrollX_target - mainScrollX);
			if(mainScrollX_dvalue < scrollValue && mainScrollX_target >= mainScrollX_min && 
			mainScrollX_target <= mainScrollX_max){ animateParame.duration = mainScrollX_dvalue / scrollValue * _duration };
			
			// 回调，按住键盘第二次动画滚到边缘
			animateParame.callback = function(){
				if(isKeysetPressdown === false){ return }
				else{ keydownScrollTimeout = setTimeout(function(){
					
					// 按键没放开就获取当前位置
					if(isKeysetPressdown === false){ return };
					mainScrollX = getMainScrollX(), isKeysetContinued = true;
					
					// 已到结尾，直接返回不继续
					if((scrollPositionX === 'left' && mainScrollX === mainScrollX_min)
					|| (scrollPositionX === 'right' && mainScrollX === mainScrollX_max)){ return };
					
					// 根据方向设置滚动边缘目标
					if(scrollPositionX === 'left'){ mainScrollX_target = _scrollExceed ? mainScrollX_min_out : mainScrollX_min }
					else if(scrollPositionX === 'right'){ mainScrollX_target = _scrollExceed ? mainScrollX_max_out : mainScrollX_max };
					
					// 动画的时间，和距离成正比
					mainScrollX_dvalue = pub_abs(mainScrollX_target - mainScrollX);
					mainScrollAnimate({duration : (mainScrollX_dvalue / scrollValue * _duration / 2)});
					
				}, 500) };
			};
			
			// 确认两侧按钮的禁用，执行滚动动画
			event.preventDefault();
			setButtonDisabled(false, true, true);
			mainScrollAnimate(animateParame);
			
		};
		
		// ------------------------------------
		
		// Y 轴，计算目标和时间，并执行滚动动画
		if(scrollAxis === 'y'){
			
			// 如果正滚动中且目标已是边缘则返回
			if(_scrollExceed === false && ani_isAnimating(ele_move) === true 
				&& ((scrollPositionY === 'top' && mainScrollY_target === mainScrollY_min) 
				|| (scrollPositionY === 'bottom' && mainScrollY_target === mainScrollY_max))){ return }
			else if(_scrollExceed === true && ani_isAnimating(ele_move) === true 
				&& ((scrollPositionY === 'top' && mainScrollY_target === mainScrollY_min_out) 
				|| (scrollPositionY === 'bottom' && mainScrollY_target === mainScrollY_max_out))){ return };
			
			// 如果正在滚动则目标值是旧值再加减
			var scrollValue = pub_round( wrapClientH / 2 );
			mainScrollY_target_before = mainScrollY_target, mainScrollY = getMainScrollY();
			mainScrollY_target = ((ani_isAnimating(ele_move) === true) ? mainScrollY_target_before : mainScrollY);
			
			// 容器一半的距离，或者是直接到尽头
			if(keyCode === '35'){ mainScrollY_target = _scrollExceed ? mainScrollY_max_out : mainScrollY_max }else 
			if(keyCode === '36'){ mainScrollY_target = _scrollExceed ? mainScrollY_min_out : mainScrollY_min }else 
			if(scrollPositionY === 'top'   ){ mainScrollY_target = mainScrollY - scrollValue }else
			if(scrollPositionY === 'bottom'){ mainScrollY_target = mainScrollY + scrollValue };
			
			// 允许溢出时，值不能超过溢出的边缘
			if(_scrollExceed === true && mainScrollY_target < mainScrollY_min_out){ mainScrollY_target = mainScrollY_min_out }else 
			if(_scrollExceed === true && mainScrollY_target > mainScrollY_max_out){ mainScrollY_target = mainScrollY_max_out };
			
			// 不能溢出时，值不能超过容器的边缘
			if(_scrollExceed === false && mainScrollY_target < mainScrollY_min){ mainScrollY_target = mainScrollY_min }else 
			if(_scrollExceed === false && mainScrollY_target > mainScrollY_max){ mainScrollY_target = mainScrollY_max };
			
			// 已在边缘了就不继续，判断是否溢出
			if((mainScrollY === mainScrollY_max && mainScrollY_target >= mainScrollY_max) || (mainScrollY === 0 && mainScrollY_target <= 0)){
				if(_overScrollable === false){ event.preventDefault() }else if(parentReturnObject 
				!== null){ parentReturnObject._kbdControl(event) };
				return;
			};
			
			// 计算滚动的距离，小距离使用小时间
			mainScrollY_dvalue = pub_abs(mainScrollY_target - mainScrollY);
			if(mainScrollY_dvalue < scrollValue && mainScrollY_target >= mainScrollY_min && 
			mainScrollY_target <= mainScrollY_max){ animateParame.duration = mainScrollY_dvalue / scrollValue * _duration };
			
			// 回调，按住键盘第二次动画滚到边缘
			animateParame.callback = function(){
				if(isKeysetPressdown === false){ return }
				else{ keydownScrollTimeout = setTimeout(function(){
					
					// 按键没放开就获取当前位置
					if(isKeysetPressdown === false){ return };
					mainScrollY = getMainScrollY(), isKeysetContinued = true;
					
					// 已到结尾，直接返回不继续
					if((scrollPositionY === 'top' && mainScrollY === mainScrollY_min)
					|| (scrollPositionY === 'bottom' && mainScrollY === mainScrollY_max)){ return };
					
					// 根据方向设置滚动边缘目标
					if(scrollPositionY === 'top'){ mainScrollY_target = _scrollExceed ? mainScrollY_min_out : mainScrollY_min }
					else if(scrollPositionY === 'bottom'){ mainScrollY_target = _scrollExceed ? mainScrollY_max_out : mainScrollY_max };
					
					// 动画的时间，和距离成正比
					mainScrollY_dvalue = pub_abs(mainScrollY_target - mainScrollY);
					mainScrollAnimate({duration : (mainScrollY_dvalue / scrollValue * _duration / 2)});
					
				}, 500) };
			};
			
			// 确认两侧按钮的禁用，执行滚动动画
			event.preventDefault();
			setButtonDisabled(false, true, true);
			mainScrollAnimate(animateParame);
			
		};
		
	};
	
})();


// Android 系统上，部分浏览器得点击后再滑动，才能保持 hover 状态，否则手指挪开了，滚动条就会变淡
// 所以操作时 .xjScroll-bars-show 类名总要添加的，不操作了再将类名移除，当然 :hover 还是继续保留
// 不能触屏就当作是鼠标，鼠标可以绑定 mouseenter & mouseleave 事件，鼠标进出时滚动条要显示或隐藏
// 但键盘操作和这两个事件没关系，除非是 focus 或 tap，否则键盘默认是操作全局的实例或者 body 节点
(function(){
	
	// 滚动条的隐藏，操作的是透明度，不是真隐藏
	var barsActiveTimeout = undefined;
	returnObject._barsActive = function(flag){
		
		clearTimeout(barsActiveTimeout);
		if(flag === true){ jqi_self.addClass(cla_bars_show) }
		else if(_barsShow === true){ jqi_self.removeClass(cla_bars_show) }
		else{ barsActiveTimeout = setTimeout(function(){ jqi_self.removeClass(cla_bars_show) }, _barsHide) };
		
	};
	
	// mouseenter 和 mouseleave，只用于鼠标操作
	if(eve_touchable === true){ return 0 };
	
	// 鼠标挪入，最近的实例显示滚动条并响应键盘
	jqi_self.on('mouseenter' + dot_id, function(event){ returnObject._barsActive(true) });
	
	// 鼠标从子实例移到父实例，父实例可响应键盘
	jqi_self.on('mouseleave' + dot_id, function(event){ returnObject._barsActive(false) });
	
})();



// 设置返回值对象上的剩余内容，前缀 _ 的是内部属性和方法，用于全局事件的调用，不是给开发者使用的
// maxScrollX() & maxScrollY() 方法之所以重新计算，是因为事件可能有延迟，直接用现成值会不准
returnObject = $.extend(returnObject, {
	
	// 是否允许滚轮|拖曳|键盘移动，全局允许键盘
	_wheelScrollable : true, 
	_dragScrollable : false, 
	_kbdScrollable : _replaceGlobal ? true : false,
	
	// 是否记住容器的滚动位置，是否响应 hash 值
	_keepPosition : _keepPosition,
	_onHashChange : _onHashChange,
	
	// 当前这个实例是否允许使用鼠标进行拖曳移动
	mouseDrag : _mouseDrag,
	
	// 可以手动调用容器的 resize 和 scroll 回调
	resize : mainResizeSetting,
	scroll : mainScrollSetting,
	
	// 获取或设置溢出滚动的变量和键盘滚动的变量
	overScrollable : function(flag){ return flag === void(0) ? _overScrollable : (_overScrollable = flag) },
	kbdScrollable : function(flag){ return flag === void(0) ? _kbdScrollable : (_kbdScrollable = flag) },
	
	// 获取实例内外宽高，既 wrap 和 body 的尺寸
	clientWidth : function(){ return wrapClientW }, clientHeight : function(){ return wrapClientH },
	scrollWidth : function(){ return bodyClientW }, scrollHeight : function(){ return bodyClientH },
	
	// 获取最大滚动距离，重新计算避免事件的延迟
	maxScrollX : function(){ return pub_round(ele_body.clientWidth  - ele_wrap.clientWidth ) },
	maxScrollY : function(){ return pub_round(ele_body.clientHeight - ele_wrap.clientHeight) },
	
	// 容器横向滚动位置，没传参是获取，否则设置
	scrollX : function(value){
		if(value === undefined){ return _native ? ele_wrap.scrollLeft : -pub_getTranslateX(ele_main) };
		if(_native === true){ ele_wrap.scrollLeft = value }else{ pub_setTranslateX(ele_main, -value) };
	},
	
	// 容器竖向滚动位置，没传参是获取，否则设置
	scrollY : function(value){
		if(value === undefined){ return _native ? ele_wrap.scrollTop  : -pub_getTranslateY(ele_main) };
		if(_native === true){ ele_wrap.scrollTop  = value }else{ pub_setTranslateY(ele_main, -value) };
	},
	
	// 滚动到目标，使用 $.fn.animate() 相同参数
	scrollTo : function(){
		
		// 解析参数，和 $.fn.animate() 方法相同
		var parame = {};
		Array.prototype.forEach
		.call(arguments, function(ele){
			if(typeof(ele) === 'object'){ parame.prop = ele }else 
			if(typeof(ele) === 'string'){ parame.easing = ele }else 
			if(typeof(ele) === 'number'){ parame.duration = ele }else 
			if(typeof(ele) === 'function'){ parame.callback = ele };
		});
		
		// 从 prop 提取 scrollLeft 和 scrollTop
		// if(parame.prop !== undefined && parame.prop.scrollLeft !== 
		// undefined){ parame.scrollLeft = parame.prop.scrollLeft };
		// if(parame.prop !== undefined && parame.prop.scrollTop !== 
		// undefined){ parame.scrollTop = parame.prop.scrollTop };
		if(parame.prop !== undefined && parame.prop.sxrollX !== 
		undefined){ parame.sxrollX = parame.prop.sxrollX };
		if(parame.prop !== undefined && parame.prop.scrollY !== 
		undefined){ parame.scrollY = parame.prop.scrollY };
		
		// 根据参数来确定滚动的轴向，并执行动画
		// if(parame.scrollLeft !== undefined && parame.scrollTop === undefined){ scrollAxis = 'x' }
		// else if(parame.scrollLeft === undefined){ scrollAxis = 'y' }
		if(parame.sxrollX !== undefined && parame.scrollY === undefined){ scrollAxis = 'x' }
		else if(parame.sxrollX === undefined){ scrollAxis = 'y' }
		else{ scrollAxis = 'xy' };
		mainScrollAnimate(parame);
		
	},
	
	// 类似 scrollIntoView() 滚动到目标所在位置
	scrollIn : function(){
		
		// 创建参数变量，如果没传参数则直接返回
		var option = null, parame = null;
		if(arguments.length === 0){ return };
		
		// 传入了纯对象就直接用，散装参数得解析
		if($.isPlainObject(arguments[0])){ option = arguments[0] }
		else{ option = pub_scrollIn_parseArguments(arguments, {}) };
		
		// 合并参数计算滚动，判断轴向，执行动画
		option = $.extend(new Object(), scrollInOption, option), parame = pub_scrollIn_getScrollValue(returnObject, option);
		// if(parame.scrollLeft !== undefined && parame.scrollTop === undefined){ scrollAxis = 'x' }
		// else if(parame.scrollLeft === undefined){ scrollAxis = 'y' }
		if(parame.translateX !== undefined && parame.translateY === undefined){ scrollAxis = 'x' }
		else if(parame.translateX === undefined){ scrollAxis = 'y' }
		else{ scrollAxis = 'xy' };
		mainScrollAnimate(parame);
		
	},
	
	// 不返回 false 就销毁，没传 false 移除节点
	destroy : function(removeElement){
		
		// 回调返回 false，则返回，否则清掉实例
		if(_destroyCallback(returnObject) === false){ return false };
		delete (pub_global.xj[pub_keyword].return[id]);
		
		// 不管有没有绑定，遍历并解绑全局的事件
		[pub_jqi_win, pub_jqi_doc, pub_jqi_html, pub_jqi_body, ]
		.forEach(function(node){ node.off(dot_id) });
		
		// 没传 true 就移除节点，否则只解绑事件
		if(removeElement !== false){ jqi_self.remove() }
		else{ jqi_self.add(jqi_that).off(dot_id) };
		
		// 如果是全局的实例，还得移除 HTML 类名
		if(_replaceGlobal === true){ pub_jqi_html
		.removeClass(cla_global_define) };
		
		// 删掉其他事件，包括聚焦失焦和链接点击
		// 相关事件太多，逐个删除很难，只能作罢
		// if(removeElement !== false){};
		// imitateEvent.off(id)◆
		
	},
	
});



// 通过 iframe 标签绑定 resize 事件，思路来源于 mresize 项目 : https://github.com/malihu/mresize
// 插件还提供了 debounce 和 throttle，可以自由设置事件响应的方式和频率，但也可以直接执行，更灵敏
var resizeTimeout = void (undefined);
var resizeHandler = mainResizeSetting;
if(_resizeCallbackType === 'debounce'){
	resizeHandler = function(){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function()
		{ mainResizeSetting() }, _resizeCallbackTime);
	};
}else 
if(_resizeCallbackType === 'throttle'){
	resizeHandler = function(){
		if(resizeTimeout !== undefined){ return };
		resizeTimeout = setTimeout(function(){
			resizeTimeout = undefined;
			mainResizeSetting();
		}, _resizeCallbackTime);
	};
};

mainResizeSetting();
[ele_size_scroll, ele_resize_client].forEach(
function(iframe){ iframe.contentWindow.addEventListener('resize', resizeHandler, false) });



// wrap 容器的 scrollLeft & scrollTop 变化，会引起 scroll 事件回调，所以统一监听 scroll 事来回调
// 实际上 focus 等操作，也可能引发 scroll 事件，所以不能靠手动来执行滚动回调，只能统一进行监听了
var scrollTimeout = void(undefined);
var scrollHandler = mainScrollSetting;
if(_scrollCallbackType === 'debounce'){
	scrollHandler = function(){
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(function()
		{ mainScrollSetting() }, _scrollCallbackTime);
	};
}else 
if(_scrollCallbackType === 'throttle'){
	scrollHandler = function(){
		if(scrollTimeout !== undefined){ return };
		scrollTimeout = setTimeout(function(){
			scrollTimeout = undefined;
			mainScrollSetting();
		}, _scrollCallbackTime);
	};
};

// 即使用 main 容器的 transform 样式来实现滚动动画，wrap 容器依然有可能会滚动，所以得监听 scroll
// 当 wrap 触发 scroll 事件，将滚动同步到 main 容器的 transform 样式上，再让 wrap 的滚动恢复为 0
// ele_wrap.addEventListener('scroll', scrollHandler, false);
var lastmainScrollX = ele_wrap.scrollLeft;
var lastmainScrollY = ele_wrap.scrollTop;
var wrapScrollListener = pub_nothing;
if(_native === true){
	wrapScrollListener = function(){
		mainScrollX = pub_round(ele_wrap.scrollLeft);
		mainScrollY = pub_round(ele_wrap.scrollTop);
		scrollHandler();
		barsResizeSetting();
		setButtonDisabled(true, true, false);
	};
}else{
	wrapScrollListener = function(event){
		var x = ele_wrap.scrollLeft, y = ele_wrap.scrollTop;
		if(lastmainScrollX === x && lastmainScrollY === y){ return };
		ele_wrap.scrollLeft = 0, ele_wrap.scrollTop = 0;
		lastmainScrollX = x, lastmainScrollY = y;
		pub_setTranslateX(ele_main, -x);
		pub_setTranslateY(ele_main, -y);
		scrollHandler();
	};
};
wrapScrollListener();
ele_wrap.addEventListener('scroll', wrapScrollListener, false);



// 实例的自我检测和销毁，如果 _autoDestroyTime 不为 -1，就设置轮询，如果目标节点已经不在页面中了
// 就尝试执行 returnObject.destroy()，如果函数不是返回 false，就正式销毁实例，清掉节点和相关事件
var destroyInterval = undefined;
if(_autoDestroyTime !== -1){
	destroyInterval = setInterval(function(){
		if(pub_body.contains(ele_self) === true){ return 'still exist' };
		if(returnObject.destroy() === false){ return };
		clearInterval(destroyInterval);
	}, _autoDestroyTime);
};



// 在 resie 事件和 scroll 事件绑定后，进行 webStorage 和 hash 的滚动定位，两种定位的顺序不能互换
// _operateAfter 回调如果有设置就在这里执行，然后将返回值对象挂在全局 xj.Scroll 对象上，最后返回
if(_keepPosition !== ''){ pub_keepPosition(returnObject, 'get') };
if((_locateByHash === 'auto' && pub_autoExec === true) || _locateByHash === true){ pub_locateByHash(returnObject) };

// 得在这里设置两个 target，否则在定位后再触发 wheel 滚动，就会出现回归到 0 的情况
mainScrollX_target = getMainScrollX();
mainScrollY_target = getMainScrollY();

if(_operateAfter !== pub_nothing){ _operateAfter(returnObject) };
pub_returnObject[id] = returnObject;
return returnObject;



}; // 主体函数结束



// 该 $ 方法用于同时实例化页面上所有目标节点，但排除那些已被实例化过的，返回返回值对象组成的数组
// 这段代码经常被复用，修改插件关键词即可，有时参数需要深层合并，$.extend() 首参数得加 true 才行
$.xjScroll = function(option){
	
	// 合并传入参数
	if(option === undefined){ option = {} };
	option = $.extend({}, pub_option, option);
	
	// 循环实例
	var result = [];
	$(pub_config.selector).not('[xjScrollId]')
	.each(function(){ result.push( $(this).xjScroll(option) ) });
	
	// 返回
	return result;
	
};



// 插件加载后自动进行实例化，前提是 script 上没设置 manual 属性，config 的 autoCreate 不为 false
// 最好是用 ready，否则提前引入插件就会导致自动化无效，至于说获取返回值，那也得在 ready 之后才行
(function(){
	
	function automatic(){ pub_autoExec = true; $.xjScroll(); pub_autoExec = false; };
	var manually = $('script[src*="xjScroll"]').attr('xjScroll-manual');
	
	if(manually !== undefined){ pub_config.autoCreate = false };
	if(pub_config.autoCreate === false){ return };
	
	switch(pub_config.dispatchTime){
		case 'ready' : (($.isReady === true) ? automatic() : $(function(){ automatic() })); break;
		case 'load' : pub_jqi_win.one('load', automatic); break;
		case 'now' : automatic(); break;
	};
	
})();



})); // 插件结束


