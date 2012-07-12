function Obstacle(points) {
	this.points = points;
}

_p = Obstacle.prototype;

_p.draw = function(ctx) {
	ctx.save();
	ctx.strokeStyle = "lightblue";
	ctx.fillStyle = "rgba(173, 216, 230, 0.65)";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(this.points[0][0], this.points[0][1]);
	for (var i = 1; i < this.points.length; i++) {
		ctx.lineTo(this.points[i][0], this.points[i][1]);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	
	this._fillLines(ctx);
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
	
	var points = this.points;
	for (var i = 0; i < this.points.length; i++) {
		if (this.points[i][0] < minX)
			minX = points[i][0];
		if (points[i][1] < minY)
			minY = points[i][1];
			
		if (points[i][0] > maxX)
			maxX = points[i][0];
		if (points[i][1] > maxY)
			maxY = points[i][1];
	}
	
	ctx.beginPath();
	ctx.moveTo(this.points[0][0], this.points[0][1]);
	for (var i = 1; i < this.points.length; i++) {
		ctx.lineTo(this.points[i][0], this.points[i][1]);
	}
	ctx.closePath();
	ctx.clip();

	
	var linesOffset = (maxY-minY)/Math.tan(angle);
	
	ctx.beginPath();
	for (var i = minX - linesOffset; i < maxX; i += 7) {
		ctx.moveTo(i, maxY);
		ctx.lineTo(i + linesOffset, minY);
	}
	
	ctx.stroke();
	ctx.restore();
} 

_p.update = function(time) {

};
