var Grid = function (ctx, options) {
    this.startX = options.x;
    this.startY = options.y;
    this.strokeStyle = options.strokeStyle;
    this.lineWidth = options.lineWidth;
    this.element = options.element;
    this.w = options.w;
    this.boxes = [];
    this.obstacles = [];

    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;

    this.c = ctx;
    this.c.lineWidth = this.lineWidth;
    this.c.strokeStyle = this.strokeStyle;
}

Grid.prototype.draw = function () {
    this.drawLine(this.startY, 0);
    this.drawLine(this.startY, 1);
}


Grid.prototype.drawLine = function (start, isVertical) {
    var _start = start;
    var _gridEnd = isVertical ? this.width : this.height;
    while (_start < _gridEnd) {
        var _pointStart = isVertical ? [_start, 0] : [0, _start];
        var _pointEnd = isVertical ? [_start, this.height] : [this.width, _start];
        this.c.beginPath();
        this.c.moveTo.apply(this.c, _pointStart);
        this.c.lineTo.apply(this.c, _pointEnd);
        this.c.stroke();
        _start += this.w;
    }
    isVertical ?  this.endY = _start - this.w :  this.endX = _start - this.w;;
}

Grid.prototype.createRandomBox = function() {
    var xlen = (this.endX - this.startX) / this.w;
    var ylen = (this.endY - this.startY) / this.w;
    var _rx = Math.round(Math.random()*xlen);
    var _ry = Math.round(Math.random()*ylen);
    var _x = this.startX + _rx * this.w;
    var _y = this.startY + _ry * this.w;
    var _fillStyle = ['#3778d4','#16b28a','#fcb100'][Math.round(Math.random()*2)];
    var isExist = _.find(this.obstacles,function(o){
        return o.id ==  _x+'_'+_y
    })
    if(isExist) {
        this.createRandomBox();
    } else {
        this.obstacles.push({id: _x+'_'+_y, x: _x, y: _y, w: this.w, h: this.w, fillStyle: _fillStyle});
    }
};

Grid.prototype.drawObastacles = function(){
    for (var i = 0, len = this.obstacles.length; i < len; i++) {
        var box = this.obstacles[i];
        this.c.beginPath();
        this.c.fillStyle = box.fillStyle;
        this.c.fillRect(box.x, box.y, box.w, box.h);
        this.c.stroke();
    }
}

Grid.prototype.setBoxes = function () {
    this.boxes = [];
    var xlen = (this.endX - this.startX) / this.w;
    var ylen = (this.endY - this.startY) / this.w;
    for (var i = 0; i < xlen; i++) {
        for (var j = 0; j < ylen; j++) {
            var _x = this.startX + i * this.w;
            var _y = this.startY + j * this.w;
            this.boxes.push({x: _x, y: _y, w: this.w, h: this.w});
        }
    }
}

Grid.prototype.getBoxes = function() {
    return this.boxes;
}

Grid.prototype.getObastacles = function() {
    return this.obstacles;
}
