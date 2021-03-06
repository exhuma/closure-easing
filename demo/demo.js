goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Animation');
goog.require('goog.fx.dom');
goog.require('goog.ui.ColorPalette');
goog.require('goog.ui.ComboBox');
goog.require('goog.ui.ComboBoxItem');
goog.require('goog.ui.Component');
goog.require('goog.ui.TabBar');
goog.require('goog.style');

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
  this.func_map = {};
  this.easingFunction = lu.albert.closure.fx.easing.Quad.easeOut;

};


/**
 * Plotter decorator.
 * Functions decorated with this, will have their output values plotted on the
 * in-page garph. This is meant to plot easing functions taking and returning
 * values from 0 to 1. Other values may not be represented properly. On the
 * other hand, some easing functions may "overshoot" their target, returning
 * values > 1, but returning to 1. This is fine, and the plotter contains some
 * spare room to accomodate this case.
 *
 * @param {lu.albert.closure.fx.easing.demo.Plotter} plotter The plotter.
 * @param {function(number)} f The function to be plotted.
 * @return {function(number)} The decorated function.
 */
lu.albert.closure.fx.easing.demo._plotted = function(plotter, f) {
  return function(x) {
    var result = f(x);
    plotter.drawPoint(x, result);
    return result;
  };
};


/**
 * Converts a hex string to rgb values.
 *
 * @param {string} cssText The CSS color spec (only hex and rgb are supported).
 * @return {Array.<number>} An 3-element (r,g,b) array or [0,0,0] on error.
 */
lu.albert.closure.fx.easing.demo.cssColorToRGB = function(cssText) {

  if (cssText[0] == '#') {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cssText);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  } else {
    var result = /rgb\(([0-9]+), ([0-9]+), ([0-9]+)\)/i.exec(cssText);
    return result ? [
      parseInt(result[1], 10),
      parseInt(result[2], 10),
      parseInt(result[3], 10)
    ] : [0, 0, 0];
  }
};


/**
 * Class initialisor (run after everything is ready).
 */
lu.albert.closure.fx.easing.demo.prototype.init = function() {

  this.setUpLogging();

  var dummyCanvas = goog.dom.getElement('DummyCanvas');

  var canvas_offset = goog.style.getPosition(dummyCanvas);
  this.colorSwatch = goog.dom.getElement('ColorSwatch');
  this.sprite = goog.dom.getElement('Sprite');
  this.sprite.style.position = 'absolute';
  this.sprite.style.backgroundColor = '#000';
  this.sprite.style.left = (canvas_offset.x + 50) + 'px';
  this.sprite.style.top = (canvas_offset.y + 50) + 'px';
  this.sprite.style.width = '50px';
  this.sprite.style.height = '50px';
  this.plotter = new lu.albert.closure.fx.easing.demo.Plotter(
      'PlotBackground', 'PlotForeground');

  this.setUpSelector('AccelSelector');

  goog.events.listen(dummyCanvas,
      goog.events.EventType.CLICK,
      function(evt) {
          this.logConsole.clear();
          this.plotter.clear();
          this.log.info('New click event on (' + evt.clientX +
              ', ' + evt.clientY +
              '). DummyCanvas offset: ' + canvas_offset);
          this.log.info(this.sprite.style.left);
          var startx = parseInt(this.sprite.style.left.slice(0, -2), 10);
          var starty = parseInt(this.sprite.style.top.slice(0, -2), 10);
          var endx = evt.clientX;
          var endy = evt.clientY;
          this.log.info('Moving from ' +
            startx + ', ' + starty + ' to ' + endx + ', ' + endy + ').');

          var anim = new goog.fx.Animation([startx, starty], [endx, endy], 500,
            lu.albert.closure.fx.easing.demo._plotted(this.plotter,
              this.easingFunction));
          var animationevents = [goog.fx.Animation.EventType.BEGIN,
                                 goog.fx.Animation.EventType.ANIMATE,
                                 goog.fx.Animation.EventType.END];
          goog.events.listen(anim, animationevents, function(t) {
            this.sprite.style.left = t.x + 'px';
            this.sprite.style.top = t.y + 'px';
          }, false, this);
          anim.play();

      }, false, this);

  this.picker = new goog.ui.ColorPalette([
    '#ffffff', '#000000',
    '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8',
    '#A2C4C9', '#9FC5E8', '#B4A7D6', '#D5A6BD',
    '#E06666', '#F6B26B', '#FFD966', '#93C47D',
    '#76A5AF', '#6FA8DC', '#8E7CC3', '#C27BA0',
    '#CC0000', '#E69138', '#F1C232', '#6AA84F',
    '#45818E', '#3D85C6', '#674EA7', '#A64D79'
    ]);
  this.picker.setSize(8);
  this.picker.render(goog.dom.getElement('btnPalette'));
  goog.events.listen(this.picker,
      goog.ui.Component.EventType.ACTION, function(evt) {
        this.logConsole.clear();
        this.plotter.clear();
        var palette = evt.target;
        var endColor = lu.albert.closure.fx.easing.demo.cssColorToRGB(
          palette.getSelectedColor());
        var startColor = lu.albert.closure.fx.easing.demo.cssColorToRGB(
          this.colorSwatch.style.backgroundColor);
        var anim = new goog.fx.dom.BgColorTransform(
          this.colorSwatch, startColor, endColor, 500,
          lu.albert.closure.fx.easing.demo._plotted(this.plotter,
            this.easingFunction));
        anim.play();
      }, false, this);

  this.setUpTabBar('top');

  this.log.info('Demo code successfully loaded!');

};


/**
 * Sets up the tab bar
 *
 * @param {string} id The HTML ID of the container of the tabs
 */
lu.albert.closure.fx.easing.demo.prototype.setUpTabBar = function(id) {
  var topTab = new goog.ui.TabBar();
  topTab.decorate(goog.dom.getElement(id));
  var positioning_content = goog.dom.getElement('positioning_content')
  var log_content = goog.dom.getElement('log_content')
  var color_content = goog.dom.getElement('color_content')
  var help_content = goog.dom.getElement('help_content')

  goog.style.showElement(positioning_content, false);
  goog.style.showElement(log_content, false);
  goog.style.showElement(color_content, false);
  goog.style.showElement(help_content, true);

  goog.events.listen(topTab, goog.ui.Component.EventType.SELECT,
      function(e) {
        var tabSelected = e.target;
        if (tabSelected.getCaption() == 'Help') {
          goog.style.showElement(positioning_content, false);
          goog.style.showElement(log_content, false);
          goog.style.showElement(color_content, false);
          goog.style.showElement(help_content, true);
        } else if (tabSelected.getCaption() == 'Position Easing') {
          goog.style.showElement(positioning_content, true);
          goog.style.showElement(log_content, false);
          goog.style.showElement(color_content, false);
          goog.style.showElement(help_content, false);
        } else if (tabSelected.getCaption() == 'Color Easing') {
          goog.style.showElement(positioning_content, false);
          goog.style.showElement(log_content, false);
          goog.style.showElement(color_content, true);
          goog.style.showElement(help_content, false);
        } else if (tabSelected.getCaption() == 'Log') {
          goog.style.showElement(positioning_content, false);
          goog.style.showElement(log_content, true);
          goog.style.showElement(color_content, false);
          goog.style.showElement(help_content, false);
        }
      });
};


/**
 * Sets up the selector for the easing function.
 *
 * @param {string} id The HTML ID of the container of the combo-box.
 */
lu.albert.closure.fx.easing.demo.prototype.setUpSelector = function(id) {
  var funs = [
    ['Linear speed', lu.albert.closure.fx.easing.Linear.easeNone],
    ['Linear ping-pong', lu.albert.closure.fx.easing.Linear.pingPong],
    ['Quadratic Ease In', lu.albert.closure.fx.easing.Quad.easeIn],
    ['Quadratic Ease Out', lu.albert.closure.fx.easing.Quad.easeOut],
    ['Quadratic Ease In/Out', lu.albert.closure.fx.easing.Quad.easeInOut],
    ['Cubic Ease In', lu.albert.closure.fx.easing.Cubic.easeIn],
    ['Cubic Ease Out', lu.albert.closure.fx.easing.Cubic.easeOut],
    ['Cubic Ease In/Out', lu.albert.closure.fx.easing.Cubic.easeInOut],
    ['Quartic Ease In', lu.albert.closure.fx.easing.Quart.easeIn],
    ['Quartic Ease Out', lu.albert.closure.fx.easing.Quart.easeOut],
    ['Quartic Ease In/Out', lu.albert.closure.fx.easing.Quart.easeInOut],
    ['Quintic Ease In', lu.albert.closure.fx.easing.Quint.easeIn],
    ['Quintic Ease Out', lu.albert.closure.fx.easing.Quint.easeOut],
    ['Quintic Ease In/Out', lu.albert.closure.fx.easing.Quint.easeInOut],
    ['Sinusoidal Ease In/Out', lu.albert.closure.fx.easing.Sine.easeInOut],
    ['Sinusoidal ping-pong', lu.albert.closure.fx.easing.Sine.pingPong]
  ];

  // store references to the functions, so we can get at them when the user
  // selects one in the combobox.
  goog.array.forEach(funs, function(element) {
    this.func_map[element[0]] = element[1];
  }, this);
  var cb = new goog.ui.ComboBox();
  cb.setUseDropdownArrow(true);
  cb.setDefaultText('Select an easing function...');
  var caption = new goog.ui.ComboBoxItem('Select function...');
  caption.setSticky(true);
  caption.setEnabled(false);
  cb.addItem(caption);
  goog.array.forEach(funs, function(elem) {
      var item = new goog.ui.ComboBoxItem(elem[0]);
      cb.addItem(item);
      }, this);
  cb.render(goog.dom.getElement(id));
  goog.events.listen(cb, 'change', function(evt) {
    this.easingFunction = this.func_map[evt.target.getValue()];
  }, false, this);
};


/**
 * Sets up logging for this instance.
 */
lu.albert.closure.fx.easing.demo.prototype.setUpLogging = function() {
  this.logConsole = new goog.debug.DivConsole(
      goog.dom.getElement('LogConsole'));
  this.logConsole.setCapturing(true);
  goog.debug.Logger.getLogger('goog.ui.ComboBox').setLevel(
      goog.debug.Logger.Level.OFF);
  goog.debug.Logger.getLogger('lu.albert.closure.fx.easing').setLevel(
      goog.debug.Logger.Level.ALL);
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
 * @param {number} x The position on the X-Axis.
 * @param {number} y The position on the Y-Axis.
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
  for (var i = 1; i <= 10; i++) {
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


goog.exportSymbol('lu.albert.closure.fx.easing.demo',
    lu.albert.closure.fx.easing.demo);
