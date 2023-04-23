/** xjArrive(页面滚动定位) | V0.3.2 | Apache Licence 2.0 | 2018-2022 © XJ.Chen | https://github.com/xjZone/xjArrive/ */
;(function(global, factory){
	if(typeof(define) === 'function' && (define.amd !== undefined || define.cmd !== undefined)){ define(function(require){ factory(require('jquery')) }) }else 
	if(typeof(module) !== 'undefined' && typeof(exports) === 'object'){ module.exports = factory(require('jquery')) }
	else{ if(!Boolean(global)){ global = self }; factory(global.jQuery); };
}(this, function($){ 'use strict';



// polyfill for document.scrollingElement
// https://github.com/mathiasbynens/document.scrollingElement v1.5.2 by @diegoperini & @mathias | MIT license
"scrollingElement" in document||function(){function a(a){return window.getComputedStyle?getComputedStyle(a,null):a.currentStyle}function b(a){return window.HTMLBodyElement?a instanceof HTMLBodyElement:/body/i.test(a.tagName)}function c(a){for(var c=a;c=c.nextSibling;)if(1==c.nodeType&&b(c))return c;return null}function f(a){return"none"!=a.display&&!("collapse"==a.visibility&&/^table-(.+-group|row|column)$/.test(a.display))}function g(b){var c=a(b),d=a(document.documentElement);return"visible"!=c.overflow&&"visible"!=d.overflow&&f(c)&&f(d)}var d,e=function(){var b,c,a=/^CSS1/.test(document.compatMode);return a?(void 0===d&&(b=document.createElement("iframe"),b.style.height="1px",(document.body||document.documentElement||document).appendChild(b),c=b.contentWindow.document,c.write('<!DOCTYPE html><div style="height:9999em">x</div>'),c.close(),d=c.documentElement.scrollHeight>c.body.scrollHeight,b.parentNode.removeChild(b)),d):!1},h=function(){var a,b;return e()?document.documentElement:(a=document.body,b=a&&!/body/i.test(a.tagName),a=b?c(a):a,a&&g(a)?null:a)};Object.defineProperty?Object.defineProperty(document,"scrollingElement",{get:h}):document.__defineGetter__?document.__defineGetter__("scrollingElement",h):(document.scrollingElement=h(),document.attachEvent&&document.attachEvent("onpropertychange",function(){"activeElement"==window.event.propertyName&&(document.scrollingElement=h())}))}();



// ---------------------------------------------------------------------------------------------
// globalThis | window | self | global
var pub_global = (typeof(globalThis) !== 'undefined' ? globalThis : typeof(window) !== 'undefined' ? window : typeof(self) !== 'undefined' ? self : global);

// public nothing, version, keyword
var pub_nothing = function(){}, pub_version = '0.4.0', pub_keyword = 'Button';

// public config, advance set
var pub_config = {};

// public option(07 items)
var pub_option = {
	
	container : $(document.scrollingElement),	// 滚动的容器，默认是 $(document.scrollingElement)，也就是全局容器，参数可以是 Element Node 元素节点，或者是 jQuery 的实例对象
	axis : 'y',									// 滚动的方向，默认是 'y'，也可以是 'x' 或 'xy' 或 'yx'(=== xy)，不区分大小写
	
	align : ['left', 'top'],					// 对齐的位置，默认是 ['left', 'top']，第一个元素代表 X 轴，可以是 'left' / 'center' / 'right'，第二个元素代表 Y 轴，可以是 'top' / 'middle' / 'bottom'，不区分大小写
	offset : [0, 0],							// 偏移的尺寸，默认是 [0, 0]，第一个元素代表 X 轴偏移，第二个元素代表 Y 轴偏移，正数往右下角偏移，负数往左上角偏移，必须是数值
	
	easing : 'swing',							// 动画的缓动，默认是 'swing'，必须要有引入 jQuery.easing 插件才能写入 'linear' 和 'swing' 以外的值
	duration : 250,								// 动画的速度，默认是 250，单位 ms，设置成 0 则没有动画，将会直接执行回调函数
	callback : pub_nothing,						// 动画的回调，存在着 self 参数，是滚动条所在的容器
	
};



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

// arguments 传入分析简约调用参数
var pub_parseParames = function(parames, results){
	Array.prototype.slice.call(parames)
	.forEach(function(el){
		
		if(el instanceof Element){ return results.container = $(el) }
		else if(el instanceof $){ return results.container = el };
		
		if(typeof(el) === 'number'){ return results.duration = el };
		if(typeof(el) === 'function'){ return results.callback = el };
		
		if(Array.isArray(el) === true){
			if(typeof(el[0]) === 'string'){ results.align = el }else 
			if(typeof(el[0]) === 'number'){ results.offset = el };
		}else 
		if(typeof(el) === 'string'){
			if(/^x|y|xy|yx$/i.test(el)){ results.axis = el }else 
			if(/swing|linear|ease/i.test(el)){ results.easing = el };
		};
		
	});
	return results;
};



// ---------------------------------------------------------------------------------------------
// 插件主体
$.fn.xjArrive = function(option){



// 为了方便调用，所以也允许逐个参数传入，不需要通过对象 key 判断属性，而是分析参数类型和值来确定
// 如果是对象参数就进行合并，如果是逐个参数，就进行解析，然后返回一个 object，再合并这些参数对象

// 容器为空需要重新定义
if(((pub_option.container instanceof $) === true && pub_option.container.length === 0) 
|| pub_option.container === null || pub_option.container === undefined){
pub_option.container = $(pub_doc.scrollingElement) };

// 参数解析以及参数合并
var optionObject, isOptionObject = false;
if($.isPlainObject(option) === true){ isOptionObject = true };
optionObject = $.extend({}, pub_option, ((isOptionObject === true) ? option : undefined));
if(isOptionObject === false && arguments.length !== 0){ optionObject = $.extend(optionObject, pub_parseParames(arguments, {})) };

// 确认全局标签避免遗漏
if(pub_html === null){ pub_html = pub_doc.documentElement, pub_jqi_html = $(pub_html) };
if(pub_body === null){ pub_body = pub_doc.body, pub_jqi_body = $(pub_body) };

// 简化实例参数避免冗余
var _container = optionObject.container;
var _axis = optionObject.axis;
var _align = optionObject.align;
var _offset = optionObject.offset;
var _easing = optionObject.easing;
var _duration = optionObject.duration;
var _callback = optionObject.callback;

// 目标不在容器中则退出
var jqi_self = this.eq(0), ele_self = this[0];
if((_container instanceof $) === false){ _container = $(_container) };
var jqi_that = _container.eq(0), ele_that = _container[0];
if(ele_that.contains(ele_self) === false){ _callback(jqi_self); return jqi_self; };

// 全局滚动和 IE10 判断
var isGlobalScroll = (ele_that === pub_doc.scrollingElement) ? true : false;
var isIE10 = (pub_doc.documentMode <= 10) ? true : false;

// 创建动画函数参数对象
var animateObject = {};



// 移动端的滚动条虽然是在 body 上，但大部分浏览器考虑到兼容，body 的 clientWidth 和 clientHeight
// 会和 html 保持一致，除了 WX(Android) 和 Safari(IOS)，所以在移动端对全局滚动，得改用 html 尺寸

// 获取容器不含隐藏宽高
var clientWidth = Math.round((ele_that === pub_body ? pub_html : ele_that).clientWidth);		// 容器宽度，不包括滚动部分，但包括 padding
var clientHeight = Math.round((ele_that === pub_body ? pub_html : ele_that).clientHeight);		// 容器高度，不包括滚动部分，但包括 padding

// 获取容器包含隐藏宽高
var scrollWidth = Math.round((ele_that === pub_body ? pub_html : ele_that).scrollWidth);		// 容器总宽，包括了被滚动隐藏的部分，以及 padding
var scrollHeight = Math.round((ele_that === pub_body ? pub_html : ele_that).scrollHeight);		// 容器总高，包括了被滚动隐藏的部分，以及 padding

// 获取容器左上边和滚动
var clientLeft = Math.round((ele_that === pub_body ? pub_html : ele_that).clientLeft);			// 容器左侧，包括左侧边框和左侧滚动条，目标得减去该值
var clientTop = Math.round((ele_that === pub_body ? pub_html : ele_that).clientTop);			// 容器顶部，包括顶部边框和顶部滚动条，目标得减去该值

// 获取容器滚动所在位置
var scrollLeft = Math.round(ele_that.scrollLeft);												// 容器的 X 轴滚动条，当前所在的位置
var scrollTop = Math.round(ele_that.scrollTop);													// 容器的 Y 轴滚动条，当前所在的位置

// 获取目标节点的宽高值
var selfWidth = Math.round(ele_self.offsetWidth);												// 目标宽度，类似 client* 但还包括 border 和 scrollbar
var selfHeight = Math.round(ele_self.offsetHeight);												// 目标高度，类似 client* 但还包括 border 和 scrollbar

// 计算可滚动的最大宽高
var maxLeft = scrollWidth - clientWidth;														// 容器最大可滚动的宽度，总宽度 - 可视范围宽度 = 滚动条最大可位移的值
var maxTop = scrollHeight - clientHeight;														// 容器最大可滚动的高度，总高度 - 可视范围高度 = 滚动条最大可位移的值



// body 有 margin 或 border，DOMRect 的 left 和 top 会受到影响，所以当 that 是 body，则改为 html
// IE10 的 html 标签的 DOMRect.left / DOMRect.top 总为 0，不会跟随滚动条变化，得加滚动距离来解决

// 获取节点矩形 DOMRect
var selfDOMRect = ele_self.getBoundingClientRect();
var thatDOMRect = (ele_that === pub_body ? pub_html : ele_that).getBoundingClientRect();

// 获取要滚动前往的位置
var targetLeft = selfDOMRect.left - thatDOMRect.left - clientLeft;
var targetTop = selfDOMRect.top - thatDOMRect.top - clientTop;

// 全局且 IE10 得加偏移
targetLeft += ((isGlobalScroll === true && isIE10 === true) ? pub_win.pageXOffset : 0);
targetTop += ((isGlobalScroll === true && isIE10 === true) ? pub_win.pageYOffset : 0);

// 局部滚动得加滚过的值
targetLeft += (isGlobalScroll === true ? 0 : scrollLeft);
targetTop += (isGlobalScroll === true ? 0 : scrollTop);

// 根据参数设置偏移的值
targetLeft += _offset[0];
targetTop += _offset[1];

// 根据定位微调水平位置
if(/center/i.test(_align[0])){ targetLeft = targetLeft + selfWidth/2 - clientWidth/2 }else 
if(/right/i.test(_align[0])){ targetLeft = targetLeft + selfWidth - clientWidth };

// 根据定位微调垂直位置
if(/middle/i.test(_align[1])){ targetTop = targetTop + selfHeight/2 - clientHeight/2 }else 
if(/bottom/i.test(_align[1])){ targetTop = targetTop + selfHeight - clientHeight };

// 超过边缘值等于边缘值
if(targetLeft < 0){ targetLeft = 0 }else if(targetLeft > maxLeft){ targetLeft = maxLeft };
if(targetTop < 0){ targetTop = 0 }else if(targetTop > maxTop){ targetTop = maxTop };

// 对结果取整避免有小数
targetLeft = Math.round(targetLeft);
targetTop = Math.round(targetTop);



// Firefox 可能存在小数，导致有时会出现数值不相等而执行动画，但动画差值又小于 1 而导致动画不明显
// 所以只能使用 parseInt() 进行取整后再判断，避免这种 250ms 毫无反映的延迟，然后再触发回调的情况

// 根据滚动轴向设置对象
if(/^xy|yx$/i.test(_axis)){
	if(clientWidth >= scrollWidth && clientHeight >= scrollHeight){ _duration = 0 }
	else if(targetLeft === scrollLeft && targetTop === scrollTop){ _duration = 0 }
	else{ animateObject = { scrollLeft : targetLeft, scrollTop : targetTop, } };
}else 
if(/^x$/i.test(_axis)){
	if(clientWidth >= scrollWidth || targetLeft === scrollLeft){ _duration = 0 }
	else{ animateObject = {scrollLeft:targetLeft} };
}else 
if(/^y$/i.test(_axis)){
	if(clientHeight >= scrollHeight || targetTop === scrollTop){ _duration = 0 }
	else{ animateObject = {scrollTop:targetTop} };
};

// 执行动画之后返回实例
jqi_that.stop(true).animate(animateObject, _duration, _easing, 
function(){ _callback(jqi_self) });
return jqi_self;



}; // 主体函数结束



})); // 插件结束


