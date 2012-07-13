function SteeringLookAtBehavior(x, y) {
    this.dest = vec2.createFrom(x, y);
    this.targetRadius = 0.01;
    this.slowRadius = 0.1;
    this.timeToTarget = 10;
}

_p = SteeringLookAtBehavior.prototype;

_p.applyToAgent = function(time, agent) {
    var acceptDistance = 0.01;
    var rotationSpeed = 0.002;

    //debugger;
    var targetAngle = vec2.subtract(this.dest, agent.pos, vec2.create());
    var targetOrientation = Math.atan2(-targetAngle[0], targetAngle[1]) + Math.PI/2;

    var rotation = targetOrientation - agent.orientation;

    while (rotation > Math.PI) {
        rotation -= Math.PI*2;
    }
    while (rotation < -Math.PI) {
        rotation += Math.PI*2;
    }

    var rotationSize = Math.abs(rotation);

    if (rotationSize < this.targetRadius) {
        return true;
    }

    var targetRotation;

    if (rotationSize > this.slowRadius) {
        targetRotation = agent.maxAngularSteering;
    } else {
        targetRotation = agent.maxAngularSteering * rotationSize / this.slowRadius;
    }

    targetRotation *= rotation / rotationSize;
    var steering = (targetRotation - agent.rotation)/this.timeToTarget;

    agent.setAngularSteering(steering);
};
