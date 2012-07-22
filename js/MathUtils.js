MathUtils = {};

MathUtils.getBoundingRectangle = function(points) {
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;

    for (var i = 0; i < points.length; i++) {
        var x = points[i][0];
        var y = points[i][1];
        if (x < minX)
            minX = x;
        if (x > maxX)
            maxX = x;
        if (y < minY)
            minY = y;
        if (y > maxY)
            maxY = y;
    }

    var epsilon = Math.max(maxX - minX, maxY - minY)*0.05;

    minX -= epsilon;
    maxX += epsilon;
    minY -= epsilon;
    maxY += epsilon;
    return new Rect(minX, minY, maxX - minX, maxY - minY);
};

/**
 * http://stackoverflow.com/questions/563198
 */
MathUtils.linesIntersect = function(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;     s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;     s2_y = p3_y - p2_y;

    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return [p0_x + (t * s1_x), p0_y + (t * s1_y)];
    }

    return null;
};

MathUtils.sign = function (number) {
    return number > 0 ? 1 : number == 0 ? 0 : -1;
};

MathUtils.pointInsidePolygon = function (px, py, polygon, rayX, rayY) {
    if ((rayX == undefined || rayY == undefined)) {
        var rect = MathUtils.getBoundingRectangle(polygon);
        rayX = rect.x + rect.width;
        rayY = py;
    }

    var intersectCount = 0;
    for (var i = 0; i < polygon.length; i++) {
        var polyX0 = polygon[i][0];
        var polyY0 = polygon[i][1];
        var polyX1 = i + 1 == polygon.length ? polygon[0][0] : polygon[i + 1][0];
        var polyY1 = i + 1 == polygon.length ? polygon[0][1] : polygon[i + 1][1];

        if (MathUtils.linesIntersect(px, py, rayX, rayY, polyX0, polyY0, polyX1, polyY1)) {
            intersectCount++;
        }
    }
    return intersectCount%2 == 1;
};