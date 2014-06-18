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

$( ".facebook-button" ).click(function() {
    var url = 'https://www.facebook.com/sharer/sharer.php?app_id=709021229138321&u='+$(this).attr("href")+'&display=popup';
    window.open(url, "Share on Facebook", "width=650,height=500");
    return false;
})
$( ".twitter-button" ).click(function() {
    var url = 'https://twitter.com/intent/tweet?status=' + $(this).attr("href");
    window.open(url,"Twitter","width=550,height=420");
    return false;
})
$( ".google-button" ).click(function() {
    var url = 'https://plus.google.com/share?url=' + $(this).attr("href");
    window.open(url,"Share on Google Plus","width=500,height=436");
    return false;
})
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

    var referalMap = {
        'fp': {
            name: 'Free Press',
            policy: 'http://www.freepress.net/privacy-copyright'
        },
        'fftf': {
            name: 'Fight for the Future',
            policy: 'http://www.fightforthefuture.org/privacy/'
        },
        'eff': {
            name: 'EFF',
            policy: 'https://www.eff.org/policy'
        },
        'an': {
            name: 'Access Now',
            policy: 'https://www.accessnow.org/pages/privacy-policy'
        },
        'dp': {
            name: 'Demand Progress',
            policy: 'http://www.demandprogress.org/privacy/'
        },
        'om': {
            name: 'Open Media',
            policy: 'https://openmedia.ca/privacy'
        },
        'ra': {
            name: 'RootsAction',
            policy: 'http://www.rootsaction.org/privacy-policy'
        },
        'o98': {
            name: 'The Other 98%',
            policy: 'http://other98.com/privacy/'
        },
        'dk': {
            name: 'Daily Kos',
            policy: 'http://www.dailykos.com/special/privacy'
        },
        'ca': {
            name: 'Credo Action',
            policy: 'http://credoaction.com/privacy/'
        },
        'aclu': {
            name: 'ACLU',
            policy: 'https://www.aclu.org/american-civil-liberties-union-privacy-statement'
        },
        'pda': {
            name: 'Progressive Democrats of America',
            policy: 'http://www.pdamerica.org/about-pda/privacy-policy'
        },
        'of': {
            name: 'Campaign for America\'s Future',
            policy: 'http://ourfuture.org/privacy'
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

    var emailLogged = false;
    var logDataFallback = function (data) {
      if(!emailLogged) {
        emailLogged = true;
        var dbData = {
          email: data.data['member[email]'],
          org: data.data.tag
        };
        $.ajax('https://email-congress.herokuapp.com/email', {
          data: dbData,
          method: 'POST',
          success: function(response){
          },
          dataType: 'json'
        });
      }
    }
});
    /*
$(document).ready(function(){
   var $form = $('.email-signup');

   $form.submit(function(){

     // Because there is no server side error handling, we can just assume success anyway
     $('#thank-you-message').append("<p> Thanks for signing up! </p>");
     $form.remove();
     $('.disclaimer').remove();

    // Make a timeout incase the request hangs
    setTimeout(function () {
      logDataFallback({data: $form.serializeObject()});
    }, 5000)

      $.ajax($(this).attr('action'), {
        data: $(this).serialize(),
        method: 'POST',
        success: function(response){
          if(response && response.data && response.data.success === true) {
            emailLogged = true
            // If success == true in response, proceed, otherwise log the data in case
          } else {
            logDataFallback({data: $form.serializeObject()});
          }
        },
        error: function () {
          // if jQuery detects a http error, then log the data
          logDataFallback({data: $form.serializeObject()});
        },
        dataType: 'json'
      });
      return false;
   });
})();
*/
