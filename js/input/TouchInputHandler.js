/**
 * The implementation of the InputHandler for the touch interfaces.
 * Based on the touch events.
 */
function TouchInputHandler(element) {
    this._lastInteractionCoordinates = null;
    InputHandlerBase.call(this, element);
    this._onDownDomEvent = this._onDownDomEvent.bind(this);
    this._onUpDomEvent = this._onDownDomEvent.bind(this);
    this._onMoveDomEvent = this._onDownDomEvent.bind(this);
    this.attachTo(element);
}

extend(TouchInputHandler, InputHandlerBase);

_p = TouchInputHandler.prototype;

_p._attachDomListeners = function() {
    var el = this._element;
    el.addEventListener("touchstart", this._onDownDomEvent, false);
    el.addEventListener("touchend", this._onUpDomEvent, false);
    el.addEventListener("touchmove", this._onMoveDomEvent, false);
};

_p._detachDomListeners = function() {
    var el = this._element;
    el.removeEventListener("touchstart", this._onDownDomEvent, false);
    el.removeEventListener("touchend", this._onUpDomEvent, false);
    el.removeEventListener("touchmove", this._onMoveDomEvent, false);
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