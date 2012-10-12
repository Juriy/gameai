function Kinematics() {
    this.pos = vec2.create();
    this.orientation = 0;


    this.velocity = vec2.create();
    this.maxSpeed = 0.05;
    this.maxAcceleration = 0.0001;

    this.rotation = 0;
    this.maxRotation = 0.005;
    this.maxAngularAcceleration = 0.00001;
}

_p = Kinematics.prototype;