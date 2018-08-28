window.onload = function () {
    // 顶部搜索
    search();

    // 轮播图
    banner();

    // 倒计时
    downTime();
};

var search = function () {
    /*
     1.默认固定顶部透明背景
     2.当页面滚动时随着页面卷曲的距离而改变
     3.页面滚动超过某一个高度时透明度不变
     */
    var searchBox = document.querySelector(".jd_search_box");
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;

    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;
        console.log(scrollTop, height);
        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = "rgba(201,21,35," + opacity + ")";
    }


};

var banner = function () {
    /*1.自动轮播且无缝  定时器和过渡
      2.点随着图片轮播改变  根据索引切换
      3.滑动效果  利用touch事件完成
      4.滑动结束时如果,若滑动距离不超过屏幕的1/3,则吸附回去   过渡
      5.滑动结束时,若滑动距离超过屏幕的1/3,切换上一张或下一张   根据滑动方向加过渡
     */
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imageBox = banner.querySelector("ul:first-child");
    var pointBox = banner.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");

    var index = 0;
    var timeId = setInterval(function () {
        index++;

        addTransition();

        setTranslateX(-index * width);

    }, 1500);


    //需要等最后一张动画结束后去判断,是否瞬间定位到第一张
    imageBox.addEventListener("transitionend", function () {
        // 自动滚动的无缝
        if (index >= 9) {
            index = 1;
            // 清过渡
            removeTransition();

            // 做位移,瞬间定位
            setTranslateX(-index * width);

        } else if (index <= 0) {  //滑动的时候也需要无缝
            index = 8;
            removeTransition();

            setTranslateX(-index * width);
        }

        //点随着轮播改变,要让图片完全切换好才改变点,所以也写在transitionend里
        //此时此刻index的取值范围1-8,但点取值要是0-7才行
        for (var i = 0; i < points.length; i++) {
            points[i].removeAttribute("class");
            // points[i].classList.remove("now");
        }
        points[index - 1].className = "now";
        console.log(index - 1);
        // point[index - 1].classList.add("now");
    });

    var startX = 0;
    var isMove = false; //为了健壮性
    imageBox.addEventListener("touchstart", function (e) {
        console.log("88888");
        clearInterval(timeId);
        startX = e.touches[0].clientX; //记录起始位置x坐标
    });

    var distanceX = 0;
    imageBox.addEventListener("touchmove", function (e) {
        var moveX = e.touches[0].clientX;  //记录滑动过程中x坐标

        distanceX = moveX - startX;   //计算目标元素的位移

        // 元素将要的定位 = 当前定位+手指移动的距离
        var translateX = -index * width + distanceX;

        //滑动,元素随着手指的滑动做位置的改变,先要清过渡
        console.log(translateX);
        removeTransition();
        setTranslateX(translateX);

        /*只有touchmove事件触发是才去执行touchend里的内容,只有真的滑动了才能吸附和切换*/
        isMove = true;
    });

    imageBox.addEventListener("touchend", function () {
        //4、5点的功能
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) { //吸附
                addTransition();
                setTranslateX(-index * width);
            } else { //切换

                if (distanceX > 0) {    //左滑 上一张
                    index--;
                } else {
                    index++;    //右滑 下一张
                }
                addTransition();
                setTranslateX(-index * width);
            }
        }

        //最好将参数重置
        startX = 0;
        distanceX = 0;
        isMove = false;

        //加上定时器,为了严谨再清一次定时器
        clearInterval(timeId);
        timeId = setInterval(function () {
            index++;

            addTransition();

            setTranslateX(-index * width);

        }, 1500);

    });


    //加过渡的函数
    function addTransition() {
        imageBox.style.transition = "all 0.1s linear";
        imageBox.style.webketTransition = "all 0.1s linear";
    }

    //做位移的函数
    function setTranslateX(x) {
        imageBox.style.transform = "translateX(" + x + "px)";
        imageBox.style.webketTransition = "translateX(" + x + "px)";
        // imageBox.style.left = -index * width + "px"; 不能瞬间到达
    }

    //清除过渡的函数
    function removeTransition() {
        imageBox.style.transition = "none";
        imageBox.style.webketTransition = "none";
    }

};

var downTime = function () {
    var spans = document.querySelector(".jd_product .time").querySelectorAll("span");

    var time = 2 * 60 * 60;

    var timeId = setInterval(function () {
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        time--;
    },1000);

    if(time < 0){
        clearInterval(timeId);
    }

};


/*
 //移动端手势事件
 var imageBox = document.querySelector(".imageBox");

  var bindSwipeEvent = function (element, leftCallBack, rightCallBack) {
      /!* 1.必须滑动过  2.要滑动一定的距离如50px *!/
      var isMove = false;
      var startX = 0;
      var distanceX = 0;
      element.addEventListener("touchstart", function (e) {
          startX = e.touches[0].clientX; //第一个触摸点的横坐标
      });
      element.addEventListener("touchmove", function (e) {
          isMove = true;
          var moveX = e.touches[0].clientX;
          distanceX = moveX - startX;
      });
      element.addEventListener("touchend", function (e) {
          if (isMove && Math.abs(distanceX) >= 50) {
              if (distanceX > 0) {  //右滑
                  rightCallBack && rightCallBack.call(this,e);
              } else {   //左滑
                  leftCallBack && leftCallBack.call(this,e);
              }
          }
          startX = 0; distanceX = 0; isMove = false;//重置参数,为了程序的严谨
      });  //event end
  };

  bindSwipeEvent(document.querySelector(".imageBox"),function (e) {
      console.log("左滑手势",e);
  },function (e) {
      console.log("右滑手势",e);
  });
*/



  /*  var bindTapEvent = function (element,callback) {
        /!* 1.响应速度要比click快,如150ms  2.不能滑动 *!/
        var startTime = 0;
        var isMove = false;
        element.addEventListener("touchstart",function () {
            startTime = new Date(); //new Date().getTime();时间戳
        });
        element.addEventListener("touchmove",function () {
            isMove = true;
        });
        element.addEventListener("touchend",function (e) {
            if((Date.now() - startTime) < 150 && !isMove){
                callback && callback.call(this,e);
            }
            startTime = 0;
            isMove = false;
        });
    };

    bindTapEvent(document.querySelector(".box"),function () {
       console.log("tap事件用于提高用于体验");
    });*/







