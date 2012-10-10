/**
 * The implementation of the InputHandler for the touch interfaces.
 * Based on the touch events.
 */
function TouchInputHandler(element) {
    this._lastInteractionCoordinates = null;
    InputHandlerBase.call(this, element);
    this._boundOnDownDomEvent = this._onDownDomEvent.bind(this);
    this._boundOnUpDomEvent = this._onDownDomEvent.bind(this);
    this._boundOnMoveDomEvent = this._onDownDomEvent.bind(this);
    this.attachTo(element);
}

extend(TouchInputHandler, InputHandlerBase);

_p = TouchInputHandler.prototype;

_p._attachDomListeners = function() {
    var el = this._element;
    el.addEventListener("touchstart", this._boundOnDownDomEvent, false);
    el.addEventListener("touchend", this._boundOnUpDomEvent, false);
    el.addEventListener("touchmove", this._boundOnMoveDomEvent, false);
};

_p._detachEventListeners = function() {
    var el = this._element;
    el.removeEventListener("touchstart", this._boundOnDownDomEvent, false);
    el.removeEventListener("touchend", this._boundOnUpDomEvent, false);
    el.removeEventListener("touchmove", this._boundOnMoveDomEvent, false);
};

_p._onDownDomEvent = function(e) {
    this._lastInteractionCoordinates = this._getInputCoordinates(e);
    InputHandlerBase.prototype._onDownDomEvent.call(this, e);
};

_p._onUpDomEvent = function(e) {
    this.emit("up", {
            x: this._lastInteractionCoordinates.x,
            y: this._lastInteractionCoordinates.y,
            moved: this._moving,
            domEvent: e
        });
    this._stopEventIfRequired(e);
    this._lastInteractionCoordinates = null;
    this._moving = false;
};

_p._onMoveDomEvent = function(e) {
    this._lastInteractionCoordinates = this._getInputCoordinates(e);
    InputHandlerBase.prototype._onMoveDomEvent.call(this, e);
};