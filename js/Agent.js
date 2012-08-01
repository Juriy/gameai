function Agent() {
	this.color = "#4D6821";
	this.pos = [300, 100];
	this.orientation = Math.PI/2;

    this.linearSteering = vec2.create();
    this.angularSteering = 0;

	this.velocity = vec2.create();

	this.rotation = 0;
	
	this.maxLinearVelocity = 0.1;
	this.maxLinearSteering = 0.01;
	
    this.maxAngularVelocity = 0.01;
	this.maxAngularSteering = 0.01;

    this.hunger = 0;
    this.energy = 100;
}

var _p = Agent.prototype;

_p.setPosition = function(x, y) {
    this.pos = vec2.create([x, y]);
};

_p.setOrientation = function(o) {
    this.orientation = o;
};

_p.draw = function(ctx) {
    Shapes.drawBoid(ctx, this.pos[0], this.pos[1], this.orientation);
    // this._drawSteeringVector(ctx);
};

_p._drawSteeringVector = function(ctx) {
    if (vec2.length(this.linearSteering) > 0.001) {
        var angle = Math.atan2(this.linearSteering[1], this.linearSteering[0]);
        Shapes.drawArrow1(ctx, this.pos[0], this.pos[1], 50, 15, 10, 5, angle);
    }
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

    //console.log(this.rotation*time);
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
