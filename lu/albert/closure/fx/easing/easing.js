/**
 * @fileoverview Easing functions. Useful for the goog.fx.Animation package.
 *
 * The easing functions are based on the code provided by
 * http://www.robertpenner.com/easing/ (as of 2012-06-29)
 */

goog.provide('lu.albert.closure.fx.easing');

goog.require('goog.debug.Logger');


/**
 * Calls function ``f`` while logging the resulting values if necessary.
 * Note: This expects the function ``f`` to take only one parameter!
 *
 * @param {function(number)} f The function that needs logging.
 * @return {function(number)} A function where the in/out parameter is logged.
 */
lu.albert.closure.fx.easing._loggedCall = function(f) {

  var loggedFunc = function(p) {
    var out = f(p);
    if (goog.DEBUG) {
      lu.albert.closure.fx.easing.LOGGER.finest(
        p.toFixed(3) +
        ' -> ' + out.toFixed(3));
    }
    return out;
  };

  return loggedFunc;

};


/**
 * Creates an ease in/out function for polynomials.
 *
 * @param {number} p The power of the polynomial.
 * @return {function(number)} A function which can be used for "in/out"
 *                            easings.
 */
lu.albert.closure.fx.easing._polynomialInOut = function(p) {
  var fun = function(x) {
    if (x < 0.5) {
      return Math.pow(2, p - 1) * Math.pow(x, p);
    } else {
      var a = Math.pow(2, p - 1);
      if (p % 2 == 0) {
        return -a * Math.pow(x - 1, p) + 1;
      } else {
        return a * Math.pow(x - 1, p) + 1;
      }
    }
  };
  return fun;
};


/**
 * Creates an ease in function for polynomials.
 *
 * @param {number} p The power of the polynomial.
 * @return {function(number)} A function which can be used for "in" easings.
 */
lu.albert.closure.fx.easing._polynomialIn = function(p) {
  var fun = function(x) {
    return Math.pow(x, p);
  };
  return fun;
};


/**
 * Creates an ease out function for polynomials.
 *
 * @param {number} p The power of the polynomial.
 * @return {function(number)} A function which can be used for "out" easings.
 */
lu.albert.closure.fx.easing._polynomialOut = function(p) {
  var fun = function(x) {
    return Math.pow(x, 1.0 / p);
  };
  return fun;
};


///// Very Simple (Convenience) /////////////////////////////////////////////


/**
 * Linear speed.
 */
lu.albert.closure.fx.easing.Linear = function() {
};


/**
 * This is just here for completeness. It calculates the position using a
 * linear speed. No acceleration, so it's fairly uninteresting.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.easeNone = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(function(p) {return p;});
  return f(p);
};


/**
 * Ease In function.
 * Identical to ``easeNone``.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.easeIn =
    lu.albert.closure.fx.easing.Linear.easeNone;


/**
 * Ease Out function.
 * Identical to ``easeNone``.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.easeOut =
    lu.albert.closure.fx.easing.Linear.easeNone;


/**
 * Ease InOut function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.easeInOut =
    lu.albert.closure.fx.easing.Linear.easeNone;


/**
 * Ping-Pong function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Linear.pingPong = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(function(x) {
      return -Math.abs(2 * x - 1) + 1;
  });
  return f(p);
};


/**
 * Quadratic acceleration.
 */
lu.albert.closure.fx.easing.Quad = function() {
};


/**
 * Ease In function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quad.easeIn = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing._polynomialIn(2));
  return f(p);
};


/**
 * Ease Out function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quad.easeOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing._polynomialOut(2));
  return f(p);
};


/**
 * Ease InOut function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quad.easeInOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
      lu.albert.closure.fx.easing._polynomialInOut(2));
  return f(p);
};


/**
 * Cubic accelleration.
 */
lu.albert.closure.fx.easing.Cubic = function() {
};


/**
 * Ease In function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Cubic.easeIn = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing._polynomialIn(3));
  return f(p);
};


/**
 * Ease Out function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Cubic.easeOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing._polynomialOut(3));
  return f(p);
};


/**
 * Ease InOut function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Cubic.easeInOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
      lu.albert.closure.fx.easing._polynomialInOut(3));
  return f(p);
};


/**
 * Quartic (x^4) accelleration.
 */
lu.albert.closure.fx.easing.Quart = function() {
};


/**
 * Ease In function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quart.easeIn = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing._polynomialIn(4));
  return f(p);
};


/**
 * Ease Out function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quart.easeOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing._polynomialOut(4));
  return f(p);
};


/**
 * Ease InOut function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quart.easeInOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
      lu.albert.closure.fx.easing._polynomialInOut(4));
  return f(p);
};


/**
 * Quintic (x^5) accelleration.
 */
lu.albert.closure.fx.easing.Quint = function() {
};


/**
 * Ease In function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quint.easeIn = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing._polynomialIn(5));
  return f(p);
};


/**
 * Ease Out function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quint.easeOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing._polynomialOut(5));
  return f(p);
};


/**
 * Ease InOut function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Quint.easeInOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
      lu.albert.closure.fx.easing._polynomialInOut(5));
  return f(p);
};

///// Basic /////////////////////////////////////////////////////////////////


/**
 * Sinosoidal acceleration (based on cosine).
 */
lu.albert.closure.fx.easing.Sine = function() {
};

/**
 * Create a sinosoidal easing function. TIP: If the factor is even, the value
 * will return to 0. For uneven factors, it will move to 1.
 *
 * @param {number} f The factor (frequency).
 * @return {function(number)} A function which can be used for easings.
 */
lu.albert.closure.fx.easing.Sine._generic = function(f) {
  var fun = function(x) {
    return Math.cos(f * Math.PI * x + Math.PI) / 2 + 0.5;
  };
  return fun;
};


/**
 * Ease InOut function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Sine.easeInOut = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing.Sine._generic(1));
  return f(p);
};

/**
 * Ping-Pong function.
 *
 * @param {number} p parametric position.
 * @return {number} Translated parametric position.
 */
lu.albert.closure.fx.easing.Sine.pingPong = function(p) {
  var f = lu.albert.closure.fx.easing._loggedCall(
    lu.albert.closure.fx.easing.Sine._generic(2));
  return f(p);
};


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
