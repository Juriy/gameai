function Obstacle(points) {
	this._points = points;
    this._drawBoundingRect = false;
    this._boundingRect = MathUtils.getBoundingRectangle(points);
}

_p = Obstacle.prototype;

_p.setDrawBoundingRect = function(drawBoundingRect) {
    this._drawBoundingRect = drawBoundingRect;
};

_p.draw = function(ctx) {
    Shapes.drawPolygon(ctx, this._points);
    Shapes.fillPolygon(ctx, this._points);
};

_p.update = function(time) {
};

_p.getPoints = function() {
    return this._points;
};

_p.hasPoint = function(x, y) {
    return this._boundingRect.containsPoint(x, y) &&
        MathUtils.pointInsidePolygon(x, y, this._points, this._boundingRect.x + this._boundingRect.width, y);
};

_p.intersectsFragment = function(x0, y0, x1, y1) {
    return MathUtils.segmentIntersectsPolygon(x0, y0, x1, y1, this._points);
};