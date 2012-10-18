/**
 * A number of utility methods for drawing the polygons,
 * agents (boids), arrows, fills, etc.
 */
var Shapes = {

};

Shapes.drawMarker = function(ctx, x, y, size, lineWidth, color) {
    size = size || 10;
    lineWidth = lineWidth || 5;
    color = color || Marker.BLUE;
    ctx.save();
    ctx.strokeStyle = color;
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

/**
 * params:
 * x, y, width, height, radius, tailX, tailY, tailAngle
 * @param ctx
 * @param params
 */
Shapes.drawSpeechBubble = function(ctx, params) {
    var ix = params.tailX - (params.tailY - (params.y + params.height))/Math.tan(params.tailAngle);
    var iy = params.y + params.height;

    var ix1 = ix - 7;
    var ix2 = ix + 7;

    ctx.beginPath();

    // draw top and top right corner
    ctx.moveTo(params.x + params.radius, params.y);
    ctx.arcTo(params.x + params.width, params.y, params.x + params.width, params.y + params.radius, params.radius);

    // draw right side and bottom right corner
    ctx.arcTo(params.x + params.width,
                params.y + params.height,
                params.x + params.width - params.radius,
                params.y + params.height,
                params.radius);

    // go to first intersection with the tail
    ctx.lineTo(ix2, iy);
    ctx.lineTo(params.tailX, params.tailY);
    ctx.lineTo(ix1, iy);

    // draw bottom and bottom left corner
    ctx.arcTo(params.x, params.y + params.height,
                params.x, params.y + params.height - params.radius,
                params.radius);

    // draw left and top left corner
    ctx.arcTo(params.x, params.y, params.x + params.radius, params.y, params.radius);
    ctx.stroke();
};

Shapes.getBubbleWithTextImage = function(style, text) {
    var textBounds = Fonts.getTextBounds(style, text);
    var c = document.createElement("canvas");
    var radius = 15;

    c.width = textBounds.width + radius*2 + 10;
    c.height = textBounds.height + radius + 50;
    var ctx = c.getContext("2d");

    ctx.translate(5, 5);
    Shapes.drawBubbleWithText(ctx, 0, 0, style, text);
    var imageData = c.toDataURL("image/png");
    var imageElement = new Image();
    imageElement.src = imageData;
    return imageElement;
};

Shapes.drawBubbleWithText = function(ctx, x, y, style, text) {
    var textBounds = Fonts.getTextBounds(style, text);
    var radius = 15;

    var width = textBounds.width + radius*2;
    var height = textBounds.height + radius;
    ctx.save();
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 2;
    Shapes.drawSpeechBubble(ctx, {
        x: x, y: y,
        width: width,
        height: height,
        radius: radius,
        tailX: radius + width*0.1,
        tailY: height + 20,
        tailAngle: -Math.PI/4});
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#777";
    ctx.translate(radius, radius/2);
    Fonts.renderTextLimitWidth(ctx, style, text);
    ctx.restore();
};

Shapes.roundedRect = function(ctx, x, y, width, height, radius) {
    ctx.beginPath();

    // draw top and top right corner
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);

    // draw right side and bottom right corner
    ctx.arcTo(x+width,y+height,x+width-radius,y+height,radius);

    // draw bottom and bottom left corner
    ctx.arcTo(x,y+height,x,y+height-radius,radius);

    // draw left and top left corner
    ctx.arcTo(x,y,x+radius,y,radius);
};


/**
 * TODO: Review this one, if it is still needed.
 */
Shapes.arrow = function(ctx) {
    ctx.strokeStyle='rgb(50,50,0)';
    ctx.fillStyle='rgb(50,50,0)';
    ctx.lineWidth=2;

    // draw the line for the shaft

    ctx.moveTo(10,30);
    ctx.lineTo(290,30);

    // draw the top of the arrow head
    ctx.lineTo(285,28);

    // draw the curve of the back
    ctx.arcTo(289,30, 285,32,8);

    // draw the bottom of the arrow head
    ctx.lineTo(290,30);

    // and make it draw
    ctx.stroke();
    ctx.fill();
};
