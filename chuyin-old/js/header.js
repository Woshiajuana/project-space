$(function(){

    $("#search-select").hover(function () {
        $("#search-select").addClass("selecton");
        $("#search-select").parent().addClass("searchbox-on")
        $("#search-type").show();
    },function () {
        $("#search-select").removeClass("selecton");
        $("#search-select").parent().removeClass("searchbox-on")
        $("#search-type").hide();
    })

    $("#search-type").hover(function () {
        $("#search-select").addClass("selecton");
        $("#search-select").parent().addClass("searchbox-on")
        $("#search-type").show();
    },function () {
        $("#search-select").removeClass("selecton");
        $("#search-select").parent().removeClass("searchbox-on")
        $("#search-type").hide();
    })

    $("#search-type li a").click(function () {
        $("#search-type li a").removeClass('on');
        $(this).addClass('on');
        $("#search-type").hide();
    })

    $("#search-type-1").click(function () {
        $("#search-select-1").show();
        $("#search-select-2").hide();
        $("#search-select-3").hide();
        $("#search-select-4").hide();
        $("#search-select-5").hide();
    });

    $("#search-type-2").click(function () {
        $("#search-select-1").hide();
        $("#search-select-2").show();
        $("#search-select-3").hide();
        $("#search-select-4").hide();
        $("#search-select-5").hide();
    });

    $("#search-type-3").click(function () {
        $("#search-select-1").hide();
        $("#search-select-2").hide();
        $("#search-select-3").show();
        $("#search-select-4").hide();
        $("#search-select-5").hide();
    });

    $("#search-type-4").click(function () {
        $("#search-select-1").hide();
        $("#search-select-2").hide();
        $("#search-select-3").hide();
        $("#search-select-4").show();
        $("#search-select-5").hide();
    });

    $("#search-type-5").click(function () {
        $("#search-select-1").hide();
        $("#search-select-2").hide();
        $("#search-select-3").hide();
        $("#search-select-4").hide();
        $("#search-select-5").show();
    });

    var _bottomWx = $("<div class='bottomwx'><img src='/images/erweima.png'><span class='bottom-arrw'></span></div>")

    $(".footer-ico-1").hover(function () {
        $(this).append(_bottomWx)
    },function () {
        _bottomWx.remove()
    })

    $(".navbox ul li:eq(4)").append("<span class='navhot'></span>")

});