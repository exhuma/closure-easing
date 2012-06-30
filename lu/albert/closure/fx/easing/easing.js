/**
 * @fileoverview Easing functions. Useful for the goog.fx.Animation package.
 *
 * The easing functions are based on the code provided by
 * http://www.robertpenner.com/easing/ (as of 2012-06-29)
 */

goog.provide('lu.albert.closure.fx.easing');

goog.require('goog.debug.Logger');


/**
 * "Back" easing.
 *
 * Animation "overshoots" the target slightly and backtracks to it's
 * destination.
 */
lu.albert.closure.fx.easing.Back = function() {
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @param {float} s ?
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Back.easeIn = function(t, b, c, d, s) {
  if (!goog.isDefAndNotNull(s)) {
    s = 1.70158;
  }
  return c * (t /= d) * t * ((s + 1) * t - s) + b;
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @param {float} s ?
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Back.easeOut = function(t, b, c, d, s) {
  if (!goog.isDefAndNotNull(s)) {
    s = 1.70158;
  }
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @param {float} s TODO!
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Back.easeInOut = function(t, b, c, d, s) {
  if (!goog.isDefAndNotNull(s)) {
    s = 1.70158;
  }
  if ((t /= d / 2) < 1) {
    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
  }
  return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
};


/**
 * "Bounces" at the destination.
 * Best results when using the ``easeOut`` method.
 */
lu.albert.closure.fx.easing.Bounce = function() {
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Bounce.easeOut = function(t, b, c, d) {
  if ((t /= d) < (1 / 2.75)) {
    return c * (7.5625 * t * t) + b;
  } else if (t < (2 / 2.75)) {
    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
  } else if (t < (2.5 / 2.75)) {
    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
  } else {
    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
  }
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Bounce.easeIn = function(t, b, c, d) {
  return c - lu.albert.closure.fx.easing.Bounce.easeOut(d - t, 0, c, d) + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Bounce.easeInOut = function(t, b, c, d) {
  if (t < d / 2) {
    return lu.albert.closure.fx.easing.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
  } else {
    return lu.albert.closure.fx.easing.Bounce.easeOut(t * 2 - d, 0, c, d) *
        .5 + c * .5 + b;
  }
};


/**
 * Circular accelleration.
 */
lu.albert.closure.fx.easing.Circ = function() {
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Circ.easeIn = function(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Circ.easeOut = function(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Circ.easeInOut = function(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
  }
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};


/**
 * Cubic accelleration.
 */
lu.albert.closure.fx.easing.Cubic = function() {
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Cubic.easeIn = function(t, b, c, d) {
  return c * (t /= d) * t * t + b;
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Cubic.easeOut = function(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Cubic.easeInOut = function(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t + b;
  }
  return c / 2 * ((t -= 2) * t * t + 2) + b;
};


/**
 * Slightly overshoots the target and "jitters" into position.
 *
 * Best results by using ``easeOut`` or ``easeInOut``
 */
lu.albert.closure.fx.easing.Elastic = function() {
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @param {float} a TODO!
 * @param {float} p TODO!
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Elastic.easeIn = function(t, b, c, d, a, p) {
  if (t == 0) {
    return b;
  }

  if ((t /= d) == 1) {
    return b + c;
  }

  if (!p) {
    p = d * .3;
  }

  if (!a || a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else {
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  }
  return -(a * Math.pow(2, 10 * (t -= 1)) *
      Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @param {float} a TODO!
 * @param {float} p TODO!
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Elastic.easeOut = function(t, b, c, d, a, p) {
  if (t == 0) {
    return b;
  }

  if ((t /= d) == 1) {
    return b + c;
  }

  if (!p) {
    p = d * .3;
  }

  if (!a || a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  }

  else var s = p / (2 * Math.PI) * Math.asin(c / a);
  return (a * Math.pow(2, -10 * t) *
      Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @param {float} a TODO!
 * @param {float} p TODO!
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Elastic.easeInOut = function(t, b, c, d, a, p) {
  if (t == 0) {
    return b;
  }

  if ((t /= d / 2) == 2) {
    return b + c;
  }

  if (!p) {
    p = d * (.3 * 1.5);
  }

  if (!a || a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else {
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  }

  if (t < 1) {
    return -.5 * (a * Math.pow(2, 10 * (t -= 1)) *
        Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  }

  return a * Math.pow(2, - 10 * (t -= 1)) *
      Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
};


/**
 * Exponential acceleration.
 */
lu.albert.closure.fx.easing.Expo = function() {
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Expo.easeIn = function(t, b, c, d) {
  if (t == 0) {
    return b;
  }
  return c * Math.pow(2, 10 * (t / d - 1)) + b;
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Expo.easeOut = function(t, b, c, d) {
  if (t == d) {
    return b + c;
  }
  return c * (-Math.pow(2, -10 * t / d) + 1) + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Expo.easeInOut = function(t, b, c, d) {
  if (t == 0) {
    return b;
  }

  if (t == d) {
    return b + c;
  }

  if ((t /= d / 2) < 1) {
    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  }

  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};


/**
 * Linear speed.
 */
lu.albert.closure.fx.easing.Linear = function() {
};


/**
 * This is just here for completeness. It calculates the position using a
 * linear speed. No acceleration, so it's fairly uninteresting.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Linear.easeNone = function(t, b, c, d) {
  return c * t / d + b;
};


/**
 * Ease In function.
 * Identical to ``easeNone``.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Linear.easeIn = function(t, b, c, d) {
  return c * t / d + b;
};


/**
 * Ease Out function.
 * Identical to ``easeNone``.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Linear.easeOut = function(t, b, c, d) {
  return c * t / d + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Linear.easeInOut = function(t, b, c, d) {
  return c * t / d + b;
};


/**
 * Quadratic acceleration.
 */
lu.albert.closure.fx.easing.Quad = function() {
};


/**
 * Ease In function.
 *
 * @param {float} p parametric position.
 * @return {float} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quad.easeIn = function(p) {
  var out = Math.pow(p, 2);
  if (goog.DEBUG) {
    lu.albert.closure.fx.easing.LOGGER.finest(
        'In: ' + p.toFixed(3) +
        ' -> Out: ' + out.toFixed(3));
  }
  return out;
};


/**
 * Ease Out function.
 *
 * @param {float} p parametric position.
 * @return {float} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quad.easeOut = function(p) {
  var out = Math.sqrt(p);
  if (goog.DEBUG) {
    lu.albert.closure.fx.easing.LOGGER.finest(
        'In: ' + p.toFixed(3) +
        ' -> Out: ' + out.toFixed(3));
  }
  return out;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Quad.easeInOut = function(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t + b;
  }

  return -c / 2 * ((--t) * (t - 2) - 1) + b;
};


/**
 * Quartic (x^4) accelleration.
 */
lu.albert.closure.fx.easing.Quart = function() {
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Quart.easeIn = function(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Quart.easeOut = function(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Quart.easeInOut = function(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t + b;
  }

  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};


/**
 * Quintic (x^5) accelleration.
 */
lu.albert.closure.fx.easing.Quint = function() {
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Quint.easeIn = function(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Quint.easeOut = function(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Quint.easeInOut = function(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t * t + b;
  }

  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
};


/**
 * Sinosoidal acceleration (based on cosine).
 */
lu.albert.closure.fx.easing.Sine = function() {
};


/**
 * Ease In function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Sine.easeIn = function(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};


/**
 * Ease Out function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Sine.easeOut = function(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
};


/**
 * Ease InOut function.
 *
 * @param {float} t time.
 * @param {float} b begin.
 * @param {float} c change.
 * @param {float} d duration (in ms).
 * @return {float} The position at time t.
 */
lu.albert.closure.fx.easing.Sine.easeInOut = function(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};


lu.albert.closure.fx.easing.LOGGER = goog.debug.Logger.getLogger('lu.albert.closure.fx.easing');
