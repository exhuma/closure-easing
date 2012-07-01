/**
 * @fileoverview Easing functions. Useful for the goog.fx.Animation package.
 *
 * The easing functions are based on the code provided by
 * http://www.robertpenner.com/easing/ (as of 2012-06-29)
 */

goog.provide('lu.albert.closure.fx.easing');

goog.require('goog.debug.Logger');


///// Simple ////////////////////////////////////////////////////////////////


/**
 * Linear speed.
 */
lu.albert.closure.fx.easing.Linear = function() {
};


/**
 * This is just here for completeness. It calculates the position using a
 * linear speed. No acceleration, so it's fairly uninteresting.
 *
 * @param {float} p parametric position.
 * @return {float} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.easeNone = function(p) {
  var out = p;
  if (goog.DEBUG) {
    lu.albert.closure.fx.easing.LOGGER.finest(
        'In: ' + p.toFixed(3) +
        ' -> Out: ' + out.toFixed(3));
  }
  return out;
};


/**
 * Ease In function.
 * Identical to ``easeNone``.
 *
 * @param {float} p parametric position.
 * @return {float} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.easeIn =
    lu.albert.closure.fx.easing.Linear.easeNone;


/**
 * Ease Out function.
 * Identical to ``easeNone``.
 *
 * @param {float} p parametric position.
 * @return {float} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.easeOut =
    lu.albert.closure.fx.easing.Linear.easeNone;


/**
 * Ease InOut function.
 *
 * @param {float} p parametric position.
 * @return {float} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.easeInOut =
    lu.albert.closure.fx.easing.Linear.easeNone;


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
 * @param {float} p parametric position.
 * @return {float} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quad.easeInOut = function(p) {
  var out = p;
  if (p < 0.5) {
    out = Math.pow(2 * p * Math.sqrt(0.5), 2);
  } else {
    out = -Math.pow(2 * (p - 1) * Math.sqrt(0.5), 2) + 1;
  }

  if (goog.DEBUG) {
    lu.albert.closure.fx.easing.LOGGER.finest(
        'In: ' + p.toFixed(3) +
        ' -> Out: ' + out.toFixed(3));
  }

  return out;
};


/**
 * Cubic accelleration.
 */
lu.albert.closure.fx.easing.Cubic = function() {
};


/**
 * Ease In function.
 *
 * @param {float} p parametric position.
 * @return {float} Translated parametric position.
 */
lu.albert.closure.fx.easing.Cubic.easeIn = function(p) {
  var out = p;
  out = Math.pow(p, 3);
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
lu.albert.closure.fx.easing.Cubic.easeOut = function(p) {
  var out = p;
  out = Math.pow(p, 1.0 / 3.0);
  if (goog.DEBUG) {
    lu.albert.closure.fx.easing.LOGGER.finest(
        'In: ' + p.toFixed(3) +
        ' -> Out: ' + out.toFixed(3));
  }

  return out;
};


// /**
//  * Ease InOut function.
//  */
// lu.albert.closure.fx.easing.Cubic.easeInOut = function(t, b, c, d) {
// };


// /**
//  * Quartic (x^4) accelleration.
//  */
// lu.albert.closure.fx.easing.Quart = function() {
// };


// /**
//  * Ease In function.
//  */
// lu.albert.closure.fx.easing.Quart.easeIn = function(t, b, c, d) {
// };


// /**
//  * Ease Out function.
//  */
// lu.albert.closure.fx.easing.Quart.easeOut = function(t, b, c, d) {
// };


// /**
//  * Ease InOut function.
//  */
// lu.albert.closure.fx.easing.Quart.easeInOut = function(t, b, c, d) {
// };


// /**
//  * Quintic (x^5) accelleration.
//  */
// lu.albert.closure.fx.easing.Quint = function() {
// };


// /**
//  * Ease In function.
//  */
// lu.albert.closure.fx.easing.Quint.easeIn = function(t, b, c, d) {
// };


// /**
//  * Ease Out function.
//  */
// lu.albert.closure.fx.easing.Quint.easeOut = function(t, b, c, d) {
// };


// /**
//  * Ease InOut function.
//  */
// lu.albert.closure.fx.easing.Quint.easeInOut = function(t, b, c, d) {
// };


// /**
//  * Sinosoidal acceleration (based on cosine).
//  */
// lu.albert.closure.fx.easing.Sine = function() {
// };


// /**
//  * Exponential acceleration.
//  */
// lu.albert.closure.fx.easing.Expo = function() {
// };


// /**
//  * Circular accelleration.
//  */
// lu.albert.closure.fx.easing.Circ = function() {
// };


///// Complex ///////////////////////////////////////////////////////////////


// /**
//  * "Back" easing.
//  *
//  * Animation "overshoots" the target slightly and backtracks to it's
//  * destination.
//  */
// lu.albert.closure.fx.easing.Back = function() {
// };


// /**
//  * "Bounces" at the destination.
//  * Best results when using the ``easeOut`` method.
//  */
// lu.albert.closure.fx.easing.Bounce = function() {
// };


// /**
//  * Slightly overshoots the target and "jitters" into position.
//  *
//  * Best results by using ``easeOut`` or ``easeInOut``
//  */
// lu.albert.closure.fx.easing.Elastic = function() {
// };


/**
 * The class logger
 */
lu.albert.closure.fx.easing.LOGGER =
  goog.debug.Logger.getLogger('lu.albert.closure.fx.easing');
