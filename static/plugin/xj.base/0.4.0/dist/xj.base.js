/** xj.base(CSS 样式基础) | V0.4.0 | Apache Licence 2.0 | 2015-2021 © XJ.Chen | https://github.com/xjZone/xj.base/ */
;(function(global, factory){
	if(typeof(define) === 'function' && (define.amd !== undefined || define.cmd !== undefined)){ define(factory) }
	else if(typeof(module) !== 'undefined' && typeof(exports) === 'object'){ module.exports = factory() }
	else{ global = (global||self), global.xj||(global.xj = {}), global.xj.base = factory() };
}(this, function(){ 'use strict';



// Auto Load base plugins V0.1.2
// 每次都考虑没基础插件的情况就很麻烦，干脆用 CDN 自动引入，CSS 文件还能省去很多没插件的兼容代码
[{name:"focus",js:"https://cdn.jsdelivr.net/gh/xjZone/xj.focus@0.3.2/dist/xj.focus.min.js",css:"https://cdn.jsdelivr.net/gh/xjZone/xj.focus@0.3.2/dist/xj.focus.min.css"},{name:"ripple",js:"https://cdn.jsdelivr.net/gh/xjZone/xj.ripple@0.3.2/dist/xj.ripple.min.js",css:"https://cdn.jsdelivr.net/gh/xjZone/xj.ripple@0.3.2/dist/xj.ripple.min.css"},{name:"operate",js:"https://cdn.jsdelivr.net/gh/xjZone/xj.operate@0.5.0/dist/xj.operate.min.js",css:""}].forEach(function(a){var b=null,c=null,d=window.xj?window.xj:{};void 0===d[a.name]&&(""!==a.js&&(b=document.createElement("script"),b.setAttribute("async","async"),b.setAttribute("src",a.js),document.head.insertBefore(b,document.head.firstChild)),""!==a.css&&(c=document.createElement("link"),c.setAttribute("rel","stylesheet"),c.setAttribute("href",a.css),document.head.insertBefore(c,document.head.firstChild)))});



// ---------------------------------------------------------------------------------------------
// globalThis | window | self | global
var pub_global = (typeof(globalThis) !== 'undefined' ? globalThis : typeof(window) !== 'undefined' ? window : typeof(self) !== 'undefined' ? self : global);

// public nothing, version, keyword
var pub_nothing = function(){}, pub_version = '0.4.0', pub_keyword = 'base';

// public config, advance set
var pub_config = {
	
	setBodyTagMinHeight : true,				// 是否为 body 标签设置一个屏幕的最小高度，默认为 true，使用 JS 实现是最稳妥的，CSS 的各种写法都有兼容问题或 BUG
	setPCScrollbarColor : true,				// 是否定义 PC 端浏览器的滚动条的颜色，默认为 true，移动端的浏览器的滚动条默认不占位置且适应性较好，所以无需修改
	
	storageTheme : true,					// 进入页面后是否根据 Storage，应用之前使用的主题，默认为 true，但如果主题 name 找不到，则继续保持默认的白色主题
	defaultTheme : 'white',					// 默认主题，默认为 'white'，可用 themeOptions 参数其他 name 属性，当 storageTheme 为 true 则优先用 storageTheme
	
	syncSameOriginTheme : true,				// 当同源的其他页面的主题被改变时，当前页面的主题是否要跟着同步变化，默认为 true，但如果当前页没目标主题则会忽略
	changeThemeCallback : pub_nothing,		// 当主题被改变时，将会执行的回调函数，function(theme){} 函数中的 theme 参数，是 themeOptions 数组参数的元素对象
	
	// 主题列表，默认有 white 和 black 两种主题可以使用，你可以用全局中的 xj.base.changeTheme() 方法，传入下面这个参数的对象中的 name 属性，就可以改变主题了
	// 如果传入的参数是 'cycle'，将会按数组顺序切换到下一个主题，class 属性是将会被添加到 html 标签上的类名，如果新增主题，class 的格式为 'xj-base-youTheme'
	// prismId 是引入 Prism 主题的那个 link 标签的 id，如果页面中存在 Prism 项目，那么切换主题时也会同步切换 Prism 的主题，当然大前提是能找到目标 id 的 link
	// 当没有设置主题的时候，默认使用 'white' 主题，建议不要修改下面数组中初始的两个基础主题，如果有其他主题的需求，可以用数组中对象元素的格式，新增其他主题
	themeOptions : [
		{name : 'white', class : 'xj-base-white', prismId : 'prism-theme-white'}, 
		{name : 'black', class : 'xj-base-black', prismId : 'prism-theme-black'}, 
	],
	
};

// public option(00 items)
var pub_option = {};



// ---------------------------------------------------------------------------------------------
// 如果已经存在了就直接返回目标对象
if(pub_global.xj === undefined){ pub_global.xj = {} };
if(pub_global.xj.baseReturn === undefined){ pub_global.xj.baseReturn = {} };
if(pub_global.xj.baseReturn[pub_version] !== undefined){ return pub_global.xj.baseReturn[pub_version] };



// 创建并合并 config 和 option 参数
if(pub_global.xj.baseConfig === undefined){ pub_global.xj.baseConfig = {} };
if(pub_global.xj.baseOption === undefined){ pub_global.xj.baseOption = {} };
if(pub_global.xj.baseConfig[pub_version] !== undefined){ Object.keys(pub_global.xj.baseConfig[pub_version]).forEach(function(key){ pub_config[key] = pub_global.xj.baseConfig[pub_version][key] }) };
if(pub_global.xj.baseOption[pub_version] !== undefined){ Object.keys(pub_global.xj.baseOption[pub_version]).forEach(function(key){ pub_option[key] = pub_global.xj.baseOption[pub_version][key] }) };



// 创建页面最顶层四个全局节点的变量
var pub_win = pub_global;
var pub_doc = pub_win.document;
var pub_html = pub_doc.documentElement;
var pub_body = pub_doc.body;



// Storage 对象，Ready 轮询，第一次
var pub_ls = pub_win.localStorage !== undefined ? localStorage : null;
var pub_xs_ls = xj.storage ? xj.storage.localStorage : null;
var pub_intervalReady = void(undefined);
var pub_initializeTheme = true;



// 使用 localStorage 来获取相关数据
var pub_getItem = function(key){
	if(pub_xs_ls){ return pub_xs_ls.get(key) }
	else{ try{ return pub_ls.getItem(key) }catch(error){} };
};



// 使用 localStorage 去设置相关数据
var pub_setItem = function(key, value){
	if(pub_xs_ls){ pub_xs_ls.set(key, value) }
	else{ try{ pub_ls.setItem(key, value) }catch(error){} };
};



// 返回对象，theme 是当前的主题名称
var pub_return = {
	version : pub_version,
	setBodyTagMinHeight : pub_nothing,
	changeTheme : pub_nothing,
	theme : undefined,
};



// ---------------------------------------------------------------------------------------------
// 关于 link 的切换，根据参数切换 Prism 的 CSS 文件所在 link 标签，使用 alternate 关键词进行操控
// 由于 link 标签不一定存在，所以得进行 null 判断，低版本 Firefox 还得修改 disabled 属性才能生效
var changePrism = function(name){
	
	// 遍历 themeOptions 数组，获取对象元素操作
	pub_config.themeOptions.forEach(function(object){
		
		// prismId 得是字符串且不为空，获取目标
		if(typeof(object.prismId) !== 'string' || object.prismId === ''){ return };
		var linkNode = pub_doc.getElementById(object.prismId);
		if(linkNode === null){ return };
		
		// 是目标 link 就生效，否则让 link 无效
		linkNode.disabled = ((name === object.name) ? false : true);
		linkNode.setAttribute('rel', ((name === object.name) ? '' : 'alternate ') + 'stylesheet');
		
	});
	
};



// 判断 select 是否在有 multiple 属性或 size 不为 1 时也是单行显示，是则添加类名用于显示三角图标
// AndroidBlink 无法用 CSS Hack 检测出，只能是用 JS 判断，类名不含连词线是为了避免主题选择器出错
var checkSelect = function(){
	
	// 创建临时的 select 标签并且添加到 body 中
	var temporarySelect = pub_doc.createElement('select');
	pub_body.appendChild(temporarySelect);
	
	// 获取 select 高度，并且设置属性 size 为 4
	var selectScrollHeight = temporarySelect.scrollHeight;
	temporarySelect.setAttribute('size', '4');
	
	// 如果 size 属性并不影响高度就是单行的多选
	if(selectScrollHeight 
	=== temporarySelect.scrollHeight){
		pub_html.classList.add('xjBaseSingleLineSelect')};
	pub_body.removeChild(temporarySelect);
	
};



// 传入 cycle 作为 pub_return.changeTheme() 方法的参数，此时得根据 themeOptions 数组参数切换主题
// themeOptions 保底是有 white 和 black 两种主题，数组从左到右进行切换，到达最右侧则回归到左侧来
var cycleResult = function(){
	
	// 最后将要返回的 name 以及当前的索引值
	var name = '';
	var currentIndex = NaN;
	
	// 遍历 themeOptions 来获取当前主题索引
	pub_config.themeOptions.forEach(function(object, index
		){ if(pub_return.theme === object.name){ currentIndex = index } });
	
	// 没找到 name 则索引为 0，进入下个主题
	if(isNaN(currentIndex) === true){ currentIndex = 0 };
	currentIndex = currentIndex + 1;
	
	// 主题超出了则回归 0，使用索引获取名称
	if(currentIndex >= pub_config.themeOptions.length){ currentIndex = 0 };
	name = pub_config.themeOptions[currentIndex].name;
	
	// 如果 name 和当前 name 相同则再算一次
	if(pub_return.theme === name){
		currentIndex += 1;
		if(currentIndex >= pub_config.
		themeOptions.length){ currentIndex = 0 };
		name = pub_config.themeOptions[currentIndex].name;
	};
	
	// 返回最后算出的 name 值，作为目标主题
	return name;
	
};



// ---------------------------------------------------------------------------------------------
// 为 body 标签设置 minHeight 为一个屏幕的尺寸，虽然有纯 CSS 的写法能实现，但都有兼容或 BUG 问题
// 所以这个需求只能使用 JS 来实现了，获取 document.documentElement.clientHeight 属性作为最小尺寸
pub_return.setBodyTagMinHeight = function(){
	pub_body.style.minHeight = pub_html
	.clientHeight + 'px' };



// 关于 theme 的操作，传入主题字符串来改变主题，如果传入 'cycle'，则切换到 themeOptions 的下个值
// 如果传入 themeOptions 中没有的主题名称就忽略，除非是初始化设置，则 pub_return.theme = 'white'
pub_return.changeTheme = function(name){
	
	// 如果传入 cycle 则根据当前值获取下个 name
	if(name === 'cycle'){ name = cycleResult() };
	
	// 判断目标 name 是否有在 themeOptions 之中
	var nameWasExist = false;
	pub_config.themeOptions.forEach(function(
	object){ if(name === object.name){ nameWasExist = true } });
	
	// 找不到 name 就返回，首次得设置属性 theme
	if(nameWasExist === false){
		if(pub_initializeTheme === true){
			pub_initializeTheme = false;
			pub_return.theme = 'white';
		};
		return;
	};
	
	// 当 name 和当前状态相同就不继续，避免重复
	if(pub_return.theme === name){ return }
	else{ pub_initializeTheme = false;
	pub_return.theme = name; };
	
	// 修改 link，设置 Storage 和 html 的 class
	changePrism(name);
	pub_setItem('xj-base-theme', name);
	pub_config.themeOptions.forEach(function(object){
		if(name !== object.name){ pub_html.classList.remove(object.class) }
		else{
			if(name !== 'white'){ pub_html.classList.add(object.class) };
			if(pub_config.changeThemeCallback !== pub_nothing){ 
			pub_config.changeThemeCallback(object) };
		};
	});
	
};



// ---------------------------------------------------------------------------------------------
// 加载后根据参数和浏览器类型，判断是否要进行 scrollbar 滚动条的定义，不需要定义就添加限制的类名
// 这里跟多选但单行的 select 控件的判断一样，使用不含连词线 - 的类名，也是为了避免主题选择器出错
(function(){
	
	// 移动端滚动条不占位置且适应性好，无需定义
	if(pub_config.setPCScrollbarColor === false 
	|| /mobile/i.test(navigator.userAgent) === true)
	{ pub_html.classList.add('xjBaseVanillaScrollbar') };
	
})();



// 加载后根据参数和 localStorage 的记录设置主题，不能等到 Ready 才执行，提前设置才能避免页面闪屏
// 这里不需要 forEach() 循环检测主题 name 在 themeOptions 中是否存在，因为在 changTheme() 会检测
(function(){
	
	// 获取 localStorage 对象中保存的历史主题值
	var storageValue = pub_getItem('xj-base-theme');
	
	// 不用或没历史就用默认主题，否则用历史主题
	if(pub_config.storageTheme === false || 
	storageValue === null || storageValue === ''){
		pub_return.changeTheme(pub_config.defaultTheme);
	}else{ pub_return.changeTheme(storageValue) };
	
})();



// 如果使用了 xj.base 项目的页面之间需要同步明暗色调，那就绑定 Storage，用这事件来实现跨标签响应
// 如果页面存在 xj.storage，就使用 xj.storage 提供的 on 方法来进行绑定，否则才使用原生方法来处理
(function(){
	
	// 不用判断 name 了，changeTheme() 会判断的
	if(pub_config.syncSameOriginTheme === false){ return };
	var storageHandle = function(event){
		if(event.newValue === null || event.newValue === ''
		 || event.key !== 'xj-base-theme'){ return };
		pub_return.changeTheme(event.newValue);
	};
	
	// remove() 或 clearItem() 操作时不改变主题
	if(pub_xs_ls !== null){ 
	pub_xs_ls.on('xj-base-theme', storageHandle) }
	else{ pub_win.addEventListener('storage', storageHandle, false) };
	
})();



// ---------------------------------------------------------------------------------------------
// 需要 body 节点又不能用 DOMContentLoaded，因为可能该文件加载时已经触发过了，所以这里只能用轮询
// 确保 body 节点的获取，设置 body 的 minHeight，设置 Prism 的 link，检测 select 的 scrollHeight
pub_intervalReady = setInterval(function(){
	
	// 没找到 body 就不算 ready，那么就继续轮询
	if(pub_doc.body === null){ return }
	else{ pub_body = pub_doc.body };
	
	// 需要设置最小高度且不是 xjScroll 时才设置
	if(pub_config.setBodyTagMinHeight === true 
	&& pub_body.classList.contains('xjScroll') === false){
		pub_win.addEventListener('resize', function(){ 
		pub_return.setBodyTagMinHeight() }, true);
		pub_return.setBodyTagMinHeight();
	};
	
	// 清掉当前这个 interval 轮询，避免重复设置
	clearInterval(pub_intervalReady);
	
	// 为本该多行但却单行显示的 select 添加图标
	checkSelect();
	
}, 0);



// ---------------------------------------------------------------------------------------------
// 返回对象
return (pub_global.xj.baseReturn[pub_version] = pub_return);



})); // 插件结束


