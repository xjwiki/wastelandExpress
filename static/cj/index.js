$(function(){



var jqi_win = $(window);
var jqi_doc = $(document);

var xjls = xj.storage.localStorage;
var xjss = xj.storage.sessionStorage;

var jqi_xjDir01 = $('#xjDir01');
var xjDir01Return = xj.Dir.return[jqi_xjDir01.attr('xjDirId')];

var jqi_xjScroll01 = $('#xjScroll01');
var xjScroll01Return = xj.Scroll.return[jqi_xjScroll01.attr('xjScrollId')];



// ---------------------------------------------------------------------------------------------

// 使用 JS，动态生成 xjZone 其他插件的结构和链接
// html 工整些但不利于 SEO，不过文档的玩意无所谓
// $('#xjDir01_ul02').html(
// 	'<li><a target="_blank" href="https://github.com/xjZone/xj.viewport">'+
// 		'<i class="xjDir-icon fas fa-tablet-screen-button"></i>'+
// 		'<i class="xjDir-text"><span>xj.viewport    </span></i>'+
// 	'</a></li>' + 
// 	'<li><a target="_blank" href="https://github.com/xjZone/xj.storage" >'+
// 		'<i class="xjDir-icon fas fa-database"            ></i>'+
// 		'<i class="xjDir-text"><span>xj.storage     </span></i>'+
// 	'</a></li>' + 
// 	'<li><a target="_blank" href="https://github.com/xjZone/xj.operate" >'+
// 		'<i class="xjDir-icon fas fa-arrow-pointer"       ></i>'+
// 		'<i class="xjDir-text"><span>xj.operate     </span></i>'+
// 	'</a></li>' + 
// 	'<li><a target="_blank" href="https://github.com/xjZone/xj.ripple"  >'+
// 		'<i class="xjDir-icon fas fa-circle-dot"          ></i>'+
// 		'<i class="xjDir-text"><span>xj.ripple      </span></i>'+
// 	'</a></li>' + 
// 	'<li><a target="_blank" href="https://github.com/xjZone/xj.focus"   >'+
// 		'<i class="xjDir-icon fas fa-arrows-to-dot"       ></i>'+
// 		'<i class="xjDir-text"><span>xj.focus       </span></i>'+
// 	'</a></li>'
// );



// ---------------------------------------------------------------------------------------------

// xjDemo 实例化有延迟，将导致刷新后滚动定位不准
// 如果没 hash，就使用 localStorage 保存的值定位
var hashValue = decodeURIComponent(location.hash);
hashValue = hashValue.slice(1);
if(hashValue === ''){
	var LastScrollLeft = xjls.get('xj_viewport_index_LastScrollLeft');
	var LastScrollTop  = xjls.get('xj_viewport_index_LastScrollTop' );
	if(LastScrollLeft !== null){ jqi_win.scrollLeft(LastScrollLeft) };
	if(LastScrollTop  !== null){ jqi_win.scrollTop(LastScrollTop  ) };
};

// 监听 scroll & hashchange 事件，防抖避免太频繁
// localStorage 记下当前滚动位置，刷新定位用得着
var scrollTimeout01 = undefined;
jqi_win.on('scroll hashchange', function(){
	clearTimeout(scrollTimeout01);
	scrollTimeout01 = setTimeout(function(){
		xjls.set('xj_viewport_index_LastScrollLeft', jqi_win.scrollLeft());
		xjls.set('xj_viewport_index_LastScrollTop',  jqi_win.scrollTop() );
	}, 250);
});



// ---------------------------------------------------------------------------------------------

// 将现有 H1 ~ H6 提取做成对应父子层级的数组结构
// https://stackoverflow.com/a/73128422/8079246/
// 如果 container 没 h1 则 h2 会成为一级的子元素
// 层级顺序不对，如 h1 后是 h3，则 h3 会在 h1 中
var createHeadTree = function(container){
	
	// 选择器去掉 h1，则数组就会以 h2 为顶层元素
	var ele_heads = container.querySelectorAll('h1,h2, h3,h4, h5,h6');
	var stack = [{name:'H0', children:[], }];
	Array.prototype.slice.apply(ele_heads).forEach(function(ele_head){
		
		// 创建 node 并获取 stack 最后那元素对象
		var node = {name:ele_head.tagName, node:ele_head, };
		var last = stack.slice(-1)[0];
		
		// pop( ) 会改变原数组，删除并返回尾元素
		while(last.name >= node.name){
			stack.pop();
			last = stack.slice(-1)[0];
		};
		
		// 没 children 就创建，当前 node 既添加到 last.children 和 stack 中去
		if(last.children === undefined){ last.children = [] };
		last.children.push(node);
		stack.push(node);
		
	});
	return stack[0].children;
	
};

// 将 pub_main 的 head 文本转 id，但空格替换为 _
// 实际上可能还存在其他 url 非法文本，遇到再说吧
var jqi_heads = $('#pub_main').find('h2,h3,h4,h5,h6');
jqi_heads.each(function(){ this.id = this.textContent.replace(/\s/g, '_') });

// 自动添加前缀数值如 01，但还是不要多事会更好吧
// 还是得根据实际 textContent 生成，否则不好控制
// jqi_heads.each(function(index, value){
// 	index = index + 1;
// 	if(index < 10){ index = '0' + index };
// 	value.textContent = index+'. '+value.textContent;
// 	value.id = value.textContent.replace(/\s/g, '_');
// });

// 用 pub_main 的 head 生成 xjDir 导航的 li 标签
// 将 li 标签结构写到 jqi_xjDir01_ul01，并初始化
var xjDirListHtml = '';
var createDirList = function(obj_head){
	return ('<li'+ (obj_head.children ? ' class="xjDir-spread"':'') +'><a href="#'+ obj_head.node.id +'">' +
	'<i class="xjDir-text"><span style="letter-spacing:0px;">'+ obj_head.node.textContent +'</span></i></a>'
		+(function(){
			if(obj_head.children === undefined){ return '' };
			return (
				'<a href="javascript:void(0)"><i class="xjDir-sign"></i></a><ul>'
					+(function(){
						var string = '';
						obj_head.children.forEach(
						function(object){ string += createDirList(object) });
						return (string);
					})()+
				'</ul>'
			);
		})()+
	'</li>');
};
createHeadTree(document.getElementById('pub_main')).forEach(function(
obj_head){ xjDirListHtml += createDirList(obj_head) });
var jqi_xjDir01_ul01 = $('#xjDir01_ul01');
jqi_xjDir01_ul01.html(xjDirListHtml);
xjDir01Return.reinit();

// 有 hash 值则定位并选中 xjDir 中对应的 li 节点
// hash 做 id 可能引发 BUG，所以放 try…catch 中
setTimeout(function(){

try{ if(hashValue !== ''){
	$('[id="'+ hashValue +'"]').xjArrive([0, -80], 250, 'swing');
	jqi_xjDir01_ul01.find('a[href="#'+ hashValue +'"]')
	.parent('li').addClass('xjDir-active');
}; }catch(error){};

// 导航滚动定位到 最后那个 xjDir-active 的位置去
// xjScroll 的定位目前还有 BUG，只能用原生的方法
// if($('.xjDir-active').length !== 0){
// 	xj.Scroll.return[$('#xjScroll01').attr('xjScrollId')].
// scrollIn({target:$('.xjDir-active').last(), axis:'y'});
// };
if($('.xjDir-active').length !== 0 && Element.prototype.scrollIntoViewIfNeeded !== undefined){
	$('.xjDir-active').last().get(0).scrollIntoViewIfNeeded();
};

}, 100);

// 阻止 jqi_xjDir01_ul01 中 a 默认事件，改为定位
// id 中可能存在非法符号，得使用属性选择器来选择
jqi_xjDir01_ul01.find('li > a:first-child').on('click', function(e){
	e.preventDefault();
	var id = this.getAttribute('href').slice(1);
	$('[id="'+ id +'"]').xjArrive([0,-80], 250);
	location.hash = id;
});

// 点击 xjDir 最顶部的标题，会清空 hash 回到顶部
// 用 pushState 因为 location.hash = '' 会残留 #
$('#xjDir01_back_start_point').click(function(){
	history.pushState({state : ''}, '', location.pathname);
	$(document.scrollingElement).stop().animate({scrollTop:0}, 250);
});

// 括号（...）内容会显得很冗余，只好先将其删掉了
jqi_xjDir01_ul01.find('> li > a > .xjDir-text > span').each(function(index, element){
	$(element).html( $(element).text().replace(/(（.+?）)/, '') )
	// $(element).parent().append('<small style="">'+ RegExp.$1 +'</small>');
});



// ---------------------------------------------------------------------------------------------

// 获取 head 标签的 scrollTop 既所在位置来成数组
// 窗口宽度的改变会影响布局，所以还得监听 resize
var headsScrollTopArray = [];
var headsScrollTopArrayGet = function(){
	headsScrollTopArray = [];
	jqi_heads.each(function(i,ele_head){
		headsScrollTopArray.push($(ele_head).offset().top);
	});
};
headsScrollTopArrayGet();
// 延迟执行避免渲染迟缓导致获取 heading 位置出错
setTimeout(function(){ headsScrollTopArrayGet() }, 1000);
jqi_win.on('resize', function(event){ headsScrollTopArrayGet() });

// 监听全局的滚动和重置，以同步导航列表的 active
// 这里也需要防抖，用倒循环判断是否到达了目标 li
var jqi_xjDir01_ul01_list = jqi_xjDir01_ul01.find('li');
var scrollTimeout02 = void 0, hasActive = false;
jqi_win.on('scroll resize', function(){
	
	clearTimeout(scrollTimeout02);
	scrollTimeout02 = setTimeout(function(){
		var scrollTop = document.scrollingElement.scrollTop;
		for(var i = headsScrollTopArray.length - 1; i>=0; i--){
			if(headsScrollTopArray[i] - 100 <= scrollTop){
				xjDir01Return.active(jqi_xjDir01_ul01_list[i], true);
				hasActive = true;
				break;
			};
		};
		if(hasActive){ hasActive = false }
		else{ jqi_xjDir01_ul01_list.removeClass('xjDir-active') };
	}, 250);
	
});



// ---------------------------------------------------------------------------------------------

// 用 window.matchMedia() 判断窗口宽度以控制侧边
// 点击按钮展展开 xjDir 而点击遮罩或 li 则是关闭
var jqi_pub_side = $('#pub_side');
jqi_win.on('resize', function(){ if(window.matchMedia(
'(min-width:1024px)').matches){ jqi_pub_side.removeClass('pub_sideShow') } });
$('#pub_toolSwitchDir').on('click', function(){ jqi_pub_side.addClass('pub_sideShow') });
$('#pub_sideMask').on('click', function(){ jqi_pub_side.removeClass('pub_sideShow') });
jqi_xjDir01_ul01.on('click', function(){ jqi_pub_side.removeClass('pub_sideShow') });

// 点击右下角的按钮返回顶部，这里不能用 xjArrive
// 因为顶部的 head 可能是 position:fixed; 定位的
$('#pub_toolBackToTop').on('click', function(e){
$(document.scrollingElement).stop().animate({scrollTop:0}, 250) });



// ---------------------------------------------------------------------------------------------

// 阻止 #pub_main 中锚点的默认事件，改为滚动定位
// id 中可能存在非法符号，得使用属性选择器来选择
$('#pub_main').on('click', 'a', function(e){
	
	var id = e.currentTarget.getAttribute('href');
	if(/^#/.test(id) === false){ return }
	else{ id = id.slice(1) };
	
	var jqi_idNode = $('[id="'+ id +'"]');
	if(jqi_idNode.length !== 0){
		e.preventDefault();
		jqi_idNode.xjArrive([0,-80], 250);
		location.hash = id;
	};
	
});



});


