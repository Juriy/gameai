function SeekBehavior() {
    this._target = vec2.create();
}

_p._setTarget = function(x, y) {
    this._target[0] = x;
    this._target[1] = y;
};

_p = SeekBehavior.prototype;

_p.applyBehavior = function(obj) {
    // subtract the position from the target to get the vector from the vehicles position to the target.
    // Normalize it then multiply by max speed to get the maximum velocity from your position to the target.
    var desiredVelocity = vec2.create();
    vec2.subtract(this._target, obj.position, desiredVelocity);
    vec2.normalize(desiredVelocity);
    vec2.scale(desiredVelocity, obj.maxSpeed);

    // subtract velocity from the desired velocity to get the force vector
    var steeringForce = vec2.create();
    vec2.subtract(desiredVelocity, obj.velocity, steeringForce);

    //divide the steeringForce by the mass(which makes it the acceleration),
    // then add it to velocity to get the new velocity
    vec2.scale(steeringForce, 1/obj.mass);
    vec2.add(obj.velocity, steeringForce);
};


public function update():void {
    // keep it witin its max speed
    _velocity.truncate(_maxSpeed);

// move it
_position = _position.add(_velocity);


// rotation = the velocity's angle converted to degrees
rotation = _velocity.angle * 180 / Math.PI;
}