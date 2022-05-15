var mbti;
var prog;
var index;
var e, s, t, j;
let musicDuration = 0;

let timer;


var playpauseBtn;
var progress;
var sliders;

var RGB;


var draggableClasses = ['pin'];
var currentlyDragged = null;

// js
function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', setScreenSize);

function initTest() {
    prog = 1;
    index = -1;
    e = 0;
    s = 0;
    t = 0;
    j = 0;

    mbti = "";
}

initTest();


window.onpopstate = function (e) {

    if (location.hash === "") {

        initTest();
        retest();
    }
}


function swapNode(node1, node2) {
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
}

function shuffleOption() {
    let ul_q = document.querySelector("ul.q");
    let li_list = ul_q.querySelectorAll("li");
    // console.log(li_list);
    for (let i = 1; i <= 12; i++) {
        if (Math.random() > 0.5) {
            let li = li_list[i];
            let btns = li.querySelectorAll("button");
            let bt1 = btns[0];
            let bt2 = btns[1];

            bt1.classList.remove("A");
            bt1.classList.add("B");
            bt2.classList.remove("B");
            bt2.classList.add("A");


            swapNode(bt1, bt2);
        }


    }
}






//youtube API 불러오는 부분
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player = undefined;

function onYouTubeIframeAPIReady() {
    // console.log("EE");
    player = new YT.Player('player', {
        //width&height를 설정할 수 있으나, 따로 css영역으로 뺐다.
        events: {
            'onReady': onPlayerReady,//로딩중에 이벤트 실행한다
            'onStateChange': onPlayerStateChange//플레이어 상태 변화 시 이벤트를 실행한다.

        }
    });
}

function onPlayerReady(event) {
    //로딩된 후에 실행될 동작을 작성한다(소리 크기,동영상 속도를 미리 지정하는 것등등...)
    event.target.playVideo();//자동재생

}

var done = false;
function onPlayerStateChange(event) {
    // console.log(event);
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
        //플레이어가 재생중일 때 작성한 동작이 실행된다.
        // (원하는 시간만큼만 재생되고 멈추게 하는 것도 가능하다.)
    }
    if (event.data == 1 && timer === undefined) {

        videoDuration = player.getDuration();
        $("#total-time").text(formatTime(videoDuration));

        timer = setInterval(function () {
            let current = player.getCurrentTime();
            $("#current-time").text(formatTime(current));

            var percent = (current / videoDuration) * 100;
            progress.style.width = percent + '%';


        }, 500);

    }
    if (event.data == 0) {
        player.playVideo();
    }
}


function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);


    // rgb.r = rgb.r * 0.75;
    // rgb.g = rgb.g * 0.75;
    // rgb.b = rgb.b * 0.75;

    return rgb;

}


function move() {

    $("#playButton").removeClass("fa-play");
    $("#playButton").addClass("fa-pause");
    player.playVideo();
    setTimeout(function () {

        $("#songToolWrapper").fadeOut(500);
        $("#playHint").fadeOut(500);

        //플레이어 변수 설정



        // $("#iframeWrapper").append(`
        // <iframe width="560" height="315"
        //     src="https://www.youtube.com/embed/pw0zi_n1kgU?&autoplay=1&loop=1&start=150" frameborder="0"
        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //     allowfullscreen>
        // </iframe>

        // `);



        a = document.getElementById("albumImage");
        b = document.getElementById("albumImageSmall");

        b.classList.remove('hidden');

        let easing = circOut;
        let duration = 1000;


        ramjet.transform(a, b, {
            easing: easing,
            duration: duration,
            done: function () {

                // this function is called as soon as the transition completes
                b.classList.remove('hidden');
            }
        });

        // ...then hide the original elements for the duration of the transition
        a.classList.add('hidden');
        b.classList.add('hidden');



        c = document.getElementById("songTitle");
        d = document.getElementById("songTitleInfo");

        d.classList.remove('hidden');

        ramjet.transform(c, d, {
            easing: easing,
            duration: duration,
            done: function () {
                // alert("SDF");
                // this function is called as soon as the transition completes
                d.classList.remove('hidden');
            }
        });

        // ...then hide the original elements for the duration of the transition
        c.classList.add('hidden');
        d.classList.add('hidden');


        e = document.getElementById("songSinger");
        f = document.getElementById("songSingerInfo");

        f.classList.remove('hidden');

        ramjet.transform(e, f, {
            easing: easing,
            duration: duration,
            done: function () {
                // this function is called as soon as the transition completes
                f.classList.remove('hidden');
            }
        });

        // ...then hide the original elements for the duration of the transition
        e.classList.add('hidden');
        f.classList.add('hidden');


        setTimeout(function () {
            $("#musicCover").fadeOut(100, function () {
                $("#mbtiResult").fadeIn(500);
            });

        }, duration + 50);



        $("#equaliser").removeClass("hidden");
        $("#equaliser").hide();
        $("#equaliser").fadeIn(1000);

        $("#timeline").removeClass("hidden");
        $("#timeline").hide();
        $("#timeline").fadeIn(1000);




    }, 500);




}


function retest() {
    shuffleOption();

    location.hash = "";
    clearInterval(timer);
    timer = undefined;

    initTest();
    player.stopVideo();
    player.clearVideo();

    $(".a").fadeOut(1000);
    $(".q").fadeIn(1000);
    $(".testProgress").fadeIn(1000);

    $("#playButton").addClass("fa-play");
    $("#playButton").removeClass("fa-pause");


    $(".progressNum").fadeIn(1000, function () {
        $("#mbtiResult").fadeOut(1000);
        $("#musicCover").show();
        document.getElementById("albumImage").classList.remove("hidden");
        document.getElementById("songTitle").classList.remove("hidden");
        document.getElementById("songSinger").classList.remove("hidden");
        $("#albumImageSmall").addClass("hidden");
        $("#equaliser").addClass("hidden");
        $("#songTitleInfo").addClass("hidden");
        $("#songSingerInfo").addClass("hidden");
        $("#timeline").addClass("hidden");
        $("#songToolWrapper").show();
        $("#playHint").show();
    });


    $(".q li").removeClass("now");
    $("li").removeClass("hiddenLi");
    $("li").eq(0).addClass("now");
    $(".bar").attr('style', 'width: calc(100/12*' + prog + '%)');



    $(".progressNum").children("span").text(prog);

    showLyricHighlight();


}



function showLyricAll() {
    $target.find("#lyricInside").hide();
    $target.find("#lyricAll").show();
    $target.find("#lyricType").text("전체 가사");

}

function showLyricHighlight() {
    $target.find("#lyricAll").hide();
    $target.find("#lyricInside").show();
    $target.find("#lyricType").text("하이라이트 가사");

}



$(function () {


    $("ul.q").hide();
    $(".testProgress").hide();
    $(".progressNum").hide();
    shuffleOption();
    (function () {
        var nTimer = setInterval(function () {

            if (player !== undefined) {
                clearInterval(nTimer);

                setTimeout(function () {
                    playpauseBtn = document.querySelector('#play-btn');
                    progress = document.querySelector('.progress');
                    sliders = document.querySelectorAll('.slider');

                    sliders.forEach(slider => {
                        let pin = slider.querySelector('.pin');
                        slider.addEventListener('click', window[pin.dataset.method]);
                    });
                    // let i = 0
                    // for (let x in mbtiData["mbti"]) {
                    //     console.log(x);
                    //     if (i >= 0 && i < 16) {
                    //         $("body").append(`
                    //         <iframe width="560" height="315" src="https://www.youtube.com/embed/${mbtiData["mbti"][x]["videoCode"]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    //         `)
                    //     }

                    //     i += 1;
                    // }



                    $("#mbtiResult").hide();

                    // $(".q").fadeOut(1000);
                    // $(".testProgress").fadeOut(1000);
                    // $(".progressNum").fadeOut(1000);
                    // $(".n").fadeIn(1000);


                    $("#goListPageButton").on("click", function () {

                    });


                    $(".q button").on("click", function () {

                        // index = $(this).parent("li").index();
                        // console.log(index);


                        if ($(this).hasClass("e")) {
                            e++;
                        } else if ($(this).hasClass("s")) {
                            s++;
                        } else if ($(this).hasClass("t")) {
                            t++;
                        } else if ($(this).hasClass("j")) {
                            j++;
                        }
                        if (prog <= 12) {
                            $(".q li").removeClass("now");
                            $("li").eq(prog - 1).addClass("hiddenLi");
                            $("li").eq(prog - 1 + 1).addClass("now");
                            $(".bar").attr('style', 'width: calc(100/12*' + prog + '%)');
                            $(".progressNum").children("span").text(prog);

                            if (prog <= 4) {
                                $(".bar").css({ "background-color": "rgb(115, 116, 31, 0.87)" });
                            } else if (prog <= 8) {
                                $(".bar").css({ "background-color": "rgb(116, 34, 106, 0.87)" });
                            } else {
                                $(".bar").css({ "background-color": "rgb(28, 104, 135, 0.87)" });
                            }

                            prog++;
                        } else {
                            $(".q").fadeOut(1000);
                            $(".testProgress").fadeOut(1000);
                            $(".progressNum").fadeOut(1000);
                            $(".n").fadeIn(1000);
                        }
                        console.log(e, s, t, j);
                    });
                    $(".n button").on("click", function () {
                        (e >= 2) ? mbti += "E" : mbti += "I";
                        (s >= 2) ? mbti += "S" : mbti += "N";
                        (t >= 2) ? mbti += "T" : mbti += "F";
                        (j >= 2) ? mbti += "J" : mbti += "P";

                        // mbti = "ENTP";

                        console.log(mbti);
                        $(".n").fadeOut(1000);




                        var state = { "mbti": mbti };
                        var url = location.origin + '#' + mbti;
                        history.pushState(state, null, url);

                        renderMbtiResult(mbti);


                        // var height = $target.outerHeight();
                        // $(".a").height(height + 80);
                    });


                    if (location.hash.includes("#")) {
                        let mbti = location.hash.split("#")[1].toUpperCase();
                        let isMbtiExist = mbtiData["mbti"].hasOwnProperty(mbti);
                        console.log(isMbtiExist, mbti);
                        if (isMbtiExist) {
                            location.hash = "#" + mbti;
                            var state = { "mbti": mbti };
                            var url = location.origin + '#' + mbti;
                            history.replaceState(state, null, url);


                            $(".q").fadeOut(1000);
                            $(".testProgress").fadeOut(1000);
                            $(".progressNum").fadeOut(1000);
                            // $(".a").fadeIn(1000);

                            $(".loader").fadeOut(500);

                            renderMbtiResult(mbti);

                            $("ul.q").removeClass("hidden");
                            $(".testProgress").removeClass("hidden");
                            $(".progressNum").removeClass("hidden");



                            return;
                        } else {


                        }

                    }
                    location.hash = "";
                    var state = { "mbti": undefined };
                    var url = location.origin;
                    history.replaceState(state, null, url);
                    $(".loader").fadeOut(500);

                    $("ul.q").removeClass("hidden");
                    $(".testProgress").removeClass("hidden");
                    $(".progressNum").removeClass("hidden");


                    $("ul.q").fadeIn(1000);
                    $(".testProgress").fadeIn(1000);
                    $(".progressNum").fadeIn(1000);
                }, 2000);

            }
            // console.log("notload")
        }, 100);
    })();




});


function renderMbtiResult(mbti) {
    $target = $("#resultWrapper");
    targetMbtiData = mbtiData["mbti"][mbti];

    console.log(targetMbtiData);

    $target.find("#songTitle").text(targetMbtiData.title);
    $target.find("#songTitleInfo").text(targetMbtiData.title);

    $target.find("#songSinger").text(targetMbtiData.singer);
    $target.find("#songSingerInfo").text(targetMbtiData.singer);

    $target.find("#lyricInside").html(targetMbtiData.lyricHighlight);
    $target.find("#lyricAll").html(targetMbtiData.lyric);

    $target.find("#lyricInside").show();
    $target.find("#lyricAll").hide();


    $target.find("#youtubeLink").attr("href", `https://www.youtube.com/watch?v=${targetMbtiData.videoCode}`)
    $target.find("#melonLink").attr("href", targetMbtiData.melonLink)

    $target.find("#albumImage").attr("src", `/albums/${targetMbtiData.albumImage}`).one("load", function () { //fires (only once) when loaded
        RGB = getAverageRGB(document.getElementById('albumImage'));
        // console.log(`linear-gradient(to bottom, black, rgb(${rgb.r},${rgb.g},${rgb.b})}`);

        // $("#resultWrapper").css("background", "red");
        // console.log(rgb);
        $("#resultWrapper").css({ "background-image": `linear-gradient(-45deg,  rgb(0,0,0) 15%, rgb(${RGB.r * 0.9},${RGB.g * 0.9},${RGB.b * 0.9}))` });

        $(".progress").css({ "background-color": `rgb(${RGB.r * 1.3},${RGB.g * 1.3},${RGB.b * 1.3})` })

        $(".a").fadeIn(1000);
    })
    $target.find("#albumImageSmall").attr("src", `/albums/${targetMbtiData.albumImage}`);


    $("#albumImageSmall").addClass("hidden");
    $("#equaliser").addClass("hidden");
    $("#timeline").addClass("hidden");
    $("#songTitleInfo").addClass("hidden");
    $("#songSingerInfo").addClass("hidden");


    $("#myMbti").text(mbti);


    // console.log("player is ", player, targetMbtiData.videoCode, player.getPlayerState());
    player.loadVideoById(
        {
            videoId: targetMbtiData.videoCode,
            startSeconds: targetMbtiData.videoStart
        }
    );
    player.pauseVideo();



}


//////////////////////
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}


// window.addEventListener('mousedown', function (event) {

//     if (!isDraggable(event.target)) return false;

//     currentlyDragged = event.target;
//     let handleMethod = currentlyDragged.dataset.method;

//     this.addEventListener('mousemove', window[handleMethod], false);

//     window.addEventListener('mouseup', () => {
//         currentlyDragged = false;
//         window.removeEventListener('mousemove', window[handleMethod], false);
//     }, false);
// });


$(function () {

});



function isDraggable(el) {
    let canDrag = false;
    let classes = Array.from(el.classList);
    draggableClasses.forEach(draggable => {
        if (classes.indexOf(draggable) !== -1)
            canDrag = true;
    })
    return canDrag;
}

function inRange(event) {
    let rangeBox = getRangeBox(event);
    let direction = rangeBox.dataset.direction;
    let screenOffset = getOffset(sliders[0]).left;
    var min = screenOffset - rangeBox.offsetLeft;
    var max = min + rangeBox.offsetWidth;

    console.log(event.clientX, min, max);

    if (event.clientX < min || event.clientX > max) { return false };
    return true;
}

function updateProgress() {
    var current = player.currentTime;
    var percent = (current / player.duration) * 100;
    progress.style.width = percent + '%';

    currentTime.textContent = formatTime(current);
}

function getRangeBox(event) {
    let rangeBox = event.target;
    let el = currentlyDragged;
    if (event.type == 'click' && isDraggable(event.target)) {
        rangeBox = event.target.parentElement.parentElement;
    }
    if (event.type == 'mousemove') {
        rangeBox = el.parentElement.parentElement;
    }
    return rangeBox;
}

function getCoefficient(event) {

    let slider = getRangeBox(event);
    let screenOffset = getOffset(sliders[0]).left;
    let K = 0;
    let offsetX = event.clientX - screenOffset;
    let width = slider.clientWidth;
    K = offsetX / width;
    return K;
}

function rewind(event) {
    // console.log(event);
    if (inRange(event)) {
        console.log(videoDuration * getCoefficient(event));
        player.seekTo(videoDuration * getCoefficient(event));
    }
}

function formatTime(time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
}

function togglePlay() {

    if (player.getPlayerState() == 1) {
        player.pauseVideo();

        $('.colour-bar').each(function (index, item) {


            // $(item).attr({"style" : "height : 10px !important"});
            // $(item).css({"height" : "10px !important"});
            $(item).css('animation', $(item).css("animation").replace("color-bar", "color-bar-pause"));
        });


    } else {
        player.playVideo();

        $('.colour-bar').each(function (index, item) {

            // $(item).attr({"style" : "height : 10px"});
            // $(item).css({"height" : "10px"});
            $(item).css('animation', $(item).css("animation").replace("color-bar-pause", "color-bar"));
        });
    }
}

