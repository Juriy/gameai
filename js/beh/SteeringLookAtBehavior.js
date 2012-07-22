function SteeringLookAtBehavior(x, y) {
    this.dest = vec2.createFrom(x, y);
    this.acceptRadius = 0.01;
    this.slowRadius = 0.5;
    this.timeToTarget = 30;
}

_p = SteeringLookAtBehavior.prototype;

_p.applyToAgent = function(time, agent) {

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

    if (rotationSize < this.acceptRadius) {
        agent.setRotation(0);
        agent.setAngularSteering(0);
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
