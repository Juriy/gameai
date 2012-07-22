function Obstacle(points) {
	this._points = points;
    this._boundingRect = MathUtils.getBoundingRectangle(points);
}

_p = Obstacle.prototype;

_p.draw = function(ctx) {
	ctx.save();
	ctx.strokeStyle = "lightblue";
	ctx.fillStyle = "rgba(173, 216, 230, 0.65)";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(this._points[0][0], this._points[0][1]);
	for (var i = 1; i < this._points.length; i++) {
		ctx.lineTo(this._points[i][0], this._points[i][1]);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	
	this._fillLines(ctx);

    ctx.fillStyle = "rgba(99, 99, 99, 0.3)";
    ctx.fillRect(this._boundingRect.x, this._boundingRect.y, this._boundingRect.width, this._boundingRect.height);
};


_p._fillLines = function(ctx) {
	ctx.save();
	
	ctx.strokeStyle = "grey";
	ctx.lineWidth = 1;

	var minX = Number.MAX_VALUE;
	var minY = Number.MAX_VALUE;
	var maxX = Number.MIN_VALUE;
	var maxY = Number.MIN_VALUE;
	
	var angle = Math.PI/4;
	
	var points = this._points;
	for (var i = 0; i < this._points.length; i++) {
		if (this._points[i][0] < minX)
			minX = points[i][0];
		if (points[i][1] < minY)
			minY = points[i][1];
			
		if (points[i][0] > maxX)
			maxX = points[i][0];
		if (points[i][1] > maxY)
			maxY = points[i][1];
	}
	
	ctx.beginPath();
	ctx.moveTo(this._points[0][0], this._points[0][1]);
	for (i = 1; i < this._points.length; i++) {
		ctx.lineTo(this._points[i][0], this._points[i][1]);
	}
	ctx.closePath();
	ctx.clip();

	
	var linesOffset = (maxY-minY)/Math.tan(angle);
	
	ctx.beginPath();
	for (i = minX - linesOffset; i < maxX; i += 7) {
		ctx.moveTo(i, maxY);
		ctx.lineTo(i + linesOffset, minY);
	}
	
	ctx.stroke();
	ctx.restore();
};

_p.update = function(time) {

};

_p.hasPoint = function(x, y) {
    return this._boundingRect.containsPoint(x, y) &&
        MathUtils.pointInsidePolygon(x, y, this._points, this._boundingRect.x + this._boundingRect.width, y);
};
