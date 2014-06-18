//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});



/* ==========================================================================
   Social counts
   ==========================================================================*/
var shareUrl = 'https://thedaywefightback.org';
$.ajax('https://d28jjwuneuxo3n.cloudfront.net/?networks=facebook,twitter,googleplus&url=' + shareUrl, {
    success: function(res, err) {
        $.each(res, function(network, value) {
            var count = value;
            if (count / 10000 > 1) {
                count = Math.ceil(count / 1000) + 'k'
            }
            $('[data-network="' + network + '"]').attr('count', count);
        })
    },
    dataType: 'jsonp',
    cache         : true,
    jsonpCallback : 'myCallback'
});

$( ".fblinkthis" ).click(function() {
    var url = $(this).attr("href");
    window.open(url, "Share on Facebook", "width=650,height=500");
    return false;
})
$( ".twlinkthis" ).click(function() {
    var url = $(this).attr("href");
    window.open(url,"Twitter","width=550,height=420");
    return false;
})
$( ".gpluslinkthis" ).click(function() {
    var url = $(this).attr("href");
    window.open(url,"Share on Google Plus","width=500,height=436");
    return false;
})
