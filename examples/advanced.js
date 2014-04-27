(function($) {
  $(document).ready(function() {
    $('#container > div.box').css('background-color', '#21221E');
    $('#container > div.box:in-viewport(100)').css('background-color', '#C5C7BC');

    $(window).scroll(function() {
      $('#container > div.box').css('background-color', '#21221E');
      $('#container > div.box:in-viewport(100)').css('background-color', '#C5C7BC');
    });
  });
}(jQuery));
