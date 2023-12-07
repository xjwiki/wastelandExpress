$(function(){



// ---------------------------------------------------------------------------------------------

var pub_win = window, pub_doc = document;
var pub_html = document.documentElement, pub_body = document.body;
var jqi_win = $(pub_win), jqi_doc = $(pub_doc), jqi_html = $(pub_html), jqi_body = $(pub_body);

// var xjls = xj.storage.localStorage;
// var xjss = xj.storage.sessionStorage;

// var jqi_xjDir01 = $('#xjDir01');
// var xjDir01Return = xj.Dir.return[jqi_xjDir01.attr('xjDirId')];

// var jqi_xjScroll01 = $('#xjScroll01');
// var xjScroll01Return = xj.Scroll.return[jqi_xjScroll01.attr('xjScrollId')];



// ---------------------------------------------------------------------------------------------

// 窗口宽度尺寸小于 1284 就取消 body 的渐变背景.
// 避免阴影出现在 head 和 main 和 foot 的间隙里.
let hiddenShadow = function(){ pub_body.style.backgroundImage = (pub_html.clientWidth <= 1284) ? 'none' : '' };
jqi_win.on('resize', function(){ hiddenShadow() });
hiddenShadow();



// ---------------------------------------------------------------------------------------------

// 导航滚动定位到最后那个 .xjDir-active 的位置去
// xjScroll 的定位目前还有 BUG, 只能用原生的方法
if($('.xjDir-active').length !== 0 && Element.prototype.scrollIntoViewIfNeeded !== undefined){
	$('.xjDir-active').last().get(0).scrollIntoViewIfNeeded();
};

// 有 hash 值则定位并选中 xjDir 中对应的 li 节点
// hash 做 id 可能引发 BUG, 所以放 try…catch 中
var hashValue = decodeURIComponent(location.hash).slice(1);
try{ if(hashValue !== ''){
	$('[id="'+ hashValue +'"]').xjArrive([0, -80], 250, 'swing');
	$('#xjDir01').find('a[href="#'+ hashValue +'"]')
	.parent('li').addClass('xjDir-active');
} }catch(error){};

// 阻止 jqi_xjDir01 导航中, a 默认事件, 改为定位
// id 中可能存在非法符号, 得使用属性选择器来选择
$('#xjDir01_ul01>li>a').on('click', function(e){
	e.preventDefault();
	var id = this.getAttribute('href').slice(1);
	$('[id="'+ id +'"]').xjArrive([0,-80], 250);
	location.hash = id;
});

// 用 window.matchMedia() 判断窗口宽度以控制侧边
// 点击按钮展开 xjDir 而点击遮罩或者 li 则是关闭

var jqi_pub_side = $('#pub_side');
jqi_win.on('resize', function(){ if(window.matchMedia(
'(min-width:1024px)').matches){ jqi_pub_side.removeClass('pub_sideShow') } });

$('#pub_toolSwitchDir').on('click', function(){ jqi_pub_side.addClass('pub_sideShow') });
$('#pub_sideMask').on('click', function(){ jqi_pub_side.removeClass('pub_sideShow') });

$('#xjDir01').on('click', function(event){
	if($(event.target).closest('a[href="javascript:void(0)"]')
	.length === 0){ jqi_pub_side.removeClass('pub_sideShow') };
});



// ---------------------------------------------------------------------------------------------

// 阻止 #pub_main 中锚点的默认事件, 改为滚动定位
// id 中可能存在非法符号, 得使用属性选择器来选择
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



// ---------------------------------------------------------------------------------------------

// 点击右下角的按钮返回顶部, 这里不能用 xjArrive
// 因为顶部的 head 可能是 position:fixed; 定位的
$('#pub_toolBackToTop').on('click', function(e){
$(document.scrollingElement).stop().animate({scrollTop:0}, 250) });



});



// ---------------------------------------------------------------------------------------------
// 表格排序功能的函数
var buildPowerTable = function(tableID){
	
	// 获取相关的节点元素
	var ele_table = document.getElementById(tableID);
	var ele_thead = ele_table.querySelector('thead');
	var ele_tbody = ele_table.querySelector('tbody');
	var ele_thead_th = Array.prototype.slice.apply(ele_thead.querySelectorAll('th'));
	var ele_tbody_tr = Array.prototype.slice.apply(ele_tbody.querySelectorAll('tr'));
	
	var ele_thead_th_icon = ele_thead_th.map(
	function(ele_th){ return ele_th.querySelector('i.icon.fa') });
	var ele_originalSort_th = ele_thead_th[ ele_table.getAttribute('originalSort') ];
	
	// 定义排序方法
	function sortMethod(type, a, b){
		switch(type){
			
			// 面对字符串直接本地化比对后排序即可
			// case 'number' : { return a - b }; break;
			case 'string' : { return a.localeCompare(b) }; break;
			
			// 当遭遇 a 或 b 不为数值, 则将其视为大于所有的数值
			case 'number' : { if(isNaN(Number(a))){ return 1 }else 
				if(isNaN(Number(b))){ return -1 }
				else{ return a - b };
			}; break;
			
			// 日期排序, 因为 IE 始终无法处理 '2012-12-12' 这种格式的时间, 所以这里得将 '-' 替换成 '/'
			case 'dateTime' : { return new Date(a.split('-').join('/')).getTime() - 
			new Date(b.split('-').join('/')).getTime(); }; break;
			
			// 针对 '500 ~ 2000' 这种范围数的排序
			case 'numberRange' : {
				if(a.split(' ~ ')[0] === b.split(' ~ ')[0]){ return a.split(' ~ ')[1] - b.split(' ~ ')[1] }
				else{ return a.split(' ~ ')[0] - b.split(' ~ ')[0] };
			}; break;
		};
	};
	
	// 定义排序操作
	function sortHandle(type, flag, cellIndex){
		ele_tbody_tr.sort(function(a, b){return sortMethod(type, 
		a.cells[cellIndex].textContent, b.cells[cellIndex].textContent)*flag }); // 排序
		ele_tbody_tr.forEach(function(ele_tr){ ele_tbody.appendChild(ele_tr) }); // 添加
	};
	
	// 实行排序操作
	ele_thead_th.forEach(function(ele_th){
		ele_th.addEventListener('click', function(){
			
			// 获取排序类型
			var sortType = ele_th.getAttribute('sortType');
			if(Boolean(sortType) === false){ sortType = 'string' };
			
			// 获取设置了图标的 th > i 节点
			var ele_upIcon = ele_thead.querySelector('.fa-sort-up');
			var ele_downIcon = ele_thead.querySelector('.fa-sort-down');
			if(ele_upIcon){ ele_upIcon.classList.remove('fa-sort-up') };
			if(ele_downIcon){ ele_downIcon.classList.remove('fa-sort-down') };
			ele_thead_th_icon.forEach(function(i){ i.classList.add('fa-sort') });
			
			// 如果是第三次点击了, 则恢复原始排序并终止
			if(ele_th.sortFlag === -1){
				sortHandle(ele_originalSort_th.hasAttribute('sortType') ? ele_originalSort_th.getAttribute('sortType') : 'string', 1, ele_originalSort_th.cellIndex);
				ele_thead_th.forEach(function(ele_th){ delete ele_th.sortFlag });
				return;
			};
			
			// 确定升序降序, 删掉其他 th 排序属性, 排序
			if(ele_th.sortFlag === undefined){ ele_th.sortFlag = 1 }else if(ele_th.sortFlag === 1){ ele_th.sortFlag = -1 };
			ele_thead_th.forEach(function(node){ if(node !== ele_th){ delete node.sortFlag } });
			sortHandle(sortType, ele_th.sortFlag, ele_th.cellIndex);
			
			// 设置升序或降序的排序小三角图标
			ele_th.querySelector('.icon').classList.remove('fa-sort');
			ele_th.querySelector('.icon').classList.add(ele_th.sortFlag === 1 ? 'fa-sort-up' : 'fa-sort-down');
			
		}, false);
	});
	
	// 返回当前表格
	return ele_table;
	
};


