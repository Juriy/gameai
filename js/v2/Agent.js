function Agent() {
    this.color = "#4D6821";
    this.pos = [300, 100];
    this.orientation = Math.PI/2;
}

var _p = Agent.prototype;

_p.setPosition = function(x, y) {
    this.pos = vec2.create([x, y]);
};

_p.getPosition = function() {
    return this.pos;
};

_p.getOrientation = function() {
    return this.orientation;
};

_p.setOrientation = function(o) {
    this.orientation = o;
};

_p.setColor = function(color) {
    this.color = color;
};

_p.draw = function(ctx) {
    Shapes.drawBoid(ctx, this.pos[0], this.pos[1], this.orientation, 10, 17, this.color);
};

_p._drawSteeringVector = function(ctx) {
    if (vec2.length(this.linearSteering) > 0.001) {
        var angle = Math.atan2(this.linearSteering[1], this.linearSteering[0]);
        Shapes.drawArrow1(ctx, this.pos[0], this.pos[1], 50, 15, 10, 5, angle);
    }
};