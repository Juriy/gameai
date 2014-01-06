/**
 * opts: {
 *   canvas: html element or id (as string),
 *   inputHandler: instance of input handler or null, if no input should be supported
 * }
 * @param opts
 * @constructor
 */
function Bootstrap(opts) {
  EventEmitter.call(this);
  this._frameTimer = new Timer();
  this._runTimer = new Timer();
  this._gameTimer = new Timer();
  this._animationRequestId = 0;


  // Bound functions
  this._gameLoop = this._gameLoop.bind(this);
  this._initLoop = this._initLoop.bind(this);

  this._options = Bootstrap._normalizeOptions(opts);
  if (!this._options.canvas) {
    throw "No canvas to attach engine to";
  }

  // Init canvas
  this.canvas = this._options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this._isPaused = !this._options.animated;

  // lazy check for valid values
  this.setClear(this._options.clear);

  if (this._options.clear === "once") {
    this.clear();
  }

  // Init input
  this.input = new this._options.inputHandler(this.canvas);

  this.emit("ready", {});

  // Call this asynchronously
  requestAnimationFrame(this._initLoop);
}

extend(Bootstrap, EventEmitter);
_p = Bootstrap.prototype;

_p.clear = function() {
  this.ctx.fillStyle = this._options.clearColor;
  this.ctx.fillRect(0, 0, this.width, this.height);
};

_p.getClear = function() {
  return this._options.clear;
};

_p.setClear = function(clear) {
  if (["frame", "once", "none"].indexOf(clear) == -1) {
    throw "clear parameter can only be one of: frame, once, none";
  }

  this._options.clear = clear;
  this._clearFrame = clear === "frame";
};

_p.pause = function() {
  if (this._isPaused) {
    return;
  }

  this._isPaused = true;
  this._frameTimer.pause();
  this._gameTimer.pause();
  cancelAnimationFrame(this._animationRequestId);
};

_p.isPaused = function() {
  return this._isPaused;
};

_p.start = function() {

  if (!this._isPaused) {
    return;
  }
  this._isPaused = false;
  this._frameTimer.start();
  this._gameTimer.start();
  this._animationRequestId = requestAnimationFrame(this._gameLoop);
};

_p.destroy = function() {
  cancelAnimationFrame(this._animationRequestId);
  this._frameTimer.pause();
  this._gameTimer.pause();
  this._runTimer.pause();
  this.input.detach();
  this.removeAllListeners();
};

_p._initLoop = function() {
  if (this._isPaused) {
    this._frameTimer.pause();
    this._gameTimer.pause();

    /*
     * This is a special case of dealing with the case when
     * the Bootstrap is initially created as animated and then paused
     * right afterwards. In this case we _do not_ call draw because Bootstrap
     * stops any draws after the call to pause. So basically this is the only place
     * where we do this kind check.
     */
    if (!this._options.animated) {
      this._draw(this.ctx)
    }
  } else {
    this._gameLoop();
  }
};

/**
 * Runs the game loop: first update, then draw
 * @private
 */
_p._gameLoop = function() {
  var deltaTime = this._frameTimer.elapsed();
  this._frameTimer.reset();
  this._animationRequestId = requestAnimationFrame(this._gameLoop);

  this._update(deltaTime);
  this._draw(this.ctx);
};

_p._update = function(deltaTime) {
  if (this._options.update) {
    this._options.update(deltaTime);
  }
  this.emit("update", deltaTime);
};

_p._draw = function(ctx) {

  // Draw phase
  if (this._clearFrame) {
    this.clear();
  }

  if (this._options.draw) {
    this._options.draw(ctx);
  }
  this.emit("draw", ctx);
};


Bootstrap.CLEAR_FRAME = "frame";
Bootstrap.CLEAR_ONCE = "once";
Bootstrap.CLEAR_NONE = "none";

/**
 *
 * @param width the width of the resulting canvas
 * @param height the height of the resulting canvas
 * @returns {HTMLCanvasElement} created canvas
 */
Bootstrap.createCanvas = function(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width || 640;
  canvas.height = height || 480;
  return canvas;
};

/**
 * Takes whatever is passed as the parameter to the constructor
 * and makes options "normal" - fills values with defaults, etc.
 * @param opts
 * @private
 */
Bootstrap._normalizeOptions = function(opts) {
  // defaults
  var noop = function(){};
  var normalOpts = {
    animated: true,
    inputHandler: InputHandler,
    update: noop,
    draw: noop,
    clear: null,
    clearColor: "white"
  };

  if (opts.canvas) {
    _.assign(normalOpts, opts);
  }

  normalOpts.clear = normalOpts.animated ? "frame" : "once";

  normalOpts.canvas = Bootstrap._getCanvas(opts.canvas || opts);

  return normalOpts;
};

/**
 * Returns the canvas, from string or object. Returns null if not found
 * and object is not a canvas
 * @private
 */
Bootstrap._getCanvas = function(canvas) {
  if (typeof canvas === "string") {
    return Bootstrap._getCanvasByString(canvas);
  } else if (Bootstrap._isCanvas(canvas)) {
    return canvas;
  } else {
    return null;
  }
};

/**
 *
 * @param {string} str
 * @returns {object} canvas element
 * @private
 */
Bootstrap._getCanvasByString = function(str) {
  var el = document.getElementById(str);
  if (el && Bootstrap._isCanvas(el)) {
    return el;
  }

  if (typeof document.querySelector === "function") {
    el = document.querySelector(str);
    if (el && Bootstrap._isCanvas(el)) {
      return el;
    }
  }

  return null;
};

/**
 * Returns true if the given object is Canvas
 * @param obj object to test
 * @returns {boolean} true if the object is canvas
 * @private
 */
Bootstrap._isCanvas = function(obj) {
  return obj instanceof HTMLCanvasElement;
};