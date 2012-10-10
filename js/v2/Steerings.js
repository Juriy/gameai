var Steerings = {
    seek: function(obj, target) {
        // Create the structure to hold our output
        var steering = {};

        // Get the direction to the target
        var vecTarget = vec2.createFrom(target.x, target.y);

        // subtract the position from the target to get the vector from the vehicles position to the target.
        // Normalize it then multiply by max speed to get the maximum velocity from your position to the target.
        steering.linear = vec2.create();
        vec2.subtract(vecTarget, obj.pos, steering.linear);

        vec2.normalize(steering.linear);
        vec2.scale(steering.linear, obj.maxAcceleration);

        steering.angular = 0;
        return steering;
    },

    flee: function(obj, target) {
        // Create the structure to hold our output
        var steering = {};

        // Get the direction to the target
        var vecTarget = vec2.createFrom(target.x, target.y);

        // subtract the position from the target to get the vector from the vehicles position to the target.
        // Normalize it then multiply by max speed to get the maximum velocity from your position to the target.
        steering.linear = vec2.create();

        // FLEE is only different in this line
        vec2.subtract(obj.pos, vecTarget, steering.linear);

        vec2.normalize(steering.linear);
        vec2.scale(steering.linear, obj.maxAcceleration);

        steering.angular = 0;
        return steering;
    },

    arrive: function(obj, target) {
        // 10 # Holds the radius for arriving at the target
        var targetRadius = 2;

        // 13 # Holds the radius for beginning to slow down
        var slowRadius = 30;

        // 16 # Holds the time over which to achieve target speed
        var timeToTarget = 100;
        var steering = {
            linear: vec2.create()
        };

        // Get the direction to the target
        var vecTarget = vec2.createFrom(target.x, target.y);

        var direction = vec2.create();
        vec2.subtract(vecTarget, obj.pos, direction);

        var distance = vec2.length(direction);

        // 28 # Check if we are there, return no steering
        if (distance < targetRadius) {
            // Modification: return the value to reduce speed to 0
            // This might actually cause a problem if the speed is still
            // quite big, it doesn't striclty ensure stop
            return null;
        }

        //32 # If we are outside the slowRadius, then go max speed
        var targetSpeed;
        if (distance > slowRadius) {
            targetSpeed = obj.maxSpeed;
        } else {
        // 36 # Otherwise calculate a scaled speed
            targetSpeed = obj.maxSpeed * distance / slowRadius;
        }

        var targetVelocity = direction;
        vec2.normalize(targetVelocity);
        vec2.scale(targetVelocity, targetSpeed);

        // 45 # Acceleration tries to get to the target velocity
        vec2.subtract(targetVelocity, obj.velocity, steering.linear);
        vec2.scale(steering.linear, 1/timeToTarget);
        if (vec2.length(steering.linear) > obj.maxAcceleration) {
            vec2.normalize(steering.linear);
            vec2.scale(steering.linear, obj.maxAcceleration);
        }

        steering.angular = 0;
        return steering;
    },

    /** For reference only, this is from the original paper */
    massSeek: function(obj, target) {
        //debugger;
        var vecTarget = vec2.createFrom(target.x, target.y);
        // subtract the position from the target to get the vector from the vehicles position to the target.
        // Normalize it then multiply by max speed to get the maximum velocity from your position to the target.
        var desiredVelocity = vec2.create();
        vec2.subtract(vecTarget, obj.pos, desiredVelocity);
        vec2.normalize(desiredVelocity);

        vec2.scale(desiredVelocity, obj.maxSpeed);

        // subtract velocity from the desired velocity to get the force vector
        var steeringForce = vec2.create();
        vec2.subtract(desiredVelocity, obj.velocity, steeringForce);

        //divide the steeringForce by the mass(which makes it the acceleration),
        // then add it to velocity to get the new velocity
        vec2.scale(steeringForce, 1/obj.mass);

        vec2.add(obj.velocity, steeringForce, obj.velocity);
    }
};