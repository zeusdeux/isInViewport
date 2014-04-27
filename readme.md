isInViewport.js
================
An ultra-light jQuery plugin that tells you if the element is in the viewport, but with a twist.
Did you say [demo](http://experiments.muditameta.com/isInViewport/)?

Current version: `2.0.0-alpha`
- Removed support for the old usage syntax in favour of the `:in-viewport` selector i.e.,
```javascript
//removed
$( selector ).isInViewport( {"tolerance" :100, "debug": true} )

//current usage
$( 'selector:in-viewport( 100 )' )
```
- Removed the `debug` option because, lets be honest, no one really used it.
- Removed the weird code that handled *end of page* condition in the core. It's the user's 
prerogative to do what he/she wants when their page is scrolled to *end of page*.

Previous version: `1.1.1`
- Added `bower` support.

Previous version: `1.1.0`
- Added support for `:in-viewport` selector as per [joeframbach's](http://www.reddit.com/user/joeframbach) suggestion.

Installation
----------------
- Get the release that you want from [releases/tags](https://github.com/zeusdeux/isInViewport/releases) ( or `bower install isInViewport` )
-  Copy either `isInViewport.js` or `isInViewport.min.js` from the `lib` folder to your folder containing your scripts
- Add it after you include `jQuery`
- You're ready to go!

Usage
----------------
#### Basic usage

```javascript
$( 'selector:in-viewport' )
```
When used as a selector it returns all the elements that match. Since it returns the element(s) it can *thus be chained* with other jQuery methods. 

###### Example:
```javascript
$( 'div:in-viewport' ).css( 'background-color', 'red' );
```
This will set the `background-color` as `red` for all `divs` that are in the viewport.

#### Advanced usage

```javascript
$( 'selector:in-viewport( tolerance[, viewport selector] )' )
```
This returns all the elements that are in the viewport while taking into account the `tolerance` criterion.   
Since it returns the element(s) it can *thus be chained* with other jQuery methods.   
When a custom viewport is specified, it uses that to calculate if the element is in *that* viewport or not.   
When a custom viewport is *not* specified, it defaults to *window* as the viewport.

###### Example:
```javascript
//example 1
$( 'div:in-viewport( 100 )' ).css( 'background-color', 'red' );

//example 2
$('#viewport > div.box:in-viewport( 100, #viewport )').css( 'background-color', 'blue' )
                                                      .text( 'in viewport' );
```
__Example 1__ will set the `background-color` as `red` for all `divs` that are in the viewport with a `tolerance` of `100px`.   
__Example 2__ will set the `background-color` as `blue` and `text` as `in viewport` for all `divs` that are in the custom   
viewport given by `#viewport` and with a `tolerance` of `100px`.

With the advanced usage it becomes very easy to build things like menus with items that get auto-highlighted based on which section you are on, transition effects when an element comes into the viewport, etc.

See the examples in the `examples` directory for more clarity.

## Support
__Chrome, Firefox 3.0+, IE6+, Safari 4.0+, Opera 10.0+__

## Note
- `:in-viewport` selector *does* support chaining.
- To use with IE < 9 use jQuery <= 1.7.0
