/**
 * A number of utility methods for drawing the polygons,
 * agents (boids), arrows, fills, etc.
 */
var Shapes = {

};

Shapes.drawMarker = function(ctx, x, y, size, lineWidth) {
    size = size || 10;
    lineWidth = lineWidth || 5;

    ctx.save();
    ctx.strokeStyle = this._color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x - size, y + size);
    ctx.lineTo(x + size, y - size);
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.stroke();
    ctx.restore();
};

Shapes.drawBoid = function(ctx, x, y, orientation, r1, r2, color) {
    r1 = r1 || 10;
    r2 = r2 || 17;
    color = color || "#4D6821";

    ctx.save();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r1, 0, Math.PI*2, true);
    ctx.fill();
    var or = [Math.cos(orientation), -Math.sin(orientation)];
    ctx.beginPath();
    ctx.arc(x + or[0]*r2, y - or[1]*r2, r2,
        Math.PI + orientation - 0.5, Math.PI + orientation + 0.5, false);
    ctx.lineTo(x + or[0]*r2, y - or[1]*r2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

Shapes.drawArrow1 = function(ctx, x, y, length, offsetFromCenter, wingLength, wingDepth, angle) {
    length = length || 50;
    offsetFromCenter = offsetFromCenter || 15;
    wingLength = wingLength || 10;
    wingDepth = wingDepth || 5;
    angle = angle || 0;

    ctx.save();
    ctx.fillStyle = "green";
    ctx.beginPath();

    if (angle) {
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);
    }

    ctx.moveTo(x + offsetFromCenter, y);
    ctx.lineTo(x + offsetFromCenter - wingDepth, y - wingLength);
    ctx.lineTo(x + offsetFromCenter + length, y);
    ctx.lineTo(x + offsetFromCenter - wingDepth, y + wingLength);

    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

Shapes.drawPolygon = function(ctx, points) {
    ctx.save();
    ctx.strokeStyle = "lightblue";
    ctx.fillStyle = "rgba(173, 216, 230, 0.65)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};


Shapes.fillPolygon = function(ctx, points) {
    ctx.save();

    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;

    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;

    var angle = Math.PI/4;

    for (var i = 0; i < points.length; i++) {
        if (points[i][0] < minX)
            minX = points[i][0];
        if (points[i][1] < minY)
            minY = points[i][1];

        if (points[i][0] > maxX)
            maxX = points[i][0];
        if (points[i][1] > maxY)
            maxY = points[i][1];
    }

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.clip();

    var linesOffset = (maxY-minY)/Math.tan(angle);

    ctx.beginPath();
    for (i = minX - linesOffset; i < maxX; i += 7) {
        ctx.moveTo(i, maxY);
        ctx.lineTo(i + linesOffset, minY);
    }

    ctx.stroke();
    ctx.restore();
};