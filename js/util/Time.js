function Time() {
    this._lastMark = Date.now();
}

var _p = Time.prototype;

_p.tick = function() {
    this._lastMark = Date.now();
};

_p.elapsed = function() {
    return Date.now() - this._lastMark;
};