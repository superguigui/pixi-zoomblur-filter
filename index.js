var AbstractFilter = require('pixi.js/src/core').AbstractFilter;
var fs = require('fs');

function ZoomBlurFilter() {
  AbstractFilter.call(this,
    null,
    fs.readFileSync(__dirname + '/ZoomBlur.frag', 'utf8'),
    {
      center: { type: 'v2', value: { x: 0.5, y: 0.5 } },
      resolution: { type: 'v2', value: { x: 1.0, y: 1.0 } },
      strength: { type: 'f', value: 0.0 }
    }
  );
}

ZoomBlurFilter.prototype = Object.create(AbstractFilter.prototype);
ZoomBlurFilter.prototype.constructor = ZoomBlurFilter;
module.exports = ZoomBlurFilter;