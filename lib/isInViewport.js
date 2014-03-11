/**
 * @author  Mudit Ameta
 * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
 */
(function($) {
	$.fn.isInViewport = function isInViewport(options) {

		var normalJsThisObj = this.get(0),
			boundingRect = normalJsThisObj.getBoundingClientRect(),
			top = boundingRect.top,
			bottom = boundingRect.bottom,
			settings = $.extend({
				'tolerance': 0,
				'debug': false
			}, options),
			isVisibleFlag = false;

		//handle falsy, non-number and non-integer tolerance value
		settings.tolerance = Math.round(parseFloat(settings.tolerance));
		if (isNaN(settings.tolerance))
			settings.tolerance = 0;

		//set debug to false if the value isn't boolean
		if (typeof settings.debug !== 'boolean')
			settings.debug = false;

		if (settings.debug) {
			console.log('---------------------------------------');
			console.log('div: ' + this.text().trim());
			console.log('tolerance: ' + settings.tolerance);
			console.log('top: ' + top);
			console.log('bottom: ' + bottom);
			console.log('scrollTop: ' + $(window).scrollTop());
			console.log('document height: ' + $(document).height());
			console.log('window height: ' + $(window).height());
		}

		if (settings.tolerance) {
			if (top < settings.tolerance && bottom >= settings.tolerance)
				isVisibleFlag = true;
			else
				isVisibleFlag = false;

		} else {
			if (top >= 0 && top <= $(window).height())
				isVisibleFlag = true;
			else
				isVisibleFlag = false;
		}

		return isVisibleFlag;

	};

	$.extend($.expr[':'], {
		'in-viewport': function(currObj, index, meta) {
			if ( !! meta[3])
				return $(currObj).isInViewport({
					tolerance: meta[3]
				});
			else
				return $(currObj).isInViewport();
		}
	});
})(jQuery);