var Fonts = {
    faces: {},

    renderTextLimitWidth: function(ctx, style, text) {
        var face = this.faces[style.face];
        var lines = text.split("\n");

        var lineHeight = Math.round(this.pixelsFromPoints(face, style, face.lineHeight));

        var pointScale = this.pixelsFromPoints(face, style, 1);

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var extents = this.getTextExtents(face, style, line);
            var lineWidth = extents.x*pointScale;

            if (lineWidth < style.maxWidth) {
                this.renderLine(ctx, face, style, lines[i]);
                ctx.translate(0, lineHeight);
            } else {
                var words = line.split(" ");
                var firstLine = words[0];
                var j = 1;
                while (true) {
                    var word = words[j++];
                    extents = this.getTextExtents(face, style, firstLine);
                    lineWidth = extents.x*pointScale;
                    var wordExtents = this.getTextExtents(face, style, " " + word);
                    var wordWidth = wordExtents.x*pointScale;
                    if (wordWidth + lineWidth > style.maxWidth) {
                        this.renderTextLimitWidth(ctx, style, firstLine);
                        this.renderTextLimitWidth(ctx, style, line.substring(firstLine.length + 1));
                        break;
                    } else {
                        firstLine += " " + word;
                    }
                }
            }
        }
    },

    renderLine: function(ctx, face, style, text) {
        ctx.save();
        ctx.beginPath();
        var pointScale = this.pixelsFromPoints(face, style, 1);
        ctx.scale(pointScale * style.fontStretchPercent, -1 * pointScale);
        ctx.translate(0, -1 * face.ascender);
        this.renderWord (ctx, face, style, text);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    },

    getTextExtents: function(face, style, text) {
        var extentX = 0;
        var extentY = 0;
        var horizontalAdvance = 0;
        var textLength = text.length;

        for (var i = 0; i < textLength; i++) {
            var glyph = face.glyphs[text.charAt(i)] ? face.glyphs[text.charAt(i)] : face.glyphs[this.fallbackCharacter];
            var letterSpacingAdjustment = this.pointsFromPixels(face, style, style.letterSpacing);
            // if we're on the last character, go with the glyph extent if that's more than the horizontal advance
            extentX += i + 1 == textLength ? Math.max(glyph.x_max, glyph.ha) : glyph.ha;
            extentX += letterSpacingAdjustment;

            horizontalAdvance += glyph.ha + letterSpacingAdjustment;
        }

        return {
            x: extentX,
            y: extentY,
            ha: horizontalAdvance
        };
    },

    pointsFromPixels: function (face, style, pixels, dimension) {
        var points = pixels * face.resolution / (parseInt(style.fontSize) * 72 / 100);
        if (dimension == 'horizontal' && style.fontStretchPrecent) {
            points *= style.fontStretchPercent;
        }
        return points;
    },

    renderWord: function(ctx, face, style, text) {
        var chars = text.split('');
        for (var i = 0; i < chars.length; i++) {
            this.renderGlyph(ctx, face, chars[i], style);
        }

        if (style.textDecoration == "underline") {
            ctx.beginPath();
            ctx.moveTo(0, face.underlinePosition);
            ctx.lineTo(0, face.underlinePosition);
            ctx.strokeStyle = style.color;
            ctx.lineWidth = face.underlineThickness;
            ctx.stroke();
        }
    },

    pixelsFromPoints: function(face, style, points, dimension) {
        var pixels = points * parseInt(style.fontSize) * 72 / (face.resolution * 100);
        if (dimension == 'horizontal' && style.fontStretchPercent) {
            pixels *= style.fontStretchPercent;
        }
        return pixels;
    },

    renderGlyph: function (ctx, face, chr, style) {
        var glyph = face.glyphs[chr];

        if (!glyph) {
            //this.log.error("glyph not defined: " + char);
            return this.renderGlyph(ctx, face, this.fallbackCharacter, style);
        }

        if (glyph.o) {

            var outline;
            if (glyph.cached_outline) {
                outline = glyph.cached_outline;
            } else {
                outline = glyph.o.split(' ');
                glyph.cached_outline = outline;
            }

            var outlineLength = outline.length;
            for (var i = 0; i < outlineLength; ) {

                var action = outline[i++];

                switch(action) {
                    case 'm':
                        ctx.moveTo(outline[i++], outline[i++]);
                        break;
                    case 'l':
                        ctx.lineTo(outline[i++], outline[i++]);
                        break;

                    case 'q':
                        var cpx = outline[i++];
                        var cpy = outline[i++];
                        ctx.quadraticCurveTo(outline[i++], outline[i++], cpx, cpy);
                        break;

                    case 'b':
                        var x = outline[i++];
                        var y = outline[i++];
                        ctx.bezierCurveTo(outline[i++], outline[i++], outline[i++], outline[i++], x, y);
                        break;
                }
            }
        }

        if (glyph.ha) {

            var letterSpacingPoints =
                style.letterSpacing && style.letterSpacing != 'normal' ?
                    // This call might well need "horizontal" parameter
                    // it looks like a bug in original Typeface.js
                    // leaving for now.
                    this.pointsFromPixels(face, style, style.letterSpacing) :
                    0;

            ctx.translate(glyph.ha + letterSpacingPoints, 0);
        }
    }

};




// TRANSFER LATER
/*



function speechBubble(ctx, x, y, width, height, radius, tailX, tailY, tailAngle) {

    var ix = tailX - (tailY - (y + height))/Math.tan(tailAngle);
    var iy = y + height;

    var ix1 = ix - 7;
    var ix2 = ix + 7;

    ctx.beginPath();

    // draw top and top right corner
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);

    // draw right side and bottom right corner
    ctx.arcTo(x+width,y+height,x+width-radius,y+height,radius);

    // go to first intersection with the tail
    ctx.lineTo(ix2, iy);
    ctx.lineTo(tailX, tailY);
    ctx.lineTo(ix1, iy);

    // draw bottom and bottom left corner
    ctx.arcTo(x,y+height,x,y+height-radius,radius);

    // draw left and top left corner
    ctx.arcTo(x,y,x+radius,y,radius);

    ctx.stroke();



    //ctx.moveTo(tailX, tailY);
    //ctx.lineTo(ix, iy);
    //ctx.stroke();
}



function roundedRect(ctx, x, y, width, height, radius) {
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
}



function arrow(ctx) {
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
    ctx.fill();
}*/
