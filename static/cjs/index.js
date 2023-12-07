$(function(){



// 点击图片播放或暂停音乐
document.getElementById('mainPosterImg').addEventListener('click', function(e){
	var ele_mainPosterBgmAudio = document.getElementById('mainPosterBgmAudio');
	if(ele_mainPosterBgmAudio.paused){ ele_mainPosterBgmAudio.play() }
	else{ ele_mainPosterBgmAudio.pause() };
}, false);

// 点击按钮切换到下首音乐
(function(){
var canplay = false;
$('#mainPosterBgmShift').on('change', function(){
	$('#mainPosterBgmAudio').attr('src', './static/media/'+ this.value);
	if(canplay === false){ canplay = true; $('#mainPosterBgmAudio').on('canplay', function(){ this.play() }); };
});
})();



});


