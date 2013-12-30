/**
 * The implementation of the InputHandler for the desktop
 * browser based on the mouse events.
 */
function MouseInputHandler(element) {
    InputHandlerBase.call(this, element);

    // We need additional property to track if the
    // mouse is down.
    this._mouseDown = false;

    this._boundOnDownDomEvent = this._onDownDomEvent.bind(this);
    this._boundOnUpDomEvent = this._onUpDomEvent.bind(this);
    this._boundOnMoveDomEvent = this._onMoveDomEvent.bind(this);
    this._boundOnMouseOut = this._onMouseOut.bind(this);

    this._coords = {x: -1, y: -1};

    this.attachTo(element);
}

extend(MouseInputHandler, InputHandlerBase);

_p = MouseInputHandler.prototype;

_p.isDown = function() {
    return this._mouseDown;
};

_p.getCoordinates = function() {
    return this._coords;
};

/**
 * Attach the listeners to the mouseXXX DOM events
 */
_p._attachDomListeners = function() {
    var el = this._element;
    el.addEventListener("mousedown", this._boundOnDownDomEvent, false);
    el.addEventListener("mouseup", this._boundOnUpDomEvent, false);
    el.addEventListener("mousemove", this._boundOnMoveDomEvent, false);
    el.addEventListener("mouseout", this._boundOnMouseOut, false);
};

/**
 * Attach the listeners to the mouseXXX DOM events
 */
_p._detachDomListeners = function() {
    var el = this._element;
    el.removeEventListener("mousedown", this._boundOnDownDomEvent, false);
    el.removeEventListener("mouseup", this._boundOnUpDomEvent, false);
    el.removeEventListener("mousemove", this._boundOnMoveDomEvent, false);
    el.removeEventListener("mouseout", this._boundOnMouseOut, false);
};

/**
 * This method (and the next one) is overridden,
 * because we have to track the state of the mouse.
 * This could also be done in the separate listener.
 */
_p._onDownDomEvent = function(e) {
    this._mouseDown = true;
    InputHandlerBase.prototype._onDownDomEvent.call(this, e);
};

_p._onUpDomEvent = function(e) {
    this._mouseDown = false;
    InputHandlerBase.prototype._onUpDomEvent.call(this, e);
};

/**
 * We process the move event only if the mouse button is
 * pressed, otherwise the DOM event is ignored.
 */
_p._onMoveDomEvent = function(e) {
    if (this._mouseDown) {
        InputHandlerBase.prototype._onMoveDomEvent.call(this, e);
    } else {
        this._onHoverDomEvent(e);
    }
};

/**
 * Hover is for pointer-enabled interfaces. Should rename
 * move -> drag
 * hover -> move
 *
 * TODO: support deltas in hover
 */
_p._onHoverDomEvent = function(e) {
    var coords = this._coords = this._getInputCoordinates(e);
    this.emit("hover", {x: coords.x, y: coords.y,
        /*deltaX: deltaX, deltaY: deltaY,*/ domEvent: e});
    this._stopEventIfRequired(e);
};

_p._onMouseOut = function() {
    this._mouseDown = false;
};