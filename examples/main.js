(function($){
	$(document).ready(function() {
		$('#container').children().each(function() {
				if ($(this).isInViewport({"tolerance" :50}))
					$(this).css("background-color", "red");
				else
					$(this).css("background-color", "blue");
			});

		$(window).scroll(function() {
			$('#container').children().each(function() {
				if ($(this).isInViewport({"tolerance" :50,"toleranceForLast": 432, "debug": true}))
					$(this).css("background-color", "red");
				else
					$(this).css("background-color", "blue");
			});
		});
	});
}(jQuery));