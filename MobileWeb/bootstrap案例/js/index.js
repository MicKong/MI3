$(function () {
    /* 动态轮播图
       1.获取轮播图数据
       2.根据数据动态渲染
         2.1准备数据
         2.2把数据转换成html格式的字符串(有几种方式:动态创建元素、字符串拼接、模版引擎)
         2.3把字符渲染页面中
       3.测试功能*/

    initMobileTab();
    // 初始化工具提示
    $("[data-toggle='tooltip']").tooltip(); //属性选择器
});

var startX = 0;
var distanceX = 0;
var isMove = false;
$(".wjs_banner").on("touchstart", function (e) {
    startX = e.originalEvent.touches[0].clientX;
}).on("touchmove", function (e) {
    var moveX = e.originalEvent.touches[0].clientX;
    distanceX = moveX - startX;
    isMove = true;
}).on("touchend", function (e) {
    if (isMove && Math.abs(distanceX) > 50) {
        if (distanceX < 0) {  //左滑,下一张
            $(".carousel").carousel("next");
        } else {
            $(".carousel").carousel("prev");
        }
    }
});

// 实现产品区域页签在移动端滑动
var initMobileTab = function () {
    // 1.解决换行问题
    var $navTabs = $(".wjs_product .nav-tabs");
    var width = 0;
    $navTabs.find("li").each(function (i, item) {
        var $li = $(this);//$(item)
        width += $li.outerWidth(true);
        /*width: content
          innerWidth:content+padding
          outerWidth:content+padding+border
          outerWidth(true):content+padding+border+margin*/
    });
    $navTabs.width(width);

    // 2.修改结构编程区域滑动的结构,加一个父容器
    // 3.自己实现滑动效果或使用iScroll

    new IScroll($(".nab-tabs-parent")[0], {
        scrollX: true,
        scrollY: false,
        click:true
    });
};
