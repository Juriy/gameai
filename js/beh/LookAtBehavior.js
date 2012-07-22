function LookAtBehavior(x, y) {
    this.dest = vec2.createFrom(x, y);
}

_p = LookAtBehavior.prototype;

_p.applyToAgent = function(time, agent) {
    var acceptDistance = 0.01;
    var rotationSpeed = 0.002;

    //debugger;
    var targetAngle = vec2.subtract(this.dest, agent.pos, vec2.create());
    var targetOrientation = Math.atan2(targetAngle[1], targetAngle[0]);

    var deltaOrientation = targetOrientation - agent.orientation;

    while (deltaOrientation > Math.PI) {
        deltaOrientation -= Math.PI*2;
    }
    while (deltaOrientation < -Math.PI) {
        deltaOrientation += Math.PI*2;
    }

    //console.log(deltaOrientation + "|" + targetOrientation);

    var rot = sign(deltaOrientation)*Math.min(rotationSpeed, Math.abs(deltaOrientation));


    var done = false;
    if (Math.abs(rot*time) > Math.abs(deltaOrientation)) {
        rot = deltaOrientation/time;
        agent.orientation += rot*time;

    }

    if (Math.abs(deltaOrientation) < acceptDistance) {
        agent.setAngularSteering(0);
        agent.setRotation(0);
        return true;
    }



    return done;
};
