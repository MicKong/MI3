/*1.设置背景颜色图片等css也能做到,但fullpage将这些封装成了属性,所以可用其配置参数
    *2.sectionsColor属性,设置每个屏幕的背景颜色
    *3.verticalCentered属性,设置屏幕内容的对齐方式,默认是垂直居中
    *4.navigation属性,设置导航,点容器
    *5.afterLoad方法,监听进入某一屏的时候,回调
    */
$(".container").fullpage({ //jq入口函数,初始化fullpage组件
    //配置参数
    sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],

    verticalCentered: false,

    navigation: true,

    //进入某页面的时候触发
    afterLoad: function (link, index) { //index为屏幕索引,从1开始
        $(".section").eq(index - 1).addClass("now");
        if(index == 8) {
            $(".more").css("opacity","0");
        }else{
            $(".more").css("opacity","1");
        }

    },

    //离开某页面的时候触发
    onLeave: function (index, nextIndex) { //离开的页面的索引,下一页面的索引,方向判断是向上还是向下滚动
        var currentSection = $(".section").eq(index - 1);

        if (index == 2 && nextIndex == 3) {
            currentSection.addClass("leaved");
        }else if(index == 3 && nextIndex == 4){
            currentSection.addClass("leaved");
        }else if(index == 5 && nextIndex == 6) {
            currentSection.addClass("leaved");
            $(".screen06 .box").addClass("show");
        }else if(index == 6 && nextIndex == 7) {
            //当从第六屏到第七屏
           $(".screen07 .star img").each(function (index,element) {

               $(".screen07 .text").addClass("show");

               $(this).delay(index * 0.5 * 1000).fadeIn();

               /*如果用c3方式实现,则
                .screen07 .star img{
                    transition:all 1s linear 0s;
                }
                然后用jq来改变延时值

                $(this).css("transtion-dely",index * 0.5 + "s");
                */
           });
        }
    },

    //最好在组件初始化完毕或插件内容渲染完毕再绑定事件
    afterRender: function () {
        $(".more").on("click", function () {
            //this是被点击的a标签,所以没有api里的moveSectionDown方法
            //点击“更多”,跳到下一页,调用插件里的方法
            $.fn.fullpage.moveSectionDown();
        });

        //当第四屏的购物车动画结束后再执行收货地址的动画
        $(".screen04 .cart").on("transitionend", function () {
            $(".screen04 .address").show().find("img:last").fadeIn(1500); //地址的显示可用css也可用js
            $(".screen04 .text").addClass("show");
            //:last为jq选择器,此外还有:first,:visible,:hidden,:checked等
            // $(".screen04 .address img:last-child").fadeIn(500);
        });
        /*$(".screen04.now .cart")应该把now去掉,因为now是动态添加的,所以绑定事件时还没有now的存在*/


        $(".screen08").on("mousemove",function (e) {
            $(this).find(".hand").css({
                left: e.clientX,
                top: e.clientY
            });
        });
        // $(".screen08 .hand").on("mousemove",function (e) {
        //     $(this).css({
        //         left: e.clientX,
        //         top: e.clientY
        //     });
        // });
        //为什么用$(".screen08 .hand")不行????????????



        $(".again").on("click", function () {
            // location.reload();

            $(".now,.leaved,.show").removeClass("now").removeClass("leaved").removeClass("show");
            $(".content [style]").removeAttr("style");
            $.fn.fullpage.moveTo(1);
            /*
               点击再来一次重置动画
               动画是如何进行的？
               1.加now类
               2.加leaved类
               3.加show类
               这三点可用$(".now,.leaved,.show").removeClass("now").removeClass("leaved").removeClass("show");
               的方式清除

               而
               1.加css属性,结果会在标签产生一个style属性
               2.用jq方法,show()fadeIn()等,结果也会加一个style属性,
               这两点可用$(".content [style]").removeAttr("style");来清除
               .content保证是我们自己添加的样式,[style]为没有等号的属性选择器

               清除了所有属性后跳回到第一页即可
               $.fn.fullpage.moveTo(1);

            */
        });


    },

    scrollingSpeed:1000,  //鼠标滚动(页面切换)速度,默认为700ms

});
