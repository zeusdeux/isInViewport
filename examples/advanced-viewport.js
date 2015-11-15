(function($) {
  $(document).ready(function() {
    //this adjusts the width when there isn't any scrollbar (like on a mobile)
    var divWidth = $('div.box:first').outerWidth();

    // custom viewport
    var $viewport = $('#viewport');

    //outerWidth to include the massive padding it has
    //width doesn't work as box-sizing: border-box;
    //so padding cuts into width
    //sigh!
    $('.tolerance').width(divWidth);
    $('.outOfViewport').css('left',divWidth+'px');

    $viewport.find('div.box').css('background-color', '#21221E').text('out of viewport');

    // using custom viewport with a the "in-viewport" pseudo-selector
    $viewport.find('div.box:in-viewport(100, #viewport)').css('background-color', '#C5C7BC').text('in viewport');

    $('#viewport').scroll(function() {
      $viewport.find('div.box').css('background-color', '#21221E').text('out of viewport');

      // using custom viewport with the isInViewport function
      $viewport.find('div.box').isInViewport({ tolerance: 100, viewport: $viewport }).css('background-color', '#C5C7BC').text('in viewport');
    });
  });
}(jQuery));
