(function($) {
  $(document).ready(function() {
    $('#container > div.box').css('background-color', '#21221E');
    $('#container > div.box:in-viewport').css('background-color', '#C5C7BC');

    var t = $('.js-hook').text();

    $(window).scroll(function() {
      $('.js-hook').css({
        'background-color': '#21221E',
        'color': '#fff'
      }).find('p').text(t);
      $('.js-hook:in-viewport(100)').css({
        'background-color': '#C5C7BC',
        'color': '#151612'
      }).find('p').text('Now in viewport.');
    });
  });
}(jQuery));
