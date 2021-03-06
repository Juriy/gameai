function WanderBehavior() {
    this.wanderOffset = 100;
    this.wanderRadius = 60;
    this.lastWanderChange = Date.now();
    this.wanderOrientation = 0;
}

_p = WanderBehavior.prototype;

_p.applyToAgent = function(time, agent) {

    if (Date.now() - this.lastWanderChange < 2500)
        return;
    this.lastWanderChange = Date.now();


    var wanderOrientation = (Math.random() - Math.random())*Math.PI;
    var wanderCircleCenter = [agent.pos[0] + this.wanderOffset*Math.cos(agent.orientation),
        agent.pos[1] + this.wanderOffset*Math.sin(agent.orientation)];

    agent.stop();
    markers[0] = RadiusMarker.green(wanderCircleCenter[0], wanderCircleCenter[1], this.wanderRadius);

    var steeringMove = new SteeringMoveToBehavior(
        wanderCircleCenter[0] + this.wanderRadius*Math.cos(wanderOrientation),
        wanderCircleCenter[1] + this.wanderRadius*Math.sin(wanderOrientation));

    var steeringLook = new SteeringLookAtBehavior(
        wanderCircleCenter[0] + this.wanderRadius*Math.cos(wanderOrientation),
        wanderCircleCenter[1] + this.wanderRadius*Math.sin(wanderOrientation));

    bManager.reset();
    bManager.add(steeringLook);
    bManager.add(steeringMove);

    markers[1] = Marker.red(wanderCircleCenter[0] + this.wanderRadius*Math.cos(wanderOrientation),
        wanderCircleCenter[1] + this.wanderRadius*Math.sin(wanderOrientation));


    //steeringMove.applyToAgent(frameTime, agent);
    //steeringLook.applyToAgent(frameTime, agent);
};