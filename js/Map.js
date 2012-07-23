function Map(data) {
    this._obstacles = [];

    if (data) {
       data.obstacles.forEach(function(it) {
           this._obstacles.push(new Obstacle(it));
       }, this);
    }
}

_p = Map.prototype;

_p.addObstacle = function(obstacle) {
    this._obstacles.push(obstacle);
};

_p.serialize = function() {
    var data = {};
    data.obstacles = [];

    this._obstacles.forEach(function(it) {
        data.obstacles.push(it.getPoints());
    });

    return JSON.stringify(data);
};

_p.collidesWithObstacle = function(x, y) {
    for (var i = 0; i < this._obstacles.length; i++) {
        if (this._obstacles[i].hasPoint(x, y))
            return true;
    }
    return false;
};

_p.pointsVisible = function(x0, y0, x1, y1) {
    for (var i = 0; i < this._obstacles.length; i++) {
        if (this._obstacles[i].intersectsFragment(x0, y0, x1, y1))
            return false;
    }
    return true;
};

_p.reset = function() {
    this._obstacles = [];
};

_p.update = function(time) {

};

_p.draw = function(ctx) {
    this._obstacles.forEach(function(item) {
        item.draw(ctx);
    });
};