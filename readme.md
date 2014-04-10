isInViewport.js
================
An ultra-light jQuery plugin that tells you if the element is in the viewport, but with a twist.
Did you say [demo](http://experiments.muditameta.com/isInViewport/)?

Current version: `1.1.1`
- Added `bower` support.
- The "end of page" logic is going to be removed in the next version from the plugin as it should be specific to your application

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
As of version `1.1.0`, the `:in-viewport` selector is preferred way of using the plugin.   
Syntax is as below:
```javascript
$( 'selector:in-viewport' )
```
When used as a selector it returns all the elements that match. Since it returns the element(s) it can *thus be chained* with other jQuery methods. 

###### Example:
```javascript
$( 'div:in-viewport' ).css( 'background-color', 'red' );
```
This will set the `background-color` as `red` for all `divs` that are in the viewport.

#### Old basic usage syntax
```javascript
$( selector ).isInViewport()
```
This returns `true` if the element is in the viewport and `false` otherwise.

#### Advanced usage
As of version `1.1.0`, you can use the `:in-viewport` selector with the `tolerance` passed as a parameter to the selector. This removes the need to loop over a collection of elements and to test them all separately using `.isInViewport()` method. The syntax is given below:
```javascript
$( 'selector:in-viewport( tolerance )' )
```
###### Example:
```javascript
$( 'div:in-viewport( 100 )' ).css( 'background-color', 'red' );
```
This will set the `background-color` as `red` for all `divs` that are in the viewport with a `tolerance` of `100px`.   

With the advanced usage it becomes very easy to build things like menus with items that get auto-highlighted based on which section you are on, transition effects when an element comes into the viewport, etc.

- Note that the `:in-viewport` selector *does not* support the `debug` parameter.   
- If you need to use `debug` then use the method call syntax:   
`isInViewport( {"tolerance": 100, "debug": true} )`

#### Old advanced usage syntax
```javascript
$( selector ).isInViewport( {"tolerance" :100, "debug": true} )
```
`.isInViewport()` takes two options:

- `tolerance` specfies the upper limit in `pixels` of when the element is deemed *in viewport*.   
It defaults to `0`.
- `debug` enables logging to the console.   
It defaults to `false`.

See the examples in the `examples` directory for more clarity.

#### Advanced usage with callback
```javascript
$( selector ).isInViewport({tolerance: 100, debug: true}, function(inViewport){
  if( inViewport ){
    /* do something */
  }
})
```
`.isInViewport()` accepts multiple params:
- `Object`
-- `tolerance` specfies the upper limit in `pixels` of when the element is deemed *in viewport*. It defaults to `0`.
-- `debug` enables logging to the console. It defaults to `false`.

- `Function`
-- `callback` will be applied to an element or a collection of elements. Passes a boolean argument to the callback function.

See the examples in the `examples` directory for more clarity.

## Support
__Chrome, Firefox 3.0+, IE6+, Safari 4.0+, Opera 10.0+__

## Note
- `:in-viewport` selector *does* support chaining.
- `.isInViewport()` *doesn't* support chaining as it returns a `boolean` value.
- To use with IE < 9 use jQuery <= 1.7.0
