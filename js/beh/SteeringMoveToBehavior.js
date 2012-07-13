function SteeringMoveToBehavior(x, y) {
    this.x = x;
    this.y = y;
    this.acceptRadius = 3;
    this.slowRadius = 25;
    this.timeToTarget = 10;
}

_p = SteeringMoveToBehavior.prototype;

_p.applyToAgent = function(time, agent) {
    var direction = vec2.createFrom(this.x - agent.pos[0], this.y - agent.pos[1]);
    var distance = vec2.length(direction);

    var targetSpeed;

    if (distance > this.slowRadius) {
        targetSpeed = agent.maxLinearVelocity;
    } else {
        targetSpeed = agent.maxLinearVelocity * vec2.length(direction) / this.slowRadius;
    }

    var targetVelocity = direction;
    vec2.normalize(targetVelocity);
    vec2.scale(targetVelocity, targetSpeed);

    var steering = vec2.create();
    vec2.subtract(targetVelocity, agent.velocity, steering);
    vec2.scale(steering, 1/this.timeToTarget);

    agent.setLinearSteering(steering);
    return distance < this.acceptRadius;
};