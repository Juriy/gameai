function KeyboardHandler(element) {
    this._element = null;
    this._boundOnDownDomEvent = this._onDownDomEvent.bind(this);
    this._boundOnUpDomEvent = this._onUpDomEvent.bind(this);
    this._keys = [];

    this.attachTo(element);
}

extend(KeyboardHandler, EventEmitter);
var _p = KeyboardHandler.prototype;

_p.attachTo = function(el) {
    if (this._element) {
        this._detachEventListeners();
    }

    this._element = el;
    if (el) {
        this._attachDomListeners();
    }
};

_p._attachDomListeners = function() {
    var el = this._element;
    el.addEventListener("keydown", this._boundOnDownDomEvent, false);
    el.addEventListener("keyup", this._boundOnUpDomEvent, false);
};

/**
 * Attach the listeners to the mouseXXX DOM events
 */
_p._detachDomListeners = function() {
    var el = this._element;
    el.removeEventListener("keydown", this._boundOnDownDomEvent, false);
    el.removeEventListener("keyup", this._boundOnUpDomEvent, false);
};

_p._onDownDomEvent = function(e) {
    this._keys[e.keyCode] = true;
};

_p._onUpDomEvent = function(e) {
    this._keys[e.keyCode] = false;
};

_p.isPressed = function(code) {
    return this._keys[code];
};

KeyboardHandler.KEY_A = 65;
KeyboardHandler.KEY_D = 68;
KeyboardHandler.KEY_S = 83;
KeyboardHandler.KEY_W = 87;

KeyboardHandler.KEY_SPACE = 32;
KeyboardHandler.KEY_LEFT = 37;
KeyboardHandler.KEY_UP = 38;
KeyboardHandler.KEY_RIGHT = 39;
KeyboardHandler.KEY_DOWN = 40;
