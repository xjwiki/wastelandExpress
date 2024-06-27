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
// if($('.xjDir-active').length !== 0 && Element.prototype.scrollIntoViewIfNeeded !== undefined){
// 	$('.xjDir-active').last().get(0).scrollIntoViewIfNeeded();
// };

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
// 设置导航的滚动位置
let setDirPositionY = function(returnObject){
// 	let ss = xj.storage.sessionStorage, dirBottomPositionY = ss.get('dirBottomPositionY');
// 	// if(document.title === '废土快递攻略百科' || document.title === 'Dustland Delivery Guide Encyclopedia'){ return };
// 	if(dirBottomPositionY !== null){ returnObject.scrollY(returnObject.scrollHeight() - returnObject.clientHeight() - parseInt(dirBottomPositionY)) };
};

// 记住导航的底线位置
let getDirPositionY = function(returnObject){
// 	xj.storage.sessionStorage.set('dirBottomPositionY', (
// 	returnObject.scrollHeight() - returnObject.clientHeight() - returnObject.scrollY()));
};

// 现在导航的做法是固定底线, 但最终感觉还是不好, 因为看不到当前页的导航
// 所以还是把这个定位功能给取消掉了, 下面是实现底线定位的思路, 就留着吧
// 
// temp1.scrollHeight() // 1550
// temp1.clientHeight() // 1359
// temp1.maxScrollY() // 191
// 1550-1359=191
// 
// scrollHeight() = 总高
// clientHeight() = 内高
// 内高 - 80 = 视口高度
// 总高-内高=可滚动尺寸
// 
// temp1.scrollHeight() - temp1.clientHeight() - temp1.scrollY() // 135
// temp1.scrollHeight() - temp1.clientHeight() - 135 // 56
// temp1.scrollY() = 56



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
		ele_tbody_tr.sort(function(a, b){return sortMethod(type, a.cells[cellIndex].textContent !== '' ? a.cells[cellIndex].textContent : a.cells[cellIndex].innerHTML, 
		b.cells[cellIndex].textContent !== '' ? b.cells[cellIndex].textContent : b.cells[cellIndex].innerHTML)*flag }); // 排序
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



// ---------------------------------------------------------------------------------------------
// 表格排序功能的函数
var dirRepeatAnchor = $(/*html*/`
	
	<li class="xjDir-divide"></li>
	<li class="xjDir-spread">
		<a class="xj-ripple" href="javascript:void(0)"><i class="xjDir-icon fa fa-scroll"></i><i class="xjDir-text" style="line-height:18px;"><span style="letter-spacing:2px;">废土世界指南</span><small style="font-size:12px;">(废土大学肄业论文)</small></i><i class="xjDir-sign"></i></a>
		<ul>
			<li><a href="./废土人力学.html"><i class="xjDir-icon fa fa-people-group"></i>			<i class="xjDir-text"><span>废土人力学</span></i></a></li>
			<li><a href="./废土生存学.html"><i class="xjDir-icon fa fa-person-rifle"></i>			<i class="xjDir-text"><span>废土生存学</span></i></a></li>
			<li><a href="./废土经贸学.html"><i class="xjDir-icon fa fa-money-bill-trend-up"></i>	<i class="xjDir-text"><span>废土经贸学</span></i></a></li>
			<li><a href="./废土制造学.html"><i class="xjDir-icon fa fa-screwdriver-wrench"></i>		<i class="xjDir-text"><span>废土制造学</span></i></a></li>
			<li><a href="./废土土木学.html"><i class="xjDir-icon fa fa-building"></i>				<i class="xjDir-text"><span>废土土木学</span></i></a></li>
			<li><a href="./废土社会学.html"><i class="xjDir-icon fa fa-handshake-simple"></i>		<i class="xjDir-text"><span>废土社会学</span></i></a></li>
			<li><a href="./废土信息学.html"><i class="xjDir-icon fa fa-laptop-code"></i>			<i class="xjDir-text"><span>废土信息学</span></i></a></li>
			<!--◇
			<li><a href="./存档的修改.html"><i class="xjDir-icon fa fa-laptop-code"></i>			<i class="xjDir-text"><span>存档的修改</span></i></a></li>
			<li><a href="./模组的推介.html"><i class="xjDir-icon fa fa-laptop-code"></i>			<i class="xjDir-text"><span>模组的推介</span></i></a></li>
			<li><a href="./角色的传记.html"><i class="xjDir-icon fa fa-laptop-code"></i>			<i class="xjDir-text"><span>角色的传记</span></i></a></li>
			◇-->
		</ul>
	</li>
	
	<li class="xjDir-divide"></li>
	<li class="xjDir-spread">
		<a class="xj-ripple" href="javascript:void(0)"><i class="xjDir-icon fa fa-circle-info"></i><i class="xjDir-text">游戏数据</i><i class="xjDir-sign"></i></a>
		<ul>
			<li><a href="./角色列表.html"><i class="xjDir-icon fa fa-circle-user"></i>				<i class="xjDir-text"><span>角色列表</span></i></a></li>
			<li><a href="./人物特质.html"><i class="xjDir-icon fa fa-table-list"></i>				<i class="xjDir-text"><span>人物特质</span></i></a></li>
			<li><a href="./探险技能.html"><i class="xjDir-icon fa fa-star"></i>						<i class="xjDir-text"><span>探险技能</span></i></a></li>
			<li><a href="./随机姓名.html"><i class="xjDir-icon fa fa-tags"></i>						<i class="xjDir-text"><span>随机姓名</span></i></a></li>
			
			<li><a href="./物品信息.html"><i class="xjDir-icon fa fa-box"></i>						<i class="xjDir-text"><span>物品信息</span></i></a></li>
			<li><a href="./合成材料.html"><i class="xjDir-icon fa fa-recycle"></i>					<i class="xjDir-text"><span>合成材料</span></i></a></li>
			<li><a href="./卡车配件.html"><i class="xjDir-icon fa fa-gear"></i>						<i class="xjDir-text"><span>卡车配件</span></i></a></li>
			<li><a href="./武器装备.html"><i class="xjDir-icon fa fa-cubes"></i>					<i class="xjDir-text"><span>武器装备</span></i></a></li>
			
			<li><a href="./敌军情报.html"><i class="xjDir-icon fa fa-skull-crossbones"></i>			<i class="xjDir-text"><span>敌军情报</span></i></a></li>
			<li><a href="./遗迹详情.html"><i class="xjDir-icon fa fa-dungeon"></i>					<i class="xjDir-text"><span>遗迹详情</span></i></a></li>
			<li><a href="./地牢作战.html"><i class="xjDir-icon fa fa-explosion"></i>				<i class="xjDir-text"><span>地牢作战</span></i></a></li>
			<li><a href="./对话指引.html"><i class="xjDir-icon fa fa-comments"></i>					<i class="xjDir-text"><span>对话指引</span></i></a></li>
			
			<!--◇
			<li><a href="./成就系统.html"><i class="xjDir-icon fa fa-trophy"></i>					<i class="xjDir-text"><span>成就系统</span></i></a></li>
			◇-->
			
			<li><a href="./烹饪指南.html"><i class="xjDir-icon fa fa-kitchen-set"></i>				<i class="xjDir-text"><span>烹饪指南</span></i></a></li>
			<li><a href="./问题合集.html"><i class="xjDir-icon fa fa-circle-question"></i>			<i class="xjDir-text"><span>问题合集</span></i></a></li>
		</ul>
	</li>
	
	<li class="xjDir-divide"></li>
	<li class="xjDir-spread">
		<a class="xj-ripple" href="javascript:void(0)"><i class="xjDir-icon fa fa-book"></i><i class="xjDir-text">事件剧情</i><i class="xjDir-sign"></i></a>
		<ul>
			<li><a href="./事件剧情.01.工具事件.html"><i class="xjDir-icon fa fa-toolbox"></i>					<i class="xjDir-text"><span>工具事件</span></i></a></li>
			<li><a href="./事件剧情.02.行驶事件.html"><i class="xjDir-icon fa fa-truck-fast"></i>				<i class="xjDir-text"><span>行驶事件</span></i></a></li>
			<li><a href="./事件剧情.03.风尘丘陵.html"><i class="xjDir-icon fa fa-file-lines"></i>				<i class="xjDir-text"><span>风尘丘陵</span></i></a></li>
			<li><a href="./事件剧情.04.没落平原.html"><i class="xjDir-icon fa fa-file-lines"></i>				<i class="xjDir-text"><span>没落平原</span></i></a></li>
			<li class="xjDir-disabled"><a href="./事件剧情.05.暮色山谷.html"><i class="xjDir-icon fa fa-file-lines"></i>				<i class="xjDir-text"><span>暮色山谷(未完成)</span></i></a></li>
			<li class="xjDir-disabled"><a href="./事件剧情.06.死者国度.html"><i class="xjDir-icon fa fa-file-lines"></i>				<i class="xjDir-text"><span>死者国度(未完成)</span></i></a></li>
		</ul>
	</li>
	
	<li class="xjDir-divide"></li>
	<li class="xjDir-spread">
		<a class="xj-ripple" href="javascript:void(0)"><i class="xjDir-icon fa fa-link"></i><i class="xjDir-text">外部链接</i><i class="xjDir-sign"></i></a>
		<ul>
			<li><a target="_blank" href="https://store.steampowered.com/app/1831250/WasteLand_Express/">		<i class="xjDir-icon fa-brands fa-steam"></i>			<i class="xjDir-text"><span>蒸汽官方页面</span></i></a></li>
			<li><a target="_blank" href="https://github.com/xjwiki/wastelandExpress/blob/master/upgrade.md">	<i class="xjDir-icon fa fa-clock-rotate-left"></i>		<i class="xjDir-text"><span>本站更新记录</span></i></a></li>
			<li><a target="_blank" href="https://github.com/xjwiki/wastelandExpress/releases">					<i class="xjDir-icon fa fa-download"></i>				<i class="xjDir-text"><span>离线攻略下载</span></i></a></li>
		</ul>
	</li>
	
	<li class="xjDir-divide"></li>
	<li class="xjDir-spread">
		<a class="xj-ripple" href="javascript:void(0)"><i class="xjDir-icon fa fa-wrench"></i><i class="xjDir-text">在线工具</i><i class="xjDir-sign"></i></a>
		<ul>
			<li><a target="_blank" href="./图01没落平原地图查找工具.html">										<i class="xjDir-icon fa fa-location-dot"></i>			<i class="xjDir-text"><span>没落平原查找工具</span></i></a></li>
			<li><a target="_blank" href="./图02暮色山谷地图查找工具.html">										<i class="xjDir-icon fa fa-location-dot"></i>			<i class="xjDir-text"><span>暮色山谷查找工具</span></i></a></li>
		</ul>
	</li>
	
`);


