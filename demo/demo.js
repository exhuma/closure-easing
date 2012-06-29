goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Animation');
goog.require('lu.albert.closure.fx.easing');

goog.provide('lu.albert.closure.fx.easing.demo');

lu.albert.closure.fx.easing.demo = function() {

  this.sprite = null;

};


lu.albert.closure.fx.easing.demo.prototype.init = function() {

  this.offsetX = 50;  // page margin.
  this.offsetY = 50;  // page margin.
  this.sprite = goog.dom.getElement('Sprite');
  this.sprite.style.position = 'relative';
  this.sprite.style.backgroundColor = '#000';
  this.sprite.style.left = '50px';
  this.sprite.style.top = '50px';
  this.sprite.style.width = '50px';
  this.sprite.style.height = '50px';

  goog.events.listen(goog.dom.getElement('DummyCanvas'),
      goog.events.EventType.CLICK,
      function(evt) {
          var startx = parseInt(this.sprite.style.left.slice(0, -2));
          var starty = parseInt(this.sprite.style.top.slice(0, -2));
          var endx = evt.clientX-25-this.offsetX;
          var endy = evt.clientY-25-this.offsetY;

          var anim = new goog.fx.Animation([startx, starty], [endx, endy], 500, function(t) { return Math.pow(t, 5); });
          var animationevents = [goog.fx.Animation.EventType.BEGIN,
                                 goog.fx.Animation.EventType.ANIMATE,
                                 goog.fx.Animation.EventType.END];
          goog.events.listen(anim, animationevents, function(t) {
            this.sprite.style.left = t.x + 'px';
            this.sprite.style.top = t.y + 'px';
          }, null, this);
          anim.play();

      }, null, this);

};

