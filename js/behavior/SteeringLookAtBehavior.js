function SteeringLookAtBehavior(x, y) {
    this.dest = vec2.createFrom(x, y);
    this.acceptRadius = 0.01;
    this.slowRadius = 0.7;
    this.timeToTarget = 1;
}

_p = SteeringLookAtBehavior.prototype;

_p.applyToAgent = function(time, agent) {
    var targetVector = vec2.subtract(this.dest, agent.pos, vec2.create());
    var targetAngle = Math.atan2(targetVector[1], targetVector[0]);

    var rotation = targetAngle - agent.orientation;
    while (rotation > Math.PI) {
        rotation -= Math.PI*2;
    }
    while (rotation < -Math.PI) {
        rotation += Math.PI*2;
    }

    var distance = Math.abs(rotation);
    if (distance < this.acceptRadius) {
        this.stop(agent);
        return true;
    }

    var direction = rotation / distance;

    var targetSpeed;
    if (distance > this.slowRadius) {
        targetSpeed = agent.maxAngularVelocity;
    } else {
        targetSpeed = agent.maxAngularVelocity * distance / this.slowRadius;
    }

    var targetVelocity = targetSpeed*direction;

    var steering = targetVelocity - agent.rotation;
    steering /= this.timeToTarget;

    agent.setAngularSteering(steering);
};

_p.stop = function(agent) {
    agent.setRotation(0);
    agent.setAngularSteering(0);
    return true;
};
