# pixi-zoomblur-filter

Pixi.js (>v3) ZoomBlur filter ported from Wagner.js

[demo](http://superguigui.github.io/pixi-zoomblur-filter)


## Usage
It's respecting PIXI.js model for loading shader with `brfs` as a `browserify` transform.
For a browserify setup example working with brfs check the demo folder.


## Example

```javascript
var ZoomBlurFilter = require('ZoomBlurFilter');

var zoomBlurFilter = new ZoomBlurFilter();
zoomBlurFilter.uniforms.strength.value = 0.06;
pixiContainer.filters = [zoomBlurFilter];
```