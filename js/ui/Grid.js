function Grid(cellSize, boldLine, color) {
    this._cellSize = cellSize || 25;
    this._boldLine = boldLine || 5;
    this._color = color || "lightblue";
}

_p = Grid.prototype;

_p.draw = function(ctx, width, height) {
    var cellSize = this._cellSize;
    var i, j;

    ctx.beginPath();
    for (i = 0; i < width/cellSize; i++) {
        ctx.moveTo(i*cellSize + 0.5, 0);
        ctx.lineTo(i*cellSize + 0.5, height);
    }

    for (j = 0; j < height/cellSize; j++) {
        ctx.moveTo(0, j*cellSize + .5);
        ctx.lineTo(width, j*cellSize + .5);
    }

    for (i = 0; i <= width/cellSize; i += this._boldLine) {
        ctx.moveTo(i*cellSize, 0);
        ctx.lineTo(i*cellSize, height);
    }

    for (j = 0; j <= height/cellSize; j+= this._boldLine) {
        ctx.moveTo(0, j*cellSize);
        ctx.lineTo(width, j*cellSize);
    }

    ctx.strokeStyle = this._color;
    ctx.stroke();
};

Grid.draw = function(ctx, width, height, cellSize, boldLine, color) {
    new Grid(cellSize, boldLine, color).draw(ctx, width, height);
};