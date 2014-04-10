/**
 * @author  Mudit Ameta
 * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
 */
(function($) {
  $.fn.isInViewport = function isInViewport() {
    var isVisibleFlag;
    
    /*Magic arguments, filtered for callback function and options object*/
    if(arguments.length){
      for(var i=0;i<arguments.length;i++){
        if(toString.call(arguments[i])=="[object Function]" || typeof arguments[i]==="function")
            var callback = arguments[i];
        else if(arguments[i] === Object(arguments[i]))
            var options = arguments[i];
      }
    }
    
    
    if (options) {
      //handle falsy, non-number and non-integer tolerance value
      options.tolerance = Math.round(parseFloat(options.tolerance));
      if (isNaN(options.tolerance))
        options.tolerance = 0;
      //set debug to false if the value isn't boolean
      if (typeof options.debug !== "boolean")
        options.debug = false;
    }
    
    /*Extend options*/
    isInViewport.setting = $.extend({tolerance: 0, debug: false}, options);
    
    /*Debuging information*/
    isInViewport.debug = function(index, text, top, bottom, endOfPage){
      console.log("---------------------------------------");
      console.log("index: " + index);
      console.log("div: " + text);
      console.log("top: " + top);
      console.log("bottom: " + bottom);
      console.log("tolerance: " + isInViewport.setting.tolerance);
      console.log("end of page: " + endOfPage);
      console.log("scrollTop: " + $(window).scrollTop());
      console.log("doc height:" + $(document).height());
      console.log("windowHeight using $(window).height(): " + $(window).height());
    }
    
    /*If tolorance is set by callee*/
    isInViewport.checkTolorance = function(top, bottom){
      if (top >= 0)
        if (top <= isInViewport.setting.tolerance)
          return true;
        else
          return false;
      else
        if (bottom > isInViewport.setting.tolerance)
          return true;
        else
          return false;
    }
    
    /*If tolorance is 0*/
    isInViewport.checkToloranceDefault = function(top){
      if (top >= 0 && top <= $(window).height())
        return true;
      else
        return false;
    }
    
    /*If its end of the page*/
    isInViewport.checkEndOfPage = function(index){
      /*Element before last or Last Element*/
      if ((isInViewport.elementsAfterCurrent[index].length === 1) || (!isInViewport.elementsAfterCurrent[index].length))
        if (top < 0)
          return false;
        else
          return true;
    }

          // updated to handle collections correctly. Removes the limit that only allow you to apply the isInViewport
          // to a single item. Still returns a boolean value, but also return the current element to the callback function.
          $.each(this, function(index){
                  var normalJsThisObj       = $(this).get(0),
                      boundingRect          = normalJsThisObj.getBoundingClientRect(),
                      top                   = boundingRect.top,
                      bottom                = boundingRect.bottom,
                      endOfPage             = ($(window).scrollTop() === ($(document).height() - $(window).height())) ? true : false,
                      isVisibleFlag         = false;

                  isInViewport.elementsAfterCurrent = isInViewport.elementsAfterCurrent || {};
                  isInViewport.elementsAfterCurrent[index] = isInViewport.elementsAfterCurrent[index] || $(this).nextAll();
                  
                  if( isInViewport.setting.debug )
                    isInViewport.debug(index, normalJsThisObj.text().trim(), top, bottom, endOfPage )
                  
                  
                  if( isInViewport.setting.tolerance > 0 )
                    isVisibleFlag = isInViewport.checkTolorance(top, bottom);
                  else
                    isVisibleFlag = isInViewport.checkToloranceDefault(top);
                  
                  
                  if( endOfPage )
                    isVisibleFlag = isInViewport.checkEndOfPage(index)
                  
                  if(isVisibleFlag && !!callback)
                    if(this.length>1) this.each(function(){ callback.apply(this, [isVisibleFlag]) });
                      else callback.apply(this, [isVisibleFlag]);
          });

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