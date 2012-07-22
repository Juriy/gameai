function Marker(x, y, color) {
	this._x = x;
	this._y = y;
    this._color = color || "#9AC0CD";
}

_p = Marker.prototype;

_p.draw = function(ctx) {
	ctx.strokeStyle = this._color;
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(this._x - 10, this._y + 10);
	ctx.lineTo(this._x + 10, this._y - 10);
	ctx.moveTo(this._x - 10, this._y - 10);
	ctx.lineTo(this._x + 10, this._y + 10);
	ctx.stroke();
	ctx.lineWidth = 1;
};

_p.update = function(time) {
	
};

Marker.blue = function(x, y) {
    return new Marker(x, y, "#9AC0CD");
};

Marker.red = function(x, y) {
    return new Marker(x, y, "#EEA2AD");
};

Marker.green = function(x, y) {
    return new Marker(x, y, "#A2CD5A");
};