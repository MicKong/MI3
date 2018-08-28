$(function () {
    /*手势切换轮播图
     * 1.自动轮播 无缝
     * 2.点随着变化
     * 3.完成手势切换
     */
    var $banner = $(".sn_banner");
    var width = $banner.width();

    var $imageBox = $banner.find("ul:first-child"); //jq的扩展选择器,需要引入zepto的selector.js
    var $pointBox = $banner.find("ul:last-child");
    var $points = $pointBox.find("li");

    //1.自动轮播 无缝
    var index = 1;
    setInterval(function () {
        index++;
        // 动画
        bannerAnimate();

    }, 1500);

    // 3.完成手势切换
    // 左滑手势下一张,左滑事件swipeLeft
    $banner.on("swipeLeft", function () {
        clearInterval(timeId);
        index++;
        bannerAnimate();  //如果想完美一些,可以把定时器也清下
    });

    //右滑手势上一张,右滑事件swipeRight
    $banner.on("swipeRight", function () {
        index--;
        bannerAnimate();
    });

    function bannerAnimate() {
        $imageBox.animate({transform: "translateX(" + (-index * width) + "px)"}, 300, "linear", function () {
            // 动画执行完成的回调
            if (index > 8) {
                index = 1;
                // 瞬间
                $imageBox.css({transform: "translateX(" + (-index * width) + "px)"});
            } else if (index <= 0) {  //手势左滑时也要确保左边有图片
                index = 8;
                // 瞬间
                $imageBox.css({transform: "translateX(" + (-index * width) + "px)"});
            }

            // 2.点随着变化,index的取值控制在1~8
            $points.removeClass("now").eq(index - 1).addClass("now");
        });

    }


});




