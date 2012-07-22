function RadiusMarker(x, y, radius, color) {
    Marker.call(this, x, y, color);
    this._radius = radius;
}

extend(RadiusMarker, Marker);
_p = RadiusMarker.prototype;

_p.draw = function(ctx) {
    ctx.fillStyle = "rgba(99, 99, 99, 0.25)";
    ctx.strokeStyle = "darkgray";
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
    Marker.prototype.draw.call(this, ctx);
};

RadiusMarker.blue = function(x, y, radius) {
    return new RadiusMarker(x, y, radius, "#9AC0CD");
};

RadiusMarker.red = function(x, y, radius) {
    return new RadiusMarker(x, y, radius, "#EEA2AD");
};

RadiusMarker.green = function(x, y, radius) {
    return new RadiusMarker(x, y, radius, "#A2CD5A");
};