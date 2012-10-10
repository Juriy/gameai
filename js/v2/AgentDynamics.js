function AgentDynamics() {
    this.orientation = Math.PI/2;
    this.rotation = 0;

    this.linearSteering = vec2.create();
    this.angularSteering = 0;

    this.velocity = vec2.create();


    this.maxLinearVelocity = 0.1;
    this.maxLinearSteering = 0.01;

    this.maxAngularVelocity = 0.01;
    this.maxAngularSteering = 0.01;
}

_p = AgentDynamics.prototype;