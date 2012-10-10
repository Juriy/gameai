function Marker(x, y, color) {
	this._x = x;
	this._y = y;
    this._color = color || "#9AC0CD";
}

_p = Marker.prototype;

_p.draw = function(ctx) {
    // for small marker
    // size = 5; lineWidth = 3;
    Shapes.drawMarker(ctx, this._x, this._y, 10, 5, this._color);
};

_p.update = function(time) { };

_p.setPosition = function(x, y) {
    this._x = x;
    this._y = y;
};

_p.getPosition = function(x, y) {
    return {
        x: this._x,
        y: this._y
    };
};

Marker.RED = "#EEA2AD";
Marker.GREEN = "#A2CD5A";
Marker.BLUE = "#9AC0CD";

Marker.randomColor = function() {
    return [Marker.RED, Marker.GREEN, Marker.BLUE][Math.floor(Math.random()*3)];
};

Marker.drawAt = function(ctx, x, y, color) {
    new Marker(x, y, color).draw(ctx);
};

Marker.blue = function(x, y) {
    return new Marker(x, y, Marker.BLUE);
};

Marker.red = function(x, y) {
    return new Marker(x, y, Marker.RED);
};

Marker.green = function(x, y) {
    return new Marker(x, y, Marker.GREEN);
};