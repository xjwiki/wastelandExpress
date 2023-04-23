/*! xjDemo(案例代码展示) | V0.1.0 | Apache Licence 2.0 | 2020-2022 © XJ.Chen | https://github.com/xjZone/xjDemo/ */
;(function(global, factory){
	if(typeof(define) === 'function' && (define.amd || define.cmd)){ define(function(require){ factory(require('jquery'), require('prism')) }) }
	else if(typeof(module) !== 'undefined' && typeof(exports) === 'object'){ module.exports = factory(require('jquery'), require('prism')) }
	else{ global = global || self, factory(global.jQuery, global.Prism) };
}(this, function($, Prism){ 'use strict';



// Prism 在 IE10 中缺少 Element.prototype.matches() 方法，所以会报错
// 该方法其实可以用 polyfill 补上 : https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if(!Element.prototype.matches){ Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector };



// Prism 高亮前的回调，以下插件会导致 hooks 函数被多次触发，得确保即使重复触发代码逻辑也不会出错
// autoloader, diffHighlight, downloadButton, fileHighlight, jsonpHighlight，尤其以后 2 个最麻烦
Prism.hooks.add('before-sanity-check', function(env){ pub_prismCallbackFirst(env) });
function pub_prismCallbackFirst(env){
	
	// console.log('◆----before-sanity-check');
	// console.log(env);
	// console.log('code', env.code);
	// console.log('element', env.element);
	// console.log('grammar', env.grammar);
	// console.log('language', env.language);
	// console.log('highlightedCode', env.highlightedCode);
	
	// 异步获取的首次回调，env.element 为 pre，不为 code 则直接返回
	var code = env.element;
	var pre = code.parentNode;
	if(pre === null 
	|| code.nodeName.toLowerCase() !== 'code' 
	|| pre.classList.contains('xjDemo-body-source-wrap') === false){ return };
	
	// 获取 code / pre 节点，找不到 option 就是已经响应过，那么返回
	var jqi_code = $(code);
	var jqi_wrap = jqi_code.parent('pre');
	var option = jqi_wrap.data('xjDemoElementOption');
	if(option === undefined){ return };
	
	// 获取 id 相关的属性参数
	var preId = option.preId;
	var codeId = option.codeId;
	var textareaId = option.otherDate.textareaId;
	
	// 设置 wrap 节点 id 属性
	if(preId === true && textareaId !== undefined){ pre.id = textareaId + '-pre' }
	else if(typeof(preId) === 'function'){ pre.id = preId(textareaId) }
	else if(typeof(preId) === 'string'){ pre.id = preId };
	
	// 设置 code 节点 id 属性
	if(codeId === true && textareaId !== undefined){ code.id = textareaId + '-code' }
	else if(typeof(codeId) === 'function'){ code.id = codeId(textareaId) }
	else if(typeof(codeId) === 'string'){ code.id = codeId };
	
	// 异步需要重设标题和内容
	if(option.otherDate.fileHighlight === true || option.otherDate.jsonpHighlight === true){
		
		// 如果需要标题，就重设标题文本
		if(option.title === true && env.language !== undefined){
			if(env.language === '404'){ env.language = 'Unknow' };
			jqi_wrap.closest('.xjDemo-pack').find('.xjDemo-head-title-text').text(env.language);
		};
		
		// 如果需要结果，就重新写入结果
		if(option.result === true && option.resultContent === true){
			if(env.code !== ''){ env.code = pub_trim(option, env.code) };
			jqi_wrap.closest('.xjDemo-body').find('.xjDemo-body-result-wrap-view').html(env.code);
		};
		
	};
	
};



// Prism 在高亮后的回调，一些插件会导致 hooks 函数被多次触发，得确保即使重复触发，代码也不会出错
Prism.hooks.add('complete', function(env){ pub_prismCallbackFinal(env) });
function pub_prismCallbackFinal(env){
	
	// console.log('◆----complete');
	// console.log(env);
	// console.log('code', env.code);
	// console.log('element', env.element);
	// console.log('grammar', env.grammar);
	// console.log('language', env.language);
	// console.log('highlightedCode', env.highlightedCode);
	
	// 异步获取的首次回调，env.element 为 pre，不为 code 则直接返回
	var code = env.element;
	var pre = code.parentNode;
	if(pre === null 
	|| code.nodeName.toLowerCase() !== 'code' 
	|| pre.classList.contains('xjDemo-body-source-wrap') === false){ return };
	
	// 获取 code / pre 节点，这个 hook 回调函数如果响应过就直接返回
	var jqi_code = $(code);
	var jqi_wrap = jqi_code.parent('pre');
	var option = jqi_wrap.data('xjDemoElementOption');
	if(option === undefined){ return };
	
	// 有工具栏就重构它的结构
	var jqi_body_source = jqi_wrap.closest('.xjDemo-body-source');
	var jqi_tool = jqi_wrap.siblings('.toolbar');
	if(jqi_tool.length !== 0){
		jqi_wrap.unwrap();
		jqi_body_source.addClass('code-toolbar');
		jqi_tool.attr({class : function(i, v){ return 'xjDemo-body-source-tool ' + v }})
		.children('.toolbar-item').each(function(){ var button = $(this).children('button'); if(button.length === 1 && button.text() === 'Copy'){ button.addClass('xj-ripple-disabled') }; });
	};
	
	// 设置类名，移除多余数据
	jqi_code.attr({class : function(index, value){ return value.trim().replace(/\s{2,}/g, ' ')}}).addClass('prism-highlighted');
	jqi_wrap.attr({class : function(index, value){ return value.trim().replace(/\s{2,}/g, ' ')}}).removeData('xjDemoElementOption');
	
};



// ---------------------------------------------------------------------------------------------
// globalThis | window | self | global
var pub_global = (typeof(globalThis) !== 'undefined' ? globalThis : typeof(window) !== 'undefined' ? window : typeof(self) !== 'undefined' ? self : global);

// public nothing, version, keyword
var pub_nothing = function(){}, pub_version = '0.1.0', pub_keyword = 'Demo';

// public config, advance set
var pub_config = {};

// public option(70 items)
var pub_option = {
	
	lang : 'html',								// 代码语言，默认是 'html'，因为实际上也只有 html 语言能在 html 页面中产生结果，css 和 js 可以分别包裹在 style 和 script 标签中高亮，如果你只需要代码而不需要运行结果，那改成别的也可以
	manual : false,								// 在默认情况下，插件加载后会自动将页面中的 .xjDemo 元素进行实例化，但你可以通过为 .xjDemo 元素添加 xjDemo="{manual:true}" 的属性来阻止自动实例化，这个参数在手动进行实例化时就没什么用
	selector : '.xjDemo',						// 插件加载后会将符合该选择器的元素节点进行自动实例化，默认值为 '.xjDemo'，该参数只在 xjDemo.js 文件被执行前设置才有效，可通过全局中的 xj.DemoConfig 进行设置，在手动实例化时就没什么用
	autoRemove : false, 						// 实例化之后是否自动将作为容器的 textarea 标签移除掉，默认是 false，设置为 true 则将移除，移除虽然会让页面更整洁，但移除后就无法通过 xjDemoId 属性来找到这个节点创建的实例返回值对象了
	dispatchTime : 'ready',						// 何时执行自动实例化，默认是 'ready' 既 DOMContentLoaded 事件触发后，还可以是 'load' 或 'now'，分别是 window.load 事件和插件加载后立即执行，用 'load' 就得确保事件触发前文件就加载完毕
	
	color : 'default',							// 主题颜色，默认是 'default'，备选项有 'white' 和 'black'，该插件如果配合 xjBase.css 项目使用，则通过 .xj-base-black 类名可自动进入深色模式
	packClass : '',								// 该参数用于实例化之后，设置实例最外层的容器 .xjDemo-pack 的额外类名，默认是空字符串，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	packStyle : null,							// 该参数用于实例化之后，设置实例最外层的容器 .xjDemo-pack 的额外样式，默认是 null，以对象的形式编写属性值，例如 {borderTop:'2px',color:'red',}
	
	head : true,								// head 模块是否生成，默认是 true，如果设置为 false 则不生成，不生成也就意味着标题和控制布局的按钮都没有了
	headShow : true,							// head 模块是否显示，默认是 true，如果设置为 false 则不显示，但是可以用返回值对象的 headShow() 方法来显示
	
	title : 'Demo',								// 标题文本，默认是 'Demo'，也可接受 HTML 文本，如果设为 true 将自动使用 lang 作为值
	titleWrap : false,							// 标题是否允许换行，默认是 flase，你也可以用返回值对象的 titleWrap() 方法来改变设置
	
	larger : false,								// head 模块中是否生成放大显示的按钮，默认是 false，设置为 true 则生成，即使没生成按钮，也还是可以用返回值对象的 larger() 方法来实现放大显示的效果
	escClose : true,							// 按下键盘左上角的 esc 按键是否能快速的退出放大显示，默认是 true，但这个快捷键也可能会跟你的 Demo 发生冲突，此时可将该参数设置为 false 来解决冲突
	
	layout : false,								// head 模块中是否生成改变布局的按钮，默认是 false，设置为 true 则生成，即使没生成按钮，也还是可以用返回值对象的 layout() 方法来实现水平布局的改变
	vertical : true,							// 是否为垂直方向布局，默认是 true，如果设置为 false，那就是横向布局，但布局随时都可以通过 head 中的 layout 按钮或返回值的 layout() 方法来进行改变
	
	result : true,								// result 模块是否生成，默认是 true，设置为 false 则不生成该模块，此时 head 模块中的 layout 按钮和 result 按钮自然也就没有了
	resultShow : true,							// result 模块是否显示，默认是 true，设置为 false 则不显示，可通过点击 result 按钮或执行返回值对象的 resultShow() 方法来显示
	resultContent : true,						// result 模块里的内容，默认是 true，也就是用 .xjDemo 元素的内容，你也可以自定义成其他内容，让 result 和 source 的内容不对应
	resultClass : '',							// result 模块额外的类名，默认是空字符串，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	resultStyle : null,							// result 模块额外的样式，默认是 null，以对象的形式编写属性值，例如 {borderTop:'2px',color:'red',}
	resultWrapClass : '',						// result-wrap 模块额外的类名，默认是空字符串，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	resultWrapStyle : null,						// result-wrap 模块额外的样式，默认是 null，以对象的形式编写属性值，例如 {borderTop:'2px',color:'red',}
	resultWrapViewClass : '',					// result-wrap-view 模块额外的类名，默认是空字符串，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	resultWrapViewStyle : null,					// result-wrap-view 模块额外的样式，默认是 null，以对象的形式编写属性值，例如 {borderTop:'2px',color:'red',}
	
	source : true,								// source 模块是否生成，默认是 true，设置为 false 则不生成该模块，此时 head 模块中的 layout 按钮和 source 按钮自然也就没有了
	sourceShow : true,							// source 模块是否显示，默认是 true，设置为 false 则不显示，可通过点击 source 按钮或执行返回值对象的 sourceShow() 方法来显示
	sourceContent : true,						// source 模块里的内容，默认是 true，也就是用 .xjDemo 元素的内容，你也可以自定义成其他内容，让 source 和 result 的内容不对应
	sourceClass : '',							// source 模块额外的类名，默认是空字符串，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	sourceStyle : null,							// source 模块额外的样式，默认是 null，以对象的形式编写属性值，例如 {borderTop:'2px',color:'red',}
	sourceWrapClass : '',						// source-wrap 模块额外的类名，默认是空字符串，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	sourceWrapStyle : null,						// source-wrap 模块额外的样式，默认是 null，以对象的形式编写属性值，例如 {borderTop:'2px',color:'red',}
	sourceWrapCodeClass : '',					// source-wrap-code 模块额外的类名，默认是空字符串，多个值可用空格隔开，例如 'col-success bg-warning rad4px'
	sourceWrapCodeStyle : null,					// source-wrap-code 模块额外的样式，默认是 null，以对象的形式编写属性值，例如 {borderTop:'2px',color:'red',}
	
	preId : true,								// pre 标签的 id 值，默认是 true，也就是用 textarea 标签的 id + '-pre'，为 false 则不进行重命名(这可能导致 id 重复)，也可以传入字符串或传入函数，函数参数为 textarea 的 id，然后以返回值为结果
	codeId : true,								// code 标签的 id 值，默认是 true，也就是用 textarea 标签的 id + '-pre-code'，为 false 则不进行设置(可能也并不需要)，也可以传入字符串或传入函数，函数参数为 textarea 的 id，然后以返回值为结果
	
	save : false,								// 是否生成下载文件的按钮，默认是 false，只有设置为 true，才会显示下载按钮，点击这个按钮时，插件会把 source 模块中的代码生成一个文件供用户下载，下载代码的需求并不常见，所以默认不显示这按钮
	file : 'demo.txt',							// 被下载的文件的名称，默认是 'demo.txt'，在移动端，大部分浏览器可能是出于安全方面的考量，会重新定义被下载的文件的名称，这是系统自行更改的，无法被控制，所以没法保证这个参数的设置一定能生效
	untsaveOnIOS : false,						// 在 Safari(IOS) 中隐藏下载按钮，默认是 false，也就是不隐藏，Safari(IOS) 无法下载文件，它总是会打开新页面展示文件内容，这是浏览器 BUG，参考：https://bugs.webkit.org/show_bug.cgi?id=167341
	saveCallback : pub_nothing,					// 保存文件的回调函数，这个函数有一个 text 参数，就是原本将要保存的内容，可以通过这个函数，修改需要保存的内容，例如说添加版权声明什么的，然后再 return 修改过的 text，就能控制被保存的内容了
	
	copy : true,								// 是否生成复制代码的按钮，默认是 true，为 false 则不生成复制按钮，用 Prism 的 Copy To Clipboard 插件也能实现复制，但需要另外引入 Clipboard 插件，所以 xjDemo 用自己的逻辑实现了复制的功能
	copyCallback : pub_nothing,					// 复制代码的回调函数，这个函数有一个 text 参数，就是需要复制的内容，你可以通过这个函数，修改需要复制的内容，例如说添加版权声明什么的，然后再 return 修改过的 text，就能控制被复制的内容了
	
	onlySource : false,							// 该参数相当于 {head:false, result:false}，默认是 false，设置为 true 则 head 模块与 result 模块都不显示，只显示 source 代码的部分，这就相当于使用 xjDemo，代替 Prism 实现布局，统一样式
	headBottom : false,							// 布局翻转，默认是 false，默认布局是 head 在上而 body 在下，如果该参数设置为 true，则 head 模块会被放在底部，和 body 模块的位置将会翻转，也可以用返回值对象的 headBottom() 方法进行设置
	bodyInvert : false,							// 布局颠倒，默认是 false，默认布局是 result 模块在上(或前)，source 模块在下(或后)，如果将这个参数设置为 true 则模块的顺序将会被颠倒过来，也可以用返回值对象的 bodyInvert() 方法进行设置
	
	insertBefore : pub_nothing,					// .xjDemo-pack 结构写入页面前执行的回调函数，函数有个 returnObject 参数，这是当前实例的返回值对象，我们可以通过这个参数获取到 self 或 that，分别代表实例化的目标和结果，然后要如何操作就是你的事了
	insertAfter : pub_nothing,					// .xjDemo-pack 结构写入页面后执行的回调函数，函数有个 returnObject 参数，这是当前实例的返回值对象，我们可以通过这个参数获取到 self 或 that，分别代表实例化的目标和结果，然后要如何操作就是你的事了
	insertAction : 'after',						// 实例生成后插入的位置，默认是 'after'，就是目标节点的后面，如果是 'before'，就是目标节点的前面，这里也可以是个函数，参数是当前实例的返回值对象 returnObject，可通过 self 和 that 属性自行决定位置
	
	autoDestroy : 60000,						// 自动销毁实例的轮询时间，默认是 60000(ms)，也就是 1 分钟，插件会定时轮询，检测目标节点不在页面中了就销毁实例释放内存，当然也可以用返回值对象的 destroy() 方法手动销毁，如果将该值设为 -1 则不会进行自动销毁
	destroyTarget : false,						// 自动销毁时，是否将实例化时用的 textarea 节点一并从页面中移除，默认是 false，因为 textarea 并非由插件生成，所以默认不进行这操作，使用返回值对象的 destroy() 方法手动进行销毁，如果传入 true，相当于一并销毁
	destroyCallback : pub_nothing,				// 移除实例前执行的回调，第一个参数 returnObject 就是当前实例的返回值对象，如果该参数最后返回 false，将会阻止销毁的执行，也许你只是暂时把节点抽离页面，将来还要再放回页面中，那么就可以借助这个函数来阻止销毁
	
	resultResize : true,						// 是否允许拖曳 result 模块右下角的按钮来改变 result 容器的尺寸，默认是 true，跟 Firefox 的 resize 按钮类似，双击按钮可以复原尺寸，设置为 false 则不生成该按钮
	sourceResize : true,						// 是否允许拖曳 source 模块右下角的按钮来改变 source 容器的尺寸，默认是 true，跟 Firefox 的 resize 按钮类似，双击按钮可以复原尺寸，设置为 false 则不生成该按钮
	divideResize : true,						// 是否允许拖曳 result 模块和 source 模块之间的那条边来改变尺寸，默认是 true，边框存在的前提是模块都存在，双击边框可以复原尺寸，设置为 false，则分割线无法拖曳
	resizeDetail : true,						// 当允许以上的拖曳来改变尺寸，那么在拖曳时是否显示目标容器的尺寸详情，也就是 width x height，默认是 true，如果设为 false 则详情节点不生成，拖曳时自然也不显示
	dispatchResize : false,						// 当布局发生任意变化，如拖曳模块右下角或分割线改变尺寸，是否自动执行一次 window 的 resize 事件，默认是 false，对一些对全局尺寸敏感的 demo 可将该参数设为 true
	
	trimAction : 'auto',						// 是否执行格式的裁剪操作，默认是 'auto'，也就是当没引入 Prism 的 Normalize Whitespace 插件时才执行裁剪操作，如果设置为 true 就是总会执行裁剪，如果设置为 false 就是总不执行
	trimStart : true,							// 是否去除源码中最前面多余的换行和空格(\s)，默认是 true，设置为 false 则不进行处理，当 trimAction 为 'auto' 且引入 Prism 的 Normalize Whitespace 插件时，该参数自动为 false
	trimEnd : true,								// 是否去除源码中最后面多余的换行和空格(\s)，默认是 true，设置为 false 则不进行处理，当 trimAction 为 'auto' 且引入 Prism 的 Normalize Whitespace 插件时，该参数自动为 false
	trimLeft : true,							// 是否去除源码每行前面多余的空格或者制表符，默认是 true，设置为 false 则不进行处理，当 trimAction 为 'auto' 且引入 Prism 的 Normalize Whitespace 插件时，该参数自动为 false
	trimRight : false,							// 是否去除源码每行后面多余的空格以及制表符，默认是 false，因为当整行的内容都是空格或制表符时，整行内容将会被全部都去掉，这可能并不是你的本意，其他选项设置参考参数 trimLeft
	space2tab : 0,								// 将每行前面缩进的空格转成制表符，默认是 0(不生效)，设为 4，就是 4 个空格换成 1 个制表符，当 trimAction 为 'auto' 且引入了 Prism 的 Normalize Whitespace 插件时，该参数为 0
	tab2space : 0,								// 将每行前面缩进的制表符转成空格，默认是 0(不生效)，设为 4，就是 1 个制表符转成 4 个空格，当 trimAction 为 'auto' 且引入了 Prism 的 Normalize Whitespace 插件时，该参数为 0
	
	encodeTarget : ['<', '>'],					// Prism 的高亮需要对 HTML 进行转码，这是需要进行转码的目标字符，默认是只将 '<' 和 '>' 转为 '&lt;' 和 '&gt;'，如果还有其他的符号需要转码，可以添加到数组值中，注意要和 encodeResult 参数对应
	encodeResult : ['&lt;', '&gt;'],			// Prism 的高亮需要对 HTML 进行转码，这是需要进行转码的结果字符，默认是只将 '<' 和 '>' 转为 '&lt;' 和 '&gt;'，如果还有其他的符号需要转码，可以添加到数组值中，注意要和 encodeTarget 参数对应
	
	prismAsync : false,							// Prism 是否用异步高亮，默认是 false，设为 true 将使用 WEB Woker 开启子线程实现高亮，但根据 Prism 官网的说法，异步会导致某些插件无效且难以调试，所以不建议设为 true，且 prism.js 文件还不能跨域，否则会报错
	prismCallback : pub_nothing,				// Prism 进行高亮后的回调，该参数会被当作 Prism.highlightElement() 方法的第三个参数，默认是空函数，也就是 function(){} 且没有任何参数，其实有回调可用 insertBefore 或 insertAfter 来代替，不是非得用这个参数 
	
	anchorTarget : '',							// 该参数是与 Prism 的 Autolinker 插件和 WebPlatform Docs 插件配合使用的，它们会在代码块中生成超级链接，但它们没有供 target 属性的控制参数，而这个参数就是用来设定 target 参数的，默认是 ''，可设为 '_black' / '_parent' 等
	keepMarkupTag : '【＝keepMarkup＝】',		// 该参数是与 Prism 的 Keep Markup 插件配合使用的，用来临时替换 mark 标签，防止 mark 标签的尖括号被转码，默认是 '【＝keepMarkup＝】'，除非内容和默认值有冲突，否则一般不用改的，如果没引入 Keep Markup 插件，可不理会该参数
	
	i18n : {									// 实例的文本内容，默认是只提供简体中文和英文，你也可以配置其他语言来使用
		lang : 'zh',							// 提示文本的语言，默认是 'zh'，也就是简体中文，默认选项只有 'zh' 和 'en'
		zh : {
			larger : ['放大显示', '取消放大'], 
			layout : ['水平布局', '垂直布局'], 
			result : ['隐藏结果', '显示结果'], 
			source : ['隐藏代码', '显示代码'], 
			save : ['保存文件', '保存成功', '保存失败'], 
			copy : ['复制代码', '复制成功', '复制失败'], 
		},
		en : {
			larger : ['Larger Window', 'Cancel Larger'], 
			layout : ['X-axis Layout', 'Y-axis Layout'], 
			result : ['Hidden Result', 'Reveal Result'], 
			source : ['Hidden Source', 'Reveal Source'], 
			save : ['Save File', 'Save Done', 'Save Fail'], 
			copy : ['Copy Code', 'Copy Done', 'Copy Fail'], 
		},
	},
	
};



// ---------------------------------------------------------------------------------------------
// 创建全局 xj[Name] 和 return 属性
if(pub_global.xj === undefined){ pub_global.xj = {} };
if(pub_global.xj[pub_keyword] === undefined){ pub_global.xj[pub_keyword] = {} };
if(pub_global.xj[pub_keyword].return === undefined){ pub_global.xj[pub_keyword].return = {} };

// 创建并合并 config 和 option 参数
if(pub_global.xj[pub_keyword].config === undefined){ pub_global.xj[pub_keyword].config = {} };
if(pub_global.xj[pub_keyword].option === undefined){ pub_global.xj[pub_keyword].option = {} };
if(pub_global.xj[pub_keyword].config[pub_version]){ $.extend(true, pub_config, pub_global.xj[pub_keyword].config[pub_version]) };
if(pub_global.xj[pub_keyword].option[pub_version]){ $.extend(true, pub_option, pub_global.xj[pub_keyword].option[pub_version]) };

// ---------------------------------------------

// 创建全局节点的 jQuery 实例对象，html 和 body 可能之后还得重新获取
var win = $(window);
var doc = $(document);
var html = $('html');
var body = $('body');

// 是否支持 touch 事件 / 是否有 ie 的 documentMode 属性 / 浏览器代理
var pub_touchable = 'ontouchstart' in window;
var pub_ieDocMode = document.documentMode;
var pub_userAgent = navigator.userAgent;

// window 滚动条所在位置，最大化之前得保存下来，取消最大化之后再恢复
var pub_scrollLeft = 0;
var pub_scrollTop = 0;

// 是否为自动实例化操作的标记 / 点击 save 保存时全局共用的 blob 变量
var pub_autoExec = false;
var pub_saveBlob = null;

// 浏览器的相关判断，Safari(IOS) 可能会被当作 Chrome，所以得追加条件
var pub_isIE = (pub_ieDocMode !== undefined) || /edge/i.test(pub_userAgent);
var pub_isSF = window.CSS && window.CSS.supports('-webkit-hyphens', 'none');
var pub_isIOS = /IOS|iPhone|iPad/i.test(pub_userAgent) && pub_isSF === true;

// 以 script 的 xjDemo-manual 属性判断是否自动执行，权重比 option 高
var pub_manual = $('script[src*="xjDemo"]').attr('xjDemo-manual');
if(pub_manual !== undefined){ pub_option.manual = true };

// ------------------------------------------------

// 创建公用的全局控制类名，它们需要重复使用，使用 var 有利于缩小文件
var 
cla_overflow_hidden = 'xjDemo-overflow-hidden',							// 用于 html，在放大时隐藏 html 的全局滚动条
cla_user_select_none = 'xjDemo-user-select-none',						// 用于 html，在拖曳改变尺寸时阻止内容被选中

cla_pack_larger = 'xjDemo-pack-larger',									// 用于 pack，控制 pack 的最大化显示

cla_head_hidden = 'xjDemo-head-hidden',									// 用于 pack，控制 head 的显示或隐藏
cla_head_bottom = 'xjDemo-head-bottom',									// 用于 pack，控制 head 在顶部或底部的位置
cla_head_nowrap = 'xjDemo-head-nowrap',									// 用于 pack，控制 head 的 title 内容是否可以换行

cla_body_nowrap = 'xjDemo-body-nowrap',									// 用于 pack，控制 body 是水平布局还是垂直布局
cla_body_invert = 'xjDemo-body-invert',									// 用于 pack，控制 body 的内容是否翻转位置排列

cla_body_result_hidden = 'xjDemo-body-result-hidden',					// 用于 pack，控制 body 的 result 的显示或隐藏
cla_body_divide_dragging = 'xjDemo-body-divide-dragging',				// 用于 pack，控制 divide 里的详情模块是否显示
cla_body_source_hidden = 'xjDemo-body-source-hidden',					// 用于 pack，控制 body 的 source 的显示或隐藏

cla_body_source_saveable = 'xjDemo-body-source-saveable',				// 用于 pack，控制 source 中的 save 按钮是否显示
cla_body_source_copyable = 'xjDemo-body-source-copyable',				// 用于 pack，控制 source 中的 copy 按钮是否显示

cla_body_source_exec_tips = 'xjDemo-body-source-exec-tips',				// 用于 pack，控制 source 中按钮的 tip 标签是否显示
cla_body_source_exec_done = 'xjDemo-body-source-exec-done',				// 用于 pack，呈现 source 中按钮的 tip 的 done 状态
cla_body_source_exec_fail = 'xjDemo-body-source-exec-fail',				// 用于 pack，呈现 source 中按钮的 tip 的 fail 状态

cla_body_result_nook_dragging = 'xjDemo-body-result-nook-dragging',		// 用于 pack，控制 result 中的 nook-info 是否显示
cla_body_source_nook_dragging = 'xjDemo-body-source-nook-dragging',		// 用于 pack，控制 source 中的 nook-info 是否显示

cla_icon_larger2 = 'xjDemo-icon-larger2',								// 用于 head-larger-icon，是放大显示的图标
cla_icon_layout2 = 'xjDemo-icon-layout2',								// 用于 head-layout-icon，是横向布局的图标
cla_icon_result2 = 'xjDemo-icon-result2',								// 用于 head-result-icon，是显示结果的图标
cla_icon_source2 = 'xjDemo-icon-source2';								// 用于 head-source-icon，是显示代码的图标



// ------------------------------------------------

// 全局事件相关参数，resize / preventDefault / touch / transitionend
var 
eve_dispatchResize = function(){ window.dispatchEvent(eve_resizeEvent) },		// 手动执行一次 window.resize()
eve_preventDefault = function(event){ event.preventDefault() },					// 阻止全局滚动的事件回调函数
eve_tapstart = pub_touchable ? 'touchstart' : 'mousedown',						// tapstart
eve_tapmove = pub_touchable ? 'touchmove' : 'mousemove',						// tapmove
eve_tapend = pub_touchable ? 'touchend' : 'mouseup',							// tapend
eve_transitionend = 'transitionend',											// transitionend
eve_mousedown = 'mousedown',													// mousedown
eve_tapTimeStamp = 0;															// 用于判断是否触发了双击的操作

// 重置事件，不知为何 $win.resize() 无法触发，只能改用 dispatchEvent
var eve_resizeEvent = null;
if(pub_ieDocMode === undefined){ eve_resizeEvent = new Event('resize', {bubbles:false, cancelable:true}) }
else{ eve_resizeEvent = document.createEvent('Event'); eve_resizeEvent.initEvent('resize', false, true); };

// ------------------------------------------------

// 临时节点，复制用的容器 / 拖曳用的遮罩 / 下载用于 click() 的超链接
var jqi_copy_receptacle = $('<textarea class="xjDemo-copy-receptacle" readOnly="readOnly"></textarea>');
var jqi_dragging_masker = $('<div class="xjDemo-dragging-masker"></div>');
var jqi_download_anchor = $('<a class="needsclick"></a>');

// layout() 方法改变布局后，插入到容器中，解决 Safari 渲染错误的 BUG
var jqi_result_rendered = $('<span class="xjDemo-result-rendered">result</span>');
var jqi_source_rendered = $('<span class="xjDemo-source-rendered">source</span>');

// ------------------------------------------------

// 全局函数，返回重复字符 / 分析类名的语言 / 获取 minWidth/minHeight
function pub_repeatString(length, string){ for(var result='',index=0; index<length; index++){ result = result + string }; return result; };
function pub_getLangClass(node){ return (node && node.className && /\blang(?:uage)?-([\w-]+)\b/i.test(node.className)) ? RegExp.$1 : ''; };
function pub_getMinLength(jqi_node, attribute){ var value = parseInt(jqi_node.css(attribute)); return isNaN(value) === true ? 0 : value; };

// ------------------------------------------------

// 拖曳时禁止选中文本和滚动，并改变鼠标(Safari 得绑在 window 才有效)
function pub_dragStart(cursor){
	if(pub_touchable){ window.addEventListener(eve_tapmove, eve_preventDefault, {capture:true, passive:false}) }
	else{ html.addClass(cla_user_select_none); jqi_dragging_masker.appendTo(body).css('cursor', cursor); };
};

// 结束拖曳时释放被禁用的内容，解除 window 绑定的事件，并移除 masker
function pub_dragEnd(){
	if(pub_touchable){ window.removeEventListener(eve_tapmove, eve_preventDefault, {capture:true, passive:false}) }
	else{ html.removeClass(cla_user_select_none); jqi_dragging_masker.remove(); };
};

// 代码的裁剪操作，异步加载的文件，得在 before-sanity-check 状态处理
function pub_trim(option, sourceContent){
	
	// option.trimAction === 'auto' 时，则取决于是否有官方裁剪的插件
	if(option.trimAction === false || (option.trimAction === 'auto' && Prism.plugins.NormalizeWhitespace !== undefined)){ return sourceContent };
	
	// 获取前面的所有 \s，并且将最后的那个空格或制表符当作是缩进字符
	var prefixInnerHTML = /^(\s)+/.test(sourceContent) ? RegExp.lastMatch : '';
	var redundantIndent = /( |\t)+$/.test(prefixInnerHTML) ? RegExp.lastMatch : '';
	
	// 去掉前后的 \s，会把有内容的首行缩进也去掉，所以还得再添加回去
	if(option.trimStart){ sourceContent = redundantIndent + sourceContent.replace(/^\s*/, '') };
	if(option.trimEnd){ sourceContent = sourceContent.replace(/\s*$/, '') };
	
	// 去掉每行前后多余的缩进，整行都是缩进，会被 trimRight 全部清掉
	if(option.trimLeft){ sourceContent = sourceContent.replace(new RegExp('^' + redundantIndent, 'gm'), '') };
	if(option.trimRight){ sourceContent = sourceContent.replace(/[ \t]+$/gm, '') };
	
	// 空格和制表符的转换是互斥的，只能让 1 种生效，并只对行首的生效
	if(option.space2tab !== 0){ sourceContent = sourceContent.replace(new RegExp('^( {' + option.space2tab + '})+', 'gm'), function($0){ return pub_repeatString($0.length/option.space2tab, '	') }) }else 
	if(option.tab2space !== 0){ sourceContent = sourceContent.replace(new RegExp('^\\t+', 'gm'), function($0){ return pub_repeatString($0.length*option.tab2space, ' ') }) };
	
	// 字符串是传值引用，所以外部的值是不会自动改变的，只能再 return
	return sourceContent;
	
};



// ---------------------------------------------------------------------------------------------
// 插件主体
$.fn.xjDemo = function(setting){



// 实例化过，或不是目标容器，就直接返回
var self = this.eq(0);
if(/^textarea$/i.test(self[0].nodeName) === false){ return };
if(self.attr('xjDemoId') !== undefined){ return pub_global.xj[pub_keyword].return[self.attr('xjDemoId')] };



// 合并当前实例和全局设置的公共参数
var option = Object.create(pub_option);
if(setting){ $.extend(true, option, setting) };

// 合并设置在标签的内联属性参数
var inlineOption = self.attr('xjDemo');
if(inlineOption){ $.extend(true, option, eval('('+inlineOption+')')) };

// 纠正参数，阻止自动实例化
if(option.onlySource === true){ option.head = option.result = false };
if(pub_autoExec === true && option.manual !== false){ return };

// ---------------------------------------------

// 确认全局标签避免遗漏
if(html.length === 0){ html = $(document.documentElement) };
if(body.length === 0){ body = $(document.body) };

// id = 时间戳 + 随机数
var id = Date.now() +'_'+ String(Math.random()).slice(2,12);
var dot_id = '.' + id;
var num_id = '#' + id;

// 简化部分参数避免冗余
var 
resizeDetail = option.resizeDetail,
dispatchResize = option.dispatchResize,

insertAction = option.insertAction,

anchorTarget = option.anchorTarget,
keepMarkupTag = option.keepMarkupTag,

i18n = option.i18n,
lang = option.i18n.lang;

// ---------------------------------------------

// 当使用 File Highlight 插件去加载代码时，不能生成先 code 标签，并且 option.lang 参数也不能生效
var fileHighlight = (self.attr('data-src') === undefined) ? false : true;

// 当使用 JSONP Highlight 插件去加载代码时，也不能先生成 code 标签，但是却需要明文写出语言的类名
var jsonpHighlight = (self.attr('data-jsonp') === undefined) ? false : true;

// 当使用 File Highlight 插件或 JSONP Highlight 插件来加载代码时，全部算是异步操作，需要另外处理
var asyncLoadSource = (fileHighlight === false && jsonpHighlight === false) ? false : true;

// ---------------------------------------------

// cloneNode 将会被当作 source-wrap 节点，节点由 self 克隆而来，得移除多余的属性，否则可能有意外
var cloneNode = self.clone().removeClass('xjDemo').removeAttr('id xjDemo');

// childNode 将会被当作 source-wrap-code 节点，节点在后面生成，内容以处理过的 sourceContent 为准
var childNode = null;

// sourceContent 将会被当作 source 的内容，由于 innerHTML 属性将会自动编码，所以改用 textContent
var sourceContent = option.sourceContent;
if(sourceContent === true){ sourceContent = self.text() };

// resultContent 将会被当作 result 的内容，由于 textContent 属性将会自动解码，所以属性无需再处理
var resultContent = option.resultContent;
if(resultContent === true){ resultContent = sourceContent };

// ---------------------------------------------

// languageClass 在 option.title === true 时，将被当作 title-text 既标题的文本，需要一个全局变量
var languageClass = pub_getLangClass(cloneNode[0]);
if(fileHighlight === false && languageClass === ''){ languageClass = option.lang };
if(fileHighlight === false && option.title === true){ option.title = languageClass };

// 代码高亮的设置，如果 option.source === false 则不需要执行，所以也做成 IIFE 模式，方便直接返回
(function(markArray, prePacker){
	
	// 如果没有 body-source 模块，则不需要处理高亮的内容，那直接返回
	if(option.source !== true){ return };
	
	// 不是异步才执行裁剪，否则就得在 before-sanity-check 回调中处理
	if(asyncLoadSource === false){ sourceContent = pub_trim(option, sourceContent) };
	
	// result 内容由 source 内容决定，那么裁剪后需要重新赋值保持一致
	if(option.resultContent === true){ resultContent = sourceContent };
	
	// 如果是异步，result 内容由 source 内容决定，则默认是 Loading…
	if(asyncLoadSource !== false && option.resultContent === true){ resultContent = 'Loading…' };
	
	// 在 option 添加额外数据，在 before-sanity-check 回调中需要用到
	option.otherDate = { textareaId : self.attr('id'), fileHighlight : fileHighlight, jsonpHighlight : jsonpHighlight, asyncLoadSource : asyncLoadSource, };
	
	// 有 Keep Markup 插件时保存 mark 标签，转码后再将 mark 标签复位
	if(Prism.plugins.KeepMarkup !== undefined && (self.closest('.no-keep-markup').length === 0 || self.closest('.keep-markup').length !== 0 ))
	{ sourceContent = sourceContent.replace(/(<mark[^>]*>)|(<\/mark>)/ig, function($0){ return markArray.push($0), keepMarkupTag; }) };
	option.encodeTarget.forEach(function(e, i){ sourceContent = sourceContent.replace(new RegExp(e, 'g'), option.encodeResult[i]) });
	markArray.forEach(function(markString){ sourceContent = sourceContent.replace(new RegExp(keepMarkupTag), markString) });
	
	// 生成 pre > code 的基本结构，并且将 option 参数附加到 pre 节点
	prePacker = cloneNode.html('')[0].outerHTML.replace(/^<textarea/i, '<pre').replace(/textarea>$/i, 'pre>');
	cloneNode = $(prePacker).addClass('xjDemo-body-source-wrap').data('xjDemoElementOption', option);
	childNode = $('<code class="xjDemo-body-source-wrap-code"></code>').appendTo(cloneNode);
	
	// 有 languageClass 才添加 lang 类名，异步加载时不能有 code 节点
	if(languageClass !== ''){ cloneNode.addClass('lang-' + languageClass) };
	if(asyncLoadSource !== false){ childNode.remove() };
	
})([], '');



// ----------------------------------------------------------------



// 在这里才添加 xjDemoID，以避免 cloneNode 也有这属性
self.attr('xjDemoId', id);

// 创建最终的返回值对象，以及返回值对象方法相关的变量
var 
isMaximize = false,
isVertical = option.vertical,
isBodyInvert = option.bodyInvert,
isHeadBottom = option.headBottom,
returnObject = {
	
	id : id,
	version : pub_version,
	
	self : self,
	that : null,
	
	// pack 容器的放大显示，true 放大显示，false 取消放大，'toggle' 切换状态，没传参数则获取状态
	// Safari 中，放大之后得强制渲染一回，并且必须在类名操作后立即强制渲染，不然就会出现渲染 BUG
	// Safari(IOS) 中，还得设置 body，并且 width 和 height 都得设置为 100%，否则滚动条依然会出现
	larger : function(flag){
		
		// 获取或切换当前状态
		if(flag === undefined){ return jqi_pack.hasClass(cla_pack_larger) ? true : false };
		if(flag === 'toggle'){ flag = jqi_pack.hasClass(cla_pack_larger) ? false : true };
		
		// 还得设置滚动条位置
		if(flag === true){
			pub_scrollLeft = win.scrollLeft();
			pub_scrollTop = win.scrollTop();
			html.addClass(cla_overflow_hidden);
			jqi_pack.addClass(cla_pack_larger);
			jqi_head_larger_icon.addClass(cla_icon_larger2);
			if(pub_isSF){ jqi_pack[0].clientWidth };
		}else if(flag === false){
			html.removeClass(cla_overflow_hidden);
			jqi_pack.removeClass(cla_pack_larger);
			jqi_head_larger_icon.removeClass(cla_icon_larger2);
			if(pub_isSF){ jqi_pack[0].clientWidth };
			win.scrollLeft(pub_scrollLeft);
			win.scrollTop(pub_scrollTop);
		};
		
		// 切换提示并绑定事件
		if(option.head === true){ jqi_head_larger_info.text(i18n[lang].larger[flag ? 1 : 0]) };
		if(option.escClose === true){ win[flag ? 'on' : 'off']('keyup' + dot_id, function(e){ e.keyCode === 27 && returnObject.larger(false) }) };
		
		// 清掉尺寸，防止滚动
		jqi_body_result.css({width:'', height:''});
		jqi_body_source.css({width:'', height:''});
		
		// 重置尺寸，设置状态
		if(dispatchResize){ eve_dispatchResize() };
		isMaximize = flag;
		
	},
	
	// body 模块的布局方式，true 垂直布局，false 水平布局，'toggle' 切换状态，没传参数则获取状态
	// Safari 中，改变布局后临时插入一个节点，用于强制渲染，之后再移除，否则尺寸可能会有计算误差
	layout : function(flag){
		if(option.result !== true || option.source !== true){ return };
		if(flag === undefined){ return jqi_pack.hasClass(cla_body_nowrap) ? false : true };
		if(flag === 'toggle'){ flag = jqi_pack.hasClass(cla_body_nowrap) ? true : false };
		if(option.head === true){ jqi_head_layout_info.text(i18n[lang].layout[flag ? 0 : 1]) };
		jqi_pack[flag ? 'removeClass' : 'addClass'](cla_body_nowrap);
		jqi_head_layout_icon[flag ? 'removeClass' : 'addClass'](cla_icon_layout2);
		if(dispatchResize){ eve_dispatchResize() };
		jqi_body_result.css({width:'', height:''});
		jqi_body_source.css({width:'', height:''});
		isVertical = flag;
		if(pub_isSF){
			jqi_body_result.append(jqi_result_rendered);
			jqi_body_source.append(jqi_source_rendered);
			setTimeout(function(){
				jqi_result_rendered.remove();
				jqi_source_rendered.remove();
			}, 0);
		};
	},
	
	// body 模块的顺序颠倒，true 翻转顺序，false 正常顺序，'toggle' 切换状态，没传参数则获取状态
	bodyInvert : function(flag){
		if(option.result !== true || option.source !== true){ return };
		if(flag === undefined){ return jqi_pack.hasClass(cla_body_invert) ? true : false };
		if(flag === 'toggle'){ flag = jqi_pack.hasClass(cla_body_invert) ? false : true };
		jqi_pack[flag ? 'addClass' : 'removeClass'](cla_body_invert);
		if(dispatchResize){ eve_dispatchResize() };
		isBodyInvert = flag;
	},
	
	// result 模块的设置和获取，没有 result 模块返回 undefined，有传值就是设置，没有传值则是获取
	result : function(content){
		if(option.result !== true){ return };
		if(content === undefined){ return jqi_body_result_wrap_view.html() };
		jqi_body_result_wrap_view.html(content);
		if(dispatchResize){ eve_dispatchResize() };
	},
	
	// result 模块的显示和隐藏，true 显示，false 隐藏，'toggle' 切换状态，没有传参数则是获取状态
	resultShow : function(flag){
		if(option.result !== true){ return };
		if(flag === undefined){ return jqi_pack.hasClass(cla_body_result_hidden) ? false : true };
		if(flag === 'toggle'){ flag = jqi_pack.hasClass(cla_body_result_hidden) ? true : false };
		if(option.head === true){ jqi_head_result_info.text(i18n[lang].result[flag ? 0 : 1]) };
		jqi_pack[flag ? 'removeClass' : 'addClass'](cla_body_result_hidden);
		jqi_head_result_icon[flag ? 'removeClass' : 'addClass'](cla_icon_result2);
		if(dispatchResize){ eve_dispatchResize() };
	},
	
	// source 模块的设置和获取，没有 result 模块返回 undefined，有传值就是设置，没有传值则是获取
	source : function(content){
		if(option.source !== true){ return };
		if(content === undefined){ return jqi_body_source_wrap_code.html() };
		jqi_body_source_wrap_code.html(content);
		if(dispatchResize){ eve_dispatchResize() };
	},

	// source 模块的显示和隐藏，true 显示，false 隐藏，'toggle' 切换状态，没有传参数则是获取状态
	sourceShow : function(flag){
		if(option.source !== true){ return };
		if(flag === undefined){ return jqi_pack.hasClass(cla_body_source_hidden) ? false : true };
		if(flag === 'toggle'){ flag = jqi_pack.hasClass(cla_body_source_hidden) ? true : false };
		if(option.head === true){ jqi_head_source_info.text(i18n[lang].source[flag ? 0 : 1]) };
		jqi_pack[flag ? 'removeClass' : 'addClass'](cla_body_source_hidden);
		jqi_head_source_icon[flag ? 'removeClass' : 'addClass'](cla_icon_source2);
		if(dispatchResize){ eve_dispatchResize() };
	},
	
	// head 模块的显示和隐藏，true 显示，false 隐藏，'toggle' 则切换状态，没有传参数则是获取状态
	headShow : function(flag){
		if(option.head !== true){ return };
		if(flag === undefined){ return jqi_pack.hasClass(cla_head_hidden) ? false : true };
		if(flag === 'toggle'){ flag = jqi_pack.hasClass(cla_head_hidden) ? true : false };
		jqi_pack[flag ? 'removeClass' : 'addClass'](cla_head_hidden);
		if(dispatchResize){ eve_dispatchResize() };
	},
	
	// head 模块的在底部显示，true 底部，false 顶部，'toggle' 则切换状态，没有传参数则是获取状态
	headBottom : function(flag){
		if(option.head !== true){ return };
		if(flag === undefined){ return jqi_pack.hasClass(cla_head_bottom) ? true : false };
		if(flag === 'toggle'){ flag = jqi_pack.hasClass(cla_head_bottom) ? false : true };
		jqi_pack[flag ? 'addClass' : 'removeClass'](cla_head_bottom);
		if(dispatchResize){ eve_dispatchResize() };
		isHeadBottom = flag;
	},
	
	// title 内容的获取与更改，没有 title 模块将返回 undefined，有传值就是设置，没有传值则是获取
	title : function(content){
		if(option.head !== true){ return };
		if(content === undefined){ return jqi_head_title_text.html() }
		else{ jqi_head_title_text.html(content) };
	},
	
	// title-text 文本换行与否，true 换行，false 不换行，'toggle' 切换状态，没传参数则是获取状态
	titleWrap : function(flag){
		if(option.head !== true){ return };
		if(flag === undefined){ return jqi_pack.hasClass(cla_head_nowrap) ? false : true };
		if(flag === 'toggle'){ flag = jqi_pack.hasClass(cla_head_nowrap) ? true : false };
		jqi_pack[flag ? 'removeClass' : 'addClass'](cla_head_nowrap);
	},
	
	// 自我销毁，回调返回 false 则放弃销毁，传入 true 会连 self 一并销毁，解除全局绑定的键盘事件
	destroy : function(flag){
		if(option.destroyCallback(returnObject) === false){ return };
		if(flag === true){ self.remove(); };
		jqi_pack.remove();
		win.off(dot_id);
	},
	
};



// ----------------------------------------------------------------



// 创建一个空 jQuery 实例对象
var jqi = $();

// 创建 .xjDemo-pack 节点对象
var jqi_pack = returnObject.that = $('<div class="xjDemo-pack"></div>');

// 没有相关类名时，边框会异常
if(option.head === false){ jqi_pack.addClass(cla_head_hidden) };
if(option.result === false){ jqi_pack.addClass(cla_body_result_hidden) };
if(option.source === false){ jqi_pack.addClass(cla_body_source_hidden) };

// 设置 jqi_pack 的类名和样式
if(option.packClass !== ''){ jqi_pack.addClass(option.packClass) };
if(option.packStyle !== null){ jqi_pack.css(option.packStyle) };
if(option.color !== 'default'){ jqi_pack.addClass('xjDemo-' + option.color) };

// 创建节点变量，不管是否存在
var 
jqi_head = jqi,

jqi_head_title = jqi,
jqi_head_title_text = jqi,

jqi_head_larger = jqi,
jqi_head_larger_info = jqi,
jqi_head_larger_icon = jqi,

jqi_head_layout = jqi,
jqi_head_layout_info = jqi,
jqi_head_layout_icon = jqi,

jqi_head_result = jqi,
jqi_head_result_info = jqi,
jqi_head_result_icon = jqi,

jqi_head_source = jqi,
jqi_head_source_info = jqi,
jqi_head_source_icon = jqi,

jqi_body = jqi,

jqi_body_result = jqi,
jqi_body_result_wrap = jqi,
jqi_body_result_wrap_view = jqi,
jqi_body_result_nook = jqi,
jqi_body_result_nook_info = jqi,

jqi_body_divide = jqi,
jqi_body_divide_border = jqi,
jqi_body_divide_result = jqi,
jqi_body_divide_source = jqi,

jqi_body_source = jqi,
jqi_body_source_wrap = jqi,
jqi_body_source_wrap_code = jqi,
jqi_body_source_nook = jqi,
jqi_body_source_nook_info = jqi,

jqi_body_source_save = jqi,
jqi_body_source_save_info = jqi,
jqi_body_source_save_info_back = jqi,
jqi_body_source_save_info_fore = jqi,
jqi_body_source_save_icon = jqi,

jqi_body_source_copy = jqi,
jqi_body_source_copy_info = jqi,
jqi_body_source_copy_info_back = jqi,
jqi_body_source_copy_info_fore = jqi,
jqi_body_source_copy_icon = jqi;



// .xjDemo-head
if(option.head === true){
	
	// head
	jqi_head = $('<div class="xjDemo-head"></div>').appendTo(jqi_pack);
	if(option.headShow !== true){ returnObject.headShow(false) };
	if(option.headBottom !== false){ returnObject.headBottom(true) };
	
	// ------------------------------------------------
	
	// head-title
	jqi_head_title = $('<div class="xjDemo-head-title"></div>').appendTo(jqi_head);
	jqi_head_title_text = $('<div class="xjDemo-head-title-text"></div>').appendTo(jqi_head_title);
	if(fileHighlight !== false && option.title === true){ jqi_head_title_text.text('Unknow') }else 
	if(typeof option.title === 'string'){ jqi_head_title_text.html(option.title) };
	if(option.titleWrap === false){ returnObject.titleWrap(false) };
	
	// ------------------------------------------------
	
	// head-larger
	if(option.larger === true){//option.result === true || option.source === true){
		jqi_head_larger = $('<div class="xjDemo-head-other xjDemo-head-larger"></div>').appendTo(jqi_head);
		jqi_head_larger_info = $('<div class="xjDemo-head-other-info">'+ i18n[lang].larger[0] +'</div>').appendTo(jqi_head_larger);
		jqi_head_larger_icon = $('<div class="xjDemo-head-other-icon xjDemo-icon xjDemo-icon-larger xj-ripple"></div>').appendTo(jqi_head_larger);
		jqi_head_larger.click(function(){ returnObject.larger('toggle') });
	};
	
	// head-layout
	if(option.layout === true && option.result === true && option.source === true){
		jqi_head_layout = $('<div class="xjDemo-head-other xjDemo-head-layout"></div>').appendTo(jqi_head),
		jqi_head_layout_info = $('<div class="xjDemo-head-other-info">'+ i18n[lang].layout[0] +'</div>').appendTo(jqi_head_layout);
		jqi_head_layout_icon = $('<div class="xjDemo-head-other-icon xjDemo-icon xjDemo-icon-layout xj-ripple"></div>').appendTo(jqi_head_layout);
		jqi_head_layout.click(function(){ returnObject.layout('toggle') });
	};
	
	// head-result
	if(option.result === true){
		jqi_head_result = $('<div class="xjDemo-head-other xjDemo-head-result"></div>').appendTo(jqi_head),
		jqi_head_result_info = $('<div class="xjDemo-head-other-info">'+ i18n[lang].result[0] +'</div>').appendTo(jqi_head_result);
		jqi_head_result_icon = $('<div class="xjDemo-head-other-icon xjDemo-icon xjDemo-icon-result xj-ripple"></div>').appendTo(jqi_head_result);
		jqi_head_result.click(function(){ returnObject.resultShow('toggle') });
	};
	
	// head-source
	if(option.source === true){
		jqi_head_source = $('<div class="xjDemo-head-other xjDemo-head-source"></div>').appendTo(jqi_head),
		jqi_head_source_info = $('<div class="xjDemo-head-other-info">'+ i18n[lang].source[0] +'</div>').appendTo(jqi_head_source);
		jqi_head_source_icon = $('<div class="xjDemo-head-other-icon xjDemo-icon xjDemo-icon-source xj-ripple"></div>').appendTo(jqi_head_source);
		jqi_head_source.click(function(){ returnObject.sourceShow('toggle') });
	};
	
};



// .xjDemo-body
if(option.result === true || option.source === true){
	
	// body 结构
	jqi_body = $('<div class="xjDemo-body"></div>').appendTo(jqi_pack);
	
	// 水平布局和颠倒布局
	if(option.vertical !== true){ returnObject.layout(false) };
	if(option.bodyInvert !== false){ returnObject.bodyInvert(true) };
	
};



// .xjDemo-body-result
if(option.result === true){
	
	// result 结构
	jqi_body_result = $('<div class="xjDemo-body-result"></div>').appendTo(jqi_body);
	jqi_body_result_wrap = $('<div class="xjDemo-body-result-wrap"></div>').appendTo(jqi_body_result);
	jqi_body_result_wrap_view = $('<div class="xjDemo-body-result-wrap-view"></div>').appendTo(jqi_body_result_wrap);
	
	// result 的 class 和 style
	if(option.resultClass !== ''){ jqi_body_result.addClass(option.resultClass) };
	if(option.resultStyle !== null){ jqi_body_result.css(option.resultStyle) };
	
	// result_wrap 的 class 和 style
	if(option.resultWrapClass !== ''){ jqi_body_result_wrap.addClass(option.resultWrapClass) };
	if(option.resultWrapStyle !== null){ jqi_body_result_wrap.css(option.resultWrapStyle) };
	
	// result_wrap_view 的 class 和 style
	if(option.resultWrapViewClass !== ''){ jqi_body_result_wrap_view.addClass(option.resultWrapViewClass) };
	if(option.resultWrapViewStyle !== null){ jqi_body_result_wrap_view.css(option.resultWrapViewStyle) };
	
	//不显示 result，就用返回值对象的方法进行隐藏
	if(option.resultShow !== true){ returnObject.resultShow(false) };
	
	// 将主体内容写入 view，和生成结构分开执行可以更快
	jqi_body_result_wrap_view.html(resultContent);
	
	// nook 的拖曳
	(function(){
		
		// 拖曳只在 Y 轴方向生效，拖曳按钮在最大化时将隐藏，拖曳时只限制最小高度而最大高度不设限
		// wrap 有 min-height:100%;，就算设置 max-height，拖曳时也会跟着外层容器扩展，不会被限制
		if(option.resultResize === false){ return };
		jqi_body_result_nook = $(
			'<div class="xjDemo-body-result-nook">'+
				'<div class="xjDemo-body-result-nook-wrap">'+
					'<div class="xjDemo-body-result-nook-wrap-icon"></div>'+
				'</div>'+
			'</div>'
		).appendTo(jqi_body_result);
		
		// 需要时才添加 info 模块，在 hover 时就显示该模块，而不是点击才显示，可避免双击时的闪烁
		// 用 jQuery 的 width() 和 height() 方法，在 Chrome 中不包括滚动条，所以改用原生 JS 方法
		var setResultNookInfoText = pub_nothing;
		if(resizeDetail === true){
			setResultNookInfoText = function(){ jqi_body_result_nook_info.text( jqi_body_result[0].offsetWidth +'px × '+ jqi_body_result[0].offsetHeight +'px') };
			jqi_body_result_nook_info = $('<div class="xjDemo-body-result-nook-info"></div>').prependTo(jqi_body_result_nook);
			jqi_body_result_nook.on('mouseenter', function(){ setResultNookInfoText() });
		};
		
		// ▸00. 拖曳变量
		var 
		startY = 0,					// 鼠标或触屏在点击那一刻的位置，这个值是固定的
		moveY = 0,					// 距离初始位置的距离，将会跟随拖曳的变化而变化
		
		resultHeight = 0,			// result 节点的高度
		sourceHeight = 0,			// source 节点的高度
		
		resultMinHeight = 0,		// result 节点的最小高度
		sourceMinHeight = 0,		// source 节点的最小高度
		
		resultMinMoveRange = 0,		// result 节点最小的移动距离
		sourceMinMoveRange = 0;		// source 节点最小的移动距离
		
		// ▸01. 拖曳开始
		jqi_body_result_nook.on(eve_tapstart + dot_id, function(e){
			
			// 如果是鼠标事件触发，但又不是点鼠标左键，那么直接返回
			if(e.type === eve_mousedown && e.button !== 0){ return };
			
			// 双击将会复原尺寸，横向布局时 source 的高度也会被清掉
			if(Date.now() - eve_tapTimeStamp < 500){
				eve_tapTimeStamp = Date.now();
				jqi_body_result.css({height:''});
				if(isVertical !== true && isMaximize === false && option.source === true){ jqi_body_source.css({height:''}) };
				return;
			};
			eve_tapTimeStamp = Date.now();
			
			// 设置容器当前宽高度文本并显示
			if(resizeDetail === true){
				setResultNookInfoText();
				jqi_pack.addClass(cla_body_result_nook_dragging);
			};
			
			// 阻止滚动或禁止选中
			pub_dragStart('ns-resize');
			
			//获取鼠标或触屏点击的 Y 轴坐标点
			startY = (e.clientY !== undefined) ? e.clientY : e.targetTouches[0].clientY;
			
			// 获取 result 和 source 节点的当前尺寸
			resultHeight = jqi_body_result.outerHeight();
			sourceHeight = jqi_body_source.outerHeight();
			
			// 获取 result 和 source 节点的 minHeight 属性
			resultMinHeight = pub_getMinLength(jqi_body_result, 'minHeight');
			sourceMinHeight = pub_getMinLength(jqi_body_source, 'minHeight');
			
			// 根据当前尺寸和 minHeight，计算出拖曳时最大可移动距离
			// 横向布局时，最小高度取决于容器中较大的那个 minHeight
			resultMinMoveRange = resultMinHeight - resultHeight;
			sourceMinMoveRange = sourceMinHeight - sourceHeight;
			if(isVertical !== true && isMaximize === false && option.source === true){
				if(sourceMinMoveRange > resultMinMoveRange){ resultMinMoveRange = sourceMinMoveRange };
			};
			
			// ▸02. 拖曳移动
			html.on(eve_tapmove + dot_id, function(e){
				
				// 获取当前坐标位置距离初始位置的距离
				moveY = ((e.clientY !== undefined) ? e.clientY : e.targetTouches[0].clientY) - startY;
				
				// 不能超出 resultMinMoveRange 的可移动范围
				if(resultMinMoveRange > moveY){ moveY = resultMinMoveRange };
				jqi_body_result.css({height : resultHeight + moveY});
				
				// 当为横向布局时，需要同步改变 source 模块的高度
				if(isVertical !== true && isMaximize === false && option.source === true){
					jqi_body_source.css({height : sourceHeight + moveY});
				};
				
				// 如果需要，就设置 nook-info 的内容，标明容器的宽高度
				if(resizeDetail === true){ setResultNookInfoText() };
				
			});
			
			// ▸03. 拖曳结束
			html.on(eve_tapend + dot_id, function(e){
				
				// 再次允许滚动或选择
				pub_dragEnd();
				
				// 根据需要执行 resize 事件
				if(dispatchResize){ eve_dispatchResize() };
				
				// 根据需要隐藏 nook 的 info 提示框
				if(resizeDetail === true){ jqi_pack.removeClass(cla_body_result_nook_dragging) };
				
				// 移除 html 的 touchmove 和 touchend 事件
				html.off(eve_tapmove + dot_id);
				html.off(eve_tapend + dot_id);
				
			});
			
		});
		
	})(); // (function(){
	
};



// .xjDemo-body-divide
if(option.result === true && option.source === true){
	
	// divide 结构
	jqi_body_divide = $('<div class="xjDemo-body-divide"></div>').appendTo(jqi_body);
	
	// divide 拖曳
	(function(){
		
		// divide 的拖曳只改变 result 和 source 的占位比例，不会改变 .xjDemo-pack 控件的外部尺寸
		// divide 在非 larger 时也能拖曳，因为可能存在横向滚动的页面，高度只有一屏而宽度却是无限
		// divide 中的 border 作为拖曳的目标，是因为尾部有段和 nook 按钮太靠近，需要避免这段交互
		// 如果 divide 不能拖曳，就直接 return，否则就生成并并且加 border 节点，用于实现拖曳交互
		if(option.divideResize !== true){ return }
		else{ jqi_body_divide_border = $('<div class="xjDemo-body-divide-border"></div>').appendTo(jqi_body_divide) };
		
		// 如果需要显示 result 模块和 source 模块的尺寸详情文本，就生成并添加 2 个文本容器的节点
		// 用 jQuery 的 width() 和 height() 方法，在 Chrome 中不包括滚动条，所以改用原生 JS 方法
		var setDivideSizeTextDetail = pub_nothing;
		if(resizeDetail === true){
			setDivideSizeTextDetail = function(){
				jqi_body_divide_result.text( jqi_body_result[0].offsetWidth +'px × '+ jqi_body_result[0].offsetHeight +'px');
				jqi_body_divide_source.text( jqi_body_source[0].offsetWidth +'px × '+ jqi_body_source[0].offsetHeight +'px');
			};
			jqi_body_divide_result = $('<div class="xjDemo-body-divide-result"></div>').appendTo(jqi_body_divide);
			jqi_body_divide_source = $('<div class="xjDemo-body-divide-source"></div>').appendTo(jqi_body_divide);
			jqi_body_divide_border.on('mouseenter', function(){ setDivideSizeTextDetail() });
		};
		
		// ▸00. 拖曳变量
		var 
		startX = 0,					// 鼠标或触屏在点击那一刻的 X 轴位置，这是个固定值
		startY = 0,					// 鼠标或触屏在点击那一刻的 Y 轴位置，这是个固定值
		
		moveX = 0,					// 距离初始 X 轴位置的距离，会跟随拖曳而变化
		moveY = 0,					// 距离初始 Y 轴位置的距离，会跟随拖曳而变化
		
		resultSize = 0,				// result size / width or height
		sourceSize = 0,				// source size / width or height
		
		resultMinSize = 0,			// result min size / width or height
		sourceMinSize = 0,			// source min size / width or height
		
		minMovedDistance = 0,		// min moved distance / 取决于变小的模块
		maxMovedDistance = 0;		// max moved distance / 取决于最大的模块
		
		// ▸01. 拖曳开始
		jqi_body_divide_border.on(eve_tapstart + dot_id, function(e){
			
			// 如果是鼠标事件触发，但又不是点鼠标左键，那么直接返回
			if(e.type === eve_mousedown && e.button !== 0){ return };
			
			// 双击将会复原尺寸，根据布局去清掉内联 height 或 width
			if(Date.now() - eve_tapTimeStamp < 500){
				eve_tapTimeStamp = Date.now();
				if(isVertical === true){
					jqi_body_result.css({height:''});
					jqi_body_source.css({height:''});
				}else{
					jqi_body_result.css({width:''});
					jqi_body_source.css({width:''});
				};
				return;
			};
			eve_tapTimeStamp = Date.now();
			
			// 设置容器当前宽高度文本并显示
			if(resizeDetail === true){
				setDivideSizeTextDetail();
				jqi_pack.addClass(cla_body_divide_dragging);
			};
			
			// 阻止页面滚动或禁止选中文本
			pub_dragStart((isVertical === true ? 'row' : 'col')+ '-resize');
			
			// 获取初始鼠标或触屏的初始坐标点
			startX = (e.clientX !== undefined) ? e.clientX : e.targetTouches[0].clientX;
			startY = (e.clientY !== undefined) ? e.clientY : e.targetTouches[0].clientY;
			
			// 获取 result 和 source 节点的当前尺寸
			resultSize = jqi_body_result[(isVertical === true) ? 'outerHeight' : 'outerWidth']();
			sourceSize = jqi_body_source[(isVertical === true) ? 'outerHeight' : 'outerWidth']();
			
			// 获取 result 和 source 节点的最小宽高度值
			resultMinSize = pub_getMinLength(jqi_body_result, (isVertical === true) ? 'minHeight' : 'minWidth');
			sourceMinSize = pub_getMinLength(jqi_body_source, (isVertical === true) ? 'minHeight' : 'minWidth');
			
			// 根据尺寸和最小宽高，计算出拖曳时最大最小距离
			minMovedDistance = -(resultSize - resultMinSize);
			maxMovedDistance = +(sourceSize - sourceMinSize);
			
			// ▸02. 拖曳移动
			html.on(eve_tapmove + dot_id, function(e){
				
				// 获取当前坐标位置距离初始位置的距离
				moveX = ((e.clientX !== undefined) ? e.clientX : e.targetTouches[0].clientX) - startX;
				moveY = ((e.clientY !== undefined) ? e.clientY : e.targetTouches[0].clientY) - startY;
				
				// 移动距离跟着 result 和 source 颠倒
				if(isBodyInvert === true){ moveX = -moveX; };
				if(isBodyInvert === true){ moveY = -moveY; };
				
				// 移动距离不能超出模块可移动范围之外
				if(isVertical === true){
					if(moveY < minMovedDistance){ moveY = minMovedDistance }else 
					if(moveY > maxMovedDistance){ moveY = maxMovedDistance };
					jqi_body_result.css({height : resultSize + moveY});
					jqi_body_source.css({height : sourceSize - moveY});
				}else{
					if(moveX < minMovedDistance){ moveX = minMovedDistance }else 
					if(moveX > maxMovedDistance){ moveX = maxMovedDistance };
					jqi_body_result.css({width : resultSize + moveX});
					jqi_body_source.css({width : sourceSize - moveX});
				};
				
				// 就设置容器的尺寸，标明容器的宽高度
				if(resizeDetail === true){ setDivideSizeTextDetail() };
				
			});
			
			// ▸03. 拖曳结束
			html.on(eve_tapend + dot_id, function(e){
				
				// 再次允许滚动或选择
				pub_dragEnd();
				
				// 根据需要执行 resize 事件
				if(dispatchResize){ eve_dispatchResize() };
				
				// 根据需要隐藏 nook 的 info 提示框
				if(resizeDetail === true){ jqi_pack.removeClass(cla_body_divide_dragging) };
				
				// 移除 html 的 touchmove 和 touchend 事件
				html.off(eve_tapmove + dot_id);
				html.off(eve_tapend + dot_id);
				
			});
			
		});
		
	})(); //(function(){
	
};



// .xjDemo-body-source
if(option.source === true){
	
	// source 结构
	jqi_body_source = $('<div class="xjDemo-body-source"></div>').appendTo(jqi_body);
	jqi_body_source_wrap = cloneNode.appendTo(jqi_body_source);
	jqi_body_source_wrap_code = childNode;
	
	// source 的 class 和 style
	if(option.sourceClass !== ''){ jqi_body_source.addClass(option.sourceClass) };
	if(option.sourceStyle !== null){ jqi_body_source.css(option.sourceStyle) };
	
	// source_wrap 的 class 和 style
	if(option.sourceWrapClass !== ''){ jqi_body_source_wrap.addClass(option.sourceWrapClass) };
	if(option.sourceWrapStyle !== null){ jqi_body_source_wrap.css(option.sourceWrapStyle) };
	
	// source_wrap_code 的 class 和 style
	if(option.sourceWrapCodeClass !== ''){ jqi_body_source_wrap_code.addClass(option.sourceWrapCodeClass) };
	if(option.sourceWrapCodeStyle !== null){ jqi_body_source_wrap_code.css(option.sourceWrapCodeStyle) };
	
	//不显示 source，就用返回值对象的方法进行隐藏
	if(option.sourceShow !== true){ returnObject.sourceShow(false) };
	
	// 将主体内容写入 code，和生成结构分开执行可以更快
	jqi_body_source_wrap_code.html(sourceContent);
	
	// nook 的拖曳
	(function(){
		
		// 拖曳只在 Y 轴方向生效，拖曳按钮在最大化时将隐藏，拖曳时只限制最小高度而最大高度不设限
		// wrap 有 min-height:100%;，就算设置 max-height，拖曳时也会跟着外层容器扩展，不会被限制
		if(option.sourceResize === false){ return };
		jqi_body_source_nook = $(
			'<div class="xjDemo-body-source-nook">'+
				'<div class="xjDemo-body-source-nook-wrap">'+
					'<div class="xjDemo-body-source-nook-wrap-icon"></div>'+
				'</div>'+
			'</div>'
		).appendTo(jqi_body_source);
		
		// 需要时才添加 info 模块，在 hover 时就显示该模块，而不是点击才显示，可避免双击时的闪烁
		// 用 jQuery 的 width() 和 height() 方法，在 Chrome 中不包括滚动条，所以改用原生 JS 方法
		var setSourceNookInfoText = pub_nothing;
		if(resizeDetail === true){
			setSourceNookInfoText = function(){ jqi_body_source_nook_info.text( jqi_body_source[0].offsetWidth +'px × '+ jqi_body_source[0].offsetHeight +'px') };
			jqi_body_source_nook_info = $('<div class="xjDemo-body-source-nook-info"></div>').prependTo(jqi_body_source_nook);
			jqi_body_source_nook.on('mouseenter', function(){ setSourceNookInfoText() });
		};
		
		// ▸00. 拖曳变量
		var 
		startY = 0,					// 鼠标或触屏在点击那一刻的位置，这个值是固定的
		moveY = 0,					// 距离初始位置的距离，将会跟随拖曳的变化而变化
		
		resultHeight = 0,			// result 节点的高度
		sourceHeight = 0,			// source 节点的高度
		
		resultMinHeight = 0,		// result 节点的最小高度
		sourceMinHeight = 0,		// source 节点的最小高度
		
		resultMinMoveRange = 0,		// result 节点最小的移动距离
		sourceMinMoveRange = 0;		// source 节点最小的移动距离
		
		// ▸01. 拖曳开始
		jqi_body_source_nook.on(eve_tapstart + dot_id, function(e){
			
			// 如果是鼠标事件触发，但又不是点鼠标左键，那么直接返回
			if(e.type === eve_mousedown && e.button !== 0){ return };
			
			// 双击将会复原尺寸，横向布局时 result 的高度也会被清掉
			if(Date.now() - eve_tapTimeStamp < 500){
				eve_tapTimeStamp = Date.now();
				jqi_body_source.css({height:''});
				if(isVertical !== true && isMaximize === false && option.result === true){ jqi_body_result.css({height:''}) };
				return;
			};
			eve_tapTimeStamp = Date.now();
			
			// 设置容器当前宽高度文本并显示
			if(resizeDetail === true){
				setSourceNookInfoText();
				jqi_pack.addClass(cla_body_source_nook_dragging);
			};
			
			// 阻止滚动或禁止选中
			pub_dragStart('ns-resize');
			
			//获取鼠标或触屏点击的 Y 轴坐标点
			startY = (e.clientY !== undefined) ? e.clientY : e.targetTouches[0].clientY;
			
			// 获取 result 和 source 节点的当前尺寸
			resultHeight = jqi_body_result.outerHeight();
			sourceHeight = jqi_body_source.outerHeight();
			
			// 获取 result 和 source 节点的 minHeight 属性
			resultMinHeight = pub_getMinLength(jqi_body_result, 'minHeight');
			sourceMinHeight = pub_getMinLength(jqi_body_source, 'minHeight');
			
			// 根据当前尺寸和 minHeight，计算出拖曳时最大可移动距离
			// 横向布局时，最小高度取决于容器中较大的那个 minHeight
			resultMinMoveRange = resultMinHeight - resultHeight;
			sourceMinMoveRange = sourceMinHeight - sourceHeight;
			if(isVertical !== true && isMaximize === false && option.result === true){
				if(resultMinMoveRange > sourceMinMoveRange){ sourceMinMoveRange = resultMinMoveRange };
			};
			
			// ▸02. 拖曳移动
			html.on(eve_tapmove + dot_id, function(e){
				
				// 获取当前坐标位置距离初始位置的距离
				moveY = ((e.clientY !== undefined) ? e.clientY : e.targetTouches[0].clientY) - startY;
				
				// 不能超出 sourceMinMoveRange 的可移动范围
				if(sourceMinMoveRange > moveY){ moveY = sourceMinMoveRange };
				jqi_body_source.css({height : sourceHeight + moveY});
				
				// 当为横向布局时，需要同步改变 result 模块的高度
				if(isVertical !== true && isMaximize === false && option.result === true){
					jqi_body_result.css({height : resultHeight + moveY});
				};
				
				// 如果需要，就设置 nook-info 的内容，标明容器的宽高度
				if(resizeDetail === true){ setSourceNookInfoText() };
				
			});
			
			// ▸03. 拖曳结束
			html.on(eve_tapend + dot_id, function(e){
				
				// 再次允许滚动或选择
				pub_dragEnd();
				
				// 根据需要执行 resize 事件
				if(dispatchResize){ eve_dispatchResize() };
				
				// 根据需要隐藏 nook 的 info 提示框
				if(resizeDetail === true){ jqi_pack.removeClass(cla_body_source_nook_dragging) };
				
				// 移除 html 的 touchmove 和 touchend 事件
				html.off(eve_tapmove + dot_id);
				html.off(eve_tapend + dot_id);
				
			});
			
		});
		
	})(); // (function(){
	
}; // if(option.source === true){



// source 的 save 下载
(function(listener, saveText, saveDone){
	
	// 没有 source 容器，或不需要保存，或是 IOS 不显示保存按钮，就直接返回
	if(option.source !== true || option.save === false){ return };
	if(option.untsaveOnIOS !== false && pub_isIOS === true){ return };
	
	// 在 pack 上添加 'xjDemo-body-source-saveable' 类名
	jqi_pack.addClass(cla_body_source_saveable);
	
	// 生成 save 按钮的结构
	jqi_body_source_save			= $('<div class="xjDemo-body-source-exec xjDemo-body-source-save"></div>'									).appendTo(jqi_body_source);
	jqi_body_source_save_info		= $('<div class="xjDemo-body-source-exec-info"></div>'														).appendTo(jqi_body_source_save);
	jqi_body_source_save_info_back	= $('<div class="xjDemo-body-source-exec-info-back"></div></div>'											).appendTo(jqi_body_source_save_info);
	jqi_body_source_save_info_fore	= $('<div class="xjDemo-body-source-exec-info-fore">'+ i18n[lang].save[0] +'</div>'							).appendTo(jqi_body_source_save_info);
	jqi_body_source_save_icon		= $('<div class="xjDemo-body-source-exec-icon xjDemo-icon xjDemo-icon-save xj-ripple needsclick"></div>'	).appendTo(jqi_body_source_save);
	
	// jqi_body_source_save_icon 被点击后 tip 标签的颜色和文本将会有变化，但是当 tip 隐藏时就得进行恢复，所以监听 transitionend 事件处理
	// jQuery.fn.removeClass() 方法可以同时移除多个 className 的，只要使用空格将类名隔开就行，并且类名的先后顺序，对最终的结果并没有影响
	// Safari(MacOS) 的 transitionEnd 事件有问题，最终 opacity 的结果值并不是 0，而是 0.000...，所以得使用 slice() 切割后再 parseFloat()
	jqi_body_source_save_info.on(eve_transitionend, function(event){
		if(event.originalEvent.propertyName == 'opacity' && parseFloat(jqi_body_source_save_info.css('opacity').slice(0,4)) === 0){
			jqi_body_source_save.removeClass(cla_body_source_exec_done +' '+ cla_body_source_exec_fail);
			jqi_body_source_save_info_fore.text(i18n[lang].save[0]);
		};
	});
	
	// 移动端的 tip 用 click 来实现显示和隐藏，隐藏的条件是点击位置不是当前实例的 icon 按钮，tip 设置了 pointer-events:none 所以不算在内
	// 用 addEventListener() 方法绑定 touchstart 事件，是为了设置成 capture 模式，事件无法被阻止，但即使取消了 passive，重复点击也会报错
	// 重复点击的 error 是由于 fastClick 的存在，即使添加了 needsClick 也不能解决，但并不影响功能，所以这个 passive 的错误也只能随它去了
	if(pub_touchable === true){
		listener = function(event){
			if($(event.target).closest('.xjDemo-body-source-save')[0] !== jqi_body_source_save[0]){
				html[0].removeEventListener(eve_tapstart, listener, true);
				jqi_body_source_save.removeClass(cla_body_source_exec_tips);
			};
		};
		jqi_body_source_save_icon.click(function(){
			html[0].addEventListener(eve_tapstart, listener, true);
			jqi_body_source_save.addClass(cla_body_source_exec_tips);
		});
	}else{
		jqi_body_source_save_icon.mouseenter(function(){ jqi_body_source_save.addClass(cla_body_source_exec_tips) });
		jqi_body_source_save_icon.mouseleave(function(){ jqi_body_source_save.removeClass(cla_body_source_exec_tips) });
	};
	
	// fastClick 会影响点击下载，得添加 needsclick 类名以禁掉对 jqi_download_anchor 和 xjDemo-body-source-exec-icon 的影响，否则无法保存
	// jqi_download_anchor 加上 target="_blank" 属性，Safari(IOS) 会报 WebkitBlobResource 错误，改成其他值也无法解决，只能打开新页面查看
	// jqi_download_anchor 的点击，必须使用 Element.prototype.click() 方法，此时 event.trust === true，用 jQuery.fn.click() 方法将会无效
	jqi_body_source_save_icon.click(function(){
		
		// 初始化状态
		saveDone = false;
		
		// 获取要保存的文件内容
		saveText = jqi_body_source_wrap_code.text();
		saveText = (option.saveCallback === pub_nothing) ? saveText : option.saveCallback(saveText);
		
		// 用同个变量进行赋值，避免浪费内存
		pub_saveBlob = new Blob([saveText], {type:'text/csv'});
		
		// IE18- 使用 msSaveBlob() 方法，会返回布尔值
		try{
			if(navigator.msSaveBlob){ saveDone = navigator.msSaveBlob(pub_saveBlob, option.file) }
			if(saveDone === false){
				jqi_download_anchor.attr({href : URL.createObjectURL(pub_saveBlob)});
				jqi_download_anchor.attr({download : option.file});
				body.append(jqi_download_anchor);
				jqi_download_anchor[0].click();
				saveDone = true;
			};
		}catch(e){ saveDone = false }
		finally{ jqi_download_anchor.remove() };
		
		// 根据状态来设置
		if(saveDone === false){
			jqi_body_source_save_info_fore.text(i18n[lang].save[2]);
			jqi_body_source_save.addClass(cla_body_source_exec_fail);
		}else{
			jqi_body_source_save_info_fore.text(i18n[lang].save[1]);
			jqi_body_source_save.addClass(cla_body_source_exec_done);
		};
		
	});
	
})(pub_nothing, 'saveText', true); // (function(listener, saveText, saveDone){



// source 的 copy 复制
(function(listener, copyText, copyDone){
	
	// 没有 source 容器，或不需要复制，或是没 execCommand 方法，就直接返回
	if(option.source !== true || option.copy !== true){ return };
	if(document.execCommand === undefined){ return };

	// 在 pack 上添加 'xjDemo-body-source-copyable' 类名
	jqi_pack.addClass(cla_body_source_copyable);
	
	// 生成 copy 按钮的结构
	jqi_body_source_copy			= $('<div class="xjDemo-body-source-exec xjDemo-body-source-copy"></div>'									).appendTo(jqi_body_source);
	jqi_body_source_copy_info		= $('<div class="xjDemo-body-source-exec-info"></div>'														).appendTo(jqi_body_source_copy);
	jqi_body_source_copy_info_back	= $('<div class="xjDemo-body-source-exec-info-back"></div></div>'											).appendTo(jqi_body_source_copy_info);
	jqi_body_source_copy_info_fore	= $('<div class="xjDemo-body-source-exec-info-fore">'+ i18n[lang].copy[0] +'</div>'							).appendTo(jqi_body_source_copy_info);
	jqi_body_source_copy_icon		= $('<div class="xjDemo-body-source-exec-icon xjDemo-icon xjDemo-icon-copy xj-ripple needsclick"></div>'	).appendTo(jqi_body_source_copy);
	
	// jqi_body_source_copy_icon 被点击后 tip 标签的颜色和文本将会有变化，但是当 tip 隐藏时就得进行恢复，所以监听 transitionend 事件处理
	// jQuery.fn.removeClass() 方法可以同时移除多个 className 的，只要使用空格将类名隔开就行，并且类名的先后顺序，对最终的结果并没有影响
	// Safari(MacOS) 的 transitionEnd 事件有问题，最终 opacity 的结果值并不是 0，而是 0.000...，所以得使用 slice() 切割后再 parseFloat()
	jqi_body_source_copy_info.on(eve_transitionend, function(event){
		if(event.originalEvent.propertyName == 'opacity' && parseFloat(jqi_body_source_copy_info.css('opacity').slice(0,4)) === 0){
			jqi_body_source_copy.removeClass(cla_body_source_exec_done +' '+ cla_body_source_exec_fail);
			jqi_body_source_copy_info_fore.text(i18n[lang].copy[0]);
		};
	});
	
	// 移动端的 tip 用 click 来实现显示和隐藏，隐藏的条件是点击位置不是当前实例的 icon 按钮，tip 设置了 pointer-events:none 所以不算在内
	// 用 addEventListener() 方法绑定 touchstart 事件，是为了设置成 capture 模式，事件无法被阻止，但即使取消了 passive，重复点击也会报错
	// 重复点击的 error 是由于 fastClick 的存在，即使添加了 needsClick 也不能解决，但并不影响功能，所以这个 passive 的错误也只能随它去了
	if(pub_touchable === true){
		listener = function(event){
			if($(event.target).closest('.xjDemo-body-source-copy')[0] !== jqi_body_source_copy[0]){
				html[0].removeEventListener(eve_tapstart, listener, true);
				jqi_body_source_copy.removeClass(cla_body_source_exec_tips);
			};
		};
		jqi_body_source_copy_icon.click(function(){
			html[0].addEventListener(eve_tapstart, listener, true);
			jqi_body_source_copy.addClass(cla_body_source_exec_tips);
		});
	}else{
		jqi_body_source_copy_icon.mouseenter(function(){ jqi_body_source_copy.addClass(cla_body_source_exec_tips) });
		jqi_body_source_copy_icon.mouseleave(function(){ jqi_body_source_copy.removeClass(cla_body_source_exec_tips) });
	};
	
	// 将要被复制的内容放进 .jqi_copy_receptacle 标签，再写入到页面中，选中所有内容
	// 不直接用 self 的内容，是因为内容也可能被动态改变，所以还是得即时的去获取内容
	// if(document.queryCommandEnabled('copy')){} 的判断在 Safari(IOS) 中总通不过，只好不做这部分的校验了
	// 复制的参考：https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
	// 并不需要 focus()，就可以执行 select() 了，如果执行了 focus()，在 Safari(IOS) 中还会因为聚焦而出现屏幕放大的情况，反而会影响到操作
	// textarea 标签如果不设置 readOnly="readOnly"，就会出现复制时，小键盘弹起的问题，所以把这个属性一并加上，IOS11.4 和 12.1.1 测试通过
	jqi_body_source_copy_icon.click(function(){
		
		// 获取复制的内容
		copyText = jqi_body_source_wrap_code.text();
		copyText = (option.copyCallback === pub_nothing) ? copyText : option.copyCallback(copyText);
		
		// 插入复制的内容
		jqi_copy_receptacle.text(copyText);
		body.append(jqi_copy_receptacle);
		
		// 设置复制的选区
		if(pub_isIOS === false){ jqi_copy_receptacle[0].select() }
		else{ jqi_copy_receptacle[0].setSelectionRange(0, 999999999) };
		
		// 复制后删除节点
		try{ copyDone = document.execCommand('copy') }
		catch(error){ copyDone = false };
		jqi_copy_receptacle.remove();
		
		// 根据状态来设置
		if(copyDone === false){
			jqi_body_source_copy_info_fore.text(i18n[lang].copy[2]);
			jqi_body_source_copy.addClass(cla_body_source_exec_fail);
		}else{
			jqi_body_source_copy_info_fore.text(i18n[lang].copy[1]);
			jqi_body_source_copy.addClass(cla_body_source_exec_done);
		};
		
		// IE 在 document.execCommand('copy') 操作时会询问是否可访问剪切板，如果不允许则操作会返回 false，但就算允许访问剪切板也有问题
		// 弹窗会导致鼠标失焦，继而将导致 transitionend 事件先触发，然后就导致了当鼠标再挪到按钮上时，按钮依旧是 done 或者 fail 的状态
		// 得再触发一次 transitionend 事件才行，为了解决这个问题，判断 jqi_body_source_copy_info 的 opacity === '0'，就恢复 tip 的状态
		if(pub_isIE === true){
			if(parseFloat(jqi_body_source_copy_info.css('opacity').slice(0,4)) === 0){
				jqi_body_source_copy.removeClass(cla_body_source_exec_done +' '+ cla_body_source_exec_fail);
				jqi_body_source_copy_info_fore.text(i18n[lang].copy[0]);
			};
		};
		
	});
	
})(pub_nothing, 'copyText', true); // (function(listener, copyText, copyDone){



// ----------------------------------------------------------------



// jqi_pack 写入前回调
option.insertBefore(returnObject);

// jqi_pack 插入到页面
if(insertAction === 'after'){ jqi_pack.insertAfter(self) }
else if(insertAction === 'before'){ jqi_pack.insertBefore(self) }
else if(typeof(insertAction) === 'function'){ insertAction(returnObject) };

// 设置 source 的高亮
if(option.source === true){
	if(asyncLoadSource === false){ Prism.highlightElement(childNode[0], option.prismAsync, option.prismCallback) }
	else if(fileHighlight !== false){ Prism.plugins.fileHighlight.highlight(jqi_body_source[0]) }
	else{ Prism.plugins.jsonphighlight.highlight(jqi_body_source[0]) };
};

// 轮询判断是否高亮完
var finallyInterval = 0;
var fakeEnvironment = null;
finallyInterval = setInterval(function(){
	
	// 如果不需要生成 source 模块就销毁轮询并返回
	if(option.source !== true){ return clearInterval(finallyInterval) };
	
	// 如果异步则 code 节点缺失，得处理 code 节点
	if(fileHighlight !== false || jsonpHighlight !== false){
		
		// 如果还在加载中就直接返回，因为没有 code 节点，无法进行下一步
		if(cloneNode.attr('data-src-status') === 'loading' 
		|| cloneNode.attr('data-jsonp-status') === 'loading'){ return };
		
		// 不管成失，获取 File Highlight 或 JSONP Highlight 生成的 code
		childNode = jqi_body_source_wrap.children('code');
		
		// 异步失败不会触发 prism 的 hooks 回调，在这加上类名并手动回调
		if(cloneNode.attr('data-src-status') === 'failed' 
		|| cloneNode.attr('data-jsonp-status') === 'failed'){
			fakeEnvironment = {
				element : childNode[0], 
				code : childNode[0].textContent, 
				language : pub_getLangClass(cloneNode[0]), 
			};
			childNode.addClass('prism-highlighted');
			pub_prismCallbackFirst(fakeEnvironment);
			pub_prismCallbackFinal(fakeEnvironment);
		};
		
		// 尝试重新设置 code 节点的 style 和 class 属性，并重新定义变量
		if(jqi_body_source_wrap_code.attr('style') !== undefined){ childNode.attr('style', jqi_body_source_wrap_code.attr('style'))};
		childNode.attr('class', function(i, v){ return 'xjDemo-body-source-wrap-code ' + v });
		childNode.addClass(jqi_body_source_wrap_code.attr('class'));
		jqi_body_source_wrap_code = childNode;
		
	};
	
	// 如果不是异步，还没完成高亮操作，则直接跳过
	if(childNode.hasClass('prism-highlighted') === false ){ return };
	
	// 不为 ''，设置插件生成的 a 标签 target 属性
	if(anchorTarget !== ''){ $.each(childNode.find('a.token'), function(){ this.target = anchorTarget }) };
	
	// 执行 jqi_pack 节点插入后最终的安全回调函数
	option.insertAfter(returnObject);
	
	// 销毁当前这个 setInterval 轮询函数不再继续
	clearInterval(finallyInterval);
	
}, 250);

// 实例自我检测和销毁
var destroyInterval = 0;
if(option.autoDestroy !== -1){
	destroyInterval = setInterval(function(){
		if(body[0].contains(jqi_pack[0]) === false){
			returnObject.destroy(option.destroyTarget);
			clearInterval(destroyInterval);
		};
	}, option.autoDestroy);
};

// 移除 self 返回实例
if(option.autoRemove !== false){ self.remove() };
return pub_global.xj[pub_keyword].return[id] = returnObject;



}; // 主体函数结束



// $.xjDemo() 用于同时实例化所有目标节点，但排除那些已被实例化过的，返回一个返回值对象组成的数组
$.xjDemo = function(setting){
	
	// 合并传入的参数
	var option = Object.create(pub_option);
	if(setting){ $.extend(true, option, setting) };
	
	// 循环实例
	var result = [];
	$(option.selector).not('[xjDemoId]')
	.each(function(){ result.push( $(this).xjDemo(option) ) });
	
	// 返回
	return result;
	
};



// 还是得用 ready，否则提前引入插件就会导致自动化无效，至于说获取返回值，那也得在 ready 之后才行
(function(automatic){
	
	if(pub_option.manual !== false){ return };
	automatic = function(){ pub_autoExec = true; $.xjDemo(); pub_autoExec = false; };
	
	switch(pub_option.dispatchTime){
		case 'ready' : (($.isReady === true) ? automatic() : $(function(){ automatic() })); break;
		case 'load' : win.one('load', function(){ automatic() }); break;
		case 'now' : automatic(); break;
	};
	
})(pub_nothing);



})); // 插件结束


