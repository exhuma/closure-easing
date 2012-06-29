goog.provides('lu.albert.closure.fx.easing');


lu.albert.closure.fx.easing.Back = function() {
};

lu.albert.closure.fx.easing.Back.easeIn = function(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*(t/=d)*t*((s+1)*t - s) + b;
};

lu.albert.closure.fx.easing.Back.easeOut = function(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};

lu.albert.closure.fx.easing.Back.easeInOut = function(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
  return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
};


lu.albert.closure.fx.easing.Bounce = function() {
};

lu.albert.closure.fx.easing.Bounce.easeOut = function(t, b, c, d) {
  if ((t/=d) < (1/2.75)) {
    return c*(7.5625*t*t) + b;
  } else if (t < (2/2.75)) {
    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  } else if (t < (2.5/2.75)) {
    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  } else {
    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  }
};

lu.albert.closure.fx.easing.Bounce.easeIn = function(t, b, c, d) {
  return c - com.robertpenner.easing.Bounce.easeOut (d-t, 0, c, d) + b;
};

lu.albert.closure.fx.easing.Bounce.easeInOut = function(t, b, c, d) {
  if (t < d/2) return com.robertpenner.easing.Bounce.easeIn (t*2, 0, c, d) * .5 + b;
  else return com.robertpenner.easing.Bounce.easeOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
};


lu.albert.closure.fx.easing.Circ = function() {
};

lu.albert.closure.fx.easing.Circ.easeIn = function(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};

lu.albert.closure.fx.easing.Circ.easeOut = function(t, b, c, d) {
  return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
};

lu.albert.closure.fx.easing.Circ.easeInOut = function(t, b, c, d) {
  if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
  return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
};


lu.albert.closure.fx.easing.Cubic = function() {
};

lu.albert.closure.fx.easing.Cubic.easeIn = function(t, b, c, d) {
  return c*(t/=d)*t*t + b;
};

lu.albert.closure.fx.easing.Cubic.easeOut = function(t, b, c, d) {
  return c*((t=t/d-1)*t*t + 1) + b;
};

lu.albert.closure.fx.easing.Cubic.easeInOut = function(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
};



lu.albert.closure.fx.easing.Elastic = function() {
};

lu.albert.closure.fx.easing.Elastic.easeIn = function(t, b, c, d, a, p) {
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
}

lu.albert.closure.fx.easing.Elastic.easeOut = function(t, b, c, d, a, p) {
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
}

lu.albert.closure.fx.easing.Elastic.easeInOut = function(t, b, c, d, a, p) {
  if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
  if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
}


lu.albert.closure.fx.easing.Expo = function() {
};

lu.albert.closure.fx.easing.Expo.easeIn = function(t, b, c, d) {
  return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
};

lu.albert.closure.fx.easing.Expo.easeOut = function(t, b, c, d) {
  return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};

lu.albert.closure.fx.easing.Expo.easeInOut = function(t, b, c, d) {
  if (t==0) return b;
  if (t==d) return b+c;
  if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
  return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
};


lu.albert.closure.fx.easing.Linear = function() {
};

lu.albert.closure.fx.easing.Linear.easeNone = function(t, b, c, d) {
  return c*t/d + b;
};

lu.albert.closure.fx.easing.Linear.easeIn = function(t, b, c, d) {
  return c*t/d + b;
};

lu.albert.closure.fx.easing.Linear.easeOut = function(t, b, c, d) {
  return c*t/d + b;
};

lu.albert.closure.fx.easing.Linear.easeInOut = function(t, b, c, d) {
  return c*t/d + b;
};


lu.albert.closure.fx.easing.Quad = function() {
};

lu.albert.closure.fx.easing.Quad.easeIn = function(t, b, c, d) {
  return c*(t/=d)*t + b;
};

lu.albert.closure.fx.easing.Quad.easeOut = function(t, b, c, d) {
  return -c *(t/=d)*(t-2) + b;
};

lu.albert.closure.fx.easing.Quad.easeInOut = function(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
};


lu.albert.closure.fx.easing.Quart = function() {
};

lu.albert.closure.fx.easing.Quart.easeIn = function(t, b, c, d) {
  return c*(t/=d)*t*t*t + b;
};

lu.albert.closure.fx.easing.Quart.easeOut = function(t, b, c, d) {
  return -c * ((t=t/d-1)*t*t*t - 1) + b;
};

lu.albert.closure.fx.easing.Quart.easeInOut = function(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
  return -c/2 * ((t-=2)*t*t*t - 2) + b;
};


lu.albert.closure.fx.easing.Quint = function() {
};

lu.albert.closure.fx.easing.Quint.easeIn = function(t, b, c, d) {
  return c*(t/=d)*t*t*t*t + b;
};

lu.albert.closure.fx.easing.Quint.easeOut = function(t, b, c, d) {
  return c*((t=t/d-1)*t*t*t*t + 1) + b;
};

lu.albert.closure.fx.easing.Quint.easeInOut = function(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
  return c/2*((t-=2)*t*t*t*t + 2) + b;
};


lu.albert.closure.fx.easing.Sine = function() {
};

lu.albert.closure.fx.easing.Sine.easeIn = function(t, b, c, d) {
  return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

lu.albert.closure.fx.easing.Sine.easeOut = function(t, b, c, d) {
  return c * Math.sin(t/d * (Math.PI/2)) + b;
};

lu.albert.closure.fx.easing.Sine.easeInOut = function(t, b, c, d) {
  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};
