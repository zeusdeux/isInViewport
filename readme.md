isInViewport.js
================
An ultra-light jQuery plugin that tells you if the element is in the viewport, but with a twist.
Did you say [demo](http://experiments.muditameta.com/isInViewport/)?

Installation
----------------
- Download either `isInViewport.js` or `isInViewport.min.js`  
- Add it after you include `jQuery`
- You're ready to go!

Usage
----------------
#### Basic usage

```javascript
$( selector ).isInViewport()
```
This returns `true` if the element is in the viewport and `false` otherwise.

#### Advanced usage

```javascript
$( selector ).isInViewport( {"tolerance" :100, "toleranceForLast": 401, "debug": true} )
```
`.isInViewport()` takes three options:

- `tolerance` specfies the upper limit in `pixels` of when the element is deemed *in viewport*.   
It defaults to `0`.
- `debug` enables logging to the console.   
It defaults to `false`.

With the advanced options it becomes very easy to build things like menus with items that get auto-highlighted based on which section you are on, transition effects when an element comes into the viewport, etc.

See the example in the `examples` directory for more clarity.

## Support
__Chrome, Firefox 3.0+, IE6+, Safari 4.0+, Opera 10.0+__

## Note

- `.isInViewport()` doesn't support chaining as it returns a `boolean` value.
- To use with IE < 9 use jQuery <= 1.7.0
