(function($) {
	$(document).ready(function() {
		$('#container > div.box').css("background-color", "#21221E");
    $('#container > div.box').isInViewport({tolerance:100}, function(){
      if($(this).is(":in-viewport(100)")){
        $(this).css("background-color", "#C5C7BC")
      }
    });
		$(window).scroll(function() {
		  $('#container > div.box').css("background-color", "#21221E");
		  // the callback function is applied to each element of the collection. The inViewport value is return to the callback function. The current element of the collection is accessed via $(this)
      $('#container > div.box').isInViewport({tolerance:100}, function(inViewport){
        if(inViewport) $(this).css("background-color","#C5C7BC");
      });
		});
	});
}(jQuery));