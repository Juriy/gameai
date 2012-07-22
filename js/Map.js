function Map() {
    this.obstacles = [];
}

_p = Map.prototype;

_p.addObstacle = function(obstacle) {
    this.obstacles.push(obstacle);
};

