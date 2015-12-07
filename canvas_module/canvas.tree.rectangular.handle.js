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

Rectangular.prototype.draw = function() {
    this.getJoint();
    this.drawRect();
    this.mouseHandle();
}

Rectangular.prototype.getJoint = function(){
    this.fatherJoint = { x: this.x + this.w/2,  y: this.y };
    this.childJoint = { x: this.x+ this.w/2,  y: this.y + this.h}
}

Rectangular.prototype.drawRect = function(){
    this.c.beginPath();
    this.c.strokeStyle = this.strokeColor;
    this.c.rect(this.x, this.y, this.w,this.h);
    this.c.fillStyle = this.fillColor;
    this.c.fill();

    if(!this.isDown) {
        this.c.lineWidth =1;
    } else {
        this.c.strokeStyle = 'skyblue';
        this.c.lineWidth =3;
    }
    this.c.stroke();

    if(this.text) {
        this.c.fillStyle = "#000";
        this.c.font = "20pt Calibri";
        this.c.fillText(this.text, this.x + 22, this.y + 32);
    }

}

Rectangular.prototype.setChildren = function(rects){

    for(var i= 0,ilen=rects.length;i<ilen;i++){
        this.c.beginPath();
        this.c.strokeStyle = this.strokeColor;
        this.c.lineWidth = 1;
        this.c.moveTo(this.childJoint.x, this.childJoint.y);

        if(this.isLineStraight) {
            this.lineStraight(rects[i]);
        } else {
            this.c.lineTo(rects[i].fatherJoint.x, rects[i].fatherJoint.y);
        }

        this.c.stroke();
    }
}

Rectangular.prototype.lineStraight = function(rect){
    if(this.childJoint.x == rect.fatherJoint.x)  {
        this.c.lineTo(rect.fatherJoint.x, rect.fatherJoint.y);
    } else {
        var xlen =  rect.fatherJoint.x - this.childJoint.x;
        var ylen =  rect.fatherJoint.y - this.childJoint.y;
        this.c.lineTo(this.childJoint.x,this.childJoint.y + ylen/2);
        this.c.lineTo(this.childJoint.x + xlen,this.childJoint.y + ylen/2);
        this.c.lineTo(this.childJoint.x + xlen,this.childJoint.y + ylen);
    }
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
    this.x += dx;
    this.y += dy;

}
Rectangular.prototype.handleMouseUp = function(e){
    e.preventDefault();
    this.isDown = false;
}
Rectangular.prototype.handleMouseOut = function(e){
    e.preventDefault();
    this.isDown = false;
}