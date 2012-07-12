function Agent() {
	this.color = "darkgreen";
	this.pos = [100, 100];
	this.orientation = -Math.PI;

	this.velocity = vec2.create();
	this.rotation = 0;
	
	this.maxLinearVelocity = 0.1;
	this.maxLinearSteering = 0.02;
	
	this.maxAngularVelocity = 0.005;
	this.maxAngularSteering = 0.001;
}

var _p = Agent.prototype;

_p.draw = function(ctx) {
	ctx.fillStyle = this.color;
	
	ctx.beginPath();
	ctx.arc(this.pos[0], this.pos[1], 10, 0, Math.PI*2, true);
	ctx.fill();
	
	var or = [Math.cos(this.orientation), -Math.sin(this.orientation)];
	
	var r2 = 17;
	
	ctx.beginPath(); // 
	ctx.arc(this.pos[0] + or[0]*r2, this.pos[1] - or[1]*r2, r2, 
			Math.PI + this.orientation - 0.5, Math.PI + this.orientation + 0.5, false);
			
	ctx.lineTo(this.pos[0] + or[0]*r2, this.pos[1] - or[1]*r2);
	ctx.closePath();
	ctx.fill();
};

_p.setVelocity = function(v) {
	trim(v, this.maxLinearVelocity);
	this.velocity = v;
};


_p.moveDirection = function(direction) {
	this.velocity = [Math.cos(direction), -Math.sin(direction)];
	setLength(this.velocity, this.maxVelocity);
};

_p.update = function(time) {
	for (var i = 0; i < 2; i++) {
		this.pos[i] += this.velocity[i]*time;
	}
	
	if (this.velocity[0] || this.velocity[1]) {
		this.orientation = Math.atan2(-this.velocity[0], this.velocity[1]) + Math.PI/2;
	}
};

_p.stop = function() {
	this.velocity = [0, 0];
};
