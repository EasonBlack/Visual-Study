var Ball = function(ctx, options){
    this.x = options.x;
    this.y = options.y;
    this.r = options.r;
    this.color = options.color;
    this.ctx = ctx;

}

Ball.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;

    if(this.speed> 0) {
        var _du = (this.angle)*Math.PI/180;
        this.x +=  Math.cos(_du)*this.speed;
        this.y +=  Math.sin(_du)*this.speed;
        this.speed -= 0.1;
    } else {
        this.speed = 0;
    }

    this.ctx.arc(this.x,this.y,this.r, 0, 2*Math.PI);
    this.ctx.fill();
}