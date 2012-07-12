function Marker(x, y) {
	this.x = x;
	this.y = y;
}

_p = Marker.prototype;

_p.draw = function(ctx) {
	ctx.strokeStyle = "lightblue";
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(this.x - 10, this.y + 10);
	ctx.lineTo(this.x + 10, this.y - 10);
	ctx.moveTo(this.x - 10, this.y - 10);
	ctx.lineTo(this.x + 10, this.y + 10);
	ctx.stroke();
	ctx.lineWidth = 1;
};

_p.update = function(time) {
	
};
