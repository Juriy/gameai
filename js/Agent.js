function Agent() {
	this.color = "#4D6821";
	this.pos = [300, 100];
	this.orientation = Math.PI/2;

    this.linearSteering = vec2.create();
    this.angularSteering = 0;

	this.velocity = vec2.create();

	this.rotation = 0;
	
	this.maxLinearVelocity = 0.025;
	this.maxLinearSteering = 0.002;
	
    this.maxAngularVelocity = 0.02;
	this.maxAngularSteering = 0.005;
}

var _p = Agent.prototype;

_p.setPosition = function(x, y) {
    this.pos = vec2.create([x, y]);
};

_p.setOrientation = function(o) {
    this.orientation = o;
};

_p.draw = function(ctx) {
	ctx.fillStyle = this.color;
	
	ctx.beginPath();
	ctx.arc(this.pos[0], this.pos[1], 10, 0, Math.PI*2, true);
	ctx.fill();
	
	var or = [Math.cos(this.orientation), -Math.sin(this.orientation)];
	
	var r2 = 17;
	
	ctx.beginPath();
	ctx.arc(this.pos[0] + or[0]*r2, this.pos[1] - or[1]*r2, r2, 
			Math.PI + this.orientation - 0.5, Math.PI + this.orientation + 0.5, false);
			
	ctx.lineTo(this.pos[0] + or[0]*r2, this.pos[1] - or[1]*r2);
	ctx.closePath();
	ctx.fill();

    this._drawSteeringVector(ctx);
};

_p._drawSteeringVector = function(ctx) {
    if (vec2.length(this.linearSteering) > 0.001) {
        var angle = Math.atan2(this.linearSteering[1], this.linearSteering[0]);
        this._drawArrow(ctx, 50, 15, 10, 5, angle);
    }
};

_p._drawArrow = function(ctx, length, offsetFromCenter, arrowLength, arrowDepth, angle) {
    length = length || 50;
    offsetFromCenter = offsetFromCenter || 15;
    arrowLength = arrowLength || 10;
    arrowDepth = arrowDepth || 5;
    angle = angle || 0;

    ctx.save();
    ctx.beginPath();

    if (angle) {
        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(angle);
        ctx.translate(-this.pos[0], -this.pos[1]);
    }

    ctx.moveTo(this.pos[0] + offsetFromCenter, this.pos[1]);
    ctx.lineTo(this.pos[0] + offsetFromCenter - arrowDepth, this.pos[1] - arrowLength);
    ctx.lineTo(this.pos[0] + offsetFromCenter + length, this.pos[1]);
    ctx.lineTo(this.pos[0] + offsetFromCenter - arrowDepth, this.pos[1] + arrowLength);

    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

_p.setLinearSteering = function(s) {
    if (vec2.length(s) > this.maxLinearSteering) {
        vec2.normalize(s);
        vec2.scale(s, this.maxLinearSteering);
    }
    this.linearSteering = s;
};


_p.setVelocity = function(v) {
    if (vec2.length(v) > this.maxLinearVelocity) {
        vec2.normalize(v);
        vec2.scale(v, this.maxLinearVelocity);
    }

	this.velocity = v;
};

_p.setRotation = function(r) {
    if (Math.abs(r) > this.maxAngularVelocity) {
        r /= Math.abs(r);
        r *= this.maxAngularVelocity
    }
    this.rotation = r;
};

_p.setAngularSteering = function(s) {
    if (Math.abs(s) > this.maxAngularSteering) {
        s /= Math.abs(s);
        s *= this.maxAngularSteering;
    }
    this.angularSteering = s;
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

    this.orientation += this.rotation*time;
    this.rotation += this.angularSteering;

    if (Math.abs(this.rotation) > this.maxAngularVelocity) {
        this.rotation /= Math.abs(this.rotation);
        this.rotation *= this.maxAngularVelocity;
    }
};

_p.stop = function() {
	this.velocity = vec2.create();
	this.linearSteering = vec2.create();
	this.rotation = 0;
	this.angularSteering = 0;
};
