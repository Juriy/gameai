
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
    return subConstructor.prototype;
}

/**
 * Checks if we're working with the touchscreen or with the
 * regular desktop browser. Used to determine, what kind of events should we use:
 * mouse events or touch events.
 */
function isTouchDevice() {
    return ('ontouchstart' in document.documentElement);
}

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var fSlice = Array.prototype.slice,
            aArgs = fSlice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis || window,
                    aArgs.concat(fSlice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}