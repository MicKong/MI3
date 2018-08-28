// 歌曲列表
var songs = [
    {
        name: "毕业之后",
        imgSrc: "images/album01.jpg",
        src: "mp3/C400001nk3np4DcDvG.m4a"
       /* imgSrc: "http://localhost:63342/WebstormProject/SmallCase/MI3/images/album01.jpg",
        src: "http://localhost:63342/WebstormProject/SmallCase/MI3/mp3/C400001nk3np4DcDvG.m4a"*/
    },
    {
        name: "暗涌",
        imgSrc: "images/album02.jpg",
        src: "mp3/ay.mp3"
    },
    {
        name: "终身美丽",
        imgSrc: "images/album03.jpg",
        src: "mp3/zsml.mp3"
    }
];

var playBtn = my$("playBtn");
var audio = my$("audio");
var content = my$("content");
var total = my$("total");
var current = my$("current");
var line = my$("line");
var bottom = my$("bottom");
var bar = my$("bar");
var volumeBar = my$("volumeBar");
var vDot = my$("vDot");
var vLine = my$("vLine");
var cover = my$("cover");

var i = 0; //用于封面旋转

// 音量加减
my$("add").onclick = function () {
    var vol = audio.volume * 100;
    if (vol < 100) {
        vol += 10;
        vDot.style.left = vol + "%";
        vLine.style.width = vol + "%";
        if (vol == 0) {
            my$("vol").innerHTML = "&#xe623;";
        } else {
            my$("vol").innerHTML = "&#xe60f;";
        }
    }
    audio.volume = vol / 100;

    //显示音量条,触发定时器
    volumeBar.style.opacity = 1;

    clearTimeout(window.volumId);

    window.volumId = setTimeout(function () {
        volumeBar.style.opacity = 0;
    },1000);

};

my$("dec").onclick = function () {
    var vol = Math.floor(audio.volume * 100);
    if (vol >= 10) {
        vol -= 10;
        vDot.style.left = vol + "%";
        vLine.style.width = vol + "%";
        if (vol == 0) {
            my$("vol").innerHTML = "&#xe623;";
        } else {
            my$("vol").innerHTML = "&#xe60f;";
        }
    }
    audio.volume = vol / 100;

    volumeBar.style.opacity = 1;

    clearTimeout(window.volumId);

    window.volumId = setTimeout(function () {
        volumeBar.style.opacity = 0;
    },1000);
};

// 呼吸灯闪烁
var opacity = 10;
var step = 1;

//呼吸灯闪烁
function breathing() {
    if (opacity == 0) {
        step = -1;
    } else if (opacity == 10) {
        step = 1;
    }

    opacity -= step;

    my$("lamp").style.opacity = opacity / 10;
}

window.timeId = setInterval(breathing, 150);

// 开机键
my$("switch").onclick = function () {

    clearInterval(window.timeId);  //清除定时器,防止多次触发

    if (this.className == "switch") { //点击后亮屏状态
        clearInterval(window.timeId);
        my$("lamp").style.opacity = 0;  //呼吸灯熄灭
        my$("mask").className = "mask show";  //遮挡层消失(黑屏)
        bottom.className = "bottom show";  //home键暗
        this.className = "switch show";
    } else { //黑屏
        window.timeId = setInterval(breathing, 150); //呼吸灯闪烁
        my$("mask").className = "mask";   //遮挡层出现
        bottom.className = "bottom";  //home键亮
        this.className = "switch";
    }
};


//是否能播放
audio.oncanplay = function () {
    total.innerHTML = formatTime(audio.duration);
};

// 播放/暂停
playBtn.onclick = function () {
    if (this.className == "iconfont") { //播放,使用playBtn.value获取到的图标字体为0;
        this.innerHTML = "&#xe69d;";
        audio.play();
        this.className = "iconfont show";
        myRotate();
    } else {
        audio.pause();
        this.innerHTML = "&#xe774;";
        this.className = "iconfont";
        clearInterval(window.rotateId);
    }
};

//专辑封面旋转
function myRotate() {
    clearInterval(window.rotateId);
    window.rotateId = setInterval(function () {
        cover.style.transform = "rotate(" + i + "deg)";
        i++;
        if(i > 360){
            i = 0;
        }
    },35);
}


audio.ontimeupdate = function () {
    current.innerHTML = formatTime(audio.currentTime);

    var p = audio.currentTime / audio.duration * 100 + "%";
    line.style.width = p;
    my$("dot").style.left = p;
};

// 进度条,音频跃进
bar.onclick = function (e) {
    var place = e.offsetX;
    var barWidth = bar.offsetWidth;
    var time = place / barWidth * audio.duration;
    audio.currentTime = time;
};

// 上一首
my$("previous").onclick = function () {
    songs.unshift(songs.pop());
    audio.src = songs[0].src;
    my$("songName").innerHTML = songs[0].name;
    my$("cover").style.backgroundImage = "url('" + songs[0].imgSrc + "')";
    audio.play();
    playBtn.className = "iconfont show";
    playBtn.innerHTML = "&#xe69d;";
    myRotate();
};

// 下一首
my$("next").onclick = nextSong;

function nextSong() {
    songs.push(songs.shift());
    audio.src = songs[0].src;
    my$("songName").innerHTML = songs[0].name;
    my$("cover").style.backgroundImage = "url('" + songs[0].imgSrc + "')";
    audio.play();
    playBtn.className = "iconfont show";
    playBtn.innerHTML = "&#xe69d;";
    myRotate();
};

// 播放结束时
audio.onended = function () {
    playBtn.innerHTML = "&#xe774;";
    nextSong();
}

// 格式化时间
function formatTime(time) {
    if (time >= 3600) {
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);

        return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);

    } else {
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);

        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }
}

// 获取DOM对象
function my$(id) {
    return document.getElementById(id);
}


