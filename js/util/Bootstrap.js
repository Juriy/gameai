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

  // Bound functions
  this._animate = this._animate.bind(this);

  this._options = Bootstrap._normalizeOptions(opts);
  if (!this._options.canvas) {
    throw "No canvas to attach engine to";
  }

  // Init canvas
  this.canvas = this._options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.width = this.canvas.width;
  this.height = this.canvas.height;

  if (this._options.clear === "once") {
    this.ctx.fillStyle = this._options.clearColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  this._clearFrame = this._options.clear === "frame";

  // Init input
  this.input = new this._options.inputHandler(this.canvas);

  this.emit("ready", {});
  this._frameTimer.reset();
  this._animate();
}

extend(Bootstrap, EventEmitter);
_p = Bootstrap.prototype;


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
    clearColor: "white",
    clear: "frame"
  };

  if (opts.canvas) {
    _.assign(normalOpts, opts);
  }

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

Bootstrap._isCanvas = function(obj) {
  return obj instanceof HTMLCanvasElement;
};

/**
 *
 * @param width
 * @param height
 * @returns {*}
 */
Bootstrap.createCanvas = function(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width || 640;
  canvas.height = height || 480;
  return canvas;
};

_p._animate = function() {
  var deltaTime = this._frameTimer.elapsed();
  var ctx = this.ctx;
  this._frameTimer.reset();
  requestAnimationFrame(this._animate);

  // Update phase
  if (this._options.update) {
    this._options.update(deltaTime);
  }
  this.emit("update", {deltaTime: deltaTime});

  // Draw phase
  if (this._clearFrame) {
    ctx.fillStyle = this._options.clearColor;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  if (this._options.draw) {
    this._options.draw(ctx);
  }
  this.emit("draw", {ctx: ctx});
};