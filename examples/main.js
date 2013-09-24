(function($){
	$(document).ready(function() {
		$('#container').children().each(function() {
				if ($(this).isInViewport({"tolerance" :100,"toleranceForLast": 401, "debug": true}))
					$(this).css("background-color", "red");
				else
					$(this).css("background-color", "blue");
			});

		$(window).scroll(function() {
			$('#container').children().each(function() {
				if ($(this).isInViewport({"tolerance" :100,"toleranceForLast": 401}))
					$(this).css("background-color", "red");
				else
					$(this).css("background-color", "blue");
			});
		});
	});
}(jQuery));