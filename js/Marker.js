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

Marker.RED = "#EEA2AD";
Marker.GREEN = "#A2CD5A";
Marker.BLUE = "#9AC0CD";

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