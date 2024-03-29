//$('head').append('<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/maksimiliani/spline-test@34f8b1f/css/style.css">');

var bodyRect;
var header_el;
var locked = false;
var sections_color;

function update_header(colourr) {

  function isNight(color) {
    var r, g, b, hsp; // Variables for red, green, blue values
    if (color.match(/^rgb/)) { // Check the format of the color, HEX or RGB?
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/); // If HEX --> store the red, green, blue values in separate variables
      r = color[1];
      g = color[2];
      b = color[3];
    }
    else { // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }
    hsp = Math.sqrt( // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );

    if (hsp>185) { // hsp>127.5 Using the HSP value, determine whether the color is light or dark
      return false; //'day'
    }
    else {
      return true; //'night'
    }
  }

  header_el = $(".navbar-master");
  bodyRect = document.body.getBoundingClientRect();

  for (var i=0; i < sections_color.length; i++) {
    var offset1 = sections_color[i].getBoundingClientRect().top - bodyRect.top - header_el[0].offsetHeight;
    var offset2 = sections_color[i].getBoundingClientRect().top - bodyRect.top + sections_color[i].getBoundingClientRect().height - header_el[0].offsetHeight;
    if (i < sections_color.length-1)
      offset2 = sections_color[i+1].getBoundingClientRect().top - bodyRect.top - header_el[0].offsetHeight;
      if ((window.scrollY >= offset1) && (window.scrollY < offset2)) {
        var new_colourr = getComputedStyle(sections_color[i], null).backgroundColor;
        if ((i == 0) && (colourr != null)) {
          new_colourr = colourr;
        }
        if (isNight(new_colourr)) {
          $('.navbar-master .nav-link').addClass('night');
          $('.navbar-master .logo').addClass('night');
          $('.navbar-master .menu-button').addClass('night');
        } else {
          $('.navbar-master .nav-link').removeClass('night');
          $('.navbar-master .logo').removeClass('night');
          $('.navbar-master .menu-button').removeClass('night');
        }
        break;
      }
    }
    locked = false;
}

$(document).ready(function() {

  if (document.cookie.indexOf("accepted_cookies") < 0) {
    $('#cookie_message').removeClass('hidden');
  }
  $('#accept_cookies').on('click', function() {
    document.cookie = "accepted_cookies=yes;"
  });

  if (document.cookie.indexOf("show_promo") < 0) {
    $('#promo').removeClass('hidden');
  }
  $('#promo_close').on('click', function() {
    document.cookie = "show_promo=0;"
  });
  $('#promo_attend').on('click', function() {
    document.cookie = "show_promo=0;"
  });

  sections_color = document.getElementsByClassName("d_section");

  $(window).scroll(function() {
    if (!locked) {
      locked = true;
      setTimeout(update_header(null), 150);
    }
  });

  update_header(null);
  //$('.navbar-master .nav-link').addClass('night');
  //$('.navbar-master .logo').addClass('night');
  //$('.navbar-master .menu-button').addClass('night');
  if (document.querySelector('#Advise-custom') != null) {
    const special_checkbox = $('#Advise-custom');
    special_checkbox[0].addEventListener('mouseup', (event) => {
      var checkbox0 = $('#Advise-custom .w-checkbox-input');
      if (checkbox0.attr('class').split(' ').slice(-1)[0] != "w--redirected-checked") {
        $('#Advise-custom-form').removeClass('hidden');
      } else {
        $('#Advise-custom-form').addClass('hidden');
      }
    });
  }

});
