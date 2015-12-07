var Rectangular = function(ctx , options ){
    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.fillColor = options.fillColor;
    this.strokeColor = options.strokeColor;
    this.c = ctx;
    this.element = options.element;
    this.isDown = false;
    this.isLineStraight = options.isLineStraight;
    this.text = options.text;
}

Rectangular.prototype.draw = function(boxes) {
    this.boxes = boxes;
    this.drawRect();
    this.mouseHandle();
}


Rectangular.prototype.drawRect = function(){
    this.c.beginPath();
    this.c.strokeStyle = this.strokeColor;
    this.c.rect(this.x, this.y, this.w,this.h);
    this.c.fillStyle = this.fillColor;
    this.c.fill();

    if(this.isDown) {
        this.c.strokeStyle = 'skyblue';
        this.c.lineWidth =3;
    }
    this.c.stroke();
    this.c.lineWidth =1;
    this.c.strokeStyle = this.strokeColor;
}



Rectangular.prototype.isDownFunction = function(x, y){
    var _leftx  = this.x;
    var _rightx = this.x + this.w;
    var _topy = this.y;
    var _downy = this.y + this.h
    if(x > _leftx && x < _rightx && y > _topy && y< _downy) {
        return true;
    } else {
        return false;
    }
}

Rectangular.prototype.mouseHandle = function(){
    if(!this.element) return ;

    var self = this;
    var _offset = $(this.element).offset();
    this.offsetX = _offset.left;
    this.offsetY = _offset.top;

    $(this.element).mousedown(function (e) {
        self.handleMouseDown(e);
    });

    $(this.element).mousemove(function (e) {
        self.handleMouseMove(e);
    });

    $(this.element).mouseup(function (e) {
        self.handleMouseUp(e);
    });

    $(this.element).mouseout(function (e) {
        self.handleMouseOut(e);
    });
}

Rectangular.prototype.handleMouseDown = function(e){
    e.preventDefault();
    this.startX = parseInt(e.clientX - this.offsetX);
    this.startY = parseInt(e.clientY - this.offsetY);
    this.isDown = this.isDownFunction(this.startX, this.startY);
}

Rectangular.prototype.handleMouseMove = function(e){
    e.preventDefault();
    if (!this.isDown) {
        return;
    }
    var mouseX = parseInt(e.clientX - this.offsetX);
    var mouseY = parseInt(e.clientY - this.offsetY);
    var dx = mouseX - this.startX;
    var dy = mouseY - this.startY;
    this.startX = mouseX;
    this.startY = mouseY;
    var _box;
    for(var i= 0,ilen=this.boxes.length;i<ilen;i++){
        if(this.boxes[i].x == this.x && this.boxes[i].y == this.y) continue;
        var isInOthers = this.isDownFunction.call(this.boxes[i], this.startX, this.startY);
        if(isInOthers) {
            this.x = this.boxes[i].x;
            this.y = this.boxes[i].y;
            break;
        }
    }

}

Rectangular.prototype.handleMouseUp = function(e){
    e.preventDefault();
    this.isDown = false;
}

Rectangular.prototype.handleMouseOut = function(e){
    e.preventDefault();
    this.isDown = false;
}