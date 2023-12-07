// ---------------------------------------------------------------------------------------------
// XJ 插件配置，需要在插件加载前设置，所以写在 IIFE 中而不是 Ready，并且该文件被放在最前面被加载
(function(){

// 创建全局容器对象
if(!window.xj){ xj = {} };

// xj.viewport
if(!xj.viewportConfig){ xj.viewportConfig = {} };
if(!xj.viewportOption){ xj.viewportOption = {} };
xj.viewportConfig['0.3.2'] = {};
xj.viewportOption['0.3.2'] = {};

// xj.storage
if(!xj.storageConfig){ xj.storageConfig = {} };
if(!xj.storageOption){ xj.storageOption = {} };
xj.storageConfig['0.2.2'] = {};
xj.storageOption['0.2.2'] = {};

// xj.operate
if(!xj.operateConfig){ xj.operateConfig = {} };
if(!xj.operateOption){ xj.operateOption = {} };
xj.operateConfig['0.6.0'] = {};
xj.operateOption['0.6.0'] = {};

// xj.ripple
if(!xj.rippleConfig){ xj.rippleConfig = {} };
if(!xj.rippleOption){ xj.rippleOption = {} };
xj.rippleConfig['0.5.0'] = { defaultSelector : '.xj-ripple, .xj-ripple-out, .xjButton, button, .button', };
xj.rippleOption['0.5.0'] = {};

// xj.focus
if(!xj.focusConfig){ xj.focusConfig = {} };
if(!xj.focusOption){ xj.focusOption = {} };
xj.focusConfig['0.4.0'] = {};
xj.focusOption['0.4.0'] = {};

// xj.base
if(!xj.baseConfig){ xj.baseConfig = {} };
if(!xj.baseOption){ xj.baseOption = {} };
xj.baseConfig['0.4.0'] = {};
xj.baseOption['0.4.0'] = {};

// xjArrive
if(!xj.Arrive){ xj.Arrive = {} };
if(!xj.Arrive.config){ xj.Arrive.config = {} };
if(!xj.Arrive.option){ xj.Arrive.option = {} };
xj.Arrive.config['0.3.2'] = {};
xj.Arrive.option['0.3.2'] = {};

// xjDemo
if(!xj.Demo){ xj.Demo = {} };
if(!xj.Demo.config){ xj.Demo.config = {} };
if(!xj.Demo.option){ xj.Demo.option = {} };
xj.Demo.config['0.1.0'] = {};
xj.Demo.option['0.1.0'] = { tab2space : (/MSIE|Trident|EDGE/i.test(navigator.userAgent) === true ? 4:0), };

// xjScroll
if(!xj.Scroll){ xj.Scroll = {} };
if(!xj.Scroll.config){ xj.Scroll.config = {} };
if(!xj.Scroll.option){ xj.Scroll.option = {} };
xj.Scroll.config['0.4.0'] = {};
xj.Scroll.option['0.4.0'] = {};

// xjDir
if(!xj.Dir){ xj.Dir = {} };
if(!xj.Dir.config){ xj.Dir.config = {} };
if(!xj.Dir.option){ xj.Dir.option = {} };
xj.Dir.config['0.2.0'] = {};
xj.Dir.option['0.2.0'] = {};

// xjButton
if(!xj.Button){ xj.Button = {} };
if(!xj.Button.config){ xj.Button.config = {} };
if(!xj.Button.option){ xj.Button.option = {} };
xj.Button.config['0.4.0'] = {};
xj.Button.option['0.4.0'] = {};

})();


