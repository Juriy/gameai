function MoveToBehavior(x, y) {
    this.x = x;
    this.y = y;
    this.acceptRadius = 3;
}

_p = MoveToBehavior.prototype;

_p.applyToAgent = function(time, agent) {
    var distance = vec2.createFrom(this.x - agent.pos[0], this.y - agent.pos[1]);
    var velocity = vec2.create(distance);

    vec2.scale(velocity, 1/time);
    agent.setVelocity(velocity);
    return length(distance) < this.acceptRadius;
};