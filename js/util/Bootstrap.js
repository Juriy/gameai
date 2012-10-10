function Bootstrap(canvas) {
    EventEmitter.call(this);
    this.time = new Time();
    this.canvas = canvas;
    this.ctx = null;
    var it = this;

    this.input = new InputHandler(canvas);
    this._animate = this._animate.bind(this);

    var onLoaded = function() {
        if ( document.addEventListener ) {
            document.removeEventListener( "DOMContentLoaded", onLoaded, false );
            it._run();
        }
    };

    if (document.readyState === "complete") {
        setTimeout( function() {it._run()}, 1);
    } else if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", onLoaded, false);
    } else {
        throw "browser not supported";
    }
}

extend(Bootstrap, EventEmitter);
_p = Bootstrap.prototype;

_p._run = function() {
    if (!this.canvas) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = "500";
        this.canvas.height = "500";
        document.getElementsByTagName("body")[0].appendChild(this.canvas);
    } else if (typeof this.canvas === "string") {
        this.canvas = document.getElementById(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d");
    this.input.attachTo(this.canvas);
    this.emit("ready", {});
    this.time.tick();
    this._animate();
};

_p._animate = function() {
    var deltaTime = this.time.elapsed();
    this.time.tick();
    requestAnimationFrame(this._animate);

    this.emit("update", {deltaTime: deltaTime});
    this.emit("draw", {ctx: this.ctx});
};