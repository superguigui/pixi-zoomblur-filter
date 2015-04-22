import bindAll from 'lodash/function/bindAll';
import raf from 'raf';
import resize from 'brindille-resize';
import dat from 'dat-gui';
import PIXI from 'pixi.js';

import ZoomBlurFilter from '../index.js';

export default class App {
  constructor(options) {

    options = options || {};

    this.$container = options.container || document.body;

    bindAll(this, 'render');
    
    this.renderer = new PIXI.WebGLRenderer(resize.width, resize.height, {
        antialias: true,
        transparent: false,
        resolution:1
    });
    this.$container.appendChild(this.renderer.view);

    this.scene = new PIXI.Container();

    this.backgroundPlane = new PIXI.Graphics();
    this.backgroundPlane.beginFill(0x0B0B0B);
    this.backgroundPlane.drawRect(0, 0, resize.width, resize.height);
    this.backgroundPlane.endFill();
    this.scene.addChild(this.backgroundPlane);

    this.container = new PIXI.Container();
    this.scene.addChild(this.container);

    this.triangleShape = new PIXI.Graphics();
    this.triangleShape.lineStyle(2, 0xFF6230);
    this.triangleShape.moveTo(0, 0);
    this.triangleShape.lineTo(200, 200);
    this.triangleShape.lineTo(0, 200);
    this.triangleShape.lineTo(0, 0);
    this.container.addChild(this.triangleShape);
    this.triangleShape.x = resize.width * 0.5;
    this.triangleShape.y = resize.height * 0.5;
    this.triangleShape.pivot.x = 100
    this.triangleShape.pivot.y = 100

    this.circleShape = new PIXI.Graphics();
    this.circleShape.lineStyle(2, 0x62FF30);
    this.circleShape.drawCircle(0, 0, 30);
    this.container.addChild(this.circleShape);
    this.circleShape.x = resize.width * 0.5 - 100 - 15;
    this.circleShape.y = resize.height * 0.5 - 15;

    this.rectangleShape = new PIXI.Graphics();
    this.rectangleShape.beginFill(0x6230FF);
    this.rectangleShape.drawRect(0, 0, 100, 100);
    this.container.addChild(this.rectangleShape);
    this.rectangleShape.x = resize.width * 0.5 + 100;
    this.rectangleShape.y = resize.height * 0.5;

    var zoomBlurFilter = new ZoomBlurFilter();
    zoomBlurFilter.uniforms.strength.value = 0.06;

    this.gui = new dat.GUI();
    
    this.gui.add(zoomBlurFilter.uniforms.strength, 'value', 0, 1).name('strength').step(0.001);
    this.gui.add(zoomBlurFilter.uniforms.center.value, 'x', 0, 1).name('center x').step(0.001);
    this.gui.add(zoomBlurFilter.uniforms.center.value, 'y', 0, 1).name('center y').step(0.001);

    this.scene.filters = [zoomBlurFilter];

    raf(this.render);
  }

  render() {
    raf(this.render);

    this.triangleShape.rotation += 0.01;
    
    this.renderer.render(this.scene);
  }
}