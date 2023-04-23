/** xjDir(侧边目录列表) | V0.2.0 | Apache Licence 2.0 | 2018-2021 © XJ.Chen | https://github.com/xjZone/xjDir */
;(function(global, factory){
	if(typeof(define) === 'function' && (define.amd !== undefined || define.cmd !== undefined)){ define(function(require){ factory(require('jquery')) }) }else 
	if(typeof(module) !== 'undefined' && typeof(exports) === 'object'){ module.exports = factory(require('jquery')) }
	else{ if(!Boolean(global)){ global = self }; factory(global.jQuery); };
}(this, function($){ 'use strict';



// MediaQueryList Event V0.1.0
// 因为 IE11- 不支持常规的事件方法，只能判断后处理，不知道事件是冒泡还是捕获的情况，只能放空忽略
var mediaQueryOnchange=function(a,b){void 0===a.addEventListener?a.addListener(b):a.addEventListener("change",b)},mediaQueryOffchange=function(a,b){void 0===a.removeEventListener?a.removeListener(b):a.removeEventListener("change",b)};

// Auto Load base plugins V0.1.0
// 每次都考虑没基础插件的情况就很麻烦，干脆用 CDN 自动引入，CSS 文件还能省去很多没插件的兼容代码
[{name:xj.focus,js:"https://cdn.jsdelivr.net/gh/xjZone/xj.focus@0.3.0/dist/xj.focus.min.js",css:"https://cdn.jsdelivr.net/gh/xjZone/xj.focus@0.3.0/dist/xj.focus.min.css"},{name:xj.ripple,js:"https://cdn.jsdelivr.net/gh/xjZone/xj.ripple@0.3.0/dist/xj.ripple.min.js",css:"https://cdn.jsdelivr.net/gh/xjZone/xj.ripple@0.3.0/dist/xj.ripple.min.css"},{name:xj.operate,js:"https://cdn.jsdelivr.net/gh/xjZone/xj.operate@0.5.0/dist/xj.operate.min.js",css:""}].forEach(function(a){var b=null,c=null;void 0===a.name&&(""!==a.js&&(b=document.createElement("script"),b.setAttribute("async","async"),b.setAttribute("src",a.js),document.head.insertBefore(b,document.head.firstChild)),""!==a.css&&(c=document.createElement("link"),c.setAttribute("rel","stylesheet"),c.setAttribute("href",a.css),document.head.insertBefore(c,document.head.firstChild)))});



// ---------------------------------------------------------------------------------------------

// globalThis | window | self | global
var pub_global = (typeof(globalThis) !== 'undefined' ? globalThis : typeof(window) !== 'undefined' ? window : typeof(self) !== 'undefined' ? self : global);

// public nothing, version, keyword
var pub_nothing = function(){}, pub_version = '0.2.0', pub_keyword = 'Dir';

// public config, advance set
var pub_config = {
	selector : '.xjDir',				// 当 autoCreate 是 true 时，插件会在加载后将页面中符合该选择器，但尚未被实例化的节点进行自动实例化，默认是 '.xjDir'
	autoCreate : true,					// 是否要自动实例化，默认是 true，插件加载完毕后，会自动将页面中符合 selector 参数的节点进行实例化，如果不希望进行这样的操作，可以将该参数设置为 false
	dispatchTime : 'ready',				// 何时执行自动实例化，默认是 'ready' 既 DOMContentLoaded 后，还可以是 'load' 或 'now'，分别是 window 的 load 事件或插件加载后立即执行，用 'load' 得确保事件在触发前插件就已经加载完毕了
};

// public option(32 items)
var pub_option = {
	
	manual : false,						// 是否手动实例化，默认是 false，为 true 则插件自动实例化会跳过该实例，全局配置 autoCreate 为 false 则该参数不起作用
	
	size : 'md',						// 设置尺寸，默认是 'md'，备选项有 'lg' 和 'sm'，设置也会影响到宽度，但可对 .xjDir 设置内联 style 属性样式来固定宽度
	color : 'default',					// 设置颜色，默认是 'default'，备选项有 'black' 和 'white'，'default' 在 .xjBase-dark 容器中会被自动切换成深色调模式
	border : 'right',					// 设置边框，默认是 'right'，备选项有 'left' 和 'none'，侧边目录的背景和页面的背景过于相近时，边框可以起到分割的作用
	
	spreadDuration : 250,				// 伸缩列表的动画时长，默认是 250，单位 ms，实际上方向箭头的动画，也会受这个 spreadDuration 和下面 spreadEasing 控制
	spreadEasing : 'swing',				// 伸缩列表的动画缓动，默认是 'swing'，也可以是 'linear'，得引入 jQuery-easing 才能写入 'swing' 和 'linear' 以外的值
	
	activeSpread : true,				// 展开选中项所在列表，默认是 true，设置 xjDir-active 类名的选项就是被选中的列表项，该项所在的所有父级列表都会被展开
	singleSpread : false,				// 是否只能展开单列表，默认是 false，也就是可同时展开多个列表，如果设置为 true，则一个列表被展开，其他列表就会被关闭
	
	foldedMode : false,					// 进入折叠模式，默认是 'false'，视窗太小时可启用折叠模式节约空间，也可用返回值对象上的 folded(Boolean) 方法控制折叠
	foldedQuery : false,				// 启用折叠模式的媒体查询，默认是 false，也就是不启用，如设为 '(max-width: 1023px)' 既视窗宽度小于 1024px 时启用折叠
	foldedMasker : true,				// 进入折叠模式后，如果展开了侧边目录，是否要显示遮罩，默认是 true，点击遮罩会恢复为折叠模式，设为 false，就不显示了
	
	scrollActive : true,				// 如果侧边目录容器是可滚动的，且 xjDir-active 选项正处于可视范围之外，是否要将该选项滚动到可视范围之内，默认是 true
	scrollAlign : 'middle',				// 设置 xjDir-active 选项滚动的对齐方式，默认是 'middle' 既中间对齐，备选项有 'top' 和 'bottom' 既顶部对齐和底部对齐
	scrollMust : false,					// 设置 xjDir-active 选项是否必须要滚动，默认是 false，也就是已经在可视范围内就不滚动，类似 scrollIntoViewIfNeeded()
	scrollOffset : 0,					// 设置 xjDir-active 选项滚动的偏移数值，默认是 0(px)，设置为 10 就是滚动往下偏移 10px，为 -10 就是滚动往上偏移 10px
	
	createRipple : true,				// 为点击添加波纹效果，默认是 true，也可直接在 a 标签设置 xj-ripple 类名，或调用返回值对象的 reinit() 初始化添加波纹
	hoverUnfold : false,				// 进入折叠模式后，PC 端是否可用鼠标悬停来控制侧边目录的展开和折叠，默认是 false，那就只有点击和聚焦才会进行展开折叠
	keepScroll : true,					// 侧边目录进行折叠或展开时，是否分别记住滚动位置，在切换状态后进行滚动位置的复原，默认为 true，这样有利于保持连贯性
	
	classString : '',					// 设置插件实例化的节点元素的额外类名，默认是 ''(空字符串)，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	styleObject : null,					// 设置插件实例化的节点元素的额外样式，默认是 null，以对象的键值对形式编写属性，例如 {borderTop:'2px', color:'red',}
	
	maskerClass : '',					// 设置折叠模式下显示的遮罩的额外类名，默认是 ''(空字符串)，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	maskerStyle : null,					// 设置折叠模式下显示的遮罩的额外样式，默认是 null，以对象的键值对形式编写属性，例如 {borderTop:'2px', color:'red',}
	
	createBefore : pub_nothing,			// 进行实例化操作之前的回调，function(returnObject){}，returnObject 是当前实例的返回值对象
	createAfter : pub_nothing,			// 进行实例化操作之前的回调，function(returnObject){}，returnObject 是当前实例的返回值对象
	
	foldedCallback : pub_nothing,		// 侧边目录进入折叠模式回调，展开恢复成折叠也会触发，function(returnObject){}，returnObject 是当前实例的返回值对象
	unfoldCallback : pub_nothing,		// 侧边目录退出折叠模式回调，折叠后又展开了也会触发，function(returnObject){}，returnObject 是当前实例的返回值对象
	
	spreadCallback : pub_nothing,		// 菜单列表被打开之后的回调，function(returnObject, li){}，returnObject 参数是当前实例的返回值对象，li 是被打开的那个 ul 列表所在的父节点
	shrinkCallback : pub_nothing,		// 菜单列表被关闭之后的回调，function(returnObject, li){}，returnObject 参数是当前实例的返回值对象，li 是被关闭的那个 ul 列表所在的父节点
	
	anchorCallback : pub_nothing,		// 选项链接被点击之后的回调，function(returnObject, li){}，returnObject 是当前实例的返回值对象，li 是被点击的链接所在的节点，函数 return false 就可阻止链接的跳转
	loadedCallback : pub_nothing,		// 展开没 ul 的菜单时，会自动进行 loading 状态，此时就会触发这个回调，function(returnObject, li){}，在 loading 之后，可以调用返回值对象的 loading(false) 退出状态
	
	autoDestroyTime : 60000,			// 自动销毁实例的轮询时间，默认是 60000(ms)，也就是 1 分钟，插件检测到目标节点不在页面中了就销毁实例释放内存，也可用返回值对象的 destroy() 方法手动销毁，如果设为 -1，则不会进行自动销毁
	destroyCallback : pub_nothing,		// 销毁实例前执行的回调，function(returnObject){}，returnObject 是当前实例的返回值对象，函数 return false 将阻止销毁，也许你只是暂时把节点抽离页面，那么 return false 就可以阻止销毁操作
	
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

// 自动实例化的标记，实例化时候判断
var pub_autoExec = false;

// 判断浏览器是否支持 touch* 的事件
var pub_touchable = 'ontouchstart' in pub_win;

// IE11- 不支持 event.relatedTarget
var pub_isIE = (document.documentMode === undefined) ? false : true;

// 插件里将会用到的各种状态相关类名
var cla_prefix   = 'xjDir-';

var cla_divide   = cla_prefix + 'divide';

var cla_spread   = cla_prefix + 'spread';
var cla_active   = cla_prefix + 'active';

var cla_folded   = cla_prefix + 'folded';
var cla_unfold   = cla_prefix + 'unfold';

var cla_loading  = cla_prefix + 'loading';
var cla_disabled = cla_prefix + 'disabled';



// ---------------------------------------------------------------------------------------------

// 插件主体
$.fn.xjDir = function(option){



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
var id = Date.now() +'_'+ String(Math.random()).slice(2,12);
var dot_id = '.' + id; var num_id = '#' + id;
jqi_self.attr('xjDirId', id);

// 所在的 xjScroll 对象
var xjScrollId = jqi_self.parent('.xjScroll-main').closest('.xjScroll').attr('xjScrollId');
var xjScroll = (xjScrollId === undefined) ? null : pub_global.xj.Scroll.return[xjScrollId];

// 获取滚动条所在的容器
var jqi_wrap = (xjScroll === null ? jqi_self : xjScroll.wrap);
var ele_wrap = jqi_wrap.get(0);
	
// 获取容器顶层 ul 节点
var jqi_root = jqi_self.children('ul').first();
var ele_root = jqi_root.get(0);



// 简化实例参数避免冗余
var _manual = option.manual;

var _size = option.size, _color = option.color, _border = option.border;
var _spreadDuration = option.spreadDuration, _spreadEasing = option.spreadEasing;

var _activeSpread = option.activeSpread, _singleSpread = option.singleSpread;
var _foldedMode = option.foldedMode, _foldedQuery = option.foldedQuery, _foldedMasker = option.foldedMasker;

var _scrollActive = option.scrollActive, _scrollAlign = option.scrollAlign, _scrollMust = option.scrollMust, _scrollOffset = option.scrollOffset;
var _createRipple = option.createRipple, _hoverUnfold = option.hoverUnfold, _keepScroll = option.keepScroll;

var _classString = option.classString, _styleObject = option.styleObject;
var _maskerClass = option.maskerClass, _maskerStyle = option.maskerStyle;

var _createBefore = option.createBefore, _createAfter = option.createAfter;

var _foldedCallback = option.foldedCallback, _unfoldCallback = option.unfoldCallback;
var _spreadCallback = option.spreadCallback, _shrinkCallback = option.shrinkCallback;
var _anchorCallback = option.anchorCallback, _loadedCallback = option.loadedCallback;

var _autoDestroyTime = option.autoDestroyTime, _destroyCallback = option.destroyCallback;



// 根据参数进行初始设置
if(_size !== 'md'){ jqi_self.addClass(cla_prefix + _size) };
if(_color !== 'default'){ jqi_self.addClass(cla_prefix + _color) };
if(_border !== 'right'){ jqi_self.addClass(cla_prefix + 'border-'+ _border) };

// 设置目标的类名和样式
if(_classString !== ''){ jqi_self.addClass(_classString) };
if(_styleObject !== null){ jqi_self.css(_styleObject) };

// 关于遮罩的创建和设置
var jqi_masker = $('<div class="xjDir-masker"></div>');
if(_maskerStyle !== null){ jqi_masker.css(_maskerStyle) };
if(_maskerClass !== ''){ jqi_masker.addClass(_maskerClass) };

// 同步小箭头的动画时长
if(_spreadDuration !== 250){
	jqi_self.prepend(
		'<style>'+
			'.xjDir[xjDirId="'+ id +'"] .xjDir-sign::before,' +
			'.xjDir[xjDirId="'+ id +'"] .xjDir-sign::after{transition:transform '+ _spreadDuration +'ms;}'+
		'</style>'
	);
};



// 获取所有的 li 节点，但是但不包括 .xjDir-divide 分割线，在进行折叠的时候需要获得所有的 li 节点
// returnObject.spread() 和 returnObject.spreadAll() 方法，当 singleSpread 为 true 得收起其他 li
var getEveryList = function(){ return jqi_root.find('li').not('.xjDir-divide') };

// 设置层级之后添加遮罩，由于遮罩需要把其他的节点盖在下面，所以得设置一个足够大的 z-index 属性值
// 默认情况下 xjDir 的 z-index 是 4000，如果有 xjScroll 容器，那么 xjScroll 容器也得设置 z-index
var appendMasker = function(flag){
	
	// 创建层级和父容器变量，不需要遮罩直接返回
	var zIndex, parentScroll;
	if(!_foldedMasker){ return };
	
	// 获取主体容器层级，遮罩层级要比主体容器低 
	zIndex = jqi_self.css('zIndex');
	jqi_masker.css('zIndex', zIndex - 4);
	
	// 有 xjScroll 则同步与主体的层级，操作遮罩
	parentScroll = jqi_self.closest('.xjScroll').not('body');
	if(parentScroll.length !== 0){ parentScroll.css('zIndex', zIndex) };
	if(flag === true){ pub_jqi_body.append(jqi_masker) }else{ jqi_masker.remove() };
	
};



// 如果 keepScroll 参数为 true，那么就得记住折叠前后的滚动位置，在折叠前后重新定位到之前那个位置
// 这样有利于保持视觉的连贯性，便于用户进行定位和操作，而不是每次折叠时 scrollTop 都进行自动定位
var foldedScrollTop = 0;
var unfoldScrollTop = 0;

// 折叠后，聚焦展开，失焦关闭，jQuery 冒泡绑定 focus，子元素聚焦无法触发聚焦事件，只能用捕获绑定
// 菜单中的元素在失焦后，如果新聚焦的元素既不是 null，也不是菜单中的其他可聚焦元素，那就关闭菜单
var focusListener = function(event){ returnObject.unfold(true) };
var blurListener = function(event){
	
	// IE 得用 activeElement 代替 relatedTarget
	var relatedTarget = 
	(pub_isIE === false ? event.relatedTarget : pub_doc.activeElement);
	
	// 新的聚焦元素不为 null 且位于容器中才关闭
	if(relatedTarget !== null 
	&& event.currentTarget.contains(relatedTarget) === false){ returnObject.unfold(false) };
	
};



// 创建实例化之后要返回的对象，下面的属性和方法是所有 xj* 插件都会有的，所以在这里统一设置就行了
// self 是传入的节点而 that 是实例化生成的节点，大多数插件它们是相同的，但有时也会出现不同的情况
var returnObject = {
	id : id,
	version : pub_version,
	self : jqi_self, that : jqi_self,
};



// 该方法用于销毁实例，如果 destroyCallback() 函数没有返回 false 就销毁，传入 false 时不删除节点
// 如果节点被删除了，那么事件也一并会被移除掉，如果没有删除节点，那么事件就需要单独进行 off 解绑
returnObject.destroy = function(removeElement){
	
	// 回调返回 false，则返回，否则清掉实例
	if(_destroyCallback(returnObject) === false){ return false };
	delete (pub_global .xj[pub_keyword] .return[id]);
	
	// 不管有没有绑定，遍历并解绑全局的事件
	[pub_jqi_win, pub_jqi_doc, pub_jqi_html, pub_jqi_body, ]
	.forEach(function(node){ node.off(dot_id) });
	
	// 没传 true 就移除节点，否则只解绑事件
	if(removeElement !== false){ jqi_self.remove() }else{ 
	jqi_self.off(dot_id).find('li > ul').off(dot_id) };
	
	// 解绑在 .xjDir | .xjScroll 的聚焦失焦
	(xjScroll === null ? jqi_self : xjScroll.self).get(0).removeEventListener('focus', focusListener, true);
	(xjScroll === null ? jqi_self : xjScroll.self).get(0).removeEventListener('blur', blurListener, true);
	
	// 解绑媒体查询事件，并销毁媒体查询对象
	if(_foldedQuery !== false){ mediaQueryOffchange(mediaQueryList, mediaQueryListCallback) };
	if(mediaQueryList !== undefined){ mediaQueryList = undefined };
	
	// 删掉遮罩和查询，解绑 xjScroll 的事件
	if(xjScroll !== null){ xjScroll.self.off(dot_id) };
	appendMasker(false);
	
};



// 初始化 HTML 的结构，主要用于动态修改结构后对细节的设置，包括为 a 标签设置 .xj-ripple 实现波纹
// 禁止 ul 菜单的滚动，loading 得同时设置 disabled，loading 和 disabled 不能被聚焦，tabIndex = 1
returnObject.reinit = function(){
	
	// ul 不能滚动，scroll 不会传递只能单独绑定
	jqi_root.find('li > ul').each(function(){ $(this).off('scroll' + dot_id).on('scroll' + dot_id, function(){ this.scrollTop = 0 }) });
	
	// 在 a 标签上添加 xj-ripple 类名以生成波纹
	if(_createRipple === true){ jqi_root.find('li').children('a').addClass('xj-ripple') };
	
	// loading 选项同时也得是 disabled 禁用状态 
	jqi_root.find('li.xjDir-loading').addClass(cla_disabled);
	
	// loading 不能被聚焦，包括 sign 也不能聚焦
	jqi_root.find('li.xjDir-loading').children('a').each(function(){
		var ele_a = this, jqi_a = $(this), tabValue = jqi_a.attr('tabIndex');
		if(ele_a.hasAttribute('tabIndex') === true){ jqi_a.attr('xjDirIndex', tabValue) };
		jqi_a.attr('tabIndex', '-1');
	});
	
	// disabled 不能被聚焦，sign 用于伸缩则可以
	jqi_root.find('li.xjDir-disabled')
	.not('.xjDir-loading').children('a').each(function(index, value){
		var ele_a = value, jqi_a = $(value); if(jqi_a.children('.xjDir-sign').length > 0){ return };
		var tabValue = jqi_a.attr('tabIndex'); if(ele_a.hasAttribute('tabIndex') === true){ jqi_a.attr('xjDirIndex', tabValue) };
		jqi_a.attr('tabIndex', '-1');
	});
	
};



// 设置或者获取 spread 状态，动画结束后不能留着 display 属性，否则 folded 模式下菜单就无法隐藏了
// 展开时不能延迟高度设置和动画执行，这样会导致响应不够迅速，ul 展开后无法立即收起，继而导致跳动
returnObject.spread = function(node, flag){
	
	// 如果没传参数，就是获取当前所有展开的菜单
	if(arguments.length === 0){ 
	return jqi_root.find('.xjDir-spread') };
	
	// 纠正参数值，只有 node 就返回 node 的状态
	var jqi_li = $(node).closest('li');
	if(flag === undefined){ return jqi_li.hasClass(cla_spread) }
	else if(flag === 'toggle'){ flag = ((jqi_li.hasClass(cla_spread) === true) ? false : true) };
	
	// 停止 node 所在 ul 动画，添加 spread 类名
	var jqi_ul = jqi_li.children('ul');
	jqi_ul.stop(true).css('display', 'block');
	jqi_li[flag?'addClass':'removeClass'](cla_spread);
	
	// 执行收起的动画，在动画结束后清掉内联样式
	if(flag === false){
		return jqi_ul.animate({height : 0, }, _spreadDuration, _spreadEasing, function(){
			jqi_ul.css({display : '', height : ''});
			if(_shrinkCallback !== pub_nothing){ _shrinkCallback(returnObject, jqi_li) };
		});
	};
	
	// 如果父级菜单没有打开就先同时打开父级菜单
	var jqi_parent_ul = jqi_li.parent('ul');
	var jqi_parent_li = jqi_parent_ul.parent('li');
	if(jqi_parent_ul.css('display') === 'none'){ 
	return returnObject.spread(jqi_parent_li, true) };
	
	// 获取 ul 当前的高度和自然的高度，执行展开
	var currentHeight = jqi_ul.height();
	var naturalHeight = jqi_ul.css('height', 'auto').height();
	if(currentHeight === naturalHeight){ jqi_ul.css('height', 0) }else{ jqi_ul.css('height', currentHeight) };
	jqi_ul.animate({height:naturalHeight}, _spreadDuration, _spreadEasing, function(){
		jqi_ul.css({display : '', height : ''});
		if(_spreadCallback !== pub_nothing){ _spreadCallback(returnObject, jqi_li); };
	});
	
	// 如果是只允许单列表展开，则收起其他的列表
	var childrenList, parentsList, othersList;
	if(_singleSpread === false){ return };
	childrenList = jqi_li.find('li');
	parentsList = jqi_li.parentsUntil(jqi_root).filter('li');
	othersList = getEveryList().not(jqi_li).not(parentsList).not(childrenList);
	othersList.filter('.xjDir-spread').each(function(index, value){ returnObject.spread(value, false) });
	
};



// 设置或者获取 active 选项，设置时需要将父层节点一并选中，但是并不需要 spread，是否展开可以使用
// 返回值对象的 spread() 方法，获时会返回所有的 active，想得到最里层选项可以用 last() 或 get(-1)
returnObject.active = function(node, flag){
	
	// 没传参数就获取，可用 last() 获取最后一个
	if(arguments.length === 0){ 
	return jqi_root.find('.xjDir-active') };
	
	// 纠正参数值，只有 node 就返回 node 的状态
	var jqi_li = $(node).closest('li');
	if(flag === undefined){ return jqi_li.hasClass(cla_active) }
	else if(flag === 'toggle'){ flag = ((jqi_li.hasClass(cla_active) === true) ? false : true) };
	
	// 传入 false 就移除，父元素也得移除 active
	if(flag === false){
		jqi_li.parentsUntil(jqi_root).filter('li').removeClass(cla_active);
		jqi_li.removeClass(cla_active);
		return;
	};
	
	// 传入 true 则进行添加，同时移除其他选中项
	var parentsList = jqi_li.parentsUntil(jqi_root).filter('li');
	jqi_root.find('.xjDir-active').not(parentsList)
	.removeClass(cla_active);
	jqi_li.addClass(cla_active);
	parentsList.addClass(cla_active);
	
};



// 设置或者获取 loading 状态，进入 loading 得同时设置 disabled 禁用并设置 tabIndex="-1" 禁止索引
// 退出 loading 的时候，如果之前有 tabIndex 属性就进行恢复，否则删除 tabIndex 和 xjDirIndex 属性
returnObject.loading = function(node, flag){
	
	// 如果没传参数，就是获取当前所有加载的选项
	if(arguments.length === 0){ 
	return jqi_root.find('.xjDir-loading') };
	
	// 纠正参数值，只有 node 就返回 node 的状态
	var jqi_li = $(node).closest('li');
	if(flag === undefined){ return jqi_li.hasClass(cla_loading) }
	else if(flag === 'toggle'){ flag = ((jqi_li.hasClass(cla_loading) === true) ? false : true) };
	
	// 设置类名，获取所有的 a 标签设置 tabIndex
	if(flag === true){
		jqi_li.addClass(cla_loading +' '+ cla_disabled);
		return $.each(jqi_li.children('a'), function(index, value){
			var ele_a = value, jqi_a = $(value), tabValue = jqi_a.attr('tabIndex');
			if(ele_a.hasAttribute('tabIndex') === true){ ele_a.setAttribute('xjDirIndex', tabValue) };
			jqi_a.attr('tabIndex', '-1');
		});
	};
	
	// 去除类名，并且尝试恢复之前的 tabIndex 值
	jqi_li.removeClass(cla_loading +' '+ cla_disabled);
	return $.each(jqi_li.children('a'), function(index, value){
		var ele_a = value, jqi_a = $(value), tabValue = jqi_a.attr('xjDirIndex');
		if(tabValue === undefined){ jqi_a.removeAttr('tabIndex') }
		else{ jqi_a.attr('tabIndex', xjDirIndex) };
		jqi_a.removeAttr('xjDirIndex');
	});
	
};



// 设置或者获取 disabled 状态，需要设置 tabIndex="-1" 禁止索引，但 .xjDir-sign 所在的 a 无需设置
// 退出 disabled 的时候，如果之前有 tabIndex 属性就进行恢复，否则删除 tabIndex & xjDirIndex 属性
returnObject.disabled = function(node, flag){
	
	// 如果没传参数，就是获取当前所有加载的选项
	if(arguments.length === 0){ 
	return jqi_root.find('.xjDir-disabled') };
	
	// 纠正参数值，只有 node 就返回 node 的状态
	var jqi_li = $(node).closest('li');
	if(flag === undefined){ return jqi_li.hasClass(cla_disabled) }
	else if(flag === 'toggle'){ flag = ((jqi_li.hasClass(cla_disabled) === true) ? false : true) };
	
	// tabindex 属性对于有 sign 的 a 不需要设置
	if(flag === true){
		jqi_li.addClass(cla_disabled);
		return jqi_li.children('a').each(function(index, value){
			var ele_a = value, jqi_a = $(value), tabValue = jqi_a.attr('tabIndex');
			if(jqi_a.children('.xjDir-sign').length > 0){ return };
			if(ele_a.hasAttribute('tabIndex') === true){ 
			jqi_a.attr('xjDirIndex', tabValue) };
			jqi_a.attr('tabIndex', '-1');
		});
	};
	
	// 去除类名，并且尝试恢复之前的 tabIndex 值
	jqi_li.removeClass(cla_disabled);
	return jqi_li.children('a').each(function(index, value){
		var ele_a = value, jqi_a = $(value), tabValue = jqi_a.attr('xjDirIndex');
		if(tabValue === undefined){ jqi_a.removeAttr('tabIndex') }
		else{ jqi_a.attr('tabIndex', xjDirIndex) };
		jqi_a.removeAttr('xjDirIndex');
	});
	
};



// 展开全部菜单或收起全部菜单的快捷方法，遍历所有 li 节点，不能用 returnObject.spread() 方法实现
// 因为这个方法带有动画，会相互干扰到，并且展开还有 _singleSpread 参数干扰，无法实现全部列表展开
returnObject.spreadAll = function(flag){
	
	// 如果没传参数，就是看是否全部展开或关闭了
	if(arguments.length === 0){ return (jqi_root.find('li.xjDir-spread').length >= jqi_root.find('li > ul').length) ? true : false };
	
	// 创建内联样式的标签，用于去掉小箭头的动画
	var jqi_style = $('<style>.xjDir[xjDirId="'+ id +'"] .xjDir-sign::before, .xjDir[xjDirId="'+ id +'"] .xjDir-sign::after{transition:none;}</style>');
	
	// 遍历 li 节点后，根据参数操作 spread 类名
	jqi_self.append(jqi_style);
	getEveryList().each(function(){
		
		// 如果没 ul 则返回，否则先强制渲染一次
		var jqi_li = $(this), jqi_ul = jqi_li.children('ul');
		if(jqi_ul.length === 0){ return }else{ jqi_ul.get(0).clientHeight };
		
		// 根据参数判断，是要展开还是关闭或切换
		if(flag === false){ jqi_li.removeClass(cla_spread) }else 
		if(flag === true){ jqi_li.addClass(cla_spread) }
		else{ jqi_li.toggleClass(cla_spread) };
		
	});
	
	// 移除临时的内联样式标签，恢复小箭头的动画
	jqi_style.remove();
	
};



// 如果侧边目录容器是可滚动的，xjDir-active 选项正处于可视范围之外，就将该选项滚动到可视范围之内
// 函数可接受三个参数，scrollMust, scrollAlign, scrollOffset，顺序可随意调换，默认是选项的参数值
returnObject.scrollActive = function(must, align, offset){
	
	// 获取最后一个 active 选项，找不到直接返回
	var jqi_active = returnObject.active();
	var ele_active = jqi_active.last()[0];
	if(jqi_active.length <= 0){ return };
	
	// 如果容器是被折叠的，那就得获取第一个选项
	if(jqi_self.hasClass(cla_folded) === true && 
	jqi_self.hasClass(cla_unfold) === false){ 
	ele_active = jqi_active.first()[0] }
	
	// 容器没折叠还得检测所在 ul 是否已经展开了
	else{ jqi_active.each(function(){
	var jqi_li = $(this), jqi_ul = jqi_li.parent('ul');
	if(jqi_ul.css('display') !== 'none'){ ele_active = jqi_li.get(0) } }) };
	
	// 如果容器是不能滚动的，那么也是直接就返回
	if(xjScroll === null){ if(ele_self.clientHeight >= ele_root.scrollHeight){ return } }
	else if(xjScroll.maxScrollX() <= 0){ return };
	
	// 获取滚动条所在，xjDir 或者 xjScroll-wrap
	var jqi_scroll = (xjScroll === null ? jqi_self : xjScroll.wrap);
	var ele_scroll = jqi_scroll.get(0);
	
	// 修改参数会影响 arguments，只能是另外取值
	var scrollMust = _scrollMust;
	var scrollAlign = _scrollAlign;
	var scrollOffset = _scrollOffset;
	
	// 根据参数类型分析参数，就可以无视传入顺序
	Array.prototype.slice.apply(arguments).forEach(function(value){
		if(typeof(value) === 'boolean'){ scrollMust = value }else 
		if(typeof(value) === 'string'){ scrollAlign = value }else 
		if(typeof(value) === 'number'){ scrollOffset = value };
	});
	
	// 获取容器和选项各自的高度，高度包含内边距
	var scrollHeight = ele_scroll.clientHeight;
	var activeHeight = ele_active.clientHeight;
	
	// 获取容器和选项距离文档页面左上角高度距离
	var scrollRectTop = ele_scroll.getBoundingClientRect().top;
	var activeRectTop = ele_active.getBoundingClientRect().top;
	
	// 获取容器和选项顶部的差距值，以及滚动位置
	var distanceY = activeRectTop - scrollRectTop;
	var scrollTop = ele_scroll.scrollTop;
	var targetTop = undefined;
	
	// 范围内且不是必须滚动则返回，否则计算目标
	if(distanceY >= 0 && distanceY <= scrollHeight - activeHeight && 
	scrollMust === false){ return void('noNeeded') };
	targetTop = scrollTop + distanceY;
	
	// 对齐默认为 middle，但也能是 top | bottom
	if(scrollAlign === 'middle'){ targetTop = targetTop - scrollHeight/2 + activeHeight/2 }else 
	if(scrollAlign === 'bottom'){ targetTop = targetTop - scrollHeight + activeHeight };
	
	// 设置滚动的位置，手动触发事件避免渲染延迟
	ele_scroll.scrollTop = targetTop + scrollOffset;
	if(xjScroll !== null){ xjScroll.scroll() };
	
};



// 关于侧边目录的折叠操作，没传参数就是获取，折叠后展开也算是展开，聚焦 focus 展开就得用点击关闭
// 所以点击关闭总是要的，但是得为点击事件设置个特别的 nameSpace，否则移除会牵连到 a 标签的 click
returnObject.folded = function(flag){
	
	// 获取滚动条所在，xjDir 或者 xjScroll-wrap
	var jqi_wrap = (xjScroll === null ? jqi_self : xjScroll.wrap), ele_wrap = jqi_wrap.get(0);
	
	// 获取当前折叠的状态以及绑定事件的顶层容器
	var isFolded = jqi_self.hasClass(cla_folded), jqi_that = (xjScroll === null ? jqi_self : xjScroll.self);
	
	// 没传参数就是获取，如果是 'toggle' 就纠正
	if(arguments.length === 0){ return isFolded }else if(flag === 'toggle'){ flag = (isFolded === true ? false : true) };
	
	// 进入折叠状态，大前提是当前不再折叠状态中
	if(flag === true && isFolded === false){
		
		// 非移动端鼠标移入移出展开关闭侧边目录
		if(pub_touchable === false && _hoverUnfold === true){ [['mouseenter',true],['mouseleave',false]].forEach(function(e){ jqi_that.on(e[0] + dot_id, function(){ returnObject.unfold(e[1]) }) }) };
		
		// 侧边目录元素聚焦失焦展开关闭侧边目录
		jqi_that.get(0).addEventListener('focus', focusListener, true); jqi_that.get(0).addEventListener('blur', blurListener, true);
		
		// 当侧边目录被点击时也需要展开侧边目录
		jqi_self.on('click'+ dot_id +'folded', function(){ returnObject.unfold(true) });
		
		// 侧边目录以外的地方被点击收起侧边目录
		pub_jqi_doc.on('click' + dot_id, function(event){
			if(ele_self.contains(event.target) === true){ return }else 
			if(xjScroll && xjScroll.self[0].contains(event.target) === true){ return };
			returnObject.unfold(false);
		});
		
		// 保存未折叠时的滚动位置，进入折叠状态
		if(_keepScroll === true){ unfoldScrollTop = ele_wrap.scrollTop };
		jqi_self.removeClass(cla_unfold); jqi_self.addClass(cla_folded);
		
		// 设置折叠后的滚动位置，还有回调就执行
		if(_keepScroll === true){ ele_wrap.scrollTop = foldedScrollTop };
		if(_foldedCallback !== pub_nothing){ _foldedCallback(returnObject) };
		
	};
	
	// 退出折叠状态，大前提是当前处于折叠状态中
	if(flag === false && isFolded === true){
		
		// 解除非移动端鼠标移入移出菜单伸缩事件
		if(pub_touchable === false && _hoverUnfold === true){ jqi_that.off('mouseenter' + dot_id) };
		if(pub_touchable === false && _hoverUnfold === true){ jqi_that.off('mouseleave' + dot_id) };
		
		// 解除 self 聚焦和失焦时菜单的伸缩事件
		jqi_that.get(0).removeEventListener('focus', focusListener, true);
		jqi_that.get(0).removeEventListener('blur', blurListener, true);
		
		// 解除 self 和 document 的点击伸缩事件
		jqi_self.off('click'+ dot_id +'folded');
		pub_jqi_doc.off('click' + dot_id);
		
		// 保存折叠时的滚动位置，移除折叠的类名
		if(_keepScroll === true){ foldedScrollTop = ele_wrap.scrollTop };
		jqi_self.removeClass(cla_folded); jqi_self.removeClass(cla_unfold);
		
		// 设置展开后的滚动位置，还有回调就执行
		if(_keepScroll === true){ ele_wrap.scrollTop = unfoldScrollTop };
		if(_unfoldCallback !== pub_nothing){ _unfoldCallback(returnObject) };
		
	};
	
};



// 已经进入 folded 折叠状态，关于 unfold 展开的操作，传入 true 是展开菜单，传入 false 是关闭菜单
// true 展开的前提是菜单没处于 unfold 展开的状态，false 关闭的前提是菜单正处于 unfold 展开的状态
returnObject.unfold = function(flag){
	
	// 没传参数就是获取，如果是 'toggle' 就纠正
	if(flag === undefined){ return jqi_self.hasClass(cla_unfold) }
	else if(flag === 'toggle'){ flag = jqi_self.hasClass(cla_unfold) === true ? false : true };
	
	// 展开侧边目录，得是已经进入折叠但还未展开
	if(flag === true && jqi_self.hasClass(cla_folded) === true && jqi_self.hasClass(cla_unfold) === false){
		
		// 在展开侧边目录前后进行滚动位置的操作
		if(_keepScroll === true){ foldedScrollTop = ele_wrap.scrollTop };
		jqi_self.addClass(cla_unfold);
		if(_keepScroll === true){ ele_wrap.scrollTop = unfoldScrollTop };
		
		// 有回调就执行，并且将遮罩添加到页面中
		if(_unfoldCallback !== pub_nothing){ 
		_unfoldCallback(returnObject) };
		appendMasker(true);
		
	};
	
	// 收起侧边目录，得是已经进入折叠且已经展开
	if(flag === false && jqi_self.hasClass(cla_folded) === true && jqi_self.hasClass(cla_unfold) === true){
		
		// 在收起侧边目录前后进行滚动位置的操作
		if(_keepScroll === true){ unfoldScrollTop = ele_wrap.scrollTop };
		jqi_self.removeClass(cla_unfold);
		if(_keepScroll === true){ ele_wrap.scrollTop = foldedScrollTop };
		
		// 有回调就执行，并且将遮罩从页面中移除
		if(_foldedCallback !== pub_nothing){ 
		_foldedCallback(returnObject) };
		appendMasker(false);
		
	};
	
};



// 初始化前的回调和渲染
if(_createBefore !== pub_nothing){ 
_createBefore(returnObject) };
returnObject.reinit();



// 移除类名进入折叠模式
(function(){
	
	// 如果不需要自动进入 folded 折叠模式则返回
	if(_foldedMode === false){ return };
	
	// 移除结构上可能会存在的折叠类名，避免出错
	jqi_self.removeClass(cla_folded);
	jqi_self.removeClass(cla_unfold);
	
	// 使用返回值对象的 folded 方法进入折叠模式
	returnObject.folded(true);
	
})();



// 选中并展开 active 项
(function(){
	
	// 获取并将 active 选项的父级选项也一并选中
	var jqi_active = returnObject.active();
	if(jqi_active.length === 0){ return '0' };
	returnObject.active(jqi_active.last(), true);
	
	// 如果需要展开 active 选项所在的父列表选项
	if(_activeSpread === true){
		if(_singleSpread === true){ jqi_root.find('.xjDir-spread').removeClass(cla_spread) };
		jqi_active.last().parentsUntil(jqi_root).filter('li')
		.addClass(cla_spread);
	};
	
	// 如果需要定位，就滚动到 active 选项的位置
	if(_scrollActive === true){ 
	returnObject.scrollActive() };
	
})();



// 关于媒体响应自动折叠
var mediaQueryListCallback = pub_nothing;
var mediaQueryList = void('object');
if(_foldedQuery !== false){
	
	// 媒体响应的回调，解绑需要用到，得保存起来
	mediaQueryListCallback = function(event){
		
		// 查询匹配就进入折叠，但前提是尚未折叠
		if(event.matches === true){
			if(returnObject.folded() === true){ return };
			returnObject.folded(true);
			return;
		};
		
		// 查询不匹配就取消折叠，前提是已经折叠
		if(event.matches === false){ 
			if(returnObject.folded() === false){ return };
			returnObject.folded(false);
			return;
		};
		
	};
	
	// 创建媒体响应的对象，并且绑定 change 事件
	mediaQueryList = pub_win.matchMedia(_foldedQuery);
	mediaQueryOnchange(mediaQueryList, mediaQueryListCallback);
	
};



// 点击链接时的各种反映
jqi_self.on('click' + dot_id, 'a', function(event){
	
	// 获取当前 a 所在的 li 和相关的 ul 和 sign
	var jqi_a = $(this); var jqi_li = jqi_a.parent('li'); var jqi_ul = jqi_li.children('ul'); var jqi_sign = jqi_a.children('.xjDir-sign');
	
	// 被禁用时，如果不是 sign 所在 a，则不继续
	if(jqi_li.closest('.'+cla_disabled).length !== 0 && jqi_sign.length === 0){ return event.preventDefault() };
	
	// a 所在的 li 正处于 loading，也不再继续了
	if(jqi_li.hasClass(cla_loading) === true){ return event.preventDefault() };
	
	// a 中有 xjDir-sign 箭头，那就进行菜单伸展
	if(jqi_sign.length !== 0){
		
		// li 里面没有 ul，那就是得进入 loading
		if(jqi_ul.length === 0){
			if(_loadedCallback !== pub_nothing){
			_loadedCallback(returnObject, jqi_li)};
			return returnObject.loading(jqi_li, true);
		};
		
		// 用 spread 类名判断，是要展开还是关闭
		if(jqi_li.hasClass(cla_spread) === true){ returnObject.spread(jqi_li, false) }
		else{ returnObject.spread(jqi_li, true) };
		return;
		
	};
	
	// 不是 sign 就是超级链接，那就选中所在选项
	returnObject.active(jqi_li, true);
	var callbackReturn;
	
	// 有回调就执行，返回 false 了就阻止默认事件
	if(_anchorCallback !== pub_nothing){ callbackReturn = _anchorCallback(returnObject, jqi_li) };
	if(callbackReturn === false){ event.preventDefault() };
	
});



// 实例的自我检测和销毁
var destroyInterval = undefined;
if(_autoDestroyTime !== -1){
	destroyInterval = setInterval(function(){
		if(pub_body.contains(ele_self) === true){ return 'still exist' };
		if(returnObject.destroy() === false){ return };
		clearInterval(destroyInterval);
	}, _autoDestroyTime);
};



// 初始化完毕回调并返回
if(_createAfter !== pub_nothing){ _createAfter(returnObject) };
return pub_global.xj[pub_keyword].return[id] = returnObject;



}; // 主体函数结束



// 该 $ 方法用于同时实例化页面上所有目标节点，但排除那些已被实例化过的，返回返回值对象组成的数组
$.xjDir = function(option){
	
	// 合并传入参数
	if(option === undefined){ option = {} };
	option = $.extend({}, pub_option, option);
	
	// 循环实例
	var result = [];
	$(pub_config.selector).not('[xjDirId]')
	.each(function(){ result.push( $(this).xjDir(option) ) });
	
	// 返回
	return result;
	
};



// 还是得用 ready，否则提前引入插件就会导致自动化无效，至于说获取返回值，那也得在 ready 之后才行
(function(){
	
	function automatic(){ pub_autoExec = true; $.xjDir(); pub_autoExec = false; };
	var manually = $('script[src*="xjDir"]').attr('xjDir-manual');
	
	if(manually !== undefined){ pub_config.autoCreate = false };
	if(pub_config.autoCreate === false){ return };
	
	switch(pub_config.dispatchTime){
		case 'ready' : (($.isReady === true) ? automatic() : $(function(){ automatic() })); break;
		case 'load' : pub_jqi_win.one('load', automatic); break;
		case 'now' : automatic(); break;
	};
	
})();



})); // 插件结束


