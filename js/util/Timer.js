function Timer() {
  this._mark = Date.now();
  this._paused = false;
  this._timeBeforePause = 0;
}

var _p = Timer.prototype;

_p.reset = function() {
  this._mark = Date.now();
  this._timeBeforePause = 0;
};

_p.pause = function() {
  this._timeBeforePause += Date.now() - this._mark;
  this._paused = true;
};

_p.start = function() {
  this._mark = Date.now();
  this._paused = false;
};

_p.elapsed = function() {
  if (this._paused) {
    return this._timeBeforePause;
  } else {
    return this._timeBeforePause + (Date.now() - this._mark);
  }
};