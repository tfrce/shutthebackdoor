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
var shareUrl = 'https://shutthebackdoor.net';
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

/* ==========================================================================
   Signup forms
   ==========================================================================*/

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&\/#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// ie shims
if (!Object.keys) {
    Object.keys = function(o) {
        if (o !== Object(o))
            throw new TypeError('Object.keys called on a non-object');
        var k = [],
            p;
        for (p in o)
            if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
        return k;
    }
}

(function() {




})();
$(document).ready(function(){

  var referalMap = {
      'fftf': {
          name: 'Fight for the Future',
          policy: 'http://www.fightforthefuture.org/privacy/'
      },
      'eff': {
          name: 'EFF',
          policy: 'https://www.eff.org/policy'
      },
      'dp': {
          name: 'Demand Progress',
          policy: 'http://www.demandprogress.org/privacy/'
      }
  };
  var referalKeys = Object.keys(referalMap);
  var referalParam = getParameterByName('r');
  var referalOrg;
  var slug;

  // Allows a page to have a selected org always
  if(typeof alwaysSelected !== 'undefined') {
      referalParam = alwaysSelected;
  }

  if (referalParam in referalMap) {
    referalOrg = referalMap[referalParam];
    slug = referalParam;
  } else {
    var randomOrgIndex = Math.floor(Math.random() * referalKeys.length);
    referalOrg = referalMap[referalKeys[randomOrgIndex]];
    slug = referalKeys[randomOrgIndex];
  }
  $('.org-name').text(referalOrg.name);
  $('.org-slug').val(slug);
  $('.org-privacy').attr('href', referalOrg.policy);
  if(slug === 'eff') {
    $('#subscriber-checkbox').removeAttr('checked');
  }

  $.fn.serializeObject = function() {
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
 };
   var $form = $('.email-signup');
    var emailLogged = false;
    var logDataFallback = function (data) {
      console.log(data);
      if(!emailLogged) {
        emailLogged = true;
        var dbData = {
          email: data.data.email,
          org: slug
        };
        $.ajax('https://email-congress.herokuapp.com/shutthebackdoor', {
          data: dbData,
          method: 'POST',
          success: function(response){
          },
          dataType: 'json'
        });
      }
    }
   $form.submit(function(){

     // Because there is no server side error handling, we can just assume success anyway


            logDataFallback({data: $form.serializeObject()});
  $('input,button', $form).attr('disabled', 'disabled');
//$('#thank-you-message').append("<p> Thanks for signing up! </p>");
//$form.remove();
//$('.disclaimer').remove();
      return false;
   });

});



/* ==========================================================================
   Sharing buttons
   ==========================================================================*/

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
