(function($) {
	$(document).ready(function() {
		$('#container').children().each(function() {
			if ( $(this).isInViewport({"tolerance": 10}) )
				$(this).css("background-color", "#C5C7BC");
			else
				$(this).css("background-color", "#21221E");
		});

		$(window).scroll(function() {
			$('#container').children().each(function() {
				if ( $(this).isInViewport({"tolerance": 100, "debug": true}) )
					$(this).css("background-color", "#C5C7BC");
				else
					$(this).css("background-color", "#21221E");
			});
		});
	});
}(jQuery));