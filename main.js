var mbti;
var prog;
var index;
var e, s, t, j;


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

//youtube API 불러오는 부분
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
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
    console.log(event);
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
        //플레이어가 재생중일 때 작성한 동작이 실행된다.
        // (원하는 시간만큼만 재생되고 멈추게 하는 것도 가능하다.)
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


    rgb.r = rgb.r * 0.75;
    rgb.g = rgb.g * 0.75;
    rgb.b = rgb.b * 0.75;

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





    }, 500);




}


function retest() {





    initTest();
    player.stopVideo();
    player.clearVideo();

    $(".a").fadeOut(1000);
    $(".q").fadeIn(1000);
    $(".progress").fadeIn(1000);

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
        $("#songToolWrapper").show();
        $("#playHint").show();
    });


    $(".q li").removeClass("now");
    $("li").removeClass("hiddenLi");
    $("li").eq(0).addClass("now");
    $(".bar").attr('style', 'width: calc(100/12*' + prog + '%)');



    $(".progressNum").children("span").text(prog);


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
    // $(".progress").fadeOut(1000);
    // $(".progressNum").fadeOut(1000);
    // $(".n").fadeIn(1000);



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
                $(".bar").css({ "background-color": "#fbfcb9dd" });
            } else if (prog <= 8) {
                $(".bar").css({ "background-color": "#ffcdf3dd" });
            } else {
                $(".bar").css({ "background-color": "#65d3ffdd" });
            }

            prog++;
        } else {
            $(".q").fadeOut(1000);
            $(".progress").fadeOut(1000);
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

        // /mbti = "ISFJ";

        console.log(mbti);
        $(".n").fadeOut(1000);


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
            var rgb = getAverageRGB(document.getElementById('albumImage'));
            // console.log(`linear-gradient(to bottom, black, rgb(${rgb.r},${rgb.g},${rgb.b})}`);

            // $("#resultWrapper").css("background", "red");
            console.log(rgb);
            $("#resultWrapper").css({ "background-image": `linear-gradient(rgb(${rgb.r},${rgb.g},${rgb.b}), rgb(0,0,0))` });
        })
        $target.find("#albumImageSmall").attr("src", `/albums/${targetMbtiData.albumImage}`);


        $("#albumImageSmall").addClass("hidden");
        $("#equaliser").addClass("hidden");
        $("#songTitleInfo").addClass("hidden");
        $("#songSingerInfo").addClass("hidden");


        $("#myMbti").text(mbti);

        player.loadVideoById(
            {
                videoId: targetMbtiData.videoCode,
                startSeconds: targetMbtiData.videoStart
            }
        )
        player.pauseVideo();


        $(".a").fadeIn(1000);

        // var height = $target.outerHeight();
        // $(".a").height(height + 80);
    });

});