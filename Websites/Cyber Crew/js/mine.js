

$(function() {
    var header = $(".fest");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 500) {
            header.removeClass('fest').addClass("hrd");
        } else {
            header.removeClass("hrd").addClass('fest');
        }
    });
});