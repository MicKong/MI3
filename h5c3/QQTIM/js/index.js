$(function () {
    /*
       staller插件使用步骤
       1.引入
       2.html结构 给需要滚动视差的模块加data-stellar-background-ratio="0.5"
            样式要加background-attachment: fixed;
       3.初始化插件
            初始化方法有两种,给某个元素,$("#someElement").stellar();
            全局,window对象,$.stellar();
     */
    $.stellar();
});