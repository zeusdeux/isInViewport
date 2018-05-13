isInViewport.js
================
[![Build Status](https://travis-ci.org/zeusdeux/isInViewport.svg?branch=master)](https://travis-ci.org/zeusdeux/isInViewport)
[![CDNJS](https://img.shields.io/cdnjs/v/is-in-viewport.svg)](https://cdnjs.com/libraries/is-in-viewport)

An ultra-light jQuery plugin that tells you if the element is in the viewport, but with a twist.

Did you say [demo](http://www.isinviewport.mudit.xyz) (inclusive of tests)?

Installation
----------------
#### Using in a module

```js
npm install --save is-in-viewport
```
You can then `require('is-in-viewport')` or `import 'is-in-viewport'` in your code.
It will automagically work with the bundler of your choice. If it breaks, please feel free to open an issue.

Example usage in an ES6/ES2015 module is shown [in the `examples/es6-example`](./examples/es6-example/) folder.

__Note__: `isInViewport` is a side-effecting module. It imports `jquery` that you have installed and attaches itself on it.
As a consequence, `isInViewport` requires `jquery` to be installed as a peer dependency.
Your bundling will fail if `jquery` isn't installed as [`is-in-viewport` `import`s `jquery`](./src/index.js#L1).

#### Using directly in a script tag

- Get the release that you want from [releases/tags](https://github.com/zeusdeux/isInViewport/releases) (or `bower install isInViewport` or `npm install --save is-in-viewport`)
- Copy/link either `isInViewport.js` or `isInViewport.min.js` and the respective sourcemap from the `lib` folder to your folder containing your scripts
- Add it after you include `jQuery`
- You're ready to go!

Usage
----------------
<a name="bu"/>

#### Basic usage

```javascript
$( 'selector:in-viewport' )
```
When used as a selector it returns all the elements that match. Since it returns the element(s) it can *thus be chained* with other jQuery methods. It can also be used with jquery's `.is`.

###### Example:
```javascript
$( 'div:in-viewport' ).css( 'background-color', 'red' );
// same as
var $div = $( 'div' );
if ( $div.is( ':in-viewport' ) ) {
  $div.css( 'background-color', 'red' );
}
```
Both of the above will set the `background-color` as `red` for all `div`s that are in the viewport.

#### Advanced usage

##### Using `in-viewport` pseudo-selector

```javascript
$( 'selector:in-viewport( tolerance[, viewport selector] )' )
```
This returns all the elements that are in the viewport while taking into account the `tolerance` criterion.

Since it returns the element(s) it can *thus be chained* with other jQuery methods.

When a viewport selector is specified, it uses that to calculate if the element is in *that* viewport or not.

When a viewport selector is *not* specified, it defaults to *window* as the viewport.

The viewport selector is any valid jQuery selector.

###### Defaults:
- `tolerance` defaults to `0`
- `viewport` defaults to `window`

###### Example:
```javascript
//example 1
//the height of tolerance region is 100px from top of viewport
$( 'div:in-viewport( 100 )' ).css( 'background-color', 'red' );

//example 2
//the height of tolerance region is (viewport.height - 100px) from top of viewport
$( 'div:in-viewport( -100 )' ).css( 'background-color', 'green' );

//example 3
$('#viewport > div.box:in-viewport( 100, #viewport )').css( 'background-color', 'blue' )
                                                      .text( 'in viewport' );
```

__Example 1__ will set the `background-color` as `red` for all `divs` that are in the viewport with a `tolerance` of `100px`.

__Example 2__ will set the `background-color` as `green` for all `divs` that are in the viewport with a `tolerance` of `viewport height - 100px`. This lets the user conveniently provide a `tolerance` value closer to the viewport height without having to call `$(viewport).height()` all the time.

__Example 3__ will set the `background-color` as `blue` and `text` as `in viewport` for all `divs` that are in the custom viewport given by `#viewport` and with a `tolerance` of `100px`.

With the advanced usage it becomes very easy to build things like menus with items that get auto-highlighted based on which section you are on, transition effects when an element comes into the viewport, etc.

See the examples in the `examples` directory for more clarity.

###### Note:
- When `tolerance` is `0` or `undefined` it is actually *equal to* `tolerance: $(viewport).height()` and *not* `0`.

This makes it easier for developers to have the whole `viewport` available to them as a valid `viewport`.


##### Using exposed `isInViewport` function

```javascript
$( 'selector' ).isInViewport({ tolerance: tolerance, viewport: viewport })
```
This returns all the elements that are in the viewport while taking into account the `tolerance` criterion.

Since it returns the element(s) it can *thus be chained* with other jQuery methods.

When a viewport is specified, it uses that to calculate if the element is in *that* viewport or not.

When a viewport is *not* specified, it defaults to *window* as the viewport.

**The viewport is a valid DOM element or jQuery wrapped DOM element, NOT a selector string.**

###### Defaults:
- `tolerance` defaults to `0`
- `viewport` defaults to `window`

###### Example:
```javascript
//example 1
//the height of tolerance region is 100px from top of viewport
$( 'div' ).isInViewport({ tolerance: 100 }).css( 'background-color', 'red' );

//example 2
//the height of tolerance region is (viewport.height - 100px) from top of viewport
$( 'div' ).isInViewport({ tolerance: -100 }).css( 'background-color', 'green' );

//example 3
var $viewport = $('#viewport');

$viewport
  .find('div.box')
  .isInViewport({ tolerance: 100, viewport: $viewport })
  .css( 'background-color', 'blue' )
  .text( 'in viewport' );
```


## Support
__Chrome, Firefox 3.5+, IE9+, Safari 5+, Opera 10.5+__

## Note
- `:in-viewport` selector *does* support chaining.

Changelog
----------------
`3.0.3`

- Use `jQuery.expr.pseudos` when found since `jQuery.expr[':']` is deprecated

`3.0.2`

- Support new rollup properties and get rid of removed rollups properties (`moduleId`, `moduleName`, etc)

`3.0.1`

- Fix jQuery no conflict mode issue (#39)

`3.0.0`

- Remove the deprecated `$(el).do` method
- Remove support for browsers < { IE9, Safari 5, Opera 10.5, Firefox 3.5 }
- Add support for modules and bundlers. You can now `import 'is-in-viewport'`/`require('is-in-viewport')` in your project (yay!)
- Add properly functioning sourcemaps for easier debugging

`2.4.2`

- Remove `postInstall` script which was breaking builds

`2.4.1`

- Undo `2.4.0` as `is-in-viewport` already exists on bower and isn't owned by me

`2.4.0`

- Update `bower.json` to comply with new validations
- Rename package on bower to match with that on npm i.e., `is-in-viewport`

`2.3.1`

- Remove unnecessary boolean coercion

`2.3.0`

- Re-exposed `isInViewport` with saner semantics. You can now pass options as JS objects to `isInViewport` and hence can now do things like:
  ```javascript
  var $viewport = $(<viewport selector>);

  $viewport
    .find(<selector for elements>)
    .isInViewport({ tolerance: 100, viewport: $viewport }) // <- passing the viewport jQuery object in directly
    .css(color: 'red');
  ```
- Deprecated `do` in favour of `run`
- When available, `isInViewport` now uses `Sizzle.selectors.createPseudo`

`2.2.5`

- Updated readme to point to new demo. Mostly a bump for npm to pickup the new readme.

`2.2.4`

- Pulled [#15](https://github.com/zeusdeux/isInViewport/pull/15)(fixes horizontal viewport check)

`2.2.3`

- Allow use as CommonJS -> [#19](https://github.com/zeusdeux/isInViewport/pull/19)
- Fixed gruntfile. It now generates proper filenames during build.

`2.2.2`

- Published to `npm`
- Updated install instructions to include `npm`

`2.2.1`

- Pulled in a few bugfixes
- Fixed ie8 bugs

`2.2.0`

- Aliased the `.do` method with `.run` since `do` is a reserved word and errors out when used as a property in IE. To be on the safer side, use `.run` to chain any arbitrary function or an array of functions.

`2.1.0`

- Added a `.do` method that lets the user chain any arbitrary function or an array of functions. Example:

```javascript
//usage 1: pass a function
$( 'div:in-viewport' )
  .do(function(){
    console.log( this ); //will log the current jQuery element object it's being called on
  })
  .css( 'background-color', 'red' );

//usage 2: pass an array of functions
var fnArray = [
                function(){ console.log("Fn 1: %o", this); },
                function(){ console.log("Fn 2: %o", this); }
                //or say another function that maybe adds
                //elements to be tracked when in viewport
              ];
$( 'div:in-viewport' ).do(fnArray);
```

`2.0.0`

- Added support for negative `tolerance` values that are now relative to the `viewport` height
- Added support for custom viewport selector (see [Advanced usage](#advanced-usage))
- Added support for checking if an element is in viewport both horizontally and vertically. (checks both now)
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

`1.1.1`

- Added `bower` support.

`1.1.0`

- Added support for `:in-viewport` selector as per [joeframbach's](http://www.reddit.com/user/joeframbach) suggestion.
