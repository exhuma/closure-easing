goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Animation');
goog.require('lu.albert.closure.fx.easing');

goog.provide('lu.albert.closure.fx.easing.demo');
goog.provide('lu.albert.closure.fx.easing.demo.Plotter');


/**
 * The demo application.
 * @constructor
 */
lu.albert.closure.fx.easing.demo = function() {

  this.sprite = null;
  this.log = goog.debug.Logger.getLogger('demo');

};


/**
 * Class initialisor (run after everything is ready).
 */
lu.albert.closure.fx.easing.demo.prototype.init = function() {

  this.setUpLogging();

  this.offsetX = 50;  // page margin.
  this.offsetY = 50;  // page margin.
  this.sprite = goog.dom.getElement('Sprite');
  this.sprite.style.position = 'relative';
  this.sprite.style.backgroundColor = '#000';
  this.sprite.style.left = '50px';
  this.sprite.style.top = '50px';
  this.sprite.style.width = '50px';
  this.sprite.style.height = '50px';
  this.plotter = new lu.albert.closure.fx.easing.demo.Plotter(
      'PlotBackground', 'PlotForeground');

  goog.events.listen(goog.dom.getElement('DummyCanvas'),
      goog.events.EventType.CLICK,
      function(evt) {
          this.logConsole.clear();
          this.plotter.clear();
          this.log.info('New click event! Clearing console...');
          var startx = parseInt(this.sprite.style.left.slice(0, -2));
          var starty = parseInt(this.sprite.style.top.slice(0, -2));
          var endx = evt.clientX - 25 - this.offsetX;
          var endy = evt.clientY - 25 - this.offsetY;

          var anim = new goog.fx.Animation([startx, starty], [endx, endy], 500,
            lu.albert.closure.fx.easing.Quad.easeOut);
          var animationevents = [goog.fx.Animation.EventType.BEGIN,
                                 goog.fx.Animation.EventType.ANIMATE,
                                 goog.fx.Animation.EventType.END];
          goog.events.listen(anim, animationevents, function(t) {
            this.plotter.drawPoint(t.progress, t.anim.accel_(t.progress));
            this.sprite.style.left = t.x + 'px';
            this.sprite.style.top = t.y + 'px';
          }, null, this);
          anim.play();

      }, null, this);

  this.log.info('Demo code successfully loaded!');

};


/**
 * Sets up logging for this instance.
 */
lu.albert.closure.fx.easing.demo.prototype.setUpLogging = function() {
  this.logConsole = new goog.debug.DivConsole(
      goog.dom.getElement('LogConsole'));
  this.logConsole.setCapturing(true);
  goog.debug.Logger.getLogger('lu.albert.closure.fx.easing').setLevel(
      goog.debug.Logger.Level.FINEST);
};


/**
 * A simple function plotter to visualise the easing functions.
 *
 * @constructor
 * @param {string} bg_id The ID of the background canvas.
 * @param {string} fg_id The ID of the foreground canvas.
 */
lu.albert.closure.fx.easing.demo.Plotter = function(bg_id, fg_id) {
  this.background = goog.dom.getElement(bg_id);
  this.background.style.backgroundColor = 'hsl(190, 100%, 10%)';
  this.foreground = goog.dom.getElement(fg_id);
  this.margin = 20;
  this.axesColor = 'hsl(190, 100%, 80%)';
  this.gridColor = 'hsl(190, 20%, 10%);';
  this.graphBg = 'hsl(190, 100%, 15%)';
  this.bgctx = this.background.getContext('2d');
  this.fgctx = this.foreground.getContext('2d');
  this.plotArea = {
    tl: {x: 0 + this.margin,
         y: 0 + this.margin * 2},
    bl: {x: 0 + this.margin,
         y: this.background.height - this.margin},
    br: {x: this.background.width - this.margin * 2,
         y: this.background.height - this.margin},
    tr: {x: this.background.width - this.margin * 2,
         y: 0 + this.margin * 2}
  };
  this.drawGraphArea();
  this.drawGrid();
  this.drawAxes();
};


/**
 * Clears the forground (the points) from the plotter.
 */
lu.albert.closure.fx.easing.demo.Plotter.prototype.clear = function() {
  this.fgctx.clearRect(0, 0, this.foreground.width, this.foreground.height);
};


/**
 * Draws a point on the graph. It expects the input values to be parametric (as
 * passed to/returned by the easing function).
 *
 * @param {float} x The position on the X-Axis.
 * @param {float} y The position on the Y-Axis.
 */
lu.albert.closure.fx.easing.demo.Plotter.prototype.drawPoint = function(x, y) {
  var plotDims = {
    width: this.plotArea.br.x - this.plotArea.bl.x,
    height: this.plotArea.bl.y - this.plotArea.tl.y};
  var pt = {x: this.plotArea.bl.x + x * plotDims.width,
            y: this.plotArea.bl.y - y * plotDims.height};
  this.fgctx.beginPath();
  this.fgctx.moveTo(pt.x - 5, pt.y - 5);
  this.fgctx.lineTo(pt.x + 5, pt.y + 5);
  this.fgctx.moveTo(pt.x + 5, pt.y - 5);
  this.fgctx.lineTo(pt.x - 5, pt.y + 5);
  this.fgctx.strokeStyle = '#ff0';
  this.fgctx.stroke();
};


/**
 * Draws the graph area on the background. The graph area is the area of
 * possible values (0..1, 0..1).
 *
 * Some easing functions may overshoot these values. So the graph itself has
 * some "spare room" around so the points will be inside the visible area.
 */
lu.albert.closure.fx.easing.demo.Plotter.prototype.drawGraphArea = function() {
  this.bgctx.fillStyle = this.graphBg;
  this.bgctx.fillRect(
      this.plotArea.tl.x,
      this.plotArea.tl.y,
      this.plotArea.br.x - this.plotArea.tl.x,
      this.plotArea.br.y - this.plotArea.tl.y);
};


/**
 * Draws the X- and Y-Axes on the graph.
 */
lu.albert.closure.fx.easing.demo.Plotter.prototype.drawAxes = function() {
  this.bgctx.beginPath();
  this.bgctx.moveTo(this.plotArea.tl.x, this.plotArea.tl.y);
  this.bgctx.lineTo(this.plotArea.bl.x, this.plotArea.bl.y);
  this.bgctx.lineTo(this.plotArea.br.x, this.plotArea.br.y);
  this.bgctx.strokeStyle = this.axesColor;
  this.bgctx.stroke();
};


/**
 * Draws a grid on the graph (with 10 X and Y subdivisions).
 */
lu.albert.closure.fx.easing.demo.Plotter.prototype.drawGrid = function() {
  var cellSize = {
    width: (this.plotArea.tr.x - this.plotArea.tl.x) / 10,
    height: (this.plotArea.bl.y - this.plotArea.tl.y) / 10};

  this.bgctx.beginPath();
  for (i = 1; i <= 10; i++) {
    this.bgctx.moveTo(
        this.plotArea.bl.x + i * cellSize.width, this.plotArea.bl.y);
    this.bgctx.lineTo(
        this.plotArea.tl.x + i * cellSize.width, this.plotArea.tl.y);
    this.bgctx.moveTo(
        this.plotArea.bl.x, this.plotArea.bl.y - i * cellSize.height);
    this.bgctx.lineTo(
        this.plotArea.br.x, this.plotArea.br.y - i * cellSize.height);
  }
  this.bgctx.strokeStyle = this.gridColor;
  this.bgctx.stroke();
};
