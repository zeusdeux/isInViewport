(function($){
	$(document).ready(function() {
		$('#container').children().each(function() {
			if ( $(this).isInViewport() )
				$(this).css("background-color", "#C5C7BC");
			else
				$(this).css("background-color", "#21221E");
		});
		var t = $('.js-hook').text();
		$(window).scroll(function() {
			if($('.js-hook').isInViewport({"tolerance" :100}))
				$('.js-hook').css({"background-color": "#C5C7BC", "color":"#151612"}).text("Now in viewport.");
			else
				$('.js-hook').css({"background-color":"#21221E", "color":"#fff"}).text(t);
		});
	});
}(jQuery));