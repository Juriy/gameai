
/**
 * Does the prototype-based inheritance as described in chapter 1.
 * @param subConstructor the constructor function of the subclass
 * @param superConstructor the constructor function of the superclass
 */
function extend(subConstructor, superConstructor) {
    subConstructor.prototype = Object.create(superConstructor.prototype, {
        constructor: {
            value: subConstructor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
}

/**
 * Checks if we're working with the touchscreen or with the
 * regular desktop browser. Used to determine, what kind of events should we use:
 * mouse events or touch events.
 */
function isTouchDevice() {
    return ('ontouchstart' in document.documentElement);
}