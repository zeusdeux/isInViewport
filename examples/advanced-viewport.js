(function($) {
  $(document).ready(function() {
    //this adjusts the width when there isn't any scrollbar (like on a mobile)
    var divWidth = $('div.box:first').outerWidth();

    //outerWidth to include the massive padding it has
    //width doesn't work as box-sizing: border-box;
    //so padding cuts into width
    //sigh!
    $('.tolerance').width(divWidth);
    $('.outOfViewport').css('left',divWidth+'px');

    $('#viewport > div.box').css('background-color', '#21221E').text('out of viewport');
    $('#viewport > div.box:in-viewport(100, #viewport)').css('background-color', '#C5C7BC').text('in viewport');

    $('#viewport').scroll(function() {
      $('#viewport > div.box').css('background-color', '#21221E').text('out of viewport');
      $('#viewport > div.box:in-viewport(100, #viewport)').css('background-color', '#C5C7BC').text('in viewport');
    });
  });
}(jQuery));
