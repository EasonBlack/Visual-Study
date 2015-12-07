var Grid = function(ctx, options){
    this.startX = options.x;
    this.startY = options.y;
    this.strokeStyle= options.strokeStyle;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.w = options.w;
    this.c = ctx;
    this.c.lineWidth = 1;
    this.boxes = [];
}

Grid.prototype.draw =  function() {
    this.drawGrid();
}

Grid.prototype.drawGrid = function(){
     this.drawHorizontal();
     this.drawVertical();
     this.setBoxes();
}

Grid.prototype.drawHorizontal = function(){
     var _start = this.startY;
     while(_start < this.height) {
         this.c.beginPath();
         this.c.moveTo(0, _start);
         this.c.lineTo(this.width, _start);
         this.c.stroke();
        _start += this.w;
     }
     this.endY = _start - this.w;
}

Grid.prototype.drawVertical = function(){
    var _start = this.startX;
    while(_start < this.width) {
        this.c.beginPath();
        this.c.moveTo(_start, 0);
        this.c.lineTo(_start, this.height);
        this.c.stroke();
        _start += this.w;
    }
    this.endX = _start - this.w;
}

Grid.prototype.setBoxes =  function() {
    this.boxes = [];
    var xlen = (this.endX - this.startX)/this.w;
    var ylen = (this.endY - this.startY)/this.w;
    for(var i=0;i<xlen;i++){
        for(var j=0;j<ylen;j++){
            var _x = this.startX + i*this.w;
            var _y = this.startY + j*this.w;
            this.boxes.push({x: _x, y : _y, w: this.w, h: this.w});
        }
    }
}

Grid.prototype.getBoxes = function() {
    return this.boxes;
}
