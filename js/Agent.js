function Agent() {
	this.color = "darkgreen";
	this.pos = [100, 100];
	this.orientation = -Math.PI;

    this.linearSteering = vec2.create();
    this.angularSteering = 0;

	this.velocity = vec2.create();

	this.rotation = 0;
	
	this.maxLinearVelocity = 0.25;
	this.maxLinearSteering = 0.002;
	
	this.maxAngularVelocity = 0.5;
	this.maxAngularSteering = 0.07;
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

_p.setLinearSteering = function(s) {
    if (vec2.length(s) > this.maxLinearSteering) {
        vec2.normalize(s);
        vec2.scale(s, this.maxLinearSteering);
    }
    this.linearSteering = s;
};

_p.setAngularSteering = function(s) {
    if (s > this.maxAngularSteering) {
        s /= Math.abs(s);
        s *= this.maxAngularSteering;
    }
    this.angularSteering = s;
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
    var i;
	for (i = 0; i < 2; i++) {
		this.pos[i] += this.velocity[i]*time;
	}

	for (i = 0; i < 2; i++) {
		this.velocity[i] += this.linearSteering[i]*time;
	}

    if (vec2.length(this.velocity) > this.maxLinearVelocity) {
        vec2.normalize(this.velocity);
        vec2.scale(this.velocity, this.maxLinearVelocity);
    }

    this.orientation += this.rotation;

    this.rotation += this.angularSteering;
    if (this.rotation > this.maxAngularVelocity) {
        this.rotation /= Math.abs(this.rotation);
        this.rotation *= this.maxAngularVelocity;
    }

    // Look where you're going
	if (this.velocity[0] || this.velocity[1]) {
		this.orientation = Math.atan2(-this.velocity[0], this.velocity[1]) + Math.PI/2;
	}
};

_p.stop = function() {
	this.velocity = vec2.create();
	this.linearSteering = vec2.create();
	this.rotation = 0;
	this.angularSteering = 0;
};
