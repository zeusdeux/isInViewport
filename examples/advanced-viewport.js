(function($) {
  $(document).ready(function() {
    $('#viewport > div.box').css('background-color', '#21221E').text('out of viewport');
    $('#viewport > div.box:in-viewport(100, #viewport)').css('background-color', '#C5C7BC').text('in viewport');

    $('#viewport').scroll(function() {
      $('#viewport > div.box').css('background-color', '#21221E').text('out of viewport');
      $('#viewport > div.box:in-viewport(100, #viewport)').css('background-color', '#C5C7BC').text('in viewport');
    });
  });
}(jQuery));
