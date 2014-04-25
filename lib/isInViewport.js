/**
 * @author  Mudit Ameta
 * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
 */
(function($) {
  function isInViewport(element, options) {

    var normalJsThisObj = element,
      boundingRect = normalJsThisObj.getBoundingClientRect(),
      top = boundingRect.top,
      bottom = boundingRect.bottom,
      settings = $.extend({
        'tolerance': 0
      }, options),
      isVisibleFlag = false;

    //handle falsy, non-number and non-integer tolerance value
    settings.tolerance = Math.round(parseFloat(settings.tolerance));
    if (isNaN(settings.tolerance))
      settings.tolerance = 0;

    if (settings.tolerance) {
      if (top < settings.tolerance && bottom >= settings.tolerance)
        isVisibleFlag = true;
      else
        isVisibleFlag = false;

    }
    else {
      if (top >= 0 && top <= $(window).height())
        isVisibleFlag = true;
      else
        isVisibleFlag = false;
    }

    return isVisibleFlag;

  }

  $.extend($.expr[':'], {
    'in-viewport': function(currObj, index, meta) {
      if ( !! meta[3])
        return isInViewport(currObj, {
          tolerance: meta[3]
        });
      else
        return isInViewport(currObj);
    }
  });
})(jQuery);
